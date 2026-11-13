<!-- src/shared/components/MoverFooterCTA.vue -->
<template>
  <div 
    ref="elementRef"
    class="mover-footer-floating-wrapper position-fixed bottom-0 start-0 w-100 z-3"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Barra flutuante de atendimento Mover"
  >
    <div class="container-fluid px-0">
      <div class="footer-card py-2 px-2 px-md-4 shadow-lg d-flex align-items-center justify-content-center w-100 position-relative">
        
        <!-- LADO ESQUERDO: Logo ou Ícone (Apenas em telas maiores) -->
        <div class="footer-left position-absolute start-0 ms-3 d-none d-lg-flex align-items-center">
          <div class="logo-badge d-flex align-items-center justify-content-center rounded-circle shadow-sm">
            <template v-if="footerData.logoType === 'imagem'">
              <img :src="footerData.logoIcon" :alt="footerData.logoText" class="img-fluid">
            </template>
            <template v-else>
              <span class="fw-bold small">{{ footerData.logoText }}</span>
            </template>
          </div>
        </div>

        <!-- CENTRO: Botões de Ação Ajustados para Mobile -->
        <div class="footer-actions d-flex flex-row align-items-center justify-content-center gap-2 gap-md-3 w-100">
          
          <!-- Botão Falar com Especialista (Abre o seu MoverDemoModal) -->
          <button 
            @click="openModal"
            class="btn btn-especialista fw-semibold py-2 px-2 px-md-4 rounded-2 text-uppercase shadow-sm text-center text-nowrap border-0"
            :aria-label="footerData.primaryCta.ariaLabel"
          >
            {{ footerData.primaryCta.text }}
          </button>

          <!-- Botão WhatsApp com Animação no Ícone -->
          <a 
            :href="footerData.whatsappCta.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-whatsapp fw-semibold py-2 px-2 px-md-4 rounded-2 text-white text-uppercase shadow-sm text-center d-flex align-items-center justify-content-center gap-1 gap-md-2 text-nowrap"
            :aria-label="footerData.whatsappCta.ariaLabel"
          >
            <i :class="footerData.whatsappCta.icon" class="fs-6 fs-md-5 whatsapp-animated-icon"></i>
            <span>{{ footerData.whatsappCta.text }}</span>
          </a>

        </div>

      </div>
    </div>
  </div>

  <!-- SEU MODAL DE DEMONSTRAÇÃO / ESPECIALISTA -->
  <MoverDemoModal 
    :isOpen="isModalOpen"
    :data="demoData"
    :form="formState"
    :close="closeModal"
    :onSubmit="handleSubmit"
  />
</template>

<script setup>
import { useMoverFooter } from '@/shared/composables/useMoverFooter'
import { useMoverDemoModal } from '@/shared/composables/useMoverDemoModal'
import { useParallax } from '@/shared/composables/useParallax'
import MoverDemoModal from '@/shared/components/MoverDemoModal.vue'

// Dados e lógica do Footer
const { footerData } = useMoverFooter()
const { isVisible, elementRef } = useParallax(0.01)

// Lógica e estado do seu Modal de Demonstração / Especialista
const { 
  isModalOpen, 
  demoData, 
  formState, 
  openModal, 
  closeModal, 
  handleSubmit 
} = useMoverDemoModal()
</script>

<style scoped>
.mover-footer-floating-wrapper {
  position: fixed !important;
  bottom: 0 !important;
  left: 0;
  width: 100vw;
  pointer-events: none;
  z-index: 1050;
}

.footer-card {
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(11, 37, 69, 0.12);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1) !important;
  width: 100%;
  margin: 0;
  border-radius: 0 !important;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-footer-floating-wrapper.parallax-active .footer-card {
  opacity: 1;
  transform: translateY(0);
}

.logo-badge {
  width: 100px;
  height: 50px !important;
  background-color: rgba(139, 195, 74, 0.15);
  color: var(--mover-primary-blue, #0b2545);
}

.btn-especialista,
.btn-whatsapp {
  font-size: 0.85rem;
  letter-spacing: 0.2px;
}

.btn-especialista {
  background-color: rgba(139, 195, 74, 0.2);
  color: var(--mover-primary-blue, #0b2545) !important;
  border: 1px solid var(--mover-light-green, #8bc34a);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-especialista:hover,
.btn-especialista:focus {
  background-color: var(--mover-light-green, #8bc34a) !important;
  color: #ffffff !important;
  transform: translateY(-2px);
}

.btn-whatsapp {
  background-color: #25d366 !important;
  border: none;
  color: #ffffff !important;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.btn-whatsapp:hover,
.btn-whatsapp:focus {
  background-color: var(--mover-primary-blue, #0b2545) !important;
  color: var(--mover-light-green, #8bc34a) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(37, 211, 102, 0.3) !important;
}

@keyframes whatsappPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.whatsapp-animated-icon {
  display: inline-block;
  animation: whatsappPulse 1.8s infinite ease-in-out;
}

@media (max-width: 576px) {
  .footer-card {
    padding: 0.4rem !important;
  }
  
  .footer-actions {
    gap: 0.35rem !important;
  }

  .btn-especialista,
  .btn-whatsapp {
    font-size: 0.64rem !important;
    padding: 0.45rem 0.3rem !important;
    flex: 1;
    letter-spacing: -0.2px;
  }
}
</style>