---
title: Status
outline: deep
---

## GET / Status

获取系统升级事件的状态。

由计划系统维护引起的短暂不可用（<5秒）和WebSocket闪断连接（用户可以立即重连）将不会公布。此类维护只会在市场波动性低的时期进行。

#### 限速：1次/5s

#### HTTP请求

`GET /api/v5/system/status`

> 请求示例

```
GET /api/v5/system/status

GET /api/v5/system/status?state=canceled
```

```
import okx.Status as Status

flag = "0"  # 实盘:0 , 模拟盘：1
statusAPI = Status.StatusAPI(
    domain="https://openapi.okx.com",
    flag=flag,
)

# 获取系统升级事件的状态
result = statusAPI.status()
print(result)
```

#### 请求参数

#### 请求示例

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">系统的状态<br><code>scheduled</code>：等待中<br><code>ongoing</code>：进行中<br><code>pre_open</code>：预开放<br><code>completed</code>：已完成<br><code>canceled</code>：已取消<br>当维护时间过长，会存在预开放时间，一般持续10分钟左右。<br>不填写此参数，默认返回 等待中、进行中和预开放 的数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "begin": "1672823400000",
            "end": "1672823520000",
            "href": "",
            "preOpenBegin": "",
            "scheDesc": "",
            "serviceType": "8",
            "state": "completed",
            "maintType": "1",
            "env": "1",
            "system": "unified",
            "title": "Trading account system upgrade (in batches of accounts)"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">title</td><td style="text-align: left">String</td><td style="text-align: left">系统维护说明的标题</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">系统维护的状态</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">系统维护的开始时间，Unix时间戳的毫秒数格式 如：<code>1617788463867</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">交易全面开放的时间，Unix时间戳的毫秒数格式 如：<code>1617788463867</code><br>在维护完成前，是预期结束时间；维护完成后，会变更为实际结束时间。</td></tr><tr><td style="text-align: left">preOpenBegin</td><td style="text-align: left">String</td><td style="text-align: left">预开放开始的时间，开放撤单、Post Only 下单和资金转入功能的时间</td></tr><tr><td style="text-align: left">href</td><td style="text-align: left">String</td><td style="text-align: left">系统维护详情的超级链接,若无返回值，默认值为空，如 ""</td></tr><tr><td style="text-align: left">serviceType</td><td style="text-align: left">String</td><td style="text-align: left">服务类型<br><code>0</code>：WebSocket<br><code>5</code>：交易服务<br><code>6</code>：大宗交易<br><code>7</code>：策略交易<br><code>8</code>：交易服务 (按账户分批次)<br><code>9</code>：交易服务 (按产品分批次)<br><code>10</code>：价差交易<br><code>11</code>：跟单交易<br><code>99</code>：其他（如：停止部分产品交易）</td></tr><tr><td style="text-align: left">system</td><td style="text-align: left">String</td><td style="text-align: left">系统<br><code>unified</code>：交易账户</td></tr><tr><td style="text-align: left">scheDesc</td><td style="text-align: left">String</td><td style="text-align: left">改期进度说明，如 <code>由 2021-01-26T16:30:00.000Z</code>改期到<code>2021-01-28T16:30:00.000Z</code></td></tr><tr><td style="text-align: left">maintType</td><td style="text-align: left">String</td><td style="text-align: left">维护类型<br><code>1</code>：计划维护<br><code>2</code>：临时维护<br><code>3</code>：系统故障</td></tr><tr><td style="text-align: left">env</td><td style="text-align: left">String</td><td style="text-align: left">环境<br><code>1</code>：实盘<br><code>2</code>：模拟盘</td></tr></tbody></table>

## WS / Status 频道

获取系统维护的状态，当系统维护状态改变，改期，以及修改结束时间时推送。首次订阅：”推送最新一条的变化数据“；后续每次有状态变化，推送变化的内容。

由计划系统维护引起的短暂不可用（<5秒）和WebSocket闪断连接（用户可以立即重连）将不会公布。此类维护只会在市场波动性低的时期进行。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "status"
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
        "channel": "status"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>status</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "status"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"statuss\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>status</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "status"
    },
    "data": [
        {
            "begin": "1672823400000",
            "end": "1672825980000",
            "href": "",
            "preOpenBegin": "",
            "scheDesc": "",
            "serviceType": "0",
            "state": "completed",
            "system": "unified",
            "maintType": "1",
            "env": "1",
            "title": "Trading account WebSocket system upgrade",
            "ts": "1672826038470"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>频道名<br><code>status</code></td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td>订阅的数据</td></tr><tr><td style="text-align: left">&gt; title</td><td style="text-align: left">String</td><td>系统维护说明的标题</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td>系统的状态，<code>scheduled</code>:等待中 ; <code>ongoing</code>:进行中 ; <code>pre_open</code>:预开放；<code>completed</code>:已完成 <code>canceled</code>: 已取消<br>当维护时间过长，会存在预开放时间，一般持续10分钟左右。</td></tr><tr><td style="text-align: left">&gt; begin</td><td style="text-align: left">String</td><td>系统维护的开始时间，Unix时间戳的毫秒数格式 如：<code>1617788463867</code></td></tr><tr><td style="text-align: left">&gt; end</td><td style="text-align: left">String</td><td>交易全面开放的时间，Unix时间戳的毫秒数格式 如：<code>1617788463867</code><br>在维护完成前，是预期结束时间；维护完成后，会变更为实际结束时间。</td></tr><tr><td style="text-align: left">&gt; preOpenBegin</td><td style="text-align: left">String</td><td>预开放开始的时间，开放撤单、Post Only 下单和资金转入功能的时间</td></tr><tr><td style="text-align: left">&gt; href</td><td style="text-align: left">String</td><td>系统维护详情的超级链接,若无返回值，默认值为空，如：“”</td></tr><tr><td style="text-align: left">&gt; serviceType</td><td style="text-align: left">String</td><td>服务类型， <code>0</code>：WebSocket ; <code>5</code>：交易服务；<code>6</code>：大宗交易；<code>7</code>：策略交易；<code>8</code>：交易服务 (按账户分批次)；<code>9</code>：交易服务 (按产品分批次)；<code>10</code>：价差交易；<code>11</code>：跟单交易；<code>99</code>：其他（如：停止部分产品交易）</td></tr><tr><td style="text-align: left">&gt; system</td><td style="text-align: left">String</td><td>系统，<code>unified</code>：交易账户</td></tr><tr><td style="text-align: left">&gt; scheDesc</td><td style="text-align: left">String</td><td>改期进度说明，如： <code>由 2021-01-26T16:30:00.000Z 改期到 2021-01-28T16:30:00.000Z</code></td></tr><tr><td style="text-align: left">&gt; maintType</td><td style="text-align: left">String</td><td>维护类型。<br><code>1</code>：计划维护；<code>2</code>：临时维护；<code>3</code>：系统故障</td></tr><tr><td style="text-align: left">&gt; env</td><td style="text-align: left">String</td><td>环境。<br><code>1</code>：实盘，<code>2</code>：模拟盘</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td>事件变更的推送时间，Unix时间戳的毫秒数格式，如：<code>1617788463867</code></td></tr></tbody></table>
