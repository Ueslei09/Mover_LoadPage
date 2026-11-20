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

  // Tela de espera inicial (10s) enquanto o agente no Render inicia
  initialLoad: {
    enabled:
      import.meta.env.VITE_MOVER_IA_INITIAL_LOAD_ENABLED !== "false",
    durationMs: Number(import.meta.env.VITE_MOVER_IA_INITIAL_LOAD_MS) || 10000,
    type: import.meta.env.VITE_MOVER_IA_LOADER_TYPE || "gif", // "gif" | "video" | "image" | "emoji"
    src:
      import.meta.env.VITE_MOVER_IA_LOADER_SRC ||
      import.meta.env.VITE_MOVER_IA_ICON_SRC ||
      "/IA_icone 2.mp4",
    alt: "Animação da Mover IA carregando",
    title: "Eu sou MOVER IA",
    subtitle: "seja bem vindos",
  },

  // Configuração centralizada do ícone/mídia da IA no widget Vue
  // type: "emoji" | "image" | "gif" | "video"
  iaIcon: {
    type:
      import.meta.env.VITE_MOVER_IA_ICON_TYPE || "gif", // "emoji" | "image" | "gif" | "video"
    src:
      import.meta.env.VITE_MOVER_IA_ICON_SRC || "/IA_icone 2.mp4",
    headerSrc:
      import.meta.env.VITE_MOVER_IA_HEADER_ICON_SRC || "", // Opcional: usa `src` se vazio
    alt: "Mover IA",
    fallbackEmoji: "🤖",
    closeEmoji: "✕",
  },
};