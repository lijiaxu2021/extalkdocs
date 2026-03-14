# API 概览

ExTalk 提供 RESTful API 接口，方便与各种前端框架集成。

## 基础信息

**基础 URL**: `https://your-worker.workers.dev`

**认证方式**: JWT Bearer Token

**请求格式**: JSON (`Content-Type: application/json`)

## 接口分类

### 公开接口

无需认证即可调用的接口：

| 接口 | 方法 | 描述 |
|------|------|------|
| `/comments` | GET | 获取评论列表 |
| `/comments` | POST | 创建新评论 |
| `/view` | POST | 增加页面浏览量/点赞 |
| `/comment/like` | POST | 增加评论点赞 |
| `/sdk.js` | GET | 获取前端 SDK |

### 认证接口

需要用户登录后调用的接口：

| 接口 | 方法 | 描述 |
|------|------|------|
| `/auth/register` | POST | 注册新账号 |
| `/auth/verify` | POST | 验证邮箱 OTP |
| `/auth/login` | POST | 登录 |

### 管理员接口

需要管理员 Token 的接口：

| 接口 | 方法 | 描述 |
|------|------|------|
| `/admin/comments` | GET | 获取所有评论 |
| `/admin/comments/:id` | DELETE | 删除评论 |
| `/admin/domains` | GET/POST | 管理域名白名单 |
| `/admin/users` | GET | 获取用户列表 |
| `/admin/settings/*` | POST | 更新系统设置 |

## 通用响应格式

### 成功响应

```json
{
  "success": true,
  "data": {}
}
```

### 错误响应

```json
{
  "error": "错误信息描述"
}
```

## 状态码

- `200` - 请求成功
- `400` - 请求参数错误
- `401` - 未授权（缺少或无效的 Token）
- `403` - 禁止访问（权限不足或人机验证失败）
- `404` - 资源不存在
- `500` - 服务器内部错误

## 跨域说明

所有接口都支持 CORS，允许跨域请求。但需要在管理后台配置允许的域名白名单。

## 速率限制

为防止滥用，部分接口可能有速率限制：

- 评论提交：每个 IP 每分钟最多 10 条
- 登录尝试：每个 IP 每分钟最多 5 次
- 邮件发送：每个邮箱每小时最多 3 封

## 下一步

- [评论接口](/api/comments) - 详细的评论相关接口
- [认证接口](/api/auth) - 用户认证相关接口
- [管理接口](/api/admin) - 管理后台接口
