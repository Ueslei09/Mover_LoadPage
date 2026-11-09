<!-- src/modules/mover/views/admin/AdminUsersView.vue -->
<template>
  <div class="w-100 px-2 px-md-4">
    <!-- Cabeçalho -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="fw-bold text-custom-blue mb-1">Gestão de Utilizadores</h2>
        <p class="text-muted small mb-0">Crie e gerencie os acessos ao painel administrativo de forma segura</p>
      </div>
      <button @click="showModal = true" class="btn btn-mover-primary fw-semibold px-4 py-2 rounded-pill text-white shadow-sm text-nowrap align-self-start align-self-md-auto">
        <i class="bi bi-plus-lg me-1"></i> Novo Utilizador
      </button>
    </div>

    <!-- Tabela de Utilizadores com largura total e fluida -->
    <div class="card border-0 shadow-sm rounded-4 w-100 overflow-hidden">
      <div class="table-responsive">
        <table class="table align-middle mb-0 w-100">
          <thead class="bg-light text-uppercase fs-7 text-muted">
            <tr>
              <th class="ps-4 py-3">Nome</th>
              <th class="py-3">E-mail</th>
              <th class="py-3">Cargo / Permissão</th>
              <th class="py-3">Status</th>
              <th class="py-3 pe-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="ps-4 fw-semibold text-custom-blue py-3">{{ user.nome }}</td>
              <td class="text-muted py-3">{{ user.email }}</td>
              <td class="py-3">
                <span class="badge px-3 py-2" :class="user.cargo_permissao === 'Admin' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'">
                  {{ user.cargo_permissao }}
                </span>
              </td>
              <td class="py-3">
                <span class="badge px-3 py-2" :class="user.status === 'Ativo' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'">
                  {{ user.status }}
                </span>
              </td>
              <td class="text-muted small py-3 pe-4">{{ user.created_at }}</td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="5" class="text-center py-4 text-muted">Nenhum utilizador registado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Criação -->
    <div v-if="showModal" class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-4 p-3">
      <div class="modal-card bg-white shadow-lg p-4 rounded-4 w-100">
        <h4 class="fw-bold text-custom-blue mb-3">Novo Utilizador Administrativo</h4>
        
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Nome</label>
            <input v-model="form.nome" type="text" class="form-control" required placeholder="Nome do operador" />
          </div>
          <div class="mb-3">
            <label class="form-label small fw-semibold">E-mail</label>
            <input v-model="form.email" type="email" class="form-control" required placeholder="email@moversistemas.com" />
          </div>
          <div class="mb-3">
            <label class="form-label small fw-semibold">Senha</label>
            <input v-model="form.senha" type="password" class="form-control" required placeholder="Defina uma senha segura" />
          </div>
          <div class="mb-3">
            <label class="form-label small fw-semibold">Cargo / Permissão</label>
            <select v-model="form.cargo_permissao" class="form-select">
              <option value="Admin">Admin</option>
              <option value="Operador">Operador</option>
            </select>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" @click="showModal = false" class="btn btn-outline-secondary px-4 rounded-pill">Cancelar</button>
            <button type="submit" class="btn btn-mover-primary px-4 rounded-pill text-white">Salvar Utilizador</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminUsers } from '../composable/useAdminUsers';

const { users, showModal, form, handleCreateUser } = useAdminUsers();

const onSubmit = async () => {
  try {
    await handleCreateUser();
    alert('Utilizador criado com sucesso!');
  } catch (err) {
    alert('Erro: ' + err.message);
  }
};
</script>

<style scoped>
.text-custom-blue { color: #0b2545 !important; }
.btn-mover-primary { background-color: #0b2545; border: none; }
.btn-mover-primary:hover { background-color: #8bc34a; color: #0b2545 !important; }

/* Modal ajustado para cobrir apenas a área útil à direita da sidebar */
.modal-backdrop-custom { 
  position: fixed;
  top: 0;
  left: 260px; /* Começa exatamente onde termina a sidebar em desktop */
  width: calc(100% - 260px); /* Ocupa o resto do ecrã */
  height: 100vh;
  background-color: rgba(11, 37, 69, 0.6); 
  backdrop-filter: blur(4px); 
  z-index: 1050;
}

.modal-card { 
  max-width: 500px; 
  width: 90%;
}

/* Ajuste automático para ecrãs menores onde a sidebar fica reduzida (80px) */
@media (max-width: 992px) {
  .modal-backdrop-custom {
    left: 80px;
    width: calc(100% - 80px);
  }
}
</style>