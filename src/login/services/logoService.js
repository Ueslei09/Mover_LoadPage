// src/login/services/logoService.js
export const logoService = {
  getLogoData() {
    return {
      // Forma correta e moderna do Vite para carregar assets dinamicamente em serviços
      url: new URL('/moovelogo1_imagem.png', import.meta.url).href,
      alt: 'Mover Sistemas - SaaS Platform'
    };
  }
};