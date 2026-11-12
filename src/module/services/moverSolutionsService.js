// src/modules/mover/services/moverSolutionsService.js
export const moverSolutionsService = {
  getData() {
    return {
      titlePrefix: 'Tudo o que move a Gestão do seu Negócio.',
      titleHighlight: ' Integrado e  Conectado.',
      subtitle: 'Explore as soluções e encontre a combinação certa para o seu negócio.',
      featuresTitle: 'Soluções',
      tabs: [
        {
          id: 1,
          title: 'Financeiro',
          icon: 'bi bi-briefcase',
          description: 'O Módulo Financeiro é o coração administrativo da empresa, projetado para garantir saúde de caixa, previsibilidade e controle absoluto sobre todas as entradas e saídas financeiras de forma automatizada e segura.',
          features: ['Conta a Receber', 'Contas a Pagar', 'Caixas', 'Fluxo de Caixa'],
          mediaType: 'image',
          mediaUrl: 'moversolucoes2_imagem.jpg'
        },
        {
          id: 2,
          title: 'Pedidos de Vendas',
          icon: 'bi bi-cart-dash',
          description: 'O Módulo de Vendas foi desenvolvido para centralizar, agilizar e dar total controle sobre a operação comercial de ponta a ponta. Ele conecta o balcão, o e-commerce, a equipe de campo e o setor de faturamento em um ecossistema inteligente, eliminando gargalos e erros manuais.',
          features: ['Pedidos de Vendas', 'Faturamento', 'PDV', 'Documentos Fiscais'],
          mediaType: 'image',
          mediaUrl: 'moversolucoes1_imagem.png'
        },
        {
          id: 3,
          title: 'Compras',
          icon: 'bi bi-truck',
          description: 'O Módulo de Compras foi projetado para transformar o setor de suprimentos em um centro estratégico de economia e eficiência. Ele automatiza desde a identificação da necessidade de reposição até o recebimento e o lançamento fiscal das mercadorias.',
          features: ['Pedido de Compra', 'Importar XML', 'Documentos Fiscais'],
          mediaType: 'image',
          mediaUrl: '/moversolucoes8.jpg'
        },
        {
          id: 4,
          title: 'Movimentações',
          icon: 'bi bi-file-earmark-text',
          description: 'O Módulo de Movimentações integra de ponta a ponta a cadeia de suprimentos e a saída de mercadorias, transformando o fluxo operacional em um processo unificado, inteligente e livre de redigitação.',
          features: ['Compras', 'Vendas', 'Estoque', 'Faturamento'],
          mediaType: 'image',
          mediaUrl: '/moversolucoes5_imagem.jpg'
        },
        {
          id: 5,
          title: 'Cadastros',
          icon: 'bi bi-shop',
          description: 'O Módulo de Cadastros é a base estrutural de todo o sistema, projetado para garantir agilidade no preenchimento, confiabilidade das informações e centralização de dados essenciais para as rotinas fiscais, comerciais e financeiras.',
          features: ['Pessoas', 'Produtos', 'Usuários', 'Lojas'],
          mediaType: 'image',
          mediaUrl: '/moversolucoes7_imagem.jpg'
        },
        /*{
          id: 6,
          title: 'Serviços',
          icon: 'bi bi-headset',
          description: 'Gerencie contratos de prestação de serviços, ordens de atendimento, horas faturáveis e suporte técnico com excelência.',
          features: ['Contratos de Serviço', 'Ordens de Atendimento', 'Faturamento por Horas', 'Portal do Cliente'],
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80'
        }*/
      ]
    }
  }
}