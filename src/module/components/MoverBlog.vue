<!-- src/modules/mover/components/MoverBlog.vue -->
<template>
  <section 
    ref="elementRef"
    class="mover-blog-section container-fluid p-0 position-relative overflow-hidden my-5"
    :class="{ 'parallax-active': isVisible }"
    role="region"
    aria-label="Blog Mover Sistemas"
  >
    <!-- Container externo responsivo -->
    <div class="banner-outer-container px-3 px-md-4 py-3">
      
      <!-- Wrapper com background #0b2545, cantos arredondados e sombra à direita/bottom -->
      <div class="blog-wrapper position-relative overflow-hidden py-5 px-3 px-md-5">
        
        <!-- Cabeçalho da Seção -->
        <div class="text-center mb-5 z-2 position-relative">
          <span class="blog-tag text-uppercase fw-bold mb-2 d-inline-block">
            {{ blogData?.tag }}
          </span>
          <h2 class="blog-main-title fw-bold text-white">
            <span>{{ blogData?.titlePrefix }}</span> 
            <span class="blog-title-highlight">{{ blogData?.titleHighlight }}</span>
          </h2>
        </div>

        <hr class="section-divider mx-auto my-4" />

        <!-- Grade de Cards (4 cards, col-12 col-lg-6 cada) -->
        <div class="container-fluid px-0 px-md-4 z-2 position-relative">
          <div class="row g-4 justify-content-center">
            
            <div 
              v-for="post in blogData?.posts" 
              :key="post.id"
              class="col-12 col-lg-6 d-flex"
            >
              <!-- Card Principal com transição ao clicar -->
              <div 
                class="blog-card w-100 bg-white rounded-4 overflow-hidden shadow-sm d-flex flex-column cursor-pointer"
                @click="navigateToPost(post.route)"
              >
                
                <!-- 60% Altura: Mídia (Imagem ou Vídeo) com Botão em Gradiente -->
                <div class="blog-media-container position-relative">
                  <template v-if="post.mediaType === 'video'">
                    <video 
                      :src="post.mediaUrl"
                      class="w-100 h-100 object-fit-cover"
                      autoplay 
                      muted 
                      loop 
                      playsinline
                    ></video>
                  </template>
                  <template v-else>
                    <img 
                      :src="post.mediaUrl" 
                      :alt="post.title"
                      class="w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                  </template>

                  <!-- Overlay com Gradiente e Botão -->
                  <div class="media-gradient-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-end p-3">
                    <router-link 
                      :to="post.route" 
                      class="blog-action-btn fw-semibold px-4 py-2 rounded-pill text-white shadow-sm text-decoration-none d-inline-block"
                      @click.stop
                  >
                      {{ post.buttonText }} <i class="bi bi-arrow-right ms-1"></i>
                  </router-link>
                  </div>
                </div>

                <!-- 40% Altura: Descrição e Conteúdo (Cor #0b2545) -->
                <div class="blog-content-container p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <span class="blog-post-date d-block mb-2 fw-semibold">
                      {{ post.date }}
                    </span>
                    <h3 class="blog-post-title fw-bold mb-2">
                      {{ post.title }}
                    </h3>
                    <p class="blog-post-desc mb-0 lh-base">
                      {{ post.description }}
                    </p>
                  </div>
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
import { useMoverBlog } from '../composables/useMoverBlog'
import { useParallax } from '@/shared/composables/useParallax'

const { blogData, navigateToPost } = useMoverBlog()
const { isVisible, elementRef } = useParallax(0.05)
</script>

<style scoped>
.mover-blog-section {
  background-color: transparent !important;
  width: 100%;
}

.banner-outer-container {
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
}

/* Wrapper Principal: Background #0b2545, Cantos Arredondados e Sombra à Direita/Bottom */
.blog-wrapper {
  position: relative;
  background-color: #0b2545 !important;
  border-radius: 28px !important;
  overflow: hidden !important;
  box-shadow: 20px 10px 10px rgba(0, 0, 0, 0.28) !important;
  opacity: 0;
  top:-10px;
  transform: translateY(35px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.mover-blog-section.parallax-active .blog-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.blog-tag {
  color: #8bc34a !important;
  font-size: 0.9rem;
  letter-spacing: 1.5px;
}

.blog-main-title {
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  letter-spacing: -0.5px;
  color: #ffffff !important;
}

.blog-title-highlight {
  color: #ffffff !important;
}


.section-divider {
  width: 60%; /* Ou width: 100% se quiser que ocupe de ponta a ponta */
  height: 2px !important;
  background-color: #8bc34a !important;
  border: none !important;
  opacity: 1 !important;
  margin: 1.5rem auto !important;
  margin-bottom: 3rem !important;
 
}
/* Estilização do Card */
.blog-card {
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
}

/* 60% Mídia */
.blog-media-container {
  height: 280px;
  position: relative;
  overflow: hidden;
}

/* Gradiente no botão da imagem */
.media-gradient-overlay {
  background: linear-gradient(to top, rgba(11, 37, 69, 0.75) 0%, rgba(0, 0, 0, 0) 60%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.blog-action-btn {
  background: linear-gradient(135deg, #8bc34a 0%, #689f38 100%) !important;
  font-size: 0.85rem;
  border: none;
  transition: all 0.3s ease;
}

.blog-card:hover .blog-action-btn {
  transform: scale(1.05);
}

/* 40% Conteúdo com texto na cor #0b2545 */
.blog-content-container {
  background-color: #ffffff;
}

.blog-post-date {
  color: #8bc34a !important;
  font-size: 0.85rem;
}

.blog-post-title {
  color: #0b2545 !important;
  font-size: 1.25rem;
  line-height: 1.3;
}

.blog-post-desc {
  color: #0b2545 !important;
  font-size: 0.95rem;
  opacity: 0.85;
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .blog-wrapper {
    border-radius: 16px !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .blog-media-container {
    height: 220px;
  }
}
</style>