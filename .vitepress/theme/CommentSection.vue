<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 加载 SDK（如果还没加载）
  if (!document.querySelector('script[src="https://comment.upxuu.com/sdk.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://comment.upxuu.com/sdk.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>

<template>
  <div class="extalk-comments-wrapper" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider);">
    <h2 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--vp-c-text-1); text-align: center;">💬 评论</h2>
    <div id="extalk-comments" style="max-width: 800px; margin: 20px auto 0;"></div>
  </div>
</template>
