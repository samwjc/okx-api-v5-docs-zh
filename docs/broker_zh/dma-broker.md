---
title: DMA 经纪商
outline: deep
---

### 获取子账户列表

#### 限速：10次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/dma/subaccount-info`

> 请求示例

```
GET /api/v5/broker/dma/subaccount-info
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询页数</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "acctLv": "1",
                    "canTransOut": false,
                    "firstLvSubAcct": "h*******5",
                    "subAcctLv": "1",
                    "enable": true,
                    "frozenFunc": [],
                    "label": "1",
                    "subAcct": "h*******5",
                    "ts": "1648521249000",
                    "uid": "289*********1696"
                }
            ],
            "page": "1",
            "totalPage": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">总的页数</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">当前页数</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array</td><td style="text-align: left">子账户列表</td></tr><tr><td style="text-align: left">&gt; subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">&gt; label</td><td style="text-align: left">String</td><td style="text-align: left">子账户的备注</td></tr><tr><td style="text-align: left">&gt; acctLv</td><td style="text-align: left">String</td><td style="text-align: left">账户模式<br><code>1</code>：现货模式<br><code>2</code>：合约模式<br><code>3</code>：跨币种保证金模式<br><code>4</code>：组合保证金模式</td></tr><tr><td style="text-align: left">&gt; enable</td><td style="text-align: left">Boolean</td><td style="text-align: left">子账户状态<br><code>true</code>：正常使用<br><code>false</code>：冻结(全局)</td></tr><tr><td style="text-align: left">&gt; frozenFunc</td><td style="text-align: left">Array of strings</td><td style="text-align: left">被冻结的功能<br><code>trading</code>：交易<br><code>convert</code>：闪兑<br><code>transfer</code>：母子账户间资金划转<br><code>withdrawal</code>：提币<br><code>deposit</code>：充值<br><code>flexible_loan</code>：活期借币</td></tr><tr><td style="text-align: left">&gt; canTransOut</td><td style="text-align: left">String</td><td style="text-align: left">是否可以主动转出（通过子账户APIKey直接转到另一个子账户下）<br><code>true</code>：可以转出<br><code>false</code>：不可转出</td></tr><tr><td style="text-align: left">&gt; firstLvSubAcct</td><td style="text-align: left">String</td><td style="text-align: left">一级子账号<br>对于 subAcctLv: 1, firstLvSubAcct 与 subAcct 相等。<br>对于 subAcctLv: 2, subAcct 属于 firstLvSubAcct。</td></tr><tr><td style="text-align: left">&gt; subAcctLv</td><td style="text-align: left">String</td><td style="text-align: left">子账户层级<br><code>1</code>: 一级子账号<br><code>2</code>: 二级子账户</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">子账户创建时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr></tbody></table>

### 获取子账户交易手续费费率

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/dma/subaccount-trade-fee`

> 请求示例

```
GET /api/v5/broker/dma/subaccount-trade-fee
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询页数</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "feeRates": [
                        {
                            "marker": "-0.0008",
                            "taker": "-0.001",
                            "type": "1"
                        },
                        {
                            "marker": "-0.0005",
                            "taker": "-0.0007",
                            "type": "2"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "3"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "4"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "5"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "6"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "7"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "8"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0003",
                            "type": "9"
                        }
                    ],
                    "firstLvSubAcct": "subaccount111ad",
                    "subAcctLv": "1",
                    "subAcct": "subaccount111ad",
                    "ts": "1658287703000",
                    "uid": "335748406955877155"
                }
            ],
            "page": "1",
            "totalPage": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">总的页数</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">当前页数</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array</td><td style="text-align: left">子账户列表</td></tr><tr><td style="text-align: left">&gt; subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">子账户UID</td></tr><tr><td style="text-align: left">&gt; firstLvSubAcct</td><td style="text-align: left">String</td><td style="text-align: left">一级子账号<br>对于 subAcctLv: 1, firstLvSubAcct 与 subAcct 相等。<br>对于 subAcctLv: 2, subAcct 属于 firstLvSubAcct。</td></tr><tr><td style="text-align: left">&gt; subAcctLv</td><td style="text-align: left">String</td><td style="text-align: left">子账户层级<br><code>1</code>: 一级子账号<br><code>2</code>: 二级子账户</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">子账户创建时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; feeRates</td><td style="text-align: left">Array</td><td style="text-align: left">手续费率信息</td></tr><tr><td style="text-align: left">&gt;&gt; type</td><td style="text-align: left">String</td><td style="text-align: left">手续费类型<br><code>1</code>：现货 USDT 交易对<br><code>2</code>：现货 稳定币/Crypto<br><code>3</code>：USDT 交割合约<br><code>4</code>：USDC 交割合约<br><code>5</code>：币本位交割合约<br><code>6</code>：USDT 永续合约<br><code>7</code>：USDC 永续合约<br><code>8</code>：币本位永续合约<br><code>9</code>：期权</td></tr><tr><td style="text-align: left">&gt;&gt; maker</td><td style="text-align: left">String</td><td style="text-align: left">挂单手续费率</td></tr><tr><td style="text-align: left">&gt;&gt; taker</td><td style="text-align: left">String</td><td style="text-align: left">吃单手续费率</td></tr></tbody></table>

::: tip
手续费率的值（如 maker/taker）：正数，代表是返佣的费率；负数，代表平台扣除的费率。
:::

### 创建子账户的APIKey

#### 限速：40次/s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/broker/dma/subaccount/apikey`

> 请求示例

```
POST /api/v5/broker/dma/subaccount/apikey
body
{
    "subAcct":"panpanBroker2",
    "label":"broker3",
    "passphrase": "******",
    "perm":"read_only,trade",
    "ip":"10.0.108.9"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称，支持6-20位字母和数字组合（区分大小写，不支持空格符号）</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API Key备注<br>不超过50位字母（区分大小写）或数字，可以是纯字母或纯数字。</td></tr><tr><td style="text-align: left">passphrase</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">API Key密码，8-32位字母数字组合，至少包含一个数字、一个大写字母、一个小写字母、一个特殊字符</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">绑定IP地址，多个IP用半角逗号隔开，最多支持20个IP<br><font color="red"><b>安全性考虑，推荐绑定IP</b></font><br><font color="red"><b>未绑定IP且拥有交易或提币权限的API key，将在闲置14天之后自动删除。(模拟盘的API key不会被删除)</b></font></td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">API Key权限<br><code>read_only</code>：读取，默认拥有，且不可去除<br><code>trade</code>：交易</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [{
        "subAcct": "panpanBroker2",
        "label": "broker3",
        "apiKey": "****",
        "secretKey": "****",
        "passphrase": "******",
        "perm": "read_only,trade",
        "ip": "10.0.108.9",
        "ts": "1597026383085"
    }]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">API Key备注</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">API公钥</td></tr><tr><td style="text-align: left">secretKey</td><td style="text-align: left">String</td><td style="text-align: left">API Key私钥</td></tr><tr><td style="text-align: left">passphrase</td><td style="text-align: left">String</td><td style="text-align: left">API Key密码</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">API Key权限</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">API Key绑定的ip地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 查询子账户的API Key

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/dma/subaccount/apikey`

> 请求示例

```
GET /api/v5/broker/dma/subaccount/apikey?subAcct=panpanBroker2
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">API Key公钥</td></tr></tbody></table>

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

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">label</td><td style="text-align: left">String</td><td style="text-align: left">API Key备注</td></tr><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">API Key公钥</td></tr><tr><td style="text-align: left">perm</td><td style="text-align: left">String</td><td style="text-align: left">API Key权限<br><code>read_only</code>：读取<br><code>trade</code>：交易</td></tr><tr><td style="text-align: left">ip</td><td style="text-align: left">String</td><td style="text-align: left">API Key绑定的IP地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">API Key创建时间</td></tr></tbody></table>

### 获取交易明细下载链接(DMA)

获取已经申请成功的成交明细下载链接，下载链接生成后，仅保留9小时有效。

#### 限速：2次/1min

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/dma/trades`

> 请求示例

```
GET /api/v5/broker/dma/trades?type=false&begin=20211109&end=20211208
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">筛选条件类型<br><code>true</code>：获取当前用户所有已生成的历史记录<br><code>false</code>：查询指定的历史记录</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">查询链接生成的起始日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/23 00:00:00</code>（包含）后的记录<br>如果type为<code>false</code>，该字段必填</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">查询链接生成的结束日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/24 00:00:00</code>（不包含）前的记录<br>如果type为<code>false</code>，该字段必填</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "beginTime": "1667232000000",
            "cTime": "1689823776000",
            "endTime": "1672502400000",
            "fileHref": "http://okg-pri-hk.oss-cn-hongkong.aliyuncs.com/okex/broker/ndbroker_reward/*/e8e1af1918f864fe99c33fdfc9b5fcdd5819173b_20221101_20230101.zip?Expires=1697617317&OSSAccessKeyId=******&Signature=******",
            "state": "finished",
            "ts": "1689823776000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fileHref</td><td style="text-align: left">String</td><td style="text-align: left">文件链接，没有数据时为 ""</td></tr><tr><td style="text-align: left">beginTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣明细的开始时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">endTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣明细的结束时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">生成下载链接的首次请求时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">下载链接生成时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">下载链接状态<br><code>finished</code>：已生成<br><code>ongoing</code>：进行中</td></tr></tbody></table>

#### 解压后CSV里的字段说明

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">subAcct</td><td style="text-align: left">子账户名称</td></tr><tr><td style="text-align: left">subAcctLv</td><td style="text-align: left">子账户等级.<br><code>1</code>：一级子账户<br><code>2</code>: 二级子账户</td></tr><tr><td style="text-align: left">firstLvSubAcct</td><td style="text-align: left">一级子账户名称.<br>对于 subAcctLv: 1, firstLvSubAcct 等于 subAcct.<br>对于 subAcctLv: 2, subAcct 属于 firstLvSubAcct</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">交易产品</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">订单id</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">最新成交 ID</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">成交金额，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">手续费，单位为USDT</td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">该笔订单最后一次成交时间</td></tr></tbody></table>

### 生成交易明细下载链接(DMA)

支持下载所有DMA子账户的全部交易明细

#### 限速：1次/1h

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/broker/dma/trades`

> 请求示例

```
POST /api/v5/broker/dma/trades
body
{
    "begin":"20210623",
    "end":"20210626"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">起始日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/23 00:00:00</code>（包含）后的记录，UTC 时区。</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">结束日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/24 00:00:00</code>（不包含）前的记录，UTC 时区。</td></tr></tbody></table>

::: tip
一次请求下载的数据时间范围begin和end的区间为180天
:::

> 返回结果

```
{
    "code": "0",
    "data": [
      {
        "result": "false",
        "ts": "1646892328000"
      }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">String</td><td style="text-align: left">是否已经存在该区间的下载链接<br><code>true</code>：已存在，可以通过"获取返佣明细下载链接"接口获取<br><code>false</code>：不存在，正在生成，请3个小时后查看下载链接</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">服务端首次收到请求的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
生成该数据需要一定的时间，请于 3 小时后查看来自"获取返佣明细下载链接(ND)"接口的文件链接；  
平台需求量较多的情况下，生成数据所需要的时间会有所延长，如果超过 5 小时，请联系客服进行反馈。
:::
