// src/modules/mover/composables/useMoverBlog.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { moverBlogService } from '../services/moverBlogService'

export function useMoverBlog() {
  const router = useRouter()
  const blogData = ref(moverBlogService.getData())

  // Função para redirecionar para a rota específica de cada card
  const navigateToPost = (route) => {
    if (route) {
      router.push(route)
    }
  }

  return {
    blogData,
    navigateToPost
  }
}