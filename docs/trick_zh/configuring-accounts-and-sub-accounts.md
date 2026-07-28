---
title: 配置账户和子账户
outline: deep
---

创建子账户和其API密钥后，用户可以在交易之前通过API配置主账户和子账户。

## 账户配置

用户可以通过以下的 REST API 查看当前账户/子账户的配置：

[`GET /api/v5/account/config`](/zh/trading-account-rest-api-get-account-configuration).

API 会返回账户模式、持仓模式、自动借币设置、期权希腊值PA/BS以及许多其他与账户相关的信息。

## 账户模式

交易账户交易系统提供四个账户模式，分别为现货模式、合约模式、跨币种保证金模式以及组合保证金模式。

更改账户模式仅限于在网页或手机app上进行。

## 持仓模式

交易所目前支持两种持仓模式。

<table><thead><tr><th style="text-align: left"></th><th style="text-align: left"></th></tr></thead><tbody><tr><td style="text-align: left">买卖模式</td><td style="text-align: left">只可持有开多或开空仓位。交易所会根据您所指定的持仓数量自动开/平仓</td></tr><tr><td style="text-align: left">开平仓模式</td><td style="text-align: left">可同时持有开多仓位和开空仓位</td></tr></tbody></table>

用户可以通过以下的 REST API 设置持仓模式（设置前需平掉所有仓位和没有挂单）：

[`POST /api/v5/account/set-position-mode`](/zh/trading-account-rest-api-set-position-mode)

## 自动借币

自动借币仅适用于跨币种保证金模式及组合保证金模式，且只限于在网页上打开或关闭。

为偿还负债，交易所可能会自动转换其他货币的可用余额。风险指标可以从 [`GET /api/v5/account/balance`](/zh/trading-account-rest-api-get-balance) 以及 WS [`账户`](/zh/trading-account-websocket-account-channel) 端点的`twap`字段中找到。

## 期权希腊值 PA/BS

用户可以通过以下的 REST API 设置期权希腊值 PA/BS：

[`POST /api/v5/account/set-greeks`](/zh/trading-account-rest-api-set-greeks-pa-bs)
