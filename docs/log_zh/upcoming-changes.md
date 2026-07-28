---
title: 待发布内容
outline: deep
---

## 信号复制新增 API 接口

**最后更新：2026 年 5 月 14 日**  

OKX 将为信号复制（订单分享）功能新增 API 支持。API 用户现在可以通过传入订单 ID，以编程方式生成通用分享短链。短链将订单参数（合约、方向、杠杆、价格、止盈止损等）存储在服务端。接收方打开链接后，OKX App 下单面板将自动填入对应参数。

此功能仅支持 USDT 保证金永续合约，使用前需确保账户已开启信号复制功能。

### 生成信号复制短链

*   [生成信号复制短链](/zh/order-book-trading-copy-trading-post-create-signal-link)

1.  新增接口 `POST /api/v5/copytrade/create-sgl-link`。
2.  请求体中传入 `orderId` 和 `instId`，订单必须属于请求账户。
3.  仅支持 USDT 保证金永续合约（`instId` 以 `-USDT-SWAP` 结尾），其他产品类型将返回错误。
4.  返回 `shortLink`——通用 OKX App 短链，接收方打开后下单面板将自动填入对应订单参数。
5.  限速：每用户每秒 10 次。

> 请求示例

```
POST /api/v5/copytrade/create-sgl-link
body
{
    "orderId": "3556007031710728192",
    "instId": "ADA-USDT-SWAP"
}
```

**请求参数**

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>orderId</td><td>String</td><td>是</td><td>订单 ID，必须属于请求账户。</td></tr><tr><td>instId</td><td>String</td><td>是</td><td>产品 ID，如 <code>BTC-USDT-SWAP</code>，仅支持 USDT 保证金永续合约。</td></tr></tbody></table>

> 返回示例

```
{
    "code": "0",
    "data": [
        {
            "shortLink": "https://www.okx.com/ul/1xJ7nV"
        }
    ],
    "msg": ""
}
```

**返回参数**

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>shortLink</td><td>String</td><td>通用分享短链。接收方在 OKX App 中打开该链接后，下单面板将自动填入对应的订单参数。</td></tr></tbody></table>

## WebSocket 订单频道推送行为调整

**最近更新：2026 年 7 月 22 日**  
  

为了让客户能够更明确地判断 `post-only`（包括 `mmp_and_post_only`）与将要推出的 `rpi` 新订单的最终状态，避免收到 `state: live` 后订单仍被撤销的场景，欧易将调整[订单频道](/zh/order-book-trading-trade-ws-order-channel)中 `post-only` 与 `rpi` 订单的 `state: live` 事件行为。  
  

**具体影响**

*   `state: live` 事件的推送时机由订单接收后立即推送，调整为订单成功进入订单簿之后才推送（延后约 1 ms）。
*   价格穿越 BBO 被撤单的挂单失败场景下，`state: live` 更新将被完全移除，只推送 `state: canceled` 更新。

<table><thead><tr><th><strong>场景</strong></th><th><strong>调整前</strong></th><th><strong>调整后</strong></th></tr></thead><tbody><tr><td><code>post-only</code> 订单挂单失败<br>（价格穿越 BBO 被撤单）</td><td><code>state: live</code> → <code>state: canceled</code></td><td>只推 <code>state: canceled</code>（不再有 <code>state: live</code>）</td></tr><tr><td><code>post-only</code> 订单成功挂单</td><td>立即推 <code>state: live</code></td><td><code>state: live</code>（延后约 1 ms）</td></tr><tr><td><code>post-only</code> 订单成功挂单后被吃单<br>（一次成交）</td><td><code>state: live</code> → <code>state: filled</code></td><td><code>state: live</code>（延后约 1 ms） → <code>state: filled</code></td></tr><tr><td><code>post-only</code> 订单成功挂单后被吃单<br>（多次部分成交）</td><td><code>state: live</code> → <code>state: partially_filled</code> → <code>state: filled</code></td><td><code>state: live</code>（延后约 1 ms） → <code>state: partially_filled</code> → <code>state: filled</code></td></tr><tr><td><code>post-only</code> 订单带 <code>reduceOnly: true</code>，<br>size 被修改</td><td><code>state: live</code> → <code>state: live</code>（<code>amendSource: 4</code>，<code>amendResult: 0</code>）</td><td><code>state: live</code>（<code>amendSource: 4</code>，<code>amendResult: 0</code>） → <code>state: live</code></td></tr><tr><td>将要推出的 <code>rpi</code> 订单，<code>rpiPxRound: false</code>，<br>挂单失败<br>（不满足价格间距规则被撤单）</td><td>N/A</td><td>只推 <code>state: canceled</code>（不会有 <code>state: live</code>）</td></tr><tr><td>将要推出的 <code>rpi</code> 订单，<code>rpiPxRound: true</code>，<br>并且 price 被修改</td><td>N/A</td><td><code>state: live</code>（<code>amendSource: 6</code>，<code>amendResult: 0</code>） → <code>state: live</code></td></tr></tbody></table>

**生效时间**

*   对于 `rpi` 订单（包括将要弃用的 `elp` 订单）：模拟盘 —— **2026 年 7 月 23 日**；实盘 —— **2026 年 7 月 28 日**。
*   对于 `post_only` 和 `mmp_and_post_only` 订单：模拟盘和实盘均为 **2026 年 8 月中旬**。

**影响范围**

受影响的订单类型有：`post_only`、`mmp_and_post_only`、`rpi`（Retail Price Improvement）。

其他订单类型如 `limit`（普通限价单）、`market`（市价单）、`ioc`、`fok` 订单推送行为保持不变。

## ELP 更名为 RPI（散户价格优化）计划

**最近更新：2026年7月27日**  

OKX 将品牌 **Enhanced Liquidity Program（ELP）** 更名为 **Retail Price Improvement（散户价格优化，RPI）**。本次变更包含新的 RPI 合并深度订单簿（`books-rpi`，同时提供 WebSocket 与 REST）、更名后的挂单类型 `rpi`（替代 `elp`）、扩展后的下单参数 `rpiTakerAccess`（替代 `isElpTakerAccess`）、用于 RPI 挂单价格间距规则的新参数 `rpiPxRound`，以及更名后的账户字段 `rpi`/`rpiMaker`。预计于 **2026年7月23日** 在模拟盘上线，并于 **2026年7月28日** 正式上线。

**ELP 命名弃用截止日期：2026年10月31日**

在此日期之前，OKX 将以两种不同方式并行运行 ELP 与 RPI 命名：

*   **字段重命名**——两者都被接受；当请求或响应中同时包含两者时，以 RPI 命名的字段为准：
    *   `isElpTakerAccess` → `rpiTakerAccess`
    *   `elp` → `rpi`
    *   `elpMaker` → `rpiMaker`
*   **取值重命名**——互斥，只能二选一，不能同时传递：
    *   `ordType: elp` → `ordType: rpi`
    *   `books-elp` → `books-rpi`

现有集成可继续正常运行，无需改动。ELP 命名将于上述截止日期后停止支持——请在此之前完成所有集成向 RPI 命名的迁移。

### 新增合并深度：`books-rpi`（WS + REST）

*   新增 `books-rpi`，将非 RPI（有机）与 RPI 流动性合并为单一深度数据流——同时提供公共 WebSocket 频道（`/ws/v5/public`，400 档深度，初始全量推送 + 每 100 毫秒增量推送）与 REST 接口（`GET /api/v5/market/books-rpi`，服务端每 200 毫秒刷新一次）。不提供 `checksum`，WS 序列一致性依赖 `seqId`/`prevSeqId`。取代 `books-elp`（见上方迁移说明）。
    *   [WS / 深度频道](/zh/order-book-trading-market-data-ws-order-book-channel)

`asks`/`bids` 中的每个元素为 `[price, totalQty, nonRpiQty, count]`——`totalQty` 为该档位的总深度，`nonRpiQty` 为其中仅有机的部分，`count` 为该档位的汇总订单数量。

REST 请求参数：`instId`（必填）、`sz`（每侧深度档数，最大 `400`，默认 `1`）。

### 吃单参数：`rpiTakerAccess`（替代 `isElpTakerAccess`）

*   `rpiTakerAccess` 是 `isElpTakerAccess` 的更名并扩展，支持所有标准订单类型（`limit`、`market`、`fok`、`ioc`、`optimal_limit_ioc`；此前仅 `ioc`），并可在改单接口中设置。`isElpTakerAccess` 在弃用日期前将作为别名继续被接受（见上方迁移说明）。
*   错误码 `54045`（此前用于非 `ioc` 订单尝试吃取 RPI 流动性时返回）已废弃——现在 `rpiTakerAccess` 对所有订单类型均有效，该错误码不再可能触发。

均适用于下单/改单，REST + WS： - [POST / 下单](/zh/order-book-trading-trade-post-place-order) - [POST / 批量下单](/zh/order-book-trading-trade-post-place-multiple-orders) - [POST / 修改订单](/zh/order-book-trading-trade-post-amend-order) - [POST / 批量修改订单](/zh/order-book-trading-trade-post-amend-multiple-orders) - [WS / 下单](/zh/order-book-trading-trade-ws-place-order) - [WS / 批量下单](/zh/order-book-trading-trade-ws-place-multiple-orders) - [WS / 改单](/zh/order-book-trading-trade-ws-amend-order) - [WS / 批量改单](/zh/order-book-trading-trade-ws-amend-multiple-orders)

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rpiTakerAccess</td><td>Boolean</td><td>否</td><td>默认值为 <code>false</code>。<br>设为 <code>true</code> 时，订单可使用 RPI 流动性，适用于所有标准订单类型（此前仅 <code>ioc</code>）。<br>当 <code>rpiTakerAccess</code> 为 <code>true</code> 时，减速带机制在下单和改单时均适用于所有 <code>ordType</code>，包括 <code>post_only</code>。<br>改单时不会从原始订单继承，必须每次显式指定（省略则该次改单视为 <code>false</code>）。</td></tr></tbody></table>

### 挂单类型：`rpi`（替代 `elp`）

*   下 RPI 挂单时，请将 `ordType` 设为 `rpi` 而非 `elp`。`elp` 在弃用日期前将继续被接受（见上方迁移说明）——`ordType` 只能取一个值，二者选其一，不能同时传递。

适用于下单，REST + WS： - [POST / 下单](/zh/order-book-trading-trade-post-place-order) - [POST / 批量下单](/zh/order-book-trading-trade-post-place-multiple-orders) - [WS / 下单](/zh/order-book-trading-trade-ws-place-order) - [WS / 批量下单](/zh/order-book-trading-trade-ws-place-multiple-orders)

### 挂单参数：`rpiPxRound`

*   `rpiPxRound` 为新增参数，用于 RPI 挂单价格间距规则（详见下文）。仅对 RPI 挂单（`ordType: rpi`）生效；对非 RPI 订单及 `OPTION`/`EVENTS` 将被忽略。

均适用于下单/改单，REST + WS（接口列表同上方 `rpiTakerAccess`）。

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>是否必须</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rpiPxRound</td><td>Boolean</td><td>否</td><td>默认值为 <code>false</code>。设为 <code>true</code> 时，违反间距规则的价格将自动向外取整至最近的可挂单、且不会吃单的价位，而非直接拒绝。</td></tr></tbody></table>

*   在 `orders` WebSocket 私有频道新增 `amendSource` 枚举值 `6`：表示系统为满足 RPI 挂单价格间距规则（由 `rpiPxRound` 触发）而自动调整（取整）了订单价格。
    *   [WS / 订单频道](/zh/order-book-trading-trade-ws-order-channel)

### RPI 挂单价格间距规则

RPI 挂单需遵守间距规则（见下方 `rpiMinLevel` / `rpiMinPxBand`）。订单违反该规则时将被拒绝，除非 `rpiPxRound` 设为 `true`，此时价格会自动向外取整至最近的合规价位（见上方 `rpiPxRound`）。

*   新增返回参数 `rpiMinLevel` 与 `rpiMinPxBand`，用于展示各产品的间距阈值。
    *   [获取交易产品基础信息（公共）](/zh/public-data-rest-api-get-instruments)

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rpiMinLevel</td><td>String</td><td>RPI 买一价与卖一价之间的最小间距，以有机价格档位数计。默认值为 <code>4</code>；事件合约（Event Contracts）为 <code>0</code>。</td></tr><tr><td>rpiMinPxBand</td><td>String</td><td>满足间距规则所需的、与对方最优有机报价之间的最小距离，单位为基点（bps），例如 <code>20</code>。</td></tr></tbody></table>

### RPI 挂单权限字段：`rpi`（替代 `elp`）

*   新增返回参数 `rpi`，用于表示 RPI 挂单权限。`elp` 在弃用日期前将作为别名继续被接受（见上方迁移说明）。
    *   [获取交易产品基础信息（私有）](/zh/trading-account-rest-api-get-instruments)

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rpi</td><td>String</td><td>RPI 挂单权限。<br><code>0</code>：该产品未开通 RPI<br><code>1</code>：已开通，但当前用户无权限下 RPI 订单<br><code>2</code>：已开通且当前用户有权限<br>返回 <code>1</code>/<code>2</code> 不代表当前存在 RPI 流动性。</td></tr></tbody></table>

### RPI 挂单费率字段：`rpiMaker`（替代 `elpMaker`）

*   新增返回参数 `rpiMaker`，用于表示 RPI 挂单有效费率。`elpMaker` 在弃用日期前将作为别名继续被接受（见上方迁移说明）。
    *   [获取当前账户交易手续费费率](/zh/trading-account-rest-api-get-fee-rates)

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>rpiMaker</td><td>String</td><td>RPI 挂单有效费率，若该产品不适用 RPI 则返回 <code>""</code>。</td></tr></tbody></table>

### 成交来源字段：`source`

*   `GET /api/v5/market/trades` 返回字段 `source` 取值 `1` 的说明由"流动性增强计划订单"更新为 RPI 订单（原 ELP 订单）。返回的取值 `1` 本身不变，仅更新说明文字。
    *   [GET / 获取交易产品公共成交数据](/zh/order-book-trading-market-data-get-trades)
