---
title: 公告
outline: deep
---

## GET / 公告

获取公告信息，以`pTime`和`businessPTime`倒序排序，公告更新不会影响排序。每页默认有 20 条公告  

请求头中 Accept-Language 设置为 en-US 时返回英文公告；设置为 zh-CN 时返回中文公告  
  

该接口鉴权是可选的：  

当 HTTP 请求头中有 OK-ACCESS-KEY 时，该接口会被视为私有接口且鉴权是必须的  
当 HTTP 请求头中没有 OK-ACCESS-KEY 时，该接口会被视为公共接口，不需要鉴权  
  

当为公共接口时，响应根据请求 IP 进行限制  
当为私有接口时，响应会根据居住国家进行限制  

#### 限速：5次/2s

#### 限速规则：User ID(私有接口时) 或者 IP (公共接口时)

#### HTTP请求

`GET /api/v5/support/announcements`

> 请求示例

```
GET /api/v5/support/announcements
```

#### 请求参数

#### 请求示例

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">annType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">公告类型。仅支持传从"GET / 公告类型" 接口返回的公告类型<br>不传时返回所有类型</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询页数.<br>默认为<code>1</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "annType": "announcements-new-listings",
                    "title": "OKX to list Virtuals Protocol (VIRTUAL) for spot trading",
                    "url": "https://www.okx.com/help/okx-to-list-virtuals-protocol-virtual-for-spot-trading",
                    "pTime": "1761620404821",
                    "businessPTime": "1761620400000"
                },
                {
                    "annType": "announcements-web3",
                    "title": "Completion of X Layer Mainnet Upgrade",
                    "url": "https://www.okx.com/help/completion-of-x-layer-mainnet-upgrade",
                    "pTime": "1761582756071",
                    "businessPTime": "1761580800000"
                },
            ],
            "totalPage": "123"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">总的页数</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">公告列表</td></tr><tr><td style="text-align: left">&gt; title</td><td style="text-align: left">String</td><td style="text-align: left">公告标题</td></tr><tr><td style="text-align: left">&gt; annType</td><td style="text-align: left">String</td><td style="text-align: left">公告类型</td></tr><tr><td style="text-align: left">&gt; businessPTime</td><td style="text-align: left">String</td><td style="text-align: left">公告页面展示时间，供用户参考。Unix 毫秒时间戳，例如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">公告首次实际发布时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。响应可能延迟约 5 分钟。</td></tr><tr><td style="text-align: left">&gt; url</td><td style="text-align: left">String</td><td style="text-align: left">公告链接</td></tr></tbody></table>

## GET / 公告类型

公共接口不需要鉴权  

响应根据请求 IP 进行限制。

#### 限速：1次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/support/announcement-types`

> 请求示例

```
GET /api/v5/support/announcement-types
```

#### 请求参数

#### 请求示例

无

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "annType": "announcements-new-listings",
            "annTypeDesc": "New listings"
        },
        {
            "annType": "announcements-delistings",
            "annTypeDesc": "Delistings"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">annType</td><td style="text-align: left">String</td><td style="text-align: left">公告类型</td></tr><tr><td style="text-align: left">annTypeDesc</td><td style="text-align: left">String</td><td style="text-align: left">公告类型描述</td></tr></tbody></table>
