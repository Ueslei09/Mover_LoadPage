// src/modules/mpro/services/mproService.js
export const mproService = {
  getHeroData() {
    return {
      logoImg: "/logmover1pretoebranco.png", // Substitua pelo caminho da sua logo Mpro branca ou correspondente
      logoAlt: "Logo Mpro Sistemas",
      
      // Subtítulo dividido para aplicar a cor #8bc34a na palavra do meio
      subTitlePart1: "Descubra como a ",
      highlightWord: "Mover Sistemas",
      subTitlePart2: " transforma a gestão da empresa",
      
      description: "A Mover Sistemas tem como principal objetivo transformar e simplificar a gestão empresarial através de tecnologia de ponta, inteligência e eficiência operacional.",
      
      buttonText: "Quer saber mais?",
      buttonAriaLabel: "Fale com nossos especialistas sobre o Mpro",
      
      heroImage: "/move6_imagem.png", // Mockup do computador/tablet igual ao print
      heroImageAlt: "Mpro em funcionamento no computador, tablet e celular"
    }
  }
}