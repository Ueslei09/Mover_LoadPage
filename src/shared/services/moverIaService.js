export const moverIaConfig = {
  // URL do seu Streamlit publicado no Render
  iframeUrl:
    import.meta.env.VITE_MOVER_IA_URL ||
    "https://agentedeia-u8z2.onrender.com/?embed=true",
  formUrl:
    import.meta.env.VITE_MOVER_FORM_URL || "https://seusite.com/formulario",
  whatsappUrl:
    import.meta.env.VITE_MOVER_WHATSAPP_URL ||
    "https://wa.me/5562994077581",

  bubbleText: "Olá eu sou Mover IA estou a disposição!",
  welcomeTitle: "Oi, eu sou MOVER IA, fico muito feliz em ter você por aqui!",
  welcomeSubtitle:
    "E vi que você tem interesse na nossa demonstração das nossas soluções.",

  // Frame inicial de imagem estática (1s) antes de exibir o GIF/vídeo e o initialLoad
  initialFrame: {
    enabled:
      import.meta.env.VITE_MOVER_IA_FRAME_DELAY_ENABLED !== "false",
    delayMs: Number(import.meta.env.VITE_MOVER_IA_FRAME_DELAY_MS) || 1000,
    src: import.meta.env.VITE_MOVER_IA_FRAME_SRC || "/IA_imagem.jpg",
    alt: "Mover IA - Frame inicial",
  },

  // Initial Load condicional: fica visível até a comunicação com o Render ser estabelecida
  initialLoad: {
    enabled:
      import.meta.env.VITE_MOVER_IA_INITIAL_LOAD_ENABLED !== "false",
    readyMessageType: "MOVER_IA_READY", // Mensagem enviada pelo agente quando pronto
    pollIntervalMs: 2500, // Intervalo para checar comunicação com o Render
    maxWaitMs: 60000, // Limite de segurança (60s) caso o Render não responda
    type: import.meta.env.VITE_MOVER_IA_LOADER_TYPE || "gif",
    src:
      import.meta.env.VITE_MOVER_IA_LOADER_SRC ||
      import.meta.env.VITE_MOVER_IA_ICON_SRC ||
      "/IA_icone 2.mp4",
    alt: "Animação da Mover IA carregando",
    title: "Eu sou MOVER IA",
    subtitle: "seja bem vindos",
  },

  iaIcon: {
    type:
      import.meta.env.VITE_MOVER_IA_ICON_TYPE || "gif",
    src:
      import.meta.env.VITE_MOVER_IA_ICON_SRC || "/IA_icone 2.mp4",
    headerSrc:
      import.meta.env.VITE_MOVER_IA_HEADER_ICON_SRC || "",
    alt: "Mover IA",
    fallbackEmoji: "🤖",
    closeEmoji: "✕",
  },
};