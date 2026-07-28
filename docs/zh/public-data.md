---
title: 公共数据
outline: deep
---

`公共数据`功能模块下的API接口不需要身份验证。

## REST API

### 获取交易产品基础信息

获取所有可交易产品的信息列表。

#### 限速：20次/2s

#### 限速规则：IP + Instrument Type

#### HTTP请求

`GET /api/v5/public/instruments`

> 请求示例

```
GET /api/v5/public/instruments?instType=SPOT
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取交易产品基础信息
result = publicDataAPI.get_instruments(
    instType="SPOT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。当 <code>instType</code> 为 <code>EVENTS</code> 时必填</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
      {
            "alias": "",
            "auctionEndTime": "",
            "baseCcy": "BTC",
            "category": "1",
            "ctMult": "",
            "ctType": "",
            "ctVal": "",
            "ctValCcy": "",
            "contTdSwTime": "1704876947000",
            "expTime": "",
            "futureSettlement": false,
            "groupId": "1",
            "instFamily": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "lever": "10",
            "listTime": "1606468572000",
            "lotSz": "0.00000001",
            "maxIcebergSz": "9999999999.0000000000000000",
            "maxLmtAmt": "1000000",
            "maxLmtSz": "9999999999",
            "maxMktAmt": "1000000",
            "maxMktSz": "",
            "maxStopSz": "",
            "maxTriggerSz": "9999999999.0000000000000000",
            "maxTwapSz": "9999999999.0000000000000000",
            "minSz": "0.00001",
            "optType": "",
            "openType": "call_auction",
            "preMktSwTime": "",
            "quoteCcy": "USDT",
            "tradeQuoteCcyList": [
                "USDT"
            ],
            "settleCcy": "",
            "state": "live",
            "ruleType": "normal",
            "stk": "",
            "tickSz": "0.1",
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
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品id， 如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数，如 <code>BTC-USD</code>，仅适用于<code>杠杆/交割/永续/期权</code></td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品手续费分组ID<br>现货：<br><code>3</code>：TRY现货<br><code>5</code>：BRL现货<br><code>7</code>：AED现货<br><code>8</code>：AUD现货<br><code>10</code>：SGD现货<br><code>11</code>：零手续费现货<br><code>12</code>：现货分组一<br><code>13</code>：现货分组二<br><code>14</code>：现货分组三<br><code>15</code>: 现货特别分组<br><code>17</code>：现货稳定币分组<br><code>22</code>：现货RWA分组二<br><br>交割合约：<br><code>5</code>：交割合约分组一<br><code>6</code>：交割合约分组二<br><code>8</code>：XPERP分组二<br><code>10</code>：XPERP RWA分组二<br><br>永续合约：<br><code>4</code>：永续合约分组一<br><code>5</code>：永续合约分组二<br><code>6</code>：SWAP RWA分组一<br><code>7</code>：SWAP RWA分组二<br><br>期权：<br><code>1</code>：币本位期权<br><br><strong>用户需要同时使用instType和groupId来确定一个交易产品的交易手续费分组；用户应该将此接口和<a href="zh.html#trading-account-rest-api-get-fee-rates">获取当前账户交易手续费费率</a>一起使用，以获取特定交易产品的手续费率</strong><br><br><strong>部分枚举值可能不适用于您，以实际返回为准</strong></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种，如 <code>BTC-USD</code>，仅适用于<code>杠杆/交割/永续/期权</code></td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left"><del>币种类别</del>（已废弃）</td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code> 中的 <code>BTC</code> ，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code> 中的<code>USDT</code> ，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">盈亏结算和保证金币种，如 <code>BTC</code> 仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">每张合约的面值。计价货币取决于 <code>ctType</code>：线性合约以标的货币计（如BTC-USDT-SWAP，ctVal=0.01 BTC）；反向合约以USD计（如BTC-USD-SWAP，ctVal=100 USD）。名义价值：线性 = 张数 × ctVal × 标记价格（计价货币）；反向 = 张数 × ctVal（USD固定）。<br>仅适用于 <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code></td></tr><tr><td style="text-align: left">ctMult</td><td style="text-align: left">String</td><td style="text-align: left">合约乘数，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">ctValCcy</td><td style="text-align: left">String</td><td style="text-align: left">合约面值计价币种，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型，<code>C</code>或<code>P</code> 仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">stk</td><td style="text-align: left">String</td><td style="text-align: left">行权价格，仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">listTime</td><td style="text-align: left">String</td><td style="text-align: left">上线时间<br>Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">auctionEndTime</td><td style="text-align: left">String</td><td style="text-align: left"><del>集合竞价结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于通过集合竞价方式上线的<code>币币</code>，其余情况返回""（已废弃，请使用contTdSwTime）</del></td></tr><tr><td style="text-align: left">contTdSwTime</td><td style="text-align: left">String</td><td style="text-align: left">连续交易开始时间，从集合竞价、提前挂单切换到连续交易的时间，Unix时间戳格式，单位为毫秒。e.g. <code>1597026383085</code>。<br>仅适用于通过集合竞价或提前挂单上线的<code>SPOT</code>/<code>MARGIN</code>，在其他情况下返回""。</td></tr><tr><td style="text-align: left">preMktSwTime</td><td style="text-align: left">String</td><td style="text-align: left">盘前交易产品切换为正常交易的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于盘前<code>SWAP</code> 与盘前 X-Perp <code>FUTURES</code>。当盘前 X-Perp 转换为正常 X-Perp 时填充</td></tr><tr><td style="text-align: left">openType</td><td style="text-align: left">String</td><td style="text-align: left">开盘类型<br><code>fix_price</code>: 定价开盘<br><code>pre_quote</code>: 提前挂单<br><code>call_auction</code>: 集合竞价<br>只适用于<code>SPOT</code>/<code>MARGIN</code>，其他业务线返回""</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">产品下线时间<br>适用于<code>币币/杠杆/交割/永续/期权</code>，对于 <code>交割/期权</code>，为交割/行权日期；亦可以为产品下线时间，有变动就会推送。</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">交易所对该合约设定的最大杠杆上限。账户实际可用杠杆可能因VIP等级和仓位大小而更低。用户当前配置的杠杆请使用 GET /api/v5/account/leverage-info 查询。<br>不适用于 <code>SPOT</code>、<code>OPTION</code></td></tr><tr><td style="text-align: left">tickSz</td><td style="text-align: left">String</td><td style="text-align: left">最小价格变动单位，如 <code>0.0001</code>。<br>对于 <code>OPTION</code>/<code>EVENTS</code>，该值为 tick band 中的最小 tickSz。如需获取各价格区间的精确 tickSz，请使用"获取期权价格梯度"接口并传入对应的 <code>instType</code> 参数。</td></tr><tr><td style="text-align: left">lotSz</td><td style="text-align: left">String</td><td style="text-align: left">合约面值最小变动单位（委托量步长），所有委托量（sz）必须为 <code>lotSz</code> 的整数倍，违反则返回错误51121。下单数量精度<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">minSz</td><td style="text-align: left">String</td><td style="text-align: left">最小委托量。委托量必须同时满足：sz ≥ <code>minSz</code> 且 sz 为 <code>lotSz</code> 的整数倍。最小下单数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">ctType</td><td style="text-align: left">String</td><td style="text-align: left">合约类型<br><code>linear</code>：正向合约，保证金、盈亏及结算均以计价货币计（如BTC-USDT-SWAP以USDT计）。<br><code>inverse</code>：反向合约，保证金、盈亏及结算均以标的货币计（如BTC-USD-SWAP以BTC计）。反向合约的USD盈亏为非线性：固定BTC盈亏的USD价值随BTC价格变化。<br>仅适用于 <code>FUTURES</code>/<code>SWAP</code></td></tr><tr><td style="text-align: left">alias</td><td style="text-align: left">String</td><td style="text-align: left">合约日期别名（已废弃，将于 2026 年 4 月底下线，请使用 expTime 字段获取交割时间）<br><code>this_week</code>：本周<br><code>next_week</code>：次周<br><code>this_month</code>：本月<br><code>next_month</code>：次月<br><code>quarter</code>：季度<br><code>next_quarter</code>：次季度<br><code>third_quarter</code>：第三季度<br><code>this_five_years</code>：当期五年合约<br><code>next_five_years</code>：次期五年合约<br>仅适用于<code>交割</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">产品状态<br><code>live</code>：交易中<br><code>suspend</code>：暂停中<br><code>rebase</code>：合约在变基中，不可交易，仅适用于<code>SWAP</code><br><code>post_only</code>：仅接受 post-only 订单；已有 post-only 订单可改单和撤单。其他订单类型（市价单、IOC、FOK、普通限价单）将被拒绝。仅适用于 <code>SWAP</code><br><code>preopen</code>：预上线，交割和期权合约轮转生成到开始交易；部分交易产品上线前<br><code>test</code>：测试中（测试产品，不可交易）<br><code>settling</code>：结算中，仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">ruleType</td><td style="text-align: left">String</td><td style="text-align: left">交易规则类型<br><code>normal</code>：普通交易<br><code>pre_market</code>：盘前交易，含盘前 X-Perp <code>FUTURES</code><br><code>rebase_contract</code>：盘前变基合约<br><code>xperp</code>：永续合约风格的交割合约，仅适用于部分 <code>FUTURES</code> 合约。盘前 X-Perp 转换为正常 X-Perp 后，由 <code>pre_market</code> 变为 <code>xperp</code></td></tr><tr><td style="text-align: left">maxLmtSz</td><td style="text-align: left">String</td><td style="text-align: left">限价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxMktSz</td><td style="text-align: left">String</td><td style="text-align: left">市价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">maxLmtAmt</td><td style="text-align: left">String</td><td style="text-align: left">限价单的单笔最大美元价值</td></tr><tr><td style="text-align: left">maxMktAmt</td><td style="text-align: left">String</td><td style="text-align: left">市价单的单笔最大美元价值<br>仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">maxTwapSz</td><td style="text-align: left">String</td><td style="text-align: left">时间加权单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code>。<br>单笔最小委托数量为 minSz*2</td></tr><tr><td style="text-align: left">maxIcebergSz</td><td style="text-align: left">String</td><td style="text-align: left">冰山委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxTriggerSz</td><td style="text-align: left">String</td><td style="text-align: left">计划委托委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">maxStopSz</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损市价委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">futureSettlement</td><td style="text-align: left">Boolean</td><td style="text-align: left">交割合约是否支持每日结算<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">tradeQuoteCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可用于交易的计价币种列表，如 ["USD", "USDC”].</td></tr><tr><td style="text-align: left">instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">产品唯一标识代码。<br>对于简单二进制编码，您必须使用 <code>instIdCode</code> 而不是 <code>instId</code>。<br>对于同一<code>instId</code>，实盘和模拟盘的值可能会不一样。<br>当值还未生成时，返回 <code>null</code>。</td></tr><tr><td style="text-align: left">instCategory</td><td style="text-align: left">String</td><td style="text-align: left">标的资产类别（产品ID的第一部分）。例如：对于 <code>BTC-USDT-SWAP</code>，instCategory 表示 <code>BTC</code> 所属的资产类别。<br><code>1</code>: 加密货币<br><code>3</code>: 股票类资产<br><code>4</code>: 大宗商品<br><code>5</code>: 外汇<br><code>6</code>: 债券<br><code>""</code> 当值不可用时返回空字符串</td></tr><tr><td style="text-align: left">initPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">合约上线后前 10 分钟内的初始价格限制区间，小数百分比，例如 <code>0.05</code> 代表 5%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">floatPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">常规交易期间的浮动价格限制区间，小数百分比，例如 <code>0.03</code> 代表 3%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">maxPxLmtPct</td><td style="text-align: left">String</td><td style="text-align: left">最大价格限制上限（下单价格相对指数价格偏离的硬性上限），小数百分比，例如 <code>0.15</code> 代表 15%。通过 GET /api/v5/public/price-limit 可获取对应价格限制。<br>适用于 <code>SPOT</code>/<code>MARGIN</code>/<code>SWAP</code>/<code>FUTURES</code>；<code>OPTION</code> 和 <code>EVENTS</code> 返回 <code>""</code>。</td></tr><tr><td style="text-align: left">upcChg</td><td style="text-align: left">Array of objects</td><td style="text-align: left">即将变更的参数列表。当没有即将变更的参数时，返回空数组 []</td></tr><tr><td style="text-align: left">&gt; param</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数名称。<br><code>tickSz</code><br><code>minSz</code>：若为交割/永续合约（<code>FUTURES</code>/<code>SWAP</code>），<code>lotSz</code> 会同步变更。<br><code>maxMktSz</code></td></tr><tr><td style="text-align: left">&gt; newValue</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数值。</td></tr><tr><td style="text-align: left">&gt; effTime</td><td style="text-align: left">String</td><td style="text-align: left">生效时间。Unix 时间戳格式，例如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
当合约预上线时，状态变更为预上线（即新生成一个合约，新合约会处于预上线状态）；
:::

::: tip
listTime以及contTdSwTime  
对于通过集合竞价/提前挂单方式上线的币币，listTime为集合竞价/提前挂单的开始时间，contTdSwTime为集合竞价/提前挂单的结束时间、连续交易的开始时间；对于其他情况及业务线，listTime即为连续交易开始时间，contTdSwTime将返回""
:::

::: tip
state  
对于\`币币\`、\`杠杆\`、\`永续\`和\`交割\`，状态state在时间到达listTime时由\`preopen\`转变为\`live\`。对于\`期权\`合约，由于内部处理原因，状态可能在\`listTime\`之后短暂延迟变为\`live\`。建议在下单前确认\`state\`为\`live\`。  
当产品下线的时候（如交割合约被交割的时候，期权合约被行权的时候），查询不到该产品
:::

::: tip
产品下线公告一经发出，接口及频道会更新下线时间(expTime)。  
产品上线公告一经发出，接口及频道会更新上线时间：  
1\. 对于币币/杠杆/永续， 该事件仅适用于产品类型(instType), 交易产品ID(instId), 上线时间(listTime), 产品状态(state)字段；  
2\. 对于交割，该事件仅适用于产品类型(instType), 交易品种(instFamily), 上线时间(listTime), 产品状态(state)字段；  
3\. 其他字段暂时为空，会比上线时间至少提前 5 分钟更新完整，然后 WebSocket 才会支持通过对应的交易产品ID/交易品种进行订阅。
:::

### 获取系列

获取 OKX 预测市场的系列列表。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/event-contract/series`

> 请求示例

```
GET /api/v5/public/event-contract/series?seriesId=BTC-ABOVE-DAILY
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。不传则返回所有系列。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "seriesId": "BTC-ABOVE-DAILY",
            "freq": "daily",
            "title": "BTC price above 15k",
            "category": "Crypto",
            "settlement": {
                "method": "price_above",
                "closeEarly": false,
                "srcName": "okx_index",
                "underlying": "BTC-USDT"
            }
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">freq</td><td style="text-align: left">String</td><td style="text-align: left">系列频率<br><code>five_min</code><br><code>fifteen_min</code><br><code>hourly</code><br><code>daily</code><br><code>monthly</code></td></tr><tr><td style="text-align: left">title</td><td style="text-align: left">String</td><td style="text-align: left">系列标题</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">所属分类，如 <code>Crypto</code></td></tr><tr><td style="text-align: left">settlement</td><td style="text-align: left">Object</td><td style="text-align: left">结算信息</td></tr><tr><td style="text-align: left">&gt; method</td><td style="text-align: left">String</td><td style="text-align: left">结算方式。<br><code>price_up_down</code>：价格涨跌<br><code>price_above</code>：价格高于<br><code>hit</code>：触及（价格触达行权价格，立即结算）<br><code>between</code>：区间（结算价格在 [floorStrike, capStrike) 范围内）</td></tr><tr><td style="text-align: left">&gt; closeEarly</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否可以在到期时间前提前结算。<br><code>true</code><br><code>false</code></td></tr><tr><td style="text-align: left">&gt; srcName</td><td style="text-align: left">String</td><td style="text-align: left">结算数据来源名称，如 <code>okx_index</code>、<code>cf_benchmark_index</code></td></tr><tr><td style="text-align: left">&gt; underlying</td><td style="text-align: left">String</td><td style="text-align: left">OKX 交易对格式的标的价格，如 <code>BTC-USDT</code>。仅适用于价格相关结算方式。</td></tr></tbody></table>

### 获取事件

获取 OKX 预测市场某系列下的事件列表，包含已到期事件。返回数据按 expTime 和 eventId 降序排列。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/event-contract/events`

> 请求示例

```
GET /api/v5/public/event-contract/events?seriesId=BTC-ABOVE-DAILY
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">eventId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">事件 ID，如 <code>BTC-ABOVE-DAILY-260224-1600</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">事件状态过滤。<br><code>preopen</code><br><code>live</code><br><code>settling</code><br><code>expired</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果数量，最大 100，默认 100</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页，返回早于请求 <code>expTime</code> 的更新记录，不包含该时间戳</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页，返回晚于请求 <code>expTime</code> 的更旧记录，不包含该时间戳</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "seriesId": "BTC-ABOVE-DAILY",
            "eventId": "BTC-ABOVE-DAILY-260224-1600",
            "expTime": "1769697132335",
            "state": "live"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">eventId</td><td style="text-align: left">String</td><td style="text-align: left">事件 ID，如 <code>BTC-ABOVE-DAILY-260224-1600</code></td></tr><tr><td style="text-align: left">fixTime</td><td style="text-align: left">String</td><td style="text-align: left">执行价格确定时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。仅适用于 <code>price_up_down</code> 结算方式。</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">该事件的行权时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">事件状态。<br><code>preopen</code><br><code>live</code><br><code>settling</code><br><code>expired</code></td></tr></tbody></table>

### 获取市场

获取 OKX 预测市场某事件下的市场列表。返回数据按 expTime 和 floorStrike 降序排列。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/event-contract/markets`

> 请求示例

```
GET /api/v5/public/event-contract/markets?seriesId=BTC-ABOVE-DAILY
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">eventId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">事件 ID，如 <code>BTC-ABOVE-DAILY-260224-1600</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品 ID，如 <code>BTC-ABOVE-DAILY-260224-1600-65000</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">市场状态过滤。<br><code>preopen</code><br><code>live</code><br><code>settling</code><br><code>expired</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果数量，最大 100，默认 100</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页，返回早于请求 <code>expTime</code> 的更新记录，不包含该时间戳</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页，返回晚于请求 <code>expTime</code> 的更旧记录，不包含该时间戳</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "seriesId": "BTC-ABOVE-DAILY",
            "eventId": "BTC-ABOVE-DAILY-260224-1600",
            "instId": "BTC-ABOVE-DAILY-260224-1600-65000",
            "listTime": "1769697132335",
            "expTime": "1769697132335",
            "state": "live",
            "fixTime": "",
            "outcome": "0",
            "floorStrike": "120000",
            "capStrike": "",
            "settleValue": "",
            "disputed": false,
            "hitDir": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">eventId</td><td style="text-align: left">String</td><td style="text-align: left">事件 ID，如 <code>BTC-ABOVE-DAILY-260224-1600</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID，如 <code>BTC-ABOVE-DAILY-260224-1600-65000</code></td></tr><tr><td style="text-align: left">listTime</td><td style="text-align: left">String</td><td style="text-align: left">上线时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">fixTime</td><td style="text-align: left">String</td><td style="text-align: left">行权价格确定时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。仅适用于 <code>price_up_down</code> 结算方式。</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">该事件的行权时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。结算后更新。</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">市场状态。<br><code>preopen</code><br><code>live</code><br><code>settling</code><br><code>expired</code></td></tr><tr><td style="text-align: left">disputed</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否存在争议。<br><code>true</code><br><code>false</code></td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">市场结果。<br><code>0</code>：未确定<br><code>1</code>：YES<br><code>2</code>：NO。<br><code>1</code>/<code>2</code> 仅在 state 为 <code>expired</code> 时适用</td></tr><tr><td style="text-align: left">floorStrike</td><td style="text-align: left">String</td><td style="text-align: left">导致 YES 结果的最低到期价格</td></tr><tr><td style="text-align: left">capStrike</td><td style="text-align: left">String</td><td style="text-align: left"><code>between</code> 结算方式中导致 YES 结果的最大到期值。<code>"INF"</code> 表示无上限（最高区间）。<br>非 <code>between</code> 方式返回 <code>""</code>。</td></tr><tr><td style="text-align: left">settleValue</td><td style="text-align: left">String</td><td style="text-align: left">结算价格。<br>仅在 state 为 <code>expired</code> 时返回</td></tr><tr><td style="text-align: left">hitDir</td><td style="text-align: left">String</td><td style="text-align: left">触及方向。仅在结算方式为 <code>hit</code> 时适用。<br><code>up</code>：价格从下方触及<br><code>dn</code>：价格从上方触及<br><code>""</code>：不适用（非 <code>hit</code> 方式）</td></tr></tbody></table>

### 获取预估交割/行权价格

获取交割合约和期权预估交割/行权价。交割/行权预估价只有交割/行权前一小时才有返回值

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/estimated-price`

> 请求示例

```
GET /api/v5/public/estimated-price?instId=BTC-USD-200214
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取预估交割/行权价格
result = publicDataAPI.get_estimated_price(
    instId="BTC-USD-200214",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-200214</code><br>仅适用于<code>交割</code>/<code>期权</code>/<code>事件合约</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    {
        "instType":"FUTURES",
        "instId":"BTC-USDT-201227",
        "settlePx":"200",
        "ts":"1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID， 如 <code>BTC-USD-200214</code></td></tr><tr><td style="text-align: left">settlePx</td><td style="text-align: left">String</td><td style="text-align: left">预估交割/行权价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据返回时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取交割和行权记录

获取3个月内的交割合约的交割记录和期权的行权记录

#### 限速：40次/2s

#### 限速规则：IP + (Instrument Type + instFamily)

#### HTTP请求

`GET /api/v5/public/delivery-exercise-history`

> 请求示例

```
GET /api/v5/public/delivery-exercise-history?instType=OPTION&uly=BTC-USD
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取交割和行权记录
result = publicDataAPI.get_delivery_exercise_history(
    instType="FUTURES",
    uly="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ts":"1597026383085",
            "details":[
                {
                    "type":"delivery",
                    "insId":"BTC-USD-190927",
                    "px":"0.016"
                }
            ]
        },
        {
            "ts":"1597026383085",
            "details":[
                {
                    "insId":"BTC-USD-200529-6000-C",
                    "type":"exercised",
                    "px":"0.016"
                },
                {
                    "insId":"BTC-USD-200529-8000-C",
                    "type":"exercised",
                    "px":"0.016"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">交割/行权日期，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">详细数据</td></tr><tr><td style="text-align: left">&gt; insId</td><td style="text-align: left">String</td><td style="text-align: left">交割/行权的合约ID</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">交割/行权的价格</td></tr><tr><td style="text-align: left">&gt; type</td><td style="text-align: left">String</td><td style="text-align: left">类型<br><code>delivery</code>：交割<br><code>exercised</code>：实值已行权<br><code>expired_otm</code>：虚值已过期</td></tr></tbody></table>

### 获取交割预估结算价格

获取交割合约预估结算价。只有结算前一小时才有返回值。

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/estimated-settlement-info`

> 请求示例

```
GET /api/v5/public/estimated-settlement-info?instId=XRP-USDT-250307
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>XRP-USDT-250307</code><br>仅适用于<code>交割</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "estSettlePx": "2.5666068562369959",
            "instId": "XRP-USDT-250307",
            "nextSettleTime": "1741248000000",
            "ts": "1741246429748"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID， 如 <code>XRP-USDT-250307</code></td></tr><tr><td style="text-align: left">nextSettleTime</td><td style="text-align: left">String</td><td style="text-align: left">下一次结算时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">estSettlePx</td><td style="text-align: left">String</td><td style="text-align: left">预估结算价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据返回时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取交割结算记录

获取3个月内的交割合约的结算记录

#### 限速：40次/2s

#### 限速规则：IP + (Instrument Family)

#### HTTP请求

`GET /api/v5/public/settlement-history`

> 请求示例

```
GET /api/v5/public/settlement-history?instFamily=XRP-USDT
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（不包含）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（不包含）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为<code>100</code>，不填默认返回<code>100</code>条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "instId": "XRP-USDT-250307",
                    "settlePx": "2.5192078615298715"
                }
            ],
            "ts": "1741161600000"
        },
        {
            "details": [
                {
                    "instId": "XRP-USDT-250307",
                    "settlePx": "2.5551316341327384"
                }
            ],
            "ts": "1741075200000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">结算日期，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">详细数据</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; settlePx</td><td style="text-align: left">String</td><td style="text-align: left">结算价格</td></tr></tbody></table>

### 获取合约当前资金费率

获取合约当前资金费率

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/funding-rate`

> 请求示例

```
GET /api/v5/public/funding-rate?instId=BTC-USD-SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取合约当前资金费率
result = publicDataAPI.get_funding_rate(
    instId="BTC-USD-SWAP",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code> 或 X-Perps 交割合约 instId，传入 <code>ANY</code> 时返回所有 X-Perps 交割合约及永续合约的资金费率信息<br>适用于<code>永续</code>及 X-Perps <code>交割</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "formulaType": "noRate",
            "fundingRate": "0.0000182221218054",
            "fundingTime": "1743609600000",
            "impactValue": "",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "interestRate": "",
            "maxFundingRate": "0.00375",
            "method": "current_period",
            "minFundingRate": "-0.00375",
            "nextFundingRate": "",
            "nextFundingTime": "1743638400000",
            "premium": "0.0000910113652644",
            "settFundingRate": "0.0000145824401745",
            "settState": "settled",
            "ts": "1743588686291"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：X-Perps 交割合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如<code>BTC-USD-SWAP</code> 或 <code>ANY</code></td></tr><tr><td style="text-align: left">method</td><td style="text-align: left">String</td><td style="text-align: left">资金费收取逻辑<br><code>current_period</code>：当期收<del><br><code>next_period</code>：跨期收</del>（不再支持跨期收合约）</td></tr><tr><td style="text-align: left">formulaType</td><td style="text-align: left">String</td><td style="text-align: left">公式类型<br><code>noRate</code>：旧资金费率计算公式<br><code>withRate</code>：新资金费率计算公式</td></tr><tr><td style="text-align: left">fundingRate</td><td style="text-align: left">String</td><td style="text-align: left">下一结算周期的预测资金费率。正数表示多头向空头支付资金费；负数表示空头向多头支付资金费。此为预测值，最终结算费率可能有所不同，请参阅 <code>settFundingRate</code> 查看上次实际结算费率。注意：结算周期通常为8小时，但可能调整；实际周期请通过 <code>fundingTime</code> 与 <code>nextFundingTime</code> 之差确定。</td></tr><tr><td style="text-align: left">nextFundingRate</td><td style="text-align: left">String</td><td style="text-align: left"><del>下一期预测资金费率<br>当收取逻辑为<code>current_period</code>时，nextFundingRate字段将返回""</del>（不再支持跨期收合约）</td></tr><tr><td style="text-align: left">fundingTime</td><td style="text-align: left">String</td><td style="text-align: left">资金费时间 ，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">nextFundingTime</td><td style="text-align: left">String</td><td style="text-align: left">下一期资金费时间 ，Unix时间戳的毫秒数格式，如 <code>1622851200000</code></td></tr><tr><td style="text-align: left">minFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">资金费率下限</td></tr><tr><td style="text-align: left">maxFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">资金费率上限</td></tr><tr><td style="text-align: left">interestRate</td><td style="text-align: left">String</td><td style="text-align: left">利率</td></tr><tr><td style="text-align: left">impactValue</td><td style="text-align: left">String</td><td style="text-align: left">深度加权金额（计价币数量）</td></tr><tr><td style="text-align: left">settState</td><td style="text-align: left">String</td><td style="text-align: left">资金费率结算状态<br><code>processing</code>：结算中<br><code>settled</code>：已结算</td></tr><tr><td style="text-align: left">settFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">若 settState = <code>processing</code>，该字段代表用于本轮结算的资金费率；若 settState = <code>settled</code>，该字段代表用于上轮结算的资金费率</td></tr><tr><td style="text-align: left">premium</td><td style="text-align: left">String</td><td style="text-align: left">溢价指数<br>公式：[max (0，深度加权买价 - 指数价格) – max (0，指数价格 – 深度加权卖价)] / 指数价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
针对一些资金费率波动较大的小币种，OKX也将实时关注行情变化，在必要时候，将资金费率收取频率从8小时收付，改成频率较高的6小时/4小时/2小时/1小时收付。因此，用户应关注\`fundingTime\`及\`nextFundingTime\`字段以确定合约的资金费收取频率。
:::

### 获取合约历史资金费率

获取合约历史资金费率，最多返回近三个月数据

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/funding-rate-history`

> 请求示例

```
GET /api/v5/public/funding-rate-history?instId=BTC-USD-SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取合约历史资金费率
result = publicDataAPI.funding_rate_history(
    instId="BTC-USD-SWAP",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code> 或 X-Perps 交割合约 instId<br>适用于<code>永续</code>及 X-Perps <code>交割</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>fundingTime</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>fundingTime</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为400，不填默认返回400条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "formulaType": "noRate",
            "fundingRate": "0.0000746604960499",
            "fundingTime": "1703059200000",
            "instId": "BTC-USD-SWAP",
            "instType": "SWAP",
            "method": "next_period",
            "realizedRate": "0.0000746572360545"
        },
        {
            "formulaType": "noRate",
            "fundingRate": "0.000227985782722",
            "fundingTime": "1703030400000",
            "instId": "BTC-USD-SWAP",
            "instType": "SWAP",
            "method": "next_period",
            "realizedRate": "0.0002279755647389"
        }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：X-Perps 交割合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">formulaType</td><td style="text-align: left">String</td><td style="text-align: left">公式类型<br><code>noRate</code>：旧资金费率计算公式<br><code>withRate</code>：新资金费率计算公式</td></tr><tr><td style="text-align: left">fundingRate</td><td style="text-align: left">String</td><td style="text-align: left">预计资金费率</td></tr><tr><td style="text-align: left">realizedRate</td><td style="text-align: left">String</td><td style="text-align: left">实际资金费率</td></tr><tr><td style="text-align: left">fundingTime</td><td style="text-align: left">String</td><td style="text-align: left">资金费时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">method</td><td style="text-align: left">String</td><td style="text-align: left">资金费收取逻辑<br><code>current_period</code>：当期收<br><code>next_period</code>：跨期收</td></tr></tbody></table>

::: tip
针对一些资金费率波动较大的小币种，OKX也将实时关注行情变化，在必要时候，将资金费率收取频率从8小时收付，改成频率较高的6小时/4小时/2小时/1小时收付。因此，用户应关注\`fundingTime\`及\`nextFundingTime\`字段以确定合约的资金费收取频率。
:::

### 获取持仓总量

查询单个交易产品的市场的持仓总量

#### 限速：20次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/open-interest`

> 请求示例

```
GET /api/v5/public/open-interest?instType=SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取持仓总量
result = publicDataAPI.get_open_interest(
    instType="FUTURES",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code><br><code>期权</code>下必传</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code><br>仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code>/<code>事件合约</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    {
        "instType":"SWAP",
        "instId":"BTC-USDT-SWAP",
        "oi":"5000",
        "oiCcy":"555.55",
        "oiUsd": "50000",
        "ts":"1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">oi</td><td style="text-align: left">String</td><td style="text-align: left">持仓量（按<code>张</code>折算）</td></tr><tr><td style="text-align: left">oiCcy</td><td style="text-align: left">String</td><td style="text-align: left">持仓量（按<code>币</code>折算）</td></tr><tr><td style="text-align: left">oiUsd</td><td style="text-align: left">String</td><td style="text-align: left">持仓量（按<code>USD</code>折算）</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据返回时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取限价

查询单个交易产品的最高买价和最低卖价

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/price-limit`

> 请求示例

```
GET /api/v5/public/price-limit?instId=BTC-USDT-SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取限价
result = publicDataAPI.get_price_limit(
    instId="BTC-USD-SWAP",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    {
        "instType":"SWAP",
        "instId":"BTC-USDT-SWAP",
        "buyLmt":"17057.9",
        "sellLmt":"16388.9",
        "ts":"1597026383085",
        "enabled": true
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br>若产品ID支持杠杆交易，则返回<code>MARGIN</code>；否则，返回<code>SPOT</code>。</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID ，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">buyLmt</td><td style="text-align: left">String</td><td style="text-align: left">最高买价<br>当enabled为false时，返回""</td></tr><tr><td style="text-align: left">sellLmt</td><td style="text-align: left">String</td><td style="text-align: left">最低卖价<br>当enabled为false时，返回""</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">限价数据更新时间 ，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">enabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">限价是否生效<br><code>true</code>：限价生效<br><code>false</code>：限价不生效</td></tr></tbody></table>

### 获取期权定价

查询期权详细信息

#### 限速：20次/2s

#### 限速规则：IP + instFamily

#### HTTP请求

`GET /api/v5/public/opt-summary`

> 请求示例

```
GET /api/v5/public/opt-summary?uly=BTC-USD
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取期权定价
result = publicDataAPI.get_opt_summary(
    uly="BTC-USD",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种，仅适用于期权</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">合约到期日，格式为"YYMMDD"，如 "200527"</td></tr></tbody></table>

**注意**：本接口返回的数据可能不包含 [`/api/v5/public/instruments`](#get-instruments) 中所有的期权合约。以下两种情况可能导致数据缺失： 1. 期权已上架但尚未开始交易（例如，补充期权默认在特定时间开始交易，在开始交易之前可能无法获取对应数据）。 2. 因市场报价不足导致隐含波动率曲面拟合失败。此情况在模拟盘中较易发生；实盘中由于做市商会提供报价，通常可保证拟合成功。

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
      {
            "askVol": "3.7207056835937498",
            "bidVol": "0",
            "delta": "0.8310206676289528",
            "deltaBS": "0.9857332101544538",
            "fwdPx": "39016.8143629068452065",
            "gamma": "-1.1965483553276135",
            "gammaBS": "0.000011933182397798109",
            "instId": "BTC-USD-220309-33000-C",
            "instType": "OPTION",
            "lever": "0",
            "markVol": "1.5551965233045728",
            "realVol": "0",
            "volLv": "0",
            "theta": "-0.0014131955002093717",
            "thetaBS": "-66.03526900575946",
            "ts": "1646733631242",
            "uly": "BTC-USD",
            "vega": "0.000018173851073258973",
            "vegaBS": "0.7089307622132419"
        },
        {
            "askVol": "1.7968814062499998",
            "bidVol": "0",
            "delta": "-0.014668822072611904",
            "deltaBS": "-0.01426678984554619",
            "fwdPx": "39016.8143629068452065",
            "gamma": "0.49483062407551576",
            "gammaBS": "0.000011933182397798109",
            "instId": "BTC-USD-220309-33000-P",
            "instType": "OPTION",
            "lever": "0",
            "markVol": "1.5551965233045728",
            "realVol": "0",
            "volLv": "0",
            "theta": "-0.0014131955002093717",
            "thetaBS": "-54.93377294845015",
            "ts": "1646733631242",
            "uly": "BTC-USD",
            "vega": "0.000018173851073258973",
            "vegaBS": "0.7089307622132419"
        }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-200103-5500-C</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数</td></tr><tr><td style="text-align: left">delta</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">gamma</td><td style="text-align: left">String</td><td style="text-align: left">delta对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">vega</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对隐含波动率的敏感度</td></tr><tr><td style="text-align: left">theta</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对剩余期限的敏感度</td></tr><tr><td style="text-align: left">deltaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">gammaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下delta对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">vegaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对隐含波动率的敏感度</td></tr><tr><td style="text-align: left">thetaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对剩余期限的敏感度</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">markVol</td><td style="text-align: left">String</td><td style="text-align: left">标记波动率</td></tr><tr><td style="text-align: left">bidVol</td><td style="text-align: left">String</td><td style="text-align: left">bid波动率</td></tr><tr><td style="text-align: left">askVol</td><td style="text-align: left">String</td><td style="text-align: left">ask波动率</td></tr><tr><td style="text-align: left">realVol</td><td style="text-align: left">String</td><td style="text-align: left">已实现波动率（目前该字段暂未启用）</td></tr><tr><td style="text-align: left">volLv</td><td style="text-align: left">String</td><td style="text-align: left">平价期权的隐含波动率</td></tr><tr><td style="text-align: left">fwdPx</td><td style="text-align: left">String</td><td style="text-align: left">远期价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取免息额度和币种折算率等级

获取免息额度和币种折算率等级

#### 限速：2 次/2s

#### 限速规则：IP

#### HTTP 请求

`GET /api/v5/public/discount-rate-interest-free-quota`

> 请求示例

```
GET /api/v5/public/discount-rate-interest-free-quota?ccy=BTC
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取免息额度和币种折算率等级
result = publicDataAPI.discount_interest_free_quota()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">discountLv</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left"><del>折算率等级（已废弃）<del></del></del></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "0",
            "ccy": "BTC",
            "collateralRestrict": false,
            "details": [
                {
                    "discountRate": "0.98",
                    "liqPenaltyRate": "0.02",
                    "maxAmt": "20",
                    "minAmt": "0",
                    "tier": "1",
                    "disCcyEq": "1000"
                },
                {
                    "discountRate": "0.9775",
                    "liqPenaltyRate": "0.0225",
                    "maxAmt": "25",
                    "minAmt": "20",
                    "tier": "2",
                    "disCcyEq": "2000"
                }
            ],
            "discountLv": "1",
            "minDiscountRate": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">colRes</td><td style="text-align: left">String</td><td style="text-align: left">平台维度质押限制状态<br><code>0</code>：限制未触发<br><code>1</code>：限制未触发，但该币种接近平台质押上限<br><code>2</code>：限制已触发。该币种不可用作新订单的保证金，这可能会导致下单失败。但它仍会被计入账户有效保证金，保证金率不会收到影响。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td style="text-align: left">collateralRestrict</td><td style="text-align: left">Boolean</td><td style="text-align: left"><del>平台维度的质押借币限制<br><code>true</code><br><code>false</code></del>（已弃用，请使用colRes）</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">免息金额</td></tr><tr><td style="text-align: left">discountLv</td><td style="text-align: left">String</td><td style="text-align: left"><del>折算率等级<del>（已废弃）</del></del></td></tr><tr><td style="text-align: left">minDiscountRate</td><td style="text-align: left">String</td><td style="text-align: left">最小折算率，针对数量超过最后一档的最大值时</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">新的币种折算率详情</td></tr><tr><td style="text-align: left">&gt; discountRate</td><td style="text-align: left">String</td><td style="text-align: left">折算率</td></tr><tr><td style="text-align: left">&gt; maxAmt</td><td style="text-align: left">String</td><td style="text-align: left">梯度区间上限，单位为币种，如 BTC，"" 表示正无穷</td></tr><tr><td style="text-align: left">&gt; minAmt</td><td style="text-align: left">String</td><td style="text-align: left">梯度区间下限，单位为币种，如 BTC，最小值是0</td></tr><tr><td style="text-align: left">&gt; tier</td><td style="text-align: left">String</td><td style="text-align: left">档位</td></tr><tr><td style="text-align: left">&gt; liqPenaltyRate</td><td style="text-align: left">String</td><td style="text-align: left">强平罚金费率</td></tr><tr><td style="text-align: left">&gt; disCcyEq</td><td style="text-align: left">String</td><td style="text-align: left">折扣后的币种权益（取当前梯度区间上限），便于快速计算</td></tr></tbody></table>

### 获取系统时间

获取系统时间

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/time`

> 请求示例

```
GET /api/v5/public/time
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取系统时间
result = publicDataAPI.get_system_time()
print(result)
```

> 返回结果

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

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">系统时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取标记价格

为了防止个别用户恶意操控市场导致合约价格波动剧烈，我们根据现货指数和合理基差设定标记价格。

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/public/mark-price`

> 请求示例

```
GET /api/v5/public/mark-price?instType=SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取标记价格
result = publicDataAPI.get_mark_price(
    instType="SWAP",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    {
        "instType":"SWAP",
        "instId":"BTC-USDT-SWAP",
        "markPx":"200",
        "ts":"1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-200214</code></td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">接口数据返回时间，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr></tbody></table>

### 获取衍生品仓位档位

全部仓位档位对应信息，当前最高可开杠杆倍数由您的借币持仓和维持保证金率决定。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/position-tiers`

> 请求示例

```
GET /api/v5/public/position-tiers?tdMode=cross&instType=SWAP&instFamily=BTC-USDT
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取衍生品仓位档位
result = publicDataAPI.get_position_tiers(
    instType="SWAP",
    tdMode="cross",
    uly="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">保证金模式<br><code>isolated</code>：逐仓 ；<code>cross</code>：全仓</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种，支持多instFamily，半角逗号分隔，最大不超过5个<br>当产品类型是<code>永续</code>/<code>交割</code>/<code>期权</code> 之一时，<code>instFamily</code> 必填</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID，支持多instId，半角逗号分隔，最大不超过5个<br>仅适用<code>币币杠杆</code>，<code>instId</code>和<code>ccy</code>必须传一个，若传两个，以<code>instId</code>为主</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种<br>仅适用杠杆全仓，该值生效时，返回的是<code>跨币种保证金模式</code>和<code>组合保证金模式</code>下的借币量</td></tr><tr><td style="text-align: left">tier</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查指定档位</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    {
            "baseMaxLoan": "50",
            "imr": "0.1",
            "instId": "BTC-USDT",
            "instFamily": "",
            "maxLever": "10",
            "maxSz": "50",
            "minSz": "0",
            "mmr": "0.03",
            "optMgnFactor": "0",
            "quoteMaxLoan": "500000",
            "tier": "1",
            "uly": ""
        }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">币对</td></tr><tr><td style="text-align: left">tier</td><td style="text-align: left">String</td><td style="text-align: left">仓位档位</td></tr><tr><td style="text-align: left">minSz</td><td style="text-align: left">String</td><td style="text-align: left">该档位最少借币量或者持仓数量 <code>杠杆</code>/<code>期权</code>/<code>永续</code>/<code>交割</code> 最小持仓量 默认0<br>当 <code>ccy</code> 参数生效时，返回 <code>ccy</code> 的最小借币量</td></tr><tr><td style="text-align: left">maxSz</td><td style="text-align: left">String</td><td style="text-align: left">该档位最多借币量或者持仓数量 <code>杠杆</code>/<code>期权</code>/<code>永续</code>/<code>交割</code><br>当 <code>ccy</code> 参数生效时，返回 <code>ccy</code> 的最大借币量</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">String</td><td style="text-align: left">仓位维持保证金率</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">String</td><td style="text-align: left">最低初始维持保证金率</td></tr><tr><td style="text-align: left">maxLever</td><td style="text-align: left">String</td><td style="text-align: left">最高可用杠杆倍数</td></tr><tr><td style="text-align: left">optMgnFactor</td><td style="text-align: left">String</td><td style="text-align: left">期权保证金系数 （仅适用于期权）</td></tr><tr><td style="text-align: left">quoteMaxLoan</td><td style="text-align: left">String</td><td style="text-align: left">计价货币 最大借币量（仅适用于杠杆，且<code>instId</code>参数生效时），如 BTC-USDT 里的 USDT最大借币量</td></tr><tr><td style="text-align: left">baseMaxLoan</td><td style="text-align: left">String</td><td style="text-align: left">交易货币 最大借币量（仅适用于杠杆，且<code>instId</code>参数生效时），如 BTC-USDT 里的 BTC最大借币量</td></tr></tbody></table>

### 获取市场借币杠杆利率和借币限额

#### 限速：2次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/interest-rate-loan-quota`

> 请求示例

```
GET /api/v5/public/interest-rate-loan-quota
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取市场借币杠杆利率和借币限额
result = publicDataAPI.get_interest_rate_loan_quota()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "configCcyList": [
                {
                    "ccy": "USDT",
                    "rate": "0.00043728",
                }
            ],
            "basic": [
                {
                    "ccy": "USDT",
                    "quota": "500000",
                    "rate": "0.00043728"
                },
                {
                    "ccy": "BTC",
                    "quota": "10",
                    "rate": "0.00019992"
                }
            ],
            "vip": [
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "6",
                    "level": "VIP1"
                },
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "7",
                    "level": "VIP2"
                }
            ],
            "config": [
                {
                    "ccy": "USDT",
                    "stgyType": "0",    // normal
                    "quota": "xxxxxx",
                    "level": "VIP 8"
                },
                ......
                {
                    "ccy": "USDT",
                    "stgyType": "1",    // delta neutral
                    "quota": "xxxxx",
                    "level": "VIP 1"
                },
                ......
            ],
            "regular": [
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "1",
                    "level": "Lv1"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">basic</td><td style="text-align: left">Array of objects</td><td style="text-align: left">基础利率和借币限额</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt; rate</td><td style="text-align: left">String</td><td style="text-align: left">日借币利率</td></tr><tr><td style="text-align: left">&gt; quota</td><td style="text-align: left">String</td><td style="text-align: left">基础借币限额</td></tr><tr><td style="text-align: left">vip</td><td style="text-align: left">Array of objects</td><td style="text-align: left">专业用户</td></tr><tr><td style="text-align: left">&gt; level</td><td style="text-align: left">String</td><td style="text-align: left">账户交易手续费等级，如 <code>VIP1</code></td></tr><tr><td style="text-align: left">&gt; loanQuotaCoef</td><td style="text-align: left">String</td><td style="text-align: left">借币限额系数，借币限额 = 基础借币限额 * 该系数</td></tr><tr><td style="text-align: left">&gt; irDiscount</td><td style="text-align: left">String</td><td style="text-align: left"><del>利率的折扣率</del>(已废弃)</td></tr><tr><td style="text-align: left">regular</td><td style="text-align: left">Array of objects</td><td style="text-align: left">普通用户</td></tr><tr><td style="text-align: left">&gt; level</td><td style="text-align: left">String</td><td style="text-align: left">账户交易手续费等级，如 <code>Lv1</code></td></tr><tr><td style="text-align: left">&gt; loanQuotaCoef</td><td style="text-align: left">String</td><td style="text-align: left">借币限额系数，借币限额 = 基础借币限额 * 该系数</td></tr><tr><td style="text-align: left">&gt; irDiscount</td><td style="text-align: left">String</td><td style="text-align: left"><del>利率的折扣率</del>(已废弃)</td></tr><tr><td style="text-align: left">configCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">由自定义绝对值方式配置借币限额的币种<br>当币种在configCcyList中时，用户应该参考config以获取相应限额，而非使用basic/vip/regular</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt; rate</td><td style="text-align: left">String</td><td style="text-align: left">基础杠杆日利率</td></tr><tr><td style="text-align: left">config</td><td style="text-align: left">Array of objects</td><td style="text-align: left">由自定义绝对值方式配置借币限额的币种详情</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">&gt; stgyType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>0</code>：普通策略模式<br><code>1</code>：delta 中性策略模式<br>如果某个币种仅返回0，则表示该借贷额度由普通策略模式的账户和 delta 中性策略模式的账户共享；如果某个币种同时返回0/1，则表示 delta 中性策略模式的账户拥有单独的借贷额度。</td></tr><tr><td style="text-align: left">&gt; quota</td><td style="text-align: left">String</td><td style="text-align: left">借币限额</td></tr><tr><td style="text-align: left">&gt; level</td><td style="text-align: left">String</td><td style="text-align: left">账户交易手续费等级，如 <code>VIP1</code></td></tr></tbody></table>

### 获取衍生品标的指数

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/underlying`

> 请求示例

```
GET /api/v5/public/underlying?instType=FUTURES
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取衍生品标的指数
result = publicDataAPI.get_underlying(
    instType="FUTURES"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "LTC-USDT",
            "BTC-USDT",
            "ETC-USDT"
        ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">uly</td><td style="text-align: left">Array of strings</td><td style="text-align: left">标的指数 如：BTC-USDT</td></tr></tbody></table>

### 获取风险保证金余额

通过该接口获取系统风险保证金余额信息

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/insurance-fund`

> 请求示例

```
GET /api/v5/public/insurance-fund?instType=SWAP&uly=BTC-USD
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)


# 获取风险保证金余额
result = publicDataAPI.get_insurance_fund(
    instType="SWAP",
    uly="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">风险保证金类型<br><code>liquidation_balance_deposit</code>：强平注入<br><code>bankruptcy_loss</code>：穿仓亏损<br><del><code>platform_revenue</code>：平台收入注入</del>（已弃用，返回空值。将在后续更新中删除）<br><del><code>adl</code>：自动减仓历史数据</del>（已弃用，返回空值。将在后续更新中删除）<br>默认返回全部类型</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种<br><code>交割</code>/<code>永续</code>/<code>期权</code>情况下，<code>instFamily</code>必传</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种， 仅适用<code>币币杠杆</code>，且必填写</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "adlType": "",
                    "amt": "1343.1308",
                    "balance": "1369179138.7489",
                    "ccy": "ETH",
                    "maxBal": "",
                    "maxBalTs": "",
                    "ts": "1704883083000",
                    "type": "liquidation_balance_deposit"
                }
            ],
            "instFamily": "ETH-USD",
            "instType": "OPTION",
            "total": "1369179138.7489"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">total</td><td style="text-align: left">String</td><td style="text-align: left">平台风险保证金总计，单位为USD</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">风险保证金详情</td></tr><tr><td style="text-align: left">&gt; balance</td><td style="text-align: left">String</td><td style="text-align: left">风险保证金总量</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">风险保证金更新数量<br>在type为<code>liquidation_balance_deposit</code>或<code>bankruptcy_loss</code>时适用</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">风险保证金总量对应的币种</td></tr><tr><td style="text-align: left">&gt; type</td><td style="text-align: left">String</td><td style="text-align: left">风险保证金类型<br><code>liquidation_balance_deposit</code>：强平注入<br><code>bankruptcy_loss</code>：穿仓亏损<br><del><code>platform_revenue</code>：平台收入注入</del>（已弃用，返回空值）<br><del><code>adl</code>：自动减仓历史数据</del>（已弃用，返回空值）</td></tr><tr><td style="text-align: left">&gt; maxBal</td><td style="text-align: left">String</td><td style="text-align: left"><del>过去八小时内的风险保证金余额最大值<br>仅在type为<code>adl</code>时适用</del>（已弃用，返回空值）</td></tr><tr><td style="text-align: left">&gt; maxBalTs</td><td style="text-align: left">String</td><td style="text-align: left"><del>过去八小时内风险保证金余额最大值对应的时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅在type为<code>adl</code>时适用</del>（已弃用，返回空值）</td></tr><tr><td style="text-align: left">&gt; decRate</td><td style="text-align: left">String</td><td style="text-align: left"><del>风险保证金实时下降率（balance与maxBal相比较）<br>仅在type为<code>adl</code>时适用</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; adlType</td><td style="text-align: left">String</td><td style="text-align: left"><del>关于自动减仓的事件<br><code>rate_adl_start</code>：由于风险保证金下降率过高造成的自动减仓开始<br><code>bal_adl_start</code>：由于风险保证金余额下降过高造成的自动减仓开始<br><code>pos_adl_start</code>：由于强平单的规模积累到一定程度的自动减仓开始（仅适用于盘前交易市场）<br><code>adl_end</code>：自动减仓结束<br>仅在type为<code>adl</code>时适用</del>（已弃用，返回空值）</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">风险保证金更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
\`regular\_update\` 类型已被删除。\`adl\` 和 \`platform\_revenue\` 类型已弃用，当前返回空值；将在后续更新中删除。\`amt\` 字段用于展示 type 为 \`liquidation\_balance\_deposit\` 或 \`bankruptcy\_loss\` 时的风险保证金余额差值，数据一天产生一次，每天下午4点左右（UTC 8）更新。
:::

### 张币转换

由币转换为张，或者张转换为币。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/convert-contract-coin`

> 请求示例

```
GET /api/v5/public/convert-contract-coin?instId=BTC-USD-SWAP&px=35000&sz=0.888
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)


# 张币转换
result = publicDataAPI.get_convert_contract_coin(
    instId="BTC-USD-SWAP",
    px="35000",
    sz="0.888"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">转换类型<br><code>1</code>：币转张<br><code>2</code>：张转币<br>默认为<code>1</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">数量，币转张时，为币的数量，张转币时，为张的数量。</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格<br>币本位合约的张币转换时必填<br>U本位合约，usdt 与张的转换时，必填；coin 与张的转换时，可不填<br>期权的张币转换时，可不填。</td></tr><tr><td style="text-align: left">unit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币的单位<br><code>coin</code>：币<br><code>usds</code>：usdt/usdc<br>默认为 <code>coin</code>，仅适用于<code>交割</code>/<code>永续</code>的U本位合约</td></tr><tr><td style="text-align: left">opType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">将要下单的类型<br><code>open</code>：开仓时将sz舍位<br><code>close</code>：平仓时将sz四舍五入<br>默认值为<code>close</code><br>适用于<code>交割</code>/<code>永续</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "instId": "BTC-USD-SWAP",
            "px": "35000",
            "sz": "311",
            "type": "1",
            "unit": "coin"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">转换类型<br><code>1</code>：币转张<br><code>2</code>：张转币</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">数量<br>张转币时，为币的数量；币转张时，为张的数量。</td></tr><tr><td style="text-align: left">unit</td><td style="text-align: left">String</td><td style="text-align: left">币的单位<br><code>coin</code>：币<br><code>usds</code>：usdt/usdc</td></tr></tbody></table>

### 获取期权价格梯度

获取产品价格梯度信息

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/instrument-tick-bands`

> 请求示例

```
GET /api/v5/public/instrument-tick-bands?instType=OPTION
```

```
GET /api/v5/public/instrument-tick-bands?instType=EVENTS
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种，仅适用于 <code>OPTION</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instType": "OPTION",
            "instFamily": "BTC-USD",
            "tickBand": [
                {
                    "minPx": "0",
                    "maxPx": "100",
                    "tickSz": "0.1"
                },
                {
                    "minPx": "100",
                    "maxPx": "10000",
                    "tickSz": "1"
                }
            ]
        },
        {
            "instType": "OPTION",
            "instFamily": "ETH-USD",
            "tickBand": [
                {
                    "minPx": "0",
                    "maxPx": "100",
                    "tickSz": "0.1"
                },
                {
                    "minPx": "100",
                    "maxPx": "10000",
                    "tickSz": "1"
                }
            ]
        }
    ]
}
```

> 返回结果：EVENTS

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instType": "EVENTS",
            "instFamily": "",
            "tickBand": [
                {
                    "minPx": "0.001",
                    "maxPx": "0.04",
                    "tickSz": "0.001"
                },
                {
                    "minPx": "0.04",
                    "maxPx": "0.96",
                    "tickSz": "0.01"
                },
                {
                    "minPx": "0.96",
                    "maxPx": "0.999",
                    "tickSz": "0.001"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种。仅适用于 <code>OPTION</code></td></tr><tr><td style="text-align: left">tickBand</td><td style="text-align: left">Array of objects</td><td style="text-align: left">价格梯度。对于 <code>EVENTS</code>，返回适用于所有事件合约的统一价格梯度配置。</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">下单最低价格</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">下单最高价格</td></tr><tr><td style="text-align: left">&gt; tickSz</td><td style="text-align: left">String</td><td style="text-align: left">下单价格精度，如 <code>0.0001</code></td></tr></tbody></table>

### 获取溢价历史数据

获取最近6个月的溢价历史数据

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/premium-history`

> 请求示例

```
GET /api/v5/public/premium-history?instId=BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code><br>适用于<code>永续</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳（不包含）之前的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳（不包含）之后的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为<code>100</code>。默认返回<code>100</code>条。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "instId": "BTC-USDT-SWAP",
            "premium": "0.0000578896878167",
            "ts": "1713925924000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID ，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">premium</td><td style="text-align: left">String</td><td style="text-align: left">溢价指数<br>公式：[max (0，深度加权买价 - 指数价格) – max (0，指数价格 – 深度加权卖价)] / 指数价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取指数行情

获取指数行情数据

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/index-tickers`

> 请求示例

```
GET /api/v5/market/index-tickers?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取指数行情
result = marketDataAPI.get_index_tickers(
    instId="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">指数计价单位， 目前只有 <code>USD/USDT/BTC/USDC</code>为计价单位的指数，<code>quoteCcy</code>和<code>instId</code>必须填写一个</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">指数，如 <code>BTC-USD</code><br>与 <code>uly</code> 含义相同。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instId": "BTC-USDT",
            "idxPx": "43350",
            "high24h": "43649.7",
            "sodUtc0": "43444.1",
            "open24h": "43640.8",
            "low24h": "43261.9",
            "sodUtc8": "43328.7",
            "ts": "1649419644492"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">指数</td></tr><tr><td style="text-align: left">idxPx</td><td style="text-align: left">String</td><td style="text-align: left">最新指数价格</td></tr><tr><td style="text-align: left">high24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时指数最高价格</td></tr><tr><td style="text-align: left">low24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时指数最低价格</td></tr><tr><td style="text-align: left">open24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时指数开盘价格</td></tr><tr><td style="text-align: left">sodUtc0</td><td style="text-align: left">String</td><td style="text-align: left">UTC 0 时开盘价</td></tr><tr><td style="text-align: left">sodUtc8</td><td style="text-align: left">String</td><td style="text-align: left">UTC+8 时开盘价</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">指数价格更新时间，Unix时间戳的毫秒数格式，如<code>1597026383085</code></td></tr></tbody></table>

### 获取指数K线数据

指数K线数据每个粒度最多可获取最近1,440条。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/index-candles`

> 请求示例

```
GET /api/v5/market/index-candles?instId=BTC-USD
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取指数K线数据
result = marketDataAPI.get_index_candlesticks(
    instId="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">现货指数，如 <code>BTC-USD</code><br>与 <code>uly</code> 含义相同。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [<code>1m</code>/<code>3m</code>/<code>5m</code>/<code>15m</code>/<code>30m</code>/<code>1H</code>/<code>2H</code>/<code>4H</code>]<br>UTC+8开盘价k线：[<code>6H</code>/<code>12H</code>/<code>1D</code>/<code>1W</code>/<code>1M</code>/<code>3M</code>]<br>UTC+0开盘价k线：[<code>6Hutc</code>/<code>12Hutc</code>/<code>1Dutc</code>/<code>1Wutc</code>/<code>1Mutc</code>/<code>3Mutc</code>]</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为<code>100</code>，不填默认返回<code>100</code>条</td></tr></tbody></table>

> 返回结果

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
        "0"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

::: tip
返回的第一条K线数据可能不是完整周期k线，返回值数组顺序分别为是：\[ts,o,h,l,c,confirm\]
:::

### 获取指数历史K线数据

获取最近几年的指数K线数据

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/history-index-candles`

> 请求示例

```
GET /api/v5/market/history-index-candles?instId=BTC-USD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">现货指数，如<code>BTC-USD</code><br>与 <code>uly</code> 含义相同。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/1W/1M]<br>UTC+0开盘价k线：[/6Hutc/12Hutc/1Dutc/1Wutc/1Mutc]</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

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
        "1"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,o,h,l,c,confirm\]
:::

### 获取标记价格K线数据

标记价格K线数据每个粒度最多可获取最近1,440条。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/mark-price-candles`

> 请求示例

```
GET /api/v5/market/mark-price-candles?instId=BTC-USD-SWAP
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取标记价格K线数据
result = marketDataAPI.get_mark_price_candlesticks(
    instId="BTC-USD-SWAP"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/1W/1M/3M]<br>UTC+0开盘价k线：[6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc]</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

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
        "0"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

::: tip
返回的第一条K线数据可能不是完整周期k线，返回值数组顺序分别为是：\[ts,o,h,l,c,confirm\]
:::

### 获取标记价格历史K线数据

获取最近几年的标记价格K线数据

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/history-mark-price-candles`

> 请求示例

```
GET /api/v5/market/history-mark-price-candles?instId=BTC-USD-SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/1W/1M]<br>UTC+0开盘价k线：[6Hutc/12Hutc/1Dutc/1Wutc/1Mutc]</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

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
        "1"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,o,h,l,c,confirm\]
:::

### 获取法币汇率

该接口提供的是2周的平均汇率数据

#### 限速：1次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/exchange-rate`

> 请求示例

```
GET /api/v5/market/exchange-rate
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取法币汇率
result = marketDataAPI.get_exchange_rate(
)
print(result)
```

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "usdCny": "7.162"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">usdCny</td><td style="text-align: left">String</td><td style="text-align: left">人民币兑美元汇率</td></tr></tbody></table>

### 获取指数成分数据

查询市场上的指数成分信息数据

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/index-components`

> 请求示例

```
GET /api/v5/market/index-components?index=BTC-USD
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取指数成分数据
result = marketDataAPI.get_index_components(
    index="BTC-USD"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">index</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">指数，如 <code>BTC-USDT</code><br>与 <code>uly</code> 含义相同。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": {
        "components": [
            {
                "symbol": "BTC/USDT",
                "symPx": "52733.2",
                "wgt": "0.25",
                "cnvPx": "52733.2",
                "exch": "OKEx"
            },
            {
                "symbol": "BTC/USDT",
                "symPx": "52739.87000000",
                "wgt": "0.25",
                "cnvPx": "52739.87000000",
                "exch": "Binance"
            },
            {
                "symbol": "BTC/USDT",
                "symPx": "52729.1",
                "wgt": "0.25",
                "cnvPx": "52729.1",
                "exch": "Huobi"
            },
            {
                "symbol": "BTC/USDT",
                "symPx": "52739.47929397",
                "wgt": "0.25",
                "cnvPx": "52739.47929397",
                "exch": "Poloniex"
            }
        ],
        "last": "52735.4123234925",
        "index": "BTC-USDT",
        "ts": "1630985335599"
    }
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">index</td><td style="text-align: left">String</td><td style="text-align: left">指数名称</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新指数价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr><tr><td style="text-align: left">components</td><td style="text-align: left">String</td><td style="text-align: left">成分</td></tr><tr><td style="text-align: left">&gt; exch</td><td style="text-align: left">String</td><td style="text-align: left">交易所名称</td></tr><tr><td style="text-align: left">&gt; symbol</td><td style="text-align: left">String</td><td style="text-align: left">采集的币对名称</td></tr><tr><td style="text-align: left">&gt; symPx</td><td style="text-align: left">String</td><td style="text-align: left">采集的币对价格</td></tr><tr><td style="text-align: left">&gt; wgt</td><td style="text-align: left">String</td><td style="text-align: left">权重</td></tr><tr><td style="text-align: left">&gt; cnvPx</td><td style="text-align: left">String</td><td style="text-align: left">参与指数计算的成分价格，由 <code>symPx</code> 经配置处理后得出，处理可能包括报价单位换算、倍数调整（如 ×10 或 ×0.1）或 EMA 平滑，因此可能与 <code>symPx</code> 不同</td></tr></tbody></table>

### 获取经济日历数据

::: tip
该接口需验证后使用。仅支持实盘服务。
:::

获取过去三个月的宏观经济日历数据。三个月前的历史数据仅开放给交易费等级VIP1及以上的用户。

#### 限速：1次/5s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/economic-calendar`

> 请求示例

```
GET /api/v5/public/economic-calendar
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>region</td><td>string</td><td>否</td><td>国家，地区或实体<br><code>afghanistan</code>, <code>albania</code>, <code>algeria</code>, <code>andorra</code>, <code>angola</code>, <code>antigua_and_barbuda</code>, <code>argentina</code>, <code>armenia</code>, <code>aruba</code>, <code>australia</code>, <code>austria</code>, <code>azerbaijan</code>, <code>bahamas</code>, <code>bahrain</code>, <code>bangladesh</code>, <code>barbados</code>, <code>belarus</code>, <code>belgium</code>, <code>belize</code>, <code>benin</code>, <code>bermuda</code>, <code>bhutan</code>, <code>bolivia</code>, <code>bosnia_and_herzegovina</code>, <code>botswana</code>, <code>brazil</code>, <code>brunei</code>, <code>bulgaria</code>, <code>burkina_faso</code>, <code>burundi</code>, <code>cambodia</code>, <code>cameroon</code>, <code>canada</code>, <code>cape_verde</code>, <code>cayman_islands</code>, <code>central_african_republic</code>, <code>chad</code>, <code>chile</code>, <code>china</code>, <code>colombia</code>, <code>comoros</code>, <code>congo</code>, <code>costa_rica</code>, <code>croatia</code>, <code>cuba</code>, <code>cyprus</code>, <code>czech_republic</code>, <code>denmark</code>, <code>djibouti</code>, <code>dominica</code>, <code>dominican_republic</code>, <code>east_timor</code>, <code>ecuador</code>, <code>egypt</code>, <code>el_salvador</code>, <code>equatorial_guinea</code>, <code>eritrea</code>, <code>estonia</code>, <code>ethiopia</code>, <code>euro_area</code>, <code>european_union</code>, <code>faroe_islands</code>, <code>fiji</code>, <code>finland</code>, <code>france</code>, <code>g20</code>, <code>g7</code>, <code>gabon</code>, <code>gambia</code>, <code>georgia</code>, <code>germany</code>, <code>ghana</code>, <code>greece</code>, <code>greenland</code>, <code>grenada</code>, <code>guatemala</code>, <code>guinea</code>, <code>guinea_bissau</code>, <code>guyana</code>, <code>hungary</code>, <code>haiti</code>, <code>honduras</code>, <code>hong_kong</code>, <code>hungary</code>, <code>imf</code>, <code>indonesia</code>, <code>iceland</code>, <code>india</code>, <code>indonesia</code>, <code>iran</code>, <code>iraq</code>, <code>ireland</code>, <code>isle_of_man</code>, <code>israel</code>, <code>italy</code>, <code>ivory_coast</code>, <code>jamaica</code>, <code>japan</code>, <code>jordan</code>, <code>kazakhstan</code>, <code>kenya</code>, <code>kiribati</code>, <code>kosovo</code>, <code>kuwait</code>, <code>kyrgyzstan</code>, <code>laos</code>, <code>latvia</code>, <code>lebanon</code>, <code>lesotho</code>, <code>liberia</code>, <code>libya</code>, <code>liechtenstein</code>, <code>lithuania</code>, <code>luxembourg</code>, <code>macau</code>, <code>macedonia</code>, <code>madagascar</code>, <code>malawi</code>, <code>malaysia</code>, <code>maldives</code>, <code>mali</code>, <code>malta</code>, <code>mauritania</code>, <code>mauritius</code>, <code>mexico</code>, <code>micronesia</code>, <code>moldova</code>, <code>monaco</code>, <code>mongolia</code>, <code>montenegro</code>, <code>morocco</code>, <code>mozambique</code>, <code>myanmar</code>, <code>namibia</code>, <code>nepal</code>, <code>netherlands</code>, <code>new_caledonia</code>, <code>new_zealand</code>, <code>nicaragua</code>, <code>niger</code>, <code>nigeria</code>, <code>north_korea</code>, <code>northern_mariana_islands</code>, <code>norway</code>, <code>opec</code>, <code>oman</code>, <code>pakistan</code>, <code>palau</code>, <code>palestine</code>, <code>panama</code>, <code>papua_new_guinea</code>, <code>paraguay</code>, <code>peru</code>, <code>philippines</code>, <code>poland</code>, <code>portugal</code>, <code>puerto_rico</code>, <code>qatar</code>, <code>russia</code>, <code>republic_of_the_congo</code>, <code>romania</code>, <code>russia</code>, <code>rwanda</code>, <code>slovakia</code>, <code>samoa</code>, <code>san_marino</code>, <code>sao_tome_and_principe</code>, <code>saudi_arabia</code>, <code>senegal</code>, <code>serbia</code>, <code>seychelles</code>, <code>sierra_leone</code>, <code>singapore</code>, <code>slovakia</code>, <code>slovenia</code>, <code>solomon_islands</code>, <code>somalia</code>, <code>south_africa</code>, <code>south_korea</code>, <code>south_sudan</code>, <code>spain</code>, <code>sri_lanka</code>, <code>st_kitts_and_nevis</code>, <code>st_lucia</code>, <code>sudan</code>, <code>suriname</code>, <code>swaziland</code>, <code>sweden</code>, <code>switzerland</code>, <code>syria</code>, <code>taiwan</code>, <code>tajikistan</code>, <code>tanzania</code>, <code>thailand</code>, <code>togo</code>, <code>tonga</code>, <code>trinidad_and_tobago</code>, <code>tunisia</code>, <code>turkey</code>, <code>turkmenistan</code>, <code>uganda</code>, <code>ukraine</code>, <code>united_arab_emirates</code>, <code>united_kingdom</code>, <code>united_states</code>, <code>uruguay</code>, <code>uzbekistan</code>, <code>vanuatu</code>, <code>venezuela</code>, <code>vietnam</code>, <code>world</code>, <code>yemen</code>, <code>zambia</code>, <code>zimbabwe</code></td></tr><tr><td>importance</td><td>string</td><td>否</td><td>重要性<br><code>1</code>: 低<br><code>2</code>: 中等<br><code>3</code>: 高</td></tr><tr><td>before</td><td>String</td><td>否</td><td>查询发布日期(date)之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>after</td><td>String</td><td>否</td><td>查询发布日期(date)之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code><br>默认值为请求时刻的时间戳</td></tr><tr><td>limit</td><td>String</td><td>否</td><td>分页返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "actual": "7.8%",
            "calendarId": "330631",
            "category": "Harmonised Inflation Rate YoY",
            "ccy": "",
            "date": "1700121600000",
            "dateSpan": "0",
            "event": "Harmonised Inflation Rate YoY",
            "forecast": "7.8%",
            "importance": "1",
            "prevInitial": "",
            "previous": "9%",
            "refDate": "1698710400000",
            "region": "Slovakia",
            "uTime": "1700121605007",
            "unit": "%"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>calendarId</td><td>string</td><td>经济日历ID</td></tr><tr><td>date</td><td>string</td><td>actual字段值的预期发布时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>region</td><td>string</td><td>国家，地区或实体</td></tr><tr><td>category</td><td>string</td><td>类别名</td></tr><tr><td>event</td><td>string</td><td>事件名</td></tr><tr><td>refDate</td><td>string</td><td>当前事件指向的日期</td></tr><tr><td>actual</td><td>string</td><td>事件实际值</td></tr><tr><td>previous</td><td>string</td><td>当前事件上个周期的最新实际值。<br>若发生数据修正，该字段存储上个周期修正后的实际值。</td></tr><tr><td>forecast</td><td>string</td><td>由权威经济学家共同得出的预测值</td></tr><tr><td>dateSpan</td><td>string</td><td><code>0</code>：事件的具体发生时间已知<br><code>1</code>：事件的具体发生日期已知，但时间未知</td></tr><tr><td>importance</td><td>string</td><td>重要性<br><code>1</code>: 低<br><code>2</code>: 中等<br><code>3</code>: 高</td></tr><tr><td>uTime</td><td>string</td><td>当前事件的最新更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>prevInitial</td><td>string</td><td>该事件上一周期的初始值<br>仅在修正发生时有值</td></tr><tr><td>ccy</td><td>string</td><td>事件实际值对应的货币</td></tr><tr><td>unit</td><td>string</td><td>事件实际值对应的单位</td></tr></tbody></table>

### 获取历史市场数据

::: tip
**数据覆盖范围**  
历史数据回填正在进行中，不同模块、产品和时间段的数据覆盖范围可能有所差异。数据集将持续扩展，以提供更全面的历史数据覆盖。
:::

::: tip
**旧数据格式注意**  
对于模块1（交易历史），一些旧的历史文件可能包含同时带有中文字符和英文列名的列标题。数据回填完成后，所有中文字符将被移除。请在解析数据时考虑到这一点。
:::

::: tip
**数据发布安排**  
模块 1、2、3、11 的数据通常在 T+2 可用；订单簿数据通常在 T+3 可用。
:::

获取OKX历史市场数据。

#### 限速：2次/5s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/market-data-history`

> 请求示例

```
GET /api/v5/public/market-data-history?module=1&instType=SWAP&instFamilyList=BTC-USDT&dateAggrType=daily&begin=1756604295000&end=1756777095000
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名称</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">module</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">数据模块类型<br><code>1</code>: 逐笔成交历史<br><code>2</code>: 1分钟K线<br><code>3</code>: 资金费率<br><code>4</code>: 400档位深度<br><code>5</code>: 5000档位深度（自2025年11月1日起支持）<br><code>6</code>: 50档位深度 (将逐步弃用，请使用 module = <code>4</code>,<code>5</code> 代替)<br><code>11</code>: 借币利率</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code><br><code>FUTURES</code><br><code>SWAP</code><br><code>OPTION</code></td></tr><tr><td style="text-align: left">instIdList</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID列表，例如 <code>BTC-USDT</code> 或 <code>ANY</code> 表示所有产品（<code>ANY</code> 仅支持 module = <code>1</code>, <code>2</code>, <code>3</code>, <code>11</code> &amp; dateAggrType = <code>daily</code>）<br>多个产品请用英文逗号分隔，如 <code>BTC-USDT,ETH-USDT</code><br>最大长度 = 10<br>仅适用于instType = <code>SPOT</code></td></tr><tr><td style="text-align: left">instFamilyList</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种列表，例如 <code>BTC-USDT</code> 或 <code>ANY</code> 表示所有产品（<code>ANY</code> 仅支持 module = <code>1</code>, <code>2</code>, <code>3</code>, <code>11</code> &amp; dateAggrType = <code>daily</code>）<br>多个品种请用英文逗号分隔，如 <code>BTC-USDT,ETH-USDT</code><br>最大长度 = 10 (当module = <code>6</code> &amp; instType = <code>OPTION</code>时为1)<br>仅适用于instType ≠ <code>SPOT</code></td></tr><tr><td style="text-align: left">dateAggrType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">日期聚合类型<br><code>daily</code> (不支持 module = <code>3</code> &amp; instFamilyList ≠ <code>ANY</code>)<br><code>monthly</code> （不支持module = <code>6</code>）</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">开始时间戳，Unix时间戳格式为毫秒数（包含该时间）<br>日度最大范围：20天，月度最大范围：20个月</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">结束时间戳，Unix时间戳格式为毫秒数（包含该时间）<br>当module = <code>6</code> &amp; instType = <code>OPTION</code>时，仅返回<code>end</code>指定日期的数据</td></tr></tbody></table>

> 返回示例

```
{
  "code": "0",
  "data": [{
    "dateAggrType": "daily",
    "details": [{
      "dateRangeEnd": "1756656000000",
      "dateRangeStart": "1756569600000",
      "groupDetails": [{
        "dateTs": "1756656000000",
        "filename": "BTC-USDT-SWAP-trades-2025-09-01.zip",
        "sizeMB": "10.82",
        "url": "https://static.okx.com/cdn/okex/traderecords/trades/daily/20250901/BTC-USDT-SWAP-trades-2025-09-01.zip"
      },
      {
        "dateTs": "1756569600000",
        "filename": "BTC-USDT-SWAP-trades-2025-08-31.zip",
        "sizeMB": "4.82",
        "url": "https://static.okx.com/cdn/okex/traderecords/trades/daily/20250831/BTC-USDT-SWAP-trades-2025-08-31.zip"
      }],
      "groupSizeMB": "15.64",
      "instFamily": "BTC-USDT",
      "instId": "",
      "instType": "SWAP"
    }],
    "totalSizeMB": "15.64",
    "ts": "1756882260390"
  }],
  "msg": ""
}
```

> 返回示例，当没有数据文件时

```
{
    "code": "0",
    "data": [
        {
            "dateAggrType": "monthly",
            "details": [],
            "totalSizeMB": "0",
            "ts": "1756889595507"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名称</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">响应时间戳，Unix时间戳格式为毫秒数</td></tr><tr><td style="text-align: left">totalSizeMB</td><td style="text-align: left">String</td><td style="text-align: left">所有数据文件总大小，单位MB</td></tr><tr><td style="text-align: left">dateAggrType</td><td style="text-align: left">String</td><td style="text-align: left">日期聚合类型<br><code>daily</code><br><code>monthly</code></td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array</td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; dateRangeStart</td><td style="text-align: left">String</td><td style="text-align: left">数据范围开始日期，Unix时间戳格式为毫秒数（包含该时间）</td></tr><tr><td style="text-align: left">&gt; dateRangeEnd</td><td style="text-align: left">String</td><td style="text-align: left">数据范围结束日期，Unix时间戳格式为毫秒数（包含该时间）</td></tr><tr><td style="text-align: left">&gt; groupSizeMB</td><td style="text-align: left">String</td><td style="text-align: left">数据组大小，单位MB</td></tr><tr><td style="text-align: left">&gt; groupDetails</td><td style="text-align: left">Array</td><td style="text-align: left"></td></tr><tr><td style="text-align: left">&gt;&gt; filename</td><td style="text-align: left">String</td><td style="text-align: left">数据文件名，例如 <code>BTC-USDT-SWAP-trades-2025-05-15.zip</code></td></tr><tr><td style="text-align: left">&gt;&gt; dataTs</td><td style="text-align: left">String</td><td style="text-align: left">数据日期时间戳，Unix时间戳格式为毫秒数</td></tr><tr><td style="text-align: left">&gt;&gt; sizeMB</td><td style="text-align: left">String</td><td style="text-align: left">文件大小，单位MB</td></tr><tr><td style="text-align: left">&gt;&gt; url</td><td style="text-align: left">String</td><td style="text-align: left">下载链接</td></tr></tbody></table>

::: tip
**数据查询规则**  
• 仅使用时间戳的日期部分（yyyy-mm-dd），忽略时间部分  
• begin和end时间戳均为包含该时间  
• 数据按倒序时间顺序返回（越接近end的数据越靠前）  
• 如果查询超出记录限制，返回最接近end时间戳的数据  
• **例外：** 当 module = 6 且 instType = OPTION 时，仅返回 end 指定日期的数据
:::

::: tip
**时间戳解析的时区规范**  
将Unix时间戳转换为日期时，以下时区约定适用于所有时间戳字段（begin, end, dateRangeStart, dateRangeEnd, dataTs）：  
• **深度数据**（模块4、5、6）：UTC+0  
• **其他数据模块**（模块1、2、3、11）：UTC+8
:::

### 获取 MM 币对分类类型

获取当前做市商（MM）计划 SPOT 和 SWAP 产品的币对分类类型列表。

#### 限速：每2秒5次请求

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/mm-instrument-types`

> 请求示例

```
GET /api/v5/public/mm-instrument-types?instType=SWAP
```

```
import okx.PublicData as PublicData

flag = "0"  # 实盘:0 , 模拟盘：1

publicDataAPI = PublicData.PublicAPI(flag=flag)

# 获取 MM 币对分类类型
result = publicDataAPI.get_mm_instrument_types(
    instType="SWAP"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code><br><code>SWAP</code><br>未指定时返回全部类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code>、<code>BTC-USDT-SWAP</code><br>指定时返回至多一条记录</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "pairType": "A"
        },
        {
            "instId": "ETH-USDT-SWAP",
            "instType": "SWAP",
            "pairType": "A"
        },
        {
            "instId": "XAU-USDT-SWAP",
            "instType": "SWAP",
            "pairType": "B-TradFi"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code><br><code>SWAP</code></td></tr><tr><td style="text-align: left">pairType</td><td style="text-align: left">String</td><td style="text-align: left">MM 计划分类类型<br><code>A</code>：高流动性品种<br><code>B-Crypto</code>：中低流动性加密资产<br><code>B-TradFi</code>：传统金融品种（仅 SWAP）</td></tr></tbody></table>

## WebSocket

### 产品频道

增量数据的触发场景有：  
1\. 当有产品状态 state 变化时（如期货交割、期权行权、新合约/币对上线、人工暂停/恢复交易等）  
2\. 当交易参数变更（tickSz,minSz,maxMktSz）时  
3\. 当上线时间或者下线时间（expTime， listTime）变更时  

#### URL Path

/ws/v5/public

> 请求示例

```
{ 
  "id": "1512",
  "op": "subscribe",  
  "args":   [    
    {     
      "channel": "instruments",
      "instType": "SPOT"
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
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "instruments",
          "instType": "SPOT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>instruments</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "instruments",
        "instType": "SPOT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"instruments\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "instruments",
    "instType": "SPOT"
  },
  "data": [
    {
        "alias": "",
        "auctionEndTime": "",
        "baseCcy": "BTC",
        "category": "1",
        "ctMult": "",
        "ctType": "",
        "ctVal": "",
        "ctValCcy": "",
        "contTdSwTime": "1704876947000",
        "expTime": "",
        "futureSettlement": false,
        "groupId": "1",
        "instFamily": "",
        "instId": "BTC-USDT",
        "instType": "SPOT",
        "lever": "10",
        "listTime": "1606468572000",
        "lotSz": "0.00000001",
        "maxIcebergSz": "9999999999.0000000000000000",
        "maxLmtAmt": "1000000",
        "maxLmtSz": "9999999999",
        "maxMktAmt": "1000000",
        "maxMktSz": "",
        "maxStopSz": "",
        "maxTriggerSz": "9999999999.0000000000000000",
        "maxTwapSz": "9999999999.0000000000000000",
        "minSz": "0.00001",
        "optType": "",
        "openType": "call_auction",
        "preMktSwTime": "",
        "quoteCcy": "USDT",
        "settleCcy": "",
        "state": "live",
        "ruleType": "normal",
        "stk": "",
        "tickSz": "0.1",
        "uly": "",
        "instIdCode": 1000000000，
        "instCategory": "1",
        "upcChg": [
            {
                "param": "tickSz",
                "newValue": "0.0001",
                "effTime": "1704876947000"
            }
        ]
    }
  ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code>。仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt; category</td><td style="text-align: left">String</td><td style="text-align: left"><del>币种类别</del>（已废弃）</td></tr><tr><td style="text-align: left">&gt; uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数，如 <code>BTC-USD</code>，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; groupId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品手续费分组ID<br>现货：<br><code>3</code>：TRY现货<br><code>5</code>：BRL现货<br><code>7</code>：AED现货<br><code>8</code>：AUD现货<br><code>10</code>：SGD现货<br><code>11</code>：零手续费现货<br><code>12</code>：现货分组一<br><code>13</code>：现货分组二<br><code>14</code>：现货分组三<br><code>15</code>: 现货特别分组<br><code>17</code>：现货稳定币分组<br><code>22</code>：现货RWA分组二<br><br>交割合约：<br><code>5</code>：交割合约分组一<br><code>6</code>：交割合约分组二<br><code>8</code>：XPERP分组二<br><code>10</code>：XPERP RWA分组二<br><br>永续合约：<br><code>4</code>：永续合约分组一<br><code>5</code>：永续合约分组二<br><code>6</code>：SWAP RWA分组一<br><code>7</code>：SWAP RWA分组二<br><br>期权：<br><code>1</code>：币本位期权<br><br><strong>用户需要同时使用instType和groupId来确定一个交易产品的交易手续费分组；用户应该将此接口和<a href="zh.html#trading-account-rest-api-get-fee-rates">获取当前账户交易手续费费率</a>一起使用，以获取特定交易产品的手续费率</strong><br><br><strong>部分枚举值可能不适用于您，以实际返回为准</strong></td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种，如 <code>BTC-USD</code>，仅适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code>中<code>BTC</code>，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code>中<code>USDT</code>，仅适用于<code>币币/币币杠杆</code></td></tr><tr><td style="text-align: left">&gt; settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">盈亏结算和保证金币种，如 <code>BTC</code>，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值</td></tr><tr><td style="text-align: left">&gt; ctMult</td><td style="text-align: left">String</td><td style="text-align: left">合约乘数</td></tr><tr><td style="text-align: left">&gt; ctValCcy</td><td style="text-align: left">String</td><td style="text-align: left">合约面值计价币种</td></tr><tr><td style="text-align: left">&gt; optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型<br><code>C</code>：看涨期权<br><code>P</code>：看跌期权<br>仅适用于<code>期权</code></td></tr><tr><td style="text-align: left">&gt; stk</td><td style="text-align: left">String</td><td style="text-align: left">行权价格，仅适用于 <code>期权</code></td></tr><tr><td style="text-align: left">&gt; listTime</td><td style="text-align: left">String</td><td style="text-align: left">上线时间</td></tr><tr><td style="text-align: left">&gt; auctionEndTime</td><td style="text-align: left">String</td><td style="text-align: left"><del>集合竞价结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于通过集合竞价方式上线的<code>币币</code>，其余情况返回""（已废弃，请使用contTdSwTime）</del></td></tr><tr><td style="text-align: left">&gt; contTdSwTime</td><td style="text-align: left">String</td><td style="text-align: left">连续交易开始时间，从集合竞价、提前挂单切换到连续交易的时间，Unix时间戳格式，单位为毫秒。e.g. <code>1597026383085</code>。<br>仅适用于通过集合竞价或提前挂单上线的<code>SPOT</code>/<code>MARGIN</code>，在其他情况下返回""。</td></tr><tr><td style="text-align: left">&gt; preMktSwTime</td><td style="text-align: left">String</td><td style="text-align: left">盘前交易产品切换为正常交易的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>仅适用于盘前<code>SWAP</code> 与盘前 X-Perp <code>FUTURES</code>。当盘前 X-Perp 转换为正常 X-Perp 时填充</td></tr><tr><td style="text-align: left">&gt; openType</td><td style="text-align: left">String</td><td style="text-align: left">开盘类型<br><code>fix_price</code>: 定价开盘<br><code>pre_quote</code>: 提前挂单<br><code>call_auction</code>: 集合竞价<br>只适用于<code>SPOT</code>/<code>MARGIN</code>，其他业务线返回""</td></tr><tr><td style="text-align: left">&gt; expTime</td><td style="text-align: left">String</td><td style="text-align: left">产品下线时间<br>适用于<code>币币/杠杆/交割/永续/期权</code>，对于 <code>交割/期权</code>，为自然的交割/行权时间；如果<code>币币/杠杆/交割/永续</code>产品人工下线，为产品下线时间，有变动就会推送。</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">该产品支持的最大杠杆倍数<br>不适用于<code>币币</code>/<code>期权</code>。可用来区分<code>币币杠杆</code>和<code>币币</code></td></tr><tr><td style="text-align: left">&gt; tickSz</td><td style="text-align: left">String</td><td style="text-align: left">下单价格精度，如 <code>0.0001</code>。<br>对于 <code>OPTION</code>/<code>EVENTS</code>，该值为 tick band 中的最小下单价格精度。</td></tr><tr><td style="text-align: left">&gt; lotSz</td><td style="text-align: left">String</td><td style="text-align: left">下单数量精度<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; minSz</td><td style="text-align: left">String</td><td style="text-align: left">最小下单数<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; ctType</td><td style="text-align: left">String</td><td style="text-align: left">合约类型<br><code>linear</code>：正向合约<br><code>inverse</code>：反向合约<br>仅适用于<code>交割/永续</code></td></tr><tr><td style="text-align: left">&gt; alias</td><td style="text-align: left">String</td><td style="text-align: left">合约日期别名（已废弃，将于 2026 年 4 月底下线，请使用 expTime 字段获取交割时间）<br><code>this_week</code>：本周<br><code>next_week</code>：次周<br><code>this_month</code>：本月<br><code>next_month</code>：次月<br><code>quarter</code>：季度<br><code>next_quarter</code>：次季度<br><code>this_five_years</code>：当期五年合约<br><code>next_five_years</code>：次期五年合约<br>仅适用于<code>交割</code></td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">产品状态<br><code>live</code>：交易中<br><code>suspend</code>：暂停中<br><code>expired</code>：已过期<br><code>rebase</code>：合约在变基中，不可交易，仅适用于<code>SWAP</code><br><code>post_only</code>：仅接受 post-only 订单；已有 post-only 订单可改单和撤单。其他订单类型（市价单、IOC、FOK、普通限价单）将被拒绝。仅适用于 <code>SWAP</code><br><code>preopen</code>：预上线，交割和期权合约轮转生成到开始交易；部分交易产品上线前<br><code>test</code>：测试中（测试产品，不可交易）<br><code>settling</code>：结算中，仅适用于 <code>EVENTS</code></td></tr><tr><td style="text-align: left">&gt; ruleType</td><td style="text-align: left">String</td><td style="text-align: left">交易规则类型<br><code>normal</code>：普通交易<br><code>pre_market</code>：盘前交易，含盘前 X-Perp <code>FUTURES</code><br><code>rebase_contract</code>：盘前变基合约<br><code>xperp</code>：永续合约风格的交割合约，仅适用于部分 <code>FUTURES</code> 合约。盘前 X-Perp 转换为正常 X-Perp 后，由 <code>pre_market</code> 变为 <code>xperp</code></td></tr><tr><td style="text-align: left">&gt; maxLmtSz</td><td style="text-align: left">String</td><td style="text-align: left">限价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; maxMktSz</td><td style="text-align: left">String</td><td style="text-align: left">市价单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">&gt; maxTwapSz</td><td style="text-align: left">String</td><td style="text-align: left">时间加权单的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; maxIcebergSz</td><td style="text-align: left">String</td><td style="text-align: left">冰山委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; maxTriggerSz</td><td style="text-align: left">String</td><td style="text-align: left">计划委托委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>交易货币</code></td></tr><tr><td style="text-align: left">&gt; maxStopSz</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损市价委托的单笔最大委托数量<br>合约的数量单位是<code>张</code>，现货的数量单位是<code>USDT</code></td></tr><tr><td style="text-align: left">&gt; futureSettlement</td><td style="text-align: left">Boolean</td><td style="text-align: left">交割合约是否支持每日结算<br>适用于<code>全仓</code><code>交割</code></td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">产品唯一标识代码。<br>对于简单二进制编码，您必须使用 <code>instIdCode</code> 而不是 <code>instId</code>。<br>对于同一<code>instId</code>，实盘和模拟盘的值可能会不一样。<br>当值还未生成时，返回 <code>null</code>。</td></tr><tr><td style="text-align: left">&gt; instCategory</td><td style="text-align: left">String</td><td style="text-align: left">标的资产类别（产品ID的第一部分）。例如：对于 <code>BTC-USDT-SWAP</code>，instCategory 表示 <code>BTC</code> 所属的资产类别。<br><code>1</code>: 加密货币<br><code>3</code>: 股票类资产<br><code>4</code>: 大宗商品<br><code>5</code>: 外汇<br><code>6</code>: 债券<br><code>""</code> 当值不可用时返回空字符串</td></tr><tr><td style="text-align: left">&gt; upcChg</td><td style="text-align: left">Array of objects</td><td style="text-align: left">即将变更的参数列表。当没有即将变更的参数时，返回空数组 []</td></tr><tr><td style="text-align: left">&gt;&gt; param</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数名称。<br><code>tickSz</code><br><code>minSz</code>：若为交割/永续合约（<code>FUTURES</code>/<code>SWAP</code>），<code>lotSz</code> 会同步变更。<br><code>maxMktSz</code></td></tr><tr><td style="text-align: left">&gt;&gt; newValue</td><td style="text-align: left">String</td><td style="text-align: left">即将变更的参数值。</td></tr><tr><td style="text-align: left">&gt;&gt; effTime</td><td style="text-align: left">String</td><td style="text-align: left">生效时间。Unix 时间戳格式，例如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
产品状态变更，是触发instrument接口推送条件： 当合约预上线时，状态变更为预上线（即新生成一个合约，新合约会处于预上线状态）； 当产品下线的时候（如交割合约被交割的时候，期权合约被行权的时候），状态变更为已过期
:::

::: tip
listTime以及contTdSwTime  
对于通过集合竞价/提前挂单方式上线的币币，listTime为集合竞价/提前挂单的开始时间，contTdSwTime为集合竞价/提前挂单的结束时间、连续交易的开始时间；对于其他情况及业务线，listTime即为连续交易开始时间，contTdSwTime将返回""
:::

::: tip
state  
对于\`币币\`、\`杠杆\`、\`永续\`和\`交割\`，状态state在时间到达listTime时由\`preopen\`转变为\`live\`。对于\`期权\`合约，由于内部处理原因，状态可能在\`listTime\`之后短暂延迟变为\`live\`。建议在下单前确认\`state\`为\`live\`。上线前，交易产品频道将推送预上线产品，状态为\`state:preopen\`；若上线被取消，频道将全量推送数据，其中不包括被取消的预上线产品，不做额外通知。交易产品上线时（\`期权\`合约可能在listTime之后短暂时间内），频道将推送状态为交易中\`state:live\`。用户亦可以通过REST接口查询到相应数据。  
当产品下线的时候（如交割合约被交割的时候，期权合约被行权的时候），查询不到该产品
:::

### 事件合约市场频道

推送事件合约市场状态更新及 floorStrike 生成。不推送初始快照。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "op": "subscribe",
    "args": [
        {
            "channel": "event-contract-markets",
            "instType": "EVENTS"
        }
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。用户提供，返回参数中会返回以便于找到相应的请求。字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作。<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">订阅频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名。<br><code>event-contract-markets</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型。<br><code>EVENTS</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "event-contract-markets",
        "instType": "EVENTS"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{\"channel\": \"event-contract-markets\", \"instType\": \"EVENTS\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">事件。<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 连接 ID</td></tr></tbody></table>

> 推送数据示例

```
{
    "arg": {
        "channel": "event-contract-markets"
    },
    "data": [
        {
            "seriesId": "BTC-ABOVE-DAILY",
            "eventId": "BTC-ABOVE-DAILY-260224-1600",
            "instId": "BTC-ABOVE-DAILY-260224-1600-65000",
            "listTime": "1769697132335",
            "fixTime": "",
            "expTime": "1769697132335",
            "state": "live",
            "outcome": "0",
            "floorStrike": "120000",
            "capStrike": "",
            "settleValue": "",
            "disputed": false,
            "hitDir": ""
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅数据</td></tr><tr><td style="text-align: left">&gt; seriesId</td><td style="text-align: left">String</td><td style="text-align: left">系列 ID，如 <code>BTC-ABOVE-DAILY</code></td></tr><tr><td style="text-align: left">&gt; eventId</td><td style="text-align: left">String</td><td style="text-align: left">事件 ID，如 <code>BTC-ABOVE-DAILY-260224-1600</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID，如 <code>BTC-ABOVE-DAILY-260224-1600-65000</code></td></tr><tr><td style="text-align: left">&gt; listTime</td><td style="text-align: left">String</td><td style="text-align: left">上线时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; fixTime</td><td style="text-align: left">String</td><td style="text-align: left">行权价格确定时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。仅适用于 <code>price_up_down</code> 结算方式。</td></tr><tr><td style="text-align: left">&gt; expTime</td><td style="text-align: left">String</td><td style="text-align: left">行权时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。结算后更新。</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">市场状态。<br><code>preopen</code><br><code>live</code><br><code>settling</code><br><code>expired</code></td></tr><tr><td style="text-align: left">&gt; outcome</td><td style="text-align: left">String</td><td style="text-align: left">市场结果。<br><code>0</code>：未确定<br><code>1</code>：YES<br><code>2</code>：NO。<br><code>1</code>/<code>2</code> 仅在 state 为 <code>expired</code> 时适用</td></tr><tr><td style="text-align: left">&gt; floorStrike</td><td style="text-align: left">String</td><td style="text-align: left">导致 YES 结果的最低到期价格</td></tr><tr><td style="text-align: left">&gt; capStrike</td><td style="text-align: left">String</td><td style="text-align: left"><code>between</code> 结算方式中导致 YES 结果的最大到期值。<code>"INF"</code> 表示无上限（最高区间）。<br>非 <code>between</code> 方式返回 <code>""</code>。</td></tr><tr><td style="text-align: left">&gt; settleValue</td><td style="text-align: left">String</td><td style="text-align: left">结算价格。<br>仅在 state 为 <code>expired</code> 时返回</td></tr><tr><td style="text-align: left">&gt; disputed</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否存在争议。<br><code>true</code><br><code>false</code></td></tr><tr><td style="text-align: left">&gt; hitDir</td><td style="text-align: left">String</td><td style="text-align: left">触及方向。仅在结算方式为 <code>hit</code> 时适用。<br><code>up</code>：价格从下方触及<br><code>dn</code>：价格从上方触及<br><code>""</code>：不适用（非 <code>hit</code> 方式）</td></tr></tbody></table>

### 持仓总量频道

获取持仓总量，每3s有数据更新推送一次数据

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "open-interest",
        "instId": "LTC-USD-SWAP"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "open-interest",
          "instId": "LTC-USD-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>open-interest</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "open-interest",
        "instId": "LTC-USD-SWAP"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"open-interest\", \"instId\" : \"LTC-USD-SWAP\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "open-interest",
        "instId": "BTC-USDT-SWAP"
    },
    "data": [
        {
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "oi": "2216113.01000000309",
            "oiCcy": "22161.1301000000309",
            "oiUsd": "1939251795.54769270396321",
            "ts": "1743041250440"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td>&gt; oi</td><td>String</td><td>持仓量，按张为单位</td></tr><tr><td>&gt; oiCcy</td><td>String</td><td>持仓量，按币为单位，如 BTC</td></tr><tr><td>&gt; oiUsd</td><td>String</td><td>持仓量（按<code>USD</code>折算）</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据更新的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 资金费率频道

获取合约资金费率，30秒到90秒内推送一次数据

#### URL Path

/ws/v5/public

> 请求示例

```
{
   "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "funding-rate",
        "instId": "BTC-USD-SWAP"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "funding-rate",
          "instId": "BTC-USD-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>funding-rate</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
   "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "funding-rate",
        "instId": "BTC-USD-SWAP"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"funding-rate\", \"instId\" : \"BTC-USD-SWAP\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
   "arg":{
      "channel":"funding-rate",
      "instId":"BTC-USD-SWAP"
   },
   "data":[
      {
         "fundingRate":"0.0001875391284828",
         "fundingTime":"1700726400000",
         "instId":"BTC-USD-SWAP",
         "instType":"SWAP",
         "method": "current_period",
         "maxFundingRate":"0.00375",
         "minFundingRate":"-0.00375",
         "nextFundingRate":"",
         "nextFundingTime":"1700755200000",
         "premium": "0.0001233824646391",
         "settFundingRate":"0.0001699799259033",
         "settState":"settled",
         "ts":"1700724675402"
      }
   ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：X-Perps 交割合约</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">&gt; method</td><td style="text-align: left">String</td><td style="text-align: left">资金费收取逻辑<br><code>current_period</code>：当期收<del><br><code>next_period</code>：跨期收</del>（不再支持跨期收合约）</td></tr><tr><td style="text-align: left">&gt; formulaType</td><td style="text-align: left">String</td><td style="text-align: left">公式类型<br><code>noRate</code>：旧资金费率计算公式<br><code>withRate</code>：新资金费率计算公式</td></tr><tr><td style="text-align: left">&gt; fundingRate</td><td style="text-align: left">String</td><td style="text-align: left">资金费率</td></tr><tr><td style="text-align: left">&gt; fundingTime</td><td style="text-align: left">String</td><td style="text-align: left">最新的到期结算的资金费时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; nextFundingRate</td><td style="text-align: left">String</td><td style="text-align: left"><del>下一期预测资金费率</del>（不再支持跨期收合约）</td></tr><tr><td style="text-align: left">&gt; nextFundingTime</td><td style="text-align: left">String</td><td style="text-align: left">下一期资金费时间，Unix时间戳的毫秒数格式，如 <code>1622851200000</code></td></tr><tr><td style="text-align: left">&gt; minFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">下一期的预测资金费率下限</td></tr><tr><td style="text-align: left">&gt; maxFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">下一期的预测资金费率上限</td></tr><tr><td style="text-align: left">&gt; interestRate</td><td style="text-align: left">String</td><td style="text-align: left">利率</td></tr><tr><td style="text-align: left">&gt; impactValue</td><td style="text-align: left">String</td><td style="text-align: left">深度加权金额（计价币数量）</td></tr><tr><td style="text-align: left">&gt; settState</td><td style="text-align: left">String</td><td style="text-align: left">资金费率结算状态<br><code>processing</code>：结算中<br><code>settled</code>：已结算</td></tr><tr><td style="text-align: left">&gt; settFundingRate</td><td style="text-align: left">String</td><td style="text-align: left">若 settState = <code>processing</code>，该字段代表用于本轮结算的资金费率；若 settState = <code>settled</code>，该字段代表用于上轮结算的资金费率</td></tr><tr><td style="text-align: left">&gt; premium</td><td style="text-align: left">String</td><td style="text-align: left">溢价指数<br>公式：[max (0，深度加权买价 - 指数价格) – max (0，指数价格 – 深度加权卖价)] / 指数价格</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
针对一些资金费率波动较大的小币种，OKX也将实时关注行情变化，在必要时候，将资金费率收取频率从8小时收付，改成频率较高的6小时/4小时/2小时/1小时收付。因此，用户应关注\`fundingTime\`及\`nextFundingTime\`字段以确定合约的资金费收取频率。
:::

### 限价频道

获取交易产品的最高买价和最低卖价。限价有变化时，每 200 毫秒推送一次数据，限价没变化时，不推送数据

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "price-limit",
        "instId": "LTC-USD-190628"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "price-limit",
          "instId": "LTC-USD-190628"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>price-limit</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "price-limit",
        "instId": "LTC-USD-190628"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"price-limit\", \"instId\" : \"LTC-USD-190628\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "price-limit",
        "instId": "LTC-USD-190628"
    },
    "data": [{
        "instId": "LTC-USD-190628",
        "buyLmt": "200",
        "sellLmt": "300",
        "ts": "1597026383085",
        "enabled": true
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">&gt; buyLmt</td><td style="text-align: left">String</td><td style="text-align: left">最高买价<br>当enabled为false时，返回""</td></tr><tr><td style="text-align: left">&gt; sellLmt</td><td style="text-align: left">String</td><td style="text-align: left">最低卖价<br>当enabled为false时，返回""</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">限价数据更新时间 ，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; enabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">限价是否生效<br><code>true</code>：限价生效<br><code>false</code>：限价不生效</td></tr></tbody></table>

### 期权定价频道

获取所有期权合约详细定价信息，一次性推送所有

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "opt-summary",
        "instFamily": "BTC-USD"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "opt-summary",
          "instFamily": "BTC-USD"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>opt-summary</code></td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr></tbody></table>

> 返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "opt-summary",
        "instFamily": "BTC-USD"
    },
    "connId": "a4d3ae55"
}
```

> 失败示例

```
{
    "id": "1512",
    "event": "error",
    "code": "60012",
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"opt-summary\", \"instFamily\" : \"BTC-USD\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "opt-summary",
        "instFamily": "BTC-USD"
    },
    "data": [
        {
            "instType": "OPTION",
            "instId": "BTC-USD-241013-70000-P",
            "uly": "BTC-USD",
            "delta": "-1.1180902625",
            "gamma": "2.2361957091",
            "vega": "0.0000000001",
            "theta": "0.0000032334",
            "lever": "8.465747567",
            "markVol": "0.3675503331",
            "bidVol": "0",
            "askVol": "1.1669998535",
            "realVol": "",
            "deltaBS": "-0.9999672034",
            "gammaBS": "0.0000000002",
            "thetaBS": "28.2649858387",
            "vegaBS": "0.0000114332",
            "ts": "1728703155650",
            "fwdPx": "62604.6993093463",
            "volLv": "0.2044711229"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型， <code>OPTION</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数</td></tr><tr><td style="text-align: left">&gt; delta</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">&gt; gamma</td><td style="text-align: left">String</td><td style="text-align: left">delta对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">&gt; vega</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对隐含波动率的敏感度</td></tr><tr><td style="text-align: left">&gt; theta</td><td style="text-align: left">String</td><td style="text-align: left">期权价格对剩余期限的敏感度</td></tr><tr><td style="text-align: left">&gt; deltaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">&gt; gammaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下delta对<code>uly</code>价格的敏感度</td></tr><tr><td style="text-align: left">&gt; vegaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对隐含波动率的敏感度</td></tr><tr><td style="text-align: left">&gt; thetaBS</td><td style="text-align: left">String</td><td style="text-align: left">BS模式下期权价格对剩余期限的敏感度</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">&gt; markVol</td><td style="text-align: left">String</td><td style="text-align: left">标记波动率</td></tr><tr><td style="text-align: left">&gt; bidVol</td><td style="text-align: left">String</td><td style="text-align: left">bid波动率</td></tr><tr><td style="text-align: left">&gt; askVol</td><td style="text-align: left">String</td><td style="text-align: left">ask波动率</td></tr><tr><td style="text-align: left">&gt; realVol</td><td style="text-align: left">String</td><td style="text-align: left">已实现波动率，目前该字段暂未启用</td></tr><tr><td style="text-align: left">&gt; volLv</td><td style="text-align: left">String</td><td style="text-align: left">平价期权的隐含波动率</td></tr><tr><td style="text-align: left">&gt; fwdPx</td><td style="text-align: left">String</td><td style="text-align: left">远期价格</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 预估永续/交割/行权/结算价格频道

在永续/交割/行权/结算前一小时内，将基于指数价格计算并推送预估价，更新频率约为每 200 毫秒一次。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "estimated-price",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "estimated-price",
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

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>estimated-price</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>FUTURES</code>：交割<br><code>OPTION</code>：期权<br><code>SWAP</code>：永续<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种<br><code>instFamily</code>和<code>instId</code>必须指定一个</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID<br><code>instFamily</code>和<code>instId</code>必须指定一个</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "estimated-price",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"estimated-price\", \"instId\" : \"FUTURES\",\"instFamily\" :\"BTC-USD\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>FUTURES</code>：交割<br><code>OPTION</code>：期权<br><code>SWAP</code>：永续<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "estimated-price",
        "instType": "FUTURES",
        "instFamily": "XRP-USDT"
    },
    "data": [{
        "instId": "XRP-USDT-250307",
        "instType": "FUTURES",
        "settlePx": "2.4230631578947368",
        "settleType": "settlement",
        "ts": "1741244598708"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>FUTURES</code>：交割<br><code>OPTION</code>：期权<br><code>SWAP</code>：永续<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-170310</code></td></tr><tr><td style="text-align: left">&gt; settleType</td><td style="text-align: left">String</td><td style="text-align: left">类型<br><code>settlement</code>：结算<br><code>delivery</code>：交割<br><code>exercise</code>：行权</td></tr><tr><td style="text-align: left">&gt; settlePx</td><td style="text-align: left">String</td><td style="text-align: left">预估价</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 标记价格频道

获取标记价格，标记价格有变化时，每200ms推送一次数据，标记价格没变化时，每10s推送一次数据

#### URL Path

/ws/v5/public

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "mark-price",
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
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [{
        "channel": "mark-price",
        "instId": "BTC-USDT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>mark-price</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "mark-price",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"mark-price\", \"instId\" : \"LTC-USD-190628\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "mark-price",
    "instId": "BTC-USDT"
  },
  "data": [
    {
      "instType": "MARGIN",
      "instId": "BTC-USDT",
      "markPx": "42310.6",
      "ts": "1630049139746"
    }
  ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">标记价格数据更新时间 ，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
在极少数情况下，客户端可能在短时间内收到两条时间戳相同的标记价格消息。这可能发生在系统维护或服务发布期间，且不会持续出现。当出现此情况时，客户端应以后收到的消息作为权威值。两条消息的差值可忽略不计，不会对交易策略产生实质性影响。
:::

### 指数行情频道

获取指数的行情数据。每100ms有变化就推送一次数据，否则一分钟推一次。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "index-tickers",
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
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "index-tickers",
          "instId": "BTC-USDT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left"><code>subscribe</code> <code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>index-tickers</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">指数，以USD、USDT、BTC、USDC 为计价货币的指数，如 <code>BTC-USDT</code><br>与 <code>uly</code> 含义相同。</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "index-tickers",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"index-tickers\", \"instId\" : \"BTC-USDT\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left"><code>subscribe</code> <code>unsubscribe</code> <code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>index-tickers</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">指数，以USD、USDT、BTC、USDC 为计价货币的指数，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "index-tickers",
        "instId": "BTC-USDT"
    },
    "data": [{
        "instId": "BTC-USDT",
        "idxPx": "0.1",
        "high24h": "0.5",
        "low24h": "0.1",
        "open24h": "0.1",
        "sodUtc0": "0.1",
        "sodUtc8": "0.1",
        "ts": "1597026383085"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">指数</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">指数，以USD、USDT、BTC 为计价货币的指数，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt; idxPx</td><td style="text-align: left">String</td><td style="text-align: left">最新指数价格</td></tr><tr><td style="text-align: left">&gt; open24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时开盘价</td></tr><tr><td style="text-align: left">&gt; high24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时指数最高价格</td></tr><tr><td style="text-align: left">&gt; low24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时指数最低价格</td></tr><tr><td style="text-align: left">&gt; sodUtc0</td><td style="text-align: left">String</td><td style="text-align: left">UTC 0 时开盘价</td></tr><tr><td style="text-align: left">&gt; sodUtc8</td><td style="text-align: left">String</td><td style="text-align: left">UTC+8 时开盘价</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">指数价格更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 标记价格K线频道

获取标记价格的K线数据，推送频率最快是间隔1秒推送一次数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "mark-price-candle1D",
        "instId": "BTC-USD-190628"
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
    args = [
        {
          "channel": "mark-price-candle1D",
          "instId": "BTC-USD-190628"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>mark-price-candle3M</code><br><code>mark-price-candle1M</code><br><code>mark-price-candle1W</code><br><code>mark-price-candle1D</code><br><code>mark-price-candle2D</code><br><code>mark-price-candle3D</code><br><code>mark-price-candle5D</code><br><code>mark-price-candle12H</code><br><code>mark-price-candle6H</code><br><code>mark-price-candle4H</code><br><code>mark-price-candle2H</code><br><code>mark-price-candle1H</code><br><code>mark-price-candle30m</code><br><code>mark-price-candle15m</code><br><code>mark-price-candle5m</code><br><code>mark-price-candle3m</code><br><code>mark-price-candle1m</code><br><code>mark-price-candle3Mutc</code><br><code>mark-price-candle1Mutc</code><br><code>mark-price-candle1Wutc</code><br><code>mark-price-candle1Dutc</code><br><code>mark-price-candle2Dutc</code><br><code>mark-price-candle3Dutc</code><br><code>mark-price-candle5Dutc</code><br><code>mark-price-candle12Hutc</code><br><code>mark-price-candle6Hutc</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "mark-price-candle1D",
        "instId": "BTC-USD-190628"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"mark-price-candle1D\", \"instId\" : \"BTC-USD-190628\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "mark-price-candle1D",
        "instId": "BTC-USD-190628"
    },
    "data": [
        ["1597026383085", "3.721", "3.743", "3.677", "3.708", "0"],
        ["1597026383085", "3.731", "3.799", "3.494", "3.72", "1"]
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">&gt; h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">&gt; l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">&gt; c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">&gt; confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

### 指数K线频道

获取指数的K线数据，推送频率最快是间隔1秒推送一次数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "index-candle30m",
        "instId": "BTC-USD"
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
    args = [
        {
          "channel": "index-candle30m",
          "instId": "BTC-USD"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>index-candle3M</code><br><code>index-candle1M</code><br><code>index-candle1W</code><br><code>index-candle1D</code><br><code>index-candle2D</code><br><code>index-candle3D</code><br><code>index-candle5D</code><br><code>index-candle12H</code><br><code>index-candle6H</code><br><code>index-candle4H</code><br><code>index -candle2H</code><br><code>index-candle1H</code><br><code>index-candle30m</code><br><code>index-candle15m</code><br><code>index-candle5m</code><br><code>index-candle3m</code><br><code>index-candle1m</code><br><code>index-candle3Mutc</code><br><code>index-candle1Mutc</code><br><code>index-candle1Wutc</code><br><code>index-candle1Dutc</code><br><code>index-candle2Dutc</code><br><code>index-candle3Dutc</code><br><code>index-candle5Dutc</code><br><code>index-candle12Hutc</code><br><code>index-candle6Hutc</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">现货指数，如 <code>BTC-USD</code><br>与 <code>uly</code> 含义相同。</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "index-candle30m",
        "instId": "BTC-USD"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"index-candle30m\", \"instId\" : \"BTC-USD\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left"><code>subscribe</code> <code>unsubscribe</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">现货指数</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "index-candle30m",
        "instId": "BTC-USD"
    },
    "data": [
        ["1597026383085", "3811.31", "3811.31", "3811.31", "3811.31","0"]
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">现货指数</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">&gt; h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">&gt; l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">&gt; c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">&gt; confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code> 代表 K 线未完结，<code>1</code> 代表 K 线已完结。</td></tr></tbody></table>

::: tip
返回值数组顺分别为是：\[ts,o,h,l,c,confirm\]
:::

### 平台公共爆仓单频道

获取爆仓单信息。显示的强平数据并不准确代表欧易的总强平量，亦不应被当做总强平量使用。

#### URL Path

/ws/v5/public

> 请求示例

```
{
  "id": "1512",
  "op": "subscribe",
  "args": [
    {
      "channel": "liquidation-orders",
      "instType": "SWAP"
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
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [
        {
          "channel": "liquidation-orders",
          "instType": "SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>liquidation-orders</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权</td></tr></tbody></table>

> 返回结果

```
{
  "id": "1512",
    "arg": {
        "channel": "liquidation-orders",
        "instType": "SWAP"
    },
    "data": [
        {
            "details": [
                {
                    "bkLoss": "0",
                    "bkPx": "0.007831",
                    "ccy": "",
                    "posSide": "short",
                    "side": "buy",
                    "sz": "13",
                    "ts": "1692266434010"
                }
            ],
            "instFamily": "IOST-USDT",
            "instId": "IOST-USDT-SWAP",
            "instType": "SWAP",
            "uly": "IOST-USDT"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">&gt; uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">详细内容</td></tr><tr><td style="text-align: left">&gt;&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向<br><code>buy</code>：买<br><code>sell</code>：卖<br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td style="text-align: left">&gt;&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓模式方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt;&gt; bkPx</td><td style="text-align: left">String</td><td style="text-align: left">强平标记价格，与系统爆仓账号委托成交的价格，仅适用于<code>交割/永续</code></td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">强平数量<br>适用于<code>杠杆</code>/<code>交割</code>/<code>永续</code><br>对于<code>杠杆</code>，单位为交易货币。<br>对于<code>交割/永续</code>，单位为张。</td></tr><tr><td style="text-align: left">&gt;&gt; bkLoss</td><td style="text-align: left">String</td><td style="text-align: left">穿仓亏损数量</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">强平币种<br>适用于<code>币币杠杆</code></td></tr><tr><td style="text-align: left">&gt;&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">强平发生的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code> /</td></tr></tbody></table>

::: tip
爆仓数据来自不同的数据源，因此推送的数据在时间上不一定是顺序的。
:::

### 自动减仓预警频道

自动减仓预警。

仅在 `warning` 或 `adl` 状态下推送数据，每1秒推送一次，展示风险保证金余额及相关风险信息。`normal` 状态下不再推送数据。

更多自动减仓细节，请见[自动减仓机制介绍](https://www.okx.com/cn/help/iv-introduction-to-auto-deleveraging-adl)

#### 服务地址

/ws/v5/public

> 请求示例

```
{
   "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "adl-warning",
        "instType": "FUTURES",
        "instFamily": "BTC-USDT"
    }]
}
```

```
import asyncio
from okx.websocket.WsPublicAsync import WsPublicAsync

def callbackFunc(message):
    print(message)

async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/public")
    await ws.start()
    args = [{
        "channel": "adl-warning",
        "instType": "FUTURES",
        "instFamily": "BTC-USDT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>adl-warning</code></td></tr><tr><td>&gt; instType</td><td>String</td><td>是</td><td>产品类型<br><code>FUTURES</code>：交割合约<br><code>SWAP</code>：永续合约<br><code>OPTION</code>：期权</td></tr><tr><td>&gt; instFamily</td><td>String</td><td>否</td><td>交易品种</td></tr></tbody></table>

> 成功返回示例

```
{
   "id": "1512",
   "event":"subscribe",
   "arg":{
      "channel":"adl-warning",
      "instType":"FUTURES",
      "instFamily":"BTC-USDT"
   },
   "connId":"48d8960a"
}
```

> 失败返回示例

```
{
   "id": "1512",
   "event":"error",
   "msg":"Illegal request: { \"event\": \"subscribe\", \"arg\": { \"channel\": \"adl-warning\", \"instType\": \"FUTURES\", \"instFamily\": \"BTC-USDT\" } }",
   "code":"60012",
   "connId":"48d8960a"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>adl-warning</code></td></tr><tr><td>&gt; instType</td><td>String</td><td>是</td><td>产品类型</td></tr><tr><td>&gt; instFamily</td><td>String</td><td>否</td><td>交易品种</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
   "arg":{
      "channel":"adl-warning",
      "instType":"FUTURES",
      "instFamily":"BTC-USDT"
   },
   "data":[
      {
         "instType":"FUTURES",
         "instFamily":"BTC-USDT",
         "state":"warning",
         "bal":"280784384.9564228289548144",
         "ccy":"",
         "maxBal":"",
         "maxBalTs":"",
         "adlType":"",
         "adlBal":"",
         "adlRecBal":"",
         "ts":"1700210763001",
         "decRate":"",
         "adlRate":"",
         "adlRecRate":""
      }
   ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>请求订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名<br><code>adl-warning</code></td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; instFamily</td><td>String</td><td>交易品种</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; instFamily</td><td>String</td><td>交易品种</td></tr><tr><td>&gt; state</td><td>String</td><td>状态<br><code>warning</code>：预警状态<br><code>adl</code>：已开启自动减仓</td></tr><tr><td>&gt; bal</td><td>String</td><td>实时风险保证金余额</td></tr><tr><td>&gt; ccy</td><td>String</td><td><del>风险保证金余额对应币种</del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; maxBal</td><td>String</td><td><del>过去八小时内的风险保证金余额最大值<br>仅在状态为<code>warning</code>及<code>adl</code>时推送，状态为<code>normal</code>时推送空字符串""</del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; maxBalTs</td><td>String</td><td><del>过去八小时内风险保证金余额最大值对应的时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; adlType</td><td>String</td><td><del>关于自动减仓的事件<br><code>rate_adl_start</code>：由于风险保证金下降率过高造成的自动减仓开始<br><code>bal_adl_start</code>：由于风险保证金余额下降过高造成的自动减仓开始<br><code>pos_adl_start</code>：由于强平单的规模积累到一定程度的自动减仓开始（仅适用于盘前交易市场）<br><code>adl_end</code>：自动减仓结束</del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; adlBal</td><td>String</td><td><del>触发自动减仓的风险保证金余额</del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; adlRecBal</td><td>String</td><td><del>自动减仓结束的风险保证金余额</del>（已弃用，返回 <code>""</code>。将在后续更新中删除）</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; decRate</td><td>String</td><td><del>风险保证金实时下降率（bal与maxBal相比较）<br>仅在状态为<code>warning</code>及<code>adl</code>时推送，状态为<code>normal</code>时推送空字符串""</del>（已弃用）</td></tr><tr><td>&gt; adlRate</td><td>String</td><td><del>触发自动减仓的风险保证金下降率</del>（已弃用）</td></tr><tr><td>&gt; adlRecRate</td><td>String</td><td><del>自动减仓结束的风险保证金下降率</del>（已弃用）</td></tr></tbody></table>

### 经济日历频道

::: tip
仅支持实盘服务
:::

获取最新经济日历数据。 该频道仅开放给交易费等级VIP1及以上的用户。

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512"  
    "op": "subscribe",
    "args": [
      {
          "channel": "economic-calendar"
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
          "channel": "economic-calendar"
      }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>economic-calendar</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "economic-calendar"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"economic-calendar\", \"instId\" : \"LTC-USD-190628\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>economic-calendar</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "economic-calendar"
    },
    "data": [
        {
            "calendarId": "319275",
            "date": "1597026383085",
            "region": "United States",
            "category": "Manufacturing PMI",
            "event": "S&P Global Manufacturing PMI Final",
            "refDate": "1597026383085",
            "actual": "49.2",
            "previous": "47.3",
            "forecast": "49.3",
            "importance": "2",
            "prevInitial": "",
            "ccy": "",
            "unit": "",
            "ts": "1698648096590"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; event</td><td>string</td><td>事件名</td></tr><tr><td>&gt; region</td><td>string</td><td>国家，地区或实体</td></tr><tr><td>&gt; category</td><td>string</td><td>类别名</td></tr><tr><td>&gt; actual</td><td>string</td><td>事件实际值</td></tr><tr><td>&gt; previous</td><td>string</td><td>当前事件上个周期的最新实际值<br>若发生数据修正，该字段存储上个周期修正后的实际值</td></tr><tr><td>&gt; forecast</td><td>string</td><td>由权威经济学家共同得出的预测值</td></tr><tr><td>&gt; prevInitial</td><td>string</td><td>该事件上一周期的初始值<br>仅在修正发生时有值</td></tr><tr><td>&gt; date</td><td>string</td><td>actual字段值的预期发布时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>&gt; refDate</td><td>string</td><td>当前事件指向的日期</td></tr><tr><td>&gt; calendarId</td><td>string</td><td>经济日历ID</td></tr><tr><td>&gt; unit</td><td>string</td><td>事件实际值对应的单位</td></tr><tr><td>&gt; ccy</td><td>string</td><td>事件实际值对应的货币</td></tr><tr><td>&gt; importance</td><td>string</td><td>重要性<br><code>1</code>: 低<br><code>2</code>: 中等<br><code>3</code>: 高</td></tr><tr><td>&gt; ts</td><td>string</td><td>推送时间</td></tr></tbody></table>
