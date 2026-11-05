<!-- src/modules/mpro/components/MproHero.vue -->
<template>
  <section 
    ref="elementRef"
    class="mpro-hero-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Apresentação Mpro Sistemas"
  >
    <!-- Container externo que garante o espaçamento elegante nas laterais -->
    <div class="banner-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER ARREDONDADO COM FUNDO AZUL E SOMBRA À DIREITA -->
      <div class="mpro-wrapper position-relative overflow-hidden d-flex flex-column">
        
        <div class="container-fluid px-3 px-md-5 z-2 position-relative w-100 py-5">
          <div class="row align-items-center justify-content-between w-100 m-0">
            
            <!-- COLUNA DE TEXTOS E CTA (Lado Esquerdo) - Z-index mais alto para garantir clique -->
            <div class="col-12 col-lg-5 hero-content-box text-center text-lg-start py-5 position-relative z-3">
              
              <!-- LOGO / TÍTULO EM IMAGEM -->
              <div class="mb-4">
                <img 
                  :src="mproData.logoImg" 
                  :alt="mproData.logoAlt"
                  class="mpro-brand-logo img-fluid"
                />
              </div>

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
                <button 
                  @click="handleActionClick"
                  type="button"
                  class="btn mpro-cta-btn fw-semibold px-5 py-3 rounded-pill text-uppercase shadow-sm"
                  :aria-label="mproData.buttonAriaLabel"
                >
                  {{ mproData.buttonText }}
                </button>
              </div>

            </div>

            <!-- COLUNA DO CARD COM A IMAGEM -->
            <div class="col-12 col-lg-6 hero-image-col text-center position-relative">
              <div class="device-card-wrapper p-2 p-md-5">
                <img 
                  :src="mproData.heroImage" 
                  :alt="mproData.heroImageAlt"
                  class="img-fluid devices-mockup"
                />
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

const { mproData, handleActionClick } = useMpro()
const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mpro-hero-section {
  background-color: transparent !important;
  top: -90px !important;
  width: 100%;
}

.banner-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Wrapper principal com cantos arredondados, fundo azul e sombra estritamente à direita */
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

.mpro-brand-logo {
  max-height: 150px;
  object-fit: contain;
  margin-bottom: -20px;
}

.hero-content-box {
  flex: 0 0 52% !important;
  max-width: 52% !important;
}

.hero-subtitle {
  font-size: clamp(2rem, 3.2vw, 3.2rem) !important;
  white-space: normal !important;
  word-break: normal !important;
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

/* Garante que o container do botão tem posição e z-index seguros para interatividade */
.cta-button-wrapper {
  position: relative;
  z-index: 10;
}

/* Botão padrão com as cores do projeto e efeito hover */
.mpro-cta-btn {
  background-color: #8bc34a !important; /* Verde principal do projeto */
  color: #ffffff !important;
  border: none;
  transition: all 0.3s ease-in-out;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer; /* Garante o cursor de clique */
  position: relative;
  z-index: 11;
}

.mpro-cta-btn:hover,
.mpro-cta-btn:focus {
  background-color: #a6b9c7 !important; /* Tom de verde ligeiramente mais escuro no hover */
  color: #0f0f0f !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 195, 74, 0.4);
}

.hero-image-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Configuração desktop para o card/imagem */
.device-card-wrapper {
  background-color: transparent !important;
  width: 300% !important;
  max-width: 300% !important;
  left: 100px !important;
  position: absolute;
  z-index: 1; /* Mantém a imagem abaixo dos textos/botão para não bloquear cliques */
}

.devices-mockup {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Ajustes específicos para mobile e tablets */
@media (max-width: 992px) {
  .mpro-wrapper {
    border-radius: 16px !important;
  }
  
  .hero-content-box {
    text-align: center !important;
    margin-bottom: 1rem;
    flex: 0 0 100% !important;
    max-width: 100% !important;
    padding-bottom: 0 !important;
  }

  .hero-subtitle {
    font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
  }

  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }

  /* Reseta o posicionamento absoluto no mobile para a imagem ficar abaixo do botão */
  .hero-image-col {
    width: 100%;
    padding: 1rem 0 0 0;
  }

  .device-card-wrapper {
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    left: 0 !important;
    padding: 0.5rem !important;
    z-index: 5;
  }

  .devices-mockup {
    max-width: 85% !important; /* Diminui o tamanho da imagem no mobile */
    margin: 0 auto;
    display: block;
  }
}
</style>