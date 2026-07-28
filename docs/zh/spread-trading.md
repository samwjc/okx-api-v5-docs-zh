---
title: 价差交易
outline: deep
---

👉 Spread Orderbook 产品使用户能够灵活交易大尺寸价差（Spread），可以用于简化交割合約展期、资金费套利和提高收益率，以及基于基差和期限结构的投机。

## 介绍

### 基本概念

1.  价差（**Spread） -** 做多一种产品并同时做空数量等价的另一种相关产品，形成具有两条风险互相抵消的腿的交易
2.  订单簿（**Order-book） -** 一种或一组交易产品的报价集合。每个报价都包含一个或一组定义的产品、相关数量以及_Maker_(报价者)愿意交易的价格。然后，_Taker_(接受者)可以立即消耗这些报价，直至订单簿上列出的全部数量。价差交易挂单限额为所有价差挂单合计不超过500个。

### 基本工作流程

Nitro Spreads 以熟悉的**中央限价订单簿 (CLOB)** 概念为中心：

*   Spreads里包含的产品来自OKX交易所，交易之后也在OKX交易所进行清算和结算。
*   任何人都可以充当“Taker”，消耗现有的剩余订单，或“Maker”，其订单被消耗。
*   交易在订单被匹配时发生，之后它们被发送到 OKX 进行清算和结算。

简单来说，Nitro Spreads 工作流程是

1.  _Maker 在 Spread 的订单簿上设置限价订单。_
2.  _Taker通过限价单消耗一个resting Order。_
3.  被匹配的订单被发送去清算和结算。
4.  Taker和Maker收到交易成功或拒绝的确认
5.  所有用户都会收到成功结算和清算交易的通知，除去涉及的交易双方以交易方向 (买入或卖出) 等信息。

Nitro Spreads 的主要方面：

*   所有价差都有**可公开访问**的中央限价订单簿 (**CLOB**)。
*   Spreads的可用性由OKX决定。通常，这些Spreads包括同一标的下（如“BTC/USDT”或“ETH/USDC”）中 delta one 衍生品（交割和永续）和现货的所有可能组合。
*   **部分成交**和多个订单可以作为单笔交易的一部分。
*   交易对手方**不是**任由用户选择的。任何人都可以参与所有Spread的订单簿，有效地与更广泛的市场进行交易。
*   整个过程保持匿名，所有订单和交易均在**匿名**的基础上进行。
*   用户可以灵活地在订单簿的买卖双方下多个订单，从而实现阶梯式配置。

## 全面的 API 工作流程

::: tip
有关订单和交易的通知将由 \*Taker\* 和 \*Maker\* 通过 WebSocket 通知渠道接收。
:::

当用户的订单被另一个订单执行时，用户将承担_Maker_的角色。当用户提交的订单与订单簿中的现有订单相匹配时，他们就会成为 _Taker_

### 获取可用Spreads

要检索在 OKX 上交易的所有可用Spreads，您应该向 `GET /api/v5/sprd/spreads` 发出请求

### 检索您的订单

要在 OKX 上检索您的订单，您应该向 `GET /api/v5/sprd/order` 发出请求。

### 检索您的交易

要检索您在 OKX 上的交易，您应该向 `GET /api/v5/sprd/trades` 发出请求。

### 提交订单

要向 某个Spread 的订单簿提交订单，您应该请求 `POST /api/v5/sprd/order` 。

### Spread状态

Spread 的生命周期中存在三种不同的状态：`live`，`suspend`，和 `expired`:

1.  `live`: 在 Nitro Spread 上活跃交易的Spreads
2.  `suspend`：其中至少一条腿被暂停，另一条在 OKX 订单簿交易所处于活跃或暂停状态的价差；或标的工具仍在 OKX 订单簿交易所中存在但已从 Nitro Spread 中移除的Spread
3.  `expired`：至少一条腿在 OKX 订单簿交易所到期的Spread

给定每条腿的状态以及 Nitro Spreads 上的Spread状态（除了在 Nitro Spread上退市的情况），所有可能Spread状态的情况请参考下表：

<table><thead><tr><th>交易产品A</th><th>交易产品B</th><th>Spread状态</th></tr></thead><tbody><tr><td>Live</td><td>Live</td><td>Live</td></tr><tr><td>Suspend</td><td>Live</td><td>Suspend</td></tr><tr><td>Live</td><td>Suspend</td><td>Suspend</td></tr><tr><td>Suspend</td><td>Suspend</td><td>Suspend</td></tr><tr><td>Expired</td><td>Live</td><td>Expired</td></tr><tr><td>Live</td><td>Expired</td><td>Expired</td></tr><tr><td>Suspend</td><td>Expired</td><td>Expired</td></tr><tr><td>Expired</td><td>Suspend</td><td>Expired</td></tr><tr><td>Expired</td><td>Expired</td><td>Expired</td></tr></tbody></table>

### 交易生命周期

为了进行交易，需要在价差撮合交易中匹配两个订单。 通过订阅 `sprd-orders`WebSocket 通道，您可以获得有关订单状态的信息并确定它是否已达到最终状态。通道中的`state`值表示订单的当前状态。

1.  如果状态为`live` 或 `partially_filled`，则意味着订单仍有未达最终状态（`filled`或`canceled`）数量，创建者或其他用户仍可能可以对其执行操作。
2.  另一方面，如果状态为`canceled`或`filled`，创建者或任何其他用户将无法对此订单执行任何操作。

请密切跟踪以下属性：`sz`（数量）、`pendingFillSz`（待完成数量）、`canceledSz`（被取消数量）和 `accFillSz`（累积完成数量）。这些属性提供了有关订单状态和进展的重要信息。

### 用户的订单状态

通过订阅 `sprd-orders`WebSocket 频道，用户可以跟踪他们的订单状态。

1.  提交订单后，无论是 _Maker_ 还是 _Taker_，用户都会通过订单 WebSocket 频道道收到订单更新消息。该消息将指示订单的`state` == `live`。
2.  订单成交和结算是异步的。当订单已成交但还没结算，用户将收到`pendingSettleSz`\>0，`fillSz` == ""的订单更新消息
3.  如果订单已部分成交且仍有待处理数量，用户将收到`state` == `partially_filled` 的订单更新消息
4.  如果订单完全成交，用户将收到`state` == `filled`的订单更新消息
5.  如果订单未完全消耗，但已达到最终状态，用户将收到`state` == `canceled`的订单更新消息。
6.  如果订单的某个部分被拒绝，用户会收到更新的订单更新，其中包含更新的 `canceledSz` 和 `pendingFillSz`，以及与错误对应的`code`和`msg`。

### 用户的交易状态

通过订阅 `sprd-trades`WebSocket 频道，用户可以跟踪他们的交易状态。 1. 一笔已执行的交易在OKX上进行清算结算后，即为最终交易。 2. 对于成功清算的交易，用户会收到一条 WebSocket 消息，其中的`state`表示`filled`。 3. 在交易清算不成功的情况下，用户会收到一条交易更新消息，`state`反映为`rejected`。 4. 如果交易`state`为`rejected`，交易更新消息还将包含错误代码`code`和解释拒绝原因的相应错误消息 `msg`。

### 所有交易

所有用户都能够接收通过 OKX Nitro Spread 产品发生的所有交易的更新。 请务必注意，OKX Nitro Spreads 不会披露有关交易双方及交易方向（买入或卖出）的信息。

1.  用户可以订阅`sprd-public-trades`频道来获取所有已成功结算的交易。

## REST API

### 下单

下单

#### 限速:：20次/ 2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/sprd/order`

> 请求示例

```
# 下价差订单
POST /api/v5/sprd/order
body
{
  "sprdId":"BTC-USDT_BTC-USDT-SWAP",
  "clOrdId":"b15",
  "side":"buy",
  "ordType":"limit",
  "px":"2.15",
  "sz":"2"
}
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 下单
result = spreadAPI.place_order(sprdId='BTC-USDT_BTC-USDT-SWAP',
                               clOrdId='b16',side='buy',ordType='limit',
                               px='2',sz='2')
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>是</td><td>spread ID，如 BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>clOrdId</td><td>String</td><td>否</td><td>客户自定义订单ID字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td>tag</td><td>String</td><td>否</td><td>订单标签字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td>side</td><td>String</td><td>是</td><td>订单方向<br><code>buy</code>：买，<code>sell</code>：卖</td></tr><tr><td>ordType</td><td>String</td><td>是</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>sz</td><td>String</td><td>是</td><td>委托数量。反向价差的数量单位为USD，正向及混合价差为其对应<code>baseCcy</code></td></tr><tr><td>px</td><td>String</td><td>是</td><td>委托价格，仅适用于<code>limit</code>, <code>post_only</code>, <code>ioc</code>类型的订单</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "clOrdId": "b15",
      "ordId": "312269865356374016",
      "tag": "",
      "sCode": "0",
      "sMsg": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>sCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>sMsg</td><td>String</td><td>事件执行失败或成功时的msg</td></tr></tbody></table>

::: tip
clOrdId  
clOrdId是用户自定义的唯一ID用来识别订单。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。 clOrdId不能与当前所有的挂单的clOrdId重复
:::

::: tip
ordType  
订单类型，创建新订单时必须指定，您指定的订单类型将影响需要哪些订单参数和撮合系统如何执行您的订单，以下是有效的ordType：  
limit：限价单，要求指定sz 和 px  
post\_only：限价委托，在下单那一刻只做maker，如果该笔订单的任何部分会吃掉当前挂单深度，则该订单将被全部撤销。  
ioc：立即成交并取消剩余
:::

::: tip
sz  
反向价差(inverse spread)的数量单位是USD，与OKX订单簿相反.
:::

### 撤单

撤销之前下的未完成订单。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/sprd/cancel-order`

> 请求示例

```
POST /api/v5/sprd/cancel-order
body
{
    "ordId":"2510789768709120"
}
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 撤单
result = spreadAPI.cancel_order(ordId='1905309079888199680')
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>可选</td><td>订单ID， <code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td>clOrdId</td><td>String</td><td>可选</td><td>用户自定义ID</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "clOrdId": "oktswap6",
            "ordId": "12345689",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>sCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>sMsg</td><td>String</td><td>事件执行失败时的msg</td></tr></tbody></table>

::: tip
撤单返回sCode等于0不能严格认为该订单已经被撤销，只表示您的撤单请求被系统服务器所接受，撤单结果以订单频道推送的状态或者查询订单状态为准
:::

### 全部撤单

撤销所有挂单

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/sprd/mass-cancel`

> 请求示例

```
POST /api/v5/sprd/mass-cancel
 body
 {
    "sprdId": "BTC-USDT_BTC-USDT-SWAP"
}
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 全部撤单
result = spreadAPI.cancel_all_orders(sprdId="BTC-USDT_BTC-USDT-SWAP")
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>spread ID</td></tr></tbody></table>

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>result</td><td>Boolean</td><td>请求结果<code>true</code>, <code>false</code></td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "result": true
        }
    ]
}
```

::: tip
返回结果中result=true 代表您的请求已被成功接收，并将会被处理。撤单的实际结果会通过\`sprd-orders\`频道推送。
:::

### 修改订单

修改当前未成交的挂单  

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/sprd/amend-order`

> 请求示例

```
POST /api/v5/sprd/amend-order
body
{
    "ordId":"2510789768709120",
    "newSz":"2"
}
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>可选</td><td>订单ID， <code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td>clOrdId</td><td>String</td><td>可选</td><td>用户自定义order ID</td></tr><tr><td>reqId</td><td>String</td><td>否</td><td>用户自定义修改事件ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td>newSz</td><td>String</td><td>可选</td><td>修改的新数量，对于部分成交订单，该数量应包含已成交数量。<br><code>newSz</code> 和 <code>newPx</code>不可同时为空。</td></tr><tr><td>newPx</td><td>String</td><td>可选</td><td>修改后的新价格。<br><code>newSz</code> 和 <code>newPx</code>不可同时为空。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
         "clOrdId":"",
         "ordId":"12344",
         "reqId":"b12344",
         "sCode":"0",
         "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>用户自定义order ID</td></tr><tr><td>reqId</td><td>String</td><td>用户自定义修改事件ID</td></tr><tr><td>sCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>sMsg</td><td>String</td><td>事件执行失败或成功时的msg</td></tr></tbody></table>

::: tip
newSz  
若修改订单时，订单修改后的新数量小于或等于 (accFillSz + canceledSz + pendingSettleSz)，在 pendingSettleSz 结算后，订单状态会根据 canceledSz 的不同而不同。当 canceledSz = 0，订单状态将被改为 filled；当 canceledSz > 0，订单状态将被改为 canceled。
:::

::: tip
修改订单返回sCode等于0不能严格认为该订单已经被修改，只表示您的修改订单请求被系统服务器所接受，改单结果以订单频道推送的状态或者查询订单状态为准
:::

### 获取订单信息

查订单信息

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/sprd/order`

> 请求示例

```
GET /api/v5/sprd/order?ordId=2510789768709120
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取订单详情
result = spreadAPI.get_order_details(ordId='1905309079888199680')
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>可选</td><td>订单ID，<code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td>clOrdId</td><td>String</td><td>可选</td><td>用户自定义ID，如果<code>clOrdId</code>关联了多个订单，只会返回最近的那笔订单</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "sprdId": "BTC-USD-SWAP_BTC-USD-200329",
      "ordId": "312269865356374016",
      "clOrdId": "b1",
      "tag": "",
      "px": "999",
      "sz": "3",
      "ordType": "limit",
      "side": "buy",
      "fillSz": "0",
      "fillPx": "",
      "tradeId": "",
      "accFillSz": "0",
      "pendingFillSz": "2",
      "pendingSettleSz": "1",
      "canceledSz": "1",
      "state": "live",
      "avgPx": "0",
      "cancelSource": "",
      "uTime": "1597026383085",
      "cTime": "1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>Spread ID</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>px</td><td>String</td><td>委托价格</td></tr><tr><td>sz</td><td>String</td><td>委托数量</td></tr><tr><td>ordType</td><td>String</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>side</td><td>String</td><td>订单方向</td></tr><tr><td>fillSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>fillPx</td><td>String</td><td>最新成交价格</td></tr><tr><td>tradeId</td><td>String</td><td>最近成交ID</td></tr><tr><td>accFillSz</td><td>String</td><td>累计成交数量</td></tr><tr><td>pendingFillSz</td><td>String</td><td>待成交数量（包括待结算数量）</td></tr><tr><td>pendingSettleSz</td><td>String</td><td>待结算数量</td></tr><tr><td>canceledSz</td><td>String</td><td>被取消数量</td></tr><tr><td>avgPx</td><td>String</td><td>成交均价，如果成交数量为0，该字段为"0"</td></tr><tr><td>state</td><td>String</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交</td></tr><tr><td>cancelSource</td><td>String</td><td>撤单原因<br><code>0</code>: 系统撤单<br><code>1</code>: 用户撤单<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>20</code>: 系统倒计时撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>34</code>: 订单结算失败因为保证金不足<br><code>35</code>: 撤单因为其他订单保证金不足<br><code>44</code>：由于该币种的可用余额不足，无法在触发自动换币后进行兑换，您的订单已撤销，撤销订单后恢复的余额将用于自动换币。当该币种的总抵押借贷量达到平台抵押借贷风控上限时，则会触发自动换币。</td></tr><tr><td>uTime</td><td>String</td><td>订单状态更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>cTime</td><td>String</td><td>订单创建时间，Unix时间戳的毫秒数格式， 如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
订单数量等式: pendingFillSz + canceledSz + accFillSz = sz
:::

### 获取未成交订单列表

获取当前账户下所有未成交订单信息

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/sprd/orders-pending`

> 请求示例

```
GET /api/v5/sprd/orders-pending
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取未完成订单
result = spreadAPI.get_active_orders()
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordType</td><td>String</td><td>否</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>state</td><td>String</td><td>否</td><td>订单状态<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交</td></tr><tr><td>beginId</td><td>String</td><td>否</td><td>请求的起始订单ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td>endId</td><td>String</td><td>否</td><td>请求的结束订单ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "sprdId": "BTC-USDT_BTC-UST-SWAP",
      "ordId": "312269865356374016",
      "clOrdId": "b1",
      "tag": "",
      "px": "999",
      "sz": "3",
      "ordType": "limit",
      "side": "buy",
      "fillSz": "0",
      "fillPx": "",
      "tradeId": "",
      "accFillSz": "0",
      "pendingFillSz": "2",
      "pendingSettleSz": "1",
      "canceledSz": "1",
      "state": "live",
      "avgPx": "0",
      "cancelSource": "",
      "uTime": "1597026383085",
      "cTime": "1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>px</td><td>String</td><td>委托价格</td></tr><tr><td>sz</td><td>String</td><td>委托数量</td></tr><tr><td>ordType</td><td>String</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>side</td><td>String</td><td>订单方向</td></tr><tr><td>fillSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>fillPx</td><td>String</td><td>最新成交价格</td></tr><tr><td>tradeId</td><td>String</td><td>最近成交ID</td></tr><tr><td>accFillSz</td><td>String</td><td>累计成交数量</td></tr><tr><td>pendingFillSz</td><td>String</td><td>待成交数量（包括待结算数量）</td></tr><tr><td>pendingSettleSz</td><td>String</td><td>待结算数量</td></tr><tr><td>canceledSz</td><td>String</td><td>被取消数量</td></tr><tr><td>avgPx</td><td>String</td><td>成交均价，如果成交数量为0，该字段为"0"</td></tr><tr><td>state</td><td>String</td><td>订单状态<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交</td></tr><tr><td>cancelSource</td><td>String</td><td>撤单原因<br><code>0</code>: 系统撤单<br><code>1</code>: 用户撤单<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>20</code>: 系统倒计时撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>34</code>: 订单结算失败因为保证金不足<br><code>35</code>: 撤单因为其他订单保证金不足<br><code>44</code>：由于该币种的可用余额不足，无法在触发自动换币后进行兑换，您的订单已撤销，撤销订单后恢复的余额将用于自动换币。当该币种的总抵押借贷量达到平台抵押借贷风控上限时，则会触发自动换币。</td></tr><tr><td>uTime</td><td>String</td><td>订单状态更新时间，Unix时间戳的毫秒数格式，如：<code>1597026383085</code></td></tr><tr><td>cTime</td><td>String</td><td>订单创建时间，Unix时间戳的毫秒数格式，如：<code>1597026383085</code></td></tr></tbody></table>

### 获取历史订单记录（近21天)

获取最近21天挂单，且完全成交的订单数据，包括21天以前挂单，但近21天才成交的订单数据。按照订单创建时间倒序排序。

已经撤销的未成交单 只保留2小时。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/sprd/orders-history`

> 请求示例

```
GET /api/v5/sprd/orders-history
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取历史订单
result = spreadAPI.get_orders()
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordType</td><td>String</td><td>否</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>state</td><td>String</td><td>否</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交</td></tr><tr><td>beginId</td><td>String</td><td>否</td><td>请求的起始订单ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td>endId</td><td>String</td><td>否</td><td>请求的结束订单ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td>begin</td><td>String</td><td>否</td><td>筛选的开始时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>end</td><td>String</td><td>否</td><td>筛选的结束时间戳，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
     {
      "sprdId": "BTC-USDT_BTC-UST-SWAP",
      "ordId": "312269865356374016",
      "clOrdId": "b1",
      "tag": "",
      "px": "999",
      "sz": "3",
      "ordType": "limit",
      "side": "buy",
      "fillSz": "0",
      "fillPx": "",
      "tradeId": "",
      "accFillSz": "0",
      "pendingFillSz": "2",
      "pendingSettleSz": "1",
      "canceledSz": "1",
      "state": "live",
      "avgPx": "0",
      "cancelSource": "",
      "uTime": "1597026383085",
      "cTime": "1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>px</td><td>String</td><td>委托价格</td></tr><tr><td>sz</td><td>String</td><td>委托数量</td></tr><tr><td>ordType</td><td>String</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>side</td><td>String</td><td>订单方向</td></tr><tr><td>fillSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>fillPx</td><td>String</td><td>最新成交价格</td></tr><tr><td>tradeId</td><td>String</td><td>最近成交ID</td></tr><tr><td>accFillSz</td><td>String</td><td>累计成交数量</td></tr><tr><td>pendingFillSz</td><td>String</td><td>待成交数量（包括待结算数量）</td></tr><tr><td>pendingSettleSz</td><td>String</td><td>待结算数量</td></tr><tr><td>canceledSz</td><td>String</td><td>被取消数量</td></tr><tr><td>avgPx</td><td>String</td><td>成交均价，如果成交数量为0，该字段为"0"</td></tr><tr><td>state</td><td>String</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交</td></tr><tr><td>cancelSource</td><td>String</td><td>撤单原因<br><code>0</code>: 系统撤单<br><code>1</code>: 用户撤单<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>20</code>: 系统倒计时撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>34</code>: 订单结算失败因为保证金不足<br><code>35</code>: 撤单因为其他订单保证金不足<br><code>44</code>：由于该币种的可用余额不足，无法在触发自动换币后进行兑换，您的订单已撤销，撤销订单后恢复的余额将用于自动换币。当该币种的总抵押借贷量达到平台抵押借贷风控上限时，则会触发自动换币。</td></tr><tr><td>uTime</td><td>String</td><td>订单状态更新时间，Unix时间戳的毫秒数格式，如：<code>1597026383085</code></td></tr><tr><td>cTime</td><td>String</td><td>订单创建时间，Unix时间戳的毫秒数格式， 如 ： <code>1597026383085</code></td></tr></tbody></table>

### 获取历史订单记录（近三月)

获取最近三个月挂单，且完全成交的订单数据，包括三个月以前挂单，但近三个月才成交的订单数据。按照订单创建时间倒序排序。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/sprd/orders-history-archive`

> 请求示例

```
GET /api/v5/sprd/orders-history-archive
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordType</td><td>String</td><td>否</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>state</td><td>String</td><td>否</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交</td></tr><tr><td>instType</td><td>String</td><td>否</td><td>产品类型<br><code>SPOT</code>：币币<br><code>FUTURES</code>:交割合约<br><code>SWAP</code>：永续合约<br>订单任意一条腿的spread包含相应产品类型，则返回</td></tr><tr><td>instFamily</td><td>String</td><td>否</td><td>交易品种，如 <code>BTC-USDT</code><br>订单任意一条腿的spread包含相应交易品种，则返回</td></tr><tr><td>beginId</td><td>String</td><td>否</td><td>请求的起始订单ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td>endId</td><td>String</td><td>否</td><td>请求的结束订单ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td>begin</td><td>String</td><td>否</td><td>筛选的开始时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>end</td><td>String</td><td>否</td><td>筛选的结束时间戳，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
     {
      "sprdId": "BTC-USDT_BTC-UST-SWAP",
      "ordId": "312269865356374016",
      "clOrdId": "b1",
      "tag": "",
      "px": "999",
      "sz": "3",
      "ordType": "limit",
      "side": "buy",
      "fillSz": "0",
      "fillPx": "",
      "tradeId": "",
      "accFillSz": "0",
      "pendingFillSz": "2",
      "pendingSettleSz": "1",
      "canceledSz": "1",
      "state": "cancelled",
      "avgPx": "0",
      "cancelSource": "",
      "uTime": "1597026383085",
      "cTime": "1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>px</td><td>String</td><td>委托价格</td></tr><tr><td>sz</td><td>String</td><td>委托数量</td></tr><tr><td>ordType</td><td>String</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>side</td><td>String</td><td>订单方向</td></tr><tr><td>fillSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>fillPx</td><td>String</td><td>最新成交价格</td></tr><tr><td>tradeId</td><td>String</td><td>最近成交ID</td></tr><tr><td>accFillSz</td><td>String</td><td>累计成交数量</td></tr><tr><td>pendingFillSz</td><td>String</td><td>待成交数量（包括待结算数量）</td></tr><tr><td>pendingSettleSz</td><td>String</td><td>待结算数量</td></tr><tr><td>canceledSz</td><td>String</td><td>被取消数量</td></tr><tr><td>avgPx</td><td>String</td><td>成交均价，如果成交数量为0，该字段为"0"</td></tr><tr><td>state</td><td>String</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交</td></tr><tr><td>cancelSource</td><td>String</td><td>撤单原因<br><code>0</code>: 系统撤单<br><code>1</code>: 用户撤单<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>20</code>: 系统倒计时撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>34</code>: 订单结算失败因为保证金不足<br><code>35</code>: 撤单因为其他订单保证金不足</td></tr><tr><td>uTime</td><td>String</td><td>订单状态更新时间，Unix时间戳的毫秒数格式，如：<code>1597026383085</code></td></tr><tr><td>cTime</td><td>String</td><td>订单创建时间，Unix时间戳的毫秒数格式， 如 ： <code>1597026383085</code></td></tr></tbody></table>

### 获取历史成交数据（近七天）

获取近7天的订单成交明细信息. 结果按时间倒序返回。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/sprd/trades`

> 请求示例

```
GET /api/v5/sprd/trades
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取私有交易
result = spreadAPI.get_trades()
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>tradeId</td><td>String</td><td>否</td><td>交易 ID</td></tr><tr><td>ordId</td><td>String</td><td>否</td><td>订单 ID</td></tr><tr><td>beginId</td><td>String</td><td>否</td><td>请求的起始交易ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td>endId</td><td>String</td><td>否</td><td>请求的结束交易ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td>begin</td><td>String</td><td>否</td><td>筛选的开始时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>end</td><td>String</td><td>否</td><td>筛选的结束时间戳，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "sprdId": "BTC-USDT-SWAP_BTC-USDT-200329",
            "tradeId": "123",
            "ordId": "123445",
            "clOrdId": "b16",
            "tag": "",
            "fillPx": "999",
            "fillSz": "3",
            "state": "filled",
            "side": "buy",
            "execType": "M",
            "ts": "1597026383085",
            "legs": [
                {
                    "instId": "BTC-USDT-SWAP",
                    "px": "20000",
                    "sz": "3",
                    "szCont": "0.03",
                    "side": "buy",
                    "fillPnl": "",
                    "fee": "",
                    "feeCcy": "",
                    "tradeId": "1232342342"
                },
                {
                    "instId": "BTC-USDT-200329",
                    "px": "21000",
                    "sz": "3",
                    "szCont": "0.03",
                    "side": "sell",
                    "fillpnl": "",
                    "fee": "",
                    "feeCcy": "",
                    "tradeId": "5345646634"
                }
            ],
            "code": "",
            "msg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>tradeId</td><td>String</td><td>交易ID</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr><tr><td>fillPx</td><td>String</td><td>成交价格</td></tr><tr><td>fillSz</td><td>String</td><td>成交数量</td></tr><tr><td>side</td><td>String</td><td>交易方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td>state</td><td>String</td><td>交易状态<br><code>filled</code>：已成交<br><code>rejected</code>：被拒绝</td></tr><tr><td>execType</td><td>String</td><td>流动性方向 <code>T</code>：taker <code>M</code>：maker</td></tr><tr><td>ts</td><td>String</td><td>成交明细产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>legs</td><td>Array of objects</td><td>交易的腿</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品 ID</td></tr><tr><td>&gt; px</td><td>String</td><td>价格</td></tr><tr><td>&gt; sz</td><td>String</td><td>数量</td></tr><tr><td>&gt; szCont</td><td>String</td><td>成交合约数量<br>仅适用于合约，现货将返回""</td></tr><tr><td>&gt; side</td><td>String</td><td>交易方向 <code>buy</code>：买 <code>sell</code>：卖</td></tr><tr><td>&gt; fillPnl</td><td>String</td><td>最新成交收益，适用于有成交的平仓订单。其他情况均为0。</td></tr><tr><td>&gt; fee</td><td>String</td><td>手续费金额或者返佣金额，手续费扣除为‘负数’，如-0.01；手续费返佣为‘正数’，如 0.01</td></tr><tr><td>&gt; feeCcy</td><td>String</td><td>交易手续费币种或者返佣金币种</td></tr><tr><td>&gt; tradeId</td><td>String</td><td>交易ID</td></tr><tr><td>code</td><td>String</td><td>错误码，默认0</td></tr><tr><td>msg</td><td>String</td><td>错误提示，默认 ""</td></tr></tbody></table>

### 获取Spreads（公共）

获取可交易的Spreads。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/sprd/spreads`

> 请求示例

```
GET /api/v5/sprd/spreads?instId=BTC-USDT
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取价差产品
result = spreadAPI.get_spreads()
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>baseCcy</td><td>string</td><td>否</td><td>Spread 币种，如 <code>BTC</code></td></tr><tr><td>instId</td><td>String</td><td>否</td><td>Spread 里包含的产品ID</td></tr><tr><td>sprdId</td><td>String</td><td>否</td><td>Spread ID</td></tr><tr><td>state</td><td>string</td><td>否</td><td>Spread 状态<br><code>live</code>：交易中<br><code>suspend</code>：暂停中<br><code>expired</code>：订单过期</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [{
            "sprdId": "ETH-USD-SWAP_ETH-USD-231229",
            "sprdType": "inverse",
            "state": "live",
            "baseCcy": "ETH",
            "szCcy": "USD",
            "quoteCcy": "USD",
            "tickSz": "0.01",
            "minSz": "10",
            "lotSz": "10",
            "listTime": "1686903000159",
            "legs": [{
                    "instId": "ETH-USD-SWAP",
                    "side": "sell"
                },
                {
                    "instId": "ETH-USD-231229",
                    "side": "buy"
                }
            ],
            "expTime": "1703836800000",
            "uTime": "1691376905595"
        },
        {
            "sprdId": "BTC-USDT_BTC-USDT-SWAP",
            "sprdType": "linear",
            "state": "live",
            "baseCcy": "BTC",
            "szCcy": "BTC",
            "quoteCcy": "USDT",
            "tickSz": "0.0001",
            "minSz": "0.001",
            "lotSz": "1",
            "listTime": "1597026383085",
            "expTime": "1597029999085",
            "uTime": "1597028888085",
            "legs": [{
                    "instId": "BTC-USDT",
                    "side": "sell"
                },
                {
                    "instId": "BTC-USDT-SWAP",
                    "side": "buy"
                }
            ]
        },
        {
            "sprdId": "BTC-USDT_BTC-USDT-230317",
            "sprdType": "linear",
            "state": "live",
            "baseCcy": "BTC",
            "szCcy": "BTC",
            "quoteCcy": "USDT",
            "tickSz": "0.0001",
            "minSz": "0.001",
            "lotSz": "1",
            "listTime": "1597026383085",
            "expTime": "1597029999085",
            "uTime": "1597028888085",
            "legs": [{
                    "instId": "BTC-USDT",
                    "side": "sell"
                },
                {
                    "instId": "BTC-USDT-230317",
                    "side": "buy"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>sprdType</td><td>String</td><td>Spread类型，有效值为<code>linear</code>, <code>inverse</code>, <code>hybrid</code></td></tr><tr><td>state</td><td>String</td><td>Spread状态<br><code>live</code>：交易中<br><code>suspend</code>：暂停中<br><code>expired</code>：已过期</td></tr><tr><td>baseCcy</td><td>String</td><td>Spread币种，如 <code>BTC</code></td></tr><tr><td>szCcy</td><td>String</td><td>Spread数量单位，如 USD, BTC, ETH, USD。</td></tr><tr><td>quoteCcy</td><td>String</td><td>Spread计价单位。如 USDT，USD。</td></tr><tr><td>tickSz</td><td>String</td><td>下单价格精度，如 0.0001。单位为Spread计价单位quoteCcy。</td></tr><tr><td>minSz</td><td>String</td><td>最小下单数量。单位为Spread数量单位szCcy。</td></tr><tr><td>lotSz</td><td>String</td><td>下单数量精度。单位为Spread数量单位szCcy。</td></tr><tr><td>listTime</td><td>String</td><td>上线日期。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>expTime</td><td>String</td><td>失效日期。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>uTime</td><td>String</td><td>上次更新时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>legs</td><td>array of objects</td><td>腿</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt; side</td><td>String</td><td>产品方向<br><code>buy</code>：买入<br><code>sell</code>：卖出</td></tr></tbody></table>

### 获取Spread产品深度（公共）

获取Spread产品深度列表

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/sprd/books`

> 请求示例

```
GET /api/v5/sprd/books?sprdId=BTC-USDT_BTC-USDT-SWAP
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取深度
result = spreadAPI.get_order_book(sprdId="BTC-USDT_BTC-USDT-SWAP", sz=20)
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>是</td><td>spread ID，如BTC-USDT_BTC-USDT-SWAP</td></tr><tr><td>sz</td><td>String</td><td>否</td><td>深度档位数量。最大值为400。默认值为5。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "asks": [
                [
                    "41006.8", // 价格
                    "0.60038921", // 数量
                    "1" // 此价格上订单数量
                ]
            ],
            "bids": [
                [
                    "41006.3",
                    "0.30178218",
                    "2"
                ]
            ],
            "ts": "1629966436396"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>asks</td><td>Array of Arrays</td><td>卖方深度</td></tr><tr><td>bids</td><td>Array of Arrays</td><td>买方深度</td></tr><tr><td>ts</td><td>String</td><td>深度产生的时间</td></tr></tbody></table>

::: tip
asks和bids值数组举例说明： \["411.8", "10", "4"\]  
\- 411.8为深度价格  
\- 10为此价格的数量 (单位为szCcy）  
\- 4为此价格的订单数量
:::

### 获取单个Spread产品行情信息（公共）

获取单个Spread产品行情信息，包括最新成交价，买一卖一价及数量。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/sprd-ticker`

> 请求示例

```
GET /api/v5/market/sprd-ticker?sprdId=BTC-USDT_BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>是</td><td>spread ID, 如 BTC-USDT_BTC-USDT-SWAP</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "sprdId": "BTC-USDT_BTC-USDT-SWAP",
            "last": "14.5",
            "lastSz": "0.5",
            "askPx": "8.5",
            "askSz": "12.0",
            "bidPx": "0.5",
            "bidSz": "12.0",
            "open24h": "4",
            "high24h": "14.5",
            "low24h": "-2.2",
            "vol24h": "6.67",
            "ts": "1715331406485"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>last</td><td>String</td><td>最新成交价</td></tr><tr><td>lastSz</td><td>String</td><td>最新成交的数量</td></tr><tr><td>askPx</td><td>String</td><td>卖一价</td></tr><tr><td>askSz</td><td>String</td><td>卖一价对应的数量</td></tr><tr><td>bidPx</td><td>String</td><td>买一价</td></tr><tr><td>bidSz</td><td>String</td><td>买一价对应的数量</td></tr><tr><td>open24h</td><td>String</td><td>24小时开盘价</td></tr><tr><td>high24h</td><td>String</td><td>24小时最高价</td></tr><tr><td>low24h</td><td>String</td><td>24小时最低价</td></tr><tr><td>vol24h</td><td>String</td><td>24小时交易量<br>正向及混合价差，单位为交易货币；反向价差，单位为美元</td></tr><tr><td>ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr></tbody></table>

### 获取公共成交数据（公共）

查询市场上的Spread成交信息数据，每次请求最多返回500条结果。结果按时间倒序返回。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/sprd/public-trades`

> 请求示例

```
GET /api/v5/sprd/public-trades?sprdId=BTC-USDT_BTC-USDT-SWAP
```

```
import okx.SpreadTrading as SpreadTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

spreadAPI = SpreadTrading.SpreadTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取公共交易信息
result = spreadAPI.get_public_trades(sprdId='ETH-USDT-SWAP_ETH-USDT-230929')
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>否</td><td>Spread ID，例如BTC-USDT_BTC-USDT-SWAP</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "sprdId": "BTC-USDT_BTC-USDC-SWAP",
            "side": "sell",
            "sz": "0.1",
            "px": "964.1",
            "tradeId": "242720719",
            "ts": "1654161641568"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>tradeId</td><td>String</td><td>交易ID</td></tr><tr><td>px</td><td>String</td><td>成交价格</td></tr><tr><td>sz</td><td>String</td><td>成交数量</td></tr><tr><td>side</td><td>String</td><td>Taker的交易方向 <code>buy</code>：买 <code>sell</code>：卖</td></tr><tr><td>ts</td><td>String</td><td>交易时间，Unix时间戳的毫秒数格式， 如 ： <code>1597026383085</code></td></tr></tbody></table>

最多可以查询到最近500条公共成交信息。

### 获取价差交易产品K线数据

获取K线数据。K线数据按请求的粒度分组返回，K线数据每个粒度最多可获取最近1,440条。

#### 限速: 40次/2s

#### 限速规则： IP

#### HTTP请求

`GET /api/v5/market/sprd-candles`

> 请求示例

```
GET /api/v5/market/sprd-candles?sprdId=BTC-USDT_BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr><tr><td>bar</td><td>String</td><td>否</td><td>时间粒度，默认值1m，如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0开盘价k线：[/6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc]</td></tr><tr><td>after</td><td>String</td><td>否</td><td>请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的ts</td></tr><tr><td>before</td><td>String</td><td>否</td><td>请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的ts, 单独使用时，会返回最新的数据。</td></tr><tr><td>limit</td><td>String</td><td>否</td><td>分页返回的结果集数量，最大为300，不填默认返回100条</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
     [
        "1597026383085",
        "3.721",
        "3.743",
        "3.677",
        "3.708",
        "8422410",
        "0"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "24912403",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>开始时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>o</td><td>String</td><td>开盘价格</td></tr><tr><td>h</td><td>String</td><td>最高价格</td></tr><tr><td>l</td><td>String</td><td>最低价格</td></tr><tr><td>c</td><td>String</td><td>收盘价格</td></tr><tr><td>vol</td><td>String</td><td>交易量</td></tr><tr><td>confirm</td><td>String</td><td>K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

::: tip
返回的第一条K线数据可能不是完整周期k线，返回值数组顺序分别为是：\[ts,o,h,l,c,vol,confirm\].
:::

### 获取价差交易产品历史K线数据

获取最近几年的历史k线数据

#### 限速: 20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/sprd-history-candles`

> 请求示例

```
GET /api/v5/market/sprd-history-candles?sprdId=BTC-USDT_BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr><tr><td>after</td><td>String</td><td>否</td><td>请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的ts</td></tr><tr><td>before</td><td>String</td><td>否</td><td>请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的ts, 单独使用时，会返回最新的数据。</td></tr><tr><td>bar</td><td>String</td><td>否</td><td>时间粒度，默认值1m，如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0开盘价k线：[6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc]</td></tr><tr><td>limit</td><td>String</td><td>否</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
     [
        "1597026383085",
        "3.721",
        "3.743",
        "3.677",
        "3.708",
        "8422410",
        "1"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "24912403",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>开始时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>o</td><td>String</td><td>开盘价格</td></tr><tr><td>h</td><td>String</td><td>最高价格</td></tr><tr><td>l</td><td>String</td><td>最低价格</td></tr><tr><td>c</td><td>String</td><td>收盘价格</td></tr><tr><td>vol</td><td>String</td><td>交易量</td></tr><tr><td>confirm</td><td>String</td><td>K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是： \[ts,o,h,l,c,vol,confirm\]
:::

### 倒计时全部撤单

在倒计时结束后，取消所有挂单。仅适用于价差交易。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/sprd/cancel-all-after`

> 请求示例

```
POST /api/v5/sprd/cancel-all-after
{
   "timeOut":"30"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeOut</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">取消挂单的倒计时，单位为秒<br>取值范围为 0, [10, 120]<br>0 代表不使用该功能</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "triggerTime":"1587971460",
            "ts":"1587971400"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">触发撤单的时间<br>triggerTime=0 代表未使用该功能</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">请求被接收到的时间</td></tr></tbody></table>

::: tip
建议用户每一秒调用接口一次。当倒计时全部撤单被触发时，交易引擎将为用户逐一取消其挂单，该操作可能持续数秒。该功能起到保护用户的作用，不应作为交易策略使用。
:::

## Websocket交易API

### WS / 下单

只有当您的账户有足够的资金才能下单。

#### 服务地址

/ws/v5/business (需要登录)

#### 限速：20次/2s

#### 限速规则：User ID

::: tip
同Nitro Spread\`下单\` REST API 共享限速
:::

> 请求示例

```
{
  "id": "1512",
  "op": "sprd-order",
  "args": [
    {
       "sprdId":"BTC-USDT_BTC-USDT-SWAP",
       "clOrdId":"b15",
       "side":"buy",
       "ordType":"limit",
       "px":"2.15",
       "sz":"2"
    }
  ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">支持的业务操作，<code>sprd-order</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; sprdId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT_BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">由用户设置的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-16位之间。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托价，仅适用于<code>limit</code>、<code>post_only</code>、<code>ioc</code>类型的订单</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "op": "sprd-order",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "tag": "",
        "sCode": "0",
        "sMsg": ""
    }],
    "code": "0",
    "msg": ""
}
```

> 失败返回示例

```
{
    "id": "1512",
    "op": "sprd-order",
    "data": [{
        "clOrdId": "",
        "ordId": "",
        "tag": "",
        "sCode": "5XXXX",
        "sMsg": "not exist"
    }],
    "code": "1",
    "msg": ""
}
```

> 格式错误返回示例

```
{
    "id": "1512",
    "op": "sprd-order",
    "data": [],
    "code": "60013",
    "msg": "Invalid args"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr></tbody></table>

::: tip
clOrdId  
clOrdId是用户自定义的唯一ID用来识别订单。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。 clOrdId不能与当前所有的挂单的clOrdId重复
:::

### WS / 改单

修改当前未成交的订单

#### 服务地址

/ws/v5/business (需要登录)

#### 限速：20次/2s

#### 限速规则：User ID

::: tip
同Nitro Spread\`改单\` REST API 共享限速
:::

> 请求示例

```
{
   "id":"1512",
   "op":"sprd-amend-order",
   "args":[
      {
         "ordId":"2510789768709120",
         "newSz":"2"
      }
   ]
}
```

#### 请求参数

<table><thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>是</td><td>消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>支持的业务操作，<code>sprd-amend-order</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求参数</td></tr><tr><td>&gt; ordId</td><td>String</td><td>可选</td><td>订单ID<br>ordId 和 clOrdId必须传一个，若传两个，以 ordId 为主</td></tr><tr><td>&gt; clOrdId</td><td>String</td><td>可选</td><td>由用户设置的订单ID</td></tr><tr><td>&gt; reqId</td><td>String</td><td>否</td><td>用户自定义修改事件ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td>&gt; newSz</td><td>String</td><td>可选</td><td>修改的新数量，对于部分成交订单，该数量应包含已成交数量。<br><code>newSz</code> 或 <code>newPx</code>至少传一个。</td></tr><tr><td>&gt; newPx</td><td>String</td><td>可选</td><td>修改后的新价格</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "op": "sprd-amend-order",
  "data": [
    {
      "clOrdId": "",
      "ordId": "2510789768709120",
      "reqId": "b12344",
      "sCode": "0",
      "sMsg": ""
    }
  ],
  "code": "0",
  "msg": ""
}
```

> 失败返回示例

```
{
  "id": "1512",
  "op": "sprd-amend-order",
  "data": [
    {
      "clOrdId": "",
      "ordId": "2510789768709120",
      "reqId": "b12344",
      "sCode": "5XXXX",
      "sMsg": "order not exist"
    }
  ],
  "code": "1",
  "msg": ""
}
```

> 格式错误返回示例

```
{
  "id": "1512",
  "op": "sprd-amend-order",
  "data": [],
  "code": "60013",
  "msg": "Invalid args"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>消息的唯一标识</td></tr><tr><td>op</td><td>String</td><td>操作</td></tr><tr><td>code</td><td>String</td><td>代码</td></tr><tr><td>msg</td><td>String</td><td>消息</td></tr><tr><td>data</td><td>Array of objects</td><td>请求成功后返回的数据</td></tr><tr><td>&gt; ordId</td><td>String</td><td>订单ID</td></tr><tr><td>&gt; clOrdId</td><td>String</td><td>由用户设置的订单ID</td></tr><tr><td>&gt; reqId</td><td>String</td><td>用户自定义修改事件ID</td></tr><tr><td>&gt; sCode</td><td>String</td><td>订单状态码，0 代表成功</td></tr><tr><td>&gt; sMsg</td><td>String</td><td>订单状态消息</td></tr></tbody></table>

::: tip
newSz  
若修改订单时，订单修改后的新数量小于或等于 (accFillSz + canceledSz + pendingSettleSz)，在 pendingSettleSz 结算后，订单状态会根据 canceledSz 的不同而不同。当 canceledSz = 0，订单状态将被改为 filled；当 canceledSz > 0，订单状态将被改为 canceled。
:::

::: tip
修改订单返回sCode等于0不能严格认为该订单已经被修改，只表示您的修改订单请求被系统服务器所接受，改单结果以订单频道推送的状态或者查询订单状态为准
:::

### WS / 撤单

撤销当前未完成订单

#### 服务地址

/ws/v5/business (需要登录)

#### 限速：20次/2s

#### 限速规则：User ID

::: tip
同Nitro Spread\`撤单\` REST API 共享限速
:::

> 请求示例

```
{
  "id": "1514",
  "op": "sprd-cancel-order",
  "args": [
    {
      "ordId": "2510789768709120"
    }
  ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">支持的业务操作，<code>sprd-cancel-order</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">订单ID<br>ordId和clOrdId必须传一个，若传两个，以 ordId 为主</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">用户提供的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度要在1-32位之间。</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1514",
    "op": "sprd-cancel-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "sCode": "0",
        "sMsg": ""
    }],
    "code": "0",
    "msg": ""
}
```

> 失败返回示例

```
{
    "id": "1514",
    "op": "sprd-cancel-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "sCode": "5XXXX",
        "sMsg": "Order not exist"
    }],
    "code": "1",
    "msg": ""
}
```

> 格式错误返回示例

```
{
    "id": "1514",
    "op": "sprd-cancel-order",
    "data": [],
    "code": "60013",
    "msg": "Invalid args"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr></tbody></table>

::: tip
撤单返回sCode等于0不能严格认为该订单已经被撤销，只表示您的撤单请求被系统服务器所接受，撤单结果以订单频道推送的状态或者查询订单状态为准
:::

### WS / 全部撤单

#### 服务地址

/ws/v5/business (需要登录)

#### 限速：5次/2s

#### 限速规则：User ID

> 请求示例

```
{
    "id": "1512",
    "op": "sprd-mass-cancel",
    "args": [{
        "sprdId":"BTC-USDT_BTC-USDT-SWAP"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">支持的业务操作，<code>sprd-mass-cancel</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; sprdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">价差ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "op": "sprd-mass-cancel",
    "data": [
        {
            "result": true
        }
    ],
    "code": "0",
    "msg": ""
}
```

> 格式错误返回示例

```
{
    "id": "1512",
    "op": "sprd-mass-cancel",
    "data": [],
    "code": "60013",
    "msg": "Invalid args"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; result</td><td style="text-align: left">Boolean</td><td style="text-align: left">撤单结果<br><code>true</code>：全部撤单成功<br><code>false</code>：全部撤单失败</td></tr></tbody></table>

## WebSocket私有频道

*   实盘地址: `wss://ws.okx.com:8443/ws/v5/business`
*   模拟盘地址: `wss://wspap.okx.com:8443/ws/v5/business`

### 订单频道

通过订阅`sprd-orders`频道获取Spread订单信息，首次订阅不推送，只有当下单、撤单等事件触发时，推送数据。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例：单个

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-orders",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPrivateAsync import WsPrivateAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "sprd-orders",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例：

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-orders",
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPrivateAsync import WsPrivateAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "sprd-orders",
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>sprd-orders</code></td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr></tbody></table>

> 成功返回示例：单个

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "sprd-orders",
    "sprdId": "BTC-USDT_BTC-UST-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "sprd-orders"
  },
  "connId": "a4d3ae55"
}
```

> 失败返回示例

```
{
  "id": "1512",
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"sprd-orders\", \"instType\" : \"FUTURES\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>否</td><td>Spread ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
  "arg": {
        "channel": "sprd-orders",
        "sprdId": "BTC-USDT_BTC-USDT-SWAP",
        "uid": "614488474791936"
    },
  "data": [
     {
      "sprdId": "BTC-USDT_BTC-UST-SWAP",
      "ordId": "312269865356374016",
      "clOrdId": "b1",
      "tag": "",
      "px": "999",
      "sz": "3",
      "ordType": "limit",
      "side": "buy",
      "fillSz": "0",
      "fillPx": "",
      "tradeId": "",
      "accFillSz": "0",
      "pendingFillSz": "2",
      "pendingSettleSz": "1",
      "canceledSz": "1",
      "state": "live",
      "avgPx": "0",
      "cancelSource": "",
      "uTime": "1597026383085",
      "cTime": "1597026383085",
      "code": "0",
      "msg": "",
      "reqId": "",
      "amendResult": ""
    }
  ]

}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>&gt; ordId</td><td>String</td><td>订单ID</td></tr><tr><td>&gt; clOrdId</td><td>String</td><td>由用户设置的订单ID来识别您的订单</td></tr><tr><td>&gt; tag</td><td>String</td><td>订单标签</td></tr><tr><td>&gt; px</td><td>String</td><td>委托价格</td></tr><tr><td>&gt; sz</td><td>String</td><td>原始委托数量，单位szCcy</td></tr><tr><td>&gt; ordType</td><td>String</td><td>订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td>&gt; side</td><td>String</td><td>订单方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt; fillSz</td><td>String</td><td>最新成交数量，适用于结算成功的订单更新</td></tr><tr><td>&gt; fillPx</td><td>String</td><td>最新成交价格，适用于结算成功的订单更新</td></tr><tr><td>&gt; tradeId</td><td>String</td><td>最近成交ID</td></tr><tr><td>&gt; accFillSz</td><td>String</td><td>累计成交数量</td></tr><tr><td>&gt; pendingFillSz</td><td>String</td><td>待成交数量，包括待结算数量</td></tr><tr><td>&gt; pendingSettleSz</td><td>String</td><td>待结算数量</td></tr><tr><td>&gt; canceledSz</td><td>String</td><td>撤单数量</td></tr><tr><td>&gt; avgPx</td><td>String</td><td>成交均价，如果成交数量为0，该字段为"0"</td></tr><tr><td>&gt; state</td><td>String</td><td>订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交</td></tr><tr><td>&gt; cancelSource</td><td>String</td><td>撤单原因<br><code>0</code>: 系统撤单<br><code>1</code>: 用户撤单<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>20</code>: 系统倒计时撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>34</code>: 订单结算失败因为保证金不足<br><code>35</code>: 撤单因为其他订单保证金不足<br><code>44</code>：由于该币种的可用余额不足，无法在触发自动换币后进行兑换，您的订单已撤销，撤销订单后恢复的余额将用于自动换币。当该币种的总抵押借贷量达到平台抵押借贷风控上限时，则会触发自动换币。</td></tr><tr><td>&gt; uTime</td><td>String</td><td>订单更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; cTime</td><td>String</td><td>订单创建时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; code</td><td>String</td><td>错误码，默认为0</td></tr><tr><td>&gt; msg</td><td>String</td><td>错误消息，默认为""</td></tr><tr><td>&gt; reqId</td><td>String</td><td>修改订单时使用的request ID，如果没有修改，该字段为""</td></tr><tr><td>&gt; amendResult</td><td>String</td><td>修改订单的结果<br><code>-1</code>：失败<br><code>0</code>：成功<br>如果没有修改，该字段为""</td></tr></tbody></table>

### 成交数据频道

通过订阅 `sprd-trades` 频道接收与用户成交信息相关的更新。

已成交（`filled`）和被拒绝（`rejected`）的交易都会通过此频道推送更新。

如果你的订单与多个订单相匹配，你有可能会收到多条更新推送。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例：单个

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-trades",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPrivateAsync import WsPrivateAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "sprd-trades",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例：

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-trades"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPrivateAsync import WsPrivateAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "sprd-trades"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>sprd-trades</code></td></tr><tr><td>&gt; sprdId</td><td>String</td><td>否</td><td>Spread ID</td></tr></tbody></table>

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>否</td><td>Spread ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "sprd-trades",
        "sprdId": "BTC-USDT_BTC-USDT-SWAP",
        "uid": "614488474791936"
    },
    "data":[
         {
            "sprdId":"BTC-USDT-SWAP_BTC-USDT-200329",
            "tradeId":"123",
            "ordId":"123445",
            "clOrdId": "b16",
            "tag":"",
            "fillPx":"999",
            "fillSz":"3",
            "state": "filled",
            "side":"buy",
            "execType":"M",
            "ts":"1597026383085",
            "legs": [
                {
                    "instId": "BTC-USDT-SWAP",
                    "px": "20000",
                    "sz": "3",
                    "szCont": "0.03",
                    "side": "buy",
                    "fillPnl": "",
                    "fee": "",
                    "feeCcy": "",
                    "tradeId": "1232342342"
                },
                {
                    "instId": "BTC-USDT-200329",
                    "px": "21000",
                    "sz": "3",
                    "szCont": "0.03",
                    "side": "sell",
                    "fillPnl": "",
                    "fee": "",
                    "feeCcy": "",
                    "tradeId": "5345646634"
                },
            ]
            "code": "",
            "msg": ""
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>data</td><td>Array of objects</td><td>Subscribed data</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>&gt; tradeId</td><td>String</td><td>交易ID</td></tr><tr><td>&gt; ordId</td><td>String</td><td>订单ID</td></tr><tr><td>&gt; clOrdId</td><td>String</td><td>由用户设置的订单ID</td></tr><tr><td>&gt; tag</td><td>String</td><td>订单标签</td></tr><tr><td>&gt; fillPx</td><td>String</td><td>最新成交价</td></tr><tr><td>&gt; fillSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>&gt; side</td><td>String</td><td>交易方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt; state</td><td>String</td><td>交易状态。<br><code>filled</code>: 已成交<br><code>rejected</code>: 被拒绝</td></tr><tr><td>&gt; execType</td><td>String</td><td>流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td>&gt;ts</td><td>String</td><td>成交明细产生时间，Unix时间戳的毫秒数格式，如1597026383085</td></tr><tr><td>&gt; legs</td><td>Array of objects</td><td>交易的腿</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品 ID</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>价格</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>数量</td></tr><tr><td>&gt;&gt; szCont</td><td>String</td><td>成交合约数量<br>仅适用于合约，现货将返回""</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>交易方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td>&gt;&gt; fillPnl</td><td>String</td><td>最新成交收益，适用于有成交的平仓订单。其他情况均为0。</td></tr><tr><td>&gt;&gt; fee</td><td>String</td><td>手续费金额或者返佣金额，手续费扣除为‘负数’，如-0.01；手续费返佣为‘正数’，如 0.01</td></tr><tr><td>&gt;&gt; feeCcy</td><td>String</td><td>交易手续费币种或者返佣金币种</td></tr><tr><td>&gt;&gt; tradeId</td><td>String</td><td>交易ID</td></tr><tr><td>&gt; code</td><td>String</td><td>错误码，默认0</td></tr><tr><td>&gt; msg</td><td>String</td><td>错误提示，默认 ""</td></tr></tbody></table>

## WebSocket公共频道

*   实盘地址: `wss://ws.okx.com:8443/ws/v5/business`
*   模拟盘地址: `wss://wspap.okx.com:8443/ws/v5/business`

### 深度频道

获取Spread深度数据。可用频道有：

*   `sprd-bbo-tbt`: 首次推1档快照数据，以后定量推送，每10毫秒当1档快照数据有变化推送一次1档数据
*   `sprd-books5`: 首次推5档快照数据，以后定量推送，每100毫秒当5档快照数据有变化推送一次5档数据
*   `sprd-books-l2-tbt`: 首次推400档快照数据，以后增量推送，每10毫秒推送一次变化的数据
*   单个连接、交易产品维度，深度频道的推送顺序固定为：sprd-bbo-tbt -> sprd-books-l2-tbt -> sprd-books5

#### URL Path

/ws/v5/business

> 请求示例：sprd-books5

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-books5",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "sprd-books5",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

> 请求示例：sprd-books-l2-tbt

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-books-l2-tbt",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "sprd-books-l2-tbt",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表<br><code>sprd-bbo-tbt</code><br><code>sprd-books5</code><br><code>sprd-books-l2-tbt</code></td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>spread ID</td></tr></tbody></table>

> 返回示例：sprd-books5

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "sprd-books5",
    "sprdId": "BTC-USDT_BTC-USDT-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 返回示例：sprd-books-l2-tbt

```
{
  "id": "1512",
   "event":"subscribe",
   "arg":{
      "channel":"sprd-books-l2-tbt",
      "sprdId":"BTC-USDT_BTC-USDT-SWAP"
   },
   "connId":"214fdd24"
}
```

> 失败示例

```
{
  "id": "1512",
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"args\":[{ \"channel\" : \"sprd-books5\", \"sprdId\" : \"BTC-USD_BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道<br><code>sprd-bbo-tbt</code><br><code>sprd-books5</code><br><code>sprd-books-l2-tbt</code></td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>spread ID</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例：sprd-books5

```
{
  "arg": {
    "channel": "sprd-books5",
    "sprdId": "BTC-USDT_BTC-USDT-SWAP"
  },
  "data": [
    {
      "asks": [
        ["111.06","55154","2"],
        ["111.07","53276","2"],
        ["111.08","72435","2"],
        ["111.09","70312","2"],
        ["111.1","67272","2"]],
      "bids": [
        ["111.05","57745","2"],
        ["111.04","57109","2"],
        ["111.03","69563","2"],
        ["111.02","71248","2"],
        ["111.01","65090","2"]],
      "ts": "1670324386802",
      "seqId":1724294007352168320
    }
  ]
}
```

> 推送示例：sprd-books-l2-tbt

```
{
   "arg":{
      "channel":"sprd-books-l2-tbt",
      "sprdId":"BTC-USDT_BTC-USDT-SWAP"
   },
   "action":"snapshot",
   "data":[
      {
         "asks":[
            ["1.9","1.1","3"],
            ["2.5","0.9","1"],
            ["3.2","4.921","1"],
            ["4.8","0.165","1"],
            ["5.2","4.921","1"]
          ......
         ],
         "bids":[
            ["1.8","0.165","1"],
            ["0.6","0.2","2"],
            ["0","23.49","1"],
            ["-0.1","1","1"],
            ["-0.6","1","1"],
            ["-3.9","4.921","1"]
            ......
         ],
         "ts":"1724391380926",
         "checksum":-1285595583,
         "prevSeqId":-1,
         "seqId":1724294007352168320
      }
   ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>Spread ID</td></tr><tr><td>action</td><td>String</td><td>推送数据动作，增量推送数据还是全量推送数据<br><code>snapshot</code>：全量<br><code>update</code>：增量</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; asks</td><td>Array of strings</td><td>卖方深度</td></tr><tr><td>&gt; bids</td><td>Array of strings</td><td>买方深度</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据更新时间戳，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; checksum</td><td>Integer</td><td>检验和 （下方注解）。仅适用&nbsp;<code>sprd-books-l2-tbt</code></td></tr><tr><td>&gt; prevSeqId</td><td>Integer</td><td>上一个推送的序列号。仅适用&nbsp;<code>sprd-books-l2-tbt</code></td></tr><tr><td>&gt; seqId</td><td>Integer</td><td>推送的序列号 （下方注解）</td></tr></tbody></table>

::: tip
asks和bids值数组举例说明： \["411.8", "10", "4"\]  
\- 411.8为深度价格  
\- 10为此价格的数量 （单位为szCcy)  
\- 4为此价格的订单数量
:::

#### 序列号

`seqId`是交易所行情的一个序号。如果用户通过多个websocket连接同一频道，收到的序列号会是相同的。每个`sprdId`对应一套。用户可以使用在增量推送频道的`prevSeqId`和`seqId`来构建消息序列。这将允许用户检测数据包丢失和消息的排序。正常场景下`seqId`的值大于`prevSeqId`。新消息中的`prevSeqId`与上一条消息的`seqId`匹配。最小序列号值为0，除了快照消息的`prevSeqId`为-1。  

异常情况：  
1\. 如果一段时间内没有深度更新，OKX将发一条消息`'asks': [], 'bids': []`以通知用户连接是正常的。推送的`seqId`跟上一条信息的一样，`prevSeqId`等于`seqId`。 2. 序列号可能由于维护而重置，在这种情况下，用户将收到一条`seqId`小于`prevSeqId`的增量消息。随后的消息将遵循常规的排序规则。

##### 示例

1.  快照推送：`prevSeqId = -1`，`seqId = 10`
2.  增量推送1（正常更新）：`prevSeqId = 10`，`seqId = 15`
3.  增量推送2（无更新）：`prevSeqId = 15`，`seqId = 15`
4.  增量推送3（序列重置）：`prevSeqId = 15`，`seqId = 3`
5.  增量推送4（正常更新）：`prevSeqId = 3`，`seqId = 5`

#### Checksum机制

此机制可以帮助用户校验深度数据的准确性。

##### 深度合并

用户订阅增量推送深度频道成功后，首先获取初始全量深度数据，当获取到增量推送数据后，更新本地全量深度数据。

1.  如果有相同价格，则比较数量；数量为0删除此深度，数量有变化则替换此数据。
2.  如果没有相同价格，则按照价格优劣排序（bid为价格降序，ask为价格升序），将深度信息插入到全量数据中

##### 计算校验和

先用深度合并后前25档bids和asks组成一个字符串（其中ask和bid中的价格和数量以冒号连接），再计算其crc32值（32位有符号整型）。

### 公共成交数据频道

订阅`sprd-public-trades`获取最近的成交数据，有成交数据就推送，每次推送仅包含一条成交数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-public-trades",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "sprd-public-trades",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>sprd-public-trades</code></td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
      "channel": "sprd-public-trades",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 失败返回示例

```
{
  "id": "1512",
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"sprd-public-trades\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "sprd-public-trades",
        "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    },
    "data": [
        {
            "sprdId": "BTC-USDT_BTC-USDT-SWAP",
            "tradeId": "2499206329160695808",
            "px": "-10",
            "sz": "0.001",
            "side": "sell",
            "ts": "1726801105519"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>&gt; tradeId</td><td>String</td><td>交易 ID</td></tr><tr><td>&gt; px</td><td>String</td><td>成交价格</td></tr><tr><td>sz</td><td>String</td><td>成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td>&gt; side</td><td>String</td><td>成交方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt; ts</td><td>String</td><td>成交时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr></tbody></table>

### 行情频道

订阅`sprd-tickers`获取产品的最新成交价、买一价、卖一价及数量等信息。 最快100ms推送一次，没有触发事件时最慢1s推送一次，触发推送的事件有：成交、买一卖一发生变动。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "sprd-tickers",
      "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    }
  ]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "sprd-tickers",
          "sprdId": "BTC-USDT_BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>sprd-tickers</code></td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>spread ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "sprd-tickers",
    "sprdId": "BTC-USDT_BTC-USDT-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 失败返回示例

```
{
  "id": "1512",
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"sprd-tickers\", \"instId\" : \"LTC-USD-200327\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "sprd-tickers",
        "sprdId": "BTC-USDT_BTC-USDT-SWAP"
    },
    "data": [
        {
            "sprdId": "BTC-USDT_BTC-USDT-SWAP",
            "last": "4",
            "lastSz": "0.01",
            "askPx": "19.7",
            "askSz": "5.79",
            "bidPx": "5.9",
            "bidSz": "5.79",
            "open24h": "-7",
            "high24h": "19.6",
            "low24h": "-7",
            "vol24h": "9.87",
            "ts": "1715247061026"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>spread ID</td></tr><tr><td>&gt; last</td><td>String</td><td>最新成交价</td></tr><tr><td>&gt; lastSz</td><td>String</td><td>最新成交的数量</td></tr><tr><td>&gt; askPx</td><td>String</td><td>卖一价</td></tr><tr><td>&gt; askSz</td><td>String</td><td>卖一价对应的量</td></tr><tr><td>&gt; bidPx</td><td>String</td><td>买一价</td></tr><tr><td>&gt; bidSz</td><td>String</td><td>买一价对应的数量</td></tr><tr><td>&gt; open24h</td><td>String</td><td>24小时开盘价</td></tr><tr><td>&gt; high24h</td><td>String</td><td>24小时最高价</td></tr><tr><td>&gt; low24h</td><td>String</td><td>24小时最低价</td></tr><tr><td>&gt; vol24h</td><td>String</td><td>24小时交易量，单元为交易货币或美元</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr></tbody></table>

::: tip
vol24h  
对于现货/U本位合约价差交易产品，以及U本位合约价差交易产品，交易量以交易货币为单位；对于币本位合约价差交易产品，交易量以USD为单位。
:::

### K线频道

该频道使用业务WebSocket，不需鉴权。

获取K线数据，推送频率最快是间隔1秒推送一次数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
   "id": "1512",
   "op":"subscribe",
   "args":[
      {
         "channel":"sprd-candle1D",
         "sprdId":"BTC-USDT_BTC-USDT-SWAP"
      }
   ]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
      {
         "channel":"sprd-candle1D",
         "sprdId":"BTC-USDT_BTC-USDT-SWAP"
      }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>sprd-candle3M</code> <code>sprd-candle1M</code><br><code>sprd-candle1W</code><br><code>sprd-candle1D</code> <code>sprd-candle2D</code> <code>sprd-candle3D</code> <code>sprd-candle5D</code><br><code>sprd-candle12H</code> <code>sprd-candle6H</code> <code>sprd-candle4H</code> <code>sprd-candle2H</code> <code>sprd-candle1H</code><br><code>sprd-candle30m</code> <code>sprd-candle15m</code> <code>sprd-candle5m</code> <code>sprd-candle3m</code> <code>sprd-candle1m</code><br><code>sprd-candle3Mutc</code> <code>sprd-candle1Mutc</code> <code>sprd-candle1Wutc</code> <code>sprd-candle1Dutc</code> <code>sprd-candle2Dutc</code> <code>sprd-candle3Dutc</code> <code>sprd-candle5Dutc</code> <code>sprd-candle12Hutc</code> <code>sprd-candle6Hutc</code></td></tr><tr><td>&gt; sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "sprd-candle1D",
    "sprdId": "BTC-USDT_BTC-USDT-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 失败返回示例

```
{
  "id": "1512",
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"sprd-candle1D\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>sprdId</td><td>String</td><td>是</td><td>Spread ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "sprd-candle1D",
    "sprdId": "BTC-USDT_BTC-USD-SWAP"
  },
  "data": [
    [
      "1597026383085",
      "8533.02",
      "8553.74",
      "8527.17",
      "8548.26",
      "45247",
      "0"
    ]
  ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; sprdId</td><td>String</td><td>Spread ID</td></tr><tr><td>data</td><td>Array of Arrays</td><td>订阅的数据</td></tr><tr><td>&gt; ts</td><td>String</td><td>开始时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; o</td><td>String</td><td>开盘价格</td></tr><tr><td>&gt; h</td><td>String</td><td>最高价格</td></tr><tr><td>&gt; l</td><td>String</td><td>最低价格</td></tr><tr><td>&gt; c</td><td>String</td><td>收盘价格</td></tr><tr><td>&gt; vol</td><td>String</td><td>交易量</td></tr><tr><td>&gt; confirm</td><td>String</td><td>K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是： \[ts,o,h,l,c,vol,confirm\]
:::
