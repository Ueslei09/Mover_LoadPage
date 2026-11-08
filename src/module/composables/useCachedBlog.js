// src/modules/mover/composables/useCachedBlog.js
import { ref } from 'vue';

// Variável global fora da função para persistir em memória durante a sessão
const cachedPosts = ref(null);
const loadingCache = ref(false);

export function useCachedBlog() {
  const fetchPostsWithCache = async (forceRefresh = false) => {
    if (cachedPosts.value && !forceRefresh) {
      return cachedPosts.value; // Retorna imediatamente se já tiver em cache
    }

    loadingCache.value = true;
    try {
      const response = await fetch('http://localhost:5000/api/blog');
      const result = await response.json();
      if (result.success) {
        cachedPosts.value = result.data;
      }
    } catch (err) {
      console.error('Erro ao buscar blog:', err);
    } finally {
      loadingCache.value = false;
    }

    return cachedPosts.value || [];
  };

  return {
    cachedPosts,
    fetchPostsWithCache
  };
}