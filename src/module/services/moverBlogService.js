// src/modules/mover/services/moverBlogService.js
export const moverBlogService = {
  getData() {
    return {
      tag: 'BLOG',
      titlePrefix: 'Mover',
      titleHighlight: '  Sistemas',
      posts: [
        {
          id: 1,
          route: '/blog/transformacao-digital',
          date: '29 Out 2026',
          title: 'Como automatizar tarefas financeiras no ERP',
          description: 'Automatizar tarefas financeiras reduz erros, acelera decisões e integra controles. Veja como estruturar esse avanço com um ERP empresarial.',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Ler Artigo'
        },
        {
          id: 2,
          route: '/blog/tendencias-erp-2026',
          date: '27 Out 2026',
          title: 'Tendências ERP para empresas médias em 2026',
          description: 'Conheça as tendências ERP para empresas médias e saiba como integrar dados, reduzir custos e preparar a operação para crescer com controle e agilidade.',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Ler Artigo'
        },
        {
          id: 3,
          route: '/blog/gestao-varejo-pdv',
          date: '24 Out 2026',
          title: 'Gestão integrada no varejo e frente de caixa',
          description: 'Agilize o atendimento no balcão e caixas, integrando a frente de loja ao retaguarda fiscal em tempo real com total segurança.',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1556742049-0a67d553c299?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Ler Artigo'
        },
        {
          id: 4,
          route: '/blog/reforma-tributaria-erp',
          date: '20 Out 2026',
          title: 'Como preparar o seu ERP para a Reforma Tributária',
          description: 'Entenda os impactos das novas diretrizes fiscais e como automatizar a apuração de tributos para evitar riscos operacionais.',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Ler Artigo'
        }
      ]
    }
  }
}