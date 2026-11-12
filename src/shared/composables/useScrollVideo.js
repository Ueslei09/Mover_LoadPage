// src/shared/composables/useScrollVideo.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollVideo() {
  const videoRef = ref(null)
  const isPlaying = ref(false)
  const showOverlay = ref(true)
  let observer = null

  const toggleVideoPlay = () => {
    if (!videoRef.value) return
    if (videoRef.value.paused) {
      videoRef.value.play().catch(() => {})
    } else {
      videoRef.value.pause()
    }
  }

  const handlePlay = () => {
    isPlaying.value = true
    showOverlay.value = false // Esconde o botão ao dar play
  }

  const handlePause = () => {
    isPlaying.value = false
    showOverlay.value = true // Mostra o botão ao pausar
  }

  // Disparado quando o vídeo chega ao fim
  const handleEnded = () => {
    isPlaying.value = false
    showOverlay.value = true // Reaparece o botão de play quando o vídeo termina
  }

  const handleVideoClick = () => {
    if (isPlaying.value) {
      showOverlay.value = true
    }
  }

  const handleOverlayClick = () => {
    toggleVideoPlay()
  }

  onMounted(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!videoRef.value) return

        if (entry.isIntersecting) {
          videoRef.value.play().catch(() => {})
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
    videoRef,
    isPlaying,
    showOverlay,
    toggleVideoPlay,
    handlePlay,
    handlePause,
    handleEnded,
    handleVideoClick,
    handleOverlayClick
  }
}