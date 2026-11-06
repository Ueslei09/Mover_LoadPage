<!-- src/modules/mover/components/MoverCopyright.vue -->
<template>
  <section 
    class="mover-copyright-section container-fluid p-0 position-relative my-4"
    role="contentinfo"
    aria-label="Rodapé e Direitos Autorais Mover Sistemas"
  >
    <!-- Container externo padronizado (max-width: 1750px) -->
    <div class="copyright-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM FUNDO TRANSPARENTE -->
      <div class="copyright-wrapper position-relative w-100 py-4 px-4 px-lg-5 d-flex flex-column align-items-end text-end">
        
        <!-- LOGO À DIREITA -->
        <div class="mb-2">
          <img 
            :src="copyrightData.logoSrc" 
            :alt="copyrightData.logoAlt" 
            class="copyright-logo object-fit-contain"
          />
        </div>

        <!-- COPYRIGHT ABAIXO DA LOGO EM COR AZUL (#0b2545) -->
        <div>
          <p class="copyright-text text-custom-dark m-0 small fw-medium">
            {{ copyrightData.copyrightText }}
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverCopyright } from '../composables/useMoverCopyright'

const { copyrightData } = useMoverCopyright()
</script>

<style scoped>
.mover-copyright-section {
  width: 100%;
  background-color: transparent !important;
  top:-50px !important;
}

.copyright-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Wrapper transparente e alinhado à direita */
.copyright-wrapper {
  background-color: transparent !important;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.copyright-logo {
  height: 50px;
  width: auto;
}

/* Texto de copyright em azul escuro (#0b2545) */
.text-custom-dark {
  color: #0b2545 !important;
  opacity: 0.85;
}

.copyright-text {
  font-size: 0.85rem;
  letter-spacing: 0.3px;
}

/* Responsividade Mobile (centraliza ou mantém alinhado se preferir) */
@media (max-width: 768px) {
  .copyright-wrapper {
    align-items: center !important;
    text-align: center !important;
  }
}
</style>