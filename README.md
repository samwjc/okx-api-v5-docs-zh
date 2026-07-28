# OKX API v5 中文文档镜像

**源站点**：[https://www.okx.com/docs-v5/zh](https://www.okx.com/docs-v5/zh)

## 说明

本仓库用于存储 OKX API v5 中文完整技术文档的镜像。

由于官方文档为单页 SPA（单页应用），内容体积非常大（工具检测到超过 **85,000 行**），并且是动态渲染的，当前爬虫工具无法一次性返回完整原文内容（会被截断）。

### 推荐的全量下载方式

1. **浏览器直接保存**（最简单）：
   - 打开 [https://www.okx.com/docs-v5/zh](https://www.okx.com/docs-v5/zh)
   - 使用浏览器扩展：
     - [SingleFile](https://github.com/gildas-lormeau/SingleFile)
     - Save Page WE
     - 或 Chrome 的「另存为」 → 网页，完整

2. **使用 wget / httrack**（本地）：
   ```bash
   # 示例（可能需要处理 JS 渲染）
   wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://www.okx.com/docs-v5/zh/
   ```

3. **官方英文版**：[https://www.okx.com/docs-v5/en](https://www.okx.com/docs-v5/en)

### 仓库目录结构（TOC 摘要）

- 概览
- 交易账户 (REST API)
- 撮合交易（下单、撤单、策略、网格、马丁、信号交易等）
- WebSocket 频道
- 公共数据
- 资金
- 子账户
- 经纪商
- 错误码
- 等等

### 更新记录

- 2026-07-27：创建仓库 + README

---

**声明**：  
本仓库仅供学习与离线参考，所有内容版权归 **OKX** 所有。  
请始终以官方文档为准。
