# ExTalk 前端集成指南

ExTalk 评论系统支持多种前端框架和静态站点生成器，提供简单易用的集成方式。

## 目录

- [静态 HTML](#静态-html)
- [VitePress](#vitepress)
- [VuePress](#vuepress)
- [Hexo](#hexo)
- [Hugo](#hugo)
- [Jekyll](#jekyll)
- [Fuwari](#fuwari)
- [React](#react)
- [Vue](#vue)

***

## 静态 HTML

最简单的集成方式，适用于任何 HTML 页面。

### 基础用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的页面</title>
</head>
<body>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
  
  <!-- 评论区容器 -->
  <div id="extalk-comments"></div>
  
  <!-- 加载 ExTalk SDK -->
  <script src="https://comment.upxuu.com/sdk.js"></script>
</body>
</html>
```

就这么简单！SDK 会自动：

1. 检测当前页面 URL
2. 加载评论列表
3. 渲染评论表单
4. 绑定所有事件

### 自定义加载模式

通过 URL 参数临时覆盖加载模式：

```html
<!-- 无限滚动模式 -->
<script src="https://comment.upxuu.com/sdk.js?mode=infinite"></script>

<!-- 分页模式 -->
<script src="https://comment.upxuu.com/sdk.js?mode=pagination"></script>

<!-- 加载更多模式 -->
<script src="https://comment.upxuu.com/sdk.js?mode=loadmore"></script>
```

***

## VitePress

为所有文档页面自动添加评论系统。

### 方案一：自定义主题（推荐）

创建 `.vitepress/theme/index.js`：

```js
import DefaultTheme from 'vitepress/theme'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
    onMounted(() => {
      setTimeout(() => {
        insertCommentSection()
      }, 100)
    })
    
    watch(() => route.path, () => {
      setTimeout(() => {
        insertCommentSection()
      }, 100)
    })
    
    function insertCommentSection() {
      // 清除旧的评论区
      const oldWrapper = document.getElementById('extalk-wrapper')
      if (oldWrapper) oldWrapper.remove()
      
      // 重置 SDK 状态
      window.__extalk_comments_init = false
      
      // 创建评论区
      const wrapper = document.createElement('div')
      wrapper.id = 'extalk-wrapper'
      wrapper.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); width: 100%;'
      wrapper.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 20px; text-align: center;">💬 评论</h2>
        <div id="extalk-comments" style="width: 100%; margin: 20px 0;"></div>
      `
      
      // 插入到页面
      const vpDoc = document.querySelector('.vp-doc')
      if (vpDoc) {
        vpDoc.appendChild(wrapper)
      }
      
      // 重新加载 SDK
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

### 方案二：在每页 Markdown 中添加

创建 `.vitepress/components/CommentSection.vue`：

```vue
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

<template>
  <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider);">
    <h2 style="text-align: center;">💬 评论</h2>
    <div id="extalk-comments"></div>
  </div>
</template>
```

在 `.vitepress/theme/index.js` 中注册：

```js
import DefaultTheme from 'vitepress/theme'
import CommentSection from './CommentSection.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CommentSection', CommentSection)
  }
}
```

然后在每页 Markdown 底部添加：

```md
<!-- 页面内容 -->

<CommentSection />
```

***

## VuePress

VuePress 1.x 和 2.x 都支持。

### VuePress 2.x

创建 `.vuepress/client.js`：

```js
import { defineClientConfig } from '@vuepress/client'
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineClientConfig({
  setup() {
    const route = useRoute()
    
    onMounted(() => {
      loadComments()
      watch(() => route.path, loadComments)
    })
    
    function loadComments() {
      setTimeout(() => {
        const oldWrapper = document.getElementById('extalk-wrapper')
        if (oldWrapper) oldWrapper.remove()
        
        const wrapper = document.createElement('div')
        wrapper.id = 'extalk-wrapper'
        wrapper.innerHTML = '<div id="extalk-comments"></div>'
        
        const content = document.querySelector('.vuepress-content')
        if (content) {
          wrapper.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-color);'
          content.appendChild(wrapper)
        }
        
        if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
          const script = document.createElement('script')
          script.src = 'https://comment.upxuu.com/sdk.js'
          script.async = true
          document.body.appendChild(script)
        }
      }, 100)
    }
  }
})
```

***

## Hexo

### 方案一：修改主题布局文件

编辑主题的布局文件（如 `themes/your-theme/layout/_partial/comment.ejs`）：

```ejs
<div id="extalk-comments"></div>
<script src="https://comment.upxuu.com/sdk.js"></script>
```

或者在 `themes/your-theme/layout/layout.ejs` 的底部添加：

```ejs
<body>
  <%- body %>
  
  <% if (post.comments !== false) { %>
    <div id="extalk-comments"></div>
    <script src="https://comment.upxuu.com/sdk.js"></script>
  <% } %>
</body>
```

### 方案二：创建 Hexo 插件

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

***

## Hugo

### 创建部分模板

创建 `layouts/partials/comments.html`：

```html
{{ if .Params.comments }}
<div id="extalk-comments"></div>
<script src="https://comment.upxuu.com/sdk.js"></script>
{{ end }}
```

### 在主布局中引用

编辑 `layouts/_default/baseof.html` 或 `layouts/_default/single.html`：

```html
{{ partial "comments.html" . }}
```

### 在 Front Matter 中控制

```yaml
---
title: "文章标题"
comments: true  # 启用评论
---
```

***

## Jekyll

### 创建包含文件

创建 `_includes/comments.html`：

```html
<div id="extalk-comments"></div>
<script src="https://comment.upxuu.com/sdk.js"></script>
```

### 在布局中引用

编辑 `_layouts/post.html` 或 `_layouts/page.html`：

```liquid
<article>
  {{ content }}
  
  {% if page.comments %}
    {% include comments.html %}
  {% endif %}
</article>
```

### 在 Front Matter 中启用

```yaml
---
title: "文章标题"
comments: true
---
```

***

## Fuwari

Fuwari 是一个基于 Astro 的博客主题。

### 创建评论组件

创建 `src/components/CommentSection.astro`：

```astro
---
---

<div id="extalk-comments" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-color);">
  <h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2>
  <div style="margin-top: 20px;"></div>
</div>

<script>
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
</script>
```

### 在博客文章中使用

编辑 `src/pages/blog/[...slug].astro`：

```astro
---
import CommentSection from '../../components/CommentSection.astro'
---

<article>
  <h1>{frontmatter.title}</h1>
  <slot />
  
  {frontmatter.comments !== false && <CommentSection />}
</article>
```

***

## React

### 创建评论组件

```jsx
// CommentSection.jsx
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
    
    // 清理函数（可选，用于 SPA 路由切换）
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
import CommentSection from './CommentSection'

function BlogPost() {
  return (
    <article>
      <h1>文章标题</h1>
      <p>文章内容...</p>
      
      <CommentSection />
    </article>
  )
}
```

***

## Vue

### 创建评论组件

```vue
<!-- CommentSection.vue -->
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

***

## Next.js

### 创建评论组件

```jsx
// components/CommentSection.js
'use client'

import { useEffect } from 'react'

export default function CommentSection() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://comment.upxuu.com/sdk.js'
      script.async = true
      document.body.appendChild(script)
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
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <CommentSection />
    </article>
  )
}
```

***

## Nuxt

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
onMounted(() => {
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>
```

### 全局注册（可选）

创建 `plugins/extalk.client.js`：

```js
export default defineNuxtPlugin(() => {
  // 自动加载评论 SDK
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
})
```

***

## Astro

### 创建评论组件

```astro
---
// components/CommentSection.astro
---

<div id="extalk-comments" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-color);">
  <h2 style="text-align: center; margin-bottom: 20px;">💬 评论</h2>
</div>

<script>
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
</script>
```

### 在页面中使用

```astro
---
import CommentSection from '../components/CommentSection.astro'
---

<article>
  <h1>{frontmatter.title}</h1>
  <slot />
  
  <CommentSection client:load />
</article>
```

***

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

### 4. 如何自定义样式

通过 CSS 覆盖默认样式：

```css
#extalk-comments {
  font-family: 'Your Font', sans-serif;
}

.comment-form {
  background: #f5f5f5;
}

.submit-btn {
  background: your-color;
}
```

***

## 下一步

- [API 文档](/api/overview) - 完整的 API 接口说明
- [样式定制](/guide/customization) - 详细样式定制指南
- [管理后台](/guide/admin) - 评论管理功能

