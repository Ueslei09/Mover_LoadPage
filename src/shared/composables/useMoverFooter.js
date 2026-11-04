// src/shared/composables/useMoverFooter.js
import { ref } from 'vue'
import { moverFooterService } from '../services/moverFooterService'

export function useMoverFooter() {
  const footerData = ref(moverFooterService.getData())

  return {
    footerData
  }
}