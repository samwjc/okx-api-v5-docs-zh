---
title: MCP
outline: deep
---

MCP 服务器通过 [Model Context Protocol](https://modelcontextprotocol.io) 标准向外暴露 OKX 交易工具。注册一次后，您的 AI Agent即可进行交易、查询和账户管理。

## 启动选项

<table><thead><tr><th>使用场景</th><th>命令</th></tr></thead><tbody><tr><td>仅行情数据（无需 Key）</td><td><code>okx-trade-mcp --modules market</code></td></tr><tr><td>模拟盘，全功能</td><td><code>okx-trade-mcp --profile demo --modules all</code></td></tr><tr><td>实盘，只读监控</td><td><code>okx-trade-mcp --profile live --read-only</code></td></tr><tr><td>实盘，仅现货</td><td><code>okx-trade-mcp --profile live --modules market,spot</code></td></tr><tr><td>实盘，永续 + 期权</td><td><code>okx-trade-mcp --profile live --modules market,swap,option</code></td></tr></tbody></table>

对于未列出的 MCP 客户端，可通过以下命令将其注册为 stdio 服务器：

```
okx-trade-mcp --profile <demo|live> --modules <all|market|spot|swap|...>
```

## 工具列表

`market` 模块无需 API Key。其他模块均需要 **读取** 权限；写入操作还需额外开启 **交易** 权限。

### market — 行情数据

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>market_get_ticker</code></td><td>单币对行情（最新价、24h 量、买一/卖一）</td></tr><tr><td><code>market_get_tickers</code></td><td>某类型全部行情（SPOT / SWAP / FUTURES / OPTION）</td></tr><tr><td><code>market_get_orderbook</code></td><td>盘口深度</td></tr><tr><td><code>market_get_candles</code></td><td>K线（最近 300 根）</td></tr><tr><td><code>market_get_history_candles</code></td><td>历史K线（2天前，最多3个月）</td></tr><tr><td><code>market_get_index_ticker</code></td><td>指数行情（如 BTC-USD）</td></tr><tr><td><code>market_get_index_candles</code></td><td>指数K线</td></tr><tr><td><code>market_get_price_limit</code></td><td>合约涨跌停价</td></tr><tr><td><code>market_get_funding_rate</code></td><td>永续合约当前资金费率</td></tr><tr><td><code>market_get_funding_rate_history</code></td><td>历史资金费率</td></tr><tr><td><code>market_get_mark_price</code></td><td>衍生品标记价格</td></tr><tr><td><code>market_get_open_interest</code></td><td>持仓量</td></tr><tr><td><code>market_get_trades</code></td><td>最新成交记录</td></tr></tbody></table>

### spot — 现货交易

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>spot_place_order</code></td><td>下现货单（市价、限价、Post-only、FOK、IOC）</td></tr><tr><td><code>spot_cancel_order</code></td><td>撤销挂单</td></tr><tr><td><code>spot_amend_order</code></td><td>改价或改量</td></tr><tr><td><code>spot_batch_place_orders</code></td><td>批量下单（最多20笔）</td></tr><tr><td><code>spot_batch_cancel_orders</code></td><td>批量撤单</td></tr><tr><td><code>spot_get_order</code></td><td>查询单笔订单详情</td></tr><tr><td><code>spot_get_open_orders</code></td><td>查询当前挂单</td></tr><tr><td><code>spot_get_order_history</code></td><td>历史订单（7天内）</td></tr><tr><td><code>spot_get_order_history_archive</code></td><td>历史订单（7天前，最多3个月）</td></tr><tr><td><code>spot_get_fills</code></td><td>最新成交记录</td></tr><tr><td><code>spot_get_fills_archive</code></td><td>较早成交记录（1小时前，最多3个月）</td></tr></tbody></table>

### swap — 永续合约

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>swap_place_order</code></td><td>下永续合约单</td></tr><tr><td><code>swap_cancel_order</code></td><td>撤销挂单</td></tr><tr><td><code>swap_amend_order</code></td><td>改价或改量</td></tr><tr><td><code>swap_batch_place_orders</code></td><td>批量下单（最多20笔）</td></tr><tr><td><code>swap_batch_cancel_orders</code></td><td>批量撤单</td></tr><tr><td><code>swap_close_position</code></td><td>一键平仓（指定合约）</td></tr><tr><td><code>swap_get_order</code></td><td>查询单笔订单详情</td></tr><tr><td><code>swap_get_open_orders</code></td><td>查询当前挂单</td></tr><tr><td><code>swap_get_order_history</code></td><td>历史订单（7天内）</td></tr><tr><td><code>swap_get_positions</code></td><td>当前持仓</td></tr><tr><td><code>swap_get_fills</code></td><td>最新成交记录</td></tr><tr><td><code>swap_set_leverage</code></td><td>设置杠杆倍数</td></tr><tr><td><code>swap_get_leverage</code></td><td>查询当前杠杆设置</td></tr></tbody></table>

### futures — 交割合约

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>futures_place_order</code></td><td>下交割合约单</td></tr><tr><td><code>futures_cancel_order</code></td><td>撤销挂单</td></tr><tr><td><code>futures_amend_order</code></td><td>改价或改量</td></tr><tr><td><code>futures_get_order</code></td><td>查询单笔订单详情</td></tr><tr><td><code>futures_get_open_orders</code></td><td>查询当前挂单</td></tr><tr><td><code>futures_get_order_history</code></td><td>历史订单</td></tr><tr><td><code>futures_get_positions</code></td><td>当前持仓</td></tr><tr><td><code>futures_get_fills</code></td><td>最新成交记录</td></tr></tbody></table>

### option — 期权

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>option_place_order</code></td><td>期权下单（买入/卖出 call 或 put）</td></tr><tr><td><code>option_cancel_order</code></td><td>撤销挂单</td></tr><tr><td><code>option_batch_cancel</code></td><td>批量撤单（最多 20 条）</td></tr><tr><td><code>option_amend_order</code></td><td>改价或改量</td></tr><tr><td><code>option_get_order</code></td><td>查询单笔订单详情</td></tr><tr><td><code>option_get_orders</code></td><td>查询挂单或历史订单</td></tr><tr><td><code>option_get_positions</code></td><td>当前持仓（含 Greeks）</td></tr><tr><td><code>option_get_fills</code></td><td>成交记录</td></tr><tr><td><code>option_get_instruments</code></td><td>期权链（可用合约列表）</td></tr><tr><td><code>option_get_greeks</code></td><td>每个合约的 IV + Greeks（delta、gamma、theta、vega）</td></tr></tbody></table>

### account — 账户管理

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>account_get_balance</code></td><td>交易账户余额（指定币种或全部）</td></tr><tr><td><code>account_get_asset_balance</code></td><td>资金账户余额</td></tr><tr><td><code>account_get_positions</code></td><td>当前所有持仓</td></tr><tr><td><code>account_get_positions_history</code></td><td>历史持仓记录</td></tr><tr><td><code>account_get_bills</code></td><td>账单流水（7天内）</td></tr><tr><td><code>account_get_bills_archive</code></td><td>账单流水（7天前，最多3个月）</td></tr><tr><td><code>account_get_fee_rates</code></td><td>交易手续费率</td></tr><tr><td><code>account_get_config</code></td><td>账户配置（仓位模式、账户层级等）</td></tr><tr><td><code>account_set_position_mode</code></td><td>切换单向/双向持仓模式</td></tr><tr><td><code>account_get_max_size</code></td><td>指定合约的最大可开仓量</td></tr><tr><td><code>account_get_max_withdrawal</code></td><td>各币种最大可提余额</td></tr><tr><td><code>account_get_leverage</code></td><td>查询杠杆设置</td></tr><tr><td><code>account_set_leverage</code></td><td>设置杠杆（全局）</td></tr><tr><td><code>account_get_audit_log</code></td><td>查询本地工具调用审计日志</td></tr></tbody></table>

### bot — 策略机器人

**网格（`bot.grid`）**

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>grid_get_orders</code></td><td>列出运行中或历史网格机器人</td></tr><tr><td><code>grid_get_order_details</code></td><td>查询指定机器人的详情</td></tr><tr><td><code>grid_get_sub_orders</code></td><td>列出机器人子订单</td></tr><tr><td><code>grid_create_order</code></td><td>创建网格机器人（现货、合约或 Moon Grid）</td></tr><tr><td><code>grid_stop_order</code></td><td>停止运行中的机器人</td></tr></tbody></table>

**DCA（`bot.dca`）**

<table><thead><tr><th>工具</th><th>说明</th></tr></thead><tbody><tr><td><code>dca_create_order</code></td><td>创建 DCA（马丁格尔）机器人</td></tr><tr><td><code>dca_stop_order</code></td><td>停止 DCA 策略</td></tr><tr><td><code>dca_get_orders</code></td><td>列出运行中或历史 DCA 策略</td></tr><tr><td><code>dca_get_order_details</code></td><td>查询单个 DCA 策略详情</td></tr><tr><td><code>dca_get_sub_orders</code></td><td>列出 DCA 策略生成的子订单</td></tr></tbody></table>
