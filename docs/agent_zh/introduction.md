---
title: 简介
outline: deep
---

OKX Agent Trade Kit 将 AI 助手与您的 OKX 账户直接连接。无需在 AI 和交易所之间来回切换，只需用自然语言描述您的需求，AI 即可自动执行。  
  

它以**本地进程**的方式运行在您的设备上。您的 API Key 永远不会离开本地。完全开源，遵循 MIT 协议。  
  

**OKX 官方 AI 智能交易工具包。** 让您的 AI Agent通过自然语言，在 [OKX](https://www.okx.com) 上交易现货、合约、期权等多种产品。

[GitHub](https://github.com/okx/agent-trade-kit) · [npm: okx-trade-mcp](https://www.npmjs.com/package/okx-trade-mcp) · [npm: okx-trade-cli](https://www.npmjs.com/package/okx-trade-cli)

> **本页内容可能未反映最新版本。** 如需查看最新工具列表、模块说明、配置选项及更新日志，请以 GitHub 仓库为准：[github.com/okx/agent-trade-kit](https://github.com/okx/agent-trade-kit)

## 支持哪些功能？

1.  **行情数据** — 价格、订单簿、K线、资金费率、持仓量
2.  **现货交易** — 下单、撤单、改单、批量操作、策略委托
3.  **合约与永续** — 永续合约和交割合约、杠杆、持仓管理
4.  **期权** — 下单、期权链、希腊字母（IV、Delta、Gamma、Theta、Vega）
5.  **策略委托** — 条件单、OCO 止盈止损、追踪止损
6.  **账户** — 余额、账单、手续费率、仓位管理
7.  **机器人** — 创建、监控和停止网格策略

## 三种使用方式

*   **MCP 服务器（`okx-trade-mcp`）** — 接入 Claude、Cursor、Codex、OpenCode 或任意支持 MCP 的 AI 客户端，让您的 Agent 通过自然语言调用 OKX 工具。
*   **CLI（`okx-trade-cli`）** — 在终端直接交易，支持管道、定时任务和脚本，无需 AI 客户端。
*   **Skills（`okx-cex-market`、`okx-cex-trade`、`okx-cex-portfolio`、`okx-cex-bot`）** — 即插即用模块，适用于支持 Skills 协议的 AI 客户端（如 OpenClaw）。按需安装，灵活搭配。

**本页导航：** [OpenClaw](/agent_zh/quick-start-openclaw) · [MCP 客户端](/agent_zh/quick-start-mcp-clients) · [MCP 服务器](/agent_zh/mcp) · [命令行](/agent_zh/cli) · [Skills](/agent_zh/skills) · [安全](/agent_zh/safety) · [常见问题](/agent_zh/faq)
