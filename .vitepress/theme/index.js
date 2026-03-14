import DefaultTheme from 'vitepress/theme'
import { h, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
    onMounted(() => {
      // 延迟执行确保页面渲染完成
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
      // 清除旧的评论区（切换页面时需要刷新）
      const oldWrapper = document.getElementById('extalk-wrapper')
      if (oldWrapper) {
        oldWrapper.remove()
      }
      
      // 重置 SDK 的加载状态（让 SDK 重新初始化）
      window.__extalk_comments_init = false
      
      // 创建新的评论区
      const wrapper = document.createElement('div')
      wrapper.id = 'extalk-wrapper'
      wrapper.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); width: 100%; max-width: 100%; margin-left: 0; margin-right: 0; padding-left: 24px; padding-right: 24px;'
      wrapper.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--vp-c-text-1); text-align: center;">💬 评论</h2>
        <div id="extalk-comments" style="width: 100%; max-width: 100%; margin: 20px 0 0;"></div>
      `
      
      // 插入到 footer 前面
      const footer = document.querySelector('.VPFooter')
      if (footer) {
        footer.parentNode.insertBefore(wrapper, footer)
      }
      
      // 重新加载 SDK（每次切换页面都重新加载，确保 URL 正确）
      const oldScript = document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')
      if (oldScript) {
        oldScript.remove()
      }
      const script = document.createElement('script')
      script.src = 'https://comment.upxuu.com/sdk.js'
      script.async = true
      document.body.appendChild(script)
    }
  }
}
