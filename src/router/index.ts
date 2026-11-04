import { createRouter, createWebHistory } from 'vue-router'
import MoverView from '../module/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: MoverView
  },
   
  ],
})

export default router
