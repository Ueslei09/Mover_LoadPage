// src/modules/mover/composables/useMoverVideo.js
import { ref } from 'vue'
import { moverVideoService } from '../services/moverVideoService'

export function useMoverVideo() {
  const videoData = ref(moverVideoService.getData())
  return {
    videoData
  }
}