<!-- src/modules/mover/components/MoverBanner.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-banner-section container-fluid p-0 position-relative overflow-hidden mb-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Banner principal e parceiros Mover Sistemas"
  >
    <!-- Container externo que garante o espaçamento elegante nas laterais -->
    <div class="banner-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER UNIFICADO (BANNER + CARROSSEL) -->
      <div class="banner-wrapper position-relative overflow-hidden shadow-lg d-flex flex-column">
        
        <!-- PARTE SUPERIOR: Imagem de Fundo e Card de Vidro (Glassmorphic) -->
        <div class="banner-top-section position-relative w-100 d-flex align-items-center">
          
          <div class="banner-bg-container position-absolute top-0 start-0 w-100 h-100">
            <img 
              :src="bannerData.bgImage" 
              :alt="bannerData.imageAlt"
              class="w-100 h-100 banner-bg-img"
            />
            <div class="banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          </div>

          <!-- Conteúdo do Banner -->
          <div class="container-fluid position-relative z-2 py-5 px-4 px-lg-5">
            <div class="row align-items-center justify-content-end w-100 m-0">
              
              <div class="col-12 col-lg-6 col-xxl-5 banner-content-col">
                <div class="glass-card p-4 p-md-5 rounded-4 shadow-lg">
                  
                  <h1 class="banner-title fw-bold mb-3">
                    <span class="d-block text-white">{{ bannerData.titleHighlight }}</span>
                    <span class="d-block text-light-green">{{ bannerData.titleRest }}</span>
                  </h1>

                  <p class="banner-desc mb-4 lh-base text-white">
                    {{ bannerData.description }}
                  </p>

                  <div class="d-flex flex-column flex-sm-row gap-3">
                    <a 
                      :href="bannerData.primaryButton.url" 
                      @click.prevent="openModal"
                      class="btn btn-mover-primary fw-semibold px-4 py-3 rounded-2 text-white text-uppercase shadow-sm flex-fill text-center"
                      :aria-label="bannerData.primaryButton.ariaLabel"
                    >
                      {{ bannerData.primaryButton.text }}
                    </a>
                      
                    <MoverDemoModal 
  :isOpen="isModalOpen" 
  :data="demoData" 
  :form="formState" 
  :close="closeModal" 
  :onSubmit="handleSubmit" 
/>
                         
                    <a 
                      :href="bannerData.secondaryButton.url" 
                      class="btn btn-mover-outline fw-semibold px-4 py-3 rounded-2 text-white text-uppercase flex-fill text-center"
                      :aria-label="bannerData.secondaryButton.ariaLabel"
                    >
                      {{ bannerData.secondaryButton.text }}
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- PARTE INFERIOR: Carrossel de Logos Contínuo (Rodapé do Banner) -->
        <!--<div class="banner-footer-carousel bg-white py-4 px-4 px-lg-5 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4">
          
           Texto à Esquerda 
          <div class="clients-text-col text-center text-lg-start flex-shrink-0">
            <h2 class="clients-title fw-bold m-0">
              <span class="d-block text-primary-dark">{{ bannerData.clientsTitle }}</span>
              <span class="d-block text-primary-dark2 subtitle-weight">{{ bannerData.clientsSubtitle }}</span>
            </h2>
          </div>

           Carrossel Infinito Estilo Marquee (Fluido e Contínuo Igual ao Vídeo)
          <div 
            class="clients-carousel-col w-100 position-relative overflow-hidden" 
            tabIndex="0" 
            aria-label="Carrossel de empresas parceiras"
          >
            <div class="marquee-track">
               Bloco 1 de Logos 
              <div class="marquee-group d-flex align-items-center">
                <div 
                  v-for="client in bannerData.slides" 
                  :key="client.id"
                  class="client-logo-item d-flex align-items-center justify-content-center flex-shrink-0 px-3"
                >
                  <img 
                    :src="client.img" 
                    :alt="client.alt"
                    class="img-fluid client-logo-img"
                    loading="lazy"
                  />
                </div>
              </div>
               Bloco 2 Duplicado para fechar o loop infinito sem saltos 
              <div class="marquee-group d-flex align-items-center" aria-hidden="true">
                <div 
                  v-for="client in bannerData.slides" 
                  :key="'dup-' + client.id"
                  class="client-logo-item d-flex align-items-center justify-content-center flex-shrink-0 px-3"
                >
                  <img 
                    :src="client.img" 
                    :alt="client.alt"
                    class="img-fluid client-logo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

             Leitores de Tela (Acessibilidade WCAG) 
            <div class="visually-hidden" aria-live="polite">
              Apresentando carrossel contínuo de empresas parceiras e clientes Mover.
            </div>
          </div>

        </div>-->

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverBanner } from '../composables/useMoverBanner'
import { useParallax } from '@/shared/composables/useParallax'

// Importa o composable e o componente diretamente da pasta shared
import { useMoverDemoModal } from '@/shared/composables/useMoverDemoModal'
import MoverDemoModal from '@/shared/components/MoverDemoModal.vue'

const { bannerData } = useMoverBanner()
const { isVisible, elementRef } = useParallax(0.05)

// Controla o modal diretamente aqui no banner usando o composable que está na shared
const { isModalOpen, demoData, formState, openModal, closeModal, handleSubmit } = useMoverDemoModal()
</script>

<style scoped>
.mover-banner-section {
  background-color: transparent !important;
  width: 100%;
}

.banner-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Moldura unificada de ponta a ponta com arredondamento geral e overflow hidden obrigatório */
.banner-wrapper {
  position: relative;
  background-color: #0b2545;
  border-radius: 28px !important;
  overflow: hidden !important;
box-shadow: 20px 10px 10px rgba(0, 0, 0, 0.1) !important;
}

.banner-top-section {
  min-height: 78vh;
}

.banner-bg-container {
  z-index: 1;
}

.banner-bg-img {
  object-fit: cover !important;
  object-position: 10% 25% !important;
}

.banner-overlay {
  background: linear-gradient(90deg, rgba(11, 37, 69, 0.1) 0%, rgba(11, 37, 69, 0.15) 100%);
}

.banner-content-col {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-banner-section.parallax-active .banner-content-col {
  opacity: 1;
  transform: translateY(0);
}

.glass-card {
  background: rgba(11, 37, 69, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
}

.banner-title {
  font-size: clamp(2rem, 3.2vw, 3rem);
  letter-spacing: -1px;
  line-height: 1.2;
}

.text-light-green {
  color: var(--mover-light-green, #8bc34a) !important;
}

.banner-desc {
  font-size: 1.05rem;
  opacity: 0.9;
}

/* Faixa de Logos Integrada no Rodapé com as bordas inferiores arredondadas */
.banner-footer-carousel {
  background-color: #ffffff !important;
  border-top: 1px solid rgba(11, 37, 69, 0.08);
  z-index: 2;
  border-bottom-left-radius: 28px !important;
  border-bottom-right-radius: 28px !important;
}

.text-primary-dark {
  color:   #8bc34a !important;    
  font-size: 3rem;

}
.text-primary-dark2 {
  color:   #0b2545 !important;    
  font-size: 3rem;

}

.clients-title {
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.subtitle-weight {
  font-weight: 600;
}

/* Container do carrossel contínuo */
.clients-carousel-col {
  min-height: 45px;
  overflow: hidden !important;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Pista de rolagem infinita */
.marquee-track {
  display: flex;
  width: max-content;
  animation: scrollMarquee 25s linear infinite;
}

/* Pausa suave ao passar o rato por cima */
.clients-carousel-col:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
}

.client-logo-item {
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.client-logo-img {
  max-height: 200px;
  width: auto;
  object-fit: contain;
  /* filter: grayscale(100%);*/
  opacity: 0.75;
  transition: all 0.3s ease;
}

.client-logo-img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

/* Animação contínua (mude de 25s para menos se quiser mais rápido, ex: 15s) */
@keyframes scrollMarquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Botões */
.btn-mover-primary {
  background-color: var(--mover-light-green, #8bc34a) !important;
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
}

.btn-mover-primary:hover,
.btn-mover-primary:focus {
  background-color: var(--mover-silver-gray, #a6b9c7) !important;
  color: var(--mover-primary-blue, #0b2545) !important;
  transform: translateY(-2px);
}

.btn-mover-outline {
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-mover-outline:hover,
.btn-mover-outline:focus {
  background-color: #ffffff;
  border-color: #ffffff;
  color: var(--mover-primary-blue, #0b2545) !important;
  transform: translateY(-2px);
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .banner-wrapper {
    border-radius: 16px !important;
  }
  .banner-footer-carousel {
    border-bottom-left-radius: 16px !important;
    border-bottom-right-radius: 16px !important;
    padding: 1.5rem !important;
    text-align: center;
  }
  .banner-top-section {
    min-height: auto;
  }
  .glass-card {
    padding: 2rem 1.5rem !important;
  }
  .client-logo-item {
    width: 140px;
  }
}
</style>