// src/login/services/leadService.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/leads`;

export const leadService = {
  async fetchLeads() {
    const token = localStorage.getItem('mover_token'); // Recupera o token JWT guardado no login

    const response = await fetch(API_URL, {
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

    const response = await fetch(`${API_URL}/${id}`, {
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