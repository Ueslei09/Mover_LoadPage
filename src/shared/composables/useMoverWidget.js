import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { moverIaConfig } from "../services/moverIaService";

const BUBBLE_VISIBLE_MS = 10000;
const BUBBLE_HIDDEN_MS = 8000;

function resolveMediaSource(srcValue, typeValue, hasFailed) {
  const cleanSrc = (srcValue || "").trim();
  if (!cleanSrc || hasFailed || typeValue === "emoji") {
    return { kind: "emoji", src: "" };
  }

  const lower = cleanSrc.toLowerCase();
  const isVideo =
    typeValue === "video" || lower.endsWith(".mp4") || lower.endsWith(".webm");

  if (isVideo) {
    return { kind: "video", src: cleanSrc };
  }

  return { kind: "image", src: cleanSrc };
}

export function useMoverWidget(config = moverIaConfig) {
  const isOpen = ref(false);
  const showBubble = ref(true);
  const scrollY = ref(0);
  const isMobile = ref(false);

  const launcherMediaFailed = ref(false);
  const headerMediaFailed = ref(false);
  const loaderMediaFailed = ref(false);
  const frameMediaFailed = ref(false);

  const showIconFrame = ref(true);
  const showPanelFrame = ref(false);
  const isInitialLoading = ref(false);
  const isRenderConnected = ref(false);

  let iconFrameTimeoutId = null;
  let panelFrameTimeoutId = null;
  let maxWaitTimeoutId = null;
  let bubbleCycleTimeoutId = null;

  const clearBubbleCycle = () => {
    if (bubbleCycleTimeoutId !== null) {
      clearTimeout(bubbleCycleTimeoutId);
      bubbleCycleTimeoutId = null;
    }
  };

  const clearConnectionWatchers = () => {
    if (maxWaitTimeoutId !== null) {
      clearTimeout(maxWaitTimeoutId);
      maxWaitTimeoutId = null;
    }
  };

  const clearAllTimers = () => {
    if (iconFrameTimeoutId !== null) {
      clearTimeout(iconFrameTimeoutId);
      iconFrameTimeoutId = null;
    }
    if (panelFrameTimeoutId !== null) {
      clearTimeout(panelFrameTimeoutId);
      panelFrameTimeoutId = null;
    }
    clearBubbleCycle();
    clearConnectionWatchers();
  };

  const scheduleBubbleHide = () => {
    clearBubbleCycle();
    if (isOpen.value) {
      showBubble.value = false;
      return;
    }

    showBubble.value = true;
    bubbleCycleTimeoutId = setTimeout(() => {
      showBubble.value = false;
      scheduleBubbleShow();
    }, BUBBLE_VISIBLE_MS);
  };

  const scheduleBubbleShow = () => {
    clearBubbleCycle();
    if (isOpen.value) {
      showBubble.value = false;
      return;
    }

    bubbleCycleTimeoutId = setTimeout(() => {
      if (!isOpen.value) {
        scheduleBubbleHide();
      }
    }, BUBBLE_HIDDEN_MS);
  };

  const startBubbleCycle = () => {
    if (isOpen.value) {
      showBubble.value = false;
      clearBubbleCycle();
      return;
    }
    scheduleBubbleHide();
  };

  const confirmRenderConnection = () => {
    isRenderConnected.value = true;
    isInitialLoading.value = false;
    showPanelFrame.value = false;
    clearConnectionWatchers();
  };

  const startIconFrameSequence = () => {
    if (iconFrameTimeoutId !== null) {
      clearTimeout(iconFrameTimeoutId);
      iconFrameTimeoutId = null;
    }

    const frameCfg = config?.initialFrame;
    const enabled = frameCfg?.enabled !== false;
    const delayMs = Number(frameCfg?.delayMs ?? 1000);

    if (!enabled || !frameCfg?.src || delayMs <= 0) {
      showIconFrame.value = false;
      return;
    }

    showIconFrame.value = true;
    iconFrameTimeoutId = setTimeout(() => {
      showIconFrame.value = false;
      iconFrameTimeoutId = null;
    }, delayMs);
  };

  const startPanelLoadSequence = () => {
    if (panelFrameTimeoutId !== null) {
      clearTimeout(panelFrameTimeoutId);
      panelFrameTimeoutId = null;
    }
    clearConnectionWatchers();

    const loaderCfg = config?.initialLoad;
    const isLoaderEnabled = loaderCfg?.enabled !== false;

    if (!isLoaderEnabled) {
      isRenderConnected.value = true;
      isInitialLoading.value = false;
      showPanelFrame.value = false;
      return;
    }

    isRenderConnected.value = false;
    isInitialLoading.value = true;

    const frameCfg = config?.initialFrame;
    const isFrameEnabled = frameCfg?.enabled !== false;
    const frameDelayMs = Number(frameCfg?.delayMs ?? 1000);

    if (isFrameEnabled && frameCfg?.src && frameDelayMs > 0) {
      showPanelFrame.value = true;
      panelFrameTimeoutId = setTimeout(() => {
        showPanelFrame.value = false;
        panelFrameTimeoutId = null;
      }, frameDelayMs);
    } else {
      showPanelFrame.value = false;
    }

    const maxWaitMs = Number(loaderCfg?.maxWaitMs ?? 60000);
    if (maxWaitMs > 0) {
      maxWaitTimeoutId = setTimeout(() => {
        confirmRenderConnection();
      }, maxWaitMs);
    }
  };

  const handleWindowMessage = (event) => {
    const readyType = config?.initialLoad?.readyMessageType || "MOVER_IA_READY";
    const payload = event?.data;
    if (
      payload === readyType ||
      (typeof payload === "object" && payload !== null && payload.type === readyType)
    ) {
      confirmRenderConnection();
    }
  };

  const handleIframeLoad = () => {
    // Mantém o initialLoad até receber MOVER_IA_READY do agente ou atingir maxWaitMs
  };

  const updateViewport = () => {
    if (typeof window === "undefined") return;
    scrollY.value = window.scrollY || window.pageYOffset || 0;
    isMobile.value = window.innerWidth <= 576;
  };

  const parallaxOffset = computed(() => {
    if (isOpen.value || isMobile.value) return 0;
    const rawOffset = Math.sin(scrollY.value * 0.008) * 10;
    return Number(rawOffset.toFixed(2));
  });

  const activeFrameMedia = computed(() =>
    resolveMediaSource(
      config?.initialFrame?.src || "/IA_imagem.jpg",
      "image",
      frameMediaFailed.value
    )
  );

  const activeLauncherMedia = computed(() =>
    resolveMediaSource(
      config?.iaIcon?.src,
      config?.iaIcon?.type,
      launcherMediaFailed.value
    )
  );

  const activeHeaderMedia = computed(() => {
    const headerSource = config?.iaIcon?.headerSrc || config?.iaIcon?.src;
    return resolveMediaSource(
      headerSource,
      config?.iaIcon?.type,
      headerMediaFailed.value
    );
  });

  const activeLoaderMedia = computed(() => {
    const loaderCfg = config?.initialLoad;
    const loaderSrc = loaderCfg?.src || config?.iaIcon?.src || "";
    const loaderType = loaderCfg?.type || config?.iaIcon?.type || "";
    return resolveMediaSource(loaderSrc, loaderType, loaderMediaFailed.value);
  });

  const markLauncherMediaFailed = () => {
    launcherMediaFailed.value = true;
  };

  const markHeaderMediaFailed = () => {
    headerMediaFailed.value = true;
  };

  const markLoaderMediaFailed = () => {
    loaderMediaFailed.value = true;
  };

  const markFrameMediaFailed = () => {
    frameMediaFailed.value = true;
  };

  const closeWidget = () => {
    isOpen.value = false;
    isInitialLoading.value = false;
    isRenderConnected.value = false;
    showPanelFrame.value = false;
    if (panelFrameTimeoutId !== null) {
      clearTimeout(panelFrameTimeoutId);
      panelFrameTimeoutId = null;
    }
    clearConnectionWatchers();
    startBubbleCycle();
  };

  const toggleWidget = () => {
    if (!isOpen.value) {
      isOpen.value = true;
      showBubble.value = false;
      clearBubbleCycle();
      startPanelLoadSequence();
    } else {
      closeWidget();
    }
  };

  watch(
    () => [
      config?.iaIcon?.src,
      config?.iaIcon?.headerSrc,
      config?.iaIcon?.type,
      config?.initialLoad?.src,
      config?.initialLoad?.type,
      config?.initialFrame?.src,
    ],
    () => {
      launcherMediaFailed.value = false;
      headerMediaFailed.value = false;
      loaderMediaFailed.value = false;
      frameMediaFailed.value = false;
    }
  );

  onMounted(() => {
    updateViewport();
    startIconFrameSequence();
    startBubbleCycle();
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", updateViewport, { passive: true });
      window.addEventListener("resize", updateViewport, { passive: true });
      window.addEventListener("message", handleWindowMessage);
    }
  });

  onUnmounted(() => {
    clearAllTimers();
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("message", handleWindowMessage);
    }
  });

  return {
    isOpen,
    showBubble,
    isMobile,
    showIconFrame,
    showPanelFrame,
    isInitialLoading,
    isRenderConnected,
    parallaxOffset,
    activeFrameMedia,
    activeLauncherMedia,
    activeHeaderMedia,
    activeLoaderMedia,
    markLauncherMediaFailed,
    markHeaderMediaFailed,
    markLoaderMediaFailed,
    markFrameMediaFailed,
    handleIframeLoad,
    confirmRenderConnection,
    toggleWidget,
    closeWidget,
  };
}