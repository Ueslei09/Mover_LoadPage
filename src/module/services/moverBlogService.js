// src/modules/mover/services/moverBlogService.js

// Variável de memória global do módulo para nunca perder o cache entre trocas de página
let memoryCache = null;

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/blog`;

export const moverBlogService = {
  async fetchPosts(forceRefresh = false) {
    // Se já temos os dados em memória e não foi pedido refresh forçado, retorna instantaneamente (0ms)
    if (memoryCache && !forceRefresh) {
      return memoryCache;
    }

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      const postsFromApi = result.success && result.data ? result.data.map(post => ({
        id: post.id,
        slug: post.slug || 'artigo',
        route: `/blog/${post.slug || 'artigo'}`,
        date: post.date || new Date(post.created_at).toLocaleDateString(),
        title: post.title,
        description: post.paragraphs || post.description || 'Sem descrição...',
        mediaType: post.media_type || 'image',
        mediaUrl: post.media_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        buttonText: 'Ler Artigo'
      })) : [];

      // Guarda permanentemente na memória RAM do navegador durante a sessão
      memoryCache = postsFromApi;
      return memoryCache;

    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      // Se falhar a rede mas tivermos cache anterior, usa-o para nunca quebrar a página
      if (memoryCache) return memoryCache;
      return [];
    }
  },

  async getData(forceRefresh = false) {
    const posts = await this.fetchPosts(forceRefresh);
    return {
      tag: 'BLOG',
      titlePrefix: 'Mover',
      titleHighlight: 'Sistemas',
      posts: posts
    };
  }
};