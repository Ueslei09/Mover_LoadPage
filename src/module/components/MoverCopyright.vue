<!-- src/modules/mover/components/MoverCopyright.vue -->
<template>
  <section 
    class="mover-copyright-section container-fluid p-0 position-relative my-4"
    role="contentinfo"
    aria-label="Rodapé e Direitos Autorais Mover Sistemas"
  >
    <!-- Container externo padronizado (max-width: 1750px) -->
    <div class="copyright-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM FLEX PARA DIVIDIR ESQUERDA (REDES SOCIAIS) E DIREITA (LOGO/TEXTO) -->
      <div class="copyright-wrapper position-relative w-100 py-4 px-4 px-lg-5 d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        <!-- REDES SOCIAIS À ESQUERDA -->
        <div class="social-links-container d-flex align-items-center gap-3 mb-3 mb-md-0">
          <a 
            v-for="(social, index) in copyrightData.socialLinks" 
            :key="index"
            :href="social.url" 
            :aria-label="social.ariaLabel"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon-link text-custom-dark fs-5"
          >
            <i :class="social.icon"></i>
          </a>
        </div>

        <!-- BLOCO DA DIREITA: LOGO E COPYRIGHT -->
        <div class="d-flex flex-column align-items-center align-items-md-end text-center text-md-end">
          <div class="mb-2">
            <img 
              :src="copyrightData.logoSrc" 
              :alt="copyrightData.logoAlt" 
              class="copyright-logo object-fit-contain"
            />
          </div>
          <div>
            <p class="copyright-text text-custom-dark m-0 small fw-medium">
              {{ copyrightData.copyrightText }}
            </p>
          </div>
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
  top: -50px !important;
}

.copyright-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.copyright-wrapper {
  background-color: transparent !important;
}

.copyright-logo {
  height: 50px;
  width: auto;
}

/* Cor base dos ícones e textos */
.text-custom-dark {
  color: #0b2545 !important;
  opacity: 0.85;
  transition: color 0.3s ease, transform 0.2s ease;
}

/* Efeito Hover Verde (#8bc34a) nas Redes Sociais */
.social-icon-link:hover {
  color: #8bc34a !important;
  transform: translateY(-2px);
  opacity: 1;
}

.copyright-text {
  font-size: 0.85rem;
  letter-spacing: 0.3px;
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .copyright-wrapper {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 1.5rem;
  }
}
</style>