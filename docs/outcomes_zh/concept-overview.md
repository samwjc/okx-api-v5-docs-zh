---
title: 概念介绍
outline: deep
---

本节介绍接入 Outcomes API 前需要理解的核心业务概念，包括 xp（基础资产）、事件、市场、结果、价格、Split / Merge、镜像订单簿、订单簿、持仓、结算以及关键 ID。

理解这些概念后，开发者可以更清楚地判断：

*   如何从事件找到可交易市场
*   如何选择 YES / NO outcome
*   为什么下单、撤单、查询行情时通常使用 `assetId`
*   Split / Merge 与镜像订单簿之间的关系
*   Binary Market 与 NegRisk Market 的差异

::: tip
`xp` 是 OKX X-Layer Points 的简称，由 OKX 活动发放、无法自行购买，是本预测市场的基础资产。用户使用 xp 交易各市场的 YES / NO 结果，下文的下单、余额、Split / Merge、结算等均以 xp 计。
:::

::: tip
本文中的 `assetId` 是交易相关接口中最重要的标识之一。开发者最终交易的不是 Event，也不是 Market 本身，而是某个 Market 下具体 outcome 对应的 assetId。
:::

## 1\. 预测市场

预测市场是一种围绕未来事件结果进行交易的市场。

每个市场通常对应一个明确的问题，例如：

**Germany 在某场比赛会赢吗？**

用户可以根据自己的判断交易该问题下的不同结果。最常见的结果是 `YES` 和 `NO`。

示例：

<table><thead><tr><th>对象</th><th>示例</th></tr></thead><tbody><tr><td>Market</td><td>Germany 会赢吗？</td></tr><tr><td>YES</td><td>Germany 会赢</td></tr><tr><td>NO</td><td>Germany 不会赢</td></tr></tbody></table>

可以简单理解为：

<table><thead><tr><th>交易方向</th><th>含义</th></tr></thead><tbody><tr><td>买入 YES</td><td>用户认为该事件结果会发生</td></tr><tr><td>买入 NO</td><td>用户认为该事件结果不会发生</td></tr></tbody></table>

## 2\. 核心对象模型

Outcomes API 中的核心对象关系如下：

*   **Event**
    *   **Market**
    *   **YES outcome**
    *   **NO outcome**

可以简单理解为：

<table><thead><tr><th>对象</th><th>含义</th></tr></thead><tbody><tr><td>Event</td><td>真实世界事件</td></tr><tr><td>Market</td><td>Event 下的具体交易问题</td></tr><tr><td>Outcome</td><td>Market 下可以交易的结果，例如 YES / NO</td></tr><tr><td>assetId</td><td>某个 outcome 的可交易资产 ID</td></tr></tbody></table>

开发者接入时，通常遵循下面的链路：

1.  查询 `Event`
2.  获取该 `Event` 下的 `Market`
3.  选择某个 `Market` 下的 `YES` 或 `NO` outcome
4.  使用该 outcome 对应的 `assetId` 进行交易

## 3\. Event 与 Market

事件（Event）是预测市场的上层组织单位，表示一个真实世界事件。

示例：

<table><thead><tr><th>对象</th><th>示例</th></tr></thead><tbody><tr><td>Event</td><td>Germany vs. Curacao</td></tr></tbody></table>

一个 Event 下可以包含多个 Market：

<table><thead><tr><th>Market</th><th>问题</th></tr></thead><tbody><tr><td>Market 1</td><td>Germany 会赢吗？</td></tr><tr><td>Market 2</td><td>两队会平局吗？</td></tr><tr><td>Market 3</td><td>Curacao 会赢吗？</td></tr></tbody></table>

用户实际交易的不是 Event 本身，而是某个 Market 下的 YES 或 NO outcome。

::: tip
Event 主要用于组织和展示市场；真正用于交易的是 Market 下的具体 outcome。
:::

## 4\. 结果 Outcome

结果（Outcome）是 Market 下的可交易对象。

在二元市场中，每个 Market 通常有两个 outcome：

<table><thead><tr><th>Outcome</th><th>含义</th></tr></thead><tbody><tr><td>YES</td><td>该 Market 的结果会发生</td></tr><tr><td>NO</td><td>该 Market 的结果不会发生</td></tr></tbody></table>

每个 outcome 都会有自己的 `assetId`。开发者下单时，最终使用的是目标 outcome 对应的 `assetId`。

示例：

*   `marketId`：`100001`
*   `question`：Germany 会赢吗？
*   `yesOutcome`：`assetId` = `100049000`，`price` = `0.65`
*   `noOutcome`：`assetId` = `100049001`，`price` = `0.35`

如果用户想买入 YES，则使用 `yesOutcome.assetId`。 如果用户想买入 NO，则使用 `noOutcome.assetId`。

## 5\. 价格与概率

预测市场中的价格是 `0` 到 `1` 之间的小数。价格可以理解为市场对某个结果发生概率的实时估计。

例如：

<table><thead><tr><th>Outcome</th><th>当前价格</th><th>可以理解为</th></tr></thead><tbody><tr><td>YES</td><td><code>0.65</code></td><td>市场当前认为 YES 发生的概率约为 65%</td></tr><tr><td>NO</td><td><code>0.35</code></td><td>市场当前认为 NO 发生的概率约为 35%</td></tr></tbody></table>

**为什么价格≈概率**：胜出的 outcome 结算为 `1 xp`、未胜出结算为 `0 xp`，因此持有一个 outcome 的**期望价值 = 1 xp × 该结果发生的概率**。在有效市场中，价格会趋近这一期望值，所以价格可以近似看作市场对该结果发生概率的估计。

价格由市场交易形成，不代表最终结果。最终结果以市场结算为准。

::: warning
价格只是市场交易形成的实时预期，不代表平台对最终结果的判断或保证。
:::

## 6\. YES / NO 的互补关系

YES 和 NO 是同一个 Binary Market 的两面。一个结果发生时，另一个结果就不会发生。

在理想情况下，二者价格之和接近 `1`。

<table><thead><tr><th>Outcome</th><th>价格</th></tr></thead><tbody><tr><td>YES</td><td><code>0.65</code></td></tr><tr><td>NO</td><td><code>0.35</code></td></tr><tr><td>YES + NO</td><td><code>1.00</code></td></tr></tbody></table>

这种关系可以概括为：

**YES + NO ≈ 1**

开发者不需要手动处理 YES / NO 的价格换算。下单时只需要选择目标 outcome，并使用该 outcome 对应的 `assetId`。

## 7\. Split / Merge 机制

Split / Merge 是 YES / NO 互补关系背后的基础机制。

对于一个 Binary Market，YES 和 NO 可以看作一组成对的条件结果。系统可以通过 Split 和 Merge 在 xp 与 YES / NO outcome 之间进行转换。

### 7.1 Split

Split 是将一份 xp 拆分为等量的 YES 和 NO outcome。

**1 xp → 1 YES + 1 NO**

可以理解为：用户把一份完整的市场权益拆成了该市场下的两个互补结果。

<table><thead><tr><th>操作前</th><th>操作后</th></tr></thead><tbody><tr><td>1 xp</td><td>1 YES + 1 NO</td></tr></tbody></table>

### 7.2 Merge

Merge 是 Split 的逆操作。用户可以将等量的 YES 和 NO outcome 合并回 xp。

**1 YES + 1 NO → 1 xp**

只有当 YES 和 NO 数量相等时，才可以进行 Merge。

<table><thead><tr><th>操作前</th><th>操作后</th></tr></thead><tbody><tr><td>1 YES + 1 NO</td><td>1 xp</td></tr></tbody></table>

这个机制保证了 YES 和 NO 的互补关系：

**YES + NO ≈ 1**

也就是说，在同一个 Binary Market 中，YES 和 NO 不是完全独立的资产，而是同一组条件结果的两面。

## 8\. 镜像订单簿

基于 YES / NO 的互补关系，系统可以使用镜像订单簿统一处理 YES 和 NO 的交易。

对于同一个 Binary Market：

<table><thead><tr><th>用户操作</th><th>经济效果等价于</th></tr></thead><tbody><tr><td>买入 YES @ <code>0.60</code></td><td>卖出 NO @ <code>0.40</code></td></tr><tr><td>买入 NO @ <code>0.30</code></td><td>卖出 YES @ <code>0.70</code></td></tr></tbody></table>

原因是：

**YES 价格 + NO 价格 ≈ 1**

因此，系统可以在底层用一套统一订单簿同时支持 YES 和 NO 的交易。

开发者不需要手动拆分或换算镜像订单。下单时只需要选择用户希望交易的 outcome，并使用该 outcome 对应的 `assetId`。系统会在订单簿层处理 YES / NO 的等价关系。

::: tip
镜像订单簿是系统底层的撮合机制。对 API 使用方来说，最重要的是选择正确的 outcome，并使用对应的 assetId 下单。
:::

## 9\. 订单簿

Outcomes 使用中央限价订单簿，即 CLOB。

CLOB 是 Central Limit Order Book 的缩写，表示中央限价订单簿。市场价格不是平台直接设定的，而是由用户之间的挂单和成交形成。

订单簿包含买卖两侧：

<table><thead><tr><th>方向</th><th>含义</th></tr></thead><tbody><tr><td>Bid</td><td>买方愿意买入的价格</td></tr><tr><td>Ask</td><td>卖方愿意卖出的价格</td></tr></tbody></table>

示例：

<table><thead><tr><th>Side</th><th>Price</th><th>Size</th></tr></thead><tbody><tr><td>Ask</td><td><code>0.67</code></td><td><code>100</code></td></tr><tr><td>Ask</td><td><code>0.66</code></td><td><code>80</code></td></tr><tr><td>Bid</td><td><code>0.65</code></td><td><code>120</code></td></tr><tr><td>Bid</td><td><code>0.64</code></td><td><code>200</code></td></tr></tbody></table>

当买卖双方价格匹配时，订单会发生撮合成交。

## 10\. Maker 与 Taker

订单成交时，用户可能是 Maker，也可能是 Taker。

<table><thead><tr><th>角色</th><th>含义</th></tr></thead><tbody><tr><td>Maker</td><td>挂单进入订单簿，为市场提供流动性</td></tr><tr><td>Taker</td><td>主动吃掉订单簿中已有挂单，消耗流动性</td></tr></tbody></table>

示例：

当前最优卖价 Ask = `0.66`。

<table><thead><tr><th>用户操作</th><th>结果</th><th>角色</th></tr></thead><tbody><tr><td>以 <code>0.66</code> 买入</td><td>立即成交</td><td>Taker</td></tr><tr><td>以 <code>0.60</code> 挂买单</td><td>当前无法立即成交，进入订单簿等待成交</td><td>Maker</td></tr></tbody></table>

订单撮合通常遵循：

<table><thead><tr><th>优先级</th><th>说明</th></tr></thead><tbody><tr><td>价格优先</td><td>更好的价格优先成交</td></tr><tr><td>时间优先</td><td>相同价格下，更早进入订单簿的订单优先成交</td></tr></tbody></table>

## 11\. 持仓

未成交的挂单会占用可用余额。订单成交后，用户会获得对应 outcome 的持仓。

示例：

<table><thead><tr><th>操作</th><th>结果</th></tr></thead><tbody><tr><td>用户买入 10 个 YES</td><td>成交后，用户持有 10 个 YES outcome</td></tr></tbody></table>

持仓会随着以下操作发生变化：

<table><thead><tr><th>操作</th><th>对持仓的影响</th></tr></thead><tbody><tr><td>成交</td><td>增加或减少对应 outcome 持仓</td></tr><tr><td>平仓</td><td>减少已有 outcome 持仓</td></tr><tr><td>Split</td><td>生成 YES / NO outcome</td></tr><tr><td>Merge</td><td>合并 YES / NO outcome</td></tr><tr><td>结算</td><td>根据最终结果更新持仓和余额</td></tr></tbody></table>

## 12\. 平仓

用户不一定要等到市场结算后才退出持仓。如果市场仍可交易，用户可以通过卖出已有 outcome 来平仓。

示例：

<table><thead><tr><th>步骤</th><th>操作</th></tr></thead><tbody><tr><td>第 1 步</td><td>用户以 <code>0.40</code> 买入 YES</td></tr><tr><td>第 2 步</td><td>之后 YES 价格上涨到 <code>0.70</code></td></tr><tr><td>第 3 步</td><td>用户卖出 YES 平仓</td></tr><tr><td>第 4 步</td><td>用户持仓和余额根据成交结果更新</td></tr></tbody></table>

平仓本质上是通过反向交易退出已有持仓。

## 13\. 结算

当事件结果确定后，Market 会进入结算流程。

结算后：

<table><thead><tr><th>Outcome</th><th>结算结果</th></tr></thead><tbody><tr><td>胜出的 outcome</td><td>结算为 <code>1 xp</code></td></tr><tr><td>未胜出的 outcome</td><td>结算为 <code>0 xp</code></td></tr></tbody></table>

示例：

Market：Germany 会赢吗？

如果 Germany 最终赢了：

<table><thead><tr><th>Outcome</th><th>结果</th></tr></thead><tbody><tr><td>YES</td><td>胜出</td></tr><tr><td>NO</td><td>未胜出</td></tr></tbody></table>

如果 Germany 没有赢：

<table><thead><tr><th>Outcome</th><th>结果</th></tr></thead><tbody><tr><td>YES</td><td>未胜出</td></tr><tr><td>NO</td><td>胜出</td></tr></tbody></table>

市场结算后，未成交挂单会结束，用户持仓和余额会根据最终结果更新。

::: warning
市场进入结算或已结算状态后，通常不能继续正常交易。开发者下单前应检查 Market 状态。
:::

## 14\. 二元市场（Binary Market）

二元市场（Binary Market）是最常见的市场结构，表示一个是 / 否问题。

示例：

<table><thead><tr><th>Market</th><th>Germany 会赢吗？</th></tr></thead><tbody><tr><td>YES</td><td>Germany 会赢</td></tr><tr><td>NO</td><td>Germany 不会赢</td></tr></tbody></table>

Binary Market 中通常只有两个 outcome：

*   `YES`
*   `NO`

开发者只需要选择 YES 或 NO 对应的 `assetId` 进行交易。

## 15\. 多元互斥市场（NegRisk Market）

多元互斥市场（NegRisk Market）用于多个互斥结果的场景。一个 Event 下可以包含多个相关 Market，但最终通常只有一个结果胜出。

示例：

Event：谁会赢得冠军？

<table><thead><tr><th>Market</th><th>问题</th></tr></thead><tbody><tr><td>Market 1</td><td>Germany 会夺冠吗？</td></tr><tr><td>Market 2</td><td>France 会夺冠吗？</td></tr><tr><td>Market 3</td><td>Brazil 会夺冠吗？</td></tr><tr><td>Market 4</td><td>其他球队会夺冠吗？</td></tr></tbody></table>

如果 Germany 最终夺冠：

<table><thead><tr><th>Market</th><th>YES 结果</th></tr></thead><tbody><tr><td>Germany 会夺冠吗？</td><td>胜出</td></tr><tr><td>France 会夺冠吗？</td><td>未胜出</td></tr><tr><td>Brazil 会夺冠吗？</td><td>未胜出</td></tr><tr><td>其他球队会夺冠吗？</td><td>未胜出</td></tr></tbody></table>

对开发者来说，NegRisk Market 不改变基础交易方式。开发者仍然选择具体 Market 下的 YES 或 NO outcome，并使用对应的 `assetId` 交易。

<table><thead><tr><th>市场类型</th><th>特点</th><th>开发者交易方式</th></tr></thead><tbody><tr><td>Binary Market</td><td>单个是 / 否问题</td><td>选择 YES 或 NO 的 <code>assetId</code></td></tr><tr><td>NegRisk Market</td><td>多个互斥结果</td><td>仍然选择具体 Market 下的 YES 或 NO 的 <code>assetId</code></td></tr></tbody></table>

## 16\. 市场状态

Market 在生命周期中会经历不同状态。

常见状态如下：

<table><thead><tr><th>状态</th><th>含义</th><th>是否通常可交易</th></tr></thead><tbody><tr><td><code>active</code></td><td>市场正常交易中</td><td>是</td></tr><tr><td><code>paused</code></td><td>市场暂停交易</td><td>否</td></tr><tr><td><code>settling</code></td><td>市场结算中</td><td>否</td></tr><tr><td><code>resolved</code></td><td>市场已结算</td><td>否</td></tr></tbody></table>

开发者下单前应检查 Market 状态。如果 Market 不是 `active`，订单可能会被拒绝。

::: tip
具体状态枚举以接口返回为准。接入方不应只依赖前端展示状态判断市场是否可交易。
:::

## 17\. 关键 ID

接入 API 时，最容易混淆的是各类 ID。

可以先记住：

<table><thead><tr><th>ID</th><th>含义</th><th>常见用途</th></tr></thead><tbody><tr><td><code>eventId</code></td><td>事件 ID</td><td>查询 Event 详情及其下属 Market</td></tr><tr><td><code>marketId</code></td><td>市场 ID</td><td>标识具体交易问题</td></tr><tr><td><code>assetId</code></td><td>outcome 的资产 ID</td><td>下单、撤单、行情、订单簿、持仓等交易相关操作</td></tr><tr><td><code>orderId</code></td><td>订单 ID</td><td>查询订单、撤单、追踪订单状态</td></tr></tbody></table>

最重要的规则是：

**下单、撤单、行情、订单簿相关操作通常使用 `assetId`。**

如果接口返回的 `assetId` 为 `null`，说明该 outcome 暂时不可交易。开发者需要等待 `assetId` 返回有效值后，再进行交易相关操作。

::: warning
如果 assetId 为空，不应继续发起下单、撤单或查询订单簿等交易相关操作，否则可能会被接口拒绝。
:::

## 18\. 小结

开发者可以用下面这条链路理解 Outcomes 的核心模型：

**Event → Market → Outcome → assetId → Order / Position**

对应关系如下：

<table><thead><tr><th>阶段</th><th>说明</th></tr></thead><tbody><tr><td>Event</td><td>找到真实世界事件</td></tr><tr><td>Market</td><td>找到该事件下的具体问题</td></tr><tr><td>Outcome</td><td>选择 YES 或 NO</td></tr><tr><td>assetId</td><td>获取可交易资产 ID</td></tr><tr><td>Order</td><td>使用 assetId 下单</td></tr><tr><td>Position</td><td>成交后形成对应持仓</td></tr></tbody></table>

对于 API 接入方来说，最关键的是：

<table><thead><tr><th>关键点</th><th>说明</th></tr></thead><tbody><tr><td>不交易 Event</td><td>Event 只是组织单位</td></tr><tr><td>不直接交易 Market</td><td>Market 是具体问题</td></tr><tr><td>实际交易 Outcome</td><td>Outcome 通过 <code>assetId</code> 表示</td></tr><tr><td>YES / NO 有互补关系</td><td><code>YES + NO ≈ 1</code></td></tr><tr><td>镜像订单簿由系统处理</td><td>开发者不需要手动换算</td></tr><tr><td>下单前检查状态</td><td>Market 需要处于可交易状态</td></tr><tr><td>assetId 不能为空</td><td><code>assetId = null</code> 表示暂不可交易</td></tr></tbody></table>
