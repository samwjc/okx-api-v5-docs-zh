---
title: WebSocket
outline: deep
---

## 1\. WebSocket 登录认证

仅订阅私有频道前需先进行 WebSocket 登录认证。公共频道无需登录。

详见 [WebSocket 登录认证文档](/zh/overview-websocket-login)。

> 通用订阅格式

```
{
  "op": "subscribe",
  "args": [
     { "channel": "<频道名1>", "instId": "<yesAssetId1>" },
     { "channel": "<频道名2>", "instId": "<yesAssetId2>" }
  ]
}
```

> 通用取消订阅格式

```
{
  "op": "unsubscribe",
  "args": [
      { "channel": "<频道名1>", "instId": "<yesAssetId1>" },
      { "channel": "<频道名2>", "instId": "<yesAssetId2>" }
   ]
}
```

## 2\. WebSocket 私有频道

<table><thead><tr><th>频道名称</th><th>订阅参数</th><th>是否需要授权</th><th>说明</th></tr></thead><tbody><tr><td>pm-order</td><td>channelName</td><td>是</td><td>用户订单数据推送</td></tr><tr><td>pm-position</td><td>channelName</td><td>是</td><td>仓位变更</td></tr><tr><td>pm-user-trade</td><td>channelName</td><td>是</td><td>用户交易历史推送</td></tr><tr><td>pm-balance</td><td>channelName</td><td>是</td><td>余额变更</td></tr><tr><td>pm-pnl</td><td>channelName</td><td>是</td><td>当前仓位的浮盈/浮亏数值</td></tr></tbody></table>

### 2.1 订单状态推送

**推送频率：** 事件触发，订单状态变更时推送

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{ "channel": "pm-order" }]
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-order", "uid": "{cexUserId}" },
  "data": [{
    "orderId": "307173036051017730",
    "clientOrderId": "cli-abc-123",
    "marketId": "100001",
    "status": "FILLED",
    "assetId": "71",
    "side": "BUY",
    "direction": "YES",
    "filledSize": "10",
    "orderSize": "10",
    "avgPrice": "0.57",
    "amount": "5.7",
    "limitPrice": "0.45",
    "failMessage": null,
    "oddsType": "points",
    "txHash": "0xdef...",
    "tradeId": "9876543210"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>orderId</code></td><td>string</td><td>订单 ID</td></tr><tr><td><code>clientOrderId</code></td><td>string / null</td><td>客户端订单 ID（cloid）；客户端未传时为 null</td></tr><tr><td><code>marketId</code></td><td>string</td><td>市场 ID</td></tr><tr><td><code>status</code></td><td>string</td><td>推送事件类型（见下表枚举）</td></tr><tr><td><code>assetId</code></td><td>string</td><td>币对资产 ID（yesAssetId 或 noAssetId）</td></tr><tr><td><code>side</code></td><td>string</td><td>交易方向：<code>BUY</code> / <code>SELL</code></td></tr><tr><td><code>direction</code></td><td>string</td><td>持仓方向：<code>YES</code> / <code>NO</code></td></tr><tr><td><code>filledSize</code></td><td>string / null</td><td>本次累计成交份额；无成交时为 null</td></tr><tr><td><code>orderSize</code></td><td>string</td><td>下单份额</td></tr><tr><td><code>avgPrice</code></td><td>string / null</td><td>累计成交均价（= amount / filledSize）；无成交时为 null</td></tr><tr><td><code>amount</code></td><td>string / null</td><td>累计成交金额（xp），BUY=花费 / SELL=收入；无成交时为 null</td></tr><tr><td><code>limitPrice</code></td><td>string / null</td><td>限价单挂单价格（仅限价场景）；市价单为 null</td></tr><tr><td><code>failMessage</code></td><td>string / null</td><td>失败提示文案；仅 <code>PLACE_FAILED</code> / <code>CANCEL_FAILED</code> 场景填值</td></tr><tr><td><code>oddsType</code></td><td>string</td><td>盘口类型：<code>points</code></td></tr><tr><td><code>txHash</code></td><td>string / null</td><td>链上交易哈希；未上链事件为 null（如 <code>PLACE_FAILED</code>）</td></tr><tr><td><code>tradeId</code></td><td>string / null</td><td>TradeZone 成交 ID；仅限价单部分成交（status=<code>ACTIVE</code>）时填值</td></tr></tbody></table>

#### status 枚举

<table><thead><tr><th>code</th><th>说明</th><th>必填字段</th></tr></thead><tbody><tr><td><code>ACTIVE</code></td><td>活跃（限价单上链 / 部分成交且剩余有效）</td><td><code>orderSize</code>, <code>limitPrice</code>（部分成交时另含 <code>filledSize</code>, <code>avgPrice</code>, <code>amount</code>, <code>tradeId</code>）</td></tr><tr><td><code>FILLED</code></td><td>完全成交</td><td><code>filledSize</code>, <code>avgPrice</code>, <code>amount</code>, <code>txHash</code></td></tr><tr><td><code>PARTIALLY_FILLED</code></td><td>部分成交后撤单</td><td><code>filledSize</code>, <code>orderSize</code>, <code>avgPrice</code>, <code>amount</code>, <code>txHash</code></td></tr><tr><td><code>PLACE_FAILED</code></td><td>下单失败</td><td><code>orderSize</code>, <code>failMessage</code></td></tr><tr><td><code>CANCEL_FAILED</code></td><td>撤单失败（非预期）</td><td><code>orderId</code>, <code>failMessage</code></td></tr><tr><td><code>CANCELLED</code></td><td>用户主动撤单 / 系统批量撤</td><td><code>orderSize</code>, <code>limitPrice</code></td></tr><tr><td><code>EXPIRED</code></td><td>订单到期</td><td><code>orderSize</code>, <code>limitPrice</code></td></tr></tbody></table>

### 2.2 仓位变更推送

**推送频率：** 事件触发

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{ "channel": "pm-position" }]
}
```

### 2.3 仓位

（status = FILL / REDEEM/FILL\_FAILED/REDEEM\_FAILED）

> 推送数据格式

```
{
  "arg": { "channel": "pm-position", "uid": "{cexUserId}" },
  "data": [{
    "id": "307173036051017730",
    "marketId": "100001",
    "tokenId": "20000",
    "assetId": "71",
    "amount": "10",
    "timestamp": "1712736000000",
    "unRealizedPnl": "5.20",
    "unRealizedPnlPercentage": "1.05",
    "value": "100.00",
    "avgPrice": "0.57",
    "status": "FILL",
    "tradeId": "9876543210",
    "oddsType": "points"
  }]
}
```

#### 字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>id</code></td><td>String</td><td>仓位 ID</td></tr><tr><td><code>marketId</code></td><td>String</td><td>市场 ID</td></tr><tr><td><code>tokenId</code></td><td>String</td><td>YES/NO token 链上 ID</td></tr><tr><td><code>assetId</code></td><td>String</td><td>币对资产 ID（yesAssetId 或 noAssetId）</td></tr><tr><td><code>amount</code></td><td>String</td><td>当前持仓数量（<code>remain</code> 快照），REDEEM 场景为 <code>"0"</code></td></tr><tr><td><code>timestamp</code></td><td>String</td><td>事件时间戳（毫秒）</td></tr><tr><td><code>unRealizedPnl</code></td><td>String</td><td>未实现盈亏 = (currentPrice − avgCost) × remain；REDEEM 为 <code>"0"</code></td></tr><tr><td><code>unRealizedPnlPercentage</code></td><td>String</td><td>未实现盈亏百分比（8 位精度）；REDEEM 为 <code>"0"</code></td></tr><tr><td><code>value</code></td><td>String</td><td>仓位市值 = currentPrice × remain；REDEEM 为 <code>"0"</code></td></tr><tr><td><code>avgPrice</code></td><td>String</td><td>加权平均持仓成本；REDEEM 为 <code>"0"</code></td></tr><tr><td><code>status</code></td><td>String</td><td><code>FILL</code> / <code>REDEEM</code></td></tr><tr><td><code>tradeId</code></td><td>String / null</td><td>TradeZone 成交 ID；仅 <code>FILL</code> 场景填值（<code>REDEEM</code> 为 null）</td></tr><tr><td><code>oddsType</code></td><td>String</td><td>盘口类型：<code>points</code></td></tr></tbody></table>

### 2.4 status 适用场景

<table><thead><tr><th>code</th><th>说明</th><th>单次推送条数</th></tr></thead><tbody><tr><td><code>FILL</code></td><td>订单成交导致仓位变更</td><td>1（单 tokenId 仓位）</td></tr><tr><td><code>REDEEM</code></td><td>结算赎回，该市场仓位清零</td><td>N（该市场原有的每个 tokenId 各一条，<code>amount=0</code>）</td></tr></tbody></table>

### 2.5 仓位

（status = SPLIT / MERGE / DEPOSIT / WITHDRAW/SPLIT\_FAILED/MERGE\_FAILED/DEPOSIT\_FAILED/WITHDRAW\_FAILED）

> 推送数据格式

```
{
  "arg": { "channel": "pm-position", "uid": "{cexUserId}" },
  "data": [{
    "marketId": "100001",
    "status": "DEPOSIT",
    "amount": "100",
    "txHash": "0xdef...",
    "oddsType": "points",
    "ext": {
      "toTxHash": "0xabc..."
    }
  }]
}
```

#### 字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>marketId</code></td><td>String</td><td>市场 ID</td></tr><tr><td><code>status</code></td><td>String</td><td><code>SPLIT</code> / <code>MERGE</code> / <code>DEPOSIT</code> / <code>WITHDRAW</code></td></tr><tr><td><code>amount</code></td><td>String</td><td>金额</td></tr><tr><td><code>txHash</code></td><td>String</td><td>链上交易哈希。DEPOSIT 场景填 XLayer 原始交易哈希；其余场景填该业务对应链上哈希</td></tr><tr><td><code>oddsType</code></td><td>String</td><td>盘口类型：<code>points</code></td></tr><tr><td><code>ext</code></td><td>Object / null</td><td>扩展信息；仅 <code>DEPOSIT</code> 场景填值，其余场景为 null</td></tr><tr><td><code>ext.toTxHash</code></td><td>String / null</td><td>TZ 侧入账交易哈希；仅 <code>DEPOSIT</code> 场景填值</td></tr></tbody></table>

#### status 枚举

<table><thead><tr><th>code</th><th>说明</th></tr></thead><tbody><tr><td><code>FILL</code></td><td>订单成交导致仓位变更</td></tr><tr><td><code>SPLIT</code></td><td>Split 拆分成功</td></tr><tr><td><code>MERGE</code></td><td>Merge 合并成功</td></tr><tr><td><code>REDEEM</code></td><td>结算赎回成功</td></tr><tr><td><code>DEPOSIT</code></td><td>充值成功</td></tr><tr><td><code>WITHDRAW</code></td><td>提现成功</td></tr><tr><td><code>FILL_FAILED</code></td><td>成交失败</td></tr><tr><td><code>SPLIT_FAILED</code></td><td>Split 失败</td></tr><tr><td><code>MERGE_FAILED</code></td><td>Merge 失败</td></tr><tr><td><code>REDEEM_FAILED</code></td><td>赎回失败</td></tr><tr><td><code>DEPOSIT_FAILED</code></td><td>充值失败</td></tr><tr><td><code>WITHDRAW_FAILED</code></td><td>提现失败</td></tr></tbody></table>

### 2.6 撮合成交推送

每笔 FILL 事件推送一条成交流水，前端用于实时展示成交记录列表。

**推送频率：** 事件触发，每笔成交一条

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{ "channel": "pm-user-trade" }]
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-user-trade", "uid": "{cexUserId}" },
  "data": [{
    "orderId": "307173036051017730",
    "clientOrderId": "cli-abc-123",
    "marketId": "100001",
    "tokenId": "20000",
    "assetId": "71",
    "side": "BUY",
    "size": "10",
    "price": "0.57",
    "txhash": "0xdef...",
    "timestamp": "1712736000000",
    "tradeId": "9876543210"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>orderId</code></td><td>string</td><td>TradeZone 订单 ID</td></tr><tr><td><code>clientOrderId</code></td><td>string / null</td><td>客户端订单 ID；客户端未传时为 null</td></tr><tr><td><code>marketId</code></td><td>string</td><td>市场 ID</td></tr><tr><td><code>tokenId</code></td><td>string</td><td>YES/NO token 链上 ID</td></tr><tr><td><code>assetId</code></td><td>string</td><td>币对资产 ID（yesAssetId 或 noAssetId）</td></tr><tr><td><code>side</code></td><td>string</td><td>成交方向：<code>BUY</code> / <code>SELL</code></td></tr><tr><td><code>size</code></td><td>string</td><td>本次成交数量</td></tr><tr><td><code>price</code></td><td>string</td><td>本次成交价格</td></tr><tr><td><code>txhash</code></td><td>string</td><td>链上交易哈希</td></tr><tr><td><code>timestamp</code></td><td>string</td><td>事件时间戳（毫秒）</td></tr><tr><td><code>tradeId</code></td><td>string</td><td>TradeZone 成交 ID</td></tr></tbody></table>

### 2.7 余额变更推送

余额同步成功后推送，前端用于实时更新余额显示。

**推送频率：** 事件触发，余额变更（挂单 / 撤单 / 成交 / Split / Merge / 赎回 / 充值 / 提现）时推送

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{ "channel": "pm-balance" }]
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-balance", "uid": "{cexUserId}" },
  "data": [{
    "walletAddress": "0x1234abcd5678ef901234abcd5678ef901234abcd",
    "available": "950.5",
    "total": "1000",
    "frozen": "49.5",
    "tokenId": "0",
    "changeType": "FILL",
    "changeAmount": "100",
    "updateTime": "1712736000000",
    "oddsType": "points"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>walletAddress</code></td><td>String</td><td>用户 AA 钱包地址</td></tr><tr><td><code>available</code></td><td>String</td><td>可用余额</td></tr><tr><td><code>total</code></td><td>String</td><td>总余额（含冻结）</td></tr><tr><td><code>frozen</code></td><td>String</td><td>冻结金额（= total − available）</td></tr><tr><td><code>tokenId</code></td><td>String</td><td>xp token 链上 ID（与 <code>oddsType</code> 对应）</td></tr><tr><td><code>changeType</code></td><td>String</td><td>触发原因（见下表枚举）</td></tr><tr><td><code>changeAmount</code></td><td>String / null</td><td>本次变动金额；不适用场景为 null</td></tr><tr><td><code>updateTime</code></td><td>String</td><td>事件时间戳（毫秒）</td></tr><tr><td><code>oddsType</code></td><td>String</td><td>盘口类型：<code>points</code></td></tr></tbody></table>

### 2.8 changeType 枚举

<table><thead><tr><th>code</th><th>触发场景</th></tr></thead><tbody><tr><td><code>PLACE</code></td><td>挂单冻结</td></tr><tr><td><code>CANCEL</code></td><td>撤单解冻</td></tr><tr><td><code>FILL</code></td><td>成交导致余额变更</td></tr><tr><td><code>SPLIT</code></td><td>Split 扣减 xp</td></tr><tr><td><code>MERGE</code></td><td>Merge 增加 xp</td></tr><tr><td><code>REDEEM</code></td><td>结算赎回</td></tr><tr><td><code>DEPOSIT</code></td><td>充值</td></tr><tr><td><code>WITHDRAW</code></td><td>提现</td></tr></tbody></table>

### 2.9 Pnl变更推送

同时推送Pnl曲线图及概览

> 推送数据格式

```
{
  "arg": { "channel": "pm-pnl", "uid": "{cexUserId}" },
  "data": [{
    "portfolioValue": "1234.56",
    "periods": [
      { "period": "1D", "periodPnl": "12.34",  "pnlPercent": "1.01" },
      { "period": "1W", "periodPnl": "56.78",  "pnlPercent": "4.83" },
      { "period": "1M", "periodPnl": "120.45", "pnlPercent": "10.81" },
      { "period": "6M", "periodPnl": "320.10", "pnlPercent": "35.02" },
      { "period": "1Y", "periodPnl": "500.00", "pnlPercent": "67.93" }
    ]
  }]
}
```

#### 字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>portfolioValue</code></td><td>String</td><td>当前组合总价值（xp 可用余额 + 仓位市值）</td></tr><tr><td><code>periods</code></td><td>Array</td><td>多周期 PnL 汇总数组</td></tr><tr><td><code>periods[].period</code></td><td>String</td><td>周期：<code>1D</code> / <code>1W</code> / <code>1M</code> / <code>6M</code> / <code>1Y</code></td></tr><tr><td><code>periods[].periodPnl</code></td><td>String</td><td>该周期内 PnL 绝对值</td></tr><tr><td><code>periods[].pnlPercent</code></td><td>String</td><td>该周期内 PnL 百分比</td></tr></tbody></table>

> 推送数据格式

```
{
  "arg": { "channel": "pm-pnl", "uid": "{cexUserId}" },
  "data": [{
    "period": "0",
    "interval": "600000",
    "points": [
      { "time": "1712707200000", "pnl": "1000.00" },
      { "time": "1712728800000", "pnl": "1010.50" },
      { "time": "1712750400000", "pnl": "1023.75" }
    ],
    "currentPnl": "1023.75",
    "high": "1030.00",
    "low": "995.00"
  }]
}
```

#### 字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>period</code></td><td>String</td><td>周期编码：<code>0</code>=1D / <code>1</code>=1W / <code>2</code>=1M / <code>3</code>=6M / <code>4</code>=1Y</td></tr><tr><td><code>interval</code></td><td>String</td><td>数据点间隔（毫秒），与周期对应（见下表）</td></tr><tr><td><code>points</code></td><td>Array</td><td>时间序列数据点</td></tr><tr><td><code>points[].time</code></td><td>String</td><td>数据点时间戳（毫秒）</td></tr><tr><td><code>points[].pnl</code></td><td>String</td><td>该时刻总资产（= xp 余额 + 仓位市值）</td></tr><tr><td><code>currentPnl</code></td><td>String</td><td>当前总资产（兼容字段）</td></tr><tr><td><code>high</code></td><td>String</td><td>周期内最高总资产</td></tr><tr><td><code>low</code></td><td>String</td><td>周期内最低总资产</td></tr></tbody></table>

### 2.10 周期编码与 interval 对照

<table><thead><tr><th>period 编码</th><th>周期</th><th>interval（毫秒）</th><th>含义</th></tr></thead><tbody><tr><td><code>0</code></td><td>1D</td><td><code>600000</code></td><td>10 分钟</td></tr><tr><td><code>1</code></td><td>1W</td><td><code>1800000</code></td><td>30 分钟</td></tr><tr><td><code>2</code></td><td>1M</td><td><code>3600000</code></td><td>1 小时</td></tr><tr><td><code>3</code></td><td>6M</td><td><code>86400000</code></td><td>1 天</td></tr><tr><td><code>4</code></td><td>1Y</td><td><code>86400000</code></td><td>1 天</td></tr></tbody></table>

## 3\. WebSocket 公共频道

### 3.1 深度推送

### 3.2 推送频率

*   最小推送间隔 100ms — 两次增量推送之间最短间隔
    
*   最大推送间隔 60,000ms (60s) — 订单簿无变化时最长推送间隔
    

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{
    "channel": "pm-books",
    "instId": "{yesAssetId}"
  }]
}
```

> 订阅成功响应

```
{
  "event": "subscribe",
  "arg": { "channel": "pm-books", "instId": "{yesAssetId}" }
}
```

> 推送数据格式

```
{                    
      "arg": {"channel": "pm-books", "instId": "{yesAssetId}"},
      "action": "snapshot",                   
      "data": [                               
          {                                                                                                                                                                                                                                                                                                                 
              "asks": [                                                                                                                                                                                                                                                                                                     
                  ["67300.1", "201.18", "25"],                                                                                                                                                                                                                                                                         
                  ["67300.2", "421.45", "5"]                                                                                                                                                                                                                                                                           
              ],                                                                                                                                                                                                                                                                                                            
              "bids": [                                                                                                                                                                                                                                                                                                     
                  ["67300", "525.41", "34"],                                                                                                                                                                                                                                                                           
                  ["67299.9", "0.17", "7"]                                                                                                                                                                                                                                                                             
              ],                                                                                                                                                                                                                                                                                                            
              "ts": "1774944028506",                                                                                                                                                                                                                                                                                        
              "checksum": -702280706,                                                                                                                                                                                                                                                                                       
              "seqId": 308306650401,                                                                                                                                                                                                                                                                                        
              "prevSeqId": -1                                                                                                                                                                                                                                                                                               
          }                                                                                                                                                                                                                                                                                                                 
      ]                                                                                                                                                                                                                                                                                                                     
  }
```

### 3.3 成交推送

实时推送每笔成交记录

**推送频率**：推送间隔 200ms，每次推送最多 20 条成交，编码类型为聚合成交

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{
    "channel": "pm-trades",
    "instId": "{yesAssetId}"
  }]
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-trades", "instId": "{yesAssetId}" },
  "data": [{
    "instId": "{yesAssetId}",
    "tradeId": "123456789",
    "px": "0.65",
    "sz": "100",
    "side": "buy",
    "ts": "1711900800123"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>instId</code></td><td>String</td><td>yesAssetId</td></tr><tr><td><code>fId</code></td><td>String</td><td>聚合周期内首笔成交 ID</td></tr><tr><td><code>lId</code></td><td>String</td><td>聚合周期内末笔成交 ID</td></tr><tr><td><code>px</code></td><td>String</td><td>成交价格</td></tr><tr><td><code>sz</code></td><td>String</td><td>成交数量</td></tr><tr><td><code>side</code></td><td>String</td><td>成交方向：<code>buy</code> 买入，<code>sell</code> 卖出</td></tr><tr><td><code>ts</code></td><td>String</td><td>成交时间（Unix 毫秒时间戳）</td></tr></tbody></table>

### 3.4 K 线推送

实时推送 K 线数据，当前 K 线未收盘时会持续更新推送。端上可基于K线的收盘价绘制价格趋势图，具体订阅的颗粒度由端上自行评估

**频道命名规则：** `pm-candle` + 周期，例如 `pm-candle1m`、`pm-candle15m`

> 订阅示例（以 1 分钟和 5 分钟为例）

```
{
  "op": "subscribe",
  "args": [
    { "channel": "pm-candle1m", "instId": "{yesAssetId}" },
    { "channel": "pm-candle15m", "instId": "{yesAssetId}" }
  ]
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-candle15m", "instId": "{yesAssetId}" },
  "data": [
    ["1711900800000", "0.65", "0.67", "0.63", "0.66", "2000", "1300", "1300", "0"]
  ]
}
```

### 3.5 推送字段说明

（data 数组中每条记录按索引顺序）

<table><thead><tr><th>索引</th><th>字段</th><th>说明</th></tr></thead><tbody><tr><td>0</td><td><code>ts</code></td><td>K 线开始时间（Unix 毫秒时间戳）</td></tr><tr><td>1</td><td><code>o</code></td><td>开盘价</td></tr><tr><td>2</td><td><code>h</code></td><td>最高价</td></tr><tr><td>3</td><td><code>l</code></td><td>最低价</td></tr><tr><td>4</td><td><code>c</code></td><td>收盘价</td></tr><tr><td>5</td><td><code>vol</code></td><td>成交量（以张计）</td></tr><tr><td>6</td><td><code>volCcy</code></td><td>成交量（以计价货币计）</td></tr><tr><td>7</td><td><code>volCcyQuote</code></td><td>成交量（以报价货币计）</td></tr><tr><td>8</td><td><code>confirm</code></td><td>K 线状态：<code>0</code> 未确认（当前 K 线），<code>1</code> 已确认（已收盘）</td></tr></tbody></table>

### 3.6 行情 Ticker 推送

实时推送最新成交价、买一价、卖一价和24小时交易量等信息。

**推送频率**：最快100ms推送一次，触发推送的事件有：成交、买一卖一发生变动，没有触发事件时不推送

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{ "channel": "pm-tickers", "instId": "{yesAssetId}" }]
}
```

> 订阅成功响应

```
{
  "event": "subscribe",
  "arg": { "channel": "pm-tickers", "instId": "{yesAssetId}" },
  "connId": "accb8e21"
}
```

> 推送数据格式

```
{
  "arg": { "channel": "pm-tickers", "instId": "{yesAssetId}" },
  "data": [{
    "instType": "PREDICTIONS",
    "instId": "{yesAssetId}",
    "last": "0.4999",
    "lastSz": "1",
    "askPx": "0.6",
    "askSz": "30",
    "bidPx": "0.4",
    "bidSz": "30",
    "open24h": "0.5001",
    "high24h": "0.5001",
    "low24h": "0.4999",
    "vol24h": "372",
    "volCcy24h": "186",
    "sodUtc0": "0.4999",
    "sodUtc8": "0.4999",
    "ts": "1774948808119"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>instType</td><td>String</td><td>产品类型</td></tr><tr><td>instId</td><td>String</td><td>yesAssetId</td></tr><tr><td>last</td><td>String</td><td>最新成交价</td></tr><tr><td>lastSz</td><td>String</td><td>最新成交数量</td></tr><tr><td>askPx</td><td>String</td><td>卖一价</td></tr><tr><td>askSz</td><td>String</td><td>卖一价对应数量</td></tr><tr><td>bidPx</td><td>String</td><td>买一价</td></tr><tr><td>bidSz</td><td>String</td><td>买一价对应数量</td></tr><tr><td>open24h</td><td>String</td><td>24小时开盘价</td></tr><tr><td>high24h</td><td>String</td><td>24小时最高价</td></tr><tr><td>low24h</td><td>String</td><td>24小时最低价</td></tr><tr><td>vol24h</td><td>String</td><td>24小时成交量（以张计）</td></tr><tr><td>volCcy24h</td><td>String</td><td>24小时成交量（以计价货币计）</td></tr><tr><td>sodUtc0</td><td>String</td><td>UTC 0 时开盘价</td></tr><tr><td>sodUtc8</td><td>String</td><td>UTC+8 时开盘价</td></tr><tr><td>ts</td><td>String</td><td>数据推送时间（Unix 毫秒时间戳）</td></tr></tbody></table>

### 3.7 概率价格推送

预测市场概率价格推送，包含市场概率、累计成交额、买一卖一、最新成交价等信息

**推送频率：**定时3s推送一次

> 订阅示例

```
{
  "op": "subscribe",
  "args": [{
    "channel": "prediction-market-prices",
    "instId": "{yesAssetId}"
  }]
}
```

> 推送数据格式

```
{
    "arg": {
        "channel": "prediction-market-prices",
        "instId": "{yesAssetId}"
    },
    "data": [
        {
            "yesAssetId": "71",
            "eventId": "1774875348987717503",
            "bestBid": "0.4896",
            "bestAsk": "0.6134",
            "lastTradePrice": "0.5848",
            "probability": "5515",
            "marketVolume": "17.1463",
            "eventVolume": "773.6524",
            "timestamp": "1775036647300"
        }
    ]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>yesAssetId</td><td>String</td><td>预测市场 yesAssetId</td></tr><tr><td>eventId</td><td>String</td><td>市场所属的event</td></tr><tr><td>bestBid</td><td>String</td><td>买一价（最优买入价）</td></tr><tr><td>bestAsk</td><td>String</td><td>卖一价（最优卖出价）</td></tr><tr><td>lastTradePrice</td><td>String</td><td>最新成交价</td></tr><tr><td>probability</td><td>String</td><td>Yes 方向的市场概率，推送万分比整数（如 0.6500 → 6500）</td></tr><tr><td>marketVolume</td><td>String</td><td>当前市场累计成交额</td></tr><tr><td>eventVolume</td><td>String</td><td>当前事件累计成交额</td></tr><tr><td>timestamp</td><td>String</td><td>事件时间戳（毫秒）</td></tr></tbody></table>

### 3.8 事件状态推送

事件状态变更，用于展示事件最终结算结果

**推送频率：**事件触发，事件得到最终结果时推送，世界杯期间一天2~3场比赛；多元互斥、单一二元事件拿到最终结果时进行推送

> 订阅示例
> 
> **注意：** 订阅此频道时，`instId` 取值为 event`-{eventId}`

```
{
  "op": "subscribe",
  "args": [{
    "channel": "pm-event-status",
    "instId": "event-{eventId}"
  }]
}
```

> 推送数据格式

```
{
  "arg": {
    "channel": "pm-event-status",
    "instId": "event-{eventId}"
  },
  "data": [{
    "eventId": "{eventId}",
    "status": "resolved",
    "marketId":"marketId",
    "outcomeOption":"yes | no | others | 球队名称 | draw",
    "timestamp": "1672290687"
  }]
}
```

#### 推送字段说明

<table><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>eventId</td><td>string</td><td>比赛ID</td></tr><tr><td>status</td><td>string</td><td>事件状态</td></tr><tr><td>marketId</td><td>string</td><td>胜出市场的marketId</td></tr><tr><td>outcomeOption</td><td>string</td><td>最终胜出的展示</td></tr><tr><td>timestamp</td><td>string</td><td>事件时间戳（毫秒）</td></tr></tbody></table>
