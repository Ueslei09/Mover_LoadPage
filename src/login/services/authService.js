// src/login/services/authService.js
export const authService = {
  async login(email, senha) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Erro ao efetuar login.');
    }

    // <-- ADICIONE ESTA LINHA PARA GUARDAR O TOKEN JWT NO NAVEGADOR
    if (data.token) {
      localStorage.setItem('mover_token', data.token);
    }

    return data;
  },

  getLogoData() {
    return {
      url: new URL('@/assets/logo-mover.png', import.meta.url).href,
      alt: 'Mover Sistemas - SaaS Platform'
    };
  }
};