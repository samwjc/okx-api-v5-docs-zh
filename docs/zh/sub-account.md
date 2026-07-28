---
title: 子账户
outline: deep
---

`子账户`功能模块下的API接口需要身份验证。

## REST API

### 查看子账户列表

仅适用于母账户

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/users/subaccount/list`

> 请求示例

```
GET /api/v5/users/subaccount/list
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看子账户列表
result = subAccountAPI.get_subaccount_list()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">enable</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户状态<br><code>true</code>: 正常使用 <code>false</code>: 冻结</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为子账户创建时间戳，Unix时间戳为毫秒数格式</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为子账户创建时间戳，Unix时间戳为毫秒数格式</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "canTransOut": false,
            "enable": true,
            "frozenFunc": [
            ],
            "gAuth": false,
            "label": "D456DDDLx",
            "mobile": "",
            "subAcct": "D456DDDL",
            "ts": "1659334756000",
            "type": "1",
            "uid": "3400***********7413",
            "subAcctLv": "1",
            "firstLvSubAcct": "D456DDDL",
            "ifDma": false
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">子账户类型<br><code>1</code>：普通子账户<br><code>2</code>：资管子账户<br><code>5</code>：托管交易子账户 - Copper<br><code>9</code>：资管交易子账户 - Copper<br><code>12</code>：托管交易子账户 - Komainu</td></tr><tr><td style="text-align: left">enable</td><td style="text-align: left">Boolean</td><td style="text-align: left">子账户状态<br><code>true</code>：正常使用 <code>false</code>：冻结（全局）</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">子账户备注</td></tr><tr><td style="text-align: left">mobile</td><td style="text-align: left">String</td><td style="text-align: left">子账户绑定手机号</td></tr><tr><td style="text-align: left">gAuth</td><td style="text-align: left">Boolean</td><td style="text-align: left">子账户是否开启的登录时的谷歌验证<br><code>true</code>：已开启<br><code>false</code>：未开启</td></tr><tr><td style="text-align: left">frozenFunc</td><td style="text-align: left">Array of strings</td><td style="text-align: left">被冻结的功能<br><code>trading</code>：交易<br><code>convert</code>：闪兑<br><code>transfer</code>：母子账户间资金划转<br><code>withdrawal</code>：提币<br><code>deposit</code>：充值<br><code>flexible_loan</code>：活期借币</td></tr><tr><td style="text-align: left">canTransOut</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否可以主动转出<br><code>true</code>：可以转出<br><code>false</code>：不可转出</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">子账户创建时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">subAcctLv</td><td style="text-align: left">String</td><td style="text-align: left">子账户层级<br><code>1</code>: 一级子账号<br><code>2</code>: 二级子账户</td></tr><tr><td style="text-align: left">firstLvSubAcct</td><td style="text-align: left">String</td><td style="text-align: left">一级子账号<br>对于 subAcctLv: 1, firstLvSubAcct 与 subAcct 相等。<br>对于 subAcctLv: 2, subAcct 属于 firstLvSubAcct。</td></tr><tr><td style="text-align: left">ifDma</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为 DMA 经济商子账号。<br><code>true</code>: DMA 经济商子账号。<br><code>false</code>: 非 DMA 经济商子账号。</td></tr></tbody></table>

### 创建子账户

仅适用于母账户，且母账户APIKey必须绑定IP。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/users/subaccount/create-subaccount`

> 请求示例

```
POST /api/v5/users/subaccount/create-subaccount
body
{
    "subAcct": "subAccount002",
    "type": "1",
    "label": "123456"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称，支持6-20位字母和数字组合（区分大小写，不支持空格符号）</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户类型<br><code>1</code>：普通子账户<br><code>5</code>：托管交易子账户 - Copper<br><code>12</code>：托管交易子账户 - Komainu</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API Key的备注，支持6-32位字母（区分大小写），数字，或者特殊字符如: *</td></tr><tr><td style="text-align: left">pwd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">子账户登录密码，仅 KYB 账户必填<br>您的密码必须满足以下条件：<br>长度为 8 ~ 32 个字符。<br>1 个小写字母 (a-z)<br>1 个大写字母 (A-Z)<br>1 个数字<br>1 个符号，如：！@ # $ %</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "label": "123456",
            "subAcct": "subAccount002",
            "ts": "1744875304520",
            "uid": "698827017768230914"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">子账户的备注</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">子账户 ID</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">创建时间</td></tr></tbody></table>

### 创建子账户的API Key

仅适用于母账户，且母账户APIKey必须绑定IP。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/users/subaccount/apikey`

> 请求示例

```
POST /api/v5/users/subaccount/apikey
body
{
    "subAcct":"panpanBroker2",
    "label":"broker3",
    "passphrase": "******",
    "perm":"trade"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称，支持6-20位字母和数字组合（区分大小写，不支持空格符号）</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API Key的备注</td></tr><tr><td style="text-align: left">passphrase</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API Key密码，8-32位字母数字组合，至少包含一个数字、一个大写字母、一个小写字母、一个特殊字符</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">API Key权限<br><code>read_only</code>：读取<br><code>trade</code>：交易</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">绑定ip地址，多个ip用半角逗号隔开，最多支持20个ip<br><font color="red"><b>安全性考虑，推荐绑定IP</b></font><br><font color="red"><b>未绑定IP且拥有交易或提币权限的API key，将在闲置14天之后自动删除。(模拟盘的API key不会被删除)</b></font></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "subAcct": "test-1",
        "label": "v5",
        "apiKey": "******",
        "secretKey": "******",
        "passphrase": "******",
        "perm": "read_only,trade",
        "ip": "1.1.1.1,2.2.2.2",
        "ts": "1597026383085"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">APIKey的备注</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">API公钥</td></tr><tr><td style="text-align: left">secretKey</td><td style="text-align: left">String</td><td style="text-align: left">API的私钥</td></tr><tr><td style="text-align: left">passphrase</td><td style="text-align: left">String</td><td style="text-align: left">APIKey的密码</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">APIKey权限</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">APIKey绑定的ip地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">创建时间</td></tr></tbody></table>

### 查询子账户的API Key

仅适用于母账户

#### 限速：20次/2秒

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/users/subaccount/apikey`

> 请求示例

```
GET /api/v5/users/subaccount/apikey?subAcct=panpanBroker2
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">API的公钥</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "label":"v5",
            "apiKey":"arg13sdfgs",
            "perm":"read_only,trade",
            "ip":"1.1.1.1,2.2.2.2",
            "ts":"1597026383085"
        },
        {
            "label":"v5.1",
            "apiKey":"arg13sdfgs",
            "perm":"read_only",
            "ip":"1.1.1.1,2.2.2.2",
            "ts":"1597026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">API Key的备注</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">API Key公钥</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">API Key权限<br>read_only：读取<br>trade ：交易</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">API Key绑定的ip地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">创建时间</td></tr></tbody></table>

### 重置子账户的APIKey

仅适用于母账户，且母账户APIKey必须绑定IP。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/users/subaccount/modify-apikey`

> 请求示例

```
POST /api/v5/users/subaccount/modify-apikey
body
{
    "subAcct":"yongxu",
    "apiKey":"******"
    "ip":"1.1.1.1"
}
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 重置子账户的APIKey
result = subAccountAPI.reset_subaccount_apikey(
    subAcct="hahawang1",
    apiKey="",
    ip=""
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户API的公钥</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户APIKey的备注，如果填写该字段，则该字段会被重置</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户APIKey权限<br><code>read_only</code>：读取<br><code>trade</code>：交易<br>多个权限用半角逗号隔开。<br>如果填写该字段，则该字段会被重置。</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户APIKey绑定ip地址，多个ip用半角逗号隔开，最多支持20个ip。<br>如果填写该字段，那该字段会被重置。<br>如果ip传""，则表示解除IP绑定。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "subAcct": "yongxu",
        "label": "v5",
        "apiKey": "******",
        "perm": "read,trade",
        "ip": "1.1.1.1",
        "ts": "1597026383085"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">APIKey的备注</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">API公钥</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">APIKey权限</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">APIKey绑定的ip地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">创建时间</td></tr></tbody></table>

### 删除子账户的API Key

仅适用于母账户，且母账户APIKey必须绑定IP。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/users/subaccount/delete-apikey`

> 请求示例

```
POST /api/v5/users/subaccount/delete-apikey
body
{
    "subAcct":"test00001",
    "apiKey":"******"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API的公钥</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "subAcct": "test00001"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr></tbody></table>

### 获取子账户交易账户余额

获取子账户交易账户余额（适用于母账户）

#### 限速：6次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/subaccount/balances`

> 请求示例

```
GET /api/v5/account/subaccount/balances?subAcct=test1
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取子账户交易账户余额
result = subAccountAPI.get_account_balance(
    subAcct="hahawang1"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adjEq": "101.46752000000001",
            "availEq": "",
            "borrowFroz": "0",
            "delta": "0",
            "deltaLever": "0",
            "deltaNeutralStatus": "0",
            "details": [
                {
                    "autoLendStatus": "off",
                    "autoLendMtAmt": "0",
                    "accAvgPx": "",
                    "availBal": "101.5",
                    "availEq": "101.5",
                    "borrowFroz": "0",
                    "cashBal": "101.5",
                    "ccy": "USDT",
                    "clSpotInUseAmt": "",
                    "crossLiab": "0",
                    "colRes": "0",
                    "collateralEnabled": false,
                    "collateralRestrict": false,
                    "colBorrAutoConversion": "0",
                    "disEq": "101.46752000000001",
                    "eq": "101.5",
                    "eqUsd": "101.46752000000001",
                    "fixedBal": "0",
                    "frozenBal": "0",
                    "frpType": "0",
                    "imr": "",
                    "interest": "0",
                    "isoEq": "0",
                    "isoLiab": "0",
                    "isoUpl": "0",
                    "liab": "0",
                    "maxLoan": "1015.0000000000001",
                    "maxSpotInUse": "",
                    "mgnRatio": "",
                    "mmr": "",
                    "notionalLever": "",
                    "openAvgPx": "",
                    "ordFrozen": "0",
                    "rewardBal": "",
                    "smtSyncEq": "0",
                    "spotBal": "",
                    "spotCopyTradingEq": "0",
                    "spotInUseAmt": "",
                    "spotIsoBal": "0",
                    "spotUpl": "",
                    "spotUplRatio": "",
                    "stgyEq": "0",
                    "totalPnl": "",
                    "totalPnlRatio": "",
                    "twap": "0",
                    "uTime": "1663854334734",
                    "upl": "0",
                    "uplLiab": "0"
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
            "ordFroz": "0",
            "totalEq": "101.46752000000001",
            "uTime": "1739332269934",
            "upl": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>uTime</td><td>String</td><td>账户信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>totalEq</td><td>String</td><td>美金层面权益</td></tr><tr><td>isoEq</td><td>String</td><td>美金层面逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>adjEq</td><td>String</td><td>美金层面有效保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>availEq</td><td>String</td><td>账户美金层面可用保证金，排除因总质押借币上限而被限制的币种<br>适用于<code>跨币种保证金模式/组合保证金模式</code></td></tr><tr><td>ordFroz</td><td>String</td><td>美金层面全仓挂单占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>imr</td><td>String</td><td>美金层面占用保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>mmr</td><td>String</td><td>美金层面维持保证金<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>borrowFroz</td><td>String</td><td>账户美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td>mgnRatio</td><td>String</td><td>美金层面维持保证金率<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsd</td><td>String</td><td>以美金价值为单位的持仓数量，即仓位美金价值<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForBorrow</td><td>String</td><td>借币金额（美元价值）<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForSwap</td><td>String</td><td>永续合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForFutures</td><td>String</td><td>交割合约持仓美元价值<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>notionalUsdForOption</td><td>String</td><td>期权持仓美元价值<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>upl</td><td>String</td><td>账户层面全仓未实现盈亏（美元单位）<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>delta</td><td>String</td><td>Delta (USD)</td></tr><tr><td>deltaLever</td><td>String</td><td>Delta权益比率<br>deltaLever = delta/totalEq</td></tr><tr><td>deltaNeutralStatus</td><td>String</td><td>Delta 风险状态<br><code>0</code>: 普通<br><code>1</code>: 限制划转<br><code>2</code>: 仅支持降低 Delta - 相同基础货币的现货、交割和永续合约视为同一标的资产。同一标的资产内，仅能新下一笔降低 Delta 值的订单，且下单时不应存在其他挂单。如果触发此限制，且您的账户 Delta 大于 500,000 USD，您的所有限价、市价、高级限价单挂单将被撤销。</td></tr><tr><td>details</td><td>Array of objects</td><td>各币种资产详细信息</td></tr><tr><td>&gt; ccy</td><td>String</td><td>币种</td></tr><tr><td>&gt; eq</td><td>String</td><td>币种总权益</td></tr><tr><td>&gt; cashBal</td><td>String</td><td>币种余额</td></tr><tr><td>&gt; uTime</td><td>String</td><td>币种余额信息的更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>&gt; isoEq</td><td>String</td><td>币种逐仓仓位权益<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; availEq</td><td>String</td><td>可用保证金<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; disEq</td><td>String</td><td>美金层面币种折算权益</td></tr><tr><td>&gt; fixedBal</td><td>String</td><td>抄底宝、逃顶宝功能的币种冻结金额</td></tr><tr><td>&gt; availBal</td><td>String</td><td>可用余额</td></tr><tr><td>&gt; frozenBal</td><td>String</td><td>币种占用金额</td></tr><tr><td>&gt; ordFrozen</td><td>String</td><td>挂单冻结数量<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code></td></tr><tr><td>&gt; liab</td><td>String</td><td>币种负债额<br>值为正数，如 "21625.64"<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; upl</td><td>String</td><td>未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; uplLiab</td><td>String</td><td>由于仓位未实现亏损导致的负债<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; crossLiab</td><td>String</td><td>币种全仓负债额<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; isoLiab</td><td>String</td><td>币种逐仓负债额<br>适用于<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; rewardBal</td><td>String</td><td>体验金余额</td></tr><tr><td>&gt; mgnRatio</td><td>String</td><td>币种全仓维持保证金率，衡量账户内某项资产风险的指标<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; imr</td><td>String</td><td>币种维度全仓占用保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; mmr</td><td>String</td><td>币种维度全仓维持保证金<br>适用于<code>合约模式</code>且有全仓仓位时</td></tr><tr><td>&gt; interest</td><td>String</td><td>计息，应扣未扣利息<br>值为正数，如 <code>9.01</code><br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; twap</td><td>String</td><td>当前负债币种触发自动换币的风险<br>0、1、2、3、4、5其中之一，数字越大代表您的负债币种触发自动换币概率越高<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; frpType</td><td>String</td><td>自动换币类型<br><code>0</code>：未发生自动换币<br><code>1</code>：基于用户的自动换币<br><code>2</code>：基于平台借币限额的自动换币<br><br>当twap&gt;=1时返回1或2代表自动换币风险类型，适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; maxLoan</td><td>String</td><td>币种最大可借<br>适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code> 的全仓</td></tr><tr><td>&gt; eqUsd</td><td>String</td><td>币种权益美金价值</td></tr><tr><td>&gt; borrowFroz</td><td>String</td><td>币种美金层面潜在借币占用保证金<br>仅适用于<code>现货模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code>。在其他账户模式下为""。</td></tr><tr><td>&gt; notionalLever</td><td>String</td><td>币种杠杆倍数<br>适用于<code>合约模式</code></td></tr><tr><td>&gt; stgyEq</td><td>String</td><td>策略权益</td></tr><tr><td>&gt; isoUpl</td><td>String</td><td>逐仓未实现盈亏<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; spotInUseAmt</td><td>String</td><td>现货对冲占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; clSpotInUseAmt</td><td>String</td><td>用户自定义现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; maxSpotInUse</td><td>String</td><td>系统计算得到的最大可能现货占用数量<br>适用于<code>组合保证金模式</code></td></tr><tr><td>&gt; spotIsoBal</td><td>String</td><td>现货逐仓余额<br>仅适用于现货带单/跟单<br>适用于<code>现货模式</code>/<code>合约模式</code></td></tr><tr><td>&gt; smtSyncEq</td><td>String</td><td>合约智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td>&gt; spotCopyTradingEq</td><td>String</td><td>现货智能跟单权益<br>默认为0，仅适用于跟单人。</td></tr><tr><td>&gt; spotBal</td><td>String</td><td>现货余额 ，单位为 币种，比如 BTC。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; openAvgPx</td><td>String</td><td>现货开仓成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; accAvgPx</td><td>String</td><td>现货累计成本价 单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; spotUpl</td><td>String</td><td>现货未实现收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; spotUplRatio</td><td>String</td><td>现货未实现收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; totalPnl</td><td>String</td><td>现货累计收益，单位 USD。 <a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; totalPnlRatio</td><td>String</td><td>现货累计收益率。<a href="https://www.okx.com/zh-hans/help/i-introduction-of-spot">详情</a></td></tr><tr><td>&gt; colRes</td><td>String</td><td>平台维度质押限制状态<br><code>0</code>：限制未触发<br><code>1</code>：限制未触发，但该币种接近平台质押上限<br><code>2</code>：限制已触发。该币种不可用作新订单的保证金，这可能会导致下单失败。但它仍会被计入账户有效保证金，保证金率不会收到影响。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td>&gt; colBorrAutoConversion</td><td>String</td><td>基于平台质押借币限额的自动换币风险指标。分为1-5多个等级，数字越大，触发自动换币的可能性越大。默认值为0，表示当前无风险。5表示该用户正在进行自动换币，4代表该用户即将被进行自动换币，1/2/3表示存在自动换币风险。<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code><br>当某币种的全平台质押借币量超出平台总上限一定比例时，对于质押该币种且借币量较大的用户，平台将通过自动换币降低质押借币风险。请减少该币种的质押数量或偿还负债，以降低风险。<br>更多详情，请参阅<a href="https://www.okx.com/zh-hans/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">平台总质押借币上限说明</a>。</td></tr><tr><td>&gt; collateralRestrict</td><td>Boolean</td><td><del>平台维度的质押借币限制<br><code>true</code><br><code>false</code></del>（已弃用，请使用colRes）</td></tr><tr><td>&gt; collateralEnabled</td><td>Boolean</td><td><code>true</code>：质押币<br><code>false</code>：非质押币<br>适用于`跨币种保证金模式</td></tr><tr><td>&gt; colBorrAutoConversion</td><td>String</td><td>表示当某个币种的抵押借贷达到平台限制且用户交易账户持有该币种时，强制还款的指标<br>分为5档，从1到5，数字越小代表强制还款强度越弱。默认为0，表示当前无强制还款风险；5代表用户当前正经历强制还款。<br>适用于<code>现货模式</code>/<code>合约模式</code>/<code>跨币种保证金模式</code>/<code>组合保证金模式</code></td></tr><tr><td>&gt; autoLendStatus</td><td>String</td><td>自动借出状态<br><code>unsupported</code>：该币种不支持自动借出<br><code>off</code>：自动借出功能关闭<br><code>pending</code>：自动借出功能开启但未匹配<br><code>active</code>：自动借出功能开启且已匹配</td></tr><tr><td>&gt; autoLendMtAmt</td><td>String</td><td>自动借出已匹配量<br>当 autoLendStatus 为 <code>unsupported/off/pending</code> 时返回 0<br>当 autoLendStatus 为 <code>active</code> 时返回已匹配量</td></tr></tbody></table>

::: tip
当前账户等级下无效字段返回""
:::

### 获取子账户资金账户余额

获取子账户资金账户余额（适用于母账户）

#### 限速：6次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/subaccount/balances`

> 请求示例

```
GET /api/v5/asset/subaccount/balances?subAcct=test1
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 获取子账户资金账户余额
result = subAccountAPI.get_funding_balance(
    subAcct="hahawang1"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

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

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">bal</td><td style="text-align: left">String</td><td style="text-align: left">余额</td></tr><tr><td style="text-align: left">frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">冻结余额（不可用）</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用余额</td></tr></tbody></table>

### 获取子账户最大可转余额

获取子账户最大可转余额（适用于母账户）。不指定币种会返回所有拥有的币种资产可划转数量。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/account/subaccount/max-withdrawal`

> 请求示例

```
GET /api/v5/account/subaccount/max-withdrawal?subAcct=test1
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>subAcct</td><td>String</td><td>是</td><td>子账户名称</td></tr><tr><td>ccy</td><td>String</td><td>否</td><td>币种，如 <code>BTC</code><br>支持多币种查询（不超过20个），币种之间半角逗号分隔</td></tr></tbody></table>

> 返回结果

```
{
   "code":"0",
   "data":[
      {
         "ccy":"BTC",
         "maxWd":"3",
         "maxWdEx":"",
         "spotOffsetMaxWd":"3",
         "spotOffsetMaxWdEx":""
      },
      {
         "ccy":"ETH",
         "maxWd":"15",
         "maxWdEx":"",
         "spotOffsetMaxWd":"15",
         "spotOffsetMaxWdEx":""
      },
      {
         "ccy":"USDT",
         "maxWd":"10600",
         "maxWdEx":"",
         "spotOffsetMaxWd":"10600",
         "spotOffsetMaxWdEx":""
      }
   ],
   "msg":""
}
```

#### Response Parameters

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ccy</td><td>String</td><td>币种</td></tr><tr><td>maxWd</td><td>String</td><td>最大可划转数量（不包含<code>跨币种保证金模式</code>借币金额）</td></tr><tr><td>maxWdEx</td><td>String</td><td>最大可划转数量（包含<code>跨币种保证金模式</code>借币金额）</td></tr><tr><td>spotOffsetMaxWd</td><td>String</td><td>现货对冲不支持借币最大可转数量<br>仅适用于<code>组合保证金模式</code></td></tr><tr><td>spotOffsetMaxWdEx</td><td>String</td><td>现货对冲支持借币的最大可转数量<br>仅适用于<code>组合保证金模式</code></td></tr></tbody></table>

### 查询子账户转账记录

仅适用于母账户。转账记录可追溯至2022年9月28日。

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/subaccount/bills`

> 请求示例

```
GET /api/v5/asset/subaccount/bills
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 查询子账户转账记录
result = subAccountAPI.bills()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 BTC</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">划转类型<br><code>0</code>：母账户转子账户<br><code>1</code>：子账户转母账户</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在billId创建时间之前(不包含)的内容，值为时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在billId创建时间之后(不包含)的内容，值为时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
      {
        "amt": "1.1",
        "billId": "89887685",
        "ccy": "USDT",
        "subAcct": "hahatest1",
        "ts": "1712560959000",
        "type": "0"
      }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">划转币种</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">划转金额</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">账单ID创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 查询托管子账户转账记录

仅适用于交易团队母账户查看托管给自己的托管子账户转账记录

#### 限速：6次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/asset/subaccount/managed-subaccount-bills`

> 请求示例

```
GET /api/v5/asset/subaccount/managed-subaccount-bills
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">划转类型<br><code>0</code>：母账户转子账户<br><code>1</code>：子账户转母账户</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">subUid</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在billId创建时间之前(不包含)的内容，值为时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在billId创建时间之后(不包含)的内容，值为时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "billId": "12344",
        "type": "1",
        "ccy": "BTC",
        "amt": "2",
        "subAcct": "test-1",
        "subUid": "xxxxxx",
        "ts": "1597026383085"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">划转币种</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">划转金额</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账单类型</td></tr><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">subUid</td><td style="text-align: left">String</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">账单ID创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 子账户间资金划转

母账户控制子账户与子账户之间划转（仅适用于母账户）

调用时，APIKey 需要有交易权限

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/asset/subaccount/transfer`

> 请求示例

```
POST /api/v5/asset/subaccount/transfer
body
{
    "ccy":"USDT",
    "amt":"1.5",
    "from":"6",
    "to":"6",
    "fromSubAccount":"test-1",
    "toSubAccount":"test-2"
}
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 子账户间资金划转
result = subAccountAPI.subAccount_transfer(
    ccy="USDT",
    amt="10",
    froms="6",
    to="6",
    fromSubAccount="test-1",
    toSubAccount="test-2"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">划转数量</td></tr><tr><td style="text-align: left">from</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转出子账户类型<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">to</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转入子账户类型<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">fromSubAccount</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转出子账户的子账户名称</td></tr><tr><td style="text-align: left">toSubAccount</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">转入子账户的子账户名称</td></tr><tr><td style="text-align: left">loanTrans</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否支持<code>跨币种保证金模式</code>或<code>组合保证金模式</code>下的借币转入/转出<br>默认<code>false</code></td></tr><tr><td style="text-align: left">omitPosRisk</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否忽略仓位风险<br>默认为<code>false</code><br>仅适用于<code>组合保证金模式</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "transId":"12345",
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">transId</td><td style="text-align: left">String</td><td style="text-align: left">划转ID</td></tr></tbody></table>

### 设置子账户主动转出权限

设置子账户转出权限（仅适用于母账户），默认可转出至母账户。

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/users/subaccount/set-transfer-out`

> 请求示例

```
POST /api/v5/users/subaccount/set-transfer-out
body
{
    "subAcct": "Test001,Test002",
    "canTransOut": true
}
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 设置子账户主动转出权限
result = subAccountAPI.set_permission_transfer_out(
    subAcct="hahawang1",
    canTransOut=False
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称，支持设置多个（不超过20个），子账户名称之间半角逗号分隔</td></tr><tr><td style="text-align: left">canTransOut</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否可以主动转出，默认为<code>true</code><br><code>false</code>：不可转出<br><code>true</code>：可以转出</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "subAcct": "Test001",
            "canTransOut": true
        },
        {
            "subAcct": "Test002",
            "canTransOut": true
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">canTransOut</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否可以主动转出<br><code>false</code>：不可转出<br><code>true</code>：可以转出</td></tr></tbody></table>

### 查看被托管的子账户列表

交易团队使用该接口查看当前托管中的子账户列表

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/users/entrust-subaccount-list`

> 请求示例

```
GET /api/v5/users/entrust-subaccount-list
```

```
import okx.SubAccount as SubAccount

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘:0 , 模拟盘：1

subAccountAPI = SubAccount.SubAccountAPI(apikey, secretkey, passphrase, False, flag)

# 查看被托管的子账户列表
result = subAccountAPI.get_entrust_subaccount_list()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
       {
          "subAcct":"test-1"
       },
       {
          "subAcct":"test-2"
       }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr></tbody></table>
