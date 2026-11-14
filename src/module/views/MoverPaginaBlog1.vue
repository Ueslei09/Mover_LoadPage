<!-- src/modules/mover/views/MoverPaginaBlog1.vue -->
<template>
  <MoverNavbar />
  <section 
    class="mover-blog-section container-fluid p-0 position-relative my-5"
    role="region"
    aria-label="Detalhes do Artigo do Blog Mover Sistemas"
  >
    <!-- Container externo padronizado (max-width: 1750px) -->
    <div class="blog-outer-container px-3 px-md-4 py-3">
      
      <!-- WRAPPER COM PARALLAX, BACKGROUND TRANSPARENTE E SOMBRAS -->
      <div 
        ref="elementRef"
        class="blog-wrapper position-relative w-100 p-4 p-md-5 rounded-custom"
        :class="{ 'parallax-active': isVisible }"
      >
        
        <div class="container-fluid px-2 px-lg-4 py-3">
          
          <!-- BREADCRUMBS -->
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb mb-0 align-items-center">
              <li v-for="(crumb, index) in postData.breadcrumbs" :key="index" class="breadcrumb-item">
                <a :href="crumb.url" class="text-decoration-none text-custom-blue fw-medium breadcrumb-link d-inline-flex align-items-center gap-1">
                  <i v-if="crumb.icon" :class="crumb.icon"></i>
                  <span>{{ crumb.label }}</span>
                </a>
              </li>
            </ol>
          </nav>

          <!-- TÍTULO EM AZUL -->
          <h1 class="blog-title fw-bold text-custom-blue mb-2">
            {{ postData.title }}
          </h1>

          <!-- DATA EM PRETO E AUTOR -->
          <p class="blog-meta mb-4 small">
            <span class="text-black fw-semibold">{{ postData.date }}</span> 
            <span class="text-muted mx-1">-</span> 
            <span class="text-custom-blue fw-medium">{{ postData.author }}</span>
          </p>

          <!-- IMAGEM/MÍDIA COM DEGRADÊ NA PARTE INFERIOR -->
          <div class="blog-media-container position-relative rounded-4 overflow-hidden mb-5 shadow-sm">
            <video 
              v-if="postData.mediaType === 'video'"
              autoplay 
              muted 
              loop 
              playsinline 
              class="w-100 h-100 object-fit-cover"
            >
              <source :src="postData.mediaUrl" type="video/mp4" />
            </video>
            <img 
              v-else
              :src="postData.mediaUrl" 
              :alt="postData.mediaAlt" 
              class="w-100 h-100 object-fit-cover blog-img"
            />
            <!-- Degradê na parte inferior da imagem -->
            <div class="media-bottom-gradient position-absolute bottom-0 start-0 w-100 h-50"></div>
          </div>

          <!-- CONTEÚDO / TEXTOS EM AZUL -->
          <div class="blog-content-container col-12 col-lg-10 col-xl-9 p-0">
            <p 
              v-for="(paragraph, index) in postData.paragraphs" 
              :key="index"
              class="blog-paragraph text-custom-blue lh-lg mb-4"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- BOTÃO FINAL COM CANTOS ARREDONDADOS E HOVER PADRÃO DO PROJETO -->
          <div class="blog-footer-action mt-5 pt-3">
            <button 
              @click="voltarParaBlog" 
              class="btn btn-mover-primary fw-semibold px-5 py-3 rounded-pill text-uppercase shadow-sm text-decoration-none d-inline-flex align-items-center gap-2 border-0 cursor-pointer"
              :aria-label="postData.button.ariaLabel"
            >
              <span>{{ postData.button.text }}</span>
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import MoverNavbar from '@/shared/components/MoverNavbar.vue'
import { useMoverPaginaBlog1 } from '../composables/useMoverPaginaBlog1'
import { useParallax } from '@/shared/composables/useParallax'

// Ativar o parallax na página de detalhes
const { isVisible, elementRef } = useParallax(0.05)
const { postData, voltarParaBlog } = useMoverPaginaBlog1()
</script>

<style scoped>
.mover-blog-section {
  width: 100%;
  top:-50px !important;
  background-color: transparent !important;
}

.blog-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Cantos arredondados (42px) e fundo transparente com sombras à direita e bottom */
.rounded-custom {
  border-radius: 42px !important;
}

/* Configuração do Parallax (Estado Inicial Oculto/Deslocado) */
.blog-wrapper {
  background-color: transparent !important;
  box-shadow: 25px 25px 50px rgba(11, 37, 69, 0.08) !important;
  position: relative;
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Estado Ativo do Parallax quando visível na tela */
.blog-wrapper.parallax-active {
  opacity: 1;
  transform: translateY(0);
}

/* Tipografia e Cores */
.text-custom-blue {
  color: #0b2545 !important;
}

.blog-title {
  font-size: clamp(2rem, 3.2vw, 3rem);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.blog-meta {
  font-size: 0.95rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #0b2545;
}

/* Container de Mídia e Degradê Inferior */
.blog-media-container {
  max-height: 520px;
  min-height: 350px;
  background-color: #0b2545;
}

.blog-img {
  max-height: 520px;
  object-fit: cover;
}

.media-bottom-gradient {
  background: linear-gradient(to top, rgba(11, 37, 69, 0.55) 0%, transparent 100%);
  pointer-events: none;
}

/* Parágrafos do Artigo */
.blog-paragraph {
  font-size: 1.125rem;
  opacity: 0.92;
}

/* Botão com cantos arredondados e hover padrão do projeto (#8bc34a invertendo para prata/azul) */
.btn-mover-primary {
  background-color: #8bc34a !important;
  color: #0b2545 !important;
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
}

.btn-mover-primary:hover,
.btn-mover-primary:focus {
  background-color: #a6b9c7 !important;
  color: #0b2545 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* Efeito Hover com linha de 2px nos links do Breadcrumb */
.breadcrumb-link {
  position: relative;
  text-decoration: none !important;
  transition: color 0.2s ease;
}

.breadcrumb-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px; /* Linha com exatamente 2px de espessura */
  bottom: -2px;
  left: 0;
  background-color: #8bc34a; /* Cor verde de destaque do projeto */
  transition: width 0.3s ease;
}

.breadcrumb-link:hover {
  color: #8bc34a !important;
}

.breadcrumb-link:hover::after {
  width: 100%; /* A linha desliza e preenche a largura do link ao passar o rato */
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .blog-wrapper {
    padding: 1.5rem 1rem !important;
  }
  .blog-media-container {
    max-height: 320px;
  }
}
</style>