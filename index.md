---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ExTalk"
  text: "基于 Cloudflare Workers 的轻量级评论系统"
  tagline: "快速、安全、易用的静态博客评论解决方案"
  image:
    src: /logo.png
    alt: ExTalk
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/introduction
    - theme: alt
      text: API 参考
      link: /api/overview

features:
  - icon: ⚡
    title: 极速性能
    details: 部署在 Cloudflare 全球边缘网络，毫秒级响应速度
  - icon: 🛡️
    title: 安全可靠
    details: hCaptcha 防护、JWT 认证、CORS 域名白名单多重安全保障
  - icon: 🎨
    title: 灵活定制
    details: 支持三种加载模式、浅蓝色主题、完整的样式定制能力
  - icon: 💬
    title: 评论管理
    details: 现代化管理后台，支持按 URL 筛选、批量操作、实时统计
  - icon: 📊
    title: 数据统计
    details: 页面浏览量、点赞数、评论属地显示等丰富统计功能
  - icon: 🚀
    title: 简易部署
    details: 一键部署到 Cloudflare Workers，无需服务器维护
---
