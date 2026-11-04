// src/shared/services/moverFooterService.js
export const moverFooterService = {
  getData() {
    return {
      // Logo ou ícone à esquerda (pode ser imagem ou ícone do Bootstrap)
      logoType: "imagem", // "image" ou "icon"
      logoIcon: "/mover2_logo.png", // Ícone de exemplo ou logo da marca
      logoText: "Mover Sistemas",
      
      // Botões centrais
      primaryCta: {
        text: "Falar com especialista",
        url: "#contato",
        ariaLabel: "Falar com um especialista da Mover Sistemas"
      },
      whatsappCta: {
        text: "Vendas por whatsapp",
        url: "https://wa.me/", // Insira o link do WhatsApp aqui
        ariaLabel: "Entrar em contato via WhatsApp para vendas",
        icon: "bi bi-whatsapp"
      }
    }
  }
}