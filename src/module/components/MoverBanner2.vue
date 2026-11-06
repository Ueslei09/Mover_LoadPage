<!-- src/modules/mover/components/MoverBanner2.vue -->
<template>
  <section 
    class="mover-banner2-section container-fluid p-0 position-relative overflow-hidden mb-5"
    role="region"
    aria-label="Banner secundário Mover Sistemas"
  >
    <!-- Container externo com max-width: 1750px idêntico ao primeiro banner -->
    <div class="banner2-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM 100% LARGURA E ALTURA -->
      <div class="banner2-wrapper position-relative w-100 d-flex align-items-center">
        
        <!-- BACKGROUND (IMAGEM OU VÍDEO) 100% LARGURA E ALTURA -->
        <div class="banner2-bg-container position-absolute top-0 start-0 w-100 h-100">
          <video 
            v-if="bannerData.bgType === 'video'"
            autoplay 
            muted 
            loop 
            playsinline 
            class="w-100 h-100 banner2-media"
          >
            <source :src="bannerData.videoUrl" type="video/mp4" />
          </video>
          <img 
            v-else
            :src="bannerData.bgUrl" 
            :alt="bannerData.imageAlt"
            class="w-100 h-100 banner2-media"
          />
          <!-- Overlay com opacidade exata de 0.5 -->
          <div class="banner2-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        </div>

        <!-- CONTEÚDO COM CARD FLUTUANTE À ESQUERDA -->
        <div class="container-fluid position-relative z-2 py-5 px-4 px-lg-5">
          <div class="row align-items-center justify-content-start w-100 m-0">
            
            <div class="col-12 col-lg-7 col-xxl-6">
              <div class="glass-card-left p-4 p-md-5 rounded-4 shadow-lg">
                
                <!-- TÍTULO: Primeiras palavras em branco, restante em #8bc34a -->
                <h2 class="banner2-title fw-bold mb-3">
                  <span class="d-block text-white">{{ bannerData.titleWhite }}</span>
                  <span class="d-block text-light-green">{{ bannerData.titleGreen }}</span>
                </h2>

                <!-- SUBTÍTULO EM BRANCO -->
                <p class="banner2-desc mb-4 lh-base text-white">
                  {{ bannerData.description }}
                </p>

                <!-- BOTÕES COM BORDAS QUADRADAS E CORES PADRÃO -->
                <div class="d-flex flex-column flex-sm-row gap-3">
                  <a 
                    :href="bannerData.primaryButton.url" 
                    class="btn btn-mover-primary fw-semibold px-4 py-3 rounded-0 text-white text-uppercase shadow-sm flex-fill text-center"
                    :aria-label="bannerData.primaryButton.ariaLabel"
                  >
                    {{ bannerData.primaryButton.text }}
                  </a>

                  <a 
                    :href="bannerData.secondaryButton.url" 
                    class="btn btn-mover-outline fw-semibold px-4 py-3 rounded-0 text-white text-uppercase flex-fill text-center"
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

    </div>
  </section>
</template>

<script setup>
import { useMoverBanner2 } from '../composables/useMoverBanner2'

const { bannerData } = useMoverBanner2()
</script>

<style scoped>
.mover-banner2-section {
  width: 100%;
  background-color: transparent !important;
}

/* Alinhamento de margens perfeito idêntico ao MoverBanner (1750px) */
.banner2-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

.banner2-wrapper {
  position: relative;
  min-height: 85vh;
  background-color: #0b2545;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 20px 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.banner2-media {
  object-fit: cover !important;
  object-position: center center !important;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Overlay com opacidade de 0.5 conforme exigido */
.banner2-overlay {
  background: rgba(11, 37, 69, 0.5) !important;
  z-index: 2;
}

.container-fluid {
  z-index: 3;
}

/* Card flutuante à esquerda com efeito glassmorphism */
.glass-card-left {
  background: rgba(11, 37, 69, 0.65);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
}

.banner2-title {
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  letter-spacing: -1px;
  line-height: 1.2;
}

.text-light-green {
  color: #8bc34a !important;
}

.banner2-desc {
  font-size: 1.1rem;
  opacity: 0.95;
}

/* Botões com bordas quadradas (rounded-0) e cores padrão do projeto */
.btn-mover-primary {
  background-color: #8bc34a !important;
  color: #0b2545 !important; /* Texto em azul escuro para contraste perfeito com o verde */
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
}

/* Hover padrão do projeto (Inverte para cinza prateado com texto escuro e sobe um pouco) */
.btn-mover-primary:hover,
.btn-mover-primary:focus {
  background-color: #a6b9c7 !important;
  color: #0b2545 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Botão outline secundário */
.btn-mover-outline {
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #ffffff !important;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-mover-outline:hover,
.btn-mover-outline:focus {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #0b2545 !important;
  transform: translateY(-2px);
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .banner2-wrapper {
    min-height: auto;
    border-radius: 16px !important;
  }
  .glass-card-left {
    padding: 2rem 1.5rem !important;
  }
}
</style>