---
title: 交易账户
outline: deep
---

`账户`功能模块下的API接口需要身份验证。

## REST API

### 获取交易产品基础信息

获取当前账户可交易产品的信息列表。

#### 限速：20次/2s

#### 限速规则：User ID + Instrument Type

#### HTTP请求

`GET /api/v5/account/instruments`

> 请求示例

```
GET /api/v5/account/instruments?instType=SPOT
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

result = accountAPI.get_instruments(instType="SPOT")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。当 instType 为 <code>EVENTS</code> 时必填</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，期权必填</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "auctionEndTime": "",
            "baseCcy": "BTC",
            "ctMult": "",
            "ctType": "",
            "ctVal": "",
            "ctValCcy": "",
            "contTdSwTime": "1704876947000",
            "elp": "0",
            "expTime": "",
            "futureSettlement": false,
            "groupId": "4",
            "instFamily": "",
            "instId": "BTC-EUR",
            "instType": "SPOT",
            "lever": "",
            "listTime": "1704876947000",
            "lotSz": "0.00000001",
            "maxIcebergSz": "9999999999.0000000000000000",
            "maxLmtAmt": "1000000",
            "maxLmtSz": "9999999999",
            "maxMktAmt": "1000000",
            "maxMktSz": "1000000",
            "maxPlatOILmt": "1000000000",
            "maxPlatOICoinLmt": "",
            "maxStopSz": "1000000",
            "maxTriggerSz": "9999999999.0000000000000000",
            "maxTwapSz": "9999999999.0000000000000000",
            "minSz": "0.00001",
            "optType": "",
            "openType": "call_auction",
            "preMktSwTime": "",
            "posLmtPct": "30",
            "posLmtAmt": "2500000",
            "quoteCcy": "EUR",
            "tradeQuoteCcyList": [
                "EUR"
            ],
            "settleCcy": "",
            "state": "live",
            "ruleType": "normal",
            "stk": "",
            "tickSz": "1",
            "uly": "",
            "instIdCode": 1000000000,
            "instCategory": "1",
            "initPxLmtPct": "0.05",
            "floatPxLmtPct": "0.03",
            "maxPxLmtPct": "0.15",
            "upcChg": [
                {
                    "param": "tickSz",
                    "newValue": "0.0001",
                    "effTime": "1704876947000"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品id， 如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数，如 <code>BTC-USD</code>，仅适用于<code>杠杆/交割/永续/期权</code></td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品手续费分组ID<br>现货：<br><code>3</code>：TRY现货<br><code>5</code>：BRL现货<br><code>7</code>：AED现货<br><code>8</code>：AUD现货<br><code>10</code>：SGD现货<br><code>11</code>：零手续费现货<br><code>12</code>：现货分组一<br><code>13</code>：现货分组二<br><code>14</code>：现货分组三<br><code>15</code>: 现货特别分组<br><code>17</code>：现货稳定币分组<br><code>22</code>：现货RWA分组二<br><br>交割合约：<br><code>5</code>：交割合约分组一<br><code>6</code>：交割合约分组二<br><code>8</code>：XPERP分组二<br><code>10</code>：XPERP RWA分组二<br><br>永续合约：<br><code>4</code>：永续合约分组一<br><code>5</code>：永续合约分组二<br><code>6</code>：SWAP RWA分组一<br><code>7</code>：SWAP RWA分组二<br><br>期权：<br><code>1</code>：币本位期权<br><br><strong>用户需要同时使用instType和groupId来确定一个交易产品的交易手续费分组；用户应该将此接口和<a href="zh.html#trading-account-rest-api-get-fee-rates">获取当前账户交易手续费费率</a>一起使用，以获取特定交易产品的手续费率</strong><br><br><strong>部分枚举值可能不适用于您，以实际返回为准</strong></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种，如 <code>BTC-USD</code>，仅适用于<code>杠杆/交割/永续/期权</code></td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code> 中的 <code>BTC</code> ，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code> 中的<code>USDT</code> ，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">盈亏结算和保证金币种，如 <code>BTC</code> 仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">ctMult</td><td style="text-align: left">String</td><td style="text-align: left">合约乘数，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">ctValCcy</td><td style="text-align: left">String</td><td style="text-align: left">合约面值计价币种，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型，<code>C</code>或<code>P</code> 仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">stk</td><td style="text-align: left">String</td><td style="text-align: left">行权价格，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">listTime</td><td style="text-align: left">String</td><td style="text-align: left">上线时间<br>Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">auctionEndTime</td><td style="text-align: left">String</td><td style="text-align: left"><del>集合竞价结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于通过集合竞价方式上线的<code>币币</code>，其余情况返回""（已废弃，请使用contTdSwTime）</del></td></tr><tr><td style="text-align: left">contTdSwTime</td><td style="text-align: left">String</td><td style="text-align: left">连续交易开始时间，从集合竞价、提前挂单切换到连续交易的时间，Unix时间戳格式，单位为毫秒。e.g. <code>1597026383085</code>。<br>仅适用于通过集合竞价或提前挂单上线的<code>SPOT</code>/<code>MARGIN</code>，在其他情况下返回""。</td></tr><tr><td style="text-align: left">preMktSwTime</td><td style="text-align: left">String</td><td style="text-align: left">盘前交易产品切换为正常交易的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于盘前<code>SWAP</code> 与盘前 X-Perp <code>FUTURES</code>。当盘前 X-Perp 转换为正常 X-Perp 时填充</td></tr><tr><td style="text-align: left">openType</td><td style="text-align: left">String</td><td style="text-align: left">开盘类型<br><code>fix_price</code>: 定价开盘<br><code>pre_quote</code>: 提前挂单<br><code>call_auction</code>: 集合竞价<br>只适用于<code>SPOT</code>/<code>MARGIN</code>，其他业务线返回""</td></tr><tr><td style="text-align: left">elp</td><td style="text-align: left">String</td><td style="text-align: left">ELP 下单权限<br><code>0</code>：该币对不支持 ELP<br><code>1</code>：该币对支持 ELP 但用户没有权限为其下 ELP 订单<br><code>2</code>：该币对支持 ELP 且用户有权限为其下 ELP 订单<br><br><code>1/2</code>不代表深度中一定有 ELP 挂单</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">产品下线时间<br>适用于<code>币币/杠杆/交割/永续/期权</code>，对于 <code>交割/期权</code>，为交割/行权日期；亦可以为产品下线时间，有变动就会推送。</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">该<code>instId</code>支持的最大杠杆倍数，不适用于<code>币币</code>、<code>期权</code></td></tr><tr><td style="text-align: left">tickSz</td><td style="text-align: left">String</td><td style="text-align: left">下单价格精度，如 <code>0.0001</code>。<br>对于 <code>OPTION</code>/<code>EVENTS</code>，该值为 tick band 中的最小 tickSz。如需获取各价格区间的精确 tickSz，请使用"获取期权价格梯度"接口并传入对应的 <code>instType</code> 参数。</td></tr><tr><td style="text-align: left">lotSz</td><td style="text-align: left">String</td><td style="text-align: left">下单数量精度<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">minSz</td><td style="text-align: left">String</td><td style="text-align: left">最小下单数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">ctType</td><td style="text-align: left">String</td><td style="text-align: left">合约类型<br><code>linear</code>：正向合约<br><code>inverse</code>：反向合约<br>仅适用于<code>交割/永续</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">产品状态<br><code>live</code>：交易中<br><code>suspend</code>：暂停中<br><code>rebase</code>：合约在变基中，不可交易，仅适用于<code>SWAP</code><br><code>post_only</code>：仅接受 post-only 订单；已有 post-only 订单可改单和撤单。其他订单类型（市价单、IOC、FOK、普通限价单）将被拒绝。仅适用于 <code>SWAP</code><br><code>preopen</code>：预上线，交割和期权合约轮转生成到开始交易；部分交易产品上线前<br><code>test</code>：测试中（测试产品，不可交易）<br><code>settling</code>：结算中，仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">ruleType</td><td style="text-align: left">String</td><td style="text-align: left">交易规则类型<br><code>normal</code>：普通交易<br><code>pre_market</code>：盘前交易，含盘前 X-Perp <code>FUTURES</code><br><code>rebase_contract</code>：盘前变基合约<br><code>xperp</code>：永续合约风格的交割合约，仅适用于部分 <code>FUTURES</code> 合约。盘前 X-Perp 转换为正常 X-Perp 后，由 <code>pre_market</code> 变为 <code>xperp</code></td></tr><tr><td style="text-align: left">posLmtAmt</td><td style="text-align: left">String</td><td style="text-align: left">单一用户（母子账户共享）层面的该产品最大持仓名义价值（USD），按同方向已持仓与挂单的美元名义价值计算。单用户有效上限为 max(posLmtAmt, oiUSD × posLmtPct)。适用于 <code>SWAP</code>/<code>FUTURES</code>。</td></tr><tr><td style="text-align: left">posLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">单一用户（母子账户共享）相对于平台当前总持仓名义价值可持有的最大比例（如 30 表示 30%）。单用户有效上限为 max(posLmtAmt, oiUSD × posLmtPct)。适用于 <code>SWAP</code>/<code>FUTURES</code>。</td></tr><tr><td style="text-align: left">maxPlatOILmt</td><td style="text-align: left">String</td><td style="text-align: left">该产品的全平台最大持仓名义价值（USD）。当平台总持仓量（USD）达到或超过该值时，系统将拒绝所有用户对该产品的新开仓委托；否则订单通过校验。<br>适用于 <code>SWAP</code>/<code>FUTURES</code></td></tr><tr><td style="text-align: left">maxPlatOICoinLmt</td><td style="text-align: left">String</td><td style="text-align: left">该产品的全平台最大持仓名义价值（币量）。当平台总持仓量（币量）达到或超过该值时，系统将拒绝所有用户对该产品的新开仓委托；否则订单通过校验。<br>适用于 <code>SWAP</code>/<code>FUTURES</code></td></tr><tr><td style="text-align: left">longPosRemainingQuota</td><td style="text-align: left">String</td><td style="text-align: left">单一用户维度（母子账户共享），在该产品下扣除已有多头仓位及挂单中的买入订单后，仍可开立的多头仓位剩余额度（以 USD 计）。</td></tr><tr><td style="text-align: left">shortPosRemainingQuota</td><td style="text-align: left">String</td><td style="text-align: left">单一用户维度（母子账户共享），在该产品下扣除已有空头仓位及挂单中的卖出订单后，仍可开立的空头仓位剩余额度（以 USD 计）。</td></tr><tr><td style="text-align: left">maxLmtSz</td><td style="text-align: left">String</td><td style="text-align: left">限价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxMktSz</td><td style="text-align: left">String</td><td style="text-align: left">市价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">maxLmtAmt</td><td style="text-align: left">String</td><td style="text-align: left">限价单的单笔最大美元价值</td></tr><tr><td style="text-align: left">maxMktAmt</td><td style="text-align: left">String</td><td style="text-align: left">市价单的单笔最大美元价值<br>仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">maxTwapSz</td><td style="text-align: left">String</td><td style="text-align: left">时间加权单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code><br>单笔最小委托数量为 minSz*2</td></tr><tr><td style="text-align: left">maxIcebergSz</td><td style="text-align: left">String</td><td style="text-align: left">冰山委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxTriggerSz</td><td style="text-align: left">String</td><td style="text-align: left">计划委托委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxStopSz</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损市价委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">futureSettlement</td><td style="text-align: left">Boolean</td><td style="text-align: left">交割合约是否支持每日结算<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">tradeQuoteCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可用于交易的计价币种列表，如 ["USD", "USDC"].</td></tr><tr><td style="text-align: left">instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">产品唯一标识代码。<br>对于简单二进制编码，您必须使用 <code>instIdCode</code> 而不是 <code>instId</code>。<br>对于同一<code>instId</code>，实盘和模拟盘的值可能会不一样。<br>当值还未生成时，返回 <code>null</code>。</td></tr><tr><td style="text-align: left">instCategory</td><td style="text-align: left">String</td><td style="text-align: left">标的资产类别（产品ID的第一部分）。例如：对于 <code>BTC-USDT-SWAP</code>，instCategory 表示 <code>BTC</code> 所属的资产类别。<br><code>1</code>: 加密货币<br><code>3</code>: 股票类资产<br><code>4</code>: 大宗商品<br><code>5</code>: 外汇<br><code>6</code>: 债券<br><code>""</code> 当值不可用时返回空字符串</td></tr><tr><td style="text-align: left">initPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">合约上线后前 10 分钟内的初始价格限制区间，小数百分比，例如 <code>0.05</code> 代表 5%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">floatPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">常规交易期间的浮动价格限制区间，小数百分比，例如 <code>0.03</code> 代表 3%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">maxPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">最大价格限制上限（下单价格相对指数价格偏离的硬性上限），小数百分比，例如 <code>0.15</code> 代表 15%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">upcChg</td><td style="text-align: left">Array of objects</td><td style="text-align: left">即将变更的参数列表。当没有即将变更的参数时，返回空数组 []</td></tr><tr><td style="text-align: left">&gt; param</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数名称。<br><code>tickSz</code><br><code>minSz</code>：若为交割/永续合约（<code>FUTURES</code>/<code>SWAP</code>），<code>lotSz</code> 会同步变更。<br><code>maxMktSz</code></td></tr><tr><td style="text-align: left">&gt; newValue</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数值。</td></tr><tr><td style="text-align: left">&gt; effTime</td><td style="text-align: left">String</td><td style="text-align: left">生效时间。Unix 时间戳格式，例如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
listTime以及contTdSwTime  
对于通过集合竞价/提前挂单方式上线的币币，listTime为集合竞价/提前挂单的开始时间，contTdSwTime为集合竞价/提前挂单的结束时间、连续交易的开始时间；对于其他情况及业务线，listTime即为连续交易开始时间，contTdSwTime将返回""
:::

::: tip
state  
对于\`币币\`、\`杠杆\`、\`永续\`和\`交割\`，状态state在时间到达listTime时由\`preopen\`转变为\`live\`。对于\`期权\`合约，由于内部处理原因，状态可能在\`listTime\`之后短暂延迟变为\`live\`。建议在下单前确认\`state\`为\`live\`。  
当产品下线的时候（如交割合约被交割的时候，期权合约被行权的时候），查询不到该产品
:::

### 查看账户余额

获取交易账户中资金余额信息。

::: tip
免息额度和折算率都是公共数据，不在账户接口内展示
:::

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/balance`

> 请求示例

```
# 获取账户中所有资产余额
GET /api/v5/account/balance

# 获取账户中BTC、ETH两种资产余额
GET /api/v5/account/balance?ccy=BTC,ETH
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户余额
result = accountAPI.get_account_balance()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adjEq": "55415.624719833286",
            "availEq": "",
            "borrowFroz": "0",
            "delta": "0",
            "deltaLever": "0",
            "deltaNeutralStatus": "0",
            "details": [
                {
                    "autoLendStatus": "off",
                    "autoLendMtAmt": "0",
                    "availBal": "4834.317093622894",
                    "availEq": "4834.3170936228935",
                    "borrowFroz": "0",
                    "cashBal": "4850.435693622894",
                    "ccy": "USDT",
                    "crossLiab": "0",
                    "colRes": "0",
                    "collateralEnabled": false,
                    "collateralRestrict": false,
                    "colBorrAutoConversion": "0",
                    "disEq": "4991.542013297616",
                    "eq": "4992.890093622894",
                    "eqUsd": "4991.542013297616",
                    "smtSyncEq": "0",
                    "spotCopyTradingEq": "0",
                    "fixedBal": "0",
                    "frozenBal": "158.573",
                    "frpType": "0",
                    "imr": "",
                    "interest": "0",
                    "isoEq": "0",
                    "isoLiab": "0",
                    "isoUpl": "0",
                    "liab": "0",
                    "maxLoan": "0",
                    "mgnRatio": "",
                    "mmr": "",
                    "notionalLever": "",
                    "ordFrozen": "0",
                    "rewardBal": "0",
                    "spotInUseAmt": "",
                    "clSpotInUseAmt": "",
                    "maxSpotInUse": "",
                    "spotIsoBal": "0",
                    "stgyEq": "150",
                    "twap": "0",
                    "uTime": "1705449605015",
                    "upl": "-7.545600000000006",
                    "uplLiab": "0",
                    "spotBal": "",
                    "openAvgPx": "",
                    "accAvgPx": "",
                    "spotUpl": "",
                    "spotUplRatio": "",
                    "totalPnl": "",
                    "totalPnlRatio": ""
                }
            ],
            "imr": "0",
            "isoEq": "0",
            "mgnRatio": "",
            "mmr": "0",
            "notionalUsd": "0",
            "notionalUsdForBorrow": "0",
            "notionalUsdForFutures": "0",
            "notionalUsdForOption": "0",
            "notionalUsdForSwap": "0",
            "ordFroz": "",
            "totalEq": "55837.43556134779",
            "uTime": "1705474164160",
            "upl": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>uTime</td><td>String</td><td>账户信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>totalEq</td><td>String</td><td>美金层面权益</td></tr><tr><td>isoEq</td><td>String</td><td>美金层面逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>adjEq</td><td>String</td><td>调整后权益（USD）：<code>totalEq</code> 减去非稳定币抵押资产的折价扣减。是保证金率计算中的分子（<code>mgnRatio</code> = <code>adjEq</code> / <code>mmr</code>）。美金层面有效保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>availEq</td><td>String</td><td>账户美金层面可用保证金，排除因总质押借币上限而被限制的币种<br>适用于<code>跨币种保证金模式/组合保证金模式</code></td></tr><tr><td>ordFroz</td><td>String</td><td>美金层面全仓挂单占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>imr</td><td>String</td><td>初始保证金要求（IMR），以 <code>USD</code> 计价：账户所有全仓持仓及挂单的初始保证金之和。公式：仓位数量 × 标记价格 × 初始保证金率（= 1/杠杆）。简单交易模式下返回空字符串。<br>适用于 <code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>mmr</td><td>String</td><td>维持保证金要求（MMR），以 <code>USD</code> 计价：避免强制平仓所需的最低权益。当 <code>adjEq</code> ≤ <code>mmr</code>（即 <code>mgnRatio</code> ≤ 1.0）时，系统开始强制平仓。可订阅持仓风险预警WebSocket频道获取主动告警。<br>适用于 <code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>borrowFroz</td><td>String</td><td>账户美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td>mgnRatio</td><td>String</td><td>账户层面保证金率 = <code>adjEq</code> / <code>mmr</code>。数值 ≤ 1.0 表示账户已达到或超过强平边界。建议监控此字段，或订阅持仓风险预警WebSocket频道进行主动预警。<br>适用于 <code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsd</td><td>String</td><td>所有衍生品持仓折算为USD的名义价值总和（多头+空头，不轧差）。线性合约：数量 × <code>ctVal</code> × 标记价格；反向合约：数量 × <code>ctVal</code>（USD面值固定）。<br>适用于 <code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForBorrow</td><td>String</td><td>借币金额（美元价值）<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForSwap</td><td>String</td><td>永续合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForFutures</td><td>String</td><td>交割合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForOption</td><td>String</td><td>期权持仓美元价值<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>upl</td><td>String</td><td>账户层面所有多头/空头持仓未实现盈亏之和，以 <code>USD</code> 计价。按标记价格计算（非最新成交价）。正数代表未实现盈利；负数代表未实现亏损。适用于 <code>跨币种保证金模式</code>/<code>组合保证金模式</code>，其他模式返回空字符串。</td></tr><tr><td>delta</td><td>String</td><td>Delta (USD)</td></tr><tr><td>deltaLever</td><td>String</td><td>Delta权益比率<br>deltaLever = delta/totalEq</td></tr><tr><td>deltaNeutralStatus</td><td>String</td><td>Delta 风险状态<br><code>0</code>: 普通<br><code>1</code>: 限制划转<br><code>2</code>: 仅支持降低 Delta - 相同基础货币的现货、交割和永续合约视为同一标的资产。同一标的资产内，仅能新下一笔降低 Delta 值的订单，且下单时不应存在其他挂单。如果触发此限制，且您的账户 Delta 大于 500,000 USD，您的所有限价、市价、高级限价单挂单将被撤销。</td></tr><tr><td>details</td><td>Array of objects</td><td>各币种资产详细信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt; eq</td><td>String</td><td>币种总权益</td></tr><tr><td>&gt; cashBal</td><td>String</td><td>币种余额</td></tr><tr><td>&gt; uTime</td><td>String</td><td>币种余额信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>&gt; isoEq</td><td>String</td><td>币种逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; availEq</td><td>String</td><td>可用保证金<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; disEq</td><td>String</td><td>美金层面币种折算权益<br>适用于<code>现货模式</code>(开通了借币功能)/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; fixedBal</td><td>String</td><td>抄底宝、逃顶宝功能的币种冻结金额</td></tr><tr><td>&gt; availBal</td><td>String</td><td>可用余额</td></tr><tr><td>&gt; frozenBal</td><td>String</td><td>币种占用金额</td></tr><tr><td>&gt; ordFrozen</td><td>String</td><td>挂单冻结数量<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code></td></tr><tr><td>&gt; liab</td><td>String</td><td>币种负债额<br>值为正数，如 "21625.64"<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; upl</td><td>String</td><td>未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; uplLiab</td><td>String</td><td>由于仓位未实现亏损导致的负债<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; crossLiab</td><td>String</td><td>币种全仓负债额<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; isoLiab</td><td>String</td><td>币种逐仓负债额<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; rewardBal</td><td>String</td><td>体验金余额</td></tr><tr><td>&gt; mgnRatio</td><td>String</td><td>币种全仓维持保证金率，衡量账户内某项资产风险的指标<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; imr</td><td>String</td><td>币种维度全仓占用保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; mmr</td><td>String</td><td>币种维度全仓维持保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; interest</td><td>String</td><td>计息，应扣未扣利息<br>值为正数，如 <code>9.01</code><br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; twap</td><td>String</td><td>当前负债币种触发自动换币的风险<br>0、1、2、3、4、5其中之一，数字越大代表您的负债币种触发自动换币概率越高<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; frpType</td><td>String</td><td>自动换币类型<br><code>0</code>：未发生自动换币<br><code>1</code>：基于用户的自动换币<br><code>2</code>：基于平台借币限额的自动换币<br><br>当twap&gt;=1时返回1或2代表自动换币风险类型，适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; maxLoan</td><td>String</td><td>币种最大可借<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code> 的全仓</td></tr><tr><td>&gt; eqUsd</td><td>String</td><td>币种权益美金价值</td></tr><tr><td>&gt; borrowFroz</td><td>String</td><td>币种美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td>&gt; notionalLever</td><td>String</td><td>币种杠杆倍数<br>适用于<code>合约模式</code></td></tr><tr><td>&gt; stgyEq</td><td>String</td><td>策略权益</td></tr><tr><td>&gt; isoUpl</td><td>String</td><td>逐仓未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; spotInUseAmt</td><td>String</td><td>现货对冲占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; clSpotInUseAmt</td><td>String</td><td>用户自定义现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; maxSpotInUse</td><td>String</td><td>系统计算得到的最大可能现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; spotIsoBal</td><td>String</td><td>现货逐仓余额<br>仅适用于现货带单/跟单<br>适用于<code>现货模式</code>/<code>合约模式</code></td></tr><tr><td>&gt; smtSyncEq</td><td>String</td><td>合约智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td>&gt; spotCopyTradingEq</td><td>String</td><td>现货智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td>&gt; spotBal</td><td>String</td><td>现货余额 ，单位为 币种，比如 BTC。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; openAvgPx</td><td>String</td><td>现货开仓成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; accAvgPx</td><td>String</td><td>现货累计成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; spotUpl</td><td>String</td><td>现货未实现收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; spotUplRatio</td><td>String</td><td>现货未实现收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; totalPnl</td><td>String</td><td>现货累计收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; totalPnlRatio</td><td>String</td><td>现货累计收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; colRes</td><td>String</td><td>平台维度质押限制状态<br><code>0</code>：限制未触发<br><code>1</code>：限制未触发，但该币种接近平台质押上限<br><code>2</code>：限制已触发。该币种不可用作新订单的保证金，这可能会导致下单失败。但它仍会被计入账户有效保证金，保证金率不会收到影响。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td>&gt; colBorrAutoConversion</td><td>String</td><td>基于平台质押借币限额的自动换币风险指标。分为1-5多个等级，数字越大，触发自动换币的可能性越大。默认值为0，表示当前无风险。5表示该用户正在进行自动换币，4代表该用户即将被进行自动换币，1/2/3表示存在自动换币风险。<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code><br>当某币种的全平台质押借币量超出平台总上限一定比例时，对于质押该币种且借币量较大的用户，平台将通过自动换币降低质押借币风险。请减少该币种的质押数量或偿还负债，以降低风险。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td>&gt; collateralRestrict</td><td>Boolean</td><td><del>平台维度的质押借币限制<br><code>true</code><br><code>false</code></del>（已弃用，请使用colRes）</td></tr><tr><td>&gt; collateralEnabled</td><td>Boolean</td><td><code>true</code>：质押币<br><code>false</code>：非质押币<br>适用于`跨币种保证金模式</td></tr><tr><td>&gt; autoLendStatus</td><td>String</td><td>自动借出状态<br><code>unsupported</code>：该币种不支持自动借出<br><code>off</code>：自动借出功能关闭<br><code>pending</code>：自动借出功能开启但未匹配<br><code>active</code>：自动借出功能开启且已匹配</td></tr><tr><td>&gt; autoLendMtAmt</td><td>String</td><td>自动借出已匹配量<br>当 autoLendStatus 为 <code>unsupported/off/pending</code> 时返回 0<br>当 autoLendStatus 为 <code>active</code> 时返回已匹配量</td></tr></tbody></table>

*   更多字段详情，请参考以下产品文档：  
    [合约账户全仓交易规则](https://www.okx.com/zh-hans/help/iii-single-currency-margin-cross-margin-trading)  
    [跨币种保证金账户全仓交易规则](https://www.okx.com/zh-hans/help/iv-multi-currency-margin-mode-cross-margin-trading)  
    [跨币种保证金模式和组合保证金模式对比](https://www.okx.com/zh-hans/help/vi-multi-currency-margin-mode-vs-portfolio-margin-mode)

::: tip
当前账户等级下无效字段返回""
:::

::: tip
cashBal 和 eq 同时为 0 的币种过滤不返回
:::

各账户等级下有效字段分布

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">现货模式</th><th style="text-align: left">合约模式</th><th style="text-align: left">跨币种保证金模式</th><th style="text-align: left">组合保证金模式</th></tr></thead><tbody><tr><td style="text-align: left">uTime</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">totalEq</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">isoEq</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">adjEq</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">availEq</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">ordFroz</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">borrowFroz</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">mgnRatio</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">notionalUsd</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">notionalUsdForSwap</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">notionalUsdForFutures</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">notionalUsdForOption</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">notionalUsdForBorrow</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; eq</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; cashBal</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; isoEq</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; availEq</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; disEq</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; availBal</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; frozenBal</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; ordFrozen</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; liab</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; upl</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; uplLiab</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; crossLiab</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; isoLiab</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; interest</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; twap</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; maxLoan</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; eqUsd</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; borrowFroz</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; notionalLever</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; stgyEq</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; isoUpl</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotInUseAmt</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; clSpotInUseAmt</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; maxSpotInUse</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotIsoBal</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; mmr</td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left"></td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; smtSyncEq</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotCopyTradingEq</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotBal</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; openAvgPx</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; accAvgPx</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotUpl</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; spotUplRatio</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; totalPnl</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; totalPnlRatio</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">是</td></tr><tr><td style="text-align: left">&gt; collateralEnabled</td><td style="text-align: left"></td><td style="text-align: left"></td><td style="text-align: left">是</td><td style="text-align: left"></td></tr></tbody></table>

### 查看持仓信息

获取该账户下拥有实际持仓的信息。账户为买卖模式会显示净持仓（`net`），账户为开平仓模式下会分别返回开多（`long`）或开空（`short`）的仓位。按照仓位创建时间倒序排列。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/positions`

> 请求示例

```
# 查看BTC-USDT的持仓信息
GET /api/v5/account/positions?instId=BTC-USDT
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看持仓信息
result = accountAPI.get_positions()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约<br><code>instType</code>和<code>instId</code>同时传入的时候会校验<code>instId</code>与<code>instType</code>是否一致。</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易产品ID，如：<code>BTC-USDT-SWAP</code><br>支持多个<code>instId</code>查询（不超过10个），半角逗号分隔</td></tr><tr><td style="text-align: left">posId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓ID<br>支持多个<code>posId</code>查询（不超过20个）。<br>存在有效期的属性，自最近一次完全平仓算起，满30天 posId 以及整个仓位会被清除。</td></tr></tbody></table>

::: tip
如果该 instId 拥有过仓位且当前持仓量为0，传 instId 时，如果当前存在有效的posId，会返回仓位信息，如果当前不存在有效的 posId 时，不会返回仓位信息；不传 instId 时，仓位信息不返回。
:::

::: tip
逐仓交易设置中，如果设置为自主划转模式，逐仓转入保证金后，会生成一个持仓量为0的仓位
:::

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adl": "1",
            "availPos": "0.00190433573",
            "avgPx": "62961.4",
            "baseBal": "",
            "baseBorrowed": "",
            "baseInterest": "",
            "bePx": "",
            "bizRefId": "",
            "bizRefType": "",
            "cTime": "1724740225685",
            "ccy": "BTC",
            "clSpotInUseAmt": "",
            "closeOrderAlgo": [],
            "deltaBS": "",
            "deltaPA": "",
            "fee": "",
            "fundingFee": "",
            "gammaBS": "",
            "gammaPA": "",
            "hedgedPos": "",
            "idxPx": "62890.5",
            "imr": "",
            "instId": "BTC-USDT",
            "instType": "MARGIN",
            "interest": "0",
            "last": "62892.9",
            "lever": "5",
            "liab": "-99.9998177776581948",
            "liabCcy": "USDT",
            "liqPenalty": "",
            "liqPx": "53615.448336593756",
            "margin": "0.000317654",
            "markPx": "62891.9",
            "maxSpotInUseAmt": "",
            "mgnMode": "isolated",
            "mgnRatio": "9.404143929947395",
            "mmr": "0.0000318005395854",
            "notionalUsd": "119.756628017499",
            "optVal": "",
            "pendingCloseOrdLiabVal": "0",
            "pnl": "",
            "pos": "0.00190433573",
            "posCcy": "BTC",
            "posId": "1752810569801498626",
            "posSide": "net",
            "quoteBal": "",
            "quoteBorrowed": "",
            "quoteInterest": "",
            "realizedPnl": "",
            "spotInUseAmt": "",
            "spotInUseCcy": "",
            "thetaBS": "",
            "thetaPA": "",
            "tradeId": "785524470",
            "uTime": "1724742632153",
            "upl": "-0.0000033452492717",
            "uplLastPx": "-0.0000033199677697",
            "uplRatio": "-0.0105311101755551",
            "uplRatioLastPx": "-0.0104515220008934",
            "usdPx": "",
            "vegaBS": "",
            "vegaPA": "",
            "nonSettleAvgPx":"",
            "settledPnl":""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">posId</td><td style="text-align: left">String</td><td style="text-align: left">持仓ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多，<code>pos</code>为正<br><code>short</code>：开平仓模式开空，<code>pos</code>为正<br><code>net</code>：买卖模式（<code>交割</code>/<code>永续</code>/<code>期权</code>：<code>pos</code>为正代表开多，<code>pos</code>为负代表开空。<code>币币杠杆</code>时，<code>pos</code>均为正，<code>posCcy</code>为交易货币时，代表开多；<code>posCcy</code>为计价货币时，代表开空。）</td></tr><tr><td style="text-align: left">pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓量。单位：SWAP/FUTURES/OPTIONS为合约张数；MARGIN为标的币数量。符号（net模式）：正数=多头，负数=空头。long/short模式下按方向分开返回，请结合 <code>posSide</code> 判断。逐仓模式下手动划转保证金后，会生成一条 pos 为 <code>0</code> 的仓位记录（表示已划入资金但尚无持仓的状态）。</td></tr><tr><td style="text-align: left">hedgedPos</td><td style="text-align: left">String</td><td style="text-align: left">对冲持仓数量<br>仅在delta 中性策略模式的账户返回stgyType:1，对普通策略模式的账户返回""</td></tr><tr><td style="text-align: left">baseBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币余额，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">quoteBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币余额 ，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">baseBorrowed</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币已借，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">baseInterest</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币计息，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">quoteBorrowed</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币已借，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">quoteInterest</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币计息，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">posCcy</td><td style="text-align: left">String</td><td style="text-align: left">仓位资产币种，仅适用于<code>币币杠杆</code>仓位</td></tr><tr><td style="text-align: left">availPos</td><td style="text-align: left">String</td><td style="text-align: left">可平仓数量，适用于 <code>币币杠杆</code>，<code>期权</code><br>对于杠杆仓位，平仓时，杠杆还清负债后，余下的部分会视为币币交易，如果想要减少币币交易的数量，可通过"获取最大可用数量"接口获取只减仓的可用数量。</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">当前持仓的成交量加权平均开仓价格。线性合约以计价货币计价（如BTC-USDT-SWAP以USDT计），反向合约以USD计价（如BTC-USD-SWAP以USD计）。每次影响仓位大小的成交后重新计算。开仓均价<br>会随结算周期变化，特别是在交割合约全仓模式下，结算时开仓均价会更新为结算价格，同时新增头寸也会改变开仓均价。</td></tr><tr><td style="text-align: left">nonSettleAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">未结算均价<br>不受结算影响的加权开仓价格，仅在新增头寸时更新，和开仓均价的主要区别在于是否受到结算影响。<br>仅适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">当前持仓按标记价格计算的未实现盈亏，以该合约的结算货币（见 <code>ccy</code>）计价。公式：线性 = (标记价格 − 开仓均价) × 持仓量 × <code>ctVal</code>；反向 = (1/开仓均价 − 1/标记价格) × 持仓量 × <code>ctVal</code>。账户层面USD总计见 GET /api/v5/account/balance 中的 <code>upl</code>。</td></tr><tr><td style="text-align: left">uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率（以标记价格计算</td></tr><tr><td style="text-align: left">uplLastPx</td><td style="text-align: left">String</td><td style="text-align: left">以最新成交价格计算的未实现收益，主要做展示使用，实际值还是 upl</td></tr><tr><td style="text-align: left">uplRatioLastPx</td><td style="text-align: left">String</td><td style="text-align: left">以最新成交价格计算的未实现收益率</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，不适用于<code>期权</code>以及<code>组合保证金模式</code>下的全仓仓位</td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价格。这是基于当前权益和保证金率的估算值，实际强平价格可能因资金费率累计、其他仓位变动或市场剧烈波动而迅速变化。<br>不适用于 <code>OPTION</code></td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">最新标记价格</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">String</td><td style="text-align: left">该全仓持仓的初始保证金要求，以USD计价。公式：仓位数量 × 标记价格 × 初始保证金率（1/杠杆）。账户级别IMR请见 GET /api/v5/account/balance 中的 <code>imr</code>。逐仓持仓返回空字符串。仅适用于 <code>全仓</code>。</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金余额，可增减，仅适用于<code>逐仓</code></td></tr><tr><td style="text-align: left">mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金</td></tr><tr><td style="text-align: left">liab</td><td style="text-align: left">String</td><td style="text-align: left">负债额，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">liabCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">interest</td><td style="text-align: left">String</td><td style="text-align: left">利息，已经生成的未扣利息</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">optVal</td><td style="text-align: left">String</td><td style="text-align: left">期权市值，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">pendingCloseOrdLiabVal</td><td style="text-align: left">String</td><td style="text-align: left">逐仓杠杆负债对应平仓挂单的数量</td></tr><tr><td style="text-align: left">notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">以美金价值为单位的持仓数量</td></tr><tr><td style="text-align: left">adl</td><td style="text-align: left">String</td><td style="text-align: left">自动减仓（ADL）指标。范围：0–5，0 = ADL优先级最低（最不可能被强制减仓），5 = 优先级最高（保险基金耗尽时最先被减仓）。优先级随未实现盈利增大和杠杆倍数增加而升高。<br>仅适用于 <code>FUTURES/SWAP/OPTION</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金的币种</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">idxPx</td><td style="text-align: left">String</td><td style="text-align: left">最新指数价格</td></tr><tr><td style="text-align: left">usdPx</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种的市场最新美金价格 仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">bePx</td><td style="text-align: left">String</td><td style="text-align: left">盈亏平衡价</td></tr><tr><td style="text-align: left">deltaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位delta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">deltaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位delta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">gammaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位gamma，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">gammaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位gamma，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">thetaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位theta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">thetaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位theta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">vegaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位vega，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">vegaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位vega，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">spotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">spotInUseCcy</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用币种，如 <code>BTC</code><br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">clSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">maxSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">系统计算得到的最大可能现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益<br>仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code><br><code>realizedPnl</code>=<code>pnl</code>+<code>fee</code>+<code>fundingFee</code>+<code>liqPenalty</code>+<code>settledPnl</code></td></tr><tr><td style="text-align: left">settledPnl</td><td style="text-align: left">String</td><td style="text-align: left">已结算收益<br>仅适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">平仓订单累计收益额(不包括手续费)</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">自当前仓位开仓起累计手续费，仓位完全平仓后重置为0。逐笔手续费详情请使用 GET /api/v5/trade/fills。累计手续费金额，正数代表平台返佣 ，负数代表平台扣除</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用</td></tr><tr><td style="text-align: left">liqPenalty</td><td style="text-align: left">String</td><td style="text-align: left">累计爆仓罚金，有值时为负数。</td></tr><tr><td style="text-align: left">closeOrderAlgo</td><td style="text-align: left">Array of objects</td><td style="text-align: left">平仓策略委托订单。调用策略委托下单，且<code>closeFraction</code>=1 时，该数组才会有值。</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">持仓创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">最近一次持仓更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">bizRefId</td><td style="text-align: left">String</td><td style="text-align: left">外部业务id，如 体验券id</td></tr><tr><td style="text-align: left">bizRefType</td><td style="text-align: left">String</td><td style="text-align: left">外部业务类型</td></tr></tbody></table>

::: tip
PM账户下，持仓的 IMR MMR的数据是后端服务以ristUnit为最小粒度重新计算，相同riskUnit全仓仓位的imr和mmr返回值相同。
:::

### 查看历史持仓信息

获取最近3个月有更新的仓位信息，按照仓位更新时间倒序排列。于**2024年11月11日中午12:00（UTC+8）**开始支持组合保证金账户模式下的历史持仓。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/positions-history`

> 请求示例

```
GET /api/v5/account/positions-history
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看历史持仓信息
result = accountAPI.get_positions_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易产品ID，如：<code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓，<code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">最近一次平仓的类型<br><code>1</code>：部分平仓;<code>2</code>：完全平仓;<code>3</code>：强平;<code>4</code>：强减; <code>5</code>：ADL自动减仓 - 仓位未完全平仓; <code>6</code>：ADL自动减仓 - 仓位完全平仓<br>状态叠加时，以最新的平仓类型为准状态为准。</td></tr><tr><td style="text-align: left">posId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓ID。存在有效期的属性，自最近一次完全平仓算起，满30天 posId 会失效，之后的仓位，会使用新的 posId。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询仓位更新 (uTime) 之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询仓位更新 (uTime) 之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回结果的数量，最大为100，默认100条，uTime 相同的记录均会在当前请求中全部返回</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "cTime": "1654177169995",
            "ccy": "BTC",
            "closeAvgPx": "29786.5999999789081085",
            "closeTotalPos": "1",
            "instId": "BTC-USD-SWAP",
            "instType": "SWAP",
            "lever": "10.0",
            "mgnMode": "cross",
            "openAvgPx": "29783.8999999995535393",
            "openMaxPos": "1",
            "realizedPnl": "0.001",
            "fee": "-0.0001",
            "fundingFee": "0",
            "liqPenalty": "0",
            "pnl": "0.0011",
            "pnlRatio": "0.000906447858888",
            "posId": "452587086133239818",
            "posSide": "long",
            "direction": "long",
            "triggerPx": "",
            "type": "1",
            "uTime": "1654177174419",
            "uly": "BTC-USD",
            "nonSettleAvgPx":"",
            "settledPnl":""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品ID</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">最近一次平仓的类型<br><code>1</code>：部分平仓<br><code>2</code>：完全平仓<br><code>3</code>：强平<br><code>4</code>：强减<br><code>5</code>：ADL自动减仓<br>状态叠加时，以最新的平仓类型为准状态为准。</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">仓位创建时间</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">仓位更新时间</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价<br>会随结算周期变化，特别是在交割合约全仓模式下，结算时开仓均价会更新为结算价格，同时新增头寸也会改变开仓均价。</td></tr><tr><td style="text-align: left">nonSettleAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">未结算均价<br>不受结算影响的加权开仓价格，仅在新增头寸时更新，和开仓均价的主要区别在于是否受到结算影响。<br>仅适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">closeAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">平仓均价</td></tr><tr><td style="text-align: left">posId</td><td style="text-align: left">String</td><td style="text-align: left">仓位ID</td></tr><tr><td style="text-align: left">openMaxPos</td><td style="text-align: left">String</td><td style="text-align: left">最大持仓量</td></tr><tr><td style="text-align: left">closeTotalPos</td><td style="text-align: left">String</td><td style="text-align: left">累计平仓量</td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益<br>仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code><br><code>realizedPnl</code>=<code>pnl</code>+<code>fee</code>+<code>fundingFee</code>+<code>liqPenalty</code>+<code>settledPnl</code></td></tr><tr><td style="text-align: left">settledPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益<br>仅适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益率</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额<br>正数代表平台返佣，负数代表平台扣除。</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用</td></tr><tr><td style="text-align: left">liqPenalty</td><td style="text-align: left">String</td><td style="text-align: left">累计爆仓罚金，有值时为负数。</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益(不包括手续费)</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓模式方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：多<br><code>short</code>：空<br>仅适用于 <code>杠杆</code>/<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发标记价格<br><code>type</code> 为<code>3</code>,<code>4</code>,<code>5</code>时有值；为<code>1</code>, <code>2</code> 时为空</td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金的币种</td></tr></tbody></table>

### 查看账户持仓风险

查看账户整体风险。

::: tip
获取同一时间切片上的账户和持仓的基础信息
:::

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/account-position-risk`

> 请求示例

```
GET /api/v5/account/account-position-risk
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户特定风险状态
result = accountAPI.get_account_position_risk()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "data":[
        {
            "adjEq":"174238.6793649711331679",
            "balData":[
                {
                    "ccy":"BTC",
                    "disEq":"78846.7803721021362242",
                    "eq":"1.3863533369419636"
                },
                {
                    "ccy":"USDT",
                    "disEq":"73417.2495112863300127",
                    "eq":"73323.395564963177146"
                }
            ],
            "posData":[
                {
                    "baseBal": "0.4",
                    "ccy": "",
                    "instId": "BTC-USDT",
                    "instType": "MARGIN",
                    "mgnMode": "isolated",
                    "notionalCcy": "0",
                    "notionalUsd": "0",
                    "pos": "0",
                    "posCcy": "",
                    "posId": "310388685292318723",
                    "posSide": "net",
                    "quoteBal": "0"
                }
            ],
            "ts":"1620282889345"
        }
    ],
    "msg":""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>获取账户信息数据的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>adjEq</td><td>String</td><td>美金层面有效保证金<br>适用于<code>跨币种保证金模式</code> 和<code>组合保证金模式</code></td></tr><tr><td>balData</td><td>Array of objects</td><td>币种资产信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt; eq</td><td>String</td><td>币种总权益</td></tr><tr><td>&gt; disEq</td><td>String</td><td>美金层面币种折算权益</td></tr><tr><td>posData</td><td>Array of objects</td><td>持仓详细信息</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; mgnMode</td><td>String</td><td>保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td>&gt; posId</td><td>String</td><td>持仓ID</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td>&gt; pos</td><td>String</td><td>以<code>张</code>为单位的持仓数量，逐仓自主划转模式下，转入保证金后会产生pos为<code>0</code>的仓位</td></tr><tr><td>&gt; baseBal</td><td>String</td><td><del>交易币余额，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td>&gt; quoteBal</td><td>String</td><td><del>计价币余额 ，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td>&gt; posSide</td><td>String</td><td>持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式（<code>交割</code>/<code>永续</code>/<code>期权</code>：<code>pos</code>为正代表开多，<code>pos</code>为负代表开空。<code>币币杠杆</code>：<code>posCcy</code>为交易货币时，代表开多；<code>posCcy</code>为计价货币时，代表开空。）</td></tr><tr><td>&gt; posCcy</td><td>String</td><td>仓位资产币种，仅适用于<code>币币杠杆</code>仓位</td></tr><tr><td>&gt; ccy</td><td>String</td><td>占用保证金的币种</td></tr><tr><td>&gt; notionalCcy</td><td>String</td><td>以<code>币</code>为单位的持仓数量</td></tr><tr><td>&gt; notionalUsd</td><td>String</td><td>以<code>美金价值</code>为单位的持仓数量</td></tr></tbody></table>

### 账单流水查询（近七天）

帐户资产流水是指导致帐户余额增加或减少的行为。本接口可以查询最近7天的账单数据。

#### 限速：5次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/bills`

> 请求示例

```
GET /api/v5/account/bills

GET /api/v5/account/bills?instType=MARGIN
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘：0 , 模拟盘：1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户账单详情 （近七日内）
result = accountAPI.get_account_bills()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单币种</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">仓位类型<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr><tr><td style="text-align: left">ctType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">合约类型<br><code>linear</code>：正向合约<br><code>inverse</code>：反向合约<br>仅<code>交割/永续</code>有效</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单子类型<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 1597027383085</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "bal":  "8694.2179403378290202",
        "balChg":  "0.0219338232210000",
        "billId":  "623950854533513219",
        "ccy":  "USDT",
        "clOrdId":  "",
        "earnAmt": "",
        "earnApr": "",
        "execType":  "T",
        "fee":  "-0.000021955779",
        "fillFwdPx":  "",
        "fillIdxPx":  "27104.1",
        "fillMarkPx":  "",
        "fillMarkVol":  "",
        "fillPxUsd":  "",
        "fillPxVol":  "",
        "fillTime":  "1695033476166",
        "from":  "",
        "instId":  "BTC-USDT",
        "instType":  "SPOT",
        "interest":  "0",
        "mgnMode":  "isolated",
        "notes":  "",
        "ordId":  "623950854525124608",
        "pnl":  "0",
        "posBal":  "0",
        "posBalChg":  "0",
        "px":  "27105.9",
        "subType":  "1",
        "sz":  "0.021955779",
        "tag":  "",
        "to":  "",
        "tradeId":  "586760148",
        "ts":  "1695033476167",
        "type":  "2"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">账单子类型</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">余额更新完成的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">balChg</td><td style="text-align: left">String</td><td style="text-align: left">本次事件导致的账户余额变动量，以 <code>ccy</code> 字段指定的货币计价。正值表示余额增加（如收到资金费返佣、平仓盈利）；负值表示余额减少（如支付手续费、结算亏损）。</td></tr><tr><td style="text-align: left">posBalChg</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额变动数量</td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额数量</td></tr><tr><td style="text-align: left">posBal</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额数量</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">数量<br>对于交割、永续以及期权，为成交或者持仓的数量，单位为张，总为正数。<br>其他情况下，单位为账户余额币种（<code>ccy</code>）。</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">价格，与 subType 相关<br><li>为成交价格时有</li><code>1</code>：买入 <code>2</code>：卖出 <code>3</code>：开多 <code>4</code>：开空 <code>5</code>：平多 <code>6</code>：平空 <code>204</code>：大宗交易买 <code>205</code>：大宗交易卖 <code>206</code>：大宗交易开多 <code>207</code>：大宗交易开空 <code>208</code>：大宗交易平多 <code>209</code>：大宗交易平空 <code>114</code>：自动换币买入 <code>115</code>：自动换币卖出<br><li>为强平价格时有</li><code>100</code>：强减平多 <code>101</code>：强减平空 <code>102</code>：强减买入 <code>103</code>：强减卖出 <code>104</code>：强平平多 <code>105</code>：强平平空 <code>106</code>：强平买入 <code>107</code>：强平卖出 <code>16</code>：强制还币 <code>17</code>：强制借币还息 <code>110</code>：强平换币转入 <code>111</code>：强平换币转出<br><li>为交割价格时有</li><code>112</code>：交割平多 <code>113</code>：交割平空<br><li>为行权价格时有</li><code>170</code>：到期行权 <code>171</code>：到期被行权 <code>172</code>：到期作废<br><li>为标记价格时有</li><code>173</code>：资金费支出 <code>174</code>：资金费收入</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">账户余额币种</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费<br>正数代表平台返佣 ，负数代表平台扣除<br><a href="/cn/fees">手续费规则</a></td></tr><tr><td style="text-align: left">earnAmt</td><td style="text-align: left">String</td><td style="text-align: left">自动赚币数量<br>仅适用于type 381</td></tr><tr><td style="text-align: left">earnApr</td><td style="text-align: left">String</td><td style="text-align: left">自动赚币实际年利率<br>仅适用于type 381</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓<br><code>cash</code>：非保证金<br>如果账单不是由交易产生的，该字段返回 ""</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID<br>当type为<code>2</code>/<code>5</code>/<code>9</code>时，返回相应订单id<br>无订单时，该字段返回 ""</td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">String</td><td style="text-align: left">流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">转出账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户<br>仅适用于<code>资金划转</code>，不是<code>资金划转</code>时，返回 ""</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">转入账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户<br>仅适用于<code>资金划转</code>，不是<code>资金划转</code>时，返回 ""</td></tr><tr><td style="text-align: left">notes</td><td style="text-align: left">String</td><td style="text-align: left">备注</td></tr><tr><td style="text-align: left">interest</td><td style="text-align: left">String</td><td style="text-align: left">利息</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格 d<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 例如 LTC-ETH，该字段返回 LTC-USDT 的指数价格。</td></tr><tr><td style="text-align: left">fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于期权，其他业务线返回空字符串""</td></tr></tbody></table>

::: tip
**资金费支出(subType = 173)**  
可以用"pnl"查询资金费的支出总额
:::

### 账单流水查询（近三个月）

帐户资产流水是指导致帐户余额增加或减少的行为。本接口可以查询最近 3 个月的账单数据。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/bills-archive`

> 请求示例

```
GET /api/v5/account/bills-archive

GET /api/v5/account/bills-archive?instType=MARGIN
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户账单详情 （近三个月内）
result = accountAPI.get_account_bills_archive()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单币种</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">仓位类型<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr><tr><td style="text-align: left">ctType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">合约类型<br><code>linear</code>：正向合约<br><code>inverse</code>：反向合约<br>仅<code>交割/永续</code>有效</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单子类型<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "bal": "8694.2179403378290202",
        "balChg": "0.0219338232210000",
        "billId": "623950854533513219",
        "ccy": "USDT",
        "clOrdId": "",
        "earnAmt": "",
        "earnApr": "",
        "execType": "T",
        "fee": "-0.000021955779",
        "fillFwdPx": "",
        "fillIdxPx": "27104.1",
        "fillMarkPx": "",
        "fillMarkVol": "",
        "fillPxUsd": "",
        "fillPxVol": "",
        "fillTime": "1695033476166",
        "from": "",
        "instId": "BTC-USDT",
        "instType": "SPOT",
        "interest": "0",
        "mgnMode": "isolated",
        "notes": "",
        "ordId": "623950854525124608",
        "pnl": "0",
        "posBal": "0",
        "posBalChg": "0",
        "px": "27105.9",
        "subType": "1",
        "sz": "0.021955779",
        "tag": "",
        "to": "",
        "tradeId": "586760148",
        "ts": "1695033476167",
        "type": "2"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">账单子类型</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">余额更新完成的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">balChg</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额变动数量</td></tr><tr><td style="text-align: left">posBalChg</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额变动数量</td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额数量</td></tr><tr><td style="text-align: left">posBal</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额数量</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">数量<br>对于交割、永续以及期权，为成交或者持仓的数量，单位为张，总为正数。<br>其他情况下，单位为账户余额币种（<code>ccy</code>）。</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">价格，与 subType 相关<br><li>为成交价格时有</li><code>1</code>：买入<br><code>2</code>：卖出<br><code>3</code>：开多<br><code>4</code>：开空<br><code>5</code>：平多<br><code>6</code>：平空<br><code>204</code>：大宗交易买<br><code>205</code>：大宗交易卖<br><code>206</code>：大宗交易开多<br><code>207</code>：大宗交易开空<br><code>208</code>：大宗交易平多<br><code>209</code>：大宗交易平空<br><code>114</code>：自动换币买入<br><code>115</code>：自动换币卖出<br><li>为强平价格时有</li><code>100</code>：强减平多 <code>101</code>：强减平空 <code>102</code>：强减买入 <code>103</code>：强减卖出 <code>104</code>：强平平多 <code>105</code>：强平平空 <code>106</code>：强平买入 <code>107</code>：强平卖出 <code>16</code>：强制还币 <code>17</code>：强制借币还息 <code>110</code>：强平换币转入 <code>111</code>：强平换币转出<br><li>为交割价格时有</li><code>112</code>：交割平多 <code>113</code>：交割平空<br><li>为行权价格时有</li><code>170</code>：到期行权 <code>171</code>：到期被行权 <code>172</code>：到期作废<br><li>为标记价格时有</li><code>173</code>：资金费支出 <code>174</code>：资金费收入</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">账户余额币种</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费<br>正数代表平台返佣 ，负数代表平台扣除<br><a href="/cn/fees">手续费规则</a></td></tr><tr><td style="text-align: left">earnAmt</td><td style="text-align: left">String</td><td style="text-align: left">自动赚币数量<br>仅适用于type 381</td></tr><tr><td style="text-align: left">earnApr</td><td style="text-align: left">String</td><td style="text-align: left">自动赚币实际年利率<br>仅适用于type 381</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓<br><code>cash</code>：非保证金<br>如果账单不是由交易产生的，该字段返回 ""</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID<br>当type为<code>2</code>/<code>5</code>/<code>9</code>时，返回相应订单id<br>无订单时，该字段返回 ""</td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">String</td><td style="text-align: left">流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">转出账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户<br>仅适用于<code>资金划转</code>，不是<code>资金划转</code>时，返回 ""</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">转入账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户<br>仅适用于<code>资金划转</code>，不是<code>资金划转</code>时，返回 ""</td></tr><tr><td style="text-align: left">notes</td><td style="text-align: left">String</td><td style="text-align: left">备注</td></tr><tr><td style="text-align: left">interest</td><td style="text-align: left">String</td><td style="text-align: left">利息</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 例 LTC-ETH，该字段返回 LTC-USDT 的指数价格。</td></tr><tr><td style="text-align: left">fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr></tbody></table>

::: tip
**资金费支出(subType = 173)**  
可以用"pnl"查询资金费的支出总额
:::

### 申请账单流水（自 2021 年）

申请自 2021 年 2 月 1 日以来的账单数据，不包括当前季度。

#### 限速：1次/10s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/account/bills-history-archive`

> 请求示例

```
POST /api/v5/account/bills-history-archive
body
{
    "year":"2023",
    "quarter":"Q1"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">year</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">4位数字的年份，如 <code>2023</code></td></tr><tr><td style="text-align: left">quarter</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">季度，有效值 <code>Q1</code> <code>Q2</code> <code>Q3</code> <code>Q4</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型，支持多个，用英文逗号分隔，如 <code>1,2,3</code>；不填则返回所有类型。<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "result": "true",
            "ts": "1646892328000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">String</td><td style="text-align: left">是否已经存在该区间的下载链接<br><code>true</code>：已存在，可以通过"获取账单流水（自 2021 年）"接口获取<br><code>false</code>：不存在，正在生成，请 2 个小时后查看下载链接</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">服务端首次收到请求的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
规则说明，仅适用于 2024 年 10 月 11 日之后新生成的文件： 1. 以查询 2024 年第 3 季度的数据为例，实际查询的起止日期范围是 \[2024-07-01, 2024-10-01)，包含开始日期，不包含结束日期。  
2\. 文件中的数据以 \`billId\` 倒序排列
:::

::: tip
平台需求量较多的情况下，生成数据所需要的时间会有所延长，如果超过 3 小时，请联系客服进行反馈。
:::

::: tip
仅适用于来自统一账户的数据
:::

### 获取账单流水（自 2021 年）

获取自 2021 年 2 月 1 日以来的账单数据

#### 限速：10 次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/account/bills-history-archive`

> 请求示例

```
GET /api/v5/account/bills-history-archive?year=2023&quarter=Q4
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">year</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">4位数字的年份，如 <code>2023</code></td></tr><tr><td style="text-align: left">quarter</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">季度，有效值 <code>Q1</code> <code>Q2</code> <code>Q3</code> <code>Q4</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型，支持多个，用英文逗号分隔，如 <code>1,2,3</code>；不填则返回所有类型。<br>枚举值请通过 <a href="zh.html#trading-account-rest-api-get-bill-types">获取账单类型</a> 接口查询。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fileHref": "http://xxx",
            "state": "finished",
            "ts": "1646892328000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fileHref</td><td style="text-align: left">String</td><td style="text-align: left">文件链接。<br>每个链接的有效期为 5 个半小时，如果已经申请过同一季度的数据，则30天内无需再次申请。</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">服务端首次收到请求的时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">下载链接状态<br><code>finished</code>：已生成<br><code>ongoing</code>：进行中<br><code>failed</code>：生成失败，请重新生成</td></tr></tbody></table>

#### 解压后CSV里的字段说明

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单ID</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">账单子类型</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">余额更新完成的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">balChg</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额变动数量</td></tr><tr><td style="text-align: left">posBalChg</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额变动数量</td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额数量</td></tr><tr><td style="text-align: left">posBal</td><td style="text-align: left">String</td><td style="text-align: left">仓位层面的余额数量</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">数量</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">价格，与 subType 相关<br><li>为成交价格时有</li><code>1</code>：买入<br><code>2</code>：卖出<br><code>3</code>：开多<br><code>4</code>：开空<br><code>5</code>：平多<br><code>6</code>：平空<br><code>204</code>：大宗交易买<br><code>205</code>：大宗交易卖<br><code>206</code>：大宗交易开多<br><code>207</code>：大宗交易开空<br><code>208</code>：大宗交易平多<br><code>209</code>：大宗交易平空<br><code>114</code>：自动换币买入<br><code>115</code>：自动换币卖出<br><li>为强平价格时有</li><code>100</code>：强减平多 <code>101</code>：强减平空 <code>102</code>：强减买入 <code>103</code>：强减卖出 <code>104</code>：强平平多 <code>105</code>：强平平空 <code>106</code>：强平买入 <code>107</code>：强平卖出 <code>16</code>：强制还币 <code>17</code>：强制借币还息 <code>110</code>：强平换币转入 <code>111</code>：强平换币转出<br><li>为交割价格时有</li><code>112</code>：交割平多 <code>113</code>：交割平空<br><li>为行权价格时有</li><code>170</code>：到期行权 <code>171</code>：到期被行权 <code>172</code>：到期作废<br><li>为标记价格时有</li><code>173</code>：资金费支出 <code>174</code>：资金费收入</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">账户余额币种</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费<br>正数代表平台返佣 ，负数代表平台扣除<br><a href="/cn/fees">手续费规则</a></td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓<br><code>cash</code>：非保证金<br>如果账单不是由交易产生的，该字段返回 ""</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID<br>无订单时，该字段返回 ""</td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">String</td><td style="text-align: left">流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td style="text-align: left">interest</td><td style="text-align: left">String</td><td style="text-align: left">利息</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 例 LTC-ETH，该字段返回 LTC-USDT 的指数价格。</td></tr><tr><td style="text-align: left">fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于 <code>期权</code>，其他业务线返回空字符串""</td></tr></tbody></table>

### 获取账单类型

获取所有账单类型，以及账单类型（type）与子类型（subType）的映射关系。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/subtypes`

> 请求示例

```
GET /api/v5/account/subtypes
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型，支持多个，用英文逗号分隔，如 <code>1,2,3</code>；不填则返回所有类型。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "type": "1",
            "typeDesc": "Transfer",
            "subTypeDetails": [
                {
                    "subType": "11",
                    "subTypeDesc": "Transfer in"
                },
                {
                    "subType": "12",
                    "subTypeDesc": "Transfer out"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">typeDesc</td><td style="text-align: left">String</td><td style="text-align: left">账单类型描述，为 "" 代表该类型还未启用</td></tr><tr><td style="text-align: left">subTypeDetails</td><td style="text-align: left">Array of objects</td><td style="text-align: left">子类型详情列表</td></tr><tr><td style="text-align: left">&gt; subType</td><td style="text-align: left">String</td><td style="text-align: left">子类型</td></tr><tr><td style="text-align: left">&gt; subTypeDesc</td><td style="text-align: left">String</td><td style="text-align: left">子类型描述，为 "" 代表该类型还未启用</td></tr></tbody></table>

### 查看账户配置

查看当前账户的配置信息。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/config`

> 请求示例

```
GET /api/v5/account/config
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户配置
result = accountAPI.get_account_config()
print(result)
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "acctLv": "2",
            "acctStpMode": "cancel_maker",
            "autoLoan": false,
            "ctIsoMode": "automatic",
            "enableSpotBorrow": false,
            "greeksType": "PA",
            "feeType": "0",
            "ip": "",
            "type": "0",
            "kycLv": "3",
            "label": "v5 test",
            "level": "Lv1",
            "levelTmp": "",
            "liquidationGear": "-1",
            "mainUid": "44705892343619584",
            "mgnIsoMode": "automatic",
            "opAuth": "1",
            "perm": "read_only,withdraw,trade",
            "posMode": "long_short_mode",
            "roleType": "0",
            "spotBorrowAutoRepay": false,
            "spotOffsetType": "",
            "spotRoleType": "0",
            "spotTraderInsts": [],
            "stgyType": "0",
            "traderInsts": [],
            "uid": "44705892343619584",
            "settleCcy": "USDC",
            "settleCcyList": ["USD", "USDC", "USDG"]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">当前请求的账户ID，账户uid和app上的一致</td></tr><tr><td style="text-align: left">mainUid</td><td style="text-align: left">String</td><td style="text-align: left">当前请求的母账户ID<br>如果 uid = mainUid，代表当前账号为母账户；如果 uid != mainUid，代表当前账户为子账户。</td></tr><tr><td style="text-align: left">acctLv</td><td style="text-align: left">String</td><td style="text-align: left">账户模式<br><code>1</code>：现货模式<br><code>2</code>：合约模式<br><code>3</code>：跨币种保证金模式<br><code>4</code>：组合保证金模式</td></tr><tr><td style="text-align: left">acctStpMode</td><td style="text-align: left">String</td><td style="text-align: left">账户自成交保护模式<br><code>cancel_maker</code>：撤销挂单<br><code>cancel_taker</code>：撤销吃单<br><code>cancel_both</code>：撤销挂单和吃单<br>默认为<code>cancel_maker</code>，用户可通过母账户登录网页修改该配置</td></tr><tr><td style="text-align: left">posMode</td><td style="text-align: left">String</td><td style="text-align: left">持仓方式<br><code>long_short_mode</code>：开平仓模式<br><code>net_mode</code>：买卖模式<br>仅适用<code>交割/永续</code></td></tr><tr><td style="text-align: left">autoLoan</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否自动借币<br><code>true</code>：自动借币 <code>false</code>：非自动借币</td></tr><tr><td style="text-align: left">greeksType</td><td style="text-align: left">String</td><td style="text-align: left">当前希腊字母展示方式<br><code>PA</code>：币本位 <code>BS</code>：美元本位</td></tr><tr><td style="text-align: left">feeType</td><td style="text-align: left">String</td><td style="text-align: left">手续费类型<br><code>0</code>：手续费以获取币种收取<br><code>1</code>：手续费以计价币种收取</td></tr><tr><td style="text-align: left">level</td><td style="text-align: left">String</td><td style="text-align: left">当前在平台上真实交易量的用户等级，如 <code>Lv1</code>，代表普通用户等级。</td></tr><tr><td style="text-align: left">levelTmp</td><td style="text-align: left">String</td><td style="text-align: left">特约用户的临时体验用户等级，如 <code>Lv1</code></td></tr><tr><td style="text-align: left">ctIsoMode</td><td style="text-align: left">String</td><td style="text-align: left">衍生品的逐仓保证金划转模式<br><code>automatic</code>：开仓划转<br><code>autonomy</code>：自主划转</td></tr><tr><td style="text-align: left">mgnIsoMode</td><td style="text-align: left">String</td><td style="text-align: left">币币杠杆的逐仓保证金划转模式<br><code>automatic</code>：开仓划转<br><code>autonomy</code>：自主划转</td></tr><tr><td style="text-align: left">spotOffsetType</td><td style="text-align: left">String</td><td style="text-align: left"><del>现货对冲类型<br><code>1</code>：现货对冲模式U模式<br><code>2</code>：现货对冲模式币模式<br><code>3</code>：非现货对冲模式<br>适用于<code>组合保证金模式</code></del><br>已废弃</td></tr><tr><td style="text-align: left">stgyType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>0</code>：普通策略模式<br><code>1</code>：delta 中性策略模式</td></tr><tr><td style="text-align: left">roleType</td><td style="text-align: left">String</td><td style="text-align: left">用户角色<br><code>0</code>：普通用户<br><code>1</code>：带单者<br><code>2</code>：跟单者</td></tr><tr><td style="text-align: left">traderInsts</td><td style="text-align: left">Array of strings</td><td style="text-align: left">当前账号已经设置的带单合约，仅适用于带单者</td></tr><tr><td style="text-align: left">spotRoleType</td><td style="text-align: left">String</td><td style="text-align: left">现货跟单角色。<br><code>0</code>：普通用户；<code>1</code>：带单者；<code>2</code>：跟单者</td></tr><tr><td style="text-align: left">spotTraderInsts</td><td style="text-align: left">Array of strings</td><td style="text-align: left">当前账号已经设置的带单币对，仅适用于带单者</td></tr><tr><td style="text-align: left">opAuth</td><td style="text-align: left">String</td><td style="text-align: left">是否开通期权交易<br><code>0</code>：未开通<br><code>1</code>：已经开通</td></tr><tr><td style="text-align: left">kycLv</td><td style="text-align: left">String</td><td style="text-align: left">母账户KYC等级<br><code>0</code>: 未认证<br><code>1</code>: 已完成 level 1 认证<br><code>2</code>: 已完成 level 2 认证<br><code>3</code>: 已完成 level 3认证<br>如果请求来自子账户, kycLv 为其母账户的等级<br>如果请求来自母账户, kycLv 为当前请求的母账户等级</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">当前请求API key的备注名，不超过50位字母（区分大小写）或数字，可以是纯字母或纯数字。</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">当前请求API key绑定的ip地址，多个ip用半角逗号隔开，如：<code>117.37.203.58,117.37.203.57</code>。<br>如果没有绑定ip，会返回空字符串""</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">当前请求的 API key 或 Access token 的权限<br><code>read_only</code>：读取<br><code>trade</code>：交易<br><code>withdraw</code>：提币</td></tr><tr><td style="text-align: left">liquidationGear</td><td style="text-align: left">String</td><td style="text-align: left">强平提醒的维持保证金率水平<br><code>3</code> 和 <code>-1</code> 代表维持保证金率达到 300% 时，每隔 1 小时 app 和 ”爆仓风险预警推送频道“会推送通知。<code>-1</code> 是初始值，与<code>-3</code>有着同样效果<br><code>0</code> 代表不提醒</td></tr><tr><td style="text-align: left">enableSpotBorrow</td><td style="text-align: left">Boolean</td><td style="text-align: left"><code>现货模式</code>下是否支持借币<br><code>true</code>：支持<br><code>false</code>：不支持</td></tr><tr><td style="text-align: left">spotBorrowAutoRepay</td><td style="text-align: left">Boolean</td><td style="text-align: left"><code>现货模式</code>下是否支持自动还币<br><code>true</code>：支持<br><code>false</code>：不支持</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账户类型<br><code>0</code>：母账户<br><code>1</code>：普通子账户<br><code>2</code>：资管子账户<br><code>5</code>：托管交易子账户 - Copper<br><code>9</code>：资管交易子账户 - Copper<br><code>12</code>：托管交易子账户 - Komainu</td></tr><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">当前账户的 USD 本位合约结算币种</td></tr><tr><td style="text-align: left">settleCcyList</td><td style="text-align: left">String</td><td style="text-align: left">当前账户的 USD 本位合约结算币种列表，如 ["USD", "USDC", "USDG"]。</td></tr></tbody></table>

### 设置持仓模式

`合约模式`和`跨币种保证金模式`：交割和永续合约支持开平仓模式和买卖模式。买卖模式只会有一个方向的仓位；开平仓模式可以分别持有多、空2个方向的仓位。  
`组合保证金模式`：交割和永续仅支持买卖模式

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-position-mode`

> 请求示例

```
POST /api/v5/account/set-position-mode
body 
{
    "posMode":"long_short_mode"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 设置持仓模式
result = accountAPI.set_position_mode(
    posMode="long_short_mode"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">posMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">持仓方式<br><code>long_short_mode</code>：开平仓模式 <code>net_mode</code>：买卖模式<br>仅适用<code>交割/永续</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "posMode": "long_short_mode"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">posMode</td><td style="text-align: left">String</td><td style="text-align: left">持仓方式</td></tr></tbody></table>

### 设置杠杆倍数

  
一个产品可以有如下10种杠杆倍数的设置场景：  
  

1.  在`逐仓`交易模式下，设置`币币杠杆`的杠杆倍数（币对层面）；  
    
2.  `现货模式`账户已开通借币功能，在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）；  
    
3.  `合约模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币对层面）；  
    
4.  `跨币种保证金模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）；  
    
5.  `组合保证金模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）；  
    
6.  在`全仓`交易模式下，设置`交割`的杠杆倍数（指数层面）；  
    
7.  在`逐仓`交易模式、`买卖`持仓模式下，设置`交割`的杠杆倍数（合约层面）；  
    
8.  在`逐仓`交易模式、`开平仓`持仓模式下，设置`交割`的杠杆倍数（合约与持仓方向层面）；  
    
9.  在`全仓`交易模式下，设置`永续`的杠杆倍数（合约层面）；  
    
10.  在`逐仓`交易模式、`买卖`持仓模式下，设置`永续`的杠杆倍数（合约层面）；  
     
11.  在`逐仓`交易模式、`开平仓`持仓模式下，设置`永续`的杠杆倍数（合约与持仓方向层面）；  
     

注意请求参数 posSide 仅在`交割/永续`的`开平仓`持仓模式下才需要填写（参见场景8和11）。  
请参阅右侧对应的每个案例的请求示例。  

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-leverage`

> 请求示例

```
# 1.在`逐仓`交易模式下，设置`币币杠杆`的杠杆倍数（币对层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT",
    "lever":"5",
    "mgnMode":"isolated"
}

# 2.`现货模式`账户已开通借币功能，在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）
POST /api/v5/account/set-leverage
body
{
    "ccy":"BTC",
    "lever":"5",
    "mgnMode":"cross"
}


# 3.`合约模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币对层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT",
    "lever":"5",
    "mgnMode":"cross"
}

# 4.`跨币种保证金模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）
POST /api/v5/account/set-leverage
body
{
    "ccy":"BTC",
    "lever":"5",
    "mgnMode":"cross"
}

# 5. `组合保证金模式`账户在`全仓`交易模式下，设置`币币杠杆`的杠杆倍数（币种层面）
POST /api/v5/account/set-leverage
body
{
    "ccy":"BTC",
    "lever":"5",
    "mgnMode":"cross"
}

# 6.在`全仓`交易模式下，设置`交割`的杠杆倍数（指数层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-200802",
    "lever":"5",
    "mgnMode":"cross"
}

# 7.在`逐仓`交易模式、`买卖`持仓模式下，设置`交割`的杠杆倍数（合约层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-200802",
    "lever":"5",
    "mgnMode":"isolated"
}

# 8.在`逐仓`交易模式、`开平仓`持仓模式下，设置`交割`的杠杆倍数（合约与头寸层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-200802",
    "lever":"5",
    "posSide":"long",
    "mgnMode":"isolated"
}

# 9.在`全仓`交易模式下，设置`永续`的杠杆倍数（合约层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-SWAP",
    "lever":"5",
    "mgnMode":"cross"
}

# 10.在`逐仓`交易模式、`买卖`持仓模式下，设置`永续`的杠杆倍数（合约层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-SWAP",
    "lever":"5",
    "mgnMode":"isolated"
}

# 11.在`逐仓`交易模式、`开平仓`持仓模式下，设置`永续`的杠杆倍数（合约与头寸层面）
POST /api/v5/account/set-leverage
body
{
    "instId":"BTC-USDT-SWAP",
    "lever":"5",
    "posSide":"long",
    "mgnMode":"isolated"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 在逐仓交易模式下，设置币币杠杆的杠杆倍数（币对层面）
result = accountAPI.set_leverage(
    instId="BTC-USDT",
    lever="5",
    mgnMode="isolated"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID：币对、合约<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>的<code>全仓</code><code>交割</code><code>永续</code>，<code>合约模式</code>的<code>全仓</code><code>币币杠杆</code><code>交割</code><code>永续</code> 以及<code>逐仓</code>。<br>且在适用场景下必填。</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，用于设置开启自动借币模式下币种维度的杠杆。<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>的<code>全仓</code><code>币币杠杆</code>。<br>且在适用场景下必填。</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓<br>如果<code>ccy</code>有效传值，该参数值只能为<code>cross</code>。</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br>仅适用于逐仓<code>交割</code>/<code>永续</code><br>在开平仓模式且保证金模式为逐仓条件下必填</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "lever": "30",
        "mgnMode": "isolated",
        "instId": "BTC-USDT-SWAP",
        "posSide": "long"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr></tbody></table>

::: tip
当希望在指数层面设置交割/永续的全仓杠杆倍数时，传入任意产品ID 和保证金模式（全仓）即可。
:::

::: tip
组合保证金账户下交割和永续的全仓不能调整杠杆倍数。
:::

### 获取最大可下单数量

获取最大可下单数量，可对应下单时的 "sz" 字段

::: tip
Portfolio Margin 账户下，衍生品的全仓模式不支持最大可买卖/开仓数量的计算。
:::

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/max-size`

> 请求示例

```
GET /api/v5/account/max-size?instId=BTC-USDT&tdMode=isolated
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取最大可买卖/开仓数量
result = accountAPI.get_max_order_size(
    instId="BTC-USDT",
    tdMode="isolated"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>支持同一业务线下的多产品ID查询（不超过5个），半角逗号分隔</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br><code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓，仅适用于<code>合约模式</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">委托价格<br>当不填委托价时，交割和永续会取当前限价计算，其他业务线会按当前最新成交价计算<br>当指定多个产品ID查询时，忽略该参数，当未填写处理</td></tr><tr><td style="text-align: left">leverage</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开仓杠杆倍数<br>默认为当前杠杆倍数<br>仅适用于<code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，选填，默认值为<code>yes</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ccy": "BTC",
        "instId": "BTC-USDT",
        "maxBuy": "0.0500695098559788",
        "maxSell": "64.4798671570072269"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">maxBuy</td><td style="text-align: left">String</td><td style="text-align: left"><code>币币/币币杠杆</code>：最大可买的交易币数量<br><code>合约模式</code>下的全仓杠杆订单，为交易币数量<br><code>交割</code>/<code>永续</code>/<code>期权</code>：最大可开多的合约张数</td></tr><tr><td style="text-align: left">maxSell</td><td style="text-align: left">String</td><td style="text-align: left"><code>币币/币币杠杆</code>：最大可卖的计价币数量<br><code>合约模式</code>下的全仓杠杆订单，为交易币数量<br><code>交割</code>/<code>永续</code>/<code>期权</code>：最大可开空的合约张数</td></tr></tbody></table>

### 获取最大可用余额/保证金

币币和逐仓时为可用余额，全仓时为可用保证金

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/max-avail-size`

> 请求示例

```
# 获取BTC-USDT全仓币币杠杆指定BTC作为保证金最大可用数量
GET /api/v5/account/max-avail-size?instId=BTC-USDT&tdMode=cross&ccy=BTC

# 获取BTC-USDT币币最大可用数量
GET /api/v5/account/max-avail-size?instId=BTC-USDT&tdMode=cash
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取BTC-USDT币币最大可用数量
result = accountAPI.get_max_avail_size(
    instId="BTC-USDT",
    tdMode="cash"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>支持多产品ID查询（不超过5个），半角逗号分隔</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br><code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓，仅适用于<code>合约模式</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code></td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否为只减仓模式，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">平仓价格，默认为市价。<br>仅适用于杠杆只减仓</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "instId": "BTC-USDT",
        "availBuy": "100",
        "availSell": "1"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">availBuy</td><td style="text-align: left">String</td><td style="text-align: left">最大买入可用余额/保证金</td></tr><tr><td style="text-align: left">availSell</td><td style="text-align: left">String</td><td style="text-align: left">最大卖出可用余额/保证金</td></tr></tbody></table>

::: tip
币币/币币杠杆时availBuy为计价货币，availSell为交易货币。  
全仓币币杠杆时，availBuy和availSell均为指定保证金的币种。
:::

### 调整保证金

增加或者减少逐仓保证金。减少保证金可能会导致实际杠杆倍数发生变化。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/position/margin-balance`

> 请求示例

```
POST /api/v5/account/position/margin-balance 
body
{
    "instId":"BTC-USDT-SWAP",
    "posSide":"short",
    "type":"add",
    "amt":"1"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 调整保证金
result = accountAPI.adjustment_margin(
    instId="BTC-USDT-SWAP",
    posSide="short",
    type= "add",
    amt="1"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">持仓方向，默认值是<code>net</code><br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">增加/减少保证金<br><code>add</code>：增加<br><code>reduce</code>：减少</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">增加或减少的保证金数量</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">增加或减少的保证金的币种，<br>适用于<code>逐仓杠杆</code>仓位</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "0.3",
            "ccy": "BTC",
            "instId": "BTC-USDT",
            "leverage": "",
            "posSide": "net",
            "type": "add"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">已增加/减少的保证金数量</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">增加/减少保证金</td></tr><tr><td style="text-align: left">leverage</td><td style="text-align: left">String</td><td style="text-align: left">调整保证金后的实际杠杆倍数</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">增加或减少的保证金的币种</td></tr></tbody></table>

::: tip
自主划转模式  
初始划入逐仓仓位的保证金价值必须大于等于1万USDT,账户上会产生一个仓位。
:::

### 获取杠杆倍数

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/leverage-info`

> 请求示例

```
GET /api/v5/account/leverage-info?instId=BTC-USDT-SWAP&mgnMode=cross
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取杠杆倍数
result = accountAPI.get_leverage(
    instId="BTC-USDT-SWAP",
    mgnMode="cross"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID<br>支持多个instId查询，半角逗号分隔。instId个数不超过20个。</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种，用于币种维度的杠杆。<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>的全仓币币杠杆。<br>支持多ccy查询，半角逗号分隔。ccy个数不超过20个。</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ccy":"",
        "instId": "BTC-USDT-SWAP",
        "mgnMode": "cross",
        "posSide": "long",
        "lever": "10"
    },{
        "ccy":"",
        "instId": "BTC-USDT-SWAP",
        "mgnMode": "cross",
        "posSide": "short",
        "lever": "10"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，用于币种维度的杠杆。<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>的全仓币币杠杆。</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式<br>开平仓模式下会返回两个方向的杠杆倍数</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr></tbody></table>

::: tip
组合保证金账户下交割和永续的全仓不能获取杠杆倍数。
:::

### 获取杠杆倍数预估信息

获取指定杠杆倍数下，相关的预估信息。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/adjust-leverage-info`

> 请求示例

```
GET /api/v5/account/adjust-leverage-info?instType=MARGIN&mgnMode=isolated&lever=3&instId=BTC-USDT
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>必填的场景有：交割永续，逐仓杠杆，以及<code>合约模式</code>下全仓杠杆。</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，如 <code>BTC</code><br>逐仓杠杆及<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>的全仓杠杆时必填。</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓方向<br><code>net</code>: 默认值，代表买卖模式<br><code>long</code>: 开平模式下的多仓<br><code>short</code>：开平模式下的空仓<br>适用于<code>交割</code>/<code>永续</code>。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "estAvailQuoteTrans": "",
            "estAvailTrans": "1.1398040558348279",
            "estLiqPx": "",
            "estMaxAmt": "10.6095865868904898",
            "estMgn": "0.0701959441651721",
            "estQuoteMaxAmt": "176889.6871254563042714",
            "estQuoteMgn": "",
            "existOrd": false,
            "maxLever": "10",
            "minLever": "0.01"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">estAvailQuoteTrans</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下，计价货币预估可转出的保证金数量<br>全仓时，为交易账户最大可转出<br>逐仓时，为逐仓仓位可减少的保证金。<br>仅适用于<code>杠杆</code></td></tr><tr><td style="text-align: left">estAvailTrans</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下，预估可转出的保证金数量<br>全仓时，为交易账户最大可转出<br>逐仓时，为逐仓仓位可减少的保证金<br>对于<code>杠杆</code>，单位为交易货币<br>不适用于<code>交割</code>, <code>永续</code>的逐仓，调大杠杆的场景</td></tr><tr><td style="text-align: left">estLiqPx</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下的预估强平价，仅在有仓位时有值</td></tr><tr><td style="text-align: left">estMgn</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下，仓位预估所需的保证金数量<br>对于杠杆仓位，为所需交易货币保证金<br>对于交割或永续仓位，为仓位所需保证金</td></tr><tr><td style="text-align: left">estQuoteMgn</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下，仓位预估所需的计价货币保证金数量</td></tr><tr><td style="text-align: left">estMaxAmt</td><td style="text-align: left">String</td><td style="text-align: left">对于杠杆，为对应杠杆倍数下，交易货币预估最大可借<br>对于交割和永续，为对应杠杆倍数下，预估的最大可开张数</td></tr><tr><td style="text-align: left">estQuoteMaxAmt</td><td style="text-align: left">String</td><td style="text-align: left">对应杠杆倍数下，杠杆计价货币预估最大可借</td></tr><tr><td style="text-align: left">existOrd</td><td style="text-align: left">Boolean</td><td style="text-align: left">当前是否存在挂单<br><code>true</code>：存在挂单<br><code>false</code>：不存在挂单</td></tr><tr><td style="text-align: left">maxLever</td><td style="text-align: left">String</td><td style="text-align: left">最大杠杆倍数</td></tr><tr><td style="text-align: left">minLever</td><td style="text-align: left">String</td><td style="text-align: left">最小杠杆倍数</td></tr></tbody></table>

### 获取交易产品最大可借

#### 限速：20 次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/account/max-loan`

> 请求示例

```
# 现货模式用户已经开通了借币情况下币对币种最大可借
GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=cross

# 现货模式用户已经开通了借币情况下币种最大可借
GET  /api/v5/account/max-loan?ccy=USDT&mgnMode=cross

# 合约模式逐仓账户获取币币杠杆最大可借
GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=isolated

# 合约模式全仓账户获取币币杠杆最大可借（指定保证金为BTC）
GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=cross&mgnCcy=BTC

# 跨币种全仓账户获取币币杠杠最大可借
GET  /api/v5/account/max-loan?instId=BTC-USDT&mgnMode=cross
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 合约模式全仓账户获取币币杠杆最大可借（指定保证金为BTC）
result = accountAPI.get_max_loan(
    instId="BTC-USDT",
    mgnMode="cross",
    mgnCcy="BTC"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">仓位类型<br><code>isolated</code>：逐仓<br><code>cross</code>：全仓</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品 ID，如 <code>BTC-USDT</code><br>支持多产品ID查询（不超过5个），半角逗号分隔</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种<br>仅适用于<code>现货模式</code>下手动借币币种最大可借</td></tr><tr><td style="text-align: left">mgnCcy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，如 <code>BTC</code><br>适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "instId": "BTC-USDT",
      "mgnMode": "isolated",
      "mgnCcy": "",
      "maxLoan": "0.1",
      "ccy": "BTC",
      "side": "sell"
    },
    {
      "instId": "BTC-USDT",
      "mgnMode": "isolated",
      "mgnCcy": "",
      "maxLoan": "0.2",
      "ccy": "USDT",
      "side": "buy"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">仓位类型</td></tr><tr><td style="text-align: left">mgnCcy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">maxLoan</td><td style="text-align: left">String</td><td style="text-align: left">最大可借</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr></tbody></table>

### 获取当前账户交易手续费费率

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/trade-fee`

> 请求示例

```
# 获取币币BTC-USDT交易手续费率  
GET /api/v5/account/trade-fee?instType=SPOT&instId=BTC-USDT
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取当前账户交易手续费费率
result = accountAPI.get_fee_rates(
    instType="SPOT",
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>仅适用于instType为<code>币币/币币杠杆</code><br>指定此参数将返回正确的适用手续费率（如：参与做市激励计划用户的做市商费率）。</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code></td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易产品手续费分组ID<br>groupId 和 instId/instFamily 只能传入其一<br><br>用户可以使用交易产品基础信息接口获取产品ID及其手续费分组ID的对应关系</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "category": "1",
            "delivery": "",
            "exercise": "",
            "feeGroup": [
                {
                    "elpMaker": "-0.0008",
                    "groupId": "1",
                    "maker": "-0.0008",
                    "taker": "-0.001"
                }
            ],
            "fiat": [],
            "instType": "SPOT",
            "level": "Lv1",
            "maker": "-0.0008",
            "makerU": "",
            "makerUSDC": "",
            "ruleType": "normal",
            "taker": "-0.001",
            "takerU": "",
            "takerUSDC": "",
            "ts": "1763979985847"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>level</td><td>String</td><td>手续费等级</td></tr><tr><td>feeGroup</td><td>Array of objects</td><td>手续费分组<br>适用于<code>SPOT/MARGIN/SWAP/FUTURES/OPTION/EVENTS</code></td></tr><tr><td>&gt; taker</td><td>String</td><td>吃单手续费<br><code>EVENTS</code> 吃单手续费公式的 K1 参数：<code>K1 × C × (P × (1-P))</code>（C = 合约张数，P = 价格）</td></tr><tr><td>&gt; maker</td><td>String</td><td>挂单手续费<br><code>EVENTS</code> 挂单手续费公式的 K2 参数：<code>K2 × C × (P × (1-P))</code>（C = 合约张数，P = 价格）</td></tr><tr><td>&gt; groupId</td><td>String</td><td>交易产品手续费分组ID<br><br><strong>用户需要同时使用instType和groupId来确定一个交易产品的交易手续费分组；用户应该将此接口和<a href="zh.html#trading-account-rest-api-get-instruments">获取交易产品基础信息</a>一起使用，以获取特定交易产品的手续费率</strong></td></tr><tr><td>&gt; elpMaker</td><td>String</td><td>ELP Maker 有效费率。若 ELP 不适用于该交易产品，则返回 <code>""</code>。</td></tr><tr><td>delivery</td><td>String</td><td>交割手续费率</td></tr><tr><td>exercise</td><td>String</td><td>行权手续费率</td></tr><tr><td>instType</td><td>String</td><td>产品类型</td></tr><tr><td>ts</td><td>String</td><td>数据返回时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>taker</td><td>String</td><td><del>对于币币/杠杆，为 USDT 交易区的吃单手续费率；<br>对于永续，交割和期权合约，为币本位合约费率</del>（已废弃）</td></tr><tr><td>maker</td><td>String</td><td><del>对于币币/杠杆，为 USDT 交易区的挂单手续费率；<br>对于永续，交割和期权合约，为币本位合约费率</del>（已废弃）</td></tr><tr><td>takerU</td><td>String</td><td><del>USDT 合约吃单手续费率，仅适用于<code>交割/永续</code></del>（已废弃）</td></tr><tr><td>makerU</td><td>String</td><td><del>USDT 合约挂单手续费率，仅适用于<code>交割/永续</code></del>（已废弃）</td></tr><tr><td>takerUSDC</td><td>String</td><td><del>对于币币/杠杆，为 USDⓈ&amp;Crypto 交易区的吃单手续费率；<br>对于永续和交割合约，为 USDC 合约费率</del>（已废弃）</td></tr><tr><td>makerUSDC</td><td>String</td><td><del>对于币币/杠杆，为 USDⓈ&amp;Crypto 交易区的挂单手续费率；<br>对于永续和交割合约，为 USDC 合约费率</del>（已废弃）</td></tr><tr><td>ruleType</td><td>String</td><td><del>交易规则类型<br><code>normal</code>：普通交易<br><code>pre_market</code>：盘前交易</del>（已废弃）</td></tr><tr><td>category</td><td>String</td><td><del>币种类别</del>（已废弃）</td></tr><tr><td>fiat</td><td>Array of objects</td><td><del>法币费率</del>（已废弃）</td></tr><tr><td>&gt; ccy</td><td>String</td><td>法币币种</td></tr><tr><td>&gt; taker</td><td>String</td><td>吃单手续费率</td></tr><tr><td>&gt; maker</td><td>String</td><td>挂单手续费率</td></tr><tr><td>settle</td><td>String</td><td>结算手续费率，适用于持仓方向与事件合约结算结果一致的用户。持反向仓位的用户结算时不收取手续费。仅适用于 <code>EVENTS</code></td></tr></tbody></table>

::: tip
备注：  
手续费率的值（如 maker/taker）：正数，代表是返佣的费率；负数，代表平台扣除的费率。  
例外：delivery 和 exercise 为正数，代表平台扣除的费率。
:::

::: tip
USDⓈ 代表除 USDT 之外的稳定币。
:::

::: tip
接口不会体现零手续费，零手续费交易对请参考[https://www.okx.com/zh-hans/fees](https://www.okx.com/zh-hans/fees)
:::

::: tip
对于参与做市激励计划的用户：指定 `instId`（适用于 `SPOT`/`MARGIN`）或 `instFamily`（适用于 `FUTURES`/`SWAP`/`OPTION`）将返回正确的适用手续费率；若不指定上述参数，则返回基础档位手续费率。
:::

### 获取计息记录

获取过去一年的计息记录

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/interest-accrued`

> 请求示例

```
GET /api/v5/account/interest-accrued
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取计息记录
result = accountAPI.get_interest_accrued()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">借币类型<br><code>2</code>：市场借币<br>默认为<code>2</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">借贷币种，如 <code>BTC</code><br>仅适用于<code>市场借币</code><br>仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>仅适用于<code>市场借币</code></td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br>仅适用于<code>市场借币</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "instId": "",
            "interest": "0.0003960833333334",
            "interestRate": "0.0000040833333333",
            "liab": "97",
            "totalLiab": "",
            "interestFreeLiab": "",
            "mgnMode": "",
            "ts": "1637312400000",
            "type": "1"
        },
        {
            "ccy": "USDT",
            "instId": "",
            "interest": "0.0004083333333334",
            "interestRate": "0.0000040833333333",
            "liab": "100",
            "totalLiab": "",
            "interestFreeLiab": "",
            "mgnMode": "",
            "ts": "1637049600000",
            "type": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>type</td><td>String</td><td>类型<br><code>2</code>：市场借币</td></tr><tr><td>ccy</td><td>String</td><td>借贷币种，如 <code>BTC</code></td></tr><tr><td>instId</td><td>String</td><td>产品ID，如 <code>BTC-USDT</code><br>仅适用于<code>市场借币</code></td></tr><tr><td>mgnMode</td><td>String</td><td>保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td>interest</td><td>String</td><td>利息累计</td></tr><tr><td>interestRate</td><td>String</td><td>借款计息利率(小时)</td></tr><tr><td>liab</td><td>String</td><td>计息负债</td></tr><tr><td>totalLiab</td><td>String</td><td>当前账户总负债量</td></tr><tr><td>interestFreeLiab</td><td>String</td><td>当前账户免息负债量</td></tr><tr><td>ts</td><td>String</td><td>计息时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取用户当前市场借币利率

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/interest-rate`

> 请求示例

```
GET /api/v5/account/interest-rate
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取用户当前市场借币利率
result = accountAPI.get_interest_rate()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ccy":"BTC",
            "interestRate":"0.0001"
        },
        {
            "ccy":"LTC",
            "interestRate":"0.0003"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">interestRate</td><td style="text-align: left">String</td><td style="text-align: left">每小时借币利率</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr></tbody></table>

### 设置手续费计价方式

设置手续费计价方式。

::: tip
手續費計價方式選擇對現貨生效。
:::

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/account/set-fee-type`

> 请求示例

```
POST /api/v5/account/set-fee-type 
body
{
    "feeType": "0"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">feeType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">手续费计价方式<br><code>0</code>: 按交易获得的币种收取手续费（默认）<br><code>1</code>: 始终按交易对的计价币种收取手续费（仅适用于现货）</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "feeType": "0"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">feeType</td><td style="text-align: left">String</td><td style="text-align: left">手续费计价方式<br><code>0</code>: 按交易获得的币种收取手续费<br><code>1</code>: 始终按交易对的计价币种收取手续费</td></tr></tbody></table>

### 期权greeks的PA/BS切换

设置greeks的展示方式。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-greeks`

> 请求示例

```
POST /api/v5/account/set-greeks 
body
{
    "greeksType":"PA"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 期权greeks的PA/BS切换
result = accountAPI.set_greeks(greeksType="PA")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">greeksType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">希腊字母展示方式<br><code>PA</code>：币本位，<code>BS</code>：美元本位</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "greeksType": "PA"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">greeksType</td><td style="text-align: left">String</td><td style="text-align: left">当前希腊字母展示方式</td></tr></tbody></table>

### 逐仓交易设置

可以通过该接口设置币币杠杆和交割、永续的逐仓仓位保证金的划转模式

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-isolated-mode`

> 请求示例

```
POST /api/v5/account/set-isolated-mode
body
{
    "isoMode":"automatic",
    "type":"MARGIN"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 逐仓交易设置
result = accountAPI.set_isolated_mode(
    isoMode="automatic",
    type="MARGIN"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">isoMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">逐仓保证金划转模式<br><code>auto_transfers_ccy</code>：新版开仓自动划转，支持交易货币及计价货币作为保证金，仅适用于<code>币币杠杆</code><br><code>automatic</code>：开仓自动划转</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">业务线类型<br><code>MARGIN</code>：币币杠杆<br><code>CONTRACTS</code>：合约</td></tr></tbody></table>

::: tip
当前账户内有持仓和挂单时，不能调整逐仓保证金划转模式。
:::

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "isoMode": "automatic"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">isoMode</td><td style="text-align: left">String</td><td style="text-align: left">逐仓保证金划转模式<br><code>auto_transfers_ccy</code>：新版开仓自动划转<br><code>automatic</code>：开仓自动划转</td></tr></tbody></table>

::: tip
衍生品  
开仓划转：在开仓和平仓时自动占用和释放保证金
:::

::: tip
杠杆  
开仓划转：在开仓和平仓时自动借币和还币
:::

### 查看账户最大可转余额

当指定币种时会返回该币种的交易账户到资金账户的最大可划转数量，不指定币种会返回所有拥有的币种资产可划转数量。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/max-withdrawal`

> 请求示例

```
GET /api/v5/account/max-withdrawal
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户最大可转余额
result = accountAPI.get_max_withdrawal()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
            "ccy": "BTC",
            "maxWd": "124",
            "maxWdEx": "125",
            "spotOffsetMaxWd": "",
            "spotOffsetMaxWdEx": ""
        },
        {
            "ccy": "ETH",
            "maxWd": "10",
            "maxWdEx": "12",
            "spotOffsetMaxWd": "",
            "spotOffsetMaxWdEx": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">maxWd</td><td style="text-align: left">String</td><td style="text-align: left">最大可划转数量（不包含 <code>跨币种保证金模式</code>/<code>组合保证金模式</code> 借币金额）</td></tr><tr><td style="text-align: left">maxWdEx</td><td style="text-align: left">String</td><td style="text-align: left">最大可划转数量（包含 <code>跨币种保证金模式</code>/<code>组合保证金模式</code> 借币金额）</td></tr><tr><td style="text-align: left">spotOffsetMaxWd</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲不支持借币最大可转数量<br>仅适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">spotOffsetMaxWdEx</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲支持借币的最大可转数量<br>仅适用于<code>组合保证金模式</code></td></tr></tbody></table>

### 查看账户特定风险状态

仅适用于PM账户

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/risk-state`

> 请求示例

```
GET /api/v5/account/risk-state
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户持仓风险
result = accountAPI.get_account_position_risk()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "atRisk": false,
            "atRiskIdx": [],
            "atRiskMgn": [],
            "ts": "1635745078794"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>atRisk</td><td>Boolean</td><td>自动借币模式下的账户风险状态<br>true： 当前账户为特定风险状态<br>false： 当前不是特定风险状态</td></tr><tr><td>atRiskIdx</td><td>Array of strings</td><td>衍生品的risk unit列表</td></tr><tr><td>atRiskMgn</td><td>Array of strings</td><td>杠杆的risk unit列表</td></tr><tr><td>ts</td><td>String</td><td>接口数据返回时间 ，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
当账户进入特定风险状态后，仅可以委托降低账户风险方向的IOC类型订单.
:::

### 获取借币利率与限额

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/interest-limits`

> 请求示例

```
GET /api/v5/account/interest-limits?ccy=BTC
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取借币利率与限额
result = accountAPI.get_interest_limits(
    ccy="BTC"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">借币类型<br><code>2</code>：市场借币<br>默认为<code>2</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">借贷币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debt": "0.85893159114900247077000000000000",
            "interest": "0.00000000000000000000000000000000",
            "loanAlloc": "",
            "nextDiscountTime": "1729490400000",
            "nextInterestTime": "1729490400000",
            "records": [
                {
                    "availLoan": "",
                    "avgRate": "",
                    "ccy": "BTC",
                    "interest": "0",
                    "loanQuota": "175.00000000",
                    "posLoan": "",
                    "rate": "0.0000276",
                    "surplusLmt": "175.00000000",
                    "surplusLmtDetails": {},
                    "usedLmt": "0.00000000",
                    "usedLoan": "",
                    "interestFreeLiab": "",
                    "potentialBorrowingAmt": ""
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>debt</td><td>String</td><td>当前负债，单位为<code>USD</code></td></tr><tr><td>interest</td><td>String</td><td>当前记息，单位为<code>USD</code><br>仅适用于<code>市场借币</code></td></tr><tr><td>nextDiscountTime</td><td>String</td><td>下次扣息时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>nextInterestTime</td><td>String</td><td>下次计息时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>loanAlloc</td><td>String</td><td><del>当前交易账户尊享借币可用额度的比率（百分比）<br>1. 范围为[0, 100]. 精度为 0.01% (2位小数)<br>2. 0 代表母账户没有为子账户分配；<br>3. "" 代表母子账户共享</del><br>已废弃</td></tr><tr><td>records</td><td>Array of objects</td><td>各币种详细信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>借贷币种，如 <code>BTC</code></td></tr><tr><td>&gt; rate</td><td>String</td><td>当前日借币利率</td></tr><tr><td>&gt; loanQuota</td><td>String</td><td>母账户维度借币限额<br>如果已配置可用额度，该字段代表当前交易账户的借币限额</td></tr><tr><td>&gt; usedLmt</td><td>String</td><td>当前账户已借额度<br>如果已配置可用额度，该字段代表当前交易账户的已借额度</td></tr><tr><td>&gt; interest</td><td>String</td><td>已计未扣利息<br>仅适用于<code>市场借币</code></td></tr><tr><td>&gt; interestFreeLiab</td><td>String</td><td>当前账户免息负债</td></tr><tr><td>&gt; potentialBorrowingAmt</td><td>String</td><td>当前账户潜在借币量</td></tr><tr><td>&gt; surplusLmt</td><td>String</td><td>母子账户剩余可借<br>如果已配置可用额度，该字段代表当前交易账户的剩余可借</td></tr><tr><td>&gt; surplusLmtDetails</td><td>Object</td><td><del>母子账户剩余可借额度详情，母子账户剩余可借额度的值取该数组中的最小值，可以用来判断是什么原因导致可借额度不足<br>仅适用于<code>尊享借币</code></del><br>已废弃</td></tr><tr><td>&gt;&gt; allAcctRemainingQuota</td><td>String</td><td>母子账户剩余额度</td></tr><tr><td>&gt;&gt; curAcctRemainingQuota</td><td>String</td><td>当前账户剩余额度<br>仅适用于为子账户分配限额的场景</td></tr><tr><td>&gt;&gt; platRemainingQuota</td><td>String</td><td>平台剩余额度，当平台剩余额度大于<code>curAcctRemainingQuota</code>或者<code>allAcctRemainingQuota</code>时，会显示大于某个值，如"&gt;1000"</td></tr><tr><td>&gt; posLoan</td><td>String</td><td><del>当前账户负债占用（锁定额度内）<br>仅适用于<code>尊享借币</code></del><br>已废弃</td></tr><tr><td>&gt; availLoan</td><td>String</td><td><del>当前账户剩余可用（锁定额度内）<br>仅适用于<code>尊享借币</code></del><br>已废弃</td></tr><tr><td>&gt; usedLoan</td><td>String</td><td><del>当前账户已借额度<br>仅适用于<code>尊享借币</code></del><br>已废弃</td></tr><tr><td>&gt; avgRate</td><td>String</td><td><del>已借币种平均每小时利率，仅适用于<code>尊享借币</code></del><br>已废弃</td></tr></tbody></table>

### 手动借/还币

仅适用于`现货模式`已开通借币的情况。

#### 限速：1次/3s

#### 限速规则：Master Account User ID

#### HTTP请求

`POST /api/v5/account/spot-manual-borrow-repay`

> 请求示例

```
POST /api/v5/account/spot-manual-borrow-repay 
body
{
    "ccy": "USDT",
    "side": "borrow",
    "amt": "100"
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1
accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

result = accountAPI.spot_manual_borrow_repay(ccy="USDT", side="borrow", amt= "1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">方向<br><code>borrow</code>：借币<br><code>repay</code>：还币</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">数量</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy":"USDT",
            "side":"borrow",
            "amt":"100"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">方向<br><code>borrow</code>：借币<br><code>repay</code>：还币</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">实际数量</td></tr></tbody></table>

### 设置自动还币

仅适用于`现货模式`已开通借币的情况。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-auto-repay`

> 请求示例

```
POST /api/v5/account/set-auto-repay
body
{
    "autoRepay": true
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1
accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

result = accountAPI.set_auto_repay(autoRepay=True)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">autoRepay</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否支持<code>现货模式</code>下自动还币<br><code>true</code>：支持<br><code>false</code>：不支持</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "autoRepay": true
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">autoRepay</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否支持<code>现货模式</code>下自动还币<br><code>true</code>：支持<br><code>false</code>：不支持</td></tr></tbody></table>

### 获取借/还币历史

获取`现货模式`下的借/还币历史。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/spot-borrow-repay-history`

> 请求示例

```
GET /api/v5/account/spot-borrow-repay-history
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1
accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

result = accountAPI.spot_borrow_repay_history(ccy="USDT", type="auto_borrow")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">事件类型<br><code>auto_borrow</code>：自动借币<br><code>auto_repay</code>：自动还币<br><code>manual_borrow</code>：手动借币<br><code>manual_repay</code>：手动还币</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求发生时间<code>ts</code>之前（包含）的分页内容，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求发生时间<code>ts</code>之后（包含）的分页内容，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accBorrowed": "0",
            "amt": "6764.802661157592",
            "ccy": "USDT",
            "ts": "1725330976644",
            "type": "auto_repay"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">事件类型<br><code>auto_borrow</code>：自动借币<br><code>auto_repay</code>：自动还币<br><code>manual_borrow</code>：手动借币<br><code>manual_repay</code>：手动还币</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">数量</td></tr><tr><td style="text-align: left">accBorrowed</td><td style="text-align: left">String</td><td style="text-align: left">累计借币数量</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">事件发生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 仓位创建器

计算用户的模拟头寸或当前头寸的投资组合保证金信息，一次请求最多可添加200个虚拟仓位和200个虚拟虚拟资产

#### 限速：2次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/position-builder`

> 请求示例

```
# 真实与虚拟的仓位与资产一起计算
POST /api/v5/account/position-builder
body
{
    "inclRealPosAndEq": false,
    "simPos":[
         {
            "pos":"-10",
            "instId":"BTC-USDT-SWAP",
            "avgPx":"100000"
         },
         {
            "pos":"10",
            "instId":"LTC-USDT-SWAP",
            "avgPx":"8000"
         }
    ],
    "simAsset":[
        {
            "ccy": "USDT",
            "amt": "100"
        }
    ],
    "greeksType":"CASH"
}


# 只计算已有真实仓位
POST /api/v5/account/position-builder
body
{
   "inclRealPosAndEq": true
}


# 只计算虚拟仓位
POST /api/v5/account/position-builder
body
{
    "acctLv": "4",
    "inclRealPosAndEq": false,
    "simPos":[
        {
            "pos":"10",
            "instId":"BTC-USDT-SWAP",
            "avgPx":"100000"
        },
        {
            "pos":"10",
            "instId":"LTC-USDT-SWAP",
            "avgPx":"8000"
        }
    ]
}

# 切换到跨币种
POST /api/v5/account/position-builder
body
{
    "acctLv": "3",
    "lever":"10",
    "simPos":[
        {
            "pos":"10",
            "instId":"BTC-USDT-SWAP",
            "avgPx":"100000",
            "lever":"5"
        },
        {
            "pos":"10",
            "instId":"LTC-USDT-SWAP",
            "avgPx":"8000"
        }
    ]
}
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

result = accountAPI.position_builder(
    inclRealPosAndEq=True,
    simPos=[
        {
            "pos": "10",
            "instId": "BTC-USDT-SWAP",
            "avgPx":"100000"
        },
        {
            "pos": "10",
            "instId": "LTC-USDT-SWAP",
            "avgPx":"100000"
        }
    ]
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">acctLv</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">切换至账户模式<br><code>3</code>：跨币种保证金模式<br><code>4</code>：组合保证金模式</td></tr><tr><td style="text-align: left">inclRealPosAndEq</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否代入已有仓位和资产<br>默认为<code>true</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跨币种下整体的全仓合约杠杆数量，默认为<code>1</code>。<br>如果超过允许的杠杆倍数，按照最大的杠杆设置。<br>适用于<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">simPos</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">模拟仓位列表</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易产品ID，如 <code>BTC-USDT-SWAP</code><br>适用于 <code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code></td></tr><tr><td style="text-align: left">&gt; pos</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">持仓量</td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">平均开仓价格</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">杠杆<br>仅适用于在跨币种保证金模式下指定交易产品的杠杆。如果用户不传，则选择默认杠杆为<code>1</code>。</td></tr><tr><td style="text-align: left">simAsset</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">模拟资产<br>当<code>inclRealPosAndEq</code>为<code>true</code>，只考虑真实资产，会忽略虚拟资产</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种数量<br>可以为负，代表减少币种资产</td></tr><tr><td style="text-align: left">greeksType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">希腊值类型<br><code>BS</code>：BS模型<br><code>PA</code>：币本位<br><code>CASH</code>：美元现金等价<br>默认是<code>BS</code></td></tr><tr><td style="text-align: left">idxVol</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">价格变动百分比。小数形式，范围 -0.99 ~ 1，以 0.01 为增量。<br>默认值为 0</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "acctLever": "-0.1364949794742562",
            "assets": [
                {
                    "availEq": "0",
                    "borrowImr": "0",
                    "borrowMmr": "",
                    "ccy": "BTC",
                    "spotInUse": "0"
                },
                {
                    "availEq": "0",
                    "borrowImr": "0",
                    "borrowMmr": "",
                    "ccy": "LTC",
                    "spotInUse": "0"
                },
                {
                    "availEq": "0",
                    "borrowImr": "0",
                    "borrowMmr": "",
                    "ccy": "USDC",
                    "spotInUse": "0"
                },
                {
                    "availEq": "-78589.37",
                    "borrowImr": "7855.32188898",
                    "borrowMmr": "",
                    "ccy": "USDT",
                    "spotInUse": "0"
                }
            ],
            "borrowMmr": "1571.064377796",
            "derivMmr": "1375.4837063088003",
            "eq": "-78553.21888979999",
            "marginRatio": "-25.95365779811705",
            "positions": [],
            "riskUnitData": [
                {
                    "delta": "-9704.903689800001",
                    "gamma": "0",
                    "imrBf": "",
                    "imr": "1538.9669514070802",
                    "mmrBf": "",
                    "mmr": "1183.8207318516002",
                    "mr1": "1164.4109244719994",
                    "mr1FinalResult": {
                        "pnl": "-1164.4109244719994",
                        "spotShock": "0.12",
                        "volShock": "up"
                    },
                    "mr1Scenarios": {
                        "volSame": {
                            "0": "0",
                            "0.08": "-776.2739496480004",
                            "-0.08": "776.2739496480004",
                            "0.04": "-388.1369748240002",
                            "0.12": "-1164.4109244719994",
                            "-0.12": "1164.4109244719994",
                            "-0.04": "388.1369748240002"
                        },
                        "volShockDown": {
                            "0": "0",
                            "0.08": "-776.2739496480004",
                            "-0.08": "776.2739496480004",
                            "0.04": "-388.1369748240002",
                            "0.12": "-1164.4109244719994",
                            "-0.12": "1164.4109244719994",
                            "-0.04": "388.1369748240002"
                        },
                        "volShockUp": {
                            "0": "0",
                            "0.08": "-776.2739496480004",
                            "-0.08": "776.2739496480004",
                            "0.04": "-388.1369748240002",
                            "0.12": "-1164.4109244719994",
                            "-0.12": "1164.4109244719994",
                            "-0.04": "388.1369748240002"
                        }
                    },
                    "mr2": "0",
                    "mr3": "0",
                    "mr4": "19.4098073796",
                    "mr5": "0",
                    "mr6": "1164.4109244720003",
                    "mr6FinalResult": {
                        "pnl": "-2328.8218489440005",
                        "spotShock": "0.24"
                    },
                    "mr7": "43.67206660410001",
                    "mr8": "1571.064377796",
                    "mr9": "0",
                    "portfolios": [
                        {
                            "amt": "-10",
                            "avgPx": "100000",
                            "delta": "-9704.903689800001",
                            "floatPnl": "290.6300000000003",
                            "gamma": "0",
                            "instId": "BTC-USDT-SWAP",
                            "instType": "SWAP",
                            "isRealPos": false,
                            "markPxBf": "",
                            "markPx": "97093.7",
                            "notionalUsd": "9703.22",
                            "posSide": "net",
                            "theta": "0",
                            "vega": "0"
                        }
                    ],
                    "riskUnit": "BTC",
                    "theta": "0",
                    "upl": "290.49631020000027",
                    "vega": "0"
                },
                {
                    "delta": "1019.5308",
                    "gamma": "0",
                    "imrBf": "",
                    "imr": "249.16186679436",
                    "mmrBf": "",
                    "mmr": "191.6629744572",
                    "mr1": "183.50672805719995",
                    "mr1FinalResult": {
                        "pnl": "-183.50672805719995",
                        "spotShock": "-0.18",
                        "volShock": "up"
                    },
                    "mr1Scenarios": {
                        "volSame": {
                            "0": "0",
                            "-0.06": "-61.168909352399936",
                            "0.06": "61.168909352399936",
                            "-0.18": "-183.50672805719995",
                            "0.18": "183.50672805719995",
                            "0.12": "122.33781870480001",
                            "-0.12": "-122.33781870480001"
                        },
                        "volShockDown": {
                            "0": "0",
                            "-0.06": "-61.168909352399936",
                            "0.06": "61.168909352399936",
                            "-0.18": "-183.50672805719995",
                            "0.18": "183.50672805719995",
                            "0.12": "122.33781870480001",
                            "-0.12": "-122.33781870480001"
                        },
                        "volShockUp": {
                            "0": "0",
                            "-0.06": "-61.168909352399936",
                            "0.06": "61.168909352399936",
                            "-0.18": "-183.50672805719995",
                            "0.18": "183.50672805719995",
                            "0.12": "122.33781870480001",
                            "-0.12": "-122.33781870480001"
                        }
                    },
                    "mr2": "0",
                    "mr3": "0",
                    "mr4": "8.1562464",
                    "mr5": "0",
                    "mr6": "183.5067280572",
                    "mr6FinalResult": {
                        "pnl": "-367.0134561144",
                        "spotShock": "-0.36"
                    },
                    "mr7": "7.1367156",
                    "mr8": "1571.064377796",
                    "mr9": "0",
                    "portfolios": [
                        {
                            "amt": "10",
                            "avgPx": "8000",
                            "delta": "1019.5308",
                            "floatPnl": "-78980",
                            "gamma": "0",
                            "instId": "LTC-USDT-SWAP",
                            "instType": "SWAP",
                            "isRealPos": false,
                            "markPxBf": "",
                            "markPx": "102",
                            "notionalUsd": "1018.9",
                            "posSide": "net",
                            "theta": "0",
                            "vega": "0"
                        }
                    ],
                    "riskUnit": "LTC",
                    "theta": "0",
                    "upl": "-78943.6692",
                    "vega": "0"
                }
            ],
            "totalImr": "9643.45070718144",
            "totalMmr": "2946.5480841048",
            "ts": "1736936801642",
            "upl": "-78653.1728898"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">eq</td><td style="text-align: left">String</td><td style="text-align: left">账户有效保证金</td></tr><tr><td style="text-align: left">totalMmr</td><td style="text-align: left">String</td><td style="text-align: left">账户维持保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">totalImr</td><td style="text-align: left">String</td><td style="text-align: left">账户初始保证金占用，单位为<code>USD</code></td></tr><tr><td style="text-align: left">borrowMmr</td><td style="text-align: left">String</td><td style="text-align: left">账户借币维持保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">derivMmr</td><td style="text-align: left">String</td><td style="text-align: left">账户衍生品维持保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">marginRatio</td><td style="text-align: left">String</td><td style="text-align: left">账户全仓维持保证金率</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">账户浮动盈亏</td></tr><tr><td style="text-align: left">acctLever</td><td style="text-align: left">String</td><td style="text-align: left">账户全仓杠杆</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">账户信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">assets</td><td style="text-align: left">Array of objects</td><td style="text-align: left">资产信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; availEq</td><td style="text-align: left">String</td><td style="text-align: left">币种权益</td></tr><tr><td style="text-align: left">&gt; spotInUse</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用</td></tr><tr><td style="text-align: left">&gt; borrowMmr</td><td style="text-align: left">String</td><td style="text-align: left"><del>借币维持保证金，单位为<code>USD</code></del>字段已废弃</td></tr><tr><td style="text-align: left">&gt; borrowImr</td><td style="text-align: left">String</td><td style="text-align: left">借币初始保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">riskUnitData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">Risk unit 相关信息<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; riskUnit</td><td style="text-align: left">String</td><td style="text-align: left">账户内的 risk unit，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; mmrBf</td><td style="text-align: left">String</td><td style="text-align: left">价格变动前 Risk unit 维度的维持保证金，单位为<code>USD</code><br>若用户没有传入idxVol，则返回 ""</td></tr><tr><td style="text-align: left">&gt; mmr</td><td style="text-align: left">String</td><td style="text-align: left">Risk unit 维度的维持保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">&gt; imrBf</td><td style="text-align: left">String</td><td style="text-align: left">价格变动前 Risk unit 维度的初始保证金，单位为<code>USD</code><br>若用户没有传入idxVol，则返回 ""</td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">Risk unit 维度的初始保证金，单位为<code>USD</code></td></tr><tr><td style="text-align: left">&gt; upl</td><td style="text-align: left">String</td><td style="text-align: left">Risk unit 维度的浮动盈亏，单位为<code>USD</code></td></tr><tr><td style="text-align: left">&gt; mr1</td><td style="text-align: left">String</td><td style="text-align: left">现货和波动率变化风险 (适用于所有衍生品，以及在现货对冲模式下的现货)</td></tr><tr><td style="text-align: left">&gt; mr2</td><td style="text-align: left">String</td><td style="text-align: left">时间价值风险 (仅适用于期权)</td></tr><tr><td style="text-align: left">&gt; mr3</td><td style="text-align: left">String</td><td style="text-align: left">波动率跨期风险 (仅适用于期权)</td></tr><tr><td style="text-align: left">&gt; mr4</td><td style="text-align: left">String</td><td style="text-align: left">基差风险 (适用于所有衍生品)</td></tr><tr><td style="text-align: left">&gt; mr5</td><td style="text-align: left">String</td><td style="text-align: left">利率风险 (仅适用于期权)</td></tr><tr><td style="text-align: left">&gt; mr6</td><td style="text-align: left">String</td><td style="text-align: left">极端市场波动风险 (适用于所有衍生品，以及在现货对冲模式下的现货)</td></tr><tr><td style="text-align: left">&gt; mr7</td><td style="text-align: left">String</td><td style="text-align: left">减仓成本 (适用于所有衍生品)</td></tr><tr><td style="text-align: left">&gt; mr8</td><td style="text-align: left">String</td><td style="text-align: left">借币维持保证金/初始保证金</td></tr><tr><td style="text-align: left">&gt; mr9</td><td style="text-align: left">String</td><td style="text-align: left">USDT-USDC-USD 对冲风险</td></tr><tr><td style="text-align: left">&gt; mr1Scenarios</td><td style="text-align: left">Object of objects</td><td style="text-align: left">MR1 的压力测试场景分析</td></tr><tr><td style="text-align: left">&gt;&gt; volShockDown</td><td style="text-align: left">Object</td><td style="text-align: left">波动率向下时，不同价格波动比率下的压力测试盈亏<br>值为 {<code>change</code>: <code>value</code>, ...}<br><code>change</code>：价格波动比率（百分比），如 <code>0.01</code> 代表 <code>1%</code><br><code>value</code>：压力测试下的盈亏，单位为<code>USD</code><br>如 {"-0.15":"-2333.23", ...}</td></tr><tr><td style="text-align: left">&gt;&gt; volSame</td><td style="text-align: left">Object</td><td style="text-align: left">波动率不变时，不同价格波动比率下的压力测试盈亏<br>值为 {<code>change</code>: <code>value</code>, ...}<br><code>change</code>：价格波动比率（百分比），如 <code>0.01</code> 代表 <code>1%</code><br><code>value</code>：压力测试下的盈亏，单位为<code>USD</code><br>如 {"-0.15":"-2333.23", ...}</td></tr><tr><td style="text-align: left">&gt;&gt; volShockUp</td><td style="text-align: left">Object</td><td style="text-align: left">波动率向上时，不同价格波动比率下的压力测试盈亏<br>值为 {<code>change</code>: <code>value</code>, ...}<br><code>change</code>：价格波动比率（百分比），如 <code>0.01</code> 代表 <code>1%</code><br><code>value</code>：压力测试下的盈亏，单位为<code>USD</code><br>如 {"-0.15":"-2333.23", ...}</td></tr><tr><td style="text-align: left">&gt; mr1FinalResult</td><td style="text-align: left">Object</td><td style="text-align: left">MR1 最大亏损场景</td></tr><tr><td style="text-align: left">&gt;&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">MR1 最大亏损压测盈亏，单位为 <code>USD</code></td></tr><tr><td style="text-align: left">&gt;&gt; spotShock</td><td style="text-align: left">String</td><td style="text-align: left">MR1 最大亏损的价格波动（百分比），如 <code>0.01</code> 代表 <code>1%</code></td></tr><tr><td style="text-align: left">&gt;&gt; volShock</td><td style="text-align: left">String</td><td style="text-align: left">MR1 最大亏损波动率趋势<br><code>down</code>：波动率向下<br><code>unchange</code>：波动率不变<br><code>up</code>：波动率向上</td></tr><tr><td style="text-align: left">&gt; mr6FinalResult</td><td style="text-align: left">Object</td><td style="text-align: left">MR6 最大亏损场景</td></tr><tr><td style="text-align: left">&gt;&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">MR6 最大亏损压测盈亏，单位为 <code>USD</code></td></tr><tr><td style="text-align: left">&gt;&gt; spotShock</td><td style="text-align: left">String</td><td style="text-align: left">MR6 最大亏损的价格波动（百分比），如 <code>0.01</code> 代表 <code>1%</code></td></tr><tr><td style="text-align: left">&gt; delta</td><td style="text-align: left">String</td><td style="text-align: left">(Risk unit 维度) 合约价格随标的价格变动的比例<br>当标的价格变动 x 时，合约价格变动约为此 Delta 数值乘以 x</td></tr><tr><td style="text-align: left">&gt; gamma</td><td style="text-align: left">String</td><td style="text-align: left">(Risk unit 维度) 标的价格对 Delta 值的影响程度<br>当标的价格变动 x% 时，期权 Delta 值的变动约为此 Gamma 数值乘以 x%</td></tr><tr><td style="text-align: left">&gt; theta</td><td style="text-align: left">String</td><td style="text-align: left">(Risk unit 维度) 距离到期日时间缩短 1 天，该合约价格的变化量</td></tr><tr><td style="text-align: left">&gt; vega</td><td style="text-align: left">String</td><td style="text-align: left">(Risk unit 维度) 标的波动率增加 1%，该合约价格的变化量</td></tr><tr><td style="text-align: left">&gt; portfolios</td><td style="text-align: left">Array of objects</td><td style="text-align: left">资产组合</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">&gt;&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">&gt;&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left"><code>instType</code>为<code>SPOT</code>，代表现货对冲占用<br><code>instType</code>为<code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code>，代表仓位数量。</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt;&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">平均开仓价格</td></tr><tr><td style="text-align: left">&gt;&gt; markPxBf</td><td style="text-align: left">String</td><td style="text-align: left">价格变动前标记价格<br>若用户没有传入idxVol，则返回 ""</td></tr><tr><td style="text-align: left">&gt;&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; floatPnl</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">&gt;&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">美金价值</td></tr><tr><td style="text-align: left">&gt;&gt; delta</td><td style="text-align: left">String</td><td style="text-align: left"><code>instType</code>为<code>SPOT</code>，代表资产数量。<br><code>instType</code>为<code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code>，代表(产品层面) 合约价格随标的价格变动的比例。</td></tr><tr><td style="text-align: left">&gt;&gt; gamma</td><td style="text-align: left">String</td><td style="text-align: left">(产品层面) 标的价格对 Delta 值的影响程度<br><code>instType</code>为<code>SPOT</code>，返回""</td></tr><tr><td style="text-align: left">&gt;&gt; theta</td><td style="text-align: left">String</td><td style="text-align: left">(产品层面) 距离到期日时间缩短 1 天，该合约价格的变化量<br><code>instType</code>为<code>SPOT</code>，返回""</td></tr><tr><td style="text-align: left">&gt;&gt; vega</td><td style="text-align: left">String</td><td style="text-align: left">(产品层面) 标的波动率增加 1%，该合约价格的变化量<br><code>instType</code>为<code>SPOT</code>，返回""</td></tr><tr><td style="text-align: left">&gt;&gt; isRealPos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为真实仓位<br><code>instType</code>为<code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code>，该字段有效，其他都默认返回<code>false</code></td></tr><tr><td style="text-align: left">positions</td><td style="text-align: left">Array of objects</td><td style="text-align: left">仓位信息<br>适用于<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left"><code>instType</code>为<code>SPOT</code>，代表现货对冲占用<br><code>instType</code>为<code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code>，代表仓位数量。</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">平均开仓价格</td></tr><tr><td style="text-align: left">&gt; markPxBf</td><td style="text-align: left">String</td><td style="text-align: left">价格变动前标记价格<br>若用户没有传入idxVol，则返回 ""</td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">&gt; floatPnl</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">&gt; imrBf</td><td style="text-align: left">String</td><td style="text-align: left">价格变动前初始保证金</td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">初始保证金，仅适用于全仓</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">美金价值</td></tr><tr><td style="text-align: left">&gt; isRealPos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为真实仓位<br><code>instType</code>为<code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code>，该字段有效，其他都默认返回<code>false</code></td></tr></tbody></table>

### 仓位创建器趋势图

#### 限速：1次/5s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/position-builder-graph`

> 请求示例

```
{
   "inclRealPosAndEq":false,
   "simPos":[
      {
         "pos":"-10",
         "instId":"BTC-USDT-SWAP",
         "avgPx":"100000"
      },
      {
         "pos":"10",
         "instId":"LTC-USDT-SWAP",
         "avgPx":"8000"
      }
   ],
   "simAsset":[
      {
         "ccy":"USDT",
         "amt":"100"
      }
   ],
   "greeksType":"CASH",
   "type":"mmr",
   "mmrConfig":{
      "acctLv":"3",
      "lever":"1"
   }
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>inclRealPosAndEq</td><td>Boolean</td><td>否</td><td>是否代入已有仓位和资产<br>默认为<code>true</code></td></tr><tr><td>simPos</td><td>Array of objects</td><td>否</td><td>模拟仓位列表</td></tr><tr><td>&gt; instId</td><td>String</td><td>是</td><td>交易产品ID，如 <code>BTC-USDT-SWAP</code><br>适用于 <code>SWAP</code>/<code>FUTURES</code>/<code>OPTION</code></td></tr><tr><td>&gt; pos</td><td>String</td><td>是</td><td>持仓量</td></tr><tr><td>&gt; avgPx</td><td>String</td><td>是</td><td>平均开仓价格</td></tr><tr><td>&gt; lever</td><td>String</td><td>否</td><td>杠杆<br>仅适用于在跨币种保证金模式下指定交易产品的杠杆。如果用户不传，则选择默认杠杆为<code>1</code>。</td></tr><tr><td>simAsset</td><td>Array of objects</td><td>否</td><td>模拟资产<br>当<code>inclRealPosAndEq</code>为<code>true</code>，只考虑真实资产，会忽略虚拟资产</td></tr><tr><td>&gt; ccy</td><td>String</td><td>是</td><td>币种，如 <code>BTC</code></td></tr><tr><td>&gt; amt</td><td>String</td><td>是</td><td>币种数量<br>可以为负，代表减少币种资产</td></tr><tr><td>type</td><td>String</td><td>是</td><td>趋势图类型<br><code>mmr</code></td></tr><tr><td>mmrConfig</td><td>Object</td><td>是</td><td>MMR配置</td></tr><tr><td>&gt; acctLv</td><td>String</td><td>否</td><td>切换至账户模式<br><code>3</code>：跨币种保证金模式<br><code>4</code>：组合保证金模式</td></tr><tr><td>&gt; lever</td><td>String</td><td>否</td><td>跨币种下整体的全仓合约杠杆数量，默认为<code>1</code>。<br>如果超过允许的杠杆倍数，按照最大的杠杆设置。<br>适用于<code>跨币种保证金模式</code></td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
         {
            "type": "mmr",
            "mmrData": [
               ......
               {
                     "mmr": "1415.0254039225917",
                     "mmrRatio": "-47.45603627655477",
                     "shockFactor": "-0.94"
               },
               {
                     "mmr": "1417.732491243024",
                     "mmrRatio": "-47.436684685735386",
                     "shockFactor": "-0.93"
               }
               ......
            ]
         }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>type</td><td>String</td><td>趋势图类型<br><code>mmr</code></td></tr><tr><td>mmrData</td><td>Array</td><td>MMR数据<br>以shockFactor升序返回</td></tr><tr><td>&gt; shockFactor</td><td>String</td><td>价格变动比例，数据范围 -1 到 1.</td></tr><tr><td>&gt; mmr</td><td>String</td><td>维持保证金</td></tr><tr><td>&gt; mmrRatio</td><td>String</td><td>维持保证金率</td></tr></tbody></table>

### 设置现货对冲占用

用户自定义现货对冲占用数量，不代表实际现货对冲占用数量。仅适用于组合保证金模式。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-riskOffset-amt`

> 请求示例

```
# 设置现货对冲占用
POST /api/v5/account/set-riskOffset-amt
{
   "ccy": "BTC",
   "clSpotInUseAmt": "0.5"
}
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>是</td><td>币种，如 <code>BTC</code></td></tr><tr><td>clSpotInUseAmt</td><td>String</td><td>是</td><td>用户自定义现货对冲数量</td></tr></tbody></table>

> 返回示例

```
{
   "code": "0",
   "msg": "",
   "data": [
      {
         "ccy": "BTC",
         "clSpotInUseAmt": "0.5"
      }
   ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种，如 <code>BTC</code></td></tr><tr><td>clSpotInUseAmt</td><td>String</td><td>用户自定义现货对冲数量</td></tr></tbody></table>

### 查看账户Greeks

获取账户资产的greeks信息。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/greeks`

> 请求示例

```
# 获取账户中所有资产的greeks
GET /api/v5/account/greeks

# 获取账户中BTC的greeks
GET /api/v5/account/greeks?ccy=BTC
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看账户Greeks
result = accountAPI.get_greeks()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "data":[
        {            
           "thetaBS": "",
           "thetaPA":"",
           "deltaBS":"",
           "deltaPA":"",
           "gammaBS":"",
           "gammaPA":"",
           "vegaBS":"",    
           "vegaPA":"",
           "ccy":"BTC",
           "ts":"1620282889345"
        }
    ],
    "msg":""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>deltaBS</td><td>String</td><td>美金本位账户资产delta</td></tr><tr><td>deltaPA</td><td>String</td><td>币本位账户资产delta</td></tr><tr><td>gammaBS</td><td>String</td><td>美金本位账户资产gamma，仅适用于<code>期权</code></td></tr><tr><td>gammaPA</td><td>String</td><td>币本位账户资产gamma，仅适用于<code>期权</code></td></tr><tr><td>thetaBS</td><td>String</td><td>美金本位账户资产theta，仅适用于<code>期权</code></td></tr><tr><td>thetaPA</td><td>String</td><td>币本位账户资产theta，仅适用于<code>期权</code></td></tr><tr><td>vegaBS</td><td>String</td><td>美金本位账户资产vega，仅适用于<code>期权</code></td></tr><tr><td>vegaPA</td><td>String</td><td>币本位账户资产vega，仅适用于<code>期权</code></td></tr><tr><td>ccy</td><td>String</td><td>币种</td></tr><tr><td>ts</td><td>String</td><td>获取greeks的时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr></tbody></table>

### 获取组合保证金模式仓位限制

仅支持获取组合保证金模式下，交割、永续和期权的全仓仓位限制。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/position-tiers`

> 请求示例

```
# 查看BTC-USDT在组合保证金模式下的全仓限制
GET /api/v5/account/position-tiers?instType=SWAP&uly=BTC-USDT
```

```
import okx.Account as Account

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘:1

accountAPI = Account.AccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取组合保证金模式仓位限制
result = accountAPI.get_account_position_tiers(
    instType="SWAP",
    uly="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种，如 <code>BTC-USDT</code>，支持多个查询（不超过5个），<code>instFamily</code>之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "data": [
    {
      "instFamily": "BTC-USD",
      "maxSz": "10000",
      "posType": "",
      "uly": "BTC-USDT"
    }
  ],
  "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">maxSz</td><td style="text-align: left">String</td><td style="text-align: left">最大持仓量</td></tr><tr><td style="text-align: left">posType</td><td style="text-align: left">String</td><td style="text-align: left">限仓类型，仅适用于组合保证金模式下的期权全仓。<br><code>1</code>：所有合约挂单 + 持仓张数，<code>2</code>：所有合约总挂单张数，<code>3</code>：所有合约总挂单单数，<code>4</code>：同方向合约挂单 + 持仓张数，<code>5</code>：单一合约总挂单单数，<code>6</code>：单一合约挂单 + 持仓张数，<code>7</code>：单笔挂单张数"</td></tr></tbody></table>

### 开通期权交易

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/activate-option`

> 请求示例

```
POST /api/v5/account/activate-option
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ts": "1600000000000"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开通时间</td></tr></tbody></table>

### 设置自动借币

仅适用于跨币种保证金模式和组合保证金模式

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-auto-loan`

> 请求示例

```
POST /api/v5/account/set-auto-loan
body
{
    "autoLoan":true,
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">autoLoan</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否自动借币<br>有效值为<code>true</code>, <code>false</code><br>默认为 <code>true</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "autoLoan": true
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">autoLoan</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否自动借币</td></tr></tbody></table>

### 预设置账户模式切换

预设置账户模式切换的必要信息，若由`组合保证金模式`切换到`合约模式`/`跨币种保证金模式`，且存在全仓交割、永续仓位，则必须预设置lever，令所有仓位具有相同杠杆倍数。

若用户未按照规定进行设置，在预检查或设置账户模式时将接收到报错或提示信息。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/account-level-switch-preset`

> 请求示例

```
# 1. 合约模式 -> 跨币种
POST /api/v5/account/account-level-switch-preset
body
{
    "acctLv": "3"
}

# 2. 跨币种 -> 合约模式
POST /api/v5/account/account-level-switch-preset
body
{
    "acctLv": "2"
}

# 3. 组合保证金 -> 合约模式/跨币种，且有全仓合约仓位，则必须传入lever
POST /api/v5/account/account-level-switch-preset
body
{
    "acctLv": "2",
    "lever": "10"
}

# 4. 组合保证金 -> 合约模式/跨币种，没有全仓合约仓位，则不需传入lever，不进行校验
POST /api/v5/account/account-level-switch-preset
body
{
    "acctLv": "3"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>acctLv</td><td>String</td><td>是</td><td>账户模式<br><code>2</code>: 合约模式<br><code>3</code>: 跨币种保证金模式<br><code>4</code>: 组合保证金模式</td></tr><tr><td>lever</td><td>String</td><td>可选</td><td>在<code>组合保证金模式</code>向<code>合约模式/跨币种保证金模式</code>切换，且用户有全仓仓位时，必须传入</td></tr><tr><td>riskOffsetType</td><td>String</td><td>可选</td><td><del>风险对冲模式<br><code>1</code>：现货对冲(USDT)<br><code>2</code>：现货对冲(币)<br><code>3</code>：衍生品对冲（未开启现货对冲）<br><code>4</code>：现货对冲(USDC)<br>适用于<code>合约模式/跨币种保证金模式</code>向<code>组合保证金模式</code>切换</del>（已弃用）</td></tr></tbody></table>

> 返回结果 1. 合约模式 -> 跨币种

```
{
    "acctLv": "3",
    "curAcctLv": "2",
    "lever": "",
    "riskOffsetType": ""
}
```

> 返回结果 2. 跨币种 -> 合约模式

```
{
    "acctLv": "2",
    "curAcctLv": "3",
    "lever": "",
    "riskOffsetType": ""
}
```

> 返回结果 3. 组合保证金 -> 合约模式/跨币种

```
{
    "acctLv": "2",
    "curAcctLv": "4",
    "lever": "10",
    "riskOffsetType": ""
}
```

> 返回结果 4. 组合保证金 -> 合约模式/跨币种，没有全仓合约仓位，则不需传入lever，不进行校验

```
{
    "acctLv": "3",
    "curAcctLv": "4",
    "lever": "",
    "riskOffsetType": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>curAcctLv</td><td>String</td><td>当前账户类型</td></tr><tr><td>acctLv</td><td>String</td><td>切换后的账户类型</td></tr><tr><td>lever</td><td>String</td><td>用户预设置的全仓合约仓位杠杆倍数</td></tr><tr><td>riskOffsetType</td><td>String</td><td><del>用户预设置的风险对冲模式</del>（已弃用）</td></tr></tbody></table>

::: tip
lever：\`保证金模式\`向\`合约模式\`/\`跨币种保证金模式\`切换，且用户有全仓合约仓位，则必须传入此参数，不传则报错50014。传此参数，允许设置的最大值为各个合约的仓位大小对应合约模式/跨币种账户模式下最大杠杆倍数的最小值。例如，用户在PM模式下，有三个全仓仓位，当前仓位大小对应目标账户模式下最大杠杆倍数分别为20x/50x/100x，那么用户能够设置的最大杠杆倍数为20x。
:::

### 预检查账户模式切换

获取账户模式切换预检查相关信息

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/set-account-switch-precheck`

> 请求示例

```
GET /api/v5/account/set-account-switch-precheck?acctLv=3
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>acctLv</td><td>String</td><td>是</td><td>账户模式<br><code>1</code>: 现货模式<br><code>2</code>: 合约模式<br><code>3</code>: 跨币种保证金模式<br><code>4</code>: 组合保证金模式</td></tr></tbody></table>

> 返回结果: 合约模式->跨币种，需要现在网页或移动端完成答题

```
{
    "code": "51070",
    "data": [],
    "msg": "您当前尚未达到升级至该账户模式的要求，请先在官方网站或APP完成账户模式的升级。"
}
```

> 返回结果: 合约模式->跨币种，有不兼容信息。sCode 1

```
{
    "code": "0",
    "data": [
        {
            "acctLv": "3",
            "curAcctLv": "1",
            "mgnAft": null,
            "mgnBf": null,
            "posList": [],
            "posTierCheck": [],
            "riskOffsetType": "",
            "sCode": "1",
            "unmatchedInfoCheck": [
                {
                    "posList": [],
                    "totalAsset": "",
                    "type": "repay_borrowings"
                }
            ]
        }
    ],
    "msg": ""
}
```

> 返回结果: 组合保证金->跨币种，未进行杠杆设置，展示用户全部合约全仓仓位。sCode 3

```
{
    "code": "0",
    "data": [
        {
            "acctLv": "3",
            "curAcctLv": "4",
            "mgnAft": null,
            "mgnBf": null,
            "posList": [
                {
                    "lever": "50",
                    "posId": "2005456500916518912"
                },
                {
                    "lever": "10",
                    "posId": "2005456108363218944"
                },
                {
                    "lever": "100",
                    "posId": "2005456332909477888"
                },
                {
                    "lever": "1",
                    "posId": "2005456415990251520"
                }
            ],
            "posTierCheck": [],
            "riskOffsetType": "",
            "sCode": "3",
            "unmatchedInfoCheck": []
        }
    ],
    "msg": ""
}
```

> 返回结果: 组合保证金->跨币种，已进行杠杆设置，将全部杠杆倍数设置为50，通过梯度档位及保证金校验。sCode 0

```
{
    "code": "0",
    "data": [
        {
            "acctLv": "3",
            "curAcctLv": "4",
            "mgnAft": {
                "acctAvailEq": "106002.2061970689",
                "details": [],
                "mgnRatio": "148.1652396878421"
            },
            "mgnBf": {
                "acctAvailEq": "77308.89735228613",
                "details": [],
                "mgnRatio": "4.460069474634038"
            },
            "posList": [
                {
                    "lever": "50",
                    "posId": "2005456500916518912"
                },
                {
                    "lever": "50",
                    "posId": "2005456108363218944"
                },
                {
                    "lever": "50",
                    "posId": "2005456332909477888"
                },
                {
                    "lever": "50",
                    "posId": "2005456415990251520"
                }
            ],
            "posTierCheck": [],
            "riskOffsetType": "",
            "sCode": "0",
            "unmatchedInfoCheck": []
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>sCode</td><td>String</td><td>校验码<br><code>0</code>：通过所有验证<br><code>1</code>：有不兼容信息<br><code>3</code>：未进行杠杆设置<br><code>4</code>：梯度档位或保证金校验未通过</td></tr><tr><td>curAcctLv</td><td>String</td><td>当前账户模式<br><code>1</code>: 现货模式<br><code>2</code>: 合约模式<br><code>3</code>: 跨币种保证金模式<br><code>4</code>: 组合保证金模式<br>所有情况下均返回</td></tr><tr><td>acctLv</td><td>String</td><td>新账户模式<br><code>1</code>: 现货模式<br><code>2</code>: 合约模式<br><code>3</code>: 跨币种保证金模式<br><code>4</code>: 组合保证金模式<br>所有情况下均返回</td></tr><tr><td>riskOffsetType</td><td>String</td><td><del>风险对冲模式<br><code>1</code>：现货对冲(USDT)<br><code>2</code>：现货对冲(币)<br><code>3</code>：衍生品对冲<br><code>4</code>：现货对冲(USDC)<br>acctLv为<code>4</code>时返回，其余情况下返回""<br>若用户有设置，则为用户的设置值；若没有设置，则为默认值</del>（已弃用）</td></tr><tr><td>unmatchedInfoCheck</td><td>Array of objects</td><td>包含不匹配信息对象的列表<br>仅在sCode为<code>1</code>，有不兼容信息时返回，其他情况返回[]</td></tr><tr><td>&gt;&gt; type</td><td>String</td><td>不匹配信息类型<br><code>asset_validation</code>：资产校验<br><code>pending_orders</code>：撮合挂单<br><code>pending_algos</code>：策略挂单，冰山、时间加权、定投等<br><code>isolated_margin</code>：杠杆逐仓一键借币及自主划转<br><code>isolated_contract</code>：合约逐仓自主划转<br><code>contract_long_short</code>：合约开平模式<br><code>cross_margin</code>：杠杆全仓开仓划转<br><code>cross_option_buyer</code>：期权全仓买方<br><code>isolated_option</code>：期权逐仓 （仅适用于简单账户）<br><code>growth_fund</code>：体验金仓位<br><code>all_positions</code>：所有仓位<br><code>spot_lead_copy_only_simple_single</code>：带单和自定义跟单员只能使用现货或合约模式<br><code>stop_spot_custom</code>：停止现货自定义跟单<br><code>stop_futures_custom</code>：停止合约自定义跟单<br><code>lead_portfolio</code>：身为带单员，您不能切换到组合保证金账户模式<br><code>futures_smart_sync</code>：您存在合约智能跟单，无法切换到现货模式<br><code>repay_borrowings</code>：存在借币<br><code>compliance_restriction</code>：合规，无法使用保证金交易相关服务<br><code>compliance_kyc2</code>：合规，无法使用保证金交易相关服务，如果您不是该地区居民，请进行KYC2身份认证</td></tr><tr><td>&gt;&gt; totalAsset</td><td>String</td><td>总资产<br>仅在type为<code>asset_validation</code>时返回，其他情况都为""</td></tr><tr><td>&gt;&gt; posList</td><td>Array of strings</td><td>不匹配仓位列表，返回持仓ID<br>在type为仓位相关枚举值时返回，其他情况都为[]</td></tr><tr><td>posList</td><td>Array of objects</td><td>合约全仓仓位列表<br>适用于curAcctLv为<code>4</code>，acctLv为<code>2/3</code>，且用户具有全仓合约仓位的情况<br>在sCode为<code>0/3/4</code>的情况下返回</td></tr><tr><td>&gt; posId</td><td>String</td><td>持仓ID</td></tr><tr><td>&gt; lever</td><td>String</td><td>切换后的全仓仓位杠杆倍数</td></tr><tr><td>posTierCheck</td><td>Array of objects</td><td>未满足梯度档位校验全仓仓位的列表<br>仅在sCode为<code>4</code>时返回</td></tr><tr><td>&gt; instFamily</td><td>String</td><td>交易品种</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td>&gt; pos</td><td>String</td><td>持仓量</td></tr><tr><td>&gt; lever</td><td>String</td><td>杠杆倍数</td></tr><tr><td>&gt; maxSz</td><td>String</td><td>若acctLv为<code>2/3</code>，目标账户模式为合约、跨币种，则为当前杠杆倍数下的最大持仓张数；若acctLv为<code>4</code>，目标账户模式为组合保证金，则为PM全仓最大持仓量上限</td></tr><tr><td>mgnBf</td><td>Object</td><td>切换账户模式前的保证金相关信息<br>在sCode为<code>0/4</code>时返回，其他时候为null</td></tr><tr><td>&gt; acctAvailEq</td><td>String</td><td>美金层面可用保证金<br>在curAcctLv为<code>3/4</code>时返回，其他情况返回""</td></tr><tr><td>&gt; mgnRatio</td><td>String</td><td>美金层面维持保证金率<br>在curAcctLv为<code>3/4</code>时返回，其他情况返回""</td></tr><tr><td>&gt; details</td><td>Array of objects</td><td>各币种资产详细信息<br>仅在curAcctLv为<code>2</code>时返回，其他情况返回[]</td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt;&gt; availEq</td><td>String</td><td>币种维度可用保证金</td></tr><tr><td>&gt;&gt; mgnRatio</td><td>String</td><td>币种维度全仓维持保证金率</td></tr><tr><td>mgnAft</td><td>Object</td><td>切换账户模式后的保证金相关信息<br>在sCode为<code>0/4</code>时返回，其他时候为null</td></tr><tr><td>&gt; acctAvailEq</td><td>String</td><td>美金层面可用保证金<br>在acctLv为<code>3/4</code>时返回，其他情况返回""</td></tr><tr><td>&gt; mgnRatio</td><td>String</td><td>美金层面维持保证金率<br>在acctLv为<code>3/4</code>时返回，其他情况返回""</td></tr><tr><td>&gt; details</td><td>Array of objects</td><td>各币种资产详细信息<br>仅在acctLv为<code>2</code>时返回，其他情况返回""</td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt;&gt; availEq</td><td>String</td><td>币种维度可用保证金</td></tr><tr><td>&gt;&gt; mgnRatio</td><td>String</td><td>币种维度全仓维持保证金率</td></tr></tbody></table>

### 设置账户模式

账户模式的首次设置，需要在网页或手机app上进行。若用户计划在持有仓位的情况下切换账户模式，应该先调用预设置接口进行必要的预设置，再调用预检查接口获取不匹配信息、保证金校验等相关信息，最后调用账户模式切换接口进行账户模式切换。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-account-level`

> 请求示例

```
POST /api/v5/account/set-account-level
body
{
    "acctLv":"1"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">acctLv</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">账户模式<br><code>1</code>: 现货模式<br><code>2</code>: 合约模式<br><code>3</code>: 跨币种保证金模式<br><code>4</code>: 组合保证金模式</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data" :[
          {
            "acctLv":"1"
          }
    ]  
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">acctLv</td><td style="text-align: left">String</td><td style="text-align: left">账户模式</td></tr></tbody></table>

### 设置质押币种

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-collateral-assets`

> 请求示例

```
# 设置全部币种为可质押资产
POST /api/v5/account/set-collateral-assets
body
{
    "type":"all",
    "collateralEnabled":true
}


# 设置自定义不可质押资产
POST /api/v5/account/set-collateral-assets
body
{
    "type":"custom",
    "ccyList":["BTC","ETH"],
    "collateralEnabled":false
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">设置币种类型<br><code>all</code>：全部<br><code>custom</code>：自定义</td></tr><tr><td style="text-align: left">collateralEnabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否设置为质押币种<br><code>true</code>：设置为质押币<br><code>false</code>：取消质押币的设置</td></tr><tr><td style="text-align: left">ccyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可选</td><td style="text-align: left">币种列表，如 ["BTC","ETH"]<br>当type=<code>custom</code>,该字段必传。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data" :[
      {
        "type":"all",
        "ccyList":["BTC","ETH"],
        "collateralEnabled":false
      }
    ]  
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">设置币种类型<br><code>all</code>：全部<br><code>custom</code>：自定义</td></tr><tr><td style="text-align: left">collateralEnabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否已设置为质押币种<br><code>true</code>：设置为质押币<br><code>false</code>：取消质押币的设置</td></tr><tr><td style="text-align: left">ccyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">币种列表，如 ["BTC","ETH"]</td></tr></tbody></table>

### 查看质押币种

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/collateral-assets`

> 请求示例

```
GET /api/v5/account/collateral-assets
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种<br>支持多币种查询（不超过20个），币种之间半角逗号分隔，如 "BTC,ETH"</td></tr><tr><td style="text-align: left">collateralEnabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否为质押币</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data" :[
          {
            "ccy":"BTC",
            "collateralEnabled": true
          },
          {
            "ccy":"ETH",
            "collateralEnabled": false
          }
    ]  
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">collateralEnabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为质押币</td></tr></tbody></table>

### 重置 MMP 状态

一旦 MMP 被触发，可以使用该接口解冻。  
仅适用于组合保证金账户模式下的期权订单，且有 MMP 权限。

::: tip
在模拟盘环境中，MMP 配置可能会被系统定期重置。若您的模拟盘 MMP 状态被意外重置，请联系您的客户经理或发邮件至 institutional@okx.com。
:::

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/mmp-reset`

> 请求示例

```
POST /api/v5/account/mmp-reset
body
{
    "instType":"OPTION",
    "instFamily":"BTC-USD"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易产品类型<br><code>OPTION</code>:期权<br>默认为期权</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr></tbody></table>

> 返回结果

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

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">重置结果<br><code>true</code>:将做市商保护状态重置为了 inactive 状态<br>false：重置失败</td></tr></tbody></table>

### 设置 MMP

可以使用该接口进行 MMP 的配置。  
仅适用于组合保证金账户模式下的期权订单，且有 MMP 权限。

::: tip
什么是MMP?  
做市商保护(MMP)机制保护做市商在一定时间内成交过多。当做市商保护触发时，即做市商在一定时间内(\`timeInterval\`)成交超过某阈值(\`qtyLimit\`)，系统会自动撤销所有MMP挂单(\`mmp\`和\`mmp\_and\_post\_only\`挂单)，拒绝任何新的MMP订单直到某个时间(MMP最近一次触发时间+\`frozenInterval\`)或做市商主动重置。  
  
如何申请MMP?  
请发邮件至 institutional@okx.com 或者联系您的客户经理进行申请。
:::

::: tip
MMP 按交易品种（`instFamily`）单独配置。为某一交易品种启用 MMP **不会**自动延伸至其他品种。例如，为 `BTC-USD` 配置 MMP 并不涵盖 `ETH-USD` 或 `SOL-USD`，需分别调用此接口为每个品种单独设置。
:::

#### 限速：2次/10s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/mmp-config`

> 请求示例

```
POST /api/v5/account/mmp-config
body
{
    "instFamily":"BTC-USD",
    "timeInterval":"5000",
    "frozenInterval":"2000",
    "qtyLimit": "100"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">时间窗口 (毫秒)。<br>"0" 代表停用 MMP</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">冻结时间长度 (毫秒)。<br>"0" 代表一直冻结，直到调用 "重置 MMP 状态" 接口解冻</td></tr><tr><td style="text-align: left">qtyLimit</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">成交数量的上限<br>需大于 0</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
        "frozenInterval":"2000",
        "instFamily":"BTC-USD",
        "qtyLimit": "100",
        "timeInterval":"5000"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">时间窗口 (毫秒)</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">冻结时间长度 (毫秒)</td></tr><tr><td style="text-align: left">qtyLimit</td><td style="text-align: left">String</td><td style="text-align: left">成交张数的上限</td></tr></tbody></table>

### 查看 MMP 配置

可以使用该接口获取 MMP 的配置信息。  
仅适用于组合保证金账户模式下的期权订单，且有 MMP 权限。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/mmp-config`

> 请求示例

```
GET /api/v5/account/mmp-config?instFamily=BTC-USD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "data": [
    {
      "frozenInterval": "2000",
      "instFamily": "ETH-USD",
      "mmpFrozen": true,
      "mmpFrozenUntil": "1000",
      "qtyLimit": "10",
      "timeInterval": "5000"
    }
  ],
  "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">mmpFrozen</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否 MMP 被触发. <code>true</code> 或者 <code>false</code></td></tr><tr><td style="text-align: left">mmpFrozenUntil</td><td style="text-align: left">String</td><td style="text-align: left">如果配置了frozenInterval且mmpFrozen = true，则为不再触发MMP时的时间窗口（单位为ms），否则为“”</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">时间窗口 (毫秒)</td></tr><tr><td style="text-align: left">frozenInterval</td><td style="text-align: left">String</td><td style="text-align: left">冻结时间长度 (毫秒)。<br>如果为"0"，代表一直冻结，直到调用 "重置 MMP 状态" 接口解冻，且<code>mmpFrozenUntil</code>为 ""。</td></tr><tr><td style="text-align: left">qtyLimit</td><td style="text-align: left">String</td><td style="text-align: left">成交张数的上限</td></tr></tbody></table>

### 移仓

仅适用于交易等级大于等于VIP6的用户，仅能通过母账户的API Key调用。用户可通过[我的手续费](https://www.okx.com/balance/fee)页面的手续费详情表格查看自己的交易等级。  

支持同一母账户下的子账户间仓位划转。每个源账户每24小时最多可触发15次移仓请求，目标账户接受移仓不受次数限制。参考下文“注意事项”部分，以获取详情。

#### 限速：1次/1s

#### 限速规则：母账户 User ID

#### HTTP请求

`POST /api/v5/account/move-positions`

> 请求示例

```
{
   "fromAcct":"0",
   "toAcct":"test",
   "legs":[
      {
         "from":{
            "posId":"2065471111340792832",
            "side":"sell",
            "sz":"1"
         },
         "to":{
            "posSide":"net",
            "tdMode":"cross"
         }
      },
      {
         "from":{
            "posId":"2063111180412153856",
            "side":"sell",
            "sz":"1"
         },
         "to":{
            "posSide":"net",
            "tdMode":"cross"
         }
      }
   ],
   "clientId":"test"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>fromAcct</td><td>String</td><td>是</td><td>源账户名，使用"0"代表母账户</td></tr><tr><td>toAcct</td><td>String</td><td>是</td><td>目标账户名，使用"0"代表母账户</td></tr><tr><td>legs</td><td>Array of Objects</td><td>是</td><td>移仓仓位列表，每次最多支持30个仓位</td></tr><tr><td>&gt; from</td><td>Object</td><td>是</td><td>源账户仓位</td></tr><tr><td>&gt;&gt; posId</td><td>String</td><td>是</td><td>源账户持仓ID</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>是</td><td>合约数量</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>是</td><td>源账户的交易方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt; to</td><td>Object</td><td>是</td><td>目标账户移仓配置</td></tr><tr><td>&gt;&gt; tdMode</td><td>String</td><td>否</td><td>目标账户的交易模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br>若未提供，tdMode会采用以下默认值：<br>在合约模式或跨币种保证金模式下买入期权：<code>isolated</code><br>其他情况：<code>cross</code></td></tr><tr><td>&gt;&gt; posSide</td><td>String</td><td>否</td><td>持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式<br>当目标账户处于买卖模式时，用户不需传入该参数，若传入，唯一有效值为<code>net</code>；当处于开平仓模式时，有效值为<code>long</code>，<code>short</code>，若未指定，目标账户将总是开仓</td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>否</td><td>目标账户保证金币种<br>仅适用于<code>合约模式</code>下的全仓杠杆仓位</td></tr><tr><td>clientId</td><td>String</td><td>是</td><td>客户自定义ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "clientId": "test",
            "blockTdId": "2065832911119076864",
            "state": "filled",
            "ts": "1734069018526",
            "fromAcct": "0",
            "toAcct": "test",
            "legs": [
                {
                    "from": {
                        "posId": "2065471111340792832",
                        "instId": "BTC-USD-SWAP",
                        "px": "100042.7",
                        "side": "sell",
                        "sz": "1",
                        "sCode": "0",
                        "sMsg": ""
                    },
                    "to": {
                        "instId": "BTC-USD-SWAP",
                        "px": "100042.7",
                        "side": "buy",
                        "sz": "1",
                        "tdMode": "cross",
                        "posSide": "net",
                        "ccy": "",
                        "sCode": "0",
                        "sMsg": ""
                    }
                },
                {
                    "from": {
                        "posId": "2063111180412153856",
                        "instId": "BTC-USDT-SWAP",
                        "px": "100008.1",
                        "side": "sell",
                        "sz": "1",
                        "sCode": "0",
                        "sMsg": ""
                    },
                    "to": {
                        "instId": "BTC-USDT-SWAP",
                        "px": "100008.1",
                        "side": "buy",
                        "sz": "1",
                        "tdMode": "cross",
                        "posSide": "net",
                        "ccy": "",
                        "sCode": "0",
                        "sMsg": ""
                    }
                }
            ]
        }
    ]
}
```

> 返回示例:失败

```
// 目标账户处于开平仓模式，传入posSide:net不匹配
{
    "code": "51000",
    "msg": "Incorrect type of posSide (leg with Instrument Id [BTC-USD-SWAP])",
    "data": []
}

// 目标账户的BTC余额不足以开新仓位
{
    "code": "51008",
    "msg": "Order failed. Insufficient BTC margin in account",
    "data": []
}

// TradeFi仓位不支持移仓
{
    "code": "70004",
    "msg": "Invalid instrument ID XAG-USDT-SWAP",
    "data": []
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>code</td><td>String</td><td>结果代码，<code>0</code>表示成功</td></tr><tr><td>msg</td><td>String</td><td>错误信息，代码为0时，该字段为空</td></tr><tr><td>blockTdId</td><td>String</td><td>大宗交易ID</td></tr><tr><td>clientId</td><td>String</td><td>客户自定义ID</td></tr><tr><td>state</td><td>String</td><td>移仓状态，<code>filled</code> <code>failed</code></td></tr><tr><td>fromAcct</td><td>String</td><td>源账户名</td></tr><tr><td>toAcct</td><td>String</td><td>目标账户名</td></tr><tr><td>legs</td><td>Array</td><td>移仓仓位列表</td></tr><tr><td>&gt; from</td><td>Object</td><td>源账户仓位</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; posId</td><td>String</td><td>持仓ID</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>移仓价格，过去60分钟的标记价格TWAP</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>源账户的交易方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>合约数量</td></tr><tr><td>&gt;&gt; sCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>&gt;&gt; sMsg</td><td>String</td><td>事件执行失败或成功时的msg</td></tr><tr><td>&gt; to</td><td>Object</td><td>目标账户移仓配置</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>目标账户交易方向</td></tr><tr><td>&gt;&gt; posSide</td><td>String</td><td>目标账户持仓方向</td></tr><tr><td>&gt;&gt; tdMode</td><td>String</td><td>目标账户的交易模式</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>移仓价格，过去60分钟的标记价格TWAP</td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>保证金币种</td></tr><tr><td>&gt;&gt; sCode</td><td>String</td><td>事件执行结果的code，0代表成功</td></tr><tr><td>&gt;&gt; sMsg</td><td>String</td><td>事件执行失败或成功时的msg</td></tr><tr><td>ts</td><td>String</td><td>移仓请求处理时间戳，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr></tbody></table>

#### 注意事项

1.  仅适用于交易等级大于等于VIP6的用户，仅能通过母账户的API Key调用
2.  移仓的源账户和目标账户必须是统一主账户下的子账户，且两者不能相同
3.  对于源账户，24小时内最多可触发15次移仓请求，目标账户接收仓位没有次数限制，只有成功的请求才会计入该限制
4.  每个移仓请求最多支持30个仓位
5.  目前暂不收取移仓手续费
6.  目前币币杠杆交易产生的仓位不支持移仓
7.  TradeFi仓位不支持移仓
8.  移仓价格采用过去60分钟内每分钟标记价格收盘价的TWAP（时间加权平均价格），若交易对为新上币且无法获取60分钟TWAP，移仓将被拒绝并返回错误码70065
9.  移仓适用于订单簿相同的限价，若标记价格TWAP超出限价范围，移仓将失败
10.  对源账户而言，移仓必须以只减仓模式进行；必须选择当前持仓的相反方向，且划转数量需小于或等于现有持仓量；系统将以尽力而为的方式按只减仓原则处理移仓请求
11.  当持有多仓时，源账户的side字段应为sell，目标账户则应为buy；空仓时，方向相反
12.  目标账户若为买卖模式，posSide应为net；若为开平仓模式，则需指定posSide为long/short以决定平仓或反向开仓，未指定时默认开新仓：
     1.  开多：买入开多（side: buy; posSide: long）
     2.  开空：卖出开空（side: sell; posSide: short）
     3.  平多：卖出平多（side: sell; posSide: long）
     4.  平空：买入平空（side: buy; posSide: short
13.  移仓历史可通过”获取移仓历史”接口查询，该接口仅包含处理中或成功的请求
14.  移仓操作计数示例

<table><thead><tr><th>移仓操作</th><th>账户A总计次数</th><th>账户B总计次数</th><th>账户C总计次数</th><th>账户D总计次数</th></tr></thead><tbody><tr><td>账户A到账户B</td><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>账户B到账户C</td><td>1</td><td>1</td><td>0</td><td>0</td></tr><tr><td>账户B到账户D</td><td>1</td><td>2</td><td>0</td><td>0</td></tr></tbody></table>

### 获取移仓历史

仅适用于交易等级大于等于VIP6的用户，仅能通过母账户的API Key调用。用户可通过[我的手续费](https://www.okx.com/balance/fee)页面的手续费详情表格查看自己的交易等级。  

获取过去三天的移仓明细。

#### 限速：2次/2s

#### 限速规则：母账户 User ID

#### HTTP请求

`GET /api/v5/account/move-positions-history`

> 请求示例

```
Get /api/v5/account/move-positions-history
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>blockTdId</td><td>String</td><td>否</td><td>大宗交易ID</td></tr><tr><td>clientId</td><td>String</td><td>否</td><td>客户自定义ID字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr><tr><td>beginTs</td><td>String</td><td>否</td><td>用开始时间戳筛选执行时间，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr><tr><td>endTs</td><td>String</td><td>否</td><td>用结束时间戳筛选执行时间，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr><tr><td>limit</td><td>String</td><td>否</td><td>返回结果的数量，最大为100，默认100条</td></tr><tr><td>state</td><td>String</td><td>否</td><td>移仓状态，<code>filled</code> <code>pending</code></td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "clientId": "test",
            "blockTdId": "2066393411110139648",
            "state": "filled",
            "ts": "1734085725000",
            "fromAcct": "0",
            "toAcct": "test",
            "legs": [
                {
                    "from": {
                        "posId": "2065477911110792832",
                        "instId": "BTC-USD-SWAP",
                        "px": "100123.8",
                        "side": "sell",
                        "sz": "1"
                    },
                    "to": {
                        "instId": "BTC-USD-SWAP",
                        "px": "100123.8",
                        "side": "buy",
                        "sz": "1",
                        "tdMode": "cross",
                        "posSide": "net",
                        "ccy": ""
                    }
                },
                {
                    "from": {
                        "posId": "2063533111112153856",
                        "instId": "BTC-USDT-SWAP",
                        "px": "100078.7",
                        "side": "sell",
                        "sz": "1"
                    },
                    "to": {
                        "instId": "BTC-USDT-SWAP",
                        "px": "100078.7",
                        "side": "buy",
                        "sz": "1",
                        "tdMode": "cross",
                        "posSide": "net",
                        "ccy": ""
                    }
                }
            ]
        }
   ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>clientId</td><td>String</td><td>客户自定义ID</td></tr><tr><td>blockTdId</td><td>String</td><td>大宗交易ID</td></tr><tr><td>state</td><td>String</td><td>移仓状态，<code>filled</code> <code>failed</code></td></tr><tr><td>ts</td><td>String</td><td>移仓请求处理时间戳，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr><tr><td>fromAcct</td><td>String</td><td>源账户名</td></tr><tr><td>toAcct</td><td>String</td><td>目标账户名</td></tr><tr><td>legs</td><td>Array</td><td>移仓仓位列表</td></tr><tr><td>&gt; from</td><td>Object</td><td>源账户仓位</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; posId</td><td>String</td><td>持仓ID</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>移仓价格，过去60分钟的标记价格TWAP</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>源账户的交易方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>合约数量</td></tr><tr><td>&gt; to</td><td>Object</td><td>目标账户移仓配置</td></tr><tr><td>&gt;&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt;&gt; px</td><td>String</td><td>移仓价格，过去60分钟的标记价格TWAP</td></tr><tr><td>&gt;&gt; side</td><td>String</td><td>目标账户交易方向</td></tr><tr><td>&gt;&gt; sz</td><td>String</td><td>合约数量</td></tr><tr><td>&gt;&gt; tdMode</td><td>String</td><td>目标账户的交易模式</td></tr><tr><td>&gt;&gt; posSide</td><td>String</td><td>目标账户持仓方向</td></tr><tr><td>&gt;&gt; ccy</td><td>String</td><td>保证金币种</td></tr></tbody></table>

### 设置自动赚币

开启/关闭自动赚币

#### 限速：2次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/set-auto-earn`

> 请求示例

```
// 开启自动赚币
{
   "earnType": "0",
   "ccy":"BTC",
   "action":"turn_on"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>earnType</td><td>String</td><td>否</td><td>自动赚币类型<br><code>0</code>: 自动赚币 (自动出借、自动质押)<br><code>1</code>: 自动赚币（USDG 赚币）<br>默认值为 <code>0</code></td></tr><tr><td>ccy</td><td>String</td><td>是</td><td>币种</td></tr><tr><td>action</td><td>String</td><td>是</td><td>自动赚币操作类型<br><code>turn_on</code>: 开启自动赚币<br><code>turn_off</code>: 关闭自动赚币<br><del><code>amend</code>: 修改最低年化收益率，仅适用于 earnType <code>0</code></del>（已弃用）</td></tr><tr><td>apr</td><td>String</td><td>可选</td><td><del>最低年化收益率</del>（已弃用）</td></tr></tbody></table>

> 返回结果

```
{
   "code":"0",
   "msg":"",
   "data":[
      {
         "earnType": "0",
         "ccy":"BTC",
         "action":"turn_on",
         "apr":"0.01"
      }
   ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>earnType</td><td>String</td><td>自动赚币类型<br><code>0</code>: 自动赚币 (自动出借、自动质押)<br><code>1</code>: 自动赚币（USDG 赚币）</td></tr><tr><td>ccy</td><td>String</td><td>币种</td></tr><tr><td>action</td><td>Boolean</td><td>自动赚币操作类型<br><code>turn_on</code><br><code>turn_off</code><br><del><code>amend</code></del>（已弃用）</td></tr><tr><td>apr</td><td>String</td><td><del>最低年化收益率</del>（已弃用）</td></tr></tbody></table>

### 设置结算币种

仅适用于 USD 本位合约。

#### 限速：20 次/2 秒

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/account/set-settle-currency`

> 请求示例

```
POST /api/v5/account/set-settle-currency
body
{
    "settleCcy": "USDC"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">USD 本位合约结算币种</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data" :[
          {
            "settleCcy":"USDC"
          }
    ]  
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">USD 本位合约结算币种</td></tr></tbody></table>

### 设置交易配置

#### **限速：1次/2s**

#### **限速规则：User ID**

#### **HTTP请求**

`POST /api/v5/account/set-trading-config`

> 请求示例

```
POST /api/v5/account/set-trading-config
body
{
    "type": "stgyType",
    "stgyType":"1"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>type</td><td>String</td><td>Yes</td><td>交易配置类型<br><code>stgyType</code></td></tr><tr><td>stgyType</td><td>String</td><td>No</td><td>账号策略类型<br><code>0</code>：普通策略模式<br><code>1</code>：delta 中性策略模式<br>仅适用于type为<code>stgyType</code></td></tr></tbody></table>

> 返回示例

```
{
   "code":"0",
   "msg":"",
   "data":[
      {
            "type": "stgyType",
            "stgyType":"1"
      }
   ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>type</td><td>String</td><td>交易配置类型</td></tr><tr><td>stgyType</td><td>String</td><td>账号策略类型</td></tr></tbody></table>

### 设置Delta中性预检查

#### **限速：1次/2s**

#### **限速规则：User ID**

#### **HTTP请求**

`GET /api/v5/account/precheck-set-delta-neutral`

> 请求示例

```
GET /api/v5/account/precheck-set-delta-neutral?stgyType=1
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>stgyType</td><td>String</td><td>Yes</td><td>策略类型<br><code>0</code>：普通策略模式<br><code>1</code>：delta 中性策略模式</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "unmatchedInfoCheck": [
                {
                    "posList": [],
                    "ordList": [],
                    "deltaLever": "",
                    "type": "spot_mode"
                },
               {
                    "posList": ["123","123","123"],
                    "ordList": [],
                    "deltaLever": "",
                    "type": "isolated_margin"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>unmatchedInfoCheck</td><td>Array of objects</td><td>包含不匹配信息对象的列表</td></tr><tr><td>&gt; type</td><td>String</td><td>不匹配信息类型<br><code>spot_mode</code>：delta 中性策略模式不支持现货模式<br><code>futures_mode</code>：delta 中性策略模式不支持合约模式<br><code>isolated_margin</code>：delta 中性策略模式不支持逐仓杠杆仓位<br><code>isolated_contract</code>：delta 中性策略模式不支持逐仓合约仓位<br><code>positions_options</code>：delta 中性策略模式不支持期权仓位<br><code>isolated_pending_orders</code>：delta 中性策略模式不支持逐仓挂单<br><code>pending_orders_options</code>：delta 中性策略模式不支持期权挂单<br><code>trading_bot</code>：delta 中性策略模式不支持策略交易<br><code>repay_borrowings</code>：在转换后，在目前策略下的负债量超过母账户维度借币限额，请偿还负债后重试<br><code>loan</code>：不支持delta 中性策略模式使用活期借币<br><code>delta_risk</code>：Delta风险检查失败，降低delta后重试<br><code>collateral_all</code>：delta 中性策略模式下，所有币种必要被设置为质押币<br><code>risk_unit_type</code>：该账户在Delta中性风险单元内，无法切换至通用模式。请在切换策略前将其从风险单元中移除。</td></tr><tr><td>&gt; deltaLever</td><td>String</td><td>Delta权益比率<br>仅适用于type为<code>delta_risk</code></td></tr><tr><td>&gt; ordList</td><td>Array of strings</td><td>不匹配订单列表，返回订单ID<br>在type为<code>isolated_pending_orders</code>/<code>pending_orders_options</code>时适用</td></tr><tr><td>&gt; posList</td><td>Array of strings</td><td>不匹配仓位列表，返回仓位ID<br>在type为<code>isolated_margin</code>/<code>isolated_contract</code>/<code>positions_options</code>时适用</td></tr></tbody></table>

### 调整模拟盘余额

**此接口仅适用于模拟交易环境。**

允许用户对模拟账户中特定币种（BTC、ETH、USDT、OKB）的余额进行增加或减少，以便在不同资金情况下灵活测试交易策略。

原子性操作：若请求中任意币种未通过业务校验，整个请求将被拒绝，所有币种余额均不做修改。

#### 限速：增加 — 每用户每天 3 次（UTC 0:00 重置）；减少 — 无限制

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/account/demo-adjust-balance`

> 请求示例

```
POST /api/v5/account/demo-adjust-balance
body
{
    "type": "increase",
    "adjustments": [
        { "ccy": "BTC", "amt": "0.5" },
        { "ccy": "USDT", "amt": "3000" }
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整方向。<br><code>increase</code>：增加余额<br><code>reduce</code>：减少余额<br>每次请求只能选择一个方向，不可同时包含增加和减少。</td></tr><tr><td style="text-align: left">adjustments</td><td style="text-align: left">Array</td><td style="text-align: left">是</td><td style="text-align: left">币种调整列表，至少包含一项，不允许重复币种。</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种。支持：<code>BTC</code> <code>ETH</code> <code>USDT</code> <code>OKB</code></td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整数量。必须为非负数，小数位数不超过该币种精度。<br>单次增加上限：BTC：1，ETH：1，USDT：5000，OKB：100。<br>减少操作无单次数量限制，仅受可用余额 ≥ 0 约束。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "remainCnt": "2",
        "totalCnt": "3",
        "details": [
            { "ccy": "BTC", "amt": "0.5", "bal": "1.5" },
            { "ccy": "USDT", "amt": "3000", "bal": "13000" }
        ]
    }]
}
```

> 失败示例

```
{
    "code": "59693",
    "msg": "USDT transferable balance insufficient. Some funds are occupied by open orders or positions. Please cancel orders or close positions and try again",
    "data": []
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">remainCnt</td><td style="text-align: left">String</td><td style="text-align: left">当日剩余增加余额次数。减少操作也会返回该字段，但减少操作不消耗次数。</td></tr><tr><td style="text-align: left">totalCnt</td><td style="text-align: left">String</td><td style="text-align: left">每日增加余额总次数（默认为 3）。</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array</td><td style="text-align: left">各币种操作详情。</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种。</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">实际调整数量。</td></tr><tr><td style="text-align: left">&gt; bal</td><td style="text-align: left">String</td><td style="text-align: left">操作后该币种的余额。</td></tr></tbody></table>

### 获取 GLP 当日表现

获取当前账户在所有已加入 GLP 业务线（Spot / Perp / Expiry & Nitro）的当日和月度累计（MTD）表现快照。无需请求参数，账户由 API key 自动解析。仅已加入且在有效期的 GLP 做市商账户可调用；子账户解析到其 master account。

#### 限速：5次/2s

#### 限速规则：User ID

#### 权限：读取

#### HTTP请求

`GET /api/v5/users/glp/today-performance`

> 请求示例

```
GET /api/v5/users/glp/today-performance
```

#### 请求参数

无。账户由登录态自动解析。

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "dataReady": true,
            "dataDate": "2026-07-13",
            "account": {
                "masterAccountId": "832545488879789797",
                "combinedAccountIds": ["832545488879789798"]
            },
            "programs": [
                {
                    "program": "SPOT",
                    "marketMakerBusinessId": "1",
                    "enrollmentStatus": "ENROLLED",
                    "marketMakerLevelId": "42",
                    "enrolledTierDisplay": "Tier 1 Class A",
                    "qualifyingPool": "TYPE_A",
                    "qualifyingRows": ["TOTAL"],
                    "daily": {
                        "volume": {
                            "typeA": {"maker": "1000000.00", "taker": "1000000.00"},
                            "typeBTotal": {"maker": "1000000.00", "taker": "1000000.00"},
                            "tradfiX2": {"maker": "1000000.00", "taker": "1000000.00"},
                            "total": {"maker": "2000000.00", "taker": "2000000.00"}
                        },
                        "share": {
                            "typeA": {"maker": "0.0000", "taker": "0.0000"},
                            "typeBAdj": {"maker": "0.0000", "taker": "0.0000"},
                            "total": {"maker": "0.0000", "taker": "0.0000"}
                        }
                    },
                    "mtd": {
                        "volume": {
                            "typeA": {"maker": "30000000.00", "taker": "30000000.00"},
                            "typeBTotal": {"maker": "30000000.00", "taker": "30000000.00"},
                            "tradfiX2": {"maker": "30000000.00", "taker": "30000000.00"},
                            "total": {"maker": "60000000.00", "taker": "60000000.00"}
                        },
                        "share": {
                            "typeA": {"maker": "0.0000", "taker": "0.0000"},
                            "typeBAdj": {"maker": "0.0000", "taker": "0.0000"},
                            "total": {"maker": "0.0000", "taker": "0.0000"}
                        },
                        "mtdStatus": "QUALIFIED",
                        "qualifyingShare": {"maker": "0.0000", "taker": "0.0000"}
                    }
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">dataReady</td><td style="text-align: left">Boolean</td><td style="text-align: left">该 <code>dataDate</code> 是否已有数据。为 <code>false</code> 时 <code>programs</code> 为空数组</td></tr><tr><td style="text-align: left">dataDate</td><td style="text-align: left">String</td><td style="text-align: left">数据快照日期，<code>yyyy-MM-dd</code> 格式（UTC+8）。通常为 T-1；T-1 计算未完成时回退 T-2</td></tr><tr><td style="text-align: left">account</td><td style="text-align: left">Object</td><td style="text-align: left">账户身份信息</td></tr><tr><td style="text-align: left">&gt; masterAccountId</td><td style="text-align: left">String</td><td style="text-align: left">master account ID</td></tr><tr><td style="text-align: left">&gt; combinedAccountIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">同机构组的兄弟账户 ID（不含自己）。无组则为空数组</td></tr><tr><td style="text-align: left">programs</td><td style="text-align: left">Array of objects</td><td style="text-align: left">各已加入 GLP 业务线的表现数据。<code>dataReady</code> 为 <code>false</code> 时为空数组</td></tr><tr><td style="text-align: left">&gt; program</td><td style="text-align: left">String</td><td style="text-align: left">GLP 业务线标识。<br><code>SPOT</code>：现货<br><code>PERP</code>：永续合约<br><code>FUT_NTO</code>：交割合约 &amp; Nitro</td></tr><tr><td style="text-align: left">&gt; marketMakerBusinessId</td><td style="text-align: left">String</td><td style="text-align: left">该业务线的做市商 business ID</td></tr><tr><td style="text-align: left">&gt; enrollmentStatus</td><td style="text-align: left">String</td><td style="text-align: left">加入状态。当前恒为 <code>ENROLLED</code></td></tr><tr><td style="text-align: left">&gt; marketMakerLevelId</td><td style="text-align: left">String</td><td style="text-align: left">当前档位 ID</td></tr><tr><td style="text-align: left">&gt; enrolledTierDisplay</td><td style="text-align: left">String</td><td style="text-align: left">当前档位展示名，如 <code>Tier 1 Class A</code></td></tr><tr><td style="text-align: left">&gt; qualifyingPool</td><td style="text-align: left">String</td><td style="text-align: left">决定当前档位的池。<br><code>TYPE_A</code><br><code>TYPE_B_ADJ</code><br><code>TYPE_A_AND_B</code></td></tr><tr><td style="text-align: left">&gt; qualifyingRows</td><td style="text-align: left">Array of strings</td><td style="text-align: left">合格行 key，如 <code>["TOTAL"]</code></td></tr><tr><td style="text-align: left">&gt; daily</td><td style="text-align: left">Object</td><td style="text-align: left">当日表现快照。包含 <code>volume</code> 和 <code>share</code>（结构见下方说明）</td></tr><tr><td style="text-align: left">&gt; mtd</td><td style="text-align: left">Object</td><td style="text-align: left">月度累计表现。包含 <code>volume</code>、<code>share</code>（同 <code>daily</code> 结构），以及以下额外字段</td></tr><tr><td style="text-align: left">&gt;&gt; mtdStatus</td><td style="text-align: left">String</td><td style="text-align: left">MTD 档位状态。<br><code>QUALIFIED</code>：达标<br><code>UPGRADE</code>：升档<br><code>DOWNGRADE</code>：降档</td></tr><tr><td style="text-align: left">&gt;&gt; qualifyingShare</td><td style="text-align: left">Object</td><td style="text-align: left">决定档位的池的份额。包含 <code>maker</code>（String）和 <code>taker</code>（String）</td></tr></tbody></table>

**交易量和份额结构**

`daily` 和 `mtd` 均包含 `volume`（交易量）和 `share`（份额）两个 Object。每个 Object 下含分类 key，每个分类为包含 `maker`（String）和 `taker`（String）字段的 Object。

<table><thead><tr><th style="text-align: left"><strong>分类</strong></th><th style="text-align: left"><strong>在 <code>volume</code> 中</strong></th><th style="text-align: left"><strong>在 <code>share</code> 中</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">typeA</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">Type A。<code>FUT_NTO</code> 时为 <code>null</code></td></tr><tr><td style="text-align: left">typeBTotal</td><td style="text-align: left">是</td><td style="text-align: left">否</td><td style="text-align: left">Type B 合计。<code>FUT_NTO</code> 时为 <code>null</code></td></tr><tr><td style="text-align: left">typeBAdj</td><td style="text-align: left">否</td><td style="text-align: left">是</td><td style="text-align: left">Type B 调整后。<code>FUT_NTO</code> 时为 <code>null</code></td></tr><tr><td style="text-align: left">tradfiX2</td><td style="text-align: left">是</td><td style="text-align: left">否</td><td style="text-align: left">TradFi 量（已 ×2）。<code>FUT_NTO</code> 时为 <code>null</code></td></tr><tr><td style="text-align: left">total</td><td style="text-align: left">是</td><td style="text-align: left">是</td><td style="text-align: left">各类型合计。始终存在</td></tr></tbody></table>

*   **`volume`** 值：美元名义量，String，保留 2 位小数（如 `"1000000.00"`）
*   **`share`** 值：小数字符串，4 位小数，无 `%` 后缀（如 `"0.0012"`）

### 获取 GLP 历史表现

获取单个 GLP 业务线的逐日表现记录，按日期降序排列（最新日期在前）。仅已加入且在有效期的 GLP 做市商账户可调用；子账户解析到其 master account。

#### 限速：5次/2s

#### 限速规则：User ID

#### 权限：读取

#### HTTP请求

`GET /api/v5/users/glp/historical-performance`

> 请求示例

```
GET /api/v5/users/glp/historical-performance?program=SPOT
GET /api/v5/users/glp/historical-performance?program=SPOT&begin=1751299200000&end=1753804800000&limit=31
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">program</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">GLP 业务线标识。<br><code>SPOT</code><br><code>PERP</code><br><code>FUT_NTO</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始日期过滤（含）。Unix 毫秒字符串，如 <code>"1751299200000"</code>。默认：当月 1 号（UTC+8）</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束日期过滤（含）。Unix 毫秒字符串。默认：今天（UTC+8）</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每页最大记录数。默认 <code>"31"</code>，最大 <code>"100"</code></td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "date": "2026-07-13",
            "volume": {
                "typeA": {"maker": "1000000.00", "taker": "1000000.00"},
                "typeBTotal": {"maker": "1000000.00", "taker": "1000000.00"},
                "tradfiX2": {"maker": "1000000.00", "taker": "1000000.00"},
                "total": {"maker": "2000000.00", "taker": "2000000.00"}
            },
            "share": {
                "typeA": {"maker": "0.0012", "taker": "0.0010"},
                "typeBAdj": {"maker": "0.0008", "taker": "0.0007"},
                "total": {"maker": "0.0010", "taker": "0.0009"}
            }
        },
        {
            "date": "2026-07-12",
            "volume": {
                "typeA": {"maker": "950000.00", "taker": "980000.00"},
                "typeBTotal": {"maker": "850000.00", "taker": "900000.00"},
                "tradfiX2": {"maker": "800000.00", "taker": "820000.00"},
                "total": {"maker": "1800000.00", "taker": "1880000.00"}
            },
            "share": {
                "typeA": {"maker": "0.0011", "taker": "0.0009"},
                "typeBAdj": {"maker": "0.0007", "taker": "0.0006"},
                "total": {"maker": "0.0009", "taker": "0.0008"}
            }
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">date</td><td style="text-align: left">String</td><td style="text-align: left">日期，<code>yyyy-MM-dd</code> 格式（UTC+8）</td></tr><tr><td style="text-align: left">volume</td><td style="text-align: left">Object</td><td style="text-align: left">各池类型的交易量（美元名义，2 位小数）。结构同当日表现接口的 <code>daily.volume</code></td></tr><tr><td style="text-align: left">share</td><td style="text-align: left">Object</td><td style="text-align: left">各池类型的市场份额（小数字符串，4 位小数，无 <code>%</code> 后缀）。结构同当日表现接口的 <code>daily.share</code></td></tr></tbody></table>

**错误码**

<table><thead><tr><th style="text-align: left">错误码</th><th style="text-align: left">HTTP 状态码</th><th style="text-align: left">错误提示</th></tr></thead><tbody><tr><td style="text-align: left">50030</td><td style="text-align: left">200</td><td style="text-align: left">您无权使用此 API 端点</td></tr><tr><td style="text-align: left">50014</td><td style="text-align: left">200</td><td style="text-align: left">参数 {param0} 不能为空</td></tr><tr><td style="text-align: left">51000</td><td style="text-align: left">200</td><td style="text-align: left">参数错误</td></tr><tr><td style="text-align: left">50016</td><td style="text-align: left">200</td><td style="text-align: left">参数 {param0} 与参数 {param1} 不匹配</td></tr></tbody></table>

## WebSocket

### 账户频道

获取账户信息，首次订阅按照订阅维度推送数据，此外，当下单、撤单、成交等事件触发时，推送数据以及按照订阅维度定时推送数据  

该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "account",
        "ccy": "BTC"
    }]
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "account",
        "ccy": "BTC"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [
    {
      "channel": "account",
      "extraParams": "
        {
          \"updateInterval\": \"0\"
        }
      "
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "account",
          "extraParams": "{\"updateInterval\": \"0\"}"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>account</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt; extraParams</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">额外配置</td></tr><tr><td style="text-align: left">&gt;&gt; updateInterval</td><td style="text-align: left">int</td><td style="text-align: left">否</td><td style="text-align: left"><code>0</code>: 仅根据账户事件推送数据<br>若不添加该字段或将其设置为除0外的其他值，数据将根据事件推送并定时推送。<br>使用该字段需严格遵守以下格式。<br>"extraParams": "<br>{<br>\"updateInterval\": \"0\"<br>}<br>"</td></tr></tbody></table>

> 成功返回示例：单个

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "account",
        "ccy": "BTC"
    },
  "connId": "a4d3ae55"
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def privateCallback(message):
    print(message)

async def main():
    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{"channel": "account"}]

    await ws.subscribe(args, callback=privateCallback)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=privateCallback)
    await asyncio.sleep(10)

asyncio.run(main())
```

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "account"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"account\", \"ccy\" : \"BTC\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>account</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "account",
        "uid": "44*********584"
    },
    "eventType": "snapshot",
    "curPage": 1,
    "lastPage": true,
    "data": [{
        "adjEq": "55444.12216906034",
        "availEq": "55444.12216906034",
        "borrowFroz": "0",
        "delta": "0",
        "deltaLever": "0",
        "deltaNeutralStatus": "0",
        "details": [{
            "availBal": "4734.371190691436",
            "availEq": "4734.371190691435",
            "borrowFroz": "0",
            "cashBal": "4750.426970691436",
            "ccy": "USDT",
            "coinUsdPrice": "0.99927",
            "crossLiab": "0",
            "colRes": "0",
            "collateralEnabled": false,
            "collateralRestrict": false, // 已弃用，请使用colRes
            "colBorrAutoConversion": "0",
            "disEq": "4889.379316336831",
            "eq": "4892.951170691435",
            "eqUsd": "4889.379316336831",
            "smtSyncEq": "0",
            "spotCopyTradingEq": "0",
            "fixedBal": "0",
            "frozenBal": "158.57998",
            "imr": "",
            "interest": "0",
            "isoEq": "0",
            "isoLiab": "0",
            "isoUpl": "0",
            "liab": "0",
            "maxLoan": "0",
            "mgnRatio": "",
            "mmr": "",
            "notionalLever": "",
            "ordFrozen": "0",
            "rewardBal": "0",
            "spotInUseAmt": "",
            "clSpotInUseAmt": "",
            "maxSpotInUseAmt": "",          
            "spotIsoBal": "0",
            "stgyEq": "150",
            "twap": "0",
            "uTime": "1705564213903",
            "upl": "-7.475800000000003",
            "uplLiab": "0",
            "spotBal": "",
            "openAvgPx": "",
            "accAvgPx": "",
            "spotUpl": "",
            "spotUplRatio": "",
            "totalPnl": "",
            "totalPnlRatio": ""
        }],
        "imr": "0",
        "isoEq": "0",
        "mgnRatio": "",
        "mmr": "0",
        "notionalUsd": "0",
        "notionalUsdForBorrow": "0",
        "notionalUsdForFutures": "0",
        "notionalUsdForOption": "0",
        "notionalUsdForSwap": "0",
        "ordFroz": "0",
        "totalEq": "55868.06403501676",
        "uTime": "1705564223311",
        "upl": "0"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">请求订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">eventType</td><td style="text-align: left">String</td><td style="text-align: left">事件类型：<br><code>snapshot</code>: 首推及定时快照推送<br><code>event_update</code>：事件推送</td></tr><tr><td style="text-align: left">curPage</td><td style="text-align: left">Integer</td><td style="text-align: left">当前消息分页页数<br>仅适用于<code>snapshot</code>事件类型，<code>event_update</code>时不返回。</td></tr><tr><td style="text-align: left">lastPage</td><td style="text-align: left">Boolean</td><td style="text-align: left">当前消息是否为最后一页：<br><code>true</code><br><code>false</code><br>仅适用于<code>snapshot</code>事件类型，<code>event_update</code>时不返回.</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">获取账户信息的最新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; totalEq</td><td style="text-align: left">String</td><td style="text-align: left">美金层面权益</td></tr><tr><td style="text-align: left">&gt; isoEq</td><td style="text-align: left">String</td><td style="text-align: left">美金层面逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; adjEq</td><td style="text-align: left">String</td><td style="text-align: left">美金层面有效保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; availEq</td><td style="text-align: left">String</td><td style="text-align: left">账户美金层面可用保证金，排除因总质押借币上限而被限制的币种<br>适用于<code>跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; ordFroz</td><td style="text-align: left">String</td><td style="text-align: left">美金层面全仓挂单占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">美金层面占用保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; mmr</td><td style="text-align: left">String</td><td style="text-align: left">美金层面维持保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; borrowFroz</td><td style="text-align: left">String</td><td style="text-align: left">账户美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">美金层面维持保证金率<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">以美金价值为单位的持仓数量，即仓位美金价值<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; notionalUsdForBorrow</td><td style="text-align: left">String</td><td style="text-align: left">借币金额（美元价值）<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; notionalUsdForSwap</td><td style="text-align: left">String</td><td style="text-align: left">永续合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; notionalUsdForFutures</td><td style="text-align: left">String</td><td style="text-align: left">交割合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; notionalUsdForOption</td><td style="text-align: left">String</td><td style="text-align: left">期权持仓美元价值<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; upl</td><td style="text-align: left">String</td><td style="text-align: left">账户层面全仓未实现盈亏（美元单位）<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; delta</td><td style="text-align: left">String</td><td style="text-align: left">Delta (USD)</td></tr><tr><td style="text-align: left">&gt; deltaLever</td><td style="text-align: left">String</td><td style="text-align: left">Delta权益比率<br>deltaLever = delta/totalEq</td></tr><tr><td style="text-align: left">&gt; deltaNeutralStatus</td><td style="text-align: left">String</td><td style="text-align: left">Delta 风险状态<br><code>0</code>: 普通<br><code>1</code>: 限制划转<br><code>2</code>: 仅支持降低 Delta - 相同基础货币的现货、交割和永续合约视为同一标的资产。同一标的资产内，仅能新下一笔降低 Delta 值的订单，且下单时不应存在其他挂单。如果触发此限制，且您的账户 Delta 大于 500,000 USD，您的所有限价、市价、高级限价单挂单将被撤销。</td></tr><tr><td style="text-align: left">&gt; details</td><td style="text-align: left">Array</td><td style="text-align: left">各币种资产详细信息</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt;&gt; eq</td><td style="text-align: left">String</td><td style="text-align: left">币种总权益</td></tr><tr><td style="text-align: left">&gt;&gt; cashBal</td><td style="text-align: left">String</td><td style="text-align: left">币种余额</td></tr><tr><td style="text-align: left">&gt;&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">币种余额信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt;&gt; isoEq</td><td style="text-align: left">String</td><td style="text-align: left">币种逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; availEq</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; disEq</td><td style="text-align: left">String</td><td style="text-align: left">美金层面币种折算权益</td></tr><tr><td style="text-align: left">&gt;&gt; fixedBal</td><td style="text-align: left">String</td><td style="text-align: left">抄底宝、逃顶宝功能的币种冻结金额</td></tr><tr><td style="text-align: left">&gt;&gt; availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用余额</td></tr><tr><td style="text-align: left">&gt;&gt; frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">币种占用金额</td></tr><tr><td style="text-align: left">&gt;&gt; ordFrozen</td><td style="text-align: left">String</td><td style="text-align: left">挂单冻结数量<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; liab</td><td style="text-align: left">String</td><td style="text-align: left">币种负债额<br>值为正数，如 <code>21625.64</code><br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; uplLiab</td><td style="text-align: left">String</td><td style="text-align: left">由于仓位未实现亏损导致的负债<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; crossLiab</td><td style="text-align: left">String</td><td style="text-align: left">币种全仓负债额<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; isoLiab</td><td style="text-align: left">String</td><td style="text-align: left">币种逐仓负债额<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; rewardBal</td><td style="text-align: left">String</td><td style="text-align: left">体验金余额</td></tr><tr><td style="text-align: left">&gt;&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">币种全仓维持保证金率，衡量账户内某项资产风险的指标<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td style="text-align: left">&gt;&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">币种维度全仓占用保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td style="text-align: left">&gt;&gt; mmr</td><td style="text-align: left">String</td><td style="text-align: left">币种维度全仓维持保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td style="text-align: left">&gt;&gt; interest</td><td style="text-align: left">String</td><td style="text-align: left">计息<br>值为正数，如 <code>9.01</code><br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; twap</td><td style="text-align: left">String</td><td style="text-align: left">当前负债币种触发自动换币的风险<br>0、1、2、3、4、5其中之一，数字越大代表您的负债币种触发自动换币概率越高<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; frpType</td><td style="text-align: left">String</td><td style="text-align: left">自动换币类型<br><code>0</code>：未发生自动换币<br><code>1</code>：基于用户的自动换币<br><code>2</code>：基于平台借币限额的自动换币<br><br>当twap&gt;=1时返回1或2代表自动换币风险类型，适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; maxLoan</td><td style="text-align: left">String</td><td style="text-align: left">币种最大可借<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code> 的全仓</td></tr><tr><td style="text-align: left">&gt;&gt; eqUsd</td><td style="text-align: left">String</td><td style="text-align: left">币种权益美金价值</td></tr><tr><td style="text-align: left">&gt;&gt; notionalLever</td><td style="text-align: left">String</td><td style="text-align: left">币种杠杆倍数<br>适用于<code>合约模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; coinUsdPrice</td><td style="text-align: left">String</td><td style="text-align: left">币种美元指数</td></tr><tr><td style="text-align: left">&gt;&gt; stgyEq</td><td style="text-align: left">String</td><td style="text-align: left">策略权益</td></tr><tr><td style="text-align: left">&gt;&gt; isoUpl</td><td style="text-align: left">String</td><td style="text-align: left">逐仓未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; borrowFroz</td><td style="text-align: left">String</td><td style="text-align: left">币种美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td style="text-align: left">&gt;&gt; spotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; clSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; maxSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">系统计算得到的最大可能现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; spotIsoBal</td><td style="text-align: left">String</td><td style="text-align: left">现货逐仓余额<br>仅适用于现货带单/跟单<br>适用于<code>现货模式</code>/<code>合约模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; smtSyncEq</td><td style="text-align: left">String</td><td style="text-align: left">合约智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td style="text-align: left">&gt;&gt; spotCopyTradingEq</td><td style="text-align: left">String</td><td style="text-align: left">现货智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td style="text-align: left">&gt;&gt; spotBal</td><td style="text-align: left">String</td><td style="text-align: left">现货余额 ，单位为 币种，比如 BTC。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">现货开仓成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; accAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">现货累计成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; spotUpl</td><td style="text-align: left">String</td><td style="text-align: left">现货未实现收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; spotUplRatio</td><td style="text-align: left">String</td><td style="text-align: left">现货未实现收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">现货累计收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; totalPnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">现货累计收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td style="text-align: left">&gt;&gt; colRes</td><td style="text-align: left">String</td><td style="text-align: left">平台维度质押限制状态<br><code>0</code>：限制未触发<br><code>1</code>：限制未触发，但该币种接近平台质押上限<br><code>2</code>：限制已触发。该币种不可用作新订单的保证金，这可能会导致下单失败。但它仍会被计入账户有效保证金，保证金率不会收到影响。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td style="text-align: left">&gt;&gt; colBorrAutoConversion</td><td style="text-align: left">String</td><td style="text-align: left">基于平台质押借币限额的自动换币风险指标。分为1-5多个等级，数字越大，触发自动换币的可能性越大。默认值为0，表示当前无风险。5表示该用户正在进行自动换币，4代表该用户即将被进行自动换币，1/2/3表示存在自动换币风险。<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code><br>当某币种的全平台质押借币量超出平台总上限一定比例时，对于质押该币种且借币量较大的用户，平台将通过自动换币降低质押借币风险。请减少该币种的质押数量或偿还负债，以降低风险。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td style="text-align: left">&gt;&gt; collateralRestrict</td><td style="text-align: left">Boolean</td><td style="text-align: left"><del>平台维度的质押借币限制<br><code>true</code><br><code>false</code></del>（已弃用，请使用colRes）</td></tr><tr><td style="text-align: left">&gt;&gt; collateralEnabled</td><td style="text-align: left">Boolean</td><td style="text-align: left"><code>true</code>：质押币<br><code>false</code>：非质押币<br>适用于`跨币种保证金模式</td></tr></tbody></table>

::: tip
\- 账户频道基于事件推送，并进行定时推送  
\- 账户频道的事件推送并非在事件发生时实时进行，而是按照大约50毫秒的固定时间窗口进行聚合推送。例如，在固定时间窗口内发生多个事件，系统将尽量聚合为一条消息并在固定时间窗口结束时进行推送。在数据量过大的情况下可能拆分为多条消息。  
\- 无论是否有账户维度的变化，定时推送都会发送更新
:::

::: tip
\- 只推用户币种层面资产不为0的账户信息。币种层面资产不为0的定义：eq、availEq、availBal 中任意一个字段不为0，即币种层面资产不为0。如果数据太大无法在单个推送消息中发送，它将被分成多个消息发送。  
\- 例：按照所有币种订阅且有5个币种的余额或者权益都不为0，首次和定时推全部5个；账户下有一个币种余额或者权益改变，那么账户变更的触发只推这一个。
:::

### 持仓频道

获取持仓信息，首次订阅按照订阅维度推送数据，此外，当下单、撤单等事件触发时，推送数据以及按照订阅维度定时推送数据  
该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "positions",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "positions",
          "instType": "FUTURES",
          "instFamily": "BTC-USD"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [
        {
            "channel": "positions",
            "instType": "ANY",
            "extraParams": "
                {
                    \"updateInterval\": \"0\"
                }
            "
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
            "channel": "positions",
            "instType": "ANY",
            "extraParams": "{\"updateInterval\": \"0\"}"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>positions</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID<br>如果同时传了 instId 和 instFamily，instId 将被使用</td></tr><tr><td style="text-align: left">&gt; extraParams</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">额外配置</td></tr><tr><td style="text-align: left">&gt;&gt; updateInterval</td><td style="text-align: left">int</td><td>否</td><td style="text-align: left"><code>0</code>: 仅根据持仓事件推送数据<br><code>2000, 3000, 4000</code>: 根据持仓事件推送，且根据设置的时间间隔定时推送（ms）<br><br>若不添加该字段或将其设置为上述合法值以外的其他值，数据将根据事件推送并大约每 5 秒定期推送一次。<br><br>使用该字段需严格遵守以下格式。<br>"extraParams": "<br>{<br>\"updateInterval\": \"0\"<br>}<br>"</td></tr></tbody></table>

> 成功返回示例：单个

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "positions",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
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
        "channel": "positions",
        "instType": "ANY"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"positions\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg":{
        "channel":"positions",
        "uid": "77982378738415879",
        "instType":"FUTURES"
    },
    "eventType": "snapshot",
    "curPage": 1,
    "lastPage": true,
    "data":[
        {
            "adl":"1",
            "availPos":"1",
            "avgPx":"2566.31",
            "cTime":"1619507758793",
            "ccy":"ETH",
            "deltaBS":"",
            "deltaPA":"",
            "gammaBS":"",
            "gammaPA":"",
            "hedgedPos": "",
            "imr":"",
            "instId":"ETH-USD-210430",
            "instType":"FUTURES",
            "interest":"0",
            "idxPx":"2566.13",
            "last":"2566.22",
            "lever":"10",
            "liab":"",
            "liabCcy":"",
            "liqPx":"2352.8496681818233",
            "markPx":"2353.849",
            "margin":"0.0003896645377994",
            "mgnMode":"isolated",
            "mgnRatio":"11.731726509588816",
            "mmr":"0.0000311811092368",
            "notionalUsd":"2276.2546609009605",
            "optVal":"",
            "pTime":"1619507761462",
            "pendingCloseOrdLiabVal":"0.1",
            "pos":"1",
            "baseBorrowed": "",
            "baseInterest": "",
            "quoteBorrowed": "",
            "quoteInterest": "",
            "posCcy":"",
            "posId":"307173036051017730",
            "posSide":"long",
            "spotInUseAmt": "",
            "clSpotInUseAmt": "",
            "maxSpotInUseAmt": "",
            "spotInUseCcy": "",
            "bizRefId": "",
            "bizRefType": "",
            "thetaBS":"",
            "thetaPA":"",
            "tradeId":"109844",
            "uTime":"1619507761462",
            "upl":"-0.0000009932766034",
            "uplLastPx":"-0.0000009932766034",
            "uplRatio":"-0.0025490556801078",
            "uplRatioLastPx":"-0.0025490556801078",
            "vegaBS":"",
            "vegaPA":"",
            "realizedPnl":"0.001",
            "pnl":"0.0011",
            "fee":"-0.0001",
            "fundingFee":"0",
            "liqPenalty":"0",
            "nonSettleAvgPx":"",
            "settledPnl":"",
            "closeOrderAlgo":[
                {
                    "algoId":"123",
                    "slTriggerPx":"123",
                    "slTriggerPxType":"mark",
                    "tpTriggerPx":"123",
                    "tpTriggerPxType":"mark",
                    "closeFraction":"0.6"
                },
                {
                    "algoId":"123",
                    "slTriggerPx":"123",
                    "slTriggerPxType":"mark",
                    "tpTriggerPx":"123",
                    "tpTriggerPxType":"mark",
                    "closeFraction":"0.4"
                }
            ]
        }
    ]
}
```

> 推送示例

```
{
    "arg": {
        "channel": "positions",
        "uid": "77982378738415879",
        "instType": "ANY"
    },
    "eventType": "snapshot",
    "curPage": 1,
    "lastPage": true,
    "data": [{
        "adl": "1",
        "availPos": "1",
        "avgPx": "2566.31",
        "cTime": "1619507758793",
        "ccy": "ETH",
        "deltaBS": "",
        "deltaPA": "",
        "gammaBS": "",
        "gammaPA": "",
        "hedgedPos": "",
        "imr": "",
        "instId": "ETH-USD-210430",
        "instType": "FUTURES",
        "interest": "0",
        "idxPx": "2566.13",
        "last": "2566.22",
        "usdPx": "",
        "bePx": "2353.949",
        "lever": "10",
        "liab": "",
        "liabCcy": "",
        "liqPx": "2352.8496681818233",
        "markPx": "2353.849",
        "margin": "0.0003896645377994",
        "mgnMode": "isolated",
        "mgnRatio": "11.731726509588816",
        "mmr": "0.0000311811092368",
        "notionalUsd": "2276.2546609009605",
        "optVal": "",
        "pendingCloseOrdLiabVal": "0.1",
        "pTime": "1619507761462",
        "pos": "1",
        "baseBorrowed": "",
        "baseInterest": "",
        "quoteBorrowed": "",
        "quoteInterest": "",
        "posCcy": "",
        "posId": "307173036051017730",
        "posSide": "long",
        "spotInUseAmt": "",
        "clSpotInUseAmt": "",
        "maxSpotInUseAmt": "",
        "spotInUseCcy": "",
        "bizRefId": "",
        "bizRefType": "",
        "thetaBS": "",
        "thetaPA": "",
        "tradeId": "109844",
        "uTime": "1619507761462",
        "upl": "-0.0000009932766034",
        "uplLastPx": "-0.0000009932766034",
        "uplRatio": "-0.0025490556801078",
        "uplRatioLastPx": "-0.0025490556801078",
        "vegaBS": "",
        "vegaPA": "",
        "realizedPnl": "0.001",
        "pnl": "0.0011",
        "fee": "-0.0001",
        "fundingFee": "0",
        "liqPenalty": "0",
        "nonSettleAvgPx": "",
        "settledPnl": "",
        "closeOrderAlgo": [{
                "algoId": "123",
                "slTriggerPx": "123",
                "slTriggerPxType": "mark",
                "tpTriggerPx": "123",
                "tpTriggerPxType": "mark",
                "closeFraction": "0.6"
            },
            {
                "algoId": "123",
                "slTriggerPx": "123",
                "slTriggerPxType": "mark",
                "tpTriggerPx": "123",
                "tpTriggerPxType": "mark",
                "closeFraction": "0.4"
            }
        ]
    }, {
        "adl": "1",
        "availPos": "1",
        "avgPx": "2566.31",
        "cTime": "1619507758793",
        "ccy": "ETH",
        "deltaBS": "",
        "deltaPA": "",
        "gammaBS": "",
        "gammaPA": "",
        "imr": "",
        "hedgedPos": "",
        "instId": "ETH-USD-SWAP",
        "instType": "SWAP",
        "interest": "0",
        "idxPx": "2566.13",
        "last": "2566.22",
        "usdPx": "",
        "bePx": "2353.949",
        "lever": "10",
        "liab": "",
        "liabCcy": "",
        "liqPx": "2352.8496681818233",
        "markPx": "2353.849",
        "margin": "0.0003896645377994",
        "mgnMode": "isolated",
        "mgnRatio": "11.731726509588816",
        "mmr": "0.0000311811092368",
        "notionalUsd": "2276.2546609009605",
        "optVal": "",
        "pendingCloseOrdLiabVal": "0.1",
        "pTime": "1619507761462",
        "pos": "1",
        "baseBorrowed": "",
        "baseInterest": "",
        "quoteBorrowed": "",
        "quoteInterest": "",
        "posCcy": "",
        "posId": "307173036051017730",
        "posSide": "long",
        "spotInUseAmt": "",
        "clSpotInUseAmt": "",
        "maxSpotInUseAmt": "",
        "spotInUseCcy": "",
        "bizRefId": "",
        "bizRefType": "",
        "thetaBS": "",
        "thetaPA": "",
        "tradeId": "109844",
        "uTime": "1619507761462",
        "upl": "-0.0000009932766034",
        "uplLastPx": "-0.0000009932766034",
        "uplRatio": "-0.0025490556801078",
        "uplRatioLastPx": "-0.0025490556801078",
        "vegaBS": "",
        "vegaPA": "",
        "realizedPnl": "0.001",
        "pnl": "0.0011",
        "fee": "-0.0001",
        "fundingFee": "0",
        "liqPenalty": "0",
        "nonSettleAvgPx": "",
        "settledPnl": "",
        "closeOrderAlgo": [{
                "algoId": "123",
                "slTriggerPx": "123",
                "slTriggerPxType": "mark",
                "tpTriggerPx": "123",
                "tpTriggerPxType": "mark",
                "closeFraction": "0.6"
            },
            {
                "algoId": "123",
                "slTriggerPx": "123",
                "slTriggerPxType": "mark",
                "tpTriggerPx": "123",
                "tpTriggerPxType": "mark",
                "closeFraction": "0.4"
            }
        ]
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">eventType</td><td style="text-align: left">String</td><td style="text-align: left">事件类型：<br><code>snapshot</code>: 首推及定时快照推送<br><code>event_update</code>：事件推送</td></tr><tr><td style="text-align: left">curPage</td><td style="text-align: left">Integer</td><td style="text-align: left">当前消息分页页数<br>仅适用于<code>snapshot</code>事件类型，<code>event_update</code>时不返回。</td></tr><tr><td style="text-align: left">lastPage</td><td style="text-align: left">Boolean</td><td style="text-align: left">当前消息是否为最后一页：<br><code>true</code><br><code>false</code><br>仅适用于<code>snapshot</code>事件类型，<code>event_update</code>时不返回.</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式， <code>cross</code>：全仓 <code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">&gt; posId</td><td style="text-align: left">String</td><td style="text-align: left">持仓ID</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式（<code>交割</code>/<code>永续</code>/<code>期权</code>：<code>pos</code>为正代表开多，<code>pos</code>为负代表开空。<code>币币杠杆</code>：<code>posCcy</code>为交易货币时，代表开多；<code>posCcy</code>为计价货币时，代表开空。）</td></tr><tr><td style="text-align: left">&gt; pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量，逐仓自主划转模式下，转入保证金后会产生pos为<code>0</code>的仓位</td></tr><tr><td style="text-align: left">&gt; hedgedPos</td><td style="text-align: left">String</td><td style="text-align: left">对冲持仓数量<br>仅在delta 中性策略模式的账户返回stgyType:1，对普通策略模式的账户返回""</td></tr><tr><td style="text-align: left">&gt; baseBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币余额，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; quoteBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币余额 ，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; baseBorrowed</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币已借，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; baseInterest</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币计息，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; quoteBorrowed</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币已借，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; quoteInterest</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币计息，适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; posCcy</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量币种，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; availPos</td><td style="text-align: left">String</td><td style="text-align: left">可平仓数量，适用于 <code>币币杠杆</code>,<code>期权</code><br>对于杠杆仓位，平仓时，杠杆还清负债后，余下的部分会视为币币交易，如果想要减少币币交易的数量，可通过"获取最大可用数量"接口获取只减仓的可用数量。</td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓平均价</td></tr><tr><td style="text-align: left">&gt; upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益（以标记价格计算）</td></tr><tr><td style="text-align: left">&gt; uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率（以标记价格计算</td></tr><tr><td style="text-align: left">&gt; uplLastPx</td><td style="text-align: left">String</td><td style="text-align: left">以最新成交价格计算的未实现收益，主要做展示使用，实际值还是 upl</td></tr><tr><td style="text-align: left">&gt; uplRatioLastPx</td><td style="text-align: left">String</td><td style="text-align: left">以最新成交价格计算的未实现收益率</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，不适用于<code>期权卖方</code></td></tr><tr><td style="text-align: left">&gt; liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价<br>不适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">最新标记价格</td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">初始保证金，仅适用于<code>全仓</code></td></tr><tr><td style="text-align: left">&gt; margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金余额，仅适用于<code>逐仓</code>，可增减</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">&gt; mmr</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金</td></tr><tr><td style="text-align: left">&gt; liab</td><td style="text-align: left">String</td><td style="text-align: left">负债额，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; liabCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; interest</td><td style="text-align: left">String</td><td style="text-align: left">利息，已经生成未扣利息</td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">以美金价值为单位的持仓数量</td></tr><tr><td style="text-align: left">&gt; optVal</td><td style="text-align: left">String</td><td style="text-align: left">期权价值，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; pendingCloseOrdLiabVal</td><td style="text-align: left">String</td><td style="text-align: left">逐仓杠杆负债对应平仓挂单的数量</td></tr><tr><td style="text-align: left">&gt; adl</td><td style="text-align: left">String</td><td style="text-align: left">自动减仓信号区，分为6档，从0到5，数字越小代表adl强度越弱<br>仅适用于<code>交割/永续/期权</code></td></tr><tr><td style="text-align: left">&gt; bizRefId</td><td style="text-align: left">String</td><td style="text-align: left">外部业务id，如 体验券id</td></tr><tr><td style="text-align: left">&gt; bizRefType</td><td style="text-align: left">String</td><td style="text-align: left">外部业务类型</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金的币种</td></tr><tr><td style="text-align: left">&gt; last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">&gt; idxPx</td><td style="text-align: left">String</td><td style="text-align: left">最新指数价格</td></tr><tr><td style="text-align: left">&gt; usdPx</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种的市场最新美金价格 仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; bePx</td><td style="text-align: left">String</td><td style="text-align: left">盈亏平衡价</td></tr><tr><td style="text-align: left">&gt; deltaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位delta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; deltaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位delta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; gammaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位gamma，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; gammaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位gamma，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; thetaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位theta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; thetaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位theta，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; vegaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位持仓仓位vega，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; vegaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位持仓仓位vega，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; spotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; clSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; maxSpotInUseAmt</td><td style="text-align: left">String</td><td style="text-align: left">系统计算得到的最大可能现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; spotInUseCcy</td><td style="text-align: left">String</td><td style="text-align: left">现货对冲占用币种，如 <code>BTC</code><br>适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现收益<br>仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code><br>realizedPnl=pnl+fee+fundingFee+liqPenalty+settledPnl</td></tr><tr><td style="text-align: left">&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">平仓订单累计收益额(不包括手续费)</td></tr><tr><td style="text-align: left">&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，正数代表平台返佣 ，负数代表平台扣除</td></tr><tr><td style="text-align: left">&gt; fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用</td></tr><tr><td style="text-align: left">&gt; liqPenalty</td><td style="text-align: left">String</td><td style="text-align: left">累计爆仓罚金，有值时为负数。</td></tr><tr><td style="text-align: left">&gt; closeOrderAlgo</td><td style="text-align: left">Array of objects</td><td style="text-align: left">平仓策略委托订单。调用策略委托下单，且<code>closeFraction</code>=1 时，该数组才会有值。</td></tr><tr><td style="text-align: left">&gt;&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">持仓创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">最近一次持仓更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">持仓信息的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; nonSettleAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">未结算均价<br>不受结算影响的加权开仓价格，仅在新增头寸时更新，和开仓均价的主要区别在于是否受到结算影响。<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">&gt; settledPnl</td><td style="text-align: left">String</td><td style="text-align: left">累计已结算收益（以结算价格计算）<br>适用于<code>全仓</code><code>交割</code></td></tr></tbody></table>

::: tip
\- 持仓频道基于事件推送，并进行定时推送。  
\- 持仓频道的事件推送并非在事件发生时实时进行，而是按照大约50毫秒的固定时间窗口进行聚合推送。例如，在固定时间窗口内发生多个事件，系统将尽量聚合为一条消息并在固定时间窗口结束时进行推送。在数据量过大的情况下可能拆分为多条消息。  
\- 无论是否有仓位的变化，定时推送都会发送更新。  
\- 若事件推送和定时推送同时发生，系统将在发送一次事件推送消息后再发送一次定时推送消息。
:::

::: tip
Portfolio Margin 账户下，持仓的 IMR MMR的数据是后端服务以ristUnit为最小粒度重新计算，相同riskUnit全仓仓位的imr和mmr返回值相同。
:::

::: tip
逐仓交易设置里是自主划转模式，转入保证金后会推送持仓量为0的仓位。
:::

::: tip
\- 只推用户持有的仓位。用户持仓仓位定义：持逐仓自主划转模式下的逐仓仓位pos=0，pos>0或者pos<0都认为持有仓位。如果数据太大无法在单个推送消息中发送，它将被分成多个消息发送。  
\- 例：按underlying订阅且该underlying下有20个持仓，首次和定时推全部20个；持仓下有一个成交改变其中的一个持仓，那么持仓变更只推这一个。
:::

::: tip
与交割合约不同，期权持仓到期之后，期权持仓在到期后会自动行权或作废，持仓本身随即消失，因此，该频道不会推送期权到期的信息。
:::

### 账户余额和持仓频道

获取账户余额和持仓信息，首次订阅按照订阅维度推送数据，此外，当成交、资金划转等事件触发时，推送数据。  

该频道适用于尽快获取账户现金余额和仓位资产变化的信息。  
该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "balance_and_position"
    }]
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "balance_and_position"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>balance_and_position</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "balance_and_position"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"balance_and_position\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>balance_and_position</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "balance_and_position",
        "uid": "77982378738415879"
    },
    "data": [{
        "pTime": "1597026383085",
        "eventType": "snapshot",
        "balData": [{
            "ccy": "BTC",
            "cashBal": "1",
            "uTime": "1597026383085"
        }],
        "posData": [{
            "posId": "1111111111",
            "tradeId": "2",
            "instId": "BTC-USD-191018",
            "instType": "FUTURES",
            "mgnMode": "cross",
            "posSide": "long",
            "pos": "10",
            "ccy": "BTC",
            "posCcy": "",
            "avgPx": "3320",
            "nonSettleAvgPx": "",
            "settledPnl": "",
            "uTime": "1597026383085"
        }],
        "trades": [{
            "instId": "BTC-USD-191018",
            "tradeId": "2",
        }]
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">请求订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; eventType</td><td style="text-align: left">String</td><td style="text-align: left">事件类型<br><code>snapshot</code>：首推快照<br><code>delivered</code>：交割<br><code>exercised</code>：行权<br><code>transferred</code>：划转<br><code>filled</code>：成交<br><code>liquidation</code>：强平<br><code>claw_back</code>：穿仓补偿<br><code>adl</code>：ADL自动减仓<br><code>funding_fee</code>：资金费<br><code>adjust_margin</code>：调整保证金<br><code>set_leverage</code>：设置杠杆<br><code>interest_deduction</code>：扣息<br><code>settlement</code>：交割结算</td></tr><tr><td style="text-align: left">&gt; balData</td><td style="text-align: left">String</td><td style="text-align: left">余额数据</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt;&gt; cashBal</td><td style="text-align: left">String</td><td style="text-align: left">币种余额</td></tr><tr><td style="text-align: left">&gt;&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">币种余额信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; posData</td><td style="text-align: left">String</td><td style="text-align: left">持仓数据</td></tr><tr><td style="text-align: left">&gt;&gt; posId</td><td style="text-align: left">String</td><td style="text-align: left">持仓ID</td></tr><tr><td style="text-align: left">&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品ID，如 <code>BTC-USD-180213</code></td></tr><tr><td style="text-align: left">&gt;&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">交易产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">&gt;&gt; mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>isolated</code>, <code>cross</code></td></tr><tr><td style="text-align: left">&gt;&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓平均价</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金的币种</td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>，<code>short</code>，<code>net</code></td></tr><tr><td style="text-align: left">&gt;&gt; pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量，逐仓自主划转模式下，转入保证金后会产生pos为<code>0</code>的仓位</td></tr><tr><td style="text-align: left">&gt;&gt; baseBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>交易币余额<br>适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt;&gt; quoteBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>计价币余额<br>适用于 <code>币币杠杆</code>（逐仓一键借币模式）</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt;&gt; posCcy</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量币种<br>只适用于币币杠杆仓位。当是交割、永续、期权持仓时，该字段返回“”</td></tr><tr><td style="text-align: left">&gt;&gt; nonSettleAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">未结算均价<br>不受结算影响的加权开仓价格，仅在新增头寸时更新，和开仓均价的主要区别在于是否受到结算影响。<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">&gt;&gt; settledPnl</td><td style="text-align: left">String</td><td style="text-align: left">累计已结算收益（以结算价格计算）<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">&gt;&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">仓位信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; trades</td><td style="text-align: left">Array of objects</td><td style="text-align: left">成交数据</td></tr><tr><td style="text-align: left">&gt;&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt;&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr></tbody></table>

::: tip
只有账户余额变化，只推balData；只有持仓余额发生变化，只推posData。
:::

::: tip
\- 首次推送，只推用户持有的仓位和币种余额不为0的信息。如果数据太大无法在单个推送消息中发送，它将被分成多个消息发送。  
\- 例：比如按照所有币种订阅且用户有5个币种余额不为0 和20个仓位，那么首推全部5个币种余额列表和20个持仓信息列表；某个订单成交后，那么只推一个币种余额和对应的持仓信息。
:::

### 爆仓风险预警推送频道

此推送频道仅作为风险提示，不建议作为策略交易的风险判断。  
在行情剧烈波动的情况下，可能会出现此消息推送的同时仓位已经被强平的可能性。  
预警会在某一个逐仓仓位有风险时推送。预警会在所有全仓仓位有风险时推送。  
该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "liquidation-warning",
        "instType": "ANY"
    }]
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "liquidation-warning",
          "instType": "ANY"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>liquidation-warning</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "liquidation-warning",
    "instType": "ANY"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"liquidation-warning\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名 ，<code>liquidation-warning</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg":{
        "channel":"liquidation-warning",
        "uid": "77982378738415879",
        "instType":"FUTURES"
    },
    "data":[
        {
            "cTime":"1619507758793",
            "ccy":"ETH",
            "instId":"ETH-USD-210430",
            "instType":"FUTURES",
            "lever":"10",
            "markPx":"2353.849",
            "mgnMode":"isolated",
            "mgnRatio":"11.731726509588816",
            "pTime":"1619507761462",
            "pos":"1",
            "posCcy":"",
            "posId":"307173036051017730",
            "posSide":"long",
            "uTime":"1619507761462",
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式， <code>cross</code>：全仓 <code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">&gt; posId</td><td style="text-align: left">String</td><td style="text-align: left">持仓ID</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式（<code>交割</code>/<code>永续</code>/<code>期权</code>：<code>pos</code>为正代表开多，<code>pos</code>为负代表开空。<code>币币杠杆</code>：<code>posCcy</code>为交易货币时，代表开多；<code>posCcy</code>为计价货币时，代表开空。）</td></tr><tr><td style="text-align: left">&gt; pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量</td></tr><tr><td style="text-align: left">&gt; posCcy</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量币种，仅适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，不适用于<code>期权卖方</code></td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金的币种</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">持仓创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">最近一次持仓更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">持仓信息的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
触发推送逻辑：爆仓预警和爆仓短信的触发逻辑一致
:::

### 账户greeks频道

获取账户资产的greeks信息。当增加或者减少币种余额、持仓数量等会触发事件推送，周期性的也会有定时推送。  
该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "account-greeks"
    }]
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
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "account-greeks"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>account-greeks</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种<br>当用户指定了保证金，只有作为保证金的仓位发生变化的时候，才会触发事件推送。例如当指定了ccy = <code>BTC</code>，如果 <code>BTC-USDT-SWAP</code> 仓位发生变化，不会触发事件推送。</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "account-greeks"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"account-greeks\", \"ccy\" : \"BTC\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>account-greeks</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg": {
        "channel": "account-greeks",
        "ccy": "BTC",
        "uid": "614488474791936"
    },
    "data": [
        {
            "ccy": "BTC",
            "deltaBS": "1.1246665401944310",
            "deltaPA": "-0.0074076183688949",
            "gammaBS": "0.0000000000000000",
            "gammaPA": "0.0148152367377899",
            "thetaBS": "2.0356991946421226",
            "thetaPA": "-0.0000000200174309",
            "ts": "1729179082006",
            "vegaBS": "0.0000000000000000",
            "vegaPA": "0.0000000000000000"
        }
    ]
}
```

> 推送示例

```
{
    "arg": {
        "channel": "account-greeks",
        "uid": "614488474791936"
    },
    "data": [
        {
            "ccy": "BTC",
            "deltaBS": "1.1246665403011684",
            "deltaPA": "-0.0074021163991037",
            "gammaBS": "0.0000000000000000",
            "gammaPA": "0.0148042327982075",
            "thetaBS": "2.1342098201092528",
            "thetaPA": "-0.0000000200876441",
            "ts": "1729179001692",
            "vegaBS": "0.0000000000000000",
            "vegaPA": "0.0000000000000000"
        },
        {
            "ccy": "ETH",
            "deltaBS": "0.3810670161698570",
            "deltaPA": "-0.0688347042402955",
            "gammaBS": "-0.0000000000230396",
            "gammaPA": "0.1376693483440320",
            "thetaBS": "0.3314776517141782",
            "thetaPA": "0.0000000001316008",
            "ts": "1729179001692",
            "vegaBS": "-0.0000000045069794",
            "vegaPA": "-0.0000000000017267"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">请求订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; deltaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位账户资产delta</td></tr><tr><td style="text-align: left">&gt; deltaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位账户资产delta</td></tr><tr><td style="text-align: left">&gt; gammaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位账户资产gamma，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; gammaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位账户资产gamma，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; thetaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位账户资产theta，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; thetaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位账户资产theta，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; vegaBS</td><td style="text-align: left">String</td><td style="text-align: left">美金本位账户资产vega，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; vegaPA</td><td style="text-align: left">String</td><td style="text-align: left">币本位账户资产vega，仅适用于期权全仓</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">获取greeks的时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr></tbody></table>

::: tip
账户greeks频道基于事件推送，并进行定时推送  
\- greeks频道的事件推送并非在事件发生时实时进行，而是按照大约50毫秒的固定时间窗口进行聚合推送。例如，在固定时间窗口内发生多个事件，系统将尽量聚合为一条消息并在固定时间窗口结束时进行推送。在数据量过大的情况下可能拆分为多条消息。  
\- 当用户订阅时指定了保证金币种(ccy)，只有作为保证金的仓位发生变化的时候，才会触发事件推送。例如订阅时指定了ccy=\`BTC\`，如果\`BTC-USDT-SWAP\`仓位发生变化，不会触发事件推送。  
\- 无论是否有greeks数据的变化，定时推送都会发送更新。
:::

::: tip
\- 只推账户资产不为0的greeks数据。如果数据太大无法在单个推送消息中发送，它将被分成多个消息发送。  
\- 例：按照所有币种订阅且有5个币种资产都不为0，首次和定时推全部5个；账户的某个币种资产改变，那么账户greeks变更的触发只推这一个。
:::
