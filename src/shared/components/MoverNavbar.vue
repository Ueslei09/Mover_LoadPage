<!-- src/modules/mover/components/MoverNavbar.vue -->
<template>
  <header class="mover-navbar-wrapper container-fluid p-0 sticky-top">
    <!-- Navbar principal com fundo #e8e9eb e uso de container do Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-light py-3">
      <div class="container d-flex align-items-center justify-content-between">
        
        <!-- LOGO À ESQUERDA (Suporte a imagem ou texto via service) -->
        <router-link to="/" class="navbar-brand d-flex align-items-center m-0 text-decoration-none" aria-label="Página inicial Mover">
          <template v-if="navbarData.logoType === 'image'">
            <img 
              :src="navbarData.logoSrc" 
              :alt="navbarData.logoAlt" 
              class="brand-logo-img"
            />
          </template>
          <template v-else>
            <span class="brand-logo-text fw-bold fs-4">{{ navbarData.logoText }}</span>
          </template>
        </router-link>

        <!-- BOTÃO HAMBÚRGUER PARA RESPONSIVIDADE MOBILE -->
        <button 
          class="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#moverNavbarContent" 
          aria-controls="moverNavbarContent" 
          aria-expanded="false" 
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- LINKS DE NAVEGAÇÃO À DIREITA -->
        <div class="collapse navbar-collapse justify-content-end" id="moverNavbarContent">
          <ul class="navbar-nav align-items-lg-center mb-2 mb-lg-0">
            <li class="nav-item">
              <a 
                :href="navbarData.navLink.url" 
                class="nav-link nav-custom-link fw-semibold px-3 py-2"
                :aria-label="navbarData.navLink.ariaLabel"
              >
                {{ navbarData.navLink.text }}
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>

    <!-- Linha divisória fina na cor #0b2545 -->
    <!--<hr class="navbar-divider m-0" />-->
  </header>
</template>

<script setup>
import { useMoverNavbar } from '../composables/useMoverNavbar'

const { navbarData } = useMoverNavbar()
</script>

<style scoped>
/* Fundo global da Navbar solicitado (#e8e9eb) */
.mover-navbar-wrapper {
  background-color:transparent;
  box-shadow: 0 2px 10px rgba(11, 37, 69, 0.04);
  z-index: 1030;
}

.navbar {
  background-color: #e8e9eb !important;
}

/* Tamanho controlado para a logo */
.brand-logo-img {
  height: 70px;
  width: auto;
  object-fit: contain;
}

.brand-logo-text {
  color: #0b2545 !important;
}

/* Estilização do link "Blog" (Cor #0b2545 e Hover #8bc34a) */
.nav-custom-link {
  color: #0b2545 !important;
  font-size: 1.05rem;
  transition: color 0.3s ease, transform 0.2s ease;
}

.nav-custom-link:hover,
.nav-custom-link:focus {
  color: #8bc34a !important; /* Cor de hover solicitada */
}

/* Linha divisória bem fina na cor #0b2545 */
.navbar-divider {
  border: none;
  border-top: 1px solid #0b2545;
  opacity: 0.25; /* Deixa a linha bem subtil e fina */
  width: 100%;
}
</style>