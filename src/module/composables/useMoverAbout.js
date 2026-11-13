// src/modules/mpro/composables/useMpro.js
import { ref, onMounted, onUnmounted } from 'vue'
import { mproService } from '../services/MoverAboutService.js'

export function useMpro() {
  const mproData = ref(mproService.getHeroData())
  const currentSlide = ref(0)
  const activeVideoRef = ref(null) // Referência para o vídeo atual
  let slideTimeout = null
  let observer = null

  const scheduleNextSlide = () => {
    const delay = currentSlide.value === 0 ? 15000 : 5000
    if (slideTimeout) clearTimeout(slideTimeout)

    slideTimeout = setTimeout(() => {
      currentSlide.value = (currentSlide.value + 1) % mproData.value.slides.length
      scheduleNextSlide()
    }, delay)
  }

  // Função para vincular o elemento de vídeo atual quando o DOM atualizar
  const setVideoRef = (el) => {
    if (el) {
      activeVideoRef.value = el
    }
  }

  onMounted(() => {
    document.body.classList.add('mpro-page-active')
    scheduleNextSlide()

    // Configura o IntersectionObserver para dar play/pause baseado na rolagem da página
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Dispara quando 50% da seção estiver visível
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

    // Observa a seção principal do MproHero (ou podes passar um ref do elemento raiz)
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
    handleActionClick: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}