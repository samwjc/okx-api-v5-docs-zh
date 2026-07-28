---
title: 订单管理
outline: deep
---

## 交易模式

交易账户交易系统的全仓/逐仓设置更为弹性，用户可以同时以全仓和逐仓交易同一产品。因此，用户需要在下单时指定该订单的交易模式（`tdMode`字段）。

各种情景下`tdMode`所需的值：

<table><tbody><tr><th>持仓模式</th><th>产品类型</th><th>保证金模式</th><th>交易模式(tdMode)</th></tr><tr><td rowspan="2">现货模式</td><td>币币</td><td>(N/A)</td><td>cash</td></tr><tr><td>期权</td><td>(N/A)</td><td>cash</td></tr><tr><td rowspan="5">合约模式</td><td>币币</td><td>(N/A)</td><td>cash</td></tr><tr><td rowspan="2">币币杠杆</td><td>全仓</td><td>cross</td></tr><tr><td>逐仓</td><td>isolated</td></tr><tr><td rowspan="2">交割/永续/期权</td><td>全仓</td><td>cross</td></tr><tr><td>逐仓</td><td>isolated</td></tr><tr><td rowspan="4">跨币种保证金</td><td>币币/币币杠杆</td><td>全仓</td><td>cross</td></tr><tr><td>币币杠杆</td><td>逐仓</td><td>isolated</td></tr><tr><td rowspan="2">交割/永续/期权</td><td>全仓</td><td>cross</td></tr><tr><td>逐仓</td><td>isolated</td></tr></tbody></table>

**示例**

假设我们有以下的设置和订单需求：

*   账户模式：跨币种保证金
*   持仓模式：买卖模式
*   产品：BTC-USDT-SWAP
*   保证金模式：全仓
*   订单方向：买入（开多）
*   订单类型：限价单
*   委托价格：50,912.4 USDT
*   委托数量：1 张

查找上表得知`tdMode`字段应填上`cross`。

## 订阅订单频道

下单前，用户应先使用 WebSocket 订阅 [`订单`](/zh/order-book-trading-trade-ws-order-channel) 频道，这样才能够监察订单状态（如等待成交、完全成交）和作出相应的操作（如在完全成交后下新单）。

订单频道提供多种维度的订阅。要订阅以上 BTC-USDT-SWAP 订单的数据，用户可在连接到和登入私有 WebSocket 后，传送下表任一请求：

<table><tbody><tr><td></td><td><strong>产品类型</strong></td><td><strong>产品类型 + 交易品种</strong><strong><br></strong><strong>(仅限衍生产品)</strong></td><td><strong>产品类型 + 产品 ID</strong></td></tr><tr><td>请求</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr><tr><td>成功返回</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP"<br>&nbsp;&nbsp;}<br>}</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

用户亦可以把`instType`参数填上`ANY`，一次性订阅所有产品类型的订单更新。

注：订单频道不设首次订阅全量数据推送，只会在订单状态改变时（如由等待成交到撤单成功）推送该订单的更新。

换言之，用户无法在订阅订单频道时得知当时的订单数据。要获取订阅订单频道前未完成订单的数据，可通过以下的 REST API 查看：

[`GET /api/v5/trade/orders-pending`](/zh/order-book-trading-trade-get-order-list)

## 下单

为了系统能够更容易地识别订单，我们建议用户在下单时填上客户自定义订单 ID（`clOrdId`字段）。客户自定义订单 ID 需由字母与数字组成，区分大小写，最长 32 位。

`cloOrdId`唯一性检查仅适用于所有挂单，但我们扔推荐用户始终使用唯一的`cloOrdId`以便于故障排除等工作。

此示例我们会在`clOrdId`字段填上 `testBTC0123`。

在订阅订单频道后，用户便可以准备 `BTC-USDT-SWAP` 订单的下单。

用户可通过 REST 和 WebSocket 去下单。

### REST API

用户可以通过以下的 REST API 下单，服务器收到请求后会返回订单 ID（`ordId`）。

<table><tbody><tr><td>REST API</td><td>POST /api/v5/trade/order</td></tr><tr><td>请求体</td><td>{<br>&nbsp;&nbsp;"instId": "BTC-USDT-SWAP",<br>&nbsp;&nbsp;"tdMode": "cross",<br>&nbsp;&nbsp;"clOrdId": "testBTC0123",<br>&nbsp;&nbsp;"side": "buy",<br>&nbsp;&nbsp;"ordType": "limit",<br>&nbsp;&nbsp;"px": "50912.4",<br>&nbsp;&nbsp;"sz": "1"<br>}</td></tr><tr><td>成功返回</td><td>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"msg": "",<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clOrdId": "testBTC0123",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordId": "288981657420439575",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tag": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sCode": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sMsg": ""<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

注：这只代表交易所已成功收取请求，并把订单 ID 指派到该订单。此时订单有可能还没到撮合系统，用户需要进一步检查订单状态去确认。

### WebSocket

用户亦可以通过 WebSocket 下单，理论上比 REST 更有效率及节约资源。

由于 WebSocket 操作为异步通信，用户需要提供信息 ID（`id`）以便识别其返回。

于私有 WebSocket 登录后，传送以下 WebSocket 信息：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"id": "NEWtestBTC0123",<br>&nbsp;&nbsp;"op": "order",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tdMode": "cross",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clOrdId": "testBTC0123",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"side": "buy",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordType": "limit",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"px": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sz": "1"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

服务器收到请求后，会连同信息 ID（即 NEWtestBTC012）返回结果，并附上交易所指派的订单 ID（`ordId`）：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"id": "NEWtestBTC0123",<br>&nbsp;&nbsp;"op": "order",<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clOrdId": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordId": "288981657420439575",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tag": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sCode": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sMsg": ""<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"msg": ""<br>}</td></tr></tbody></table>

注：这只代表交易所已成功收取请求，并把订单 ID 指派到该订单。此时订单有可能还没到撮合系统，用户需要进一步检查订单状态去确认。

## 检查订单状态

下单后，若订单未返回任何错误 (`"sCode": "0"`)。用户会在 WebSocket 订单频道收到该订单状态为`live`的信息。

信息示例（以产品类型 + 交易品种维度订阅订单频道）：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"accFillSz": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amendResult": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avgPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"cTime": "1615170596148",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"category": "normal",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clOrdId": "testBTC0123",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fee": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"feeCcy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillSz": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillTime": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lever": "3",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"msg": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordId": "288981657420439575",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordType": "limit",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pnl": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"posSide": "net",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"px": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"rebate": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"rebateCcy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reqId": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"side": "buy",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"slOrdPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"slTriggerPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"state": "live",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sz": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tag": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tdMode": "cross",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tpOrdPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tpTriggerPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tradeId": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uTime": "1615170596148"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

订单完全成交后，用户会收到以下的推送信息示例，订单状态变更为`filled`，并填上其他有关成交的字段。

如果订单部分或全部成交，websocket将分别返回 `state` = `partially_filled` and `filled`。

对于立即成交并取消剩余（IOC）、全部成交或立即取消（FOK）以及仅挂单的订单（post only），这些订单可能会被撮合引擎拒绝，用户将收到`live`然后是`canceled`的状态。

用户订单可能会由于各种原因被系统取消，例如清算或自成交。用户可以参考 `cancelSource` 以确定订单被取消的原因。

一个订单的终止状态为`canceled`或`filled`。

订单的每一笔成交都会被系统赋予一个成交 ID (`tradeId`)，用于与持仓对账。

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "orders",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"accFillSz": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amendResult": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avgPx": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"cTime": "1615170596148",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"category": "normal",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clOrdId": "testBTC0123",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fee": "-0.1018248",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"feeCcy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillPx": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillSz": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fillTime": "1615170598021",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lever": "3",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"msg": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordId": "288981657420439575",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordType": "limit",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pnl": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"posSide": "net",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"px": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"rebate": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"rebateCcy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reqId": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"side": "buy",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"slOrdPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"slTriggerPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"state": "filled",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sz": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tag": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tdMode": "cross",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tpOrdPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tpTriggerPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tradeId": "60477021",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uTime": "1615170598022"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

可能的订单状态：

1.  在入口处被拒绝，`sCode`不为零，websocket订单频道无更新推送
2.  下单并立即全部成交： `live` -> `filled`
3.  下单并立即通过多笔交易成交： `live` -> `partially_filled` -> ... -> `filled`
4.  下单但立即被撮合引擎取消（如 IOC、FOK、仅挂单）： `live` -> `canceled` （取消原因可从 `cancelSource` 查询）
5.  下单为 IOC，部分成交后因价格深度不足而被系统取消： `live` -> `partially_filled` -> `canceled`

## 改单

改单接口支持所有产品类型的改单，允许用户修改订单的价格（`newPx`字段）和/或数量（`newSz`字段）。另外 API 也提供`cxlOnFail`参数，设置订单修改失败时自动撤单的操作。

REST:

[`POST /api/v5/trade/amend-order`](/zh/order-book-trading-trade-post-amend-order)

WebSocket 业务操作请求参数：

[`"op": "amend-order"`](/zh/order-book-trading-trade-ws-amend-order)

与下单相似，用户应会收到服务器相应 REST / WebSocket 的成功返回，然后于 WebSocket 订单频道收到已填上`amendResult`字段的订单推送更新。

注：订单完全成交或撤单已成功时不能改单。

成功响应仅表示交易所已收到该请求，用户应参考websocket订单频道以进行确认。

## 撤单

用户可以以类似的方式，通过 REST 或 WebSocket 撤单。

REST:

[`POST /api/v5/trade/cancel-order`](/zh/order-book-trading-trade-post-cancel-order)

WebSocket 业务操作请求参数：

[`"op": "cancel-order"`](/zh/order-book-trading-trade-ws-cancel-order)

同样，用户应会收到服务器相应 REST / WebSocket 的成功返回。当用户从 WebSocket 订单频道收到订单状态为 `canceled` 的推送更新时，才代表订单撤单成功。

注：订单完全成交或撤单已成功时不能撤单。

成功响应仅表示交易所已收到该请求，用户应参考websocket订单频道以进行确认。

## 批量操作

下单、改单、撤单均支持批量操作，每次最多 20 张订单。批量操作的订单可包括不同的产品类型。

REST:

<table><thead><tr><th style="text-align: left"></th><th style="text-align: left"></th></tr></thead><tbody><tr><td style="text-align: left">下单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-post-place-multiple-orders"><code>POST /api/v5/trade/batch-orders</code></a></td></tr><tr><td style="text-align: left">改单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-post-amend-multiple-orders"><code>POST /api/v5/trade/amend-batch-orders</code></a></td></tr><tr><td style="text-align: left">撤单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-post-cancel-multiple-orders"><code>POST /api/v5/trade/cancel-batch-orders</code></a></td></tr></tbody></table>

WebSocket 业务操作请求参数：

<table><thead><tr><th style="text-align: left"></th><th style="text-align: left"></th></tr></thead><tbody><tr><td style="text-align: left">下单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-ws-place-multiple-orders"><code>"op": "batch-orders"</code></a></td></tr><tr><td style="text-align: left">改单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-ws-amend-multiple-orders"><code>"op": "batch-amend-orders"</code></a></td></tr><tr><td style="text-align: left">撤单</td><td style="text-align: left"><a href="zh.html#order-book-trading-trade-ws-cancel-multiple-orders"><code>"op": "batch-cancel-orders"</code></a></td></tr></tbody></table>

批量操作容许部分订单操作成功。在收到返回后，用户应检查返回结果内每个订单的`sCode`和`sMsg`字段来判段订单的执行结果。

## 订单时间戳

订单数据中有多个时间戳，供用户跟踪订单状态和延迟。

`cTime` 是订单管理系统在风险检查后的订单创建时间。  
`uTime` 是订单管理系统最后一次更新订单的时间。在订单修改、成交和取消后进行更新。  
`fillTime` 是订单成交的时间。`fillTime` 与公共交易数据的时间相同。  
`inTime` 是 WebSocket / REST 网关接收请求时的时间戳。REST接口返回的时间是请求验证后的时间。  
`outTime` 是 WebSocket / REST 网关发送响应时的时间戳。

## 分页

欧易提供分页功能，以帮助用户从海量数据中轻松获得他们想要的数据。相关的请求参数如下：

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>before</td><td>String</td><td>否</td><td>请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code>, <code>billId</code>, <code>tradeId</code>, <code>ts</code> etc.</td></tr><tr><td>after</td><td>String</td><td>否</td><td>请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code>, <code>billId</code>, <code>tradeId</code>, <code>ts</code> etc.</td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

请参阅以下功能提示及示例，以便更好地理解该功能。假设原始数据为 \[10, 9, 8, 7, 6, 5, 4, 3, 2, 1\]。

<table><thead><tr><th>提示</th><th>示例</th></tr></thead><tbody><tr><td>无论用户如何输入请求参数，总是返回最新数据</td><td>我们总是在最开始返回新数据，例如 [10, 9, 8, 7, ...]</td></tr><tr><td>分页时，不包含before以及after</td><td>若 before=6，after=10，返回的数据将会是 [9, 8, 7]</td></tr><tr><td>若before及after之间的数据量超过limit，返回靠近after的数据记录</td><td>若 before=2，after=9，limit=3，返回的数据将会是 [8, 7, 6]</td></tr><tr><td>若仅传入before，不传入after，靠近before的数据将被返回</td><td>若 before=6，limit=3，返回的数据将会是 [9, 8, 7]<br><br>该功能不适用于仓位历史接口，相同参数，仓位历史接口将返回 [10, 9, 8]，不靠近before返回</td></tr></tbody></table>

  
为了获取特定时间范围内的数据，我们还提供了时间戳过滤功能，应用于before/after已被用于ID分页的场景。请求参数如下：

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>begin</td><td>String</td><td>No</td><td>筛选的开始时间戳，Unix 时间戳为毫秒数格式，如 1597026383085</td></tr><tr><td>end</td><td>String</td><td>No</td><td>筛选的结束时间戳，Unix 时间戳为毫秒数格式，如 1597027383085</td></tr><tr><td>limit</td><td>String</td><td>No</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

begin/end的使用方法与before/after略有不同。

<table><thead><tr><th>提示</th><th>示例</th></tr></thead><tbody><tr><td>过滤时间戳时，包含begin以及end</td><td>若 begin=6，end=10，返回的数据将会是 [10, 9, 8, 7, 6]</td></tr><tr><td>若begin及end之间的数据量超过limit，返回靠近end的数据记录。<br>若仅传入begin，不传入end，靠近begin的数据将被返回</td><td>若 begin=6，limit=3，返回的数据将会是 [8, 7, 6]<br><br>该功能不适用于成交明细接口，相同参数，成交明细接口将返回[10, 9, 8]，不靠近begin返回。</td></tr></tbody></table>

  
若begin/end以及before/after被同时传入，我们将先根据begin/end进行时间戳过滤，并根据before/after对结果进行分页。

  
拥有分页功能的交易接口罗列如下。

*   [GET / 获取未成交订单列表](/zh/order-book-trading-trade-get-order-list)
*   [GET / 获取历史订单记录（近七天）](/zh/order-book-trading-trade-get-order-history-last-7-days)
*   [GET / 获取历史订单记录（近三个月）](/zh/order-book-trading-trade-get-order-history-last-3-months)
*   [GET / 获取成交明细（近三天）](/zh/order-book-trading-trade-get-transaction-details-last-3-days)
*   [GET / 获取成交明细（近三个月）](/zh/order-book-trading-trade-get-transaction-details-last-3-months)
*   [账单流水查询（近七天）](/zh/trading-account-rest-api-get-bills-details-last-7-days)
*   [账单流水查询（近三月）](/zh/trading-account-rest-api-get-bills-details-last-3-months)
*   [查看历史持仓信息](/zh/trading-account-rest-api-get-positions-history)

## 自成交保护

交易系统会以母账户维度实施强制自成交保护，同一母账户下所有账户，包括母账户本身和所有子账户，都无法进行自成交。订单的默认STP模式为`Cancel Maker`，用户亦可以通过下单接口的stpMode参数指定订单的STP模式。

OKX 将支持 3 种 STP 模式（`stpMode`），分别是 `cancel_maker`、`cancel_taker` 和 `cancel_both`。

注：强制自成交保护功能仅适用于所有用户，所有订单类型，以及所有订单簿交易产品。

### 自成交保护模式

OKX 为用户提供了三种模式，定义了如何阻止自成交，这些模式基于taker订单当中的配置。

**取消maker单**

这是默认的 STP 模式。为防止自成交，maker单将被取消，然后taker单将继续与深度中的下一个订单成交。

**取消taker单**

为防止自成交，taker单将被取消。若用户的maker单在深度中排序较后，taker单将被部分成交然后取消。若FOK订单导致了自成交，它将直接被整体取消。

**取消两者**

为防止自成交，taker单和maker单都将被取消。若用户的maker单在深度中排序较后，那么taker单将被部分成交，然后taker单的剩余部分以及maker单会被取消。FOK订单在此模式中不受支持。只有一个报价单及询价单会被取消。
