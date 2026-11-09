// src/modules/mover/composables/usePasswordRecovery.js


import { ref } from 'vue';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/usuarios`;

export function usePasswordRecovery() {
  const currentStep = ref(1);
  const email = ref('');
  const code = ref('');
  const novaSenha = ref('');
  const errorMessage = ref('');
  const successMessage = ref('');
  const loading = ref(false);

  const handleRequestEmail = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
      const response = await fetch(`${API_URL}/recuperar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'E-mail não encontrado.');
      
      currentStep.value = 2;
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const handleVerifyCode = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
      const response = await fetch(`${API_URL}/verificar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, code: code.value })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Código inválido.');

      currentStep.value = 3;
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const handleResetPassword = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
      const response = await fetch(`${API_URL}/alterar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, code: code.value, novaSenha: novaSenha.value })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Erro ao alterar senha.');

      successMessage.value = 'Senha alterada com sucesso! Redirecionando...';
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    currentStep,
    email,
    code,
    novaSenha,
    errorMessage,
    successMessage,
    loading,
    handleRequestEmail,
    handleVerifyCode,
    handleResetPassword
  };
}