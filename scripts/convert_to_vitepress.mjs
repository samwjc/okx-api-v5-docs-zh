/**
 * 将 OKX API v5 离线 HTML 文档转换为 VitePress 站点
 * 用法: node scripts/convert_to_vitepress.mjs
 */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const OUT_DIR = 'docs';
const OFFLINE_DIR = 'offline';
const MODULES = ['zh', 'agent_zh', 'outcomes_zh', 'broker_zh', 'trick_zh', 'log_zh'];

// 模块中文名映射
const MODULE_NAMES = {
  zh: 'API 接口',
  agent_zh: 'Agent',
  outcomes_zh: 'Outcomes',
  broker_zh: 'Broker 接入',
  trick_zh: '最佳实践',
  log_zh: '更新日志',
};

// 清理输出目录
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

// ========== VitePress 配置构建 ==========
const sidebar = {};
const nav = [];

// ========== HTML → MD 转换器 ==========
const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  hr: '---',
});

// 表格处理：保留原始格式
td.keep('table');
td.keep('thead');
td.keep('tbody');
td.keep('tr');
td.keep('th');
td.keep('td');

// 将 aside 转为 VitePress 自定义容器
td.addRule('aside', {
  filter: 'aside',
  replacement: (content, node) => {
    const cls = node.getAttribute('class') || '';
    if (cls.includes('warning')) {
      return `\n\n::: warning\n${content.trim()}\n:::\n\n`;
    }
    if (cls.includes('notice')) {
      return `\n\n::: tip\n${content.trim()}\n:::\n\n`;
    }
    return content;
  }
});

// 代码块处理 - 保留语言标识
td.addRule('codeBlock', {
  filter: (node) => {
    return node.nodeName === 'PRE' && node.querySelector('code');
  },
  replacement: (content, node) => {
    const code = node.querySelector('code');
    if (!code) return content;

    // 获取所有 class
    const classList = code.className.split(' ');
    // 查找语言类别（排除 tab-xxx 类）
    const langClass = classList.find(c => c !== 'highlight' && !c.startsWith('tab-'));
    const lang = langClass || '';

    // 获取纯文本内容
    const text = code.textContent;

    return `\n\n\`\`\`${lang}\n${text.trim()}\n\`\`\`\n\n`;
  }
});

// ========== 处理每个模块 ==========
for (const mod of MODULES) {
  console.log(`\n=== Processing: ${mod} (${MODULE_NAMES[mod]}) ===`);

  const htmlPath = path.join(OFFLINE_DIR, `${mod}.html`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 提取内容区域
  const contentDiv = doc.querySelector('.content');
  if (!contentDiv) {
    console.log(`  WARNING: No .content found for ${mod}`);
    // 为空模块创建简单的占位页
    const modDir = path.join(OUT_DIR, mod);
    fs.mkdirSync(modDir, { recursive: true });
    const simpleContent = `---
title: ${MODULE_NAMES[mod]}
outline: deep
---

# ${MODULE_NAMES[mod]}

暂无内容。
`;
    fs.writeFileSync(path.join(modDir, 'index.md'), simpleContent, 'utf-8');
    sidebar[`/${mod}/`] = [];
    nav.push({ text: MODULE_NAMES[mod], link: `/${mod}/` });
    continue;
  }

  // 按 h1 分割内容
  const modDir = path.join(OUT_DIR, mod);
  fs.mkdirSync(modDir, { recursive: true });

  // 克隆内容以便操作
  const contentClone = contentDiv.cloneNode(true);

  // 清理无用元素
  contentClone.querySelectorAll('script, style, .copy-clipboard, .dark-box').forEach(el => el.remove());

  // 获取所有 h1 来构建边界
  const h1Headings = contentClone.querySelectorAll('h1[id]');

  // 按 h1 分组
  const sections = [];
  if (h1Headings.length === 0) {
    // 没有 h1 的页面，整体作为一页
    const firstId = contentClone.querySelector('[id]')?.id || 'index';
    sections.push({ id: firstId, title: MODULE_NAMES[mod], html: contentClone.innerHTML });
  } else {
    for (const h1 of h1Headings) {
      const section = { id: h1.id, title: h1.textContent.trim(), html: '' };
      const sectionElements = [];
      let el = h1;
      while (el) {
        sectionElements.push(el);
        el = el.nextElementSibling;
        if (el && el.tagName === 'H1') break;
      }
      section.html = sectionElements.map(e => e.outerHTML).join('\n');
      sections.push(section);
    }
  }

  // 构建 h1 id → filename 映射
  const h1IdToFilename = {};
  const filenames = [];
  for (const s of sections) {
    const fn = s.id.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/^-+|-+$/g, '') || 'index';
    h1IdToFilename[s.id] = fn;
    filenames.push(fn);
  }

  // 提取侧边栏结构（使用正确的 h1 文件名）
  const toc = doc.querySelector('#toc');
  const moduleItems = [];
  if (toc) {
    const h1Links = toc.querySelectorAll(':scope > li > a.toc-h1');
    h1Links.forEach(h1a => {
      const h1HrefRaw = h1a.getAttribute('href'); // e.g. "#overview"
      const h1Id = h1HrefRaw.replace('#', '');
      const h1FileName = h1IdToFilename[h1Id] || h1Id;
      const h1Title = (h1a.getAttribute('data-title') || h1a.textContent).trim();
      const h1Item = { text: h1Title, link: `/${mod}/${h1FileName}`, items: [] };

      // 获取 h2 子项 → 使用锚点链接指向父 h1 页面
      const h2Ul = h1a.parentElement.querySelector(':scope > ul.toc-list-h2');
      if (h2Ul) {
        const h2Links = h2Ul.querySelectorAll(':scope > li > a.toc-h2');
        h2Links.forEach(h2a => {
          const h2Href = h2a.getAttribute('href'); // e.g. "#overview-general-info"
          const h2Title = (h2a.getAttribute('data-title') || h2a.textContent).trim();
          const h2Item = { text: h2Title, link: `/${mod}/${h1FileName}${h2Href}` };
          h1Item.items.push(h2Item);
        });
      }

      moduleItems.push(h1Item);
    });
  }
  sidebar[`/${mod}/`] = moduleItems;

  // nav 使用第一个 section 的文件名
  const firstFile = filenames[0] || 'index';
  nav.push({ text: MODULE_NAMES[mod], link: `/${mod}/${firstFile}` });

  // 写入每个 section 为 .md 文件
  for (const section of sections) {
    const fileName = h1IdToFilename[section.id] || 'index';
    let mdContent = td.turndown(section.html);

    // 修复跨模块链接: xx_zh.html#anchor -> /xx_zh/anchor
    for (const m of MODULES) {
      mdContent = mdContent.replace(
        new RegExp(`\\(${m}\\.html#([^)]+)\\)`, 'g'),
        `(/${m}/$1)`
      );
      mdContent = mdContent.replace(
        new RegExp(`\\(${m}\\.html\\)`, 'g'),
        `(/${m}/)`
      );
    }

    // 移除 turndown 自动生成的 h1（VitePress 从 frontmatter 渲染标题）
    mdContent = mdContent.replace(/^# .+\n\n/, '');

    const mdPath = path.join(modDir, `${fileName}.md`);

    // 添加 frontmatter
    const frontmatter = `---
title: ${section.title}
outline: deep
---

${mdContent}
`;

    fs.writeFileSync(mdPath, frontmatter, 'utf-8');
    console.log(`  -> ${mod}/${fileName}.md (${section.title})`);
  }

  // 生成 index.md 重定向到第一个 section
  const firstSection = sections[0];
  const firstFileName = h1IdToFilename[firstSection.id] || 'index';
  const indexPath = path.join(modDir, 'index.md');
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `---
redirect: /${mod}/${firstFileName}
---`, 'utf-8');
  }
}

// ========== 生成 VitePress 配置 ==========
const configJs = `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OKX API v5 文档',
  description: 'OKX API v5 中文技术文档',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  
  themeConfig: {
    nav: [
      ${nav.map(n => `{ text: '${n.text}', link: '${n.link}' }`).join(',\n      ')}
    ],
    
    sidebar: ${JSON.stringify(sidebar, null, 6)},
    
    outline: {
      level: [2, 3],
      label: '本页导航',
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    
    lastUpdated: {
      text: '最后更新',
    },
    
    search: {
      provider: 'local',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: false,
  },
})
`;

const configPath = path.join(OUT_DIR, '.vitepress');
fs.mkdirSync(configPath, { recursive: true });
fs.writeFileSync(path.join(configPath, 'config.js'), configJs, 'utf-8');
console.log('\n-> VitePress config generated');

console.log(`\n=== Done! ===`);
console.log(`Run: npm run docs:dev`);
