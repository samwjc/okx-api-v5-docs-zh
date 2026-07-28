---
title: 标识符
outline: deep
---

<table><thead><tr><th>标识符</th><th>描述</th></tr></thead><tbody><tr><td>ordId</td><td>订单ID，全局唯一</td></tr><tr><td>clOrdId</td><td>客户自定义订单ID，所有交易产品挂单维度唯一</td></tr><tr><td>billId</td><td>账单ID，全局唯一</td></tr><tr><td>tradeId</td><td>最新成交ID，交易产品维度唯一<br>在强平、自动减仓场景下，tradeId字段的值为负数，以便和其他撮合成交场景区分</td></tr><tr><td>posId</td><td>持仓ID，由<code>mgnMode</code>+<code>posSide</code>+<code>instId</code>+<code>ccy</code>这几个字段所产生，可唯一地识别同一个账户内的持仓。<br>持仓 ID 不会因平仓及再开仓而变动。如果很久没有仓位的话，系统可能产生一个新的持仓 ID；切换账户模式、仓位模式时，系统也会产生一个新的持仓ID。</td></tr></tbody></table>
