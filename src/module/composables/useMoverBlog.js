// src/modules/mover/composables/useMoverBlog.js
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { moverBlogService } from '../services/moverBlogService';

export function useMoverBlog() {
  const router = useRouter();
  
  // Mantemos a estrutura de dados que o seu componente MoverBlog.vue desenha
  const blogData = ref({
    tag: 'BLOG',
    titlePrefix: 'Mover',
    titleHighlight: 'Sistemas',
    posts: []
  });

  const isLoading = ref(true);

  onMounted(async () => {
    isLoading.value = true;
    const data = await moverBlogService.fetchPosts();
    // Atribui os posts obtidos à propriedade correta
    blogData.value.posts = Array.isArray(data) ? data : [];
    isLoading.value = false;
  });

  const navigateToPost = (route) => {
    if (route) router.push(route);
  };

  return {
    blogData,   // <-- O componente MoverBlog.vue usa isto para o título e tags
    isLoading,
    navigateToPost
  };
}