<!-- src/modules/mpro/components/MproHero.vue -->
<template>
  <section 
    ref="elementRef"
    class="mpro-hero-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Apresentação Mpro Sistemas"
  >
    <div class="banner-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER ARREDONDADO COM FUNDO AZUL -->
      <div class="mpro-wrapper position-relative overflow-hidden d-flex flex-column">
        
        <div class="container-fluid px-3 px-md-5 z-2 position-relative w-100 py-5">
          <div class="row align-items-center justify-content-between w-100 m-0">
            
            <!-- COLUNA DE TEXTOS E CTA (Lado Esquerdo - 50%) -->
            <div class="col-12 col-lg-6 hero-content-box text-center text-lg-start py-5 position-relative z-3">
              
              <!-- SUBTÍTULO PERSONALIZADO -->
              <h1 class="hero-subtitle fw-bold text-white mb-4">
                <span>{{ mproData.subTitlePart1 }}</span>
                <span class="text-highlight">{{ mproData.highlightWord }}</span>
                <span>{{ mproData.subTitlePart2 }}</span>
              </h1>

              <!-- DESCRIÇÃO -->
              <p class="hero-desc text-white mb-4 lh-base">
                {{ mproData.description }}
              </p>

              <!-- BOTÃO COM COR DO PROJETO E HOVER -->
              <div class="cta-button-wrapper">
                <a
                  href="#demonstracao"
                  @click="handleActionClick"
                  type="button"
                  class="btn mpro-cta-btn fw-semibold px-5 py-3 rounded-pill text-uppercase shadow-sm"
                  :aria-label="mproData.buttonAriaLabel"
                >
                  {{ mproData.buttonText }}
                </a>
              </div>

            </div>

            <!-- COLUNA DO CARROSSEL DE VÍDEOS (Lado Direito - 50%) -->
            <div class="col-12 col-lg-6 hero-image-col text-center position-relative px-0">
              <div class="carousel-container-wrapper position-relative w-100">
                
                <!-- Degradês laterais (Fade esquerdo e direito) -->
                <div class="gradient-overlay-left"></div>
                <div class="gradient-overlay-right"></div>

                <!-- Slides do Carrossel -->
                <div class="carousel-slides-track">
                  <div 
                    v-for="(slide, index) in mproData.slides" 
                    :key="index"
                    class="carousel-slide"
                    :class="{ active: currentSlide === index }"
                  >
                    <!-- Se for Vídeo -->
                    <video 
                      v-if="slide.type === 'video'"
                     :ref="(el) => { if (currentSlide === index) setVideoRef(el) }"
                        muted
                        loop
                        controls
                      playsinline 
                      class="slide-media"
                    >
                      <source :src="slide.src" type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>

                    <!-- Se for Imagem (Fallback) -->
                    <img 
                      v-else 
                      :src="slide.src" 
                      :alt="slide.alt"
                      class="slide-media img-fluid"
                    />
                  </div>
                </div>

                <!-- Indicadores (Dots) do carrossel -->
                <div class="carousel-indicators-custom">
                  <button 
                    v-for="(_, index) in mproData.slides" 
                    :key="index"
                    @click="currentSlide = index"
                    :class="{ active: currentSlide === index }"
                    :aria-label="`Slide ${index + 1}`"
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
import { useMpro } from '../composables/useMoverAbout.js'
import { useParallax } from '@/shared/composables/useParallax'


const { mproData, currentSlide, setVideoRef, handleActionClick } = useMpro()
const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mpro-hero-section {
  background-color: transparent !important;
  top: -30px !important;
  width: 100%;
}

.banner-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.mpro-wrapper {
  position: relative;
  background-color: #0b2545;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 20px 10px 10px rgba(0, 0, 0, 0.22) !important;
}

/* Efeito Parallax de entrada */
.hero-content-box,
.hero-image-col {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mpro-hero-section.parallax-active .hero-content-box,
.mpro-hero-section.parallax-active .hero-image-col {
  opacity: 1;
  transform: translateY(0);
}

/* Força rigorosamente 50% / 50% no Desktop */
.hero-content-box {
  flex: 0 0 50% !important;
  max-width: 50% !important;
}

.hero-image-col {
  flex: 0 0 50% !important;
  max-width: 50% !important;
}

.hero-subtitle {
  font-size: clamp(2rem, 3.2vw, 3.2rem) !important;
  white-space: normal !important;
}

.hero-subtitle span {
  display: inline !important;
}

.text-highlight {
  color: #8bc34a !important;
}

.hero-desc {
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  max-width: 540px;
  color: rgba(255, 255, 255, 0.9);
}

.cta-button-wrapper {
  position: relative;
  z-index: 10;
}

.mpro-cta-btn {
  background-color: #8bc34a !important;
  color: #ffffff !important;
  border: none;
  transition: all 0.3s ease-in-out;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  position: relative;
  z-index: 11;
}

.mpro-cta-btn:hover,
.mpro-cta-btn:focus {
  background-color: #a6b9c7 !important;
  color: #0f0f0f !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 195, 74, 0.4);
}

/* --- ESTILOS DO CARROSSEL & DEGRADÊS --- */
.carousel-container-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-slides-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide.active {
  opacity: 1;
  visibility: visible;
}

.slide-media {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Degradê (Fade) do lado esquerdo e direito */
.gradient-overlay-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(to right, #0b2545, transparent);
  z-index: 5;
  pointer-events: none;
}

.gradient-overlay-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(to left, #0b2545, transparent);
  z-index: 5;
  pointer-events: none;
}

/* Indicadores personalizados do carrossel */
.carousel-indicators-custom {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 6;
}

.carousel-indicators-custom button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-indicators-custom button.active {
  background-color: #8bc34a;
  width: 24px;
  border-radius: 5px;
}

/* --- AJUSTES MOBILE / TABLET --- */
@media (max-width: 992px) {
  .mpro-wrapper {
    border-radius: 16px !important;
  }
  
  .hero-content-box,
  .hero-image-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  .hero-subtitle {
    font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
  }

  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .carousel-container-wrapper {
    min-height: 280px;
    margin-top: 1.5rem;
    top: -40px !important;
  }
}
</style>