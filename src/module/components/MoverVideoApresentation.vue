<!-- src/modules/mover/components/MoverVideoApresentation.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-video-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Apresentação em Vídeo Mover Sistemas"
  >
    <div class="video-outer-container px-3 px-md-4 py-4">
      <div class="video-card-wrapper position-relative overflow-hidden d-flex flex-column">
        
        <div class="text-center pt-5 pb-4 px-3 px-md-5 z-2 position-relative">
          <h2 class="video-section-title fw-bold text-white mb-2">
            <span>{{ videoData.titlePrefix }}</span>
            <span class="text-highlight-green">{{ videoData.titleHighlight }}</span>
          </h2>
          <p class="video-section-subtitle text-white-50 mx-auto mb-0">
            {{ videoData.subtitle }}
          </p>
        </div>

        <div class="video-container-fluid position-relative w-100 flex-grow-1">
          <video 
            ref="videoRef"
            :src="videoData.videoUrl"
            :poster="videoData.posterUrl"
            class="presentation-video w-100 h-100"
            controls
            playsinline
            webkit-playsinline
            preload="metadata"
            @play="handlePlay"
            @pause="handlePause"
            @ended="handleEnded"
            @click="handleVideoClick"
          ></video>

          <!-- OVERLAY DE INTERAÇÃO -->
          <div 
            class="video-interactive-overlay"
            :class="{ 'overlay-hidden': !showOverlay }"
            @click="handleOverlayClick"
          >
            <button 
              @click.stop="toggleVideoPlay" 
              class="stylish-play-btn shadow-lg border-0"
              :aria-label="videoData.buttonAriaLabel"
            >
              <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { useMoverVideo } from '../composables/useMoverVideo'
import { useParallax } from '@/shared/composables/useParallax'

const { 
  videoData, 
  videoRef, 
  isPlaying, 
  showOverlay, 
  toggleVideoPlay, 
  handlePlay, 
  handlePause, 
  handleEnded,
  handleVideoClick, 
  handleOverlayClick 
} = useMoverVideo()

const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mover-video-section {
  background-color: transparent !important;
  width: 100%;
}

.video-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.video-card-wrapper {
  background-color: #0b2545 !important;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 25px 20px 40px rgba(11, 37, 69, 0.25) !important;
  border: 1px solid rgba(139, 195, 74, 0.15);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-video-section.parallax-active .video-card-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.video-section-title {
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  letter-spacing: -1px;
}

.text-highlight-green {
  color: #8bc34a !important;
}

.video-section-subtitle {
  font-size: 1.1rem;
  max-width: 700px;
}

.video-container-fluid {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
  flex-grow: 1;
}

.presentation-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block;
  cursor: pointer;
  background-color: #0b2545;
}

/* Oculta os botões de reprodução nativos indesejados em webkits mobile */
.presentation-video::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}

/* Overlay fixo e sempre centralizado corretamente */
.video-interactive-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 37, 69, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, background 0.3s ease;
  cursor: pointer;
  opacity: 1;
  z-index: 5;
}

.video-interactive-overlay.overlay-hidden {
  opacity: 0;
  pointer-events: none; /* Permite interagir com os controles nativos do vídeo quando reproduz */
}

.stylish-play-btn {
  width: 84px;
  height: 84px;
  min-width: 84px;
  min-height: 84px;
  border-radius: 50% !important;
  background-color: #8bc34a;
  color: #0b2545;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(139, 195, 74, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px; /* Ajuste visual para centrar o ícone do play */
  border: none;
}

.stylish-play-btn:hover {
  transform: scale(1.15);
  background-color: #ffffff;
  color: #0b2545;
  box-shadow: 0 15px 40px rgba(255, 255, 255, 0.4);
}

@media (max-width: 992px) {
  .video-card-wrapper {
    border-radius: 16px !important;
    min-height: 400px;
  }
  .video-container-fluid {
    min-height: 280px;
  }
  .stylish-play-btn {
    width: 64px;
    height: 64px;
    min-width: 64px;
    min-height: 64px;
    font-size: 2rem;
  }
}
</style>