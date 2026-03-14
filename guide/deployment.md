# 部署指南

详细的 Cloudflare Workers 部署步骤。

## 前置要求

- Node.js 18+ 和 npm
- Cloudflare 账号（免费版即可）
- Git

## 步骤 1: 克隆项目

```bash
git clone https://github.com/lijiaxu2021/extalk.git
cd extalk
```

## 步骤 2: 安装依赖

```bash
npm install
```

## 步骤 3: 配置环境变量

复制环境变量配置文件：

```bash
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml`，填入你的配置：

```toml
name = "fuwari-comments"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
# hCaptcha 密钥（https://www.hcaptcha.com）
HCAPTCHA_SECRET_KEY = "你的 hCaptcha 密钥"
HCAPTCHA_SITE_KEY = "你的 hCaptcha Site Key"

# Resend 邮件 API（https://resend.com）
RESEND_API_KEY = "你的 Resend API 密钥"

# JWT 密钥（随机生成的密钥）
JWT_SECRET = "随机生成的密钥"

# 管理员账户
ADMIN_EMAIL = "管理员邮箱"
ADMIN_PASS = "管理员密码"

# 管理员后台 URL 路径（可自定义）
ADMIN_URL = "/upxuuadmin"

# 基础 URL（部署后自动获取）
BASE_URL = "https://your-worker.workers.dev"

# 加载模式：pagination | infinite | loadmore
LOAD_MODE = "pagination"

[[d1_databases]]
binding = "DB"
database_name = "fuwari_comments_db"
database_id = "你的 D1 数据库 ID"
```

## 步骤 4: 登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器让你授权。

## 步骤 5: 创建 D1 数据库

```bash
npx wrangler d1 create fuwari_comments_db
```

记录返回的 `database_id`，填入 `wrangler.toml`。

## 步骤 6: 初始化数据库

执行 SQL 脚本创建表结构：

```bash
npx wrangler d1 execute fuwari_comments_db --file=migrate.sql
```

## 步骤 7: 部署

```bash
npx wrangler deploy
```

首次部署会创建 Worker。

## 步骤 8: 初始化管理员账户

访问：

```
https://your-worker.workers.dev/init-admin-999
```

看到 "Admin initialized" 表示成功。

## 步骤 9: 访问管理后台

访问配置的管理员 URL（默认 `/upxuuadmin`）：

```
https://your-worker.workers.dev/upxuuadmin
```

使用配置的管理员账号登录。

> 💡 **提示**: 你可以在 `ADMIN_URL` 环境变量中自定义管理员后台路径。

## 步骤 10: 前端集成

在博客页面中添加：

```html
<div id="extalk-comments"></div>
<script src="https://your-worker.workers.dev/sdk.js"></script>
```

## 获取必要密钥

### hCaptcha

1. 访问 https://www.hcaptcha.com/
2. 注册账号并创建站点
3. 获取 **Site Key** 和 **Secret Key**
4. 填入 `wrangler.toml`：
   - `HCAPTCHA_SITE_KEY` = 你的 Site Key
   - `HCAPTCHA_SECRET_KEY` = 你的 Secret Key

### Resend（邮件服务）

1. 访问 https://resend.com/
2. 注册账号
3. 创建 API Key
4. 验证发件域名
5. 填入 `wrangler.toml`

### JWT Secret

可以使用随机字符串：

```bash
openssl rand -hex 32
```

或使用在线生成器。

## 验证部署

### 检查 Worker

```bash
npx wrangler tail
```

实时查看 Worker 日志。

### 检查数据库

```bash
npx wrangler d1 execute fuwari_comments_db --command="SELECT * FROM comments LIMIT 5"
```

### 测试 API

```bash
curl https://your-worker.workers.dev/comments?url=/test
```

## 常见问题

### 部署失败

检查：
- Node.js 版本是否 >= 18
- 是否正确登录 Cloudflare
- `wrangler.toml` 配置是否正确

### 数据库错误

确保：
- D1 数据库已创建
- SQL 脚本已执行
- `database_id` 正确

### CORS 错误

在管理后台添加允许的域名：
- 访问管理后台
- 进入"域名/设置"
- 添加你的博客域名

## 下一步

- [环境变量配置](/guide/configuration) - 详细配置说明
- [数据库初始化](/guide/database) - 数据库表结构
