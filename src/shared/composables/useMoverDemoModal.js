// src/modules/mover/composables/useMoverDemoModal.js
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { moverDemoService } from '../services/moverDemoService';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/leads`;

export function useMoverDemoModal() {
  const route = useRoute();
  const router = useRouter();

  const isModalOpen = ref(false);
  const demoData = ref(null);
  const formState = ref({
    nome: '',
    email: '',
    cargo: 'Selecione',
    telefone: '',
    empresa: '',
    mensagem: '',
    concordo1: false,
    concordo2: false
  });

  const loading = ref(false);
  const errorMessage = ref('');

  const openModal = () => {
    isModalOpen.value = true;
    errorMessage.value = '';
  };

  const closeModal = () => {
    isModalOpen.value = false;

    // Se estiver na rota dedicada /demonstracao ou com query ?demo=true, limpa ao fechar
    if (route?.path === moverDemoService.routePath) {
      router.replace('/').catch(() => {});
    } else if (route?.query?.demo || route?.query?.openDemo) {
      const nextQuery = { ...route.query };
      delete nextQuery.demo;
      delete nextQuery.openDemo;
      router.replace({ path: route.path, query: nextQuery }).catch(() => {});
    }
  };

  const handleWindowMessage = (event) => {
    if (moverDemoService.isOpenModalMessage(event?.data)) {
      openModal();
    }
  };

  watch(
    () => [route?.path, route?.query?.demo, route?.query?.openDemo, route?.meta?.openDemoModal],
    () => {
      if (moverDemoService.shouldOpenFromRoute(route)) {
        openModal();
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    demoData.value = moverDemoService.getFormData();
    if (moverDemoService.shouldOpenFromRoute(route)) {
      openModal();
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleWindowMessage);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleWindowMessage);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loading.value = true;
    errorMessage.value = '';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.value.nome,
          email: formState.value.email,
          phone: formState.value.telefone,
          message: `Cargo: ${formState.value.cargo} | Empresa: ${formState.value.empresa} | Mensagem: ${formState.value.mensagem}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar a solicitação.');
      }

      alert("Demonstração solicitada com sucesso! Entraremos em contacto em breve.");

      formState.value = {
        nome: '',
        email: '',
        cargo: 'Selecione',
        telefone: '',
        empresa: '',
        mensagem: '',
        concordo1: false,
        concordo2: false
      };

      closeModal();
    } catch (err) {
      console.error("Erro ao enviar lead:", err);
      errorMessage.value = "Ocorreu um erro ao conectar com o servidor. Tente novamente.";
      alert("Ocorreu um erro ao conectar com o servidor. Tente novamente.");
    } finally {
      loading.value = false;
    }
  };

  return {
    isModalOpen,
    demoData,
    formState,
    loading,
    errorMessage,
    openModal,
    closeModal,
    handleSubmit
  };
}