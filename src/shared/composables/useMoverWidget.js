import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { moverIaConfig } from "../services/moverIaService";

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

  let iconFrameTimeoutId = null;
  let panelFrameTimeoutId = null;
  let initialLoadTimeoutId = null;

  const clearTimers = () => {
    if (iconFrameTimeoutId !== null) {
      clearTimeout(iconFrameTimeoutId);
      iconFrameTimeoutId = null;
    }
    if (panelFrameTimeoutId !== null) {
      clearTimeout(panelFrameTimeoutId);
      panelFrameTimeoutId = null;
    }
    if (initialLoadTimeoutId !== null) {
      clearTimeout(initialLoadTimeoutId);
      initialLoadTimeoutId = null;
    }
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
    if (initialLoadTimeoutId !== null) {
      clearTimeout(initialLoadTimeoutId);
      initialLoadTimeoutId = null;
    }

    const loaderCfg = config?.initialLoad;
    const isLoaderEnabled = loaderCfg?.enabled !== false;
    const durationMs = Number(loaderCfg?.durationMs ?? 10000);

    const frameCfg = config?.initialFrame;
    const isFrameEnabled = frameCfg?.enabled !== false;
    const frameDelayMs = Number(frameCfg?.delayMs ?? 1000);

    if (!isLoaderEnabled || durationMs <= 0) {
      showPanelFrame.value = false;
      isInitialLoading.value = false;
      return;
    }

    isInitialLoading.value = true;

    if (isFrameEnabled && frameCfg?.src && frameDelayMs > 0) {
      showPanelFrame.value = true;
      panelFrameTimeoutId = setTimeout(() => {
        showPanelFrame.value = false;
        panelFrameTimeoutId = null;
      }, frameDelayMs);
    } else {
      showPanelFrame.value = false;
    }

    initialLoadTimeoutId = setTimeout(() => {
      isInitialLoading.value = false;
      showPanelFrame.value = false;
      initialLoadTimeoutId = null;
    }, durationMs);
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
    showBubble.value = true;
    isInitialLoading.value = false;
    showPanelFrame.value = false;
    if (panelFrameTimeoutId !== null) {
      clearTimeout(panelFrameTimeoutId);
      panelFrameTimeoutId = null;
    }
    if (initialLoadTimeoutId !== null) {
      clearTimeout(initialLoadTimeoutId);
      initialLoadTimeoutId = null;
    }
  };

  const toggleWidget = () => {
    if (!isOpen.value) {
      isOpen.value = true;
      showBubble.value = false;
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
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", updateViewport, { passive: true });
      window.addEventListener("resize", updateViewport, { passive: true });
    }
  });

  onUnmounted(() => {
    clearTimers();
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    }
  });

  return {
    isOpen,
    showBubble,
    isMobile,
    showIconFrame,
    showPanelFrame,
    isInitialLoading,
    parallaxOffset,
    activeFrameMedia,
    activeLauncherMedia,
    activeHeaderMedia,
    activeLoaderMedia,
    markLauncherMediaFailed,
    markHeaderMediaFailed,
    markLoaderMediaFailed,
    markFrameMediaFailed,
    toggleWidget,
    closeWidget,
  };
}