<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 动态加载 ExTalk SDK
  const script = document.createElement('script')
  script.src = 'https://comment.upxuu.com/sdk.js'
  script.async = true
  document.body.appendChild(script)
})
</script>

<template>
  <div class="custom-home">
    <!-- 页面内容 -->
    <Content />
    
    <!-- 评论区 -->
    <div class="comments-section">
      <div class="comments-container">
        <h2 class="comments-title">💬 评论区</h2>
        <div id="extalk-comments"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-home {
  min-height: 100vh;
}

.comments-section {
  margin-top: 80px;
  padding: 60px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.comments-container {
  max-width: 1152px;
  margin: 0 auto;
}

.comments-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 40px;
  text-align: center;
}

#extalk-comments {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .comments-section {
    padding: 40px 16px;
  }
  
  #extalk-comments {
    padding: 24px;
  }
}
</style>
