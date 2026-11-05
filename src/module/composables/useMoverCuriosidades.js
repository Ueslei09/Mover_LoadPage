// src/modules/mpro/composables/useMoverCuriosidades.js
import { ref, onMounted } from 'vue';
import { moverCuriosidadesService } from '../services/moverCuriosidadesService';

export function useMoverCuriosidades() {
  const curiosidadesData = ref(null);
  const loading = ref(true);
  const isPlaying = ref(false);
  const videoRef = ref(null);

  const fetchCuriosidades = async () => {
    try {
      loading.value = true;
      curiosidadesData.value = await moverCuriosidadesService.getCuriosidadesData();
    } catch (error) {
      console.error("Erro ao carregar dados de curiosidades:", error);
    } finally {
      loading.value = false;
    }
  };

  const triggerPlay = () => {
    if (videoRef.value) {
      videoRef.value.play();
      isPlaying.value = true;
    }
  };

  const handleCtaClick = () => {
    window.open('https://wa.me/seunumero', '_blank');
  };

  onMounted(() => {
    fetchCuriosidades();
  });

  return {
    curiosidadesData,
    loading,
    isPlaying,
    videoRef,
    triggerPlay,
    handleCtaClick
  };
}