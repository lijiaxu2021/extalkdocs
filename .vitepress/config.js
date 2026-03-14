// https://vitepress.dev/reference/site-config
export default {
  title: "ExTalk",
  description: "基于 Cloudflare Workers 的轻量级评论系统",
  ignoreDeadLinks: true,  // 禁用死链检查，允许 Vercel 部署
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: 'API', link: '/api/overview' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是 ExTalk?', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '功能特性', link: '/guide/features' }
        ]
      },
      {
        text: '部署指南',
        items: [
          { text: 'Cloudflare Workers 部署', link: '/guide/deployment' },
          { text: '环境变量配置', link: '/guide/configuration' },
          { text: '数据库初始化', link: '/guide/database' }
        ]
      },
      {
        text: '前端集成',
        items: [
          { text: 'SDK 使用', link: '/guide/sdk' },
          { text: '加载模式', link: '/guide/load-modes' },
          { text: '样式定制', link: '/guide/customization' }
        ]
      },
      {
        text: '管理后台',
        items: [
          { text: '后台管理', link: '/guide/admin' },
          { text: '评论管理', link: '/guide/comments' },
          { text: '用户管理', link: '/guide/users' }
        ]
      },
      {
        text: 'API 参考',
        items: [
          { text: 'API 概览', link: '/api/overview' },
          { text: '评论接口', link: '/api/comments' },
          { text: '认证接口', link: '/api/auth' },
          { text: '管理接口', link: '/api/admin' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lijiaxu2021/extalk' }
    ],

    footer: {
      message: '基于 CC BY-NC-SA 4.0 许可发布',
      copyright: 'Copyright © 2026 ExTalk'
    },

    // 自定义 HTML 插入到页面底部
    head: [
      ['script', {}, `
        window.addEventListener('DOMContentLoaded', () => {
          // 创建评论区
          const commentsDiv = document.createElement('div');
          commentsDiv.id = 'extalk-comments';
          commentsDiv.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); max-width: 1152px; margin-left: auto; margin-right: auto; padding-left: 24px; padding-right: 24px;';
          
          // 添加到 VPContent 底部
          const vpContent = document.getElementById('VPContent');
          if (vpContent) {
            const footer = vpContent.querySelector('.VPFooter');
            if (footer) {
              footer.before(commentsDiv);
            } else {
              vpContent.appendChild(commentsDiv);
            }
            
            // 加载 SDK
            const script = document.createElement('script');
            script.src = 'https://comment.upxuu.com/sdk.js';
            script.async = true;
            document.body.appendChild(script);
          }
        });
      `]
    ]
  }
}
