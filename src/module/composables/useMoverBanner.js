// src/modules/mover/composables/useMoverBanner.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { moverBannerService } from '../services/moverBannerService'

export function useMoverBanner() {
  const bannerData = ref(moverBannerService.getData())
  const currentIndex = ref(0)
  let intervalId = null

  const itemsPerView = computed(() => {
    return window.innerWidth < 992 ? 1 : 5
  })

  // Avança o índice ciclicamente de 1 em 1
  const nextSlide = () => {
    const totalSlides = bannerData.value.slides.length
    // Se chegar ao fim, volta para o 0 de forma fluida
    currentIndex.value = (currentIndex.value + 1) % totalSlides
  }

  onMounted(() => {
    intervalId = setInterval(nextSlide, 3000) // Intervalo de 3 segundos (mais rápido)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    bannerData,
    currentIndex,
    itemsPerView
  }
}