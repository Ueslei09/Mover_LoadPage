// src/modules/mover/composables/useMoverNavbar.js
import { ref } from 'vue'
import { moverNavbarService } from '../services/moverNavbarService'

export function useMoverNavbar() {
  const navbarData = ref(moverNavbarService.getData())

  return {
    navbarData
  }
}