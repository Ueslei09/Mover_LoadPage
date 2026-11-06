// src/modules/mover/services/moverCopyrightService.js
export const moverCopyrightService = {
  getCopyrightData() {
    return {
      logoSrc: "/moovelogo1_imagem.png", // Substitua pelo caminho real da logo
      logoAlt: "Mover Sistemas Logo",
      copyrightText: `© ${new Date().getFullYear()} Mover Sistemas. Todos os direitos reservados.`
    };
  }
};