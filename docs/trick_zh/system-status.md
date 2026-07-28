---
title: 系统状态
outline: deep
---

用户可以通过 [`GET /api/v5/system/status`](/zh/status-get-status) 获取交易所状态。

后续的状态更新将从websocket [`status`](/zh/status-ws-status-channel) 频道发布。

由计划系统维护引起的短暂不可用（<5秒）和WebSocket闪断连接（用户可以立即重连）将不会公布。此类维护只会在市场波动性低的时期进行。
