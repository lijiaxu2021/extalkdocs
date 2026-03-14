# ExTalk Docs

ExTalk 评论系统的官方文档站点。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 文档结构

```
docfile/
├── .vitepress/          # VitePress 配置
│   ├── config.js        # 站点配置
│   └── theme/           # 主题定制
├── guide/               # 使用指南
│   ├── introduction.md
│   ├── quick-start.md
│   └── features.md
├── api/                 # API 文档
│   ├── overview.md
│   ├── comments.md
│   └── auth.md
└── index.md             # 首页
```

## 技术栈

- [VitePress](https://vitepress.dev/) - 基于 Vite 的静态站点生成器
- Markdown - 文档内容格式

## 许可证

CC BY-NC-SA 4.0
