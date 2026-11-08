// src/modules/mover/services/moverCopyrightService.js
export const moverCopyrightService = {
  getCopyrightData() {
    return {
      logoSrc: '/moovelogo1_imagem.png',
      logoAlt: 'Mover Sistemas Logo',
      copyrightText: '© 2026 Mover Sistemas. Todos os direitos reservados.',
      
      // Lista de redes sociais à esquerda
      socialLinks: [
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/moversistemas?cplk=dWdoNmptZjZvN2Z4',
          icon: 'bi bi-instagram',
          ariaLabel: 'Visite nosso Instagram'
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/@seucanal',
          icon: 'bi bi-youtube',
          ariaLabel: 'Visite nosso canal no YouTube'
        },
        {
          name: 'X (Twitter)',
          url: 'https://x.com/seuperfil',
          icon: 'bi bi-twitter-x', // Ou bi-twitter
          ariaLabel: 'Visite nosso perfil no X'
        }
      ]
    };
  }
};