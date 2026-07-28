/**
 * OKX API v5 中文文档离线更新脚本
 * 用法: npm run docs:update
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

// ========== 配置 ==========
const BASE = 'https://www.okx.com/docs-v5';

const MODULES = [
  { name: 'zh',           url: `${BASE}/zh` },
  { name: 'agent_zh',     url: `${BASE}/agent_zh` },
  { name: 'outcomes_zh',  url: `${BASE}/outcomes_zh` },
  { name: 'broker_zh',    url: `${BASE}/broker_zh` },
  { name: 'trick_zh',     url: `${BASE}/trick_zh` },
  { name: 'log_zh',       url: `${BASE}/log_zh` },
];

// 各页面共享的静态资源（通过主站路径下载）
const SHARED_ASSETS = [
  { type: 'css', rel: 'stylesheets/screen-a5d12b54.css' },
  { type: 'css', rel: 'stylesheets/print-2731ee0a.css' },
  { type: 'js',  rel: 'javascripts/all_nosearch-0bdd0505.js' },
  { type: 'img', rel: 'images/navbar-cad8cdcb.png' },
];

// 需要额外下载的外部文件
const EXTRA_FILES = [
  {
    url: `${BASE}/log_zh/xml/okx_sbe_1_0.xml`,
    local: 'xml/okx_sbe_1_0.xml',
    linkFix: { from: '/docs-v5/log_zh/xml/okx_sbe_1_0.xml', to: 'xml/okx_sbe_1_0.xml' },
  },
];

const OUT_DIR = 'offline';

// ========== 工具函数 ==========
function mime(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const map = { css:'text/css', js:'application/javascript', png:'image/png',
                jpeg:'image/jpeg', jpg:'image/jpeg', svg:'image/svg+xml',
                gif:'image/gif', webp:'image/webp', xml:'application/xml' };
  return map[ext] || 'application/octet-stream';
}

// ========== 主流程 ==========
async function main() {
  // 清理并创建输出目录
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const startTime = Date.now();

  // ---- Step 1: 下载共享资源 ----
  console.log('[1/5] Downloading shared assets...');
  const assetData = {};
  for (const a of SHARED_ASSETS) {
    const url = `${BASE}/zh/${a.rel}`;
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      if (!resp?.ok()) {
        console.log(`  SKIP ${a.rel}: HTTP ${resp?.status()}`);
        continue;
      }
      if (a.type === 'img') {
        const buf = await resp.buffer();
        assetData[a.rel] = { type: 'img', data: `data:${mime(a.rel)};base64,${buf.toString('base64')}` };
        console.log(`  ${a.rel} (${(buf.length/1024).toFixed(1)} KB)`);
      } else {
        const text = await resp.text();
        assetData[a.rel] = { type: a.type, data: text };
        console.log(`  ${a.rel} (${(text.length/1024).toFixed(1)} KB)`);
      }
    } catch (e) {
      console.log(`  FAIL ${a.rel}: ${e.message}`);
    }
  }

  // ---- Step 2: 下载所有模块页面 ----
  console.log('\n[2/5] Downloading pages...');
  const pageHtml = {};
  for (const mod of MODULES) {
    console.log(`  ${mod.name} (${mod.url})`);
    await page.goto(mod.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 4000));
    let html = await page.content();
    console.log(`    -> ${(html.length/1024/1024).toFixed(2)} MB`);

    // 内联共享资源
    for (const a of SHARED_ASSETS) {
      const info = assetData[a.rel];
      if (!info) continue;

      if (info.type === 'css') {
        const screen = `<link href="${a.rel}" rel="stylesheet" media="screen">`;
        const print = `<link href="${a.rel}" rel="stylesheet" media="print">`;
        const mediaAttr = a.rel.includes('print') ? ' media="print"' : '';
        const style = `<style${mediaAttr}>${info.data}</style>`;
        if (html.includes(screen)) html = html.replace(screen, style);
        else if (html.includes(print)) html = html.replace(print, style);
      } else if (info.type === 'js') {
        const old = `<script src="${a.rel}"></script>`;
        if (html.includes(old)) html = html.replace(old, `<script>${info.data}</script>`);
      } else if (info.type === 'img') {
        html = html.replaceAll(`src="${a.rel}"`, `src="${info.data}"`);
      }
    }

    // 处理页面内嵌的图片（相对路径 + CDN）
    const imgUrls = [];
    const localImgRe = /src="(images\/[^"]+)"/g;
    const cdnImgRe = /src="(https:\/\/static\.coinall\.ltd\/[^"]+)"/g;
    let m;
    while ((m = localImgRe.exec(html)) !== null) imgUrls.push(m[1]);
    while ((m = cdnImgRe.exec(html)) !== null) imgUrls.push(m[1]);

    for (const imgUrl of imgUrls) {
      const absUrl = imgUrl.startsWith('http') ? imgUrl : `${BASE}/zh/${imgUrl}`;
      try {
        const resp = await page.goto(absUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        if (!resp?.ok()) continue;
        const buf = await resp.buffer();
        const b64 = `data:${mime(imgUrl)};base64,${buf.toString('base64')}`;
        html = html.replaceAll(`src="${imgUrl}"`, `src="${b64}"`);
      } catch (e) { /* skip failed images */ }
    }

    // 处理 favicon
    const favRe = /href="(https:\/\/static\.coinall\.ltd\/[^"]+\.png)"[^>]*rel="[^"]*icon[^"]*"/gi;
    while ((m = favRe.exec(html)) !== null) {
      try {
        const resp = await page.goto(m[1], { waitUntil: 'networkidle0', timeout: 15000 });
        if (!resp?.ok()) continue;
        const buf = await resp.buffer();
        html = html.replace(m[1], `data:image/png;base64,${buf.toString('base64')}`);
      } catch (e) { /* skip */ }
    }

    // 修正模块检测逻辑（pathArr[1] → 从文件名提取）
    html = html.replace(
      'var moduleType = pathArr[1];',
      "var moduleType = pathArr[0].replace('.html', '');"
    );

    pageHtml[mod.name] = html;
  }

  // ---- Step 3: 修正交叉引用链接 ----
  console.log('\n[3/5] Fixing cross-module links...');
  const moduleNames = MODULES.map(m => m.name);

  for (const name of moduleNames) {
    let html = pageHtml[name];

    for (const mod of moduleNames) {
      const to = `${mod}.html`;
      // /docs-v5/mod/#xxx -> mod.html#xxx
      html = html.replace(new RegExp(`href="/docs-v5/${mod}/#`, 'g'), `href="${to}#`);
      // /docs-v5/mod#xxx -> mod.html#xxx
      html = html.replace(new RegExp(`href="/docs-v5/${mod}#`, 'g'), `href="${to}#`);
      // /docs-v5/mod (精确匹配)
      html = html.replace(new RegExp(`href="/docs-v5/${mod}"`, 'g'), `href="${to}"`);
      // /docs-v5/mod/ (末尾斜杠)
      html = html.replace(new RegExp(`href="/docs-v5/${mod}/"`, 'g'), `href="${to}"`);
      // /docs-v5/zh/xxx -> zh.html#xxx (主文档子章节链接)
      if (mod === 'zh') {
        html = html.replace(new RegExp(`href="/docs-v5/zh/([^"]+)"`, 'g'), (_, sub) => `href="zh.html#${sub}"`);
      }
      // 完整 URL 变体
      html = html.replace(new RegExp(`href="https://www\\.okx\\.com/docs-v5/${mod}/#`, 'g'), `href="${to}#`);
      html = html.replace(new RegExp(`href="https://www\\.okx\\.com/docs-v5/${mod}#`, 'g'), `href="${to}#`);
      html = html.replace(new RegExp(`href="https://www\\.okx\\.com/docs-v5/${mod}"`, 'g'), `href="${to}"`);
    }

    pageHtml[name] = html;
  }

  // ---- Step 4: 写入文件 ----
  console.log('\n[4/5] Writing files...');
  for (const name of moduleNames) {
    const filePath = path.join(OUT_DIR, `${name}.html`);
    fs.writeFileSync(filePath, pageHtml[name], 'utf-8');
    const size = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    console.log(`  ${name}.html (${size} MB)`);
  }

  // ---- Step 5: 下载额外文件 ----
  console.log('\n[5/5] Downloading extra files...');
  for (const file of EXTRA_FILES) {
    console.log(`  ${file.url}`);
    try {
      const resp = await page.goto(file.url, { waitUntil: 'networkidle0', timeout: 30000 });
      if (!resp?.ok()) { console.log(`    -> HTTP ${resp.status()}, skip`); continue; }

      const buf = await resp.buffer();
      const localPath = path.join(OUT_DIR, file.local);
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(localPath, buf);
      console.log(`    -> ${file.local} (${(buf.length/1024).toFixed(1)} KB)`);

      // 修正指向该文件的链接
      for (const name of moduleNames) {
        pageHtml[name] = pageHtml[name].replaceAll(
          `href="${file.linkFix.from}"`,
          `href="${file.linkFix.to}"`
        );
      }
      // 重新写入受影响的 HTML
      for (const name of moduleNames) {
        if (pageHtml[name].includes(file.linkFix.to)) {
          fs.writeFileSync(path.join(OUT_DIR, `${name}.html`), pageHtml[name], 'utf-8');
        }
      }
    } catch (e) {
      console.log(`    -> FAIL: ${e.message}`);
    }
  }

  // ---- 验证 ----
  console.log('\n=== Verification ===');
  let clean = 0;
  for (const name of moduleNames) {
    const html = fs.readFileSync(path.join(OUT_DIR, `${name}.html`), 'utf-8');
    const remaining = html.match(/href="\/docs-v5\/(zh|agent_zh|outcomes_zh|broker_zh|trick_zh|log_zh)/g) || [];
    if (remaining.length === 0) {
      clean++;
    } else {
      console.log(`  ${name}.html: ${remaining.length} unresolved links`);
    }
  }

  await browser.close();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\nDone in ${elapsed}s. All modules clean: ${clean}/${moduleNames.length}`);
  console.log(`Open: ${OUT_DIR}/zh.html`);
}

main().catch(e => {
  console.error('Update failed:', e);
  process.exit(1);
});
