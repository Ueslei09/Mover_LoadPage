// src/login/composables/useLogo.js
import { ref } from 'vue';
import { logoService } from '../services/logoService';

export function useLogo() {
  const logo = ref(logoService.getLogoData());

  return {
    logo
  };
}