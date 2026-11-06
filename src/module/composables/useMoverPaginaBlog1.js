// src/modules/mover/composables/useMoverPaginaBlog1.js
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { moverPaginaBlog1Service } from '../services/moverPaginaBlog1Service';

export function useMoverPaginaBlog1() {
  const route = useRoute();
  const router = useRouter();
  
  const postData = ref({
    breadcrumbs: [],
    title: '',
    date: '',
    author: '',
    mediaType: 'image',
    mediaUrl: '',
    mediaAlt: '',
    paragraphs: [],
    button: {}
  });

  watchEffect(() => {
    const slug = route.params.slug || 'transformacao-digital';
    const data = moverPaginaBlog1Service.getBlogPostData(slug);
    
    if (data) {
      postData.value = data;
    }
  });

  // Ação de voltar para o blog encapsulada no composable
  const voltarParaBlog = async () => {
    await router.push('/');
    
    setTimeout(() => {
      const elementoBlog = document.getElementById('blog');
      if (elementoBlog) {
        elementoBlog.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return {
    postData,
    voltarParaBlog // Exportamos a função para ser usada no componente
  };
}