---
title: 命令行
outline: deep
---

命令行工具是独立的终端工具，无需 AI 客户端。

```
# 行情数据
okx market ticker BTC-USDT
okx market candles BTC-USDT --bar 1H --limit 10
okx market funding-rate BTC-USDT-SWAP

# 交易
okx spot place --instId BTC-USDT --side buy --ordType market --sz 100
okx swap place --instId BTC-USDT-SWAP --side buy --ordType market --sz 1 --posSide long --tdMode cross

# 账户
okx account balance
okx account positions

# 网格机器人
okx --demo bot grid create --instId BTC-USDT --algoOrdType grid \
  --maxPx 100000 --minPx 80000 --gridNum 10 --quoteSz 100

# 管道与脚本
okx account balance --json | jq '.[] | {ccy: .ccy, eq: .eq}'
okx market candles BTC-USDT --bar 1H --limit 200 --json | python3 analyze.py
```

**[完整 CLI 参考文档 →](https://github.com/okx/agent-trade-kit/blob/master/docs/cli-reference.md)**
