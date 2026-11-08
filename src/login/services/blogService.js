// src/login/services/blogService.js
export const blogService = {
  async fetchPosts() {
    const token = localStorage.getItem('mover_token');
    const response = await fetch('http://localhost:5000/api/blog', {
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
    const response = await fetch('http://localhost:5000/api/blog', {
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
    const response = await fetch(`http://localhost:5000/api/blog/${id}`, {
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
    const response = await fetch(`http://localhost:5000/api/blog/${id}`, {
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