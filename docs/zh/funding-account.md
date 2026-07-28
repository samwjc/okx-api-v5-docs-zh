---
title: 资金账户
outline: deep
---

`资金`功能模块下的API接口需要身份验证。

## REST API

### 获取币种列表

获取当前用户KYC实体支持的币种列表。

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/currencies`

> 请求示例

```
GET /api/v5/asset/currencies
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取币种列表
result = fundingAPI.get_currencies()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询，币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
        "burningFeeRate": "",
        "canDep": true,
        "canInternal": true,
        "canWd": true,
        "ccy": "BTC",
        "chain": "BTC-Bitcoin",
        "ctAddr": "",
        "depEstOpenTime": "",
        "depQuotaFixed": "",
        "depQuoteDailyLayer2": "",
        "fee": "0.00005",
        "logoLink": "https://static.coinall.ltd/cdn/oksupport/asset/currency/icon/btc20230419112752.png",
        "mainNet": true,
        "maxFee": "0.00005",
        "maxFeeForCtAddr": "",
        "maxWd": "500",
        "minDep": "0.0005",
        "minDepArrivalConfirm": "1",
        "minFee": "0.00005",
        "minFeeForCtAddr": "",
        "minInternal": "0.0001",
        "minWd": "0.0005",
        "minWdUnlockConfirm": "2",
        "name": "Bitcoin",
        "needTag": false,
        "usedDepQuotaFixed": "",
        "usedWdQuota": "0",
        "wdEstOpenTime": "",
        "wdQuota": "10000000",
        "wdTickSz": "8"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>name</td><td>String</td><td>币种名称，不显示则无对应名称</td></tr><tr><td>logoLink</td><td>String</td><td>币种Logo链接</td></tr><tr><td>chain</td><td>String</td><td>币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td>ctAddr</td><td>String</td><td>合约地址</td></tr><tr><td>canDep</td><td>Boolean</td><td>当前是否可充值<br><code>false</code>：不可链上充值<br><code>true</code>：可以链上充值</td></tr><tr><td>canWd</td><td>Boolean</td><td>当前是否可提币<br><code>false</code>：不可链上提币<br><code>true</code>：可以链上提币</td></tr><tr><td>canInternal</td><td>Boolean</td><td>当前是否可内部转账<br><code>false</code>：不可内部转账<br><code>true</code>：可以内部转账</td></tr><tr><td>depEstOpenTime</td><td>String</td><td>充值预期开放时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>如果 <code>canDep</code> 为 <code>true</code>，则返回 <code>""</code></td></tr><tr><td>wdEstOpenTime</td><td>String</td><td>提币预期开放时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>如果 <code>canWd</code> 为 <code>true</code>，则返回 <code>""</code></td></tr><tr><td>minDep</td><td>String</td><td>币种单笔最小充值量</td></tr><tr><td>minWd</td><td>String</td><td>币种单笔最小<code>链上提币</code>量</td></tr><tr><td>minInternal</td><td>String</td><td>币种单笔最小<code>内部转账</code>量<br>无单笔最大<code>内部转账</code>量限制，受24小时内提币额度(<code>wdQuota</code>)限制</td></tr><tr><td>maxWd</td><td>String</td><td>币种单笔最大<code>链上提币</code>量</td></tr><tr><td>wdTickSz</td><td>String</td><td>提币精度,表示小数点后的位数。提币手续费精度与提币精度保持一致。<br>内部转账提币精度为小数点后8位。</td></tr><tr><td>wdQuota</td><td>String</td><td>过去24小时内提币额度（包含<code>链上提币</code>和<code>内部转账</code>），单位为<code>USD</code></td></tr><tr><td>usedWdQuota</td><td>String</td><td>过去24小时内已用提币额度，单位为<code>USD</code></td></tr><tr><td>fee</td><td>String</td><td>固定的提币手续费数量<br>适用于<code>链上提币</code></td></tr><tr><td>minFee</td><td>String</td><td><del>普通地址最小提币手续费数量<br>适用于<code>链上提币</code></del><br>该字段已废弃</td></tr><tr><td>maxFee</td><td>String</td><td><del>普通地址最大提币手续费数量<br>适用于<code>链上提币</code></del><br>该字段已废弃</td></tr><tr><td>minFeeForCtAddr</td><td>String</td><td><del>合约地址最小提币手续费数量<br>适用于<code>链上提币</code></del><br>该字段已废弃</td></tr><tr><td>maxFeeForCtAddr</td><td>String</td><td><del>合约地址最大提币手续费数量<br>适用于<code>链上提币</code></del><br>该字段已废弃</td></tr><tr><td>burningFeeRate</td><td>String</td><td>燃烧费率，如 <code>0.05</code> 代表 <code>5%</code>。<br>部分币种会收取燃烧费用。燃烧费用按照提币数量（不含gas fee） 乘以 燃烧费率，在提币数量基础上扣除。<br>适用于<code>链上提币</code></td></tr><tr><td>mainNet</td><td>Boolean</td><td>当前链是否为主链</td></tr><tr><td>needTag</td><td>Boolean</td><td>当前链提币是否需要标签（tag/memo）信息，如 <code>EOS</code>该字段为<code>true</code></td></tr><tr><td>minDepArrivalConfirm</td><td>String</td><td>充值到账最小网络确认数。币已到账但不可提。</td></tr><tr><td>minWdUnlockConfirm</td><td>String</td><td>提现解锁最小网络确认数</td></tr><tr><td>depQuotaFixed</td><td>String</td><td>充币固定限额，单位为<code>USD</code><br>没有充币限制则返回""</td></tr><tr><td>usedDepQuotaFixed</td><td>String</td><td>已用充币固定额度，单位为<code>USD</code><br>没有充币限制则返回""</td></tr><tr><td>depQuoteDailyLayer2</td><td>String</td><td>Layer2网络每日充值上限</td></tr></tbody></table>

### 获取资金账户余额

获取资金账户所有资产列表，查询各币种的余额、冻结和可用等信息。

::: tip
只返回余额大于0的币资产信息。
:::

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/balances`

> 请求示例

```
GET /api/v5/asset/balances
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取资金账户余额
result = fundingAPI.get_balances()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
            "availBal": "37.11827078",
            "bal": "37.11827078",
            "ccy": "ETH",
            "frozenBal": "0"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">余额</td></tr><tr><td style="text-align: left">frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">冻结余额</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用余额</td></tr></tbody></table>

### 获取不可交易资产

获取当前用户 KYC 实体支持的不可交易资产列表。

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/non-tradable-assets`

> 请求示例

```
GET /api/v5/asset/non-tradable-assets
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

result = fundingAPI.get_non_tradable_assets()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "bal": "989.84719571",
            "burningFeeRate": "",
            "canWd": true,
            "ccy": "CELT",
            "chain": "CELT-OKTC",
            "ctAddr": "f403fb",
            "fee": "2",
            "feeCcy": "USDT",
            "logoLink": "https://static.coinall.ltd/cdn/assets/imgs/221/460DA8A592400393.png",
            "minWd": "0.1",
            "name": "",
            "needTag": false,
            "wdAll": false,
            "wdTickSz": "8"
        },
        {
            "bal": "0.001",
            "burningFeeRate": "",
            "canWd": true,
            "ccy": "MEME",
            "chain": "MEME-ERC20",
            "ctAddr": "09b760",
            "fee": "5",
            "feeCcy": "USDT",
            "logoLink": "https://static.coinall.ltd/cdn/assets/imgs/207/2E664E470103C613.png",
            "minWd": "0.001",
            "name": "MEME Inu",
            "needTag": false,
            "wdAll": false,
            "wdTickSz": "8"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>CELT</code></td></tr><tr><td>name</td><td>String</td><td>币种中文名称，不显示则无对应名称</td></tr><tr><td>logoLink</td><td>String</td><td>币种Logo链接</td></tr><tr><td>bal</td><td>String</td><td>可提余额</td></tr><tr><td>canWd</td><td>Boolean</td><td>是否可提<br><code>false</code>: 不可提 <code>true</code>: 可提</td></tr><tr><td>chain</td><td>String</td><td>支持提币的链</td></tr><tr><td>minWd</td><td>String</td><td>币种单笔最小提币量</td></tr><tr><td>wdAll</td><td>Boolean</td><td>该币种资产是否必须一次性全部提取</td></tr><tr><td>fee</td><td>String</td><td>提币固定手续费。提币手续费精度为小数点后8位。</td></tr><tr><td>feeCcy</td><td>String</td><td>提币固定手续费单位</td></tr><tr><td>burningFeeRate</td><td>String</td><td>燃烧费率，如 <code>0.05</code> 代表 <code>5%</code>。<br>部分币种会收取燃烧费用。燃烧费用按照提币数量（不含gas fee） 乘以 燃烧费率，在提币数量基础上扣除。</td></tr><tr><td>ctAddr</td><td>String</td><td>合约地址后6位</td></tr><tr><td>wdTickSz</td><td>String</td><td>提币精度,表示小数点后的位数</td></tr><tr><td>needTag</td><td>Boolean</td><td>提币的链是否需要标签（tag/memo）信息</td></tr></tbody></table>

### 获取账户资产估值

查看账户资产估值

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/asset-valuation`

> 请求示例

```
GET /api/v5/asset/asset-valuation
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取账户资产估值
result = fundingAPI.get_asset_valuation()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">资产估值对应的单位<br>BTC 、USDT<br>USD 、CNY 、JPY、KRW、RUB、EUR<br>VND 、IDR 、INR、PHP、THB、TRY<br>AUD 、SGD 、ARS、SAR、AED、IQD<br>默认为<code>BTC</code>为单位的估值</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": {
                "classic": "124.6",
                "earn": "1122.73",
                "funding": "0.09",
                "trading": "2544.28"
            },
            "totalBal": "3790.09",
            "ts": "1637566660769"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">totalBal</td><td style="text-align: left">String</td><td style="text-align: left">账户总资产估值</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Object</td><td style="text-align: left">各个账户的资产估值</td></tr><tr><td style="text-align: left">&gt; funding</td><td style="text-align: left">String</td><td style="text-align: left">资金账户</td></tr><tr><td style="text-align: left">&gt; trading</td><td style="text-align: left">String</td><td style="text-align: left">交易账户</td></tr><tr><td style="text-align: left">&gt; classic</td><td style="text-align: left">String</td><td style="text-align: left">经典账户 (已废弃)</td></tr><tr><td style="text-align: left">&gt; earn</td><td style="text-align: left">String</td><td style="text-align: left">金融账户</td></tr></tbody></table>

### 资金划转

调用时，API Key 需要有交易权限。

支持母账户的资金账户划转到交易账户，母账户到子账户的资金账户和交易账户划转。

子账户默认可转出至母账户，划转到同一母账户下的其他子账户，需要先调用 [设置子账户主动转出权限](/zh/sub-account-rest-api-set-permission-of-transfer-out) 接口进行授权。

::: tip
请求的成功或失败不一定反映实际的划转结果，建议通过调用"获取资金划转状态"接口来确认最终结果。
:::

#### 限速：2 次/s

#### 限速规则：User ID + Currency

#### HTTP 请求

`POST /api/v5/asset/transfer`

> 请求示例

```
# 母账户USDT从资金账户划转1.5USDT到交易账户
POST /api/v5/asset/transfer
body 
{
    "ccy":"USDT",
    "amt":"1.5",
    "from":"6",
    "to":"18"
}

# 母账户从资金账户划转1.5USDT到子账户的资金账户
POST /api/v5/asset/transfer
body 
{
    "ccy":"USDT",
    "type":"1",
    "amt":"1.5",
    "from":"6",
    "to":"6",
    "subAcct":"mini"
}

# 子账户从资金账户划转1.5USDT到另一子账户的资金账户
POST /api/v5/asset/transfer
body 
{
    "ccy":"USDT",
    "type":"4",
    "amt":"1.5",
    "from":"6",
    "to":"6",
    "subAcct":"mini"
}
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 资金划转
result = fundingAPI.funds_transfer(
    ccy="USDT",
    amt="1.5",
    from_="6",
    to="18"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">划转类型<br><code>0</code>：账户内划转<br><code>1</code>：母账户转子账户(仅适用于母账户APIKey)<br><code>2</code>：子账户转母账户(仅适用于母账户APIKey)<br><code>3</code>：子账户转母账户(仅适用于子账户APIKey)<br><code>4</code>：子账户转子账户(仅适用于子账户APIKey，且目标账户需要是同一母账户下的其他子账户。子账户主动转出权限默认是关闭的，权限调整参考 <a href="zh.html#sub-account-rest-api-set-permission-of-transfer-out">设置子账户主动转出权限</a>。)<br>默认是<code>0</code><br>如果您希望通过母账户API Key控制子账户之间的划转，参考接口 <a href="zh.html#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts">子账户间资金划转</a></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">划转币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">划转数量</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转出账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转入账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">子账户名称<br>当<code>type</code>为<code>1</code>/<code>2</code>/<code>4</code>时，该字段必填</td></tr><tr><td style="text-align: left">loanTrans</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否支持<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>下的借币转出<br><code>true</code>：支持借币转出<br><code>false</code>：不支持借币转出<br>默认为<code>false</code></td></tr><tr><td style="text-align: left">omitPosRisk</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否忽略仓位风险<br>默认为<code>false</code><br>仅适用于<code>组合保证金模式</code></td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "transId": "754147",
      "ccy": "USDT",
      "clientId": "",
      "from": "6",
      "amt": "0.1",
      "to": "18"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">transId</td><td style="text-align: left">String</td><td style="text-align: left">划转 ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">划转币种</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">转出账户</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">划转量</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">转入账户</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义ID</td></tr></tbody></table>

### 获取资金划转状态

获取最近2个星期内的资金划转状态数据

#### 限速：10 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/transfer-state`

> 请求示例

```
GET /api/v5/asset/transfer-state?transId=1&type=1
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取资金划转状态
result = fundingAPI.transfer_state(
    transId="248424899",
    type="0"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">transId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">划转ID<br>transId和clientId必须传一个，若传两个，以transId为主</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">客户自定义ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">划转类型<br><code>0</code>：账户内划转<br><code>1</code>：母账户转子账户(仅适用于母账户APIKey)<br><code>2</code>：子账户转母账户(仅适用于母账户APIKey)<br><code>3</code>：子账户转母账户(仅适用于子账户APIKey)<br><code>4</code>：子账户转子账户(仅适用于子账户APIKey，且目标账户需要是同一母账户下的其他子账户)<br>默认是<code>0</code><br>对于Custody账户该参数可以不传或者传0。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "amt": "1.5",
            "ccy": "USDT",
            "clientId": "",
            "from": "18",
            "instId": "", //已废弃
            "state": "success",
            "subAcct": "test",
            "to": "6",
            "toInstId": "", //已废弃
            "transId": "1",
            "type": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">transId</td><td style="text-align: left">String</td><td style="text-align: left">划转 ID</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义 ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">划转币种</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">划转量</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">划转类型<br><code>0</code>：账户内划转<br><code>1</code>：母账户转子账户(仅适用于母账户APIKey)<br><code>2</code>：子账户转母账户(仅适用于母账户APIKey)<br><code>3</code>：子账户转母账户(仅适用于子账户APIKey)<br><code>4</code>：子账户转子账户(仅适用于子账户APIKey，且目标账户需要是同一母账户下的其他子账户)</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">转出账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">转入账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">已废弃</td></tr><tr><td style="text-align: left">toInstId</td><td style="text-align: left">String</td><td style="text-align: left">已废弃</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">转账状态<br><code>success</code>：成功<br><code>pending</code>：处理中<br><code>failed</code>：失败</td></tr></tbody></table>

### 获取资金流水

查询最近一个月内资金账户账单流水

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/bills`

> 请求示例

```
GET /api/v5/asset/bills

GET /api/v5/asset/bills?type=1
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取资金流水
result = fundingAPI.get_bills()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型<br><code>1</code>：充值<br><code>2</code>：提现<br><code>13</code>：撤销提现<br><code>20</code>：转出至子账户（主体是母账户）<br><code>21</code>：从子账户转入（主体是母账户）<br><code>22</code>：转出到母账户（主体是子账户）<br><code>23</code>：母账户转入（主体是子账户）<br><code>28</code>：领取<br><code>47</code>：系统冲正<br><code>48</code>：活动得到<br><code>49</code>：活动送出<br><code>68</code>：手续费返佣(通过返佣卡)<br><code>72</code>：收币<br><code>73</code>：送币<br><code>74</code>：送币退还<br><code>75</code>：[活期简单赚币] 申购<br><code>76</code>：[活期简单赚币] 赎回<br><code>77</code>：[Jumpstart] 派发<br><code>78</code>：[Jumpstart] 锁定<br><code>80</code>：[DEFI/锁仓挖矿] 产品申购<br><code>82</code>：[DEFI/锁仓挖矿] 产品赎回<br><code>83</code>：挖矿收益<br><code>84</code>：违约金<br><code>89</code>：存币收益<br><code>116</code>：法币创建订单<br><code>117</code>：法币完成订单<br><code>118</code>：法币取消订单<br><code>124</code>：[Jumpstart] 解锁<br><code>130</code>：从交易账户转入<br><code>131</code>：转出至交易账户<br><code>132</code>：[P2P] 客服冻结<br><code>133</code>：[P2P] 客服解冻<br><code>134</code>：[P2P] 客服转交<br><code>135</code>：跨链兑换<br><code>137</code>：[ETH质押] 申购<br><code>138</code>：[ETH质押] 兑换<br><code>139</code>：[ETH质押] 收益<br><code>146</code>：客户回馈<br><code>150</code>：节点返佣<br><code>151</code>：邀请奖励<br><code>152</code>：经纪商返佣<br><code>160</code>：双币赢申购<br><code>161</code>：双币赢回款<br><code>162</code>：双币赢收益<br><code>163</code>：双币赢退款<br><code>172</code>：[节点计划] 助力人返佣<br><code>173</code>：[节点计划] 手续费返现<br><code>174</code>：Jumpstart支付<br><code>175</code>：锁定质押物<br><code>176</code>：借款转入<br><code>177</code>：添加质押物<br><code>178</code>：减少质押物<br><code>179</code>：还款<br><code>180</code>：释放质押物<br><code>181</code>：偿还空投糖果<br><code>185</code>：[经纪商] 闪兑返佣<br><code>187</code>：[经纪商] 闪兑划转<br><code>189</code>：盲盒奖励<br><code>195</code>：不可交易资产提币<br><code>196</code>：不可交易资产提币撤销<br><code>197</code>：不可交易资产充值<br><code>198</code>：不可交易资产减少<br><code>199</code>：不可交易资产增加<br><code>200</code>：买入<br><code>202</code>：价格锁定申购<br><code>203</code>：价格锁定回款<br><code>204</code>：价格锁定收益<br><code>205</code>：价格锁定退款<br><code>207</code>：双币赢精简版申购<br><code>208</code>：双币赢精简版回款<br><code>209</code>：双币赢精简版收益<br><code>210</code>：双币赢精简版退款<br><code>212</code>：[活期借币] 多币种借贷锁定质押物<br><code>215</code>：[活期借币] 多币种借贷释放质押物<br><code>217</code>：[活期借币] 多币种借贷借款转入<br><code>218</code>：[活期借币] 多币种借贷还款<br><code>232</code>：[活期借币] 利息补贴转出<br><code>220</code>：已下架数字货币<br><code>221</code>：提币手续费支出<br><code>222</code>：提币手续费退款<br><code>223</code>：合约带单分润<br><code>225</code>：鲨鱼鳍申购<br><code>226</code>：鲨鱼鳍回款<br><code>227</code>：鲨鱼鳍收益<br><code>228</code>：鲨鱼鳍退款<br><code>229</code>：空投发放<br><code>232</code>：利息补贴入账<br><code>233</code>：经纪商佣金补偿<br><code>240</code>：雪球申購<br><code>241</code>：雪球回款<br><code>242</code>：雪球收益<br><code>243</code>：雪球交易失败<br><code>249</code>：海鸥申购<br><code>250</code>：海鸥回款<br><code>251</code>：海鸥收益<br><code>252</code>：海鸥退款<br><code>263</code>：策略分润<br><code>265</code>：信号收入<br><code>266</code>：现货带单分润<br><code>270</code>：DCD经纪商划转<br><code>271</code>：DCD经纪商返佣<br><code>272</code>：[闪兑] 买入数字货币/法币<br><code>273</code>：[闪兑] 卖出数字货币/法币<br><code>284</code>：[Custody] 转出交易子账户<br><code>285</code>：[Custody] 转入交易子账户<br><code>286</code>：[Custody] 转出托管资金账户<br><code>287</code>：[Custody] 转入托管资金账户<br><code>288</code>：[Custody] 托管资金入金<br><code>289</code>：[Custody] 托管资金出金<br><code>299</code>：推荐节点返佣<br><code>300</code>：手续费折扣返现<br><code>303</code>：雪球做市商转账<br><del><code>304</code>：[定期简单赚币] 订单提交</del><br><del><code>305</code>：[定期简单赚币] 订单赎回</del><br><del><code>306</code>：[定期简单赚币] 本金发放</del><br><del><code>307</code>：[定期简单赚币] 收益发放 (提前终止订单补偿)</del><br><del><code>308</code>：[定期简单赚币] 收益发放</del><br><del><code>309</code>：[定期简单赚币] 补偿收益发放 (订单延期补偿)</del><br><code>311</code>：系统转入小额资产<br><code>313</code>：发送礼物<br><code>314</code>：收到礼物<br><code>315</code>：礼物退回<br><code>328</code>：[SOL质押] 流动性质押收益<br><code>329</code>：[SOL质押] 流动性质押申购<br><code>330</code>：[SOL质押] 流动性质押铸币<br><code>331</code>：[SOL质押] 流动性质押赎回<br><code>332</code>：[SOL质押] 流动性质押结算<br><code>333</code>：体验金收益<br><code>339</code>：[定期简单赚币] 订单提交<br><code>340</code>：[定期简单赚币] 订单失败退款<br><code>341</code>：[定期简单赚币] 订单赎回<br><code>342</code>：[定期简单赚币] 本金发放<br><code>343</code>：[定期简单赚币] 收益发放<br><code>344</code>：[定期简单赚币] 补偿收益发放<br><code>345</code>：[机构借贷] 本金还款<br><code>346</code>：[机构借贷] 利息还款<br><code>347</code>：[机构借贷] 逾期罚款<br><code>348</code>：[BTC质押] 申购<br><code>349</code>：[BTC质押] 赎回<br><code>350</code>：[BTC质押] 收益<br><code>351</code>：[机构借贷] 发放贷款<br><code>354</code>：策略奖励发放<br><code>361</code>：已关闭的子账户余额转入<br><code>372</code>：资产锁定<br><code>373</code>：解除资产锁定<br><code>400</code>：自动借币利息<br><code>408</code>：自动赚币（USDG赚币）利息<br><code>476</code>：云交易所转出<br><code>477</code>：云交易所转入<br><code>509</code>：[OKUSD] 申购<br><code>511</code>：[OKUSD] 赎回<br><code>516</code>：[OKUSD] 收益</td></tr><tr><td style="text-align: left">thirdPartyType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">第三方托管类型。不填则默认为 <code>1</code>（向后兼容）。<br><code>1</code>：Copper<br><code>2</code>：Komainu<br><code>5</code>：SCB<br>当母账户绑定多家托管商时，使用此参数可筛选指定托管商的账单。适用于账单类型 <code>284</code>–<code>289</code>。</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">转账或提币的客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为 100，不填默认返回 100 条</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "billId": "12344",
      "ccy": "BTC",
      "clientId": "",
      "balChg": "2",
      "bal": "12",
      "type": "1",
      "ts": "1597026383085",
      "notes": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单 ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">账户余额币种</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">转账或提币的客户自定义ID</td></tr><tr><td style="text-align: left">balChg</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额变动数量</td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额数量</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">notes</td><td style="text-align: left">String</td><td style="text-align: left">备注</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">账单创建时间，Unix 时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取资金流水全历史

查询资金账户的所有历史账单流水记录，可追溯至2021年2月1日。

::: tip
⚠️ **重要提示**：数据每30秒更新一次。更新频率可能因数据量而异 - 请注意在高流量期间可能出现延迟。
:::

#### 限速：1 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/bills-history`

> 请求示例

```
GET /api/v5/asset/bills-history

GET /api/v5/asset/bills-history?type=1
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取资金流水
result = fundingAPI.get_bills_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">账单类型<br><code>1</code>：充值<br><code>2</code>：提现<br><code>13</code>：撤销提现<br><code>20</code>：转出至子账户（主体是母账户）<br><code>21</code>：从子账户转入（主体是母账户）<br><code>22</code>：转出到母账户（主体是子账户）<br><code>23</code>：母账户转入（主体是子账户）<br><code>28</code>：领取<br><code>47</code>：系统冲正<br><code>48</code>：活动得到<br><code>49</code>：活动送出<br><code>68</code>：手续费返佣(通过返佣卡)<br><code>72</code>：收币<br><code>73</code>：送币<br><code>74</code>：送币退还<br><code>75</code>：[活期简单赚币] 申购<br><code>76</code>：[活期简单赚币] 赎回<br><code>77</code>：[Jumpstart] 派发<br><code>78</code>：[Jumpstart] 锁定<br><code>80</code>：[DEFI/锁仓挖矿] 产品申购<br><code>82</code>：[DEFI/锁仓挖矿] 产品赎回<br><code>83</code>：挖矿收益<br><code>84</code>：违约金<br><code>89</code>：存币收益<br><code>116</code>：法币创建订单<br><code>117</code>：法币完成订单<br><code>118</code>：法币取消订单<br><code>124</code>：[Jumpstart] 解锁<br><code>130</code>：从交易账户转入<br><code>131</code>：转出至交易账户<br><code>132</code>：[P2P] 客服冻结<br><code>133</code>：[P2P] 客服解冻<br><code>134</code>：[P2P] 客服转交<br><code>135</code>：跨链兑换<br><code>137</code>：[ETH质押] 申购<br><code>138</code>：[ETH质押] 兑换<br><code>139</code>：[ETH质押] 收益<br><code>146</code>：客户回馈<br><code>150</code>：节点返佣<br><code>151</code>：邀请奖励<br><code>152</code>：经纪商返佣<br><code>160</code>：双币赢申购<br><code>161</code>：双币赢回款<br><code>162</code>：双币赢收益<br><code>163</code>：双币赢退款<br><code>172</code>：[节点计划] 助力人返佣<br><code>173</code>：[节点计划] 手续费返现<br><code>174</code>：Jumpstart支付<br><code>175</code>：锁定质押物<br><code>176</code>：借款转入<br><code>177</code>：添加质押物<br><code>178</code>：减少质押物<br><code>179</code>：还款<br><code>180</code>：释放质押物<br><code>181</code>：偿还空投糖果<br><code>185</code>：[经纪商] 闪兑返佣<br><code>187</code>：[经纪商] 闪兑划转<br><code>189</code>：盲盒奖励<br><code>195</code>：不可交易资产提币<br><code>196</code>：不可交易资产提币撤销<br><code>197</code>：不可交易资产充值<br><code>198</code>：不可交易资产减少<br><code>199</code>：不可交易资产增加<br><code>200</code>：买入<br><code>202</code>：价格锁定申购<br><code>203</code>：价格锁定回款<br><code>204</code>：价格锁定收益<br><code>205</code>：价格锁定退款<br><code>207</code>：双币赢精简版申购<br><code>208</code>：双币赢精简版回款<br><code>209</code>：双币赢精简版收益<br><code>210</code>：双币赢精简版退款<br><code>212</code>：[活期借币] 多币种借贷锁定质押物<br><code>215</code>：[活期借币] 多币种借贷释放质押物<br><code>217</code>：[活期借币] 多币种借贷借款转入<br><code>218</code>：[活期借币] 多币种借贷还款<br><code>232</code>：[活期借币] 利息补贴转出<br><code>220</code>：已下架数字货币<br><code>221</code>：提币手续费支出<br><code>222</code>：提币手续费退款<br><code>223</code>：合约带单分润<br><code>225</code>：鲨鱼鳍申购<br><code>226</code>：鲨鱼鳍回款<br><code>227</code>：鲨鱼鳍收益<br><code>228</code>：鲨鱼鳍退款<br><code>229</code>：空投发放<br><code>232</code>：利息补贴入账<br><code>233</code>：经纪商佣金补偿<br><code>240</code>：雪球申購<br><code>241</code>：雪球回款<br><code>242</code>：雪球收益<br><code>243</code>：雪球交易失败<br><code>249</code>：海鸥申购<br><code>250</code>：海鸥回款<br><code>251</code>：海鸥收益<br><code>252</code>：海鸥退款<br><code>263</code>：策略分润<br><code>265</code>：信号收入<br><code>266</code>：现货带单分润<br><code>270</code>：DCD经纪商划转<br><code>271</code>：DCD经纪商返佣<br><code>272</code>：[闪兑] 买入数字货币/法币<br><code>273</code>：[闪兑] 卖出数字货币/法币<br><code>284</code>：[Custody] 转出交易子账户<br><code>285</code>：[Custody] 转入交易子账户<br><code>286</code>：[Custody] 转出托管资金账户<br><code>287</code>：[Custody] 转入托管资金账户<br><code>288</code>：[Custody] 托管资金入金<br><code>289</code>：[Custody] 托管资金出金<br><code>299</code>：推荐节点返佣<br><code>300</code>：手续费折扣返现<br><code>303</code>：雪球做市商转账<br><del><code>304</code>：[定期简单赚币] 订单提交</del><br><del><code>305</code>：[定期简单赚币] 订单赎回</del><br><del><code>306</code>：[定期简单赚币] 本金发放</del><br><del><code>307</code>：[定期简单赚币] 收益发放 (提前终止订单补偿)</del><br><del><code>308</code>：[定期简单赚币] 收益发放</del><br><del><code>309</code>：[定期简单赚币] 补偿收益发放 (订单延期补偿)</del><br><code>311</code>：系统转入小额资产<br><code>313</code>：发送礼物<br><code>314</code>：收到礼物<br><code>315</code>：礼物退回<br><code>328</code>：[SOL质押] 流动性质押收益<br><code>329</code>：[SOL质押] 流动性质押申购<br><code>330</code>：[SOL质押] 流动性质押铸币<br><code>331</code>：[SOL质押] 流动性质押赎回<br><code>332</code>：[SOL质押] 流动性质押结算<br><code>333</code>：体验金收益<br><code>339</code>：[定期简单赚币] 订单提交<br><code>340</code>：[定期简单赚币] 订单失败退款<br><code>341</code>：[定期简单赚币] 订单赎回<br><code>342</code>：[定期简单赚币] 本金发放<br><code>343</code>：[定期简单赚币] 收益发放<br><code>344</code>：[定期简单赚币] 补偿收益发放<br><code>345</code>：[机构借贷] 本金还款<br><code>346</code>：[机构借贷] 利息还款<br><code>347</code>：[机构借贷] 逾期罚款<br><code>348</code>：[BTC质押] 申购<br><code>349</code>：[BTC质押] 赎回<br><code>350</code>：[BTC质押] 收益<br><code>351</code>：[机构借贷] 发放贷款<br><code>354</code>：策略奖励发放<br><code>361</code>：已关闭的子账户余额转入<br><code>372</code>：资产锁定<br><code>373</code>：解除资产锁定<br><code>400</code>：自动借币利息<br><code>408</code>：自动赚币（USDG赚币）利息<br><code>476</code>：云交易所转出<br><code>477</code>：云交易所转入<br><code>509</code>：[OKUSD] 申购<br><code>511</code>：[OKUSD] 赎回<br><code>516</code>：[OKUSD] 收益</td></tr><tr><td style="text-align: left">thirdPartyType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">第三方托管类型。不填则默认为 <code>1</code>（向后兼容）。<br><code>1</code>：Copper<br><code>2</code>：Komainu<br><code>5</code>：SCB<br>当母账户绑定多家托管商时，使用此参数可筛选指定托管商的账单。适用于账单类型 <code>284</code>–<code>289</code>。</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">转账或提币的客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳或账单记录ID，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为 100，不填默认返回 100 条</td></tr><tr><td style="text-align: left">pagingType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页类型<br><code>1</code>：按账单记录时间戳分页<br><code>2</code>：按账单记录ID分页<br>默认值为<code>1</code></td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "billId": "12344",
      "ccy": "BTC",
      "clientId": "",
      "balChg": "2",
      "bal": "12",
      "type": "1",
      "ts": "1597026383085",
      "notes": ""
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单 ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">账户余额币种</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">转账或提币的客户自定义ID</td></tr><tr><td style="text-align: left">balChg</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额变动数量</td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">账户层面的余额数量</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">notes</td><td style="text-align: left">String</td><td style="text-align: left">备注</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">账单创建时间，Unix 时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取充值地址信息

获取各个币种的充值地址，包括曾使用过的老地址。

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/deposit-address`

> 请求示例

```
GET /api/v5/asset/deposit-address?ccy=BTC
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取充值地址信息
result = fundingAPI.get_deposit_address(
    ccy="USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种，如<code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "chain": "BTC-Bitcoin",
            "ctAddr": "",
            "ccy": "BTC",
            "to": "6",
            "addr": "39XNxK1Ryqgg3Bsyn6HzoqV4Xji25pNkv6",
            "verifiedName":"John Corner",
            "selected": true
        },
        {
            "chain": "BTC-OKC",
            "ctAddr": "",
            "ccy": "BTC",
            "to": "6",
            "addr": "0x66d0edc2e63b6b992381ee668fbcb01f20ae0428",
            "verifiedName":"John Corner",
            "selected": true
        },
        {
            "chain": "BTC-ERC20",
            "ctAddr": "5807cf",
            "ccy": "BTC",
            "to": "6",
            "addr": "0x66d0edc2e63b6b992381ee668fbcb01f20ae0428",
            "verifiedName":"John Corner",
            "selected": true
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">addr</td><td style="text-align: left">String</td><td style="text-align: left">充值地址</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">部分币种充值需要标签，若不需要则不返回此字段</td></tr><tr><td style="text-align: left">memo</td><td style="text-align: left">String</td><td style="text-align: left">部分币种充值需要 memo，若不需要则不返回此字段</td></tr><tr><td style="text-align: left">pmtId</td><td style="text-align: left">String</td><td style="text-align: left">部分币种充值需要此字段（payment_id），若不需要则不返回此字段</td></tr><tr><td style="text-align: left">addrEx</td><td style="text-align: left">Object</td><td style="text-align: left">充值地址备注，部分币种充值需要，若不需要则不返回此字段<br>如币种<code>TONCOIN</code>的充值地址备注标签名为<code>comment</code>,则该字段返回：{'comment':'123456'}</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如<code>BTC</code></td></tr><tr><td style="text-align: left">chain</td><td style="text-align: left">String</td><td style="text-align: left">币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">转入账户<br><code>6</code>：资金账户 <code>18</code>：交易账户<br>某些主体用户(如巴西)只支持充值到交易账户</td></tr><tr><td style="text-align: left">verifiedName</td><td style="text-align: left">String</td><td style="text-align: left">(接受方)已验证姓名</td></tr><tr><td style="text-align: left">selected</td><td style="text-align: left">Boolean</td><td style="text-align: left">该地址是否为页面选中的地址</td></tr><tr><td style="text-align: left">ctAddr</td><td style="text-align: left">String</td><td style="text-align: left">合约地址后6位</td></tr></tbody></table>

### 获取充值记录

根据币种，充值状态，时间范围获取充值记录，按照时间倒序排列，默认返回 100 条数据。  
支持Websocket订阅，参考 [充值信息频道](/zh/funding-account-websocket-deposit-info-channel)。

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/deposit-history`

> 请求示例

```
# 查询最近的充值记录
GET /api/v5/asset/deposit-history

# 查询从2022年06月01日到2022年07月01日之间的BTC的充值记录
GET /api/v5/asset/deposit-history?ccy=BTC&after=1654041600000&before=1656633600000
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 获取充值记录
result = fundingAPI.get_deposit_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种名称，如 <code>BTC</code></td></tr><tr><td style="text-align: left">depId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">充值记录 ID</td></tr><tr><td style="text-align: left">fromWdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">内部转账发起者提币申请 ID<br>如果该笔充值来自于内部转账，则该字段展示内部转账发起者的提币申请 ID</td></tr><tr><td style="text-align: left">txId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">区块转账哈希记录</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">充值方式<br><code>3</code>：内部转账<br><code>4</code>：链上充值</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">充值状态<br><code>0</code>：等待确认<br><code>1</code>：确认到账<br><code>2</code>：充值成功<br><code>8</code>：因该币种暂停充值而未到账，恢复充值后自动到账<br><code>11</code>：命中地址黑名单<br><code>12</code>：账户或充值被冻结<br><code>13</code>：子账户充值拦截<br><code>14</code>：KYC限额<br><code>17</code>：钱包地址正等待国际转账规则认证</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1654041600000</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1656633600000</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">string</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为100，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
        "actualDepBlkConfirm": "2",
        "amt": "1",
        "areaCodeFrom": "",
        "ccy": "USDT",
        "chain": "USDT-TRC20",
        "depId": "88****33",
        "from": "",
        "fromWdId": "",
        "state": "2",
        "to": "TN4hGjVXMzy*********9b4N1aGizqs",
        "ts": "1674038705000",
        "txId": "fee235b3e812********857d36bb0426917f0df1802"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>chain</td><td>String</td><td>币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td>amt</td><td>String</td><td>充值数量</td></tr><tr><td>from</td><td>String</td><td>充值账户<br>如果该笔充值来自于内部转账，则该字段展示内部转账发起者的账户信息，可以是手机号或邮箱（脱敏），其他情况返回""</td></tr><tr><td>areaCodeFrom</td><td>String</td><td>如果<code>from</code>为手机号，该字段为该手机号的区号</td></tr><tr><td>to</td><td>String</td><td>到账地址<br>如果该笔充值来自于链上充值，则该字段展示链上地址，其他情况返回""</td></tr><tr><td>txId</td><td>String</td><td>区块转账哈希记录</td></tr><tr><td>ts</td><td>String</td><td>充值记录创建时间，Unix 时间戳的毫秒数格式，如 <code>1655251200000</code></td></tr><tr><td>state</td><td>String</td><td>充值状态<br><code>0</code>：等待确认<br><code>1</code>：确认到账<br><code>2</code>：充值成功<br><code>8</code>：因该币种暂停充值而未到账，恢复充值后自动到账<br><code>11</code>：命中地址黑名单<br><code>12</code>：账户或充值被冻结<br><code>13</code>：子账户充值拦截<br><code>14</code>：KYC限额</td></tr><tr><td>depId</td><td>String</td><td>充值记录 ID</td></tr><tr><td>fromWdId</td><td>String</td><td>内部转账发起者提币申请 ID<br>如果该笔充值来自于内部转账，则该字段展示内部转账发起者的提币申请 ID，其他情况返回""</td></tr><tr><td>actualDepBlkConfirm</td><td>String</td><td>最新的充币网络确认数</td></tr></tbody></table>

::: tip
关于充值状态  
**等待确认**是没有达到充币确认数。  
**确认到账**是够充币确认数，且币已经到账户中，但是不可提。  
**充值成功**是当前账户完成到提币确认，可以提出。
:::

### 提币

支持资金账户资产提币。普通子账户不支持提币。

::: tip
API只能提币到免认证地址/账户上，通过 WEB/APP 可以设置免认证地址。
:::

::: tip
关于标签  
某些币种如XRP充币时同时需要一个充值地址和标签（又名memo/payment\_id），标签是一种保证您的充币地址唯一性的数字串，与充币地址成对出现并一一对应。请您务必遵守正确的充值步骤，在提币时输入完整信息，否则将面临丢失币的风险！  
对于有标签的币种，如果是OKX用户间的提币，请走内部转账不要走链上提币。
:::

::: tip
下列内容仅适用于居住地为阿拉伯联合酋长国的用户  
根据您所在国家或地区的法律法规，一定比例的用户资产必须存储在冷钱包中。我们会不定期进行冷热钱包资产转移，但如果热钱包中的资产不足以满足用户提币需求，我们将需要进行额外步骤将冷钱包资产转移到热钱包，这可能会导致提币延迟最多24小时。  
更多详情参考(https://www.okx.com/zh-hans/help/what-is-a-segregated-wallet-and-why-is-my-withdrawal-delayed)
:::

::: tip
部分主体下的用户提币需要传入附加信息  
巴哈马主体参考： https://www.okx.com/docs-v5/log\_en/#2024-08-08-withdrawal-api-adjustment-for-bahama-entity-users
:::

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/asset/withdrawal`

> 请求示例

```
# 链上提币
POST /api/v5/asset/withdrawal
body
{
    "amt":"1",
    "dest":"4",
    "ccy":"BTC",
    "chain":"BTC-Bitcoin",
    "toAddr":"17DKe3kkkkiiiiTvAKKi2vMPbm1Bz3CMKw"
}

# 内部转账
POST /api/v5/asset/withdrawal
body
{
    "amt":"10",
    "dest":"3",
    "ccy":"USDT",
    "areaCode":"86",
    "toAddr":"15651000000"
}

# 特定主体用户需要提供接收方信息
POST /api/v5/asset/withdrawal
body
{
    "amt":"1",
    "dest":"4",
    "ccy":"BTC",
    "chain":"BTC-Bitcoin",
    "toAddr":"17DKe3kkkkiiiiTvAKKi2vMPbm1Bz3CMKw",
    "rcvrInfo":{
        "walletType":"exchange",
        "exchId":"did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1",
        "rcvrFirstName":"Bruce",
        "rcvrLastName":"Wayne"
    }
}
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 提币
result = fundingAPI.withdrawal(
    ccy="USDT",
    toAddr="TXtvfb7cdrn6VX9H49mgio8bUxZ3DGfvYF",
    amt="100",
    dest="4",
    chain="USDT-TRC20"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">提币数量<br>该数量不包含手续费。提币时需预留足够的手续费。<br>链上提币所需网络手续费可以通过接口 <a href="zh.html#funding-account-rest-api-get-currencies">获取币种列表</a> 获取<br>内部转账无需手续费</td></tr><tr><td style="text-align: left">dest</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">提币方式<br><code>3</code>：内部转账<br><code>4</code>：链上提币</td></tr><tr><td style="text-align: left">toAddr</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left"><code>toAddr</code>必须是认证过的地址/账户。如果选择链上提币，某些数字货币地址格式为<code>地址:标签</code>，如 <code>ARDOR-7JF3-8F2E-QUWZ-CAN7F:123456</code><br>如果选择内部转账，<code>toAddr</code>必须是接收方地址，可以是UID（仅白名单用户）、邮箱、手机或者账户名（只有子账户才有账户名）。</td></tr><tr><td style="text-align: left">toAddrType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">地址类型<br><code>1</code>: 钱包地址、邮箱、手机号、登录账户名<br><code>2</code>: UID（仅适用于 dest=<code>3</code>）</td></tr><tr><td style="text-align: left">chain</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种链信息<br>如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链<br>如果不填此参数，则默认为主链<br>对于无效资产提币，不填此参数，则默认为唯一的提币链<br>适用于<code>链上提币</code>，链信息可以通过接口 <a href="zh.html#funding-account-rest-api-get-currencies">获取币种列表</a> 获取</td></tr><tr><td style="text-align: left">areaCode</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">手机区号，如 <code>86</code><br>当<code>toAddr</code>为手机号时，该参数必填<br>适用于<code>内部转账</code></td></tr><tr><td style="text-align: left">rcvrInfo</td><td style="text-align: left">Object</td><td style="text-align: left">可选</td><td style="text-align: left">接收方信息<br>特定主体用户做<code>链上提币</code>/<code>闪电网络提币</code> 需要提供此信息</td></tr><tr><td style="text-align: left">&gt; walletType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">钱包类型<br><code>exchange</code>：提币到交易所钱包<br><code>private</code>：提币到私人钱包<br>对于钱包接收方为公司的，<code>rcvrFirstName</code>可以填公司名称，<code>rcvrLastName</code>可以填"N/A"，地址信息可以填写公司注册地址。</td></tr><tr><td style="text-align: left">&gt; exchId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易所 ID<br>可以通过 <a href="zh.html#funding-account-rest-api-get-exchange-list-public">获取交易所列表（公共）</a> 接口查询支持的交易所<br>如果交易所不在支持的交易所列表中，该字段填<code>0</code><br>适用于walletType=<code>exchange</code></td></tr><tr><td style="text-align: left">&gt; rcvrFirstName</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方名字，如 <code>Bruce</code></td></tr><tr><td style="text-align: left">&gt; rcvrLastName</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方姓氏，如 <code>Wayne</code></td></tr><tr><td style="text-align: left">&gt; rcvrCountry</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方所在国家，如 <code>United States</code><br>必须输入英文国家名称，或者两字母国家代码(ISO 3166-1)。输入内容参考下方国家信息表中<code>国家名称(英)</code>，<code>国家代码</code></td></tr><tr><td style="text-align: left">&gt; rcvrCountrySubDivision</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方所在州/省，如 <code>California</code></td></tr><tr><td style="text-align: left">&gt; rcvrTownName</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方所在城镇，如 <code>San Jose</code></td></tr><tr><td style="text-align: left">&gt; rcvrStreetName</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">接收方所在街道地址，如 <code>Clementi Avenue 1</code></td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "amt": "0.1",
        "wdId": "67485",
        "ccy": "BTC",
        "clientId": "",
        "chain": "BTC-Bitcoin"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">提币币种</td></tr><tr><td style="text-align: left">chain</td><td style="text-align: left">String</td><td style="text-align: left">币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">提币数量</td></tr><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">提币申请ID</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义ID</td></tr></tbody></table>

#### 国家信息表

<table><thead><tr><th>国家名称(英)</th><th>国家名称(中)</th><th>国家代码</th></tr></thead><tbody><tr><td>Afghanistan</td><td>阿富汗</td><td>AF</td></tr><tr><td>Albania</td><td>阿尔巴尼亚</td><td>AL</td></tr><tr><td>Algeria</td><td>阿尔及利亚</td><td>DZ</td></tr><tr><td>Andorra</td><td>安道尔</td><td>AD</td></tr><tr><td>Angola</td><td>安哥拉</td><td>AO</td></tr><tr><td>Anguilla</td><td>安圭拉</td><td>AI</td></tr><tr><td>Antigua and Barbuda</td><td>安提瓜和巴布达</td><td>AG</td></tr><tr><td>Argentina</td><td>阿根廷</td><td>AR</td></tr><tr><td>Armenia</td><td>亚美尼亚</td><td>AM</td></tr><tr><td>Australia</td><td>澳大利亚</td><td>AU</td></tr><tr><td>Austria</td><td>奥地利</td><td>AT</td></tr><tr><td>Azerbaijan</td><td>阿塞拜疆</td><td>AZ</td></tr><tr><td>Bahamas</td><td>巴哈马</td><td>BS</td></tr><tr><td>Bahrain</td><td>巴林</td><td>BH</td></tr><tr><td>Bangladesh</td><td>孟加拉国</td><td>BD</td></tr><tr><td>Barbados</td><td>巴巴多斯</td><td>BB</td></tr><tr><td>Belarus</td><td>白俄罗斯</td><td>BY</td></tr><tr><td>Belgium</td><td>比利时</td><td>BE</td></tr><tr><td>Belize</td><td>伯利兹</td><td>BZ</td></tr><tr><td>Benin</td><td>贝宁</td><td>BJ</td></tr><tr><td>Bermuda</td><td>百慕大</td><td>BM</td></tr><tr><td>Bhutan</td><td>不丹</td><td>BT</td></tr><tr><td>Bolivia</td><td>玻利维亚</td><td>BO</td></tr><tr><td>Bosnia and Herzegovina</td><td>波斯尼亚和黑塞哥维那 (波黑)</td><td>BA</td></tr><tr><td>Botswana</td><td>博茨瓦纳</td><td>BW</td></tr><tr><td>Brazil</td><td>巴西</td><td>BR</td></tr><tr><td>British Virgin Islands</td><td>英属维尔京群岛</td><td>VG</td></tr><tr><td>Brunei</td><td>文莱</td><td>BN</td></tr><tr><td>Bulgaria</td><td>保加利亚</td><td>BG</td></tr><tr><td>Burkina Faso</td><td>布基纳法索</td><td>BF</td></tr><tr><td>Burundi</td><td>布隆迪</td><td>BI</td></tr><tr><td>Cambodia</td><td>柬埔寨</td><td>KH</td></tr><tr><td>Cameroon</td><td>喀麦隆</td><td>CM</td></tr><tr><td>Canada</td><td>加拿大</td><td>CA</td></tr><tr><td>Cape Verde</td><td>佛得角</td><td>CV</td></tr><tr><td>Cayman Islands</td><td>开曼群岛</td><td>KY</td></tr><tr><td>Central African Republic</td><td>中非共和国</td><td>CF</td></tr><tr><td>Chad</td><td>乍得</td><td>TD</td></tr><tr><td>Chile</td><td>智利</td><td>CL</td></tr><tr><td>Colombia</td><td>哥伦比亚</td><td>CO</td></tr><tr><td>Comoros</td><td>科摩罗</td><td>KM</td></tr><tr><td>Congo (Republic)</td><td>刚果共和国</td><td>CG</td></tr><tr><td>Congo (Democratic Republic)</td><td>刚果民主共和国</td><td>CD</td></tr><tr><td>Costa Rica</td><td>哥斯达黎加</td><td>CR</td></tr><tr><td>Cote d´Ivoire (Ivory Coast)</td><td>象牙海岸</td><td>CI</td></tr><tr><td>Croatia</td><td>克罗地亚</td><td>HR</td></tr><tr><td>Cuba</td><td>古巴</td><td>CU</td></tr><tr><td>Cyprus</td><td>塞浦路斯</td><td>CY</td></tr><tr><td>Czech Republic</td><td>捷克共和国</td><td>CZ</td></tr><tr><td>Denmark</td><td>丹麦</td><td>DK</td></tr><tr><td>Djibouti</td><td>吉布提</td><td>DJ</td></tr><tr><td>Dominica</td><td>多米尼克</td><td>DM</td></tr><tr><td>Dominican Republic</td><td>多明尼加共和国</td><td>DO</td></tr><tr><td>Ecuador</td><td>厄瓜多尔</td><td>EC</td></tr><tr><td>Egypt</td><td>埃及</td><td>EG</td></tr><tr><td>El Salvador</td><td>萨尔瓦多</td><td>SV</td></tr><tr><td>Equatorial Guinea</td><td>赤道几内亚</td><td>GQ</td></tr><tr><td>Eritrea</td><td>厄立特里亚</td><td>ER</td></tr><tr><td>Estonia</td><td>爱沙尼亚</td><td>EE</td></tr><tr><td>Ethiopia</td><td>埃塞俄比亚</td><td>ET</td></tr><tr><td>Fiji</td><td>斐济</td><td>FJ</td></tr><tr><td>Finland</td><td>芬兰</td><td>FI</td></tr><tr><td>France</td><td>法国</td><td>FR</td></tr><tr><td>Gabon</td><td>加蓬</td><td>GA</td></tr><tr><td>Gambia</td><td>冈比亚</td><td>GM</td></tr><tr><td>Georgia</td><td>格鲁吉亚</td><td>GE</td></tr><tr><td>Germany</td><td>德国</td><td>DE</td></tr><tr><td>Ghana</td><td>加纳</td><td>GH</td></tr><tr><td>Greece</td><td>希腊</td><td>GR</td></tr><tr><td>Grenada</td><td>格林纳达</td><td>GD</td></tr><tr><td>Guatemala</td><td>危地马拉</td><td>GT</td></tr><tr><td>Guinea</td><td>几内亚</td><td>GN</td></tr><tr><td>Guinea-Bissau</td><td>几内亚比绍</td><td>GW</td></tr><tr><td>Guyana</td><td>圭亚那</td><td>GY</td></tr><tr><td>Haiti</td><td>海地</td><td>HT</td></tr><tr><td>Honduras</td><td>洪都拉斯</td><td>HN</td></tr><tr><td>Hong Kong</td><td>香港</td><td>HK</td></tr><tr><td>Hungary</td><td>匈牙利</td><td>HU</td></tr><tr><td>Iceland</td><td>冰岛</td><td>IS</td></tr><tr><td>India</td><td>印度</td><td>IN</td></tr><tr><td>Indonesia</td><td>印度尼西亚</td><td>ID</td></tr><tr><td>Iran</td><td>伊朗</td><td>IR</td></tr><tr><td>Iraq</td><td>伊拉克</td><td>IQ</td></tr><tr><td>Ireland</td><td>爱尔兰</td><td>IE</td></tr><tr><td>Israel</td><td>以色列</td><td>IL</td></tr><tr><td>Italy</td><td>意大利</td><td>IT</td></tr><tr><td>Jamaica</td><td>牙买加</td><td>JM</td></tr><tr><td>Japan</td><td>日本</td><td>JP</td></tr><tr><td>Jordan</td><td>约旦</td><td>JO</td></tr><tr><td>Kazakhstan</td><td>哈萨克斯坦</td><td>KZ</td></tr><tr><td>Kenya</td><td>肯尼亚</td><td>KE</td></tr><tr><td>Kiribati</td><td>基里巴斯</td><td>KI</td></tr><tr><td>North Korea</td><td>朝鲜</td><td>KP</td></tr><tr><td>South Korea</td><td>韩国</td><td>KR</td></tr><tr><td>Kuwait</td><td>科威特</td><td>KW</td></tr><tr><td>Kyrgyzstan</td><td>吉尔吉斯斯坦</td><td>KG</td></tr><tr><td>Laos</td><td>老挝</td><td>LA</td></tr><tr><td>Latvia</td><td>拉脱维亚</td><td>LV</td></tr><tr><td>Lebanon</td><td>黎巴嫩</td><td>LB</td></tr><tr><td>Lesotho</td><td>莱索托</td><td>LS</td></tr><tr><td>Liberia</td><td>利比里亚</td><td>LR</td></tr><tr><td>Libya</td><td>利比亚</td><td>LY</td></tr><tr><td>Liechtenstein</td><td>列支敦士登</td><td>LI</td></tr><tr><td>Lithuania</td><td>立陶宛</td><td>LT</td></tr><tr><td>Luxembourg</td><td>卢森堡</td><td>LU</td></tr><tr><td>Macau</td><td>澳门</td><td>MO</td></tr><tr><td>Macedonia</td><td>马其顿</td><td>MK</td></tr><tr><td>Madagascar</td><td>马达加斯加</td><td>MG</td></tr><tr><td>Malawi</td><td>马拉维</td><td>MW</td></tr><tr><td>Malaysia</td><td>马来西亚</td><td>MY</td></tr><tr><td>Maldives</td><td>马尔代夫</td><td>MV</td></tr><tr><td>Mali</td><td>马里</td><td>ML</td></tr><tr><td>Malta</td><td>马耳他</td><td>MT</td></tr><tr><td>Marshall Islands</td><td>马绍尔群岛</td><td>MH</td></tr><tr><td>Mauritania</td><td>毛里塔尼亚</td><td>MR</td></tr><tr><td>Mauritius</td><td>毛里求斯</td><td>MU</td></tr><tr><td>Mexico</td><td>墨西哥</td><td>MX</td></tr><tr><td>Micronesia</td><td>密克罗尼西亚</td><td>FM</td></tr><tr><td>Moldova</td><td>摩尔多瓦</td><td>MD</td></tr><tr><td>Monaco</td><td>摩纳哥</td><td>MC</td></tr><tr><td>Mongolia</td><td>蒙古</td><td>MN</td></tr><tr><td>Montenegro</td><td>黑山</td><td>ME</td></tr><tr><td>Morocco</td><td>摩洛哥</td><td>MA</td></tr><tr><td>Mozambique</td><td>莫桑比克</td><td>MZ</td></tr><tr><td>Myanmar (Burma)</td><td>缅甸</td><td>MM</td></tr><tr><td>Namibia</td><td>纳米比亚</td><td>NA</td></tr><tr><td>Nauru</td><td>瑙鲁</td><td>NR</td></tr><tr><td>Nepal</td><td>尼泊尔</td><td>NP</td></tr><tr><td>Netherlands</td><td>荷兰</td><td>NL</td></tr><tr><td>New Zealand</td><td>新西兰</td><td>NZ</td></tr><tr><td>Nicaragua</td><td>尼加拉瓜</td><td>NI</td></tr><tr><td>Niger</td><td>尼日尔</td><td>NE</td></tr><tr><td>Nigeria</td><td>尼日利亚</td><td>NG</td></tr><tr><td>Norway</td><td>挪威</td><td>NO</td></tr><tr><td>Oman</td><td>阿曼</td><td>OM</td></tr><tr><td>Pakistan</td><td>巴基斯坦</td><td>PK</td></tr><tr><td>Palau</td><td>帕劳</td><td>PW</td></tr><tr><td>Panama</td><td>巴拿马</td><td>PA</td></tr><tr><td>Papua New Guinea</td><td>巴布亚新几内亚</td><td>PG</td></tr><tr><td>Paraguay</td><td>巴拉圭</td><td>PY</td></tr><tr><td>Peru</td><td>秘鲁</td><td>PE</td></tr><tr><td>Philippines</td><td>菲律宾</td><td>PH</td></tr><tr><td>Poland</td><td>波兰</td><td>PL</td></tr><tr><td>Portugal</td><td>葡萄牙</td><td>PT</td></tr><tr><td>Qatar</td><td>卡塔尔</td><td>QA</td></tr><tr><td>Romania</td><td>罗马尼亚</td><td>RO</td></tr><tr><td>Russia</td><td>俄国</td><td>RU</td></tr><tr><td>Rwanda</td><td>卢旺达</td><td>RW</td></tr><tr><td>Saint Kitts and Nevis</td><td>圣基茨和尼维斯</td><td>KN</td></tr><tr><td>Saint Lucia</td><td>圣卢西亚</td><td>LC</td></tr><tr><td>Saint Vincent and the Grenadines</td><td>圣文森特和格林纳丁斯</td><td>VC</td></tr><tr><td>Samoa</td><td>萨摩亚</td><td>WS</td></tr><tr><td>San Marino</td><td>圣马力诺</td><td>SM</td></tr><tr><td>Sao Tome and Principe</td><td>圣多美和普林西比</td><td>ST</td></tr><tr><td>Saudi Arabia</td><td>沙特阿拉伯</td><td>SA</td></tr><tr><td>Senegal</td><td>塞内加尔</td><td>SN</td></tr><tr><td>Serbia</td><td>塞尔维亚</td><td>RS</td></tr><tr><td>Seychelles</td><td>塞舌尔</td><td>SC</td></tr><tr><td>Sierra Leone</td><td>塞拉利昂</td><td>SL</td></tr><tr><td>Singapore</td><td>新加坡</td><td>SG</td></tr><tr><td>Slovakia</td><td>斯洛伐克</td><td>SK</td></tr><tr><td>Slovenia</td><td>斯洛文尼亚</td><td>SI</td></tr><tr><td>Solomon Islands</td><td>所罗门群岛</td><td>SB</td></tr><tr><td>Somalia</td><td>索马里</td><td>SO</td></tr><tr><td>South Africa</td><td>南非</td><td>ZA</td></tr><tr><td>Spain</td><td>西班牙</td><td>ES</td></tr><tr><td>Sri Lanka</td><td>斯里兰卡</td><td>LK</td></tr><tr><td>Sudan</td><td>苏丹</td><td>SD</td></tr><tr><td>Suriname</td><td>苏里南</td><td>SR</td></tr><tr><td>Swaziland</td><td>斯威士兰</td><td>SZ</td></tr><tr><td>Sweden</td><td>瑞典</td><td>SE</td></tr><tr><td>Switzerland</td><td>瑞士</td><td>CH</td></tr><tr><td>Syria</td><td>叙利亚</td><td>SY</td></tr><tr><td>Taiwan</td><td>台湾</td><td>TW</td></tr><tr><td>Tajikistan</td><td>塔吉克斯坦</td><td>TJ</td></tr><tr><td>Tanzania</td><td>坦桑尼亚</td><td>TZ</td></tr><tr><td>Thailand</td><td>泰国</td><td>TH</td></tr><tr><td>Timor-Leste (East Timor)</td><td>东帝汶</td><td>TL</td></tr><tr><td>Togo</td><td>多哥</td><td>TG</td></tr><tr><td>Tonga</td><td>汤加</td><td>TO</td></tr><tr><td>Trinidad and Tobago</td><td>特里尼达和多巴哥</td><td>TT</td></tr><tr><td>Tunisia</td><td>突尼斯</td><td>TN</td></tr><tr><td>Turkey</td><td>土耳其</td><td>TR</td></tr><tr><td>Turkmenistan</td><td>土库曼斯坦</td><td>TM</td></tr><tr><td>Tuvalu</td><td>图瓦卢</td><td>TV</td></tr><tr><td>U.S. Virgin Islands</td><td>美属维尔京群岛</td><td>VI</td></tr><tr><td>Uganda</td><td>乌干达</td><td>UG</td></tr><tr><td>Ukraine</td><td>乌克兰</td><td>UA</td></tr><tr><td>United Arab Emirates</td><td>阿拉伯联合酋长国</td><td>AE</td></tr><tr><td>United Kingdom</td><td>英国</td><td>GB</td></tr><tr><td>United States</td><td>美国</td><td>US</td></tr><tr><td>Uruguay</td><td>乌拉圭</td><td>UY</td></tr><tr><td>Uzbekistan</td><td>乌兹别克斯坦</td><td>UZ</td></tr><tr><td>Vanuatu</td><td>瓦努阿图</td><td>VU</td></tr><tr><td>Vatican City</td><td>梵蒂冈城</td><td>VA</td></tr><tr><td>Venezuela</td><td>委内瑞拉</td><td>VE</td></tr><tr><td>Vietnam</td><td>越南</td><td>VN</td></tr><tr><td>Yemen</td><td>也门</td><td>YE</td></tr><tr><td>Zambia</td><td>赞比亚</td><td>ZM</td></tr><tr><td>Zimbabwe</td><td>津巴布韦</td><td>ZW</td></tr><tr><td>Kosovo</td><td>科索沃</td><td>XK</td></tr><tr><td>South Sudan</td><td>南苏丹</td><td>SS</td></tr><tr><td>China</td><td>中国</td><td>CN</td></tr><tr><td>Palestine</td><td>巴勒斯坦</td><td>PS</td></tr><tr><td>Curacao</td><td>库拉索</td><td>CW</td></tr><tr><td>Dominican Republic</td><td>多明尼加共和国</td><td>DO</td></tr><tr><td>Dominican Republic</td><td>多明尼加共和国</td><td>DO</td></tr><tr><td>Gibraltar</td><td>英属直布罗陀</td><td>GI</td></tr><tr><td>New Caledonia</td><td>新喀里多尼亚</td><td>NC</td></tr><tr><td>Cook Islands</td><td>库克群岛</td><td>CK</td></tr><tr><td>Reunion</td><td>留尼旺</td><td>RE</td></tr><tr><td>Guernsey</td><td>根西岛</td><td>GG</td></tr><tr><td>Guadeloupe</td><td>瓜德罗普</td><td>GP</td></tr><tr><td>Martinique</td><td>马提尼克</td><td>MQ</td></tr><tr><td>French Polynesia</td><td>法属波利尼西亚</td><td>PF</td></tr><tr><td>Faroe Islands</td><td>法罗群岛</td><td>FO</td></tr><tr><td>Greenland</td><td>格陵兰岛</td><td>GL</td></tr><tr><td>Jersey</td><td>泽西岛</td><td>JE</td></tr><tr><td>Aruba</td><td>阿鲁巴</td><td>AW</td></tr><tr><td>Puerto Rico</td><td>波多黎各</td><td>PR</td></tr><tr><td>Isle of Man</td><td>曼岛</td><td>IM</td></tr><tr><td>Guam</td><td>关岛</td><td>GU</td></tr><tr><td>Sint Maarten</td><td>荷属圣马丁</td><td>SX</td></tr><tr><td>Turks and Caicos</td><td>特克斯和凯科斯群岛</td><td>TC</td></tr><tr><td>Åland Islands</td><td>奥兰群岛</td><td>AX</td></tr><tr><td>Caribbean Netherlands</td><td>荷属加勒比</td><td>BQ</td></tr><tr><td>British Indian Ocean Territory</td><td>英属印度洋领地</td><td>IO</td></tr><tr><td>Christmas as Island</td><td>圣诞岛</td><td>CX</td></tr><tr><td>Cocos (Keeling) Islands</td><td>科科斯 (基林) 群岛</td><td>CC</td></tr><tr><td>Falkland Islands (Islas Malvinas)</td><td>福克兰群岛 (马尔维纳斯群岛)</td><td>FK</td></tr><tr><td>Mayotte</td><td>马约特</td><td>YT</td></tr><tr><td>Niue</td><td>纽埃</td><td>NU</td></tr><tr><td>Norfolk Island</td><td>诺福克岛</td><td>NF</td></tr><tr><td>Northern Mariana Islands</td><td>北马里亚纳群岛</td><td>MP</td></tr><tr><td>Pitcairn Islands</td><td>皮特凯恩群岛</td><td>PN</td></tr><tr><td>Saint Helena, Ascension and Tristan da Cunha</td><td>圣赫勒拿、阿森松岛和特里斯坦-达库尼亚</td><td>SH</td></tr><tr><td>Collectivity of Saint Martin</td><td>法属圣马丁</td><td>MF</td></tr><tr><td>Saint Pierre and Miquelon</td><td>圣皮埃尔和密克隆</td><td>PM</td></tr><tr><td>Tokelau</td><td>托克劳</td><td>TK</td></tr><tr><td>Wallis and Futuna</td><td>瓦利斯和富图纳</td><td>WF</td></tr><tr><td>American Samoa</td><td>美属萨摩亚</td><td>AS</td></tr></tbody></table>

### 撤销提币

可以撤销普通提币，但不支持撤销闪电网络上的提币。

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/asset/cancel-withdrawal`

> 请求示例

```
POST /api/v5/asset/cancel-withdrawal
body {
   "wdId":"1123456"
}
```

```
import okx.Funding as Funding

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "0"  # 实盘: 0, 模拟盘: 1

fundingAPI = Funding.FundingAPI(apikey, secretkey, passphrase, False, flag)

# 撤销提币
result = fundingAPI.cancel_withdrawal(
    wdId="123456"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">提币申请ID</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "wdId": "1123456"   
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">提币申请ID</td></tr></tbody></table>

::: tip
接口返回code等于0不能严格认为提币已经被撤销，只表示您的请求被系统服务器所接受，实际结果以获取提币记录中的状态为准。
:::

### 获取提币记录

根据币种，提币状态，时间范围获取提币记录，按照时间倒序排列，默认返回100条数据。  
支持Websocket订阅，参考 [提币信息频道](/zh/funding-account-websocket-withdrawal-info-channel)。

#### 限速：6 次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/withdrawal-history`

> 请求示例

```
# 查询最近的提币记录
GET /api/v5/asset/withdrawal-history

# 查询从2022年06月01日到2022年07月01日之间的BTC的提币记录
GET /api/v5/asset/withdrawal-history?ccy=BTC&after=1654041600000&before=1656633600000
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>否</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>wdId</td><td>String</td><td>否</td><td>提币申请ID</td></tr><tr><td>clientId</td><td>String</td><td>否</td><td>客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td>txId</td><td>String</td><td>否</td><td>区块转账哈希记录</td></tr><tr><td>type</td><td>String</td><td>否</td><td>提币方式<br><code>3</code>：内部转账<br><code>4</code>：链上提币</td></tr><tr><td>state</td><td>String</td><td>否</td><td>提币状态<br><br><li>阶段1：等待提币</li><code>19</code>：热钱包余额不足<br><code>17</code>：钱包地址正等待国际转账规则认证<br><code>10</code>：等待划转<br><code>0</code>：等待提币<br><code>4</code>/<code>5</code>/<code>6</code>/<code>8</code>/<code>9</code>/<code>12</code>：等待客服审核<br><code>7</code>：审核通过<br>&gt;<code>0</code>, <code>17</code>, <code>19</code> 可撤销，其他状态不可撤销<br><br><li>阶段2：提币处理中（适用于链上提币，内部转账无此阶段）</li><code>1</code>：正在将您的交易广播到链上<br><code>15</code>：交易待确认<br><code>16</code>：根据当地法律法规，您的提币最多可能需要 24 小时才能到账<br><code>-3</code>：撤销中<br><br><li>最终阶段</li><code>-2</code>：已撤销<br><code>-1</code>：失败<br><code>2</code>：提币成功</td></tr><tr><td>after</td><td>String</td><td>否</td><td>查询在此之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1654041600000</code></td></tr><tr><td>before</td><td>String</td><td>否</td><td>查询在此之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1656633600000</code></td></tr><tr><td>limit</td><td>string</td><td>否</td><td>返回的结果集数量，默认为100，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "note": "",
      "chain": "ETH-Ethereum",
      "fee": "0.007",
      "feeCcy": "ETH",
      "ccy": "ETH",
      "clientId": "",
      "toAddrType": "1",
      "amt": "0.029809",
      "txId": "0x35c******b360a174d",
      "from": "156****359",
      "areaCodeFrom": "86",
      "to": "0xa30d1fab********7CF18C7B6C579",
      "areaCodeTo": "",
      "state": "2",
      "ts": "1655251200000",
      "nonTradableAsset": false,
      "wdId": "15447421"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">chain</td><td style="text-align: left">String</td><td style="text-align: left">币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td style="text-align: left">nonTradableAsset</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为不可交易资产<br><code>true</code>：不可交易资产，<code>false</code>：可交易资产</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">数量</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">提币申请时间，Unix 时间戳的毫秒数格式，如 <code>1655251200000</code></td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">提币账户<br>可以是<code>邮箱</code>/<code>手机号</code>/<code>子账户名</code></td></tr><tr><td style="text-align: left">areaCodeFrom</td><td style="text-align: left">String</td><td style="text-align: left">如果<code>from</code>为手机号，该字段为该手机号的区号</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">收币地址</td></tr><tr><td style="text-align: left">areaCodeTo</td><td style="text-align: left">String</td><td style="text-align: left">如果<code>to</code>为手机号，该字段为该手机号的区号</td></tr><tr><td style="text-align: left">toAddrType</td><td style="text-align: left">String</td><td style="text-align: left">地址类型<br><code>1</code>: 钱包地址、邮箱、手机号、登录账户名<br><code>2</code>: UID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">部分币种提币需要标签，若不需要则不返回此字段</td></tr><tr><td style="text-align: left">pmtId</td><td style="text-align: left">String</td><td style="text-align: left">部分币种提币需要此字段（payment_id），若不需要则不返回此字段</td></tr><tr><td style="text-align: left">memo</td><td style="text-align: left">String</td><td style="text-align: left">部分币种提币需要此字段，若不需要则不返回此字段</td></tr><tr><td style="text-align: left">addrEx</td><td style="text-align: left">Object</td><td style="text-align: left">提币地址备注，部分币种提币需要，若不需要则不返回此字段。如币种TONCOIN的提币地址备注标签名为comment,则该字段返回：{'comment':'123456'}</td></tr><tr><td style="text-align: left">txId</td><td style="text-align: left">String</td><td style="text-align: left">提币哈希记录<br>内部转账该字段返回""</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">提币手续费数量</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">提币手续费币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">提币状态</td></tr><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">提币申请ID</td></tr><tr><td style="text-align: left">clientId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义ID</td></tr><tr><td style="text-align: left">note</td><td style="text-align: left">String</td><td style="text-align: left">备注信息</td></tr></tbody></table>

### 获取充值/提现的详细状态

获取充值与提现的详细状态信息与预估完成时间。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/deposit-withdraw-status`

> 请求示例

```
# 查询充值
GET /api/v5/asset/deposit-withdraw-status?txId=xxxxxx&to=1672734730284&ccy=USDT&chain=USDT-ERC20

# 查询提现
GET /api/v5/asset/deposit-withdraw-status?wdId=200045249
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">提币申请ID，用于查询资金提现<br><code>wdId</code>与<code>txId</code>必传其一也仅可传其一</td></tr><tr><td style="text-align: left">txId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">区块转账哈希记录ID，用于查询资金充值<br><code>wdId</code>与<code>txId</code>必传其一也仅可传其一</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种，如<code>USDT</code><br>查询充值时必填，需要与<code>txId</code>一并提供</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">资金充值到账账户地址<br>查询充值时必填，需要与<code>txId</code>一并提供</td></tr><tr><td style="text-align: left">chain</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">币种链信息，如 USDT-ERC20<br>查询充值时必填，需要与<code>txId</code>一并提供</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "data":[
        {
            "wdId": "200045249",
            "txId": "16f3638329xxxxxx42d988f97", 
            "state": "Pending withdrawal: Wallet is under maintenance, please wait.",
            "estCompleteTime": "01/09/2023, 8:10:48 PM"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">estCompleteTime</td><td style="text-align: left">String</td><td style="text-align: left">预估完成时间<br>时区为 UTC+8；格式为 MM/dd/yyyy, h:mm:ss AM/PM<br>estCompleteTime仅为预估完成时间，仅供参考</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">充值/提现的现处于的详细阶段提示<br>冒号前面代表阶段，后面代表状态</td></tr><tr><td style="text-align: left">txId</td><td style="text-align: left">String</td><td style="text-align: left">区块转账哈希记录<br>提币如果<code>txId</code>已经生成，则返回，否则返回""</td></tr><tr><td style="text-align: left">wdId</td><td style="text-align: left">String</td><td style="text-align: left">提币申请ID<br>如查询的是充值，该字段返回""</td></tr></tbody></table>

::: tip
阶段参考  
充值  
阶段一：监测链上交易  
阶段二：推送充值数据到入账环节  
阶段三：进行入账  
终态：充值已完成  
提现  
阶段一：等待提现  
阶段二：提现中  
终态：提现已完成 / 撤销已完成
:::

### 获取交易所列表（公共）

公共接口无须鉴权

#### 限速：6次/s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/asset/exchange-list`

> 请求示例

```
GET /api/v5/asset/exchange-list
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
        "exchId": "did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1",
        "exchName": "1xbet"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">exchName</td><td style="text-align: left">String</td><td style="text-align: left">交易所名称，如 <code>1xbet</code></td></tr><tr><td style="text-align: left">exchId</td><td style="text-align: left">String</td><td style="text-align: left">交易所 ID，如 <code>did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1</code></td></tr></tbody></table>

### 申请月结单 (近一年)

申请最近一年的月结单。

#### 限速：20 次/月

#### 限速规则：User ID

#### HTTP Request

`POST /api/v5/asset/monthly-statement`

> 请求示例

```
POST /api/v5/asset/monthly-statement
body
{
    "month":"Jan"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">month</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">月份,默认上一个月。有效值是<code>Jan</code>, <code>Feb</code>, <code>Mar</code>, <code>Apr</code>,<code>May</code>, <code>Jun</code>, <code>Jul</code>,<code>Aug</code>, <code>Sep</code>,<code>Oct</code>,<code>Nov</code>,<code>Dec</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ts": "1646892328000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">下载链接生成时间，Unix时间戳的毫秒数格式 ，如, <code>1597026383085</code></td></tr></tbody></table>

### 获取月结单 (近一年)

获取近一年的月结单

#### 限速：10 次/2s

#### 限速规则：User ID

#### HTTP Request

`GET /api/v5/asset/monthly-statement`

> 请求示例

```
GET /api/v5/asset/monthly-statement?month=Jan
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">month</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">月份, 有效值是<code>Jan</code>, <code>Feb</code>, <code>Mar</code>, <code>Apr</code>,<code>May</code>, <code>Jun</code>, <code>Jul</code>,<code>Aug</code>, <code>Sep</code>, <code>Oct</code>, <code>Nov</code>, <code>Dec</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fileHref": "http://xxx",
            "state": "finished",
            "ts": 1646892328000
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fileHref</td><td style="text-align: left">String</td><td style="text-align: left">文件链接</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">Int</td><td style="text-align: left">下载链接生成时间，Unix时间戳的毫秒数格式 ，如 1597026383085</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">下载链接状态<br><code>finished</code>：已生成<br><code>ongoing</code>：进行中</td></tr></tbody></table>

### 获取闪兑币种列表

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/convert/currencies`

> 请求示例

```
GET /api/v5/asset/convert/currencies
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "min": "",  // 已废弃
            "max": "",  // 已废弃
            "ccy": "BTC"
        },
        {
            "min": "",
            "max": "",
            "ccy": "ETH"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>min</td><td>String</td><td><del>支持闪兑的最小值</del>(已废弃)</td></tr><tr><td>max</td><td>String</td><td><del>支持闪兑的最大值</del>(已废弃)</td></tr></tbody></table>

### 获取闪兑币对信息

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/convert/currency-pair`

> 请求示例

```
GET /api/v5/asset/convert/currency-pair?fromCcy=USDT&toCcy=BTC
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消耗币种，如 <code>USDT</code></td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">获取币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">convertMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left"><code>0</code>：标准闪兑（默认）<br><code>1</code>：VIP大额闪兑</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "baseCcy": "BTC",
            "baseCcyMax": "0.5",
            "baseCcyMin": "0.0001",
            "instId": "BTC-USDT",
            "quoteCcy": "USDT",
            "quoteCcyMax": "10000",
            "quoteCcyMin": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>String</td><td>币对，如 <code>BTC-USDT</code></td></tr><tr><td>baseCcy</td><td>String</td><td>交易货币币种，如 <code>BTC-USDT</code>中的<code>BTC</code></td></tr><tr><td>baseCcyMax</td><td>String</td><td>交易货币支持闪兑的最大值</td></tr><tr><td>baseCcyMin</td><td>String</td><td>交易货币支持闪兑的最小值</td></tr><tr><td>quoteCcy</td><td>String</td><td>计价货币币种，如 <code>BTC-USDT</code>中的<code>USDT</code></td></tr><tr><td>quoteCcyMax</td><td>String</td><td>计价货币支持闪兑的最大值</td></tr><tr><td>quoteCcyMin</td><td>String</td><td>计价货币支持闪兑的最小值</td></tr></tbody></table>

### 闪兑预估询价

#### 限速：10次/s

#### 限速规则：User ID

#### 限速：1次/5s

#### 限速规则：Instrument ID

#### HTTP请求

`POST /api/v5/asset/convert/estimate-quote`

> 请求示例

```
POST /api/v5/asset/convert/estimate-quote
body
{
    "baseCcy": "ETH",
    "quoteCcy": "USDT",
    "side": "buy",
    "rfqSz": "30",
    "rfqSzCcy": "USDT"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code>中的<code>BTC</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code>中的<code>USDT</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易方向<br>买：<code>buy</code> 卖：<code>sell</code><br>描述的是对于baseCcy的交易方向</td></tr><tr><td style="text-align: left">rfqSz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价数量</td></tr><tr><td style="text-align: left">rfqSzCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价币种</td></tr><tr><td style="text-align: left">clQReqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户端自定义的订单标识<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>适用于broker用户</td></tr><tr><td style="text-align: left">convertMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left"><code>0</code>：标准闪兑（默认）<br><code>1</code>：VIP大额闪兑</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "baseCcy": "ETH",
            "baseSz": "0.01023052",
            "clQReqId": "",
            "cnvtPx": "2932.40104429",
            "origRfqSz": "30",
            "quoteCcy": "USDT",
            "quoteId": "quoterETH-USDT16461885104612381",
            "quoteSz": "30",
            "quoteTime": "1646188510461",
            "rfqSz": "30",
            "rfqSzCcy": "USDT",
            "side": "buy",
            "ttlMs": "10000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteTime</td><td style="text-align: left">String</td><td style="text-align: left">生成报价时间，Unix时间戳的毫秒数格式</td></tr><tr><td style="text-align: left">ttlMs</td><td style="text-align: left">String</td><td style="text-align: left">报价有效期，单位为毫秒</td></tr><tr><td style="text-align: left">clQReqId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义的订单标识</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易货币币种，如 BTC-USDT 中BTC</td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价货币币种，如 BTC-USDT 中USDT</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">交易方向<br>买：<code>buy</code> 卖：<code>sell</code></td></tr><tr><td style="text-align: left">origRfqSz</td><td style="text-align: left">String</td><td style="text-align: left">原始报价的数量</td></tr><tr><td style="text-align: left">rfqSz</td><td style="text-align: left">String</td><td style="text-align: left">实际报价的数量</td></tr><tr><td style="text-align: left">rfqSzCcy</td><td style="text-align: left">String</td><td style="text-align: left">报价的币种</td></tr><tr><td style="text-align: left">cnvtPx</td><td style="text-align: left">String</td><td style="text-align: left">闪兑价格，单位为计价币</td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">闪兑交易币数量</td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">闪兑计价币数量</td></tr></tbody></table>

### 闪兑交易

闪兑交易前需要先 [询价](/zh/funding-account-rest-api-estimate-quote)。

::: warning
闪兑只能使用交易账户中的资产
:::

#### 限速：10次/s

#### 限速规则：User ID

同一方向(buy/sell) 1次/5s 交易限制

#### HTTP请求

`POST /api/v5/asset/convert/trade`

> 请求示例

```
POST /api/v5/asset/convert/trade
body
{
    "baseCcy": "ETH",
    "quoteCcy": "USDT",
    "side": "buy",
    "sz": "30",
    "szCcy": "USDT",
    "quoteId": "quoterETH-USDT16461885104612381"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code>中的<code>BTC</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code>中的<code>USDT</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易方向<br><code>buy</code>：买<br><code>sell</code>：卖<br>描述的是对于<code>baseCcy</code>的交易方向</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">用户报价数量<br>报价数量应不大于预估询价中的询价数量</td></tr><tr><td style="text-align: left">szCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">用户报价币种</td></tr><tr><td style="text-align: left">clTReqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义的订单标识<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>适用于broker用户</td></tr><tr><td style="text-align: left">convertMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left"><code>0</code>：标准闪兑（默认）<br><code>1</code>：VIP大额闪兑</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "baseCcy": "ETH",
            "clTReqId": "",
            "fillBaseSz": "0.01023052",
            "fillPx": "2932.40104429",
            "fillQuoteSz": "30",
            "instId": "ETH-USDT",
            "quoteCcy": "USDT",
            "quoteId": "quoterETH-USDT16461885104612381",
            "side": "buy",
            "state": "fullyFilled",
            "tradeId": "trader16461885203381437",
            "ts": "1646188520338"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">报价ID</td></tr><tr><td style="text-align: left">clTReqId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义的订单标识</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">状态<br><code>fullyFilled</code>：交易成功<br><code>rejected</code>：交易失败</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">币对，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">baseCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易货币币种，如 <code>BTC-USDT</code>中<code>BTC</code></td></tr><tr><td style="text-align: left">quoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">计价货币币种，如 <code>BTC-USDT</code>中<code>USDT</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">交易方向<br>买：<code>buy</code> 卖：<code>sell</code></td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">成交价格，单位为计价币</td></tr><tr><td style="text-align: left">fillBaseSz</td><td style="text-align: left">String</td><td style="text-align: left">成交的交易币数量</td></tr><tr><td style="text-align: left">fillQuoteSz</td><td style="text-align: left">String</td><td style="text-align: left">成交的计价币数量</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">闪兑交易时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取闪兑交易历史

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/asset/convert/history`

> 请求示例

```
GET /api/v5/asset/convert/history
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">clTReqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义的订单标识<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为100，最大为100</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>适用于broker用户<br>如果闪兑交易带上了<code>tag</code>,查询时必须也带上此参数</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "clTReqId": "",
            "instId": "ETH-USDT",
            "side": "buy",
            "fillPx": "2932.401044",
            "baseCcy": "ETH",
            "quoteCcy": "USDT",
            "fillBaseSz": "0.01023052",
            "state": "fullyFilled",
            "tradeId": "trader16461885203381437",
            "fillQuoteSz": "30",
            "ts": "1646188520000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>tradeId</td><td>String</td><td>成交ID</td></tr><tr><td>clTReqId</td><td>String</td><td>用户自定义的订单标识</td></tr><tr><td>state</td><td>String</td><td><code>fullyFilled</code>：交易成功<br><code>rejected</code>：交易失败</td></tr><tr><td>instId</td><td>String</td><td>币对，如 <code>BTC-USDT</code></td></tr><tr><td>baseCcy</td><td>String</td><td>交易货币币种，如 <code>BTC-USDT</code>中的<code>BTC</code></td></tr><tr><td>quoteCcy</td><td>String</td><td>计价货币币种，如 <code>BTC-USDT</code>中的<code>USDT</code></td></tr><tr><td>side</td><td>String</td><td>交易方向<br>买：<code>buy</code> 卖：<code>sell</code></td></tr><tr><td>fillPx</td><td>String</td><td>成交价格，单位为计价币</td></tr><tr><td>fillBaseSz</td><td>String</td><td>成交的交易币数量</td></tr><tr><td>fillQuoteSz</td><td>String</td><td>成交的计价币数量</td></tr><tr><td>ts</td><td>String</td><td>闪兑交易时间，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取买卖交易币种

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/fiat/buy-sell/currencies`

> 请求示例

```
GET /api/v5/fiat/buy-sell/currencies
```

> 返回结果

```
{
    "code": "0",
    "data": [
        {
           "fiatCcyList":[
                {
                    "ccy": "USD"
                },
                {
                    "ccy": "EUR"
                },
                ...
            ],
            "cryptoCcyList":[
                {
                    "ccy": "BTC"
                },
                ...
            ],
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fiatCcyList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">法币列表</td></tr><tr><td style="text-align: left">&gt;ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">cryptoCcyList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">加密货币列表</td></tr><tr><td style="text-align: left">&gt;ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>USD</code></td></tr></tbody></table>

::: tip
此功能目前仅对巴哈马机构用户开放。
:::

### 获取买卖交易币对

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/fiat/buy-sell/currency-pair`

> 请求示例

```
GET /api/v5/fiat/buy-sell/currency-pair?fromCcy=USD&toCcy=BTC
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">卖出币种，如 <code>USD</code></td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">买入币种，如 <code>BTC</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "side": "buy",
            "fromCcy": "USD",
            "toCcy": "BTC",
            "singleTradeMax": "1",
            "singleTradeMin": "0.01",
            "fixedPxRemainingDailyQuota": "", 
            "fixedPxDailyLimit": "", 
            "paymentMethods":["balance"]
        }
    ],
    "msg": ""
}

{
    "code": "0",
    "data": [
        {
            "side": "sell",
            "fromCcy": "BTC",
            "toCcy": "USD",
            "singleTradeMax": "1",
            "singleTradeMin": "0.01",
            "fixedPxRemainingDailyQuota": "", 
            "fixedPxDailyLimit": "", 
            "paymentMethods":["balance"]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>side</td><td>String</td><td>交易方向<br><code>buy</code>: 使用法币购买加密货币/法币<br><code>sell</code>: 将加密货币出售为加密货币/法币<br>未来可能同时支持双向交易，以逗号分隔，如 <code>buy,sell</code></td></tr><tr><td>fromCcy</td><td>String</td><td>卖出币种，如 <code>USD</code></td></tr><tr><td>toCcy</td><td>String</td><td>买入币种，如 <code>BTC</code></td></tr><tr><td>singleTradeMax</td><td>String</td><td>单笔交易最大数量，单位为 <code>fromCcy</code></td></tr><tr><td>singleTradeMin</td><td>String</td><td>单笔交易最小数量，单位为 <code>fromCcy</code></td></tr><tr><td>fixedPxDailyLimit</td><td>String</td><td>固定价格每日限额<br>仅适用于法币间交易，否则返回空字符串<br>当<code>side</code> = <code>buy</code>时，单位为 <code>fromCcy</code><br>当<code>side</code> = <code>sell</code>时，单位为 <code>toCcy</code></td></tr><tr><td>fixedPxRemainingDailyQuota</td><td>String</td><td>固定价格剩余每日限额<br>仅适用于法币间交易，否则返回空字符串<br>当<code>side</code> = <code>buy</code>时，单位为 <code>fromCcy</code><br>当<code>side</code> = <code>sell</code>时，单位为 <code>toCcy</code></td></tr><tr><td>paymentMethods</td><td>Array of strings</td><td>支持的支付方式<br><code>balance</code><br>例如：["balance"]</td></tr></tbody></table>

::: tip
此功能目前仅对巴哈马机构用户开放。
:::

### 获取买卖交易报价

#### 限速：10次/s

#### 限速规则：User ID

#### 限速：1次/5s

#### 限速规则：Instrument ID

#### HTTP 请求

`POST /api/v5/fiat/buy-sell/quote`

> 请求示例

```
# 卖出USD买入0.1 BTC
POST /api/v5/fiat/buy-sell/quote
body
{
    "side":"buy",
    "fromCcy": "USD",
    "toCcy": "BTC",
    "rfqAmt": "0.1",
    "rfqCcy": "BTC"
}

# 卖出30 USD买入BTC
POST /api/v5/fiat/buy-sell/quote
body
{
    "side":"buy",
    "fromCcy": "USD",
    "toCcy": "BTC",
    "rfqAmt": "30",
    "rfqCcy": "USD"
}

# 卖出BTC买入30 USD
POST /api/v5/fiat/buy-sell/quote
body
{
    "side":"sell",
    "fromCcy": "BTC",
    "toCcy": "USD",
    "rfqAmt": "30",
    "rfqCcy": "USD"
}

# 卖出0.1 BTC买入USD
POST /api/v5/fiat/buy-sell/quote
body
{
    "side":"sell",
    "fromCcy": "BTC",
    "toCcy": "USD",
    "rfqAmt": "0.1",
    "rfqCcy": "BTC"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易方向<br><code>buy</code>: 法币买入加密货币<br><code>sell</code>: 加密货币卖出法币</td></tr><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">卖出币种</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">买入币种</td></tr><tr><td style="text-align: left">rfqAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价数量</td></tr><tr><td style="text-align: left">rfqCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价币种</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "quoteId": "quoterBTC-USD16461885104612381",
            "fromCcy": "USD",
            "toCcy": "BTC",
            "rfqAmt": "30",
            "rfqCcy": "USD",
            "quotePx": "2932.40104429",
            "quoteCcy": "USD",
            "quoteFromAmt": "30",
            "quoteToAmt": "30",
            "quoteTime": "1646188510461",
            "ttlMs": "10000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>quoteId</td><td>String</td><td>报价ID</td></tr><tr><td>side</td><td>String</td><td>交易方向<br><code>buy</code>: 使用法币购买加密货币/法币<br><code>sell</code>: 将加密货币出售为加密货币/法币</td></tr><tr><td>fromCcy</td><td>String</td><td>卖出币种，如 <code>USD</code></td></tr><tr><td>toCcy</td><td>String</td><td>买入币种，如 <code>BTC</code></td></tr><tr><td>rfqAmt</td><td>String</td><td>询价数量</td></tr><tr><td>rfqCcy</td><td>String</td><td>询价币种</td></tr><tr><td>quotePx</td><td>String</td><td>报价价格</td></tr><tr><td>quoteCcy</td><td>String</td><td>报价价格单位<br>如 <code>USD</code></td></tr><tr><td>quoteFromAmt</td><td>String</td><td>报价数量，单位为 <code>fromCcy</code></td></tr><tr><td>quoteToAmt</td><td>String</td><td>报价数量，单位为 <code>toCcy</code></td></tr><tr><td>quoteTime</td><td>String</td><td>报价生成时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>ttlMs</td><td>String</td><td>报价有效期，单位为毫秒<br>如 <code>10000</code> 表示报价仅10秒内有效</td></tr></tbody></table>

::: tip
此功能目前仅对巴哈马机构用户开放。
:::

### 买卖交易

#### 限速：1次/5s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/fiat/buy-sell/trade`

> 请求示例

```
# 卖出30 USD买入BTC
POST /api/v5/fiat/buy-sell/trade
body
{
    "clOrdId":"123456",
    "side":"sell",
    "fromCcy": "USD",
    "toCcy": "BTC",
    "rfqAmt": "30",
    "rfqCcy": "USD",
    "paymentMethod":"balance",
    "quoteId": "quoterETH-USDT16461885104612381"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">报价ID<br>从获取买卖交易报价API获取</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易方向<br><code>buy</code>: 使用法币购买加密货币/法币<br><code>sell</code>: 将加密货币出售为加密货币/法币<br>必须与报价请求一致</td></tr><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">卖出币种<br>必须与报价请求一致</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">买入币种<br>必须与报价请求一致</td></tr><tr><td style="text-align: left">rfqAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价数量<br>必须与报价请求一致</td></tr><tr><td style="text-align: left">rfqCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">询价币种<br>必须与报价请求一致</td></tr><tr><td style="text-align: left">paymentMethod</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">支付方式<br><code>balance</code></td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">用户自定义的订单标识<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ordId": "1234",
            "clOrdId": "",
            "quoteId": "quoterBTC-USD16461885104612381",
            "side":"buy",
            "fromCcy": "USD",
            "toCcy": "BTC",
            "rfqAmt": "30",
            "rfqCcy": "USD",
            "fillPx": "2932.40104429",
            "fillQuoteCcy": "USD",
            "fillFromAmt": "30",
            "fillToAmt": "0.01",
            "cTime": "1646188510461"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>用户自定义的订单标识</td></tr><tr><td>quoteId</td><td>String</td><td>报价ID</td></tr><tr><td>state</td><td>String</td><td>交易状态<br><code>processing</code>：处理中<br><code>completed</code>：已完成<br><code>failed</code>：失败</td></tr><tr><td>side</td><td>String</td><td>交易方向<br><code>buy</code>: 使用法币购买加密货币/法币<br><code>sell</code>: 将加密货币出售为加密货币/法币</td></tr><tr><td>fromCcy</td><td>String</td><td>卖出币种</td></tr><tr><td>toCcy</td><td>String</td><td>买入币种</td></tr><tr><td>rfqAmt</td><td>String</td><td>询价数量</td></tr><tr><td>rfqCcy</td><td>String</td><td>询价币种</td></tr><tr><td>fillPx</td><td>String</td><td>成交价格，单位为报价币种</td></tr><tr><td>fillQuoteCcy</td><td>String</td><td>成交价格报价币种<br>如 <code>USD</code></td></tr><tr><td>fillFromAmt</td><td>String</td><td>卖出数量，单位为 <code>fromCcy</code></td></tr><tr><td>fillToAmt</td><td>String</td><td>买入数量，单位为 <code>toCcy</code></td></tr><tr><td>cTime</td><td>String</td><td>请求时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
此功能目前仅对巴哈马机构用户开放。
:::

### 获取买卖交易历史

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/fiat/buy-sell/history`

> 请求示例

```
GET /api/v5/fiat/buy-sell/history
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义的订单标识<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易状态<br><code>processing</code>：处理中<br><code>completed</code>：已完成<br><code>failed</code>：失败</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为100，最大为100</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ordId": "1234",
            "clOrdId": "",
            "quoteId": "quoterBTC-USD16461885104612381",
            "state":"completed",
            "side":"buy",
            "fromCcy": "USD",
            "toCcy": "BTC",
            "rfqAmt": "30",
            "rfqCcy": "USD",
            "fillPx": "2932.40104429",
            "fillQuoteCcy": "USD",
            "fillFromAmt": "30",
            "fillToAmt": "0.01",
            "cTime": "1646188510461",
            "uTime": "1646188510461"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>String</td><td>订单ID</td></tr><tr><td>clOrdId</td><td>String</td><td>用户自定义的订单标识</td></tr><tr><td>quoteId</td><td>String</td><td>报价ID</td></tr><tr><td>state</td><td>String</td><td>交易状态<br><code>processing</code>：处理中<br><code>completed</code>：已完成<br><code>failed</code>：失败</td></tr><tr><td>fromCcy</td><td>String</td><td>卖出币种</td></tr><tr><td>toCcy</td><td>String</td><td>买入币种</td></tr><tr><td>rfqAmt</td><td>String</td><td>询价数量</td></tr><tr><td>rfqCcy</td><td>String</td><td>询价币种</td></tr><tr><td>fillPx</td><td>String</td><td>成交价格，单位为报价币种</td></tr><tr><td>fillQuoteCcy</td><td>String</td><td>成交价格报价币种<br>如 <code>USD</code></td></tr><tr><td>fillFromAmt</td><td>String</td><td>成交数量，单位为 <code>fromCcy</code></td></tr><tr><td>fillToAmt</td><td>String</td><td>成交数量，单位为 <code>toCcy</code></td></tr><tr><td>cTime</td><td>String</td><td>请求时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>uTime</td><td>String</td><td>更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
此功能目前仅对巴哈马机构用户开放。
:::

## WebSocket

### 充值信息频道

当发起充值或者充值状态发生变化时会触发消息推送。  
支持母账户或者子账户的订阅  

*   如果是母账户订阅，可以同时接受母账户与子账户的充值信息的推送  
    
*   如果是子账户订阅，则仅支持子账户充值信息的推送  
    

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [
        {
            "channel": "deposit-info"
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
            "channel": "deposit-info"
        }
    ]
    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>deposit-info</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>币种名称，如 <code>BTC</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "deposit-info"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"deposit-info\""}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>deposit-info</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "deposit-info",
        "uid": "289320****60975104"
    },
    "data": [{
        "actualDepBlkConfirm": "0",
        "amt": "1",
        "areaCodeFrom": "",
        "ccy": "USDT",
        "chain": "USDT-TRC20",
        "depId": "88165462",
        "from": "",
        "fromWdId": "",
        "pTime": "1674103661147",
        "state": "0",
        "subAcct": "test",
        "to": "TEhFAqpuHa3LY*****8ByNoGnrmexeGMw",
        "ts": "1674103661123",
        "txId": "bc5376817*****************dbb0d729f6b",
        "uid": "289320****60975104"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名<br><code>deposit-info</code></td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; uid</td><td>String</td><td>(产生数据者的）用户标识</td></tr><tr><td>&gt; subAcct</td><td>String</td><td>子账户名称<br>如果是母账户产生的数据，该字段返回""</td></tr><tr><td>&gt; pTime</td><td>String</td><td>推送时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>&gt; chain</td><td>String</td><td>币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td>&gt; amt</td><td>String</td><td>充值数量</td></tr><tr><td>&gt; from</td><td>String</td><td>充值账户，仅展示内部账户的转账地址（手机号和邮箱将做脱敏处理），不展示区块链充值地址</td></tr><tr><td>&gt; areaCodeFrom</td><td>String</td><td>如果<code>from</code>为手机号，该字段为该手机号的区号</td></tr><tr><td>&gt; to</td><td>String</td><td>到账地址</td></tr><tr><td>&gt; txId</td><td>String</td><td>区块转账哈希记录</td></tr><tr><td>&gt; ts</td><td>String</td><td>充值记录创建时间，Unix 时间戳的毫秒数格式，如 <code>1655251200000</code></td></tr><tr><td>&gt; state</td><td>String</td><td>充值状态<br><code>0</code>：等待确认<br><code>1</code>：确认到账<br><code>2</code>：充值成功<br><code>8</code>：因该币种暂停充值而未到账，恢复充值后自动到账<br><code>11</code>：命中地址黑名单<br><code>12</code>：账户或充值被冻结<br><code>13</code>：子账户充值拦截<br><code>14</code>：KYC限额</td></tr><tr><td>&gt; depId</td><td>String</td><td>充值记录 ID</td></tr><tr><td>&gt; fromWdId</td><td>String</td><td>内部转账发起者提币申请 ID<br>如果该笔充值来自于内部转账，则该字段展示内部转账发起者的提币申请 ID，其他情况返回""</td></tr><tr><td>&gt; actualDepBlkConfirm</td><td>String</td><td>最新的充币网络确认数</td></tr></tbody></table>

### 提币信息频道

当发起提币或者提币状态发生变化时会触发消息推送。  
支持母账户或者子账户的订阅  

*   如果是母账户订阅，可以同时接受母账户与子账户的提币信息的推送  
    
*   如果是子账户订阅，则仅支持子账户提币信息的推送  
    

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [
        {
            "channel": "withdrawal-info"
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
            "channel": "withdrawal-info"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td>请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>withdrawal-info</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>币种名称，如 <code>BTC</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "withdrawal-info"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"withdrawal-info\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必填</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td>订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>频道名<br><code>withdrawal-info</code></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td>错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "withdrawal-info",
        "uid": "289320*****0975104"
    },
    "data": [{
        "addrEx": null,
        "amt": "2",
        "areaCodeFrom": "",
        "areaCodeTo": "",
        "ccy": "USDT",
        "chain": "USDT-TRC20",
        "clientId": "",
        "fee": "0.8",
        "feeCcy": "USDT",
        "from": "",
        "memo": "",
        "nonTradableAsset": false,
        "note": "",
        "pTime": "1674103268578",
        "pmtId": "",
        "state": "0",
        "subAcct": "test",
        "tag": "",
        "to": "TN8CKTQMnpWfT******8KipbJ24ErguhF",
        "toAddrType": "1",
        "ts": "1674103268472",
        "txId": "",
        "uid": "289333*****1101696",
        "wdId": "63754560"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种名称，如 <code>BTC</code></td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; uid</td><td>String</td><td>(产生数据者的）用户标识</td></tr><tr><td>&gt; subAcct</td><td>String</td><td>子账户名称<br>如果是母账户产生的数据，该字段返回""</td></tr><tr><td>&gt; pTime</td><td>String</td><td>推送时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt; chain</td><td>String</td><td>币种链信息<br>有的币种下有多个链，必须要做区分，如<code>USDT</code>下有<code>USDT-ERC20</code>，<code>USDT-TRC20</code>多个链</td></tr><tr><td>&gt; nonTradableAsset</td><td>String</td><td>是否为不可交易资产<br><code>true</code>：不可交易资产，<code>false</code>：可交易资产</td></tr><tr><td>&gt; amt</td><td>String</td><td>数量</td></tr><tr><td>&gt; ts</td><td>String</td><td>提币申请时间，Unix 时间戳的毫秒数格式，如 <code>1655251200000</code></td></tr><tr><td>&gt; from</td><td>String</td><td>提币账户<br>可以是<code>邮箱</code>/<code>手机号</code>/<code>子账户名</code></td></tr><tr><td>&gt; areaCodeFrom</td><td>String</td><td>如果<code>from</code>为手机号，该字段为该手机号的区号</td></tr><tr><td>&gt; to</td><td>String</td><td>收币地址</td></tr><tr><td>&gt; areaCodeTo</td><td>String</td><td>如果<code>to</code>为手机号，该字段为该手机号的区号</td></tr><tr><td>&gt; toAddrType</td><td>String</td><td>地址类型<br><code>1</code>: 钱包地址、邮箱、手机号、登录账户名<br><code>2</code>: UID</td></tr><tr><td>&gt; tag</td><td>String</td><td>部分币种提币需要标签</td></tr><tr><td>&gt; pmtId</td><td>String</td><td>部分币种提币需要此字段（payment_id）</td></tr><tr><td>&gt; memo</td><td>String</td><td>部分币种提币需要此字段</td></tr><tr><td>&gt; addrEx</td><td>Object</td><td>提币地址备注。如币种TONCOIN的提币地址备注标签名为comment,则该字段返回：{'comment':'123456'}</td></tr><tr><td>&gt; txId</td><td>String</td><td>提币哈希记录<br>内部转账该字段返回""</td></tr><tr><td>&gt; fee</td><td>String</td><td>提币手续费数量</td></tr><tr><td>&gt; feeCcy</td><td>String</td><td>提币手续费币种，如 <code>USDT</code></td></tr><tr><td>&gt; state</td><td>String</td><td>提币状态<br><br><li>阶段1：等待提币</li><code>17</code>：钱包地址正等待国际转账规则认证<br><code>10</code>：等待划转<br><code>0</code>：等待提币<br><code>4</code>/<code>5</code>/<code>6</code>/<code>8</code>/<code>9</code>/<code>12</code>：等待客服审核<br><code>7</code>：审核通过<br><br><li>阶段2：提币处理中（适用于链上提币，内部转账无此阶段）</li><code>1</code>：正在将您的交易广播到链上<br><code>15</code>：交易待确认<br><code>16</code>：根据当地法律法规，您的提币最多可能需要 24 小时才能到账<br><code>-3</code>：撤销中<br><br><li>最终阶段</li><code>-2</code>：已撤销<br><code>-1</code>：失败<br><code>2</code>：提币成功</td></tr><tr><td>&gt; wdId</td><td>String</td><td>提币申请ID</td></tr><tr><td>&gt; clientId</td><td>String</td><td>客户自定义ID</td></tr><tr><td>&gt; note</td><td>String</td><td>备注信息</td></tr></tbody></table>
