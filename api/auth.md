# 认证接口

用户认证相关的 API 接口。

## POST /auth/register

注册新账号。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `email` | string | 是 | 邮箱地址 |
| `nickname` | string | 是 | 用户昵称 |
| `password` | string | 是 | 密码 |
| `hcaptcha_token` | string | 是 | hCaptcha 验证 token |

### 请求示例

```bash
curl -X POST "https://your-worker.workers.dev/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "nickname": "张三",
    "password": "password123",
    "hcaptcha_token": "hCaptcha_TOKEN"
  }'
```

### 响应示例

```json
{
  "success": true
}
```

### 说明

1. 注册会发送 6 位 OTP 验证码到用户邮箱
2. 验证码 10 分钟内有效
3. 如果邮箱已存在，会更新密码和昵称
4. 注册后需要验证邮箱才能登录

## POST /auth/verify

验证邮箱 OTP。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `email` | string | 是 | 邮箱地址 |
| `token` | string | 是 | 6 位 OTP 验证码 |

### 请求示例

```bash
curl -X POST "https://your-worker.workers.dev/auth/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "token": "123456"
  }'
```

### 响应

- 成功：返回文本 `验证成功`
- 失败：返回文本 `验证码错误或已过期`

## POST /auth/login

登录账号。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `email` | string | 是 | 邮箱地址 |
| `password` | string | 是 | 密码 |
| `hcaptcha_token` | string | 是 | hCaptcha 验证 token |

### 请求示例

```bash
curl -X POST "https://your-worker.workers.dev/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "hcaptcha_token": "hCaptcha_TOKEN"
  }'
```

### 响应示例

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nickname": "张三",
  "role": "user"
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `token` | string | JWT Token（7 天有效期） |
| `nickname` | string | 用户昵称 |
| `role` | string | 用户角色（`user` 或 `admin`） |

### 错误响应

```json
{
  "error": "邮箱或密码错误"
}
```

或

```json
{
  "error": "邮箱未验证"
}
```

## 密码安全

- 密码使用 SHA-256 哈希存储
- 不在网络中明文传输原始密码
- 建议用户使用强密码（至少 8 位）

## JWT Token 说明

Token 包含以下信息：

```json
{
  "id": 123,           // 用户 ID
  "email": "user@example.com",
  "role": "user",      // 用户角色
  "exp": 1234567890    // 过期时间（Unix 时间戳）
}
```

Token 有效期为 7 天，过期后需要重新登录。

## 使用 Token

在需要认证的接口中，通过 Authorization header 传递 Token：

```bash
curl -X POST "https://your-worker.workers.dev/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{...}'
```

## 错误处理

常见错误码：

- `400` - 缺少必要参数或人机验证失败
- `401` - 邮箱或密码错误，或未验证邮箱
- `403` - 人机验证失败

## 下一步

- [评论接口](/api/comments) - 评论相关接口
- [管理接口](/api/admin) - 管理后台接口
- [用户管理](/guide/users) - 用户管理指南
