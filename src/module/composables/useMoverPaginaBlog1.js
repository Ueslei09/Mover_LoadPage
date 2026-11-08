// src/modules/mover/composables/useMoverPaginaBlog1.js
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { moverBlogService } from '../services/moverBlogService';

export function useMoverPaginaBlog1() {
  const route = useRoute();
  const router = useRouter();

  const postData = ref({
    title: 'A carregar artigo...',
    author: 'Mover Sistemas',
    date: '',
    mediaUrl: '',
    mediaAlt: 'Imagem do Artigo',
    mediaType: 'image',
    breadcrumbs: [
      { label: 'Início', url: '/' },
      { label: 'Blog', url: '/#blog' },
      { label: 'Artigo', url: '#' }
    ],
    paragraphs: ['A carregar o conteúdo do artigo...'],
    button: {
      text: 'Voltar para o Blog',
      ariaLabel: 'Voltar para a listagem do blog'
    }
  });

  onMounted(async () => {
    try {
      const slugAtual = route.params.slug;
      
      // Obtém os dados instantaneamente da memória/cache (0ms)
      const dataBlog = await moverBlogService.getData();
      
      if (dataBlog && dataBlog.posts && dataBlog.posts.length > 0) {
        const postEncontrado = dataBlog.posts.find(p => 
          p.slug === slugAtual || p.route.includes(slugAtual)
        );

        if (postEncontrado) {
          let listaParagrafos = [];
          if (postEncontrado.description) {
            listaParagrafos = typeof postEncontrado.description === 'string'
              ? postEncontrado.description.split('\n').filter(p => p.trim() !== '')
              : [postEncontrado.description];
          } else {
            listaParagrafos = ['Sem conteúdo descritivo para este artigo.'];
          }

          postData.value = {
            title: postEncontrado.title,
            author: 'Mover Sistemas',
            date: postEncontrado.date,
            mediaUrl: postEncontrado.mediaUrl,
            mediaAlt: postEncontrado.title,
            mediaType: postEncontrado.mediaType || 'image',
            breadcrumbs: [
              { label: 'Início', url: '/' },
              { label: 'Blog', url: '/#blog' },
              { label: postEncontrado.title, url: '#' }
            ],
            paragraphs: listaParagrafos,
            button: {
              text: 'Voltar para o Blog',
              ariaLabel: 'Voltar para a página principal do blog'
            }
          };
          return;
        }
      }

      postData.value.title = 'Artigo não encontrado';
      postData.value.paragraphs = ['O artigo que procura não existe ou foi removido.'];

    } catch (err) {
      console.error('Erro ao carregar os detalhes do artigo:', err);
      postData.value.title = 'Artigo Indisponível';
      postData.value.paragraphs = ['Não foi possível carregar os detalhes deste artigo neste momento.'];
    }
  });

  const voltarParaBlog = () => {
    router.push({ path: '/', hash: '#blog' });
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return {
    postData,
    voltarParaBlog
  };
}