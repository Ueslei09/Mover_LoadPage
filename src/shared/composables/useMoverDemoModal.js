// src/modules/mover/composables/useMoverDemoModal.js
import { ref, onMounted } from 'vue';
import { moverDemoService } from '../services/moverDemoService';

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

  onMounted(() => {
    demoData.value = moverDemoService.getFormData();
  });

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário enviados:", formState.value);
    alert("Demonstração solicitada com sucesso! Entraremos em contacto em breve.");
    closeModal();
  };

  return {
    isModalOpen,
    demoData,
    formState,
    openModal,
    closeModal,
    handleSubmit
  };
}