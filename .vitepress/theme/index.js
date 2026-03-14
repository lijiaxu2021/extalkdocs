import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 监听路由变化，在每个页面加载后添加评论区
    if (typeof window !== 'undefined') {
      const addComments = () => {
        // 检查是否已经添加过
        if (document.getElementById('extalk-comments')) return
        
        // 创建评论区容器
        const commentsDiv = document.createElement('div')
        commentsDiv.id = 'extalk-comments'
        commentsDiv.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider);'
        
        // 添加到页面底部
        const vpDoc = document.querySelector('.vp-doc')
        if (vpDoc) {
          vpDoc.appendChild(commentsDiv)
          
          // 加载 SDK
          const script = document.createElement('script')
          script.src = 'https://comment.upxuu.com/sdk.js'
          script.async = true
          document.body.appendChild(script)
        }
      }
      
      // 初始加载
      setTimeout(addComments, 100)
      
      // 路由变化后重新加载
      router.onAfterRouteChanged = (to) => {
        setTimeout(addComments, 100)
      }
    }
  }
}
