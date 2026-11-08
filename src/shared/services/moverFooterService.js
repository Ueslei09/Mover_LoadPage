// src/shared/services/moverFooterService.js
export const moverFooterService = {
  getData() {
    // Insira aqui o número do telefone com DDI e DDD (ex: Brasil +55, Goiânia 62, seguido do número)
    const numeroTelefone = "556286423232"; 
    // Mensagem opcional padrão que já vai preenchida quando o cliente clica
    const mensagemPadrao = encodeURIComponent("Olá! Gostaria de falar com um especialista da Mover Sistemas.");

    return {
      // Logo ou ícone à esquerda
      logoType: "imagem", // "image" ou "icon"
      logoIcon: "/mover2_logo.png", 
      logoText: "Mover Sistemas",
      
      // Botões centrais
      primaryCta: {
        text: "Falar com especialista",
        url: "#contato",
        ariaLabel: "Falar com um especialista da Mover Sistemas"
      },
      whatsappCta: {
        text: "Vendas por whatsapp",
        url: `https://wa.me/${numeroTelefone}?text=${mensagemPadrao}`,
        ariaLabel: "Entrar em contato via WhatsApp para vendas",
        icon: "bi bi-whatsapp"
      }
    }
  }
}