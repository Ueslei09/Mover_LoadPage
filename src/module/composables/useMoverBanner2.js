// src/modules/mover/composables/useMoverBanner2.js
import { ref, onMounted } from 'vue';
import { moverBanner2Service } from '../services/moverBanner2Service';

export function useMoverBanner2() {
  const bannerData = ref({
    bgType: 'image',
    bgUrl: '',
    videoUrl: '',
    imageAlt: '',
    titleWhite: '',
    titleGreen: '',
    description: '',
    primaryButton: {},
    secondaryButton: {}
  });

  onMounted(() => {
    bannerData.value = moverBanner2Service.getBannerData();
  });

  return {
    bannerData
  };
}