// src/modules/mover/services/moverPaginaBlogService.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/blog`;
export const moverPaginaBlogService = {
  async getPostBySlug(slug) {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (result.success && result.data) {
        // Encontra o post correspondente ao slug da URL
        const found = result.data.find(p => p.slug === slug);
        if (found) {
          return {
            title: found.title,
            author: found.author || 'Mover Sistemas',
            date: found.date || new Date(found.created_at).toLocaleDateString(),
            mediaUrl: found.media_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            paragraphs: found.paragraphs || 'Sem conteúdo disponível.'
          };
        }
      }
      return null;
    } catch (err) {
      console.error('Erro ao buscar artigo individual:', err);
      return null;
    }
  }
};