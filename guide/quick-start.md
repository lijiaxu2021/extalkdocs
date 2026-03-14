# 快速开始

只需 3 个步骤，即可将 ExTalk 评论系统集成到你的网站。

## 步骤 1: 部署到 Cloudflare Workers

```bash
# 克隆项目
git clone https://github.com/lijiaxu2021/extalk.git
cd extalk

# 安装依赖
npm install

# 配置环境变量（复制 wrangler.toml.example 为 wrangler.toml）
cp wrangler.toml.example wrangler.toml

# 编辑 wrangler.toml，填入你的配置
# - HCAPTCHA_SECRET_KEY
# - RESEND_API_KEY  
# - JWT_SECRET
# - ADMIN_EMAIL
# - ADMIN_PASS

# 部署
npx wrangler deploy
```

## 步骤 2: 初始化数据库和管理员账户

部署成功后，访问以下 URL 初始化数据库：

```
https://your-worker.workers.dev/init-admin-999
```

这会创建管理员账户和必要的数据库表。

## 步骤 3: 在前端页面集成 SDK

在你的 HTML 页面中添加：

```html
<!-- 在需要评论的位置添加容器 -->
<div id="extalk-comments"></div>

<!-- 引入 ExTalk SDK -->
<script src="https://your-worker.workers.dev/sdk.js"></script>
```

就这么简单！评论系统会自动加载。

## 配置加载模式

ExTalk 支持三种评论加载模式：

### 1. 分页模式（默认）
```javascript
// 在 wrangler.toml 中设置
LOAD_MODE = "pagination"
```

### 2. 无限滚动模式
```javascript
LOAD_MODE = "infinite"
```

### 3. 加载更多模式
```javascript
LOAD_MODE = "loadmore"
```

## 通过 URL 参数覆盖

你也可以通过 URL 参数临时覆盖加载模式：

```
https://your-blog.com/post/1?mode=infinite
```

## 验证安装

访问你的页面，应该能看到：
- ✅ 评论列表
- ✅ 评论表单
- ✅ 点赞功能
- ✅ 浏览量统计

## 下一步

- [功能特性](/guide/features) - 了解 ExTalk 的所有功能
- [管理后台](/guide/admin) - 学习如何使用管理后台
- [样式定制](/guide/customization) - 定制评论系统外观
