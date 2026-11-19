import { ref, computed, onMounted, onUnmounted } from "vue";

export function useMoverWidget() {
  const isOpen = ref(false);
  const showBubble = ref(true);
  const scrollY = ref(0);

  const handleScroll = () => {
    scrollY.value = window.scrollY || window.pageYOffset || 0;
  };

  // Efeito parallax sutil: desloca verticalmente de forma controlada sem sair da tela
  const parallaxOffset = computed(() => {
    if (isOpen.value) return 0;
    const rawOffset = Math.sin(scrollY.value * 0.008) * 10;
    return Number(rawOffset.toFixed(2));
  });

  const toggleWidget = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      showBubble.value = false;
    }
  };

  const closeWidget = () => {
    isOpen.value = false;
    showBubble.value = true;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    isOpen,
    showBubble,
    parallaxOffset,
    toggleWidget,
    closeWidget
  };
}