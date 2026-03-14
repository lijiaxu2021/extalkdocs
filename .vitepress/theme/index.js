import DefaultTheme from 'vitepress/theme'
import { h, onMounted } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      // 加载 ExTalk SDK
      const script = document.createElement('script')
      script.src = 'https://comment.upxuu.com/sdk.js'
      script.async = true
      document.body.appendChild(script)
    })
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在内容底部插入评论区
      'doc-after': () => h('div', {
        style: {
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid var(--vp-c-divider)'
        }
      }, [
        h('h2', {
          style: {
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: 'var(--vp-c-text-1)'
          }
        }, '💬 评论'),
        h('div', { id: 'extalk-comments', style: { marginTop: '20px' } })
      ])
    })
  }
}
