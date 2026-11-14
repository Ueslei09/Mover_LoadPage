// src/modules/mover/composables/useMoverSectors.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { moverSectorsService } from '../services/moverSectorsService.js'

export function useMoverSectors() {
  const sectorsData = ref(moverSectorsService.getData())
  const currentIndex = ref(0)
  const expandedCardId = ref(null)
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Variáveis para controlar o Swipe no Mobile
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const itemsPerView = computed(() => {
    if (windowWidth.value < 768) return 1
    if (windowWidth.value < 992) return 2
    return 3
  })

  const maxIndex = computed(() => {
    return Math.max(0, sectorsData.value.sectors.length - itemsPerView.value)
  })

  const nextSlide = () => {
    if (currentIndex.value < maxIndex.value) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }

  const prevSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else {
      currentIndex.value = maxIndex.value
    }
  }

  const selectSlide = (index) => {
    if (index <= maxIndex.value) {
      currentIndex.value = index
    }
  }

  const toggleExpand = (id) => {
    expandedCardId.value = expandedCardId.value === id ? null : id
  }

  // Funções de Gestos de Toque (Swipe)
  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const threshold = 50 // Distância mínima em pixéis para considerar um swipe
    const diff = touchStartX.value - touchEndX.value

    if (diff > threshold) {
      // Arrastou para a esquerda (Avançar)
      nextSlide()
    } else if (diff < -threshold) {
      // Arrastou para a direita (Recuar)
      prevSlide()
    }
  }

  return {
    sectorsData,
    currentIndex,
    expandedCardId,
    itemsPerView,
    maxIndex,
    nextSlide,
    prevSlide,
    selectSlide,
    toggleExpand,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}