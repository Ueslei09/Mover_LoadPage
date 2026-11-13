// src/modules/mpro/services/mproService.js
export const mproService = {
  getHeroData() {
    return {
      logoImg: "/logmover1pretoebranco.png",
      logoAlt: "Logo Mpro Sistemas",
      
      subTitlePart1: "Descubra como a ",
      highlightWord: "Mover Sistemas",
      subTitlePart2: " transforma a gestão da sua  empresa.",
      
      description: "A Mover Sistemas tem como principal objetivo transformar e simplificar a gestão empresarial através de tecnologia de ponta, inteligência e eficiência operacional.",
      
      buttonText: "Quer saber mais?",
      buttonAriaLabel: "Fale com nossos especialistas sobre o Mpro",
      buttonUrl: "#demonstracao",
      
      // Array com os 6 slides (suporta 'video' ou 'image')
      slides: [
        { type: 'video', src: '/MOVEVIDEOPRINCIPAL2.mp4', alt: 'Demonstração Mpro 1' },
        { type: 'image', src: '/moverbout1_imagem.jpg', alt: 'Demonstração Mpro 2' },
        { type: 'image', src: '/moverabout2_imagem.jpg', alt: 'Demonstração Mpro 3' },
        { type: 'image', src: '/moverabut3_image.jpg', alt: 'Demonstração Mpro 4' },
        { type: 'image', src: '/moverabout4_imagem.jpg', alt: 'Demonstração Mpro 5' },
        { type: 'image', src: '/moverabout5_imagem.jpg', alt: 'Demonstração Mpro 6' }
      ]
    }
  }
}