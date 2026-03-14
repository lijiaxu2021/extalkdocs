<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const { Layout } = DefaultTheme

// 加载评论区的函数
const loadComments = async () => {
  // 检查是否已经加载过（只在客户端）
  if (typeof window === 'undefined') return
  if (window.__extalk_loaded) return
  
  // 等待 DOM 渲染
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // 创建评论区容器
  const commentsDiv = document.createElement('div')
  commentsDiv.id = 'extalk-comments'
  commentsDiv.style.cssText = 'margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); width: 100%; max-width: var(--vp-layout-max-width); margin-left: auto; margin-right: auto; padding-left: 24px; padding-right: 24px;'
  commentsDiv.innerHTML = '<h2 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--vp-c-text-1); text-align: center;">💬 评论</h2><div id="extalk-comments-inner" style="margin-top: 20px; max-width: 800px; margin-left: auto; margin-right: auto;"></div>'
  
  // 找到 footer 并插入到它前面
  const footer = document.querySelector('.VPFooter')
  if (footer) {
    footer.parentNode.insertBefore(commentsDiv, footer)
  }
  
  // 加载 SDK
  const script = document.createElement('script')
  script.src = 'https://comment.upxuu.com/sdk.js'
  script.async = true
  document.body.appendChild(script)
  
  window.__extalk_loaded = true
}

// 在组件挂载后执行
onMounted(() => {
  loadComments()
  
  // 监听路由变化
  watch(() => route.path, () => {
    loadComments()
  })
})
</script>

<template>
  <Layout />
</template>
