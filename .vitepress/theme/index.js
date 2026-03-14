import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router }) {
    // 可以在这里添加全局组件或其他增强
  }
}
