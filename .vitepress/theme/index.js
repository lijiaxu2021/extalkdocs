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
      // 如果已存在，不重复插入
      if (document.getElementById('extalk-wrapper')) return
      
      // 创建评论区
      const wrapper = document.createElement('div')
      wrapper.id = 'extalk-wrapper'
      wrapper.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); max-width: var(--vp-layout-max-width); margin-left: auto; margin-right: auto; padding-left: 24px; padding-right: 24px;'
      wrapper.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--vp-c-text-1); text-align: center;">💬 评论</h2>
        <div id="extalk-comments" style="max-width: 800px; margin: 20px auto 0;"></div>
      `
      
      // 插入到 footer 前面
      const footer = document.querySelector('.VPFooter')
      if (footer) {
        footer.parentNode.insertBefore(wrapper, footer)
      }
      
      // 加载 SDK（如果还没加载）
      if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://comment.upxuu.com/sdk.js'
        script.async = true
        document.body.appendChild(script)
      }
    }
  }
}
