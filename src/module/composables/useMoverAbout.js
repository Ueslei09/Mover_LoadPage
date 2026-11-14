// src/modules/mpro/composables/useMpro.js
import { ref, onMounted, onUnmounted } from 'vue'
import { mproService } from '../services/MoverAboutService.js'

export function useMpro() {
  const mproData = ref(mproService.getHeroData())
  const currentSlide = ref(0)
  const activeVideoRef = ref(null)
  let slideTimeout = null
  let observer = null

  // Variáveis para controlar o Swipe no Mobile
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const scheduleNextSlide = () => {
    const delay = currentSlide.value === 0 ? 20000 : 10000
    if (slideTimeout) clearTimeout(slideTimeout)

    slideTimeout = setTimeout(() => {
      currentSlide.value = (currentSlide.value + 1) % mproData.value.slides.length
      scheduleNextSlide()
    }, delay)
  }

  // Funções de Gestos de Toque (Swipe)
  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const threshold = 50 // Distância mínima em pixéis para o swipe
    const diff = touchStartX.value - touchEndX.value

    if (diff > threshold) {
      // Arrastou para a esquerda (Avançar slide)
      currentSlide.value = (currentSlide.value + 1) % mproData.value.slides.length
      scheduleNextSlide() // Reinicia o timer automático
    } else if (diff < -threshold) {
      // Arrastou para a direita (Recuar slide)
      currentSlide.value = (currentSlide.value - 1 + mproData.value.slides.length) % mproData.value.slides.length
      scheduleNextSlide() // Reinicia o timer automático
    }
  }

  const setVideoRef = (el) => {
    if (el) {
      activeVideoRef.value = el
    }
  }

  onMounted(() => {
    document.body.classList.add('mpro-page-active')
    scheduleNextSlide()

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!activeVideoRef.value) return

        if (entry.isIntersecting) {
          activeVideoRef.value.play().catch(() => {})
        } else {
          activeVideoRef.value.pause()
        }
      })
    }, options)

    const sectionEl = document.querySelector('.mpro-hero-section')
    if (sectionEl) {
      observer.observe(sectionEl)
    }
  })

  onUnmounted(() => {
    document.body.classList.remove('mpro-page-active')
    if (slideTimeout) clearTimeout(slideTimeout)
    if (observer) observer.disconnect()
  })

  return {
    mproData,
    currentSlide,
    setVideoRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleActionClick: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}