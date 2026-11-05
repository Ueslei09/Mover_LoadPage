<!-- src/modules/mover/components/MoverSolutions.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-solutions-section container-fluid py-5 position-relative overflow-hidden"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Soluções Mover para gestão empresarial"
  >
    <div class="solutions-outer-container px-3 px-md-4 py-4">
      
      <!-- Cabeçalho da Section -->
      <div class="text-start mb-5 px-lg-4 solutions-header-col">
        <h2 class="solutions-main-title fw-bold">
          <span class="title-part-dark">{{ solutionsData.titlePrefix }}</span> 
          <span class="title-part-green">{{ solutionsData.titleHighlight }}</span>
        </h2>
        <p class="solutions-subtitle text-muted mt-2">
          {{ solutionsData.subtitle }}
        </p>
      </div>

      <!-- Container Principal (Abas + Conteúdo) -->
      <div class="solutions-card-wrapper shadow-lg rounded-4 overflow-hidden bg-white solutions-content-box">
        <div class="row g-0 align-items-stretch">
          
          <!-- COLUNA ESQUERDA: Botões/Abas de Navegação (Sem linha divisória) -->
          <div class="col-12 col-lg-4 solutions-tabs-col bg-light py-4 d-flex flex-column gap-2">
            <button
              v-for="(item, index) in solutionsData.tabs"
              :key="item.id"
              class="solution-tab-btn text-start px-4 py-3 fw-semibold border-0 position-relative d-flex align-items-center justify-content-between"
              :class="{ 'active-tab': activeTab === index }"
              @click="selectTab(index)"
              :aria-selected="activeTab === index"
              role="tab"
            >
              <span class="tab-label">{{ item.title }}</span>
              <i class="bi bi-chevron-right tab-icon opacity-50" v-if="activeTab === index"></i>
            </button>
          </div>

          <!-- COLUNA DIREITA: Conteúdo Dinâmico -->
          <div class="col-12 col-lg-8 solutions-content-col p-4 p-md-5 d-flex align-items-center">
            <div class="row align-items-center w-100 m-0">
              
              <!-- Bloco de Texto e Marcadores -->
              <div class="col-12 col-xl-7 mb-4 mb-xl-0 pe-xl-4">
                
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="solution-icon-badge rounded-3 p-2 d-flex align-items-center justify-content-center">
                    <i :class="currentSolution.icon" class="fs-3 text-success-custom"></i>
                  </div>
                  <h3 class="solution-heading fw-bold m-0 text-success-custom">
                    {{ currentSolution.title }}
                  </h3>
                </div>

                <p class="solution-desc lh-base text-dark-custom mb-4">
                  {{ currentSolution.description }}
                </p>

                <h4 class="solutions-subheading fw-bold fs-6 mb-3 text-dark-custom">
                  {{ solutionsData.featuresTitle }}
                </h4>

                <ul class="solutions-list list-unstyled m-0 d-flex flex-column gap-2">
                  <li 
                    v-for="(feature, fIndex) in currentSolution.features" 
                    :key="fIndex"
                    class="d-flex align-items-center gap-2 text-dark-custom"
                  >
                    <i class="bi bi-check-circle-fill text-success-custom fs-5"></i>
                    <span>{{ feature }}</span>
                  </li>
                </ul>

              </div>

              <!-- Bloco Visual: Imagem ocupando 100% do espaço sem margens -->
              <div class="col-12 col-xl-5 text-center position-relative p-0 h-100">
                <div class="media-preview-container position-relative d-flex align-items-stretch justify-content-stretch h-100">
                  <img 
                    v-if="currentSolution.mediaType === 'image'" 
                    :src="currentSolution.mediaUrl" 
                    :alt="currentSolution.title" 
                    class="solution-media-asset"
                    loading="lazy"
                  />
                  <video 
                    v-else-if="currentSolution.mediaType === 'video'"
                    :src="currentSolution.mediaUrl"
                    class="solution-media-asset"
                    autoplay 
                    controls
                    muted 
                    loop 
                    playsinline
                  ></video>
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
import { useMoverSolutions } from '../composables/useMoverSolutions'
import { useParallax } from '@/shared/composables/useParallax'

const { solutionsData, activeTab, selectTab, currentSolution } = useMoverSolutions()
const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mover-solutions-section {
  background-color: transparent !important;
  top: -50px !important;
  width: 100%;
}

.solutions-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Efeito Parallax inicial */
.solutions-header-col,
.solutions-content-box {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.solutions-content-box {
  transition-delay: 0.15s;
}

.mover-solutions-section.parallax-active .solutions-header-col,
.mover-solutions-section.parallax-active .solutions-content-box {
  opacity: 1;
  transform: translateY(0);
}

.solutions-main-title {
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  letter-spacing: -1px;
  line-height: 1.2;
}

.title-part-dark {
  color: #0b2545 !important;
}

.title-part-green {
  color: #8bc34a !important;
}

.solutions-subtitle {
  font-size: 1.05rem;
}

.solutions-card-wrapper {
  border-radius: 28px !important;
  box-shadow: 35px 10px 50px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(11, 37, 69, 0.06);
}

/* Coluna esquerda sem linha divisória */
.solutions-tabs-col {
  background-color: #f8f9fa !important;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  padding: 1.5rem 0 !important;
  border-right: none !important;
}

.solution-tab-btn {
  background-color: transparent;
  color: #0b2545;
  font-size: 1.05rem;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 12px;
  margin: 0 1rem;
  text-align: left;
}

.solution-tab-btn:hover {
  background-color: rgba(11, 37, 69, 0.04);
  color: #0b2545;
}

.solution-tab-btn.active-tab {
  background-color: #ffffff !important;
  color: #0b2545 !important;
  font-weight: 700 !important;
  box-shadow: 0 8px 20px rgba(11, 37, 69, 0.12) !important;
  transform: translateX(4px);
}

.text-dark-custom {
  color: #0b2545 !important;
}

.text-success-custom {
  color: #8bc34a !important;
}

.solution-heading {
  font-size: clamp(1.35rem, 1.8vw, 1.65rem);
}

.solution-desc {
  font-size: 1rem;
  opacity: 0.9;
}

.solution-icon-badge {
  background-color: rgba(139, 195, 74, 0.12);
  width: 52px;
  height: 52px;
}

/* Container de mídia sem espaçamentos internos */
.media-preview-container {
  background: transparent !important;
  width: 100%;
  height: 100%;
  padding: 0 !important;
  margin: 0 !important;
}

/* Imagem preenchendo 100% do espaço de ponta a ponta */
.solution-media-asset {
  width: 100% !important;
  height: 100% !important;
  min-height: 380px;
  object-fit: cover !important;
  border-top-right-radius: 24px ;
  border-bottom-right-radius: 24px;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;

  background: transparent !important;
  box-shadow: none !important;
}

@media (max-width: 992px) {
  .solutions-card-wrapper {
    border-radius: 16px !important;
  }
  .solutions-tabs-col {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 0;
    padding: 1rem !important;
  }
  .solution-tab-btn {
    margin: 0 0.5rem;
  }
  .solution-media-asset {
    height: 280px !important;
    min-height: 280px;
  }
}
</style>