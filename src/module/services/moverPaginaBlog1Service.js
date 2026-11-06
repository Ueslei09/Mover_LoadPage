// src/modules/mover/services/moverPaginaBlog1Service.js

// Dicionário com todos os seus artigos do blog mapeados por um "slug"
const artigosDB = {
  'transformacao-digital': {
    breadcrumbs: [
      { label: "Início", url: "/" },
      { label: "Blog", url: "#" }
    ],
    title: "Transformação digital que melhora a gestão",
    date: "Publicado em 4 Nov 2026",
    author: "Mover Sistemas",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    mediaAlt: "Profissional utilizando ferramentas digitais de gestão",
    paragraphs: [
      "Quando o estoque informado não bate com o saldo físico, o financeiro fecha números diferentes dos apresentados pela operação e a equipe precisa atualizar a mesma informação em três planilhas, o problema não é apenas falta de tempo. É falta de integração. A transformação digital começa justamente ao substituir controles isolados por processos conectados, rastreáveis e orientados por dados confiáveis.",
      "No processo de digitalização, a principal mudança envolve a visibilidade em tempo real. Gestores deixam de depender de relatórios estáticos gerados no final do mês e passam a monitorar indicadores de desempenho diretamente no painel de controle.",
      "Automatizar tarefas repetitivas reduz gargalos operacionais, acelera decisões estratégicas e garante que toda a jornada corporativa caminhe na mesma direção.",
      
    ],
    button: {
      text: "Voltar para o Blog",
      url: "/",
      ariaLabel: "Voltar para a página inicial"
    }
  },
  'automacao-financeira': {
    breadcrumbs: [
      { label: "Início", url: "/" },
      { label: "Blog", url: "#" }
    ],
    title: "Como automatizar tarefas financeiras no ERP",
    date: "Publicado em 29 Out 2026",
    author: "Mover Sistemas",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    mediaAlt: "Gráficos de automação financeira e ERP",
    paragraphs: [
      "Automatizar tarefas financeiras reduz erros operacionais, acelera o fechamento de caixa e integra todos os controles da empresa em um só lugar.",
      "Com o ERP da Mover, os lançamentos ocorrem de forma fluida e em tempo real."
    ],
    button: {
      text: "Voltar para o Blog",
      url: "/#blog",
      ariaLabel: "Voltar para a página inicial"
    }
  }
};

export const moverPaginaBlog1Service = {
  // Alteramos para receber o slug e buscar o artigo correspondente
  getBlogPostData(slug) {
    // Se encontrar o artigo pelo slug, retorna ele. Caso contrário, retorna o de transformação digital como padrão.
    return artigosDB[slug] || artigosDB['transformacao-digital'];
  }
};