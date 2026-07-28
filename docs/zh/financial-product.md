---
title: 金融产品
outline: deep
---

## 链上赚币

仅资金账户中的资产支持申购。[了解更多](/cn/earn/onchain-earn)

### GET / 查看项目

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/offers`

> 请求示例

```
GET /api/v5/finance/staking-defi/offers
```

```
import okx.Finance.StakingDefi as StakingDefi

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0" # 实盘:0 , 模拟盘:1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)

result = StakingAPI.get_offers(ccy="USDT")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目ID</td></tr><tr><td style="text-align: left">protocolType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">投资币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "DOT",
            "productId": "101",
            "protocol": "Polkadot",
            "protocolType": "defi",
            "term": "0",
            "apy": "0.1767",
            "earlyRedeem": false,
            "state": "purchasable",
            "investData": [
                {
                    "bal": "0",
                    "ccy": "DOT",
                    "maxAmt": "0",
                    "minAmt": "2"
                }
            ],
            "earningData": [
                {
                    "ccy": "DOT",
                    "earningType": "0"
                }
            ],
            "fastRedemptionDailyLimit": "",
            "redeemPeriod": [
                "28D",
                "28D"
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>productId</td><td>String</td><td>项目ID</td></tr><tr><td>protocol</td><td>String</td><td>项目名称</td></tr><tr><td>protocolType</td><td>String</td><td>项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td>term</td><td>String</td><td>项目期限<br>活期为0，其他则显示定期天数</td></tr><tr><td>apy</td><td>String</td><td>预估年化<br>如果年化为<code>7%</code> ，则该字段为<code>0.07</code></td></tr><tr><td>earlyRedeem</td><td>Boolean</td><td>项目是否支持提前赎回</td></tr><tr><td>investData</td><td>Array of objects</td><td>目前用户可用来投资的目标币种信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>投资币种，如<code>BTC</code></td></tr><tr><td>&gt; bal</td><td>String</td><td>可投数量</td></tr><tr><td>&gt; minAmt</td><td>String</td><td>最小申购量</td></tr><tr><td>&gt; maxAmt</td><td>String</td><td>最大可申购量</td></tr><tr><td>earningData</td><td>Array of objects</td><td>收益信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>收益币种，如<code>BTC</code></td></tr><tr><td>&gt; earningType</td><td>String</td><td>收益类型<br><code>0</code>：预估收益<br><code>1</code>：累计发放收益</td></tr><tr><td>state</td><td>String</td><td>项目状态<br><code>purchasable</code>：可申购<br><code>sold_out</code>：售罄<br><code>stop</code>：暂停申购</td></tr><tr><td>redeemPeriod</td><td>Array of strings</td><td>赎回期，形式为 [最小赎回时间,最大赎回时间]<br><code>H</code>：小时，<code>D</code>：天<br>例 ["1H","24H"] 表示赎回期时1小时到24小时。<br>["14D","14D"] 表示赎回期为14天。</td></tr><tr><td>fastRedemptionDailyLimit</td><td>String</td><td>快速赎回每日最高限额<br>如果不支持快速赎回，则返回""</td></tr></tbody></table>

### POST / 申购项目

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/purchase`

> 请求示例

```
# 投资100ZIL30天的锁仓挖矿项目
POST /api/v5/finance/staking-defi/purchase
body 
{
    "productId":"1234",
    "investData":[
      {
        "ccy":"ZIL",
        "amt":"100"
      }
    ],
    "term":"30"
}
```

```
import okx.Finance.StakingDefi as StakingDefi


# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0" # 实盘:0 , 模拟盘:1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)

result = StakingAPI.purchase(
            productId = "4005", 
            investData = [{
                "ccy":"USDT",
                "amt":"100"
            }]
        )
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">项目ID</td></tr><tr><td style="text-align: left">investData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">投资信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资数量</td></tr><tr><td style="text-align: left">term</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">投资期限<br>定期项目必须指定投资期限</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "ordId": "754147",
      "tag": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr></tbody></table>

### POST / 赎回项目

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/redeem`

> 请求示例

```
# 提前赎回项目投资
POST /api/v5/finance/staking-defi/redeem
body 
{
    "ordId":"754147",
    "protocolType":"defi",
    "allowEarlyRedeem":true
}
```

```
import okx.Finance.StakingDefi as StakingDefi

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)


result = StakingAPI.redeem(
           ordId = "1234",
           protocolType = "defi"
        )
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">protocolType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td style="text-align: left">allowEarlyRedeem</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否提前赎回<br>默认为<code>false</code></td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "ordId": "754147",
      "tag": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr></tbody></table>

### POST / 撤销项目申购/赎回

::: tip
撤销申购后的资金返回资金账户。
:::

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/cancel`

> 请求示例

```
POST /api/v5/finance/staking-defi/cancel
body 
{
    "ordId":"754147",
    "protocolType":"defi"
}
```

```
import okx.Finance.StakingDefi as StakingDefi

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘:0 , 模拟盘:1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)

result = StakingAPI.cancel(
           ordId = "1234",
           protocolType = "defi"
        )
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">protocolType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">项目类型<br><code>defi</code>：链上赚币</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "ordId": "754147",
      "tag": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr></tbody></table>

### GET / 查看活跃订单

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/orders-active`

> 请求示例

```
GET /api/v5/finance/staking-defi/orders-active
```

```
import okx.Finance.StakingDefi as StakingDefi

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)

result = StakingAPI.get_activity_orders()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目ID</td></tr><tr><td style="text-align: left">protocolType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">投资币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单状态<br><code>8</code>: 待上车（预约中）<br><code>13</code>: 订单取消中<br><code>9</code>: 上链中<br><code>1</code>: 收益中<br><code>2</code>: 赎回中</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ordId": "2413499",
            "ccy": "DOT",
            "productId": "101",
            "state": "1",
            "protocol": "Polkadot",
            "protocolType": "defi",
            "term": "0",
            "apy": "0.1014",
            "investData": [
                {
                    "ccy": "DOT",
                    "amt": "2"
                }
            ],
            "earningData": [
                {
                    "ccy": "DOT",
                    "earningType": "0",
                    "earnings": "0.10615025"
                }
            ],
            "purchasedTime": "1729839328000",
            "tag": "",
            "estSettlementTime": "",
            "cancelRedemptionDeadline": "",
            "fastRedemptionData": []
        },
        {
            "ordId": "2213257",
            "ccy": "USDT",
            "productId": "4005",
            "state": "1",
            "protocol": "On-Chain Defi",
            "protocolType": "defi",
            "term": "0",
            "apy": "0.0323",
            "investData": [
                {
                    "ccy": "USDT",
                    "amt": "1"
                }
            ],
            "earningData": [
                {
                    "ccy": "USDT",
                    "earningType": "0",
                    "earnings": "0.02886582"
                },
                {
                    "ccy": "COMP",
                    "earningType": "1",
                    "earnings": "0.0000627"
                }
            ],
            "purchasedTime": "1725345790000",
            "tag": "",
            "estSettlementTime": "",
            "cancelRedemptionDeadline": "",
            "fastRedemptionData": []
        },
        {
            "ordId": "2210943",
            "ccy": "USDT",
            "productId": "4005",
            "state": "1",
            "protocol": "On-Chain Defi",
            "protocolType": "defi",
            "term": "0",
            "apy": "0.0323",
            "investData": [
                {
                    "ccy": "USDT",
                    "amt": "1"
                }
            ],
            "earningData": [
                {
                    "ccy": "USDT",
                    "earningType": "0",
                    "earnings": "0.02891823"
                },
                {
                    "ccy": "COMP",
                    "earningType": "1",
                    "earnings": "0.0000632"
                }
            ],
            "purchasedTime": "1725280801000",
            "tag": "",
            "estSettlementTime": "",
            "cancelRedemptionDeadline": "",
            "fastRedemptionData": []
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>productId</td><td>String</td><td>项目ID</td></tr><tr><td>state</td><td>String</td><td>订单状态<br><code>8</code>：待上车（预约中）<br><code>13</code>：订单取消中<br><code>9</code>：上链中<br><code>1</code>：收益中<br><code>2</code>：赎回中</td></tr><tr><td>protocol</td><td>String</td><td>项目名称</td></tr><tr><td>protocolType</td><td>String</td><td>项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td>term</td><td>String</td><td>项目期限<br>活期为0，其他则显示定期天数</td></tr><tr><td>apy</td><td>String</td><td>预估年化<br>如果年化为7% ，则该字段为0.07<br>保留到小数点后4位（截位）</td></tr><tr><td>investData</td><td>Array of objects</td><td>用户投资信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>投资币种，如 <code>BTC</code></td></tr><tr><td>&gt; amt</td><td>String</td><td>已投资数量</td></tr><tr><td>earningData</td><td>Array of objects</td><td>收益信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>收益币种，如 <code>BTC</code></td></tr><tr><td>&gt; earningType</td><td>String</td><td>收益类型<br><code>0</code>：预估收益<br><code>1</code>：实际到账收益</td></tr><tr><td>&gt; earnings</td><td>String</td><td>收益数量</td></tr><tr><td>fastRedemptionData</td><td>Array of objects</td><td>快速赎回信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>快速赎回币种，如 <code>BTC</code></td></tr><tr><td>&gt; redeemingAmt</td><td>String</td><td>赎回中的数量</td></tr><tr><td>purchasedTime</td><td>String</td><td>用户订单创建时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>estSettlementTime</td><td>String</td><td>预估赎回到账时间</td></tr><tr><td>cancelRedemptionDeadline</td><td>String</td><td>撤销赎回申请截止时间</td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr></tbody></table>

### GET / 查看历史订单

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/orders-history`

> 请求示例

```
GET /api/v5/finance/staking-defi/orders-history
```

```
import okx.Finance.StakingDefi as StakingDefi

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StakingAPI = StakingDefi.StakingDefiAPI(apikey, secretkey, passphrase, False, flag)

result = StakingAPI.get_orders_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目ID</td></tr><tr><td style="text-align: left">protocolType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">投资币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，默认100条，最大值为100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
       {
            "ordId": "1579252",
            "ccy": "DOT",
            "productId": "101",
            "state": "3",
            "protocol": "Polkadot",
            "protocolType": "defi",
            "term": "0",
            "apy": "0.1704",
            "investData": [
                {
                    "ccy": "DOT",
                    "amt": "2"
                }
            ],
            "earningData": [
                {
                    "ccy": "DOT",
                    "earningType": "0",
                    "realizedEarnings": "0"
                }
            ],
            "purchasedTime": "1712908001000",
            "redeemedTime": "1712914294000",
            "tag": ""
       }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>productId</td><td>String</td><td>项目ID</td></tr><tr><td>state</td><td>String</td><td>订单状态<br>3: 订单已完成（包含撤销和已赎回两种状态）</td></tr><tr><td>protocol</td><td>String</td><td>项目名称</td></tr><tr><td>protocolType</td><td>String</td><td>项目类型<br><code>defi</code>：链上赚币</td></tr><tr><td>term</td><td>String</td><td>项目期限<br>活期为0，其他则显示定期天数</td></tr><tr><td>apy</td><td>String</td><td>预估年化<br>如果年化为7% ，则该字段为0.07<br>保留到小数点后4位（截位）</td></tr><tr><td>investData</td><td>Array of objects</td><td>用户投资信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>投资币种，如<code>BTC</code></td></tr><tr><td>&gt; amt</td><td>String</td><td>已投资数量</td></tr><tr><td>earningData</td><td>Array of objects</td><td>收益信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>收益币种，如<code>BTC</code></td></tr><tr><td>&gt; earningType</td><td>String</td><td>收益类型<br><code>0</code>：预估收益<br><code>1</code>：实际到账收益</td></tr><tr><td>&gt; realizedEarnings</td><td>String</td><td>已赎回订单累计收益<br>该字段仅在订单处于赎回状态时有效</td></tr><tr><td>purchasedTime</td><td>String</td><td>用户订单创建时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>redeemedTime</td><td>String</td><td>用户订单赎回时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>tag</td><td>String</td><td>订单标签</td></tr></tbody></table>

## ETH质押

ETH 质押，也称为以太坊质押，是参与以太坊区块链权益证明 (Proof of Stake, PoS) 共识机制的过程。  
质押 ETH 即获 1:1 BETH 并赚取每日奖励，享受更高流动性  
[了解更多](https://www.okx.com/zh-hans/earn/ethereum-staking)

### GET / 获取产品信息

#### 限速：3 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/eth/product-info`

> 请求示例

```
GET /api/v5/finance/staking-defi/eth/product-info
```

```
import okx.Finance.EthStaking as EthStaking

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.eth_product_info()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": [
      {
        "fastRedemptionDailyLimit": "100",
        "rate": "2.23",
        "redemptDays": "8",
        "minAmt": "0.001"
      }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>fastRedemptionDailyLimit</td><td>String</td><td>快速赎回每日最高份额<br>母账户和子账户共享同一个限额</td></tr><tr><td>rate</td><td>String</td><td>最新 BETH 年化收益率</td></tr><tr><td>redemptDays</td><td>String</td><td>BETH 赎回天数</td></tr><tr><td>minAmt</td><td>String</td><td>BETH 最低申购数量</td></tr></tbody></table>

### POST / 申购

质押ETH获取BETH  
仅资金账户中的资产支持ETH质押。

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/eth/purchase`

> 请求示例

```
POST /api/v5/finance/staking-defi/eth/purchase
body 
{
    "amt":"100"
}
```

```
import okx.Finance.EthStaking as EthStaking

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.eth_purchase(amt="1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资数量</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
  ]
}
```

#### 返回参数

code = `0`代表请求已被成功处理

### POST / 赎回

只能赎回资金账户中的 BETH 资产，交易账户中的 BETH 资产需要您先做资金划转到资金账户后赎回。

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/eth/redeem`

> 请求示例

```
POST /api/v5/finance/staking-defi/eth/redeem
body 
{
    "amt":"10"
}
```

```
import okx.Finance.EthStaking as EthStaking

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.eth_redeem(amt="1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">赎回数量</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
  ]
}
```

#### 返回参数

code = `0`代表请求已被成功处理

### POST / 撤销赎回

#### 限速：2 次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/eth/cancel-redeem`

> 请求示例

```
POST /api/v5/finance/staking-defi/eth/cancel-redeem
body
{
    "ordId": "1234567890"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ordId": "1234567890"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr></tbody></table>

### GET / 获取余额

该余额表示账户内 BETH 的实时总持仓，包括交易账户、资金账户以及处于赎回过程中的资产。

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/eth/balance`

> 请求示例

```
GET /api/v5/finance/staking-defi/eth/balance
```

```
import okx.Finance.EthStaking as EthStaking

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.eth_balance()
print(result)
```

#### 请求参数

None

> 返回结果

```
{
    "code": "0",
    "data": [
      {
        "amt": "0.63926191",
        "ccy": "BETH",
        "latestInterestAccrual": "0.00006549",
        "totalInterestAccrual": "0.01490596",
        "ts": "1699257600000"
      }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BETH</code></td></tr><tr><td>amt</td><td>String</td><td>币种数量</td></tr><tr><td>latestInterestAccrual</td><td>String</td><td>最近收益</td></tr><tr><td>totalInterestAccrual</td><td>String</td><td>历史总收益</td></tr><tr><td>ts</td><td>String</td><td>快照时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取申购赎回记录

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/eth/purchase-redeem-history`

> 请求示例

```
GET /api/v5/finance/staking-defi/eth/purchase-redeem-history
```

```
import okx.Finance.EthStaking as EthStaking

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.eth_purchase_redeem_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">类型<br><code>purchase</code>：申购<br><code>redeem</code>：赎回</td></tr><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">状态<br><code>pending</code>：处理中<br><code>success</code>：成功处理<br><code>failed</code>：处理失败<br><code>cancelled</code>：已取消</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此<code>requestTime</code>之前（更旧的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此<code>requestTime</code>之后（更新的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，默认100条，最大值为100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "0.62666630",
            "completedTime": "1683413171000",
            "estCompletedTime": "",
            "redeemingAmt": "",
            "requestTime": "1683413171000",
            "status": "success",
            "type": "purchase"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>type</td><td>String</td><td>类型<br><code>purchase</code>：申购<br><code>redeem</code>：赎回</td></tr><tr><td>amt</td><td>String</td><td>申购/赎回 的数量</td></tr><tr><td>redeemingAmt</td><td>String</td><td>赎回中的数量</td></tr><tr><td>status</td><td>String</td><td>状态<br><code>pending</code>：处理中<br><code>success</code>：成功处理<br><code>failed</code>：处理失败<br><code>cancelled</code>：已取消</td></tr><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>requestTime</td><td>String</td><td>发起 申购/赎回 请求的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>completedTime</td><td>String</td><td>赎回请求处理完成的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>estCompletedTime</td><td>String</td><td>预估完成赎回的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取历史收益率(公共)

公共接口无须鉴权

#### 限速：6次/s

#### 限速规则：IP

#### HTTP 请求

`GET /api/v5/finance/staking-defi/eth/apy-history`

> 请求示例

```
GET /api/v5/finance/staking-defi/eth/apy-history?days=2
```

```
import okx.Finance.EthStaking as EthStaking

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = EthStaking.EthStakingAPI(flag=flag)

result = StackingAPI.eth_apy_history(days="7")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">days</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">查询最近多少天内的数据，不超过365天</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "rate": "0.02690000",
            "ts": "1734195600000"
        },
        {
            "rate": "0.02840000",
            "ts": "1734109200000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>rate</td><td>String</td><td>年化收益率，如 <code>0.01</code>代表<code>1%</code></td></tr><tr><td>ts</td><td>String</td><td>时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

## SOL质押

通过质押 SOL 代币并将其委托给 Solana 网络上的验证者，您可以收到等值的 OKSOL 并获得每日 OKSOL 奖励。  
在 Solana 上质押 SOL，即获 1:1 OKSOL，享受更高流动性  
[了解更多](/zh-hans/earn/solana-staking#from=finance_crypto)

### GET / 获取产品信息

#### 限速：3 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/sol/product-info`

> 请求示例

```
GET /api/v5/finance/staking-defi/sol/product-info
```

> 返回结果

```
{
    "code": "0",
    "data": {
        "fastRedemptionAvail": "240",
        "fastRedemptionDailyLimit": "240",
        "rate": "5.57",
        "redemptDays": "2",
        "minAmt": "0.01"
    },
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>fastRedemptionDailyLimit</td><td>String</td><td>快速赎回每日最高份额<br>母账户和子账户共享同一个限额</td></tr><tr><td>fastRedemptionAvail</td><td>String</td><td>当前剩余最大可赎回数量</td></tr><tr><td>rate</td><td>String</td><td>最新 OKSOL 年化收益率</td></tr><tr><td>redemptDays</td><td>String</td><td>OKSOL 赎回天数</td></tr><tr><td>minAmt</td><td>String</td><td>OKSOL 最低申购数量</td></tr></tbody></table>

### POST / 申购

质押 SOL 获取 OKSOL  
仅资金账户中的资产支持 SOL 质押。

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/sol/purchase`

> 请求示例

```
POST /api/v5/finance/staking-defi/sol/purchase
body 
{
    "amt":"100"
}
```

```
import okx.Finance.SolStaking as SolStaking


# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = SolStaking.SolStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.sol_purchase(amt="1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资数量</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
  ]
}
```

#### 返回参数

code = `0`代表请求已被成功处理

### POST / 赎回

只能赎回资金账户中的 OKSOL 资产，交易账户中的 OKSOL 资产需要您先做资金划转到资金账户后赎回。

#### 限速：2次/s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/staking-defi/sol/redeem`

> 请求示例

```
POST /api/v5/finance/staking-defi/sol/redeem
body 
{
    "amt":"10"
}
```

```
import okx.Finance.SolStaking as SolStaking


# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = SolStaking.SolStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.sol_redeem(amt="1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">赎回数量</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
  ]
}
```

#### 返回参数

code = `0`代表请求已被成功处理

### GET / 获取余额

该余额表示账户内 OKSOL 的实时总持仓，包括交易账户、资金账户以及处于赎回过程中的资产。

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/sol/balance`

> 请求示例

```
GET /api/v5/finance/staking-defi/sol/balance
```

```
import okx.Finance.SolStaking as SolStaking


# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = SolStaking.SolStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.sol_balance()
print(result)
```

#### 请求参数

None

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "0.01100012",
            "ccy": "OKSOL",
            "latestInterestAccrual": "0.00000012",
            "totalInterestAccrual": "0.00000012"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>OKSOL</code></td></tr><tr><td>amt</td><td>String</td><td>币种数量</td></tr><tr><td>latestInterestAccrual</td><td>String</td><td>最近收益</td></tr><tr><td>totalInterestAccrual</td><td>String</td><td>历史总收益</td></tr></tbody></table>

### GET / 获取申购赎回记录

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/staking-defi/sol/purchase-redeem-history`

> 请求示例

```
GET /api/v5/finance/staking-defi/sol/purchase-redeem-history
```

```
import okx.Finance.SolStaking as SolStaking


# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = SolStaking.SolStakingAPI(apikey, secretkey, passphrase, False, flag)

result = StackingAPI.sol_purchase_redeem_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">类型<br><code>purchase</code>：申购<br><code>redeem</code>：赎回</td></tr><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">状态<br><code>pending</code>：处理中<br><code>success</code>：成功处理<br><code>failed</code>：处理失败</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此<code>requestTime</code>之前（更旧的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此<code>requestTime</code>之后（更新的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，默认100条，最大值为100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "0.62666630",
            "completedTime": "1683413171000",
            "estCompletedTime": "",
            "redeemingAmt": "",
            "requestTime": "1683413171000",
            "status": "success",
            "type": "purchase"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>type</td><td>String</td><td>类型<br><code>purchase</code>：申购<br><code>redeem</code>：赎回</td></tr><tr><td>amt</td><td>String</td><td>申购/赎回 的数量</td></tr><tr><td>redeemingAmt</td><td>String</td><td>赎回中的数量</td></tr><tr><td>status</td><td>String</td><td>状态<br><code>pending</code>：处理中<br><code>success</code>：成功处理<br><code>failed</code>：处理失败</td></tr><tr><td>requestTime</td><td>String</td><td>发起 申购/赎回 请求的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>completedTime</td><td>String</td><td>赎回请求处理完成的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>estCompletedTime</td><td>String</td><td>预估完成赎回的时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取历史收益率(公共)

公共接口无须鉴权

#### 限速：6次/s

#### 限速规则：IP

#### HTTP 请求

`GET /api/v5/finance/staking-defi/sol/apy-history`

> 请求示例

```
GET /api/v5/finance/staking-defi/sol/apy-history?days=2
```

```
import okx.Finance.SolStaking as SolStaking

flag = "0"  # 实盘: 0, 模拟盘: 1

StackingAPI = SolStaking.SolStakingAPI(flag=flag)

result = StackingAPI.sol_apy_history(days="7")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">days</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">查询最近多少天内的数据，不超过365天</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "rate": "0.11280000",
            "ts": "1734192000000"
        },
        {
            "rate": "0.11270000",
            "ts": "1734105600000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>rate</td><td>String</td><td>年化收益率，如 <code>0.01</code>代表<code>1%</code></td></tr><tr><td>ts</td><td>String</td><td>时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

## Stable Rewards

OKX Stable Rewards 自动为持有合格稳定币（如 `USDG`）的用户每日发放奖励，启用后无需任何操作即可持续赚取收益。  
订阅时从资金账户扣款；收益及赎回默认结算至交易账户。

> **下线说明**
> 
> `POST /api/v5/finance/stable-rewards/quote`、`POST /api/v5/finance/stable-rewards/trade` 及 `GET /api/v5/finance/stable-rewards/subscribe-redeem-history` 接口已停用。如需交易 USDG 等稳定币，请使用标准[订单簿交易 API](/zh/order-book-trading)。

### GET / 获取产品信息

获取指定稳定币的产品信息，包括支持订阅/赎回的结算币种、适用手续费率、申购/赎回金额限制、每日配额以及当前赎回可用状态。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/stable-rewards/product-info`

> 请求示例

```
GET /api/v5/finance/stable-rewards/product-info?ccy=USDG
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>是</td><td>稳定币，如 <code>USDG</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "details": [
                {
                    "ccy": "USDG",
                    "settleCcy": "USDC",
                    "subFeeRate": "0.0003",
                    "redemptFeeRate": "0",
                    "minSubAmt": "1",
                    "minRedeemAmt": "0.0000001",
                    "remainingSubQuota": "1000000",
                    "remainingRedemptQuota": "500000",
                    "canRedeem": true
                },
                {
                    "ccy": "USDG",
                    "settleCcy": "USDT",
                    "subFeeRate": "0.0003",
                    "redemptFeeRate": "",
                    "minSubAmt": "1",
                    "minRedeemAmt": "",
                    "remainingSubQuota": "1000000",
                    "remainingRedemptQuota": "",
                    "canRedeem": false
                }
            ],
            "ts": "1718035200000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>details</td><td>Array of objects</td><td>当前稳定币支持的结算币种及其订阅/赎回信息列表</td></tr><tr><td>&gt; ccy</td><td>String</td><td>可订阅的稳定币，如 <code>USDG</code></td></tr><tr><td>&gt; settleCcy</td><td>String</td><td>可用于订阅 <code>ccy</code> 的结算币种，如 <code>USDC</code>、<code>USDT</code></td></tr><tr><td>&gt; subFeeRate</td><td>String</td><td>订阅手续费率，如 <code>0.01</code> 代表 <code>1%</code></td></tr><tr><td>&gt; redemptFeeRate</td><td>String</td><td>赎回手续费率，如 <code>0.01</code> 代表 <code>1%</code><br>当前 <code>settleCcy</code> 不支持赎回时返回 <code>""</code></td></tr><tr><td>&gt; minSubAmt</td><td>String</td><td>最小订阅数量，以 <code>settleCcy</code> 计价</td></tr><tr><td>&gt; minRedeemAmt</td><td>String</td><td>最小赎回数量，以 <code>ccy</code> 计价<br>当前 <code>settleCcy</code> 不支持赎回时返回 <code>""</code></td></tr><tr><td>&gt; remainingSubQuota</td><td>String</td><td>每日剩余订阅额度，按母账户 ID 统计<br><code>-1</code> 代表无上限</td></tr><tr><td>&gt; remainingRedemptQuota</td><td>String</td><td>每日剩余赎回额度，按母账户 ID 统计<br><code>-1</code> 代表无上限<br>当前 <code>settleCcy</code> 不支持赎回时返回 <code>""</code></td></tr><tr><td>&gt; canRedeem</td><td>Boolean</td><td>当前 <code>settleCcy</code> 是否支持赎回<br><code>true</code>：可赎回<br><code>false</code>：不可赎回</td></tr><tr><td>ts</td><td>String</td><td>数据查询时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取余额

查询 Stable Rewards 的实时余额，余额涵盖交易账户、资金账户以及正在赎回中的资产合计，同时返回累计收益与当前收益状态。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/stable-rewards/balance`

> 请求示例

```
GET /api/v5/finance/stable-rewards/balance?ccy=USDG
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>否</td><td>稳定币，如 <code>USDG</code><br>不传则返回全部支持的稳定币</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "details": [
                {
                    "ccy": "USDG",
                    "amt": "100",
                    "totalEarnAccrual": "0.0003",
                    "state": "earning"
                }
            ],
            "ts": "1718035200000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>details</td><td>Array of objects</td><td>按稳定币返回的实时余额明细</td></tr><tr><td>&gt; ccy</td><td>String</td><td>稳定币，如 <code>USDG</code></td></tr><tr><td>&gt; amt</td><td>String</td><td>整个账户范围内的持有数量</td></tr><tr><td>&gt; totalEarnAccrual</td><td>String</td><td>持有期间的累计收益</td></tr><tr><td>&gt; state</td><td>String</td><td>收益状态<br><code>earning</code>：正在产生收益<br><code>pending</code>：未在产生收益（如自动赚币已关闭，或余额低于起息门槛）</td></tr><tr><td>ts</td><td>String</td><td>数据查询时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取历史收益率

查询指定稳定币的历史每日年化收益率。返回值为用户当前 VIP 等级对应的收益率。

#### 限速：6次/s

#### 限速规则：IP

#### HTTP 请求

`GET /api/v5/finance/stable-rewards/apy-history`

> 请求示例

```
GET /api/v5/finance/stable-rewards/apy-history?ccy=USDG
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>是</td><td>稳定币，如 <code>USDG</code></td></tr><tr><td>days</td><td>String</td><td>否</td><td>查询最近多少天的历史数据。默认 <code>100</code>，最大 <code>100</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "rate": "0.004",
            "ts": "1718035200000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rate</td><td>String</td><td>用户当前 VIP 等级对应的日度年化收益率，如 <code>0.041</code> 代表 <code>4.1%</code></td></tr><tr><td>ts</td><td>String</td><td>数据快照时间（UTC+0），Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

## OKUSD

OKUSD 是 OKX 以 1:1 汇率发行的稳定币凭证，用户以 USDT 申购后持有即可享受每日收益，同时可用作交易账户保证金以提升资本效率。  
申购与赎回均在资金账户中操作。申购或赎回前可调用 `/limits` 接口查询当日剩余限额。

### GET / 查询限额

查询您当日 OKUSD 申购剩余限额及即时/标准赎回剩余限额。所有限额均以母账户维度计算，子账户共享。

#### 限速：2次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/finance/okusd/limits`

> 请求示例

```
GET /api/v5/finance/okusd/limits
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "subLimit": {
                "maxSubAmt": "45000000",
                "personalDailyLimit": "5000000",
                "personalUsedAmt": "500000",
                "platformDailyLimit": "50000000",
                "platformUsedAmt": "5000000"
            },
            "fastRedeemLimit": {
                "personalDailyLimit": "10000",
                "personalUsedAmt": "0",
                "platformDailyLimit": "5000000",
                "platformUsedAmt": "1000000",
                "feeRate": "0.001"
            },
            "stdRedeemLimit": {
                "personalDailyLimit": "1000000",
                "personalUsedAmt": "0",
                "platformDailyLimit": "40000000",
                "platformUsedAmt": "0",
                "feeRate": "0.00025"
            },
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>subLimit</td><td>Object</td><td>申购限额信息</td></tr><tr><td>&gt; maxSubAmt</td><td>String</td><td>当日最大可申购数量（USDT），= min(personalDailyLimit - personalUsedAmt, platformDailyLimit - platformUsedAmt)，最小值为 <code>"0"</code></td></tr><tr><td>&gt; personalDailyLimit</td><td>String</td><td>根据您的 VIP 等级对应的每日申购上限（USDT）</td></tr><tr><td>&gt; personalUsedAmt</td><td>String</td><td>您当日已申购金额（USDT）</td></tr><tr><td>&gt; platformDailyLimit</td><td>String</td><td>平台每日申购总上限（USDT）</td></tr><tr><td>&gt; platformUsedAmt</td><td>String</td><td>平台当日已申购总金额（USDT）</td></tr><tr><td>fastRedeemLimit</td><td>Object</td><td>即时赎回限额信息（实时到账）</td></tr><tr><td>&gt; personalDailyLimit</td><td>String</td><td>根据您的 VIP 等级对应的每日即时赎回上限（OKUSD）</td></tr><tr><td>&gt; personalUsedAmt</td><td>String</td><td>您当日已使用的即时赎回额度（OKUSD）</td></tr><tr><td>&gt; platformDailyLimit</td><td>String</td><td>平台每日即时赎回总上限（OKUSD）</td></tr><tr><td>&gt; platformUsedAmt</td><td>String</td><td>平台当日已使用的即时赎回额度（OKUSD）</td></tr><tr><td>&gt; feeRate</td><td>String</td><td>即时赎回手续费率</td></tr><tr><td>stdRedeemLimit</td><td>Object</td><td>标准赎回限额信息</td></tr><tr><td>&gt; personalDailyLimit</td><td>String</td><td>根据您的 VIP 等级对应的每日标准赎回上限（OKUSD）</td></tr><tr><td>&gt; personalUsedAmt</td><td>String</td><td>您当日已使用的标准赎回额度（OKUSD）</td></tr><tr><td>&gt; platformDailyLimit</td><td>String</td><td>平台每日标准赎回总上限（OKUSD）</td></tr><tr><td>&gt; platformUsedAmt</td><td>String</td><td>平台当日已使用的标准赎回额度（OKUSD）</td></tr><tr><td>&gt; feeRate</td><td>String</td><td>标准赎回手续费率</td></tr><tr><td>ts</td><td>String</td><td>服务器时间戳，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### POST / 申购 OKUSD

以 1:1 汇率将 USDT 申购为 OKUSD，无申购手续费，OKUSD 即时到账至资金账户。每次请求需传入唯一的 `clOrdId`；重复提交相同 `clOrdId` 将直接返回原始订单，不重复执行申购。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/okusd/subscribe`

> 请求示例

```
POST /api/v5/finance/okusd/subscribe
body
{
    "amt": "1000.00000000",
    "clOrdId": "my-sub-001"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>amt</td><td>String</td><td>是</td><td>申购 USDT 数量。最小值：<code>1</code>。最多 8 位小数。不支持科学计数法</td></tr><tr><td>clOrdId</td><td>String</td><td>是</td><td>客户自定义订单 ID，最多 32 字符（字母、数字、<code>-</code>、<code>_</code>）。同一 UID 下不可重复，用于订单追踪与幂等标识</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "680012345678901234",
            "clOrdId": "my-sub-001",
            "ccy": "USDT",
            "amt": "1000.00000000",
            "okusdAmt": "1000.00000000",
            "state": "success",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>系统订单 ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单 ID（原样返回）</td></tr><tr><td>ccy</td><td>String</td><td>申购货币，固定为 <code>"USDT"</code></td></tr><tr><td>amt</td><td>String</td><td>实际申购 USDT 数量</td></tr><tr><td>okusdAmt</td><td>String</td><td>到账 OKUSD 数量（= <code>amt</code>，汇率 1:1，无申购手续费），到账至资金账户</td></tr><tr><td>state</td><td>String</td><td>订单状态：<code>"success"</code> / <code>"pending"</code> / <code>"failed"</code></td></tr><tr><td>ts</td><td>String</td><td>订单创建时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### POST / 赎回 OKUSD

将 OKUSD 赎回为 USDT。支持即时赎回（实时到账）和标准赎回（D+5 或 D+6 自然日，取决于提交时间）。各类型手续费率请调用 `GET /limits` 查询。所有手续费均向下截断（floor）至 8 位小数。每次请求需传入唯一的 `clOrdId`；重复提交相同 `clOrdId` 将直接返回原始订单，不重复执行赎回。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/finance/okusd/redeem`

> 请求示例（即时赎回）

```
POST /api/v5/finance/okusd/redeem
body
{
    "amt": "1000.00000000",
    "redeemType": "1",
    "clOrdId": "my-redeem-001"
}
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>amt</td><td>String</td><td>是</td><td>赎回 OKUSD 数量。最小值：<code>1</code>。最多 8 位小数。不支持科学计数法</td></tr><tr><td>redeemType</td><td>String</td><td>是</td><td>赎回类型。<code>"1"</code>：即时赎回（实时到账）；<code>"2"</code>：标准赎回（UTC+8 16:00 前提交加 5 自然日，16:00 后（含）提交加 6 自然日）。各类型手续费率请参考 <code>/limits</code> 接口返回的 <code>feeRate</code> 字段</td></tr><tr><td>clOrdId</td><td>String</td><td>是</td><td>客户自定义订单 ID，最多 32 字符（字母、数字、<code>-</code>、<code>_</code>）。同一 UID 下不可重复，用于订单追踪与幂等标识</td></tr></tbody></table>

> 返回结果（即时赎回）

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "680012345678905678",
            "clOrdId": "my-redeem-001",
            "ccy": "OKUSD",
            "amt": "1000.00000000",
            "fee": "1.00000000",
            "usdtAmt": "999.00000000",
            "redeemType": "1",
            "state": "success",
            "estSettlementTime": "1718500010000",
            "ts": "1718500000000"
        }
    ]
}
```

> 返回结果（标准赎回）

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "680012345678906789",
            "clOrdId": "my-redeem-002",
            "ccy": "OKUSD",
            "amt": "50000.00000000",
            "fee": "12.50000000",
            "usdtAmt": "49987.50000000",
            "redeemType": "2",
            "state": "processing",
            "estSettlementTime": "1718932800000",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>系统订单 ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单 ID（原样返回）</td></tr><tr><td>ccy</td><td>String</td><td>赎回货币，固定为 <code>"OKUSD"</code></td></tr><tr><td>amt</td><td>String</td><td>赎回 OKUSD 数量</td></tr><tr><td>fee</td><td>String</td><td>实收手续费（USDT），向下截断至 8 位小数</td></tr><tr><td>usdtAmt</td><td>String</td><td>实际到账 USDT 数量（<code>amt - fee</code>，向下截断至 8 位小数），到账至资金账户</td></tr><tr><td>redeemType</td><td>String</td><td>赎回类型：<code>"1"</code>（即时）或 <code>"2"</code>（标准）</td></tr><tr><td>state</td><td>String</td><td>订单状态：<code>"processing"</code> / <code>"success"</code> / <code>"failed"</code> / <code>"cancelled"</code></td></tr><tr><td>estSettlementTime</td><td>String</td><td>预计到账时间，Unix 时间戳，单位为毫秒。即时赎回为当前时间；标准赎回：UTC+8 16:00 前提交加 5 自然日，16:00 后（含）提交加 6 自然日</td></tr><tr><td>ts</td><td>String</td><td>订单创建时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 查询账户余额及累计收益

查询您当前的 OKUSD 余额及持仓期间累计收益。所有余额均以母账户维度聚合，子账户共享。

#### 限速：2次/2s

#### 限速规则：User ID

#### Permission: Read

#### HTTP 请求

`GET /api/v5/finance/okusd/account`

> 请求示例

```
GET /api/v5/finance/okusd/account
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ccy": "OKUSD",
            "amt": "10000.00000000",
            "totalEarnAccrual": "123.45678900",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>持仓货币，固定为 <code>"OKUSD"</code></td></tr><tr><td>amt</td><td>String</td><td>当前 OKUSD 余额</td></tr><tr><td>totalEarnAccrual</td><td>String</td><td>持仓期间累计收益（USDT）</td></tr><tr><td>ts</td><td>String</td><td>服务器时间戳，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 查询申购历史

查询您的 OKUSD 申购历史订单。结果按时间戳倒序返回（最新优先），支持时间范围过滤。

#### 限速：5次/2s

#### 限速规则：User ID

#### Permission: Read

#### HTTP 请求

`GET /api/v5/finance/okusd/subscribe/history`

> 请求示例

```
GET /api/v5/finance/okusd/subscribe/history?limit=2
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>limit</td><td>String</td><td>否</td><td>每页返回条数，默认 <code>"100"</code>，最大 <code>"100"</code></td></tr><tr><td>begin</td><td>String</td><td>否</td><td>起始时间过滤（订单创建时间 <code>ts</code>，Unix ms，含）</td></tr><tr><td>end</td><td>String</td><td>否</td><td>结束时间过滤（订单创建时间 <code>ts</code>，Unix ms，含）</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "680012345678901234",
            "clOrdId": "my-sub-001",
            "ccy": "USDT",
            "amt": "1000.00000000",
            "settleCcy": "OKUSD",
            "settleCcyAmt": "1000.00000000",
            "status": "success",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>系统订单 ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单 ID（原样返回；未传则为空字符串）</td></tr><tr><td>ccy</td><td>String</td><td>申购货币，固定为 <code>"USDT"</code></td></tr><tr><td>amt</td><td>String</td><td>申购 USDT 数量</td></tr><tr><td>settleCcy</td><td>String</td><td>到账货币，固定为 <code>"OKUSD"</code></td></tr><tr><td>settleCcyAmt</td><td>String</td><td>到账 OKUSD 数量（= <code>amt</code>，汇率 1:1）</td></tr><tr><td>status</td><td>String</td><td>订单终态：<code>"success"</code> / <code>"failed"</code></td></tr><tr><td>ts</td><td>String</td><td>订单创建时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 查询赎回历史

查询您的 OKUSD 赎回历史订单。结果按时间戳倒序返回（最新优先），支持时间范围过滤及赎回类型过滤。

#### 限速：5次/2s

#### 限速规则：User ID

#### Permission: Read

#### HTTP 请求

`GET /api/v5/finance/okusd/redeem/history`

> 请求示例

```
GET /api/v5/finance/okusd/redeem/history?type=fast
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>limit</td><td>String</td><td>否</td><td>每页返回条数，默认 <code>"100"</code>，最大 <code>"100"</code></td></tr><tr><td>begin</td><td>String</td><td>否</td><td>起始时间过滤（订单创建时间 <code>ts</code>，Unix ms，含）</td></tr><tr><td>end</td><td>String</td><td>否</td><td>结束时间过滤（订单创建时间 <code>ts</code>，Unix ms，含）</td></tr><tr><td>type</td><td>String</td><td>否</td><td>赎回类型过滤：<code>"fast"</code> 仅返回即时赎回；<code>"standard"</code> 仅返回标准赎回；不传默认返回标准赎回</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "680012345678905678",
            "clOrdId": "my-rdm-fast-001",
            "ccy": "OKUSD",
            "amt": "1000.00000000",
            "fee": "1.00000000",
            "settleCcy": "USDT",
            "settleCcyAmt": "999.00000000",
            "type": "fast",
            "status": "success",
            "estSettlementTime": "1718500010000",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>系统订单 ID</td></tr><tr><td>clOrdId</td><td>String</td><td>客户自定义订单 ID（原样返回；未传则为空字符串）</td></tr><tr><td>ccy</td><td>String</td><td>赎回货币，固定为 <code>"OKUSD"</code></td></tr><tr><td>amt</td><td>String</td><td>赎回 OKUSD 数量</td></tr><tr><td>fee</td><td>String</td><td>实收手续费（USDT），向下截断至 8 位小数</td></tr><tr><td>settleCcy</td><td>String</td><td>到账货币，固定为 <code>"USDT"</code></td></tr><tr><td>settleCcyAmt</td><td>String</td><td>实际到账 USDT 数量（<code>amt - fee</code>，向下截断至 8 位小数）</td></tr><tr><td>type</td><td>String</td><td>赎回类型：<code>"fast"</code>（即时赎回）或 <code>"standard"</code>（标准赎回，D+5/D+6 自然日）</td></tr><tr><td>status</td><td>String</td><td>订单状态：<code>"pending"</code> / <code>"success"</code> / <code>"failed"</code> / <code>"canceled"</code></td></tr><tr><td>estSettlementTime</td><td>String</td><td>预计到账时间，Unix 时间戳，单位为毫秒。已结算的即时赎回订单返回空字符串</td></tr><tr><td>ts</td><td>String</td><td>订单创建时间，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 查询收益发放历史

查询您的 OKUSD 每日收益发放历史。结果按时间戳倒序返回（最新优先）。

#### 限速：5次/2s

#### 限速规则：User ID

#### Permission: Read

#### HTTP 请求

`GET /api/v5/finance/okusd/rewards/history`

> 请求示例

```
GET /api/v5/finance/okusd/rewards/history?limit=7
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>limit</td><td>String</td><td>否</td><td>每页返回条数，默认 <code>"30"</code>，最大 <code>"100"</code></td></tr><tr><td>begin</td><td>String</td><td>否</td><td>起始时间过滤（<code>ts</code>，Unix ms，含），最大查询跨度 6 个月</td></tr><tr><td>end</td><td>String</td><td>否</td><td>结束时间过滤（<code>ts</code>，Unix ms，含），不传默认取当前时间</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ccy": "USDT",
            "earnAmt": "1.14246575",
            "amt": "10000.00000000",
            "apr": "0.0418",
            "ts": "1718500000000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>收益货币，固定为 <code>"USDT"</code></td></tr><tr><td>earnAmt</td><td>String</td><td>本次发放的 USDT 收益数量</td></tr><tr><td>amt</td><td>String</td><td>发放时点用户 USDT 本金余额</td></tr><tr><td>apr</td><td>String</td><td>本次发放适用的 APR，如 <code>"0.0418"</code> 表示 4.18%</td></tr><tr><td>ts</td><td>String</td><td>发放时间戳，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 查询 APR 历史

查询 OKUSD 历史 APR 快照。结果按时间戳倒序返回（最新优先）。虽然数据为产品级（非用户维度），本接口仍需 API Key 鉴权。

#### 限速：5次/2s

#### 限速规则：User ID

#### Permission: Read

#### HTTP 请求

`GET /api/v5/finance/okusd/rate/history`

> 请求示例

```
GET /api/v5/finance/okusd/rate/history?limit=10
```

#### 请求参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>limit</td><td>String</td><td>否</td><td>每页返回条数，默认 <code>"30"</code>，最大 <code>"100"</code></td></tr><tr><td>begin</td><td>String</td><td>否</td><td>起始时间过滤（<code>ts</code>，Unix ms，含），最大查询跨度 6 个月</td></tr><tr><td>end</td><td>String</td><td>否</td><td>结束时间过滤（<code>ts</code>，Unix ms，含），不传默认取当前时间</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        { "apr": "0.0418", "ts": "1718500000000" },
        { "apr": "0.0395", "ts": "1718413600000" }
    ]
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>apr</td><td>String</td><td>该快照时刻的 OKUSD APR，如 <code>"0.0418"</code> 表示 4.18%</td></tr><tr><td>ts</td><td>String</td><td>快照时间戳，Unix 时间戳，单位为毫秒，如 <code>1597026383085</code></td></tr></tbody></table>

## 活期简单赚币

活期简单赚币通过在借贷市场出借给杠杆交易用户获取收益。[了解更多](/cn/earn/simple-earn)

### GET / 获取活期简单赚币余额

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/savings/balance`

> 请求示例

```
GET /api/v5/finance/savings/balance?ccy=BTC
```

```
import okx.Finance.Savings as Savings

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(apikey, secretkey, passphrase, False, flag)

result = SavingsAPI.get_saving_balance(ccy="USDT")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg":"",
    "data": [
        {
            "earnings": "0.0010737388791526",
            "redemptAmt": "",
            "rate": "0.0100000000000000",
            "ccy": "USDT",
            "amt": "11.0010737453457821",
            "loanAmt": "11.0010630707982819",
            "pendingAmt": "0.0000106745475002"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">币种数量</td></tr><tr><td style="text-align: left">earnings</td><td style="text-align: left">String</td><td style="text-align: left">币种持仓收益</td></tr><tr><td style="text-align: left">rate</td><td style="text-align: left">String</td><td style="text-align: left">用户配置的最低年化出借利率</td></tr><tr><td style="text-align: left">loanAmt</td><td style="text-align: left">String</td><td style="text-align: left">已出借数量</td></tr><tr><td style="text-align: left">pendingAmt</td><td style="text-align: left">String</td><td style="text-align: left">未出借数量</td></tr><tr><td style="text-align: left">redemptAmt</td><td style="text-align: left">String</td><td style="text-align: left"><del>赎回中的数量</del>（已废弃）</td></tr></tbody></table>

### POST / 活期简单赚币申购/赎回

仅资金账户中的资产支持活期简单赚币申购。

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/savings/purchase-redempt`

> 请求示例

```
POST /api/v5/finance/savings/purchase-redempt
body
{
    "ccy":"BTC",
    "amt":"1",
    "side":"purchase",
    "rate":"0.01"
}
```

```
import okx.Finance.Savings as Savings

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(apikey, secretkey, passphrase, False, flag)

result = SavingsAPI.savings_purchase_redemption(ccy='USDT',amt="0.1",side="purchase",rate="1")
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>是</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>amt</td><td>String</td><td>是</td><td>申购/赎回 数量</td></tr><tr><td>side</td><td>String</td><td>是</td><td>操作类型<br><code>purchase</code>：申购 <code>redempt</code>：赎回</td></tr><tr><td>rate</td><td>String</td><td>可选</td><td>申购年利率，如 <code>0.1</code>代表<code>10%</code><br>仅适用于申购，新申购的利率会覆盖上次申购的利率<br>参数取值范围在1%到365%之间</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "ccy":"BTC",
            "amt":"1",
            "side":"purchase",
            "rate":"0.01"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称</td></tr><tr><td>amt</td><td>String</td><td>申购/赎回 数量</td></tr><tr><td>side</td><td>String</td><td>操作类型</td></tr><tr><td>rate</td><td>String</td><td>申购年利率，如 <code>0.1</code>代表<code>10%</code></td></tr></tbody></table>

### POST / 设置活期简单赚币借贷利率

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/savings/set-lending-rate`

> 请求示例

```
POST /api/v5/finance/savings/set-lending-rate
body
{
    "ccy":"BTC",
    "rate":"0.02"
}
```

```
import okx.Finance.Savings as Savings

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(apikey, secretkey, passphrase, False, flag)

result = SavingsAPI.set_lending_rate(ccy='USDT',rate="1")
print(result)
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>是</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>rate</td><td>String</td><td>是</td><td>贷出年利率<br>参数取值范围在1%到365%之间</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ccy": "BTC",
        "rate": "0.02"
    }]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>rate</td><td>String</td><td>贷出年利率</td></tr></tbody></table>

### GET / 获取活期简单赚币出借明细

返回最近一个月的数据

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/savings/lending-history`

> 请求示例

```
GET /api/v5/finance/savings/lending-history
```

```
import okx.Finance.Savings as Savings

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(apikey, secretkey, passphrase, False, flag)

result = SavingsAPI.get_lending_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为 100，不填默认返回 100 条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
            "ccy": "BTC",
            "amt": "0.01",
            "earnings": "0.001",
            "rate": "0.01",
            "ts": "1597026383085"
        },
        {
            "ccy": "ETH",
            "amt": "0.2",
            "earnings": "0.001",
            "rate": "0.01",
            "ts": "1597026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">出借数量</td></tr><tr><td style="text-align: left">earnings</td><td style="text-align: left">String</td><td style="text-align: left">已赚取利息</td></tr><tr><td style="text-align: left">rate</td><td style="text-align: left">String</td><td style="text-align: left">出借年利率</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">出借时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取市场借贷信息（公共）

公共接口无须鉴权

#### 限速：6次/s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/finance/savings/lending-rate-summary`

> 请求示例

```
GET /api/v5/finance/savings/lending-rate-summary
```

```
import okx.Finance.Savings as Savings

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(flag=flag)

result = SavingsAPI.get_public_borrow_info()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ccy": "BTC",
        "avgAmt": "10000",
        "avgAmtUsd": "10000000000",
        "avgRate": "0.03",
        "preRate": "0.02",
        "estRate": "0.01"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">avgAmt</td><td style="text-align: left">String</td><td style="text-align: left"><del>过去24小时平均借贷量</del>(已弃用)</td></tr><tr><td style="text-align: left">avgAmtUsd</td><td style="text-align: left">String</td><td style="text-align: left"><del>过去24小时平均借贷美元价值</del>(已弃用)</td></tr><tr><td style="text-align: left">avgRate</td><td style="text-align: left">String</td><td style="text-align: left">过去24小时平均借入年利率</td></tr><tr><td style="text-align: left">preRate</td><td style="text-align: left">String</td><td style="text-align: left">上一次借入年利率</td></tr><tr><td style="text-align: left">estRate</td><td style="text-align: left">String</td><td style="text-align: left">下一次预估借入年利率</td></tr></tbody></table>

### GET / 获取市场借贷历史（公共）

公共接口无须鉴权  
返回2021年12月14日后的记录  

#### 限速：6次/s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/finance/savings/lending-rate-history`

> 请求示例

```
GET /api/v5/finance/savings/lending-rate-history
```

```
import okx.Finance.Savings as Savings

flag = "0"  # 实盘: 0, 模拟盘: 1

SavingsAPI = Savings.SavingsAPI(flag=flag)

result = SavingsAPI.get_public_borrow_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条<br>如果不指定<code>ccy</code>,会返回同一个<code>ts</code>下的全部数据，不受<code>limit</code>限制</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "ccy": "BTC",
        "amt": "0.01",
        "rate": "0.001",
        "lendingRate": "0.001",
        "ts": "1597026383085"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left"><del>市场总出借数量</del>（已弃用）</td></tr><tr><td style="text-align: left">rate</td><td style="text-align: left">String</td><td style="text-align: left">出借年利率</td></tr><tr><td style="text-align: left">lendingRate</td><td style="text-align: left">String</td><td style="text-align: left">年化出借利率</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

## 活期借币

欧易活期借币是一款高端借贷产品，用户无需变卖数字货币即可增加现金流。[了解更多](/loan)

### GET / 可借币种列表

获取可借币种列表

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/borrow-currencies`

> 请求示例

```
GET /api/v5/finance/flexible-loan/borrow-currencies
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.borrow_currencies()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "borrowCcy": "USDT"
        },
        {
            "borrowCcy": "USDC"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>borrowCcy</td><td>String</td><td>可借币种，如 <code>BTC</code></td></tr></tbody></table>

### GET / 可抵押资产

获取可抵押资产信息（仅支持资金账户中的资产）

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/collateral-assets`

> 请求示例

```
GET /api/v5/finance/flexible-loan/collateral-assets?ordId=12345
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.collateral_assets(ordId="12345")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将默认对起始时间最早的现存订单进行操作。<br>如果没有现存订单，系统将返回空数据。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "assets": [
                {
                    "amt": "1.7921483143067599",
                    "ccy": "BTC",
                    "notionalUsd": "158292.621793314105231"
                },
                {
                    "amt": "1.9400755578876945",
                    "ccy": "ETH",
                    "notionalUsd": "6325.6652712507628946"
                },
                {
                    "amt": "63.9795959720319628",
                    "ccy": "USDT",
                    "notionalUsd": "64.3650372635940345"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>assets</td><td>Array of objects</td><td>可抵押资产信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种，如 <code>BTC</code></td></tr><tr><td>&gt; amt</td><td>String</td><td>可用数量</td></tr><tr><td>&gt; notionalUsd</td><td>String</td><td>可抵押资产的美金价值</td></tr></tbody></table>

### POST / 最大可借

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/flexible-loan/max-loan`

> 请求示例

```
POST /api/v5/finance/flexible-loan/max-loan
body
{
    "ordId": "12345",
    "borrowCcy": "USDT"
}
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.max_loan(ordId="12345", borrowCcy="USDT")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">borrowCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">借币币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将默认对起始时间最早的现存订单进行操作。<br>如果没有现存订单，系统将返回空数据。</td></tr><tr><td style="text-align: left">supCollateral</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">补充抵押资产信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">数量</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "borrowCcy": "USDT",
            "maxLoan": "0.01113",
            "notionalUsd": "0.01113356",
            "remainingQuota": "3395000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>borrowCcy</td><td>String</td><td>借币币种，如 <code>USDT</code></td></tr><tr><td>maxLoan</td><td>String</td><td>最大可借数量</td></tr><tr><td>notionalUsd</td><td>String</td><td>最大可借美元价值</td></tr><tr><td>remainingQuota</td><td>String</td><td>剩余可借额度，单位为<code>borrowCcy</code></td></tr></tbody></table>

### GET / 抵押物最大可赎回数量

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/max-collateral-redeem-amount`

> 请求示例

```
GET /api/v5/finance/flexible-loan/max-collateral-redeem-amount?ccy=USDT&ordId=12345
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.max_collateral_redeem_amount(ordId="12345", ccy="USDT")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">抵押物币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将默认对起始时间最早的现存订单进行操作。<br>如果没有现存订单，系统将返回空数据。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "maxRedeemAmt": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>抵押物币种，如 <code>USDT</code></td></tr><tr><td>maxRedeemAmt</td><td>String</td><td>抵押物最大可赎回数量</td></tr></tbody></table>

### POST / 调整抵押物

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/flexible-loan/adjust-collateral`

> 请求示例

```
POST /api/v5/finance/flexible-loan/adjust-collateral
body
{
    "type":"add",
    "ordId": "12345",
    "collateralCcy": "BTC",
    "collateralAmt": "0.1"
}
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.adjust_collateral(type="add", ordId="12345", collateralCcy="USDT", collateralAmt="1")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作类型<br><code>add</code>：补充抵押物<br><code>reduce</code>：减少抵押物</td></tr><tr><td style="text-align: left">collateralCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">抵押物币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">collateralAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">抵押物数量</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将默认对起始时间最早的现存订单进行操作。<br>如果没有现存订单，系统将返回错误 <code>51063</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
    ],
    "msg": ""
}
```

#### 返回参数

code = `0` 代表请求已被接受(不代表处理成功)

### GET / 借贷信息

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/loan-info`

> 请求示例

```
GET /api/v5/finance/flexible-loan/loan-info
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.loan_info()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将返回所有现存订单数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ordId": "12345",
            "collateralData": [
                {
                    "amt": "0.0000097",
                    "ccy": "COMP"
                },
                {
                    "amt": "0.78",
                    "ccy": "STX"
                },
                {
                    "amt": "0.001",
                    "ccy": "DOT"
                },
                {
                    "amt": "0.05357864",
                    "ccy": "LUNA"
                }
            ],
            "collateralNotionalUsd": "1.5078763",
            "curLTV": "0.5742",
            "liqLTV": "0.8374",
            "loanData": [
                {
                    "amt": "0.86590608",
                    "ccy": "USDC"
                }
            ],
            "loanNotionalUsd": "0.8661285",
            "marginCallLTV": "0.7374",
            "riskWarningData": {
                "instId": "",
                "liqPx": ""
            }
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单 ID</td></tr><tr><td>loanNotionalUsd</td><td>String</td><td>借币资产美金价值</td></tr><tr><td>loanData</td><td>Array of objects</td><td>借币数据</td></tr><tr><td>&gt; ccy</td><td>String</td><td>借贷币种</td></tr><tr><td>&gt; amt</td><td>String</td><td>借贷数量</td></tr><tr><td>collateralNotionalUsd</td><td>String</td><td>调整后的抵押物美金价值</td></tr><tr><td>collateralData</td><td>Array of objects</td><td>抵押资产数据</td></tr><tr><td>&gt; ccy</td><td>String</td><td>抵押币种</td></tr><tr><td>&gt; amt</td><td>String</td><td>抵押数量</td></tr><tr><td>riskWarningData</td><td>Object</td><td>风险预警信息</td></tr><tr><td>&gt; instId</td><td>String</td><td>清算交易产品，如 <code>BTC-USDT</code><br>仅当质押物和借币都只有一种时，该字段有效。其他情况返回""。</td></tr><tr><td>&gt; liqPx</td><td>String</td><td>清算价格<br>清算价格的单位为交易产品的计价币，如 <code>BTC-USDT</code>中的<code>USDT</code>。<br>仅当质押物和借币都只有一种时，该字段有效。其他情况返回""。</td></tr><tr><td>curLTV</td><td>String</td><td>当前质押率，如 <code>0.1</code>代表<code>10%</code><br>注：LTV(Loan-to-Value，贷款价值比)</td></tr><tr><td>marginCallLTV</td><td>String</td><td>预警质押率，如 <code>0.1</code>代表<code>10%</code><br>您的质押率达到预警质押率时，系统将会提示您当前质押率过高，即将触发强平。</td></tr><tr><td>liqLTV</td><td>String</td><td>强平质押率，如 <code>0.1</code>代表<code>10%</code><br>若您的借贷达到强平质押率并被强平，您将损失质押物及已完成的还款。</td></tr></tbody></table>

### GET / 借贷历史

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/loan-history`

> 请求示例

```
GET /api/v5/finance/flexible-loan/loan-history
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.loan_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">操作类型<br><code>borrowed</code>：借入<br><code>repaid</code>：还币<br><code>collateral_locked</code>：锁定质押物<br><code>collateral_released</code>：释放质押物<br><code>forced_repayment_buy</code>：自动换币买入<br><code>forced_repayment_sell</code>：自动换币卖出<br><code>forced_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>sell_collateral</code>：卖出质押资产<br><code>buy_transition_coin</code>：购买中介币种<br><code>sell_transition_coin</code>：卖出中介币种<br><code>buy_borrowed_coin</code>：购买借币币种</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之前（更旧的数据）的分页内容，传的值为对应接口的<code>refId</code>（不包含）</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之后（更新的数据）的分页内容，传的值为对应接口的<code>refId</code>（不包含）</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为<code>100</code>，默认<code>100</code>条</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将返回所有订单数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "-0.001",
            "ccy": "DOT",
            "refId": "17316594851045086",
            "ts": "1731659485000",
            "type": "collateral_locked"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>refId</td><td>String</td><td>对应记录ID</td></tr><tr><td>type</td><td>String</td><td>操作类型</td></tr><tr><td>ccy</td><td>String</td><td>币种，如 <code>BTC</code></td></tr><tr><td>amt</td><td>String</td><td>数量</td></tr><tr><td>ts</td><td>String</td><td>操作发生时间，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 计息记录

获取最近30天的计息记录。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/flexible-loan/interest-accrued`

> 请求示例

```
GET /api/v5/finance/flexible-loan/interest-accrued
```

```
from okx.Finance import FlexibleLoan

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

flexibleLoanAPI = FlexibleLoan.FlexibleLoanAPI(apikey, secretkey, passphrase, False, flag)
result = flexibleLoanAPI.interest_accrued()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">借贷币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之前（更旧的数据）的分页内容，传的值为对应接口的<code>refId</code>（不包含）</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之后（更新的数据）的分页内容，传的值为对应接口的<code>refId</code>（不包含）</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为<code>100</code>，默认<code>100</code>条</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">活期借币订单 ID。<br>如果不传 <code>ordId</code>，系统将返回所有订单数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDC",
            "interest": "0.00004054",
            "interestRate": "0.41",
            "loan": "0.86599309",
            "refId": "17319133035195744",
            "ts": "1731913200000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>refId</td><td>String</td><td>对应记录ID</td></tr><tr><td>ccy</td><td>String</td><td>币种，如 <code>BTC</code></td></tr><tr><td>loan</td><td>String</td><td>计息时负债</td></tr><tr><td>interest</td><td>String</td><td>利息</td></tr><tr><td>interestRate</td><td>String</td><td>年化利率，如 <code>0.01</code>代表<code>1%</code></td></tr><tr><td>ts</td><td>String</td><td>计息时间，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

## 双币赢

### GET / 获取币对

获取双币赢币对

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/sfp/dcd/currency-pair`

> 请求示例

```
GET /api/v5/finance/sfp/dcd/currency-pair
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "baseCcy": "BTC",
            "quoteCcy": "USDT",
            "optType": "C",
            "uly": "BTC-USD"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">基础币种</td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">报价币种</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型<br><code>C</code>：看涨<br><code>P</code>：看跌</td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的</td></tr></tbody></table>

### GET / 获取产品信息

获取双币赢产品列表

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/sfp/dcd/products`

> 请求示例

```
GET /api/v5/finance/sfp/dcd/products?baseCcy=BTC&quoteCcy=USDT&optType=C
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">基础币种</td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价币种</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">期权类型<br><code>C</code>：看涨<br><code>P</code>：看跌</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "absYield": "0.00232413",
            "annualizedYield": "0.0541",
            "baseCcy": "BTC",
            "quoteCcy": "USDT",
            "expTime": "1774598400000",
            "interestAccrualTime": "1773244800000",
            "listTime": "1743150759000",
            "maxSize": "6000000",
            "minSize": "10",
            "notionalCcy": "USDT",
            "optType": "P",
            "productId": "BTC-USDT-260327-54500-P",
            "quoteTime": "1773243808703",
            "redeemEndTime": "1774594800000",
            "redeemStartTime": "1773244800000",
            "stepSz": "1",
            "tradeEndTime": "1774584000000",
            "strike": "54500",
            "uly": "BTC-USD"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">absYield</td><td style="text-align: left">String</td><td style="text-align: left">绝对收益率</td></tr><tr><td style="text-align: left">annualizedYield</td><td style="text-align: left">String</td><td style="text-align: left">年化收益率</td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">基础币种</td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">报价币种</td></tr><tr><td style="text-align: left">notionalCcy</td><td style="text-align: left">String</td><td style="text-align: left">投资币种。若 <code>C</code>，则为 baseCcy；若 <code>P</code>，则为 quoteCcy。</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">到期时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">interestAccrualTime</td><td style="text-align: left">String</td><td style="text-align: left">利息开始计算时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">listTime</td><td style="text-align: left">String</td><td style="text-align: left">产品上架时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">minSize</td><td style="text-align: left">String</td><td style="text-align: left">最小交易规模（以投资币种计）</td></tr><tr><td style="text-align: left">maxSize</td><td style="text-align: left">String</td><td style="text-align: left">最大交易规模（以投资币种计）</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型<br><code>C</code>：看涨<br><code>P</code>：看跌</td></tr><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">quoteTime</td><td style="text-align: left">String</td><td style="text-align: left">产品报价时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">redeemStartTime</td><td style="text-align: left">String</td><td style="text-align: left">最早可申请提前赎回的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">redeemEndTime</td><td style="text-align: left">String</td><td style="text-align: left">最晚可申请提前赎回的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">stepSz</td><td style="text-align: left">String</td><td style="text-align: left">交易步长（以投资币种计）</td></tr><tr><td style="text-align: left">tradeEndTime</td><td style="text-align: left">String</td><td style="text-align: left">交易截止时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的</td></tr><tr><td style="text-align: left">strike</td><td style="text-align: left">String</td><td style="text-align: left">行权价</td></tr></tbody></table>

### POST / 获取报价

为双币赢产品请求实时报价。报价有有效期，须在到期前使用。

#### 限速：10次/60s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/sfp/dcd/quote`

> 请求示例

```
POST /api/v5/finance/sfp/dcd/quote
body
{
    "productId": "BTC-USDT-260327-77000-C",
    "notionalSz": "1.5",
    "notionalCcy": "BTC"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">notionalSz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资数量</td></tr><tr><td style="text-align: left">notionalCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资币种</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "absYield": "0.00135182",
            "annualizedYield": "69.65",
            "interestAccrualTime": "1773241200000",
            "notionalSz": "0.001",
            "notionalCcy": "BTC",
            "productId": "BTC-USDT-260312-72000-C",
            "quoteId": "qtbcDCD-QUOTE17732395560537636",
            "validUntil": "1774584000000",
            "idxPx": "69000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">absYield</td><td style="text-align: left">String</td><td style="text-align: left">绝对收益率</td></tr><tr><td style="text-align: left">annualizedYield</td><td style="text-align: left">String</td><td style="text-align: left">年化收益率</td></tr><tr><td style="text-align: left">interestAccrualTime</td><td style="text-align: left">String</td><td style="text-align: left">利息开始计算时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">notionalSz</td><td style="text-align: left">String</td><td style="text-align: left">投资数量</td></tr><tr><td style="text-align: left">notionalCcy</td><td style="text-align: left">String</td><td style="text-align: left">投资币种</td></tr><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">validUntil</td><td style="text-align: left">String</td><td style="text-align: left">报价有效期，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">idxPx</td><td style="text-align: left">String</td><td style="text-align: left">指数价格</td></tr></tbody></table>

### POST / 下单

使用有效报价下单双币赢。

#### 限速：2次/60s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/sfp/dcd/trade`

> 请求示例

```
POST /api/v5/finance/sfp/dcd/trade
body
{
    "quoteId": "quoterbpDCD-QUOTE17732116652401234"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "quoteId": "quoterbpDCD-QUOTE17732116652401234",
            "ordId": "987654321",
            "state": "live"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>initial</code>：系统已接收请求，待处理<br><code>pending_book</code>：流动性提供商已接收请求，待处理<br><code>live</code>：交易已生效<br><code>rejected</code>：交易已拒绝</td></tr></tbody></table>

### POST / 获取赎回报价

为生效中的双币赢订单申请提前赎回报价。这是两步赎回流程的第一步，之后需调用 POST / 赎回 确认。

#### 限速：10次/60s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/sfp/dcd/redeem-quote`

> 请求示例

```
POST /api/v5/finance/sfp/dcd/redeem-quote
body
{
    "ordId": "987654321"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "987654321",
            "quoteId": "quoterbcDCD-REDEEM17732116652401234",
            "redeemCcy": "BTC",
            "redeemSz": "1.4856",
            "termRate": "-0.50",
            "validUntil": "1774598400000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">redeemSz</td><td style="text-align: left">String</td><td style="text-align: left">赎回数量</td></tr><tr><td style="text-align: left">redeemCcy</td><td style="text-align: left">String</td><td style="text-align: left">赎回币种</td></tr><tr><td style="text-align: left">termRate</td><td style="text-align: left">String</td><td style="text-align: left">期限利率</td></tr><tr><td style="text-align: left">validUntil</td><td style="text-align: left">String</td><td style="text-align: left">赎回报价有效期，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### POST / 赎回

使用有效的赎回报价确认提前赎回。这是两步赎回流程的第二步。

#### 限速：2次/60s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/finance/sfp/dcd/redeem`

> 请求示例

```
POST /api/v5/finance/sfp/dcd/redeem
body
{
    "ordId": "987654321",
    "quoteId": "quoterbcDCD-REDEEM17732116652401234"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "987654321",
            "state": "pending_redeem_booking"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>pending_redeem_booking</code>：赎回请求已接收，等待流动性提供商确认<br><code>pending_redeem</code>：流动性提供商已确认，等待资金划转<br><code>redeeming</code>：赎回处理中<br><code>redeemed</code>：赎回完成</td></tr></tbody></table>

### GET / 获取订单状态

返回双币赢订单的当前状态。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/sfp/dcd/order-status`

> 请求示例

```
GET /api/v5/finance/sfp/dcd/order-status?ordId=987654321
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "987654321",
            "state": "live"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>initial</code><br><code>live</code><br><code>pending_settle</code><br><code>settled</code><br><code>pending_redeem</code><br><code>redeemed</code><br><code>rejected</code></td></tr></tbody></table>

### GET / 获取历史订单

返回双币赢历史订单列表

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/finance/sfp/dcd/order-history`

> 请求示例

```
GET /api/v5/finance/sfp/dcd/order-history
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单ID。传入时直接返回该订单（忽略其他筛选条件）</td></tr><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-260327-77000-C</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">标的指数，如 <code>BTC-USD</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单状态筛选<br><code>initial</code><br><code>live</code><br><code>pending_settle</code><br><code>settled</code><br><code>pending_redeem</code><br><code>redeemed</code><br><code>rejected</code></td></tr><tr><td style="text-align: left">beginId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回比该订单ID更新的记录</td></tr><tr><td style="text-align: left">endId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回比该订单ID更早的记录</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间戳筛选，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间戳筛选，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每次请求返回的结果数量，最大100</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "ordId": "987654321",
            "quoteId": "quoterbpDCD-QUOTE17732116652401234",
            "state": "settled",
            "productId": "BTC-USDT-260327-77000-C",
            "baseCcy": "BTC",
            "quoteCcy": "USDT",
            "uly": "BTC-USD",
            "strike": "77000",
            "notionalSz": "1.5",
            "notionalCcy": "BTC",
            "absYield": "0.00806038",
            "annualizedYield": "0.1834",
            "yieldSz": "0.01209057",
            "yieldCcy": "BTC",
            "settleSz": "1.51209057",
            "settleCcy": "BTC",
            "settlePx": "76500",
            "settleTime": "1774598400000",
            "expTime": "1774598400000",
            "redeemStartTime" : "1774598400000",
            "redeemEndime": "1774598400000",
            "cTime": "1773212400000",
            "uTime": "1773212400000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>initial</code><br><code>live</code><br><code>pending_settle</code><br><code>settled</code><br><code>pending_redeem</code><br><code>redeemed</code><br><code>rejected</code></td></tr><tr><td style="text-align: left">productId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-260327-77000-C</code></td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">基础币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数，如 <code>BTC-USD</code></td></tr><tr><td style="text-align: left">strike</td><td style="text-align: left">String</td><td style="text-align: left">行权价</td></tr><tr><td style="text-align: left">notionalSz</td><td style="text-align: left">String</td><td style="text-align: left">投资数量</td></tr><tr><td style="text-align: left">notionalCcy</td><td style="text-align: left">String</td><td style="text-align: left">投资币种</td></tr><tr><td style="text-align: left">absYield</td><td style="text-align: left">String</td><td style="text-align: left">绝对收益率</td></tr><tr><td style="text-align: left">annualizedYield</td><td style="text-align: left">String</td><td style="text-align: left">年化收益率</td></tr><tr><td style="text-align: left">yieldSz</td><td style="text-align: left">String</td><td style="text-align: left">收益金额</td></tr><tr><td style="text-align: left">yieldCcy</td><td style="text-align: left">String</td><td style="text-align: left">收益币种</td></tr><tr><td style="text-align: left">settleSz</td><td style="text-align: left">String</td><td style="text-align: left">结算金额（未结算时为""）</td></tr><tr><td style="text-align: left">settleCcy</td><td style="text-align: left">String</td><td style="text-align: left">结算币种（未结算时为""）</td></tr><tr><td style="text-align: left">settlePx</td><td style="text-align: left">String</td><td style="text-align: left">结算价格（未结算时为""）</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">产品到期时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">settleTime</td><td style="text-align: left">String</td><td style="text-align: left">实际结算时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>（未结算时为""）</td></tr><tr><td style="text-align: left">redeemStartTime</td><td style="text-align: left">String</td><td style="text-align: left">最早可申请提前赎回的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">redeemEndTime</td><td style="text-align: left">String</td><td style="text-align: left">最晚可申请提前赎回的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">最后更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>
