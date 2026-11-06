<!-- src/modules/mover/components/MoverFAQ.vue -->
<template>
  <section 
    class="mover-faq-section container-fluid p-0 position-relative my-5"
    role="region"
    aria-label="Perguntas Frequentes Mover Sistemas"
  >
    <!-- Container externo padronizado (max-width: 1750px) -->
    <div class="faq-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM CANTOS BEM ARREDONDADOS, SOMBRAS E PARALAXE -->
      <div class="faq-wrapper position-relative w-100 p-4 p-md-5 rounded-custom parallax-fade-up">
        
        <!-- BOTÃO DE VOLTAR AO TOPO INTEGRADO NA BORDA INFERIOR -->
        <button 
          @click="scrollToTop" 
          class="back-to-top-btn position-absolute start-50 translate-middle-x rounded-pill shadow-sm border-0 d-flex align-items-center justify-content-center"
          aria-label="Voltar ao topo do site"
        >
          <i class="bi bi-chevron-up text-light-green"></i>
        </button>

        <div class="container-fluid px-2 px-lg-4 py-3">
          
          <!-- CABEÇALHO DO FAQ -->
          <div class="faq-header text-start mb-5">
            <h2 class="faq-title fw-bold text-custom-dark m-0">
              {{ faqData.title }}
            </h2>
            <!-- Linha/Reto verde padrão de 2px -->
            <div class="title-underline my-2"></div>
            <p class="faq-subtitle text-custom-dark opacity-75 m-0">
              {{ faqData.subtitle }}
            </p>
          </div>

          <!-- LISTA DE ACORDEÕES -->
          <div class="faq-list">
            <div 
              v-for="(faq, index) in faqData.faqs" 
              :key="faq.id" 
              class="faq-item py-3 border-bottom border-secondary-subtle"
            >
              <!-- Pergunta clicável -->
              <div 
                @click="toggleFAQ(index)" 
                class="faq-question d-flex align-items-center justify-content-between cursor-pointer py-2"
                role="button"
                :aria-expanded="activeIndex === index"
              >
                <h3 class="fs-6 fw-semibold text-custom-dark m-0">
                  {{ faq.question }}
                </h3>
                <span class="faq-icon fw-bold text-light-green fs-5 ms-3">
                  {{ activeIndex === index ? '×' : '+' }}
                </span>
              </div>

              <!-- Resposta expansível com transição suave -->
              <div v-show="activeIndex === index" class="faq-answer pt-2 pb-3">
                <p class="text-custom-dark opacity-90 m-0 small lh-base">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useMoverFAQ } from '../composables/useMoverFAQ'

const { faqData, activeIndex, toggleFAQ, scrollToTop } = useMoverFAQ()
</script>

<style scoped>
.mover-faq-section {
  width: 100%;
  background-color: transparent !important;
}

.faq-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Cantos bem mais arredondados e sombras nas laterais/bottom */
.rounded-custom {
  border-radius: 42px !important;
}

.faq-wrapper {
  background-color: #ffffff !important;
  box-shadow: 25px 25px 50px rgba(11, 37, 69, 0.08) !important;
  border: 1px solid rgba(11, 37, 69, 0.06);
  position: relative;
  padding-bottom: 4rem !important;
}

/* Efeito de paralaxe suave na entrada da seção */
.parallax-fade-up {
  animation: parallaxFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes parallaxFadeUp {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Título e subtítulo em azul escuro (#0b2545) */
.text-custom-dark {
  color: #0b2545 !important;
}

.faq-title {
  font-size: clamp(1.8rem, 2.5vw, 2.4rem);
  letter-spacing: -0.5px;
}

.faq-subtitle {
  font-size: 1rem;
}

/* Reto / Linha verde padrão de 2px (#8bc34a) */
.title-underline {
  width: 80px;
  height: 2px;
  background-color: #8bc34a !important;
}

.text-light-green {
  color: #8bc34a !important;
}

.faq-question {
  transition: color 0.2s ease;
}

.faq-question:hover .faq-icon {
  transform: scale(1.1);
}

.cursor-pointer {
  cursor: pointer;
}

/* Botão de voltar ao topo encaixado na borda inferior */
.back-to-top-btn {
  bottom: -22px;
  width: 55px;
  height: 45px;
  background-color: #ffffff !important;
  box-shadow: 0px 10px 25px rgba(11, 37, 69, 0.15);
  border: 1px solid rgba(11, 37, 69, 0.08);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.back-to-top-btn:hover {
  background-color: #0b2545 !important;
  transform: translateX(-50%) translateY(-3px);
}

.back-to-top-btn:hover i {
  color: #8bc34a !important;
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .faq-wrapper {
    padding: 2rem 1.5rem !important;
    padding-bottom: 4rem !important;
  }
}
</style>