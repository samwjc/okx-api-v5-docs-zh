---
title: 快速开始
outline: deep
---

## OpenClaw

> **安全提示：** 切勿将您的 API Key、Secret Key 或 Passphrase 粘贴到对话框中。AI 不应也无需直接接触您的凭证，请始终将其保存在配置文件中。由于 AI 在 OpenClaw 中的行为具有不确定性，强烈建议使用**子账户的 API Key** 而非主账户，并仅开启所需的最小权限。

**第一步 — 安装 Skills**

打开 OpenClaw，将以下提示语粘贴到对话框中发送——不是命令行：

> 运行 `npx skills add okx/agent-skills`，自主解决所有碰到的问题，查询 BTC 价格。

**第二步 — 配置 API 凭证**

打开终端，运行：

```
mkdir -p ~/.okx && cat > ~/.okx/config.toml << 'EOF'
default_profile = "demo"

[profiles.live]
api_key    = "your-live-api-key"
secret_key = "your-live-secret-key"
passphrase = "your-live-passphrase"

[profiles.demo]
api_key    = "your-demo-api-key"
secret_key = "your-demo-secret-key"
passphrase = "your-demo-passphrase"
demo       = true
EOF
```

用任意文本编辑器打开 `~/.okx/config.toml`，填入您的 `api_key`、`secret_key` 和 `passphrase`，保存即可。

**获取 API Key：** [API 页面](https://www.okx.com/account/my-api) — 建议先从模拟盘开始。

## MCP 客户端

Claude Desktop、Claude Code、Cursor、VS Code、Windsurf，以及所有兼容 MCP 的客户端。

### 第一步 — 安装

```
npm install -g @okx_ai/okx-trade-mcp @okx_ai/okx-trade-cli
```

验证安装：

```
okx market ticker BTC-USDT
```

💡 行情数据可立即使用，无需 API Key。

### 第二步 — 添加 OKX API 凭证

```
okx config init
```

交互式向导将引导您完成 `~/.okx/config.toml` 的创建与配置，运行一次即可完成。

**获取 API Key：** [API 页面](https://www.okx.com/account/my-api) — 建议先从模拟盘开始。

**或手动配置** — 跳过向导，直接创建 `~/.okx/config.toml`：

```
default_profile = "demo"    # 默认加载哪个 Profile

# Profile 名称是您自定义的标签，可随意命名。
# 启动时通过 --profile <名称> 切换不同配置。
# "demo" 和 "live" 只是惯用命名，名称本身没有特殊含义。

[profiles.demo]
api_key    = "your-demo-api-key"
secret_key = "your-demo-secret-key"
passphrase = "your-demo-passphrase"
demo       = true    # demo = true → 模拟盘交易，不涉及真实资金

[profiles.live]
api_key    = "your-live-api-key"
secret_key = "your-live-secret-key"
passphrase = "your-live-passphrase"
             # 无 demo 标志 → 实盘交易，使用真实资金
```

#### 站点配置

OKX 在不同地区运营独立站点。请在 Profile 中添加 `site` 字段，与您账号所在站点保持一致：

<table><thead><tr><th>站点</th><th>网址</th><th>适用人群</th></tr></thead><tbody><tr><td><code>global</code> <em>（默认）</em></td><td><code>www.okx.com</code></td><td>全球大多数用户</td></tr><tr><td><code>eea</code></td><td><code>my.okx.com</code></td><td>EEA / 欧洲用户</td></tr><tr><td><code>us</code></td><td><code>app.okx.com</code></td><td>美国用户</td></tr></tbody></table>

```
[profiles.live]
site       = "global"    # global | eea | us（不填则默认为 global）
api_key    = "your-api-key"
secret_key = "your-secret-key"
passphrase = "your-passphrase"
```

#### 代理配置

如果您需要通过代理访问网络，可在 Profile 中添加 `proxy_url` 字段。根据代理类型选择以下其中一种配置：

无需认证：

```
[profiles.demo]
api_key    = "your-api-key"
secret_key = "your-secret-key"
passphrase = "your-passphrase"
demo       = true
proxy_url  = "http://proxy.example.com:8080"
```

需要用户名和密码：

```
[profiles.demo]
api_key    = "your-api-key"
secret_key = "your-secret-key"
passphrase = "your-passphrase"
demo       = true
proxy_url  = "http://user:password@proxy.example.com:8080"
```

密码含特殊字符时需进行 URL encode（例如 `p@ss` → `p%40ss`）：

```
proxy_url = "http://user:p%40ss@proxy.example.com:8080"
```

### 第三步 — 连接 AI 客户端

```
okx-trade-mcp setup --client <client>
```

<table><thead><tr><th>客户端</th><th><code>&lt;client&gt;</code> 值</th></tr></thead><tbody><tr><td>Claude Desktop</td><td><code>claude-desktop</code></td></tr><tr><td>Claude Code</td><td><code>claude-code</code></td></tr><tr><td>Cursor</td><td><code>cursor</code></td></tr><tr><td>VS Code</td><td><code>vscode</code></td></tr><tr><td>Windsurf</td><td><code>windsurf</code></td></tr></tbody></table>

如需手动配置，请参阅 GitHub 上的 [Client Setup (Manual)](https://github.com/okx/agent-trade-kit/blob/master/docs/configuration.md#client-setup-manual)。

### 第四步 — 试用

打开您的 AI 客户端，输入：

```
OKX 上 BTC 现在的价格是多少？
查看我的账户余额
在模拟盘用市价单买入 100 USDT 的 BTC
BTC-USDT-SWAP 的资金费率是多少？
```
