// src/modules/mover/composables/useMoverProvaSocial.js
import { ref, onMounted, onUnmounted } from 'vue';
import { moverProvaSocialService } from '../services/moverProvaSocialService';

export function useMoverProvaSocial() {
  const slides = ref([]);
  const currentIndex = ref(0);
  let intervalId = null;

  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  };

  const setSlide = (index) => {
    currentIndex.value = index;
  };

  onMounted(() => {
    slides.value = moverProvaSocialService.getProvaSocialData();
    // Autoplay de 5 em 5 segundos com transição fluida
    intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return {
    slides,
    currentIndex,
    setSlide
  };
}