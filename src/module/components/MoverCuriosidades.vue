<!-- src/modules/mpro/components/MoverCuriosidades.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-curiosidades-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Secção informativa sobre a Reforma Tributária"
  >
    <!-- Container externo com espaçamento lateral elegante -->
    <div class="banner-outer-container px-3 px-md-4 py-3">
      
      <!-- Wrapper principal com fundo, cantos arredondados e sombra à direita -->
      <div class="curiosidades-wrapper position-relative overflow-hidden d-flex flex-column align-items-center py-5">
        
        <div class="container px-3 px-md-5 z-2 position-relative w-100 text-center">
          
          <!-- Tag Superior -->
          <span class="badge-tag text-uppercase fw-bold mb-2 d-inline-block">
            {{ curiosidadesData?.tag }}
          </span>

          <!-- Título Principal com Cores Personalizadas -->
          <h2 class="curiosidades-title fw-bold mb-5">
            <span class="d-block">{{ curiosidadesData?.titlePart1 }}</span>
            <span class="d-block text-highlight">{{ curiosidadesData?.titleHighlight }}</span>
          </h2>

          <hr class="section-divider mx-auto my-4" />

          <!-- Container da Mídia (Vídeo Nativo ou Imagem) -->
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
              <div class="media-container-card shadow-sm rounded-4 overflow-hidden position-relative">
                
                <template v-if="curiosidadesData?.mediaType === 'video'">
                  <div class="video-responsive-wrapper w-100 h-100 position-relative">
                    <video 
                      ref="videoRef"
                      :src="curiosidadesData.videoUrl"
                      class="responsive-video"
                      controls
                      playsinline
                      @play="isPlaying = true"
                      @pause="isPlaying = false"
                    ></video>

                    <!-- BOTÃO DE PLAY ELETROMAGNÉTICO (Some perfeitamente ao clicar) -->
                    <div 
                      v-if="!isPlaying" 
                      class="custom-play-overlay d-flex align-items-center justify-content-center"
                      @click="triggerPlay"
                    >
                      <div class="electromagnetic-waves-btn">
                        <span class="wave-ring ring-1"></span>
                        <span class="wave-ring ring-2"></span>
                        <div class="play-icon-core d-flex align-items-center justify-content-center">
                          <i class="bi bi-play-fill fs-3 text-white"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </template>

                <template v-else>
                  <img 
                    :src="curiosidadesData?.fallbackImage" 
                    :alt="curiosidadesData?.mediaAlt"
                    class="img-fluid w-100 h-auto object-fit-cover"
                  />
                </template>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverCuriosidades } from '../composables/useMoverCuriosidades';
import { useParallax } from '@/shared/composables/useParallax';

const { 
  curiosidadesData, 
  isPlaying, 
  videoRef, 
  triggerPlay 
} = useMoverCuriosidades();

const { isVisible, elementRef } = useParallax(0.05);
</script>

<style scoped>
.mover-curiosidades-section {
  background-color: transparent !important;
  width: 100%;
  top: -80px !important;
}

.banner-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.curiosidades-wrapper {
  position: relative;
  background-color: #e8e9eb;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 20px 10px 40px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(11, 37, 69, 0.05);
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-curiosidades-section.parallax-active .curiosidades-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.badge-tag {
  color: #0b2545 !important;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.curiosidades-title {
  color: #0b2545 !important;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.5px;
}

.text-highlight {
  color: #8bc34a !important;
}

.section-divider {
  width: 60%; /* Ou width: 100% se quiser que ocupe de ponta a ponta */
  height: 2px !important;
  background-color: #0b2545 !important;
  border: none !important;
  opacity: 1 !important;
  margin: 1.5rem auto !important;
  margin-bottom: 3rem !important;
 
}

.media-container-card {
  background-color: #0b2545;
  border: 1px solid rgba(11, 37, 69, 0.1);
  box-shadow: 0 15px 35px rgba(11, 37, 69, 0.12) !important;
  width: 100%;
  height: 500px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.video-responsive-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.responsive-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}

/* OVERLAY DO BOTÃO COM TRANSIÇÃO DE DESAPARECIMENTO */
.custom-play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 37, 69, 0.35);
  cursor: pointer;
  z-index: 5;
  transition: opacity 0.4s ease;
}

.electromagnetic-waves-btn {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon-core {
  width: 64px;
  height: 64px;
  background-color: #8bc34a;
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(139, 195, 74, 0.6);
  z-index: 2;
  transition: transform 0.3s ease;
}

.electromagnetic-waves-btn:hover .play-icon-core {
  transform: scale(1.08);
}

.wave-ring {
  position: absolute;
  border: 1.5px solid rgba(139, 195, 74, 0.8);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: electromagneticPulse 2.5s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ring-1 {
  width: 90px;
  height: 90px;
  animation-delay: 0s;
}

.ring-2 {
  width: 120px;
  height: 120px;
  animation-delay: 0.8s;
  opacity: 0.6;
}

@keyframes electromagneticPulse {
  0% {
    width: 64px;
    height: 64px;
    opacity: 1;
  }
  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}

@media (max-width: 992px) {
  .curiosidades-wrapper {
    border-radius: 16px !important;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .media-container-card {
    height: 280px !important;
  }
}
</style>