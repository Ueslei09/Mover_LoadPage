import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollToTop(offset = 50) {
  const isVisible = ref(false);

  const handleScroll = () => {
    // Altura total do documento
    const scrollHeight = document.documentElement.scrollHeight;
    // Ponto atual onde o usuário está (topo da janela visível + altura da tela)
    const currentPosition = window.innerHeight + window.scrollY;

    // Fica visível quando faltar apenas 'offset' pixels para o fim da página (ex: rodapé)
    isVisible.value = currentPosition >= scrollHeight - offset;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // Executa uma vez ao carregar caso a página seja curta
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    isVisible,
    scrollToTop
  };
}