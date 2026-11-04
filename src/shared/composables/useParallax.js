// src/shared/composables/useParallax.js
import { ref, onMounted } from 'vue'

export function useParallax(thresholdValue = 0.05) {
  const isVisible = ref(false)
  const elementRef = ref(null)

  onMounted(() => {
    // Verifica se o elemento já está visível logo no carregamento inicial da página
    if (elementRef.value) {
      const rect = elementRef.value.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        isVisible.value = true
      }
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observerInstance.unobserve(entry.target) // Dispara a animação de forma fluida uma única vez
        }
      })
    }, {
      threshold: thresholdValue,
      rootMargin: '0px 0px -30px 0px'
    })

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  return {
    isVisible,
    elementRef
  }
}