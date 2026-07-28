---
title: 撮合交易
outline: deep
---

## 交易

`交易`功能模块下的API接口需要身份验证。

### POST / 下单

只有当您的账户有足够的资金才能下单。  
  

#### 限速：60次/2s

#### 跟单交易带单员带单产品的限速：4次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

#### HTTP请求

`POST /api/v5/trade/order`

> 请求示例

```
# 币币下单
POST /api/v5/trade/order
body
{
    "instId":"BTC-USDT",
    "tdMode":"cash",
    "clOrdId":"b15",
    "side":"buy",
    "ordType":"limit",
    "px":"2.15",
    "sz":"2"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 现货模式限价单
result = tradeAPI.place_order(
    instId="BTC-USDT",
    tdMode="cash",
    clOrdId="b15",
    side="buy",
    ordType="limit",
    px="2.15",
    sz="2"
)

print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br>保证金模式：<code>isolated</code>：逐仓（仅限于现货杠杆逐仓）；<code>cross</code>：全仓<br>非保证金模式：<code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单) ，现货带单时，<code>tdMode</code> 的值需要指定为<code>spot_isolated</code><br>注意：<code>isolated</code>（现货杠杆逐仓）在跨币种保证金模式和组合保证金模式下不可用。<br><br><font color="red">事件合约对应交易产品仅支持<code>isolated</code>逐仓下单</font></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向<br><code>buy</code>：买， <code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code>。 仅适用交割、永续。<code>SPOT</code> 或 <code>MARGIN</code> 订单请勿传此字段。交割/永续在开平仓模式下如未填写，返回错误码 51000。</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单，仅适用于<code>币币/杠杆/交割/永续</code><br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：以价格限制区间的最高买价（买单）或最低卖价（卖单）挂限价单，未成交部分立即取消（IOC）。仅适用交割、永续合约，订单不会以超出当前价格限制边界的价格成交<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>、<code>post_only</code>、<code>fok</code>、<code>ioc</code>、<code>mmp</code>、<code>mmp_and_post_only</code>类型的订单<br>期权下单时，px/pxUsd/pxVol 只能填一个</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，且为必填</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权下单<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权下单，例如 1 代表 100%<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">市价单委托数量<code>sz</code>的单位，仅适用于<code>币币</code>市价订单<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>买单默认<code>quote_ccy</code>， 卖单默认<code>base_ccy</code></td></tr><tr><td style="text-align: left">banAmend</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否禁止系统在余额不足时自动缩减币币市价单数量。true 或 false，默认false。<br>为true时：余额不足时，整笔订单将被拒绝。为false（默认）时：系统将缩减 sz 至可用余额所能支持的数量后执行。仅适用于币币市价单</td></tr><tr><td style="text-align: left">pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>px</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>px</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr><tr><td style="text-align: left">slippagePct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币、币币杠杆市价单（<code>tgtCcy</code> 为到手币种：买单为 <code>base_ccy</code>，卖单为 <code>quote_ccy</code>）的最大可接受滑点。<br>取值范围：<code>0</code> 至 <code>0.05</code>（即 0% 至 5%，含边界），以百分比形式表示时最多保留 2 位小数，例如 <code>0.01</code>（1%）和 <code>0.0123</code>（1.23%）合法；<code>0.01234</code>（1.234%）将被拒绝。<br>不填或为空时，默认为 <code>0.00%</code>。<br>不支持改单修改滑点，如需调整请撤单重新提交。<br>仅适用于币币和币币杠杆的市价单。</td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">自成交保护模式<br><code>cancel_maker</code>,<code>cancel_taker</code>, <code>cancel_both</code><br>Cancel both不支持FOK<br><br>默认使用账户层面的acctStpMode进行下单，该字段的默认值为<code>cancel_maker</code>，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。</td></tr><tr><td style="text-align: left">isElpTakerAccess</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否作为 taker 吃单 ELP<br><code>true</code>：该请求能吃单 ELP，但会被施加延迟<br><code>false</code>：该请求不能吃单 ELP，并且没有延迟<br><br>默认值为<code>false</code>，<code>true</code>仅适用于ioc订单</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给<code>algoClOrdId</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>对于条件止盈单，如果填写此参数，必须填写 止盈委托价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>tpTriggerPx</code> 和 <code>tpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>对于条件止盈单，如果填写此参数，必须填写 止盈触发价<br>对于限价止盈单，需填写此参数，不需要填写止盈触发价<br>委托价格为-1时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单<br>默认为<code>condition</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写 止损委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>slTriggerPx</code> 和 <code>slTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写 止损触发价<br>委托价格为-1时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">数量。仅适用于“多笔止盈”的止盈订单，且对于“多笔止盈”的止盈订单必填</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单，第一笔止盈触发时，止损触发价格是否移动到开仓均价止损<br><code>0</code>：不开启，默认值<br><code>1</code>：开启，且止损触发价不能为空</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的价距。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">激活价格。<br>激活价格是移动止盈止损的激活条件，当市场最新成交价达到或超过激活价格，委托被激活。激活后系统开始计算止盈止损的实际触发价格。如果不填写激活价格，即下单后就被激活。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "clOrdId":"oktswap6",
            "ordId":"12345689",
            "tag":"",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":"",
            "subCode": ""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败或成功时的msg</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（事件执行失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
tdMode  
交易模式，下单时需要指定  
**现货模式：**  
\- 币币和期权买方：cash  
**合约模式：**  
\- 逐仓杠杆（仅限于现货杠杆逐仓）：isolated  
\- 全仓杠杆：cross  
\- 币币：cash  
\- 全仓交割/永续/期权：cross  
**跨币种保证金模式：**  
\- 全仓币币：cross  
\- 全仓交割/永续/期权：cross  
**组合保证金模式：**  
\- 全仓币币：cross  
\- 全仓交割/永续/期权：cross
:::

::: tip
clOrdId  
clOrdId 是用户在 User ID 维度自定义的订单唯一标识符。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。  
clOrdId 不能与当前所有挂单（live 或 partially\_filled 状态）的 clOrdId 重复。订单达到终态（filled、canceled、mmp\_canceled）后，相同的 clOrdId 可重新用于新订单。系统不强制历史唯一性——当多笔订单共享同一 clOrdId 时，GET /api/v5/trade/order 仅返回最新一笔。"普通委托单"指通过本接口下的标准订单；clOrdId 不会传递至附带的止盈止损策略订单。
:::

::: tip
posSide  
持仓方向，买卖模式下此参数非必填，如果填写仅可以选择net；在开平仓模式下必填，且仅可选择 long 或 short。  
开平仓模式下，side和posSide需要进行组合  
开多：买入开多（side 填写 buy； posSide 填写 long ）  
开空：卖出开空（side 填写 sell； posSide 填写 short ）  
平多：卖出平多（side 填写 sell；posSide 填写 long ）  
平空：买入平空（side 填写 buy； posSide 填写 short ）  
组合保证金模式：交割和永续仅支持买卖模式  
SPOT 或 MARGIN 订单请勿传此字段。交割/永续在买卖模式下可不传或传 \`net\`。
:::

::: tip
ordType  
订单类型，创建新订单时必须指定，您指定的订单类型将影响需要哪些订单参数和撮合系统如何执行您的订单，以下是有效的ordType：  
普通委托：  
limit：限价单，要求指定sz 和 px  
market：市价单，币币和币币杠杆，是市价委托吃单；交割合约和永续合约，是自动以最高买/最低卖价格委托，遵循限价机制；期权合约不支持市价委托；由于市价委托无法确定成交价格，为确保有足够的资产买入设定数量的交易币种，会多冻结5%的计价币资产  
高级委托：  
post\_only：限价委托，在下单那一刻只做maker，如果该笔订单的任何部分会吃掉当前挂单深度，则该订单将被全部撤销。  
fok：限价委托，全部成交或立即取消，如果无法全部成交该笔订单，则该订单将被全部撤销。  
ioc：限价委托，立即成交并取消剩余，立即按照委托价格撮合成交，并取消该订单剩余未完成数量，不会在深度列表上展示委托数量。  
optimal\_limit\_ioc：以价格限制区间的最高买价（买单）或最低卖价（卖单）挂限价单，未成交部分立即取消（IOC），仅适用于交割合约和永续合约。订单不会以超出当前价格限制边界的价格成交。
:::

::: tip
sz  
交易数量，表示要购买或者出售的数量。  
当币币/币币杠杆以限价买入和卖出时，指交易货币数量。  
当币币杠杆以市价买入时，指计价货币的数量。  
当币币杠杆以市价卖出时，指交易货币的数量。  
对于币币市价单，单位由 tgtCcy 决定  
当交割、永续、期权买入和卖出时，指合约张数。合约面值 = sz × ctVal × markPx（正向合约）或 sz × ctVal（反向合约，USD 计价）。ctVal 和 ctType 可通过 GET /api/v5/public/instruments 获取。
:::

::: tip
reduceOnly  
只减仓，下单时，此参数设置为 true 时，表示此笔订单具有减仓属性，只会减少持仓数量，不会增加新的持仓仓位  
对于同一杠杆产品，所有反方向挂单的币数加上当前只减仓下单数量，不能超过仓位资产；负债还完后，如果还有剩余的委托数量，不会反向开仓，而是会进行币币交易。  
对于同一交割/永续产品，当前只减仓下单张数，加上价格时间优先于当前只减仓下单的只减仓挂单张数总和，不能超过持仓数量  
仅适用于\`合约模式\`和\`跨币种保证金模式\`  
仅适用于\`币币杠杆\`，以及买卖模式下的\`交割/永续\`  
注意：交割和永续合约在开平仓模式下，所有的平仓单都有只减仓逻辑，不受该字段传值的影响。  
如果 sz 超过当前持仓数量，整笔订单同样会被拒绝——系统不会自动截取至持仓数量。
:::

::: tip
tgtCcy  
市价单委托数量\`sz\`的单位：仅适用于币币市价下单交易。  
快速参考（以 BTC-USDT 为例）：  
\- tgtCcy=\`quote\_ccy\`，sz=100（买入）：花费 100 USDT 购买 BTC。  
\- tgtCcy=\`base\_ccy\`，sz=0.001（买入）：以市价买入 0.001 BTC。  
\- tgtCcy=\`base\_ccy\`，sz=0.001（卖出，默认）：卖出 0.001 BTC。  
\- tgtCcy=\`quote\_ccy\`，sz=100（卖出）：卖出 BTC 直至收到 100 USDT。  
交易货币：base\_ccy  
计价货币：quote\_ccy  
您在使用交易货币买入或者计价货币卖出时，请知晓：  
1.如果您输入的数量大于当前可买或者可卖的数量，系统将按照您的最大可买或者可卖数量帮您完成交易，如果您希望按照指定数量成交，那您可以尝试使用限价单，等待市场价格波动到锁定的余额可以买入或卖出您指定的数量。  
2.如果您输入的数量不大于当前可买或者可卖的数量，那当市场价格波动过大时，锁定的余额可能没办法买入您输入的交易货币数量或卖出您输入的计价货币数量，为保证您的交易体验，我们基于【能买多少买多少】或者【能卖多少卖多少】的原则，更改下单的数量帮您完成交易。此外，我们将尽量多锁定一点余额来规避更改下单数量的情况。  
2.1 交易币买入例子：  
以市价下单 买入 10个LTC为例，用户可买为11个，此时 10 < 11，挂单成功。当LTC-USDT的市价为200，用户被锁定余额为3,000 USDT，200\*10 < 3,000，最终成交10个LTC； 若市场波动过大，LTC-USDT的市价为400，此时400\*10 > 3,000，当用户被锁定的余额不够买入下单指定的交易货币数量时，系統使用用户被锁定的最大余额3,000 USDT下单买入，最终成交 3,000/400 = 7.5个 LTC。  
2.2 计价币卖出例子：  
以市价下单 卖出 1,000USDT为例，用户可卖为1,200USDT，1,000 < 1,200，挂单成功。LTC-USDT的市价为200，用户被锁定的余额为6个LTC，最终成交5个LTC； 若市场波动过大，LTC-USDT的市价为100，100\*6 < 1,000，当用户被锁定的余额不够卖出下单指定的计价货币数量时，系統使用用户被锁定的最大余额6个LTC下单，最终成交 6 \* 100 = 600 USDT。
:::

::: tip
px  
期权下单时，委托价格需为 tickSz 的整数倍。  
当不为整数倍时，取值规则以tickSz取 0.0005 为例：  
当委托价格对0.0005的余数大于0.00025或者委托价格小于0.0005时，向上取；  
当委托价格对0.0005的余数小于等于0.00025，且委托价格大于0.0005时，向下取。
:::

::: tip
对于下单附带止盈止损：  
附带的止盈止损订单仅在母单成交后才会激活。若母单在任何成交前被撤销，附带的止盈止损也将一并丢弃。如需独立于母单的止盈止损，请使用 POST /api/v5/trade/order-algo。  
1\. 只有当该订单成交时，才会生成止盈止损策略订单；若母单在成交前被撤销，则不会生成止盈止损策略订单。  
  
2\. tgtCcy 为 base\_ccy 时的市价买单和 tgtCcy 为 quote\_ccy 时的市价卖单，均不支持附带止盈止损  
3\. tpOrdKind 为 limit，且只有一笔单边止盈时，attachAlgoClOrdId 可以作为 clOrdId 在获取订单信息接口查询。  
4\. 对于“分批止盈”，包含限价止盈和触发止盈：  
\* 分批止盈的每笔止盈止损订单仅支持单向止盈止损，slTriggerPx&slOrdPx 与 tpTriggerPx&tpOrdPx 只能填写一组，否则 报错 51076  
\* 同一笔订单上附带分批止盈的止盈触发价类型 (tpTriggerPxType) 必须保持一致，否则报错 51080  
\* 同一笔订单上附带分批止盈的止盈触发价 (tpTriggerPx) 不能相等，否则报错 51081  
\* 在附带分批止盈时，止盈订单的数量不能为空，否则报错 51089  
\* 同一笔订单上分批止盈的止盈数量之和，需要等于订单的委托数量，否则报错 51083  
\* 同一笔订单上分批止盈的止盈委托不能超过 10 笔，否则报错 51079  
\* 币币/杠杆不支持开启'开仓价止损'，否则报错 51077  
\* 同一笔订单上附带分批止盈的止损委托单不能超过 1 笔，否则报错 51084  
\* 附带止盈止损开启'开仓价止损'时 (amendPxOnTriggerType 设置为 1)，该笔订单上的止盈委托单必须大于等于 2 笔，否则报错 51085  
\* 同一笔订单上附带分批止盈的止盈类型必须保持一致，否则报错 51091  
\* 同一笔订单上附带分批止盈的止盈委托价不能相等，否则报错 51092  
\* 同一笔订单上附带分批止盈，其中限价止盈的止盈委托价 (tpOrdPx) 不能为 -1 (市价)，否则报错 51093  
\* 币币、杠杆和期权交易不支持限价止盈，否则报错 51094
:::

::: tip
强制自成交保护  
交易系统会以母账户维度实施强制自成交保护，同一母账户下所有账户，包括母账户本身和所有子账户，都无法进行自成交。默认使用账户层面的acctStpMode进行下单，该字段的默认值为\`cancel\_maker\`，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。  
强制自成交保护不会导致延迟。  
有三种STP模式。STP模式始终基于taker订单中的配置。  
1.Cancel Maker：这是默认的STP模式，系统撤Maker订单以防止自成交。然后，taker订单会基于深度继续和下一个订单成交。  
2.Cancel Taker：撤Taker订单以防止自成交。如果用户的Maker订单不是深度里第一个订单，Taker订单会被部分成交，然后撤单。FOK订单会确保完全成交和自成交保护。  
3.Cancel Both：撤Taker和Maker订单以防止自成交。如果用户的Maker订单不是深度里第一个订单，Taker订单会被部分成交，然后Taker订单的剩余数量和第一个自我Maker订单被取消。此模式不支持FOK订单。将 stpMode=cancel\_both 与 ordType=\`fok\` 组合使用将返回错误码 50016。
:::

::: tip
tradeQuoteCcy  
对于特定国家和地区的用户，下单成功需要填写该参数，否则会取 \`instId\` 的计价币种为默认值，报错 51000。  
传值必须取 tradeQuoteCcyList 的枚举值，tradeQuoteCcyList 来自获取交易产品基础信息(GET /api/v5/account/instruments) 接口。
:::

::: tip
isElpTakerAccess:true订单限速  
\- 50个/2s，限制维度为 User ID + Instrument ID  
\- 该限速会在 REST 和 WebSocket 的下单及批量下单接口中共享
:::

### POST / 批量下单

每次最多可以批量提交20个新订单。请求参数应该按数组格式传递，会依次委托订单。  
  

#### 限速：300个/2s

#### 跟单交易带单员带单产品的限速：4个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`下单\`限速中。
:::

#### HTTP请求

`POST /api/v5/trade/batch-orders`

> 请求示例

```
# 币币批量下单
 POST /api/v5/trade/batch-orders
 body
 [
    {
        "instId":"BTC-USDT",
        "tdMode":"cash",
        "clOrdId":"b15",
        "side":"buy",
        "ordType":"limit",
        "px":"2.15",
        "sz":"2"
    },
    {
        "instId":"BTC-USDT",
        "tdMode":"cash",
        "clOrdId":"b16",
        "side":"buy",
        "ordType":"limit",
        "px":"2.15",
        "sz":"2"
    }
]
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 批量下单
place_orders_without_clOrdId = [
    {"instId": "BTC-USDT", "tdMode": "cash", "clOrdId": "b15", "side": "buy", "ordType": "limit", "px": "2.15", "sz": "2"},
    {"instId": "BTC-USDT", "tdMode": "cash", "clOrdId": "b16", "side": "buy", "ordType": "limit", "px": "2.15", "sz": "2"}
]

result = tradeAPI.place_multiple_orders(place_orders_without_clOrdId)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br>保证金模式：<code>isolated</code>：逐仓 ；<code>cross</code>：全仓<br>非保证金模式：<code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单) ，现货带单时，<code>tdMode</code> 的值需要指定为<code>spot_isolated</code><br>注意：<code>isolated</code> 在跨币种保证金模式和组合保证金模式下不可用。<br><br><font color="red">事件合约对应交易产品仅支持<code>isolated</code>逐仓下单</font></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-16位之间。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向 <code>buy</code>：买， <code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code>。 仅适用交割、永续。</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单，仅适用于<code>币币/杠杆/交割/永续</code><br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>、<code>post_only</code>、<code>fok</code>、<code>ioc</code>、<code>mmp</code>、<code>mmp_and_post_only</code>类型的订单<br>期权下单时，px/pxUsd/pxVol 只能填一个</td></tr><tr><td style="text-align: left">speedBump</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，且为必填</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权下单<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权下单，例如 1 代表 100%<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">市价单委托数量<code>sz</code>的单位，仅适用于<code>币币</code>市价订单<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>买单默认<code>quote_ccy</code>， 卖单默认<code>base_ccy</code></td></tr><tr><td style="text-align: left">banAmend</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否禁止币币市价改单，true 或 false，默认false<br>为true时，余额不足时，系统不会改单，下单会失败，仅适用于币币市价单</td></tr><tr><td style="text-align: left">pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>px</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>px</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">自成交保护模式<br><code>cancel_maker</code>,<code>cancel_taker</code>, <code>cancel_both</code><br>Cancel both不支持FOK<br><br>默认使用账户层面的acctStpMode进行下单，该字段的默认值为<code>cancel_maker</code>，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr><tr><td style="text-align: left">slippagePct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币、币币杠杆市价单（<code>tgtCcy</code> 为到手币种：买单为 <code>base_ccy</code>，卖单为 <code>quote_ccy</code>）的最大可接受滑点。<br>取值范围：<code>0</code> 至 <code>0.05</code>（即 0% 至 5%，含边界），以百分比形式表示时最多保留 2 位小数，例如 <code>0.01</code>（1%）和 <code>0.0123</code>（1.23%）合法；<code>0.01234</code>（1.234%）将被拒绝。<br>不填或为空时，默认为 <code>0.00%</code>。<br>不支持改单修改滑点，如需调整请撤单重新提交。<br>仅适用于币币和币币杠杆的市价单。</td></tr><tr><td style="text-align: left">isElpTakerAccess</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否作为 taker 吃单 ELP<br><code>true</code>：该请求能吃单 ELP，但会被施加延迟<br><code>false</code>：该请求不能吃单 ELP，并且没有延迟<br><br>默认值为<code>false</code>，<code>true</code>仅适用于ioc订单</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给<code>algoClOrdId</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>对于条件止盈单，如果填写此参数，必须填写 止盈委托价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>tpTriggerPx</code> 和 <code>tpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>对于条件止盈单，如果填写此参数，必须填写 止盈触发价<br>对于限价止盈单，需填写此参数，不需要填写止盈触发价<br>委托价格为-1时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单<br>默认为<code>condition</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写 止损委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>slTriggerPx</code> 和 <code>slTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。0 代表删除止损。</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写 止损触发价<br>委托价格为-1时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">数量。仅适用于"多笔止盈"的止盈订单，且对于"多笔止盈"的止盈订单必填</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单，第一笔止盈触发时，止损触发价格是否移动到开仓均价止损<br><code>0</code>：不开启，默认值<br><code>1</code>：开启，且止损触发价不能为空</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的价距。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">激活价格。<br>激活价格是移动止盈止损的激活条件，当市场最新成交价达到或超过激活价格，委托被激活。激活后系统开始计算止盈止损的实际触发价格。如果不填写激活价格，即下单后就被激活。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "clOrdId":"oktswap6",
            "ordId":"12345689",
            "tag":"",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":"",
            "subCode":""
        },
        {
            "clOrdId":"oktswap7",
            "ordId":"12344",
            "tag":"",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":"",
            "subCode":""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败或成功时的msg</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
在组合保证金账户模式下，或者全部成功，或者全部失败。
:::

::: tip
clOrdId  
clOrdId是用户自定义的唯一ID用来识别订单。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。 clOrdId不能与当前所有挂单和当前请求中的clOrdId重复。
:::

::: tip
isElpTakerAccess:true订单限速  
\- 50个/2s，限制维度为 User ID + Instrument ID  
\- 该限速会在 REST 和 WebSocket 的下单及批量下单接口中共享
:::

### POST / 撤单

撤销之前下的未完成订单。

#### 限速：60次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`POST /api/v5/trade/cancel-order`

> 请求示例

```
POST /api/v5/trade/cancel-order
body
{
    "ordId":"590908157585625111",
    "instId":"BTC-USDT"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 撤单
result = tradeAPI.cancel_order(instId="BTC-USDT", ordId = "590908157585625111")
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单ID， <code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户自定义ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "clOrdId":"oktswap6",
            "ordId":"12345689",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
撤单返回sCode等于0不能严格认为该订单已经被撤销，只表示您的撤单请求被系统服务器所接受，撤单结果以订单频道推送的状态或者查询订单状态为准
:::

### POST / 批量撤单

撤销未完成的订单，每次最多可以撤销20个订单。请求参数应该按数组格式传递。

#### 限速：300个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`撤单\`限速中。
:::

#### HTTP请求

`POST /api/v5/trade/cancel-batch-orders`

> 请求示例

```
POST /api/v5/trade/cancel-batch-orders
body
[
    {
        "instId":"BTC-USDT",
        "ordId":"590908157585625111"
    },
    {
        "instId":"BTC-USDT",
        "ordId":"590908544950571222"
    }
]
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 按ordId撤单
cancel_orders_with_orderId = [
    {"instId": "BTC-USDT", "ordId": "590908157585625111"},
    {"instId": "BTC-USDT", "ordId": "590908544950571222"}
]

result = tradeAPI.cancel_multiple_orders(cancel_orders_with_orderId)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-190927</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单ID， <code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户自定义ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "clOrdId":"oktswap6",
            "ordId":"12345689",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":""
        },
        {
            "clOrdId":"oktswap7",
            "ordId":"12344",
            "ts":"1695190491421",
            "sCode":"0",
            "sMsg":""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

### POST / 修改订单

修改当前未成交的挂单  

#### 限速：60次/2s

#### 跟单交易带单员带单产品的限速：4个/2s

#### 限速规则：User ID + Instrument ID

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

#### HTTP请求

`POST /api/v5/trade/amend-order`

> 请求示例

```
POST /api/v5/trade/amend-order
body
{
    "ordId":"590909145319051111",
    "newSz":"2",
    "instId":"BTC-USDT"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 修改订单
result = tradeAPI.amend_order(
    instId="BTC-USDT",
    ordId="590909145319051111",
    newSz="2"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">cxlOnFail</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">订单修改失败时是否自动撤单<br>有效值：<code>false</code> 或 <code>true</code>，默认值为 <code>false</code>。<br>修改失败的场景包括：<code>newSz</code> 不是 <code>lotSz</code> 的整数倍、超出仓位或风险限额等。<code>false</code>（默认）：修改失败时原订单继续保持不变。<code>true</code>：修改失败时原订单将自动撤销。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单ID<br><code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户自定义订单ID</td></tr><tr><td style="text-align: left">reqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义修改事件ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">newSz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">修改后的总目标委托量，必须大于0。这是期望的总委托量，而非剩余未成交量。对于部分成交的订单：如果已成交3张合约，您希望总量为8张，则填写 <code>newSz=8</code>（而非5）。系统将尝试成交剩余的5张。<code>newSz</code>、<code>newPx</code>（或期权的 <code>newPxUsd</code>/<code>newPxVol</code>）至少需要填写一个。</td></tr><tr><td style="text-align: left">newPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">修改后的新价格<br>修改的新价格期权改单时，newPx/newPxUsd/newPxVol 只能填一个，且必须与下单参数保持一致，如下单用px，改单时需使用newPx<br><code>newSz</code> 或 <code>newPx</code> 至少需要填写一个。</td></tr><tr><td style="text-align: left">speedBump</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">newPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权改单<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">newPxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权改单，如 1 代表 100%<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>newPx</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>newPx</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">修改附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，由系统生成，改单时必填，用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; newTpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>如果止盈触发价或者委托价为0，那代表删除止盈。</td></tr><tr><td style="text-align: left">&gt; newTpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newTpTriggerPx</code> 和 <code>newTpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。0 代表删除止盈。</td></tr><tr><td style="text-align: left">&gt; newTpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>委托价格为-1时，执行市价止盈。</td></tr><tr><td style="text-align: left">&gt; newTpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价<br>如果止损触发价或者委托价为0，那代表删除止损。</td></tr><tr><td style="text-align: left">&gt; newSlTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newSlTriggerPx</code> 和 <code>newSlTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。0 代表删除止损。</td></tr><tr><td style="text-align: left">&gt; newSlOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价<br>委托价格为-1时，执行市价止损。</td></tr><tr><td style="text-align: left">&gt; newTpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>只适用于<code>交割</code>/<code>永续</code><br>如果要新增止盈，该参数必填</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>只适用于<code>交割</code>/<code>永续</code><br>如果要新增止损，该参数必填</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的张数。仅适用于“多笔止盈”的止盈订单且必填</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; newCallbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度比例，如 <code>0.05</code> 代表 5%。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newCallbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度价距。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newActivePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">新的激活价格。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

::: tip
newSz  
修改的数量<=该笔订单已成交数量时，该订单的状态会修改为完全成交状态。
:::

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
         "clOrdId":"",
         "ordId":"12344",
         "ts":"1695190491421",
         "reqId":"b12344",
         "sCode":"0",
         "sMsg":"",
         "subCode": ""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义修改事件ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
修改订单返回sCode等于0不能严格认为该订单已经被修改，只表示您的修改订单请求被系统服务器所接受，改单结果以订单频道推送的状态或者查询订单状态为准
:::

### POST / 批量修改订单

修改未完成的订单，一次最多可批量修改20个订单。请求参数应该按数组格式传递。

#### 限速：300个/2s

#### 跟单交易带单员带单产品的限速：4个/2s

#### 限速规则：User ID + Instrument ID

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`修改订单\`限速中。
:::

#### HTTP请求

`POST /api/v5/trade/amend-batch-orders`

> 请求示例

```
POST /api/v5/trade/amend-batch-orders
body
[
    {
        "ordId":"590909308792049444",
        "newSz":"2",
        "instId":"BTC-USDT"
    },
    {
        "ordId":"590909308792049555",
        "newSz":"2",
        "instId":"BTC-USDT"
    }
]
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 按ordId修改未完成的订单
amend_orders_with_orderId = [
    {"instId": "BTC-USDT", "ordId": "590909308792049444","newSz":"2"},
    {"instId": "BTC-USDT", "ordId": "590909308792049555","newSz":"2"}
]

result = tradeAPI.amend_multiple_orders(amend_orders_with_orderId)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">cxlOnFail</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">订单修改失败时是否自动撤单<br>有效值：<code>false</code> 或 <code>true</code>，默认值为 <code>false</code>。<br>修改失败的场景包括：<code>newSz</code> 不是 <code>lotSz</code> 的整数倍、超出仓位或风险限额等。<code>false</code>（默认）：修改失败时原订单继续保持不变。<code>true</code>：修改失败时原订单将自动撤销。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单ID， <code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户自定义order ID</td></tr><tr><td style="text-align: left">reqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义修改事件ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">newSz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">修改的新数量，必须大于0，对于部分成交订单，该数量应包含已成交数量。</td></tr><tr><td style="text-align: left">newPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">修改后的新价格<br>修改的新价格期权改单时，newPx/newPxUsd/newPxVol 只能填一个，且必须与下单参数保持一致，如下单用px，改单时需使用newPx</td></tr><tr><td style="text-align: left">speedBump</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">newPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权改单<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">newPxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权改单，如 1 代表 100%<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>newPx</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>newPx</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，由系统生成，改单时必填，用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; newTpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>如果止盈触发价或者委托价为0，那代表删除止盈。</td></tr><tr><td style="text-align: left">&gt; newTpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newTpTriggerPx</code> 和 <code>newTpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。 0 means to delete the take-profit.</td></tr><tr><td style="text-align: left">&gt; newTpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>委托价格为-1时，执行市价止盈。</td></tr><tr><td style="text-align: left">&gt; newTpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价<br>如果止损触发价或者委托价为0，那代表删除止损。</td></tr><tr><td style="text-align: left">&gt; newSlTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newSlTriggerPx</code> 和 <code>newSlTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。0 means to delete the stop-loss.</td></tr><tr><td style="text-align: left">&gt; newSlOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价<br>委托价格为-1时，执行市价止损。</td></tr><tr><td style="text-align: left">&gt; newTpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>只适用于<code>交割</code>/<code>永续</code><br>如果要新增止盈，该参数必填</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>只适用于<code>交割</code>/<code>永续</code><br>如果要新增止损，该参数必填</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的张数。仅适用于“多笔止盈”的止盈订单且必填</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; newCallbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度比例，如 <code>0.05</code> 代表 5%。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newCallbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度价距。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newActivePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">新的激活价格。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

::: tip
newSz  
修改的数量<=该笔订单已成交数量时，该订单的状态会修改为完全成交状态。
:::

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "clOrdId":"oktswap6",
            "ordId":"12345689",
            "ts":"1695190491421",
            "reqId":"b12344",
            "sCode":"0",
            "sMsg":"",
            "subCode": ""
        },
        {
            "clOrdId":"oktswap7",
            "ordId":"12344",
            "ts":"1695190491421",
            "reqId":"b12344",
            "sCode":"0",
            "sMsg":"",
            "subCode": ""
        }
    ],
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义修改事件ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code><br>返回的时间是请求验证后的时间。</td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">REST网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

### POST / 市价仓位全平

市价平掉指定交易产品的持仓

#### 限速：20次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`POST /api/v5/trade/close-position`

> 请求示例

```
POST /api/v5/trade/close-position
body
{
    "instId":"BTC-USDT-SWAP",
    "mgnMode":"cross"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 市价全平
result = tradeAPI.close_positions(
    instId="BTC-USDT-SWAP",
    mgnMode="cross"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br>买卖模式下：可不填写此参数，默认值net，如果填写，仅可以填写net<br>开平仓模式下： 必须填写此参数，且仅可以填写 <code>long</code>：平多 ，<code>short</code>：平空</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓 ； <code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">保证金币种，<code>合约模式</code>下的全仓币币杠杆平仓必填</td></tr><tr><td style="text-align: left">autoCxl</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">当市价全平时，平仓单是否需要自动撤销,默认为false.<br><code>false</code>：不自动撤单 <code>true</code>：自动撤单</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "clOrdId": "",
            "instId": "BTC-USDT-SWAP",
            "posSide": "long",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr></tbody></table>

::: tip
如果不自动撤单，那有任何平仓挂单的情况下，市价全平会返回错误码信息，提示用户先撤销平仓挂单
:::

### GET / 获取订单信息

查订单信息

#### 限速：60次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`GET /api/v5/trade/order`

> 请求示例

```
GET /api/v5/trade/order?ordId=1753197687182819328&instId=BTC-USDT
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 通过 ordId 查询订单
result = tradeAPI.get_order(
    instId="BTC-USDT",
    ordId="680800019749904384"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code><br>只适用于交易中的产品</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单ID，<code>ordId</code>和<code>clOrdId</code>必须传一个，若传两个，以<code>ordId</code>为主</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户自定义ID<br>如果<code>clOrdId</code>关联了多个订单，只会返回最近的那笔订单</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0.00192834",
            "algoClOrdId": "",
            "algoId": "",
            "attachAlgoClOrdId": "",
            "attachAlgoOrds": [],
            "avgPx": "51858",
            "cTime": "1708587373361",
            "cancelSource": "",
            "cancelSourceReason": "",
            "category": "normal",
            "ccy": "",
            "clOrdId": "",
            "fee": "-0.00000192834",
            "feeCcy": "BTC",
            "fillPx": "51858",
            "fillSz": "0.00192834",
            "fillTime": "1708587373361",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTpLimit": "false",
            "lever": "",
            "linkedAlgoOrd": {
                "algoId": ""
            },
            "ordId": "680800019749904384",
            "ordType": "market",
            "pnl": "0",
            "posSide": "net",
            "px": "",
            "pxType": "",
            "pxUsd": "",
            "pxVol": "",
            "quickMgnType": "",
            "rebate": "0",
            "rebateCcy": "USDT",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "source": "",
            "state": "filled",
            "stpId": "",
            "stpMode": "",
            "sz": "100",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "quote_ccy",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "tpTriggerPxType": "",
            "tradeId": "744876980",
            "tradeQuoteCcy": "USDT",
            "uTime": "1708587373362"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格，对于期权，以币(如BTC, ETH)为单位</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">期权价格，以USD为单位<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">期权订单的隐含波动率<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxType</td><td style="text-align: left">String</td><td style="text-align: left">期权的价格类型<br><code>px</code>：代表按价格下单，单位为币 (请求参数 px 的数值单位是BTC或ETH)<br><code>pxVol</code>：代表按pxVol下单<br><code>pxUsd</code>：代表按照pxUsd下单，单位为USD (请求参数px 的数值单位是USD)</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益(不包括手续费)<br>适用于有成交的平仓订单，其他情况均为0</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">自下单以来的累计成交数量。在WebSocket订单频道推送中，<code>accFillSz</code> 始终表示累计总量，而非本次推送的增量。<br>对于<code>币币</code>和<code>杠杆</code>，单位为交易货币，如 BTC-USDT, 单位为 BTC；<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格，如果成交数量为0，该字段为""</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最近一次单笔成交数量（非累计）。累计成交总量请使用 <code>accFillSz</code>。<br>对于<code>币币</code>和<code>杠杆</code>，单位为交易货币，如 BTC-USDT, 单位为 BTC；<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">成交均价，如果成交数量为0，该字段也为""</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态：<br><code>live</code>：已在订单簿中，尚无成交。<br><code>partially_filled</code>：部分成交，仍在订单簿中。<br><code>filled</code>：完全成交，终态。<br><code>canceled</code>：撤单，终态。IOC 订单被撤销时可能存在部分成交，此时 <code>accFillSz</code> 不为零。<br><code>mmp_canceled</code>：由做市商保护机制自动撤单，终态。<br>注意：GET /api/v5/trade/orders-pending 仅返回 <code>live</code> 和 <code>partially_filled</code>；GET /api/v5/trade/orders-history 返回 <code>filled</code>、<code>canceled</code> 和 <code>mmp_canceled</code>。</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，改单时，可用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">张数。仅适用于“多笔止盈”的止盈订单</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的错误码，默认为"",<br>委托失败时有值，如 51020</td></tr><tr><td style="text-align: left">&gt; failReason</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的原因，默认为""<br>委托失败时有值</td></tr><tr><td style="text-align: left">linkedAlgoOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止损订单信息，仅适用于包含限价止盈单的双向止盈止损订单，触发后生成的普通订单</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单唯一标识</td></tr><tr><td style="text-align: left">stpId</td><td style="text-align: left">String</td><td style="text-align: left"><del>自成交保护ID<br>如果自成交保护不适用则返回""</del>（已弃用）</td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">自成交保护模式</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种<br>对于币币和杠杆的挂单卖单，表示计价币种；其他情况下，表示收取手续费的币种。</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额。符号规则：负数表示向平台净支付手续费；正数表示从平台净获得返佣。该净额已包含手续费与返佣的轧差。<br>对于币币和杠杆（除挂单卖单外）：平台收取的累计手续费，始终为负数。<br>对于币币和杠杆的挂单卖单、交割、永续和期权：累计手续费和返佣（币币和杠杆挂单卖单始终以计价币种计算）。<br>如需分开核算，请结合 <code>feeCcy</code>+<code>fee</code> 与 <code>rebateCcy</code>+<code>rebate</code> 使用，两者货币种类可能不同。</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种<br>对于币币和杠杆的挂单卖单，表示交易币种；其他情况下，表示支付返佣的币种。</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣金额，仅适用于币币和杠杆<br>对于挂单卖单：以交易币种为单位的<del>累计手续费和</del>返佣金额。<br>其他情况下，表示挂单返佣金额，始终为正数，如无返佣则返回""。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源（列表不完整——如遇未知值请做容错处理，后续可能新增类型）：<br><code>6</code>：计划委托策略触发后生成的普通单<br><code>7</code>：止盈止损策略触发后生成的普通单<br><code>13</code>：策略委托单触发后生成的普通单<br><code>25</code>：移动止盈止损策略触发后生成的普通单<br><code>34</code>：追逐限价委托生成的普通单<br>所有值均表示由母策略或算法订单触发生成的系统子单。</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">订单种类：<br><code>normal</code>：用户正常下单。<br><code>twap</code>：系统生成的强制还款单（非TWAP算法策略）。<br><code>adl</code>：ADL自动减仓，系统触发的仓位削减。<br><code>full_liquidation</code>：因保证金不足触发的全仓强制平仓。<br><code>partial_liquidation</code>：因保证金不足触发的部分强制平仓。<br><code>delivery</code>：期货/期权到期结算执行。<br><code>ddh</code>：期权做市商系统触发的Delta动态对冲单。<br><code>auto_conversion</code>：系统触发的资产自动转换单。</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">cancelSource</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的原因枚举值代码</td></tr><tr><td style="text-align: left">cancelSourceReason</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的对应具体原因</td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID。策略订单触发，且策略单有<code>algoClOrdId</code>时有值，否则为"",</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID，策略订单触发时有值，否则为""</td></tr><tr><td style="text-align: left">isTpLimit</td><td style="text-align: left">String</td><td style="text-align: left">是否为限价止盈，true 或 false.</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单状态更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code></td></tr></tbody></table>

### GET / 获取未成交订单列表

获取当前账户下所有未成交订单信息

#### 限速：60次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/orders-pending`

> 请求示例

```
GET /api/v5/trade/orders-pending?ordType=post_only,fok,ioc&instType=SPOT
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询所有未成交订单
result = tradeAPI.get_order_list(
    instType="SPOT",
    ordType="post_only,fok,ioc"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单状态<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0",
            "algoClOrdId": "",
            "algoId": "",
            "attachAlgoClOrdId": "",
            "attachAlgoOrds": [],
            "avgPx": "",
            "cTime": "1724733617998",
            "cancelSource": "",
            "cancelSourceReason": "",
            "category": "normal",
            "ccy": "",
            "clOrdId": "",
            "fee": "0",
            "feeCcy": "BTC",
            "fillPx": "",
            "fillSz": "0",
            "fillTime": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTpLimit": "false",
            "lever": "",
            "linkedAlgoOrd": {
                "algoId": ""
            },
            "ordId": "1752588852617379840",
            "ordType": "post_only",
            "pnl": "0",
            "posSide": "net",
            "px": "13013.5",
            "pxType": "",
            "pxUsd": "",
            "pxVol": "",
            "quickMgnType": "",
            "rebate": "0",
            "rebateCcy": "USDT",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "source": "",
            "state": "live",
            "stpId": "",
            "stpMode": "cancel_maker",
            "sz": "0.001",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "tpTriggerPxType": "",
            "tradeId": "",
            ”tradeQuoteCcy“: "USDT",
            "uTime": "1724733617998"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格，对于期权，以币(如BTC, ETH)为单位</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">期权价格，以USD为单位<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">期权订单的隐含波动率<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxType</td><td style="text-align: left">String</td><td style="text-align: left">期权的价格类型<br><code>px</code>：代表按价格下单，单位为币 (请求参数 px 的数值单位是BTC或ETH)<br><code>pxVol</code>：代表按pxVol下单<br><code>pxUsd</code>：代表按照pxUsd下单，单位为USD (请求参数px 的数值单位是USD)</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益(不包括手续费)<br>适用于有成交的平仓订单，其他情况均为0</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">累计成交数量</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格。如果还没成交，系统返回""。</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">成交均价。如果还没成交，系统返回<code>0</code>。</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，改单时，可用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">张数。仅适用于”多笔止盈”的止盈订单</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的错误码，默认为””,<br>委托失败时有值，如 51020</td></tr><tr><td style="text-align: left">&gt; failReason</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的原因，默认为””<br>委托失败时有值</td></tr><tr><td style="text-align: left">linkedAlgoOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止损订单信息，仅适用于包含限价止盈单的双向止盈止损订单，触发后生成的普通订单</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单唯一标识</td></tr><tr><td style="text-align: left">stpId</td><td style="text-align: left">String</td><td style="text-align: left"><del>自成交保护ID<br>如果自成交保护不适用则返回""</del>（已弃用）</td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">自成交保护模式</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种<br>对于币币和杠杆的挂单卖单，表示计价币种；其他情况下，表示收取手续费的币种。</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额<br>对于币币和杠杆（除挂单卖单外）：平台收取的累计手续费，始终为负数。<br>对于币币和杠杆的挂单卖单、交割、永续和期权：累计手续费和返佣（币币和杠杆挂单卖单始终以计价币种计算）。</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种<br>对于币币和杠杆的挂单卖单，表示交易币种；其他情况下，表示支付返佣的币种。</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣金额，仅适用于币币和杠杆<br>对于挂单卖单：以交易币种为单位的<del>累计手续费和</del>返佣金额。<br>其他情况下，表示挂单返佣金额，始终为正数，如无返佣则返回""。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>6</code>：计划委托策略触发后的生成的普通单<br><code>7</code>：止盈止损策略触发后的生成的普通单<br><code>13</code>：策略委托单触发后的生成的普通单<br><code>25</code>：移动止盈止损策略触发后的生成的普通单<br><code>34</code>: 追逐限价委托生成的普通单</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">订单种类<br><code>normal</code>：普通委托<br><code>twap</code>：TWAP自动换币<br><code>adl</code>：ADL自动减仓<br><code>full_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单<br><code>auto_conversion</code>：抵押借币自动还币订单</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID。策略订单触发，且策略单有<code>algoClOrdId</code>是有值，否则为"",</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID，策略订单触发时有值，否则为""</td></tr><tr><td style="text-align: left">isTpLimit</td><td style="text-align: left">String</td><td style="text-align: left">是否为限价止盈，true 或 false.</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单状态更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cancelSource</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的原因枚举值代码</td></tr><tr><td style="text-align: left">cancelSourceReason</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的对应具体原因</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code></td></tr></tbody></table>

### GET / 获取历史订单记录（近七天）

获取最近7天挂单，且完成的订单数据，包括7天以前挂单，但近7天才成交的订单数据。按照订单创建时间倒序排序。  

已经撤销的未成交单 只保留2小时

#### 限速：40次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/orders-history`

> 请求示例

```
GET /api/v5/trade/orders-history?ordType=post_only,fok,ioc&instType=SPOT
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询币币历史订单（7天内）
# 已经撤销的未成交单 只保留2小时
result = tradeAPI.get_orders_history(
    instType="SPOT",
    ordType="post_only,fok,ioc"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如<code>BTC-USD-190927</code></td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交<br><code>mmp_canceled</code>：做市商保护机制导致的自动撤单</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单种类<br><code>twap</code>：TWAP自动换币<br><code>adl</code>：ADL自动减仓<br><code>full_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>cTime</code>，Unix 时间戳为毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>cTime</code>，Unix 时间戳为毫秒数格式，如 1597027383085</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0.00192834",
            "algoClOrdId": "",
            "algoId": "",
            "attachAlgoClOrdId": "",
            "attachAlgoOrds": [],
            "avgPx": "51858",
            "cTime": "1708587373361",
            "cancelSource": "",
            "cancelSourceReason": "",
            "category": "normal",
            "ccy": "",
            "clOrdId": "",
            "fee": "-0.00000192834",
            "feeCcy": "BTC",
            "fillPx": "51858",
            "fillSz": "0.00192834",
            "fillTime": "1708587373361",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTpLimit": "false",
            "lever": "",
            "ordId": "680800019749904384",
            "ordType": "market",
            "pnl": "0",
            "posSide": "",
            "px": "",
            "pxType": "",
            "pxUsd": "",
            "pxVol": "",
            "quickMgnType": "",
            "rebate": "0",
            "rebateCcy": "USDT",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "source": "",
            "state": "filled",
            "stpId": "",
            "stpMode": "",
            "sz": "100",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "quote_ccy",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "tpTriggerPxType": "",
            "tradeId": "744876980",
            ”tradeQuoteCcy“: "USDT",
            "uTime": "1708587373362",
            "linkedAlgoOrd": {
                "algoId": ""
            }
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格，对于期权，以币(如BTC, ETH)为单位</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">期权价格，以USD为单位<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">期权订单的隐含波动率<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxType</td><td style="text-align: left">String</td><td style="text-align: left">期权的价格类型<br><code>px</code>：代表按价格下单，单位为币 (请求参数 px 的数值单位是BTC或ETH)<br><code>pxVol</code>：代表按pxVol下单<br><code>pxUsd</code>：代表按照pxUsd下单，单位为USD (请求参数px 的数值单位是USD)</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">累计成交数量</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格，如果成交数量为0，该字段为""</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">成交均价，如果成交数量为0，该字段也为""</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交<br><code>mmp_canceled</code>：做市商保护机制导致的自动撤单</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，改单时，可用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">张数。仅适用于“多笔止盈”的止盈订单</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的错误码，默认为"",<br>委托失败时有值，如 51020</td></tr><tr><td style="text-align: left">&gt; failReason</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的原因，默认为""<br>委托失败时有值</td></tr><tr><td style="text-align: left">linkedAlgoOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止损订单信息，仅适用于包含限价止盈单的双向止盈止损订单，触发后生成的普通订单</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单唯一标识</td></tr><tr><td style="text-align: left">stpId</td><td style="text-align: left">String</td><td style="text-align: left"><del>自成交保护ID<br>如果自成交保护不适用则返回""</del>（已弃用）</td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">自成交保护模式</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种<br>对于币币和杠杆的挂单卖单，表示计价币种；其他情况下，表示收取手续费的币种。</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额<br>对于币币和杠杆（除挂单卖单外）：平台收取的累计手续费，始终为负数。<br>对于币币和杠杆的挂单卖单、交割、永续和期权：累计手续费和返佣（币币和杠杆挂单卖单始终以计价币种计算）。</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种<br>对于币币和杠杆的挂单卖单，表示交易币种；其他情况下，表示支付返佣的币种。</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣金额，仅适用于币币和杠杆<br>对于挂单卖单：以交易币种为单位的<del>累计手续费和</del>返佣金额。<br>其他情况下，表示挂单返佣金额，始终为正数，如无返佣则返回""。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>6</code>：计划委托策略触发后的生成的普通单<br><code>7</code>：止盈止损策略触发后的生成的普通单<br><code>13</code>：策略委托单触发后的生成的普通单<br><code>25</code>：移动止盈止损策略触发后的生成的普通单<br><code>34</code>: 追逐限价委托生成的普通单</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益(不包括手续费)<br>适用于有成交的平仓订单，其他情况均为0</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">订单种类<br><code>normal</code>：普通委托<br><code>twap</code>：TWAP自动换币<br><code>adl</code>：ADL自动减仓<br><code>full_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单<br><code>auto_conversion</code>：抵押借币自动还币订单</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">cancelSource</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的原因枚举值代码</td></tr><tr><td style="text-align: left">cancelSourceReason</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的对应具体原因</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID。策略订单触发，且策略单有<code>algoClOrdId</code>时有值，否则为"",</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID，策略订单触发时有值，否则为""</td></tr><tr><td style="text-align: left">isTpLimit</td><td style="text-align: left">String</td><td style="text-align: left">是否为限价止盈，true 或 false.</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单状态更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code></td></tr></tbody></table>

### GET / 获取历史订单记录（近三个月）

获取最近3个月挂单，且完成的订单数据，包括3个月以前挂单，但近3个月才成交的订单数据。按照订单创建时间倒序排序。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/orders-history-archive`

> 请求示例

```
GET /api/v5/trade/orders-history-archive?ordType=post_only,fok,ioc&instType=SPOT
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询币币历史订单（3月内）
result = tradeAPI.get_orders_history_archive(
    instType="SPOT",
    ordType="post_only,fok,ioc"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交<br><code>mmp_canceled</code>：做市商保护机制导致的自动撤单</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单种类<br><code>twap</code>：TWAP自动换币<br><code>adl</code>：ADL自动减仓<br><code>full_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>cTime</code>，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>cTime</code>，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0.00192834",
            "algoClOrdId": "",
            "algoId": "",
            "attachAlgoClOrdId": "",
            "attachAlgoOrds": [],
            "avgPx": "51858",
            "cTime": "1708587373361",
            "cancelSource": "",
            "cancelSourceReason": "",
            "category": "normal",
            "ccy": "",
            "clOrdId": "",
            "fee": "-0.00000192834",
            "feeCcy": "BTC",
            "fillPx": "51858",
            "fillSz": "0.00192834",
            "fillTime": "1708587373361",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTpLimit": "false",
            "lever": "",
            "ordId": "680800019749904384",
            "ordType": "market",
            "pnl": "0",
            "posSide": "",
            "px": "",
            "pxType": "",
            "pxUsd": "",
            "pxVol": "",
            "quickMgnType": "",
            "rebate": "0",
            "rebateCcy": "USDT",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "source": "",
            "state": "filled",
            "stpId": "",
            "stpMode": "",
            "sz": "100",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "quote_ccy",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "tpTriggerPxType": "",
            "tradeId": "744876980",
            ”tradeQuoteCcy“: "USDT",
            "uTime": "1708587373362",
            "linkedAlgoOrd": {
                "algoId": ""
            }
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格，对于期权，以币(如BTC, ETH)为单位</td></tr><tr><td style="text-align: left">pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">期权价格，以USD为单位<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxVol</td><td style="text-align: left">String</td><td style="text-align: left">期权订单的隐含波动率<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">pxType</td><td style="text-align: left">String</td><td style="text-align: left">期权的价格类型<br><code>px</code>：代表按价格下单，单位为币 (请求参数 px 的数值单位是BTC或ETH)<br><code>pxVol</code>：代表按pxVol下单<br><code>pxUsd</code>：代表按照pxUsd下单，单位为USD (请求参数px 的数值单位是USD)</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">累计成交数量</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格，如果成交数量为0，该字段为""</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交ID</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">最新成交时间</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">成交均价，如果成交数量为0，该字段也为""</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>canceled</code>：撤单成功<br><code>filled</code>：完全成交<br><code>mmp_canceled</code>：做市商保护机制导致的自动撤单</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">stpId</td><td style="text-align: left">String</td><td style="text-align: left"><del>自成交保护ID<br>如果自成交保护不适用则返回""</del>（已弃用）</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，改单时，可用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">张数。仅适用于“多笔止盈”的止盈订单</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的错误码，默认为"",<br>委托失败时有值，如 51020</td></tr><tr><td style="text-align: left">&gt; failReason</td><td style="text-align: left">String</td><td style="text-align: left">委托失败的原因，默认为""<br>委托失败时有值</td></tr><tr><td style="text-align: left">linkedAlgoOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止损订单信息，仅适用于包含限价止盈单的双向止盈止损订单，触发后生成的普通订单</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单唯一标识</td></tr><tr><td style="text-align: left">stpMode</td><td style="text-align: left">String</td><td style="text-align: left">自成交保护模式</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种<br>对于币币和杠杆的挂单卖单，表示计价币种；其他情况下，表示收取手续费的币种。</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额<br>对于币币和杠杆（除挂单卖单外）：平台收取的累计手续费，始终为负数。<br>对于币币和杠杆的挂单卖单、交割、永续和期权：累计手续费和返佣（币币和杠杆挂单卖单始终以计价币种计算）。</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种<br>对于币币和杠杆的挂单卖单，表示交易币种；其他情况下，表示支付返佣的币种。</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣金额，仅适用于币币和杠杆<br>对于挂单卖单：以交易币种为单位的<del>累计手续费和</del>返佣金额。<br>其他情况下，表示挂单返佣金额，始终为正数，如无返佣则返回""。</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益(不包括手续费)<br>适用于有成交的平仓订单，其他情况均为0</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>6</code>：计划委托策略触发后的生成的普通单<br><code>7</code>：止盈止损策略触发后的生成的普通单<br><code>13</code>：策略委托单触发后的生成的普通单<br><code>25</code>：移动止盈止损策略触发后的生成的普通单<br><code>34</code>: 追逐限价委托生成的普通单</td></tr><tr><td style="text-align: left">category</td><td style="text-align: left">String</td><td style="text-align: left">订单种类<br><code>normal</code>：普通委托<br><code>twap</code>：TWAP自动换币<br><code>adl</code>：ADL自动减仓<br><code>full_liquidation</code>：强制平仓<br><code>partial_liquidation</code>：强制减仓<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单<br><code>auto_conversion</code>：抵押借币自动还币订单</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">cancelSource</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的原因枚举值代码</td></tr><tr><td style="text-align: left">cancelSourceReason</td><td style="text-align: left">String</td><td style="text-align: left">订单取消来源的对应具体原因</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID。策略订单触发，且策略单有<code>algoClOrdId</code>是有值，否则为"",</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID，策略订单触发时有值，否则为""</td></tr><tr><td style="text-align: left">isTpLimit</td><td style="text-align: left">String</td><td style="text-align: left">是否为限价止盈，true 或 false.</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单状态更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code></td></tr></tbody></table>

::: tip
该接口不包含\`已撤销的完全无成交\`类型订单数据，可通过\`获取历史订单记录（近七天)\`接口获取。
:::

::: tip
对于已完成的期权订单，如果是px订单，pxVol 和 pxUsd 会实时更新，如果是 pxUsd 订单，pxVol 会实时更新，如果是pxVol 订单，pxUsd 会实时更新。
:::

### GET / 获取成交明细（近三天）

获取近3天的订单成交明细信息

#### 限速：60次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/fills`

> 请求示例

```
GET /api/v5/trade/fills
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 获取成交明细
result = tradeAPI.get_fills()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品 ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">成交类型<br><code>1</code>：买入<br><code>2</code>：卖出<br><code>3</code>：开多<br><code>4</code>：开空<br><code>5</code>：平多<br><code>6</code>：平空<br><code>100</code>：强减平多<br><code>101</code>：强减平空<br><code>102</code>：强减买入<br><code>103</code>：强减卖出<br><code>104</code>：强平平多<br><code>105</code>：强平平空<br><code>106</code>：强平买入<br><code>107</code>：强平卖出<br><code>110</code>：强平换币转入<br><code>111</code>：强平换币转出<br><code>118</code>：系统换币转入<br><code>119</code>：系统换币转出<br><code>112</code>：交割平多<br><code>113</code>：交割平空<br><code>125</code>：自动减仓平多<br><code>126</code>：自动减仓平空<br><code>127</code>：自动减仓买入<br><code>128</code>：自动减仓卖出<br><code>212</code>：一键借币的自动借币<br><code>213</code>：一键借币的自动还币<br><code>204</code>：大宗交易买<br><code>205</code>：大宗交易卖<br><code>206</code>：大宗交易开多<br><code>207</code>：大宗交易开空<br><code>208</code>：大宗交易平多<br><code>209</code>：大宗交易平空<br><code>236</code>：小额兑换买入<br><code>237</code>：小额兑换卖出<br><code>270</code>：价差交易买<br><code>271</code>：价差交易卖<br><code>272</code>：价差交易开多<br><code>273</code>：价差交易开空<br><code>274</code>：价差交易平多<br><code>275</code>：价差交易平空<br><code>324</code>：移仓买入<br><code>325</code>：移仓卖出<br><code>326</code>：移仓开多<br><code>327</code>：移仓开空<br><code>328</code>：移仓平多<br><code>329</code>：移仓平空<br><code>376</code>：质押借币超限买入<br><code>377</code>： 质押借币超限卖出<br><code>410</code>：买入yes<br><code>411</code>：买入no<br><code>412</code>：卖出yes<br><code>413</code>：卖出no<br><code>414</code>：yes结算<br><code>415</code>：no结算</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之前（更旧的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之后（更新的数据）的分页内容，传的值为对应接口的<code>billId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "side": "buy",
            "fillSz": "0.00192834",
            "fillPx": "51858",
            "fillPxVol": "",
            "fillFwdPx": "",
            "fee": "-0.00000192834",
            "fillPnl": "0",
            "ordId": "680800019749904384",
            "feeRate": "-0.001",
            "instType": "SPOT",
            "fillPxUsd": "",
            "instId": "BTC-USDT",
            "clOrdId": "",
            "posSide": "net",
            "billId": "680800019754098688",
            "subType": "1",
            "fillMarkVol": "",
            "tag": "",
            "fillTime": "1708587373361",
            "execType": "T",
            "fillIdxPx": "",
            "tradeId": "744876980",
            "fillMarkPx": "",
            "feeCcy": "BTC",
            "ts": "1708587373362",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交 ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义订单ID</td></tr><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单 ID</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">成交类型</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格，同"账单流水查询"的 px</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 如 LTC-ETH，该字段返回LTC-USDT的指数价格。</td></tr><tr><td style="text-align: left">fillPnl</td><td style="text-align: left">String</td><td style="text-align: left">本次成交的已实现盈亏，以结算货币（见 <code>feeCcy</code>）计价，仅适用于平仓交易。正数为盈利，负数为亏损。公式：正向合约 = (fillPx − avgPx) × fillSz × ctVal；反向合约 = (1/avgPx − 1/fillPx) × fillSz × ctVal。开仓交易返回0。</td></tr><tr><td style="text-align: left">fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向 <code>buy</code>：买 <code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向 <code>long</code>：多 <code>short</code>：空 买卖模式返回 <code>net</code></td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">String</td><td style="text-align: left">流动性方向 <code>T</code>：taker <code>M</code>：maker<br>不适用于系统订单比如强平和ADL</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易手续费币种或者返佣金币种</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额或者返佣金额，手续费扣除为‘负数’，如-0.01；手续费返佣为‘正数’，如 0.01</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">系统生成该成交记录的时间戳，Unix毫秒数格式（UTC）。注意：此字段与 <code>fillTime</code>（实际撮合成交时间）不同。若需按时间顺序排列成交记录，请使用 <code>fillTime</code> 而非 <code>ts</code> 进行排序。</td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，与订单频道的<code>fillTime</code>相同</td></tr><tr><td style="text-align: left">feeRate</td><td style="text-align: left">String</td><td style="text-align: left">手续费费率。 该字段仅对 <code>币币</code>和<code>杠杆</code>返回</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

::: tip
tradeId  
当订单种类（category）为 partial\_liquidation：强制减仓、full\_liquidation：强制平仓、adl：ADL自动减仓时，成交明细 tradeId 字段的值为负数，以便和其他撮合成交场景区分，订单信息 tradeId 字段的值为 0
:::

::: tip
ordId  
订单ID, 对于大宗交易总是 "" 。
:::

::: tip
clOrdId  
用户自定义订单ID, 对于大宗交易总是 "" 。
:::

### GET / 获取成交明细（近三个月）

本接口可以查询最近 3 个月的成交明细数据。

#### 限速：10 次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/fills-history`

> 请求示例

```
GET /api/v5/trade/fills-history?instType=SPOT
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询 币币 成交明细（3月内）
result = tradeAPI.get_fills_history(
    instType="SPOT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品 ID，如<code>BTC-USD-190927</code></td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">成交类型<br><code>1</code>：买入<br><code>2</code>：卖出<br><code>3</code>：开多<br><code>4</code>：开空<br><code>5</code>：平多<br><code>6</code>：平空<br><code>100</code>：强减平多<br><code>101</code>：强减平空<br><code>102</code>：强减买入<br><code>103</code>：强减卖出<br><code>104</code>：强平平多<br><code>105</code>：强平平空<br><code>106</code>：强平买入<br><code>107</code>：强平卖出<br><code>110</code>：强平换币转入<br><code>111</code>：强平换币转出<br><code>118</code>：系统换币转入<br><code>119</code>：系统换币转出<br><code>112</code>：交割平多<br><code>113</code>：交割平空<br><code>125</code>：自动减仓平多<br><code>126</code>：自动减仓平空<br><code>127</code>：自动减仓买入<br><code>128</code>：自动减仓卖出<br><code>212</code>：一键借币的自动借币<br><code>213</code>：一键借币的自动还币<br><code>204</code>：大宗交易买<br><code>205</code>：大宗交易卖<br><code>206</code>：大宗交易开多<br><code>207</code>：大宗交易开空<br><code>208</code>：大宗交易平多<br><code>209</code>：大宗交易平空<br><code>236</code>：小额兑换买入<br><code>237</code>：小额兑换卖出<br><code>270</code>：价差交易买<br><code>271</code>：价差交易卖<br><code>272</code>：价差交易开多<br><code>273</code>：价差交易开空<br><code>274</code>：价差交易平多<br><code>275</code>：价差交易平空<br><code>324</code>：移仓买入<br><code>325</code>：移仓卖出<br><code>326</code>：移仓开多<br><code>327</code>：移仓开空<br><code>328</code>：移仓平多<br><code>329</code>：移仓平空<br><code>376</code>：质押借币超限买入<br><code>377</code>： 质押借币超限卖出<br><code>410</code>：买入yes<br><code>411</code>：买入no<br><code>412</code>：卖出yes<br><code>413</code>：卖出no<br><code>414</code>：yes结算<br><code>415</code>：no结算</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之前（更旧的数据）的分页内容，传的值为对应接口的 <code>billId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 之后（更新的数据）的分页内容，传的值为对应接口的 <code>billId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的开始时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">筛选的结束时间戳 <code>ts</code>，Unix 时间戳为毫秒数格式，如 <code>1597027383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "side": "buy",
            "fillSz": "0.00192834",
            "fillPx": "51858",
            "fillPxVol": "",
            "fillFwdPx": "",
            "fee": "-0.00000192834",
            "fillPnl": "0",
            "ordId": "680800019749904384",
            "feeRate": "-0.001",
            "instType": "SPOT",
            "fillPxUsd": "",
            "instId": "BTC-USDT",
            "clOrdId": "",
            "posSide": "net",
            "billId": "680800019754098688",
            "subType": "1",
            "fillMarkVol": "",
            "tag": "",
            "fillTime": "1708587373361",
            "execType": "T",
            "fillIdxPx": "",
            "tradeId": "744876980",
            "fillMarkPx": "",
            "feeCcy": "BTC",
            "ts": "1708587373362",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">最新成交 ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义订单ID</td></tr><tr><td style="text-align: left">billId</td><td style="text-align: left">String</td><td style="text-align: left">账单 ID</td></tr><tr><td style="text-align: left">subType</td><td style="text-align: left">String</td><td style="text-align: left">成交类型</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格，同"账单流水查询"的 px</td></tr><tr><td style="text-align: left">fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 如 LTC-ETH，该字段返回 LTC-USDT 的指数价格。</td></tr><tr><td style="text-align: left">fillPnl</td><td style="text-align: left">String</td><td style="text-align: left">最新成交收益，适用于有成交的平仓订单。其他情况均为0。</td></tr><tr><td style="text-align: left">fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：多<br><code>short</code>：空<br>买卖模式返回 <code>net</code></td></tr><tr><td style="text-align: left">execType</td><td style="text-align: left">String</td><td style="text-align: left">流动性方向<br><code>T</code>：taker<br><code>M</code>：maker<br>不适用于系统订单比如强平和ADL</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易手续费币种或者返佣金币种</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额或者返佣金额<br>手续费扣除为‘负数’，如 -0.01<br>手续费返佣为‘正数’，如 0.01</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">成交明细产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，与订单频道的<code>fillTime</code>相同</td></tr><tr><td style="text-align: left">feeRate</td><td style="text-align: left">String</td><td style="text-align: left">手续费费率。 该字段仅对 <code>币币</code>和<code>杠杆</code>返回</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

::: tip
tradeId  
当成交明细所归属的订单种类（category）为 partial\_liquidation：强制减仓、full\_liquidation：强制平仓、adl：ADL自动减仓时，tradeId字段的值为负数，以便和其他撮合成交场景区分
:::

::: tip
ordId  
订单ID, 对于大宗交易总是 "" 。
:::

::: tip
clOrdId  
用户自定义订单ID, 对于大宗交易总是 "" 。
:::

::: tip
获取近3天的成交明细时，建议使用获取成交明细（近三天）接口。
:::

### GET / 获取一键兑换主流币币种列表

获取小币一键兑换主流币币种列表。仅可兑换余额在 $10 以下币种。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/easy-convert-currency-list`

> 请求示例

```
GET /api/v5/trade/easy-convert-currency-list
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 获取小币一键兑换主流币币种列表
result = tradeAPI.get_easy_convert_currency_list()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br>默认为<code>1</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fromData": [
                {
                    "fromAmt": "6.580712708344864",
                    "fromCcy": "ADA"
                },
                {
                    "fromAmt": "2.9970000013055097",
                    "fromCcy": "USDC"
                }
            ],
            "toCcy": [
                "USDT",
                "BTC",
                "ETH",
                "OKB"
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">fromData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">当前拥有并可兑换的小币币种列表信息</td></tr><tr><td style="text-align: left">&gt; fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">可兑换币种</td></tr><tr><td style="text-align: left">&gt; fromAmt</td><td style="text-align: left">String</td><td style="text-align: left">可兑换币种数量</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">Array of strings</td><td style="text-align: left">可转换成的主流币币种列表</td></tr></tbody></table>

### POST / 一键兑换主流币交易

进行小币一键兑换主流币交易。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/trade/easy-convert`

> 请求示例

```
POST /api/v5/trade/easy-convert
body
{
    "fromCcy": ["ADA","USDC"], //逗号分隔小币
    "toCcy": "OKB" 
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 进行小币一键兑换主流币交易
result = tradeAPI.easy_convert(
    fromCcy=["ADA", "USDC"],
    toCcy="OKB"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">Array of strings</td><td style="text-align: left">是</td><td style="text-align: left">小币支付币种<br>单次最多同时选择5个币种，如有多个币种则用逗号隔开</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">兑换的主流币<br>只选择一个币种，且不能和小币支付币种重复</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br>默认为<code>1</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fillFromSz": "6.5807127",
            "fillToSz": "0.17171580105126",
            "fromCcy": "ADA",
            "status": "running",
            "toCcy": "OKB",
            "uTime": "1661419684687"
        },
        {
            "fillFromSz": "2.997",
            "fillToSz": "0.1683755161661844",
            "fromCcy": "USDC",
            "status": "running",
            "toCcy": "OKB",
            "uTime": "1661419684687"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">当前兑换进度/状态<br><code>running</code>: 进行中<br><code>filled</code>: 已完成<br><code>failed</code>: 失败</td></tr><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">小币支付币种</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">兑换的主流币</td></tr><tr><td style="text-align: left">fillFromSz</td><td style="text-align: left">String</td><td style="text-align: left">小币偿还币种支付数量</td></tr><tr><td style="text-align: left">fillToSz</td><td style="text-align: left">String</td><td style="text-align: left">兑换的主流币成交数量</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">交易时间戳，Unix时间戳为毫秒数格式，如 1597026383085</td></tr></tbody></table>

### GET / 获取一键兑换主流币历史记录

查询一键兑换主流币过去7天内的历史记录与进度状态。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/easy-convert-history`

> 请求示例

```
GET /api/v5/trade/easy-convert-history
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 获取一键兑换主流币历史记录
result = tradeAPI.get_easy_convert_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前(不包含)的内容，值为时间戳，Unix时间戳为毫秒数格式，如<code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后(不包含)的内容，值为时间戳，Unix时间戳为毫秒数格式，如<code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为100，最大为100</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fillFromSz": "0.1761712511667539",
            "fillToSz": "6.7342205900000000",
            "fromCcy": "OKB",
            "status": "filled",
            "toCcy": "ADA",
            "acct": "18",
            "uTime": "1661313307979"
        },
        {
            "fillFromSz": "0.1722106121112177",
            "fillToSz": "2.9971018300000000",
            "fromCcy": "OKB",
            "status": "filled",
            "toCcy": "USDC",
            "acct": "18",
            "uTime": "1661313307979"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">fromCcy</td><td style="text-align: left">String</td><td style="text-align: left">小币支付币种</td></tr><tr><td style="text-align: left">fillFromSz</td><td style="text-align: left">String</td><td style="text-align: left">对应的小币支付数量</td></tr><tr><td style="text-align: left">toCcy</td><td style="text-align: left">String</td><td style="text-align: left">兑换到的主流币</td></tr><tr><td style="text-align: left">fillToSz</td><td style="text-align: left">String</td><td style="text-align: left">兑换到的主流币数量</td></tr><tr><td style="text-align: left">acct</td><td style="text-align: left">String</td><td style="text-align: left">兑换到的主流币所在的账户<br><code>6</code>：资金账户<br><code>18</code>：交易账户</td></tr><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">当前兑换进度/状态<br><code>running</code>: 进行中<br><code>filled</code>: 已完成<br><code>failed</code>: 失败</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">交易时间戳，Unix时间戳为毫秒数格式，如 1597026383085</td></tr></tbody></table>

### GET / 获取一键还债币种列表

查询一键还债币种列表。负债币种包括全仓负债和逐仓负债。仅适用于`跨币种保证金模式`/`组合保证金模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/one-click-repay-currency-list`

> 请求示例

```
GET /api/v5/trade/one-click-repay-currency-list
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询一键还债币种列表
result = tradeAPI.get_oneclick_repay_list()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">debtType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">负债类型<br><code>cross</code>: 全仓负债<br><code>isolated</code>: 逐仓负债</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtData": [
                {
                    "debtAmt": "29.653478",
                    "debtCcy": "LTC"
                },
                {
                    "debtAmt": "237803.6828295906051002",
                    "debtCcy": "USDT"
                }
            ],
            "debtType": "cross",
            "repayData": [
                {
                    "repayAmt": "0.4978335419825104",
                    "repayCcy": "ETH"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">debtData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">负债币种信息</td></tr><tr><td style="text-align: left">&gt; debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">&gt; debtAmt</td><td style="text-align: left">String</td><td style="text-align: left">可负债币种数量<br>包括本金和利息</td></tr><tr><td style="text-align: left">debtType</td><td style="text-align: left">String</td><td style="text-align: left">负债类型<br><code>cross</code>: 全仓负债<br><code>isolated</code>: 逐仓负债</td></tr><tr><td style="text-align: left">repayData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">偿还币种信息</td></tr><tr><td style="text-align: left">&gt; repayCcy</td><td style="text-align: left">String</td><td style="text-align: left">可偿还负债的币种</td></tr><tr><td style="text-align: left">&gt; repayAmt</td><td style="text-align: left">String</td><td style="text-align: left">可偿还负债的币种可用资产数量</td></tr></tbody></table>

### POST / 一键还债交易

交易一键偿还全仓债务。不支持逐仓负债的偿还。根据资金和交易账户的剩余可用余额为最大偿还数量。仅适用于`跨币种保证金模式`/`组合保证金模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/trade/one-click-repay`

> 请求示例

```
POST /api/v5/trade/one-click-repay
body
{
    "debtCcy": ["ETH","BTC"], //逗号分隔债务币
    "repayCcy": "USDT" //用USDT偿还ETH和BTC
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 交易一键偿还小额全仓债务，使用USDT偿还ETH和BTC债务
result = tradeAPI.oneclick_repay(
    debtCcy=["ETH", "BTC"],
    repayCcy="USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">Array of strings</td><td style="text-align: left">是</td><td style="text-align: left">负债币种<br>单次最多同时选择5个币种，如有多个币种则用逗号隔开</td></tr><tr><td style="text-align: left">repayCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">偿还币种<br>只选择一个币种，且不能和负债币种重复</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtCcy": "ETH", 
            "fillDebtSz": "0.01023052",
            "fillRepaySz": "30", 
            "repayCcy": "USDT", 
            "status": "filled",
            "uTime": "1646188520338"
        },
        {
            "debtCcy": "BTC", 
            "fillFromSz": "3",
            "fillToSz": "60,221.15910001",
            "repayCcy": "USDT",
            "status": "filled",
            "uTime": "1646188520338"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">当前还债进度/状态<br><code>running</code>: 进行中<br><code>filled</code>: 已完成<br><code>failed</code>: 失败</td></tr><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">repayCcy</td><td style="text-align: left">String</td><td style="text-align: left">偿还币种</td></tr><tr><td style="text-align: left">fillDebtSz</td><td style="text-align: left">String</td><td style="text-align: left">负债币种成交数量</td></tr><tr><td style="text-align: left">fillRepaySz</td><td style="text-align: left">String</td><td style="text-align: left">偿还币种成交数量</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">交易时间戳，Unix时间戳为毫秒数格式，如 1597026383085</td></tr></tbody></table>

### GET / 获取一键还债历史记录

查询一键还债近7天的历史记录与进度状态。仅适用于`跨币种保证金模式`/`组合保证金模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/one-click-repay-history`

> 请求示例

```
GET /api/v5/trade/one-click-repay-history
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 获取一键还债历史记录
result = tradeAPI.oneclick_repay_history()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之前的内容，值为时间戳，Unix时间戳为毫秒数格式，如<code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在此之后的内容，值为时间戳，Unix时间戳为毫秒数格式，如<code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为100，最大为100</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtCcy": "USDC",
            "fillDebtSz": "6950.4865447900000000",
            "fillRepaySz": "4.3067975995094930",
            "repayCcy": "ETH",
            "status": "filled",
            "uTime": "1661256148746"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">fillDebtSz</td><td style="text-align: left">String</td><td style="text-align: left">对应的负债币种成交数量</td></tr><tr><td style="text-align: left">repayCcy</td><td style="text-align: left">String</td><td style="text-align: left">偿还币种</td></tr><tr><td style="text-align: left">fillRepaySz</td><td style="text-align: left">String</td><td style="text-align: left">偿还币种实际支付数量</td></tr><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">当前还债进度/状态<br><code>running</code>: 进行中<br><code>filled</code>: 已完成<br><code>failed</code>: 失败</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">交易时间戳，Unix时间戳为毫秒数格式，如 1597026383085</td></tr></tbody></table>

### GET / 获取一键还债币种列表(新)

查询一键还债币种列表。仅适用于`现货模式`/`跨币种保证金模式`/`组合保证金模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/one-click-repay-currency-list-v2`

> 请求示例

```
GET /api/v5/trade/one-click-repay-currency-list-v2
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag,debug=True) 
result = tradeAPI.get_oneclick_repay_list_v2()
print(result)
```

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtData": [
                {
                    "debtAmt": "100",
                    "debtCcy": "USDC"
                }
            ],
            "repayData": [
                {
                    "repayAmt": "1.000022977",
                    "repayCcy": "BTC"
                },
                {
                    "repayAmt": "4998.0002397",
                    "repayCcy": "USDT"
                },
                {
                    "repayAmt": "100",
                    "repayCcy": "OKB"
                },
                {
                    "repayAmt": "1",
                    "repayCcy": "ETH"
                },
                {
                    "repayAmt": "100",
                    "repayCcy": "USDC"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">debtData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">负债币种信息</td></tr><tr><td style="text-align: left">&gt; debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">&gt; debtAmt</td><td style="text-align: left">String</td><td style="text-align: left">可负债币种数量<br>包括本金和利息</td></tr><tr><td style="text-align: left">repayData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">偿还币种信息</td></tr><tr><td style="text-align: left">&gt; repayCcy</td><td style="text-align: left">String</td><td style="text-align: left">可偿还负债的币种</td></tr><tr><td style="text-align: left">&gt; repayAmt</td><td style="text-align: left">String</td><td style="text-align: left">可偿还负债的币种可用资产数量</td></tr></tbody></table>

### POST / 一键还债交易(新)

交易一键偿还债务。仅适用于`现货模式`/`跨币种保证金模式`/`组合保证金模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`POST /api/v5/trade/one-click-repay-v2`

> 请求示例

```
POST /api/v5/trade/one-click-repay-v2
body
{
    "debtCcy": "USDC", 
    "repayCcyList": ["USDC","BTC"] 
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag,debug=True)
result = tradeAPI.oneclick_repay_v2("USDC",["USDC","BTC"])
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">repayCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">是</td><td style="text-align: left">偿还币种列表，如 ["USDC","BTC"]<br>资产还币优先级和数组中的排序一致（排第一的优先级最高）。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtCcy": "USDC",
            "repayCcyList": [
                "USDC",
                "BTC"
            ],
            "ts": "1742192217514"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">repayCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">偿还币种列表，如 ["USDC","BTC"]<br>资产还币优先级和数组中的排序一致（排第一的优先级最高）。</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">请求时间，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取一键还债历史记录(新)

查询一键还债近7天的历史记录与进度状态。仅适用于`现货模式`。

#### 限速：1次/2s

#### 限速规则：User ID

#### HTTP 请求

`GET /api/v5/trade/one-click-repay-history-v2`

> 请求示例

```
GET /api/v5/trade/one-click-repay-history-v2
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)
result = tradeAPI.oneclick_repay_history_v2()
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在指定请求时间<code>ts</code>之前(包含)的内容，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询在指定请求时间<code>ts</code>之后(包含)的内容，值为时间戳，Unix时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回的结果集数量，默认为<code>100</code>，最大为<code>100</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "debtCcy": "USDC",
            "fillDebtSz": "9.079631989",
            "ordIdInfo": [
                {
                    "cTime": "1742194485439",
                    "fillPx": "1",
                    "fillSz": "9.088651",
                    "instId": "USDC-USDT",
                    "ordId": "2338478342062235648",
                    "ordType": "ioc",
                    "px": "1.0049",
                    "side": "buy",
                    "state": "filled",
                    "sz": "9.0886514537313433"
                },
                {
                    "cTime": "1742194482326",
                    "fillPx": "83271.9",
                    "fillSz": "0.00010969",
                    "instId": "BTC-USDT",
                    "ordId": "2338478237607288832",
                    "ordType": "ioc",
                    "px": "82856.7",
                    "side": "sell",
                    "state": "filled",
                    "sz": "0.000109696512171"
                }
            ],
            "repayCcyList": [
                "USDC",
                "BTC"
            ],
            "status": "filled",
            "ts": "1742194481852"
        },
        {
            "debtCcy": "USDC",
            "fillDebtSz": "100",
            "ordIdInfo": [],
            "repayCcyList": [
                "USDC",
                "BTC"
            ],
            "status": "filled",
            "ts": "1742192217511"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">debtCcy</td><td style="text-align: left">String</td><td style="text-align: left">负债币种</td></tr><tr><td style="text-align: left">repayCcyList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">偿还币种列表，如 ["USDC","BTC"]</td></tr><tr><td style="text-align: left">fillDebtSz</td><td style="text-align: left">String</td><td style="text-align: left">对应的负债币种成交数量</td></tr><tr><td style="text-align: left">status</td><td style="text-align: left">String</td><td style="text-align: left">当前还债进度/状态<br><code>running</code>：进行中<br><code>filled</code>：已完成<br><code>failed</code>：失败</td></tr><tr><td style="text-align: left">ordIdInfo</td><td style="text-align: left">Array of objects</td><td style="text-align: left">相关订单信息</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; fillPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价格<br>如果成交数量为0，该字段为""</td></tr><tr><td style="text-align: left">&gt; fillSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交数量</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>filled</code>：完全成交<br><code>canceled</code>：撤单成功</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">请求时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### POST / 撤销 MMP 订单

撤销同一交易品种下用户所有的 MMP 挂单  
仅适用于组合保证金账户模式下的期权订单，且有 MMP 权限。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/trade/mass-cancel`

> 请求示例

```
POST /api/v5/trade/mass-cancel
body
{
    "instType":"OPTION",
    "instFamily":"BTC-USD"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易产品类型<br><code>OPTION</code>:期权</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">lockInterval</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">锁定时长(毫秒)<br>范围应为[0, 10 000]<br>默认为 0. 如果想要立即解锁，您可以设置为 "0"<br>下单时，如果在该锁定期间，会报错 54008，如果在 MMP 触发期间，会报错 51034</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "result":true
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">撤单结果<br><code>true</code>：全部撤单成功<br><code>false</code>：全部撤单失败</td></tr></tbody></table>

### POST / 倒计时全部撤单

在倒计时结束后，取消所有挂单。适用于所有撮合交易产品（不包括价差交易）。

#### 限速：1次/s

#### 限速规则：User ID + tag

#### HTTP请求

`POST /api/v5/trade/cancel-all-after`

> 请求示例

```
POST /api/v5/trade/cancel-all-after
{
   "timeOut":"60"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 设置倒计时全部撤单
result = tradeAPI.cancel_all_after(
    timeOut="10"
)

print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">timeOut</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">取消挂单的倒计时，单位为秒<br>取值范围为 0, [10, 120]<br>0 代表不使用该功能</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">CAA订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "triggerTime":"1587971460",
            "tag":"",
            "ts":"1587971400"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">触发撤单的时间<br>triggerTime=0 代表未使用该功能</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">CAA订单标签</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">请求被接收到的时间</td></tr></tbody></table>

::: tip
建议用户每一秒调用接口一次。当倒计时全部撤单被触发时，交易引擎将为用户逐一取消其挂单，该操作可能持续数秒。该功能起到保护用户的作用，不应作为交易策略使用。
:::

::: tip
为使用标签维度倒计时全部撤单，首先，用户需使用现有下单接口的tag请求参数，为订单设置标签。调用CAA接口时，若不传入tag请求参数，则默认设置账户维度CAA，CAA触发时，撤销该子账户下的所有撮合交易产品挂单；若传入tag请求参数，则默认设置订单标签维度CAA，CAA触发时，带有此tag的撮合交易产品挂单将被撤销，带有其他tag或没有tag的订单将不受影响。  
  
同一子账户下，用户最多能同时运行20个标签维度的CAA。系统仅计数活跃的标签维度CAA，已被触发或被用户主动撤销的将不被计入。超过限制时，用户将收到错误码51071。
:::

### GET / 获取账户限速

获取账户限速相关信息  

仅有新订单及修改订单请求会被计入此限制。对于包含多个订单的批量请求，每个订单将被单独计数。  

更多细节，请见 [基于成交比率的子账户限速](/zh/overview-rate-limits-fill-ratio-based-sub-account-rate-limit)

#### 限速：1次/s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/account-rate-limit`

> 请求示例

```
# 获取账户限速相关信息
GET /api/v5/trade/account-rate-limit
```

#### 请求参数

None

> 返回结果

```
{
   "code":"0",
   "data":[
      {
         "accRateLimit":"2000",
         "fillRatio":"0.1234",
         "mainFillRatio":"0.1234",
         "nextAccRateLimit":"2000",
         "ts":"123456789000"
      }
   ],
   "msg":`""`
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>fillRatio</td><td>String</td><td>监测期内子账户的成交比率。<br>适用于交易费等级 &gt;= VIP 5 的用户，其他用户返回 <code>""</code>。<br>若账户在过去 7 天内无任何成交数据，则返回 <code>""</code>。<br>若监测期内无成交量，则返回 <code>"0"</code>。<br>若监测期内有成交量但无下单操作数，则返回 <code>"9999"</code>。</td></tr><tr><td>mainFillRatio</td><td>String</td><td>监测期内母账户合计成交比率。<br>适用于交易费等级 &gt;= VIP 5 的用户，其他用户返回 <code>""</code>。<br>若账户在过去 7 天内无任何成交数据，则返回 <code>""</code>。<br>若监测期内无成交量，则返回 <code>"0"</code>。</td></tr><tr><td>accRateLimit</td><td>String</td><td>当前子账户交易限速（每两秒）</td></tr><tr><td>nextAccRateLimit</td><td>String</td><td>下一评估周期预计的子账户交易限速（每两秒）。<br>适用于交易费等级 &gt;= VIP 5的用户，其余用户返回 <code>""</code> 。</td></tr><tr><td>ts</td><td>String</td><td>数据更新时间<br>对于交易费等级&gt;= VIP 5的用户，数据将于每日 08:00（UTC）生成<br>对于交易费等级 &lt; VIP 5的用户，返回当前时间戳 。</td></tr></tbody></table>

### POST / 订单预检查

用来预先查看订单下单前后的账户的对比信息，仅适用于`跨币种保证金模式`和`组合保证金模式`。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/trade/order-precheck`

> 请求示例

```
POST /api/v5/trade/order-precheck
body
{
    "instId":"BTC-USDT",
    "tdMode":"cash",
    "clOrdId":"b15",
    "side":"buy",
    "ordType":"limit",
    "px":"2.15",
    "sz":"2"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br>保证金模式：<code>isolated</code>：逐仓 ；<code>cross</code>：全仓<br>非保证金模式：<code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单) ，现货带单时，<code>tdMode</code> 的值需要指定为<code>spot_isolated</code></td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向<br><code>buy</code>：买， <code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code>。 仅适用交割、永续。</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>、<code>post_only</code>、<code>fok</code>、<code>ioc</code>类型的订单</td></tr><tr><td style="text-align: left">outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，且为必填</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">市价单委托数量<code>sz</code>的单位，仅适用于<code>币币</code>市价订单<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>买单默认<code>quote_ccy</code>， 卖单默认<code>base_ccy</code></td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给<code>algoClOrdId</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>对于条件止盈单，如果填写此参数，必须填写 止盈委托价</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>对于条件止盈单，如果填写此参数，必须填写 止盈触发价<br>对于限价止盈单，需填写此参数，不需要填写止盈触发价<br>委托价格为-1时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单<br>默认为<code>condition</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写 止损委托价</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写 止损触发价<br>委托价格为-1时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">数量。仅适用于”多笔止盈”的止盈订单，且对于”多笔止盈”的止盈订单必填</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的价距。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">激活价格。<br>激活价格是移动止盈止损的激活条件，当市场最新成交价达到或超过激活价格，委托被激活。激活后系统开始计算止盈止损的实际触发价格。如果不填写激活价格，即下单后就被激活。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adjEq": "41.94347460746277",
            "adjEqChg": "-226.05616481626",
            "availBal": "0",
            "availBalChg": "0",
            "imr": "0",
            "imrChg": "57.74709688430927",
            "liab": "0",
            "liabChg": "0",
            "liabChgCcy": "",
            "liqPx": "6764.8556232031115",
            "liqPxDiff": "-57693.044376796888536773622035980224609375",
            "liqPxDiffRatio": "-0.8950500152315991",
            "mgnRatio": "0",
            "mgnRatioChg": "0",
            "mmr": "0",
            "mmrChg": "0",
            "posBal": "",
            "posBalChg": "",
            "type": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">adjEq</td><td style="text-align: left">String</td><td style="text-align: left">当前美金层面有效保证金</td></tr><tr><td style="text-align: left">adjEqChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，美金层面有效保证金的变动数量</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">String</td><td style="text-align: left">当前美金层面占用保证金</td></tr><tr><td style="text-align: left">imrChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，美金层面占用保证金的变动数量</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">String</td><td style="text-align: left">当前美金层面维持保证金</td></tr><tr><td style="text-align: left">mmrChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，美金层面维持保证金的变动数量</td></tr><tr><td style="text-align: left">mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">当前美金层面维持保证金率</td></tr><tr><td style="text-align: left">mgnRatioChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，美金层面维持保证金率的变动数量</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">当前币种可用余额，仅适用于关闭自动借币时</td></tr><tr><td style="text-align: left">availBalChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，币种可用余额的变动数量，仅适用于关闭自动借币时</td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">当前预估强平价</td></tr><tr><td style="text-align: left">liqPxDiff</td><td style="text-align: left">String</td><td style="text-align: left">下单后，预估强平价与标记价格的差距</td></tr><tr><td style="text-align: left">liqPxDiffRatio</td><td style="text-align: left">String</td><td style="text-align: left">下单后，预估强平价与标记价格的差距比率</td></tr><tr><td style="text-align: left">posBal</td><td style="text-align: left">String</td><td style="text-align: left">当前杠杆逐仓仓位正资产，仅适用于逐仓杠杆</td></tr><tr><td style="text-align: left">posBalChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，杠杆逐仓仓位正资产的变动数量，仅适用于逐仓杠杆</td></tr><tr><td style="text-align: left">liab</td><td style="text-align: left">String</td><td style="text-align: left">当前负债<br>如果是全仓，对应全仓负债，如果是逐仓，对应逐仓负债</td></tr><tr><td style="text-align: left">liabChg</td><td style="text-align: left">String</td><td style="text-align: left">下单后，当前负债的变动数量<br>如果是全仓，对应全仓负债，如果是逐仓，对应逐仓负债</td></tr><tr><td style="text-align: left">liabChgCcy</td><td style="text-align: left">String</td><td style="text-align: left">下单后，当前负债变动数量的单位<br>仅适用于全仓，开启自动借币时</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">仓位正资产(<code>posBal</code>)的单位类型，仅适用于杠杆逐仓，用来确定<code>posBal</code>的单位<br><code>1</code>:下单前后都是交易货币<br><code>2</code>:下单前是交易货币，下单后是计价货币<br><code>3</code>:下单前是计价货币，下单后是交易货币<br><code>4</code>:下单前后都是计价货币</td></tr></tbody></table>

### WS / 订单频道

获取订单信息，首次订阅不推送，只有当下单、订单变更时，推送数据  
该频道的并发连接受到如下规则限制：[WebSocket 连接限制](/zh/overview-websocket-connection-count-limit)

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "orders",
        "instType": "FUTURES",
        "instId": "BTC-USD-200329"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "orders",
        "instType": "FUTURES",
        "instId": "BTC-USD-200329"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "orders",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "orders",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>orders</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例：单个

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "orders",
        "instType": "FUTURES",
        "instId": "BTC-USD-200329"
    },
    "connId": "a4d3ae55"
}
```

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "orders",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"orders\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "orders",
        "instType": "SPOT",
        "instId": "BTC-USDT",
        "uid": "614488474791936"
    },
    "data": [
        {
            "accFillSz": "0.001",
            "amendResult": "",
            "avgPx": "31527.1",
            "cTime": "1654084334977",
            "category": "normal",
            "ccy": "",
            "clOrdId": "",
            "code": "0",
            "execType": "M",
            "fee": "-0.02522168",
            "feeCcy": "USDT",
            "fillFee": "-0.02522168",
            "fillFeeCcy": "USDT",
            "fillNotionalUsd": "31.50818374",
            "fillPx": "31527.1",
            "fillSz": "0.001",
            "fillPnl": "0.01",
            "fillTime": "1654084353263",
            "fillPxVol": "",
            "fillPxUsd": "",
            "fillMarkVol": "",
            "fillFwdPx": "",
            "fillMarkPx": "",
            "fillIdxPx": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "lever": "0",
            "msg": "",
            "notionalUsd": "31.50818374",
            "ordId": "452197707845865472",
            "ordType": "limit",
            "pnl": "0",
            "posSide": "",
            "px": "31527.1",
            "pxUsd":"",
            "pxVol":"",
            "pxType":"",
            "rebate": "0",
            "rebateCcy": "BTC",
            "reduceOnly": "false",
            "reqId": "",
            "side": "sell",
            "attachAlgoClOrdId": "",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "last",
            "source": "",
            "state": "filled",
            "stpId": "",
            "stpMode": "",
            "sz": "0.001",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "tpTriggerPxType": "last",
            "tradeId": "242589207",
            "tradeQuoteCcy": "USDT",
            "lastPx": "38892.2",
            "quickMgnType": "",
            "algoClOrdId": "",
            "attachAlgoOrds": [],
            "algoId": "",
            "amendSource": "",
            "cancelSource": "",
            "isTpLimit": "false",
            "uTime": "1654084353264",
            "linkedAlgoOrd": {
                "algoId": ""
            }
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID来识别您的订单</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">委托价格，对于期权，以币(如BTC, ETH)为单位</td></tr><tr><td style="text-align: left">&gt; pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">期权价格，以USD为单位<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; pxVol</td><td style="text-align: left">String</td><td style="text-align: left">期权订单的隐含波动率<br>仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; pxType</td><td style="text-align: left">String</td><td style="text-align: left">期权的价格类型<br><code>px</code>：代表按价格下单，单位为币 (请求参数 px 的数值单位是BTC或ETH)<br><code>pxVol</code>：代表按pxVol下单<br><code>pxUsd</code>：代表按照pxUsd下单，单位为USD (请求参数px 的数值单位是USD)</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">委托单预估美元价值</td></tr><tr><td style="text-align: left">&gt; fillNotionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">委托单已成交的美元价值</td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消单<br><code>ioc</code>：立即成交并取消剩余单<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>op_fok</code>：期权简选（全部成交或立即取消）<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式 <code>isolated</code>：逐仓 <code>cross</code>：全仓<br>非保证金模式 <code>cash</code>：现金</td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 <code>quote_ccy</code>：计价货币</td></tr><tr><td style="text-align: left">&gt; fillPx</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交价格</td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交ID</td></tr><tr><td style="text-align: left">&gt; fillSz</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交数量<br>对于<code>币币</code>和<code>杠杆</code>，单位为交易货币，如 BTC-USDT, 单位为 BTC；对于市价单，无论<code>tgtCcy</code>是<code>base_ccy</code>，还是<code>quote_ccy</code>，单位均为交易货币；<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">&gt; fillPnl</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交收益，适用于有成交的平仓订单。其他情况均为0。</td></tr><tr><td style="text-align: left">&gt; fillTime</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交时间</td></tr><tr><td style="text-align: left">&gt; fillFee</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交手续费金额或者返佣金额：<br>手续费扣除 为 ‘负数’，如 -0.01 ；<br>手续费返佣 为 ‘正数’，如 0.01</td></tr><tr><td style="text-align: left">&gt; fillFeeCcy</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息的成交手续费币种或者返佣币种。<br>如果fillFee小于0，为手续费币种；如果fillFee大于等于0，为返佣币种</td></tr><tr><td style="text-align: left">&gt; fillPxVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; fillPxUsd</td><td style="text-align: left">String</td><td style="text-align: left">成交时的期权价格，以USD为单位仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; fillMarkVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记波动率，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; fillFwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格，仅适用于期权，其他业务线返回空字符串""</td></tr><tr><td style="text-align: left">&gt; fillMarkPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格，仅适用于 <code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; fillIdxPx</td><td style="text-align: left">String</td><td style="text-align: left">交易执行时的指数价格<br>对于交叉现货币对，返回 baseCcy-USDT 的指数价格。 例如LTC-ETH，该字段返回LTC-USDT的指数价格。</td></tr><tr><td style="text-align: left">&gt; execType</td><td style="text-align: left">String</td><td style="text-align: left">当前推送消息成交的流动性方向 T：taker M：maker</td></tr><tr><td style="text-align: left">&gt; accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">累计成交数量<br>对于<code>币币</code>和<code>杠杆</code>，单位为交易货币，如 BTC-USDT, 单位为 BTC；对于市价单，无论<code>tgtCcy</code>是<code>base_ccy</code>，还是<code>quote_ccy</code>，单位均为交易货币；<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">成交均价，如果成交数量为0，该字段也为0</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交<br><code>mmp_canceled</code>：做市商保护机制导致的自动撤单</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，止盈委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，止损委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息</td></tr><tr><td style="text-align: left">&gt;&gt; attachAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">附带止盈止损或移动止盈止损的订单ID，改单时，可用来标识该笔附带止盈止损订单。下附带策略委托单时，该值不会传给 algoId</td></tr><tr><td style="text-align: left">&gt;&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID</td></tr><tr><td style="text-align: left">&gt;&gt; tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">&gt;&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">张数。仅适用于“多笔止盈”的止盈订单</td></tr><tr><td style="text-align: left">&gt;&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt;&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt;&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt;&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; linkedAlgoOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止损订单信息，仅适用于包含限价止盈单的双向止盈止损订单，触发后生成的普通订单</td></tr><tr><td style="text-align: left">&gt;&gt; algoId</td><td style="text-align: left">Object</td><td style="text-align: left">策略订单唯一标识</td></tr><tr><td style="text-align: left">&gt; stpId</td><td style="text-align: left">String</td><td style="text-align: left"><del>自成交保护ID<br>如果自成交保护不适用则返回""</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; stpMode</td><td style="text-align: left">String</td><td style="text-align: left">自成交保护模式</td></tr><tr><td style="text-align: left">&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">手续费币种<br>对于币币和杠杆的挂单卖单，表示计价币种；其他情况下，表示收取手续费的币种</td></tr><tr><td style="text-align: left">&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">手续费金额<br>对于币币和杠杆（除挂单卖单外）：平台收取的累计手续费，始终为负数。<br>对于币币和杠杆的挂单卖单、交割、永续和期权：累计手续费和返佣（币币和杠杆挂单卖单始终以计价币种计算）</td></tr><tr><td style="text-align: left">&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种<br>对于币币和杠杆的挂单卖单，表示交易币种；其他情况下，表示支付返佣的币种</td></tr><tr><td style="text-align: left">&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣金额，仅适用于币币和杠杆<br>对于挂单卖单：以交易币种为单位的<del>累计手续费和</del>返佣金额。<br>其他情况下，表示挂单返佣金额，始终为正数，如无返佣时返回""。</td></tr><tr><td style="text-align: left">&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益(不包括手续费)<br>适用于有成交的平仓订单，其他情况均为0<br>对于合约全仓爆仓，将包含相应强平惩罚金</td></tr><tr><td style="text-align: left">&gt; source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>6</code>：计划委托策略触发后的生成的普通单<br><code>7</code>：止盈止损策略触发后的生成的普通单<br><code>13</code>：策略委托单触发后的生成的普通单<br><code>25</code>：移动止盈止损策略触发后的生成的普通单<br><code>34</code>: 追逐限价委托生成的普通单</td></tr><tr><td style="text-align: left">&gt; cancelSource</td><td style="text-align: left">String</td><td style="text-align: left">订单取消的来源<br>有效值及对应的含义是：<br><code>0</code>: 已撤单：系统撤单<br><code>1</code>: 用户主动撤单<br><code>2</code>: 已撤单：预减仓撤单，用户保证金不足导致挂单被撤回<br><code>3</code>: 已撤单：风控撤单，用户保证金不足有爆仓风险，导致挂单被撤回<br><code>4</code>: 已撤单：币种借币量达到平台硬顶，系统已撤回该订单<br><code>6</code>: 已撤单：触发 ADL 撤单，用户维持保证金率较低且有爆仓风险，导致挂单被撤回<br><code>7</code>: 已撤单：交割合约到期<br><code>9</code>: 已撤单：扣除资金费用后可用余额不足，系统已撤回该订单<br><code>10</code>: 已撤单：期权合约到期<br><code>13</code>: 已撤单：FOK 委托订单未完全成交，导致挂单被完全撤回<br><code>14</code>: 已撤单：IOC 委托订单未完全成交，仅部分成交，导致部分挂单被撤回<br><code>15</code>: 已撤单：该订单委托价不在限价范围内<br><code>17</code>: 已撤单：平仓单被撤单，由于仓位已被市价全平<br><code>20</code>: 系统倒计时撤单<br><code>21</code>: 已撤单：相关仓位被完全平仓，系统已撤销该止盈止损订单<br><code>22</code> 已撤单：存在更优价格的同方向订单，系统自动撤销当前操作的只减仓订单<br><code>23</code> 已撤单：存在更优价格的同方向订单，系统自动撤销已存在的只减仓订单<br><code>27</code>: 成交滑点超过5%，触发成交差价保护导致系统撤单<br><code>31</code>: 当前只挂单订单 (Post only) 将会吃掉挂单深度<br><code>32</code>: 自成交保护<br><code>33</code>: 当前 taker 订单匹配的订单数量超过最大限制<br><code>36</code>: 关联止损被触发，撤销限价止盈<br><code>37</code>: 关联止损被撤销，撤销限价止盈<br><code>38</code>: 您已撤销做市商保护 (MMP) 类型订单<br><code>39</code>: 因做市商保护 (MMP) 被触发，该类型订单已被撤销<br><code>42</code>: 初始下单价格与最新的买一或卖一价已达到最大追逐距离，您的订单已被自动取消<br><code>43</code>: 由于买单价格高于指数价格或卖单价格低于指数价格，导致系统撤单<br><code>44</code>：由于该币种的可用余额不足，无法在触发自动换币后进行兑换，您的订单已撤销，撤销订单后恢复的余额将用于自动换币。当该币种的总抵押借贷量达到平台抵押借贷风控上限时，则会触发自动换币。<br><code>45</code>：ELP订单价格校验失败<br><code>46</code>：由于降低Delta而导致的撤单</td></tr><tr><td style="text-align: left">&gt; amendSource</td><td style="text-align: left">String</td><td style="text-align: left">订单修改的来源<br><code>1</code>: 用户主动改单，改单成功<br><code>2</code>: 用户主动改单，并且当前这笔订单被只减仓修改，改单成功<br><code>4</code>: 订单数量被系统按只减仓修改，改单成功，包括：用户主动下单后当前这笔订单被只减仓修改，以及用户当前已存在的挂单（非当前操作的订单）被只减仓修改<br><code>5</code>：期权 px, pxVol 或 pxUsd 的跟随变动导致的改单，比如 iv=60，USD，px 锚定iv=60 时，USD, px 产生变动时的改单</td></tr><tr><td style="text-align: left">&gt; category</td><td style="text-align: left">String</td><td style="text-align: left">订单种类分类<br><code>normal</code>：普通委托订单种类<br><code>twap</code>：TWAP订单种类<br><code>adl</code>：ADL订单种类<br><code>full_liquidation</code>：爆仓订单种类<br><code>partial_liquidation</code>：减仓订单种类<br><code>delivery</code>：交割<br><code>ddh</code>：对冲减仓类型订单<br><code>auto_conversion</code>：抵押借币自动还币订单</td></tr><tr><td style="text-align: left">&gt; isTpLimit</td><td style="text-align: left">String</td><td style="text-align: left">是否为限价止盈，true 或 false.</td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">修改订单时使用的request ID，如果没有修改，该字段为""</td></tr><tr><td style="text-align: left">&gt; amendResult</td><td style="text-align: left">String</td><td style="text-align: left">修改订单的结果<br><code>-1</code>：失败<br><code>0</code>：成功<br><code>1</code>：自动撤单（修改请求返回成功但最终改单失败导致自动撤销）<br><code>2</code>: 自动改单成功，仅适用于期权pxUsd和pxVol订单的自动改单<br>通过API修改订单时，如果<code>cxlOnFail</code>设置为<code>true</code>且修改返回结果为失败时，则返回 ""<br>通过API修改订单时，如果修改返回结果为成功但修改最终失败后，当<code>cxlOnFail</code>设置为<code>false</code>时返回 <code>-1</code>;当<code>cxlOnFail</code>设置为<code>true</code>时则返回<code>1</code><br>通过Web/APP修改订单时，如果修改失败后，则返回<code>-1</code></td></tr><tr><td style="text-align: left">&gt; reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">&gt; quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID。策略订单触发，且策略单有<code>algoClOrdId</code>时有值，否则为"",</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID，策略订单触发时有值，否则为""</td></tr><tr><td style="text-align: left">&gt; lastPx</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">&gt; code</td><td style="text-align: left">String</td><td style="text-align: left">错误码，默认为0</td></tr><tr><td style="text-align: left">&gt; msg</td><td style="text-align: left">String</td><td style="text-align: left">错误消息，默认为""</td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">&gt; outcome</td><td style="text-align: left">String</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code></td></tr></tbody></table>

::: tip
对于市价委托，订单频道推送消息会出现状态为“完全成交”，但最新成交数量 (fillSz) 为 0 的情况。
:::

::: tip
极端情况下，会出现同一条消息重复推送的情况（\`uTime\` 可能会不一样），建议做如下处理：  
  
\* 当\`tradeId\`有值时，代表成交，对于同一\`tradeId\`，请以第一条推送消息为准，忽略后续的推送消息；  
\* 当\`tradeId\`没有值且 \`state\` 为\`filled\`时，代表币币/杠杆市价单关闭，对于同一\`ordId\`的完全成交（state:filled）推送消息，请以第一条成交推送消息为准，忽略后续的推送消息；  
\* 当\`state\`为\`canceled\`或者\`mmp\_canceled\`时，代表订单撤销，对于同一\`ordId\`的撤单推送消息，请以第一条推送消息为准，忽略后续的推送消息；  
\* 当\`reqId\`有值时，代表用户改单，改单时建议使用唯一的\`reqId\`，对于同一\`reqId\`的改单推送消息，请以第一条推送消息为准，忽略后续的推送消息。
:::

::: tip
REST 订单信息接口和订单频道在 fillPx、tradeId、fillSz、fillPnl、fillTime、fillFee、fillFeeCcy 和 execType 的定义上存在差异。
:::

::: tip
与交割合约不同，期权持仓到期之后，期权持仓在到期后会自动行权或作废，持仓本身随即消失，不会产生任何平仓订单，因此，该频道不会推送期权到期的平仓订单信息。
:::

### WS / 成交频道

获取成交信息。该频道无首推，仅在订单簿成交相关事件触发时推送数据，tradeId > 0。

该频道仅适用于交易等级VIP4及以上的用户，其他用户接入将收到错误码64003。其他用户请使用[WS / 订单频道](/zh/order-book-trading-trade-ws-order-channel)。

对于 `EVENTS`，无论实际订单是否为 YES 或 NO 方向，仅推送 YES 侧成交数据。

#### 服务地址

/ws/v5/private (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [
        {
            "channel": "fills",
            "instId": "BTC-USDT-SWAP"
        }
    ]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
            "channel": "fills",
            "instId": "BTC-USDT-SWAP"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [
        {
            "channel": "fills"
        }
    ]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/private",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
            "channel": "fills"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>fills</code></td></tr><tr><td>&gt; instId</td><td>String</td><td>否</td><td>产品ID</td></tr></tbody></table>

> 成功返回示例：单个

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "fills",
    "instId": "BTC-USDT-SWAP"
  },
  "connId": "a4d3ae55"
}
```

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
    "channel": "fills"
  },
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>fills</code></td></tr><tr><td>&gt; instId</td><td>String</td><td>否</td><td>产品ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg": {
        "channel": "fills",
        "instId": "BTC-USDT-SWAP",
        "uid": "614488474791111"
    },
    "data":[
        {
            "instId": "BTC-USDT-SWAP",
            "fillSz": "100",
            "fillPx": "70000",
            "side": "buy",
            "ts": "1705449605015",
            "ordId": "680800019749904384",
            "clOrdId": "1234567890",
            "tradeId": "12345",
            "execType": "T",
            "count": "10"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; uid</td><td>String</td><td>用户标识</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt; fillSz</td><td>String</td><td>成交数量，若这笔成交有聚合，则成交数量为聚合后的数量</td></tr><tr><td>&gt; fillPx</td><td>String</td><td>成交价格</td></tr><tr><td>&gt; side</td><td>String</td><td>订单方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td>&gt; ts</td><td>String</td><td>成交时间</td></tr><tr><td>&gt; ordId</td><td>String</td><td>订单ID</td></tr><tr><td>&gt; clOrdId</td><td>String</td><td>由用户设置的订单ID</td></tr><tr><td>&gt; tradeId</td><td>String</td><td>成交ID<br>若为taker订单且有聚合，则为聚合的多笔交易中最新一笔交易的成交ID</td></tr><tr><td>&gt; execType</td><td>String</td><td>流动性方向<br><code>T</code>：taker<br><code>M</code>：maker</td></tr><tr><td>&gt; count</td><td>String</td><td>聚合的订单匹配数量</td></tr></tbody></table>

::: tip
\- 该频道仅适用于交易等级VIP4及以上的用户，其他用户接入将收到错误码64003  
\- 该频道只推送部分订单频道的信息，与大宗交易、价差速递相关的成交，强平、自动减仓等非订单簿事件不会通过该频道推送。用户应同时关注订单频道，对订单做最终确认  
\- 该频道接收到成交推送时，账户余额、保证金、持仓等信息可能仍未发生变化  
\- taker订单将根据不同成交价格进行聚合，有聚合时，count字段表示聚合的订单匹配数量，tradeId代表聚合的多笔交易中最新一笔交易的ID；maker订单不会聚合  
\- 用户可以在下单时指定clOrdId，成交时会返回该字段。请注意，成交频道仅在用户输入的clOrdId符合带符号int64正整数格式（1-9223372036854775807, 2^63-1）时返回该字段；若用户未输入该字段，或clOrdId不符合格式要求，该字段将返回"0"。订单接口及频道将照常返回用户传入的clOrdId。所有请求及返回参数均为字符串类型。  
\- 未来，该频道将施加连接数量限制，子账户维度，订阅成交频道的最大连接数为20个。我们建议用户始终低于限制使用该频道，以免限制上线后对策略造成影响
:::

### WS / 下单

只有当您的账户有足够的资金才能下单。一旦下单，您的账户资金将在订单生命周期内被冻结。被冻结的资金以及数量取决于订单指定的类型和参数  
  

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：60次/2s

#### 跟单交易带单员带单产品的限速：4次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
同\`下单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1512",
    "op": "order",
    "args": [{
        "side": "buy",
        "instIdCode": 123456,
        "tdMode": "isolated",
        "ordType": "market",
        "sz": "100"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>order</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">是</td><td style="text-align: left">产品唯一标识代码。</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br>保证金模式 <code>isolated</code>：逐仓 <code>cross</code>：全仓<br>非保证金模式 <code>cash</code>：现金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单) ，现货带单时，<code>tdMode</code> 的值需要指定为<code>spot_isolated</code><br><br><font color="red">事件合约对应交易产品仅支持<code>isolated</code>逐仓下单</font></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">由用户设置的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-16位之间。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓方向<br>在买卖模式下，默认 <code>net</code><br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code>，仅适用于<code>交割/永续</code></td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单，仅适用于<code>币币/杠杆/交割/永续</code><br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>、<code>post_only</code>、<code>fok</code>、<code>ioc</code>、<code>mmp</code>、<code>mmp_and_post_only</code>类型的订单<br>期权下单时，px/pxUsd/pxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; speedBump</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">&gt; outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，且为必填</td></tr><tr><td style="text-align: left">&gt; pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权下单<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">&gt; pxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权下单，例如 1 代表 100%<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">&gt; reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">&gt; banAmend</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否禁止币币市价改单，true 或 false，默认false<br>为true时，余额不足时，系统不会改单，下单会失败，仅适用于币币市价单</td></tr><tr><td style="text-align: left">&gt; pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>px</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>px</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; slippagePct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币、币币杠杆市价单（<code>tgtCcy</code> 为到手币种：买单为 <code>base_ccy</code>，卖单为 <code>quote_ccy</code>）的最大可接受滑点。<br>取值范围：<code>0</code> 至 <code>0.05</code>（即 0% 至 5%，含边界），以百分比形式表示时最多保留 2 位小数，例如 <code>0.01</code>（1%）和 <code>0.0123</code>（1.23%）合法；<code>0.01234</code>（1.234%）将被拒绝。<br>不填或为空时，默认为 <code>0.00%</code>。<br>不支持改单修改滑点，如需调整请撤单重新提交。<br>仅适用于币币和币币杠杆的市价单。</td></tr><tr><td style="text-align: left">&gt; stpMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">自成交保护模式<br><code>cancel_maker</code>,<code>cancel_taker</code>, <code>cancel_both</code><br>Cancel both不支持FOK<br><br>默认使用账户层面的acctStpMode进行下单，该字段的默认值为<code>cancel_maker</code>，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。</td></tr><tr><td style="text-align: left">&gt; isElpTakerAccess</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否作为 taker 吃单 ELP<br><code>true</code>：该请求能吃单 ELP，但会被施加延迟<br><code>false</code>：该请求不能吃单 ELP，并且没有延迟<br><br>默认值为<code>false</code>，<code>true</code>仅适用于ioc订单</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求有效截止时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "op": "order",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 失败返回示例

```
{
    "id": "1512",
    "op": "order",
    "data": [{
        "clOrdId": "",
        "ordId": "",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误返回示例

```
{
    "id": "1512",
    "op": "order",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">操作<br><code>order</code></td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
tdMode  
交易模式，下单时需要指定  
**现货模式：**  
\- 币币和期权买方：cash  
**合约模式：**  
\- 逐仓杠杆：isolated  
\- 全仓杠杆：cross  
\- 币币：cash  
\- 全仓交割/永续/期权：cross  
\- 逐仓交割/永续/期权：isolated  
**跨币种保证金模式：**  
\- 逐仓杠杆：isolated  
\- 全仓币币：cross  
\- 全仓交割/永续/期权：cross  
\- 逐仓交割/永续/期权：isolated  
**组合保证金模式：**  
\- 逐仓杠杆：isolated  
\- 全仓币币：cross  
\- 全仓交割/永续/期权：cross  
\- 逐仓交割/永续/期权：isolated
:::

::: tip
clOrdId  
clOrdId 是用户在 User ID 维度自定义的订单唯一标识符。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。  
clOrdId不能与当前所有的挂单的clOrdId重复
:::

::: tip
posSide  
持仓方向，买卖模式下此参数非必填，如果填写仅可以选择net；在开平仓模式下必填，且仅可选择 long 或 short。  
开平仓模式下，side和posSide需要进行组合  
开多：买入开多（side 填写 buy； posSide 填写 long ）  
开空：卖出开空（side 填写 sell； posSide 填写 short ）  
平多：卖出平多（side 填写 sell；posSide 填写 long ）  
平空：买入平空（side 填写 buy； posSide 填写 short ）  
组合保证金模式：交割和永续仅支持买卖模式
:::

::: tip
ordType  
订单类型，创建新订单时必须指定，您指定的订单类型将影响需要哪些订单参数和撮合系统如何执行您的订单，以下是有效的ordType：  
普通委托：  
limit：限价单，要求指定sz 和 px  
market：市价单，币币和币币杠杆，是市价委托吃单；交割合约和永续合约，是自动以最高买/最低卖价格委托，遵循限价机制；期权合约不支持市价委托；由于市价委托无法确定成交价格，为确保有足够的资产买入设定数量的交易币种，会多冻结5%的计价币资产  
高级委托：  
post\_only：限价委托，在下单那一刻只做maker，如果该笔订单的任何部分会吃掉当前挂单深度，则该订单将被全部撤销。  
fok：限价委托，全部成交或立即取消，如果无法全部成交该笔订单，则该订单将被全部撤销。  
ioc：限价委托，立即成交并取消剩余，立即按照委托价格撮合成交，并取消该订单剩余未完成数量，不会在深度列表上展示委托数量。  
optimal\_limit\_ioc：市价委托，立即成交并取消剩余，仅适用于交割合约和永续合约。
:::

::: tip
sz  
交易数量，表示要购买或者出售的数量。  
当币币/币币杠杆以限价买入和卖出时，指交易货币数量。  
当币币杠杆以市价买入时，指计价货币的数量。  
当币币杠杆以市价卖出时，指交易货币的数量。  
对于币币市价单，单位由 tgtCcy 决定  
当交割、永续、期权买入和卖出时，指合约张数。
:::

::: tip
reduceOnly  
只减仓，下单时，此参数设置为 true 时，表示此笔订单具有减仓属性，只会减少持仓数量，不会增加新的持仓仓位  
对于同一杠杆产品，所有反方向挂单的币数加上当前只减仓下单数量，不能超过仓位资产；负债还完后，如果还有剩余的委托数量，不会反向开仓，而是会进行币币交易。  
对于同一交割/永续产品，当前只减仓下单张数，加上价格时间优先于当前只减仓下单的只减仓挂单张数总和，不能超过持仓数量  
仅适用于\`合约模式\`和\`跨币种保证金模式\`  
仅适用于\`币币杠杆\`，以及买卖模式下的\`交割/永续\`  
注意：交割和永续合约在开平仓模式下，所有的平仓单都有只减仓逻辑，不受该字段传值的影响。
:::

::: tip
tgtCcy  
市价单委托数量\`sz\`的单位：仅适用于币币市价下单交易。  
交易货币：base\_ccy  
计价货币：quote\_ccy  
您在使用交易货币买入或者计价货币卖出时，请知晓：  
1.如果您输入的数量大于当前可买或者可卖的数量，系统将按照您的最大可买或者可卖数量帮您完成交易，如果您希望按照指定数量成交，那您可以尝试使用限价单，等待市场价格波动到锁定的余额可以买入或卖出您指定的数量。  
2.如果您输入的数量不大于当前可买或者可卖的数量，那当市场价格波动过大时，锁定的余额可能没办法买入您输入的交易货币数量或卖出您输入的计价货币数量，为保证您的交易体验，我们基于【能买多少买多少】或者【能卖多少卖多少】的原则，更改下单的数量帮您完成交易。此外，我们将尽量多锁定一点余额来规避更改下单数量的情况。  
2.1 交易币买入例子：  
以市价下单 买入 10个LTC为例，用户可买为11个，此时 10 < 11，挂单成功。当LTC-USDT的市价为200，用户被锁定余额为3,000 USDT，200\*10 < 3,000，最终成交10个LTC； 若市场波动过大，LTC-USDT的市价为400，此时400\*10 > 3,000，当用户被锁定的余额不够买入下单指定的交易货币数量时，系統使用用户被锁定的最大余额3,000 USDT下单买入，最终成交 3,000/400 = 7.5个 LTC。  
2.2 计价币卖出例子：  
以市价下单 卖出 1,000USDT为例，用户可卖为1,200USDT，1,000 < 1,200，挂单成功。LTC-USDT的市价为200，用户被锁定的余额为6个LTC，最终成交5个LTC； 若市场波动过大，LTC-USDT的市价为100，100\*6 < 1,000，当用户被锁定的余额不够卖出下单指定的计价货币数量时，系統使用用户被锁定的最大余额6个LTC下单，最终成交 6 \* 100 = 600 USDT。
:::

::: tip
px  
期权下单时，委托价格需为 tickSz 的整数倍。  
当不为整数倍时，取值规则以tickSz取 0.0005 为例：  
当委托价格对0.0005的余数大于0.00025或者委托价格小于0.0005时，向上取；  
当委托价格对0.0005的余数小于等于0.00025，且委托价格大于0.0005时，向下取。
:::

::: tip
强制自成交保护  
交易系统会以母账户维度实施强制自成交保护，同一母账户下所有账户，包括母账户本身和所有子账户，都无法进行自成交。默认使用账户层面的acctStpMode进行下单，该字段的默认值为\`cancel\_maker\`，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。用户亦可以通过下单接口的stpMode参数指定订单的STP模式。  
强制自成交保护不会导致延迟。  
有三种STP模式。STP模式始终基于taker订单中的配置。  
1.Cancel Maker：这是默认的STP模式，系统撤Maker订单以防止自成交。然后，taker订单会基于深度继续和下一个订单成交。  
2.Cancel Taker：撤Taker订单以防止自成交。如果用户的Maker订单不是深度里第一个订单，Taker订单会被部分成交，然后撤单。FOK订单会确保完全成交和自成交保护。  
3.Cancel Both：撤Taker和Maker订单以防止自成交。如果用户的Maker订单不是深度里第一个订单，Taker订单会被部分成交，然后Taker订单的剩余数量和第一个自我Maker订单被取消。此模式不支持FOK订单。
:::

::: tip
isElpTakerAccess:true订单限速  
\- 50个/2s，限制维度为 User ID + Instrument ID  
\- 该限速会在 REST 和 WebSocket 的下单及批量下单接口中共享
:::

### WS / 批量下单

批量进行下单操作，每次可批量交易不同类型的产品，最多可下单20个  
  

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：300个/2s

#### 跟单交易带单员带单产品的限速：4个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`下单\`限速中。
:::

::: tip
同\`批量下单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1513",
    "op": "batch-orders",
    "args": [{
        "side": "buy",
        "instIdCode": 123456,
        "tdMode": "isolated",
        "ordType": "market",
        "sz": "100"
    }, {
        "side": "buy",
        "instIdCode": 654321,
        "tdMode": "isolated",
        "ordType": "limit",
        "sz": "1",
        "px": "20000"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">支持的业务操作，如 <code>batch-orders</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">是</td><td style="text-align: left">产品唯一标识代码。</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易模式<br>保证金模式 <code>cross</code>：全仓 <code>isolated</code>：逐仓<br>非保证金模式 <code>cash</code>：现金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单) ，现货带单时，<code>tdMode</code> 的值需要指定为<code>spot_isolated</code><br>注意：<code>isolated</code> 在跨币种保证金模式和组合保证金模式下不可用。<br><br><font color="red">事件合约对应交易产品仅支持<code>isolated</code>逐仓下单</font></td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户提供的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-16位之间。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向， <code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">持仓方向<br>在买卖模式下，默认 <code>net</code><br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code>，仅适用于<code>交割/永续</code></td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单，仅适用于<code>币币/杠杆/交割/永续</code><br><code>limit</code>：限价单<br><code>post_only</code>：只做maker单<br><code>fok</code>：全部成交或立即取消单<br><code>ioc</code>：立即成交并取消剩余单<br><code>optimal_limit_ioc</code>：市价委托立即成交并取消剩余（仅适用交割、永续）<br><code>mmp</code>：做市商保护(仅适用于组合保证金账户模式下的期权订单)<br><code>mmp_and_post_only</code>：做市商保护且只做maker单(仅适用于组合保证金账户模式下的期权订单)<br><code>elp</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>、<code>post_only</code>、<code>fok</code>、<code>ioc</code>、<code>mmp</code>、<code>mmp_and_post_only</code>类型的订单<br>期权下单时，px/pxUsd/pxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; speedBump</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">&gt; outcome</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">用户交易的市场结果方向。<br><code>yes</code><br><code>no</code><br>仅适用于 <code>EVENTS</code>，且为必填</td></tr><tr><td style="text-align: left">&gt; pxUsd</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以USD价格进行期权下单<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">&gt; pxVol</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">以隐含波动率进行期权下单，例如 1 代表 100%<br>仅适用于期权<br>期权下单时 px/pxUsd/pxVol 必填一个，且只能填一个</td></tr><tr><td style="text-align: left">&gt; reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">&gt; banAmend</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否禁止币币市价改单，true 或 false，默认false<br>为true时，余额不足时，系统不会改单，下单会失败，仅适用于币币市价单</td></tr><tr><td style="text-align: left">&gt; pxAmendType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>px</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>px</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; slippagePct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">币币、币币杠杆市价单（<code>tgtCcy</code> 为到手币种：买单为 <code>base_ccy</code>，卖单为 <code>quote_ccy</code>）的最大可接受滑点。<br>取值范围：<code>0</code> 至 <code>0.05</code>（即 0% 至 5%，含边界），以百分比形式表示时最多保留 2 位小数，例如 <code>0.01</code>（1%）和 <code>0.0123</code>（1.23%）合法；<code>0.01234</code>（1.234%）将被拒绝。<br>不填或为空时，默认为 <code>0.00%</code>。<br>不支持改单修改滑点，如需调整请撤单重新提交。<br>仅适用于币币和币币杠杆的市价单。</td></tr><tr><td style="text-align: left">&gt; stpMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">自成交保护模式<br><code>cancel_maker</code>,<code>cancel_taker</code>, <code>cancel_both</code><br>Cancel both不支持FOK<br><br>默认使用账户层面的acctStpMode进行下单，该字段的默认值为<code>cancel_maker</code>，用户可通过母账户登录网页修改该配置；用户亦可以通过下单接口的stpMode参数指定订单的STP模式。</td></tr><tr><td style="text-align: left">&gt; isElpTakerAccess</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否作为 taker 吃单 ELP<br><code>true</code>：该请求能吃单 ELP，但会被施加延迟<br><code>false</code>：该请求不能吃单 ELP，并且没有延迟<br><br>默认值为<code>false</code>，<code>true</code>仅适用于ioc订单</td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求有效截止时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

> 全部成功返回示例

```
{
    "id": "1513",
    "op": "batch-orders",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }, {
        "clOrdId": "",
        "ordId": "12344",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 部分成功返回示例

```
{
    "id": "1513",
    "op": "batch-orders",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }, {
        "clOrdId": "",
        "ordId": "",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "2",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 全部失败返回示例

```
{
    "id": "1513",
    "op": "batch-orders",
    "data": [{
        "clOrdId": "oktswap6",
        "ordId": "",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }, {
        "clOrdId": "oktswap7",
        "ordId": "",
        "tag": "",
        "ts":"1695190491421",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误返回示例

```
{
    "id": "1513",
    "op": "batch-orders",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败或成功时的msg</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
在组合保证金账户模式下，或者全部成功，或者全部失败。
:::

::: tip
clOrdId  
clOrdId是用户自定义的唯一ID用来识别订单。如果在请求参数中传入了，那它一定会在返回参数内，并且可以用于查询订单，撤销订单，修改订单等接口。 clOrdId不能与当前所有挂单和当前请求中的clOrdId重复。
:::

::: tip
isElpTakerAccess:true订单限速  
\- 50个/2s，限制维度为 User ID + Instrument ID  
\- 该限速会在 REST 和 WebSocket 的下单及批量下单接口中共享
:::

### WS / 撤单

撤销当前未完成订单

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：60次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

::: tip
同\`撤单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1514",
    "op": "cancel-order",
    "args": [{
        "instIdCode": 123456,
        "ordId": "2510789768709120"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">支持的业务操作，如 <code>cancel-order</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td>是</td><td style="text-align: left">产品唯一标识代码</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">订单ID<br>ordId和clOrdId必须传一个，若传两个，以 ordId 为主</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">用户提供的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度要在1-32位之间。</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1514",
    "op": "cancel-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "ts": "1695190491421",
        "sCode": "0",
        "sMsg": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 失败返回示例

```
{
    "id": "1514",
    "op": "cancel-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "ts": "1695190491421",
        "sCode": "5XXXX",
        "sMsg": "Order not exist"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误返回示例

```
{
    "id": "1514",
    "op": "cancel-order",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
撤单返回sCode等于0不能严格认为该订单已经被撤销，只表示您的撤单请求被系统服务器所接受，撤单结果以订单频道推送的状态或者查询订单状态为准
:::

### WS / 批量撤单

批量进行撤单操作，每次可批量撤销不同类型的产品，最多撤销20个

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：300个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`撤单\`限速中。
:::

::: tip
同\`批量撤单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1515",
    "op": "batch-cancel-orders",
    "args": [{
        "instIdCode": 123456,
        "ordId": "2517748157541376"
    }, {
        "instIdCode": 654321,
        "ordId": "2517748155771904"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">支持的业务操作，如 <code>batch-cancel-orders</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td>是</td><td style="text-align: left">产品唯一标识代码</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">订单ID<br>ordId和clOrdId必须传一个，若传两个，以ordId 为主</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">用户提供的订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度要在1-32位之间。</td></tr></tbody></table>

> 全部成功返回示例

```
{
    "id": "1515",
    "op": "batch-cancel-orders",
    "data": [{
        "clOrdId": "oktswap6",
        "ordId": "2517748157541376",
        "ts": "1695190491421",
        "sCode": "0",
        "sMsg": ""
    }, {
        "clOrdId": "oktswap7",
        "ordId": "2517748155771904",
        "ts": "1695190491421",
        "sCode": "0",
        "sMsg": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 部分成功的返回示例

```
{
    "id": "1515",
    "op": "batch-cancel-orders",
    "data": [{
        "clOrdId": "oktswap6",
        "ordId": "2517748157541376",
        "ts": "1695190491421",
        "sCode": "0",
        "sMsg": ""
    }, {
        "clOrdId": "oktswap7",
        "ordId": "2517748155771904",
        "ts": "1695190491421",
        "sCode": "5XXXX",
        "sMsg": "order not exist"
    }],
    "code": "2",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 全部失败的返回示例

```
{
    "id": "1515",
    "op": "batch-cancel-orders",
    "data": [{
        "clOrdId": "oktswap6",
        "ordId": "2517748157541376",
        "ts": "1695190491421",
        "sCode": "5XXXX",
        "sMsg": "order not exist"
    }, {
        "clOrdId": "oktswap7",
        "ordId": "2517748155771904",
        "ts": "1695190491421",
        "sCode": "5XXXX",
        "sMsg": "order not exist"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误示例

```
{
    "id": "1515",
    "op": "batch-cancel-orders",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

### WS / 改单

修改当前未成交的订单

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：60次/2s

#### 跟单交易带单员带单产品的限速：4次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
同\`改单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1512",
    "op": "amend-order",
    "args": [{
        "instIdCode": 123456,
        "ordId": "2510789768709120",
        "newSz": "2"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">支持的业务操作，如 <code>amend-order</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td>是</td><td style="text-align: left">产品唯一标识代码</td></tr><tr><td style="text-align: left">&gt; cxlOnFail</td><td style="text-align: left">Boolean</td><td>否</td><td style="text-align: left">当订单修改失败时，该订单是否需要自动撤销。默认为<code>false</code><br><code>false</code>：不自动撤单<br><code>true</code>：自动撤单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">订单ID<br>ordId和clOrdId必须传一个，若传两个，以 ordId 为主</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">用户提供的订单ID</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">用户提供的reqId<br>如果提供，那在返回参数中返回reqId，方便找到相应的修改请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">&gt; newSz</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">请求修改的新数量，必须大于0。<code>newSz</code>和<code>newPx</code>不可同时为空。对于部分成交订单，该数量应包含已成交数量。</td></tr><tr><td style="text-align: left">&gt; newPx</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">修改后的新价格<br>修改的新价格期权改单时，newPx/newPxUsd/newPxVol 只能填一个，且必须与下单参数保持一致，如下单用px，改单时需使用newPx</td></tr><tr><td style="text-align: left">&gt; speedBump</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">&gt; newPxUsd</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">以USD价格进行期权改单<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; newPxVol</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">以隐含波动率进行期权改单，例如 1 代表 100%<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; pxAmendType</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>newPx</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>newPx</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">请求有效截止时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "op": "amend-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 失败返回示例

```
{
    "id": "1512",
    "op": "amend-order",
    "data": [{
        "clOrdId": "",
        "ordId": "2510789768709120",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误返回示例

```
{
    "id": "1512",
    "op": "amend-order",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"

}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户提供的订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">用户提供的reqId<br>如果用户在请求中提供reqId，则返回相应reqId</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

::: tip
newSz : 当修改已经部分成交的订单时，新的委托数量必须大于等于已成交数量
:::

::: tip
修改订单返回sCode等于0不能严格认为该订单已经被修改，只表示您的修改订单请求被系统服务器所接受，改单结果以订单频道推送的状态或者查询订单状态为准
:::

### WS / 批量改单

批量进行改单操作，每次可批量修改不同类型的产品，最多改20个

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：300个/2s

#### 跟单交易带单员带单产品的限速：4个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

该接口限速同时受到 [子账户限速](/log_zh/upcoming-changes-sub-account-rate-limit) 及 [基于成交比率的子账户限速](/log_zh/upcoming-changes-fill-ratio-based-sub-account-rate-limit) 限速规则的影响。

::: tip
与其他限速按接口调用次数不同，该接口限速按订单的总个数限速。如果单次批量请求中只有一个元素，则算在单个\`修改订单\`限速中。
:::

::: tip
同\`批量改单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1513",
    "op": "batch-amend-orders",
    "args": [{
        "instIdCode": 123456,
        "ordId": "12345689",
        "newSz": "2"
    }, {
        "instIdCode": 123456,
        "ordId": "12344",
        "newSz": "2"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">支持的业务操作，如 <code>batch-amend-orders</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instIdCode</td><td style="text-align: left">Integer</td><td>是</td><td style="text-align: left">产品唯一标识代码</td></tr><tr><td style="text-align: left">&gt; cxlOnFail</td><td style="text-align: left">Boolean</td><td>否</td><td style="text-align: left">当订单修改失败时，该订单是否需要自动撤销。默认为<code>false</code><br><code>false</code>：不自动撤单<br><code>true</code>：自动撤单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">订单ID<br>ordId 和 clOrdId 必须传一个，若传两个，以order id 为主</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">用户提供的订单ID</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">用户提供的请求ID<br>如果提供，那在返回参数中返回reqId，方便找到相应的修改请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">&gt; newSz</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">修改后的新数量，必须大于0。<code>newSz</code>和<code>newPx</code>不可同时为空。对于部分成交订单，该数量应包含已成交数量。</td></tr><tr><td style="text-align: left">&gt; newPx</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">修改后的新价格<br>修改的新价格期权改单时，newPx/newPxUsd/newPxVol 只能填一个，且必须与下单参数保持一致，如下单用px，改单时需使用newPx</td></tr><tr><td style="text-align: left">&gt; speedBump</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">减速带<br><code>1</code>：事件合约速度限制（延迟可能因市场情况调整，不提前通知）。对 <code>EVENTS</code> 产品的非只挂单操作为必填。</td></tr><tr><td style="text-align: left">&gt; newPxUsd</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">以USD价格进行期权改单<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; newPxVol</td><td style="text-align: left">String</td><td>可选</td><td style="text-align: left">以隐含波动率进行期权改单，例如 1 代表 100%<br>仅适用于期权，期权改单时，newPx/newPxUsd/newPxVol 只能填一个</td></tr><tr><td style="text-align: left">&gt; pxAmendType</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">订单价格修正类型<br><code>0</code>：当<code>newPx</code>超出价格限制时，不允许系统修改订单价格<br><code>1</code>：当<code>newPx</code>超出价格限制时，允许系统将价格修改为限制范围内的最优值<br>默认值为<code>0</code></td></tr><tr><td style="text-align: left">expTime</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">请求有效截止时间。Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

> 全部成功返回示例

```
{
    "id": "1513",
    "op": "batch-amend-orders",
    "data": [{
        "clOrdId": "oktswap6",
        "ordId": "12345689",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }, {
        "clOrdId": "oktswap7",
        "ordId": "12344",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""
    }],
    "code": "0",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 全部失败返回示例

```
{
    "id": "1513",
    "op": "batch-amend-orders",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }, {
        "clOrdId": "oktswap7",
        "ordId": "",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "1",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 部分成功返回示例

```
{
    "id": "1513",
    "op": "batch-amend-orders",
    "data": [{
        "clOrdId": "",
        "ordId": "12345689",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "0",
        "sMsg": "",
        "subCode": ""

    }, {
        "clOrdId": "oktswap7",
        "ordId": "",
        "ts": "1695190491421",
        "reqId": "b12344",
        "sCode": "51008",
        "sMsg": "Order failed. Insufficient USDT balance in account",
        "subCode": "1000"
    }],
    "code": "2",
    "msg": "",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

> 格式错误返回示例

```
{
    "id": "1513",
    "op": "batch-amend-orders",
    "data": [],
    "code": "60013",
    "msg": "Invalid args",
    "inTime": "1695190491421339",
    "outTime": "1695190491423240"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">由用户设置的订单ID</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code>。与订单频道中的 <code>cTime</code> 相同。</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">用户提供的请求ID<br>如果用户在请求中提供reqId，则返回相应reqId</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">订单状态码，0 代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">订单状态消息</td></tr><tr><td style="text-align: left">&gt; subCode</td><td style="text-align: left">String</td><td style="text-align: left">sCode 的子码。<br>当 sCode 为 0（请求成功）时，返回 <code>""</code>。<br>当 sCode 不为 0（请求失败）且存在子码时，返回对应的子码；若无子码，则返回 <code>""</code>。</td></tr><tr><td style="text-align: left">inTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关接收请求时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr><tr><td style="text-align: left">outTime</td><td style="text-align: left">String</td><td style="text-align: left">WebSocket 网关发送响应时的时间戳，Unix时间戳的微秒数格式，如 <code>1597026383085123</code></td></tr></tbody></table>

### WS / 撤销 MMP 订单

撤销同一交易品种下用户所有的 MMP 挂单  
仅适用于组合保证金账户模式下的期权订单，且有 MMP 权限。

#### 服务地址

/ws/v5/private (需要登录)

#### 限速：5次/2s

#### 限速规则：User ID

::: tip
同\`撤销 MMP 订单\` REST API 共享限速
:::

> 请求示例

```
{
    "id": "1512",
    "op": "mass-cancel",
    "args": [{
        "instType":"OPTION",
        "instFamily":"BTC-USD"
    }]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">消息的唯一标识<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">支持的业务操作，如 <code>mass-cancel</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求参数</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易产品类型<br><code>OPTION</code>:期权</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">&gt; lockInterval</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">锁定时长(毫秒)<br>范围应为[0, 10 000]<br>默认为 0. 如果想要立即解锁，您可以设置为 "0"<br>下单时，如果在该锁定期间，会报错 54008，如果在 MMP 触发期间，会报错 51034</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "op": "mass-cancel",
    "data": [
        {
            "result": true
        }
    ],
    "code": "0",
    "msg": ""
}
```

> 格式错误返回示例

```
{
    "id": "1512",
    "op": "mass-cancel",
    "data": [],
    "code": "60013",
    "msg": "Invalid args"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">业务操作</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">代码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">消息</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">请求成功后返回的数据</td></tr><tr><td style="text-align: left">&gt; result</td><td style="text-align: left">Boolean</td><td style="text-align: left">撤单结果<br><code>true</code>：全部撤单成功<br><code>false</code>：全部撤单失败</td></tr></tbody></table>

## 策略交易

### POST / 策略委托下单

提供单向止盈止损委托、双向止盈止损委托、追逐限价委托、计划委托、时间加权委托、移动止盈止损委托

#### 限速：20次/2s

#### 跟单交易带单员带单产品的限速：1次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`POST /api/v5/trade/order-algo`

> 请求示例

```
# 止盈止损策略下单
POST /api/v5/trade/order-algo
body
{
    "instId":"BTC-USDT",
    "tdMode":"cross",
    "side":"buy",
    "ordType":"conditional",
    "sz":"2",
    "tpTriggerPx":"15",
    "tpOrdPx":"18"
}

# 计划委托策略下单
POST /api/v5/trade/order-algo
body
{
    "instId": "BTC-USDT-SWAP",
    "side": "buy",
    "tdMode": "cross",
    "posSide": "net",
    "sz": "1",
    "ordType": "trigger",
    "triggerPx": "25920",
    "triggerPxType": "last",
    "orderPx": "-1",
    "attachAlgoOrds": [{
        "attachAlgoClOrdId": "",
        "slTriggerPx": "100",
        "slOrdPx": "600",
        "tpTriggerPx": "25921",
        "tpOrdPx": "2001"
    }]
}

# 移动止盈止损策略下单
POST /api/v5/trade/order-algo
body
{
    "instId": "BTC-USDT-SWAP",
    "tdMode": "cross",
    "side": "buy",
    "ordType": "move_order_stop",
    "sz": "10",
    "posSide": "net",
    "callbackRatio": "0.05",
    "reduceOnly": true
}

# 时间加权策略下单
POST /api/v5/trade/order-algo
body
{
    "instId": "BTC-USDT-SWAP",
    "tdMode": "cross",
    "side": "buy",
    "ordType": "twap",
    "sz": "10",
    "posSide": "net",
    "szLimit": "10",
    "pxLimit": "100",
    "timeInterval": "10",
    "pxSpread": "10"
}

# 冰山委托策略下单
POST /api/v5/trade/order-algo
body
{
    "instId": "BTC-USDT",
    "tdMode": "cash",
    "side": "buy",
    "ordType": "smart_iceberg",
    "sz": "1000",
    "szLimit": "50",
    "lmtOrderNumber": "5",
    "aggressiveness": "conservative",
    "pxLimit": "95000",
    "side": "buy",
    "posSide": "",
    "ordType": "smart_iceberg",
    "triggerParams": [
      {
          "triggerAction":"start",
          "triggerStrategy":"rsi",
          "timeframe":"30m",
          "thold":"10",
          "triggerCond":"cross",
          "timePeriod":"14"
}
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 单向止盈止损
result = tradeAPI.place_algo_order(
    instId="BTC-USDT",
    tdMode="cross",
    side="buy",
    ordType="conditional",
    sz="2",
    tpTriggerPx="15",
    tpOrdPx="18"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br>保证金模式 <code>isolated</code>：逐仓，<code>cross：</code>全仓<br>非保证金模式 <code>cash</code>：非保证金<br><code>spot_isolated</code>：现货逐仓(仅适用于现货带单)<br>注意：<code>isolated</code> 在跨币种保证金模式和组合保证金模式下不可用。</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">保证金币种<br>适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">持仓方向<br>在开平仓模式下必填，且仅可选择 <code>long</code> 或 <code>short</code></td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>conditional</code>：单向止盈止损<br><code>oco</code>：双向止盈止损<br><br><code>chase</code>: 追逐限价委托，仅适用于交割和永续<br><code>trigger</code>：计划委托<br><code>move_order_stop</code>：移动止盈止损<br><code>twap</code>：时间加权委托<br><code>smart_iceberg</code>：冰山委托</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托数量<br><code>sz</code>和<code>closeFraction</code>必填且只能填其一</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">委托数量的类型<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>单向止盈止损市价买单<br>默认买为<code>计价货币</code>，卖为<code>交易货币</code></td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义策略订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%<br>现在系统只支持全部平仓，唯一接受参数为<code>1</code><br>对于同一个仓位，仅支持一笔全部平仓的止盈止损挂单<br><br>仅适用于<code>交割</code>或<code>永续</code><br>当<code>posSide</code> = <code>net</code>时，<code>reduceOnly</code>必须为<code>true</code><br>仅适用于止盈止损 <code>ordType</code> = <code>conditional</code> 或 <code>oco</code><br>仅适用于止盈止损市价订单<br>不支持组合保证金模式<br><code>sz</code>和<code>closeFraction</code>必填且只能填其一</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。仅适用于<code>币币</code>。<br>默认值为 <code>instId</code> 的计价币种，比如：对于 <code>BTC-USD</code>，默认取 <code>USD</code>。</td></tr></tbody></table>

**止盈止损**

::: tip
用户可预先设置触发价和委托价，等市场价到达触发价时，系统会按委托价自动下单。  
单向止盈止损可设置单边的止盈或止损；双向止盈止损可设置双边，一边触发后另一边失效。  
该委托不会预先占用仓位或保证金。
:::

了解更多 [止盈止损](/cn/help/11015447687437)

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈委托价<br>对于条件止盈单，如果填写此参数，必须填写<code>止盈触发价</code><br>对于限价止盈单，需填写此参数，不需要填写<code>止盈触发价</code><br>委托价格为-1时，执行市价止盈</td></tr><tr><td style="text-align: left">tpOrdKind</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈订单类型<br><code>condition</code>: 条件单<br><code>limit</code>: 限价单<br>默认为<code>condition</code></td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">cxlOnClosePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">决定用户所下的止盈止损订单是否与该交易产品对应的仓位关联。若关联，仓位被全平时，该止盈止损订单会被同时撤销；若不关联，仓位被撤销时，该止盈止损订单不受影响。<br><br>有效值：<br><code>true</code>：下单与仓位关联的止盈止损订单<br><code>false</code>：下单与仓位不关联的止盈止损订单<br><br>默认值为<code>false</code>。若传入<code>true</code>，用户必须同时传入 reduceOnly = true，说明当下单与仓位关联的止盈止损订单时，必须为只减仓。<br>适用于<code>合约模式</code>/<code>跨币种保证金模式</code>。</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr></tbody></table>

::: tip
止盈止损  
当用户进行单向止盈止损委托（ordType=conditional）时，如果用户同时传了止盈止损四个参数，只进行止损的功能校验，忽略止盈的业务逻辑校验。
:::

**追逐限价委托**

::: tip
追逐限价委托会立即下 Post Only 订单（只做maker单）并跟随深度变动进行改单。  
追逐限价委托和对应的 Post Only 订单不支持改单。
:::

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">chaseType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">追逐类型。<br><code>distance</code>: 买一/卖一价的距离，默认值。<br><code>ratio</code>: 比例。</td></tr><tr><td style="text-align: left">chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">追逐值。<br>当<code>chaseType</code>为<code>distance</code>时，是到买一/卖一价的距离。<br>对于 USDT 本位合约，单位为 USDT；<br>对于 USDC 合约，单位为 USDC；<br>对于币本位合约，单位为 USD 。<br>当<code>chaseType</code>为<code>ratio</code>时，为比率，0.1 代表 10%。<br>默认值为 0。</td></tr><tr><td style="text-align: left">maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">最大追逐值的类型。<br><code>distance</code>: 买一/卖一价的距离<br><code>ratio</code>: 比例。0.1 代表 10%。<br><br>maxChaseTyep 和 maxChaseVal 需要同时填写或者不填写。</td></tr><tr><td style="text-align: left">maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">最大追逐值。<br>当<code>chaseType</code>为<code>distance</code>时，是到买一/卖一价的的最大距离<br>当<code>chaseType</code>为<code>ratio</code>时，指的比率，0.1 代表 10%。</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>币币杠杆</code>，以及买卖模式下的<code>交割/永续</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr></tbody></table>

**计划委托**

::: tip
当市场价格到达触发价格时，系统将按预先设置的委托价格和数量自动下单。  
该委托不会预先占用仓位或保证金。  
仅适用于币币、交割和永续。
:::

了解更多 [计划委托](/cn/help/11015447687437)

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发该策略订单的价格阈值，单位与该产品的 <code>px</code> 相同。具体使用哪种价格源取决于 <code>triggerPxType</code>（默认为最新成交价）。方向：做空止损单的触发价须低于 orderPx；做多止损单的触发价须高于 orderPx。方向违规将返回错误码 51046–51049。</td></tr><tr><td style="text-align: left">orderPx</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">触发后提交的委托价格，与 <code>triggerPx</code>（决定何时激活）相互独立。设为 <code>-1</code> 表示触发后以市价委托；设置具体价格表示触发后以限价委托。当 <code>advanceOrdType</code> 为 <code>chase</code> 时不适用（追逐委托无固定价格）。</td></tr><tr><td style="text-align: left">advanceOrdType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">计划委托的子订单类型。<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>chase</code>：追逐限价委托。仅适用于 FUTURES 和 SWAP。<br>默认为空（按 <code>orderPx</code> 下发限价或市价单）。</td></tr><tr><td style="text-align: left">advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">条件必填</td><td style="text-align: left">追逐参数。当 <code>advanceOrdType</code> 为 <code>chase</code> 时必填。</td></tr><tr><td style="text-align: left">&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">追逐距离单位。<br><code>distance</code>（默认）：与买一价/卖一价的绝对价格距离，以结算货币计。<br><code>ratio</code>：百分比。</td></tr><tr><td style="text-align: left">&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">追逐值。当 <code>chaseType</code> 为 <code>distance</code> 时，为与买一价/卖一价的距离（以结算货币计）；当 <code>ratio</code> 时，<code>0.1</code> 表示 10%。<br>默认值 <code>0</code> 表示直接跟随买一价/卖一价；大于 <code>0</code> 表示设置一个距离。</td></tr><tr><td style="text-align: left">&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">最大追逐距离单位。<code>distance</code> 或 <code>ratio</code>。须与 <code>maxChaseVal</code> 成对出现。</td></tr><tr><td style="text-align: left">&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">最大追逐距离值。须为正数。须与 <code>maxChaseType</code> 成对出现。当偏离达到该值时，追逐委托自动撤单。</td></tr><tr><td style="text-align: left">triggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发价格类型：<br><code>last</code>：任意成交价达到或超过 <code>triggerPx</code> 时触发——响应最快，但在流动性较差市场中易受短暂插针影响。<br><code>index</code>：基于多交易所合成指数触发——稳定，不受OKX自身插针影响。<br><code>mark</code>：基于OKX标记价格触发——经过平滑处理，抗插针能力强；衍生品推荐使用。<br>现货产品仅支持 <code>last</code>。默认为 <code>last</code>。</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">附带止盈止损信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code><br>当 <code>advanceOrdType</code> 为 <code>chase</code> 时不适用。</td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">下单附带止盈止损时，客户自定义的策略订单ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下止盈止损委托单时，该值会传给algoClOrdId。</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>tpTriggerPx</code> 和 <code>tpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>slTriggerPx</code> 和 <code>slTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。0 代表删除止损。</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的价距。<br><code>callbackRatio</code> 和 <code>callbackSpread</code> 必须传入其中一个，且只能传入一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">激活价格。<br>激活价格是移动止盈止损的激活条件，当市场最新成交价达到或超过激活价格，委托被激活。激活后系统开始计算止盈止损的实际触发价格。如果不填写激活价格，即下单后就被激活。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr></tbody></table>

**移动止盈止损**

::: tip
移动止盈止损是一种跟踪市场价格的止盈止损，它的触发价格会跟随市场波动而变化，触发成功后会下市价单。  
实际触发价格的计算：卖出或开空时，实际触发价格 = 下单成功后最高价-回调幅度 (价距)，或下单成功后最高价 \*(1-回调幅度 %) (比例)；买入或开多，实际触发价格 = 下单成功后最低价 + 回调幅度，或下单成功后最低价 \*(1+ 回调幅度 %)。同时，您可以利用激活价格来设置委托被激活的价格。
:::

了解更多 [移动止盈止损](/cn/help/11015447687437)

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的比例，如 "0.05"代表"5%"<br><code>callbackRatio</code>和<code>callbackSpread</code>只能传入一个</td></tr><tr><td style="text-align: left">callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">activePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">激活价格<br>激活价格是移动止盈止损的激活条件，当市场最新成交价达到或超过激活价格，委托被激活。激活后系统开始计算止盈止损的实际触发价格。如果不填写激活价格，即下单后就被激活。</td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>该参数仅在 <code>交割/永续</code> 的买卖模式下有效，开平模式忽略此参数</td></tr></tbody></table>

**时间加权**

::: tip
时间加权是一种大额订单拆分后分时吃单的策略。  
用户在进行大额交易时，为避免对市场造成过大冲击，需要将大单委托自动拆为多笔委托。
:::

了解更多 [时间加权委托](/cn/help/xiii-time-weighted-average-price-twap)

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">pxVar</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">吃单价优于盘口的比例，取值范围在 [0.0001,0.01] 之间，如 "0.01"代表"1%"<br>以买入为例，市价低于限制价时，策略开始用买一价向上取一定比例的委托价来委托小额买单。当前这个参数就用来确定向上的比例。<br><code>pxVar</code>和<code>pxSpread</code>只能传入一个</td></tr><tr><td style="text-align: left">pxSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">吃单单价优于盘口的价距，取值范围不小于0（无上限）<br>以买入为例，市价低于限制价时，策略开始用买一价向上取一定价距的委托价来委托小额买单。当前这个参数就用来确定向上的价距。</td></tr><tr><td style="text-align: left">szLimit</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">单笔数量<br>以买入为例，市价低于 “限制价” 时，策略开始用买一价向上取一定价距 / 比例的委托价来委托 “一定数量” 的买单。当前这个参数用来确定其中的 “一定数量”。</td></tr><tr><td style="text-align: left">pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">吃单限制价，取值范围不小于0（无上限）<br>以买入为例，市价低于 “限制价” 时，策略开始用买一价向上取一定价距 / 比例的委托价来委托小额买单。当前这个参数就是其中的 “限制价”。</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">下单间隔，单位为秒。<br>以买入为例，市价低于 “限制价” 时，策略开始按 “时间周期” 用买一价向上取一定价距 / 比例的委托价来委托小额买单。当前这个参数就是其中的 “时间周期”。</td></tr></tbody></table>

**冰山委托**

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">szLimit</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">单笔最小数量限制，仅适用于 <code>smart_iceberg</code></td></tr><tr><td style="text-align: left">lmtOrderNumber</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">限价拆单数量，仅适用于 <code>smart_iceberg</code></td></tr><tr><td style="text-align: left">aggressiveness</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">激进度，仅适用于 <code>smart_iceberg</code><br><code>radical</code>：更快成交<br><code>mid</code>：较快成交，较优价格<br><code>conservative</code>：盘口排队</td></tr><tr><td style="text-align: left">pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">价格上限，仅适用于 <code>smart_iceberg</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">触发参数，列表为空时默认立即触发，仅适用于 <code>smart_iceberg</code></td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发行为<br><code>start</code>：启动冰山委托</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：RSI指标触发<br>默认为 <code>instant</code></td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发价格<br>仅在 <code>triggerStrategy</code> 为 <code>price</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">K线种类<br><code>3m</code>、<code>5m</code>、<code>15m</code>、<code>30m</code>（m代表分钟）<br><code>1H</code>、<code>4H</code>（H代表小时）<br><code>1D</code>（D代表天）<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">阈值，取值 [1,100] 的整数<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">RSI 计算周期，默认值为 <code>14</code><br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoId":"12345689",
            "clOrdId": "",
            "algoClOrdId": "",
            "sCode":"0",
            "sMsg":"",
            "tag":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left"><del>客户自定义订单ID</del>（已废弃）</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 撤销策略委托订单

撤销策略委托订单，每次最多可以撤销10个策略委托单

#### 限速：20个/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`POST /api/v5/trade/cancel-algos`

> 请求示例

```
POST /api/v5/trade/cancel-algos
body
[
    {
        "algoId":"590919993110396111",
        "instId":"BTC-USDT"
    },
    {
        "algoId":"590920138287841222",
        "instId":"BTC-USDT"
    }
]
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 支持止盈止损，计划委托 类型的策略撤单
algo_orders = [
    {"instId": "BTC-USDT", "algoId": "590919993110396111"},
    {"instId": "BTC-USDT", "algoId": "590920138287841222"}
]

result = tradeAPI.cancel_algo_order(algo_orders)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID 如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">策略委托单ID<br><code>algoId</code>和<code>algoClOrdId</code>必须传一个，若传两个，以<code>algoId</code>为主</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">客户自定义策略订单ID<br><code>algoId</code>和<code>algoClOrdId</code>必须传一个，若传两个，以<code>algoId</code>为主</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "1836489397437468672",
            "clOrdId": "",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left"><del>客户自定义订单ID</del>（已废弃）</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left"><del>客户自定义策略订单ID</del>（已废弃）</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left"><del>订单标签</del>（已废弃）</td></tr></tbody></table>

### POST / 修改策略委托订单

修改策略委托订单（仅支持止盈止损和计划委托订单，不包含、冰山委托、时间加权、移动止盈止损等订单）  

#### 限速：20次/2s

#### 限速规则：User ID + Instrument ID

#### HTTP请求

`POST /api/v5/trade/amend-algos`

> 请求示例

```
POST /api/v5/trade/amend-algos
body
{
    "algoId":"2510789768709120",
    "newSz":"2",
    "instId":"BTC-USDT"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">策略委托单ID<br><code>algoId</code>和<code>algoClOrdId</code>必须传一个，若传两个，以<code>algoId</code>为主</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">客户自定义策略订单ID<br><code>algoId</code>和<code>algoClOrdId</code>必须传一个，若传两个，以<code>algoId</code>为主</td></tr><tr><td style="text-align: left">cxlOnFail</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">当订单修改失败时，该订单是否需要自动撤销。默认为<code>false</code><br><code>false</code>：不自动撤单<br><code>true</code>：自动撤单</td></tr><tr><td style="text-align: left">reqId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义修改事件ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr><tr><td style="text-align: left">newSz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">修改的新数量，必须大于0。</td></tr></tbody></table>

**止盈止损**

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">newTpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价<br>如果止盈触发价或者委托价为0，那代表删除止盈</td></tr><tr><td style="text-align: left">newTpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈委托价<br>委托价格为-1时，执行市价止盈</td></tr><tr><td style="text-align: left">newSlTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价<br>如果止损触发价或者委托价为0，那代表删除止损</td></tr><tr><td style="text-align: left">newSlOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损委托价<br>委托价格为-1时，执行市价止损</td></tr><tr><td style="text-align: left">newTpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">newSlTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr></tbody></table>

**计划委托**

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">newTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">修改后的触发价格</td></tr><tr><td style="text-align: left">newOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">修改后的委托价格<br>委托价格为<code>-1</code>时，执行市价委托</td></tr><tr><td style="text-align: left">newTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">修改后的计划委托触发价格类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">修改附带止盈止损或移动止盈止损订单信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; newTpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt; newTpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newTpTriggerPx</code> 和 <code>newTpTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须大于 0，如果主单为卖出订单，必须处于 -1 和 0 之间。0 代表删除止盈。</td></tr><tr><td style="text-align: left">&gt; newTpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">修改后的止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; newTpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt; newSlTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约<br><code>newSlTriggerPx</code> 和 <code>newSlTriggerRatio</code> 只能传入其中一个<br>如果主单为买入订单，必须处于 0 和 1 之间，如果主单为卖出订单，必须大于 0。0 代表删除止损。</td></tr><tr><td style="text-align: left">&gt; newSlTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为<code>last</code></td></tr><tr><td style="text-align: left">&gt; newSlOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; newCallbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度比例，如 <code>0.05</code> 代表 5%。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newCallbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的回调幅度价距。<br><code>newCallbackRatio</code> 和 <code>newCallbackSpread</code> 只能传入其中一个。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">&gt; newActivePx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">新的激活价格。<br>仅适用于 <code>ordType</code> = <code>move_order_stop</code></td></tr><tr><td style="text-align: left">advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">条件必填</td><td style="text-align: left">待修改的追逐参数。仅适用于 <code>advanceOrdType</code> 为 <code>chase</code> 的挂单中计划委托。</td></tr><tr><td style="text-align: left">&gt; newChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">新的追逐值。非负数，按订单已有（不可修改）的 <code>chaseType</code> 解释。不可越过原 <code>chaseVal</code> 的 <code>0</code> ↔ 非 <code>0</code> 边界——直接跟随买一价/卖一价（<code>0</code>）与设置距离（大于 <code>0</code>）两种模式不可互换。</td></tr><tr><td style="text-align: left">&gt; newMaxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">条件必填</td><td style="text-align: left">新的最大追逐距离值。须为正数，按已有（不可修改）的 <code>maxChaseType</code> 解释。仅在已启用最大追逐距离时适用。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoClOrdId":"algo_01",
            "algoId":"2510789768709120",
            "reqId":"po103ux",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">reqId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义修改事件ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### GET / 获取策略委托单信息

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/order-algo`

> 请求示例

```
GET /api/v5/trade/order-algo?algoId=1753184812254216192
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">策略委托单ID<br><code>algoId</code>和<code>algoClOrdId</code>必须传一个，若传两个，以<code>algoId</code>为主</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">客户自定义策略订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "activePx": "",
            "actualPx": "",
            "actualSide": "",
            "actualSz": "0",
            "algoClOrdId": "",
            "algoId": "1753184812254216192",
            "amendPxOnTriggerType": "0",
            "attachAlgoOrds": [],
            "cTime": "1724751378980",
            "callbackRatio": "",
            "callbackSpread": "",
            "ccy": "",
            "chaseType": "",
            "chaseVal": "",
            "clOrdId": "",
            "closeFraction": "",
            "failCode": "0",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTradeBorrowMode": "",
            "last": "62916.5",
            "lever": "",
            "linkedOrd": {
                "ordId": ""
            },
            "maxChaseType": "",
            "maxChaseVal": "",
            "moveTriggerPx": "",
            "ordId": "",
            "ordIdList": [],
            "ordPx": "",
            "ordType": "conditional",
            "posSide": "net",
            "pxLimit": "",
            "pxSpread": "",
            "pxVar": "",
            "quickMgnType": "",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "state": "live",
            "sz": "10",
            "szLimit": "",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "quote_ccy",
            "timeInterval": "",
            "tpOrdPx": "-1",
            "tpTriggerPx": "10000",
            "tpTriggerPxType": "last",
            "triggerPx": "",
            "triggerPxType": "",
            "triggerTime": "",
            "tradeQuoteCcy": "USDT",
            "uTime": "1724751378980"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">最新一笔订单ID，即将废弃。</td></tr><tr><td style="text-align: left">ordIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">订单ID列表，当止盈止损存在市价拆单时，会有多个。 对于追逐委托（trigger+chase），该字段为空——生成的订单为策略委托，参见 <code>subAlgoIdList</code>。</td></tr><tr><td style="text-align: left">subAlgoIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">计划委托触发时生成的策略委托单 <code>algoId</code>。当 <code>advanceOrdType</code> 为 <code>chase</code> 时，在触发后存放生成的追逐委托 <code>algoId</code>，触发前为空。与 <code>ordIdList</code> 对应，后者记录生成的普通订单。</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>live</code>：待生效<br><code>pause</code>：暂停生效<br><code>partially_effective</code>:部分生效<br><code>effective</code>：已生效<br><code>canceled</code>：已撤销<br><code>order_failed</code>：委托失败<br><code>partially_failed</code>：部分委托失败</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托触发价格</td></tr><tr><td style="text-align: left">triggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托触发价格类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">ordPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的委托价格</td></tr><tr><td style="text-align: left">advanceOrdType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托的子订单类型。<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>chase</code>：追逐限价委托<br>默认为空。</td></tr><tr><td style="text-align: left">advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">追逐参数。当 <code>advanceOrdType</code> 为 <code>chase</code> 时返回。</td></tr><tr><td style="text-align: left">&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。<code>0</code> 表示直接跟随买一价/卖一价；大于 <code>0</code> 表示距离。</td></tr><tr><td style="text-align: left">&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离值。</td></tr><tr><td style="text-align: left">actualSz</td><td style="text-align: left">String</td><td style="text-align: left">实际委托量</td></tr><tr><td style="text-align: left">actualPx</td><td style="text-align: left">String</td><td style="text-align: left">实际委托价</td></tr><tr><td style="text-align: left">actualSide</td><td style="text-align: left">String</td><td style="text-align: left">实际触发方向<br><code>tp</code>：止盈<br><code>sl</code>：止损<br>仅适用于<code>单向止盈止损委托</code>和<code>双向止盈止损委托</code></td></tr><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">pxVar</td><td style="text-align: left">String</td><td style="text-align: left">价格比例<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">pxSpread</td><td style="text-align: left">String</td><td style="text-align: left">价距<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">szLimit</td><td style="text-align: left">String</td><td style="text-align: left">单笔数量<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">挂单限制价<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">下单间隔<br>仅适用于<code>时间加权委托</code></td></tr><tr><td style="text-align: left">callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">activePx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损激活价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">moveTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损触发价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓<br><code>true</code>或<code>false</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">下单时的最新成交价</td></tr><tr><td style="text-align: left">failCode</td><td style="text-align: left">String</td><td style="text-align: left">代表策略触发失败的原因，已撤销和已生效时为""，委托失败时有值，如 51008；<br>仅适用于单向止盈止损委托、双向止盈止损委托、移动止盈止损委托、计划委托。</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损<br>仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给algoClOrdId。</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">linkedOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止盈订单信息，仅适用于止损单，且该止损订单来自包含限价止盈单的双向止盈止损订单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">isTradeBorrowMode</td><td style="text-align: left">String</td><td style="text-align: left">是否自动借币<br>true：自动借币<br>false：不自动借币<br>仅适用于计划委托、移动止盈止损和 时间加权策略</td></tr><tr><td style="text-align: left">chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值的类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### GET / 获取未完成策略委托单列表

获取当前账户下未触发的策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/orders-algo-pending`

> 请求示例

```
GET /api/v5/trade/orders-algo-pending?ordType=conditional
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询所有未触发的单向止盈止损策略订单
result = tradeAPI.order_algos_list(
    ordType="conditional"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>MARGIN</code>：杠杆</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>conditional</code>：单向止盈止损<br><code>oco</code>：双向止盈止损<br><code>chase</code>: 追逐限价委托，仅适用于交割和永续<br><code>trigger</code>：计划委托<br><code>move_order_stop</code>：移动止盈止损<br><code>twap</code>：时间加权委托<br><code>smart_iceberg</code>：冰山委托<br>支持 <code>conditional</code> 和 <code>oco</code> 同时查询，半角逗号分隔，对于其他类型，一次请求仅支持查询一个</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "activePx": "",
            "actualPx": "",
            "actualSide": "",
            "actualSz": "0",
            "algoClOrdId": "",
            "algoId": "1753184812254216192",
            "amendPxOnTriggerType": "0",
            "attachAlgoOrds": [],
            "cTime": "1724751378980",
            "callbackRatio": "",
            "callbackSpread": "",
            "ccy": "",
            "chaseType": "",
            "chaseVal": "",
            "clOrdId": "",
            "closeFraction": "",
            "failCode": "0",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "isTradeBorrowMode": "",
            "last": "62916.5",
            "lever": "",
            "linkedOrd": {
                "ordId": ""
            },
            "maxChaseType": "",
            "maxChaseVal": "",
            "moveTriggerPx": "",
            "ordId": "",
            "ordIdList": [],
            "ordPx": "",
            "ordType": "conditional",
            "posSide": "net",
            "pxLimit": "",
            "pxSpread": "",
            "pxVar": "",
            "quickMgnType": "",
            "reduceOnly": "false",
            "side": "buy",
            "slOrdPx": "",
            "slTriggerPx": "",
            "slTriggerPxType": "",
            "state": "live",
            "sz": "10",
            "szLimit": "",
            "tag": "",
            "tdMode": "cash",
            "tgtCcy": "quote_ccy",
            "timeInterval": "",
            "tpOrdPx": "-1",
            "tpTriggerPx": "10000",
            "tpTriggerPxType": "last",
            "triggerPx": "",
            "triggerPxType": "",
            "triggerTime": "",
            ”tradeQuoteCcy“: "USDT",
            "uTime": "1724751378980"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">最新一笔订单ID，即将废弃。</td></tr><tr><td style="text-align: left">ordIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">订单ID列表，当止盈止损存在市价拆单时，会有多个。 对于追逐委托（trigger+chase），该字段为空——生成的订单为策略委托，参见 <code>subAlgoIdList</code>。</td></tr><tr><td style="text-align: left">subAlgoIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">计划委托触发时生成的策略委托单 <code>algoId</code>。当 <code>advanceOrdType</code> 为 <code>chase</code> 时，在触发后存放生成的追逐委托 <code>algoId</code>，触发前为空。与 <code>ordIdList</code> 对应，后者记录生成的普通订单。</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>：交易货币<br><code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>live</code>：待生效<br><code>pause</code>：暂停生效</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值<br>仅适用于 <code>币币杠杆</code>/<code>交割</code>/<code>永续</code></td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托触发价格</td></tr><tr><td style="text-align: left">triggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">ordPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的委托价格</td></tr><tr><td style="text-align: left">advanceOrdType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托的子订单类型。<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>chase</code>：追逐限价委托<br>默认为空。</td></tr><tr><td style="text-align: left">advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">追逐参数。当 <code>advanceOrdType</code> 为 <code>chase</code> 时返回。</td></tr><tr><td style="text-align: left">&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。<code>0</code> 表示直接跟随买一价/卖一价；大于 <code>0</code> 表示距离。</td></tr><tr><td style="text-align: left">&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离值。</td></tr><tr><td style="text-align: left">actualSz</td><td style="text-align: left">String</td><td style="text-align: left">实际委托量</td></tr><tr><td style="text-align: left">actualPx</td><td style="text-align: left">String</td><td style="text-align: left">实际委托价</td></tr><tr><td style="text-align: left">actualSide</td><td style="text-align: left">String</td><td style="text-align: left">实际触发方向<br><code>tp</code>：止盈<br><code>sl</code>：止损<br>仅适用于<code>单向止盈止损委托</code>和<code>双向止盈止损委托</code></td></tr><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">pxVar</td><td style="text-align: left">String</td><td style="text-align: left">价格比例<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">pxSpread</td><td style="text-align: left">String</td><td style="text-align: left">价距<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">szLimit</td><td style="text-align: left">String</td><td style="text-align: left">单笔数量<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">挂单限制价，仅适用于<code>时间加权委托</code><br>价格上限，仅适用于<code>冰山委托</code></td></tr><tr><td style="text-align: left">lmtOrderNumber</td><td style="text-align: left">String</td><td style="text-align: left">限价拆单数量<br>仅适用于 <code>冰山委托</code></td></tr><tr><td style="text-align: left">aggressiveness</td><td style="text-align: left">String</td><td style="text-align: left">激进度<br><code>radical</code>：更快成交<br><code>mid</code>：较快成交，较优价格<br><code>conservative</code>：盘口排队<br>仅适用于 <code>冰山委托</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">触发参数<br>仅适用于 <code>冰山委托</code></td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：启动冰山委托</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：RSI指标触发</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>仅在 <code>triggerStrategy</code> 为 <code>price</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>、<code>5m</code>、<code>15m</code>、<code>30m</code>（m代表分钟）<br><code>1H</code>、<code>4H</code>（H代表小时）<br><code>1D</code>（D代表天）<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值，取值 [1,100] 的整数<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">RSI 计算周期，默认值为 <code>14</code><br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">下单间隔<br>仅适用于<code>时间加权委托</code></td></tr><tr><td style="text-align: left">callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">activePx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损激活价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">moveTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损触发价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓<br><code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">下单时的最新成交价</td></tr><tr><td style="text-align: left">failCode</td><td style="text-align: left">String</td><td style="text-align: left">代表策略触发失败的原因，委托失败时有值，如 51008，对于该接口一直为""。</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给algoClOrdId。</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">linkedOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止盈订单信息，仅适用于止损单，且该止损订单来自包含限价止盈单的双向止盈止损订单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">isTradeBorrowMode</td><td style="text-align: left">String</td><td style="text-align: left">是否自动借币<br>true：自动借币<br>false：不自动借币<br>仅适用于计划委托、移动止盈止损和 时间加权策略</td></tr><tr><td style="text-align: left">chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值的类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### GET / 获取历史策略委托单列表

获取最近3个月当前账户下所有策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/trade/orders-algo-history`

> 请求示例

```
GET /api/v5/trade/orders-algo-history?ordType=conditional&state=effective
```

```
import okx.Trade as Trade

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"

flag = "1"  # 实盘: 0, 模拟盘: 1

tradeAPI = Trade.TradeAPI(apikey, secretkey, passphrase, False, flag)

# 查询 单向止盈止损 历史订单
result = tradeAPI.order_algos_history(
    state="effective",
    ordType="conditional"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>conditional</code>：单向止盈止损<br><code>oco</code>：双向止盈止损<br><code>chase</code>: 追逐限价委托，仅适用于交割和永续<br><code>trigger</code>：计划委托<br><code>move_order_stop</code>：移动止盈止损<br><code>twap</code>：时间加权委托<br><code>smart_iceberg</code>：冰山委托<br>支持 <code>conditional</code> 和 <code>oco</code> 同时查询，半角逗号分隔，对于其他类型，一次请求仅支持查询一个</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">订单状态<br><code>effective</code>：已生效<br><code>canceled</code>：已经撤销<br><code>order_failed</code>：委托失败<br><code>state</code>和<code>algoId</code>必填且只能填其一</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>MARGIN</code>：杠杆</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "activePx": "",
            "actualPx": "",
            "actualSide": "tp",
            "actualSz": "100",
            "algoClOrdId": "",
            "algoId": "1880721064716505088",
            "amendPxOnTriggerType": "0",
            "attachAlgoOrds": [],
            "cTime": "1728552255493",
            "callbackRatio": "",
            "callbackSpread": "",
            "ccy": "",
            "chaseType": "",
            "chaseVal": "",
            "clOrdId": "",
            "closeFraction": "1",
            "failCode": "1",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "isTradeBorrowMode": "",
            "last": "60777.5",
            "lever": "10",
            "linkedOrd": {
                "ordId": ""
            },
            "maxChaseType": "",
            "maxChaseVal": "",
            "moveTriggerPx": "",
            "ordId": "1884789786215137280",
            "ordIdList": [
                "1884789786215137280"
            ],
            "ordPx": "",
            "ordType": "oco",
            "posSide": "long",
            "pxLimit": "",
            "pxSpread": "",
            "pxVar": "",
            "quickMgnType": "",
            "reduceOnly": "true",
            "side": "sell",
            "slOrdPx": "-1",
            "slTriggerPx": "57000",
            "slTriggerPxType": "mark",
            "state": "effective",
            "sz": "100",
            "szLimit": "",
            "tag": "",
            "tdMode": "isolated",
            "tgtCcy": "",
            "timeInterval": "",
            "tpOrdPx": "-1",
            "tpTriggerPx": "63000",
            "tpTriggerPxType": "last",
            "triggerPx": "",
            "triggerPxType": "",
            "triggerTime": "1728673513447",
            "tradeQuoteCcy": "",
            "uTime": "1728673513447"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">最新一笔订单ID，即将废弃。</td></tr><tr><td style="text-align: left">ordIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">订单ID列表，当止盈止损存在市价拆单时，会有多个。 对于追逐委托（trigger+chase），该字段为空——生成的订单为策略委托，参见 <code>subAlgoIdList</code>。</td></tr><tr><td style="text-align: left">subAlgoIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">计划委托触发时生成的策略委托单 <code>algoId</code>。当 <code>advanceOrdType</code> 为 <code>chase</code> 时，在触发后存放生成的追逐委托 <code>algoId</code>，触发前为空。与 <code>ordIdList</code> 对应，后者记录生成的普通订单。</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">closeFraction</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时，平仓的百分比。1 代表100%</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向</td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式</td></tr><tr><td style="text-align: left">tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>effective</code>：已生效<br><code>canceled</code>：已撤销<br><code>order_failed</code>：委托失败<br><code>partially_failed</code>：部分委托失败</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值<br>仅适用于 <code>币币杠杆</code>/<code>交割</code>/永续`</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价</td></tr><tr><td style="text-align: left">triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托触发价格</td></tr><tr><td style="text-align: left">triggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托委托价格类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">ordPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托委托价格</td></tr><tr><td style="text-align: left">advanceOrdType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托的子订单类型。<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>chase</code>：追逐限价委托<br>默认为空。</td></tr><tr><td style="text-align: left">advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">追逐参数。当 <code>advanceOrdType</code> 为 <code>chase</code> 时返回。</td></tr><tr><td style="text-align: left">&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。<code>0</code> 表示直接跟随买一价/卖一价；大于 <code>0</code> 表示距离。</td></tr><tr><td style="text-align: left">&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离值。</td></tr><tr><td style="text-align: left">actualSz</td><td style="text-align: left">String</td><td style="text-align: left">实际委托量</td></tr><tr><td style="text-align: left">actualPx</td><td style="text-align: left">String</td><td style="text-align: left">实际委托价</td></tr><tr><td style="text-align: left">actualSide</td><td style="text-align: left">String</td><td style="text-align: left">实际触发方向<br><code>tp</code>：止盈<br><code>sl</code>：止损<br>仅适用于<code>单向止盈止损委托</code>和<code>双向止盈止损委托</code></td></tr><tr><td style="text-align: left">triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">pxVar</td><td style="text-align: left">String</td><td style="text-align: left">价格比例<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">pxSpread</td><td style="text-align: left">String</td><td style="text-align: left">价距<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">szLimit</td><td style="text-align: left">String</td><td style="text-align: left">单笔数量<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">挂单限制价<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">lmtOrderNumber</td><td style="text-align: left">String</td><td style="text-align: left">限价拆单数量<br>仅适用于<code>冰山委托</code></td></tr><tr><td style="text-align: left">aggressiveness</td><td style="text-align: left">String</td><td style="text-align: left">激进度<br><code>radical</code>：更快成交<br><code>mid</code>：较快成交，较优价格<br><code>conservative</code>：盘口排队<br>仅适用于<code>冰山委托</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">触发参数<br>仅适用于<code>冰山委托</code></td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：启动冰山委托</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：RSI指标触发</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>仅在 <code>triggerStrategy</code> 为 <code>price</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>、<code>5m</code>、<code>15m</code>、<code>30m</code>（m代表分钟）<br><code>1H</code>、<code>4H</code>（H代表小时）<br><code>1D</code>（D代表天）<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值，取值 [1,100] 的整数<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">RSI 计算周期，默认值为 <code>14</code><br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">下单间隔<br>仅适用于<code>时间加权委托</code></td></tr><tr><td style="text-align: left">callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">activePx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损激活价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">moveTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损触发价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓<br><code>true</code>或<code>false</code></td></tr><tr><td style="text-align: left">quickMgnType</td><td style="text-align: left">String</td><td style="text-align: left"><del>一键借币类型，仅适用于杠杆逐仓的一键借币模式<br><code>manual</code>：手动，<code>auto_borrow</code>：自动借币，<code>auto_repay</code>：自动还币</del>（已弃用）</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">下单时的最新成交价</td></tr><tr><td style="text-align: left">failCode</td><td style="text-align: left">String</td><td style="text-align: left">代表策略触发失败的原因，已撤销和已生效时为""，委托失败时有值，如 51008；<br>仅适用于单向止盈止损委托、双向止盈止损委托、移动止盈止损委托、计划委托。</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给algoClOrdId。</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">linkedOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止盈订单信息，仅适用于止损单，且该止损订单来自包含限价止盈单的双向止盈止损订单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">isTradeBorrowMode</td><td style="text-align: left">String</td><td style="text-align: left">是否自动借币<br>true：自动借币<br>false：不自动借币<br>仅适用于计划委托、移动止盈止损和 时间加权策略</td></tr><tr><td style="text-align: left">chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值的类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### WS / 策略委托订单频道

获取策略委托订单，首次订阅不推送，只有当下单、撤单等事件触发时，推送数据

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD",
        "instId": "BTC-USD-200329"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD",
        "instId": "BTC-USD-200329"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>orders-algo</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例：单个

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD",
        "instId": "BTC-USD-200329"
    },
    "connId": "a4d3ae55"
}
```

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "orders-algo",
        "instType": "FUTURES",
        "instFamily": "BTC-USD"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"orders-algo\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg": {
        "channel": "orders-algo",
        "uid": "77982378738415879",
        "instType": "FUTURES",
        "instId": "BTC-USD-200329"
    },
    "data": [{
        "actualPx": "0",
        "actualSide": "",
        "actualSz": "0",
        "algoClOrdId": "",
        "algoId": "581878926302093312",
        "attachAlgoOrds": [],
        "amendResult": "",
        "cTime": "1685002746818",
        "uTime": "1708679675245",
        "ccy": "",
        "clOrdId": "",
        "closeFraction": "",
        "failCode": "",
        "instId": "BTC-USDC",
        "instType": "SPOT",
        "last": "26174.8",
        "lever": "0",
        "notionalUsd": "11.0",
        "ordId": "",
        "ordIdList": [],
        "ordPx": "",
        "ordType": "conditional",
        "posSide": "",
        "quickMgnType": "",
        "reduceOnly": "false",
        "reqId": "",
        "side": "buy",
        "slOrdPx": "",
        "slTriggerPx": "",
        "slTriggerPxType": "",
        "state": "live",
        "sz": "11",
        "tag": "",
        "tdMode": "cross",
        "tgtCcy": "quote_ccy",
        "tpOrdPx": "-1",
        "tpTriggerPx": "1",
        "tpTriggerPxType": "last",
        "triggerPx": "",
        "triggerTime": "",
        "tradeQuoteCcy": "USDC",
        "amendPxOnTriggerType": "0",
        "linkedOrd":{
            "ordId":"98192973880283"
        },
        "isTradeBorrowMode": ""
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单以及交割、永续和期权合约订单。</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">最新一笔订单ID，与策略委托订单关联的订单ID，即将废弃。</td></tr><tr><td style="text-align: left">&gt; ordIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">订单ID列表，当止盈止损存在市价拆单时，会有多个。 对于追逐委托（trigger+chase），该字段为空——参见 <code>subAlgoIdList</code>。</td></tr><tr><td style="text-align: left">&gt; subAlgoIdList</td><td style="text-align: left">Array of strings</td><td style="text-align: left">计划委托触发时生成的策略委托单 <code>algoId</code>。当 <code>advanceOrdType</code> 为 <code>chase</code> 时，在触发后存放生成的追逐委托 <code>algoId</code>，触发前为空。与 <code>ordIdList</code> 对应，后者记录生成的普通订单。</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量，<code>币币/币币杠杆</code> 以币为单位；<code>交割</code>/<code>永续</code>/<code>期权</code> 以张为单位</td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">订单类型<br><code>conditional</code>：单向止盈止损<br><code>oco</code>：双向止盈止损<br><code>trigger</code>：计划委托<br><code>chase</code>：追逐限价委托</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式 <code>cross</code>：全仓 <code>isolated</code>：逐仓<br>非保证金模式 <code>cash</code>：现金</td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>：交易货币<br><code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>live</code>：待生效<br><code>effective</code>：已生效<br><code>canceled</code>：已撤销<br><code>order_failed</code>：委托失败<br><code>partially_failed</code>：部分委托失败<br><code>partially_effective</code>: 部分生效</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的触发价格</td></tr><tr><td style="text-align: left">&gt; triggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt; ordPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的委托价格</td></tr><tr><td style="text-align: left">&gt; advanceOrdType</td><td style="text-align: left">String</td><td style="text-align: left">计划委托的子订单类型。<br><code>fok</code>：全部成交或立即取消<br><code>ioc</code>：立即成交并取消剩余<br><code>chase</code>：追逐限价委托<br>默认为空。</td></tr><tr><td style="text-align: left">&gt; advChaseParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">追逐参数。当 <code>advanceOrdType</code> 为 <code>chase</code> 时返回。</td></tr><tr><td style="text-align: left">&gt;&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。<code>0</code> 表示直接跟随买一价/卖一价；大于 <code>0</code> 表示距离。</td></tr><tr><td style="text-align: left">&gt;&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离单位。<code>distance</code> 或 <code>ratio</code>。</td></tr><tr><td style="text-align: left">&gt;&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐距离值。</td></tr><tr><td style="text-align: left">&gt; last</td><td style="text-align: left">String</td><td style="text-align: left">下单时的最新成交价</td></tr><tr><td style="text-align: left">&gt; actualSz</td><td style="text-align: left">String</td><td style="text-align: left">实际委托量</td></tr><tr><td style="text-align: left">&gt; actualPx</td><td style="text-align: left">String</td><td style="text-align: left">实际委价</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">委托单预估美元价值</td></tr><tr><td style="text-align: left">&gt; actualSide</td><td style="text-align: left">String</td><td style="text-align: left">实际触发方向<br><code>sl</code>：止损<br><code>tp</code>：止盈<br>仅适用于<code>单向止盈止损委托</code>和<code>双向止盈止损委托</code></td></tr><tr><td style="text-align: left">&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">代表策略触发失败的原因，已撤销和已生效时为""，委托失败时有值，如 51008；<br>仅适用于单向止盈止损委托、双向止盈止损委托、移动止盈止损委托、计划委托。</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">&gt; reqId</td><td style="text-align: left">String</td><td style="text-align: left">修改订单时使用的request ID，如果没有修改，该字段为""</td></tr><tr><td style="text-align: left">&gt; amendResult</td><td style="text-align: left">String</td><td style="text-align: left">修改订单的结果<br><code>-1</code>：失败<br><code>0</code>：成功</td></tr><tr><td style="text-align: left">&gt; amendPxOnTriggerType</td><td style="text-align: left">String</td><td style="text-align: left">是否启用开仓价止损，仅适用于分批止盈的止损订单<br><code>0</code>：不开启，默认值<br><code>1</code>：开启</td></tr><tr><td style="text-align: left">&gt; attachAlgoOrds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">附带止盈止损或移动止盈止损订单信息<br>适用于<code>合约模式/跨币种保证金模式/组合保证金模式</code></td></tr><tr><td style="text-align: left">&gt;&gt; attachAlgoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">下单附带止盈止损或移动止盈止损时，客户自定义的策略订单ID，字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。<br>订单完全成交，下附带策略委托单时，该值会传给algoClOrdId。</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价，如果填写此参数，必须填写<code>止盈委托价</code></td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt;&gt; tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，如果填写此参数，必须填写<code>止盈触发价</code><br>委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价，如果填写此参数，必须填写<code>止损委托价</code></td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损触发比例，0.3 代表 30%<br>仅适用于<code>交割</code>/<code>永续</code>合约</td></tr><tr><td style="text-align: left">&gt;&gt; slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格</td></tr><tr><td style="text-align: left">&gt;&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，如果填写此参数，必须填写<code>止损触发价</code><br>委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt;&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例，如 <code>0.05</code> 代表 5%</td></tr><tr><td style="text-align: left">&gt;&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距</td></tr><tr><td style="text-align: left">&gt;&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">激活价格</td></tr><tr><td style="text-align: left">&gt; linkedOrd</td><td style="text-align: left">Object</td><td style="text-align: left">止盈订单信息，仅适用于止损单，且该止损订单来自包含限价止盈单的双向止盈止损订单</td></tr><tr><td style="text-align: left">&gt;&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单 ID</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix时间戳的毫秒数格式，如 1597026383085</td></tr><tr><td style="text-align: left">&gt; isTradeBorrowMode</td><td style="text-align: left">String</td><td style="text-align: left">是否自动借币<br>true：自动借币<br>false：不自动借币<br>仅适用于计划委托、移动止盈止损和 时间加权策略</td></tr><tr><td style="text-align: left">&gt; chaseType</td><td style="text-align: left">String</td><td style="text-align: left">追逐类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">&gt; chaseVal</td><td style="text-align: left">String</td><td style="text-align: left">追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">&gt; maxChaseType</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值的类型。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">&gt; maxChaseVal</td><td style="text-align: left">String</td><td style="text-align: left">最大追逐值。仅适用于<code>追逐限价委托</code>。</td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### WS / 高级策略委托订单频道

获取高级策略委托订单（冰山、时间加权、移动止盈止损），首次订阅推送，当下单、撤单等事件触发时，推送数据

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例：单个

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "algo-advance",
        "instType": "SPOT",
        "instId": "BTC-USDT"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [
        {
          "channel": "algo-advance",
          "instType": "SPOT",
          "instId": "BTC-USDT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "algo-advance",
        "instType": "SPOT",
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()

    args = [{
        "channel": "algo-advance",
        "instType": "SPOT",
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>algo-advance</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例：单个

```
{
    "event": "subscribe",
    "arg": {
        "channel": "algo-advance",
        "instType": "SPOT",
        "instId": "BTC-USDT"
    },
    "connId": "a4d3ae55"
}
```

> 成功返回示例

```
{
    "event": "subscribe",
    "arg": {
        "channel": "algo-advance",
        "instType": "SPOT"
    },
    "connId": "a4d3ae55"
}
```

> 失败返回示例

```
{
    "event": "error",
    "code": "60012",
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"algo-advance\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：币币杠杆<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例：单个

```
{
    "arg":{
        "channel":"algo-advance",
        "uid": "77982378738415879",
        "instType":"SPOT",
        "instId":"BTC-USDT"
    },
    "data":[
        {
            "actualPx":"",
            "actualSide":"",
            "actualSz":"0",
            "algoId":"355056228680335360",
            "cTime":"1630924001545",
            "ccy":"",
            "clOrdId": "",
            "count":"1",
            "instId":"BTC-USDT",
            "instType":"SPOT",
            "lever":"0",
            "notionalUsd":"",
            "ordPx":"",
            "ordType":"iceberg",
            "pTime":"1630924295204",
            "posSide":"net",
            "pxLimit":"10",
            "pxSpread":"1",
            "pxVar":"",
            "side":"buy",
            "slOrdPx":"",
            "slTriggerPx":"",
            "state":"pause",
            "sz":"0.1",
            "szLimit":"0.1",
            "tag": "adadadadad",
            "tdMode":"cash",
            "timeInterval":"",
            "tpOrdPx":"",
            "tpTriggerPx":"",
            "triggerPx":"",
            "triggerTime":"",
            "tradeQuoteCcy": "USDT",
            "callbackRatio":"",
            "callbackSpread":"",
            "activePx":"",
            "moveTriggerPx":"",
            "failCode": "",
            "algoClOrdId": "",
            "reduceOnly": "",
            "isTradeBorrowMode": true
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种，适用于<code>逐仓杠杆</code>及<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID，与策略委托订单关联的订单ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略委托单ID</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">委托数量，<code>币币/币币杠杆</code> 以币为单位；<code>交割</code>/<code>永续</code>/<code>期权</code> 以张为单位</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">交易模式<br>保证金模式 <code>cross</code>：全仓 <code>isolated</code>：逐仓<br>非保证金模式 <code>cash</code>：现金</td></tr><tr><td style="text-align: left">&gt; tgtCcy</td><td style="text-align: left">String</td><td style="text-align: left">币币市价单委托数量<code>sz</code>的单位<br><code>base_ccy</code>: 交易货币 ；<code>quote_ccy</code>：计价货币<br>仅适用于<code>币币</code>市价订单<br>默认买单为<code>quote_ccy</code>，卖单为<code>base_ccy</code></td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数，0.01到125之间的数值，仅适用于 <code>币币杠杆/交割/永续</code></td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>live</code>：待生效<br><code>effective</code>：已生效<br><code>partially_effective</code>：部分生效<br><code>canceled</code>：已撤销<br><code>order_failed</code>：委托失败<br><code>pause</code>: 暂停生效</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，委托价格为<code>-1</code>时，执行市价止盈</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价委托价格为<code>-1</code>时，执行市价止损</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的触发价格</td></tr><tr><td style="text-align: left">&gt; ordPx</td><td style="text-align: left">String</td><td style="text-align: left">计划委托单的委托价格</td></tr><tr><td style="text-align: left">&gt; actualSz</td><td style="text-align: left">String</td><td style="text-align: left">实际委托量</td></tr><tr><td style="text-align: left">&gt; actualPx</td><td style="text-align: left">String</td><td style="text-align: left">实际委价</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">委托单预估美元价值</td></tr><tr><td style="text-align: left">&gt; actualSide</td><td style="text-align: left">String</td><td style="text-align: left">实际触发方向，<code>sl</code>：止损 <code>tp</code>：止盈</td></tr><tr><td style="text-align: left">&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">策略委托触发时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; pxVar</td><td style="text-align: left">String</td><td style="text-align: left">价格比例<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; pxSpread</td><td style="text-align: left">String</td><td style="text-align: left">价距<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; szLimit</td><td style="text-align: left">String</td><td style="text-align: left">单笔数量<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; pxLimit</td><td style="text-align: left">String</td><td style="text-align: left">挂单限制价<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; timeInterval</td><td style="text-align: left">String</td><td style="text-align: left">下单间隔<br>仅适用于<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; count</td><td style="text-align: left">String</td><td style="text-align: left">策略订单计数<br>仅适用于<code>冰山委托</code>和<code>时间加权委托</code></td></tr><tr><td style="text-align: left">&gt; callbackRatio</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的比例<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">&gt; callbackSpread</td><td style="text-align: left">String</td><td style="text-align: left">回调幅度的价距<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">&gt; activePx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损激活价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">&gt; failCode</td><td style="text-align: left">String</td><td style="text-align: left">代表策略触发失败的原因，已撤销和已生效时为""，委托失败时有值，如 51008；<br>仅适用于单向止盈止损委托、双向止盈止损委托、移动止盈止损委托、计划委托。</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略订单ID</td></tr><tr><td style="text-align: left">&gt; moveTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">移动止盈止损触发价格<br>仅适用于<code>移动止盈止损</code></td></tr><tr><td style="text-align: left">&gt; reduceOnly</td><td style="text-align: left">String</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">订单信息的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; isTradeBorrowMode</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否自动借币<br>true：自动借币<br>false：不自动借币<br>仅适用于计划委托、移动止盈止损和 时间加权策略</td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

## 网格交易

网格是一种在指定价格区间自动进行低买高卖的交易策略。用户设定参数后，系统分割小网格自动挂单，随着市场波动，策略低买高卖赚取波段收益。  
`网格交易`功能模块下的API接口需要身份验证。

### POST / 网格策略委托下单

#### 限速：20次/2s

#### 限速规则：User ID + Instrument ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/order-algo`

> 请求示例

```
# 现货网格下单
POST /api/v5/tradingBot/grid/order-algo
body
{
    "instId": "BTC-USDT",
    "algoOrdType": "grid",
    "maxPx": "5000",
    "minPx": "400",
    "gridNum": "10",
    "runType": "1",
    "quoteSz": "25",
    "triggerParams":[
      {
         "triggerAction":"stop",
         "triggerStrategy":"price",  
         "triggerPx":"1000"
      }
    ]
}

# 合约网格下单
POST /api/v5/tradingBot/grid/order-algo
body
{
    "instId": "BTC-USDT-SWAP",
    "algoOrdType": "contract_grid",
    "maxPx": "5000",
    "minPx": "400",
    "gridNum": "10",
    "runType": "1",
    "sz": "200", 
    "direction": "long",
    "lever": "2",
    "triggerParams":[
      {
         "triggerAction":"start", 
         "triggerStrategy":"rsi", 
         "timeframe":"30m",
         "thold":"10",
         "triggerCond":"cross",
         "timePeriod":"14"
      },
      {
         "triggerAction":"stop",
         "triggerStrategy":"price",
         "triggerPx":"1000",
         "stopType":"2"
      }
   ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比<br>默认为等差</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价<br>适用于<code>现货网格</code>/<code>合约网格</code></td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价<br>适用于<code>现货网格</code>/<code>合约网格</code></td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用户自定义策略ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">带单员分润比例，仅支持固定比例分润<br><code>0</code>,<code>0.1</code>,<code>0.2</code>,<code>0.3</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">信号触发参数<br>适用于<code>现货网格</code>/<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发<br>默认为<code>instant</code></td></tr><tr><td style="text-align: left">&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">延迟触发时间，单位为秒，默认为<code>0</code></td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr></tbody></table>

现货网格

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">计价币投入数量<br><code>quoteSz</code>和<code>baseSz</code>至少指定一个</td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易币投入数量<br><code>quoteSz</code>和<code>baseSz</code>至少指定一个</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">No</td><td style="text-align: left">用于交易的计价币种。仅适用于现货网格。<br>默认值为 instId 的计价币种，例如 BTC-USD 的计价币种为 USD。</td></tr></tbody></table>

合约网格

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投入保证金,单位为<code>USDT</code></td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否开底仓<br>默认为<code>false</code><br>中性合约网格忽略该参数</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈比率，0.1 代表 10%</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损比率，0.1 代表 10%</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "447053782921515008",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 修改网格策略基本参数

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/amend-algo-basic-param`

> 请求示例

```
POST /api/v5/tradingBot/grid/amend-algo-basic-param
body
    {
        "algoId":"448965992920907776",
        "maxPx": "100",
        "minPx": "10",
        "gridNum": "5"
        "topupAmount": "123.45"
    }
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最小价格</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最大价格</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格数</td></tr><tr><td style="text-align: left">topupAmount</td><td style="text-align: left">String</td><td style="text-align: left">不是</td><td style="text-align: left">仅限合约网格。可选填写用户自行提供的追加投资金额。若未填写，或明确填写为“0”，在编辑网格参数时，所需的追加投资金额将默认自动追加。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "55186",
    "msg": "Due to market fluctuations, your investment amount is too large to apply these modifications.",
    "data": [
        {
            "algoId": "4283223775520665600",
            "maxTopupAmount": "12456.78",
            "requiredTopupAmount": "12.34"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">requiredTopupAmount</td><td style="text-align: left">String</td><td style="text-align: left">修改网格参数所需补充金额</td></tr><tr><td style="text-align: left">maxTopupAmount</td><td style="text-align: left">String</td><td style="text-align: left">仅限合约网格。编辑网格参数时的最大追加投资金额。</td></tr></tbody></table>

#### 报错码

<table><thead><tr><th style="text-align: left"><strong>报错码</strong></th><th style="text-align: left"><strong>HTTP Status 代码</strong></th><th style="text-align: left"><strong>报错文案</strong></th></tr></thead><tbody><tr><td style="text-align: left">51000</td><td style="text-align: left">400</td><td style="text-align: left">{param} 参数错误。</td></tr><tr><td style="text-align: left">51346</td><td style="text-align: left">400</td><td style="text-align: left">最高价格应高于最低价格。</td></tr><tr><td style="text-align: left">55123</td><td style="text-align: left">400</td><td style="text-align: left">您的交易账户余额不足，无法使此修改生效。请您向交易账户转入资金后再试。</td></tr><tr><td style="text-align: left">55124</td><td style="text-align: left">200</td><td style="text-align: left">由于行情波动，您的投入金额不足，修改后的参数无法生效。</td></tr><tr><td style="text-align: left">55186</td><td style="text-align: left">200</td><td style="text-align: left">由于行情波动，您的投入金额过大，修改后的参数无法生效。</td></tr></tbody></table>

### POST / 修改网格策略订单

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/amend-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/grid/amend-order-algo
body
{
    "algoId":"448965992920907776",
    "instId":"BTC-USDT-SWAP",
    "slTriggerPx":"1200",
    "tpTriggerPx":""
}

POST /api/v5/tradingBot/grid/amend-order-algo
body 
{
   "algoId":"578963447615062016",
   "instId":"BTC-USDT",
   "triggerParams":[
       {
           "triggerAction":"stop",  
           "triggerStrategy":"price",   
           "triggerPx":"1000"
       }
   ]
}

POST /api/v5/tradingBot/grid/amend-order-algo
body 
{
   "algoId":"578963447615062016",
   "instId":"BTC-USDT-SWAP",
   "triggerParams":[
       {
           "triggerAction":"stop",  
           "triggerStrategy":"instant",   
           "stopType":"1"
       }
   ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的止损触发价<br>当值为""则代表取消止损触发价<br><code>slTriggerPx</code>、<code>tpTriggerPx</code>至少要传一个值</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">新的止盈触发价<br>当值为""则代表取消止盈触发价</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈比率，0.1 代表 10%，仅适用于合约网格<br>当值为""则代表取消止盈比率</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损比率，0.1 代表 10%，仅适用于合约网格<br>当值为""则代表取消止损比率</td></tr><tr><td style="text-align: left">topUpAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">增加的投资额，仅适用于现货网格</td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "448965992920907776",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 网格策略停止

每次最多可以撤销10个网格策略。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/stop-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/grid/stop-order-algo
body
[
    {
        "algoId":"448965992920907776",
        "instId":"BTC-USDT",
        "stopType":"1",
        "algoOrdType":"grid"
    }
]
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">stopType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格策略停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：市价全平 <code>2</code>：停止不平仓</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "448965992920907776",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 合约网格平仓

只有处于已停止未平仓状态合约网格可使用该接口

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/close-position`

> 请求示例

```
POST /api/v5/tradingBot/grid/close-position
body
{
    "algoId":"448965992920907776",
    "mktClose":true
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">mktClose</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否市价全平<br><code>true</code>：市价全平，<code>false</code>：部分平仓</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">平仓数量,单位为张<br>部分平仓时必传</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">平仓价格<br>部分平仓时必传</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoClOrdId": "",
            "algoId":"448965992920907776",
            "ordId":"",
            "tag": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">平仓单ID<br>市价全平时，该字段为""</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 撤销合约网格平仓单

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/cancel-close-order`

> 请求示例

```
POST /api/v5/tradingBot/grid/cancel-close-order
body
{
    "algoId":"448965992920907776",
    "ordId":"570627699870375936"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">平仓单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoClOrdId": "",
            "algoId": "448965992920907776",
            "ordId": "570627699870375936",
            "tag": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">平仓单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 网格策略立即触发

#### 限速：20次/2s

#### 限速规则：User ID + Instrument ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/order-instant-trigger`

> 请求示例

```
POST /api/v5/tradingBot/grid/order-instant-trigger
body
{
    "algoId":"561564133246894080"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">topUpAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">增加的投资额，仅适用于现货网格</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "561564133246894080"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr></tbody></table>

### GET / 获取未完成网格策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/grid/orders-algo-pending`

> 请求示例

```
GET /api/v5/tradingBot/grid/orders-algo-pending?algoOrdType=grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：杠杆<br><code>FUTURES</code>：交割合约<br><code>SWAP</code>：永续合约</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "actualLever": "",
            "algoClOrdId": "",
            "algoId": "56802********64032",
            "algoOrdType": "grid",
            "arbitrageNum": "0",
            "availEq": "",
            "basePos": false,
            "baseSz": "0",
            "cTime": "1681700496249",
            "cancelType": "0",
            "direction": "",
            "floatProfit": "0",
            "gridNum": "10",
            "gridProfit": "0",
            "instFamily": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "investment": "25",
            "lever": "",
            "liqPx": "",
            "maxPx": "5000",
            "minPx": "400",
            "ordFrozen": "",
            "pnlRatio": "0",
            "quoteSz": "25",
            "rebateTrans": [
                {
                    "rebate": "0",
                    "rebateCcy": "BTC"
                },
                {
                    "rebate": "0",
                    "rebateCcy": "USDT"
                }
            ],
            "runType": "1",
            "slTriggerPx": "",
            "state": "running",
            "stopType": "",
            "sz": "",
            "tag": "",
            "totalPnl": "0",
            "tpTriggerPx": "",
            "triggerParams": [
                {
                    "triggerAction": "start",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "triggerType": "auto",
                    "triggerTime": ""
                },
                {
                    "triggerAction": "stop",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "stopType": "1",
                    "triggerPx": "1000",
                    "triggerType": "manual",
                    "triggerTime": ""
                }
            ],
            "uTime": "1682062564350",
            "uly": "BTC-USDT",
            "profitSharingRatio": "",
            "copyType": "0",
            "fee": "",
            "feeCcy": "",
            "fundingFee": "",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>pending_signal</code>：等待触发<br><code>no_close_position</code>：已停止未平仓（仅适用于合约网格）</td></tr><tr><td style="text-align: left">rebateTrans</td><td style="text-align: left">Array of objects</td><td style="text-align: left">返佣划转信息</td></tr><tr><td style="text-align: left">&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣数量</td></tr><tr><td style="text-align: left">&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种</td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">延迟触发时间，单位为秒</td></tr><tr><td style="text-align: left">&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction实际触发时间，Unix时间戳的毫秒数格式, 如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; triggerType</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction的实际触发类型<br><code>manual</code>：手动触发<br><code>auto</code>: 自动触发</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">arbitrageNum</td><td style="text-align: left">String</td><td style="text-align: left">网格套利次数</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">investment</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额<br>现货网格如果投入了交易币则折算为计价币</td></tr><tr><td style="text-align: left">gridProfit</td><td style="text-align: left">String</td><td style="text-align: left">网格利润</td></tr><tr><td style="text-align: left">floatProfit</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止<br><code>6</code>: 信号停止</td></tr><tr><td style="text-align: left">stopType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略实际停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓</td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">计价币投入数量<br>适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">交易币投入数量<br>适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否开底仓<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">投入保证金，单位为<code>USDT</code><br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">actualLever</td><td style="text-align: left">String</td><td style="text-align: left">实际杠杆倍数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价格<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code><br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">ordFrozen</td><td style="text-align: left">String</td><td style="text-align: left">挂单占用<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">availEq</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例<br>取值范围[0,0.3]<br>如果是普通订单（既不是带单也不是跟单），该字段返回""</td></tr><tr><td style="text-align: left">copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费货币。仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### GET / 获取历史网格策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/grid/orders-algo-history`

> 请求示例

```
GET /api/v5/tradingBot/grid/orders-algo-history?algoOrdType=grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>MARGIN</code>：杠杆<br><code>FUTURES</code>：交割合约<br><code>SWAP</code>：永续合约</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "actualLever": "",
            "algoClOrdId": "",
            "algoId": "565849588675117056",
            "algoOrdType": "grid",
            "arbitrageNum": "0",
            "availEq": "",
            "basePos": false,
            "baseSz": "0",
            "cTime": "1681181054927",
            "cancelType": "1",
            "direction": "",
            "floatProfit": "0",
            "gridNum": "10",
            "gridProfit": "0",
            "instFamily": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "investment": "25",
            "lever": "0",
            "liqPx": "",
            "maxPx": "5000",
            "minPx": "400",
            "ordFrozen": "",
            "pnlRatio": "0",
            "quoteSz": "25",
            "rebateTrans": [
                {
                    "rebate": "0",
                    "rebateCcy": "BTC"
                },
                {
                    "rebate": "0",
                    "rebateCcy": "USDT"
                }
            ],
            "runType": "1",
            "slTriggerPx": "0",
            "state": "stopped",
            "stopResult": "0",
            "stopType": "1",
            "sz": "",
            "tag": "",
            "totalPnl": "0",
            "tpTriggerPx": "0",
            "triggerParams": [
                {
                    "triggerAction": "start",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "triggerType": "auto",
                    "triggerTime": ""
                },
                {
                    "triggerAction": "stop",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "stopType": "1",
                    "triggerPx": "1000",
                    "triggerType": "manual",
                    "triggerTime": "1681181186484"
                }
            ],
            "uTime": "1681181186496",
            "uly": "BTC-USDT",
            "profitSharingRatio": "",
            "copyType": "0",
            "fee": "",
            "feeCcy": "",
            "fundingFee": "",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">rebateTrans</td><td style="text-align: left">Array of objects</td><td style="text-align: left">返佣划转信息</td></tr><tr><td style="text-align: left">&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣数量</td></tr><tr><td style="text-align: left">&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种</td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">延迟触发时间，单位为秒</td></tr><tr><td style="text-align: left">&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction实际触发时间，Unix时间戳的毫秒数格式, 如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; triggerType</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction的实际触发类型<br><code>manual</code>：手动触发<br><code>auto</code>: 自动触发</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">arbitrageNum</td><td style="text-align: left">String</td><td style="text-align: left">网格套利次数</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">investment</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额<br>现货网格如果投入了交易币则折算为计价币</td></tr><tr><td style="text-align: left">gridProfit</td><td style="text-align: left">String</td><td style="text-align: left">网格利润</td></tr><tr><td style="text-align: left">floatProfit</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止<br><code>6</code>: 信号停止</td></tr><tr><td style="text-align: left">stopType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略实际停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓</td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">计价币投入数量<br>适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">交易币投入数量<br>适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否开底仓<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">投入保证金，单位为<code>USDT</code><br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">actualLever</td><td style="text-align: left">String</td><td style="text-align: left">实际杠杆倍数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价格<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code><br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">ordFrozen</td><td style="text-align: left">String</td><td style="text-align: left">挂单占用<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">availEq</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例<br>取值范围[0,0.3]<br>如果是普通订单（既不是带单也不是跟单），该字段返回""</td></tr><tr><td style="text-align: left">copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费货币。仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">stopResult</td><td style="text-align: left">String</td><td style="text-align: left">策略停止结果<br><code>0</code>：默认，<code>1</code>：市价卖币成功 <code>-1</code>：市价卖币失败<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### GET / 获取网格策略委托订单详情

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/grid/orders-algo-details`

> 请求示例

```
GET /api/v5/tradingBot/grid/orders-algo-details?algoId=448965992920907776&algoOrdType=grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "actualLever": "",
            "activeOrdNum": "0",
            "algoClOrdId": "",
            "algoId": "448965992920907776",
            "algoOrdType": "grid",
            "annualizedRate": "0",
            "arbitrageNum": "0",
            "availEq": "",
            "basePos": false,
            "baseSz": "0",
            "cTime": "1681181054927",
            "cancelType": "1",
            "curBaseSz": "0",
            "curQuoteSz": "0",
            "direction": "",
            "eq": "",
            "floatProfit": "0",
            "gridNum": "10",
            "gridProfit": "0",
            "instFamily": "",
            "instId": "BTC-USDT",
            "instType": "SPOT",
            "investment": "25",
            "lever": "0",
            "liqPx": "",
            "maxPx": "5000",
            "minPx": "400",
            "ordFrozen": "",
            "perMaxProfitRate": "1.14570215",
            "perMinProfitRate": "0.0991200440528634356837",
            "pnlRatio": "0",
            "profit": "0.00000000",
            "quoteSz": "25",
            "rebateTrans": [
                {
                    "rebate": "0",
                    "rebateCcy": "BTC"
                },
                {
                    "rebate": "0",
                    "rebateCcy": "USDT"
                }
            ],
            "runType": "1",
            "runPx": "30089.7",
            "singleAmt": "0.00101214",
            "slTriggerPx": "0",
            "state": "stopped",
            "stopResult": "0",
            "stopType": "1",
            "sz": "",
            "tag": "",
            "totalAnnualizedRate": "0",
            "totalPnl": "0",
            "tpTriggerPx": "0",
            "tradeNum": "0",
            "triggerParams": [
                {
                    "triggerAction": "start",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "triggerType": "auto",
                    "triggerTime": ""
                },
                {
                    "triggerAction": "stop",
                    "delaySeconds": "0",
                    "triggerStrategy": "instant",
                    "stopType": "1",
                    "triggerType": "manual",
                    "triggerTime": "1681181186484"
                }
            ],
            "uTime": "1681181186496",
            "uly": "",
            "profitSharingRatio": "",
            "copyType": "0",
            "tpRatio": "",
            "slRatio": "",
            "fee": "",
            "feeCcy": "",
            "fundingFee": "",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>no_close_position</code>：已停止未平仓（仅适用于合约网格）<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">rebateTrans</td><td style="text-align: left">Array of objects</td><td style="text-align: left">返佣划转信息</td></tr><tr><td style="text-align: left">&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣数量</td></tr><tr><td style="text-align: left">&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种</td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">延迟触发时间，单位为秒</td></tr><tr><td style="text-align: left">&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction实际触发时间，Unix时间戳的毫秒数格式, 如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; triggerType</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction的实际触发类型<br><code>manual</code>：手动触发<br><code>auto</code>: 自动触发</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">tradeNum</td><td style="text-align: left">String</td><td style="text-align: left">挂单成交次数</td></tr><tr><td style="text-align: left">arbitrageNum</td><td style="text-align: left">String</td><td style="text-align: left">网格套利次数</td></tr><tr><td style="text-align: left">singleAmt</td><td style="text-align: left">String</td><td style="text-align: left">单网格买卖量</td></tr><tr><td style="text-align: left">perMinProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最低利润率</td></tr><tr><td style="text-align: left">perMaxProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最高利润率</td></tr><tr><td style="text-align: left">runPx</td><td style="text-align: left">String</td><td style="text-align: left">启动时价格</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">investment</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额<br>现货网格如果投入了交易币则折算为计价币</td></tr><tr><td style="text-align: left">gridProfit</td><td style="text-align: left">String</td><td style="text-align: left">网格利润</td></tr><tr><td style="text-align: left">floatProfit</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">totalAnnualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">annualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">网格年化</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止<br><code>6</code>: 信号停止</td></tr><tr><td style="text-align: left">stopType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：市价全平，<code>2</code>：停止不平仓</td></tr><tr><td style="text-align: left">activeOrdNum</td><td style="text-align: left">String</td><td style="text-align: left">子订单挂单数量</td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">计价币投入数量<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">交易币投入数量<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">curQuoteSz</td><td style="text-align: left">String</td><td style="text-align: left">当前持有的计价币资产<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">curBaseSz</td><td style="text-align: left">String</td><td style="text-align: left">当前持有的交易币资产<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">profit</td><td style="text-align: left">String</td><td style="text-align: left">当前可提取利润,单位是计价币<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">stopResult</td><td style="text-align: left">String</td><td style="text-align: left">策略停止结果<br><code>0</code>：默认，<code>1</code>：市价卖币成功 <code>-1</code>：市价卖币失败<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否开底仓<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">投入保证金，单位为<code>USDT</code><br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">actualLever</td><td style="text-align: left">String</td><td style="text-align: left">实际杠杆倍数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价格<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code><br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">ordFrozen</td><td style="text-align: left">String</td><td style="text-align: left">挂单占用<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">availEq</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">eq</td><td style="text-align: left">String</td><td style="text-align: left">策略账户总权益<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例<br>取值范围[0,0.3]<br>如果是普通订单（既不是带单也不是跟单），该字段返回""</td></tr><tr><td style="text-align: left">copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈比率，0.1 代表 10%</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损比率，0.1 代表 10%</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费货币。仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### GET / 获取网格策略委托子订单信息

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/grid/sub-orders`

> 请求示例

```
GET /api/v5/tradingBot/grid/sub-orders?algoId=123456&type=live&algoOrdType=grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">子订单状态<br><code>live</code>：未成交<br><code>filled</code>：已成交</td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">组ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0",
            "algoClOrdId": "",
            "algoId": "448965992920907776",
            "algoOrdType": "grid",
            "avgPx": "0",
            "cTime": "1653347949771",
            "ccy": "",
            "ctVal": "",
            "fee": "0",
            "feeCcy": "USDC",
            "groupId": "3",
            "instId": "BTC-USDC",
            "instType": "SPOT",
            "lever": "0",
            "ordId": "449109084439187456",
            "ordType": "limit",
            "pnl": "0",
            "posSide": "net",
            "px": "30404.3",
            "rebate": "0",
            "rebateCcy": "USDT",
            "side": "sell",
            "state": "live",    
            "sz": "0.00059213",
            "tag": "",
            "tdMode": "cash",
            "uTime": "1653347949831"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">groupId</td><td style="text-align: left">String</td><td style="text-align: left">组ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">子订单交易模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br><code>cash</code>：非保证金</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种<br>仅适用于<code>合约模式</code>模式下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">子订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托数量</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">子订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交<br><code>cancelling</code>：撤单中</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">子订单订单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托价格</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费数量</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费币种</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣数量</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣币种</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">子订单平均成交价格</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">子订单累计成交数量</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">子订单持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">子订单收益</td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值<br>仅支持<code>FUTURES/SWAP</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### GET / 获取网格策略委托持仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/grid/positions`

> 请求示例

```
GET /api/v5/tradingBot/grid/positions?algoId=448965992920907776&algoOrdType=contract_grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adl": "1",
            "algoClOrdId": "",
            "algoId": "449327675342323712",
            "avgPx": "29215.0142857142857149",
            "cTime": "1653400065917",
            "ccy": "USDT",
            "imr": "2045.386",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "last": "29206.7",
            "lever": "5",
            "liqPx": "661.1684795867162",
            "markPx": "29213.9",
            "mgnMode": "cross",
            "mgnRatio": "217.19370606167573",
            "mmr": "40.907720000000005",
            "notionalUsd": "10216.70307",
            "pos": "35",
            "posSide": "net",
            "uTime": "1653400066938",
            "upl": "1.674999999999818",
            "uplRatio": "0.0008190504784478"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">String</td><td style="text-align: left">初始保证金</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">仓位美金价值</td></tr><tr><td style="text-align: left">adl</td><td style="text-align: left">String</td><td style="text-align: left">自动减仓信号区<br>分为5档，从1到5，数字越小代表adl强度越弱</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr></tbody></table>

### POST / 现货网格提取利润

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/withdraw-income`

> 请求示例

```
POST /api/v5/tradingBot/grid/withdraw-income
body
{
    "algoId":"448965992920907776"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoClOrdId": "",
            "algoId":"448965992920907776",
            "profit":"100"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">profit</td><td style="text-align: left">String</td><td style="text-align: left">提取的利润</td></tr></tbody></table>

### POST / 调整保证金计算

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/compute-margin-balance`

> 请求示例

```
POST /api/v5/tradingBot/grid/compute-margin-balance
body {
   "algoId":"123456",
   "type":"add",
   "amt":"10"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整保证金类型<br><code>add</code>：增加，<code>reduce</code>：减少</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">调整保证金数量<br></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "lever": "0.3877200981166066",
            "maxAmt": "1.8309562403342999"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">maxAmt</td><td style="text-align: left">String</td><td style="text-align: left">最多可调整的保证金数量</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">调整保证金后的杠杠倍数</td></tr></tbody></table>

### POST / 调整保证金

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/margin-balance`

> 请求示例

```
POST /api/v5/tradingBot/grid/margin-balance
body {
   "algoId":"123456",
   "type":"add",
   "amt":"10"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整保证金类型<br><code>add</code>：增加，<code>reduce</code>：减少</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">调整保证金数量<br><code>amt</code>和<code>percent</code>必须传一个</td></tr><tr><td style="text-align: left">percent</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">调整保证金百分比</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "123456"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr></tbody></table>

### POST / 加仓

该接口用于加仓，仅适用于合约网格。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/adjust-investment`

> 请求示例

```
POST /api/v5/tradingBot/grid/adjust-investment
body
{
    "algoId":"448965992920907776",
    "amt":"12"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">加仓数量</td></tr><tr><td style="text-align: left">allowReinvestProfit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否复投利润，仅适用于现货网格。<br><code>true</code> 或者 <code>false</code>。默认为 true。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoId":"448965992920907776"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

### GET / 网格策略智能回测（公共）

公共接口无须鉴权

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/tradingBot/grid/ai-param`

> 请求示例

```
GET /api/v5/tradingBot/grid/ai-param?instId=BTC-USDT&algoOrdType=grid
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>合约网格必填</td></tr><tr><td style="text-align: left">duration</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">回测时长，单位为天<br>现货网格默认 <code>7D</code>，可选：<code>7D</code>、<code>30D</code>、<code>180D</code><br>合约网格默认 <code>14D</code>，可选：<code>7D</code>、<code>14D</code>、<code>30D</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoOrdType": "grid",
            "annualizedRate": "1.5849",
            "ccy": "USDT",
            "direction": "",
            "duration": "7D",
            "gridNum": "5",
            "instId": "BTC-USDT",
            "lever": "0",
            "maxPx": "21373.3",
            "minInvestment": "0.89557758",
            "minPx": "15544.2",
            "perGridProfitRatio": "4.566226200302574",
            "perMaxProfitRate": "0.0733865364573281",
            "perMinProfitRate": "0.0561101403446263",
            "runType": "1",
            "sourceCcy": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">duration</td><td style="text-align: left">String</td><td style="text-align: left">回测周期<br><code>7D</code>：7天，<code>30D</code>：30天，<code>180D</code>：180天</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">perMaxProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">单网格最高利润率</td></tr><tr><td style="text-align: left">perMinProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">单网格最低利润率</td></tr><tr><td style="text-align: left">perGridProfitRatio</td><td style="text-align: left">String</td><td style="text-align: left">单网格利润率</td></tr><tr><td style="text-align: left">annualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">网格年化收益率</td></tr><tr><td style="text-align: left">minInvestment</td><td style="text-align: left">String</td><td style="text-align: left">最小投资数量</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">投资币种</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约网格类型<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">sourceCcy</td><td style="text-align: left">String</td><td style="text-align: left">来源币种</td></tr></tbody></table>

### POST / 计算最小投资数量（公共）

公共接口无须鉴权

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`POST /api/v5/tradingBot/grid/min-investment`

> 请求示例

```
POST /api/v5/tradingBot/grid/min-investment
body
{
    "instId": "ETH-USDT",
    "algoOrdType":"grid",
    "gridNum": "50",
    "maxPx":"5000",
    "minPx":"3000",
    "runType":"1",
    "investmentData":[
        {
            "amt":"0.01",
            "ccy":"ETH"
        },
        {
            "amt":"100",
            "ccy":"USDT"
        }
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">gridNum</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>适用于合约网格</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">杠杆倍数<br>适用于合约网格</td></tr><tr><td style="text-align: left">basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否开底仓<br>默认为<code>false</code></td></tr><tr><td style="text-align: left">investmentType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">投资类型, 仅适用于现货网格<br><code>quote</code>: 计价货币<br><code>base</code>: 交易货币<br><code>dual</code>: 计价货币和交易货币</td></tr><tr><td style="text-align: left">triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发策略,<br><code>instant</code>: 立即触发<br><code>price</code>: 价格触发<br><code>rsi</code>: rsi 触发</td></tr><tr><td style="text-align: left">topUpAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">增加的投资额，仅适用于现货网格</td></tr><tr><td style="text-align: left">investmentData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">投资信息</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资数量</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资币种</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
           "minInvestmentData": [  
               {
                   "amt":"0.1",
                   "ccy":"ETH"
               },
               {
                   "amt":"100",
                   "ccy":"USDT"
               }
           ],
           "singleAmt":"10"
       }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">minInvestmentData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">最小投入信息</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">最小投入数量</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">最小投入币种</td></tr><tr><td style="text-align: left">singleAmt</td><td style="text-align: left">String</td><td style="text-align: left">单网格买卖量<br>现货网格单位为计价币<br>合约网格单位为张</td></tr></tbody></table>

### GET / RSI回测（公共）

公共接口无须鉴权

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/tradingBot/public/rsi-back-testing`

> 请求示例

```
GET /api/v5/tradingBot/public/rsi-back-testing?instId=BTC-USDT&thold=30&timeframe=3m&timePeriod=14
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code><br>适用于<code>币币</code></td></tr><tr><td style="text-align: left">timeframe</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)</td></tr><tr><td style="text-align: left">thold</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">阈值<br>取值[1,100]的整数</td></tr><tr><td style="text-align: left">timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">周期<br><code>14</code></td></tr><tr><td style="text-align: left">triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>默认是<code>cross_down</code></td></tr><tr><td style="text-align: left">duration</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">回测周期<br><code>1M</code>：1个月<br>默认<code>1M</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "triggerNum": "164"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">triggerNum</td><td style="text-align: left">String</td><td style="text-align: left">触发次数</td></tr></tbody></table>

### GET / 最大网格数量（公共）

公共接口无须鉴权  

可通过该接口获取最大网格数量，最小网格数量总是 2。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/tradingBot/grid/grid-quantity`

> 请求示例

```
GET /api/v5/tradingBot/grid/grid-quantity?instId=BTC-USDT-SWAP&runType=1&algoOrdType=contract_grid&maxPx=70000&minPx=50000&lever=5
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如<code>BTC-USDT</code></td></tr><tr><td style="text-align: left">runType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">网格类型<br><code>1</code>: 等差<br><code>2</code>: 等比</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">maxPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">minPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">杠杆倍数, 合约网格时必填</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "maxGridQty": "285"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">maxGridQty</td><td style="text-align: left">String</td><td style="text-align: left">最大网格数量</td></tr></tbody></table>

### POST / 网格跟单下单

#### 限速：20次/2s

#### 限速规则：User ID + Instrument ID

#### HTTP请求

`POST /api/v5/tradingBot/grid/copy-order-algo`

> 请求示例

```
# 现货网格跟单
POST /api/v5/tradingBot/grid/copy-order-algo
body
{
    "instId": "BTC-USDT",
    "algoOrdType": "grid",
    "sourceAlgoId": "580007082221121536",
    "quoteSz": "1000"
}
```

```
# 合约网格跟单
POST /api/v5/tradingBot/grid/copy-order-algo
body
{
    "instId": "BTC-USDT-SWAP",
    "algoOrdType": "contract_grid",
    "sourceAlgoId": "580007082221121536",
    "lever": "3",
    "autoReserve": true,
    "sz": "5000"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格<br><code>contract_grid</code>：合约网格</td></tr><tr><td style="text-align: left">sourceAlgoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">被跟单的策略订单ID</td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">计价币投入金额<br>仅适用于 <code>grid</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">杠杆倍数<br>仅适用于 <code>contract_grid</code></td></tr><tr><td style="text-align: left">autoReserve</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否自动预留保证金，仅适用于 <code>contract_grid</code><br><code>true</code>：自动计算实际保证金和额外保证金<br><code>false</code>：手动指定 <code>actualMarginSz</code> 和 <code>extraMarginSz</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">合约网格总投入金额（USDT），当 <code>autoReserve</code> 为 <code>true</code> 时必填<br>仅适用于 <code>contract_grid</code></td></tr><tr><td style="text-align: left">actualMarginSz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">实际保证金，当 <code>autoReserve</code> 为 <code>false</code> 时必填<br>仅适用于 <code>contract_grid</code></td></tr><tr><td style="text-align: left">extraMarginSz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">额外保证金，当 <code>autoReserve</code> 为 <code>false</code> 时选填，默认为 <code>0</code><br>仅适用于 <code>contract_grid</code></td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义策略单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "581234567890123456",
            "algoClOrdId": "",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义策略单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### WS / 现货网格策略委托订单频道

支持现货网格策略订单的定时推送和事件推送

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "grid-orders-spot",
        "instType": "SPOT"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "grid-orders-spot",
        "instType": "SPOT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>grid-orders-spot</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "grid-orders-spot",
        "instType": "ANY"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"grid-orders-spot\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "grid-orders-spot",
        "instType": "ANY",
        "uid": "4470****9584"
    },
    "data": [{
        "algoClOrdId": "",
        "algoId": "568028283477164032",
        "activeOrdNum":"10",
        "algoOrdType": "grid",
        "annualizedRate": "0",
        "arbitrageNum": "0",
        "baseSz": "0",
        "cTime": "1681700496249",
        "cancelType": "0",
        "curBaseSz": "0",
        "curQuoteSz": "25",
        "floatProfit": "0",
        "gridNum": "10",
        "gridProfit": "0",
        "instId": "BTC-USDT",
        "instType": "SPOT",
        "investment": "25",
        "maxPx": "5000",
        "minPx": "400",
        "pTime": "1682416738467",
        "perMaxProfitRate": "1.14570215",
        "perMinProfitRate": "0.0991200440528634356837",
        "pnlRatio": "0",
        "profit": "0",
        "quoteSz": "25",
        "rebateTrans": [{
            "rebate": "0",
            "rebateCcy": "BTC"
        }, {
            "rebate": "0",
            "rebateCcy": "USDT"
        }],
        "runPx": "30031.7",
        "runType": "1",
        "triggerParams": [{
            "triggerAction": "start",
            "triggerStrategy": "instant",
            "delaySeconds": "0",
            "triggerType": "auto",
            "triggerTime": ""
        }, {
            "triggerAction": "stop",
            "triggerStrategy": "instant",
            "delaySeconds": "0",
            "stopType": "1",
            "triggerType": "manual",
            "triggerTime": ""
        }],
        "singleAmt": "0.00101214",
        "slTriggerPx": "",
        "state": "running",
        "stopResult": "0",
        "stopType": "2",
        "tag": "",
        "totalAnnualizedRate": "0",
        "totalPnl": "0",
        "tpTriggerPx": "",
        "tradeNum": "0",
        "uTime": "1682406665527",
        "profitSharingRatio": "",
        "copyType": "0",
        "tradeQuoteCcy": "USDT"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">&gt; rebateTrans</td><td style="text-align: left">Array of objects</td><td style="text-align: left">返佣划转信息</td></tr><tr><td style="text-align: left">&gt;&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣数量</td></tr><tr><td style="text-align: left">&gt;&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种</td></tr><tr><td style="text-align: left">&gt; triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt;&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt;&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt;&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">延迟触发时间，单位为秒</td></tr><tr><td style="text-align: left">&gt;&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction实际触发时间，Unix时间戳的毫秒数格式, 如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt;&gt; triggerType</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction的实际触发类型<br><code>manual</code>：手动触发<br><code>auto</code>: 自动触发</td></tr><tr><td style="text-align: left">&gt;&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3M</code>, <code>5M</code>, <code>15M</code>, <code>30M</code> (<code>M</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt;&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt;&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止类型<br>现货 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">&gt; gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">&gt; runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; tradeNum</td><td style="text-align: left">String</td><td style="text-align: left">挂单成交次数</td></tr><tr><td style="text-align: left">&gt; arbitrageNum</td><td style="text-align: left">String</td><td style="text-align: left">网格套利次数</td></tr><tr><td style="text-align: left">&gt; singleAmt</td><td style="text-align: left">String</td><td style="text-align: left">单网格买卖量</td></tr><tr><td style="text-align: left">&gt; perMinProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最低利润率</td></tr><tr><td style="text-align: left">&gt; perMaxProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最高利润率</td></tr><tr><td style="text-align: left">&gt; runPx</td><td style="text-align: left">String</td><td style="text-align: left">启动时价格</td></tr><tr><td style="text-align: left">&gt; totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">&gt; pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">&gt; investment</td><td style="text-align: left">String</td><td style="text-align: left">投入金额<br>现货网格如果投入了交易币则折算为计价币</td></tr><tr><td style="text-align: left">&gt; gridProfit</td><td style="text-align: left">String</td><td style="text-align: left">网格利润</td></tr><tr><td style="text-align: left">&gt; floatProfit</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">&gt; totalAnnualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">&gt; annualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">网格年化</td></tr><tr><td style="text-align: left">&gt; cancelType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止<br><code>6</code>: 信号停止</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：市价全平，<code>2</code>：停止不平仓</td></tr><tr><td style="text-align: left">&gt; quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">计价币投入数量<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; baseSz</td><td style="text-align: left">String</td><td style="text-align: left">交易币投入数量<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; curQuoteSz</td><td style="text-align: left">String</td><td style="text-align: left">当前持有的计价币资产<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; curBaseSz</td><td style="text-align: left">String</td><td style="text-align: left">当前持有的交易币资产<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; profit</td><td style="text-align: left">String</td><td style="text-align: left">当前可提取利润,单位是计价币<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; stopResult</td><td style="text-align: left">String</td><td style="text-align: left">现货网格策略停止结果<br><code>0</code>：默认，<code>1</code>：市价卖币成功 <code>-1</code>：市价卖币失败<br>仅适用于<code>现货网格</code></td></tr><tr><td style="text-align: left">&gt; activeOrdNum</td><td style="text-align: left">String</td><td style="text-align: left">子订单挂单数量</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例<br>取值范围[0,0.3]<br>如果是普通订单（既不是带单也不是跟单），该字段返回""</td></tr><tr><td style="text-align: left">&gt; copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">网格策略的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr></tbody></table>

### WS / 合约网格策略委托订单频道

支持合约网格策略订单的定时推送和事件推送

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "grid-orders-contract",
        "instType": "ANY"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "grid-orders-contract",
        "instType": "SWAP"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>grid-orders-contract</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续<br><code>FUTURE</code>：交割<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "grid-orders-contract",
        "instType": "ANY"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"grid-orders-contract\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "grid-orders-contract",
        "instType": "ANY",
        "uid": "4470****9584"
    },
    "data": [{
        "actualLever": "2.3481494635276649",
        "activeOrdNum": "10",
        "algoClOrdId": "",
        "algoId": "571039869070475264",
        "algoOrdType": "contract_grid",
        "annualizedRate": "0",
        "arbitrageNum": "0",
        "availEq": "52.3015392887089673",
        "basePos": true,
        "cTime": "1682418514204",
        "cancelType": "0",
        "direction": "long",
        "eq": "108.7945652387089673",
        "floatProfit": "8.7945652387089673",
        "gridNum": "10",
        "gridProfit": "0",
        "instId": "BTC-USDT-SWAP",
        "instType": "SWAP",
        "investment": "100",
        "lever": "5",
        "liqPx": "16370.482143120824",
        "maxPx": "36437.3",
        "minPx": "26931.9",
        "ordFrozen": "5.38638",
        "pTime": "1682492574068",
        "perMaxProfitRate": "0.1687494513302446",
        "perMinProfitRate": "0.1263869357706788",
        "pnlRatio": "0.0879456523870897",
        "rebateTrans": [{
            "rebate": "0",
            "rebateCcy": "USDT"
        }],
        "runPx": "27306.9",
        "runType": "1",
        "singleAmt": "1",
        "slTriggerPx": "",
        "state": "running",
        "stopType": "0",
        "sz": "100",
        "tag": "",
        "totalAnnualizedRate": "38.52019574554529",
        "totalPnl": "8.7945652387089673",
        "tpTriggerPx": "",
        "tradeNum": "9",
        "triggerParams": [{
            "triggerAction": "start",
            "delaySeconds": "0",
            "triggerStrategy": "price",
            "triggerPx": "1",
            "triggerType": "manual",
            "triggerTime": "1682418561497"
        }, {
            "triggerAction": "stop",
            "delaySeconds": "0",
            "triggerStrategy": "instant",
            "stopType": "1",
            "triggerType": "manual",
            "triggerTime": "0"
        }],
        "uTime": "1682492552257",
        "profitSharingRatio": "",
        "copyType": "0",
        "tpRatio": "",
        "slRatio": "",
        "fee": "",
        "fundingFee": ""
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_grid</code>：合约网格</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>no_close_position</code>：已停止未平仓（仅适用于合约网格）<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">&gt; rebateTrans</td><td style="text-align: left">Array of objects</td><td style="text-align: left">返佣划转信息</td></tr><tr><td style="text-align: left">&gt;&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">返佣数量</td></tr><tr><td style="text-align: left">&gt;&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">返佣币种</td></tr><tr><td style="text-align: left">&gt; triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt;&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：网格启动<br><code>stop</code>：网格停止</td></tr><tr><td style="text-align: left">&gt;&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>price</code>：价格触发<br><code>rsi</code>：rsi指标触发</td></tr><tr><td style="text-align: left">&gt;&gt; delaySeconds</td><td style="text-align: left">String</td><td style="text-align: left">延迟触发时间，单位为秒</td></tr><tr><td style="text-align: left">&gt;&gt; triggerTime</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction实际触发时间，Unix时间戳的毫秒数格式, 如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt;&gt; triggerType</td><td style="text-align: left">String</td><td style="text-align: left">triggerAction的实际触发类型<br><code>manual</code>：手动触发<br><code>auto</code>: 自动触发</td></tr><tr><td style="text-align: left">&gt;&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code> (<code>m</code>代表分钟)<br><code>1H</code>, <code>4H</code> (<code>H</code>代表小时)<br><code>1D</code> (<code>D</code>代表天)<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值<br>取值[1,100]的整数<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>时有效</td></tr><tr><td style="text-align: left">&gt;&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在<code>triggerStrategy</code>为<code>rsi</code>下有效</td></tr><tr><td style="text-align: left">&gt;&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>该字段只在<code>triggerStrategy</code>为<code>price</code>下有效</td></tr><tr><td style="text-align: left">&gt;&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：停止平仓，<code>2</code>：停止不平仓<br>该字段只在<code>triggerAction</code>为<code>stop</code>时有效</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最高价格</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">区间最低价格</td></tr><tr><td style="text-align: left">&gt; gridNum</td><td style="text-align: left">String</td><td style="text-align: left">网格数量</td></tr><tr><td style="text-align: left">&gt; runType</td><td style="text-align: left">String</td><td style="text-align: left">网格类型<br><code>1</code>：等差，<code>2</code>：等比</td></tr><tr><td style="text-align: left">&gt; tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">&gt; slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">&gt; tradeNum</td><td style="text-align: left">String</td><td style="text-align: left">挂单成交次数</td></tr><tr><td style="text-align: left">&gt; arbitrageNum</td><td style="text-align: left">String</td><td style="text-align: left">网格套利次数</td></tr><tr><td style="text-align: left">&gt; singleAmt</td><td style="text-align: left">String</td><td style="text-align: left">单网格买卖量</td></tr><tr><td style="text-align: left">&gt; perMinProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最低利润率</td></tr><tr><td style="text-align: left">&gt; perMaxProfitRate</td><td style="text-align: left">String</td><td style="text-align: left">预期单网格最高利润率</td></tr><tr><td style="text-align: left">&gt; runPx</td><td style="text-align: left">String</td><td style="text-align: left">启动时价格</td></tr><tr><td style="text-align: left">&gt; totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">&gt; pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">&gt; investment</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额<br>现货网格如果投入了交易币则折算为计价币</td></tr><tr><td style="text-align: left">&gt; gridProfit</td><td style="text-align: left">String</td><td style="text-align: left">网格利润</td></tr><tr><td style="text-align: left">&gt; floatProfit</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">&gt; totalAnnualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">&gt; annualizedRate</td><td style="text-align: left">String</td><td style="text-align: left">网格年化</td></tr><tr><td style="text-align: left">&gt; cancelType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止<br><code>6</code>: 信号停止</td></tr><tr><td style="text-align: left">&gt; stopType</td><td style="text-align: left">String</td><td style="text-align: left">网格策略停止类型<br>现货网格 <code>1</code>：卖出交易币，<code>2</code>：不卖出交易币<br>合约网格 <code>1</code>：市价全平，<code>2</code>：停止不平仓</td></tr><tr><td style="text-align: left">&gt; direction</td><td style="text-align: left">String</td><td style="text-align: left">合约网格类型<br><code>long</code>：做多，<code>short</code>：做空，<code>neutral</code>：中性<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; basePos</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否开底仓<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">投入保证金，单位为<code>USDT</code><br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; actualLever</td><td style="text-align: left">String</td><td style="text-align: left">实际杠杆倍数<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价格<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; eq</td><td style="text-align: left">String</td><td style="text-align: left">策略账户总权益<br>仅适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; ordFrozen</td><td style="text-align: left">String</td><td style="text-align: left">挂单占用<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; availEq</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金<br>适用于<code>合约网格</code></td></tr><tr><td style="text-align: left">&gt; activeOrdNum</td><td style="text-align: left">String</td><td style="text-align: left">子订单挂单数量</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例<br>取值范围[0,0.3]<br>如果是普通订单（既不是带单也不是跟单），该字段返回""</td></tr><tr><td style="text-align: left">&gt; copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">&gt; tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">止盈比率，0.1 代表 10%</td></tr><tr><td style="text-align: left">&gt; slRatio</td><td style="text-align: left">String</td><td style="text-align: left">止损比率，0.1 代表 10%</td></tr><tr><td style="text-align: left">&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">&gt; fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用，仅适用于合约网格，其他网格策略为""</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">网格策略的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### WS / 合约网格持仓频道

支持网格策略持仓的首次订阅推送，定时推送和事件推送  
请忽略空数据

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "grid-positions",
        "algoId": "449327675342323712"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "grid-positions",
        "algoId": "449327675342323712"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>grid-positions</code></td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "grid-positions",
        "algoId": "449327675342323712"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"grid-positions\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "grid-positions",
        "uid": "4470****9584",
        "algoId": "449327675342323712"
    },
    "data": [{
        "adl": "1",
        "algoClOrdId": "",
        "algoId": "449327675342323712",
        "avgPx": "29181.4638888888888895",
        "cTime": "1653400065917",
        "ccy": "USDT",
        "imr": "2089.2690000000002",
        "instId": "BTC-USDT-SWAP",
        "instType": "SWAP",
        "last": "29852.7",
        "lever": "5",
        "liqPx": "604.7617536513744",
        "markPx": "29849.7",
        "mgnMode": "cross",
        "mgnRatio": "217.71740878394456",
        "mmr": "41.78538",
        "notionalUsd": "10435.794191550001",
        "pTime": "1653536068723",
        "pos": "35",
        "posSide": "net",
        "uTime": "1653445498682",
        "upl": "232.83263888888962",
        "uplRatio": "0.1139826489932205"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">&gt; liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量</td></tr><tr><td style="text-align: left">&gt; mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">&gt; mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">&gt; imr</td><td style="text-align: left">String</td><td style="text-align: left">初始保证金</td></tr><tr><td style="text-align: left">&gt; mmr</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金</td></tr><tr><td style="text-align: left">&gt; upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">&gt; uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率</td></tr><tr><td style="text-align: left">&gt; last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">&gt; notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">仓位美金价值</td></tr><tr><td style="text-align: left">&gt; adl</td><td style="text-align: left">String</td><td style="text-align: left">自动减仓信号区<br>分为5档，从1到5，数字越小代表adl强度越弱</td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">订单信息的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### WS / 网格策略子订单频道

支持网格策略子订单的事件推送  
请忽略空数据

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "grid-sub-orders",
        "algoId": "449327675342323712"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "grid-sub-orders",
        "algoId": "449327675342323712"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>grid-sub-orders</code></td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "grid-sub-orders",
        "algoId": "449327675342323712"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"grid-sub-orders\", \"instType\" : \"FUTURES\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "grid-sub-orders",
        "uid": "44705892343619584",
        "algoId": "449327675342323712"
    },
    "data": [{
        "accFillSz": "0",
        "algoClOrdId": "",
        "algoId": "449327675342323712",
        "algoOrdType": "contract_grid",
        "avgPx": "0",
        "cTime": "1653445498664",
        "ctVal": "0.01",
        "fee": "0",
        "feeCcy": "USDT",
        "groupId": "-1",
        "instId": "BTC-USDT-SWAP",
        "instType": "SWAP",
        "lever": "5",
        "ordId": "449518234142904321",
        "ordType": "limit",
        "pTime": "1653486524502",
        "pnl": "",
        "posSide": "net",
        "px": "28007.2",
        "rebate": "0",
        "rebateCcy": "USDT",
        "side": "buy",
        "state": "live",
        "sz": "1",
        "tag":"",
        "tdMode": "cross",
        "uTime": "1653445498674"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>grid</code>：现货网格委托<br><code>contract_grid</code>：合约网格委托</td></tr><tr><td style="text-align: left">&gt; groupId</td><td style="text-align: left">String</td><td style="text-align: left">组ID</td></tr><tr><td style="text-align: left">&gt; ordId</td><td style="text-align: left">String</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; tdMode</td><td style="text-align: left">String</td><td style="text-align: left">子订单交易模式<br><code>cross</code>：全仓 <code>isolated</code>：逐仓 <code>cash</code>：非保证金</td></tr><tr><td style="text-align: left">&gt; ordType</td><td style="text-align: left">String</td><td style="text-align: left">子订单类型<br><code>market</code>：市价单 <code>limit</code>：限价单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托数量</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">子订单状态<br><code>canceled</code>：撤单成功 <code>live</code>：等待成交 <code>partially_filled</code>：部分成交 <code>filled</code>：完全成交 <code>cancelling</code>：撤单中</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">子订单订单方向<br><code>buy</code>：买 <code>sell</code>：卖</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托价格</td></tr><tr><td style="text-align: left">&gt; fee</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费数量</td></tr><tr><td style="text-align: left">&gt; feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费币种</td></tr><tr><td style="text-align: left">&gt; rebate</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣数量</td></tr><tr><td style="text-align: left">&gt; rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣币种</td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">子订单平均成交价格</td></tr><tr><td style="text-align: left">&gt; accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">子订单累计成交数量</td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">子订单持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">子订单收益</td></tr><tr><td style="text-align: left">&gt; ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值</td></tr><tr><td style="text-align: left">&gt; lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">订单信息的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

## 马丁交易

马丁策略是一种通过在市场下跌时自动分批加仓来摊低持仓均价的交易策略。用户设定首单金额、最大加仓次数、每次加仓的触发跌幅及止盈比例后，策略将在价格每次达到加仓条件时自动买入，待价格反弹至止盈目标时自动平仓获利。  
`马丁交易`功能模块下的API接口需要身份验证。

### POST / 马丁策略委托下单

#### 限速：20次/2s

#### 限速规则（期权以外）：User ID + Instrument ID

#### 限速规则（只限期权）：User ID + Instrument Family

#### HTTP请求

`POST /api/v5/tradingBot/dca/create`

> 请求示例

```
# 马丁下单
POST /api/v5/tradingBot/dca/create
body
{
    "instId": "BTC-USDT",
    "algoOrdType": "contract_dca",
    "direction": "long",
    "lever": "2",
    "initOrdAmt"="50",
    "maxSafetyOrds"="0",
    "safetyOrdAmt"="10",
    "pxSteps"="0.01",
    "tpPct"="0.05",
    "triggerParams":[
      {
         "triggerAction":"start",
         "triggerStrategy":"rsi",
         "timeframe":"30m",
         "thold":"10",
         "triggerCond":"cross",
         "timePeriod":"14"
      }
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">initOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">初始订单金额</td></tr><tr><td style="text-align: left">allowReinvest</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否复投利润，仅适用于合约马丁<br><code>true</code> 或者 <code>false</code>，默认为 <code>true</code></td></tr><tr><td style="text-align: left">safetyOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">加仓单金额<br>当 <code>maxSafetyOrds</code> &gt;= 1 时，<code>safetyOrdAmt</code> 必传</td></tr><tr><td style="text-align: left">maxSafetyOrds</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最大自动加仓次数</td></tr><tr><td style="text-align: left">pxSteps</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跌多少加仓<br>当 <code>maxSafetyOrds</code> &gt;= 1 时，<code>pxSteps</code> 必传</td></tr><tr><td style="text-align: left">pxStepsMult</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">加仓价差倍数<br>当 <code>maxSafetyOrds</code> &gt;= 1 时，<code>pxStepsMult</code> 必传</td></tr><tr><td style="text-align: left">volMult</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">加仓金额倍数<br>当 <code>maxSafetyOrds</code> &gt;= 1 时，<code>volMult</code> 必传</td></tr><tr><td style="text-align: left">tpPct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">单周期止盈目标<br>0.05 表示 5%</td></tr><tr><td style="text-align: left">slPct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损目标<br>0.05 表示 5%</td></tr><tr><td style="text-align: left">slMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损模式<br><code>limit</code>：限价<br><code>market</code>：市价</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">合约马丁类型，仅适用于 <code>contract_dca</code><br><code>long</code>：多仓，<code>short</code>：空仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">杠杆倍数<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发行为<br>合约马丁触发行为：<code>start</code>：马丁启动<br>现货马丁触发行为：<code>start</code>：马丁启动</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">触发策略<br>合约马丁类型：<code>instant</code>：立即触发，<code>price</code>：价格触发，<code>rsi</code>：RSI 指标触发，默认为 <code>instant</code><br>现货马丁类型：<code>instant</code>：立即触发，<code>rsi</code>：RSI 指标触发，默认为 <code>instant</code></td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code>（<code>m</code> 代表分钟）<br><code>1H</code>, <code>4H</code>（<code>H</code> 代表小时）<br><code>1D</code>（<code>D</code> 代表天）<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">阈值<br>取值 [1,100] 的整数<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">周期<br><code>14</code><br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发价格<br>该字段只在 <code>triggerStrategy</code> 为 <code>price</code> 时有效<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">带单员分润比例，仅支持固定比例分润，仅适用于 <code>contract_dca</code><br><code>0</code>, <code>0.1</code>, <code>0.2</code>, <code>0.3</code></td></tr><tr><td style="text-align: left">trackingMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分润设置，仅适用于 <code>contract_dca</code><br><code>sync</code> 同步，<code>async</code> 异步</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">指定交易计价货币，仅适用<code>spot_dca</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "447053782921515008",
            "sCode": "0",
            "sMsg": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### POST / 现货DCA编辑参数

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/amend-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/dca/amend-order-algo
body
{
    "algoId": "532177187189760000",
    "pxSteps": "0.02",
    "pxStepsMult": "2.0",
    "volMult": "2.0",
    "tpPct": "0.05",
    "slPct": "0.20",
    "initOrdAmt": "100",
    "safetyOrdAmt": "50",
    "maxSafetyOrds": "5",
    "reserveFunds": true,
    "triggerParams": [
        {
            "triggerAction": "start",
            "triggerStrategy": "instant"
        }
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">pxSteps</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">价差比例（第一次加仓触发价格差）</td></tr><tr><td style="text-align: left">pxStepsMult</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">价差放大倍数</td></tr><tr><td style="text-align: left">volMult</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">金额放大倍数</td></tr><tr><td style="text-align: left">tpPct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">止盈目标，0.05 表示 5%</td></tr><tr><td style="text-align: left">slPct</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">止损目标，0.05 表示 5%</td></tr><tr><td style="text-align: left">initOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">初始订单金额（计价货币）</td></tr><tr><td style="text-align: left">safetyOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">加仓单金额（计价货币）</td></tr><tr><td style="text-align: left">maxSafetyOrds</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最大加仓次数</td></tr><tr><td style="text-align: left">reserveFunds</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否预留全部资金<br><code>true</code>：预留资金<br><code>false</code>：不预留资金</td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发行为<br><code>start</code>：马丁启动</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发策略<br><code>instant</code>：立即触发<br><code>rsi</code>：RSI 指标触发</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">K线种类<br><code>3m</code>, <code>5m</code>, <code>15m</code>, <code>30m</code>（<code>m</code> 代表分钟）<br><code>1H</code>, <code>4H</code>（<code>H</code> 代表小时）<br><code>1D</code>（<code>D</code> 代表天）<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">阈值，取值 [1, 100] 的整数<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">周期，如 <code>14</code><br>该字段只在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "532177187189760000",
            "algoClOrdId": "",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### POST / 停止马丁策略委托订单

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/stop`

> 请求示例

```
POST /api/v5/tradingBot/dca/stop
body
{
    "algoOrdType": "contract_dca",
    "algoId": "448965992920907776",
    "stopType": "1"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">stopType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">停止类型<br>合约马丁：<code>1</code>：市价全平，<code>2</code>：停止但不平仓<br>现货马丁：<code>1</code>：停止并卖出币，<code>2</code>：停止但不卖出币</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "448965992920907776",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### GET / 获取进行中马丁策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/dca/ongoing-list`

> 请求示例

```
GET /api/v5/tradingBot/dca/ongoing-list?algoOrdType=contract_dca&limit=20
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的 <code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的 <code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "565849588675117056",
            "algoOrdType": "contract_dca",
            "instId": "BTC-USDT-SWAP",
            "copyType": "0",
            "state": "running",
            "direction": "long",
            "lever": "3",
            "initOrdAmt": "100",
            "safetyOrdAmt": "200",
            "maxSafetyOrds": "5",
            "pxSteps": "0.02",
            "pxStepsMult": "1",
            "volMult": "1",
            "tpPxRange": "",
            "slPct": "",
            "slMode": "",
            "allowReinvest": true,
            "totalPnl": "12.5",
            "pnlRatio": "0.05",
            "totalFundingFee": "-0.5",
            "investmentAmt": "500",
            "investmentCcy": "USDT",
            "arbitragePnL": "2.1",
            "profitSharingRatio": "",
            "trackingMode": "",
            "triggerParams": [
                {
                    "triggerAction": "start",
                    "triggerStrategy": "instant"
                }
            ],
            "cTime": "1597026383085",
            "uTime": "1597026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>pending_signal</code>：等待触发<br><code>no_close_position</code>：已停止未平仓</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约马丁类型：<code>long</code>：多仓，<code>short</code>：空仓<br>现货马丁类型：<code>long</code>：做多</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">initOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">初始订单金额</td></tr><tr><td style="text-align: left">safetyOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">加仓单金额</td></tr><tr><td style="text-align: left">maxSafetyOrds</td><td style="text-align: left">String</td><td style="text-align: left">最大自动加仓次数</td></tr><tr><td style="text-align: left">pxSteps</td><td style="text-align: left">String</td><td style="text-align: left">跌多少加仓</td></tr><tr><td style="text-align: left">pxStepsMult</td><td style="text-align: left">String</td><td style="text-align: left">加仓价差倍数</td></tr><tr><td style="text-align: left">volMult</td><td style="text-align: left">String</td><td style="text-align: left">加仓金额倍数</td></tr><tr><td style="text-align: left">tpPxRange</td><td style="text-align: left">String</td><td style="text-align: left">止盈价格限制<br>做多时止盈价格不得低于系统最小阈值；做空时不得高于最大阈值<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">slPct</td><td style="text-align: left">String</td><td style="text-align: left">止损目标，如 <code>0.05</code> 表示 5%</td></tr><tr><td style="text-align: left">slMode</td><td style="text-align: left">String</td><td style="text-align: left">止损模式<br><code>limit</code>：限价<br><code>market</code>：市价</td></tr><tr><td style="text-align: left">allowReinvest</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否复投利润<br><code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">totalFundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，仅支持 <code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">arbitragePnL</td><td style="text-align: left">String</td><td style="text-align: left">周期套利收益</td></tr><tr><td style="text-align: left">transferInMargin</td><td style="text-align: left">String</td><td style="text-align: left">净转入金额，包括保证金和手动加仓金额<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例，取值范围 [0, 0.3]<br>普通订单返回 <code>""</code><br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">trackingMode</td><td style="text-align: left">String</td><td style="text-align: left">分润设置<br><code>sync</code>：同步<br><code>async</code>：异步<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：马丁启动<br><code>stop</code>：马丁停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br>合约马丁类型：<code>instant</code>：立即触发，<code>price</code>：价格触发，<code>rsi</code>：RSI 指标触发，<code>webhook</code>：WS 信号触发<br>现货马丁类型：<code>instant</code>：立即触发，<code>rsi</code>：RSI 指标触发</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>仅在 <code>triggerStrategy</code> 为 <code>price</code> 时有效<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期，如 <code>14</code><br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值，取值 [1, 100] 的整数<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K 线种类<br><code>3m</code>、<code>5m</code>、<code>15m</code>、<code>30m</code>（m 代表分钟）<br><code>1H</code>、<code>4H</code>（H 代表小时）<br><code>1D</code>（D 代表天）<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">指定交易计价货币<br>仅适用于 <code>spot_dca</code></td></tr></tbody></table>

### GET / 获取历史马丁策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/dca/history-list`

> 请求示例

```
GET /api/v5/tradingBot/dca/history-list?algoOrdType=contract_dca
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的 <code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的 <code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "12345689",
            "algoOrdType": "contract_dca",
            "instId": "BTC-USDT-SWAP",
            "copyType": "0",
            "state": "stopped",
            "cancelType": "1",
            "direction": "long",
            "lever": "3",
            "initOrdAmt": "100",
            "safetyOrdAmt": "200",
            "maxSafetyOrds": "5",
            "pxSteps": "0.02",
            "pxStepsMult": "1",
            "volMult": "1",
            "slPct": "",
            "slMode": "",
            "allowReinvest": true,
            "totalPnl": "12.5",
            "pnlRatio": "0.05",
            "fundingFee": "-0.5",
            "investmentAmt": "500",
            "investmentCcy": "USDT",
            "arbitragePnL": "2.1",
            "transferInMargin": "500",
            "profitSharingRatio": "",
            "trackingMode": "",
            "triggerParams": [
                {
                    "triggerAction": "start",
                    "triggerStrategy": "instant"
                }
            ],
            "ctVal": "0.01",
            "cTime": "1597026383085",
            "uTime": "1597026383085"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">copyType</td><td style="text-align: left">String</td><td style="text-align: left">分润订单类型<br><code>0</code>：普通订单<br><code>1</code>：普通跟单<br><code>2</code>：分润跟单<br><code>3</code>：带单</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>pending_signal</code>：等待触发<br><code>no_close_position</code>：已停止未平仓</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">马丁策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止<br><code>2</code>：止盈停止<br><code>3</code>：止损停止<br><code>4</code>：风控停止<br><code>5</code>：交割停止</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">合约马丁类型：<code>long</code>：多仓，<code>short</code>：空仓<br>现货马丁类型：<code>long</code>：做多</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">initOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">初始订单金额</td></tr><tr><td style="text-align: left">safetyOrdAmt</td><td style="text-align: left">String</td><td style="text-align: left">加仓单金额</td></tr><tr><td style="text-align: left">maxSafetyOrds</td><td style="text-align: left">String</td><td style="text-align: left">最大自动加仓次数</td></tr><tr><td style="text-align: left">pxSteps</td><td style="text-align: left">String</td><td style="text-align: left">跌多少加仓</td></tr><tr><td style="text-align: left">pxStepsMult</td><td style="text-align: left">String</td><td style="text-align: left">加仓价差倍数</td></tr><tr><td style="text-align: left">volMult</td><td style="text-align: left">String</td><td style="text-align: left">加仓金额倍数</td></tr><tr><td style="text-align: left">slPct</td><td style="text-align: left">String</td><td style="text-align: left">止损目标，如 <code>0.05</code> 表示 5%</td></tr><tr><td style="text-align: left">slMode</td><td style="text-align: left">String</td><td style="text-align: left">止损模式<br><code>limit</code>：限价<br><code>market</code>：市价</td></tr><tr><td style="text-align: left">allowReinvest</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否复投利润<br><code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">累计资金费用<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入金额</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，仅支持 <code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">arbitragePnL</td><td style="text-align: left">String</td><td style="text-align: left">周期套利收益</td></tr><tr><td style="text-align: left">transferInMargin</td><td style="text-align: left">String</td><td style="text-align: left">净转入金额，包括保证金和手动加仓金额<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例，取值范围 [0, 0.3]<br>普通订单返回 <code>""</code><br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">trackingMode</td><td style="text-align: left">String</td><td style="text-align: left">分润设置<br><code>sync</code>：同步<br><code>async</code>：异步<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">triggerParams</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发参数</td></tr><tr><td style="text-align: left">&gt; triggerAction</td><td style="text-align: left">String</td><td style="text-align: left">触发行为<br><code>start</code>：马丁启动<br><code>stop</code>：马丁停止</td></tr><tr><td style="text-align: left">&gt; triggerStrategy</td><td style="text-align: left">String</td><td style="text-align: left">触发策略<br>合约马丁类型：<code>instant</code>：立即触发，<code>price</code>：价格触发，<code>rsi</code>：RSI 指标触发，<code>webhook</code>：WS 信号触发<br>现货马丁类型：<code>instant</code>：立即触发，<code>rsi</code>：RSI 指标触发</td></tr><tr><td style="text-align: left">&gt; triggerPx</td><td style="text-align: left">String</td><td style="text-align: left">触发价格<br>仅在 <code>triggerStrategy</code> 为 <code>price</code> 时有效<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">&gt; triggerCond</td><td style="text-align: left">String</td><td style="text-align: left">触发条件<br><code>cross_up</code>：上穿<br><code>cross_down</code>：下穿<br><code>above</code>：上方<br><code>below</code>：下方<br><code>cross</code>：交叉<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timePeriod</td><td style="text-align: left">String</td><td style="text-align: left">周期，如 <code>14</code><br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; thold</td><td style="text-align: left">String</td><td style="text-align: left">阈值，取值 [1, 100] 的整数<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">&gt; timeframe</td><td style="text-align: left">String</td><td style="text-align: left">K 线种类<br><code>3m</code>、<code>5m</code>、<code>15m</code>、<code>30m</code>（m 代表分钟）<br><code>1H</code>、<code>4H</code>（H 代表小时）<br><code>1D</code>（D 代表天）<br>仅在 <code>triggerStrategy</code> 为 <code>rsi</code> 时有效</td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">订单创建时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">订单更新时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">指定交易计价货币<br>仅适用于 <code>spot_dca</code></td></tr></tbody></table>

### GET / 获取马丁策略子订单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/dca/orders`

> 请求示例

```
GET /api/v5/tradingBot/dca/orders?algoId=2833925189933756416&algoOrdType=contract_dca
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">cycleId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略周期 ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的 <code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的 <code>ordId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "cycleId": "9876543",
            "ordId": "570627699870375936",
            "avgFillPx": "41500",
            "direction": "long",
            "side": "buy",
            "ordType": "init_order",
            "px": "41000",
            "sz": "10",
            "filledSz": "10",
            "state": "filled",
            "fee": "-0.2",
            "rebate": "0",
            "rebateCcy": "USDT",
            "lever": "3",
            "instId": "BTC-USDT-SWAP",
            "ctVal": "0.01",
            "fillTime": "1597026383085",
            "cTime": "1597026383085",
            "uTime": "1597026383085",
            "tradeQuoteCcy": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">cycleId</td><td style="text-align: left">String</td><td style="text-align: left">策略周期 ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">子订单 ID</td></tr><tr><td style="text-align: left">avgFillPx</td><td style="text-align: left">String</td><td style="text-align: left">子订单平均成交价格</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>合约马丁类型：<code>long</code>：多仓，<code>short</code>：空仓<br>现货马丁类型：<code>long</code>：做多</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">子订单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">子订单类型<br><code>init_order</code>：初始订单<br><code>safety_order</code>：加仓订单<br><code>tp_order</code>：止盈单<br><code>sl_order</code>：止损单<br><code>manual_add_order</code>：手动加仓单<br><code>close_position</code>：平仓单<br><code>manual_close_position</code>：手动平仓单</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托数量</td></tr><tr><td style="text-align: left">filledSz</td><td style="text-align: left">String</td><td style="text-align: left">子订单成交数量</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">子订单状态<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交<br><code>canceled</code>：撤单成功<br><code>cancelling</code>：撤单中</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费数量</td></tr><tr><td style="text-align: left">rebate</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣数量</td></tr><tr><td style="text-align: left">rebateCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单返佣币种</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">fillTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单成交时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单创建时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单更新时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">指定交易计价货币<br>仅适用于 <code>spot_dca</code></td></tr></tbody></table>

### POST / 手动加仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/orders/manual-buy`

> 请求示例

```
POST /api/v5/tradingBot/dca/orders/manual-buy
body
{
    "algoId": "2833925189933756416",
    "algoOrdType": "contract_dca",
    "price": "41000",
    "amt": "100"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">price</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">加仓价格</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">增加的投资额</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单类型<br><code>limit</code>：限价单<br><code>market</code>：市价单<br>仅适用于 <code>spot_dca</code></td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">指定交易计价货币<br>仅适用于 <code>spot_dca</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoClOrdId": "",
            "algoOrdType": "contract_dca",
            "tag": "",
            "diffAmount": "100",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">diffAmount</td><td style="text-align: left">String</td><td style="text-align: left">手动加仓转入虚拟子账户的资金<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 修改复投设置

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/settings/reinvestment`

> 请求示例

```
POST /api/v5/tradingBot/dca/settings/reinvestment
body
{
    "algoId": "2833925189933756416",
    "algoOrdType": "contract_dca",
    "allowReinvest": false
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">allowReinvest</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否复投利润<br><code>true</code> 或 <code>false</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoOrdType": "contract_dca",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 修改止盈参数

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/settings/take-profit`

> 请求示例

```
POST /api/v5/tradingBot/dca/settings/take-profit
body
{
    "algoId": "2833925189933756416",
    "algoOrdType": "contract_dca",
    "tpPrice": "43500"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">tpPrice</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">止盈价格</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoOrdType": "contract_dca",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### GET / 获取马丁策略委托持仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/dca/position-details`

> 请求示例

```
GET /api/v5/tradingBot/dca/position-details?algoId=2833925189933756416&algoOrdType=contract_dca
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoClOrdId": "",
            "algoOrdType": "contract_dca",
            "instId": "BTC-USDT-SWAP",
            "curCycleld": "3",
            "startTime": "1597026383085",
            "fillManualOrds": "0",
            "fillSafetyOrds": "2",
            "fundingFee": "-0.05",
            "initPx": "43200",
            "notionalUsd": "5000",
            "avgPx": "43000",
            "upl": "12.5",
            "liqPx": "38000",
            "sz": "2",
            "baseSz": "",
            "quoteSz": "",
            "slPx": "40000",
            "tpPx": "45000",
            "fee": "-0.2",
            "tradeQuoteCcy": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">curCycleld</td><td style="text-align: left">String</td><td style="text-align: left">正在运行中的周期 ID</td></tr><tr><td style="text-align: left">startTime</td><td style="text-align: left">String</td><td style="text-align: left">当轮周期开启时间，Unix 时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">fillManualOrds</td><td style="text-align: left">String</td><td style="text-align: left">周期手动加仓次数</td></tr><tr><td style="text-align: left">fillSafetyOrds</td><td style="text-align: left">String</td><td style="text-align: left">周期已加仓次数</td></tr><tr><td style="text-align: left">fundingFee</td><td style="text-align: left">String</td><td style="text-align: left">当轮周期累计资金费用<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">initPx</td><td style="text-align: left">String</td><td style="text-align: left">初始订单开仓均价或初始订单成交价</td></tr><tr><td style="text-align: left">notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">仓位美金价值<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">合约数量<br>仅适用于 <code>contract_dca</code></td></tr><tr><td style="text-align: left">baseSz</td><td style="text-align: left">String</td><td style="text-align: left">当前周期持有的交易币数量<br>仅适用于 <code>spot_dca</code></td></tr><tr><td style="text-align: left">quoteSz</td><td style="text-align: left">String</td><td style="text-align: left">当前周期持有的计价币数量<br>仅适用于 <code>spot_dca</code></td></tr><tr><td style="text-align: left">slPx</td><td style="text-align: left">String</td><td style="text-align: left">止损价格</td></tr><tr><td style="text-align: left">tpPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈价格</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，正数代表平台返佣，负数代表平台扣除</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">指定交易计价货币<br>仅适用于 <code>spot_dca</code></td></tr></tbody></table>

### GET / 获取马丁周期列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/dca/cycle-list`

> 请求示例

```
GET /api/v5/tradingBot/dca/cycle-list?algoId=2833925189933756416&algoOrdType=contract_dca
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托<br><code>spot_dca</code>：现货马丁委托</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的 <code>cycleId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的 <code>cycleId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoClOrdId": "",
            "cycleId": "9876543",
            "currentCycle": true,
            "realizedPnl": "12.5",
            "startTime": "1597026383085",
            "endTime": "",
            "fee": "-0.3",
            "avgPx": "41500",
            "tpPx": "43000"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户端自定义策略单ID</td></tr><tr><td style="text-align: left">cycleId</td><td style="text-align: left">String</td><td style="text-align: left">策略周期 ID</td></tr><tr><td style="text-align: left">currentCycle</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否是当轮周期<br><code>true</code> 或 <code>false</code></td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现盈亏</td></tr><tr><td style="text-align: left">startTime</td><td style="text-align: left">String</td><td style="text-align: left">周期开启时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">endTime</td><td style="text-align: left">String</td><td style="text-align: left">周期结束时间，Unix 时间戳毫秒数，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">累计手续费金额，正数代表平台返佣，负数代表平台扣除</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">tpPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈价格</td></tr></tbody></table>

### POST / 增加保证金

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/margin/add`

> 请求示例

```
POST /api/v5/tradingBot/dca/margin/add
body
{
    "algoId": "2833925189933756416",
    "amt": "50"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">增加的保证金金额</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoOrdType": "contract_dca",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 减少保证金

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/dca/margin/reduce`

> 请求示例

```
POST /api/v5/tradingBot/dca/margin/reduce
body
{
    "algoId": "2833925189933756416",
    "amt": "50"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">减少的保证金金额</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2833925189933756416",
            "algoOrdType": "contract_dca",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单 ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>contract_dca</code>：合约马丁委托</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

## 信号交易

信号策略允许您将定制的数字货币交易策略展示在欧易平台。您可以完全控制自己设计的算法，而策略将会以高性能、高可靠性实时执行您的交易。[了解更多](/cn/learn/signal-trading)

### POST / 创建信号

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/create-signal`

> 请求示例

```
POST /api/v5/tradingBot/signal/create-signal
body
{
  "signalChanName": "long short",
  "signalDesc": "this is the first version"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">signalChanName</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">信号名称</td></tr><tr><td style="text-align: left">signalChanDesc</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">信号描述</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
       {
           "signalChanId" :"572112109",
           "signalChanToken":"dojuckew331lkx"
       }

    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">signalChanToken</td><td style="text-align: left">String</td><td style="text-align: left">信号单的用户身份标识</td></tr></tbody></table>

### GET / 查询所有信号

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/signals`

> 请求示例

```
GET /api/v5/tradingBot/signal/signals
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">signalSourceType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">信号来源类型<br><code>1</code>：自己创建的<br><code>2</code>：订阅他人<br><code>3</code>：免费信号</td></tr><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的signalChanId</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的signalChanId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "signalChanId": "623833708424069120",
            "signalChanName": "test",
            "signalChanDesc": "test",
            "signalChanToken": "test",
            "signalSourceType": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">signalChanName</td><td style="text-align: left">String</td><td style="text-align: left">信号名称</td></tr><tr><td style="text-align: left">signalChanDesc</td><td style="text-align: left">String</td><td style="text-align: left">信号描述</td></tr><tr><td style="text-align: left">signalChanToken</td><td style="text-align: left">String</td><td style="text-align: left">信号单的用户身份标识</td></tr><tr><td style="text-align: left">signalSourceType</td><td style="text-align: left">String</td><td style="text-align: left">信号来源类型<br><code>1</code>：自己创建的<br><code>2</code>：订阅他人<br><code>3</code>：免费信号</td></tr></tbody></table>

### POST / 创建信号策略

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/order-algo`

> 请求示例

```
# 创建信号策略
POST /api/v5/tradingBot/signal/order-algo
body
{
  "signalChanId": "627921182788161536",
  "instIds": [
    "BTC-USDT-SWAP",
    "ETH-USDT-SWAP",
    "LTC-USDT-SWAP"
  ],
  "lever": "10",
  "investAmt": "100",
  "subOrdType": "9",
  "entrySettingParam": {
    "allowMultipleEntry": true,
    "entryType": "1",
    "amt": "",
    "ratio": ""
  },
  "exitSettingParam": {
    "tpSlType": "2",
    "tpPct": "",
    "slPct": ""
  }
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">includeAll</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否包含所有USDT 本位永续合约，默认false。 <code>true</code>: 包含 <code>false</code> : 不包含</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">该信号支持的产品ID列表， 多个instId 用逗号分隔。当 includeAll 为true 时， 忽略此参数</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">杠杆倍数仅适用于合约信号</td></tr><tr><td style="text-align: left">investAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投入金额</td></tr><tr><td style="text-align: left">subOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">1：限价 2：市价 9：由tradingView信号指定</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">限价单的委托价格距离买一/卖一价的百分比。当委托类型为限价时，该字段有效。</td></tr><tr><td style="text-align: left">entrySettingParam</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">进场参数设定</td></tr><tr><td style="text-align: left">&gt; allowMultipleEntry</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">是否允许多次进场，默认允许。 <code>true</code>：允许 <code>false</code>：不允许</td></tr><tr><td style="text-align: left">&gt; entryType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单次委托类型<br><code>1</code>：单次委托量具体数值将从 TradingView 信号中传入<br><code>2</code>：单次委托量为固定数量的保证金<br><code>3</code>：单次委托量为固定的合约张数<br><code>4</code>：单次委托量基于在收到触发信号时策略中可用保证金的百分比<br><code>5</code>：单次委托量基于在创建策略时设置的初始投入保证金的百分比</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单笔委托量<br>在单次委托类型是 固定保证金 / 合约张数 下该字段有效</td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">Array of objects</td><td style="text-align: left">否</td><td style="text-align: left">单笔委托数量百分比<br>在单次委托类型是 占用保证金比例 / 初始投资比例 下该字段有效</td></tr><tr><td style="text-align: left">exitSettingParam</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">离场参数设定</td></tr><tr><td style="text-align: left">&gt; tpSlType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">止盈止损类型，该参数用户确定设置止盈止损的触发价格计算的方式<br><code>pnl</code>：基于平均持仓成本和预期收益率<br><code>price</code>：基于相对于平均持仓成本的涨跌幅</td></tr><tr><td style="text-align: left">&gt; tpPct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈百分比</td></tr><tr><td style="text-align: left">&gt; slPct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损百分比</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "447053782921515008",
            "sCode": "0",
            "sMsg": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### POST / 停止信号策略

每次最多可以撤销10个信号策略。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/stop-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/signal/stop-order-algo
body
[
    {
        "algoId":"448965992920907776"
    }
]
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "448965992920907776",
            "sCode": "0",
            "sMsg": "",
            "algoClOrdId": ""

        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr></tbody></table>

### POST / 调整保证金

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/margin-balance`

> 请求示例

```
POST /api/v5/tradingBot/signal/margin-balance
body
{
   "algoId":"123456",
   "type":"add",
   "amt":"10"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整保证金类型<br><code>add</code>：增加，<code>reduce</code>：减少</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整保证金数量</td></tr><tr><td style="text-align: left">allowReinvest</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否允许复投调整后的保证金，默认false。true 或者 false <code>false</code>:新投入的资金仅作为保证金用于避免爆仓<br><code>true</code>:新投入的资金将可用于进行复投。<br>仅适用于进场设定为“TradingView 信号”或“初始投资比例”的策略</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "123456"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr></tbody></table>

### POST / 修改止盈止损

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/amendTPSL`

> 请求示例

```
POST /api/v5/tradingBot/signal/amendTPSL
body
{
    "algoId": "637039348240277504",
    "exitSettingParam": {
        "tpSlType": "pnl",
        "tpPct": "0.01",
        "slPct": "0.01"
    }
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">exitSettingParam</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">离场参数设定</td></tr><tr><td style="text-align: left">&gt; tpSlType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">止盈止损类型</td></tr><tr><td style="text-align: left">&gt; tpPct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈百分比</td></tr><tr><td style="text-align: left">&gt; slPct</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损百分比</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "637039348240277504"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr></tbody></table>

### POST / 设置币对

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/set-instruments`

> 请求示例

```
POST /api/v5/tradingBot/signal/set-instruments
body
{
    "algoId": "637039348240277504",
    "instIds": [
        "SHIB-USDT-SWAP",
        "ETH-USDT-SWAP"
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">是</td><td style="text-align: left">产品Id 列表，当 includeAll 为 true 时，忽略此参数。</td></tr><tr><td style="text-align: left">includeAll</td><td style="text-align: left">Boolean</td><td style="text-align: left">是</td><td style="text-align: left">是否包含所有USDT 本位永续合约，默认false <code>true</code>: 包含 <code>false</code> : 不包含</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "637039348240277504"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr></tbody></table>

### GET / 获取信号策略详情

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/orders-algo-details`

> 请求示例

```
GET /api/v5/tradingBot/signal/orders-algo-details?algoId=623833708424069120&algoOrdType=contract
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "623833708424069120",
            "algoClOrdId": "",
            "algoOrdType": "contract",
            "availBal": "1.6561369013122267",
            "cTime": "1695005546360",
            "cancelType": "0",
            "entrySettingParam": {
                "allowMultipleEntry": true,
                "amt": "0",
                "entryType": "1",
                "ratio": ""
            },
            "exitSettingParam": {
                "slPct": "",
                "tpPct": "",
                "tpSlType": "price"
            },
            "floatPnl": "0.1279999999999927",
            "frozenBal": "25.16816",
            "instIds": [
                "BTC-USDT-SWAP",
                "ETH-USDT-SWAP"
            ],
            "instType": "SWAP",
            "investAmt": "100",
            "lever": "10",
            "ratio": "",
            "realizedPnl": "-73.303703098687766",
            "signalChanId": "623827579484770304",
            "signalChanName": "我的信号",
            "signalSourceType": "1",
            "state": "running",
            "subOrdType": "9",
            "totalEq": "26.824296901312227",
            "totalPnl": "-73.1757030986877733",
            "totalPnlRatio": "-0.7317570309868777",
            "uTime": "1697029422313"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">该信号支持的产品ID列表</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalPnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">总收益率</td></tr><tr><td style="text-align: left">totalEq</td><td style="text-align: left">String</td><td style="text-align: left">当前策略总权益</td></tr><tr><td style="text-align: left">floatPnl</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现盈亏</td></tr><tr><td style="text-align: left">frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约信号</code></td></tr><tr><td style="text-align: left">investAmt</td><td style="text-align: left">String</td><td style="text-align: left">投入金额</td></tr><tr><td style="text-align: left">subOrdType</td><td style="text-align: left">String</td><td style="text-align: left">委托类型<br><code>1</code>：限价<br><code>2</code>：市价<br><code>9</code>：tradingView信号</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">限价单的委托价格距离买一/卖一价的百分比<br>当委托类型为限价时，该字段有效，无效则返回""。</td></tr><tr><td style="text-align: left">entrySettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">进场参数设定</td></tr><tr><td style="text-align: left">&gt; allowMultipleEntry</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否允许多次进场<br><code>true</code>：允许<br><code>false</code>：不允许</td></tr><tr><td style="text-align: left">&gt; entryType</td><td style="text-align: left">String</td><td style="text-align: left">单次委托类型<br><code>1</code>：单次委托量具体数值将从 TradingView 信号中传入<br><code>2</code>：单次委托量为固定数量的保证金<br><code>3</code>：单次委托量为固定的合约张数<br><code>4</code>：单次委托量基于在收到触发信号时策略中可用保证金的百分比<br><code>5</code>：单次委托量基于在创建策略时设置的初始投入保证金的百分比</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托量<br>在单次委托类型是 固定保证金 / 合约张数 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托数量百分比<br>在单次委托类型是 占用保证金比例 / 初始投资比例 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">exitSettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">离场参数设定</td></tr><tr><td style="text-align: left">&gt; tpSlType</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损类型，该参数用户确定设置止盈止损的触发价格计算的方式<br><code>pnl</code>：基于平均持仓成本和预期收益率<br><code>price</code>：基于相对于平均持仓成本的涨跌幅</td></tr><tr><td style="text-align: left">&gt; tpPct</td><td style="text-align: left">String</td><td style="text-align: left">止盈百分比</td></tr><tr><td style="text-align: left">&gt; slPct</td><td style="text-align: left">String</td><td style="text-align: left">止损百分比</td></tr><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">signalChanName</td><td style="text-align: left">String</td><td style="text-align: left">信号名称</td></tr><tr><td style="text-align: left">signalSourceType</td><td style="text-align: left">String</td><td style="text-align: left">信号来源类型<br><code>1</code>：自己创建的<br><code>2</code>：订阅他人<br><code>3</code>：免费信号</td></tr></tbody></table>

### GET / 获取活跃信号策略

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/orders-algo-pending`

> 请求示例

```
GET /api/v5/tradingBot/signal/orders-algo-pending?algoOrdType=contract
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的algoId</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的algoId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "623833708424069120",
            "algoClOrdId": "",
            "algoOrdType": "contract",
            "availBal": "1.6561369013122267",
            "cTime": "1695005546360",
            "cancelType": "0",
            "entrySettingParam": {
                "allowMultipleEntry": true,
                "amt": "0",
                "entryType": "1",
                "ratio": ""
            },
            "exitSettingParam": {
                "slPct": "",
                "tpPct": "",
                "tpSlType": "price"
            },
            "floatPnl": "0.1279999999999927",
            "frozenBal": "25.16816",
            "instIds": [
                "BTC-USDT-SWAP",
                "ETH-USDT-SWAP"
            ],
            "instType": "SWAP",
            "investAmt": "100",
            "lever": "10",
            "ratio": "",
            "realizedPnl": "-73.303703098687766",
            "signalChanId": "623827579484770304",
            "signalChanName": "我的信号",
            "signalSourceType": "1",
            "state": "running",
            "subOrdType": "9",
            "totalEq": "26.824296901312227",
            "totalPnl": "-73.1757030986877733",
            "totalPnlRatio": "-0.7317570309868777",
            "uTime": "1697029422313"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">该信号支持的产品ID列表</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>starting</code>：启动中<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止原因<br><code>0</code>：无<br><code>1</code>：手动停止</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalPnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">总收益率</td></tr><tr><td style="text-align: left">totalEq</td><td style="text-align: left">String</td><td style="text-align: left">当前策略总权益</td></tr><tr><td style="text-align: left">floatPnl</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现盈亏</td></tr><tr><td style="text-align: left">frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约信号</code></td></tr><tr><td style="text-align: left">investAmt</td><td style="text-align: left">String</td><td style="text-align: left">投入金额</td></tr><tr><td style="text-align: left">subOrdType</td><td style="text-align: left">String</td><td style="text-align: left">委托类型<br><code>1</code>：限价<br><code>2</code>：市价<br><code>9</code>：tradingView信号</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">限价单的委托价格距离买一/卖一价的百分比<br>当委托类型为限价时，该字段有效，无效则返回""。</td></tr><tr><td style="text-align: left">entrySettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">进场参数设定</td></tr><tr><td style="text-align: left">&gt; allowMultipleEntry</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否允许多次进场<br><code>true</code>：允许<br><code>false</code>：不允许</td></tr><tr><td style="text-align: left">&gt; entryType</td><td style="text-align: left">String</td><td style="text-align: left">单次委托类型<br><code>1</code>：单次委托量具体数值将从 TradingView 信号中传入<br><code>2</code>：单次委托量为固定数量的保证金<br><code>3</code>：单次委托量为固定的合约张数<br><code>4</code>：单次委托量基于在收到触发信号时策略中可用保证金的百分比<br><code>5</code>：单次委托量基于在创建策略时设置的初始投入保证金的百分比</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托量<br>在单次委托类型是 固定保证金 / 合约张数 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托数量百分比<br>在单次委托类型是 占用保证金比例 / 初始投资比例 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">exitSettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">离场参数设定</td></tr><tr><td style="text-align: left">&gt; tpSlType</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损类型，该参数用户确定设置止盈止损的触发价格计算的方式<br><code>pnl</code>：基于平均持仓成本和预期收益率<br><code>price</code>：基于相对于平均持仓成本的涨跌幅</td></tr><tr><td style="text-align: left">&gt; tpPct</td><td style="text-align: left">String</td><td style="text-align: left">止盈百分比</td></tr><tr><td style="text-align: left">&gt; slPct</td><td style="text-align: left">String</td><td style="text-align: left">止损百分比</td></tr><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">signalChanName</td><td style="text-align: left">String</td><td style="text-align: left">信号名称</td></tr><tr><td style="text-align: left">signalSourceType</td><td style="text-align: left">String</td><td style="text-align: left">信号来源类型<br><code>1</code>：自己创建的<br><code>2</code>：订阅他人<br><code>3</code>：免费信号</td></tr></tbody></table>

### GET / 获取历史信号策略

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/orders-algo-history`

> 请求示例

```
GET /api/v5/tradingBot/signal/orders-algo-history?algoId=623833708424069120&algoOrdType=contract
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的algoId</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的algoId</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "623833708424069120",
            "algoClOrdId": "",
            "algoOrdType": "contract",
            "availBal": "1.6561369013122267",
            "cTime": "1695005546360",
            "cancelType": "1",
            "entrySettingParam": {
                "allowMultipleEntry": true,
                "amt": "0",
                "entryType": "1",
                "ratio": ""
            },
            "exitSettingParam": {
                "slPct": "",
                "tpPct": "",
                "tpSlType": "price"
            },
            "floatPnl": "0.1279999999999927",
            "frozenBal": "25.16816",
            "instIds": [
                "BTC-USDT-SWAP",
                "ETH-USDT-SWAP"
            ],
            "instType": "SWAP",
            "investAmt": "100",
            "lever": "10",
            "ratio": "",
            "realizedPnl": "-73.303703098687766",
            "signalChanId": "623827579484770304",
            "signalChanName": "我的信号",
            "signalSourceType": "1",
            "state": "stopped",
            "subOrdType": "9",
            "totalEq": "26.824296901312227",
            "totalPnl": "-73.1757030986877733",
            "totalPnlRatio": "-0.7317570309868777",
            "uTime": "1697029422313"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">Array of strings</td><td style="text-align: left">该信号支持的产品ID列表</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">cancelType</td><td style="text-align: left">String</td><td style="text-align: left">策略停止原因<br>1`：手动停止</td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalPnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">总收益率</td></tr><tr><td style="text-align: left">totalEq</td><td style="text-align: left">String</td><td style="text-align: left">当前策略总权益</td></tr><tr><td style="text-align: left">floatPnl</td><td style="text-align: left">String</td><td style="text-align: left">浮动盈亏</td></tr><tr><td style="text-align: left">realizedPnl</td><td style="text-align: left">String</td><td style="text-align: left">已实现盈亏</td></tr><tr><td style="text-align: left">frozenBal</td><td style="text-align: left">String</td><td style="text-align: left">占用保证金</td></tr><tr><td style="text-align: left">availBal</td><td style="text-align: left">String</td><td style="text-align: left">可用保证金</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数<br>仅适用于<code>合约信号</code></td></tr><tr><td style="text-align: left">investAmt</td><td style="text-align: left">String</td><td style="text-align: left">投入金额</td></tr><tr><td style="text-align: left">subOrdType</td><td style="text-align: left">String</td><td style="text-align: left">委托类型<br><code>1</code>：限价<br><code>2</code>：市价<br><code>9</code>：tradingView信号</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">限价单的委托价格距离买一/卖一价的百分比<br>当委托类型为限价时，该字段有效，无效则返回""。</td></tr><tr><td style="text-align: left">entrySettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">进场参数设定</td></tr><tr><td style="text-align: left">&gt; allowMultipleEntry</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否允许多次进场<br><code>true</code>：允许<br><code>false</code>：不允许</td></tr><tr><td style="text-align: left">&gt; entryType</td><td style="text-align: left">String</td><td style="text-align: left">单次委托类型<br><code>1</code>：单次委托量具体数值将从 TradingView 信号中传入<br><code>2</code>：单次委托量为固定数量的保证金<br><code>3</code>：单次委托量为固定的合约张数<br><code>4</code>：单次委托量基于在收到触发信号时策略中可用保证金的百分比<br><code>5</code>：单次委托量基于在创建策略时设置的初始投入保证金的百分比</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托量<br>在单次委托类型是 固定保证金 / 合约张数 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">单笔委托数量百分比<br>在单次委托类型是 占用保证金比例 / 初始投资比例 下该字段有效，无效的时候返回""</td></tr><tr><td style="text-align: left">exitSettingParam</td><td style="text-align: left">Object</td><td style="text-align: left">离场参数设定</td></tr><tr><td style="text-align: left">&gt; tpSlType</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损类型，该参数用户确定设置止盈止损的触发价格计算的方式<br><code>pnl</code>：基于平均持仓成本和预期收益率<br><code>price</code>：基于相对于平均持仓成本的涨跌幅</td></tr><tr><td style="text-align: left">&gt; tpPct</td><td style="text-align: left">String</td><td style="text-align: left">止盈百分比</td></tr><tr><td style="text-align: left">&gt; slPct</td><td style="text-align: left">String</td><td style="text-align: left">止损百分比</td></tr><tr><td style="text-align: left">signalChanId</td><td style="text-align: left">String</td><td style="text-align: left">信号ID</td></tr><tr><td style="text-align: left">signalChanName</td><td style="text-align: left">String</td><td style="text-align: left">信号名称</td></tr><tr><td style="text-align: left">signalSourceType</td><td style="text-align: left">String</td><td style="text-align: left">信号来源类型<br><code>1</code>：自己创建的<br><code>2</code>：订阅他人<br><code>3</code>：免费信号</td></tr></tbody></table>

### GET / 获取信号策略持仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/positions`

> 请求示例

```
GET /api/v5/tradingBot/signal/positions?algoId=623833708424069120&algoOrdType=contract
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "adl": "1",
            "algoClOrdId": "",
            "algoId": "623833708424069120",
            "avgPx": "1597.74",
            "cTime": "1697502301460",
            "ccy": "USDT",
            "imr": "23.76495",
            "instId": "ETH-USDT-SWAP",
            "instType": "SWAP",
            "last": "1584.34",
            "lever": "10",
            "liqPx": "1438.7380360728976",
            "markPx": "1584.33",
            "mgnMode": "cross",
            "mgnRatio": "11.719278420807477",
            "mmr": "1.9011959999999997",
            "notionalUsd": "237.75168928499997",
            "pos": "15",
            "posSide": "net",
            "uTime": "1697502301460",
            "upl": "-2.0115000000000123",
            "uplRatio": "-0.0839310526118142"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID，将来扩展使用。</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">liqPx</td><td style="text-align: left">String</td><td style="text-align: left">预估强平价</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">pos</td><td style="text-align: left">String</td><td style="text-align: left">持仓数量</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓</td></tr><tr><td style="text-align: left">mgnRatio</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金率</td></tr><tr><td style="text-align: left">imr</td><td style="text-align: left">String</td><td style="text-align: left">初始保证金</td></tr><tr><td style="text-align: left">mmr</td><td style="text-align: left">String</td><td style="text-align: left">维持保证金</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">notionalUsd</td><td style="text-align: left">String</td><td style="text-align: left">仓位美金价值</td></tr><tr><td style="text-align: left">adl</td><td style="text-align: left">String</td><td style="text-align: left">自动减仓信号区<br>分为5档，从1到5，数字越小代表adl强度越弱</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">标记价格</td></tr></tbody></table>

### GET /查看历史持仓信息

获取最近3个月有更新的仓位信息，按照仓位更新时间倒序排列。组合保证金账户模式不支持查询历史持仓。

#### 限速：10次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/positions-history`

> 请求示例

```
GET /api/v5/tradingBot/signal/positions-history?algoId=1234
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易产品ID，如：<code>BTC-USD-SWAP</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询仓位更新 (uTime) 之前的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询仓位更新 (uTime) 之后的内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
  "code": "0",
  "data": [
    {
      "cTime": "1704724451471",
      "closeAvgPx": "200",
      "direction": "net",
      "instId": "ETH-USDT-SWAP",
      "lever": "5.0",
      "mgnMode": "cross",
      "openAvgPx": "220",
      "pnl": "-2.021",
      "pnlRatio": "-0.4593181818181818",
      "uTime": "1704724456322",
      "uly": "ETH-USDT"
    }
  ],
  "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品ID</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式 <code>cross</code>：全仓，<code>isolated</code>：逐仓"</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">仓位创建时间</td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">仓位更新时间</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">closeAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">平仓均价</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">平仓收益额</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">平仓收益率</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">direction</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向 <code>long</code>：多 <code>short</code>：空</td></tr><tr><td style="text-align: left">uly</td><td style="text-align: left">String</td><td style="text-align: left">标的指数</td></tr></tbody></table>

### POST / 市价仓位全平

市价平掉指定交易产品的持仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/close-position`

> 请求示例

```
POST /api/v5/tradingBot/signal/close-position
body
{
    "instId":"BTC-USDT-SWAP",
    "algoId":"448965992920907776"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "448965992920907776"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr></tbody></table>

### POST / 下单

只有当您的账户有足够的资金才能下单。  
  

#### 限速：20次/2s

#### HTTP请求

`POST /api/v5/tradingBot/signal/sub-order`

> 请求示例

```
POST /api/v5/tradingBot/signal/sub-order
body
{
    "algoId":"1222",
    "instId":"BTC-USDT-SWAP",
    "side":"buy",
    "ordType":"limit",
    "px":"2.15",
    "sz":"2"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单方向<br><code>buy</code>：买， <code>sell</code>：卖</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">委托数量</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">委托价格，仅适用于<code>limit</code></td></tr><tr><td style="text-align: left">reduceOnly</td><td style="text-align: left">Boolean</td><td style="text-align: left">否</td><td style="text-align: left">是否只减仓，<code>true</code> 或 <code>false</code>，默认<code>false</code><br>仅适用于<code>合约模式</code>和<code>跨币种保证金模式</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr></tbody></table>

::: tip
ordType  
订单类型，创建新订单时必须指定，您指定的订单类型将影响需要哪些订单参数和撮合系统如何执行您的订单，以下是有效的ordType：  
普通委托：  
limit：限价单，要求指定sz 和 px  
market：自动以最高买/最低卖价格委托，遵循限价机制
:::

::: tip
sz 指合约张数。
:::

::: tip
reduceOnly  
只减仓，下单时，此参数设置为 true 时，表示此笔订单具有减仓属性，只会减少持仓数量，不会增加新的持仓仓位  
当前只减仓下单张数，加上价格时间优先于当前只减仓下单的只减仓挂单张数总和，不能超过持仓数量  
仅适用于\`合约模式\`和\`跨币种保证金模式\`
:::

### POST / 撤单

撤销之前下的未完成订单。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/signal/cancel-sub-order`

> 请求示例

```
POST /api/v5/tradingBot/signal/cancel-sub-order
body
{
    "algoId":"91664",
    "signalOrdId":"590908157585625111",
    "instId":"BTC-USDT-SWAP"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 BTC-USDT-SWAP</td></tr><tr><td style="text-align: left">signalOrdId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "signalOrdId":"590908157585625111",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">结果代码，<code>0</code>表示成功</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">错误信息，代码为0时，该字段为空</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">包含结果的对象数组</td></tr><tr><td style="text-align: left">&gt; signalOrdId</td><td style="text-align: left">String</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">&gt; sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">&gt; sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

::: tip
撤单返回sCode等于0不能严格认为该订单已经被撤销，只表示您的撤单请求被系统服务器所接受，撤单结果以者查询订单状态为准
:::

### GET / 获取信号策略子订单信息

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/sub-orders`

> 请求示例

```
# 查询已成交历史子订单
GET /api/v5/tradingBot/signal/sub-orders?algoId=623833708424069120&algoOrdType=contract&state=filled

# 查询指定子订单
GET /api/v5/tradingBot/signal/sub-orders?algoId=623833708424069120&algoOrdType=contract&signalOrdId=O632302662327996418
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">子订单状态<br><code>live</code>：未成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：已成交<br><code>canceled</code>：已取消<br>state 和 signalOrdId 必须传一个，若传两个，以 state 为主</td></tr><tr><td style="text-align: left">signalOrdId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求<code>cTime</code>在此时间戳之后(包含)的数据，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求<code>cTime</code>在此时间戳之前(包含)的数据，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子订单类型<br><code>live</code>：未成交<br><code>filled</code>：已成交<br><code>即将废弃</code></td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子订单自定义订单ID<br><code>即将废弃</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "18",
            "algoClOrdId": "",
            "algoId": "623833708424069120",
            "algoOrdType": "contract",
            "avgPx": "1572.81",
            "cTime": "1697024702320",
            "ccy": "",
            "clOrdId": "O632302662327996418",
            "ctVal": "0.01",
            "fee": "-0.1415529",
            "feeCcy": "USDT",
            "instId": "ETH-USDT-SWAP",
            "instType": "SWAP",
            "lever": "10",
            "ordId": "632302662351958016",
            "ordType": "market",
            "pnl": "-2.6784",
            "posSide": "net",
            "px": "",
            "side": "buy",
            "state": "filled",
            "sz": "18",
            "tag": "",
            "tdMode": "cross",
            "uTime": "1697024702322"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID，将来扩展使用。</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">交易产品ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略类型<br><code>contract</code>：合约信号</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">子订单自定义ID，等同于<code>signalOrdId</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">子订单交易模式<br><code>cross</code>：全仓<br><code>isolated</code>：逐仓<br><code>cash</code>：非保证金</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种<br>仅适用于<code>合约模式</code>下的<code>全仓杠杆</code>订单</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">子订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br><code>ioc</code>：立即成交并取消剩余</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托数量</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">子订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交<br><code>cancelling</code>：撤单中</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">子订单订单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托价格</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费数量</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费币种</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">子订单平均成交价格</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">子订单累计成交数量</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">子订单持仓方向<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">子订单收益</td></tr><tr><td style="text-align: left">ctVal</td><td style="text-align: left">String</td><td style="text-align: left">合约面值<br>仅支持<code>FUTURES/SWAP</code></td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### GET / 获取信号策略历史事件

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/signal/event-history`

> 请求示例

```
GET /api/v5/tradingBot/signal/event-history?algoId=623833708424069120
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求<code>eventCtime</code>在此时间之前（更旧的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求<code>eventCtime</code>此时间之后（更新的数据）的分页内容，值为时间戳，Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "alertMsg": "{\"marketPosition\":\"short\",\"prevMarketPosition\":\"long\",\"action\":\"sell\",\"instrument\":\"ETHUSDT.P\",\"timestamp\":\"2023-10-16T10:50:00.000Z\",\"maxLag\":\"60\",\"investmentType\":\"base\",\"amount\":\"2\"}",
            "algoId": "623833708424069120",
            "eventCtime": "1697453400959",
            "eventProcessMsg": "Processed reverse entry signal and placed ETH-USDT-SWAP order with all available balance",
            "eventStatus": "success",
            "eventType": "signal_processing",
            "eventUtime": "",
            "triggeredOrdData": [
                {
                    "clOrdId": "O634100754731765763"
                },
                {
                    "clOrdId": "O634100754752737282"
                }
            ]
        }
     ],
     "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">alertMsg</td><td style="text-align: left">String</td><td style="text-align: left">提示信息</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">eventType</td><td style="text-align: left">String</td><td style="text-align: left">事件类型<br><code>system_action</code>：系统行为<br><code>user_action</code>：用户行为<br><code>signal_processing</code>：信号下单</td></tr><tr><td style="text-align: left">eventCtime</td><td style="text-align: left">String</td><td style="text-align: left">事件发生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">eventUtime</td><td style="text-align: left">String</td><td style="text-align: left">事件更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">eventProcessMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件处理信息</td></tr><tr><td style="text-align: left">eventStatus</td><td style="text-align: left">String</td><td style="text-align: left">事件处理状态<br><code>success</code>：成功<br><code>failure</code>：失败</td></tr><tr><td style="text-align: left">triggeredOrdData</td><td style="text-align: left">Array of objects</td><td style="text-align: left">信号触发的子订单的信息</td></tr><tr><td style="text-align: left">&gt; clOrdId</td><td style="text-align: left">String</td><td style="text-align: left">子订单自定义ID</td></tr></tbody></table>

## 定投

定投是以固定的时间周期，投入固定的金额买入选定币种的策略。在市场波动较为剧烈时，运用适当的定投策略，以同样的投资额度可以在低点购入更多的筹码，可以使用户获得更加可观的收益。[了解更多](/cn/help/vii-recurring-buy)  
`定投`功能模块下的API接口需要身份验证。

### POST / 定投策略委托下单

#### 限速：20次/2s

#### 限速规则 ：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/order-algo`

> 请求示例

```
POST /api/v5/tradingBot/recurring/order-algo
body
{
  "stgyName": "BTC|ETH recurring buy monthly",     
  "amt":"100",
  "recurringList":[    
    {
         "ccy":"BTC",
         "ratio":"0.2"
    },
    {
         "ccy":"ETH",
         "ratio":"0.8"
    }
  ],
  "period":"monthly",
  "recurringDay":"1",
  "recurringTime":"0",
  "timeZone":"8",   // 东8区
  "tdMode":"cross",
  "investmentCcy":"USDT"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">stgyName</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略自定义名称，不超过40个字符</td></tr><tr><td style="text-align: left">recurringList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">定投信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">定投币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">定投币种资产占比，如 "0.2"代表占比20%</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">定投币种价格下限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">定投币种价格上限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">周期类型<br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">投资日<br>当周期类型为<code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为<code>weekly</code>，则取值范围是 [1,7] 的整数<br>当周期类型为<code>daily</code>/<code>hourly</code>，该参数可不填。</td></tr><tr><td style="text-align: left">recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code>代表每隔<code>1</code>个小时定投<br>当周期类型选择<code>hourly</code>，该字段必填。</td></tr><tr><td style="text-align: left">recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数<br>当周期类型选择<code>hourly</code>代表首次定投发生的时间</td></tr><tr><td style="text-align: left">timeZone</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code>表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">每期投入数量</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">投入数量单位，只能是<code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易模式<br><code>跨币种保证金模式</code>/<code>组合保证金模式</code>下选择 <code>cross</code>：全仓<br><code>现货模式</code>/<code>合约模式</code>下选择 <code>cash</code>：非保证金</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">客户自定义订单ID<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">Array</td><td style="text-align: left">否</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br><code>3</code>：简单赚币账户<br>默认为<code>1</code></td></tr><tr><td style="text-align: left">recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">定投周期类型<br><code>1</code>：自定义时间<br><code>2</code>：立即触发<br>默认为<code>1</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoId":"560472804207104000",
            "algoClOrdId":"",
            "sCode":"0",
            "sMsg":"",
            "tag":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 修改定投策略订单

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/amend-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/recurring/amend-order-algo
body
{
    "algoId":"448965992920907776",
    "stgyName":"stg1"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">stgyName</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">调整后的策略自定义名称</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
        {
            "algoId":"448965992920907776",
            "algoClOrdId":"",
            "sCode":"0",
            "sMsg":""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr></tbody></table>

### POST / 定投策略停止

每次最多可以撤销10个定投策略订单。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/stop-order-algo`

> 请求示例

```
POST /api/v5/tradingBot/recurring/stop-order-algo
body
[
    {
        "algoId":"560472804207104000"
    }
]
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "1839309556514557952",
            "sCode": "0",
            "sMsg": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的code，0代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的msg</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left"><del>订单标签</del>（已废弃）</td></tr></tbody></table>

### GET / 获取未完成定投策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/recurring/orders-algo-pending`

> 请求示例

```
GET /api/v5/tradingBot/recurring/orders-algo-pending
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "644497312047435776",
            "algoOrdType": "recurring",
            "amt": "100",
            "cTime": "1699932133373",
            "cycles": "6",
            "instType": "SPOT",
            "investmentAmt": "0",
            "investmentCcy": "USDC",
            "mktCap": "0",
            "period": "hourly",
            "pnlRatio": "0",
            "recurringDay": "",
            "recurringHour": "1",
            "recurringList": [
                {
                    "ccy": "BTC",
                    "ratio": "0.2",
                    "minPx": "",
                    "maxPx": ""
                },
                {
                    "ccy": "ETH",
                    "ratio": "0.8",
                    "minPx": "",
                    "maxPx": ""
                }
            ],
            "recurringTime": "12",
            "state": "running",
            "stgyName": "stg1",
            "tag": "",
            "timeZone": "8",
            "totalAnnRate": "0",
            "totalPnl": "0",
            "uTime": "1699952473152",
            "tradeQuoteCcy": "USDT",
            "source": ["1"],
            "recurringTimeType": "1",
            "recurringTimeMinutes": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>recurring</code>：定投</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>pause</code>: 已暂停</td></tr><tr><td style="text-align: left">stgyName</td><td style="text-align: left">String</td><td style="text-align: left">策略自定义名称，不超过40个字符</td></tr><tr><td style="text-align: left">recurringList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">定投信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">定投币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">定投币种资产占比，如 "0.2"代表占比20%</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格下限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格上限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">周期类型<br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">投资日<br>当周期类型为<code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为<code>weekly</code>，则取值范围是 [1,7] 的整数</td></tr><tr><td style="text-align: left">recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code>代表每隔<code>1</code>个小时定投</td></tr><tr><td style="text-align: left">recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数</td></tr><tr><td style="text-align: left">timeZone</td><td style="text-align: left">String</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code>表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">每期投入数量</td></tr><tr><td style="text-align: left">investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入数量</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，只能是<code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalAnnRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">mktCap</td><td style="text-align: left">String</td><td style="text-align: left">当前总市值，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">cycles</td><td style="text-align: left">String</td><td style="text-align: left">定投累计轮数</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">Array</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br><code>3</code>：简单赚币账户</td></tr><tr><td style="text-align: left">recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">定投周期类型<br><code>1</code>：自定义时间<br><code>2</code>：立即触发</td></tr><tr><td style="text-align: left">recurringTimeMinutes</td><td style="text-align: left">String</td><td style="text-align: left">定投时间（分钟），取值范围是 [0,59] 的整数</td></tr></tbody></table>

### GET / 获取历史定投策略委托单列表

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/recurring/orders-algo-history`

> 请求示例

```
GET /api/v5/tradingBot/recurring/orders-algo-history
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>algoId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "644496098429767680",
            "algoOrdType": "recurring",
            "amt": "100",
            "cTime": "1699931844050",
            "cycles": "0",
            "instType": "SPOT",
            "investmentAmt": "0",
            "investmentCcy": "USDC",
            "mktCap": "0",
            "period": "hourly",
            "pnlRatio": "0",
            "recurringDay": "",
            "recurringHour": "1",
            "recurringList": [
                {
                    "ccy": "BTC",
                    "ratio": "0.2",
                    "minPx": "",
                    "maxPx": ""
                },
                {
                    "ccy": "ETH",
                    "ratio": "0.8",
                    "minPx": "",
                    "maxPx": ""
                }
            ],
            "recurringTime": "0",
            "state": "stopped",
            "stgyName": "stg1",
            "tag": "",
            "timeZone": "8",
            "totalAnnRate": "0",
            "totalPnl": "0",
            "uTime": "1699932177659",
            "tradeQuoteCcy": "USDT"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>recurring</code>：定投</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>stopped</code>：已停止</td></tr><tr><td style="text-align: left">stgyName</td><td style="text-align: left">String</td><td style="text-align: left">策略自定义名称，不超过40个字符</td></tr><tr><td style="text-align: left">recurringList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">定投信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">定投币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">定投币种资产占比，如 "0.2"代表占比20%</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格下限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格上限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">周期类型<br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">投资日<br>当周期类型为<code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为<code>weekly</code>，则取值范围是 [1,7] 的整数</td></tr><tr><td style="text-align: left">recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code>代表每隔<code>1</code>个小时定投</td></tr><tr><td style="text-align: left">recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数</td></tr><tr><td style="text-align: left">timeZone</td><td style="text-align: left">String</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code>表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">每期投入数量</td></tr><tr><td style="text-align: left">investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入数量</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，只能是<code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalAnnRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">mktCap</td><td style="text-align: left">String</td><td style="text-align: left">当前总市值，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">cycles</td><td style="text-align: left">String</td><td style="text-align: left">定投累计轮数</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">Array</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br><code>3</code>：简单赚币账户</td></tr><tr><td style="text-align: left">recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">定投周期类型<br><code>1</code>：自定义时间<br><code>2</code>：立即触发</td></tr><tr><td style="text-align: left">recurringTimeMinutes</td><td style="text-align: left">String</td><td style="text-align: left">定投时间（分钟），取值范围是 [0,59] 的整数</td></tr></tbody></table>

### GET / 获取定投策略委托订单详情

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/recurring/orders-algo-details`

> 请求示例

```
GET /api/v5/tradingBot/recurring/orders-algo-details?algoId=644497312047435776
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoClOrdId": "",
            "algoId": "644497312047435776",
            "algoOrdType": "recurring",
            "amt": "100",
            "cTime": "1699932133373",
            "cycles": "6",
            "instType": "SPOT",
            "investmentAmt": "0",
            "investmentCcy": "USDC",
            "mktCap": "0",
            "nextInvestTime": "1699956005500",
            "period": "hourly",
            "pnlRatio": "0",
            "recurringDay": "",
            "recurringHour": "1",
            "recurringList": [
                {
                    "avgPx": "0",
                    "ccy": "BTC",
                    "profit": "0",
                    "px": "36683.2",
                    "ratio": "0.2",
                    "minPx": "",
                    "maxPx": "",
                    "totalAmt": "0"
                },
                {
                    "avgPx": "0",
                    "ccy": "ETH",
                    "profit": "0",
                    "px": "2058.36",
                    "ratio": "0.8",
                    "minPx": "",
                    "maxPx": "",
                    "totalAmt": "0"
                }
            ],
            "recurringTime": "12",
            "state": "running",
            "stgyName": "stg1",
            "tag": "",
            "timeZone": "8",
            "totalAnnRate": "0",
            "totalPnl": "0",
            "uTime": "1699952485451",
            "tradeQuoteCcy": "USDT"，
            "source": ["1"],
            "recurringTimeType": "1",
            "recurringTimeMinutes": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>recurring</code>：定投</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>stopped</code>：已停止<br><code>pause</code>: 已暂停</td></tr><tr><td style="text-align: left">stgyName</td><td style="text-align: left">String</td><td style="text-align: left">策略自定义名称，不超过40个字符</td></tr><tr><td style="text-align: left">recurringList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">定投信息</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">定投币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">定投币种资产占比，如 "0.2"代表占比20%</td></tr><tr><td style="text-align: left">&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格下限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">定投币种价格上限，<code>""</code>代表没有限制</td></tr><tr><td style="text-align: left">&gt; totalAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计购入定投币种的数量</td></tr><tr><td style="text-align: left">&gt; profit</td><td style="text-align: left">String</td><td style="text-align: left">定投收益，单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">定投均价，计价单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">当前价格，计价单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">周期类型<br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">投资日<br>当周期类型为<code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为<code>weekly</code>，则取值范围是 [1,7] 的整数</td></tr><tr><td style="text-align: left">recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code>代表每隔<code>1</code>个小时定投</td></tr><tr><td style="text-align: left">recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数</td></tr><tr><td style="text-align: left">timeZone</td><td style="text-align: left">String</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code>表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">amt</td><td style="text-align: left">String</td><td style="text-align: left">每期投入数量</td></tr><tr><td style="text-align: left">investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入数量</td></tr><tr><td style="text-align: left">investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，只能是<code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">nextInvestTime</td><td style="text-align: left">String</td><td style="text-align: left">下一次定投发生的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">totalAnnRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">mktCap</td><td style="text-align: left">String</td><td style="text-align: left">当前总市值，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">cycles</td><td style="text-align: left">String</td><td style="text-align: left">定投累计轮数</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">Array</td><td style="text-align: left">资金来源<br><code>1</code>：交易账户<br><code>2</code>：资金账户<br><code>3</code>：简单赚币账户</td></tr><tr><td style="text-align: left">recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">定投周期类型<br><code>1</code>：自定义时间<br><code>2</code>：立即触发</td></tr><tr><td style="text-align: left">recurringTimeMinutes</td><td style="text-align: left">String</td><td style="text-align: left">定投时间（分钟），取值范围是 [0,59] 的整数</td></tr></tbody></table>

### GET / 获取定投策略子订单信息

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/tradingBot/recurring/sub-orders`

> 请求示例

```
GET /api/v5/tradingBot/recurring/sub-orders?algoId=560516615079727104
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之前（更旧的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的<code>ordId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为300，默认300条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "accFillSz": "0.045315",
            "algoClOrdId": "",
            "algoId": "560516615079727104",
            "algoOrdType": "recurring",
            "avgPx": "1765.4",
            "cTime": "1679911222200",
            "fee": "-0.0000317205",
            "feeCcy": "ETH",
            "instId": "ETH-USDC",
            "instType": "SPOT",
            "ordId": "560523524230717440",
            "ordType": "market",
            "px": "-1",
            "side": "buy",
            "state": "filled",
            "sz": "80",
            "tag": "",
            "tdMode": "",
            "uTime": "1679911222207"
        },
        {
            "accFillSz": "0.00071526",
            "algoClOrdId": "",
            "algoId": "560516615079727104",
            "algoOrdType": "recurring",
            "avgPx": "27961.6",
            "cTime": "1679911222189",
            "fee": "-0.000000500682",
            "feeCcy": "BTC",
            "instId": "BTC-USDC",
            "instType": "SPOT",
            "ordId": "560523524184580096",
            "ordType": "market",
            "px": "-1",
            "side": "buy",
            "state": "filled",
            "sz": "20",
            "tag": "",
            "tdMode": "",
            "uTime": "1679911222194"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>recurring</code>：定投</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">String</td><td style="text-align: left">子订单ID</td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">uTime</td><td style="text-align: left">String</td><td style="text-align: left">子订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">tdMode</td><td style="text-align: left">String</td><td style="text-align: left">子订单交易模式<br><code>cross</code>：全仓 <code>cash</code>：非保证金</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">子订单类型<br><code>market</code>：市价单<br><code>manual_add_order</code>：手动加仓单</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托数量</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">子订单状态<br><code>canceled</code>：撤单成功<br><code>live</code>：等待成交<br><code>partially_filled</code>：部分成交<br><code>filled</code>：完全成交<br><code>cancelling</code>：撤单中</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">子订单订单方向<br><code>buy</code>：买 <code>sell</code>：卖</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">子订单委托价格<br>市价委托时为"-1"</td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费数量</td></tr><tr><td style="text-align: left">feeCcy</td><td style="text-align: left">String</td><td style="text-align: left">子订单手续费币种</td></tr><tr><td style="text-align: left">avgPx</td><td style="text-align: left">String</td><td style="text-align: left">子订单平均成交价格</td></tr><tr><td style="text-align: left">accFillSz</td><td style="text-align: left">String</td><td style="text-align: left">子订单累计成交数量</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">用户自定义策略ID</td></tr></tbody></table>

### WS / 定投策略委托订单频道

支持定投策略订单的定时推送和事件推送

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "algo-recurring-buy",
        "instType": "SPOT"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "algo-recurring-buy",
        "instType": "SPOT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>algo-recurring-buy</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>ANY</code>：全部</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
            "channel": "algo-recurring-buy",
            "instType": "SPOT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"algo-recurring-buy\", \"instType\" : \"FUTURES\"}]}",
        "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "algo-recurring-buy",
        "instType": "SPOT",
        "uid": "447*******584"
    },
    "data": [{
        "algoClOrdId": "",
        "algoId": "644497312047435776",
        "algoOrdType": "recurring",
        "amt": "100",
        "cTime": "1699932133373",
        "cycles": "0",
        "instType": "SPOT",
        "investmentAmt": "0",
        "investmentCcy": "USDC",
        "mktCap": "0",
        "nextInvestTime": "1699934415300",
        "pTime": "1699933314691",
        "period": "hourly",
        "pnlRatio": "0",
        "recurringDay": "",
        "recurringHour": "1",
        "recurringList": [{
            "avgPx": "0",
            "ccy": "BTC",
            "profit": "0",
            "px": "36482",
            "ratio": "0.2",
            "minPx": "30000",
            "maxPx": "50000",
            "totalAmt": "0"
        }, {
            "avgPx": "0",
            "ccy": "ETH",
            "profit": "0",
            "px": "2057.54",
            "ratio": "0.8",
            "minPx": "",
            "maxPx": "",
            "totalAmt": "0"
        }],
        "recurringTime": "12",
        "recurringTimeType": "1",
        "recurringTimeMinutes": "",
        "source": ["1"],
        "state": "running",
        "stgyName": "stg1",
        "tag": "",
        "timeZone": "8",
        "totalAnnRate": "0",
        "totalPnl": "0",
        "uTime": "1699932136249",
        "tradeQuoteCcy": "USDT"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略ID</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">&gt; algoClOrdId</td><td style="text-align: left">String</td><td style="text-align: left">客户自定义订单ID</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>：现货</td></tr><tr><td style="text-align: left">&gt; cTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单创建时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; uTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单更新时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; algoOrdType</td><td style="text-align: left">String</td><td style="text-align: left">策略订单类型<br><code>recurring</code>：定投</td></tr><tr><td style="text-align: left">&gt; state</td><td style="text-align: left">String</td><td style="text-align: left">订单状态<br><code>running</code>：运行中<br><code>stopping</code>：终止中<br><code>stopped</code>：已停止<br><code>pause</code>: 已暂停</td></tr><tr><td style="text-align: left">&gt; stgyName</td><td style="text-align: left">String</td><td style="text-align: left">策略自定义名称，不超过40个字符</td></tr><tr><td style="text-align: left">&gt; recurringList</td><td style="text-align: left">Array of objects</td><td style="text-align: left">定投信息</td></tr><tr><td style="text-align: left">&gt;&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">定投币种，如 <code>BTC</code></td></tr><tr><td style="text-align: left">&gt;&gt; ratio</td><td style="text-align: left">String</td><td style="text-align: left">定投币种资产占比，如 "0.2"代表占比20%</td></tr><tr><td style="text-align: left">&gt;&gt; minPx</td><td style="text-align: left">String</td><td style="text-align: left">价格区间最低价，<code>""</code> 代表没有限制</td></tr><tr><td style="text-align: left">&gt;&gt; maxPx</td><td style="text-align: left">String</td><td style="text-align: left">价格区间最高价，<code>""</code> 代表没有限制</td></tr><tr><td style="text-align: left">&gt;&gt; totalAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计购入定投币种的数量</td></tr><tr><td style="text-align: left">&gt;&gt; profit</td><td style="text-align: left">String</td><td style="text-align: left">定投收益，单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">&gt;&gt; avgPx</td><td style="text-align: left">String</td><td style="text-align: left">定投均价，计价单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">&gt;&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">当前价格，计价单位为<code>investmentCcy</code></td></tr><tr><td style="text-align: left">&gt; period</td><td style="text-align: left">String</td><td style="text-align: left">周期类型<br><br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">&gt; recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">投资日<br>当周期类型为<code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为<code>weekly</code>，则取值范围是 [1,7] 的整数</td></tr><tr><td style="text-align: left">&gt; recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code>代表每隔<code>1</code>个小时定投</td></tr><tr><td style="text-align: left">&gt; recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数</td></tr><tr><td style="text-align: left">&gt; timeZone</td><td style="text-align: left">String</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code>表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">&gt; amt</td><td style="text-align: left">String</td><td style="text-align: left">每期投入数量</td></tr><tr><td style="text-align: left">&gt; investmentAmt</td><td style="text-align: left">String</td><td style="text-align: left">累计投入数量</td></tr><tr><td style="text-align: left">&gt; investmentCcy</td><td style="text-align: left">String</td><td style="text-align: left">投入数量单位，只能是<code>USDT</code>/<code>USDC</code></td></tr><tr><td style="text-align: left">&gt; nextInvestTime</td><td style="text-align: left">String</td><td style="text-align: left">下一次定投发生的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; totalPnl</td><td style="text-align: left">String</td><td style="text-align: left">总收益</td></tr><tr><td style="text-align: left">&gt; totalAnnRate</td><td style="text-align: left">String</td><td style="text-align: left">总年化</td></tr><tr><td style="text-align: left">&gt; pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">&gt; mktCap</td><td style="text-align: left">String</td><td style="text-align: left">当前总市值，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">&gt; cycles</td><td style="text-align: left">String</td><td style="text-align: left">定投累计轮数</td></tr><tr><td style="text-align: left">&gt; tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr><tr><td style="text-align: left">&gt; pTime</td><td style="text-align: left">String</td><td style="text-align: left">策略订单的推送时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; tradeQuoteCcy</td><td style="text-align: left">String</td><td style="text-align: left">用于交易的计价币种。</td></tr><tr><td style="text-align: left">&gt; recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">定投时间类型</td></tr><tr><td style="text-align: left">&gt; recurringTimeMinutes</td><td style="text-align: left">String</td><td style="text-align: left">自定义定投分钟数</td></tr><tr><td style="text-align: left">&gt; source</td><td style="text-align: left">Array</td><td style="text-align: left">定投来源</td></tr></tbody></table>

### POST / 编辑定投周期

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/amend-recurring-time`

> 请求示例

```
POST /api/v5/tradingBot/recurring/amend-recurring-time
body
{
    "algoId": "2837428373700509696",
    "recurringTimeType": "1",
    "period": "hourly",
    "recurringHour": "8",
    "recurringDay": "1",
    "recurringTime": "11",
    "timeZone": "8"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">recurringTimeType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">定投周期类型<br><code>1</code>：自定义时间<br><code>2</code>：立即触发</td></tr><tr><td style="text-align: left">timeZone</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">时区（UTC），取值范围是 [-12,14] 的整数<br>如 <code>8</code> 表示UTC+8（东8区），北京时间</td></tr><tr><td style="text-align: left">period</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">周期类型<br><code>monthly</code>：月<br><code>weekly</code>：周<br><code>daily</code>：日<br><code>hourly</code>：小时</td></tr><tr><td style="text-align: left">recurringHour</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">小时级别定投的间隔<br><code>1</code>/<code>4</code>/<code>8</code>/<code>12</code><br>如：<code>1</code> 代表每隔 <code>1</code> 个小时定投<br>当 <code>period</code> 为 <code>hourly</code> 时必填</td></tr><tr><td style="text-align: left">recurringDay</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">投资日<br>当周期类型为 <code>monthly</code>，则取值范围是 [1,28] 的整数<br>当周期类型为 <code>weekly</code>，则取值范围是 [1,7] 的整数<br>当周期类型为 <code>daily</code>/<code>hourly</code>，该参数可不填<br>仅在 <code>recurringTimeType</code> 为 <code>1</code> 时需要传</td></tr><tr><td style="text-align: left">recurringTime</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">投资时间，取值范围是 [0,23] 的整数<br>仅在 <code>recurringTimeType</code> 为 <code>1</code> 时需要传</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 编辑定投金额

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/amend-recurring-amount`

> 请求示例

```
POST /api/v5/tradingBot/recurring/amend-recurring-amount
body
{
    "algoId": "2837428373700509696",
    "amount": "20"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">amount</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">编辑后的定投金额，仅支持创建策略时的投资币种</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2837428373700509696",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 手动加仓

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/add-investment`

> 请求示例

```
POST /api/v5/tradingBot/recurring/add-investment
body
{
    "algoId": "2837428373700509696",
    "amount": "20"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">amount</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">加仓投入金额，仅支持创建策略时的投资币种</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2837428373700509696",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 暂停定投策略

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/pause`

> 请求示例

```
POST /api/v5/tradingBot/recurring/pause
body
{
    "algoId": "2837428373700509696"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2837428373700509696",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 重启定投策略

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/restart`

> 请求示例

```
POST /api/v5/tradingBot/recurring/restart
body
{
    "algoId": "2837428373700509696"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2837428373700509696",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

### POST / 编辑价格区间

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/tradingBot/recurring/amend-price-range`

> 请求示例

```
POST /api/v5/tradingBot/recurring/amend-price-range
body
{
    "algoId": "2837428373700509696",
    "recurringList": [
        {
            "ccy": "BTC",
            "minPx": "80000",
            "maxPx": "120000"
        }
    ]
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">recurringList</td><td style="text-align: left">Array</td><td style="text-align: left">是</td><td style="text-align: left">价格区间设置，币种必须在策略定投币种范围内</td></tr><tr><td style="text-align: left">&gt;ccy</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">定投币种</td></tr><tr><td style="text-align: left">&gt;minPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">价格区间最低价，<code>""</code> 代表没有限制</td></tr><tr><td style="text-align: left">&gt;maxPx</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">价格区间最高价，<code>""</code> 代表没有限制</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "algoId": "2837428373700509696",
            "sCode": "0",
            "sMsg": ""
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">策略订单ID</td></tr><tr><td style="text-align: left">sCode</td><td style="text-align: left">String</td><td style="text-align: left">事件执行结果的 code，0 代表成功</td></tr><tr><td style="text-align: left">sMsg</td><td style="text-align: left">String</td><td style="text-align: left">事件执行失败时的 msg</td></tr></tbody></table>

## 跟单

带单 API 交易工作流程如下：  
  

**1\. 申请成为带单交易员**  

*   申请流程可以参考 [如何申请成为交易员](https://www.okx.com/cn/help/11639154398221)；  
    
*   可通过[查看账户配置](/zh/trading-account-rest-api-get-account-configuration)接口的`roleType` 或者 `spotRoleType` 是否为 1，判断当前账户是否为带单交易员。  
    

**2\. 带单合约**  

*   [获取带单产品](/zh/order-book-trading-copy-trading-get-leading-instruments)接口，用于查看平台哪些合约支持带单，以及您开启了哪些合约的带单。对于您未开启带单的合约，依旧可以正常交易，只是不会触发跟单；  
    
*   [交易员修改带单合约](/zh/order-book-trading-copy-trading-post-amend-leading-instruments)接口，初始带单合约在申请带单交易员时进行设置，该接口用于修改您的带单合约。非带单合约修改为带单合约时，该次请求中所有的非带单合约合约不能有持仓或者挂单。  
    

**3\. 开仓**

*   需要通过下单接口和频道进行开仓，包括：[下单](/zh/order-book-trading-trade-post-place-order)接口、[批量下单](/zh/order-book-trading-trade-post-place-multiple-orders)接口、[下单频道](/zh/order-book-trading-trade-ws-place-order)、[批量下单频道](/zh/order-book-trading-trade-ws-place-multiple-orders)。现货带单时，`tdMode` 的值需要指定为`spot_isolated`
*   在买卖模式下，委托的方向必须与现有持仓和挂单保持一致，如果对应产品没有持仓和挂单，可根据自己的需求选择委托方向；
*   开平仓模式下，可根据自己的需求选择开多或开空。

**4\. 平仓**

*   可以通过下单接口和频道进行平仓，支持自定义价格和数量，包括：[下单](/zh/order-book-trading-trade-post-place-order)接口、[批量下单](/zh/order-book-trading-trade-post-place-multiple-orders)接口、[下单频道](/zh/order-book-trading-trade-ws-place-order)、[批量下单频道](/zh/order-book-trading-trade-ws-place-multiple-orders)，也可以通过[市价仓位全平](/zh/order-book-trading-trade-post-close-positions)接口或者[平仓带单](/zh/order-book-trading-copy-trading-post-close-lead-position)接口进行平仓；
*   [市价仓位全平](/zh/order-book-trading-trade-post-close-positions)接口，平掉当前产品下指定的仓位（如：开平模式下，全仓模式下的多仓或空仓），可能包含多个带单；
*   [平仓带单](/zh/order-book-trading-copy-trading-post-close-lead-position)接口，一次仅平仓某一个带单仓位。带单ID（subPosId）为必填参数，需要通过[获取当前带单](/zh/order-book-trading-copy-trading-get-existing-lead-positions)接口获取。

**5\. 止盈止损**

*   可以通过[带单仓位止盈止损](/zh/order-book-trading-copy-trading-post-place-lead-stop-order)接口或者[策略委托下单](/zh/order-book-trading-algo-trading-post-place-algo-order)接口设置止盈止损；
*   [带单仓位止盈止损](/zh/order-book-trading-copy-trading-post-place-lead-stop-order)接口，一次仅为一个带单仓位设置。带单ID（subPosId）为必填参数，需要通过[获取当前带单](/zh/order-book-trading-copy-trading-get-existing-lead-positions)接口获取。
*   [策略委托下单](/zh/order-book-trading-algo-trading-post-place-algo-order)接口，为当前产品下指定的仓位（如：开平模式下，全仓模式下的多仓或空仓）设置，可能包含多个带单；

### GET / 获取当前带单

获取当前未平仓的带单仓位。  

按照开仓时间倒序排列。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/current-subpositions`

> 请求示例

```
GET /api/v5/copytrading/current-subpositions?instId=BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约<br>默认返回所有业务线的信息</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID ，如<code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为500，不填默认返回500条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "algoId": "",
            "ccy": "USDT",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "lever": "3",
            "margin": "12.6417",
            "markPx": "38205.8",
            "mgnMode": "isolated",
            "openAvgPx": "37925.1",
            "openOrdId": "",
            "openTime": "1701231120479",
            "posSide": "net",
            "slOrdPx": "",
            "slTriggerPx": "",
            "subPos": "1",
            "subPosId": "649945658862370816",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "uniqueCode": "25CD5A80241D6FE6",
            "upl": "0.2807",
            "uplRatio": "0.0222042921442527",
            "availSubPos": "1"
        },
        {
            "algoId": "",
            "ccy": "USDT",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "lever": "3",
            "margin": "12.6263333333333333",
            "markPx": "38205.8",
            "mgnMode": "isolated",
            "openAvgPx": "37879",
            "openOrdId": "",
            "openTime": "1701225074786",
            "posSide": "net",
            "slOrdPx": "",
            "slTriggerPx": "",
            "subPos": "1",
            "subPosId": "649920301388038144",
            "tpOrdPx": "",
            "tpTriggerPx": "",
            "uniqueCode": "25CD5A80241D6FE6",
            "upl": "0.3268",
            "uplRatio": "0.0258824150584758",
            "availSubPos": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>long：开平仓模式开多<br>short：开平仓模式开空<br>net：买卖模式（subPos为正代表开多，subPos为负代表开空）</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式，<code>isolated</code>：逐仓 ；<code>cross</code>：全仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">openOrdId</td><td style="text-align: left">String</td><td style="text-align: left">交易员开仓订单号，仅适用于带单仓位</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">openTime</td><td style="text-align: left">String</td><td style="text-align: left">开仓时间</td></tr><tr><td style="text-align: left">subPos</td><td style="text-align: left">String</td><td style="text-align: left">持仓张数</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈触发价</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">止损触发价</td></tr><tr><td style="text-align: left">algoId</td><td style="text-align: left">String</td><td style="text-align: left">止盈止损委托单ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止盈委托价，市价时为-1</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">止损委托价，市价时为-1</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">最新标记价格，仅适用于合约</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识代码</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">availSubPos</td><td style="text-align: left">String</td><td style="text-align: left">可平张数/币数</td></tr></tbody></table>

### GET / 获取历史带单

获取最近三个月的已经平仓的带单仓位，按照`subPosId`倒序排序。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/subpositions-history`

> 请求示例

```
GET /api/v5/copytrading/subpositions-history?instId=BTC-USDT-SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约<br>默认返回所有业务线的信息</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品ID ，如<code>BTC-USDT-SWAP</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "closeAvgPx": "37617.5",
            "closeTime": "1701188587950",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "lever": "3",
            "margin": "37.41",
            "markPx": "38203.4",
            "mgnMode": "isolated",
            "openAvgPx": "37410",
            "openOrdId": "",
            "openTime": "1701184638702",
            "pnl": "0.6225",
            "pnlRatio": "0.0166399358460306",
            "posSide": "net",
            "profitSharingAmt": "0.0407967",
            "subPos": "3",
            "closeSubPos": "2",
            "type": "1",
            "subPosId": "649750700213698561",
            "uniqueCode": "25CD5A80241D6FE6"
        },
        {
            "ccy": "USDT",
            "closeAvgPx": "37617.5",
            "closeTime": "1701188587950",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "lever": "3",
            "margin": "24.94",
            "markPx": "38203.4",
            "mgnMode": "isolated",
            "openAvgPx": "37410",
            "openOrdId": "",
            "openTime": "1701184635381",
            "pnl": "0.415",
            "pnlRatio": "0.0166399358460306",
            "posSide": "net",
            "profitSharingAmt": "0.0271978",
            "subPos": "2",
            "closeSubPos": "2",
            "type": "2",
            "subPosId": "649750686292803585",
            "uniqueCode": "25CD5A80241D6FE6"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>long：开平仓模式开多<br>short：开平仓模式开空<br>net：买卖模式（subPos为正代表开多，subPos为负代表开空）</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式，<code>isolated</code>：逐仓 ；<code>cross</code>：全仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">openOrdId</td><td style="text-align: left">String</td><td style="text-align: left">交易员开仓订单号，仅适用于带单仓位</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">openTime</td><td style="text-align: left">String</td><td style="text-align: left">开仓时间</td></tr><tr><td style="text-align: left">subPos</td><td style="text-align: left">String</td><td style="text-align: left">持仓张数</td></tr><tr><td style="text-align: left">closeTime</td><td style="text-align: left">String</td><td style="text-align: left">平仓时间(最近一次平仓的时间)</td></tr><tr><td style="text-align: left">closeAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">平仓均价</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益额</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">最新标记价格，仅适用于合约</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识代码</td></tr><tr><td style="text-align: left">profitSharingAmt</td><td style="text-align: left">String</td><td style="text-align: left">跟单分润额，仅适用于跟单，已经废弃。</td></tr><tr><td style="text-align: left">closeSubPos</td><td style="text-align: left">String</td><td style="text-align: left">已平仓量</td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">平仓类型<br><code>1</code>：部分平仓;<br><code>2</code>：完全平仓;</td></tr></tbody></table>

### POST / 带单或跟单仓位止盈止损

为当前未平仓的带单仓位设置止盈止损。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/algo-order`

> 请求示例

```
POST /api/v5/copytrading/algo-order
body
{
    "subPosId": "518541406042591232",
    "tpTriggerPx": "10000"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约，默认值</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单或者跟单仓位ID</td></tr><tr><td style="text-align: left">tpTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止盈触发价，tpTriggerPx 和 slTriggerPx 至少需要填写一个<br>如果止盈触发价为0，那代表删除止盈。</td></tr><tr><td style="text-align: left">slTriggerPx</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">止损触发价，<br>如果止损触发价为0，那代表删除止损</td></tr><tr><td style="text-align: left">tpOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈委托价<br>委托价格为-1时，执行市价止盈，默认为市价止盈<br>仅适用于现货交易员</td></tr><tr><td style="text-align: left">slOrdPx</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损委托价<br>委托价格为-1时，执行市价止损，默认为市价止损<br>仅适用于现货交易员</td></tr><tr><td style="text-align: left">tpTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止盈触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为last</td></tr><tr><td style="text-align: left">slTriggerPxType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">止损触发价类型<br><code>last</code>：最新价格<br><code>index</code>：指数价格<br><code>mark</code>：标记价格<br>默认为last</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">subPosType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">数据的类型<br><code>lead</code>: 带单，默认值<br><code>copy</code>: 跟单</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "subPosId": "518560559046594560",
            "tag":""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单或者跟单仓位ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### POST / 平仓带单

一次仅可平仓一个带单仓位。  
`subPosId` 为必填参数，需要通过[交易员获取当前带单](/zh/order-book-trading-copy-trading-get-existing-lead-positions)接口获取。

#### 限速：20次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/close-subposition`

> 请求示例

```
POST /api/v5/copytrading/close-subposition
body
{
    "subPosId": "518541406042591232"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约，默认值</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr><tr><td style="text-align: left">ordType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单类型<br><code>market</code>：市价单<br><code>limit</code>：限价单<br>默认为市价单</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">委托价格，仅适用于<code>limit</code>类型的订单，且仅适用于现货交易员<br>委托价格为 0 代表撤销挂单<br>已经设置了限价单，仍为该条目设置价格时，视为改单。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "subPosId": "518560559046594560",
            "tag":""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### GET / 获取带单产品

获取平台支持带单的产品，以及获取带单员正在带单的产品

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/instruments`

> 请求示例

```
GET /api/v5/copytrading/instruments
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约，默认值</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "enabled": true,
            "instId": "BTC-USDT-SWAP"
        },
        {
            "enabled": true,
            "instId": "ETH-USDT-SWAP"
        },
        {
            "enabled": false,
            "instId": "ADA-USDT-SWAP"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">enabled</td><td style="text-align: left">Boolean</td><td style="text-align: left">是否设置了带单 <code>true</code> 或 <code>false</code></td></tr></tbody></table>

### POST / 交易员修改带单产品

交易员修改带单产品的设置。初始带单产品在申请带单交易员时进行设置。  
非带单产品修改为带单产品时，该次请求中所有的非带单产品不能有持仓或者挂单。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/set-instruments`

> 请求示例

```
POST /api/v5/copytrading/set-instruments
body
{
    "instId": "BTC-USDT-SWAP,ETH-USDT-SWAP"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约，默认值</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 BTC-USDT-SWAP，多个产品用半角逗号隔开</td></tr></tbody></table>

::: tip
如果进行多个产品带单，\`instId\`传值需要包括所有将要带单的产品，因为当前请求设置成功后，之前的设置会被覆盖掉
:::

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "enabled": true,
            "instId": "BTC-USDT-SWAP"
        },
        {
            "enabled": true,
            "instId": "ETH-USDT-SWAP"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品id， 如 BTC-USDT-SWAP</td></tr><tr><td style="text-align: left">enabled</td><td style="text-align: left">Boolean</td><td style="text-align: left"><code>true</code> 或 <code>false</code><br><code>true</code> 代表设置成功<br><code>false</code> 代表设置失败</td></tr></tbody></table>

### GET / 交易员历史分润明细

交易员获取最近三个月的分润明细。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/profit-sharing-details`

> 请求示例

```
GET /api/v5/copytrading/profit-sharing-details?limit=2
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约<br>默认返回所有业务线的信息</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>profitSharingId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>profitSharingId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "nickName": "Potato",
            "profitSharingAmt": "0.00536",
            "profitSharingId": "148",
            "portLink": "",
            "ts": "1723392000000",
            "instType": "SWAP"
        },
        {
            "ccy": "USDT",
            "nickName": "Apple",
            "profitSharingAmt": "0.00336",
            "profitSharingId": "20",
            "portLink": "",
            "ts": "1723392000000",
            "instType": "SWAP"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">分润币种</td></tr><tr><td style="text-align: left">profitSharingAmt</td><td style="text-align: left">String</td><td style="text-align: left">分润额，没有分润时，默认返回0</td></tr><tr><td style="text-align: left">nickName</td><td style="text-align: left">String</td><td style="text-align: left">跟单人的昵称</td></tr><tr><td style="text-align: left">profitSharingId</td><td style="text-align: left">String</td><td style="text-align: left">分润ID</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">portLink</td><td style="text-align: left">String</td><td style="text-align: left">跟单员头像的链接地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">分润时间</td></tr></tbody></table>

### GET / 交易员历史分润汇总

交易员获取自入驻平台以来，累计获得的总分润金额。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/total-profit-sharing`

> 请求示例

```
GET /api/v5/copytrading/total-profit-sharing
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约<br>默认返回所有业务线的信息</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "totalProfitSharingAmt": "0.6584928",
            "instType": "SWAP"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">分润币种</td></tr><tr><td style="text-align: left">totalProfitSharingAmt</td><td style="text-align: left">String</td><td style="text-align: left">历史分润汇总</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr></tbody></table>

### GET / 交易员待分润明细

交易员获取预计在下一个周期分到的分润金额明细。  
当有跟单仓位平仓时，待分润明细会进行更新。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/unrealized-profit-sharing-details`

> 请求示例

```
GET /api/v5/copytrading/unrealized-profit-sharing-details
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约<br>默认返回所有业务线的信息</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "nickName": "Potato",
            "portLink": "",
            "ts": "1669901824779",
            "unrealizedProfitSharingAmt": "0.455472",
            "instType": "SWAP"
        },
        {
            "ccy": "USDT",
            "nickName": "Apple",
            "portLink": "",
            "ts": "1669460210113",
            "unrealizedProfitSharingAmt": "0.033608",
            "instType": "SWAP"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">分润币种，如：<code>USDT</code></td></tr><tr><td style="text-align: left">unrealizedProfitSharingAmt</td><td style="text-align: left">String</td><td style="text-align: left">待分润额</td></tr><tr><td style="text-align: left">nickName</td><td style="text-align: left">String</td><td style="text-align: left">跟单人昵称</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">portLink</td><td style="text-align: left">String</td><td style="text-align: left">跟单员头像的链接地址</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间</td></tr></tbody></table>

### GET / 交易员待分润汇总

交易员获取待分润汇总。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/total-unrealized-profit-sharing`

> 请求示例

```
GET /api/v5/copytrading/total-unrealized-profit-sharing
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SWAP：永续合约，默认值</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "profitSharingTs": "1705852800000",
            "totalUnrealizedProfitSharingAmt": "0.114402985553185"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">profitSharingTs</td><td style="text-align: left">String</td><td style="text-align: left">当前周期待分润总额的结算时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">totalUnrealizedProfitSharingAmt</td><td style="text-align: left">String</td><td style="text-align: left">待分润总额</td></tr></tbody></table>

### POST / 修改分润比例

修改分润比例

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/amend-profit-sharing-ratio`

> 请求示例

```
POST /api/v5/copytrading/amend-profit-sharing-ratio
body
{
    "instType": "SWAP",
    "profitSharingRatio": "0.1"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">分润比例。0.1 代表10%</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "result": true
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">设置结果<br><code>true</code>：设置成功</td></tr></tbody></table>

### GET / 查看账户配置信息

获取跟单交易和带单交易相关的账户配置信息

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/config`

> 请求示例

```
GET /api/v5/copytrading/config
```

#### 请求参数

无

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "copyTraderNum": "1",
                    "instType": "SWAP",
                    "maxCopyTraderNum": "100",
                    "profitSharingRatio": "0",
                    "roleType": "1"
                },
                {
                    "copyTraderNum": "",
                    "instType": "SPOT",
                    "maxCopyTraderNum": "",
                    "profitSharingRatio": "",
                    "roleType": "0"
                }
            ],
            "nickName": "155***9957",
            "portLink": "",
            "uniqueCode": "5506D3681454A304"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识代码</td></tr><tr><td style="text-align: left">nickName</td><td style="text-align: left">String</td><td style="text-align: left">昵称</td></tr><tr><td style="text-align: left">portLink</td><td style="text-align: left">String</td><td style="text-align: left">头像的链接地址</td></tr><tr><td style="text-align: left">details</td><td style="text-align: left">Array of objects</td><td style="text-align: left">详情</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br><code>SPOT</code>: 币币<br><code>SWAP</code>: 永续合约</td></tr><tr><td style="text-align: left">&gt; roleType</td><td style="text-align: left">String</td><td style="text-align: left">用户角色<br><code>0</code>：普通用户<br><code>1</code>：带单者<br><code>2</code>：跟单者</td></tr><tr><td style="text-align: left">&gt; profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例，仅适用于带单员，0.1 代表 10%，否则为""</td></tr><tr><td style="text-align: left">&gt; maxCopyTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">最大跟单人数，仅适用于带单员</td></tr><tr><td style="text-align: left">&gt; copyTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">当前跟单人数，仅适用于带单员</td></tr></tbody></table>

### POST / 首次跟单设置

跟随某一交易员的首次设置，停止跟单后需先进行首次设置；  

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/first-copy-settings`

> 请求示例

```
POST /api/v5/copytrading/first-copy-settings
body
{
    "instType": "SWAP",
    "uniqueCode": "25CD5A80241D6FE6",
    "copyMgnMode": "cross",
    "copyInstIdType": "copy",
    "copyMode": "ratio_copy",
    "copyRatio": "1",
    "copyTotalAmt": "500",
    "subPosCloseType": "copy_close"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">copyMgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单时的保证金模式<br><code>cross</code>: 全仓；<br><code>isolated</code>: 逐仓；<br><code>copy</code>: 跟随带单员</td></tr><tr><td style="text-align: left">copyInstIdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单合约设置的类型<br><code>custom</code>: 用户自定义，instId 必填；<br><code>copy</code>: 跟随交易员，自动同步交易员的合约变更</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品 ID<br>可传入多条，以逗号区分</td></tr><tr><td style="text-align: left">copyMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跟单模式<br><code>fixed_amount</code>: 固定金额跟单，<code>copyAmt</code>必填；<br><code>ratio_copy</code>: 比例跟单，<code>copyRatio</code>必填<br>默认是<code>fixed_amount</code></td></tr><tr><td style="text-align: left">copyTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单该交易员投入的最大跟单金额，单位为USDT。<br>超过该金额后将不再触发跟单行为</td></tr><tr><td style="text-align: left">copyAmt</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">单笔跟随金额，单位为USDT</td></tr><tr><td style="text-align: left">copyRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">跟单比例</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单笔止盈百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单笔止损百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">slTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跟单止损总金额，单位为USDT<br>净损失达到该金额时，将自动解除跟单关系</td></tr><tr><td style="text-align: left">subPosCloseType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">剩余仓位处理方式<br><code>market_close</code>: 立即市价全平<br><code>copy_close</code>：跟随交易员平仓<br><code>manual_close</code>: 手动处理<br>默认为 <code>copy_close</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "result": true
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">设置结果<br><code>true</code>：设置成功</td></tr></tbody></table>

### POST / 修改跟单设置

跟随某一交易员，完成首次设置后，修改设置时，需要使用该接口  

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/amend-copy-settings`

> 请求示例

```
POST /api/v5/copytrading/amend-copy-settings
body
{
    "instType": "SWAP",
    "uniqueCode": "25CD5A80241D6FE6",
    "copyMgnMode": "cross",
    "copyInstIdType": "copy",
    "copyMode": "ratio_copy",
    "copyRatio": "1",
    "copyTotalAmt": "500",
    "subPosCloseType": "copy_close"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">copyMgnMode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单时的保证金模式<br><code>cross</code>: 全仓；<br><code>isolated</code>: 逐仓；<br><code>copy</code>: 跟随带单员</td></tr><tr><td style="text-align: left">copyInstIdType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单合约设置的类型<br><code>custom</code>: 用户自定义，instId 必填；<br><code>copy</code>: 跟随交易员，自动同步交易员的合约变更</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品 ID<br>可传入多条，以逗号区分</td></tr><tr><td style="text-align: left">copyMode</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跟单模式<br><code>fixed_amount</code>: 固定金额跟单，<code>copyAmt</code>必填；<br><code>ratio_copy</code>: 比例跟单，<code>copyRatio</code>必填<br>默认是<code>fixed_amount</code></td></tr><tr><td style="text-align: left">copyTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">跟单该交易员投入的最大跟单金额，单位为USDT。<br>超过该金额后将不再触发跟单行为</td></tr><tr><td style="text-align: left">copyAmt</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">单笔跟随金额，单位为USDT</td></tr><tr><td style="text-align: left">copyRatio</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">跟单比例</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单笔止盈百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">单笔止损百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">slTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">跟单止损总金额，单位为USDT<br>净损失达到该金额时，将自动解除跟单关系</td></tr><tr><td style="text-align: left">subPosCloseType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">剩余仓位处理方式<br><code>market_close</code>: 立即市价全平<br><code>copy_close</code>：跟随交易员平仓<br><code>manual_close</code>: 手动处理<br>默认为 <code>copy_close</code></td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">订单标签<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "result": true
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">设置结果<br><code>true</code>：设置成功</td></tr></tbody></table>

### POST / 停止跟单

该接口用来停止跟单  

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/copytrading/stop-copy-trading`

> 请求示例

```
POST /api/v5/copytrading/stop-copy-trading
body
{
    "instType": "SWAP",
    "uniqueCode": "25CD5A80241D6FE6",
    "subPosCloseType": "manual_close"
}
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">subPosCloseType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">剩余仓位处理方式，有相关的跟单条目时必填<br><code>market_close</code>: 立即市价全平<br><code>copy_close</code>：跟随交易员平仓<br><code>manual_close</code>: 手动处理<br></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "result": true
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">Boolean</td><td style="text-align: left">设置结果<br><code>true</code>：设置成功</td></tr></tbody></table>

### GET / 获取跟单设置

获取针对某个交易员的跟单设置

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/copy-settings`

> 请求示例

```
GET /api/v5/copytrading/copy-settings?instType=SWAP&uniqueCode=25CD5A80241D6FE6
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "copyAmt": "",
            "copyInstIdType": "copy",
            "copyMgnMode": "isolated",
            "copyMode": "ratio_copy",
            "copyRatio": "1",
            "copyState": "1",
            "copyTotalAmt": "500",
            "instIds": [
                {
                    "enabled": "1",
                    "instId": "ADA-USDT-SWAP"
                },
                {
                    "enabled": "1",
                    "instId": "YFII-USDT-SWAP"
                }
            ],
            "slRatio": "",
            "slTotalAmt": "",
            "subPosCloseType": "copy_close",
            "tpRatio": "",
            "tag": ""
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">copyMode</td><td style="text-align: left">String</td><td style="text-align: left">跟单模式<br><code>fixed_amount</code>: 固定金额跟单<br><code>ratio_copy</code>: 比例跟单</td></tr><tr><td style="text-align: left">copyAmt</td><td style="text-align: left">String</td><td style="text-align: left">单笔跟随金额，单位为 USDT</td></tr><tr><td style="text-align: left">copyRatio</td><td style="text-align: left">String</td><td style="text-align: left">跟单比例</td></tr><tr><td style="text-align: left">copyTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">跟单该交易员投入的最大跟单金额，单位为USDT</td></tr><tr><td style="text-align: left">tpRatio</td><td style="text-align: left">String</td><td style="text-align: left">单笔止盈百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">slRatio</td><td style="text-align: left">String</td><td style="text-align: left">单笔止损百分比，0.1 代表10%</td></tr><tr><td style="text-align: left">copyInstIdType</td><td style="text-align: left">String</td><td style="text-align: left">跟单合约设置的类型<br><code>custom</code>: 用户自定义<br><code>copy</code>: 跟随交易员，自动同步交易员的合约变更</td></tr><tr><td style="text-align: left">instIds</td><td style="text-align: left">Array of objects</td><td style="text-align: left">可跟单的合约列表，会返回交易员所有带单合约</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">&gt; enabled</td><td style="text-align: left">String</td><td style="text-align: left">是否在跟单<br><code>0</code>: 没有在跟单 <code>1</code>: 在跟单</td></tr><tr><td style="text-align: left">slTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">跟单止损总金额，单位为 USDT</td></tr><tr><td style="text-align: left">subPosCloseType</td><td style="text-align: left">String</td><td style="text-align: left">剩余仓位处理方式<br><code>market_close</code>: 立即市价全平<br><code>copy_close</code>：跟随交易员平仓<br><code>manual_close</code>: 手动处理</td></tr><tr><td style="text-align: left">copyMgnMode</td><td style="text-align: left">String</td><td style="text-align: left">跟单时的保证金模式<br><code>cross</code>: 全仓；<br><code>isolated</code>: 逐仓；<br><code>copy</code>: 跟随带单员</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">copyState</td><td style="text-align: left">String</td><td style="text-align: left">当前跟单状态<br><code>0</code>: 没在跟单<br><code>1</code>：在跟单</td></tr><tr><td style="text-align: left">tag</td><td style="text-align: left">String</td><td style="text-align: left">订单标签</td></tr></tbody></table>

### GET / 获取我的交易员

获取当前跟随的交易员

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/copytrading/current-lead-traders`

> 请求示例

```
GET /api/v5/copytrading/current-lead-traders?instType=SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "beginCopyTime": "1701224821936",
            "ccy": "USDT",
            "copyTotalAmt": "500",
            "copyTotalPnl": "0",
            "leadMode": "public",
            "margin": "1.89395",
            "nickName": "Trader9527",
            "portLink": "",
            "profitSharingRatio": "0.08",
            "todayPnl": "0",
            "uniqueCode": "25CD5A80241D6FE6",
            "upl": "0"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">portLink</td><td style="text-align: left">String</td><td style="text-align: left">头像</td></tr><tr><td style="text-align: left">nickName</td><td style="text-align: left">String</td><td style="text-align: left">昵称</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">跟单交易占用的保证金</td></tr><tr><td style="text-align: left">copyTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">跟单员设置的跟单总金额</td></tr><tr><td style="text-align: left">copyTotalPnl</td><td style="text-align: left">String</td><td style="text-align: left">跟单总收益 (USDT)</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">带单员唯一标识代码</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">profitSharingRatio</td><td style="text-align: left">String</td><td style="text-align: left">分润比例，0.1 代表 10%</td></tr><tr><td style="text-align: left">beginCopyTime</td><td style="text-align: left">String</td><td style="text-align: left">跟单开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现盈亏</td></tr><tr><td style="text-align: left">todayPnl</td><td style="text-align: left">String</td><td style="text-align: left">今日已实现收益</td></tr><tr><td style="text-align: left">leadMode</td><td style="text-align: left">String</td><td style="text-align: left">带单模式<br><code>public</code>: 公开模式<br><code>private</code>: 私域模式</td></tr></tbody></table>

### GET / 获取跟单配置信息

公共接口，获取跟单设置时的参数配置信息

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-config`

> 请求示例

```
GET /api/v5/copytrading/public-config?instType=SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "maxCopyAmt": "1000",
            "maxCopyRatio": "100",
            "maxCopyTotalAmt": "30000",
            "maxSlRatio": "0.75",
            "maxTpRatio": "1.5",
            "minCopyAmt": "20",
            "minCopyRatio": "0.01"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">maxCopyAmt</td><td style="text-align: left">String</td><td style="text-align: left">固定金额跟单时，单笔最大跟随金额</td></tr><tr><td style="text-align: left">minCopyAmt</td><td style="text-align: left">String</td><td style="text-align: left">固定金额跟单时，单笔最小跟随金额</td></tr><tr><td style="text-align: left">maxCopyTotalAmt</td><td style="text-align: left">String</td><td style="text-align: left">最大跟单金额（针对单个带单员），最小跟单金额同<code>minCopyAmt</code></td></tr><tr><td style="text-align: left">minCopyRatio</td><td style="text-align: left">String</td><td style="text-align: left">比例跟单的单笔最小比率</td></tr><tr><td style="text-align: left">maxCopyRatio</td><td style="text-align: left">String</td><td style="text-align: left">比例跟单的单笔最大比率</td></tr><tr><td style="text-align: left">maxTpRatio</td><td style="text-align: left">String</td><td style="text-align: left">单笔最大止盈比率，最小为 0</td></tr><tr><td style="text-align: left">maxSlRatio</td><td style="text-align: left">String</td><td style="text-align: left">单笔最大止损比率，最小为 0</td></tr></tbody></table>

### GET / 获取交易员排名

公共接口，获取交易员排名信息。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-lead-traders`

> 请求示例

```
GET /api/v5/copytrading/public-lead-traders?instType=SWAP
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">sortType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排名类型<br><code>overview</code>: 综合排序，默认值<br><code>pnl</code>: 按照交易员收益额排序<br><code>aum</code>: 按照带单规模排序<br><code>win_ratio</code>: 胜率<br><code>pnl_ratio</code>: 收益率<br><code>current_copy_trader_pnl</code>: 当前跟单人的收益额</td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易员的状态<br><code>0</code>: 所有交易员，默认值，包括有空缺和没有空缺<br><code>1</code>: 有空缺的交易员</td></tr><tr><td style="text-align: left">minLeadDays</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">最短带单时长<br><code>1</code>: 7 天<br><code>2</code>: 30 天<br><code>3</code>: 90 天<br><code>4</code>: 180天</td></tr><tr><td style="text-align: left">minAssets</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易员资产范围的最小值，单位为 USDT</td></tr><tr><td style="text-align: left">maxAssets</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易员资产范围的最大值，单位为 USDT</td></tr><tr><td style="text-align: left">minAum</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">带单规模的最小值，单位为 USDT</td></tr><tr><td style="text-align: left">maxAum</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">带单规模的最大值，单位为 USDT</td></tr><tr><td style="text-align: left">dataVer</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">排名数据的版本，14 位数字，如：20231010182400，主要在分页时使用<br>每10分钟生成一版，仅保留最新的5个版本<br>默认使用最近的版本；不存在时不会报错，会使用最近的版本。</td></tr><tr><td style="text-align: left">page</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">查询页数</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为 20，不填默认返回 10 条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "dataVer": "20231129213200",
            "ranks": [
                {
                    "accCopyTraderNum": "3536",
                    "aum": "1509265.3238761567721365",
                    "ccy": "USDT",
                    "copyState": "0",
                    "copyTraderNum": "999",
                    "leadDays": "156",
                    "maxCopyTraderNum": "1000",
                    "nickName": "Crypto to the moon",
                    "pnl": "48805.1105999999972258",
                    "pnlRatio": "1.6898",
                    "pnlRatios": [
                        {
                            "beginTs": "1701187200000",
                            "pnlRatio": "1.6744"
                        },
                        {
                            "beginTs": "1700755200000",
                            "pnlRatio": "1.649"
                        }
                    ],
                    "portLink": "https://static.okx.com/cdn/okex/users/headimages/20230624/f49a683aaf5949ea88b01bbc771fb9fc",
                    "traderInsts": [
                        "ICP-USDT-SWAP",
                        "MINA-USDT-SWAP"

                    ],
                    "uniqueCode": "540D011FDACCB47A",
                    "winRatio": "0.6957"
                }
            ],
            "totalPage": "1"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">dataVer</td><td style="text-align: left">String</td><td style="text-align: left">排名数据的版本</td></tr><tr><td style="text-align: left">totalPage</td><td style="text-align: left">String</td><td style="text-align: left">总的页数</td></tr><tr><td style="text-align: left">ranks</td><td style="text-align: left">Array of objects</td><td style="text-align: left">交易员排名信息</td></tr><tr><td style="text-align: left">&gt; aum</td><td style="text-align: left">String</td><td style="text-align: left">带单规模，单位为USDT</td></tr><tr><td style="text-align: left">&gt; copyState</td><td style="text-align: left">String</td><td style="text-align: left">当前跟单状态<br><code>0</code>: 没在跟单<br><code>1</code>：在跟单</td></tr><tr><td style="text-align: left">&gt; maxCopyTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">最大跟单人数</td></tr><tr><td style="text-align: left">&gt; copyTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">跟单人数</td></tr><tr><td style="text-align: left">&gt; accCopyTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">累计跟单人数</td></tr><tr><td style="text-align: left">&gt; portLink</td><td style="text-align: left">String</td><td style="text-align: left">头像</td></tr><tr><td style="text-align: left">&gt; nickName</td><td style="text-align: left">String</td><td style="text-align: left">昵称</td></tr><tr><td style="text-align: left">&gt; ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr><tr><td style="text-align: left">&gt; uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识码</td></tr><tr><td style="text-align: left">&gt; winRatio</td><td style="text-align: left">String</td><td style="text-align: left">胜率，0.1 代表 10%</td></tr><tr><td style="text-align: left">&gt; leadDays</td><td style="text-align: left">String</td><td style="text-align: left">带单天数</td></tr><tr><td style="text-align: left">&gt; traderInsts</td><td style="text-align: left">Array of strings</td><td style="text-align: left">交易员带单的合约列表</td></tr><tr><td style="text-align: left">&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">近90日交易员收益，单位为 USDT</td></tr><tr><td style="text-align: left">&gt; pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">近90日交易员收益率，0.1 代表 10%</td></tr><tr><td style="text-align: left">&gt; pnlRatios</td><td style="text-align: left">Array of objects</td><td style="text-align: left">收益率数据</td></tr><tr><td style="text-align: left">&gt;&gt; beginTs</td><td style="text-align: left">String</td><td style="text-align: left">当天收益率的开始时间</td></tr><tr><td style="text-align: left">&gt;&gt; pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">当天收益率</td></tr></tbody></table>

### GET / 获取交易员收益周表现

公共接口，获取交易员最近12周的收益表现，按时间倒序返回

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-weekly-pnl`

> 请求示例

```
GET /api/v5/copytrading/public-weekly-pnl?instType=SWAP&uniqueCode=D9ADEAB33AE9EABD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "beginTs": "1701014400000",
            "pnl": "-2.8428",
            "pnlRatio": "-0.0106"
        },
        {
            "beginTs": "1700409600000",
            "pnl": "81.8446",
            "pnlRatio": "0.3036"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">beginTs</td><td style="text-align: left">String</td><td style="text-align: left">当周收益率的开始时间</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">当周收益额</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">当周收益率</td></tr></tbody></table>

### GET / 获取交易员收益日表现

公共接口，获取交易员每日的收益表现，按时间倒序返回

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-pnl`

> 请求示例

```
GET /api/v5/copytrading/public-pnl?instType=SWAP&uniqueCode=D9ADEAB33AE9EABD&lastDays=1
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">lastDays</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最近天数<br><code>1</code>: 近 7 天<br><code>2</code>: 近 30 天<br><code>3</code>: 近 90 天，<br><code>4</code>: 近 365 天</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "beginTs": "1701100800000",
            "pnl": "97.3309",
            "pnlRatio": "0.3672"
        },
        {
            "beginTs": "1701014400000",
            "pnl": "96.7755",
            "pnlRatio": "0.3651"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">beginTs</td><td style="text-align: left">String</td><td style="text-align: left">当天开始时间</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">累计收益额</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">累计收益率</td></tr></tbody></table>

### GET / 获取交易员带单情况

公共接口，获取交易员带单情况。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-stats`

> 请求示例

```
GET /api/v5/copytrading/public-stats?instType=SWAP&uniqueCode=D9ADEAB33AE9EABD&lastDays=1
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">lastDays</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">最近天数<br><code>1</code>: 近 7 天<br><code>2</code>: 近 30 天<br><code>3</code>: 近 90 天，<br><code>4</code>: 近 365 天</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "avgSubPosNotional": "213.1038",
            "ccy": "USDT",
            "curCopyTraderPnl": "96.8071",
            "investAmt": "265.095252476476294",
            "lossDays": "1",
            "profitDays": "2",
            "winRatio": "0.6667"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">winRatio</td><td style="text-align: left">String</td><td style="text-align: left">胜率</td></tr><tr><td style="text-align: left">profitDays</td><td style="text-align: left">String</td><td style="text-align: left">盈利天数</td></tr><tr><td style="text-align: left">lossDays</td><td style="text-align: left">String</td><td style="text-align: left">亏损天数</td></tr><tr><td style="text-align: left">curCopyTraderPnl</td><td style="text-align: left">String</td><td style="text-align: left">当前跟随者收益 (USDT)</td></tr><tr><td style="text-align: left">avgSubPosNotional</td><td style="text-align: left">String</td><td style="text-align: left">平均仓位价值 (USDT)</td></tr><tr><td style="text-align: left">investAmt</td><td style="text-align: left">String</td><td style="text-align: left">带单本金 (USDT)</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">保证金币种</td></tr></tbody></table>

### GET / 获取交易员币种偏好

公共接口，获取交易员币种偏好，返回结果按 ratio 从大到小排序

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-preference-currency`

> 请求示例

```
GET /api/v5/copytrading/public-preference-currency?instType=SWAP&uniqueCode=CB4594A3BB5D3538
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "ETH",
            "ratio": "0.8881"
        },
        {
            "ccy": "BTC",
            "ratio": "0.0666"
        },
        {
            "ccy": "YFII",
            "ratio": "0.0453"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">ratio</td><td style="text-align: left">String</td><td style="text-align: left">占比，0.1 代表 10%</td></tr></tbody></table>

### GET / 获取交易员当前带单

公共接口，获取交易员当前带单。  

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-current-subpositions`

> 请求示例

```
GET /api/v5/copytrading/public-current-subpositions?instType=SWAP&uniqueCode=D9ADEAB33AE9EABD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SWAP：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易员唯一标识码</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "instId": "ETH-USDT-SWAP",
            "instType": "SWAP",
            "lever": "5",
            "margin": "16.23304",
            "markPx": "2027.31",
            "mgnMode": "isolated",
            "openAvgPx": "2029.13",
            "openTime": "1701144639417",
            "posSide": "short",
            "subPos": "4",
            "subPosId": "649582930998104064",
            "uniqueCode": "D9ADEAB33AE9EABD",
            "upl": "0.0728",
            "uplRatio": "0.0044846806266725"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>long：开平仓模式开多<br>short：开平仓模式开空<br>net：买卖模式（subPos为正代表开多，subPos为负代表开空）</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式，<code>isolated</code>：逐仓 ；<code>cross</code>：全仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">openTime</td><td style="text-align: left">String</td><td style="text-align: left">开仓时间</td></tr><tr><td style="text-align: left">subPos</td><td style="text-align: left">String</td><td style="text-align: left">持仓张数</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金</td></tr><tr><td style="text-align: left">upl</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益</td></tr><tr><td style="text-align: left">uplRatio</td><td style="text-align: left">String</td><td style="text-align: left">未实现收益率</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">最新标记价格，仅适用于合约</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识代码</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr></tbody></table>

### GET / 获取交易员历史带单

公共接口，获取交易员最近三个月的已经平仓的带单仓位，按照`subPosId`倒序排序。

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-subpositions-history`

> 请求示例

```
GET /api/v5/copytrading/public-subpositions-history?instType=SWAP&uniqueCode=9A8534AB09862774
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br>SWAP：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易员唯一标识码<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之前（更旧的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此id之后（更新的数据）的分页内容，传的值为对应接口的<code>subPosId</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "closeAvgPx": "28385.9",
            "closeTime": "1697709137162",
            "instId": "BTC-USDT-SWAP",
            "instType": "SWAP",
            "lever": "20",
            "margin": "4.245285",
            "mgnMode": "isolated",
            "openAvgPx": "28301.9",
            "openTime": "1697698048031",
            "pnl": "0.252",
            "pnlRatio": "0.05935997229868",
            "posSide": "long",
            "subPos": "3",
            "subPosId": "635126416883355648",
            "uniqueCode": "9A8534AB09862774"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位ID</td></tr><tr><td style="text-align: left">posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br>long：开平仓模式开多<br>short：开平仓模式开空<br>net：买卖模式（subPos为正代表开多，subPos为负代表开空）</td></tr><tr><td style="text-align: left">mgnMode</td><td style="text-align: left">String</td><td style="text-align: left">保证金模式，<code>isolated</code>：逐仓 ；<code>cross</code>：全仓</td></tr><tr><td style="text-align: left">lever</td><td style="text-align: left">String</td><td style="text-align: left">杠杆倍数</td></tr><tr><td style="text-align: left">openAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">开仓均价</td></tr><tr><td style="text-align: left">openTime</td><td style="text-align: left">String</td><td style="text-align: left">开仓时间</td></tr><tr><td style="text-align: left">subPos</td><td style="text-align: left">String</td><td style="text-align: left">持仓张数</td></tr><tr><td style="text-align: left">closeTime</td><td style="text-align: left">String</td><td style="text-align: left">平仓时间(最近一次平仓的时间)</td></tr><tr><td style="text-align: left">closeAvgPx</td><td style="text-align: left">String</td><td style="text-align: left">平仓均价</td></tr><tr><td style="text-align: left">pnl</td><td style="text-align: left">String</td><td style="text-align: left">收益额</td></tr><tr><td style="text-align: left">pnlRatio</td><td style="text-align: left">String</td><td style="text-align: left">收益率</td></tr><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型<br>SPOT：币币<br>SWAP：永续合约</td></tr><tr><td style="text-align: left">margin</td><td style="text-align: left">String</td><td style="text-align: left">保证金</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">币种</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识代码</td></tr></tbody></table>

### GET / 获取跟单人信息

公共接口，获取交易员的跟单人信息，按收益从高到低返回

#### 限速：5次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/copytrading/public-copy-traders`

> 请求示例

```
GET /api/v5/copytrading/public-copy-traders?instType=SWAP&uniqueCode=D9ADEAB33AE9EABD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约，默认值</td></tr><tr><td style="text-align: left">uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">带单交易员唯一标识码。<br>数字加字母组合 长度为16或18位，如：213E8C92DC61EFAC（16位）或381749205163847291（18位）</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">返回结果的数量，最大为100，默认100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "ccy": "USDT",
            "copyTotalPnl": "2060.12242",
            "copyTraderNumChg": "1",
            "copyTraderNumChgRatio": "0.5",
            "copyTraders": [
                {
                    "beginCopyTime": "1686125051000",
                    "nickName": "bre***@gmail.com",
                    "pnl": "1076.77388",
                    "portLink": ""
                },
                {
                    "beginCopyTime": "1698133811000",
                    "nickName": "MrYanDao505",
                    "pnl": "983.34854",
                    "portLink": "https://static.okx.com/cdn/okex/users/headimages/20231010/fd31f45e99fe41f7bb219c0b53ae0ada"
                }
            ]
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">copyTotalPnl</td><td style="text-align: left">String</td><td style="text-align: left">跟单员总收益</td></tr><tr><td style="text-align: left">ccy</td><td style="text-align: left">String</td><td style="text-align: left">总收益币种名称</td></tr><tr><td style="text-align: left">copyTraderNumChg</td><td style="text-align: left">String</td><td style="text-align: left">近 7 日变化的跟单人数</td></tr><tr><td style="text-align: left">copyTraderNumChgRatio</td><td style="text-align: left">String</td><td style="text-align: left">近 7 日跟单人数变化的比率</td></tr><tr><td style="text-align: left">copyTraders</td><td style="text-align: left">Array of objects</td><td style="text-align: left">跟单员信息</td></tr><tr><td style="text-align: left">&gt; beginCopyTime</td><td style="text-align: left">String</td><td style="text-align: left">跟单开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; nickName</td><td style="text-align: left">String</td><td style="text-align: left">昵称</td></tr><tr><td style="text-align: left">&gt; portLink</td><td style="text-align: left">String</td><td style="text-align: left">跟单员头像的链接地址</td></tr><tr><td style="text-align: left">&gt; pnl</td><td style="text-align: left">String</td><td style="text-align: left">跟单收益</td></tr></tbody></table>

### WS / 带单消息通知频道

带单失败时的消息通知

#### 服务地址

/ws/v5/business (需要登录)

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "copytrading-lead-notification",
        "instType": "SWAP"
    }]
}
```

```
import asyncio

from okx.websocket.WsPrivateAsync import WsPrivateAsync


def callbackFunc(message):
    print(message)

async def main():

    ws = WsPrivateAsync(
        apiKey = "YOUR_API_KEY",
        passphrase = "YOUR_PASSPHRASE",
        secretKey = "YOUR_SECRET_KEY",
        url = "wss://ws.okx.com:8443/ws/v5/business",
        useServerTime=False
    )
    await ws.start()
    args = [{
        "channel": "copytrading-lead-notification",
        "instType": "SWAP"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)


asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td>是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名<br><code>copytrading-lead-notification</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "copytrading-lead-notification",
        "instType": "SWAP"
    },
    "connId": "aa993428"
}
```

> 失败返回示例

```
{
    "id": "1512",
    "event": "error",
    "code": "60012",
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"copytrading-lead-notification\", \"instType\" : \"FUTURES\"}]}",
    "connId":"a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th>是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">产品类型<br><code>SWAP</code>：永续合约</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td>否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td>是</td><td style="text-align: left">WebSocket 连接ID</td></tr></tbody></table>

> 推送示例：

```
{
    "arg": {
        "channel": "copytrading-lead-notification",
        "instType": "SWAP",
        "uid": "525627088439549953"
    },
    "data": [
        {
            "infoType": "2",
            "instId": "",
            "instType": "SWAP",
            "maxLeadTraderNum": "3",
            "minLeadEq": "",
            "posSide": "",
            "side": "",
            "subPosId": "667695035433385984",
            "uniqueCode": "3AF72F63E3EAD701"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; uid</td><td style="text-align: left">String</td><td style="text-align: left">用户标识</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">&gt; infoType</td><td style="text-align: left">String</td><td style="text-align: left">消息类型<br><code>1</code>: 带单失败，触发最大仓位限制<br><code>2</code>: 带单失败，触发带单次数限制<br><code>3</code>: 带单失败，交易账户 USDT 低于最小权益</td></tr><tr><td style="text-align: left">&gt; subPosId</td><td style="text-align: left">String</td><td style="text-align: left">带单仓位 ID</td></tr><tr><td style="text-align: left">&gt; uniqueCode</td><td style="text-align: left">String</td><td style="text-align: left">交易员唯一标识码</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品 ID</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">订单方向，<code>buy</code> <code>sell</code></td></tr><tr><td style="text-align: left">&gt; posSide</td><td style="text-align: left">String</td><td style="text-align: left">持仓方向<br><code>long</code>：开平仓模式开多<br><code>short</code>：开平仓模式开空<br><code>net</code>：买卖模式</td></tr><tr><td style="text-align: left">&gt; maxLeadTraderNum</td><td style="text-align: left">String</td><td style="text-align: left">当前交易员单日最大带单次数</td></tr><tr><td style="text-align: left">&gt; minLeadEq</td><td style="text-align: left">String</td><td style="text-align: left">带单最小 USDT 权益</td></tr></tbody></table>

## 行情数据

`行情数据`功能模块下的API接口不需要身份验证。

行情数据存在多个服务且每个服务有独立的缓存，每次会随机请求到某一个服务，所以会存在两次请求，第二次获取到的数据早于第一次的情况。

针对事件合约，行情数据模块只返回YES侧的数据，用户可自行推导出NO侧数据。

### GET / 获取所有产品行情信息

获取产品行情信息。在提前挂单阶段，best ask的价格有机会低于best bid。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/tickers`

> 请求示例

```
GET /api/v5/market/tickers?instType=SWAP
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取所有产品行情信息
result = marketDataAPI.get_tickers(
    instType="SWAP"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型<br><code>SPOT</code>：币币<br><code>SWAP</code>：永续合约<br><code>FUTURES</code>：交割合约<br><code>OPTION</code>：期权<br><code>EVENTS</code>：事件合约</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">交易品种<br>适用于<code>交割</code>/<code>永续</code>/<code>期权</code>，如 <code>BTC-USD</code></td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     {
        "instType":"SWAP",
        "instId":"LTC-USD-SWAP",
        "last":"9999.99",
        "lastSz":"1",
        "askPx":"9999.99",
        "askSz":"11",
        "bidPx":"8888.88",
        "bidSz":"5",
        "open24h":"9000",
        "high24h":"10000",
        "low24h":"8888.88",
        "volCcy24h":"2222",
        "vol24h":"2222",
        "sodUtc0":"0.1",
        "sodUtc8":"0.1",
        "ts":"1597026383085"
     },
     {
        "instType":"SWAP",
        "instId":"BTC-USD-SWAP",
        "last":"9999.99",
        "lastSz":"1",
        "askPx":"9999.99",
        "askSz":"11",
        "bidPx":"8888.88",
        "bidSz":"5",
        "open24h":"9000",
        "high24h":"10000",
        "low24h":"8888.88",
        "volCcy24h":"2222",
        "vol24h":"2222",
        "sodUtc0":"0.1",
        "sodUtc8":"0.1",
        "ts":"1597026383085"
    }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">lastSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交的数量，0 代表没有成交量</td></tr><tr><td style="text-align: left">askPx</td><td style="text-align: left">String</td><td style="text-align: left">卖一价</td></tr><tr><td style="text-align: left">askSz</td><td style="text-align: left">String</td><td style="text-align: left">卖一价的挂单数数量</td></tr><tr><td style="text-align: left">bidPx</td><td style="text-align: left">String</td><td style="text-align: left">买一价</td></tr><tr><td style="text-align: left">bidSz</td><td style="text-align: left">String</td><td style="text-align: left">买一价的挂单数量</td></tr><tr><td style="text-align: left">open24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时开盘价</td></tr><tr><td style="text-align: left">high24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时最高价</td></tr><tr><td style="text-align: left">low24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时最低价</td></tr><tr><td style="text-align: left">volCcy24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。比如，对于 BTC-USD-SWAP 和 BTC-USDT-SWAP，单位均为 BTC<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">vol24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">sodUtc0</td><td style="text-align: left">String</td><td style="text-align: left">UTC 0 时开盘价</td></tr><tr><td style="text-align: left">sodUtc8</td><td style="text-align: left">String</td><td style="text-align: left">UTC+8 时开盘价</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">ticker数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取单个产品行情信息

获取产品行情信息。在提前挂单阶段，best ask的价格有机会低于best bid。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/ticker`

> 请求示例

```
GET /api/v5/market/ticker?instId=BTC-USD-SWAP
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取单个产品行情信息
result = marketDataAPI.get_ticker(
    instId="BTC-USD-SWAP"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USD-SWAP</code></td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instType": "SWAP",
            "instId": "BTC-USD-SWAP",
            "last": "56956.1",
            "lastSz": "3",
            "askPx": "56959.1",
            "askSz": "10582",
            "bidPx": "56959",
            "bidSz": "4552",
            "open24h": "55926",
            "high24h": "57641.1",
            "low24h": "54570.1",
            "volCcy24h": "81137.755",
            "vol24h": "46258703",
            "ts": "1620289117764",
            "sodUtc0": "55926",
            "sodUtc8": "55926"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instType</td><td style="text-align: left">String</td><td style="text-align: left">产品类型</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">last</td><td style="text-align: left">String</td><td style="text-align: left">最新成交价</td></tr><tr><td style="text-align: left">lastSz</td><td style="text-align: left">String</td><td style="text-align: left">最新成交的数量，0 代表没有成交量</td></tr><tr><td style="text-align: left">askPx</td><td style="text-align: left">String</td><td style="text-align: left">卖一价</td></tr><tr><td style="text-align: left">askSz</td><td style="text-align: left">String</td><td style="text-align: left">卖一价对应的数量</td></tr><tr><td style="text-align: left">bidPx</td><td style="text-align: left">String</td><td style="text-align: left">买一价</td></tr><tr><td style="text-align: left">bidSz</td><td style="text-align: left">String</td><td style="text-align: left">买一价对应的数量</td></tr><tr><td style="text-align: left">open24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时开盘价</td></tr><tr><td style="text-align: left">high24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时最高价</td></tr><tr><td style="text-align: left">low24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时最低价</td></tr><tr><td style="text-align: left">volCcy24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">vol24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">sodUtc0</td><td style="text-align: left">String</td><td style="text-align: left">UTC+0 时开盘价</td></tr><tr><td style="text-align: left">sodUtc8</td><td style="text-align: left">String</td><td style="text-align: left">UTC+8 时开盘价</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">ticker数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### GET / 获取产品深度

获取产品深度列表，数据每 50 毫秒更新一次。在提前挂单阶段，best ask的价格有机会低于best bid。  
该接口收到请求后不会立刻返回，而是会待服务端缓存数据更新后立即返回最新数据。

#### 限速：40次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/books`

> 请求示例

```
GET /api/v5/market/books?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取产品深度
result = marketDataAPI.get_orderbook(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">深度档位数量，最大值可传400，即买卖深度共800条<br>不填写此参数，默认返回<code>1</code>档深度数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "asks": [
                [
                    "41006.8",
                    "0.60038921",
                    "0",
                    "1"
                ]
            ],
            "bids": [
                [
                    "41006.3",
                    "0.30178218",
                    "0",
                    "2"
                ]
            ],
            "ts": "1629966436396",
            "seqId": 3235851742
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">asks</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">卖方深度</td></tr><tr><td style="text-align: left">bids</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">买方深度</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">深度产生的时间</td></tr><tr><td style="text-align: left">seqId</td><td style="text-align: left">Integer</td><td style="text-align: left">当前消息的序列号</td></tr></tbody></table>

::: tip
合约的asks和bids值数组举例说明： \["411.8","10", "0","4"\] 411.8为深度价格，10为此价格的合约张数，0该字段已弃用(始终为0)，4为此价格的订单数量  
现货/币币杠杆的asks和bids值数组举例说明： \["411.8","10", "0","4"\] 411.8为深度价格，10为此价格的交易币的数量，0该字段已弃用(始终为0)，4为此价格的订单数量 asks和bids值数组举例说明： \["411.8", "10", "0", "4"\]  
\- 411.8为深度价格  
\- 10为此价格的数量 （合约交易为张数，现货/币币杠杆为交易币的数量）  
\- 0该字段已弃用(始终为0)  
\- 4为此价格的订单数量
:::

::: tip
集合竞价期间，深度数据大约每秒更新一次
:::

### GET / 获取产品完整深度

获取产品深度列表。数据每秒更新一次。在提前挂单阶段，best ask的价格有机会低于best bid。  
该接口收到请求后不会立刻返回，而是会待服务端缓存数据更新后立即返回最新数据。

#### 限速：10次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/books-full`

> 请求示例

```
GET /api/v5/market/books-full?instId=BTC-USDT&sz=20
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">深度档位数量，最大值可传5000，即买卖深度共10000条<br>不填写此参数，默认返回<code>1</code>档深度数据</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "asks": [
                [
                    "41006.8",
                    "0.60038921",
                    "1"
                ]
            ],
            "bids": [
                [
                    "41006.3",
                    "0.30178218",
                    "2"
                ]
            ],
            "ts": "1629966436396"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">asks</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">卖方深度</td></tr><tr><td style="text-align: left">bids</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">买方深度</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">深度产生的时间</td></tr></tbody></table>

::: tip
合约的asks和bids值数组举例说明： \["411.8", "10", "4"\] 411.8为深度价格，10为此价格的合约张数，4为此价格的订单数量  
现货/币币杠杆的asks和bids值数组举例说明： \["411.8", "10", "4"\] 411.8为深度价格，10为此价格的交易币的数量，4为此价格的订单数量  
asks和bids值数组举例说明： \["411.8", "10", "4"\]  
\- 411.8为深度价格  
\- 10为此价格的数量 （合约交易为张数，现货/币币杠杆为交易币的数量）  
\- 4为此价格的订单数量
:::

::: tip
集合竞价期间，深度数据大约每秒更新一次
:::

### GET / 获取交易产品K线数据

获取K线数据。K线数据按请求的粒度分组返回，K线数据每个粒度最多可获取最近1,440条。

#### 限速：40次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/candles`

> 请求示例

```
GET /api/v5/market/candles?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取交易产品K线数据
result = marketDataAPI.get_candlesticks(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0开盘价k线：[/6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc]</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为300，不填默认返回100条</td></tr><tr><td style="text-align: left">adjust</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">复权类型，仅适用于股票永续合约。<br><code>forward</code>：前复权。<br>不填时默认返回不复权数据。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     [
        "1597026383085",
        "3.721",
        "3.743",
        "3.677",
        "3.708",
        "8422410",
        "22698348.04828491",
        "12698348.04828491",
        "0"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "24912403",
        "67632347.24399722",
        "37632347.24399722",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">vol</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">volCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">volCcyQuote</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以计价货币为单位<br>如 <code>BTC-USDT</code>和<code>BTC-USDT-SWAP</code>，单位均是<code>USDT</code>。<br><code>BTC-USD-SWAP</code>单位是<code>USD</code>。</td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

::: tip
返回的第一条K线数据可能不是完整周期k线，返回值数组顺序分别为是：\[ts,o,h,l,c,vol,volCcy,volCcyQuote,confirm\]  
对于当前周期的K线数据，没有成交时，开高收低默认都取上一周期的收盘价格。
:::

::: tip
当传入 `adjust=forward` 时，历史K线的开高低收（OHLC）价格将乘以对应时期的复权因子。对于拆股，成交量（`vol`、`volCcy`）也会按相同比例调整。成交金额（`volCcyQuote`）不做调整。该参数仅对股票永续合约有效。
:::

### GET / 获取交易产品历史K线数据

获取最近几年的历史k线数据(1s k线支持查询最近3个月的数据)

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/history-candles`

> 请求示例

```
GET /api/v5/market/history-candles?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取交易产品历史K线数据
result = marketDataAPI.get_history_candlesticks(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之前（更旧的数据）的分页内容，传的值为对应接口的<code>ts</code></td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此时间戳之后（更新的数据）的分页内容，传的值为对应接口的<code>ts</code>, 单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">bar</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">时间粒度，默认值<code>1m</code><br>如 [1s/1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8开盘价k线：[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0开盘价k线：[6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc]</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为300，不填默认返回100条</td></tr><tr><td style="text-align: left">adjust</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">复权类型，仅适用于股票永续合约。<br><code>forward</code>：前复权。<br>不填时默认返回不复权数据。</td></tr></tbody></table>

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     [
        "1597026383085",
        "3.721",
        "3.743",
        "3.677",
        "3.708",
        "8422410",
        "22698348.04828491",
        "12698348.04828491",
        "1"
    ],
    [
        "1597026383085",
        "3.731",
        "3.799",
        "3.494",
        "3.72",
        "24912403",
        "67632347.24399722",
        "37632347.24399722",
        "1"
    ]
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">vol</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">volCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">volCcyQuote</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以计价货币为单位<br>如 <code>BTC-USDT</code>和<code>BTC-USDT-SWAP</code>，单位均是<code>USDT</code><br><code>BTC-USD-SWAP</code>单位是<code>USD</code></td></tr><tr><td style="text-align: left">confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

::: tip
返回值数组顺序分别为是：\[ts,o,h,l,c,vol,volCcy,volCcyQuote,confirm\]
:::

::: tip
期权不支持 1s K线， 其他业务线 (币币, 杠杆, 交割和永续)支持
:::

::: tip
当传入 `adjust=forward` 时，历史K线的开高低收（OHLC）价格将乘以对应时期的复权因子。对于拆股，成交量（`vol`、`volCcy`）也会按相同比例调整。成交金额（`volCcyQuote`）不做调整。该参数仅对股票永续合约有效。
:::

### GET / 获取交易产品公共成交数据

查询市场上的成交信息数据

#### 限速：100次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/trades`

> 请求示例

```
GET /api/v5/market/trades?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取交易产品公共成交数据
result = marketDataAPI.get_trades(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为500，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instId": "BTC-USDT",
            "side": "sell",
            "sz": "0.00001",
            "source": "0",
            "px": "29963.2",
            "tradeId": "242720720",
            "ts": "1654161646974"
        },
        {
            "instId": "BTC-USDT",
            "side": "sell",
            "sz": "0.00001",
            "source": "0",
            "px": "29964.1",
            "tradeId": "242720719",
            "ts": "1654161641568"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">吃单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>0</code>：普通订单<br><code>1</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr></tbody></table>

::: tip
最多获取最近500条历史公共成交数据
:::

### GET / 获取交易产品公共历史成交数据

查询市场上的成交信息数据，可以分页获取最近3个月的数据。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/history-trades`

> 请求示例

```
GET /api/v5/market/history-trades?instId=BTC-USDT
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取交易产品公共历史成交数据
result = marketDataAPI.get_history_trades(
    instId="BTC-USDT"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页类型<br><code>1</code>：tradeId 分页 <code>2</code>：时间戳分页<br>默认为<code>1</code>：tradeId 分页</td></tr><tr><td style="text-align: left">after</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此 ID 或 ts 之前的分页内容，传的值为对应接口的 tradeId 或 ts</td></tr><tr><td style="text-align: left">before</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">请求此ID之后（更新的数据）的分页内容，传的值为对应接口的 tradeId。<br>不支持时间戳分页。单独使用时，会返回最新的数据。</td></tr><tr><td style="text-align: left">limit</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">分页返回的结果集数量，最大为100，不填默认返回100条</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instId": "BTC-USDT",
            "side": "sell",
            "sz": "0.00001",
            "source": "0",
            "px": "29963.2",
            "tradeId": "242720720",
            "ts": "1654161646974"
        },
        {
            "instId": "BTC-USDT",
            "side": "sell",
            "sz": "0.00001",
            "source": "0",
            "px": "29964.1",
            "tradeId": "242720719",
            "ts": "1654161641568"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">吃单方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>0</code>：普通订单<br><code>1</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr></tbody></table>

### GET / 获取期权品种公共成交数据

查询期权同一个交易品种下的成交信息数据，最多返回100条。

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/option/instrument-family-trades`

> 请求示例

```
GET /api/v5/market/option/instrument-family-trades?instFamily=BTC-USD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">交易品种，如 BTC-USD，适用于期权</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "vol24h": "103381",
            "tradeInfo": [
                {
                    "instId": "BTC-USD-221111-17750-C",
                    "side": "sell",
                    "sz": "1",
                    "px": "0.0075",
                    "tradeId": "20",
                    "ts": "1668090715058"
                },
                {
                    "instId": "BTC-USD-221111-17750-C",
                    "side": "sell",
                    "sz": "91",
                    "px": "0.01",
                    "tradeId": "19",
                    "ts": "1668090421062"
                }
            ],
            "optType": "C"
        },
        {
            "vol24h": "144499",
            "tradeInfo": [
                {
                    "instId": "BTC-USD-230127-10000-P",
                    "side": "sell",
                    "sz": "82",
                    "px": "0.019",
                    "tradeId": "23",
                    "ts": "1668090967057"
                },
                {
                    "instId": "BTC-USD-221111-16250-P",
                    "side": "sell",
                    "sz": "102",
                    "px": "0.0045",
                    "tradeId": "24",
                    "ts": "1668090885050"
                }
            ],
            "optType": "P"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">vol24h</td><td style="text-align: left">String</td><td style="text-align: left">24小时成交量，以张为单位</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型，<code>C</code>：看涨期权 <code>P</code>：看跌期权</td></tr><tr><td style="text-align: left">tradeInfo</td><td style="text-align: left">Array of objects</td><td style="text-align: left">成交数据列表</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量，单位为张。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">成交方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式， 如1597026383085</td></tr></tbody></table>

### GET / 获取期权公共成交数据

最多返回最近的100条成交数据

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/public/option-trades`

> 请求示例

```
GET /api/v5/public/option-trades?instFamily=BTC-USD
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID，如 BTC-USD-221230-4000-C，<code>instId</code> 和 <code>instFamily</code> 必须传一个，若传两个，以 <code>instId</code> 为主</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种，如 BTC-USD</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">期权类型，<code>C</code>：看涨期权 <code>P</code>：看跌期权</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "fillVol": "0.24415013671875",
            "fwdPx": "16676.907614127158",
            "idxPx": "16667",
            "instFamily": "BTC-USD",
            "instId": "BTC-USD-221230-16600-P",
            "markPx": "0.006308943261227884",
            "optType": "P",
            "px": "0.005",
            "side": "sell",
            "sz": "30",
            "tradeId": "65",
            "ts": "1672225112048"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">instFamily</td><td style="text-align: left">String</td><td style="text-align: left">交易品种</td></tr><tr><td style="text-align: left">tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量。单位为张。</td></tr><tr><td style="text-align: left">side</td><td style="text-align: left">String</td><td style="text-align: left">成交方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">optType</td><td style="text-align: left">String</td><td style="text-align: left">期权类型，C：看涨期权 P：看跌期权 ，仅适用于期权</td></tr><tr><td style="text-align: left">fillVol</td><td style="text-align: left">String</td><td style="text-align: left">成交时的隐含波动率（对应成交价格）</td></tr><tr><td style="text-align: left">fwdPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的远期价格</td></tr><tr><td style="text-align: left">idxPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的指数价格</td></tr><tr><td style="text-align: left">markPx</td><td style="text-align: left">String</td><td style="text-align: left">成交时的标记价格</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr></tbody></table>

### GET / 获取平台24小时总成交量

24小时成交量滚动计算

#### 限速：2次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/platform-24-volume`

> 请求示例

```
GET /api/v5/market/platform-24-volume
```

```
import okx.MarketData as MarketData

flag = "0"  # 实盘:0 , 模拟盘：1

marketDataAPI =  MarketData.MarketAPI(flag=flag)

# 获取平台24小时总成交量
result = marketDataAPI.get_volume()
print(result)
```

> 返回结果

```
{
    "code":"0",
    "msg":"",
    "data":[
     {
         "volCny": "230900886396766",
         "volUsd": "34462818865189",
         "ts": "1657856040389"
     }
  ]
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">volUsd</td><td style="text-align: left">String</td><td style="text-align: left">订单簿交易近24小时总成交量，以美元为单位</td></tr><tr><td style="text-align: left">volCny</td><td style="text-align: left">String</td><td style="text-align: left">订单簿交易近24小时总成交量，以人民币为单位</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">接口返回数据时间</td></tr></tbody></table>

### GET / 集合竞价信息

获取集合竞价相关信息

#### 限速：20次/2s

#### 限速规则：IP

#### HTTP请求

`GET /api/v5/market/call-auction-details`

> 请求示例

```
GET /api/v5/market/call-auction-details?instId=ONDO-USDC
```

#### 请求参数

<table><thead><tr><th>参数名</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>String</td><td>是</td><td>产品ID，如&nbsp;BTC-USDT</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "msg": "",
    "data": [
        {
            "instId": "ONDO-USDC",
            "unmatchedSz": "9988764",
            "eqPx": "0.6",
            "matchedSz": "44978",
            "state": "continuous_trading",
            "auctionEndTime": "1726542000000",
            "ts": "1726542000007"
        }
    ]
}
```

#### 返回参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>instId</td><td>String</td><td>产品ID</td></tr><tr><td>eqPx</td><td>String</td><td>均衡价格</td></tr><tr><td>matchedSz</td><td>String</td><td>买卖双边的匹配数量，单位为交易货币</td></tr><tr><td>unmatchedSz</td><td>String</td><td>未匹配数量</td></tr><tr><td>auctionEndTime</td><td>String</td><td>集合竞价结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>state</td><td>String</td><td>交易状态<br><code>call_auction</code>：集合竞价<br><code>continuous_trading</code>：连续交易</td></tr><tr><td>ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
在集合竞价期间，用户可以获取均衡价格、匹配数量、未匹配数量和集合竞价结束时间的更新。数据大约每秒更新一次。当集合竞价结束时，该接口将返回实际开盘价、匹配数量和未匹配数量。  
对于从未进入集合竞价的交易产品，该接口也会返回结果，但交易状态字段state始终为\`continuous\_trading\`，其他字段为0或空。
:::

### WS / 行情频道

获取产品的最新成交价、买一价、卖一价和24小时交易量等信息。在提前挂单阶段，best ask的价格有机会低于best bid。  
最快100ms推送一次，没有触发事件时不推送，触发推送的事件有：成交、买一卖一发生变动。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "tickers",
        "instId": "BTC-USDT"
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
        "channel": "tickers",
        "instId": "BTC-USDT"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>tickers</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "tickers",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"tickers\", \"instId\" : \"LTC-USD-200327\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "tickers",
        "instId": "BTC-USDT"
    },
    "data": [{
        "instType": "SPOT",
        "instId": "BTC-USDT",
        "last": "9999.99",
        "lastSz": "0.1",
        "askPx": "9999.99",
        "askSz": "11",
        "bidPx": "8888.88",
        "bidSz": "5",
        "open24h": "9000",
        "high24h": "10000",
        "low24h": "8888.88",
        "volCcy24h": "2222",
        "vol24h": "2222",
        "sodUtc0": "2222",
        "sodUtc8": "2222",
        "ts": "1597026383085"
    }]
}
```

#### 推送数据参数

<table><thead><tr><th><strong>参数名</strong></th><th><strong>类型</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instType</td><td>String</td><td>产品类型</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt; last</td><td>String</td><td>最新成交价</td></tr><tr><td>&gt; lastSz</td><td>String</td><td>最新成交的数量，0 代表没有成交量</td></tr><tr><td>&gt; askPx</td><td>String</td><td>卖一价</td></tr><tr><td>&gt; askSz</td><td>String</td><td>卖一价对应的量</td></tr><tr><td>&gt; bidPx</td><td>String</td><td>买一价</td></tr><tr><td>&gt; bidSz</td><td>String</td><td>买一价对应的数量</td></tr><tr><td>&gt; open24h</td><td>String</td><td>24小时开盘价</td></tr><tr><td>&gt; high24h</td><td>String</td><td>24小时最高价</td></tr><tr><td>&gt; low24h</td><td>String</td><td>24小时最低价</td></tr><tr><td>&gt; volCcy24h</td><td>String</td><td>24小时成交量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td>&gt; vol24h</td><td>String</td><td>24小时成交量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td>&gt; sodUtc0</td><td>String</td><td>UTC+0 时开盘价</td></tr><tr><td>&gt; sodUtc8</td><td>String</td><td>UTC+8 时开盘价</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### WS / K线频道

获取K线数据，推送频率最快是间隔1秒推送一次数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "candle1D",
        "instId": "BTC-USDT"
    }]
}
```

```
import asyncio

from okx.websocket.WsPublicAsync import WsPublicAsync


def callbackFunc(message):
    print(message)


async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "candle1D",
          "instId": "BTC-USDT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>candle3M</code><br><code>candle1M</code><br><code>candle1W</code><br><code>candle1D</code><br><code>candle2D</code><br><code>candle3D</code><br><code>candle5D</code><br><code>candle12H</code><br><code>candle6H</code><br><code>candle4H</code><br><code>candle2H</code><br><code>candle1H</code><br><code>candle30m</code><br><code>candle15m</code><br><code>candle5m</code><br><code>candle3m</code><br><code>candle1m</code><br><code>candle1s</code><br><code>candle3Mutc</code><br><code>candle1Mutc</code><br><code>candle1Wutc</code><br><code>candle1Dutc</code><br><code>candle2Dutc</code><br><code>candle3Dutc</code><br><code>candle5Dutc</code><br><code>candle12Hutc</code><br><code>candle6Hutc</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "candle1D",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"candle1D\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "candle1D",
    "instId": "BTC-USDT"
  },
  "data": [
    [
      "1629993600000",
      "42500",
      "48199.9",
      "41006.1",
      "41006.1",
      "3587.41204591",
      "166741046.22583129",
      "166741046.22583129",
      "0"
    ]
  ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">开始时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; o</td><td style="text-align: left">String</td><td style="text-align: left">开盘价格</td></tr><tr><td style="text-align: left">&gt; h</td><td style="text-align: left">String</td><td style="text-align: left">最高价格</td></tr><tr><td style="text-align: left">&gt; l</td><td style="text-align: left">String</td><td style="text-align: left">最低价格</td></tr><tr><td style="text-align: left">&gt; c</td><td style="text-align: left">String</td><td style="text-align: left">收盘价格</td></tr><tr><td style="text-align: left">&gt; vol</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>张</code>为单位<br>如果是<code>衍生品</code>合约，数值为合约的张数。<br>如果是<code>币币/币币杠杆</code>，数值为交易货币的数量。</td></tr><tr><td style="text-align: left">&gt; volCcy</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以<code>币</code>为单位<br>如果是<code>衍生品</code>合约，数值为交易货币的数量。<br>如果是<code>币币/币币杠杆</code>，数值为计价货币的数量。</td></tr><tr><td style="text-align: left">&gt; volCcyQuote</td><td style="text-align: left">String</td><td style="text-align: left">交易量，以计价货币为单位<br>如 <code>BTC-USDT</code>和<code>BTC-USDT-SWAP</code>单位均是<code>USDT</code>。<br><code>BTC-USD-SWAP</code>单位是<code>USD</code>。</td></tr><tr><td style="text-align: left">&gt; confirm</td><td style="text-align: left">String</td><td style="text-align: left">K线状态<br><code>0</code>：K线未完结<br><code>1</code>：K线已完结</td></tr></tbody></table>

### WS / 交易频道

获取最近的成交数据，有成交数据就推送，每次推送可能聚合多条成交数据。  
根据每个taker订单的不同成交价格，不同成交来源推送消息，并使用count字段表示聚合的订单匹配数量。

#### URL Path

/ws/v5/public

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "trades",
        "instId": "BTC-USDT"
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
    args = [
        {
          "channel": "trades",
          "instId": "BTC-USDT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>trades</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "trades",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"trades\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "trades",
    "instId": "BTC-USDT"
  },
  "data": [
    {
      "instId": "BTC-USDT",
      "tradeId": "130639474",
      "px": "42219.9",
      "sz": "0.12060306",
      "side": "buy",
      "ts": "1630048897897",
      "count": "3",
      "source": "0",
      "seqId": 1234
    }
  ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">聚合的多笔交易中最新一笔交易的成交ID</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">吃单方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">&gt; count</td><td style="text-align: left">String</td><td style="text-align: left">聚合的订单匹配数量</td></tr><tr><td style="text-align: left">&gt; source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>0</code>：普通订单<br><code>1</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">&gt; seqId</td><td style="text-align: left">Integer</td><td style="text-align: left">推送的序列号</td></tr></tbody></table>

::: tip
聚合功能说明：  
1\. 系统将根据每个taker订单的不同成交价格，不同成交来源推送消息，并使用count字段表示聚合的订单匹配数量。  
2\. tradeId是聚合的多笔交易中最新一笔交易的 ID。  
3\. 当count = 1时，表示taker订单部分或完全成交时仅匹配了一个maker订单。  
4\. 当count > 1时，表示taker订单以相同价格匹配了多个maker订单。例如，如果tradeId = 123，且count = 3，表示该消息聚合了tradeId = 123, 122, 121的成交。maker侧有多笔价格相同的订单被成交。  
5\. 用户可以使用此数据与“全部交易”频道的数据进行对比。  
6\. 深度及聚合交易数据仍按顺序发布。
:::

::: tip
同时发生的不同交易推送数据的\`seqId\`可能相同。
:::

### WS / 全部交易频道

获取最近的成交数据，有成交数据就推送，每次推送仅包含一条成交数据。

#### URL Path

/ws/v5/business

> 请求示例

```
{
  "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "trades-all",
        "instId": "BTC-USDT"
    }]
}
```

```
import asyncio

from okx.websocket.WsPublicAsync import WsPublicAsync


def callbackFunc(message):
    print(message)


async def main():
    ws = WsPublicAsync(url="wss://wspap.okx.com:8443/ws/v5/business")
    await ws.start()
    args = [
        {
          "channel": "trades-all",
          "instId": "BTC-USDT"
        }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>trades-all</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "trades-all",
        "instId": "BTC-USDT"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"trades-all\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "trades-all",
    "instId": "BTC-USDT"
  },
  "data": [
    {
      "instId": "BTC-USDT",
      "tradeId": "130639474",
      "px": "42219.9",
      "sz": "0.12060306",
      "side": "buy",
      "source": "0",
      "ts": "1630048897897"
    }
  ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID，如 <code>BTC-USDT</code></td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td style="text-align: left">成交ID</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td style="text-align: left">成交价格</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td style="text-align: left">成交数量<br>对于币币交易，成交数量的单位为交易货币<br>对于交割、永续以及期权，单位为张。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td style="text-align: left">成交方向<br><code>buy</code><br><code>sell</code></td></tr><tr><td style="text-align: left">&gt; source</td><td style="text-align: left">String</td><td style="text-align: left">订单来源<br><code>0</code>：普通订单<br><code>1</code>：流动性增强计划订单</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">成交时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### WS / 深度频道

获取深度数据。在提前挂单阶段，best ask的价格有机会低于best bid。`books`是400档频道，`books5`是5档频道， `bbo-tbt`是先1档后实时推送的频道，`books-l2-tbt`是先400档后实时推送的频道，`books50-l2-tbt`是先50档后实时推的频道；

*   `books` 首次推400档快照数据，以后增量推送，每100毫秒推送一次变化的数据  
    
*   `books-elp` 仅推送ELP订单，首次推400档快照数据，以后增量推送，每100毫秒推送一次变化的数据  
    
*   `books5` 首次推5档快照数据，以后定量推送，每100毫秒当5档快照数据有变化推送一次5档数据  
    
*   `bbo-tbt` 首次推1档快照数据，以后定量推送，每10毫秒当1档快照数据有变化推送一次1档数据  
    
*   `books-l2-tbt` 首次推400档快照数据，以后增量推送，每10毫秒推送一次变化的数据  
    
*   `books50-l2-tbt` 首次推50档快照数据，以后增量推送，每10毫秒推送一次变化的数据
*   单个连接、交易产品维度，深度频道的推送顺序固定为：bbo-tbt -> books-l2-tbt -> books50-l2-tbt -> books -> books-elp -> books5。
*   在相同连接下，用户将无法为相同交易产品同时订阅 `books-l2-tbt` 以及 `books50-l2-tbt/books`频道
    *   更多细节，请参阅更新日志 [2024-07-17](/log_zh/2024-07-17)

::: tip
books-l2-tbt400档深度频道，只允许交易手续费等级VIP4及以上的API用户订阅，其他用户接入将收到错误码64003。  
books50-l2-tbt50档深度频道，只允许交易手续费等级VIP4及以上的API用户订阅，其他用户接入将收到错误码64003。
:::

身份认证参考[登录](/zh/overview-websocket-login)功能

#### 服务地址

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "books",
        "instId": "BTC-USDT"
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
    args = [
      {
        "channel": "books",
        "instId": "BTC-USDT"
      }
    ]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>books</code><br><code>books5</code><br><code>bbo-tbt</code><br><code>books-l2-tbt</code><br><code>books50-l2-tbt</code></td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr></tbody></table>

> 返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "books",
        "instId": "BTC-USDT"
    },
    "connId": "a4d3ae55"
}
```

> 失败示例

```
{
    "id": "1512",
    "event": "error",
    "code": "60012",
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"books\", \"instId\" : \"BTC-USD-191227\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例 ：全量

```
{
    "arg": {
        "channel": "books",
        "instId": "BTC-USDT"
    },
    "action": "snapshot",
    "data": [{
        "asks": [
            ["8476.98", "415", "0", "13"],
            ["8477", "7", "0", "2"],
            ["8477.34", "85", "0", "1"],
            ["8477.56", "1", "0", "1"],
            ["8505.84", "8", "0", "1"],
            ["8506.37", "85", "0", "1"],
            ["8506.49", "2", "0", "1"],
            ["8506.96", "100", "0", "2"]
        ],
        "bids": [
            ["8476.97", "256", "0", "12"],
            ["8475.55", "101", "0", "1"],
            ["8475.54", "100", "0", "1"],
            ["8475.3", "1", "0", "1"],
            ["8447.32", "6", "0", "1"],
            ["8447.02", "246", "0", "1"],
            ["8446.83", "24", "0", "1"],
            ["8446", "95", "0", "3"]
        ],
        "ts": "1597026383085",
        "checksum": 0,
        "prevSeqId": -1,
        "seqId": 123456
    }]
}
```

> 推送示例：增量

```
{
    "arg": {
        "channel": "books",
        "instId": "BTC-USDT"
    },
    "action": "update",
    "data": [{
        "asks": [
            ["8476.98", "415", "0", "13"],
            ["8477", "7", "0", "2"],
            ["8477.34", "85", "0", "1"],
            ["8477.56", "1", "0", "1"],
            ["8505.84", "8", "0", "1"],
            ["8506.37", "85", "0", "1"],
            ["8506.49", "2", "0", "1"],
            ["8506.96", "100", "0", "2"]
        ],
        "bids": [
            ["8476.97", "256", "0", "12"],
            ["8475.55", "101", "0", "1"],
            ["8475.54", "100", "0", "1"],
            ["8475.3", "1", "0", "1"],
            ["8447.32", "6", "0", "1"],
            ["8447.02", "246", "0", "1"],
            ["8446.83", "24", "0", "1"],
            ["8446", "95", "0", "3"]
        ],
        "ts": "1597026383085",
        "checksum": 0,
        "prevSeqId": 123456,
        "seqId": 123457
    }]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">action</td><td style="text-align: left">String</td><td style="text-align: left">推送数据动作，增量推送数据还是全量推送数据<br><code>snapshot</code>：全量<br><code>update</code>：增量</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td style="text-align: left">订阅的数据</td></tr><tr><td style="text-align: left">&gt; asks</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">卖方深度</td></tr><tr><td style="text-align: left">&gt; bids</td><td style="text-align: left">Array of Arrays</td><td style="text-align: left">买方深度</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td style="text-align: left">数据更新时间戳，Unix时间戳的毫秒数格式，如 <code>1597026383085</code><br>例外： 对于<code>bbo-tbt</code> 频道，<code>ts</code> 为撮合引擎触发时的时间戳</td></tr><tr><td style="text-align: left">&gt; checksum</td><td style="text-align: left">Integer</td><td style="text-align: left"><del>检验和</del>（已弃用）。该字段仍会在 <code>books</code>、<code>books-l2-tbt</code>、<code>books50-l2-tbt</code> 推送中保留，但其值固定为 <code>0</code>，不应再用于数据完整性校验。请改用 <code>seqId/prevSeqId</code> 校验数据的连续性和准确性。</td></tr><tr><td style="text-align: left">&gt; prevSeqId</td><td style="text-align: left">Integer</td><td style="text-align: left">上一个推送的序列号。仅适用 <code>books</code>，<code>books-l2-tbt</code>，<code>books50-l2-tbt</code></td></tr><tr><td style="text-align: left">&gt; seqId</td><td style="text-align: left">Integer</td><td style="text-align: left">推送的序列号 （下方注解）</td></tr></tbody></table>

::: tip
asks和bids值数组举例说明： \["411.8", "10", "0", "4"\]  
\- 411.8为深度价格  
\- 10为此价格的数量 （合约交易为张数，现货/币币杠杆为交易币的数量  
\- 0该字段已弃用(始终为0)  
\- 4为此价格的订单数量
:::

::: tip
如果需要订阅多个50或400档频道，建议通过多个链接进行订阅，每个链接低于30条频道。
:::

::: tip
集合竞价期间，深度数据大约每秒更新一次
:::

::: tip
\`books/books5/bbo-tbt/books-l2-tbt/books50-l2-tbt\`不包含ELP订单  
\`books-elp\`仅返回 ELP 订单，包含有效部分及无效部分（无效部分指 ELP 买单价格高于非 ELP 订单最佳买单价；或 ELP 卖单价格低于非 ELP 订单最佳卖单价）。用户需根据非 ELP 订单的最佳买/卖价区分有效部分和无效部分。
:::

#### 序列号

`seqId`是交易所行情的一个序号。如果用户通过多个websocket连接同一频道，收到的序列号会是相同的。每个`instId`对应一套。用户可以使用在增量推送频道的`prevSeqId`和`seqId`来构建消息序列。这将允许用户检测数据包丢失和消息的排序。正常场景下`seqId`的值大于`prevSeqId`。新消息中的`prevSeqId`与上一条消息的`seqId`匹配。最小序列号值为0，除了快照消息的`prevSeqId`为-1。  

异常情况：  
1\. 如果一段时间内（约 60 秒）没有深度更新，对于定量推送频道，OKX 会推送最近的一条更新，对于增量推送频道，OKX将发一条消息`'asks': [], 'bids': []`以通知用户连接是正常的。推送的`seqId`跟上一条信息的一样，`prevSeqId`等于`seqId`。 2. 序列号可能由于维护而重置，在这种情况下，用户将收到一条`seqId`小于`prevSeqId`的增量消息。随后的消息将遵循常规的排序规则。

##### 示例

1.  快照推送：`prevSeqId = -1`，`seqId = 10`
2.  增量推送1（正常更新）：`prevSeqId = 10`，`seqId = 15`
3.  增量推送2（无更新）：`prevSeqId = 15`，`seqId = 15`
4.  增量推送3（序列重置）：`prevSeqId = 15`，`seqId = 3`
5.  增量推送4（正常更新）：`prevSeqId = 3`，`seqId = 5`

> bbo-tbt 频道推送示例

```
{
  "arg": {
    "channel": "bbo-tbt",
    "instId": "BCH-USDT-SWAP"
  },
  "data": [
    {
      "asks": [
        [
          "111.06","55154","0","2"
        ]
      ],
      "bids": [
        [
          "111.05","57745","0","2"
        ]
      ],
      "ts": "1670324386802",
      "seqId": 363996337
    }
  ]
}
```

> books5 频道推送示例

```
{
  "arg": {
    "channel": "books5",
    "instId": "BCH-USDT-SWAP"
  },
  "data": [
    {
      "asks": [
        ["111.06","55154","0","2"],
        ["111.07","53276","0","2"],
        ["111.08","72435","0","2"],
        ["111.09","70312","0","2"],
        ["111.1","67272","0","2"]],
      "bids": [
        ["111.05","57745","0","2"],
        ["111.04","57109","0","2"],
        ["111.03","69563","0","2"],
        ["111.02","71248","0","2"],
        ["111.01","65090","0","2"]],
      "instId": "BCH-USDT-SWAP",
      "ts": "1670324386802",
      "seqId": 363996337
    }
  ]
}
```

### WS / 期权公共成交频道

获取最近的期权成交数据，有成交数据就推送，每次推送仅包含一条成交数据。

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "option-trades",
        "instType": "OPTION",
        "instFamily": "BTC-USD"
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
        "channel": "option-trades",
        "instType": "OPTION",
        "instFamily": "BTC-USD"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td style="text-align: left">op</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td style="text-align: left">args</td><td style="text-align: left">Array of objects</td><td style="text-align: left">是</td><td style="text-align: left">请求订阅的频道列表</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名<br><code>option-trades</code></td></tr><tr><td style="text-align: left">&gt; instType</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">产品类型，<code>OPTION</code>：期权</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">产品ID，如 BTC-USD-221230-4000-C，<code>instId</code> 和 <code>instFamily</code> 必须传一个，若传两个，以 <code>instId</code> 为主</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">交易品种，如 BTC-USD</td></tr></tbody></table>

> 成功返回示例

```
{
    "id": "1512",
    "event": "subscribe",
    "arg": {
        "channel": "option-trades",
        "instType": "OPTION",
        "instFamily": "BTC-USD"
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
    "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"option-trades\"}]}",
    "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">id</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">消息的唯一标识</td></tr><tr><td style="text-align: left">event</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td style="text-align: left">否</td><td style="text-align: left">订阅的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">频道名</td></tr><tr><td style="text-align: left">code</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误码</td></tr><tr><td style="text-align: left">msg</td><td style="text-align: left">String</td><td style="text-align: left">否</td><td style="text-align: left">错误消息</td></tr><tr><td style="text-align: left">connId</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
    "arg": {
        "channel": "option-trades",
        "instType": "OPTION",
        "instFamily": "BTC-USD"
    },
    "data": [
        {
            "fillVol": "0.5066007836914062",
            "fwdPx": "16469.69928595038",
            "idxPx": "16537.2",
            "instFamily": "BTC-USD",
            "instId": "BTC-USD-230224-18000-C",
            "markPx": "0.04690107010619562",
            "optType": "C",
            "px": "0.045",
            "side": "sell",
            "sz": "2",
            "tradeId": "38",
            "ts": "1672286551080"
        }
    ]
}
```

#### 推送数据参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th>描述</th></tr></thead><tbody><tr><td style="text-align: left">arg</td><td style="text-align: left">Object</td><td>订阅成功的频道</td></tr><tr><td style="text-align: left">&gt; channel</td><td style="text-align: left">String</td><td>频道名</td></tr><tr><td style="text-align: left">data</td><td style="text-align: left">Array of objects</td><td>订阅的数据</td></tr><tr><td style="text-align: left">&gt; instId</td><td style="text-align: left">String</td><td>产品ID</td></tr><tr><td style="text-align: left">&gt; instFamily</td><td style="text-align: left">String</td><td>交易品种</td></tr><tr><td style="text-align: left">&gt; tradeId</td><td style="text-align: left">String</td><td>成交ID</td></tr><tr><td style="text-align: left">&gt; px</td><td style="text-align: left">String</td><td>成交价格</td></tr><tr><td style="text-align: left">&gt; sz</td><td style="text-align: left">String</td><td>成交数量，单位为张。</td></tr><tr><td style="text-align: left">&gt; side</td><td style="text-align: left">String</td><td>成交方向<br><code>buy</code>：买<br><code>sell</code>：卖</td></tr><tr><td style="text-align: left">&gt; optType</td><td style="text-align: left">String</td><td>期权类型，C：看涨期权 P：看跌期权 ，仅适用于期权</td></tr><tr><td style="text-align: left">&gt; fillVol</td><td style="text-align: left">String</td><td>成交时的隐含波动率（对应成交价格）</td></tr><tr><td style="text-align: left">&gt; fwdPx</td><td style="text-align: left">String</td><td>成交时的远期价格</td></tr><tr><td style="text-align: left">&gt; idxPx</td><td style="text-align: left">String</td><td>成交时的指数价格</td></tr><tr><td style="text-align: left">&gt; markPx</td><td style="text-align: left">String</td><td>成交时的标记价格</td></tr><tr><td style="text-align: left">&gt; ts</td><td style="text-align: left">String</td><td>成交时间，Unix时间戳的毫秒数格式， 如<code>1597026383085</code></td></tr></tbody></table>

::: tip
该频道订阅成功后的首条数据可能为最近一笔成交的缓存数据，请忽略。
:::

### WS / 集合竞价信息频道

获取集合竞价相关信息

#### URL Path

/ws/v5/public

> 请求示例

```
{
    "id": "1512",
    "op": "subscribe",
    "args": [{
        "channel": "call-auction-details",
        "instId": "ONDO-USDC"
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
        "channel": "call-auction-details",
        "instId": "ONDO-USDC"
    }]

    await ws.subscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

    await ws.unsubscribe(args, callback=callbackFunc)
    await asyncio.sleep(10)

asyncio.run(main())
```

#### 请求参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识。<br>用户提供，返回参数中会返回以便于找到相应的请求。<br>字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度必须要在1-32位之间。</td></tr><tr><td>op</td><td>String</td><td>是</td><td>操作<br><code>subscribe</code><br><code>unsubscribe</code></td></tr><tr><td>args</td><td>Array of objects</td><td>是</td><td>请求订阅的频道列表</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名<br><code>call-auction-details</code></td></tr><tr><td>&gt; instId</td><td>String</td><td>是</td><td>产品ID</td></tr></tbody></table>

> 成功返回示例

```
{
  "id": "1512",
  "event": "subscribe",
  "arg": {
      "channel": "call-auction-details",
      "instId": "ONDO-USDC"
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
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"call-auction-details\", \"instId\" : \"BTC-USD-191227\"}]}",
  "connId": "a4d3ae55"
}
```

#### 返回参数

<table><thead><tr><th>参数</th><th>类型</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>id</td><td>String</td><td>否</td><td>消息的唯一标识</td></tr><tr><td>event</td><td>String</td><td>是</td><td>事件<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code></td></tr><tr><td>arg</td><td>Object</td><td>否</td><td>订阅的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>是</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>是</td><td>产品ID</td></tr><tr><td>code</td><td>String</td><td>否</td><td>错误码</td></tr><tr><td>msg</td><td>String</td><td>否</td><td>错误消息</td></tr><tr><td>connId</td><td>String</td><td>是</td><td>WebSocket连接ID</td></tr></tbody></table>

> 推送示例

```
{
  "arg": {
    "channel": "call-auction-details",
    "instId": "ONDO-USDC"
  },
  "data": [
        {
            "instId": "ONDO-USDC",
            "unmatchedSz": "9988764",
            "eqPx": "0.6",
            "matchedSz": "44978",
            "state": "continuous_trading",
            "auctionEndTime": "1726542000000",
            "ts": "1726542000007"
        }
  ]
}
```

#### 推送数据参数

<table><thead><tr><th>参数名</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>arg</td><td>Object</td><td>订阅成功的频道</td></tr><tr><td>&gt; channel</td><td>String</td><td>频道名</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>data</td><td>Array of objects</td><td>订阅的数据</td></tr><tr><td>&gt; instId</td><td>String</td><td>产品ID</td></tr><tr><td>&gt; eqPx</td><td>String</td><td>均衡价格</td></tr><tr><td>&gt; matchedSz</td><td>String</td><td>买卖双边的匹配数量，单位为交易货币</td></tr><tr><td>&gt; unmatchedSz</td><td>String</td><td>未匹配数量</td></tr><tr><td>&gt; auctionEndTime</td><td>String</td><td>集合竞价结束时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr><tr><td>&gt; state</td><td>String</td><td>交易状态<br><code>call_auction</code>：集合竞价<br><code>continuous_trading</code>：连续交易</td></tr><tr><td>&gt; ts</td><td>String</td><td>数据产生时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
在集合竞价期间，用户可以获取均衡价格、匹配数量、未匹配数量和集合竞价结束时间的更新。数据大约每秒更新一次。当集合竞价结束时，该频道将推送最后一条消息，返回实际开盘价、匹配数量和未匹配数量，交易状态state为\`continuous\_trading\`。
:::

## SBE 行情数据

### 概述

以下 WebSocket 频道返回的数据支持简单二进制编码（SBE）：

*   [WS / 交易频道](/zh/order-book-trading-market-data-ws-trades-channel)：`trades`
*   [WS / 深度频道](/zh/order-book-trading-market-data-ws-order-book-channel)：`bbo-tbt` 和 `books-l2-tbt`

### XML Schema

SBE XML schema 已经发布：

[下载 XML Schema](xml/okx_sbe_1_0.xml)

### 基本信息

*   `bbo-tbt` 频道**无用户等级限制**，但需登录后方可订阅；`trades` 与 `books-l2-tbt` 频道在实盘环境仅对交易费等级 **VIP4 及以上** 用户开放，其他用户接入将收到错误码64003。在模拟盘环境仅对交易费等级 **VIP1** 及以上 用户开放。  
    
*   SBE 频道将使用新的 WebSocket URL。  
    实盘交易：`wss://ws.okx.com:8443/ws/v5/public-sbe`  
    模拟盘交易：`wss://wspap.okx.com:8443/ws/v5/public-sbe`  
    
*   同一个连接上会同时存在 JSON 和 SBE 格式的数据，可以通过 WebSocket 帧类型区分。opcode `1` 表示 JSON，opcode `2` 表示 SBE。  
    
*   价格和数量将会使用尾数和指数来表示。例如，尾数为 123456，指数为 -4，表示 12.3456（实际值 = 尾数 \* 10 ^ 指数）。  
    
*   [获取交易产品基础信息](/zh/public-data-rest-api-get-instruments) 接口会新增整数类型的 `instIdCode` 字段，SBE 协议将会使用该字段代表交易产品，用户需要将 `instIdCode` 映射为 `instId`. 请注意 `instIdCode` 在交易产品重新上币时会发生改变，然而，`instIdCode` 在 `instId` 重命名时保持不变。  
    
*   `tsUs` 和 `outTime` 来自不同的服务，因此它们的相对顺序无法保证。
*   `tsUs` 是微秒格式时间戳，但是仅精确到毫秒。毫秒时间加上 `000` 得到微秒格式时间。比如：毫秒时间 1726233600001 对应的微秒格式时间 (tsUs) 为 1726233600001000。

### 接入信息

*   需在 WebSocket 连接请求头中添加 API key 和 签名进行登录：  
    *   连接请求必须包含以下内容：  
        *   `OK-ACCESS-KEY`：API 密钥，字符串格式。  
            
        *   `OK-ACCESS-SIGN`：Base64 编码的签名。  
            
        *   `OK-ACCESS-TIMESTAMP`：Unix Epoch 时间（秒），例如：`1751335333`。  
            
        *   `OK-ACCESS-PASSPHRASE`：创建 API 密钥时指定的 Passphrase。  
            
    *   `OK-ACCESS-SIGN` 头的生成方式如下：  
        *   准备签名前字符串：`timestamp + method + requestPath`  
            
        *   准备 SecretKey。  
            
        *   使用 HMAC SHA256 算法对签名前字符串进行签名。  
            
        *   将签名编码为 Base64 格式。例如：sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + '/users/self/verify', SecretKey))  
            
        *   `timestamp` 示例：const timestamp = '' + Date.now() / 1,000，例如 `1704876947`。  
            
        *   `method`：始终为 'GET'。  
            
        *   `requestPath`：始终为 '/users/self/verify'。  
            
    *   HTTP 响应状态码 `101` 表示登录成功。  
        
    *   HTTP 响应状态代码 `401` 表示登录失败，响应体中会包含报错消息，报错消息采用 JSON 格式。  
        

```
登录报错示例：
{
    "msg": "Invalid apiKey",
    "code": "60005"
    "connId":"24a2aea3"
}
```

*   订阅请求必须以 JSON 格式发送，响应也将采用 JSON 格式，可通过 opcode `1`识别是否为 JSON 格式的消息。  
    *   协议类似于现有的 JSON 格式订阅请求/响应。  
        
    *   区别在于应该使用 `instIdCode` 而非 instId。  
        

```
订阅请求示例
{
    "op": "subscribe",
    "args": [
        {
            "channel": "trades",
            "instIdCode": 211874
        }
    ]
}

订阅响应示例
{
    "event": "subscribe",
    "arg": {
        "channel": "trades",
        "instIdCode": 211874
    },
    "connId": "accb8e21"
}
```

*   通知事件支持 JSON 格式：

```
通知事件示例
{
    "event": "notice",
    "code": "64008",
    "msg": "The connection will soon be closed for a service upgrade. Please reconnect.",
    "connId": "a4d3ae55"
}
```

*   服务端在收到 pong 帧 20 秒后会发送一次操作码为 `9` 的 ping 帧。  
    *   如果 WebSocket 服务器在 60 秒内未收到 pong 帧，连接将自动断开。  
        
    *   收到 ping 帧后，需尽快以 opcode `10` 的 pong 帧响应，并复制 ping 帧的 `payload`（`payload`为随机数字文本，如 11446744073709551615）。  
        
    *   允许发送未经请求的 pong 帧，但无法阻止断开连接。建议这些 pong 帧的 `payload` 为空。  
        
*   对于 `trades`、`bbo-tbt` 和 `books-l2-tbt` 频道，数据将以 SBE 二进制格式返回，可以通过 opcode `2` 识别，通过 template ID 区分频道。与现有的 JSON 格式连接相比，主要区别包括：  
    *   对于 `trades` 频道，返回 `seqId`。  
        
    *   对于 `bbo-tbt` 频道，提供实时数据，但在系统超载时可能会发生数据丢失，不同连接的数据可能会不一样。  
        
    *   对于 `books-l2-tbt`：  
        *   当价格和数量的小数位发生变化时，会推送指数更新消息（template ID: 1002），包含上一个推送的序列号和当前推送的序列号，可以通过 template ID 进行识别。为了保持序列号一致性，必须处理指数更新消息。  
            
        *   将不再返回 `checksum`。  
            
        *   订阅后不再推送初始快照数据。但是，欧易 将提供 REST API 接口：获取产品 SBE 深度，返回 SBE 二进制格式的 400 档快照数据。该接口约每 500 毫秒更新一次，收到请求后不会立刻返回，而是会待服务端缓存数据更新后立即返回最新数据。  
            
*   频道与事件的关系不是一一对应的。books-l2-tbt 包含两种类型的事件。映射关系如下所示。

<table><thead><tr><th style="text-align: left">频道</th><th style="text-align: left">XML Template ID 和 message name</th></tr></thead><tbody><tr><td style="text-align: left">bbo-tbt</td><td style="text-align: left">1000: BboTbtChannelEvent</td></tr><tr><td style="text-align: left">books-l2-tbt</td><td style="text-align: left">1001: BooksL2TbtChannelEvent<br>1002: BooksL2TbtExponentUpdateEvent</td></tr><tr><td style="text-align: left">books-l2-tbt-elp<br>（未启用）</td><td style="text-align: left">1003: BooksL2TbtElpChannelEvent<br>1004: BooksL2TbtElpExponentUpdateEvent</td></tr><tr><td style="text-align: left">trades</td><td style="text-align: left">1005: TradesChannelEvent</td></tr></tbody></table>

*   如何正确管理本地订单簿
    
    1.  打开 SBE WebSocket 连接并订阅 `books-l2-tbt` 频道。
    2.  缓存从频道中接收的事件。记录您接收到的第一个事件的 `prevSeqId`。  
        注意：对于 template ID 1002 是指数更新事件，仅包含指数更新信息，不包含买入和卖出数据。对于模板ID 1001，会包含买入和卖出数据。
    3.  从 `/books-sbe` 获取深度快照，例如 `https://openapi.okx.com/api/v5/market/books-sbe?instIdCode=12345&source=0`
    4.  如果快照的 `seqId` 小于步骤 2 中的 `prevSeqId`，请返回步骤 3。
    5.  在缓存的事件中，丢弃事件 `seqId` <= 快照 `seqId` 的任何事件。
    6.  对于缓存中的第一个事件，满足该条件： `seqId`： 事件`prevSeqId` <= 快照 `seqId` < 事件 `seqId`。
    7.  将您的本地订单簿设置为本地快照。它的序列号就是快照 `seqId`。
    8.  对所有缓存的事件，使用下面的流程处理，同样适用于所有后续接收的事件。
        *   如果 template ID 为 1002（BooksL2TbtExponentUpdateEvent），则仅更新指数，不包含买入和卖出数据。如果 template ID 为 1001（BooksL2TbtChannelEvent），则按照以下流程处理。
        *   对于 bids 和 asks 中的每组价格数据，在订单簿中更新数量：
            *   如果价格数据在订单簿中不存在，则插入新数量。
            *   如果数量为零，则从订单簿中删除价格数据。
        *   将订单簿序列号设置为最新的序列号(`seqId`)。  
            注意：不是所有快照 seqId 都会出现在 `books-l2-tbt` 频道中。
*   序列号
    

`seqId`是交易所行情的一个序号。如果用户通过多个websocket连接同一频道，收到的序列号会是相同的。每个`instIdCode`对应一套。用户可以使用在增量推送频道的`prevSeqId`和`seqId`来构建消息序列。这将允许用户检测数据包丢失和消息的排序。正常场景下`seqId`的值大于`prevSeqId`。新消息中的`prevSeqId`与上一条消息的`seqId`匹配。最小序列号值为0，除了快照消息的`prevSeqId`为-1。  

异常情况：  
1\. 如果一段时间内（约 60 秒）没有深度更新，对于定量推送频道，OKX 会推送最近的一条更新，对于增量推送频道，OKX将发一条 numInGroup: 0 的消息以通知用户连接是正常的。推送的`seqId`跟上一条信息的一样，`prevSeqId`等于`seqId`。  
2\. 序列号可能由于维护而重置，在这种情况下，用户将收到一条`seqId`小于`prevSeqId`的增量消息。随后的消息将遵循常规的排序规则。

##### 示例

1.  增量推送1（正常更新）：`prevSeqId = 10`，`seqId = 15`
2.  增量推送2（无更新）：`prevSeqId = 15`，`seqId = 15`
3.  增量推送3（序列重置）：`prevSeqId = 15`，`seqId = 3`
4.  增量推送4（正常更新）：`prevSeqId = 3`，`seqId = 5`

### SBE 订单簿

这是一个公共接口，返回初始 400 档快照的 SBE 二进制数据。该接口约每 500 毫秒更新一次，收到请求后不会立刻返回，而是会待服务端缓存数据更新后立即返回最新数据。  
  

注意：如果请求失败，错误消息的格式将会是 JSON。  
  

对于 HTTP 请求头，不需要设置为 `application/sbe`；但是，如果请求成功，响应头为 `Content-Type`: `application/sbe`，如果请求失败，则为 `Content-Type`: `application/json`。

#### 限速：10 次/10 秒

#### 限速规则：IP + instIdCode

#### HTTP 请求

`GET /api/v5/market/books-sbe`

> 请求示例

```
GET /api/v5/market/books-sbe?instIdCode=12345&source=0
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">instIdCode</td><td style="text-align: left">Integer</td><td style="text-align: left">是</td><td style="text-align: left">产品 ID 唯一标识码。</td></tr><tr><td style="text-align: left">source</td><td style="text-align: left">Integer</td><td style="text-align: left">是</td><td style="text-align: left">订单簿的来源。<br><code>0</code>: 普通</td></tr></tbody></table>

> 返回示例

```
错误消息示例

返回头：
Content-Type: application/json

返回 body：
{
    "code": "51000",
    "msg": "Parameter instIdCode error",
    "data": []
}
```

#### 返回参数

请参考 XML schema 中 ID 为 `1006` 的 `SnapshotDepthResponseEvent`。

### 新增错误码

<table><thead><tr><th>错误码</th><th>HTTP 状态码</th><th>错误提示</th></tr></thead><tbody><tr><td>60034</td><td>401</td><td>该频道仅支持手续费等级为 {0} 及以上的用户订阅使用</td></tr></tbody></table>

### 升级

*   通常情况下，升级是兼容的（例如新增一个字段）。这种情况下，XML schema ID 不会变化，但 schema version 会增加。
*   如果涉及不兼容的变更，则会至少提前 1–2 个月发布新的 XML schema（使用新的 schema ID）。在过渡期结束前，你需要做好同时使用新旧 XML schema 处理数据的准备（基于他们的 schema ID 和 version）。
