// src/modules/mover/services/moverDemoService.js
export const moverDemoService = {
  getFormData() {
    return {
      logoSrc: "/moovelogo1_imagem.png",
      logoAlt: "Mover Sistemas Logo",
      title: "Solicite uma Demonstração",
      fields: [
        { id: 'nome', label: 'Nome Completo*', type: 'text', placeholder: 'Digite seu nome completo', col: 'col-12' },
        { id: 'email', label: 'E-mail*', type: 'email', placeholder: 'seu@email.com', col: 'col-12' },
        { id: 'cargo', label: 'Cargo*', type: 'select', options: ['Selecione', 'Diretor(a)', 'Gerente', 'Analista', 'Outro'], col: 'col-md-6' },
        { id: 'telefone', label: 'Telefone*', type: 'tel', placeholder: '(DDD) + Telefone', col: 'col-md-6' },
        { id: 'empresa', label: 'Nome da empresa*', type: 'text', placeholder: 'Nome da sua empresa', col: 'col-12' },
        { id: 'mensagem', label: 'Mensagem', type: 'textarea', placeholder: 'Como podemos ajudar?', col: 'col-12' }
      ],
      consentText1: "Eu concordo em receber comunicações e ofertas personalizadas da Mover.",
      consentText2: "Li e concordo com a Política de Privacidade, autorizando o contato comercial.",
      submitButtonText: "Solicitar Demonstração"
    };
  }
};