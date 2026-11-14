<!-- src/modules/mover/components/MoverSectorsCarousel.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-sectors-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Setores de Atuação Mover"
  >
    <div class="sectors-outer-container px-3 px-md-4 py-4">
      
      <!-- TÍTULO SOLTO (SEM FUNDO) -->
      <div class="text-center text-md-start pt-3 pb-4 px-3 px-md-5 z-2 position-relative">
        <h2 class="sectors-section-title fw-bold text-dark-blue mb-2">
          <span>{{ sectorsData.titlePrefix }}</span>
          <span class="text-highlight-green">{{ sectorsData.titleHighlight }}</span>
          <span>{{ sectorsData.titleSuffix }}</span>
        </h2>
        <p class="sectors-section-subtitle text-muted-custom mb-0">
          {{ sectorsData.subtitle }}
        </p>
      </div>

      <!-- CONTAINER DO CARROSSEL (COM O AZUL PADRÃO DO PROJETO) -->
      <div class="sectors-card-wrapper position-relative overflow-hidden d-flex flex-column p-4 p-md-5">
        
        <!-- PISTA DO CARROSSEL COM SUPORTE A SWIPE TÁTIL -->
        <div 
          class="sectors-carousel-viewport overflow-hidden position-relative w-100"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            class="sectors-carousel-track d-flex transition-transform"
            :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }"
          >
            <div 
              v-for="sector in sectorsData.sectors" 
              :key="sector.id"
              class="sector-slide-item flex-shrink-0 px-2"
            >
              <div 
                class="sector-card position-relative overflow-hidden rounded-4 shadow-lg h-100"
                :class="{ 'is-expanded': expandedCardId === sector.id }"
              >
                <!-- CONTEÚDO NORMAL (CARD VERDE COM ÍCONE) -->
                <div class="card-content-front p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 class="fw-bold text-dark-blue mb-3 d-flex align-items-center gap-2">
                      <i :class="sector.icon" class="fs-4"></i>
                      <span>{{ sector.title }}</span>
                    </h3>
                    <p class="text-dark-blue-50 mb-0">{{ sector.description }}</p>
                  </div>

                  <!-- Botão de Ação (+) na Cor Azul do Projeto -->
                  <button 
                    @click.stop="toggleExpand(sector.id)"
                    class="expand-btn position-absolute bottom-0 end-0 border-0 d-flex align-items-center justify-content-center shadow"
                    :aria-label="`Expandir detalhes de ${sector.title}`"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>

                <!-- CONTEÚDO EXPANDIDO (IMAGEM COM OVERLAY AZUL TRANSPARENTE) -->
                <div 
                  class="card-content-back position-absolute top-0 start-0 w-100 h-100"
                  :class="{ 'show': expandedCardId === sector.id }"
                >
                  <img :src="sector.image" :alt="sector.imageAlt" class="w-100 h-100 object-fit-cover" />
                  
                  <div class="card-overlay-tint position-absolute top-0 start-0 w-100 h-100"></div>

                  <div class="image-footer-caption position-absolute bottom-0 start-0 w-100 p-3 text-white z-2">
                    <p class="mb-0 small fw-medium">{{ sector.footerCaption }}</p>
                  </div>

                  <button 
                    @click.stop="toggleExpand(sector.id)"
                    class="close-btn position-absolute top-0 end-0 m-3 border-0 d-flex align-items-center justify-content-center shadow-sm rounded-circle z-2"
                    aria-label="Fechar imagem"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Controles de Navegação (Setas e Dots) -->
        <div class="sectors-nav-controls d-flex align-items-center justify-content-center gap-3 mt-5">
          <button @click="prevSlide" class="nav-arrow-btn border-0 d-flex align-items-center justify-content-center" aria-label="Slide anterior">
            <i class="bi bi-chevron-left"></i>
          </button>

          <div class="d-flex gap-2">
            <button 
              v-for="(_, index) in maxIndex + 1" 
              :key="'dot-' + index"
              @click="selectSlide(index)"
              class="nav-dot-btn border-0"
              :class="{ 'active': currentIndex === index }"
              aria-label="Ir para grupo de slides"
            ></button>
          </div>

          <button @click="nextSlide" class="nav-arrow-btn border-0 d-flex align-items-center justify-content-center" aria-label="Próximo slide">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverSectors } from '../composables/useMoverSectors'
import { useParallax } from '@/shared/composables/useParallax'

const { 
  sectorsData, 
  currentIndex, 
  expandedCardId, 
  itemsPerView,
  maxIndex,
  nextSlide, 
  prevSlide, 
  selectSlide, 
  toggleExpand,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd
} = useMoverSectors()

const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mover-sectors-section {
  background-color: transparent !important;
  width: 100%;
}

.sectors-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.sectors-card-wrapper {
  background-color: #0b2545 !important;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 25px 20px 40px rgba(11, 37, 69, 0.25) !important;
  border: 1px solid rgba(139, 195, 74, 0.15);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-sectors-section.parallax-active .sectors-card-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.sectors-section-title {
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  letter-spacing: -1px;
  color: #0b2545;
}

.text-dark-blue {
  color: #0b2545 !important;
}

.text-dark-blue-50 {
  color: rgba(11, 37, 69, 0.75) !important;
}

.text-highlight-green {
  color: #8bc34a !important;
}

.sectors-section-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.sectors-carousel-viewport {
  width: 100%;
  touch-action: pan-y; /* Permite scroll vertical da página mas captura o gesto horizontal no carrossel */
}

.sectors-carousel-track {
  display: flex;
  transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.sector-slide-item {
  flex: 0 0 33.3333%;
}

@media (max-width: 992px) {
  .sector-slide-item {
    flex: 0 0 50%;
  }
}

@media (max-width: 768px) {
  .sector-slide-item {
    flex: 0 0 100%;
  }
  .sectors-card-wrapper {
    border-radius: 16px !important;
  }
}

.sector-card {
  background-color: #8bc34a !important; 
  min-height: 280px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.card-content-front {
  position: relative;
  min-height: 280px;
}

.expand-btn {
  width: 48px;
  height: 48px;
  background-color: #0b2545 !important;
  color: #8bc34a !important;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 16px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.expand-btn:hover {
  background-color: #ffffff !important;
  color: #0b2545 !important;
  transform: scale(1.05);
}

.card-content-back {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  z-index: 5;
}

.card-content-back.show {
  opacity: 1;
  visibility: visible;
}

.card-overlay-tint {
  background-color: rgba(11, 37, 69, 0.45);
  pointer-events: none;
}

.image-footer-caption {
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
}

.close-btn {
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.nav-arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.nav-arrow-btn:hover {
  background-color: #8bc34a;
  color: #0b2545;
}

.nav-dot-btn {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-dot-btn.active {
  background-color: #8bc34a;
  width: 28px;
  border-radius: 5px;
}
</style>