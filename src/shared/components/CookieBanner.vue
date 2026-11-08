<!-- src/shared/components/CookiePreferencesModal.vue -->
<template>
  <!-- Banner Inicial Discreto -->
  <transition name="slide-up">
    <div v-if="showBanner && !showModal" class="cookie-banner-container position-fixed bottom-0 start-0 end-0 p-3 p-md-4 z-3">
      <div class="cookie-card shadow-lg p-3 p-md-4 rounded-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 bg-white">
        <div>
          <h6 class="fw-bold mb-1 text-custom-blue">Privacidade e Transparência</h6>
          <p class="text-muted small mb-0">
            Utilizamos cookies para otimizar a performance do portal Mover Sistemas. Escolha as suas preferências ou aceite todos.
          </p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-shrink-0">
          <button @click="showModal = true" class="btn btn-outline-secondary px-3 py-2 rounded-pill small fw-semibold">Personalizar</button>
          <button @click="handleAcceptAll" class="btn btn-mover-accept px-4 py-2 rounded-pill fw-semibold text-white small">Aceitar Todos</button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Modal Granular -->
  <div v-if="showModal" class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-4 p-3">
    <div class="modal-card bg-white shadow-lg p-4 p-md-5 rounded-4 w-100">
      <h4 class="fw-bold text-custom-blue mb-2">Preferências de Cookies</h4>
      <p class="text-muted small mb-4">Selecione quais categorias de cookies autoriza na nossa plataforma:</p>

      <div class="d-flex flex-column gap-3 mb-4">
        <div class="p-3 rounded-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-bold mb-1 text-custom-blue">Essenciais</h6>
            <small class="text-muted">Obrigatórios para o funcionamento básico e segurança.</small>
          </div>
          <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked disabled /></div>
        </div>

        <div class="p-3 rounded-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-bold mb-1 text-custom-blue">Analíticos</h6>
            <small class="text-muted">Ajudam-nos a melhorar a navegação e velocidade.</small>
          </div>
          <div class="form-check form-switch"><input class="form-check-input" type="checkbox" v-model="prefs.analytics" /></div>
        </div>

        <div class="p-3 rounded-3 bg-light d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-bold mb-1 text-custom-blue">Marketing</h6>
            <small class="text-muted">Utilizados para campanhas direcionadas.</small>
          </div>
          <div class="form-check form-switch"><input class="form-check-input" type="checkbox" v-model="prefs.marketing" /></div>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button @click="savePreferences" class="btn btn-mover-accept px-4 py-2 rounded-pill fw-semibold text-white small">Salvar Preferências</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userPreferencesService } from '../services/userPreferencesService';

const showBanner = ref(false);
const showModal = ref(false);
const prefs = ref({ analytics: false, marketing: false });

onMounted(() => {
  const current = userPreferencesService.getCookiePreferences();
  if (!current.hasResponded) {
    setTimeout(() => { showBanner.value = true; }, 1000);
  } else {
    prefs.value.analytics = current.analytics;
    prefs.value.marketing = current.marketing;
  }
});

const handleAcceptAll = () => {
  userPreferencesService.acceptAll();
  showBanner.value = false;
};

const savePreferences = () => {
  userPreferencesService.saveCookiePreferences(prefs.value);
  showModal.value = false;
  showBanner.value = false;
};
</script>

<style scoped>
.cookie-banner-container { pointer-events: none; }
.cookie-card { pointer-events: auto; max-width: 900px; margin: 0 auto; border: 1px solid rgba(11, 37, 69, 0.1); }
.modal-backdrop-custom { background-color: rgba(11, 37, 69, 0.6); backdrop-filter: blur(4px); }
.modal-card { max-width: 550px; }
.text-custom-blue { color: #0b2545 !important; }
.btn-mover-accept { background-color: #0b2545; border: none; }
.btn-mover-accept:hover { background-color: #8bc34a; color: #0b2545 !important; }
.form-check-input:checked { background-color: #8bc34a; border-color: #8bc34a; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(40px); opacity: 0; }
</style>