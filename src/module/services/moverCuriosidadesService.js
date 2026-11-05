// src/modules/mpro/services/moverCuriosidadesService.js
export const moverCuriosidadesService = {
  async getCuriosidadesData() {
    // Simula uma resposta de API ou dados estruturados do ERP
    return {
      tag: "VEJA EM AÇÃO",
      titlePart1: "Saiba mais sobre a ",
      titleHighlight: "Reforma Tributária",
      // Define se exibirá 'video' ou 'image'
      mediaType: "video", 
      videoUrl: "/moverLoad_video.mp4",
      videoControls: false, // Controles de vídeo ativados
      fallbackImage: "@/assets/images/reforma-tributaria-banner.jpg",
      mediaAlt: "Apresentação detalhada sobre as adequações do ERP Mover Sistemas à Reforma Tributária de 2027, com gráficos e painéis fiscais",
      buttonText: "Saiba mais sobre a Reforma",
      buttonAriaLabel: "Botão para saber mais detalhes sobre a Reforma Tributária no ERP Mover Sistemas"
    };
  }
};