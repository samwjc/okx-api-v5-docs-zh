---
title: 全披露经纪商(API和OAuth)
outline: deep
---

## 简介

全披露经纪商，按照鉴权和运作方式的不同，可以分为两种经纪商模式，即 API经纪商、OAuth经纪商。如果您是聚合交易平台、交易机器人、量化机构、资管平台等，需要 OKX 提供账户及流动性，赋能于交易用户，OKX FD Broker 是你最好的选择。  
  

API经纪商：  

*   集成欧易API，实现经纪商平台与用户的高效对接，享受独特的经纪商功能。
*   用户在欧易申请APIKey并提供给经纪商,通过Brokercode+用户API Key下单。

OAuth经纪商：  

*   OAuth一键授权登陆，更安全、更便捷的的经纪商&用户对接方式
*   经纪商提供用户跳转到欧易Oauth授权功能,通过Broker code+用户鉴权码下单。
*   更多详情可参考[经纪商主页](/cn/broker/home)。

FD Broker 的优势如下  

*   丰厚的佣金奖励机制
    *   高达 50% 的佣金奖励
    *   新老用户均可返佣
    *   支持与节点返佣叠加，享受更高佣金比例
    *   支持高 VIP 返佣策略
*   灵活的佣金管理机制
*   更安全的用户接入方案
    *   FAST API，更便捷的API接入方式
    *   第三方 IP 白名单，安全可靠的平台绑定方案

## OAuth 经纪商

### 简介

OKX OAuth一键授权登陆，提供更安全、更便捷的的经纪商&用户对接方式。  
通过欧易OAuth 2.0用户仅需要在第三方应用内一键授权，即可进行交易。无需用户提供账户API Key或者登录密码。  
欧易OAuth 2.0支持WEB和APP应用，基于OAuth 2.0协议（RFC 6749）和 OAuth 2.1草案协议中的一些新特征开发。  
相关技术文档可联系商务获取。

### 接入前的准备

1.  官网注册账户申请经纪商  
    您需要先申请成为OAuth经纪商，审核通过后您可以获取到`client_id`，`client_secret`信息。专属客户经理会提供给您相应的开发文档。  
    **接入步骤：**  
    1.  经纪商申请OKX的账户
    2.  经纪商进入OKX经纪商官网申请OAuth经纪商，填写申请表，红色星为必填
    3.  OKX收到申请表后2天内会进行审核
    4.  申请表在OKX的后台审核通过后，经纪商会收到邮件通知，邮件内容包括`client_id`和`client_secret`
2.  OAuth返佣设置  
    当前接入的OAuth经纪商的返佣需要设置标签，下单时需要将BrokerCode标识填写到tag字段里，作为返佣订单统计的标识。

### 授权模式介绍

欧易OAuth 2.0提供的授权模式：授权码模式、PKCE模式。

<table><thead><tr><th>授权模式</th><th>描述</th><th>使用场景</th></tr></thead><tbody><tr><td>授权码模式</td><td>用户授权，第三方应用提供<code>client_secret</code>获取授权码。通过授权码获取<code>访问令牌</code>和<code>刷新令牌</code>。</td><td>应用有服务器，可存储应用密钥，与欧易OAuth服务器进行密钥交互。</td></tr><tr><td>PKCE模式</td><td>用户授权，第三方应用提供临时密钥<code>code_verifier</code>获取授权码。通过授权码获取<code>访问令牌</code>和<code>刷新令牌</code></td><td>应用无服务器（或不愿意后端服务器介入授权过程），无法存储应用密钥，通过随机字符串与欧易OAuth服务器进行交互。</td></tr></tbody></table>

#### 授权码模式

同时支持App与Web应用的接入，呈现授权页面给用户，第三方应用在获取用户的授权码后，可以凭借此授权码换取访问令牌，调用OKX OpenAPI，访问用户授权的数据资源。

![](https://static.okx.com/cdn/assets/academy/oauth-pic/code-1.0-cn.svg)

#### PKCE模式

若第三方应用无服务端或者不希望服务端参与授权过程，无法存储第三方应用密钥（client\_secret），则推荐此模式，通过应用客户端接入获取令牌，有效提升开发者应用的安全防护。

![](https://static.okx.com/cdn/assets/academy/oauth-pic/pkce-1.0-cn.svg)

### 令牌的使用

#### 令牌的区别

第三方应用通过授权码调用换取令牌接口后，会得到两种令牌。

*   访问令牌(access token): 用于第三方应用调用OKX OpenAPI接口。
*   刷新令牌(refresh token): 当访问令牌失效后，用户获取新的访问令牌。

#### 如何使用

> 请求示例

```
curl -H "Content-Type:application/json" \
-H "Authorization:Bearer ******"  \
-H "TERMID:32cf9c63-6737-4ab5-b1ab-8858ae659185" \
https://openapi.okx.com/api/v5/asset/currencies
```

第三方应用完成授权并获取到令牌后，就可以通过访问令牌调用OKX OpenAPI接口了。 请求时需要在请求头中携带如下信息：

<table><thead><tr><th>请求头字段</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>Authorization</td><td>是</td><td>将<code>访问令牌</code>以Bearer的方式填写到此字段</td></tr><tr><td>TERMID</td><td>可选</td><td>用于校验请求合法性的设备号信息<br>如果请求是由第三方应用客户端应用发起的（如选择了PKCE模式），则客户端应将客户端设备号在请求时带上<br>如果请求是由第三方应用服务端发起的（如选择了授权码模式），则无需填写此字段</td></tr></tbody></table>

#### 令牌的有效期

*   访问令牌(access token)：有效期为1个小时。
*   刷新令牌(refresh token)：有效期为3天。

超过了访问令牌的有效期，接口会调用失败，如果刷新令牌还在有效期内，第三方应用需要调用刷新令牌接口，获取新的一对访问令牌和刷新令牌。新的访问令牌可以继续使用。需要注意的是，一旦刷新了令牌，无论原来的令牌有没有过期，都不再有效。  
当您撤销令牌后，原令牌将不再有效。

### 权限

<table><thead><tr><th>权限</th><th>描述</th></tr></thead><tbody><tr><td>read_only</td><td>拥有读取功能的权限（不包含子账户模块）</td></tr><tr><td>trade</td><td>拥有交易功能的权限（不包含子账户模块）</td></tr></tbody></table>

### Fast API

  
**简介**  
  

Fast API是帮助OKX用户快速授权第三方应用，创建APIKey并绑定第三方应用的功能。

  
**Fast API工作流程**  
  

![](https://static.okx.com/cdn/assets/academy/oauth-pic/fast_api_zh.png)

API Broker的界面上Broker用户登录之后，可以通过Oauth授权跳转到登录OKX页面，在OKX页面登录授权以后，OKX会授权该API Broker 拥有为其用户创建拥有`读取`和`交易`权限的API Key。

  
**申请流程**  

1.  在OKX申请API和OAuth经纪商
    *   建议申请第三方APP IP白名单  
        
2.  在OauthBroker应用程序中，提供  
    *   第三方服务器IP白名单
    *   重定向URL
    *   Logo
    *   Fast API权限
    *   跨域域名
3.  申请成功后，您会收到一封电子邮件，包含client\_id和client\_secret。请务必妥善保存此信息，不要对他人展示。

## 经纪商返佣API

*   可以通过[节点接口](/zh/affiliate)判断用户是否是自己的节点邀请用户
*   可以通过[获取用户的 Broker 返佣信息](/broker_zh/fully-disclosed-broker-api-and-oauth-broker-commision-api-get-the-user-39-s-broker-rebate-information)接口判断用户是否可以给 Broker 返佣
*   返佣数据下载
    *   先通过[生成返佣明细下载链接(FD)](/broker_zh/fully-disclosed-broker-api-and-oauth-broker-commision-api-create-rebate-details-download-link-fd)接口生成数据
    *   再通过[获取返佣明细下载链接(FD)](/broker_zh/fully-disclosed-broker-api-and-oauth-broker-commision-api-get-download-link-fd)接口下载数据

### 获取返佣明细下载链接(FD)

获取已经申请成功的返佣明细下载链接，每次请求时获取新的链接，且2小时内有效。

#### 限速：2次/1min

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/fd/rebate-per-orders`

> 请求示例

```
GET /api/v5/broker/fd/rebate-per-orders?type=false&begin=20221207&end=20230207
```

```
import okx.FDBroker as FDbroker

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "0"  # 实盘:0 , 模拟盘：1

fdBrokerAPI = FDbroker.FDBrokerAPI(apikey, secretkey, passphrase, False, flag)

# 获取返佣明细下载链接
result = fdBrokerAPI.get_rebate_details_download_link(
    type="true"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">筛选条件类型<br><code>true</code>：获取当前用户所有已生成的历史记录<br><code>false</code>：查询指定的历史记录</td></tr><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">查询链接生成的起始日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/23 00:00:00</code>（包含）后的记录<br>如果type为<code>false</code>，该字段必填</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">查询链接生成的结束日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/24 00:00:00</code>（不包含）前的记录<br>如果type为<code>false</code>，该字段必填</td></tr><tr><td style="text-align: left">brokerType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">经纪商类型<br><code>api</code>：API经纪商<br><code>oauth</code>：Oauth经纪商<br>当经纪商只有一种类型时，该参数可以不填<br>当经纪商有多种类型时，该参数必填</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data": [
        {
            "beginTime": "1671638400000",
            "cTime": "1671675432000",
            "endTime": "1671638400000",
            "fileHref": "http://okg-pri-hk.oss-cn-hongkong.aliyuncs.com/okex/broker/pap/brokerRebateInfo/******/******/2022-12-22/RebateDetails/RebateDetails1222-1222.csv?Expires=1697617451&OSSAccessKeyId=******&Signature=******",
            "state": "finished",
            "ts": "1671676696000"
        }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">fileHref</td><td style="text-align: left">String</td><td style="text-align: left">文件链接</td></tr><tr><td style="text-align: left">beginTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣明细的开始时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">endTime</td><td style="text-align: left">String</td><td style="text-align: left">返佣明细的结束时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">cTime</td><td style="text-align: left">String</td><td style="text-align: left">生成下载链接的首次请求时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">下载链接生成时间，Unix时间戳的毫秒数格式 ，如 <code>1597026383085</code></td></tr><tr><td style="text-align: left">state</td><td style="text-align: left">String</td><td style="text-align: left">下载链接状态<br><code>finished</code>：已生成<br><code>ongoing</code>：生成中</td></tr></tbody></table>

#### 解压后CSV里的字段说明

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">brokerCode</td><td style="text-align: left">申请到的BrokerCode标识</td></tr><tr><td style="text-align: left">level</td><td style="text-align: left">用户等级，如Lv1, VIP1, VIP2</td></tr><tr><td style="text-align: left">uid</td><td style="text-align: left">账户 UID</td></tr><tr><td style="text-align: left">instId</td><td style="text-align: left">产品ID</td></tr><tr><td style="text-align: left">ordId</td><td style="text-align: left">订单ID</td></tr><tr><td style="text-align: left">clOrdId</td><td style="text-align: left">客户自定义订单ID。如果下单时未提供，则返回空字符串</td></tr><tr><td style="text-align: left">spotTradeAmt</td><td style="text-align: left">现货交易量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">derivativeTradeAmt</td><td style="text-align: left">衍生品交易量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">fee</td><td style="text-align: left">手续费，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">netFee</td><td style="text-align: left">净手续费 (去除返佣卡、对手方等数据后进行返佣结算的手续费基数)，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">settlementFee</td><td style="text-align: left">结算手续费 (去除节点返佣、返佣卡等，Broker进行结算前的手续费基数)，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">brokerRebate</td><td style="text-align: left">经纪商返佣量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">suBrokerRebate</td><td style="text-align: left">经纪商助力人返佣量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">userRebate</td><td style="text-align: left">用户返佣量，单位为<code>USDT</code></td></tr><tr><td style="text-align: left">affiliated</td><td style="text-align: left">是否有节点返佣<br><code>true</code>：节点返佣<br><code>false</code>：无节点返佣</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">该笔订单当天最后一次成交时间<br>Unix 时间戳为毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

### 生成返佣明细下载链接(FD)

支持FD Broker的所有历史返佣明细。

#### 限速：1次/1h

#### 限速规则：User ID

#### HTTP请求

`POST /api/v5/broker/fd/rebate-per-orders`

> 请求示例

```
POST /api/v5/broker/fd/rebate-per-orders
body
{
    "begin":"20210623",
    "end":"20210626"
}
```

```
import okx.FDBroker as FDbroker

# API 初始化
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "0"  # 实盘:0 , 模拟盘：1

fdBrokerAPI = FDbroker.FDBrokerAPI(apikey, secretkey, passphrase, False, flag)

# 生成返佣明细下载链接
result = fdBrokerAPI.generate_rebate_details_download_link(
    begin="20210623",
    end="20210626"
)
print(result)
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">begin</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">起始日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/23 00:00:00</code>（包含）后的记录</td></tr><tr><td style="text-align: left">end</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">结束日期<br>格式: <code>YYYYMMdd</code>，如 <code>20210623</code>，查询在 <code>2021/06/24 00:00:00</code>（不包含）前的记录</td></tr><tr><td style="text-align: left">brokerType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">经纪商类型<br><code>api</code>：API经纪商<br><code>oauth</code>：Oauth经纪商<br>当经纪商只有一种类型时，该参数可以不填<br>当经纪商有多种类型时，该参数必填</td></tr></tbody></table>

::: tip
一次请求下载的数据时间范围begin和end的区间为180天
:::

> 返回结果

```
{
    "code": "0",
    "data":[
      {
        "result": "true",
        "ts": "1646892328000"
      }
    ],
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left"><strong>参数名</strong></th><th style="text-align: left"><strong>类型</strong></th><th style="text-align: left"><strong>描述</strong></th></tr></thead><tbody><tr><td style="text-align: left">result</td><td style="text-align: left">String</td><td style="text-align: left">是否已经存在该区间的下载链接<br><code>true</code>：已存在，可以通过"获取返佣明细下载链接"接口获取<br><code>false</code>：不存在，正在生成，请2个小时后查看下载链接</td></tr><tr><td style="text-align: left">ts</td><td style="text-align: left">String</td><td style="text-align: left">服务端首次收到请求的时间，Unix时间戳的毫秒数格式，如 <code>1597026383085</code></td></tr></tbody></table>

::: tip
生成该数据需要一定的时间，请于 2 小时后查看来自"获取返佣明细下载链接(FD)"接口的文件链接；  
平台需求量较多的情况下，生成数据所需要的时间会有所延长，如果超过 3 小时，请联系客服进行反馈。
:::

### 获取用户的 Broker 返佣信息

FD broker 查询用户是否有返佣条件，满足Broker返佣条件、下单时指定了 brokerCode、且用户的交易产生手续费时，Broker 会获得返佣。

#### 限速：5次/2s

#### 限速规则：User ID

#### HTTP请求

`GET /api/v5/broker/fd/if-rebate`

> 请求示例

```
GET /api/v5/broker/fd/if-rebate?apiKey=63d54aa0-0020-4ad9-a9f0-ac92654bc831
```

#### 请求参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">是否必须</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">apiKey</td><td style="text-align: left">String</td><td style="text-align: left">是</td><td style="text-align: left">用户的 API key</td></tr><tr><td style="text-align: left">brokerType</td><td style="text-align: left">String</td><td style="text-align: left">可选</td><td style="text-align: left">经纪商类型<br><code>api</code>：API经纪商<br><code>oauth</code>：Oauth经纪商<br>当经纪商只有一种类型时，该参数可以不填<br>当经纪商有多种类型时，该参数必填</td></tr></tbody></table>

> 返回结果

```
{
    "code": "0",
    "data":[
      {
        "affiliated": false,
        "brokerCode": "6099c63a8d75SCDE",
        "type": "4",
        "clientRebateRatio":"0",
        "lastRebate":""
      }
    ] ,
    "msg": ""
}
```

#### 返回参数

<table><thead><tr><th style="text-align: left">参数名</th><th style="text-align: left">类型</th><th style="text-align: left">描述</th></tr></thead><tbody><tr><td style="text-align: left">type</td><td style="text-align: left">String</td><td style="text-align: left">账户无法Broker返佣的原因<br><code>0</code>：可以返佣<br><code>1</code>：Broker身份过期<br><code>2</code>：手续费等级为<code>VIP5/6</code>且月返佣金额达到上限<br><code>3</code>：手续费等级大于等于<code>VIP7</code><br><code>4</code>：MSA 账户无法获得 Broker 返佣</td></tr><tr><td style="text-align: left">brokerCode</td><td style="text-align: left">String</td><td style="text-align: left">FD broker 申请到的 BrokerCode 标识</td></tr><tr><td style="text-align: left">affiliated</td><td style="text-align: left">String</td><td style="text-align: left">绑定关系的情况，有无节点返佣<br><code>true</code>：有节点返佣<br><code>false</code>：无节点返佣</td></tr><tr><td style="text-align: left">clientRebateRatio</td><td style="text-align: left">String</td><td style="text-align: left">交易用户可获取返佣比例</td></tr><tr><td style="text-align: left">lastRebate</td><td style="text-align: left">String</td><td style="text-align: left">账号月返佣金额，仅适用于 VIP5 和 VIP6 的用户</td></tr></tbody></table>

## 错误码

<table><thead><tr><th>错误提示</th><th>HTTP 状态码</th><th>错误码</th></tr></thead><tbody><tr><td>53000</td><td>400</td><td>无效的token</td></tr><tr><td>53001</td><td>400</td><td>无效的授权，用户已取消授权</td></tr><tr><td>53002</td><td>400</td><td>token已过期</td></tr><tr><td>53003</td><td>400</td><td>token已撤销</td></tr><tr><td>53004</td><td>400</td><td>用户已被冻结</td></tr><tr><td>53005</td><td>400</td><td>刷新令牌不正确</td></tr><tr><td>53006</td><td>401</td><td>无效的设备</td></tr><tr><td>53009</td><td>400</td><td>授权失败</td></tr><tr><td>53010</td><td>400</td><td>参数{0}错误</td></tr><tr><td>53011</td><td>400</td><td>必填参数{0}不能为空</td></tr><tr><td>53012</td><td>400</td><td>授权码已过期，请确保在有效时间内，并且使用的是正确的域名。</td></tr><tr><td>53013</td><td>400</td><td>接口权限不足</td></tr><tr><td>53014</td><td>401</td><td>无效的IP</td></tr><tr><td>53015</td><td>400</td><td>参数{参数名}长度超过最大限制{长度}</td></tr><tr><td>53016</td><td>400</td><td>无效的redirect_uri</td></tr><tr><td>53017</td><td>400</td><td>快捷 API 权限尚未开启</td></tr></tbody></table>
