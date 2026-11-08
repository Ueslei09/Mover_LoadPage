// src/login/services/leadService.js
export const leadService = {
  async fetchLeads() {
    const token = localStorage.getItem('mover_token'); // Recupera o token JWT guardado no login

    const response = await fetch('http://localhost:5000/api/leads', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Envia o token para o backend autenticar
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao carregar leads.');
    }

    return data.data;
  },

  async updateLead(id, updateData) {
    const token = localStorage.getItem('mover_token');

    const response = await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(updateData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao atualizar lead.');
    }

    return data;
  }
};