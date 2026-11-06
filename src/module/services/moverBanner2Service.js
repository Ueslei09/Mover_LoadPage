// src/modules/mover/services/moverBanner2Service.js
export const moverBanner2Service = {
  getBannerData() {
    return {
      bgType: "image", // Pode alterar para "video" se desejar
      bgUrl: "/moverbanner2_imagem.jpg",
      videoUrl: "", // URL do vídeo caso bgType seja "video"
      imageAlt: "Gestão integrada Mover Sistemas",
      // Título dividido para gerir as cores (Primeira parte branca, restante verde #8bc34a)
      titleWhite: "O negócio avança quando",
      titleGreen: "gestão de empresas e gestão de pessoas conversam.",
      description: "Conecte ERP e HCM para unir operação, estratégia e toda a jornada das pessoas.",
      primaryButton: {
        text: "Conheça as soluções",
        url: "#",
        ariaLabel: "Conheça as soluções de Gestão"
      },
      secondaryButton: {
        text: "Saiba mais",
        url: "#",
        ariaLabel: "Saiba mais sobre o Mover Banner 2"
      }
    };
  }
};