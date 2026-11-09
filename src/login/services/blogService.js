// src/login/services/blogService.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/blog`;


export const blogService = {
  async fetchPosts() {
    const token = localStorage.getItem('mover_token');
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao carregar posts do blog.');
    }
    return data.data;
  },

  async createPost(postData) {
    const token = localStorage.getItem('mover_token');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao criar post.');
    }
    return data;
  },

  async updatePost(id, postData) {
    const token = localStorage.getItem('mover_token');
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao atualizar post.');
    }
    return data;
  },

  async deletePost(id) {
    const token = localStorage.getItem('mover_token');
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao remover post.');
    }
    return data;
  }
};