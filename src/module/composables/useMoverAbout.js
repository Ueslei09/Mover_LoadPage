// src/modules/mpro/composables/useMpro.js
import { ref, onMounted, onUnmounted } from 'vue'
import { mproService } from '../services/MoverAboutService.js'

export function useMpro() {
  const mproData = ref(mproService.getHeroData())

  // Lógica opcional para tornar a navbar transparente ao entrar nesta view
  onMounted(() => {
    document.body.classList.add('mpro-page-active')
  })

  onUnmounted(() => {
    document.body.classList.remove('mpro-page-active')
  })

  function handleActionClick() {
    console.log('Botão Fale com especialistas clicado')
  }

  return {
    mproData,
    handleActionClick
  }
}