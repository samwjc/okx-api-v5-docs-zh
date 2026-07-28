---
title: 节点
outline: deep
---

节点API为节点用户提供灵活的直客查询功能，输入您直客的UID即可获得其相关信息，赋能您的节点业务增长和直客日常管理。 如需更多节点相关功能，或数据支持，请联系您的商务，我们会通过您的商务与您取得联系，提供更加完善的API支持。

## REST API

### 获取节点业绩概览

获取指定时间窗口内节点的业绩聚合指标。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/performance/summary`

> 请求示例

```
GET /api/v5/affiliate/performance/summary?periodType=total
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">periodType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">统计窗口（仅 <code>uTime</code> 不受影响）。<br><code>last_7d</code><br><code>last_30d</code><br><code>this_month</code><br><code>last_month</code><br><code>total</code><br><code>today</code><br><code>this_week</code><br><code>custom</code>：自定义窗口，需配合 <code>begin</code> 与 <code>end</code> 使用。<br>默认为 <code>total</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">自定义统计窗口起始时间，Unix时间戳的毫秒数格式。当 <code>periodType=custom</code> 时必填，需与 <code>end</code> 同时传入。包含端点。</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">自定义统计窗口结束时间，Unix时间戳的毫秒数格式。当 <code>periodType=custom</code> 时必填，需与 <code>begin</code> 同时传入。包含端点。</td></tr></tbody></table>

当 `periodType=custom` 时，需同时传 `begin` 和 `end`，仅传一个会返回 `50014`。  
其他 `periodType` 值使用服务端预设窗口，与之同时传入的 `begin` / `end` 将被忽略。  
`periodType` / `begin` / `end` 仅作用于 `inviteeCnt`、`depAmt`、`details.*` 等汇总字段，`uTime` 始终返回最新数据快照时间，与窗口无关。

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "uTime": "1777541513000",
            "inviteeCnt": "102",
            "depAmt": "1756.287846940199989393",
            "details": [
                {
                    "commissionCategory": "SPOT",
                    "firstTraderCnt": "17",
                    "traderCnt": "17",
                    "vol": "21548.6417826825604",
                    "commission": "3.322319946747010328"
                },
                {
                    "commissionCategory": "DERIVATIVE",
                    "firstTraderCnt": "9",
                    "traderCnt": "9",
                    "vol": "94531.94802",
                    "commission": "3.25142568535855"
                },
                {
                    "commissionCategory": "BSC",
                    "firstTraderCnt": "0",
                    "traderCnt": "0",
                    "vol": "0",
                    "commission": "0"
                }
            ]
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">数据最近更新时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">inviteeCnt</td><td style="text-align: left">String</td><td style="text-align: left">直客总数。</td></tr><tr><td style="text-align: left">depAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计充值金额，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">按业务类别拆分的明细，每个类别一条。</td></tr><tr><td style="text-align: left">&gt; commissionCategory</td><td style="text-align: left">String</td><td style="text-align: left">返佣计算类别。<br><code>SPOT</code>：现货<br><code>DERIVATIVE</code>：衍生品<br><code>BSC</code>：返佣业务</td></tr><tr><td style="text-align: left">&gt; firstTraderCnt</td><td style="text-align: left">String</td><td style="text-align: left">在选定窗口内首次交易的直客数（按 <code>commissionCategory</code> 维度）。每个直客在生命周期内最多统计一次。</td></tr><tr><td style="text-align: left">&gt; traderCnt</td><td style="text-align: left">String</td><td style="text-align: left">选定窗口内在该 <code>commissionCategory</code> 下产生交易的直客数。按窗口统计。</td></tr><tr><td style="text-align: left">&gt; vol</td><td style="text-align: left">String</td><td style="text-align: left">选定窗口内该 <code>commissionCategory</code> 下的交易量，单位为 <code>USDT</code>。按窗口统计——区别于 <code>/invitee/list</code>、<code>/sub-affiliate/list</code> 中的 <code>totalVol</code>（生命周期累计）。</td></tr><tr><td style="text-align: left">&gt; commission</td><td style="text-align: left">String</td><td style="text-align: left">选定窗口内该 <code>commissionCategory</code> 下的返佣，单位为 <code>USDT</code>。按窗口统计——区别于其他接口中的 <code>totalCommission</code>（生命周期累计）。</td></tr></tbody></table>

### 获取被邀请人返佣信息

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/invitee/detail`

> 请求示例

```
GET /api/v5/affiliate/invitee/detail?uid=11111111
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">被邀请人UID，仅支持使用被邀请人母账号的 UID<br>返回数据中涵盖了被邀请人母账户和子账户。</td></tr></tbody></table>

> 返回结果

```
{
    "msg": "",
    "code": "0",
    "data": [
        {
            "accFee": "0",
            "affiliateCode": "HIIIIII",
            "depAmt": "0",
            "wdAmt": "0",
            "firstTradeTime": "",
            "inviteeLevel": "2",
            "inviteeRebateRate": "0.39",
            "joinTime": "1712546713000",
            "kycTime": "",
            "level": "Lv1",
            "region": "越南",
            "totalCommission": "0",
            "volMonth": "0",
            "totalVol": "0"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">inviteeLevel</td><td style="text-align: left">String</td><td style="text-align: left">被邀请人的节点层级<br>直客返回<code>2</code></td></tr><tr><td style="text-align: left">joinTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣关系建立的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">inviteeRebateRate</td><td style="text-align: left">String</td><td style="text-align: left">返佣比例(小数形式)，如 <code>0.01</code>代表<code>1%</code></td></tr><tr><td style="text-align: left">totalCommission</td><td style="text-align: left">String</td><td style="text-align: left">总返佣数量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">firstTradeTime</td><td style="text-align: left">String</td><td style="text-align: left">首次交易时间（在最近的返佣关系建立之后）<br>Unix时间戳的毫秒数格式，如 1597026383085<br>如果用户没有交易, 返回 ""</td></tr><tr><td style="text-align: left">level</td><td style="text-align: left">String</td><td style="text-align: left">当前在平台上真实交易量的用户等级，如 Lv1</td></tr><tr><td style="text-align: left">depAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计充值金额，单位为 USDT<br>如果没有充值, 返回 0</td></tr><tr><td style="text-align: left">wdAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计提现金额，单位为 USDT<br>如果没有提现, 返回 0</td></tr><tr><td style="text-align: left">volMonth</td><td style="text-align: left">String</td><td style="text-align: left">当月累计交易量，单位为 USDT<br>如果没有交易, 返回 0</td></tr><tr><td style="text-align: left">totalVol</td><td style="text-align: left">String</td><td style="text-align: left">生命周期累计交易量，单位为 USDT<br>如果没有交易, 返回 0</td></tr><tr><td style="text-align: left">accFee</td><td style="text-align: left">String</td><td style="text-align: left">累计交易手续费，单位为 USDT<br>如果没有交易手续费，返回 0</td></tr><tr><td style="text-align: left">kycTime</td><td style="text-align: left">String</td><td style="text-align: left">KYC2 认证时间. Unix时间戳的毫秒数格式，且精确到天<br>如果没有通过 KYC2, 返回 ""</td></tr><tr><td style="text-align: left">region</td><td style="text-align: left">String</td><td style="text-align: left">国家或地区，如"英国"</td></tr><tr><td style="text-align: left">affiliateCode</td><td style="text-align: left">String</td><td style="text-align: left">节点邀请码</td></tr></tbody></table>

### 获取直客列表

分页获取直客列表，包含交易统计与 KYC 信息。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/invitee/list`

> 请求示例

```
GET /api/v5/affiliate/invitee/list?page=1&kycStatus=verified
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">1 起始的页码，非数字回退为 <code>1</code>。默认为 <code>1</code>。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每页数量，限定在 <code>[1, 100]</code>。默认为 <code>100</code>。</td></tr><tr><td style="text-align: left">periodType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">统计窗口。<br><code>last_7d</code><br><code>last_30d</code><br><code>this_month</code><br><code>last_month</code><br><code>total</code><br><code>today</code><br><code>this_week</code><br><code>custom</code>：自定义窗口，需配合 <code>begin</code> 与 <code>end</code> 使用。</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">自定义统计窗口起始时间，Unix时间戳的毫秒数格式。当 <code>periodType=custom</code> 时必填，需与 <code>end</code> 同时传入。包含端点。</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">自定义统计窗口结束时间，Unix时间戳的毫秒数格式。当 <code>periodType=custom</code> 时必填，需与 <code>begin</code> 同时传入。包含端点。</td></tr><tr><td style="text-align: left">keyword</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">按直客 UID 或渠道名搜索。</td></tr><tr><td style="text-align: left">commissionCategory</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返佣计算类别。<br><code>SPOT</code><br><code>DERIVATIVE</code><br><code>BSC</code></td></tr><tr><td style="text-align: left">orderBy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排序字段。<br><code>cTime</code><br><code>depAmt</code><br><code>vol</code><br><code>fee</code><br><code>rebate</code><br>默认为 <code>cTime</code></td></tr><tr><td style="text-align: left">orderDir</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排序方向。<br><code>asc</code><br><code>desc</code><br>默认为 <code>desc</code></td></tr><tr><td style="text-align: left">kycStatus</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">KYC 状态。<br><code>unverified</code>：未通过<br><code>verified</code>：至少通过 KYC2</td></tr><tr><td style="text-align: left">subAffiliateUid</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">按指定二级节点（外部 UID）筛选其直客。</td></tr></tbody></table>

当 `periodType=custom` 时，需同时传 `begin` 和 `end`，仅传一个会返回 `50014`。  
其他 `periodType` 值使用服务端预设窗口，与之同时传入的 `begin` / `end` 将被忽略。`begin` 与 `end` 区间不得超过 90 天，`begin` 不得早于当前时间 180 天前。

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "totalPage": "5",
    "data": [
        {
            "uid": "835449167911924693",
            "country": "CN",
            "joinTime": "1777448564000",
            "firstTradeTime": "",
            "channelName": "X2UWA2T89",
            "rebateRate": "0.1600",
            "feeTierRank": "0",
            "kycStatus": "verified",
            "kycTime": "1777448563000",
            "depAmt": "0.0000000000",
            "totalVol": "0.0000000000",
            "totalFee": "0.0000000000",
            "totalCommission": "0.0000000000",
            "isCompliant": true
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">当前过滤条件与 <code>limit</code> 下的总页数，与 <code>data</code> 在响应中同级。</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">String</td><td style="text-align: left">直客的外部 UID。</td></tr><tr><td style="text-align: left">country</td><td style="text-align: left">String</td><td style="text-align: left">直客所在地的 ISO 3166-1 alpha-2 国家/地区码，如 <code>KR</code>、<code>CN</code>。未设置时返回空字符串。</td></tr><tr><td style="text-align: left">joinTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣关系建立时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">firstTradeTime</td><td style="text-align: left">String</td><td style="text-align: left">首次交易时间，Unix时间戳的毫秒数格式。如未交易，返回 <code>""</code>。</td></tr><tr><td style="text-align: left">channelName</td><td style="text-align: left">String</td><td style="text-align: left">注册时使用的节点渠道名。</td></tr><tr><td style="text-align: left">rebateRate</td><td style="text-align: left">String</td><td style="text-align: left">直客在当前返佣规则下的实际返佣比例（小数形式），如 <code>0.1000</code> 表示 <code>10%</code>。</td></tr><tr><td style="text-align: left">feeTierRank</td><td style="text-align: left">String</td><td style="text-align: left">跨类别手续费等级排名整数（<code>0</code> 最低，<code>13</code> 最高）。不区分常规/VIP——分类标签请使用 <a href="zh.html#affiliate-rest-api-get-the-invitee-39-s-detail">获取被邀请人返佣信息</a> 中的 <code>level</code>。</td></tr><tr><td style="text-align: left">kycStatus</td><td style="text-align: left">String</td><td style="text-align: left">KYC 状态。<br><code>unverified</code><br><code>verified</code></td></tr><tr><td style="text-align: left">kycTime</td><td style="text-align: left">String</td><td style="text-align: left">KYC2 认证时间，Unix时间戳的毫秒数格式。如未通过 KYC2，返回 <code>""</code>。</td></tr><tr><td style="text-align: left">depAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计充值金额，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalVol</td><td style="text-align: left">String</td><td style="text-align: left">累计交易量，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalFee</td><td style="text-align: left">String</td><td style="text-align: left">累计交易手续费，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalCommission</td><td style="text-align: left">String</td><td style="text-align: left">来自该直客的累计返佣，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">isCompliant</td><td style="text-align: left">Boolean</td><td style="text-align: left">该直客是否符合区域合规要求。<br><code>true</code>：无限制<br><code>false</code>：因 KYC 主体或司法辖区受限（如制裁地区）</td></tr></tbody></table>

### 获取邀请链接列表

分页获取节点的邀请链接，包括返佣比例与统计数据。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/link/list`

> 请求示例

```
GET /api/v5/affiliate/link/list
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">1 起始的页码，非数字回退为 <code>1</code>。默认为 <code>1</code>。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每页数量，限定在 <code>[1, 100]</code>。默认为 <code>100</code>。</td></tr><tr><td style="text-align: left">linkType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">链接类型筛选。<br><code>standard</code>：常规节点邀请链接<br><code>co_inviter</code>：联合邀请人共享链接</td></tr><tr><td style="text-align: left">linkStatus</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">链接状态。<br><code>normal</code><br><code>abnormal</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "totalPage": "1",
    "data": [
        {
            "channelId": "78295211",
            "channelName": "78295211",
            "joinLink": "https://okx.com/join/78295211",
            "linkType": "standard",
            "inviterCommissionRate": "0.2900",
            "coInviterCommissionRate": "",
            "inviteeDiscountRate": "0.0100",
            "inviteeCnt": "1",
            "traderCnt": "1",
            "totalCommission": "2.656307",
            "commission24h": "0.5",
            "cTime": "1773739123000",
            "isDefault": true,
            "linkStatus": "normal"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">当前过滤条件与 <code>limit</code> 下的总页数，与 <code>data</code> 在响应中同级。</td></tr><tr><td style="text-align: left">channelId</td><td style="text-align: left">String</td><td style="text-align: left">渠道/链接唯一 ID。</td></tr><tr><td style="text-align: left">channelName</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义的链接名称。</td></tr><tr><td style="text-align: left">joinLink</td><td style="text-align: left">String</td><td style="text-align: left">可分享的邀请 URL。</td></tr><tr><td style="text-align: left">linkType</td><td style="text-align: left">String</td><td style="text-align: left">链接类型。<br><code>standard</code>：常规节点邀请链接<br><code>co_inviter</code>：联合邀请人共享链接</td></tr><tr><td style="text-align: left">inviterCommissionRate</td><td style="text-align: left">String</td><td style="text-align: left">父级邀请人（链接所有者）的返佣比例，小数形式。</td></tr><tr><td style="text-align: left">coInviterCommissionRate</td><td style="text-align: left">String</td><td style="text-align: left">联合邀请人的返佣比例，小数形式。常规链接为空字符串。</td></tr><tr><td style="text-align: left">inviteeDiscountRate</td><td style="text-align: left">String</td><td style="text-align: left">该链接配置的直客返佣比例模板（小数形式），适用于通过该链接注册的直客。</td></tr><tr><td style="text-align: left">inviteeCnt</td><td style="text-align: left">String</td><td style="text-align: left">通过该链接邀请的直客数。</td></tr><tr><td style="text-align: left">traderCnt</td><td style="text-align: left">String</td><td style="text-align: left">已交易的直客数。</td></tr><tr><td style="text-align: left">totalCommission</td><td style="text-align: left">String</td><td style="text-align: left">累计返佣，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">commission24h</td><td style="text-align: left">String</td><td style="text-align: left">滚动近 24 小时返佣，单位为 <code>USDT</code>。不受 <code>periodType</code> / <code>begin</code> / <code>end</code> 过滤影响。</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">链接创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">isDefault</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为默认链接。</td></tr><tr><td style="text-align: left">linkStatus</td><td style="text-align: left">String</td><td style="text-align: left">链接状态。<br><code>normal</code><br><code>abnormal</code></td></tr></tbody></table>

### 获取联合邀请人链接列表

获取当前用户作为联合邀请人的链接列表。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/co-inviter/list`

> 请求示例

```
GET /api/v5/affiliate/co-inviter/list
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">1 起始的页码，非数字回退为 <code>1</code>。默认为 <code>1</code>。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每页数量，限定在 <code>[1, 100]</code>。默认为 <code>100</code>。</td></tr><tr><td style="text-align: left">linkStatus</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">链接状态。<br><code>normal</code><br><code>abnormal</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "totalPage": "1",
    "data": [
        {
            "channelId": "31075853",
            "channelName": "MXCUS",
            "joinLink": "https://okx.com/join/MXCUS",
            "inviterCommissionRate": "0.0000",
            "coInviterCommissionRate": "0.1400",
            "inviteeDiscountRate": "0.1600",
            "parUserName": "12****23",
            "coUserName": "***",
            "isCompliant": true,
            "isDefault": false,
            "totalCommission": "0.032111",
            "commission24h": "0",
            "inviteeCnt": "1",
            "traderCnt": "1",
            "clickCnt": "1",
            "totalFee": "0",
            "cTime": "1773739123000",
            "channelAssessmentStatus": "valid",
            "inviterChannelStatus": "valid",
            "coInviterChannelStatus": "valid",
            "linkStatus": "normal"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">当前过滤条件与 <code>limit</code> 下的总页数，与 <code>data</code> 在响应中同级。</td></tr><tr><td style="text-align: left">channelId</td><td style="text-align: left">String</td><td style="text-align: left">渠道 ID。</td></tr><tr><td style="text-align: left">channelName</td><td style="text-align: left">String</td><td style="text-align: left">渠道名。</td></tr><tr><td style="text-align: left">joinLink</td><td style="text-align: left">String</td><td style="text-align: left">可分享的邀请 URL。</td></tr><tr><td style="text-align: left">inviterCommissionRate</td><td style="text-align: left">String</td><td style="text-align: left">父级邀请人的返佣比例，小数形式。</td></tr><tr><td style="text-align: left">coInviterCommissionRate</td><td style="text-align: left">String</td><td style="text-align: left">联合邀请人的返佣比例，小数形式（即调用方，因为该接口下调用方是联合邀请人）。</td></tr><tr><td style="text-align: left">inviteeDiscountRate</td><td style="text-align: left">String</td><td style="text-align: left">该链接配置的直客返佣比例模板（小数形式），适用于通过该链接注册的直客。</td></tr><tr><td style="text-align: left">parUserName</td><td style="text-align: left">String</td><td style="text-align: left">合作节点的用户名（部分脱敏，非 UID）。</td></tr><tr><td style="text-align: left">coUserName</td><td style="text-align: left">String</td><td style="text-align: left">联合邀请人的用户名占位，恒为完全脱敏的 <code>***</code>（PII 完全隐藏，非 UID）。</td></tr><tr><td style="text-align: left">isCompliant</td><td style="text-align: left">Boolean</td><td style="text-align: left">联合邀请人是否符合区域合规要求。<br><code>true</code>：无限制<br><code>false</code>：因 KYC 主体或司法辖区受限</td></tr><tr><td style="text-align: left">note</td><td style="text-align: left">String</td><td style="text-align: left">节点对该渠道的可选备注（自由文本，可能为 <code>""</code>）。</td></tr><tr><td style="text-align: left">isDefault</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否为默认联合邀请人链接。</td></tr><tr><td style="text-align: left">totalCommission</td><td style="text-align: left">String</td><td style="text-align: left">累计返佣，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">commission24h</td><td style="text-align: left">String</td><td style="text-align: left">滚动近 24 小时返佣，单位为 <code>USDT</code>。不受 <code>periodType</code> / <code>begin</code> / <code>end</code> 过滤影响。</td></tr><tr><td style="text-align: left">inviteeCnt</td><td style="text-align: left">String</td><td style="text-align: left">直客数。</td></tr><tr><td style="text-align: left">traderCnt</td><td style="text-align: left">String</td><td style="text-align: left">至少完成一次交易的直客数。</td></tr><tr><td style="text-align: left">clickCnt</td><td style="text-align: left">String</td><td style="text-align: left">邀请链接被点击次数。</td></tr><tr><td style="text-align: left">totalFee</td><td style="text-align: left">String</td><td style="text-align: left">累计服务费，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">链接创建时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">channelAssessmentStatus</td><td style="text-align: left">String</td><td style="text-align: left">渠道考核结果（交易+邀请指标）。<br><code>valid</code>：所有考核指标达标<br><code>not_reach_trade</code>：交易指标未达标<br><code>not_reach_invite</code>：邀请指标未达标<br><code>not_reach_both</code>：两项均未达标</td></tr><tr><td style="text-align: left">inviterChannelStatus</td><td style="text-align: left">String</td><td style="text-align: left">父级邀请人渠道合规状态。<br><code>valid</code>：父级邀请人合规<br><code>identity_invalid</code>：父级邀请人身份已失效<br><code>level_downgraded</code>：父级邀请人等级已降为 0</td></tr><tr><td style="text-align: left">coInviterChannelStatus</td><td style="text-align: left">String</td><td style="text-align: left">联合邀请人渠道合规状态（身份 × 考核 复合）。<br><code>valid</code><br><code>identity_invalid</code><br><code>not_reach_assessment</code><br><code>identity_invalid_and_not_reach_assessment</code></td></tr><tr><td style="text-align: left">linkStatus</td><td style="text-align: left">String</td><td style="text-align: left">链接状态。<br><code>normal</code><br><code>abnormal</code></td></tr></tbody></table>

### 获取二级节点列表

分页获取当前用户下的二级节点。

#### 限速：3次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/affiliate/sub-affiliate/list`

> 请求示例

```
GET /api/v5/affiliate/sub-affiliate/list
```

#### 请求参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>是否必须</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">1 起始的页码，非数字回退为 <code>1</code>。默认为 <code>1</code>。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">每页数量，限定在 <code>[1, 100]</code>。默认为 <code>100</code>。</td></tr><tr><td style="text-align: left">keyword</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">按二级节点 UID 搜索。</td></tr><tr><td style="text-align: left">commissionCategory</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返佣计算类别。<br><code>SPOT</code><br><code>DERIVATIVE</code><br><code>BSC</code></td></tr><tr><td style="text-align: left">orderBy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排序字段。<br><code>cTime</code><br><code>depAmt</code><br><code>vol</code><br><code>fee</code><br><code>rebate</code><br>默认按 <code>joinTime</code> 倒序（最近加入的优先）。</td></tr><tr><td style="text-align: left">orderDir</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排序方向。<br><code>asc</code><br><code>desc</code><br>默认为 <code>desc</code></td></tr></tbody></table>

该接口返回的是生命周期累计数据。  
排序具有稳定性：当 `orderBy` 出现并列时，按 `subAffiliateUid` 升序作为次序。可安全分页大数据集，不会丢行或重复。

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "totalPage": "1",
    "data": [
        {
            "subAffiliateUid": "668418489887292061",
            "country": "CN",
            "joinTime": "1773739123000",
            "subAffiliateLevel": "2",
            "commissionRate": "0.3000",
            "isCompliant": true,
            "inviteeCnt": "8",
            "traderCnt": "3",
            "depAmt": "37.281133",
            "totalVol": "3618.561430",
            "totalFee": "1.628353",
            "totalCommission": "0.289847"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">当前过滤条件与 <code>limit</code> 下的总页数，与 <code>data</code> 在响应中同级。</td></tr><tr><td style="text-align: left">subAffiliateUid</td><td style="text-align: left">String</td><td style="text-align: left">二级节点的外部 UID。</td></tr><tr><td style="text-align: left">country</td><td style="text-align: left">String</td><td style="text-align: left">二级节点所在地的 ISO 3166-1 alpha-2 国家/地区码，如 <code>CN</code>。未设置时返回空字符串。</td></tr><tr><td style="text-align: left">joinTime</td><td style="text-align: left">String</td><td style="text-align: left">注册为二级节点的时间，Unix时间戳的毫秒数格式。</td></tr><tr><td style="text-align: left">subAffiliateLevel</td><td style="text-align: left">String</td><td style="text-align: left">相对调用方的层级深度。<br><code>2</code>：直接二级节点（调用方的 L1 子节点）<br><code>3</code>：间接二级节点，位于直接二级节点下一层</td></tr><tr><td style="text-align: left">commissionRate</td><td style="text-align: left">String</td><td style="text-align: left">二级节点的返佣比例，小数形式。</td></tr><tr><td style="text-align: left">isCompliant</td><td style="text-align: left">Boolean</td><td style="text-align: left">二级节点是否符合区域合规要求。<br><code>true</code>：无限制<br><code>false</code>：因 KYC 主体或司法辖区受限（如制裁地区）</td></tr><tr><td style="text-align: left">inviteeCnt</td><td style="text-align: left">String</td><td style="text-align: left">二级节点的直客数。</td></tr><tr><td style="text-align: left">traderCnt</td><td style="text-align: left">String</td><td style="text-align: left">二级节点中已交易的直客数。</td></tr><tr><td style="text-align: left">depAmt</td><td style="text-align: left">String</td><td style="text-align: left">直客累计充值金额，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalVol</td><td style="text-align: left">String</td><td style="text-align: left">直客累计交易量，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalFee</td><td style="text-align: left">String</td><td style="text-align: left">直客累计交易手续费，单位为 <code>USDT</code>。</td></tr><tr><td style="text-align: left">totalCommission</td><td style="text-align: left">String</td><td style="text-align: left">您从该二级节点直客中获得的累计返佣，单位为 <code>USDT</code>。</td></tr></tbody></table>
