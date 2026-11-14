// src/modules/mover/services/moverSectorsService.js
export const moverSectorsService = {
  getData() {
    return {
      titlePrefix: "Soluções que ",
      titleHighlight: "entendem a realidade ",
      titleSuffix: " da sua operação.",
      subtitle: "Explore as soluções e encontre a combinação certa para o seu negócio.",
      sectors: [
        {
          id: 1,
          title: "Cadastros",
          icon: "bi bi-database-check",
          description: "O Módulo de Cadastros é a base estrutural de todo o sistema, projetado para garantir agilidade no preenchimento, confiabilidade das informações e centralização de dados essenciais para as rotinas fiscais, comerciais e financeiras.",
          image: "/moversolucoes7_imagem.jpg",
          imageAlt: "Operação industrial Mover",
          footerCaption: "Pessoas, Produtos, Usuários e Lojas. O Módulo de Cadastros é a base estrutural de todo o sistema."
        },
        {
          id: 2,
          title: "Compras",
          icon: "bi bi-cart-dash",
          description: "O Módulo de Compras foi projetado para transformar o setor de suprimentos em um centro estratégico de economia e eficiência. Ele automatiza desde a identificação da necessidade de reposição até o recebimento e o lançamento fiscal das mercadorias.",
          image: "/moversolucoes8.jpg",
          imageAlt: "Agronegócio Mover",
          footerCaption: "Pedidos de Compras, Importar XML e Documentos Fiscais. O Módulo de Compras projetado para agilizar suas decisões de compras."
        },
        {
          id: 3,
          title: "Financeiro",
          icon: "bi bi-wallet2",
          description: "O Módulo Financeiro é o coração administrativo da empresa, projetado para garantir saúde de caixa, previsibilidade e controle absoluto sobre todas as entradas e saídas financeiras de forma automatizada e segura.",
          image: "/moversolucoes2_imagem.jpg",
          imageAlt: "Construção civil Mover",
          footerCaption: "Contas a Receber, Contas a Pagar e Fluxo de Caixa.O Módulo Financeiro controle absoluto sobre todas as entradas e saídas financeiras de forma automatizada e segura."
        },
        {
          id: 4,
          title: "Movimentações",
          icon: "bi bi-box-arrow-in-up",
          description: "O Módulo de Movimentações integra de ponta a ponta a cadeia de suprimentos e a saída de mercadorias, transformando o fluxo operacional em um processo unificado, inteligente e livre de redigitação.",
          image: "/moversolucoes5_imagem.jpg",
          imageAlt: "Logística Mover",
          footerCaption: "Compras, Vendas, Estoque e Faturamento. O Módulo de Movimentações transformar o fluxo operacional em um processo unificado, inteligente e livre de redigitação."
        },
        {
          id: 5,
          title: "Pedidos de Vendas",
          icon: "bi bi-upc-scan",
          description: "O Módulo de Vendas foi desenvolvido para centralizar, agilizar e dar total controle sobre a operação comercial de ponta a ponta. Ele conecta o balcão, o e-commerce, a equipe de campo e o setor de faturamento em um ecossistema inteligente, eliminando gargalos e erros manuais.",
          image: "/moversolucoes1_imagem.png",
          imageAlt: "Varejo Mover",
          footerCaption: "Pedidos de Vendas, Faturamento e PDV. Ele conecta o balcão, o e-commerce, a equipe de campo e o setor de faturamento."
        }
      ]
    }
  }
}