// src/modules/mover/composables/useMoverDemoModal.js
import { ref, onMounted } from 'vue';
import { moverDemoService } from '../services/moverDemoService';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/leads`;

export function useMoverDemoModal() {
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

  onMounted(() => {
    demoData.value = moverDemoService.getFormData();
  });

  const openModal = () => {
    isModalOpen.value = true;
    errorMessage.value = '';
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loading.value = true;
    errorMessage.value = '';

    try {
      // Envia os dados para a nossa API Node.js na porta 5000
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.value.nome,
          email: formState.value.email,
          phone: formState.value.telefone,
          // Se quiser guardar cargo, empresa e mensagem juntos no campo mensagem ou na base de dados:
          message: `Cargo: ${formState.value.cargo} | Empresa: ${formState.value.empresa} | Mensagem: ${formState.value.mensagem}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar a solicitação.');
      }

      alert("Demonstração solicitada com sucesso! Entraremos em contacto em breve.");
      
      // Limpar o formulário e fechar o modal
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
      alert("Ocorreu um erro ao conectar com o servidor. Tente novamente.");
    } finally {
      loading.value = false;
    }
  };

  return {
    isModalOpen,
    demoData,
    formState,
    loading, // Útil caso queira mostrar um indicador de "A enviar..." no botão do modal
    openModal,
    closeModal,
    handleSubmit
  };
}

