# ExTalk 前端集成指南

ExTalk 评论系统支持多种前端框架和静态站点生成器。

## 目录

- [静态 HTML](#静态-html)
- [VitePress](#vitepress)
- [Hexo](#hexo)
- [Hugo](#hugo)
- [Jekyll](#jekyll)
- [React](#react)
- [Vue](#vue)

---

## 静态 HTML

最简单的集成方式，适用于任何 HTML 页面。

### 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <title>我的页面</title>
</head>
<body>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
  
  <!-- 评论区 -->
  <div id="extalk-comments"></div>
  <script src="https://comment.upxuu.com/sdk.js"></script>
</body>
</html>
```

就这么简单！SDK 会自动：
1. 检测当前页面 URL
2. 加载评论列表
3. 渲染评论表单
4. 绑定所有事件

---

## VitePress

为所有文档页面自动添加评论系统。

### 创建主题文件

创建 `.vitepress/theme/index.js`：

```js
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
    onMounted(() => {
      setTimeout(() => insertCommentSection(), 100)
    })
    
    watch(() => route.path, () => {
      setTimeout(() => insertCommentSection(), 100)
    })
    
    function insertCommentSection() {
      const oldWrapper = document.getElementById('extalk-wrapper')
      if (oldWrapper) oldWrapper.remove()
      
      window.__extalk_comments_init = false
      
      const wrapper = document.createElement('div')
      wrapper.id = 'extalk-wrapper'
      wrapper.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); width: 100%;'
      wrapper.innerHTML = '<h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2><div id="extalk-comments" style="width: 100%; margin: 20px 0;"></div>'
      
      const vpDoc = document.querySelector('.vp-doc')
      if (vpDoc) vpDoc.appendChild(wrapper)
      
      const oldScript = document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')
      if (oldScript) oldScript.remove()
      const script = document.createElement('script')
      script.src = 'https://comment.upxuu.com/sdk.js'
      script.async = true
      document.body.appendChild(script)
    }
  }
}
```

就这么简单！所有文档页面底部都会自动显示评论区。

---

## Hexo

在 Hexo 博客中集成 ExTalk 评论系统。

### 方式一：修改主题布局文件

编辑主题的布局文件（如 `themes/your-theme/layout/_partial/article.ejs`），在文章底部添加：

```ejs
<% if (!index && post.comments !== false){ %>
<section id="extalk-comments">
  <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
    <h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2>
    <div id="extalk-comments-container"></div>
  </div>
  <script src="https://comment.upxuu.com/sdk.js"></script>
</section>
<% } %>
```

### 方式二：创建 Hexo 插件

创建 `scripts/extalk.js`：

```js
hexo.extend.filter.register('after_post_render', function(data) {
  data.content += `
    <div id="extalk-comments"></div>
    <script src="https://comment.upxuu.com/sdk.js"></script>
  `
  return data
})
```

### 在 Front Matter 中控制

```yaml
---
title: "文章标题"
comments: true  # 启用评论（设为 false 可禁用）
---
```

---

## Hugo

在 Hugo 博客中集成 ExTalk 评论系统。

### 步骤一：创建部分模板

创建 `layouts/partials/comments.html`：

```html
{{ if .Params.comments }}
<div id="extalk-comments" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
  <h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2>
</div>
<script src="https://comment.upxuu.com/sdk.js"></script>
{{ end }}
```

### 步骤二：在主布局中引用

编辑 `layouts/_default/single.html`：

```html
{{ partial "comments.html" . }}
```

或者编辑 `layouts/_default/baseof.html`，在 `</main>` 标签前添加：

```html
{{ if .IsPage }}
  {{ partial "comments.html" . }}
{{ end }}
```

### 在 Front Matter 中控制

```yaml
---
title: "文章标题"
comments: true  # 启用评论
---
```

---

## Jekyll

在 Jekyll 博客中集成 ExTalk 评论系统。

### 步骤一：创建包含文件

创建 `_includes/comments.html`：

```html
{% if page.comments %}
<div id="extalk-comments" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
  <h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2>
</div>
<script src="https://comment.upxuu.com/sdk.js"></script>
{% endif %}
```

### 步骤二：在布局中引用

编辑 `_layouts/post.html`：

```liquid
<article>
  {{ content }}
  
  {% include comments.html %}
</article>
```

### 在 Front Matter 中启用

```yaml
---
title: "文章标题"
comments: true
---
```

---

## React

在 React 应用中集成 ExTalk 评论系统。

### 创建评论组件

```jsx
// components/CommentSection.jsx
'use client'

import { useEffect } from 'react'

export default function CommentSection() {
  useEffect(() => {
    // 加载 SDK
    if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://comment.upxuu.com/sdk.js'
      script.async = true
      document.body.appendChild(script)
    }
    
    // 清理函数（用于 SPA 路由切换）
    return () => {
      window.__extalk_comments_init = false
    }
  }, [])
  
  return (
    <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #e5e7eb' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>💬 评论</h2>
      <div id="extalk-comments" style={{ maxWidth: '800px', margin: '20px auto' }} />
    </div>
  )
}
```

### 在页面中使用

```jsx
import CommentSection from '@/components/CommentSection'

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <CommentSection />
    </article>
  )
}
```

---

## Vue

在 Vue 应用中集成 ExTalk 评论系统。

### 创建评论组件

```vue
<!-- components/CommentSection.vue -->
<template>
  <div class="extalk-comments">
    <h2>💬 评论</h2>
    <div id="extalk-comments"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>

<style scoped>
.extalk-comments {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #e5e7eb;
}

.extalk-comments h2 {
  text-align: center;
  margin-bottom: 20px;
}

#extalk-comments {
  max-width: 800px;
  margin: 20px auto;
}
</style>
```

### 在组件中使用

```vue
<template>
  <article>
    <h1>{{ post.title }}</h1>
    <div v-html="post.content"></div>
    
    <CommentSection />
  </article>
</template>

<script setup>
import CommentSection from './CommentSection.vue'
</script>
```

---

## 常见问题

### 1. 评论区不显示

**检查项**：
- 确保容器 ID 为 `extalk-comments`
- 确保 SDK 正确加载（检查浏览器控制台）
- 检查 hCaptcha Site Key 是否正确配置

### 2. 切换页面评论不刷新

**解决方案**：
- 在路由切换时删除旧的评论区容器
- 重新加载 SDK
- 重置 `window.__extalk_comments_init = false`

### 3. 评论宽度不合适

**解决方案**：
```css
#extalk-comments {
  width: 100%;
  max-width: 100%;
  margin: 0;
}
```

---

## 下一步

- [API 文档](/api/overview) - 完整的 API 接口说明
- [样式定制](/guide/customization) - 详细样式定制指南
- [管理后台](/guide/admin) - 评论管理功能
