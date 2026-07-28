---
title: 常见错误码
outline: deep
---

## 1\. 响应格式

所有异常统一返回以下 JSON 结构：

```
{
  "code": 100015,
  "msg": "calldata 无效或字段不合法"
}
```

### 1.1 通用

所有 OpenAPI v5 接口都可能产生。 更多通用错误码详见：[OKX 公共错误码文档](/zh/error-code-rest-api-public)

<table><thead><tr><th>Code</th><th>Meaning</th></tr></thead><tbody><tr><td>10000</td><td>User not logged in</td></tr><tr><td>10001</td><td>Parameter validation failed</td></tr><tr><td>10002</td><td>Authentication failed</td></tr><tr><td>206004</td><td>Request oddsType does not match the account</td></tr></tbody></table>

### 1.2 事件/市场类

<table><thead><tr><th>Code</th><th>Meaning</th></tr></thead><tbody><tr><td>201001</td><td>Event does not exist</td></tr><tr><td>201002</td><td>Market does not exist</td></tr></tbody></table>

适用接口：

*   GET /api/v5/predictions/events
    
*   GET /api/v5/predictions/events/{eventId}
    
*   GET /api/v5/predictions/events/{eventId}/markets
    
*   GET /api/v5/predictions/markets/{marketId}
    
*   GET /api/v5/predictions/events/search
    

## 2\. 下单 / 写操作类

涵盖：下单、撤单、全部撤单、心跳、Split、Merge、Redeem。

<table><thead><tr><th>Code</th><th>Meaning</th></tr></thead><tbody><tr><td>100001</td><td>Market is not tradable</td></tr><tr><td>100002</td><td>Insufficient balance</td></tr><tr><td>100006</td><td>Account is frozen</td></tr><tr><td>100010</td><td>Insufficient token balance</td></tr><tr><td>100011</td><td>Order does not exist</td></tr><tr><td>100012</td><td>Order status does not allow cancellation</td></tr><tr><td>100013</td><td>Request address does not match the user address</td></tr><tr><td>100015</td><td>Invalid calldata or malformed fields</td></tr><tr><td>100016</td><td>Nonce already used</td></tr><tr><td>100017</td><td>Nonce expired</td></tr><tr><td>100018</td><td>Order amount is below the minimum notional</td></tr><tr><td>100101</td><td>TradeZone SDK signature exception</td></tr><tr><td>120007</td><td>User does not exist</td></tr><tr><td>120022</td><td>Account is in escape (exit) process</td></tr><tr><td>201002</td><td>Market does not exist</td></tr><tr><td>213003</td><td>Signature verified but TradeZone submission failed</td></tr></tbody></table>

适用接口：

*   `POST /api/v5/predictions/orders` 下单
    
*   `POST /api/v5/predictions/orders/cancel` 撤销单订单
    
*   `POST /api/v5/predictions/orders/cancel-all` 撤销全部 / 指定市场订单
    
*   `POST /api/v5/predictions/heartbeat` 心跳
    
*   `POST /api/v5/predictions/positions/split` Split
    
*   `POST /api/v5/predictions/positions/merge` Merge
    
*   `POST /api/v5/predictions/positions/redeem` Redeem
    

## 3\. 查询订单 / 仓位类

涵盖：查询单订单、订单列表、成交历史、仓位查询。

<table><thead><tr><th>Code</th><th>Meaning</th></tr></thead><tbody><tr><td>100011</td><td>Order does not exist</td></tr><tr><td>400</td><td>Path parameter parsing failed</td></tr></tbody></table>

适用接口：

*   `GET /api/v5/predictions/orders/{orderId}` 查询单订单
    
*   `GET /api/v5/predictions/orders` 查询订单列表
    
*   `GET /api/v5/predictions/trades` 查询成交记录
    
*   `GET /api/v5/predictions/positions` 查询仓位
