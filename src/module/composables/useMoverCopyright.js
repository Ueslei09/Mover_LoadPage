// src/modules/mover/composables/useMoverCopyright.js
import { ref, onMounted } from 'vue';
import { moverCopyrightService } from '../services/moverCopyrightService';

export function useMoverCopyright() {
  const copyrightData = ref({
    logoSrc: '',
    logoAlt: '',
    copyrightText: ''
  });

  onMounted(() => {
    copyrightData.value = moverCopyrightService.getCopyrightData();
  });

  return {
    copyrightData
  };
}