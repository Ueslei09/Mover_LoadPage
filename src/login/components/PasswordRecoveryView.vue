<!-- src/modules/mover/views/PasswordRecoveryView.vue -->
<template>
  <div class="recovery-container d-flex align-items-center justify-content-center min-vh-100 p-3">
    <div class="recovery-card bg-white shadow-lg p-4 p-md-5 rounded-4 w-100 position-relative">
      
      <div class="text-center mb-4">
        <h3 class="fw-bold text-custom-blue">Recuperação de Acesso</h3>
        <p class="text-muted small">Painel Administrativo Mover Sistemas</p>
      </div>

      <div v-if="errorMessage" class="alert alert-danger py-2 small" role="alert">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert alert-success py-2 small" role="alert">{{ successMessage }}</div>

      <!-- PASSO 1: INSERIR E-MAIL -->
      <form v-if="currentStep === 1" @submit.prevent="handleRequestEmail">
        <div class="mb-3">
          <label class="form-label small fw-semibold text-custom-blue">E-mail Cadastrado</label>
          <input v-model="email" type="email" class="form-control rounded-pill px-3 py-2" required placeholder="seu.email@moversistemas.com" />
        </div>
        <button type="submit" class="btn btn-mover-primary w-100 py-2 rounded-pill fw-semibold text-white shadow-sm" :disabled="loading">
          {{ loading ? 'A verificar...' : 'Avançar' }}
        </button>
      </form>

      <!-- PASSO 2: INSERIR CÓDIGO DE 6 DÍGITOS -->
      <form v-if="currentStep === 2" @submit.prevent="handleVerifyCode">
        <div class="mb-3">
          <label class="form-label small fw-semibold text-custom-blue">Código de Verificação</label>
          <input v-model="code" type="text" class="form-control text-center tracking-widest rounded-pill px-3 py-2 fs-5" required maxlength="6" placeholder="000000" />
          <small class="text-muted d-block mt-1 text-center">Insira os 6 dígitos enviados para o seu e-mail.</small>
        </div>
        <button type="submit" class="btn btn-mover-primary w-100 py-2 rounded-pill fw-semibold text-white shadow-sm" :disabled="loading">
          Validar Código
        </button>
      </form>

      <!-- PASSO 3: NOVA SENHA -->
      <form v-if="currentStep === 3" @submit.prevent="handleResetPassword">
        <div class="mb-3">
          <label class="form-label small fw-semibold text-custom-blue">Nova Senha</label>
          <input v-model="novaSenha" type="password" class="form-control rounded-pill px-3 py-2" required placeholder="Mínimo de 6 caracteres" />
        </div>
        <button type="submit" class="btn btn-mover-primary w-100 py-2 rounded-pill fw-semibold text-white shadow-sm" :disabled="loading">
          Salvar Nova Senha
        </button>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-decoration-none text-muted small hover-link">Voltar para o Login</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { usePasswordRecovery } from '../composable/usePasswordRecovery';

const {
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
} = usePasswordRecovery();
</script>

<style scoped>
.recovery-container {
  background: linear-gradient(135deg, #0b2545 0%, #133b6d 100%);
}
.recovery-card {
  max-width: 480px;
  border: 1px solid rgba(11, 37, 69, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.recovery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}
.text-custom-blue { color: #0b2545 !important; }
.btn-mover-primary {
  background-color: #8bc34a;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}
.btn-mover-primary:hover {
  background-color: #7ab23a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 195, 74, 0.4);
}
.hover-link:hover {
  color: #8bc34a !important;
  text-decoration: underline !important;
}
.tracking-widest { letter-spacing: 0.3rem; }
</style>