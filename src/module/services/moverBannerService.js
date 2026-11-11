// src/modules/mover/services/moverBannerService.js
export const moverBannerService = {
  getData() {
    return {
      bgImage: "/moverloadpager2_imagem.jpg",
      imageAlt: "Profissional sorrindo gerindo a empresa com controle",
      titleHighlight: "Gestão Empresarial",
      titleRest: "para crescer com controle.",
      description: "Conecte finanças, fiscal, vendas, suprimentos e operações para decidir melhor, ganhar eficiência e acelerar resultados.",
      primaryButton: {
        text: "Quero uma demonstração",
        url: "#demonstracao",
        ariaLabel: "Solicitar demonstração do sistema Mover"
      },
      secondaryButton: {
        text: "Conheça as soluções",
        url: "#solucoes",
        ariaLabel: "Conhecer soluções do sistema Mover"
      },
      clientsTitle: "Empresas",
      clientsSubtitle: "confiam na Mover",
      slides: [
        { id: 1, name: "Empresa Vel", img: "/moverlogo1carrosel.jpg", alt: "Logo da empresa parceira Vel" },
        { id: 2, name: "Petrobras / BR", img: "/moverlogo2carrosel.jpg", alt: "Logo da Petrobras BR" },
        { id: 3, name: "Tupy", img: "/moverlogo3carrosel.jpg", alt: "Logo da Tupy" },
        { id: 4, name: "Volkswagen", img: "/moverlogo4carrosel.png", alt: "Logo da Volkswagen" },
        { id: 5, name: "Weg", img: "/moverlogo5carrosel.png", alt: "Logo da Weg" },
        { id: 6, name: "Centauro", img: "/moverlogo6carrosel.png", alt: "Logo da Centauro" },
        { id: 7, name: "Senac", img: "/moverlogo4carrosel.png", alt: "Logo do Senac" }
      ]
    }
  }
}