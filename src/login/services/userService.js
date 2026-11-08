// src/modules/mover/services/userService.js
const API_URL = 'http://localhost:5000/api/usuarios';

export const userService = {
  async getUsers() {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (err) {
      console.error('Erro ao buscar utilizadores:', err);
      return [];
    }
  },

  async createUser(userData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Erro ao criar utilizador');
      return result;
    } catch (err) {
      console.error('Erro ao criar utilizador:', err);
      throw err;
    }
  }
};