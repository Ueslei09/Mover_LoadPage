<!-- src/modules/mover/views/admin/AdminUsersView.vue -->
<template>
  <div class="admin-layout d-flex flex-column flex-md-row">
    <!-- Se tiver o seu painel lateral/sidebar modularizado, ele entra aqui -->
    
    <div class="flex-grow-1 p-3 p-md-4 bg-light min-vh-100 w-100 overflow-hidden">
      <!-- Cabeçalho responsivo: Empilha em telemóveis e fica lado a lado em ecrãs médios -->
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <h2 class="fw-bold text-custom-blue mb-1 fs-3 fs-md-2">Gestão de Utilizadores</h2>
          <p class="text-muted small mb-0">Crie e gerencie os acessos ao painel administrativo de forma segura</p>
        </div>
        <button @click="showModal = true" class="btn btn-mover-primary fw-semibold px-4 py-2 rounded-pill text-white w-sm-auto shadow-sm">
          <i class="bi bi-plus-lg me-1"></i> Novo Utilizador
        </button>
      </div>

      <!-- Tabela de Utilizadores com Scroll Responsivo -->
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive text-nowrap">
          <table class="table align-middle mb-0">
            <thead class="bg-light text-uppercase fs-7 text-muted">
              <tr>
                <th class="ps-4">Nome</th>
                <th>E-mail</th>
                <th>Cargo / Permissão</th>
                <th>Status</th>
                <th>Criado em</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="ps-4 fw-semibold text-custom-blue">{{ user.nome }}</td>
                <td class="text-muted">{{ user.email }}</td>
                <td>
                  <span class="badge" :class="user.cargo_permissao === 'Admin' ? 'bg-danger' : 'bg-info'">
                    {{ user.cargo_permissao }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="user.status === 'Ativo' ? 'bg-success' : 'bg-secondary'">
                    {{ user.status }}
                  </span>
                </td>
                <td class="text-muted small">{{ user.created_at }}</td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="5" class="text-center py-4 text-muted">Nenhum utilizador encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal de Criação (Totalmente adaptável a ecrãs pequenos) -->
      <div v-if="showModal" class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-4 p-3 overflow-y-auto">
        <div class="modal-card bg-white shadow-lg p-4 p-md-5 rounded-4 w-100 my-auto">
          <h4 class="fw-bold text-custom-blue mb-3 fs-4">Novo Utilizador Administrativo</h4>
          
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

            <!-- Botões empilhados no telemóvel e lado a lado no PC -->
            <div class="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2 mt-4">
              <button type="button" @click="showModal = false" class="btn btn-outline-secondary px-4 rounded-pill">Cancelar</button>
              <button type="submit" class="btn btn-mover-primary px-4 rounded-pill text-white">Salvar Utilizador</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminUsers } from '../composable/useAdminUsers';

// Importa a lógica isolada do composable
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
.modal-backdrop-custom { background-color: rgba(11, 37, 69, 0.6); backdrop-filter: blur(4px); }
.modal-card { max-width: 500px; max-height: 90vh; overflow-y: auto; }
</style>