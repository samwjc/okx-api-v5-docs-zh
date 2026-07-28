---
title: 全仓/逐仓保证金模式
outline: deep
---

交易账户交易系统的全仓/逐仓设置更为弹性，用户可以同时以全仓和逐仓交易同一产品。

因此，API并没有提供设置不同仓位保证金模式的功能。取而代之，用户需要在下单时使用`tdMode`字段指定该订单的保证金模式（交易模式）。

## 获取杠杆倍数

用户可以通过以下的 REST API 获取杠杆倍数：

[`GET /api/v5/account/leverage-info`](/zh/trading-account-rest-api-get-leverage)

目前杠杆倍数没有全局设置，同一产品可以有几种杠杆倍数的设置场景。

币币杠杆：

<table><tbody><tr><th>账户模式</th><th>保证金模式</th><th>层面</th></tr><tr><td rowspan="2">现货模式</td><td>全仓</td><td>产品(币对)</td></tr><tr><td>逐仓</td><td>产品(币对)</td></tr><tr><td rowspan="2">合约模式</td><td>全仓</td><td>产品(币对)</td></tr><tr><td>逐仓</td><td>产品(币对)</td></tr><tr><td rowspan="2">跨币种保证金模式</td><td>全仓</td><td>币种</td></tr><tr><td>逐仓</td><td>产品(币对)</td></tr></tbody></table>

其他产品类型：

<table><tbody><tr><th>持仓模式</th><th>产品类型</th><th>保证金模式</th><th>层面</th></tr><tr><td rowspan="4">买卖模式</td><td rowspan="2">交割</td><td>全仓</td><td>交易品种</td></tr><tr><td>逐仓</td><td>交易品种</td></tr><tr><td rowspan="2">永续</td><td>全仓</td><td>交易品种</td></tr><tr><td>逐仓</td><td>交易品种</td></tr><tr><td rowspan="4">开平仓模式</td><td rowspan="2">交割</td><td>全仓</td><td>交易品种</td></tr><tr><td>逐仓</td><td>交易品种 + 持仓方向</td></tr><tr><td rowspan="2">永续</td><td>全仓</td><td>交易品种</td></tr><tr><td>逐仓</td><td>交易品种 + 持仓方向</td></tr></tbody></table>

## 设置杠杆倍数

在获取杠杆倍数之后，用户可根据需要进行设置：

[`POST /api/v5/account/set-leverage`](/zh/trading-account-rest-api-set-leverage)

用户可以运用上述两个API接口，在交易前预先设置每个产品的杠杆倍数。

示例：

假设我们有以下的设置和需求：

*   账户模式：跨币种保证金
*   持仓模式：买卖模式
*   需要设置杠杆倍数为 3.0 的产品：
    *   BTC-USDT、EOS-USDT、LTC-BTC、LTC-USDT
    *   BTC-USD-210319、BTC-USD-210326、BTC-USD-210625
    *   BTC-USD-SWAP
*   以上产品只使用全仓保证金模式

币币/币币杠杆的设置层面为币种，用户可以截取币种去逐一设置，即`BTC`、`USDT`、`EOS`和`LTC`。

设置`BTC`币种杠杆倍数为 3.0 的请求体示例（适用于卖出`BTC-USDT`和买入`LTC-BTC`）：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"lever": "3.0",<br>&nbsp;&nbsp;"mgnMode": "cross",<br>&nbsp;&nbsp;"ccy": "BTC"<br>}</td></tr></tbody></table>

设置 `USDT`、`EOS` 和 `LTC` 的请求体也很类似，不在此一一列举。

下一步就是设置`BTC-USD-210319`、`BTC-USD-210326`和`BTC-USD-210625`的杠杆倍数。

因为这三个产品都有共同的交易品种（即`BTC-USD`），用户只需在这三个产品中选其一设置杠杆倍数。

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"lever": "3.0",<br>&nbsp;&nbsp;"mgnMode": "cross",<br>&nbsp;&nbsp;"instId": "BTC-USD-210326"<br>}</td></tr></tbody></table>

最后，用户需要设置`BTC-USD-SWAP`的杠杆倍数。

虽然交易品种和以上的交割一样为`BTC-USD`，但交割和永续的杠杆倍数设置是分开独立的，用户仍需要发送以下请去设置：

<table><tbody><tr><td>{<br>&nbsp;&nbsp;"lever": "3.0",<br>&nbsp;&nbsp;"mgnMode": "cross",<br>&nbsp;&nbsp;"instId": "BTC-USD-SWAP"<br>}</td></tr></tbody></table>

在发送了以上共 6 个 API REST 请求后，这 8 个产品杠杆倍数的设置便完成了。
