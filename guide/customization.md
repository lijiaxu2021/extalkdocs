# 样式定制

ExTalk 评论系统支持灵活的样式定制。

## 默认样式

SDK 内置了默认的 CSS 样式：

- **配色方案**：浅蓝色主题
- **字体**：系统默认字体栈
- **间距**：统一的间距规范
- **动画**：流畅的过渡效果

## 定制方式

### 方式 1: CSS 覆盖

通过 CSS 覆盖默认样式：

```css
/* 覆盖评论容器 */
#extalk-comments {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 覆盖评论项 */
.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

/* 覆盖评论表单 */
.comment-form {
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
}

/* 覆盖按钮 */
.submit-btn {
  background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
  border-radius: 8px;
  padding: 12px 32px;
}
```

### 方式 2: CSS 变量

修改 CSS 变量来快速切换主题：

```css
:root {
  --primary: #0ea5e9;        /* 主色调 */
  --primary-light: #38bdf8;  /* 浅色 */
  --primary-dark: #0284c7;   /* 深色 */
  --bg: #f0f9ff;             /* 背景色 */
  --text: #0f172a;           /* 文字颜色 */
}
```

## 配色方案

### 浅蓝色（默认）

```css
:root {
  --primary: #0ea5e9;
  --primary-light: #38bdf8;
  --primary-dark: #0284c7;
  --primary-lighter: #e0f2fe;
  --bg: #f0f9ff;
}
```

### 深蓝色

```css
:root {
  --primary: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  --primary-lighter: #dbeafe;
  --bg: #eff6ff;
}
```

### 绿色

```css
:root {
  --primary: #10b981;
  --primary-light: #34d399;
  --primary-dark: #059669;
  --primary-lighter: #d1fae5;
  --bg: #ecfdf5;
}
```

### 紫色

```css
:root {
  --primary: #8b5cf6;
  --primary-light: #a78bfa;
  --primary-dark: #7c3aed;
  --primary-lighter: #ede9fe;
  --bg: #faf5ff;
}
```

## 响应式适配

针对移动端优化：

```css
@media (max-width: 768px) {
  #extalk-comments {
    padding: 0 16px;
  }
  
  .comment-form {
    padding: 16px;
  }
  
  .comment-content {
    font-size: 14px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

## 暗黑模式

支持暗黑主题：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --card: #2d2d2d;
    --text: #e5e5e5;
    --text-light: #a0a0a0;
    --border: #404040;
  }
  
  .comment-form {
    background: #2d2d2d;
  }
  
  .comment-input {
    background: #1a1a1a;
    border-color: #404040;
    color: #e5e5e5;
  }
}
```

## 字体定制

使用自定义字体：

```css
#extalk-comments {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.comment-author {
  font-family: 'Georgia', serif;
}
```

## 动画定制

调整动画效果：

```css
.comment-item {
  transition: all 0.3s ease;
}

.comment-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  transition: all 0.2s;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(14, 165, 233, 0.3);
}
```

## 完整示例

```css
/* 全局样式 */
:root {
  --primary: #0ea5e9;
  --bg: #f8fafc;
}

/* 评论容器 */
#extalk-comments {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 24px;
  font-family: 'Inter', sans-serif;
}

/* 评论卡片 */
.comment-item {
  background: white;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.comment-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 评论表单 */
.comment-form {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

/* 输入框 */
.comment-input {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.2s;
}

.comment-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

/* 按钮 */
.submit-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
}
```

## 注意事项

1. **优先级**：确保自定义 CSS 在 SDK 之后加载
2. ** specificity**：使用更具体的选择器来覆盖默认样式
3. **响应式**：考虑移动端的显示效果
4. **暗黑模式**：提供暗黑模式支持
5. **可访问性**：保持足够的颜色对比度

## 下一步

- [SDK 使用](/guide/sdk) - SDK 使用方法
- [部署指南](/guide/deployment) - 部署到 Cloudflare Workers
