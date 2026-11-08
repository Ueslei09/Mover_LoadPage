// src/modules/mover/services/moverBlogService.js
export const moverBlogService = {
  async getData() {
    try {
      const response = await fetch('http://localhost:5000/api/blog');
      const result = await response.json();

      // Mapeia os dados vindos do Supabase/Admin para a estrutura visual do site
      const postsFromApi = result.success && result.data ? result.data.map(post => ({
        id: post.id,
        route: `/blog/${post.slug || 'artigo'}`,
        date: post.date || new Date(post.created_at).toLocaleDateString(),
        title: post.title,
        description: post.paragraphs || 'Sem descrição...',
        mediaType: post.media_type || 'image',
        mediaUrl: post.media_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        buttonText: 'Ler Artigo'
      })) : [];

      return {
        tag: 'BLOG',
        titlePrefix: 'Mover',
        titleHighlight: ' Sistemas',
        posts: postsFromApi
      };
    } catch (err) {
      console.error('Erro ao carregar blog público:', err);
      return {
        tag: 'BLOG',
        titlePrefix: 'Mover',
        titleHighlight: ' Sistemas',
        posts: []
      };
    }
  }
};