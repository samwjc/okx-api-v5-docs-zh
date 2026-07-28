---
title: REST API
outline: deep
---

REST API 用于查询事件、市场、行情、订单簿、订单、成交、持仓、余额，以及提交下单、撤单、Split、Merge、Redeem 等写操作。开发者可以通过 REST API 完成完整的交易闭环：发现市场、获取 `assetId`、提交订单、查询订单状态、管理持仓并处理结算相关操作。所有接口的基础地址为 `https://www.okx.com`。

## 1\. 事件与市场

**数据结构定义**

**结果选项 OutcomeResp**

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>tokenId</td><td>string / null</td><td>条件代币合约地址；未上链前为 null</td></tr><tr><td>assetId</td><td>string / null</td><td>TradeZone 资产 ID（下单时使用）；未上链前为 null</td></tr><tr><td>name</td><td>string</td><td>结果名称，如 <code>"Yes"</code>、<code>"No"</code></td></tr><tr><td>price</td><td>string</td><td>当前价格（0–1 之间的字符串，如 "0.82"）</td></tr><tr><td>bgColor</td><td>string</td><td>按钮背景色（Hex）；体育 moneyline Yes outcome 取主队主题色；其余为 null</td></tr></tbody></table>

**市场对象 MarketResp**

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>市场中心化唯一 ID</td></tr><tr><td>marketId</td><td>string</td><td>市场在 TradeZone 中的唯一 ID（下单时使用）</td></tr><tr><td>negRisk</td><td>boolean</td><td>是否互斥市场（negRisk）</td></tr><tr><td>status</td><td>string</td><td>市场状态：<code>active</code> / <code>paused</code> / <code>settling</code> / <code>resolved</code></td></tr><tr><td>settleStage</td><td>int</td><td>结算阶段：0=未开始 1=第一轮公示 2=第一轮 dispute 3=第二轮公示 4=第二轮 dispute 5=已结算</td></tr><tr><td>question</td><td>string</td><td>完整市场问题</td></tr><tr><td>shortQuestion</td><td>string / null</td><td>缩略市场问题</td></tr><tr><td>description</td><td>string</td><td>市场描述</td></tr><tr><td>marketIcon</td><td>string / null</td><td>市场图标 URL</td></tr><tr><td>bestBid</td><td>string / null</td><td>最优买价（0–1）；无买盘时为 null</td></tr><tr><td>bestAsk</td><td>string / null</td><td>最优卖价（0–1）；无卖盘时为 null</td></tr><tr><td>lastTradePrice</td><td>string / null</td><td>最新成交价（0–1）；从未成交时为 null</td></tr><tr><td>volume</td><td>string</td><td>总交易量（xp）</td></tr><tr><td>probability</td><td>string / null</td><td>市场 Yes 概率（0–1 小数）；未上链时为 null</td></tr><tr><td>resolutionSources</td><td>string[]</td><td>结算数据来源 URL 列表</td></tr><tr><td>yesOutcome</td><td>OutcomeObject</td><td>Yes 方结果选项</td></tr><tr><td>noOutcome</td><td>OutcomeObject</td><td>No 方结果选项</td></tr><tr><td>startTime</td><td>string</td><td>market 预计开始时间（毫秒时间戳）</td></tr><tr><td>endTime</td><td>string</td><td>market 预计结束时间（毫秒时间戳）</td></tr><tr><td>resolveStartAt</td><td>string</td><td>首次进入 start_resolve 状态的时间（毫秒时间戳）</td></tr><tr><td>resolveAt</td><td>string</td><td>首次进入 resolved 状态的时间（毫秒时间戳）</td></tr></tbody></table>

**事件对象 EventResp**

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>事件中心化唯一 ID</td></tr><tr><td>eventId</td><td>string</td><td>事件在 TradeZone 中的唯一 ID</td></tr><tr><td>negRisk</td><td>boolean</td><td>是否负风险事件</td></tr><tr><td>status</td><td>string</td><td>事件状态：<code>active</code> / <code>paused</code> / <code>resolved</code></td></tr><tr><td>eventTitle</td><td>string</td><td>事件标题</td></tr><tr><td>description</td><td>string</td><td>事件描述</td></tr><tr><td>eventIcon</td><td>string / null</td><td>事件图标 URL</td></tr><tr><td>volume</td><td>string</td><td>事件内所有市场交易量之和（xp）</td></tr><tr><td>startTime</td><td>string / null</td><td>开始交易时间戳（ms）</td></tr><tr><td>endTime</td><td>string / null</td><td>停止交易时间戳（ms）</td></tr><tr><td>createdAt</td><td>string</td><td>事件创建时间戳（ms）</td></tr><tr><td>totalMarketsCount</td><td>int</td><td>事件下市场总数</td></tr><tr><td>finalOutcomesMarketId</td><td>string / null</td><td>结算后胜出市场 ID；未结算时为 null</td></tr><tr><td>markets</td><td>array&lt;MarketResp&gt;</td><td>市场列表（列表接口最多返回前 2 个；完整列表通过 <code>GET /api/v5/predictions/events/{eventId}/markets</code> 获取）</td></tr></tbody></table>

**游标分页 PaginationResp**

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>nextCursor</td><td>string / null</td><td>下一页游标；null 表示已是最后一页</td></tr><tr><td>hasMore</td><td>boolean</td><td>是否有更多数据</td></tr><tr><td>pageSize</td><td>int</td><td>本次返回数量</td></tr></tbody></table>

### 1.1 获取事件列表

获取预测市场事件列表，支持状态等多维过滤与排序。

#### HTTP请求

`GET /api/v5/predictions/events`

#### 请求参数（Query）

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>status</td><td>string</td><td>否</td><td><code>active</code></td><td>事件状态过滤：<code>active</code> / <code>resolved</code></td></tr><tr><td>sort</td><td>string</td><td>否</td><td><code>volume_24h</code></td><td>排序方式：<code>volume</code> / <code>volume_24h</code> / <code>ending_soon</code> / <code>newest</code></td></tr><tr><td>tag</td><td>string</td><td>否</td><td>-</td><td>体育标签 ID 过滤（来自 GET /api/v5/predictions/sports/tags）</td></tr><tr><td>leagueId</td><td>string</td><td>否</td><td>-</td><td>联赛 ID 过滤（来自 GET /api/v5/predictions/sports/tags/{tagId}/leagues）</td></tr><tr><td>cursor</td><td>string</td><td>否</td><td>-</td><td>分页游标，首次请求不传</td></tr><tr><td>pageSize</td><td>int</td><td>否</td><td>10</td><td>每页条数（最大 50）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "events": [
      {
        "id": "100",
        "eventId": "100",
        "negRisk": false,
        "status": "active",
        "eventTitle": "Will BTC exceed $100k by end of 2026?",
        "description": "This event tracks whether Bitcoin will cross $100,000.",
        "eventIcon": "https://cdn.example.com/events/100.png",
        "volume": "1250000.00",
        "startTime": 1700000000000,
        "endTime": 1798761600000,
        "createdAt": 1710000000000,
        "totalMarketsCount": 1,
        "finalOutcomesMarketId": null,
        "markets": [
          {
            "id": "1",
            "marketId": "1",
            "oddsType": "points",
            "negRisk": false,
            "status": "active",
            "settleStage": 0,
            "question": "Will BTC exceed $100k by end of 2026?",
            "shortQuestion": "BTC > $100k?",
            "description": "Resolves YES if BTC price exceeds $100,000 before Jan 1, 2027.",
            "marketIcon": null,
            "bestBid": "0.64",
            "bestAsk": "0.66",
            "lastTradePrice": "0.65",
            "volume": "1250000.00",
            "probability": "0.65",
            "resolutionSources": ["https://coinmarketcap.com"],
            "yesOutcome": {
              "tokenId": "0xabc...001",
              "assetId": "1",
              "name": "Yes",
              "price": "0.65",
              "finalResult": null
            },
            "noOutcome": {
              "tokenId": "0xabc...002",
              "assetId": "2",
              "name": "No",
              "price": "0.35",
              "finalResult": null
            }
          }
        ]
      }
    ],
    "pagination": {
      "nextCursor": "eyJpZCI6MTAwfQ",
      "hasMore": true,
      "pageSize": 10
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>events</td><td>array&lt;EventResp&gt;</td><td>事件列表；每个事件的 <code>markets</code> 最多返回前 2 个市场</td></tr><tr><td>pagination</td><td>PaginationResp</td><td>游标分页信息</td></tr></tbody></table>

### 1.2 获取单个事件

获取指定事件的完整信息，`markets` 字段返回该事件下所有市场（不截断）。

#### HTTP请求

`GET /api/v5/predictions/events/{eventId}`

#### 路径参数

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>eventId</td><td>string</td><td>是</td><td>事件 ID</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "id": "100",
    "eventId": "100",
    "negRisk": false,
    "status": "active",
    "eventTitle": "NBA Finals 2026 - Lakers vs Celtics",
    "description": "Who will win the 2026 NBA Championship?",
    "eventIcon": "https://cdn.example.com/events/100.png",
    "volume": "3200000.00",
    "startTime": 1748000000000,
    "endTime": 1750000000000,
    "createdAt": 1710000000000,
    "totalMarketsCount": 3,
    "finalOutcomesMarketId": null,
    "markets": [ ]
  }
}
```

返回完整 EventResp，`markets` 包含该事件下的全部市场。

### 1.3 获取市场列表

获取指定事件下的全部市场，不分页。

#### HTTP请求

`GET /api/v5/predictions/events/{eventId}/markets`

#### 路径参数

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>eventId</td><td>string</td><td>是</td><td>事件 ID</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "markets": [
      {
        "id": "1",
        "marketId": "1",
        "negRisk": false,
        "status": "active",
        "settleStage": 0,
        "question": "Will BTC exceed $100k by end of 2026?",
        "shortQuestion": "BTC > $100k?",
        "description": "Resolves YES if BTC price exceeds $100,000 before Jan 1, 2027.",
        "marketIcon": null,
        "bestBid": "0.64",
        "bestAsk": "0.66",
        "lastTradePrice": "0.65",
        "volume": "1250000.00",
        "probability": "0.65",
        "resolutionSources": ["https://coinmarketcap.com"],
        "yesOutcome": {
          "tokenId": "0xabc...001",
          "assetId": "1",
          "name": "Yes",
          "price": "0.65",
          "finalResult": null
        },
        "noOutcome": {
          "tokenId": "0xabc...002",
          "assetId": "2",
          "name": "No",
          "price": "0.35",
          "finalResult": null
        }
      }
    ]
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>markets</td><td>array&lt;MarketResp&gt;</td><td>该事件下的全部市场</td></tr></tbody></table>

### 1.4 获取单个市场

获取指定市场的详细信息。

#### HTTP请求

`GET /api/v5/predictions/markets/{marketId}`

#### 路径参数

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>marketId</td><td>string</td><td>是</td><td>市场 TradeZone ID</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "id": "1",
    "marketId": "1",
    "negRisk": false,
    "status": "resolved",
    "settleStage": 5,
    "question": "Will BTC exceed $100k by end of 2026?",
    "shortQuestion": "BTC > $100k?",
    "description": "Resolves YES if BTC price exceeds $100,000 before Jan 1, 2027.",
    "marketIcon": null,
    "bestBid": null,
    "bestAsk": null,
    "lastTradePrice": "0.98",
    "volume": "1250000.00",
    "probability": null,
    "resolutionSources": ["https://coinmarketcap.com"],
    "yesOutcome": {
      "tokenId": "0xabc...001",
      "assetId": "1",
      "name": "Yes",
      "price": "1.00",
      "finalResult": true
    },
    "noOutcome": {
      "tokenId": "0xabc...002",
      "assetId": "2",
      "name": "No",
      "price": "0.00",
      "finalResult": false
    }
  }
}
```

返回完整 MarketResp。

### 1.5 搜索事件

按关键字全文搜索事件，返回匹配的事件列表，支持游标分页。

#### HTTP请求

`GET /api/v5/predictions/events/search`

#### 请求参数（Query）

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>keyword</td><td>string</td><td>是</td><td>-</td><td>搜索关键字，匹配事件标题和描述</td></tr><tr><td>cursor</td><td>string</td><td>否</td><td>-</td><td>分页游标，首次请求不传</td></tr><tr><td>pageSize</td><td>int</td><td>否</td><td>10</td><td>每页条数（最大 50）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "events": [
      {
        "id": "100",
        "eventId": "100",
        "negRisk": false,
        "status": "active",
        "eventTitle": "Will BTC exceed $100k by end of 2026?",
        "description": "This event tracks whether Bitcoin will cross $100,000.",
        "eventIcon": "https://cdn.example.com/events/100.png",
        "volume": "1250000.00",
        "startTime": 1700000000000,
        "endTime": 1798761600000,
        "createdAt": 1710000000000,
        "totalMarketsCount": 1,
        "finalOutcomesMarketId": null,
        "markets": [
          {
            "id": "1",
            "marketId": "1",
            "oddsType": "points",
            "negRisk": false,
            "status": "active",
            "settleStage": 0,
            "question": "Will BTC exceed $100k by end of 2026?",
            "shortQuestion": "BTC > $100k?",
            "description": "Resolves YES if BTC price exceeds $100,000 before Jan 1, 2027.",
            "marketIcon": null,
            "bestBid": "0.64",
            "bestAsk": "0.66",
            "lastTradePrice": "0.65",
            "volume": "1250000.00",
            "probability": "0.65",
            "resolutionSources": ["https://coinmarketcap.com"],
            "yesOutcome": {
              "tokenId": "0xabc...001",
              "assetId": "1",
              "name": "Yes",
              "price": "0.65",
              "finalResult": null
            },
            "noOutcome": {
              "tokenId": "0xabc...002",
              "assetId": "2",
              "name": "No",
              "price": "0.35",
              "finalResult": null
            }
          }
        ]
      }
    ],
    "pagination": {
      "nextCursor": "eyJpZCI6MTAwfQ",
      "hasMore": true,
      "pageSize": 10
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>events</td><td>array&lt;EventResp&gt;</td><td>事件列表</td></tr><tr><td>pagination</td><td>PaginationResp</td><td>游标分页信息</td></tr></tbody></table>

## 2\. 价格

::: tip
**说明：** 所有接口中的 `instId` 参数均取预测市场的 `yesAssetId`，`yesAssetId` 由 prediction-market 后端进行提供。
:::

### 2.1 获取行情 Ticker

获取单个预测市场产品的最新行情信息，用于订单簿中的最新成交价展示

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>必须</th><th>说明</th></tr></thead><tbody><tr><td><code>instId</code></td><td>String</td><td>是</td><td>预测市场 yesAssetId</td></tr></tbody></table>

#### HTTP请求

`GET /api/v5/market/ticker?instId={yesAssetId}`

#### 返回参数

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [{
    "instType": "SPOT",
    "instId": "{yesAssetId}",
    "last": "0.65",
    "lastSz": "100",
    "askPx": "0.66",
    "askSz": "500",
    "bidPx": "0.64",
    "bidSz": "300",
    "open24h": "0.60",
    "high24h": "0.70",
    "low24h": "0.55",
    "vol24h": "10000",
    "volCcy24h": "6500",
    "sodUtc0": "0.62",
    "sodUtc8": "0.61",
    "ts": "1711900800000"
  }]
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>instType</code></td><td>String</td><td>产品类型</td></tr><tr><td><code>instId</code></td><td>String</td><td>产品ID</td></tr><tr><td><code>last</code></td><td>String</td><td>最新成交价</td></tr><tr><td><code>lastSz</code></td><td>String</td><td>最新成交数量</td></tr><tr><td><code>askPx</code></td><td>String</td><td>卖一价</td></tr><tr><td><code>askSz</code></td><td>String</td><td>卖一价对应数量</td></tr><tr><td><code>bidPx</code></td><td>String</td><td>买一价</td></tr><tr><td><code>bidSz</code></td><td>String</td><td>买一价对应数量</td></tr><tr><td><code>open24h</code></td><td>String</td><td>24小时开盘价</td></tr><tr><td><code>high24h</code></td><td>String</td><td>24小时最高价</td></tr><tr><td><code>low24h</code></td><td>String</td><td>24小时最低价</td></tr><tr><td><code>vol24h</code></td><td>String</td><td>24小时成交量（以张计）</td></tr><tr><td><code>volCcy24h</code></td><td>String</td><td>24小时成交量（以计价货币计）</td></tr><tr><td><code>sodUtc0</code></td><td>String</td><td>UTC 0 时开盘价</td></tr><tr><td><code>sodUtc8</code></td><td>String</td><td>UTC+8 时开盘价</td></tr><tr><td><code>ts</code></td><td>String</td><td>数据更新时间（Unix 毫秒时间戳）</td></tr></tbody></table>

### 2.2 获取 K 线数据

查询预测市场产品的历史 K 线数据，K线数据按请求的粒度分组返回，K线数据每个粒度最多可获取最近1,440条

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>必须</th><th>说明</th></tr></thead><tbody><tr><td><code>instId</code></td><td>String</td><td>是</td><td>预测市场 yesAssetId</td></tr><tr><td><code>bar</code></td><td>String</td><td>否</td><td>K 线周期，默认 <code>1m</code>。可选值：<code>1m</code> <code>3m</code> <code>5m</code> <code>15m</code> <code>30m</code> <code>1H</code> <code>2H</code> <code>4H</code> <code>6H</code> <code>12H</code> <code>1D</code> <code>1W</code> <code>1M</code></td></tr><tr><td><code>after</code></td><td>String</td><td>否</td><td>分页游标，返回该时间戳之前的数据（Unix 毫秒）</td></tr><tr><td><code>before</code></td><td>String</td><td>否</td><td>分页游标，返回该时间戳之后的数据（Unix 毫秒）</td></tr><tr><td><code>limit</code></td><td>String</td><td>否</td><td>每页数量，最大 100，默认 100</td></tr></tbody></table>

#### HTTP请求

`GET /api/v5/market/candles?instId={yesAssetId}&bar=1m&limit=100`

**返回数据**

（data 为二维数组，每条记录字段顺序如下）

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
    ["1711900800000", "0.65", "0.67", "0.63", "0.66", "2000", "1300", "1300", "1"],
    ["1711900740000", "0.63", "0.66", "0.62", "0.65", "1800", "1170", "1170", "1"]
  ]
}
```

<table><thead><tr><th>索引</th><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>0</td><td><code>ts</code></td><td>String</td><td>K 线开始时间（Unix 毫秒时间戳）</td></tr><tr><td>1</td><td><code>o</code></td><td>String</td><td>开盘价</td></tr><tr><td>2</td><td><code>h</code></td><td>String</td><td>最高价</td></tr><tr><td>3</td><td><code>l</code></td><td>String</td><td>最低价</td></tr><tr><td>4</td><td><code>c</code></td><td>String</td><td>收盘价</td></tr><tr><td>5</td><td><code>vol</code></td><td>String</td><td>成交量（以张计）</td></tr><tr><td>6</td><td><code>volCcy</code></td><td>String</td><td>成交量（以计价货币计）</td></tr><tr><td>7</td><td><code>volCcyQuote</code></td><td>String</td><td>成交量（以报价货币计）</td></tr><tr><td>8</td><td><code>confirm</code></td><td>String</td><td>K 线状态：<code>0</code> 未确认，<code>1</code> 已确认</td></tr></tbody></table>

::: tip
**分页说明：** 数据按时间倒序返回。如需翻页，取最后一条记录的 `ts` 值作为下次请求的 `after` 参数。
:::

### 2.3 获取深度数据

查询预测市场产品的买卖盘口深度快照

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>必须</th><th>说明</th></tr></thead><tbody><tr><td><code>instId</code></td><td>String</td><td>是</td><td>预测市场 yesAssetId</td></tr><tr><td><code>sz</code></td><td>String</td><td>否</td><td>深度档位数量，最大值可传400，即买卖深度共800条 不填写此参数，默认返回<code>1</code>档深度数据</td></tr></tbody></table>

#### HTTP请求

`GET /api/v5/market/pm-books?instId={yesAssetId}&sz=400`

#### 返回参数

> 返回示例

```
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "asks": [
        ["67364.1","0.45478048","5"]
      ],
      "bids": [
        ["67364","1.72315936", "17"]
      ],
      "ts": "1774943488756",
      "seqId": 74487243135
    }
  ]
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>asks</code></td><td>Array</td><td>卖盘数据，按价格<strong>从低到高</strong>排列</td></tr><tr><td><code>bids</code></td><td>Array</td><td>买盘数据，按价格<strong>从高到低</strong>排列</td></tr><tr><td><code>ts</code></td><td>String</td><td>深度快照时间（Unix 毫秒时间戳）</td></tr><tr><td><code>seqId</code></td><td>Number</td><td>订单簿的版本号，预测市场无需关心</td></tr></tbody></table>

`asks` / `bids` 数组中每条记录格式：`[价格, 数量, 订单数量]`

## 3\. 订单

### 3.1 下单

提交签名后的下单请求。开发者自行构造 calldata 并用自己的钱包私钥（ECDSA）签名，服务端校验后写入数据库并直接转发至 TradeZone（不经过 AA Wallet）。

#### HTTP请求

`POST /api/v5/predictions/orders`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "placeOrder",
    "grouping": "na",
    "orders": [{
      "assetId": "1",
      "marketType": "prediction",
      "side": "buy",
      "price": "0.65",
      "size": "100",
      "reduceOnly": false,
      "clientOrderId": "0x0197a98c91312671ca83f15ccbd5186f",
      "orderType": { "limit": { "tif": "gtc" } }
    }]
  },
  "nonce": 1708929600000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>下单动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"placeOrder"</code></td></tr><tr><td>action.grouping</td><td>string</td><td>是</td><td>固定 <code>"na"</code></td></tr><tr><td>action.orders</td><td>array</td><td>是</td><td>订单列表（每次一笔）</td></tr><tr><td>action.orders[].assetId</td><td>string</td><td>是</td><td>TradeZone 资产 ID（如 <code>"1"</code>）</td></tr><tr><td>action.orders[].marketType</td><td>string</td><td>是</td><td>固定 <code>"prediction"</code></td></tr><tr><td>action.orders[].side</td><td>string</td><td>是</td><td><code>"buy"</code> / <code>"sell"</code></td></tr><tr><td>action.orders[].price</td><td>string</td><td>是</td><td>挂单价格（如 <code>"0.65"</code>）</td></tr><tr><td>action.orders[].size</td><td>string</td><td>是</td><td>下单数量（如 <code>"100"</code>）</td></tr><tr><td>action.orders[].clientOrderId</td><td>string</td><td>是</td><td>下单clientOrderId 区分地区</td></tr><tr><td>action.orders[].reduceOnly</td><td>boolean</td><td>否</td><td>是否只减仓，默认 <code>false</code></td></tr><tr><td>action.orders[].sizeType</td><td>string</td><td>否</td><td><code>"base"</code>（默认）/ <code>"quote"</code></td></tr><tr><td>action.orders[].orderType</td><td>object</td><td>是</td><td>订单类型</td></tr><tr><td>action.orders[].orderType.limit.tif</td><td>string</td><td>是</td><td><code>"gtc"</code> / <code>"gtd"</code> / <code>"ioc"</code> / <code>"fok"</code> / <code>"alo"</code></td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒），防重放</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**TIF（Time In Force）**

<table><thead><tr><th>JSON 值</th><th>交易结构</th><th>说明</th></tr></thead><tbody><tr><td><code>"gtc"</code></td><td>"tif": "gtc"</td><td>Good-Til-Cancel，挂单直到成交或取消</td></tr><tr><td><code>"gtd"</code></td><td>"tif": { "gtd": { "expiresAfter": 1700000005000 } },</td><td>Good-Til-Date，挂单直到 expiresAfter 指定的时间过期或成交/取消</td></tr><tr><td><code>"ioc"</code></td><td>"tif": "ioc"</td><td>Immediate-Or-Cancel（即 FAK），立即尽可能成交后取消剩余。<strong>仅用于模拟市价单</strong>，需配合价格保护上/下限（<code>price</code>）</td></tr><tr><td><code>"fok"</code></td><td>"tif": "fok"</td><td>Fill-Or-Kill，全部成交或全部取消。<strong>仅用于模拟市价单</strong>，需配合价格保护上/下限（<code>price</code>）</td></tr><tr><td><code>"alo"</code></td><td>"tif": "alo"</td><td>Add-Liquidity-Only (Post-Only)，只挂 maker 单，若会立即成交则拒绝</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...789"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

### 3.2 撤销单个订单

撤销一个活跃订单。开发者自行构造撤单 calldata 并签名，服务端校验订单归属和状态后提交至 TradeZone。

#### HTTP请求

`POST /api/v5/predictions/orders/cancel`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "cancel",
    "cancels": [{
      "assetId": "1",
      "marketType": "prediction",
      "oid": "12345",
      "clientOrderId":"0x"
    }]
  },
  "nonce": 1708929600000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>撤单动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"cancel"</code></td></tr><tr><td>action.cancels</td><td>array</td><td>是</td><td>撤单列表（每次一笔）</td></tr><tr><td>action.cancels[].assetId</td><td>string</td><td>是</td><td>TradeZone 资产 ID（如 <code>"1"</code>）</td></tr><tr><td>action.cancels[].marketType</td><td>string</td><td>是</td><td>固定 <code>"prediction"</code></td></tr><tr><td>action.cancels[].oid</td><td>string</td><td>否</td><td>订单 ID与客户端ID 两个中必传一个</td></tr><tr><td>action.cancels[].clientOrderId</td><td>string</td><td>否</td><td>订单 ID与客户端ID 两个中必传一个</td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒）</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...abc"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

### 3.3 查询单个订单

查询指定订单的完整详情（活跃或历史订单均可）

#### HTTP请求

`GET /api/v5/predictions/orders/{orderId}`

#### 路径参数

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>orderId</td><td>string</td><td>是</td><td>订单 ID</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "id": "1",
    "oid": "1",
    "clientOrderId": "1",
    "marketId": "1",
    "assetId": "1",
    "side": "BUY",
    "orderType": "GTC",
    "sizeType": "BASE",
    "size": "100",
    "price": "0.65",
    "expiration": null,
    "txHash": "0xdef...789",
    "status": "ACTIVE",
    "filledSize": "40",
    "filledAmount": "26",
    "failReason": null,
    "cancelReason": null,
    "oddsType": "points",
    "createdAt": "1710000000000",
    "updatedAt": "1710000000000"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>订单 ID</td></tr><tr><td>oid</td><td>string</td><td>订单 oid</td></tr><tr><td>clientOrderId</td><td>string</td><td>订单 clientOrderId</td></tr><tr><td>marketId</td><td>string</td><td>市场 ID</td></tr><tr><td>tokenId</td><td>string</td><td>YES/NO 代币地址</td></tr><tr><td>assetId</td><td>string</td><td>TradeZone 资产 ID</td></tr><tr><td>side</td><td>string</td><td><code>BUY</code> / <code>SELL</code></td></tr><tr><td>orderType</td><td>string</td><td><code>GTC</code> / <code>GTD</code> / <code>FOK</code> / <code>IOC</code> / <code>POST_ONLY</code></td></tr><tr><td>sizeType</td><td>string</td><td><code>BASE</code> / <code>QUOTE</code></td></tr><tr><td>size</td><td>string</td><td>原始下单数量</td></tr><tr><td>price</td><td>string</td><td>挂单价格</td></tr><tr><td>expiration</td><td>string</td><td>GTD 过期时间戳（毫秒）；非 GTD 为 null</td></tr><tr><td>txHash</td><td>string</td><td>当前阶段的交易哈希</td></tr><tr><td>status</td><td>string</td><td>订单状态（见下表）</td></tr><tr><td>filledSize</td><td>string</td><td>已成交代币数量</td></tr><tr><td>filledAmount</td><td>string</td><td>已成交 xp 金额</td></tr><tr><td>failReason</td><td>string</td><td>失败原因（仅 status = <code>FAILED</code> 时有值）</td></tr><tr><td>cancelReason</td><td>string</td><td>取消原因（系统触发的取消）</td></tr><tr><td>oddsType</td><td>string</td><td>盘口类型：<code>points</code>=积分盘</td></tr><tr><td>createdAt</td><td>string</td><td>订单创建时间戳（毫秒）</td></tr><tr><td>updatedAt</td><td>string</td><td>最后更新时间戳（毫秒）</td></tr></tbody></table>

**订单状态**

<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td>PENDING_PLACE</td><td>Submitted, waiting for on-chain confirmation</td></tr><tr><td>ACTIVE</td><td>Active open order</td></tr><tr><td>PENDING_CANCEL</td><td>Cancellation submitted, waiting for on-chain confirmation</td></tr><tr><td>FILLED</td><td>Fully filled</td></tr><tr><td>PARTIALLY_FILLED</td><td>Partially filled then cancelled or expired</td></tr><tr><td>FAILED</td><td>On-chain transaction failed</td></tr><tr><td>CANCELLED</td><td>Cancelled by user or system</td></tr><tr><td>EXPIRED</td><td>GTD order expired</td></tr></tbody></table>

### 3.4 查询用户订单列表

查询当前认证用户的订单列表，支持过滤和分页。

#### HTTP请求

`GET /api/v5/predictions/orders`

#### 请求参数（Query）

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>marketId</td><td>string</td><td>否</td><td>按市场 ID 过滤</td></tr><tr><td>status</td><td>string</td><td>否</td><td><code>open</code>（PENDING_PLACE / ACTIVE / PENDING_CANCEL）、<code>closed</code>（FILLED / PARTIALLY_FILLED / CANCELLED / EXPIRED / FAILED），不传默认<code>open</code></td></tr><tr><td>cursor</td><td>string</td><td>否</td><td>分页游标</td></tr><tr><td>limit</td><td>int</td><td>否</td><td>每页条数（默认 20，最大 50）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "list": [
      {
        "id": "1",
        "oid": "1",
        "clientOrderId": "1",
        "marketId": "1",
        "assetId": "1",
        "side": "BUY",
        "orderType": "GTC",
        "sizeType": "BASE",
        "size": "100",
        "price": "0.65",
        "expiration": null,
        "txHash": "0xdef...789",
        "status": "ACTIVE",
        "filledSize": "40",
        "filledAmount": "26",
        "failReason": null,
        "cancelReason": null,
        "oddsType": "points",
        "createdAt": "1710000000000",
        "updatedAt": "1710000000000"
      }
    ],
    "nextCursor": "eyJpZCI6MTIzfQ",
    "hasNext": false
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>list[].id</td><td>string</td><td>订单 ID</td></tr><tr><td>list[].marketId</td><td>string</td><td>市场 ID</td></tr><tr><td>list[].oid</td><td>string</td><td>订单 oid</td></tr><tr><td>list[].clientOrderId</td><td>string</td><td>订单 clientOrderId</td></tr><tr><td>list[].tokenId</td><td>string</td><td>YES/NO 代币地址</td></tr><tr><td>list[].assetId</td><td>string</td><td>TradeZone 资产 ID</td></tr><tr><td>list[].side</td><td>string</td><td><code>BUY</code> / <code>SELL</code></td></tr><tr><td>list[].orderType</td><td>string</td><td><code>GTC</code> / <code>GTD</code> / <code>FOK</code> / <code>IOC</code> / <code>POST_ONLY</code></td></tr><tr><td>list[].sizeType</td><td>string</td><td><code>BASE</code> / <code>QUOTE</code></td></tr><tr><td>list[].size</td><td>string</td><td>原始下单数量</td></tr><tr><td>list[].price</td><td>string</td><td>挂单价格</td></tr><tr><td>list[].expiration</td><td>string</td><td>GTD 过期时间戳（毫秒）；非 GTD 为 null</td></tr><tr><td>list[].txHash</td><td>string</td><td>当前阶段的交易哈希</td></tr><tr><td>list[].status</td><td>string</td><td>订单状态：<code>PENDING_PLACE</code> / <code>ACTIVE</code> / <code>PENDING_CANCEL</code> / <code>FILLED</code> / <code>PARTIALLY_FILLED</code> / <code>FAILED</code> / <code>CANCELLED</code> / <code>EXPIRED</code></td></tr><tr><td>list[].filledSize</td><td>string</td><td>已成交代币数量</td></tr><tr><td>list[].filledAmount</td><td>string</td><td>已成交 pts金额</td></tr><tr><td>list[].failReason</td><td>string</td><td>失败原因（仅 status = <code>FAILED</code> 时有值）</td></tr><tr><td>list[].cancelReason</td><td>string</td><td>取消原因（系统触发的取消）</td></tr><tr><td>list[].oddsType</td><td>string</td><td>盘口类型：<code>points</code>=积分盘</td></tr><tr><td>list[].createdAt</td><td>String</td><td>订单创建时间戳（毫秒）</td></tr><tr><td>list[].updatedAt</td><td>string</td><td>最后更新时间戳（毫秒）</td></tr><tr><td>nextCursor</td><td>string</td><td>下一页游标</td></tr><tr><td>hasNext</td><td>boolean</td><td>是否有更多数据</td></tr></tbody></table>

### 3.5 撤销全部 / 指定市场订单

撤销当前认证用户的活跃订单。assetIds 为空列表时撤销全部市场订单；传入具体值时仅撤销对应资产所在市场的订单。

#### HTTP请求

`POST /api/v5/predictions/orders/cancel-all`

#### 请求体

> 请求示例（按市场撤单）

```
{
  "action": {
    "type": "cancelAll",
    "assetIds": [1, 2, 5],
    "marketType": "prediction"
  },
  "nonce": 1708929600000,
  "expiresAfter": 1708929660000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

> 请求示例（撤销全部）

```
{
  "action": {
    "type": "cancelAll",
    "assetIds": [],
    "marketType": "prediction"
  },
  "nonce": 1708929600000,
  "expiresAfter": 1708929660000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>撤单动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"cancelAll"</code></td></tr><tr><td>action.assetIds</td><td>array</td><td>是</td><td>资产 ID 列表；传空列表撤销全部订单，传具体值按对应市场撤单</td></tr><tr><td>action.marketType</td><td>string</td><td>是</td><td>市场类型，固定 <code>"prediction"</code></td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒）</td></tr><tr><td>expiresAfter</td><td>long</td><td>是</td><td>过期时间戳（毫秒）</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...abc"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

### 3.6 发送心跳

心跳机制，用于保护开发者的活跃订单。请求体携带一个预签名的 `cancelAll` action，`nonce` 设置为当前时间 + 5 分钟。服务端暂存该签名；若开发者在 5 分钟内未续期心跳，系统将自动使用该签名执行全部撤单。

开发者需持续调用此接口（建议间隔 < 5 分钟），每次用新的 `nonce`（当前时间 + 5 分钟）覆盖上一次的预签名。

#### HTTP请求

`POST /api/v5/predictions/heartbeat`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "cancelAll",
    "assetIds": [],
    "marketType": "prediction"
  },
  "nonce": 1708929900000,
  "expiresAfter": 1708929960000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>撤单动作，结构与 <code>POST /api/v5/predictions/orders/cancel-all</code> 一致</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"cancelAll"</code></td></tr><tr><td>action.assetIds</td><td>array</td><td>是</td><td>固定传空列表 <code>[]</code>，心跳触发时撤销全部订单</td></tr><tr><td>action.marketType</td><td>string</td><td>是</td><td>市场类型，固定 <code>"prediction"</code></td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>当前时间 + 5 分钟的时间戳（毫秒）</td></tr><tr><td>expiresAfter</td><td>long</td><td>是</td><td>过期时间戳（毫秒）</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "serverTimestamp": 1708929600000,
    "expireAt": 1708929900000
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>serverTimestamp</td><td>long</td><td>服务端当前时间戳（毫秒）</td></tr><tr><td>expireAt</td><td>long</td><td>本次心跳过期时间戳（毫秒）</td></tr></tbody></table>

::: tip
`nonce` = 1708929900000 即当前时间 1708929600000 + 300000（5 分钟）。
:::

**订单语义说明**

::: tip
系统会限制自成交：同一钱包地址的买卖单不会互相成交。
:::

**订单模式支持矩阵**

**支持矩阵**

<table><thead><tr><th>业务场景</th><th>sizeType</th><th>tif</th><th>size</th><th>price 语义</th><th>支持</th></tr></thead><tbody><tr><td>限价买入</td><td><code>base</code></td><td><code>gtc</code> / <code>gtd</code> / <code>ioc</code> / <code>fok</code> / <code>alo</code></td><td>用户输入 shares</td><td>用户输入限价</td><td>✅</td></tr><tr><td>限价卖出</td><td><code>base</code></td><td><code>gtc</code> / <code>gtd</code> / <code>ioc</code> / <code>fok</code> / <code>alo</code></td><td>用户输入 shares</td><td>用户输入限价</td><td>✅</td></tr><tr><td>市价买入（按数量）</td><td><code>base</code></td><td><code>ioc</code> / <code>fok</code></td><td>用户输入 shares</td><td>系统按盘口模拟生成的<strong>最差成交价</strong>（保护价）</td><td>✅</td></tr><tr><td>市价买入（按金额）</td><td><code>quote</code></td><td><code>ioc</code></td><td>用户输入名义金额（pts）</td><td>系统按盘口模拟生成的<strong>最差成交价</strong>（保护价）</td><td>✅</td></tr><tr><td>市价卖出（按数量）</td><td><code>base</code></td><td><code>ioc</code> / <code>fok</code></td><td>用户输入 shares</td><td>系统按盘口模拟生成的<strong>最差成交价</strong>（保护价）</td><td>✅</td></tr><tr><td>市价买入（按金额）+ FOK</td><td><code>quote</code></td><td><code>fok</code></td><td>—</td><td>—</td><td>❌ <strong>不支持</strong></td></tr></tbody></table>

**关键规则**

1.  **`ioc` 在预测市场中等价于业界常用的 `fak`**：能成交多少成交多少，剩余取消，不会留单。
    
2.  **`fok` 仅支持按 shares 下单**：`sizeType=quote` 与 `tif=fok` 组合会被服务端拒绝。
    
3.  **`alo`（Post Only）仅适用于限价单**：与 `sizeType=quote` 或市价单组合会被拒绝。
    
4.  **市价单不是"无保护价单"**：在下单时根据盘口模拟出 `worstPrice`，并以此作为 `price` 提交至 TradeZone。实际成交价格**不会差于 `worstPrice`**。
    
5.  **`tif=gtd` 必须传 `expiration`**：字段路径为 `action.orders[].orderType.limit.expiration`，类型为 `String`（Unix 毫秒时间戳，13 位），**绝对时间**。未传或非法时当前抛 `10001 PARAM_ERROR`。
    

**不支持组合的错误返回**

<table><thead><tr><th>触发场景</th><th>当前错误码</th></tr></thead><tbody><tr><td><code>sizeType=quote</code> 且 <code>tif=fok</code></td><td><code>10001</code> PARAM_ERROR</td></tr><tr><td><code>sizeType=quote</code> 且 <code>tif ∈ {gtc, gtd, alo}</code></td><td><code>10001</code> PARAM_ERROR</td></tr><tr><td><code>tif=gtd</code> 但未传 <code>expiration</code></td><td><code>10001</code> PARAM_ERROR</td></tr></tbody></table>

**最小下单金额与清仓例外**

**最小下单金额规则**

*   预测市场对单笔名义金额有最小值约束，1pts

**清仓例外（Sell-All Exception）**

*   用户卖出某方向持仓后，该 assetId 剩余**总持仓**（= 可用 + 冻结）为 0，视为**清仓卖出**
    
*   清仓卖出场景下，即使名义成交金额低于 1 pts，也允许提交订单。
    

**价格单位与精度规则**

**合法范围**

<table><thead><tr><th>条件</th><th>是否允许</th></tr></thead><tbody><tr><td><code>price ≤ 0</code></td><td>拒绝</td></tr><tr><td><code>price ≥ 1</code></td><td>拒绝</td></tr><tr><td><code>0 &lt; price &lt; 1</code></td><td>允许，进入精度校验</td></tr></tbody></table>

**分段精度规则**

精度按 `[0.04, 0.96]` 与区间外分两段：

<table><thead><tr><th>区间</th><th>最大小数位数</th><th>等价 cent 区间</th><th>示例（允许）</th><th>示例（拒绝）</th></tr></thead><tbody><tr><td><code>0 &lt; price &lt; 0.04</code></td><td><strong>3 位</strong></td><td><code>(0, 4)</code> cent</td><td><code>0.001</code> / <code>0.025</code> / <code>0.039</code></td><td><code>0.0125</code>（4 位）</td></tr><tr><td><code>0.04 ≤ price ≤ 0.96</code></td><td><strong>2 位</strong>（tick=0.01）</td><td><code>[4, 96]</code> cent</td><td><code>0.04</code> / <code>0.25</code> / <code>0.96</code></td><td><code>0.045</code> / <code>0.123</code> / <code>0.961</code></td></tr><tr><td><code>0.96 &lt; price &lt; 1</code></td><td><strong>3 位</strong></td><td><code>(96, 100)</code> cent</td><td><code>0.962</code> / <code>0.9875</code> / <code>0.999</code></td><td><code>0.99875</code>（4 位）</td></tr></tbody></table>

::: tip
**边界值：** `0.04` 与 `0.96` 都属于中间区间（`[0.04, 0.96]` 闭区间），适用 **2 位小数限制**。
:::

**ClientOrderId 生成规范**

`clientOrderId`（简称 cloid）是订单在链上的唯一标识。链上事件全球广播，各区域消费方通过 cloid 中的 region/env 前缀筛选出属于自己的订单。任何接入方生成的 cloid 都必须遵循本规范，否则订单会被误判归属。

**格式**

格式为 `0x{region}{env}{random}`：

<table><thead><tr><th>段</th><th>长度（字符）</th><th>内容</th><th>说明</th></tr></thead><tbody><tr><td>前缀</td><td>2</td><td><code>0x</code></td><td>固定字面量</td></tr><tr><td>region</td><td>1</td><td>1 个 hex 字符</td><td>区域编码</td></tr><tr><td>env</td><td>1</td><td>1 个 hex 字符</td><td>环境编码</td></tr><tr><td>random</td><td>30</td><td>30 个 hex 字符</td><td>随机数（小写）</td></tr></tbody></table>

总长固定 **34 字符**，全部为小写 hex（`0-9`, `a-f`）。

**region / env 编码表**

<table><thead><tr><th>region</th><th>含义</th></tr></thead><tbody><tr><td><code>0</code></td><td>HK</td></tr><tr><td><code>1</code></td><td>US</td></tr><tr><td><code>2</code></td><td>EU</td></tr></tbody></table>

<table><thead><tr><th>env</th><th>含义</th></tr></thead><tbody><tr><td><code>1</code></td><td>线上</td></tr></tbody></table>

取值都是 1 个 hex 字符，目前用到 0/1/2，后续扩展不超过 `f`（15）。

**random 生成要求**

*   **熵**：≥ 120 bit（30 个 hex = 120 bit）
*   **来源**：必须使用密码学安全或等效强度的随机源（如 UUIDv4、`crypto.randomBytes`、`secrets` 等）
*   **编码**：小写 hex，不足位高位补 0

**参考实现**

> Java（UUID 派生）

```
UUID u = UUID.randomUUID();
long hi = u.getMostSignificantBits();
long lo = u.getLeastSignificantBits();
StringBuilder sb = new StringBuilder("0x");
sb.append(Integer.toHexString(region & 0xF));
sb.append(Integer.toHexString(env & 0xF));
for (int i = 14; i >= 0; i--) {
    sb.append(Character.forDigit((int)((hi >>> (i * 4)) & 0xF), 16));
}
for (int i = 14; i >= 0; i--) {
    sb.append(Character.forDigit((int)((lo >>> (i * 4)) & 0xF), 16));
}
return sb.toString();
```

> Node.js

```
const crypto = require('crypto');
function generate(region, env) {
  const rand = crypto.randomBytes(15).toString('hex'); // 30 hex
  return `0x${region.toString(16)}${env.toString(16)}${rand}`;
}
```

```
import secrets
def generate(region: int, env: int) -> str:
    return f"0x{region:x}{env:x}{secrets.token_hex(15)}"
```

> Go

```
import (
    "crypto/rand"
    "encoding/hex"
    "fmt"
)

func Generate(region, env int) (string, error) {
    b := make([]byte, 15)
    if _, err := rand.Read(b); err != nil {
        return "", err
    }
    return fmt.Sprintf("0x%x%x%s", region, env, hex.EncodeToString(b)), nil
}
```

**服务端解析与归属判断**

接收方按以下规则判断 cloid 是否属于当前环境：

```
if cloid is null/empty
  or length < 4
  or 不以 "0x" 开头
  or cloid[2], cloid[3] 不是合法 hex 字符:
    视为 HK-预发（region=0, env=0）  ← 兜底规则
else:
    region = parse_hex(cloid[2])
    env    = parse_hex(cloid[3])
    判断是否等于当前环境的 (region, env)
```

**常见问题**

*   心跳检测： 如果运行机器人，设置心跳以在机器人断线时自动撤销所有订单。每 < 5 分钟发送一次预签名的全部撤单，详情见api文档
    
*   Nonce： 使用当前毫秒时间戳。每个 Nonce 只能使用一次。
    
*   时间戳偏差： OK-ACCESS-TIMESTAMP 与服务器时间相差不能超过 30 秒，否则返回错误码 50102。
    

## 4\. 仓位操作

### 4.1 Split（xp → YES + NO）

将 xp 分割为等量的 YES 和 NO 条件代币对。开发者自行构造 calldata 并签名，服务端校验后直接提交至 TradeZone。

#### HTTP请求

`POST /api/v5/predictions/positions/split`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "predictionSplit",
    "marketId": "1",
    "size": "100000000"
  },
  "nonce": 1708929600000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>Split 动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"predictionSplit"</code></td></tr><tr><td>action.marketId</td><td>string</td><td>是</td><td>市场 ID（如 <code>"1"</code>）</td></tr><tr><td>action.size</td><td>string</td><td>是</td><td>pts 数量（最小单位字符串，如 <code>"100000000"</code>）</td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒），防重放</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...abc"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

### 4.2 Merge（YES + NO → xp）

将等量的 YES 和 NO 条件代币合并回 xp（Split 的逆操作）。开发者自行构造 calldata 并签名，服务端校验后直接提交至 TradeZone。

#### HTTP请求

`POST /api/v5/predictions/positions/merge`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "predictionMerge",
    "marketId": "1",
    "size": "100000000"
  },
  "nonce": 1708929600000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>Merge 动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"predictionMerge"</code></td></tr><tr><td>action.marketId</td><td>string</td><td>是</td><td>市场 ID（如 <code>"1"</code>）</td></tr><tr><td>action.size</td><td>string</td><td>是</td><td>合并数量（最小单位字符串，如 <code>"100000000"</code>）</td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒），防重放</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...abc"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

### 4.3 Redeem（结算后兑换 xp）

市场结算后，用胜出的条件代币按 1:1 兑换 xp。兑换数量无需传入，默认兑换用户持有的全部胜出代币。

::: tip
市场结算后，系统会**自动**为所有持有胜出代币的用户兑换 xp（需等待一段时间）。**多数情况下无需手动调用本接口**；仅当自动兑换失败、或不想等待自动兑换期间，才需主动调用 Redeem 作为兜底。
:::

#### HTTP请求

`POST /api/v5/predictions/positions/redeem`

#### 请求体

> 请求示例

```
{
  "action": {
    "type": "predictionRedeem",
    "marketId": "1"
  },
  "nonce": 1708929600000,
  "signature": {
    "Ecdsa": {
      "r": "0x...",
      "s": "0x...",
      "v": 1
    }
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>action</td><td>object</td><td>是</td><td>Redeem 动作</td></tr><tr><td>action.type</td><td>string</td><td>是</td><td>固定 <code>"predictionRedeem"</code></td></tr><tr><td>action.marketId</td><td>string</td><td>是</td><td>市场 ID（如 <code>"1"</code>）</td></tr><tr><td>nonce</td><td>long</td><td>是</td><td>请求时间戳（毫秒），防重放</td></tr><tr><td>signature</td><td>object</td><td>是</td><td>签名对象</td></tr><tr><td>signature.Ecdsa</td><td>object</td><td>是</td><td>ECDSA 签名分量</td></tr><tr><td>signature.Ecdsa.r</td><td>string</td><td>是</td><td>签名 r 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.s</td><td>string</td><td>是</td><td>签名 s 值（<code>"0x..."</code>）</td></tr><tr><td>signature.Ecdsa.v</td><td>int</td><td>是</td><td>签名 v 值（<code>0</code> 或 <code>1</code>）</td></tr></tbody></table>

::: warning
注意：与 Split/Merge 不同，Redeem 的 action 中**没有 `size` 字段**，默认兑换全部胜出代币。
:::

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "txHash": "0xdef...abc"
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>txHash</td><td>string</td><td>TradeZone 交易哈希</td></tr></tbody></table>

## 5\. 成交历史

### 5.1 查询成交记录

查询当前认证用户的成交（Fill）记录。服务端从登录态解析 userId 并内部转换为 address 查询。

#### HTTP请求

`GET /api/v5/predictions/trades`

#### 请求参数（Query）

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>marketId</td><td>string</td><td>否</td><td>按市场 ID 过滤</td></tr><tr><td>side</td><td>string</td><td>否</td><td>按方向过滤：<code>BUY</code> / <code>SELL</code></td></tr><tr><td>startTime</td><td>long</td><td>否</td><td>起始时间戳（毫秒），包含</td></tr><tr><td>endTime</td><td>long</td><td>否</td><td>结束时间戳（毫秒），不包含</td></tr><tr><td>cursor</td><td>string</td><td>否</td><td>分页游标</td></tr><tr><td>limit</td><td>int</td><td>否</td><td>每页条数（默认 20，最大 100）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "list": [
      {
        "tradeId": "1",
        "orderId": "1",
        "marketId": "1",
        "tokenId": "0xabc...001",
        "side": "BUY",
        "size": "50",
        "amount": "32.5",
        "price": "0.65",
        "fee": "0.065",
        "role": "TAKER",
        "txHash": "0xdef...789",
        "createdAt": 1710000030000
      }
    ],
    "nextCursor": "eyJpZCI6MTAwMDF9",
    "hasNext": false
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>list[].tradeId</td><td>string</td><td>成交记录 ID</td></tr><tr><td>list[].orderId</td><td>string</td><td>关联订单 ID</td></tr><tr><td>list[].marketId</td><td>string</td><td>市场 ID</td></tr><tr><td>list[].tokenId</td><td>string</td><td>代币地址（YES 或 NO）</td></tr><tr><td>list[].side</td><td>string</td><td><code>BUY</code> / <code>SELL</code></td></tr><tr><td>list[].size</td><td>string</td><td>成交代币数量</td></tr><tr><td>list[].amount</td><td>string</td><td>成交 xp 金额</td></tr><tr><td>list[].price</td><td>string</td><td>成交价格</td></tr><tr><td>list[].fee</td><td>string</td><td>手续费（xp）</td></tr><tr><td>list[].role</td><td>string</td><td><code>MAKER</code> / <code>TAKER</code></td></tr><tr><td>list[].txHash</td><td>string</td><td>链上交易哈希</td></tr><tr><td>list[].createdAt</td><td>string</td><td>成交时间戳（毫秒）</td></tr><tr><td>nextCursor</td><td>string</td><td>下一页游标</td></tr><tr><td>hasNext</td><td>boolean</td><td>是否有更多数据</td></tr></tbody></table>

## 6\. 仓位查询

### 6.1 查询当前持仓

查询当前认证用户的活跃持仓。

#### HTTP请求

`GET /api/v5/predictions/positions?status=open`

### 6.2 查询已平仓仓位

查询当前认证用户已退出或已结算的仓位。

#### HTTP请求

`GET /api/v5/predictions/positions?status=closed`

### 6.3 查询指定市场仓位

查询当前认证用户在指定市场的仓位。

#### HTTP请求

`GET /api/v5/predictions/positions?marketId={marketId}`

### 6.4 统一端点

以上三种场景均通过同一端点 + 查询参数组合实现：

#### HTTP请求

`GET /api/v5/predictions/positions`

#### 请求参数（Query）

<table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>status</td><td>string</td><td>否</td><td><code>open</code>（活跃持仓）、<code>closed</code>（已清仓），不传返回全部</td></tr><tr><td>marketId</td><td>long</td><td>否</td><td>按市场 ID 过滤</td></tr><tr><td>cursor</td><td>string</td><td>否</td><td>分页游标</td></tr><tr><td>limit</td><td>int</td><td>否</td><td>每页条数（默认 20，最大 100）</td></tr></tbody></table>

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": {
    "list": [
      {
        "id": "100001",
        "tokenId": "0xabc...001",
        "marketId": "1",
        "tokenIndex": "1",
        "tokenName": "Yes",
        "size": "500",
        "availableSize": "480",
        "value": "325",
        "avgPrice": "0.62",
        "unRealizedPnl": "15",
        "unRealizedPnlPercentage": "0.048",
        "title": "Will BTC exceed $100k by end of 2026?",
        "icon": "https://cdn.example.com/markets/1.png",
        "eventId": "100",
        "winningToken": null,
        "positionStatus": 1,
        "oddsType": "points",
        "curPrice": "0.65",
        "realizedPnl": "12.5",
        "realizedPnlPercentage": "0.04"
      }
    ],
    "nextCursor": "eyJpZCI6MTAwMDAxfQ",
    "hasNext": false
  }
}
```

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>list[].id</td><td>string</td><td>仓位 ID</td></tr><tr><td>list[].tokenId</td><td>string</td><td>代币 ID</td></tr><tr><td>list[].marketId</td><td>string</td><td>市场 ID</td></tr><tr><td>list[].tokenIndex</td><td>string</td><td>代币方向（<code>"1"</code> = YES，<code>"2"</code> = NO）</td></tr><tr><td>list[].tokenName</td><td>string</td><td>代币名称（<code>"Yes"</code> / <code>"No"</code>）</td></tr><tr><td>list[].size</td><td>string</td><td>持仓数量（= remain）</td></tr><tr><td>list[].availableSize</td><td>string</td><td>可用持仓量（= remain − frozen，未被 SELL 挂单锁定的数量）</td></tr><tr><td>list[].value</td><td>string</td><td>当前市值（curPrice × size）</td></tr><tr><td>list[].avgPrice</td><td>string</td><td>加权平均持仓成本</td></tr><tr><td>list[].unRealizedPnl</td><td>string</td><td>未实现盈亏</td></tr><tr><td>list[].unRealizedPnlPercentage</td><td>string</td><td>未实现盈亏百分比</td></tr><tr><td>list[].title</td><td>string</td><td>市场问题文本</td></tr><tr><td>list[].icon</td><td>string</td><td>市场图标 URL</td></tr><tr><td>list[].eventId</td><td>string</td><td>父事件 ID</td></tr><tr><td>list[].winningToken</td><td>string</td><td>结算后获胜方代币 ID；未结算时为 null</td></tr><tr><td>list[].positionStatus</td><td>integer</td><td>仓位状态码（见 PositionStatusEnum）</td></tr><tr><td>list[].oddsType</td><td>string</td><td>盘口类型：<code>points</code>=积分盘</td></tr><tr><td>list[].curPrice</td><td>string</td><td>当前代币实时价格</td></tr><tr><td>list[].realizedPnl</td><td>string</td><td>已实现盈亏</td></tr><tr><td>list[].realizedPnlPercentage</td><td>string</td><td>已实现盈亏百分比</td></tr><tr><td>nextCursor</td><td>string</td><td>下一页游标</td></tr><tr><td>hasNext</td><td>boolean</td><td>是否有更多数据</td></tr></tbody></table>

## 7\. 账户余额

### 7.1 查询账户余额

查询当前认证用户的积分余额。

#### HTTP请求

`GET /api/v5/predictions/balance`

**请求参数**：无

**响应**（`data`）：

> 响应示例

```
{
  "code": 0,
  "message": "OK",
  "data": [
    { "oddsType": "points", "balance": "2.2",  "available": "2.2"  }
  ]
}
```

`data` 为数组，每个元素对应一种盘口类型的余额：

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>oddsType</td><td>string</td><td>盘口类型：<code>points</code>=积分盘</td></tr><tr><td>balance</td><td>string</td><td>总余额</td></tr><tr><td>available</td><td>string</td><td>可用余额（总余额 - 冻结中的金额）</td></tr></tbody></table>

## 8\. 限流（Rate Limits）

**事件与市场 API**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>GET /api/v5/predictions/events</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/events/{eventId}</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/events/{eventId}/markets</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/markets/{marketId}</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/events/search</code></td><td>10 次 / 1s</td></tr></tbody></table>

**价格 API（行情数据）**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>GET /api/v5/market/ticker</code></td><td>10 次 / 1s</td></tr><tr><td><code>GET /api/v5/market/candles</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/market/pm-books</code></td><td>20 次 / 1s</td></tr></tbody></table>

**订单 API**

**查询类**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>GET /api/v5/predictions/orders/{orderId}</code></td><td>20 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/orders</code></td><td>20 次 / 1s</td></tr></tbody></table>

**写操作类**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>POST /api/v5/predictions/orders</code></td><td>50 次 / 1s</td></tr><tr><td><code>POST /api/v5/predictions/orders/cancel</code></td><td>20 次 / 1s</td></tr><tr><td><code>POST /api/v5/predictions/orders/cancel-all</code></td><td>1 次 / 1h</td></tr><tr><td><code>POST /api/v5/predictions/heartbeat</code></td><td>1 次 / 1s</td></tr></tbody></table>

**仓位操作 API**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>POST /api/v5/predictions/positions/split</code></td><td>5 次 / 1s</td></tr><tr><td><code>POST /api/v5/predictions/positions/merge</code></td><td>5 次 / 1s</td></tr><tr><td><code>POST /api/v5/predictions/positions/redeem</code></td><td>5 次 / 1s</td></tr></tbody></table>

**成交历史 / 仓位查询 / 余额**

<table><thead><tr><th>端点</th><th>限额</th></tr></thead><tbody><tr><td><code>GET /api/v5/predictions/trades</code></td><td>10 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/positions</code></td><td>10 次 / 1s</td></tr><tr><td><code>GET /api/v5/predictions/balance</code></td><td>10 次 / 1s</td></tr></tbody></table>

**触发限流的响应**

*   HTTP Status: `429 Too Many Requests`
*   业务错误码：`50011 RATE_LIMIT_EXCEEDED`
*   建议客户端按**指数退避**策略重试：首次 1s，后续每次翻倍，最大 30s；连续重试超过 5 次仍 429 时应停止并告警
