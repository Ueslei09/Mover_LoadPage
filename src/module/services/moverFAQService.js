// src/modules/mover/services/moverFAQService.js
export const moverFAQService = {
  getFAQData() {
    return {
      title: "Dúvidas sobre Gestão Empresarial",
      subtitle: "Respostas rápidas para as principais dúvidas sobre nossas soluções.",
      faqs: [
        {
          id: 1,
          question: "O que é um ERP?",
          answer: "O ERP (Enterprise Resource Planning) é um sistema integrado que unifica todos os processos de gestão da empresa, como finanças, vendas, estoque e fiscal."
        },
        {
          id: 2,
          question: "Qual é o diferencial do ERP da Mover?",
          answer: "O ERP Mover combina gestão integrada, especialização por setor e inteligência artificial conectada ao contexto do negócio."
        },
        {
          id: 3,
          question: "Como a IA se conecta às soluções Mover?",
          answer: "A inteligência artificial analisa dados em tempo real para prever cenários, automatizar rotinas e sugerir tomadas de decisão mais assertivas."
        },
        {
          id: 4,
          question: "O que é MCP?",
          answer: "MCP é a nossa metodologia exclusiva de conexão de pessoas e processos para acelerar a produtividade e a governança corporativa."
        },
        {
          id: 5,
          question: "Quais setores são atendidos?",
          answer: "Atendemos indústrias, comércio varejista e atacadista, prestadores de serviços e empresas de diversos portes com soluções modulares."
        },
        {
          id: 6,
          question: "Como funciona a implantação?",
          answer: "A implantação é estruturada por etapas com acompanhamento de especialistas certificados para garantir segurança e migração assistida de dados."
        },
        {
          id: 7,
          question: "Quanto tempo leva a implantação?",
          answer: "O tempo varia conforme o escopo e o segmento da empresa, sendo planejado sob medida para impactar minimamente a operação diária."
        }
      ]
    };
  }
};