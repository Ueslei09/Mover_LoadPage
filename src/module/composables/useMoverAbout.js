// src/modules/mpro/composables/useMpro.js
import { ref, onMounted, onUnmounted } from 'vue'
import { mproService } from '../services/MoverAboutService.js'

export function useMpro() {
  const mproData = ref(mproService.getHeroData())
  const currentSlide = ref(0)
  let slideTimeout = null

  const scheduleNextSlide = () => {
    // Define o tempo: 15000ms (15s) se for o índice 0, senão 5000ms (5s)
    const delay = currentSlide.value === 0 ? 15000 : 5000

    if (slideTimeout) clearTimeout(slideTimeout)

    slideTimeout = setTimeout(() => {
      // Avança para o próximo slide em looping
      currentSlide.value = (currentSlide.value + 1) % mproData.value.slides.length
      
      // Agenda o próximo ciclo recursivamente
      scheduleNextSlide()
    }, delay)
  }

  onMounted(() => {
    document.body.classList.add('mpro-page-active')
    // Inicia o ciclo do carrossel ao montar
    scheduleNextSlide()
  })

  onUnmounted(() => {
    document.body.classList.remove('mpro-page-active')
    if (slideTimeout) clearTimeout(slideTimeout)
  })

  function handleActionClick() {
    console.log('Botão Fale com especialistas clicado')
  }

  return {
    mproData,
    currentSlide,
    handleActionClick
  }
}