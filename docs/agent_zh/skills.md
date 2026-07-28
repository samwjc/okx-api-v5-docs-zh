---
title: Skills
outline: deep
---

Skills 是即插即用模块，适用于支持 [Skills 协议](https://github.com/okx/agent-skills)的 AI 客户端。按需安装，支持单一或组合使用。

```
npx skills add okx/agent-skills
```

<table><thead><tr><th>Skill</th><th>包名</th><th>说明</th><th>鉴权</th></tr></thead><tbody><tr><td>行情数据</td><td><code>okx-cex-market</code></td><td>实时获取最新行情、盘口深度、K线走势、资金费率、持仓量及指数数据。</td><td>公开 · 无需 API Key</td></tr><tr><td>交易</td><td><code>okx-cex-trade</code></td><td>支持现货、合约、期权及算法订单。一键下单、撤单、改单及批量操作，更支持 OCO、移动止盈止损及网格策略。</td><td>需要 API Key</td></tr><tr><td>资产组合</td><td><code>okx-cex-portfolio</code></td><td>追踪账户余额、当前持仓、收益明细、账单历史、费率等级与资金划转。只需一个 Skill，全盘资产尽在掌握。</td><td>需要 API Key</td></tr><tr><td>机器人</td><td><code>okx-cex-bot</code></td><td>自动化交易策略：现货网格、合约网格和定投（DCA）机器人。</td><td>需要 API Key</td></tr></tbody></table>

[前往 GitHub 探索全部 Skills →](https://github.com/okx/agent-skills)
