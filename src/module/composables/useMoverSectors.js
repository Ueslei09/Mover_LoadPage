// src/modules/mover/composables/useMoverSectors.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { moverSectorsService } from '../services/moverSectorsService.js'

export function useMoverSectors() {
  const sectorsData = ref(moverSectorsService.getData())
  const currentIndex = ref(0)
  const expandedCardId = ref(null)
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  // Quantos cards aparecem por vez dependendo do tamanho do ecrã
  const itemsPerView = computed(() => {
    if (windowWidth.value < 768) return 1
    if (windowWidth.value < 992) return 2
    return 3
  })

  // Índice máximo permitido para o carrossel não passar do fim
  const maxIndex = computed(() => {
    return Math.max(0, sectorsData.value.sectors.length - itemsPerView.value)
  })

  const nextSlide = () => {
    if (currentIndex.value < maxIndex.value) {
      currentIndex.value++
    } else {
      currentIndex.value = 0 // Volta ao início em loop suave
    }
  }

  const prevSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else {
      currentIndex.value = maxIndex.value // Vai para o último bloco
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

  return {
    sectorsData,
    currentIndex,
    expandedCardId,
    itemsPerView,
    maxIndex,
    nextSlide,
    prevSlide,
    selectSlide,
    toggleExpand
  }
}