// src/modules/mover/composables/useMoverBlog.js
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { moverBlogService } from '../services/moverBlogService';

export function useMoverBlog() {
  const router = useRouter();
  
  const blogData = ref({
    tag: 'BLOG',
    titlePrefix: 'Mover',
    titleHighlight: 'Sistemas',
    posts: []
  });

  const isLoading = ref(true);
  const currentMobileIndex = ref(0);

  // Variáveis para controlar o Swipe no Mobile
  const touchStartX = ref(0);
  const touchEndX = ref(0);

  onMounted(async () => {
    isLoading.value = true;
    const data = await moverBlogService.fetchPosts();
    blogData.value.posts = Array.isArray(data) ? data : [];
    isLoading.value = false;
  });

  const navigateToPost = (route) => {
    if (route) router.push(route);
  };

  // Funções de Gestos de Toque (Swipe) para Mobile
  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Distância mínima para considerar o swipe
    const diff = touchStartX.value - touchEndX.value;
    const totalPosts = blogData.value.posts.length;

    if (totalPosts === 0) return;

    if (diff > threshold) {
      // Arrastou para a esquerda (Próximo post)
      if (currentMobileIndex.value < totalPosts - 1) {
        currentMobileIndex.value++;
      }
    } else if (diff < -threshold) {
      // Arrastou para a direita (Post anterior)
      if (currentMobileIndex.value > 0) {
        currentMobileIndex.value--;
      }
    }
  };

  return {
    blogData,
    isLoading,
    currentMobileIndex,
    navigateToPost,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}