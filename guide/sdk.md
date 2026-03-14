# SDK 使用

ExTalk 前端 SDK 使用方法。

## 引入 SDK

在 HTML 页面中添加：

```html
<!-- 评论容器 -->
<div id="extalk-comments"></div>

<!-- 引入 SDK -->
<script src="https://your-worker.workers.dev/sdk.js"></script>
```

SDK 会自动初始化并加载评论。

## 自动初始化

SDK 加载后会自动：

1. 查找 `#extalk-comments` 容器
2. 获取当前页面 URL（`window.location.pathname`）
3. 加载评论列表
4. 渲染评论表单
5. 绑定事件监听器

## 配置加载模式

### 方法 1: 环境变量配置

在 `wrangler.toml` 中设置：

```toml
[vars]
LOAD_MODE = "pagination"  # pagination, infinite, loadmore
```

### 方法 2: URL 参数覆盖

通过 URL 参数临时覆盖加载模式：

```
https://your-blog.com/post/1?mode=infinite
```

## 加载模式说明

### 分页模式（pagination）

传统的分页导航：
- 每页显示 6 条评论
- 底部显示页码按钮
- 点击页码切换页面
- 适合评论较少的场景

### 无限滚动（infinite）

自动加载更多内容：
- 滚动到底部自动加载
- 无分页控件
- 流畅的浏览体验
- 适合移动端

### 加载更多（loadmore）

点击按钮加载更多：
- 显示"加载更多"按钮
- 点击加载下一页
- 可控的加载节奏
- 兼顾性能和体验

## 用户认证

### 匿名用户

- 可以浏览评论
- 可以发表评论（需要填写昵称）
- 需要通过 hCaptcha 验证

### 登录用户

- 自动填充昵称
- 可以回复评论
- 可以点赞评论
- 可以删除自己的评论

## 样式定制

SDK 提供默认的 CSS 样式，可以通过 CSS 覆盖：

```css
/* 覆盖评论容器样式 */
#extalk-comments {
  max-width: 800px;
  margin: 0 auto;
}

/* 覆盖评论项样式 */
.comment-item {
  padding: 20px 0;
}
```

## 事件监听

SDK 目前没有开放自定义事件，但可以通过 DOM 操作实现：

```javascript
// 监听评论提交
document.addEventListener('submit', (e) => {
  if (e.target.id === 'submit-comment') {
    console.log('评论已提交');
  }
});
```

## 本地存储

SDK 使用 localStorage 记录：

- `extalk_user` - 登录用户信息
- `liked_comment_X` - 评论点赞记录
- `liked_page_X` - 页面点赞记录

## 下一步

- [加载模式](/guide/load-modes) - 加载模式详细说明
- [样式定制](/guide/customization) - 定制评论外观
