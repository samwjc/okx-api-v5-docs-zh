---
title: 大宗交易
outline: deep
---

## 大宗交易工作流程

大宗交易时指在非公开市场进行的、私下议定的、满足规定最小交易手数的期货、期权、交割、永续或混合产品的大单交易。 交易细节一经确认，此笔交易会被提交到OKX以进行保证金计算，清算和执行。

**基本概念**

1.  **询价单（RFQs） -** 询价单，由询价方发给报价方. 询价单包括询价方希望交易的一种或多种产品及其数量。
2.  **报价单 -** 报价单，由报价方发给询价方对询价单的报价。
3.  **交易** - 当询价方接受并执行报价方的报价单，一笔交易就由此产生。

**基本工作流程**

要以询价方或报价方身份进行交易，用户需要在交易账户中存入至少100,000美元。 此外，要成为报价方[请填写表格以访问大宗交易](https://share.hsforms.com/1mYdfKtJJR3CC03IyCeC6hg3a1fq).

1.  询价方创建一个询价单（RFQ），并选择希望收到此询价单的报价方。 
2.  不同报价方发送报价单回应此询价单。
3.  询价方选择执行最好的报价单产生交易。OKX收到此笔交易并做结算。
4.  询价方和报价方收到交易执行的确认。
5.  交易详情发布在公共市场数据频道上（不包含交易方信息）。

**询价方角度**

1.  询价方使用`POST /api/v5/rfq/create-rfq`创建询价单。询价方可通过`GET /api/v5/public/instruments`查询可询价产品信息，并通过`GET /api/v5/rfq/counterparties`查询可选择报价方信息。
2.  询价方可以在询价单有效的任何时候通过`POST /api/v5/rfq/cancel-rfq`取消询价单。
3.  报价方，如果是询价方选择的报价方之一，会在`rfqs`推送频道收到询价单信息，并可作出相应报价。
4.  询价方，在`quotes`推送频道收到报价信息后，可以选择最优报价并通过`POST /api/v5/rfq/execute-quote`执行。
5.  询价方会在`struc-block-trades`和`rfqs`推送频道收到交易成功执行确认。
6.  询价方也会在`public-struc-block-trades`推送频道收到此笔交易以及其他OKX大宗交易的确认信息。

**报价方角度**

1.  当有一个新的询价单发出，并且报价方是被选择的报价方之一时，报价方会在rfqs推送频道接收到此询价单信息。
2.  报价方创建一个单向或者双向的报价单并通过`POST /api/v5/rfq/create-quote`发出。
3.  报价方可以通过`POST /api/v5/rfq/cancel-quote`任意取消一个有效的报价单。
4.  询价方选择执行最优报价单。
5.  报价方通过`quotes`推送频道接收他们报价单的状态更新。
6.  报价方会在`struc-block-trades`和`quotes`推送频道收到他们报价单的交易成功执行确认。
7.  报价方也会在`public-struc-block-trades`推送频道收到此笔交易以及其他OKX大宗交易的确认信息。

## REST API

::: tip
现货模式下不支持大宗交易
:::

### 获取报价方信息

查询可以参与交易的报价方信息。

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/rfq/counterparties`

> 请求示例

```
GET /api/v5/rfq/counterparties
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取报价方信息
result = blockTradingAPI.counterparties()
print(result)
```

#### 请求参数

无

> 响应示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "traderName" : "Satoshi Nakamoto",
            "traderCode" : "SATOSHI",
            "type" : "" 
        }
    ]
}
```

#### 响应参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">traderName</td><td style="text-align: left">String</td><td style="text-align: left">报价方名称</td></tr><tr><td style="text-align: left">traderCode</td><td style="text-align: left">String</td><td style="text-align: left">报价方唯一标识代码，公开可见；报价和询价的相关接口都使用该代码代表报价方。</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">报价方类型。<code>LP</code>指通过API连接的自动做市商。</td></tr></tbody></table>

### 询价

创建一个询价单。

::: tip
在模拟交易中询价时，请选择交易机器人“WAGMI”作为交易对手。  
交易机器人提供的报价仅供参考。
:::

了解更多，请访问[帮助中心 > 常见问题 > 交易 > 流动性市场 > 模拟交易](/cn/help/demo-trading)

#### 限速: 5次/2s；80次/12h

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/create-rfq`

> 请求示例

```
POST /api/v5/rfq/create-rfq

{
    "anonymous": true,
    "counterparties":[
        "Trader1",
        "Trader2"
    ],
    "allowPartialExecution":false,
    "clRfqId":"rfq01",
    "tag":"123456",
    "legs":[
        {
            "sz":"25",
            "side":"buy",
            "posSide": "long",
            "tdMode":"cross",
            "ccy":"USDT",
            "instId":"BTC-USD-221208-100000-C"
        },
        {
            "sz":"150",
            "side":"buy",
            "posSide": "long",
            "tdMode":"cross",
            "ccy":"USDT",
            "instId":"ETH-USDT",
            "tgtCcy":"base_ccy"
        }
    ]
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 询价
result = blockTradingAPI.create_rfq(
    anonymous=True,
    counterparties=[
        "Trader1",
        "Trader2"
    ],
    clRfqId= "rfq01",
    legs=[
        {
            "sz":"25",
            "side":"buy",
            "posSide": "long",
            "tdMode":"cross",
            "ccy":"USDT",
            "instId":"BTC-USD-221208-100000-C"
        },
        {
            "sz":"150",
            "side":"buy",
            "posSide": "long",
            "tdMode":"cross",
            "ccy":"USDT",
            "instId":"ETH-USDT",
            "tgtCcy":"base_ccy"
        }
    ]
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">counterparties</td><td style="text-align: left">Array of strings</td><td style="text-align: left">是</td><td style="text-align: left">希望收到询价的报价方列表，可通过<code>/api/v5/rfq/counterparties/</code>获取。</td></tr><tr><td style="text-align: left">anonymous</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否匿名询价，<code>true</code>表示匿名询价，<code>false</code>表示公开询价，默认值为 <code>false</code>，为<code>true</code>时，即使在交易执行之后，身份也不会透露给报价方。</td></tr><tr><td style="text-align: left">clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单自定义ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单标签，与此询价单关联的大宗交易将有相同的标签。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">allowPartialExecution</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">RFQ是否可以被部分执行，如果腿的比例和原RFQ一致。有效值为<code>true</code>或<code>false</code>。默认为<code>false</code>。</td></tr><tr><td style="text-align: left">legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">组合交易，每次最多可以提交15组交易信息</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br><code>合约模式</code>和<code>跨币种保证金模式</code>下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; lmtPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价方期望的报价价格<br>若提供了该字段，在报价价格优于或等于所指定价格，询价将自动被执行，直到该询价单被取消或过期为止。<br>该字段必须提供所有组合交易的价格，以便自动执行询价；或者对所有组合交易留空，否则请求将被拒绝。<br>自动执行的方向取决于询价单的腿方向。<br>对于<code>币币/币币杠杆/交割/永续</code>，lmtPx将以计价货币单位计算。<br>对于<code>期权</code>，lmtPx将以结算货币单位计算。<br>该字段不会被披露给交易对手方。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价单方向</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。在开平仓模式下仅可选择<code>long</code>或<code>short</code>。<br>如未指定，则处于开平仓模式下的用户始终会开新仓位。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr><tr><td style="text-align: left">acctAlloc</td><td style="text-align: left">Array of objects</td><td style="text-align: left">No</td><td style="text-align: left">组合询价单的账户分配</td></tr><tr><td style="text-align: left">&gt; acct</td><td style="text-align: left">String</td><td style="text-align: left">Yes</td><td style="text-align: left">账户名</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">Yes</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">Yes</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">Yes</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">No</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">No</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">No</td><td style="text-align: left">持仓方向</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "cTime":"1611033737572",
            "uTime":"1611033737572",
            "traderCode":"SATOSHI",
            "tag":"123456",
            "rfqId":"22534",
            "clRfqId":"rfq01",
            "allowPartialExecution":false,
            "state":"active",
            "validUntil":"1611033857557",
            "counterparties":[
                "Trader1",
                "Trader2"
            ],
            "legs":[
                {
                    "instId":"BTC-USD-221208-100000-C",
                    "sz":"25",
                    "side":"buy",
                    "posSide": "long",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "tgtCcy":""
                },
                {
                    "instId":"ETH-USDT",
                    "sz":"150",
                    "side":"buy",
                    "posSide": "long",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "tgtCcy":"base_ccy",
                    "tradeQuoteCcy": "USDT"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">询价单结果</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">询价单创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">询价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">询价单的状态<br>有效值为 <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>traded_away</code> <code>failed</code><br><code>filled</code> 表示询价单已成功按照做市商的报价成交。<br><code>traded_away</code> 仅适用于报价方。同一笔询价单可能对一个报价方显示为 <code>filled</code>，而对另一个报价方显示为 <code>traded_away</code>。<br>示例：询价方创建询价单 → 做市商A报价 pxA，做市商B报价 pxB → pxA 优于 pxB → 询价方执行做市商A的报价 → 做市商A看到 <code>filled</code>，做市商B看到 <code>traded_away</code>。</td></tr><tr><td style="text-align: left">&gt; counterparties</td><td style="text-align: left">Array of strings</td><td style="text-align: left">报价方列表</td></tr><tr><td style="text-align: left">&gt; validUntil</td><td style="text-align: left">String</td><td style="text-align: left">询价单的过期时间，Unix时间戳的毫秒数格式。<br>若所有腿都为期权，则询价单将在10分钟后过期；其他情况，询价单将在2分钟后过期。</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户端敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">RFQ标签，与此RFQ关联的大宗交易将有相同的标签。</td></tr><tr><td style="text-align: left">&gt; allowPartialExecution</td><td style="text-align: left">Boolean</td><td style="text-align: left">RFQ是否可以被部分执行，如果腿的比例和原RFQ一致。有效值为<code>true</code>或<code>false</code>。未指定时，默认为<code>false</code>。</td></tr><tr><td style="text-align: left">&gt; traderCode</td><td style="text-align: left">String</td><td style="text-align: left">询价方唯一标识代码。</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易，每个请求最多可放置15条腿</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 "BTC-USDT-SWAP"</td></tr><tr><td style="text-align: left">&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br><code>合约模式</code>和<code>跨币种保证金模式</code>下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">询价单方向<br>有效值为<code>buy</code>和<code>sell</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt;&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; groupId</td><td style="text-align: left">String</td><td style="text-align: left">组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td style="text-align: left">&gt; acctAlloc</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合询价单的账户分配</td></tr><tr><td style="text-align: left">&gt;&gt; acct</td><td style="text-align: left">String</td><td style="text-align: left">账户名</td></tr><tr><td style="text-align: left">&gt;&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt;&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败或成功时的msg</td></tr><tr><td style="text-align: left">&gt;&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr></tbody></table>

::: tip
组合询价单功能介绍  
  
1\. 只有母账户能创建组合询价单，可分配的子账户范围为其普通子账户和资管子账户。  
2\. 用户将传入 acctAlloc 请求参数来指示组合询价单的账户分配详情，包括账户名称、产品ID、分配的数量等。母账户也允许参与，并应标识为 "0"。对于 tdMode、ccy 和 posSide 字段，如果留空，则继承系统默认值。  
3\. 新增 groupId，acctAlloc 作为响应参数。  
4\. 分配子账户的上限为 10 个。如果超过上限，将收到错误代码 70516。  
5\. 对于每个交易产品，所有账户中腿数量的总和应等于组合询价单中的总量。如果不相等，将收到错误代码 70514。  
6\. 对于每个子账户，腿数量与组合询价单的比例必须在所有交易产品中保持一致。如果不一致，将收到错误代码 70515。以下是一个示例：  
    1. 父级询价单腿  
        1. 产品：BTC-USDT，数量：50；产品：ETH-USDT，数量：100  
    2. 子级询价单腿，正常情况  
        1. 账户1：产品：BTC-USDT，数量：30；产品：ETH-USDT，数量：60（比例：0.6）  
        2. 账户2：产品：BTC-USDT，数量：20；产品：ETH-USDT，数量：40（比例：0.4）  
    3. 子级询价单腿，异常情况  
        1. 账户1：产品：BTC-USDT，数量：30；产品：ETH-USDT，数量：50  
        2. 账户2：产品：BTC-USDT，数量：20；产品：ETH-USDT，数量：50  
        3. 总数量相等，但不同子账户的比例不一致。  
7\. 对于 allowPartialExecution 字段，即使用户传入，也将被忽略。对于组合询价单，allowPartialExecution 始终为 true，因为任何子账户都有可能执行失败， Taker 无法确定询价单是否可以部分或完全成交。因此，Maker 应将其视为可以部分成交的询价单。  
8\. 若任何子账户执行失败，则不会创建组合询价单。
:::

### 取消询价单

取消一个询价单。

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-rfq`

> 请求示例

```
POST /api/v5/rfq/cancel-rfq
{
    "rfqId":"22535",
    "clRfqId":"rfq001"
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 取消询价单
result = blockTradingAPI.cancel_rfq(
    rfqId="22535",
    clRfqId="rfq001"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">询价单自定义ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>当 clRfqId 和 rfqId 都传时，以 rfqId 为准。</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "rfqId":"22535",
            "clRfqId":"rfq001",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">RFQ ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的 RFQ ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### 批量取消询价单

取消一个或多个询价单，每次最多可以撤销100个询价单。

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-batch-rfqs`

> 请求示例

```
POST /api/v5/rfq/cancel-batch-rfqs
{
    "rfqIds":[
        "2201",
        "2202",
        "2203"
    ],
    "clRfqIds":[
        "r1",
        "r2",
        "r3"
    ]
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 批量取消询价单
result = blockTradingAPI.cancel_batch_rfqs(
    rfqIds=[
        "2201",
        "2202",
        "2203"
    ],
    clRfqIds=[
        "r1",
        "r2",
        "r3"
    ],
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可选</td><td style="text-align: left">询价单IDs</td></tr><tr><td style="text-align: left">clRfqIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可选</td><td style="text-align: left">询价单自定义ID，当 clRfqIds 和 rfqIds 都传时，以 rfqIds 为准。</td></tr></tbody></table>

> 全部成功示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "rfqId":"2201",
            "clRfqId":"r1",
            "sCode":"0",
            "sMsg":""
        },
        {
            "rfqId":"2202",
            "clRfqId":"r2",
            "sCode":"0",
            "sMsg":""
        },
        {
            "rfqId":"2203",
            "clRfqId":"r3",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

> 部分成功示例

```
{
    "code":"2",
    "msg":"Bulk operation partially ",
    "data":[
        {
            "rfqId":"2201",
            "clRfqId":"r1",
            "sCode":"70000",
            "sMsg":"RFQ does not exist."
        },
        {
            "rfqId":"2202",
            "clRfqId":"r2",
            "sCode":"0",
            "sMsg":""
        },
        {
            "rfqId":"2203",
            "clRfqId":"r3",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

> 失败示例

```
{
    "code":"1",
    "msg":"Operation failed.",
    "data":[
        {
            "rfqId":"2201",
            "clRfqId":"r1",
            "sCode":"70000",
            "sMsg":"RFQ does not exist."
        },
        {
            "rfqId":"2202",
            "clRfqId":"r2",
            "sCode":"70000",
            "sMsg":"RFQ does not exist."
        },
        {
            "rfqId":"2203",
            "clRfqId":"r3",
            "sCode":"70000",
            "sMsg":"RFQ does not exist."
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID.</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### 取消所有询价单

取消所有询价单

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-all-rfqs`

> 请求示例

```
POST /api/v5/rfq/cancel-all-rfqs
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 取消所有询价单
result = blockTradingAPI.cancel_all_rfqs()
print(result)
```

#### 请求参数

无

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ts":"1697026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">成功取消时间，Unix时间戳的毫秒数格式，如 1597026383085。</td></tr></tbody></table>

### 执行报价

执行报价，仅限询价的创建者使用

#### 限速: 2次/3s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/execute-quote`

> 请求示例

```
{
    "rfqId":"22540",
    "quoteId":"84073",
    "legs": [
        {
            "sz":"25",
            "instId":"BTC-USD-20220114-13250-C"
        },
        {
            "sz":"25",
            "instId":"BTC-USDT"
        }
    ]
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 执行报价
result = blockTradingAPI.execute_quote(
    rfqId="22540",
    quoteId="84073"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">用于部分执行的腿的数量。腿的数量比例必须与原RFQ相同。注意：每条腿的<code>tgtCcy</code>和<code>side</code>和原RFQ一致，<code>px</code>和对应Quote一致。</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID, 如 "BTC-USDT-SWAP".</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">该条腿的部分执行数量</td></tr></tbody></table>

> 响应示例

```
{  
   "code":"0",
   "msg":"",
   "data":[
       {
            "blockTdId":"180184",
            "rfqId":"1419",
            "clRfqId":"r0001",
            "quoteId":"1046",
            "clQuoteId":"q0001",
            "tag":"123456",
            "tTraderCode":"Trader1",
            "mTraderCode":"Trader2",
            "cTime":"1649670009",
            "legs":[
                {
                    "px":"43000",
                    "sz":"25",
                    "instId":"BTC-USD-20220114-13250-C",
                    "side":"sell",
                    "fee":"-1.001",
                    "feeCcy":"BTC",
                    "tradeId":"10211"
                },
                {
                    "px":"42800",
                    "sz":"25",
                    "instId":"BTC-USDT",
                    "side":"buy",
                    "fee":"-1.001",
                    "feeCcy":"BTC",
                    "tradeId":"10212"
                }
            ]
        }
   ]
}
```

#### 响应参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">交易执行的时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单自定义ID，为客户敏感信息，不会公开，对询价方返回""。</td></tr><tr><td style="text-align: left">&gt; blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">询价单标签</td></tr><tr><td style="text-align: left">&gt; tTraderCode</td><td style="text-align: left">String</td><td style="text-align: left">询价价方唯一标识代码。询价时 anonymous 设置为 <code>true</code> 时不可见。</td></tr><tr><td style="text-align: left">&gt; mTraderCode</td><td style="text-align: left">String</td><td style="text-align: left">报价方唯一标识代码。 报价时 anonymous 设置为 <code>true</code> 时不可见。</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">询价单方向，<code>buy</code> 或者 <code>sell</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费，正数代表平台返佣 ，负数代表平台扣除</td></tr><tr><td style="text-align: left">&gt;&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种</td></tr><tr><td style="text-align: left">&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新的成交Id.</td></tr><tr><td style="text-align: left">&gt; acctAlloc</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合询价单的账户分配</td></tr><tr><td style="text-align: left">&gt;&gt; acct</td><td style="text-align: left">String</td><td style="text-align: left">账户名</td></tr><tr><td style="text-align: left">&gt;&gt; blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">&gt;&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt;&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败或成功时的msg</td></tr><tr><td style="text-align: left">&gt;&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新的成交ID</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. Taker 不能部分执行组合询价单。如果没有传入完整的腿数量，将收到错误代码 70507。  
2\. 父级询价单的腿数量将是每个子级询价单腿数量的总和，同时费用也应为总和。  
3\. 父级询价单的 blockTdId 和 tradeId 将为空。但将附带子账户分配的详情，提供blockTdId 和 tradeId。
:::

### 获取可报价产品

用于maker查询特定的接受询价和报价的产品, 以及数量和价格范围。

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP Requests

`GET /api/v5/rfq/maker-instrument-settings`

> 请求示例

```
GET /api/v5/rfq/maker-instrument-settings
```

#### 请求参数

无

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instType": "OPTION",
            "includeAll": true,
            "data": [
                {
                    "instFamily": "BTC-USD",
                    "maxBlockSz": "10000",
                    "makerPxBand": "5"
                },
                {
                    "instFamily": "SOL-USD",
                    "maxBlockSz": "100000",
                    "makerPxBand": "15"
                }
            ]
        },
        {
            "instType": "FUTURES",
            "includeAll": false,
            "data": [
                {
                    "instFamily": "BTC-USD",
                    "maxBlockSz": "10000",
                    "makerPxBand": "5"
                },
                {
                    "instFamily": "ETH-USDT",
                    "maxBlockSz": "100000",
                    "makerPxBand": "15"
                }
            ]
        },
        {
            "instType:": "SWAP",
            "includeAll": false,
            "data": [
                {
                    "instFamily": "BTC-USD",
                    "maxBlockSz": "10000",
                    "makerPxBand": "5"
                },
                {
                    "instFamily": "ETH-USDT"
                }
            ]
        },
        {
            "instType:": "SPOT",
            "includeAll": false,
            "data": [
                {
                    "instId": "BTC-USDT"
                },
                {
                    "instId": "TRX-USDT"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code> 表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为<code>0</code>，则不为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求返回值，包含请求结果</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类别，枚举值包括<code>FUTURES</code>,<code>OPTION</code>,<code>SWAP</code>和<code>SPOT</code></td></tr><tr><td style="text-align: left">&gt; includeAll</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否接收该instType下所有产品。有效值为<code>true</code>或<code>false</code>。默认<code>false</code>。</td></tr><tr><td style="text-align: left">&gt; data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">instType的元素</td></tr><tr><td style="text-align: left">&gt;&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br><code>交割</code>/<code>永续</code>/<code>期权</code>情况下必填</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code>。对<code>SPOT</code>产品类别有效且必须。</td></tr><tr><td style="text-align: left">&gt;&gt; maxBlockSz</td><td style="text-align: left">String</td><td style="text-align: left">该种产品最大可交易数量。FUTURES, OPTION and SWAP 的单位是合约数量。SPOT的单位是交易货币。</td></tr><tr><td style="text-align: left">&gt;&gt; makerPxBand</td><td style="text-align: left">String</td><td style="text-align: left">价格限制以价格精度tick为单位，以标记价格为基准。<br>设置makerPxBand为1个tick代表:<br>如果买一价 &gt; 标记价格 + 1 tick, 操作将被拦截<br>如果 买一价 &lt; 标记价格 - 1 tick, 操作将被拦截</td></tr></tbody></table>

### 设置可报价产品

用于maker设置特定的接受询价和报价的产品, 以及数量和价格范围。

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/maker-instrument-settings`

> 请求示例

```
POST /api/v5/rfq/maker-instrument-settings
[
    {
     "instType": "OPTION",
     "data":
        [{
            "instFamily": "BTC-USD",
            "maxBlockSz": "10000",
            "makerPxBand": "5"
        },
        {
            "instFamily": "SOL-USD",
            "maxBlockSz": "100000",
            "makerPxBand": "15"
        }]
    },
    {
     "instType": "FUTURES",
     "data":
        [{
            "instFamily": "BTC-USD",
            "maxBlockSz": "10000",
            "makerPxBand": "5"
        },
        {
            "instFamily": "ETH-USDT",
            "maxBlockSz": "100000",
            "makerPxBand": "15"
        }]
    },
    {
     "instType": "SWAP",
     "data":
        [{
            "instFamily": "BTC-USD",
            "maxBlockSz": "10000",
            "makerPxBand": "5"
         },
        {
            "instFamily": "ETH-USDT"
        }]
    },
    {
    "instType": "SPOT",
     "data":
        [{
            "instId": "BTC-USDT"
         },
        {
            "instId": "TRX-USDT"
        }]
    }
]
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 设置可报价产品
data =[{
    "instType": "OPTION",
    "data": [{
            "uly": "BTC-USD",
            "maxBlockSz": "10000",
            "makerPxBand": "5"
        },
        {
            "uly": "SOL-USD",
            "maxBlockSz": "100000",
            "makerPxBand": "15"
        }
    ]
}]

result = blockTradingAPI.set_marker_instrument(
    data
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类别，枚举值包括<code>FUTURES</code>,<code>OPTION</code>,<code>SWAP</code>和<code>SPOT</code></td></tr><tr><td style="text-align: left">includeAll</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否接收该instType下所有产品。有效值为<code>true</code>或<code>false</code>。默认<code>false</code>。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">instType的元素</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种<br><code>交割</code>/<code>永续</code>/<code>期权</code>情况下必填</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code>。对<code>SPOT</code>产品类别有效且必须。</td></tr><tr><td style="text-align: left">&gt; maxBlockSz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">该种产品最大可交易数量。FUTURES, OPTION and SWAP 的单位是合约数量。SPOT的单位是交易货币。</td></tr><tr><td style="text-align: left">&gt; makerPxBand</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">价格限制以价格精度tick为单位，以标记价格为基准。<br>以设置makerPxBand为1个tick为例:<br>如果买价 &gt; 标记价格 + 1 tick, 操作将被拦截<br>如果卖价 &lt; 标记价格 - 1 tick, 操作将被拦截</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "result":true
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code> 表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为<code>0</code>，则不为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求返回值，包含请求结果</td></tr><tr><td style="text-align: left">&gt; result</td><td style="text-align: left">Boolean</td><td style="text-align: left">请求结果，枚举值为<code>true</code>,<code>false</code></td></tr></tbody></table>

### 重设MMP状态

重设MMP状态为无效。

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/mmp-reset`

> 请求示例

```
POST /api/v5/rfq/mmp-reset
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 重设MMP状态
result = blockTradingAPI.reset_mmp()
print(result)
```

#### 请求参数

None

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ts":"1597026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code> 表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为<code>0</code>，则不为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求返回值，包含请求结果</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">重设时间. Unix 时间戳的毫秒数格式，如 <code>1597026383085</code>.</td></tr></tbody></table>

### 设置 MMP

该接口用于设置 MMP 的配置，仅适用于大宗交易中的maker。

#### 限速：1次/10s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/rfq/mmp-config`

> 请求示例

```
POST /api/v5/rfq/mmp-config
body
{
    "timeInterval":"5000",
    "frozenInterval":"2000",
    "countLimit": "100"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">时间窗口 (毫秒)。<br>"0" 代表不使用 MMP。最大为 600,000。</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">冻结时间长度 (毫秒)。<br>"0" 代表一直冻结，直到调用 "重置 MMP 状态" 接口解冻</td></tr><tr><td style="text-align: left">countLimit</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">尝试执行次数限制</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "frozenInterval": "2000",
            "countLimit": "100",
            "timeInterval": "5000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">时间窗口 (毫秒)</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">冻结时间长度 (毫秒)</td></tr><tr><td style="text-align: left">countLimit</td><td style="text-align: left">String</td><td style="text-align: left">尝试执行次数限制</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
对于 Maker，组合询价单的执行尝试将只计入一次 MMP，无论涉及多少账户分配。
:::

### 查看 MMP 配置

该接口用于获取 MMP 的配置信息，仅适用于大宗交易中的maker。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/rfq/mmp-config`

> 请求示例

```
GET /api/v5/rfq/mmp-config
```

#### 请求参数

none

> 返回结果

```
{
  "code": "0",
  "data": [
    {
      "frozenInterval": "2000",
      "mmpFrozen": true,
      "mmpFrozenUntil": "1000",
      "countLimit": "10",
      "timeInterval": "5000"
    }
  ],
  "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">时间窗口 (毫秒)。<br>"0" 代表不使用 MMP。</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">冻结时间长度 (毫秒)。<br>如果为"0"，代表一直冻结，直到调用 "重置 MMP 状态" 接口解冻，且<code>mmpFrozenUntil</code>为 ""。</td></tr><tr><td style="text-align: left">countLimit</td><td style="text-align: left">String</td><td style="text-align: left">尝试执行次数限制</td></tr><tr><td style="text-align: left">mmpFrozen</td><td style="text-align: left">Boolean</td><td style="text-align: left">MMP 是否被触发。 <code>true</code> 或者 <code>false</code></td></tr><tr><td style="text-align: left">mmpFrozenUntil</td><td style="text-align: left">String</td><td style="text-align: left">如果配置了 frozenInterval 且 mmpFrozen = <code>true</code>，则为不再触发MMP时的时间窗口（单位为ms），否则为""。</td></tr></tbody></table>

### 报价

允许询价单指定的报价方进行报价，需要对整个询价单报价，不允许部分报价。

同一询价单（`rfqId`）下同一时间只能有一个有效报价单。针对同一 `rfqId` 提交新的报价单，会自动取消当前已有的有效报价单。不支持双边报价（即同时持有买卖两个方向的有效报价），仅最新提交的报价单保持有效。

#### 限速: 50次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/create-quote`

> 请求示例

```
POST /api/v5/rfq/create-quote
{
    "rfqId":"22539",
    "clQuoteId":"q001",
    "tag":"123456",
    "quoteSide":"buy",
    "anonymous": true,
    "expiresIn":"30",
    "legs":[
        {
            "px":"39450.0",
            "sz":"200000",
            "instId":"BTC-USDT-SWAP",
            "tdMode":"cross",
            "ccy":"USDT",
            "side":"buy",
            "posSide": "long"
        },
        {
            "px":"39450.0",
            "sz":"200000",
            "instId":"BTC-USDT-SWAP",
            "tdMode":"cross",
            "ccy":"USDT",
            "side":"buy",
            "posSide": "long"
        }
    ]
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 报价
result = blockTradingAPI.create_quote(
    rfqId="22539",
    clQuoteId="q001",
    anonymous=True,
    quoteSide="buy",
    expiresIn="30",
    legs=[
        {
            "px": "39450.0",
            "sz": "200000",
            "instId": "BTC-USDT-SWAP",
            "side": "buy"
        }
    ]
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单自定义ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单标签，与此报价单关联的大宗交易将有相同的标签。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">anonymous</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否匿名报价，<code>true</code>表示匿名报价，<code>false</code>表示公开报价，默认值为<code>false</code>，为<code>true</code>时，即使在交易执行之后，身份也不会透露给询价方。</td></tr><tr><td style="text-align: left">quoteSide</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价单方向，<code>buy</code>或者<code>sell</code>。当报价单方向为<code>buy</code>，对maker来说，执行方向与legs里的方向相同，对taker来说相反。反之同理</td></tr><tr><td style="text-align: left">expiresIn</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单的有效时长（以秒为单位）。 10到120之间的任何整数。 默认值为60</td></tr><tr><td style="text-align: left">legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br>合约模式和跨币种保证金模式下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托价格</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价单方向</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。在开平仓模式下仅可选择<code>long</code>或<code>short</code>。<br>如未指定，则处于开平仓模式下的用户始终会开新仓位。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "",
    "msg": "",
    "data": [
        {
            "validUntil": "1608997227834",
            "uTime": "1608267227834",
            "cTime": "1608267227834",
            "legs": [
                {
                    "px": "46000",
                    "sz": "25",
                    "instId": "BTC-USD-220114-25000-C",
                    "tdMode": "cross",
                    "ccy": "USDT",
                    "side": "sell",
                    "posSide": "long",
                    "tgtCcy": ""
                },
                {
                    "px": "4000",
                    "sz": "25",
                    "instId": "ETH-USD-220114-25000-C",
                    "tdMode": "cross",
                    "ccy": "USDT",
                    "side": "buy",
                    "posSide": "long",
                    "tgtCcy": ""
                }
            ],
            "quoteId": "25092",
            "rfqId": "18753",
            "tag": "123456",
            "quoteSide": "sell",
            "state": "active",
            "reason": "mmp_canceled",
            "clQuoteId": "",
            "clRfqId": "",
            "traderCode": "Aksha"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">报价单创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">报价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">报价单的状态<br>有效值为 <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code></td></tr><tr><td style="text-align: left">&gt; reason</td><td style="text-align: left">String</td><td style="text-align: left">状态原因. 有效值包括 <code>mmp_canceled</code>.</td></tr><tr><td style="text-align: left">&gt; validUntil</td><td style="text-align: left">String</td><td style="text-align: left">报价单的过期时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单自定义ID，为客户敏感信息，不会公开，对询价方返回""。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">报价单标签，与此报价单关联的大宗交易将有相同的标签。</td></tr><tr><td style="text-align: left">&gt; traderCode</td><td style="text-align: left">String</td><td style="text-align: left">报价方唯一标识代码。</td></tr><tr><td style="text-align: left">&gt; quoteSide</td><td style="text-align: left">String</td><td style="text-align: left">报价单方向，有效值为<code>buy</code>或者<code>sell</code>。当报价单方向为<code>buy</code>，对maker来说，执行方向与legs里的方向相同，对taker来说相反。反之同理。</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br><code>合约模式</code>/<code>现货模式</code>: <code>cash</code><br><code>合约模式</code>/<code>跨币种保证金模式</code>下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">腿的方向，有效值为<code>buy</code>或者<code>sell</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt;&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr></tbody></table>

### 取消报价单

取消一个报价单。

如果在本次取消请求到达之前，系统已处理了针对同一 `rfqId` 的新建报价单请求，则原报价单将已处于 `canceled` 状态，本请求将返回错误 `70400`。当请求通过不同连接或进程发出时可能发生此情况，因为不同连接间不保证请求的处理顺序。如需确保严格的创建→取消顺序，请在收到创建报价单的响应后，通过同一连接再发出取消请求。

#### 限速: 50次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-quote`

> 请求示例

```
POST /api/v5/rfq/cancel-quote
{
    "quoteId": "007",
    "clQuoteId":"Bond007"
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 取消报价单
result = blockTradingAPI.cancel_quote(
    quoteId="007",
    clQuoteId="Bond007"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">报价单自定义ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间，当 clRfqId 和 rfqId 都传时，以 rfqId 为准。</td></tr><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单ID</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "quoteId":"007",
            "clQuoteId":"Bond007",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### 批量取消报价单

取消一个或多个报价单，每次最多可以撤销100个订单。

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-batch-quotes`

> 请求示例

```
POST /api/v5/rfq/cancel-batch-quotes
{
    "quoteIds": ["1150","1151","1152"],
    "clQuoteIds": ["q1","q2","q3"]
}
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 批量取消报价单
result = blockTradingAPI.cancel_batch_quotes(
    quoteIds=["1150","1151","1152"],
    clQuoteIds=["q1","q2","q3"]
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可选</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">clQuoteIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可选</td><td style="text-align: left">报价单自定义ID，当 clQuoteIds 和 quoteIds 都传时，以 quoteIds 为准。</td></tr></tbody></table>

> 全部成功的示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "quoteId":"1150",
            "clQuoteId":"q1",
            "sCode":"0",
            "sMsg":""
        },
        {
            "quoteId":"1151",
            "clQuoteId":"q2",
            "sCode":"0",
            "sMsg":""
        },
        {
            "quoteId":"1152",
            "clQuoteId":"q3",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

> 部分成功的示例

```
{
    "code":"2",
    "msg":"Bulk operation partially succeeded.",
    "data":[
        {
            "quoteId":"1150",
            "clQuoteId":"q1",
            "sCode":"0",
            "sMsg":""
        },
        {
            "quoteId":"1151",
            "clQuoteId":"q2",
            "sCode":"70001",
            "sMsg":"Quote does not exist."
        },
        {
            "quoteId":"1152",
            "clQuoteId":"q3",
            "sCode":"70001",
            "sMsg":"Quote does not exist."
        }
    ]
}
```

> 失败示例

```
{
    "code":"1",
    "msg":"Operation failed.",
    "data":[
        {
            "quoteId":"1150",
            "clQuoteId":"q1",
            "sCode":"70001",
            "sMsg":"Quote does not exist."
        },
        {
            "quoteId":"1151",
            "clQuoteId":"q2",
            "sCode":"70001",
            "sMsg":"Quote does not exist."
        },
        {
            "quoteId":"1151",
            "clQuoteId":"q3",
            "sCode":"70001",
            "sMsg":"Quote does not exist."
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单自定义ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### 取消所有报价单

取消所有报价单

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`POST /api/v5/rfq/cancel-all-quotes`

> 请求示例

```
POST /api/v5/rfq/cancel-all-quotes
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 取消所有报价单
result = blockTradingAPI.cancel_all_quotes()
print(result)
```

#### 请求参数

无

> 响应示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ts":"1697026383085"
        }
    ]
}
```

#### 响应参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">成功取消时间，Unix时间戳的毫秒数格式，如 1597026383085。</td></tr></tbody></table>

### 倒计时全部撤单

在倒计时结束后，取消所有报价单。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/rfq/cancel-all-after`

> 请求示例

```
POST /api/v5/rfq/cancel-all-after
body
{
   "timeOut":"60"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeOut</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">取消报价单的倒计时，单位为秒。<br>取值范围为 0, [10, 120]<br>0 代表不使用该功能。</td></tr></tbody></table>

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

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">触发撤单的时间.<br>triggerTime=0 代表未使用该功能。</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">请求被接收到的时间</td></tr></tbody></table>

::: tip
建议用户每一秒调用接口一次。当倒计时全部撤单被触发时，交易引擎将为用户逐一取消报价单，该操作可能持续数秒。该功能起到保护用户的作用，不应作为交易策略使用。
:::

### 获取询价单信息

获取用户发出的或收到的询价单信息

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`GET /api/v5/rfq/rfqs`

> 请求示例

```
GET /api/v5/rfq/rfqs
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取询价单信息
result = blockTradingAPI.get_rfqs()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单ID .</td></tr><tr><td style="text-align: left">clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户询价单自定义ID，当 clRfqId 和 rfqId 都传时，以 rfqId 为准</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单的状态<br><code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code> <code>traded_away</code><br><code>filled</code> 表示询价单已成功按照做市商的报价成交。<br><code>traded_away</code> 仅适用于报价方。同一笔询价单可能对一个报价方显示为 <code>filled</code>，而对另一个报价方显示为 <code>traded_away</code>。<br>示例：询价方创建询价单 → 做市商A报价 pxA，做市商B报价 pxB → pxA 优于 pxB → 询价方执行做市商A的报价 → 做市商A看到 <code>filled</code>，做市商B看到 <code>traded_away</code>。</td></tr><tr><td style="text-align: left">beginId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的起始询价单ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td style="text-align: left">endId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的结束询价单ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "rfqId": "123456",
            "clRfqId": "",
            "tag": "123456",
            "traderCode": "VITALIK",
            "validUntil": "1650969031817",
            "allowPartialExecution": false,
            "state": "filled",
            "flowType": "",
            "counterparties": [
                "SATOSHI"
            ],
            "legs": [
                {
                    "instId": "BTC-USDT",
                    "tdMode": "cross",
                    "ccy": "USDT",
                    "side": "buy",
                    "posSide": "long",
                    "sz": "25",
                    "tgtCcy": "base_ccy",
                    "tradeQuoteCcy": "USDT"
                }
            ],
            "cTime": "1650968131817",
            "uTime": "1650968164944"
        },
        {
            "rfqId": "1234567",
            "clRfqId": "",
            "tag": "1234567",
            "traderCode": "VITALIK",
            "validUntil": "1650967623729",
            "state": "filled",
            "flowType": "",
            "counterparties": [
                "SATOSHI"
            ],
            "legs": [
                {
                    "instId": "BTC-USDT",
                    "tdMode": "cross",
                    "ccy": "USDT",
                    "side": "buy",
                    "posSide": "long",
                    "sz": "1500000",
                    "tgtCcy": "quote_ccy",
                    "tradeQuoteCcy": "USDT"
                }
            ],
            "cTime": "1650966723729",
            "uTime": "1650966816577"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">询价单创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">询价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">询价单的状态<br><code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code> <code>traded_away</code><br><code>filled</code> 表示询价单已成功按照做市商的报价成交。<br><code>traded_away</code> 仅适用于报价方。同一笔询价单可能对一个报价方显示为 <code>filled</code>，而对另一个报价方显示为 <code>traded_away</code>。<br>示例：询价方创建询价单 → 做市商A报价 pxA，做市商B报价 pxB → pxA 优于 pxB → 询价方执行做市商A的报价 → 做市商A看到 <code>filled</code>，做市商B看到 <code>traded_away</code>。</td></tr><tr><td style="text-align: left">&gt; counterparties</td><td style="text-align: left">Array of strings</td><td style="text-align: left">报价方列表</td></tr><tr><td style="text-align: left">&gt; validUntil</td><td style="text-align: left">String</td><td style="text-align: left">询价单的过期时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">询价单标签，与此询价单关联的大宗交易将有相同的标签。</td></tr><tr><td style="text-align: left">&gt; flowType</td><td style="text-align: left">String</td><td style="text-align: left">识别询价单的类型。<br>仅适用于报价方，返回""给询价方。</td></tr><tr><td style="text-align: left">&gt; traderCode</td><td style="text-align: left">String</td><td style="text-align: left">询价方唯一标识代码，询价时 anonymous 设置为 <code>true</code> 时不可见</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; allowPartialExecution</td><td style="text-align: left">Boolean</td><td style="text-align: left">RFQ是否可以被部分执行，如果腿的比例和原RFQ一致。有效值为<code>true</code>或<code>false</code>。未指定时，默认为<code>false</code>。</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易，每个请求最多可放置15条腿</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 "BTC-USDT-SWAP"</td></tr><tr><td style="text-align: left">&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br>合约模式和跨币种保证金模式下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">询价单方向<br>有效值为<code>buy</code>和<code>sell</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt;&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; groupId</td><td style="text-align: left">String</td><td style="text-align: left">组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td style="text-align: left">&gt; acctAlloc</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合询价单的账户分配<br>只适用于 Taker</td></tr><tr><td style="text-align: left">&gt;&gt; acct</td><td style="text-align: left">String</td><td style="text-align: left">账户名</td></tr><tr><td style="text-align: left">&gt;&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. allowPartialExecution 字段始终为 true，适用于 Taker 和 Maker 的组合询价单。  
2\. 新增返回参数 acctAlloc ，包含所有账户分配信息，但仅适用于 Taker。  
3\. 新增返回参数 groupId，适用于 Taker 和 Maker。  
4\. 对于组合询价单状态  
    1. 如果任何分配账户处于待执行状态，则状态为 pending\_fill  
    2. 否则，  
        1. 如果任何分配账户已成交，则状态为 filled  
        2. 如果所有分配账户均失败，则状态为 failed
:::

### 获取报价单信息

获取用户发出的或收到的报价单信息

#### 限速: 2次/2s

#### 限速规则：User ID

#### HTTP Requests

`GET /api/v5/rfq/quotes`

> 请求示例

```
GET /api/v5/rfq/quotes
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取报价单信息
result = blockTradingAPI.get_quotes()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单自定义ID， 当 clRfqId 和 rfqId 都传时，以 rfqId 为准。</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单自定义ID，当 clRfqId 和 rfqId 都传时，以 rfqId 为准。</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单的状态<br>有效值为 <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code></td></tr><tr><td style="text-align: left">beginId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的起始报价单ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td style="text-align: left">endId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的结束报价单ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "validUntil":"1608997227834",
            "uTime":"1608267227834",
            "cTime":"1608267227834",
            "legs":[
                {
                    "px":"46000",
                    "sz":"25",
                    "instId":"BTC-USD-220114-25000-C",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "side":"sell",
                    "posSide": "long",
                    "tgtCcy":"",
                    "tradeQuoteCcy": ""
                },
                {
                    "px":"45000",
                    "sz":"25",
                    "instId":"BTC-USDT",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "side":"buy",
                    "posSide": "long",
                    "tgtCcy":"base_ccy",
                    "tradeQuoteCcy": "USDT"
                }
            ],
            "quoteId":"25092",
            "rfqId":"18753",
            "quoteSide":"sell",
            "state":"canceled",
            "reason":"mmp_canceled",
            "clQuoteId":"cq001",
            "clRfqId":"cr001",
            "tag":"123456",
            "traderCode":"Trader1"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的数组</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">报价单创建时间，Unix时间戳的毫秒数格式</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">报价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">报价单的状态<br><code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code></td></tr><tr><td style="text-align: left">&gt; reason</td><td style="text-align: left">String</td><td style="text-align: left">状态原因. 有效值包括 <code>mmp_canceled</code>.</td></tr><tr><td style="text-align: left">&gt; validUntil</td><td style="text-align: left">String</td><td style="text-align: left">报价单的过期时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单自定义ID，为客户敏感信息，不会公开，对询价方返回""。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">报价单标签，与此报价单关联的大宗交易将有相同的标签。</td></tr><tr><td style="text-align: left">&gt; traderCode</td><td style="text-align: left">String</td><td style="text-align: left">报价方唯一标识代码，报价时 Anonymous 设置为 <code>True</code> 时不可见。</td></tr><tr><td style="text-align: left">&gt; quoteSide</td><td style="text-align: left">String</td><td style="text-align: left">报价单方向，<code>buy</code>或者<code>sell</code>。当报价单方向为<code>buy</code>，对maker来说，执行方向与legs里的方向相同，对taker来说相反。反之同理</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br>合约模式和跨币种保证金模式下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格.</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">报价单方向</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td style="text-align: left">&gt;&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr></tbody></table>

### 获取大宗交易信息

获取该用户大宗交易成交信息

#### 限速: 5次/2s

#### 限速规则：User ID

#### HTTP Requests

`GET /api/v5/rfq/trades`

> 请求示例

```
GET /api/v5/rfq/trades
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取大宗交易信息
result = blockTradingAPI.get_trades()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">rfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">由用户设置的询价单ID. 如果 <code>clRfqId</code> 和 <code>rfqId</code> 都通过了，rfqId 将被视为主要</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">由用户设置的报价单ID。如果同时传递了 <code>clQuoteId</code> 和 <code>quoteId</code>，则 quoteId 将被视为主要标识符</td></tr><tr><td style="text-align: left">beginId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的起始大宗交易ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td style="text-align: left">endId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的结束大宗交易ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td style="text-align: left">beginTs</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用开始时间戳筛选交易执行时间（UTC时区）。Unix时间戳的毫秒数格式，如 1597026383085。</td></tr><tr><td style="text-align: left">endTs</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用结束时间戳筛选交易执行时间（UTC时区）。Unix时间戳的毫秒数格式，如 1597026383085。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条。<br>如果请求范围内的交易数量大于100，则返回该范围内最近的100笔交易。</td></tr><tr><td style="text-align: left">isSuccessful</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">交易是否成功。<br><code>true</code>: 成功，默认值。<br><code>false</code>: 未成功。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "rfqId": "123456",
            "clRfqId": "",
            "quoteId": "0T5342O",
            "clQuoteId": "",
            "blockTdId": "439127542058958848",
            "tag": "123456",
            "isSuccessful": true,
            "errorCode": "",
            "legs": [
                {
                    "instId": "BTC-USDT",
                    "side": "sell",
                    "sz": "0.666",
                    "px": "100",
                    "tradeId": "439127542058958850",
                    "fee": "-0.0333",
                    "feeCcy": "USDT",
                    "tradeQuoteCcy": "USDT"
                }
            ],
            "cTime": "1650968164900",
            "tTraderCode": "SATS",
            "mTraderCode": "MIKE"
        },
        {
            "rfqId": "1234567",
            "clRfqId": "",
            "quoteId": "0T533T0",
            "clQuoteId": "",
            "blockTdId": "439121886014849024",
            "tag": "123456",
            "isSuccessful": true,
            "errorCode": "",
            "legs": [
                {
                    "instId": "BTC-USDT",
                    "side": "sell",
                    "sz": "0.532",
                    "px": "100",
                    "tradeId": "439121886014849026",
                    "fee": "-0.0266",
                    "feeCcy": "USDT",
                    "tradeQuoteCcy": "USDT"
                }
            ],
            "cTime": "1650966816550",
            "tTraderCode": "SATS",
            "mTraderCode": "MIKE"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">执行创建的时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; rfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单ID</td></tr><tr><td style="text-align: left">&gt; clRfqId</td><td style="text-align: left">String</td><td style="text-align: left">询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td style="text-align: left">&gt; quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单ID</td></tr><tr><td style="text-align: left">&gt; clQuoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价单自定义ID，为客户敏感信息，不会公开，对询价方返回""。</td></tr><tr><td style="text-align: left">&gt; blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">交易标签，大宗交易将有与其对应的询价单或报价单相同的标签。</td></tr><tr><td style="text-align: left">&gt; tTraderCode</td><td style="text-align: left">String</td><td style="text-align: left">询价方唯一标识代码，询价时 anonymous 设置为 <code>true</code> 时不可见</td></tr><tr><td style="text-align: left">&gt; mTraderCode</td><td style="text-align: left">String</td><td style="text-align: left">报价方唯一标识代码。报价时 anonymous 设置为 <code>true</code> 时不可见</td></tr><tr><td style="text-align: left">&gt; isSuccessful</td><td style="text-align: left">Boolean</td><td style="text-align: left">交易是否成功</td></tr><tr><td style="text-align: left">&gt; errorCode</td><td style="text-align: left">String</td><td style="text-align: left">未成功交易的错误码。<br>对于成功交易为 ""。</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">询价单方向，buy 或者 sell。</td></tr><tr><td style="text-align: left">&gt;&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费，正数代表平台返佣 ，负数代表平台扣除</td></tr><tr><td style="text-align: left">&gt;&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种</td></tr><tr><td style="text-align: left">&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新的成交Id</td></tr><tr><td style="text-align: left">&gt;&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; acctAlloc</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合询价单的账户分配</td></tr><tr><td style="text-align: left">&gt;&gt; blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">&gt;&gt; errorCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt;&gt; acct</td><td style="text-align: left">String</td><td style="text-align: left">账户名<br>只适用于 Taker，对于 Maker 返回""</td></tr><tr><td style="text-align: left">&gt;&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新的成交Id</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费</td></tr><tr><td style="text-align: left">&gt;&gt;&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. 该接口返回的交易数据应为父级询价单级别，而不是子级询价单执行级别。  
2\. 对于账户分配，包含所有已成交和未成交的子级询价单，但添加 errorCode 来指示子级询价单是否已成交。  
3\. 交易结果将仅返回给组合询价单 Taker 及 Maker。分配的子账户和资管账户将无法看到交易结果。分配的账户应通过交易账单获取这些交易。  
4\. 交易数据仅在所有子级询价单执行后返回。  
5\. 对于父级询价单的 isSuccessful 字段，  
    1. 如果任何子级询价单已成交，则返回 true  
    2. 否则，如果所有子级询价单均失败，则返回 false  
6\. 父级询价单的 blockTdId 或 legs 的 tradeId 将为空。但将提供账户分配的详细信息，并附带 blockTdId 以及 tradeId。
:::

### 获取大宗交易所有产品行情信息

获取最近24小时大宗交易量

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/block-tickers`

> 请求示例

```
GET /api/v5/market/block-tickers?instType=SWAP
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取大宗交易所有产品行情信息
result = marketDataAPI.get_block_tickers(
    instType="SPOT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     {
        "instType":"SWAP",
        "instId":"LTC-USD-SWAP",
        "volCcy24h":"2222",
        "vol24h":"2222",
        "ts":"1597026383085"
     },
     {
        "instType":"SWAP",
        "instId":"BTC-USD-SWAP",
        "volCcy24h":"2222",
        "vol24h":"2222",
        "ts":"1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">volCcy24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">vol24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取大宗交易单个产品行情信息

获取最近24小时大宗交易量

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/block-ticker`

> 请求示例

```
GET /api/v5/market/block-ticker?instId=BTC-USD-SWAP
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取大宗交易单个产品行情信息
result = marketDataAPI.get_block_ticker(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     {
        "instType":"SWAP",
        "instId":"LTC-USD-SWAP",
        "volCcy24h":"2222",
        "vol24h":"2222",
        "ts":"1597026383085"
     }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">volCcy24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">vol24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取大宗交易公共多腿成交数据

获取已经执行的大宗交易。数据将在大宗交易执行15分钟后更新。

#### 限速: 5次/2s

#### 限速规则：IP

#### HTTP Requests

`GET /api/v5/rfq/public-trades`

> 请求示例

```
GET /api/v5/rfq/public-trades
```

```
import okx.BlockTrading as BlockTrading

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

blockTradingAPI = BlockTrading.BlockTradingAPI(apikey, secretkey, passphrase, False, flag)

# 获取大宗交易公共成交数据
result = blockTradingAPI.get_public_trades()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">beginId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的起始大宗交易ID，请求此ID之后（更新的数据）的分页内容，不包括 beginId</td></tr><tr><td style="text-align: left">endId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求的结束大宗交易ID，请求此ID之前（更旧的数据）的分页内容，不包括 endId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "blockTdId": "439161457415012352",
            "groupId": "",
            "legs": [
                {
                    "instId": "BTC-USD-210826",
                    "side": "sell",
                    "sz": "100",
                    "px": "11000",
                    "tradeId": "439161457415012354"
                },
                {
                    "instId": "BTC-USD-SWAP",
                    "side": "sell",
                    "sz": "100",
                    "px": "50",
                    "tradeId": "439161457415012355"
                },
                {
                    "instId": "BTC-USDT",
                    "side": "buy",
                    "sz": "0.1", //for public feed, spot "sz" is in baseccy
                    "px": "10.1",
                    "tradeId": "439161457415012356"
                },
                {
                    "instId": "BTC-USD-210326-60000-C",
                    "side": "buy",
                    "sz": "200",
                    "px": "0.008",
                    "tradeId": "439161457415012357"
                },
                {
                    "instId": "BTC-USD-220930-5000-P",
                    "side": "sell",
                    "sz": "200",
                    "px": "0.008",
                    "tradeId": "439161457415012360"
                },
                {
                    "instId": "BTC-USD-220930-10000-C",
                    "side": "sell",
                    "sz": "200",
                    "px": "0.008",
                    "tradeId": "439161457415012361"
                },
                {
                    "instId": "BTC-USD-220930-10000-P",
                    "side": "sell",
                    "sz": "200",
                    "px": "0.008",
                    "tradeId": "439161457415012362"
                },
                {
                    "instId": "ETH-USD-220624-100100-C",
                    "side": "sell",
                    "sz": "100",
                    "px": "0.008",
                    "tradeId": "439161457415012363"
                }
            ],
            "strategy":"CALL_CALENDAR_SPREAD",
            "cTime": "1650976251241"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，0 表示成功。</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，如果代码不为 0，则不为空。</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组.</td></tr><tr><td style="text-align: left">&gt; strategy</td><td style="text-align: left">String</td><td style="text-align: left">期权策略, 如 <code>CALL_CALENDAR_SPREAD</code></td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">&gt; blockTdId</td><td style="text-align: left">String</td><td style="text-align: left">大宗交易ID</td></tr><tr><td style="text-align: left">&gt; groupId</td><td style="text-align: left">String</td><td style="text-align: left">组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td style="text-align: left">&gt; legs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">组合交易</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">询价单方向，从 Taker的视角看</td></tr><tr><td style="text-align: left">&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. 新增返回参数 groupId，协助用户将子账户执行映射到组合询价单。仅适用于组合询价单，对普通询价单返回 ""。  
2\. 该接口返回的交易数据应为父级询价单，而不是子级询价单，与子账户分配无关。blockTdId 及 tradeId 为空。
:::

### 获取大宗交易公共单腿成交数据

查询市场上交易产品维度的大宗交易公共成交数据，根据 tradeId 倒序排序。数据将在大宗交易执行15分钟后更新。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/block-trades`

> 请求示例

```
GET /api/v5/public/block-trades?instId=BTC-USDT
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "fillVol": "5",
            "fwdPx": "26857.86591585",
            "groupId": "",
            "idxPx": "26889.7",
            "instId": "BTC-USD-231013-22000-P",
            "markPx": "0.0000000000000001",
            "px": "0.0026",
            "side": "buy",
            "sz": "1",
            "tradeId": "632960608383700997",
            "ts": "1697181568974"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">成交方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">fillVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率<br>仅适用于 <code>期权</code></td></tr><tr><td style="text-align: left">fwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格<br>仅适用于 <code>期权</code></td></tr><tr><td style="text-align: left">idxPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的指数价格<br>适用于 <code>交割</code>, <code>永续</code>, <code>期权</code></td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格<br>适用于 <code>交割</code>, <code>永续</code>, <code>期权</code></td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr></tbody></table>

::: tip
最多获取最近500条历史公共成交数据
:::

::: tip
组合询价单介绍  
  
1\. 新增返回参数 groupId，协助用户将子账户执行映射到组合询价单。仅适用于组合询价单，对普通询价单返回 ""。  
2\. 该接口返回的交易数据应为子级询价单，但拆分为单腿，tradeId 有值
:::

## WebSocket 私有频道

### 询价频道

获取用户自身发送或接收的询价信息。每当用户自身发送或接收询价时，数据都将被推送。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "rfqs"
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
          "channel": "rfqs"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>rfqs</code></td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "rfqs"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"rfqs\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>rfqs</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg":{
        "channel":"rfqs",
        "uid": "77982378738415879"
    },
    "data":[
        {
            "cTime":"1611033737572",
            "uTime":"1611033737572",
            "traderCode":"DSK2",
            "rfqId":"22534",
            "clRfqId":"",
            "tag":"123456",
            "state":"active",
            "flowType": "",
            "validUntil":"1611033857557",
            "allowPartialExecution": false,
            "counterparties":[
                "DSK4",
                "DSK5"
            ],
            "legs":[
                {
                    "instId":"BTCUSD-211208-36000-C",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "sz":"25.0",
                    "side":"buy",
                    "posSide": "long",
                    "tgtCcy":""
                },
                {
                    "instId":"ETHUSD-211208-45000-C",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "sz":"25.0",
                    "side":"sell",
                    "posSide": "long",
                    "tgtCcy":""
                }
            ]
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; cTime</td><td>String</td><td>询价单创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; uTime</td><td>String</td><td>询价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; state</td><td>String</td><td>询价单的状态<br>有效值有 <code>active</code> <code>canceled</code> <code>filled</code> <code>expired</code> <code>traded_away</code> <code>failed</code><br><code>filled</code> 表示询价单已成功按照做市商的报价成交。<br><code>traded_away</code> 仅适用于报价方。同一笔询价单可能对一个报价方显示为 <code>filled</code>，而对另一个报价方显示为 <code>traded_away</code>。<br>示例：询价方创建询价单 → 做市商A报价 pxA，做市商B报价 pxB → pxA 优于 pxB → 询价方执行做市商A的报价 → 做市商A看到 <code>filled</code>，做市商B看到 <code>traded_away</code>。</td></tr><tr><td>&gt; counterparties</td><td>Array of Strings</td><td>报价方列表</td></tr><tr><td>&gt; validUntil</td><td>String</td><td>询价单的过期时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; clRfqId</td><td>String</td><td>询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td>&gt; tag</td><td>String</td><td>询价单标签，与此询价单关联的大宗交易将有相同的标签。</td></tr><tr><td>&gt; flowType</td><td>String</td><td>识别询价单的类型。<br>仅适用于报价方，返回""给询价方。</td></tr><tr><td>&gt; traderCode</td><td>String</td><td>询价方唯一标识代码，询价时 Anonymous 设置为 <code>True</code> 时不可见</td></tr><tr><td>&gt; rfqId</td><td>String</td><td>询价单ID</td></tr><tr><td>&gt; allowPartialExecution</td><td>Boolean</td><td>RFQ是否可以被部分执行，如果腿的比例和原RFQ一致。&gt;有效值为<code>true</code>或<code>false</code>。</td></tr><tr><td>&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; tdMode</td><td>String</td><td>交易模式<br>保证金模式：<code>cross</code>全仓 <code>isolated</code>逐仓<br>非保证金模式：<code>cash</code>非保证金.<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货: <code>cash</code><br>合约模式和跨币种保证金模式下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>委托数量</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>询价单方向</td></tr><tr><td>&gt;&gt; posSide</td><td>String</td><td>持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td>&gt;&gt; tgtCcy</td><td>String</td><td>委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td>&gt;&gt; tradeQuoteCcy</td><td>String</td><td>交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>.</td></tr><tr><td>&gt; groupId</td><td>String</td><td>组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td>&gt; acctAlloc</td><td>Array of objects</td><td>组合询价单的账户分配<br>只适用于 Taker</td></tr><tr><td>&gt;&gt; acct</td><td>String</td><td>账户名</td></tr><tr><td>&gt;&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt;&gt; sz</td><td>String</td><td>委托数量</td></tr><tr><td>&gt;&gt;&gt; tdMode</td><td>String</td><td>交易模式</td></tr><tr><td>&gt;&gt;&gt; ccy</td><td>String</td><td>保证金币种</td></tr><tr><td>&gt;&gt;&gt; posSide</td><td>String</td><td>持仓方向</td></tr></tbody></table>

::: tip
state: pending\_fill 是一个瞬间状态，该频道不会推送。
:::

::: tip
组合询价单介绍  
  
1\. allowPartialExecution 字段始终为 true，适用于 Taker 和 Maker 的组合询价单。  
2\. 新增返回参数 acctAlloc ，包含所有账户分配信息，但仅适用于 Taker。  
3\. 新增返回参数 groupId，适用于 Taker 和 Maker。  
4\. 对于组合询价单状态  
        1. 如果任何分配账户处于待执行状态，则状态为 pending\_fill  
        2. 否则，  
                1. 如果任何分配账户已成交，则状态为 filled  
                2. 如果所有分配账户均失败，则状态为 failed
:::

### 报价频道

获取用户自身发送或接收的报价信息。每当用户自身发送或接收报价时，数据都将被推送。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "quotes"
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
          "channel": "quotes"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>quotes</code></td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "quotes"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"quotes\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>quotes</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg":{
        "channel":"quotes",
        "uid": "77982378738415879"
    },
    "data":[
        {
            "validUntil":"1608997227854",
            "uTime":"1608267227834",
            "cTime":"1608267227834",
            "legs":[
                {
                    "px":"0.0023",
                    "sz":"25.0",
                    "instId":"BTC-USD-220114-25000-C",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "side":"sell",
                    "posSide": "long",
                    "tgtCcy":""

                },
                {
                    "px":"0.0045",
                    "sz":"25",
                    "instId":"BTC-USD-220114-35000-C",
                    "tdMode":"cross",
                    "ccy":"USDT",
                    "side":"buy",
                    "posSide": "long",
                    "tgtCcy":""

                }
            ],
            "quoteId":"25092",
            "rfqId":"18753",
            "tag":"123456",
            "traderCode":"SATS",
            "quoteSide":"sell",
            "state":"canceled",
            "reason":"mmp_canceled",
            "clQuoteId":""
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>账户ID，账户uid和app上的一致</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; cTime</td><td>String</td><td>报价单创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; uTime</td><td>String</td><td>报价单状态更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; state</td><td>String</td><td>报价单的状态<br><code>active</code><br><code>canceled</code><br><code>filled</code><br><code>expired</code><br><code>failed</code></td></tr><tr><td>&gt; reason</td><td>String</td><td>状态原因<br><code>mmp_canceled</code></td></tr><tr><td>&gt; validUntil</td><td>String</td><td>报价单的过期时间，Unix时间戳的毫秒数格式。</td></tr><tr><td>&gt; rfqId</td><td>String</td><td>询价单ID</td></tr><tr><td>&gt; clRfqId</td><td>String</td><td>询价单自定义ID，为客户敏感信息，不会公开，对报价方返回""。</td></tr><tr><td>&gt; quoteId</td><td>String</td><td>报价单ID</td></tr><tr><td>&gt; clQuoteId</td><td>String</td><td>报价单自定义ID，为客户敏感信息，不会公开，对询价方返回""。</td></tr><tr><td>&gt; tag</td><td>String</td><td>报价单标签，与此报价单关联的大宗交易将有相同的标签。</td></tr><tr><td>&gt; traderCode</td><td>String</td><td>报价方唯一标识代码，报价时 Anonymous 设置为 <code>True</code> 时不可见。</td></tr><tr><td>&gt; quoteSide</td><td>String</td><td>报价单方向<br><code>buy</code><br><code>sell</code><br>当报价单方向为<code>buy</code>，对maker来说，执行方向与legs里的方向相同，对taker来说相反。反之同理。</td></tr><tr><td>&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; tdMode</td><td>String</td><td>交易模式<br>保证金模式 <code>cross</code>：全仓 <code>isolated</code>：逐仓<br>非保证金模式 <code>cash</code>：非保证金<br>如未提供，tdMode 将继承系统设置的默认值：<br>合约模式 &amp; 现货模式: <code>cash</code><br>合约模式和跨币种保证金模式下买入期权： <code>isolated</code><br>其他情况: <code>cross</code></td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>保证金币种，仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单<br>在其他情况下该参数将被忽略。</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>委托数量</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>委托价格</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>报价单方向</td></tr><tr><td>&gt;&gt; posSide</td><td>String</td><td>持仓方向<br>买卖模式下默认为<code>net</code>。如未指定，则返回""，相当于<code>net</code>。<br>在开平仓模式下仅可选择<code>long</code>或<code>short</code>。 如未指定，则返回""，对应于为交易开新仓位的方向（买入=&gt;<code>long</code>，卖出=&gt;<code>short</code>）。<br>仅适用交割、永续。</td></tr><tr><td>&gt;&gt; tgtCcy</td><td>String</td><td>委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td>&gt;&gt; tradeQuoteCcy</td><td>String</td><td>交易使用的计价币种。仅适用于 SPOT。<br>默认值为 instId 的报价币种，例如：对于 <code>BTC-USD</code>，默认值为 <code>USD</code>.</td></tr></tbody></table>

### 大宗交易频道

获取用户自身的大宗交易信息。同一大宗交易中的所有腿都包含在同一更新中。只要用户自身作为交易对手（即询价方或成交的报价方）进行大宗交易，数据都将被推送。状态为 `traded_away` 的报价方将不会收到本频道的推送。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "struc-block-trades"
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
          "channel": "struc-block-trades"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>struc-block-trades</code></td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "struc-block-trades"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"struc-block-trades\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>struc-block-trades</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg":{
        "channel":"struc-block-trades",
        "uid": "77982378738415879"
    },
    "data":[
        {
            "cTime":"1608267227834",
            "rfqId":"18753",
            "clRfqId":"",
            "quoteId":"25092",
            "clQuoteId":"",
            "blockTdId":"180184",
            "tag":"123456",
            "tTraderCode":"ANAND",
            "mTraderCode":"WAGMI",
            "isSuccessful": true,
            "errorCode": "",
            "legs":[
                {
                    "px":"0.0023",
                    "sz":"25.0",
                    "instId":"BTC-USD-20220630-60000-C",
                    "side":"sell",
                    "fee":"0.1001",
                    "feeCcy":"BTC",
                    "tradeId":"10211",
                    "tgtCcy":""

                },
                {
                    "px":"0.0033",
                    "sz":"25",
                    "instId":"BTC-USD-20220630-50000-C",
                    "side":"buy",
                    "fee":"0.1001",
                    "feeCcy":"BTC",
                    "tradeId":"10212",
                    "tgtCcy":""

                }
            ]
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; cTime</td><td>String</td><td>执行创建的时间戳，Unix 时间戳格式，以毫秒为单位。</td></tr><tr><td>&gt; rfqId</td><td>String</td><td>RFQ ID.</td></tr><tr><td>&gt; clRfqId</td><td>String</td><td>由用户设置的 RFQ ID。 此属性被视为客户端敏感信息。 不会暴露给 Maker，只返回空字符串“”给 Maker。</td></tr><tr><td>&gt; quoteId</td><td>String</td><td>Quote ID.</td></tr><tr><td>&gt; clQuoteId</td><td>String</td><td>由用户设置的 Quote ID。 此属性被视为客户端敏感信息。 不会暴露给 Taker，只为 Taker 返回空字符串“”。</td></tr><tr><td>&gt; blockTdId</td><td>String</td><td>大宗交易ID</td></tr><tr><td>&gt; tag</td><td>String</td><td>交易标签，大宗交易将有与其对应的询价单或报价单相同的标签。</td></tr><tr><td>&gt; tTraderCode</td><td>String</td><td>报价方唯一标识代码。询价时 Anonymous 设置为 <code>True</code> 时不可见。</td></tr><tr><td>&gt; mTraderCode</td><td>String</td><td>询价方唯一标识代码。报价时 Anonymous 设置为 <code>True</code> 时不可见。</td></tr><tr><td>&gt; isSuccessful</td><td>Boolean</td><td>交易是否成功</td></tr><tr><td>&gt; errorCode</td><td>String</td><td>未成功交易的错误码。<br>对于成功交易为 ""。</td></tr><tr><td>&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>成交价格</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>成交数量</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>询价单方向</td></tr><tr><td>&gt;&gt; tgtCcy</td><td>String</td><td>委托数量的类型<br>定义<code>sz</code>属性的单位。仅适用于 instType=<code>SPOT</code>。有效值为<code>base_ccy</code>和<code>quote_ccy</code>。未指定时，默认为<code>base_ccy</code>。</td></tr><tr><td>&gt;&gt; fee</td><td>String</td><td>手续费，正数代表平台返佣 ，负数代表平台扣除。</td></tr><tr><td>&gt;&gt; feeCcy</td><td>String</td><td>手续费币种</td></tr><tr><td>&gt;&gt; tradeId</td><td>String</td><td>最新成交Id</td></tr><tr><td>&gt; acctAlloc</td><td>Array of objects</td><td>组合询价单的账户分配</td></tr><tr><td>&gt;&gt; blockTdId</td><td>String</td><td>大宗交易ID</td></tr><tr><td>&gt;&gt; errorCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>&gt;&gt; acct</td><td>String</td><td>账户名<br>只适用于 Taker，对于 Maker 返回""</td></tr><tr><td>&gt;&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt;&gt; sz</td><td>String</td><td>成交数量</td></tr><tr><td>&gt;&gt;&gt; tradeId</td><td>String</td><td>最新的成交Id</td></tr><tr><td>&gt;&gt;&gt; fee</td><td>String</td><td>手续费</td></tr><tr><td>&gt;&gt;&gt; feeCcy</td><td>String</td><td>手续费币种</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. 该频道返回的数据应为父级询价单级别，而不是子级询价单执行级别。  
2\. 对于账户分配，包含所有已成交和未成交的子级询价单，但添加 errorCode 来指示子级询价单是否已成交。  
3\. 交易结果将仅返回给组合询价单 Taker 及 Maker。分配的子账户和资管账户将无法看到交易结果。分配的账户应通过交易账单获取这些交易。  
4\. 交易数据仅在所有子级询价单执行后返回。  
5\. 对于父级询价单的 isSuccessful 字段，  
        1. 如果任何子级询价单已成交，则返回 true  
        2. 否则，如果所有子级询价单均失败，则返回 false  
6\. 父级询价单的 blockTdId 或 legs 的 tradeId 将为空。但将提供账户分配的详细信息，并附带 blockTdId 以及 tradeId。
:::

## WebSocket 公共频道

### 公共大宗交易频道

获取欧易的最新大宗交易信息。同一大宗交易中的所有腿都包含在同一更新中。数据将在大宗交易执行15分钟后被推送。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "public-struc-block-trades"
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
          "channel": "public-struc-block-trades"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>public-struc-block-trades</code></td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "public-struc-block-trades"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"public-struc-block-trades\""}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>public-struc-block-trades</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg":{
        "channel":"public-struc-block-trades"
    },
    "data":[
        {

            "cTime":"1608267227834",
            "blockTdId":"1802896",
            "groupId":"",
            "legs":[
                {
                    "px":"0.323",
                    "sz":"25.0",
                    "instId":"BTC-USD-20220114-13250-C",
                    "side":"sell",
                    "tradeId":"15102"
                },
                {
                    "px":"0.666",
                    "sz":"25",
                    "instId":"BTC-USD-20220114-21125-C",
                    "side":"buy",
                    "tradeId":"15103"
                }
            ]
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; cTime</td><td>String</td><td>执行创建的时间戳，Unix 时间戳格式，以毫秒为单位。</td></tr><tr><td>&gt; blockTdId</td><td>String</td><td>大宗交易ID</td></tr><tr><td>&gt; groupId</td><td>String</td><td>组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td>&gt; legs</td><td>Array of objects</td><td>组合交易</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品名Id</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>成交价格</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>询价单方向，从 Taker的视角看</td></tr><tr><td>&gt;&gt; tradeId</td><td>String</td><td>最新成交Id</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. 新增返回参数 groupId，协助用户将子账户执行映射到组合询价单。仅适用于组合询价单，对普通询价单返回 ""。  
2\. 该接口返回的交易数据应为父级询价单，而不是子级询价单，与子账户分配无关，blockTdId 及 tradeId 为空
:::

::: tip
blockTdId 与 rfqId 的对应关系  
  
对于普通询价单，每个 `blockTdId` 与一个 `rfqId` 一一对应。对于组合询价单，一个 `rfqId` 可能对应多个 `blockTdId`。  
  
本频道不直接返回 `rfqId`。作为交易对手方（询价方或成交的报价方）的用户，可订阅私有[大宗交易频道](/zh/block-trading-websocket-private-channel-structure-block-trades-channel)，该频道同时包含 `rfqId` 和 `blockTdId`，可用于两个频道之间的关联查询。
:::

### 公共大宗交易单腿交易频道

获取欧易的最新大宗交易单腿交易信息。大宗交易中的每条腿都在单独的更新中推送。数据将在大宗交易执行15分钟后被推送。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "public-block-trades",
      "instId": "BTC-USDT-SWAP"
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
          "channel": "public-block-trades",
          "instId": "BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>public-block-trades</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>产品 ID, 如 <code>BTC-USDT-SWAP</code></td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "public-block-trades",
    "instId": "BTC-USDT-SWAP"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"args\":[{ \"channel\" : \"public-block-trades\""}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必需</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>public-block-trades</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>产品 ID, 如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
   "arg":{
      "channel":"public-block-trades",
      "instId":"BTC-USD-231020-5000-P"
   },
   "data":[
      {
         "fillVol":"5",
         "fwdPx":"26808.16",
         "groupId":"",
         "idxPx":"27222.5",
         "instId":"BTC-USD-231020-5000-P",
         "markPx":"0.0022406326071111",
         "px":"0.0048",
         "side":"buy",
         "sz":"1",
         "tradeId":"633971452580106242",
         "ts":"1697422572972"
      }
   ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品 ID, 如 <code>BTC-USDT-SWAP</code></td></tr><tr><td>data</td><td>Array of objects</td><td>公共大宗交易单腿交易信息</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品 ID, 如 <code>BTC-USDT-SWAP</code></td></tr><tr><td>&gt; tradeId</td><td>String</td><td>交易 ID, 由柜台提供.</td></tr><tr><td>&gt; px</td><td>String</td><td>该单腿交易价格.</td></tr><tr><td>&gt; sz</td><td>String</td><td>成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td>&gt; side</td><td>String</td><td>交易方向, buy, sell, 从taker角度看.</td></tr><tr><td>&gt; fillVol</td><td>String</td><td>成交时的隐含波动率<br>仅适用于 <code>期权</code></td></tr><tr><td>&gt; fwdPx</td><td>String</td><td>成交时的远期价格<br>仅适用于 <code>期权</code></td></tr><tr><td>&gt; idxPx</td><td>String</td><td>成交时的指数价格<br>适用于 <code>交割</code>, <code>永续</code>, <code>期权</code></td></tr><tr><td>&gt; markPx</td><td>String</td><td>成交时的标记价格<br>适用于 <code>交割</code>, <code>永续</code>, <code>期权</code></td></tr><tr><td>&gt; groupId</td><td>String</td><td>组合询价单ID<br>只适用于组合询价单，普通询价单返回 ""</td></tr><tr><td>&gt; ts</td><td>String</td><td>成交时间, 时间戳格式，以毫秒为单位. 如 1597026383085.</td></tr></tbody></table>

::: tip
组合询价单介绍  
  
1\. 新增返回参数 groupId，协助用户将子账户执行映射到组合询价单。仅适用于组合询价单，对普通询价单返回 ""。  
2\. 该接口返回的交易数据应为子级询价单，但拆分为单腿，tradeId 有值。
:::

### 大宗交易行情频道

获取最近24小时大宗交易量  

当发生成交事件时触发推送，此外，也会根据订阅维度每隔5分钟推送一次

#### 服务地址

/ws/v5/business

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "block-tickers",
        "instId": "BTC-USDT"
    }]
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
    args = [{
        "channel": "block-tickers",
        "instId": "BTC-USDT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>block-tickers</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "block-tickers",
        "instId": "LTC-USD-200327"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"block-tickers\", \"instId\" : \"LTC-USD-200327\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名 <code>block-tickers</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "block-tickers"
    },
    "data": [
        {
            "instType": "SWAP",
            "instId": "LTC-USD-SWAP",
            "volCcy24h": "0",
            "vol24h": "0",
            "ts": "1597026383085"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; volCcy24h</td><td>String</td><td>24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td>&gt; vol24h</td><td>String</td><td>24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>
