<!-- src/modules/mover/components/MoverProvaSocial.vue -->
<template>
  <section 
    class="mover-provasocial-section container-fluid p-0 position-relative overflow-hidden my-5"
    role="region"
    aria-label="Depoimentos e Prova Social Mover Sistemas"
  >
    <!-- Container externo padronizado idêntico aos banners anteriores (max-width: 1750px) -->
    <div class="provasocial-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM BACKGROUND TRANSPARENTE E SOMBRAS À DIREITA E BOTTOM -->
      <div class="provasocial-wrapper position-relative w-100 d-flex align-items-center">
        
        <!-- CARROSSEL COM TRANSIÇÃO SUAVE (4 SLIDES) -->
        <div class="container-fluid position-relative z-2 py-5 px-4 px-lg-5">
          <div class="row align-items-center justify-content-between w-100 m-0 min-vh-50">
            
            <!-- COLUNA ESQUERDA: IMAGEM ABSOLUTA POSICIONÁVEL -->
            <div class="col-12 col-lg-6 position-relative image-column">
              <TransitionGroup name="fade-slide" tag="div" class="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                <div 
                  v-for="(slide, index) in slides" 
                  :key="slide.id" 
                  v-show="currentIndex === index"
                  class="absolute-img-wrapper w-100 h-100"
                >
                  <img 
                    :src="slide.image" 
                    :alt="slide.imageAlt" 
                    class="provasocial-img img-fluid"
                  />
                </div>
              </TransitionGroup>
            </div>

            <!-- COLUNA DIREITA: CARD COM FUNDO TRANSPARENTE E TEXTOS CORRIGIDOS -->
            <div class="col-12 col-lg-6 content-column">
              <div class="transparent-card p-4 p-md-5 rounded-4 position-relative">
                
                <!-- Container com altura reservada para evitar saltos verticais -->
                <div class="text-slider-container position-relative">
                  <div 
                    v-for="(slide, index) in slides" 
                    :key="slide.id" 
                    v-show="currentIndex === index"
                    class="slide-text-content position-absolute top-0 start-0 w-100 fade-in-out"
                  >
                    <!-- Descrição/Citação em Azul Escuro (#0b2545) -->
                    <p class="provasocial-quote fw-semibold mb-4 lh-base text-custom-dark">
                      {{ slide.quote }}
                    </p>

                    <!-- Nome do cliente e empresa em Verde (#8bc34a) -->
                    <div class="provasocial-author-box">
                      <h4 class="author-name fw-bold mb-1 text-light-green">{{ slide.author }}</h4>
                      <p class="author-company m-0 text-light-green opacity-75">{{ slide.company }}</p>
                    </div>
                  </div>
                </div>

                <!-- INDICADORES / PAGINAÇÃO DOS SLIDES -->
                <div class="slide-indicators d-flex gap-2 mt-4">
                  <button 
                    v-for="(slide, index) in slides" 
                    :key="slide.id"
                    @click="setSlide(index)"
                    class="indicator-dot border-0 rounded-pill"
                    :class="{ 'active': currentIndex === index }"
                    :aria-label="'Ir para slide ' + (index + 1)"
                  ></button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverProvaSocial } from '../composables/useMoverProvaSocial'

const { slides, currentIndex, setSlide } = useMoverProvaSocial()
</script>

<style scoped>
.mover-provasocial-section {
  width: 100%;
  background-color: transparent !important;
}

.provasocial-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Wrapper transparente com sombras acentuadas à direita e no bottom */
.provasocial-wrapper {
  position: relative;
  background-color: transparent !important;
  border-radius: 28px !important;
  box-shadow: 25px 25px 50px rgba(0, 0, 0, 0.08) !important;
  min-height: 550px;
  overflow: visible !important;
}

.min-vh-50 {
  min-height: 480px;
}

/* Coluna de Imagem Absoluta com Z-Index controlado */
.image-column {
  min-height: 450px;
  z-index: 1;
}

.absolute-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.provasocial-img {
  max-height: 500%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(15px 15px 25px rgba(0, 0, 0, 0.15));
}

/* Card com fundo transparente */
.transparent-card {
  background: transparent !important;
  border: none;
}

/* Altura mínima fixa para estabilizar o container do texto e eliminar o salto */
.text-slider-container {
  min-height: 220px;
  position: relative;
}

/* Descrição em azul escuro (#0b2545) */
.text-custom-dark {
  color: #0b2545 !important;
  font-size: clamp(1.25rem, 1.8vw, 1.65rem);
  letter-spacing: -0.5px;
}

/* Nome e empresa em verde padrão (#8bc34a) */
.text-light-green {
  color: #1a2774 !important;
}

.author-name {
  font-size: 1.15rem;
}

.author-company {
  font-size: 0.95rem;
}

/* Indicadores de Slide */
.slide-indicators {
  position: relative;
  z-index: 10;
  margin-top: 180px !important; /* Mantém os indicadores alinhados logo abaixo da área de texto fixa */
}

.indicator-dot {
  width: 12px;
  height: 6px;
  background-color: rgba(11, 37, 69, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.indicator-dot.active {
  width: 30px;
  background-color: #8bc34a;
}

/* Transição suave em fade sem saltos bruscos */
.fade-in-out {
  animation: smoothFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes smoothFade {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efeito slide da imagem mantido */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .provasocial-wrapper {
    min-height: auto;
  }
  .image-column {
    min-height: 350px;
    margin-bottom: 2rem;
  }
  .provasocial-img {
    max-height: 320px;
  }
  .text-slider-container {
    min-height: 250px;
  }
  .slide-indicators {
    margin-top: 200px !important;
  }
}
</style>