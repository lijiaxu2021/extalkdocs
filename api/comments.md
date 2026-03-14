# 评论接口

评论相关的 API 接口说明。

## GET /comments

获取指定页面的评论列表。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `url` | string | 是 | 页面 URL（通常是 `window.location.pathname`） |
| `page` | number | 否 | 页码，默认 `1` |
| `limit` | number | 否 | 每页数量，默认 `6` |

### 请求示例

```bash
curl "https://your-worker.workers.dev/comments?url=/post/1&page=1&limit=10"
```

### 响应示例

```json
{
  "comments": [
    {
      "id": 1,
      "page_url": "/post/1",
      "nickname": "张三",
      "content": "这是一条评论",
      "parent_id": null,
      "user_id": 123,
      "ip": "192.168.1.1",
      "location": "北京市",
      "likes": 5,
      "created_at": "2026-03-14 15:30:00"
    }
  ],
  "total": 100,
  "max_comment_length": 500,
  "views": 1234,
  "page_likes": 56
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `comments` | array | 评论数组 |
| `total` | number | 根评论总数（用于分页） |
| `max_comment_length` | number | 允许的最大评论长度 |
| `views` | number | 页面浏览量 |
| `page_likes` | number | 页面点赞数 |

## POST /comments

创建新评论。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `page_url` | string | 是 | 页面 URL |
| `nickname` | string | 是 | 用户昵称 |
| `content` | string | 是 | 评论内容 |
| `hcaptcha_token` | string | 是 | hCaptcha 验证 token |
| `parent_id` | number | 否 | 回复的评论 ID |

### 请求示例

```bash
curl -X POST "https://your-worker.workers.dev/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "page_url": "/post/1",
    "nickname": "张三",
    "content": "这是一条评论",
    "hcaptcha_token": "hCaptcha_TOKEN",
    "parent_id": null
  }'
```

### 响应示例

```json
{
  "success": true
}
```

### 错误响应

```json
{
  "error": "评论内容过长"
}
```

## POST /comment/like

增加评论点赞。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 评论 ID |

### 请求示例

```bash
curl -X POST "https://your-worker.workers.dev/comment/like" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

### 响应示例

```json
{
  "success": true
}
```

## 注意事项

1. **防重复点赞**: SDK 使用 localStorage 记录已点赞的评论，防止重复点赞
2. **评论长度**: 评论长度受管理员配置限制，默认 500 字符
3. **人机验证**: 所有评论提交都需要通过 hCaptcha 验证
4. **域名限制**: 只能在配置的域名白名单下提交评论
5. **IP 属地**: 评论会自动记录 IP 和属地信息（省份或城市级别）

## 评论数据结构

```typescript
interface Comment {
  id: number;              // 评论 ID
  page_url: string;        // 页面 URL
  nickname: string;        // 用户昵称
  content: string;         // 评论内容
  parent_id: number|null;  // 父评论 ID（回复时使用）
  user_id: number|null;    // 用户 ID（如果已登录）
  ip: string;              // IP 地址
  location: string;        // IP 属地
  likes: number;           // 点赞数
  created_at: string;      // 创建时间（北京时间）
}
```

## 下一步

- [认证接口](/api/auth) - 用户认证相关接口
- [管理接口](/api/admin) - 管理后台接口
- [SDK 使用](/guide/sdk) - 前端 SDK 使用方法
