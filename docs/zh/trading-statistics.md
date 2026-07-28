---
title: 交易大数据
outline: deep
---

## REST API

### 获取交易大数据支持币种

获取支持交易大数据的币种

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/trading-data/support-coin`

> 请求示例

```
GET /api/v5/rubik/stat/trading-data/support-coin
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取交易大数据支持币种
result = tradingDataAPI.get_support_coin()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": {
        "contract": [
            "ADA",
            "BTC",
        ],
        "option": [
            "BTC"
        ],
        "spot": [
            "ADA",
            "BTC",
        ]
    },
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">contract</td><td style="text-align: left">Array of strings</td><td style="text-align: left">合约交易大数据接口功能支持的币种</td></tr><tr><td style="text-align: left">option</td><td style="text-align: left">Array of strings</td><td style="text-align: left">期权交易大数据接口功能支持的币种</td></tr><tr><td style="text-align: left">spot</td><td style="text-align: left">Array of strings</td><td style="text-align: left">现货交易大数据接口功能支持的币种</td></tr></tbody></table>

### 获取合约持仓量历史

获取交割及永续合约的历史持仓量数据。每个粒度最多可获取最近1,440条数据。  

对于时间粒度period=1D，数据时间范围最早至2024年1月1日；对于其他时间粒度period，最早至2024年2月初。

#### 限速：10次/2s

#### 限速规则：IP + Instrument ID

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/open-interest-history`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/open-interest-history?instId=BTC-USDT-SWAP
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取持仓量历史
result = tradingDataAPI.get_open_interest_history(
    instId="BTC-USDT-SWAP"
)

print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>string</td><td>是</td><td>产品ID，如 BTC-USDT-SWAP<br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td>period</td><td>string</td><td>否</td><td>时间粒度，默认值<code>5m</code>, 如 [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8开盘价k线：[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0开盘价k线： [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>]</td></tr><tr><td>end</td><td>string</td><td>否</td><td>筛选的结束时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>begin</td><td>string</td><td>否</td><td>筛选的开始时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>分页返回的结果集数量，最大为<code>100</code>，不填默认返回<code>100</code>条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "1701417600000",    // timestamp
            "731377.57500501",   // open interest (oi, contracts)
            "111",              // open interest (oiCcy, coin)
            "8888888"         // open interest (oiUsd, USD)
        ],
        [
            "1701417500000",    // timestamp
            "731377.57500501",   // open interest (oi, contracts)
            "111",              // open interest (oiCcy, coin)
            "8888888"         // open interest (oiUsd, USD)
        ]
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>oi</td><td>String</td><td>合约单位的持仓量</td></tr><tr><td>oiCcy</td><td>String</td><td>币种单位的持仓量</td></tr><tr><td>oiUsd</td><td>String</td><td>USD单位的持仓量</td></tr></tbody></table>

返回值数组顺序分别为是：\[ts, oi, oiCcy, oiUsd\]

### 获取主动买入/卖出情况

获取taker主动买入和卖出的交易量

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/taker-volume`

> 请求示例

```
GET /api/v5/rubik/stat/taker-volume?ccy=BTC&instType=SPOT
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取主动买入/卖出情况
result = tradingDataAPI.get_taker_volume(
    ccy="BTC",
    instType="SPOT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>CONTRACTS</code>：衍生品</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383011</code></td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>5m</code>。支持[<code>5m</code>/<code>1H</code>/<code>1D</code>]<br><code>5m</code>粒度最多只能查询两天之内的数据<br><code>1H</code>粒度最多只能查询30天之内的数据<br><code>1D</code>粒度最多只能查询180天之内的数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630425600000",
            "7596.2651",
            "7149.4855"
        ],
        [
            "1630339200000",
            "5312.7876",
            "7002.7541"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">sellVol</td><td style="text-align: left">String</td><td style="text-align: left">卖出量</td></tr><tr><td style="text-align: left">buyVol</td><td style="text-align: left">String</td><td style="text-align: left">买入量</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,sellVol,buyVol\]
:::

### 获取合约主动买入/卖出情况

获取合约维度taker主动买入和卖出的交易量。每个粒度最多可获取最近1,440条数据。  

对于时间粒度period=1D，数据时间范围最早至2024年1月1日；对于其他时间粒度period，最早至2024年2月初。

#### 限速： 5次/2s

#### 限速规则： IP + Instrument ID

#### HTTP请求

`GET /api/v5/rubik/stat/taker-volume-contract`

> 请求示例

```
GET /api/v5/rubik/stat/taker-volume-contract?instId=BTC-USDT-SWAP
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取合约taker主动买入和卖出的交易量
result = tradingDataAPI.get_contract_taker_volume(
    instId="BTC-USDT-SWAP"
)

print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>string</td><td>是</td><td>产品ID，如 BTC-USDT<br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td>period</td><td>string</td><td>否</td><td>时间粒度，默认值<code>5m</code>, 如 [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8开盘价k线：[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0开盘价k线： [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>]</td></tr><tr><td>unit</td><td>string</td><td>否</td><td>买入、卖出的单位，默认值是<code>1</code><br><code>0</code>: 币<br><code>1</code>: 合约<br><code>2</code>: U</td></tr><tr><td>end</td><td>string</td><td>否</td><td>筛选的结束时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>begin</td><td>string</td><td>否</td><td>筛选的开始时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "1701417600000",    // timestamp
            "200",              // taker sell volume
            "380"               // taker buy volume
        ],
        [
            "1701417600000",    // timestamp
            "100",              // taker sell volume
            "300"               // taker buy volume
        ]
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>sellVol</td><td>String</td><td>卖出量</td></tr><tr><td>buyVol</td><td>String</td><td>买入量</td></tr></tbody></table>

返回值数组顺序分别为是：\[ts, sellVol, buyVol\]

### 获取杠杆多空比

获取借入计价货币与借入交易货币的累计数额比值。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/margin/loan-ratio`

> 请求示例

```
GET /api/v5/rubik/stat/margin/loan-ratio?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取杠杆多空比
result = tradingDataAPI.get_margin_lending_ratio(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间，如 <code>1597026383011</code></td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度<br><code>m</code>：分钟，<code>H</code>：小时，<code>D</code>：天<br>默认值<code>5m</code>，支持[<code>5m</code>/<code>1H</code>/<code>1D</code>]<br><code>5m</code>粒度最多只能查询两天之内的数据<br><code>1H</code>粒度最多只能查询30天之内的数据<br><code>1D</code>粒度最多只能查询180天之内的数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630492800000",
            "0.4614"
        ],
        [
            "1630492500000",
            "0.5767"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">多空比值</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,ratio\]
:::

### 获取精英交易员合约多空持仓人数比

获取精英交易员交割永续净开多持仓用户数与净开空持仓用户数的比值。精英交易员指持仓价值前5%的用户。每个粒度最多可获取最近1,440条数据。数据时间范围最早至2024年3月22日。

#### 限速： 5次/2s

#### 限速规则： IP + Instrument ID

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader?instId=BTC-USDT-SWAP
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取精英交易员合约多空持仓人数比
result = tradingDataAPI.get_top_trader_long_short_account_ratio(
    instId="BTC-USDT-SWAP"
)

print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>string</td><td>是</td><td>产品ID，如 BTC-USDT-SWAP<br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td>period</td><td>string</td><td>否</td><td>时间粒度，默认值<code>5m</code>, 如 [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8开盘价k线：[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0开盘价k线： [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>]</td></tr><tr><td>end</td><td>string</td><td>否</td><td>筛选的结束时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>begin</td><td>string</td><td>否</td><td>筛选的开始时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "1701417600000",    // timestamp
            "1.1739"            // long/short account num ratio of top traders
        ],
        [
            "1701417600000",    // timestamp
            "0.1236"            // long/short account num ratio of top traders
        ],
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>longShortAcctRatio</td><td>String</td><td>多空人数比</td></tr></tbody></table>

返回值数组顺序分别为是：\[ts, longShortAcctRatio\]

### 获取精英交易员合约多空持仓仓位比

获取交割永续开多、开空仓位占总持仓的比值。精英交易员指持仓价值前5%的用户。每个粒度最多可获取最近1,440条数据。数据时间范围最早至2024年3月22日。

#### 限速： 5次/2s

#### 限速规则： IP + Instrument ID

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader?instId=BTC-USDT-SWAP
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取精英交易员合约多空持仓仓位比
result = tradingDataAPI.get_top_trader_long_short_position_ratio(
    instId="BTC-USDT-SWAP"
)

print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>string</td><td>是</td><td>产品ID，如 <code>BTC-USDT-SWAP</code><br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td>period</td><td>string</td><td>否</td><td>时间粒度，默认值<code>5m</code>, 如 [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8开盘价k线：[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0开盘价k线： [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>]</td></tr><tr><td>end</td><td>string</td><td>否</td><td>筛选的结束时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>begin</td><td>string</td><td>否</td><td>筛选的开始时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "1701417600000",    // timestamp
            "1.1739"            // long/short position num ratio of top traders
        ],
        [
            "1701417600000",    // timestamp
            "0.1236"            // long/short position num ratio of top traders
        ],
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>longShortPosRatio</td><td>String</td><td>多空仓位占总持仓比值</td></tr></tbody></table>

返回值数组顺序分别为是：\[ts, longShortPosRatio\]

### 获取合约多空持仓人数比

获取交割永续净开多持仓用户数与净开空持仓用户数的比值。每个粒度最多可获取最近1,440条数据。  

对于时间粒度period=1D，数据时间范围最早至2024年1月1日；对于其他时间粒度period，最早至2024年2月初。

#### 限速： 5次/2s

#### 限速规则： IP + Instrument ID

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract?instId=BTC-USDT-SWAP
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取合约净开多持仓用户数与净开空持仓用户数的比值
result = tradingDataAPI.get_contract_long_short_ratio(
    instId="BTC-USDT-SWAP"
)

print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>string</td><td>是</td><td>产品ID，如 BTC-USDT<br>仅适用于<code>交割</code>/<code>永续</code></td></tr><tr><td>period</td><td>string</td><td>否</td><td>时间粒度，默认值<code>5m</code>, 如 [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8开盘价k线：[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0开盘价k线： [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>]</td></tr><tr><td>end</td><td>string</td><td>否</td><td>筛选的结束时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td>begin</td><td>string</td><td>否</td><td>筛选的开始时间戳 ts，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        [
            "1701417600000",    // timestamp
            "1.1739"            // long/short account num ratio of traders
        ],
        [
            "1701417600000",    // timestamp
            "0.1236"            // long/short account num ratio of traders
        ],
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ts</td><td>String</td><td>时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>longShortAcctRatio</td><td>String</td><td>多空人数比</td></tr></tbody></table>

返回值数组顺序分别为是：\[ts, longAcctPosRatio\]

### 获取多空持仓人数比

获取交割永续净开多持仓用户数与净开空持仓用户数的比值。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/long-short-account-ratio?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取合约多空持仓人数比
result = tradingDataAPI.get_long_short_ratio(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间，如 <code>1597026383011</code></td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>5m</code>。支持[5m/1H/1D]<br><code>5m</code>粒度最多只能查询两天之内的数据<br><code>1H</code>粒度最多只能查询30天之内的数据<br><code>1D</code>粒度最多只能查询180天之内的数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630502100000",
            "1.25"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">多空人数比</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,ratio\]
:::

### 获取合约持仓量及交易量

获取交割永续的持仓量和交易量。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/contracts/open-interest-volume`

> 请求示例

```
GET /api/v5/rubik/stat/contracts/open-interest-volume?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取合约持仓量及交易量
result = tradingDataAPI.get_contracts_interest_volume(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间，如 <code>1597026383011</code></td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>5m</code>。支持[5m/1H/1D]<br><code>5m</code>粒度最多只能查询两天之内的数据<br><code>1H</code>粒度最多只能查询30天之内的数据<br><code>1D</code>粒度最多只能查询180天之内的数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630502400000",
            "1713028741.6898",
            "39800873.554"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">oi</td><td style="text-align: left">String</td><td style="text-align: left">持仓总量（USD）</td></tr><tr><td style="text-align: left">vol</td><td style="text-align: left">String</td><td style="text-align: left">交易总量（USD）</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,oi,vol\]
:::

### 获取期权持仓量及交易量

获取期权的持仓量和交易量。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/option/open-interest-volume`

> 请求示例

```
GET /api/v5/rubik/stat/option/open-interest-volume?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 获取期权持仓量及交易量
result = tradingDataAPI.get_options_interest_volume(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>8H</code>。支持[<code>8H/1D</code>]<br>每个粒度最多只能查询72条数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630368000000",
            "3458.1000",
            "78.8000"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">oi</td><td style="text-align: left">String</td><td style="text-align: left">持仓总量，单位为请求参数的<code>ccy</code></td></tr><tr><td style="text-align: left">vol</td><td style="text-align: left">String</td><td style="text-align: left">交易总量，单位为请求参数的<code>ccy</code></td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,oi,vol\]
:::

### 看涨/看跌期权合约 持仓总量比/交易总量比

获取看涨期权和看跌期权的持仓量比值，以及交易量比值。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/option/open-interest-volume-ratio`

> 请求示例

```
GET /api/v5/rubik/stat/option/open-interest-volume-ratio?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 看涨/看跌期权合约 持仓总量比/交易总量比
result = tradingDataAPI.get_put_call_ratio(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>8H</code>。支持[<code>8H/1D</code>]<br>每个粒度最多只能查询72条数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630512000000",
            "2.7261",
            "2.3447"
        ],
        [
            "1630425600000",
            "2.8101",
            "2.3438"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">oiRatio</td><td style="text-align: left">String</td><td style="text-align: left">看涨/看跌 持仓总量比</td></tr><tr><td style="text-align: left">volRatio</td><td style="text-align: left">String</td><td style="text-align: left">看涨/看跌 交易总量比</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,oiRatio,volRatio\]
:::

### 看涨看跌持仓总量及交易总量（按到期日分）

获取每个到期日上看涨期权和看跌期权的持仓量和交易量。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/option/open-interest-volume-expiry`

> 请求示例

```
GET /api/v5/rubik/stat/option/open-interest-volume-expiry?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 看涨看跌持仓总量及交易总量（按到期日分）
result = tradingDataAPI.get_interest_volume_expiry(
    ccy="BTC"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>8H</code>。支持[<code>8H/1D</code>]<br>每个粒度仅展示最新的一份数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630540800000",
            "20210902",
            "6.4",
            "18.4",
            "0.7",
            "0.4"
        ],
        [
            "1630540800000",
            "20210903",
            "47",
            "36.6",
            "1",
            "10.7"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">到期日（格式: YYYYMMDD，如 "20210623"）</td></tr><tr><td style="text-align: left">callOI</td><td style="text-align: left">String</td><td style="text-align: left">看涨持仓总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">putOI</td><td style="text-align: left">String</td><td style="text-align: left">看跌持仓总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">callVol</td><td style="text-align: left">String</td><td style="text-align: left">看涨交易总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">putVol</td><td style="text-align: left">String</td><td style="text-align: left">看跌交易总量（以<code>币</code>为单位）</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,expTime,callOI,putOI,callVol,putVol\]
:::

### 看涨看跌持仓总量及交易总量（按执行价格分）

获取看涨期权和看跌期权的taker主动买入和卖出的交易量。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/option/open-interest-volume-strike`

> 请求示例

```
GET /api/v5/rubik/stat/option/open-interest-volume-strike?ccy=BTC&expTime=20210901
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 看涨看跌持仓总量及交易总量（按执行价格分）
result = tradingDataAPI.get_interest_volume_strike(
    ccy="BTC",
    expTime="20210623"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">到期日（格式: <code>YYYYMMdd</code>，如 "20210623"）</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>8H</code>。支持[<code>8H/1D</code>]<br>每个粒度仅展示最新的一份数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        [
            "1630540800000",
            "10000",
            "0",
            "0.5",
            "0",
            "0"
        ],
        [
            "1630540800000",
            "14000",
            "0",
            "5.2",
            "0",
            "0"
        ]
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">strike</td><td style="text-align: left">String</td><td style="text-align: left">执行价格</td></tr><tr><td style="text-align: left">callOI</td><td style="text-align: left">String</td><td style="text-align: left">看涨持仓总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">putOI</td><td style="text-align: left">String</td><td style="text-align: left">看跌持仓总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">callVol</td><td style="text-align: left">String</td><td style="text-align: left">看涨交易总量（以<code>币</code>为单位）</td></tr><tr><td style="text-align: left">putVol</td><td style="text-align: left">String</td><td style="text-align: left">看跌交易总量（以<code>币</code>为单位）</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,strike,callOI,putOI,callVol,putVol\]
:::

### 看跌/看涨期权合约 主动买入/卖出量

该指标展示某一时刻，单位时间内看跌/看涨期权的主动（taker）买入/卖出交易量

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/rubik/stat/option/taker-block-volume`

> 请求示例

```
GET /api/v5/rubik/stat/option/taker-block-volume?ccy=BTC
```

```
import okx.TradingData as TradingData_api

flag = "0"  # 实盘: 0, 模拟盘: 1

tradingDataAPI = TradingData_api.TradingDataAPI(flag=flag)

# 看跌/看涨期权合约 主动买入/卖出量
result = tradingDataAPI.get_taker_block_volume(
    ccy="BTC",
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>8H</code>。支持[<code>8H/1D</code>]<br>每个粒度仅展示最新的一份数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        "1630512000000",
        "8.55",
        "67.3",
        "16.05",
        "16.3",
        "126.4",
        "40.7"
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据产生时间</td></tr><tr><td style="text-align: left">callBuyVol</td><td style="text-align: left">String</td><td style="text-align: left">看涨买入量 以结算货币为单位</td></tr><tr><td style="text-align: left">callSellVol</td><td style="text-align: left">String</td><td style="text-align: left">看涨卖出量 以结算货币为单位</td></tr><tr><td style="text-align: left">putBuyVol</td><td style="text-align: left">String</td><td style="text-align: left">看跌买入量 以结算货币为单位</td></tr><tr><td style="text-align: left">putSellVol</td><td style="text-align: left">String</td><td style="text-align: left">看跌卖出量 以结算货币为单位</td></tr><tr><td style="text-align: left">callBlockVol</td><td style="text-align: left">String</td><td style="text-align: left">看涨大单</td></tr><tr><td style="text-align: left">putBlockVol</td><td style="text-align: left">String</td><td style="text-align: left">看跌大单</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,callBuyVol,callSellVol,putBuyVol,putSellVol,callBlockVol,putBlockVol\]
:::
