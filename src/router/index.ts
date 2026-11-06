// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MoverView from '../module/views/HomeView.vue'
import MoverPaginaBlog1 from '../module/views/MoverPaginaBlog1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MoverView
    },
    {
      path: '/blog/:slug',
      name: 'MoverPaginaBlog1',
      component: MoverPaginaBlog1
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router