// src/modules/mover/services/moverNavbarService.js
export const moverNavbarService = {
  getData() {
    return {
      // Configuração da Logo (pode usar imagem ou texto)
      logoType: "image", // "image" ou "text"
      logoSrc: "/moovelogo1_imagem.png", // Caminho da logo ou use URL/ícone
      logoText: "Mover", // Caso queira usar texto como logo
      logoAlt: "Mover Sistemas Logo",

      // Link de navegação à direita
      navLink: {
        text: "Blog",
        url: "#blog",
        ariaLabel: "Ir para o blog do Mover"
      }
    }
  }
}