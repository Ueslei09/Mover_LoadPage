// src/shared/composables/useInitialLoader.js
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

export function useInitialLoader() {
  onMounted(() => {
    const timer = setTimeout(() => {
      isLoading.value = false;
    }, 2500);

    return () => clearTimeout(timer);
  });

  return {
    isLoading
  };
}