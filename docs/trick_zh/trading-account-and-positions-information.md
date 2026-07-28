---
title: 交易账户和持仓
outline: deep
---

## 账户

### WebSocket 订阅

我们建议使用 WebSocket 订阅 [`账户`](/zh/trading-account-websocket-account-channel) 频道收取账户更新。账户频道设有可选参数`ccy`，让用户可以仅收取指定账户币种的信息。

该端点返回用户以美元为单元的资产价值，以及其他由于标识价格变化而持续更新的参数。OKX在估值变化时定期向用户发送更新数据。

连接到私有 WebScoket 和登入后的请求和返回示例：

<table><tbody><tr><td></td><td><strong>账户</strong></td><td><strong>账户（仅指定的币种）</strong></td></tr><tr><td>请求</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "BTC"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr><tr><td>成功返回</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account"<br>&nbsp;&nbsp;}<br>}</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account",<br>&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "BTC"<br>&nbsp;&nbsp;}<br>}</td></tr></tbody></table>

### 首次订阅全量数据

与订单频道不同，[`账户`](/zh/trading-account-websocket-account-channel)频道首次订阅会推送全量数据，推送币种层面资产不为 0 的账户信息。币种层面资产不为 0 指币种总权益（`eq`）、可用保证金（`availEq`）、可用余额（`availBal`）任一字段不为 0。

假设账户的 BTC 和 USDT 币种层面资产不为 0，而账户模式为跨币种保证金模式或组合保证金模式，用户应收到账户频道以下的信息示例：

<table><tbody><tr><td><strong>账户</strong></td><td><strong>账户（仅指定的币种）</strong></td></tr><tr><td>{<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"adjEq": "30979.1086748182657014",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"details": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availBal": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availEq": "18962.59868274799",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"crossLiab": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disEq": "18978.5272656414983116",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"eq": "18962.59868274799",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"frozenBal": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interest": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoLiab": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liab": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordFrozen": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upl": "0"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availBal": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "BTC",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"crossLiab": "0.509575622217854",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disEq": "-25408.4180739947324516",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"eq": "-0.5096053466363398",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"frozenBal": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interest": "0.0000297244184858",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoLiab": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liab": "0.509575622217854",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordFrozen": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upl": "0"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"imr": "8469.4726913315758219",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "39.9556239578938079",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mmr": "762.252542219842",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"totalEq": "44480.5383005753085878",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uTime": "1615190165641"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}<br></td><td>{<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "account",<br>&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "BTC"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"adjEq": "30979.1086748182657014",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"details": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availBal": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "BTC",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"crossLiab": "0.509575622217854",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"disEq": "-25408.4180739947324516",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"eq": "-0.5096053466363398",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"frozenBal": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interest": "0.0000297244184858",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoLiab": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liab": "0.509575622217854",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ordFrozen": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upl": "0"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"imr": "8469.4726913315758219",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isoEq": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "39.9556239578938079",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mmr": "762.252542219842",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"totalEq": "44480.5383005753085878",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uTime": "1615190165641"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}<br></td></tr></tbody></table>

### 后续推送

之后，用户会根据以下情况收到账户数据推送：

<table><thead><tr><th style="text-align: left"></th><th style="text-align: left"></th></tr></thead><tbody><tr><td style="text-align: left">事件触发推送</td><td style="text-align: left">下单、撤单等事件会触发推送。多项事件（如同时间有多个订单成交）有可能会聚合成单个账户信息推送。仅推送受事件变更的币种，包括币种资产变为 0。</td></tr><tr><td style="text-align: left">定时推送</td><td style="text-align: left">定时推送，目前为每 5 秒推送一次。与首次订阅一样，推送全量数据，即推送所有币种（或<code>ccy</code>参数指定的币种）层面资产不为 0 的账户信息。</td></tr></tbody></table>

### REST API

用户亦可以通过 REST API 查看币种层面资产不为 0 的账户余额：

[`GET /api/v5/account/balance`](/zh/trading-account-rest-api-get-balance)

REST API 亦提供可选参数`ccy`，支持单个币种（如`BTC`）或多个以逗号分隔的币种（如 BTC,USDT,ETH）查询，最多 20 个。

示例：

[`GET /api/v5/account/balance?ccy=BTC,USDT,ETH`](/zh/trading-account-rest-api-get-balance)

当用户于`ccy`参数指定币种时，无论该币种层面资产是否为 0，REST API 均会返回该币种的数据，与 WebSocket 账户频道不同。这只适用于曾经持有的币种。

## 最大可用数量

跨币种保证金模式下，启用自动借币能让用户以多于币种余额的数量买入/卖出产品。

在这种情况下，用户便会想知道该产品最大的买入/卖出数量为多少。用户可以轮询以下的 REST API 得知最大可用数量（包括可用余额和交易所的最大可借）：

[`GET /api/v5/account/max-avail-size`](/zh/trading-account-rest-api-get-maximum-available-balance-equity)

跨币种保证金模式下，BTC-USDT 全仓的请求和返回示例：

<table><tbody><tr><td>请求</td><td>GET /api/v5/account/max-avail-size?instId=BTC-USDT&amp;tdMode=cross</td></tr><tr><td>成功返回</td><td>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availBuy": "213800.4239369798722052",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availSell": "1.3539405224369181",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;"msg": ""<br>}</td></tr></tbody></table>

币币的`availBuy`为计价货币，`availSell`为交易货币。

以上的返回结果表示 BTC-USDT 最大买入可用数量为 213,800.42 USDT，最大卖出可用数量为 1.35394052 BTC。这应与网页上交易时显示的数量一样。

## 最大可转余额

为了获得交易账户或是某个子账户的最大可转余额，用户可以通过 [`GET /api/v5/account/max-withdrawal`](/zh/trading-account-rest-api-get-maximum-withdrawals) 获取余额。

此端点返回的数据考虑了未偿还的贷款和使用中的保证金。

## 余额和持仓

当特定事件（如订单成交、资金转移）被触发时，数据将被推送。

[`账户余额和持仓`](/zh/trading-account-websocket-balance-and-position-channel)频道适用于获取账户余额和仓位资产的变化。

如果用户拥有了太多货币，且数据太大以至于无法在单个推送中发送，它将被拆分为多个消息。

在账户余额和持仓发生变化时，与账户频道和持仓频道相比，此频道的字段较少，以便以最低延迟将更改推送给客户。

## 持仓

用户应该使用 WebSocket 获取持仓信息更新。

### WebSocket 订阅

与订单频道类似，[`持仓`](/zh/trading-account-websocket-positions-channel)频道提供多种维度的订阅。

该端点返回标识价格以及其他持续变化的参数。OKX会定期向用户推送数据更新。

要订阅以上 BTC-USDT-SWAP 持仓的数据，用户可在连接到和登入私有 WebSocket 后，传送下表任一请求：

<table><tbody><tr><td></td><td><strong>产品类型</strong></td><td><strong>产品类型 + 交易品种</strong><strong><br></strong><strong>(仅限衍生产品)</strong></td><td><strong>产品类型 + 产品 ID</strong></td></tr><tr><td>请求</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"op": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr><tr><td>成功&nbsp;返回</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP"<br>&nbsp;&nbsp;}<br>}</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td><td>{<br>&nbsp;&nbsp;"event": "subscribe",<br>&nbsp;&nbsp;"args": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

用户亦可以把`instType`参数填上`ANY`，一次性订阅所有产品类型的持仓更新。

### 首次订阅全量数据

持仓频道首次订阅会推送全量数据，推送持仓数量不为 0 的持仓信息。持仓数量不为 0 指 pos 字段大于或小于 0。

我们继续沿用先前章节的 BTC-USDT-SWAP 全仓订单（买卖模式）例子。在订阅持仓频道（产品类型 + 交易品种维度）后，用户应收到以下的推送信息示例：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"arg": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"channel": "positions",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;"instFamily": "BTC-USDT"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"data": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"adl": "2",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"availPos": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avgPx": "50912.4",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"cTime": "1615170596148",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ccy": "USDT",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"imr": "165.15734103333082",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instId": "BTC-USDT-SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"instType": "SWAP",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interest": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"last": "51000",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lever": "3",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liab": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liabCcy": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"liqPx": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"margin": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnMode": "cross",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mgnRatio": "0",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mmr": "1.98188809239997",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"optVal": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pTime": "1615196199624",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pos": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"posCcy": "",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"posId": "287999792370819074",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"posSide": "net",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tradeId": "60477021",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uTime": "1615170598022",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upl": "0.4520230999924388",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uplRatio": "0.0027394232555804"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}</td></tr></tbody></table>

### 后续推送

之后，与账户频道相似，用户会根据以下情况收到持仓数据推送：

<table><thead><tr><th style="text-align: left"></th><th style="text-align: left"></th></tr></thead><tbody><tr><td style="text-align: left">事件触发推送</td><td style="text-align: left">开仓、平仓等事件会触发推送。多项事件（如同时间有多个订单成交）有可能会聚合成单个持仓信息推送。<br>仅推送受事件变更的持仓，包括平仓（即持仓数量变为 0）。</td></tr><tr><td style="text-align: left">定时推送</td><td style="text-align: left">定时推送，目前为每 5 秒推送一次。与首次订阅一样，推送全量数据，即推送订阅维度上指定的所有不为 0 的持仓。</td></tr></tbody></table>

### 持仓 ID

您可能会发现每项持仓数据均设有持仓 ID 字段（`posId`）。这字段可以用作填写 REST API 可选查询参数，会在下一章节讲解。

持仓 ID 由`mgnMode`+`posSide`+`instId`+`ccy`这几个字段所产生，可让您唯一地识别同一个账户内的持仓。持仓 ID 不会因平仓及再开仓而变动。如果很久没有仓位的话，系统可能产生一个新的持仓 ID。

### REST API

用户亦可以通过 REST API 查看持仓数量不为 0 的持仓信息：

[`GET /api/v5/account/positions`](/zh/trading-account-rest-api-get-positions)

REST API 提供以下维度查询：

<table><thead><tr><th style="text-align: left"><strong>维度</strong></th><th style="text-align: left"><strong>示例</strong></th></tr></thead><tbody><tr><td style="text-align: left">产品类型</td><td style="text-align: left">GET /api/v5/account/positions?instType=SWAP</td></tr><tr><td style="text-align: left">产品 ID</td><td style="text-align: left">GET /api/v5/account/positions?instId=BTC-USDT-SWAP</td></tr><tr><td style="text-align: left">持仓 ID（单个）</td><td style="text-align: left">GET /api/v5/account/positions?posId=287999792370819074</td></tr><tr><td style="text-align: left">持仓 ID（多个，最多 20 个）</td><td style="text-align: left">GET /api/v5/account/positions?posId=287999792370819074,289098391880081414</td></tr></tbody></table>

值得一提的是，当用户于`posId`参数指定持仓时，无论持仓是否已平仓，REST API 均会返回该持仓的数据，与 WebSocket 持仓频道不同。这只适用于曾经开仓的持仓。

## 订单成交推送与持仓的对账

运用持仓频道新增的最新成交 ID （`tradeId`字段），用户可以进行订单频道成交推送与持仓的对账。这样做法其中一个案例就是用户想从订单成交推算出现有的持仓数量。

成交 ID 的唯一性基于每一产品 ID (`instId`)。

新的订单成交均会指派较新的成交 ID。利用这一特性，用户可用成交 ID 匹配相应的持仓/订单成交，并以成交 ID 的数字比较哪项数据较新。

不过，用户需要注意下列事项：

*   多个持仓变化有可能会聚合成单个持仓信息推送，即持仓信息只有最新的成交 ID，并非每一个订单成交更新均能与持仓信息匹配
*   强平/强减或 ADL 不会推送订单更新（因订单为系统所拥有）
*   因强平/强减或 ADL 而触发的持仓更新不会更新 `tradeId`

要准确地进行订单成交推送与持仓的对账，用户必需考虑以上的注意事项，除比较`tradeId`外还需比较持仓数量（或比较持仓更新时间`uTime`字段）。

我们来看看以下的推送序列示例。假设下列都是同样产品及同样保证金模式的数据，持仓模式为买卖模式。

<table><thead><tr><th style="text-align: left"><strong>序列</strong></th><th style="text-align: left"><strong>频道</strong></th><th style="text-align: left"><strong>数据</strong></th><th style="text-align: left"><strong>对账后的持仓</strong></th></tr></thead><tbody><tr><td style="text-align: left">1</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=20, side=buy, tradeId=150</td><td style="text-align: left">20</td></tr><tr><td style="text-align: left">2</td><td style="text-align: left">positions (持仓)</td><td style="text-align: left">pos=20, tradeId=150, uTime=1614859751636</td><td style="text-align: left">20</td></tr><tr><td style="text-align: left">3</td><td style="text-align: left">positions (持仓)</td><td style="text-align: left">pos=18, tradeId=151, uTime=1614859752637</td><td style="text-align: left">18</td></tr><tr><td style="text-align: left">4</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=2, side=sell, tradeId=151</td><td style="text-align: left">18</td></tr><tr><td style="text-align: left">5</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=3, side=sell, tradeId=156</td><td style="text-align: left">15</td></tr><tr><td style="text-align: left">6</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=1, side=sell, tradeId=158</td><td style="text-align: left">14</td></tr><tr><td style="text-align: left">7</td><td style="text-align: left">positions (持仓)</td><td style="text-align: left">pos=10, tradeId=163, uTime=1614859755037</td><td style="text-align: left">10</td></tr><tr><td style="text-align: left">8</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=1, side=sell, tradeId=159</td><td style="text-align: left">10</td></tr><tr><td style="text-align: left">9</td><td style="text-align: left">order (订单)</td><td style="text-align: left">fillSz=3, side=sell, tradeId=163</td><td style="text-align: left">10</td></tr><tr><td style="text-align: left">10</td><td style="text-align: left">positions (持仓)</td><td style="text-align: left">pos=10, tradeId=163, uTime=1614859755037</td><td style="text-align: left">10</td></tr><tr><td style="text-align: left">11</td><td style="text-align: left">positions (持仓)</td><td style="text-align: left">pos=6, tradeId=163, uTime=1614866547430</td><td style="text-align: left">6</td></tr></tbody></table>

从中观察，我们得知：

*   收到 tradeId=163 的单个持仓推送 #7，即代表与持仓对账时，可忽略`tradeId`<=163 的订单推送。换言之，我们可忽略订单推送 #8 和 #9
*   持仓推送 #10 与 #7 的`tradeId`和`pos`（和`uTime`）一样，这表示我们可以认为 #10 为持仓每 10 秒的定时推送
*   持仓推送 #11 具同样的`tradeId`\=163 但持仓数量有变化（`uTime`也较新），我们可推断这推送是由强减或 ADL 触发
