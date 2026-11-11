// src/modules/mover/composables/useScrollVideo.js
import { ref, onMounted, onUnmounted } from 'vue'
import { moverVideoService } from '@/module/services/moverVideoService'

export function useScrollVideo() {
  const videoData = ref(moverVideoService.getData())
  const videoRef = ref(null)
  const isPlaying = ref(false)
  let observer = null

  const toggleVideoPlay = () => {
    if (!videoRef.value) return
    if (videoRef.value.paused) {
      videoRef.value.play()
    } else {
      videoRef.value.pause()
    }
  }

  onMounted(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Dispara quando 50% do vídeo aparecer na tela
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!videoRef.value) return

        if (entry.isIntersecting) {
          videoRef.value.play().catch(() => {
            // Ignora bloqueios automáticos do navegador se houver restrição
          })
        } else {
          videoRef.value.pause()
        }
      })
    }, options)

    if (videoRef.value) {
      observer.observe(videoRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && videoRef.value) {
      observer.unobserve(videoRef.value)
    }
  })

  return {
    videoData,
    videoRef,
    isPlaying,
    toggleVideoPlay
  }
}