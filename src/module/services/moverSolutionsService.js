// src/modules/mover/services/moverSolutionsService.js
export const moverSolutionsService = {
  getData() {
    return {
      titlePrefix: 'Tudo o que move a gestão empresarial,',
      titleHighlight: 'conectado.',
      subtitle: 'Explore as soluções e encontre a combinação certa para o seu negócio.',
      featuresTitle: 'Soluções',
      tabs: [
        {
          id: 1,
          title: 'ERP – Backoffice',
          icon: 'bi bi-briefcase',
          description: 'Centralize finanças, vendas, suprimentos e fiscal para ganhar visibilidade, padronizar processos e decidir com dados confiáveis.',
          features: ['Mercado e vendas', 'Suprimentos', 'Finanças', 'Fiscal'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 2,
          title: 'Manufatura',
          icon: 'bi bi-gear-wide-connected',
          description: 'Controle o chão de fábrica, ordens de produção, custos e rastreabilidade de ponta a ponta com alta eficiência operacional.',
          features: ['Controle de Produção', 'Ordens de Serviço', 'Gestão de Insumos', 'Custos Industriais'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 3,
          title: 'Supply Chain',
          icon: 'bi bi-truck',
          description: 'Otimize armazéns, rotas de entrega, estoque e cadeia de suprimentos para entregas ágeis e sem gargalos.',
          features: ['Gestão de Armazém', 'Roteirização', 'Controle de Estoque', 'Expedição'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 4,
          title: 'Gestão Fiscal',
          icon: 'bi bi-file-earmark-text',
          description: 'Garanta total conformidade com o fisco, apuração automatizada de impostos e entrega de obrigações acessórias sem riscos.',
          features: ['Apuração de Impostos', 'Emissão de Notas', 'Obrigações Acessórias', 'Auditoria Fiscal'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 5,
          title: 'Varejo',
          icon: 'bi bi-shop',
          description: 'Agilize o atendimento no balcão e caixas, integrando frente de loja ao retaguarda fiscal em tempo real.',
          features: ['Frente de Caixa (PDV)', 'Controle de Lojas', 'Promoções e Fidelidade', 'Fechamento de Caixa'],
          mediaType: 'video',
          mediaUrl: '/mover2_video.mp4'
        },
        {
          id: 6,
          title: 'Serviços',
          icon: 'bi bi-headset',
          description: 'Gerencie contratos de prestação de serviços, ordens de atendimento, horas faturáveis e suporte técnico com excelência.',
          features: ['Contratos de Serviço', 'Ordens de Atendimento', 'Faturamento por Horas', 'Portal do Cliente'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  }
}