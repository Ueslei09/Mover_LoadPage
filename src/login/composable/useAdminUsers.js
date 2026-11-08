// src/modules/mover/composables/useAdminUsers.js
import { ref, onMounted } from 'vue';
import { userService } from '../services/userService';

export function useAdminUsers() {
  const users = ref([]);
  const showModal = ref(false);
  const loading = ref(false);
  const form = ref({
    nome: '',
    email: '',
    senha: '',
    cargo_permissao: 'Operador',
    status: 'Ativo'
  });

  const loadUsers = async () => {
    loading.value = true;
    users.value = await userService.getUsers();
    loading.value = false;
  };

  onMounted(() => {
    loadUsers();
  });

  const handleCreateUser = async () => {
    try {
      await userService.createUser(form.value);
      showModal.value = false;
      form.value = { nome: '', email: '', senha: '', cargo_permissao: 'Operador', status: 'Ativo' };
      await loadUsers();
      return { success: true, message: 'Utilizador criado com sucesso!' };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return {
    users,
    showModal,
    form,
    loading,
    loadUsers,
    handleCreateUser
  };
}