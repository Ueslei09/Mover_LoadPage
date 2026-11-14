<template>
  <transition name="fade-slide">
    <div v-show="isVisible" class="scroll-to-top-wrapper">
      <button
        @click="scrollToTop"
        class="scroll-to-top-btn"
        aria-label="Voltar ao topo da página"
        title="Voltar ao topo"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
import { useScrollToTop } from '../composables/useScrollToTop';

export default {
  name: 'ScrollToTop',
  setup() {
    const { isVisible, scrollToTop } = useScrollToTop(80);

    return {
      isVisible,
      scrollToTop
    };
  }
};
</script>

<style scoped>
/* Wrapper fluido que acompanha o container em desktop e se adapta no mobile */
.scroll-to-top-wrapper {
  position: fixed;
  bottom: 260px;
  left: 8%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px; /* Mesma largura máxima dos seus cards/container */
  display: flex;
  justify-content: flex-end;
  padding: 0 24px;
  z-index: 9999;
  pointer-events: none; /* Permite cliques passantes nas áreas vazias */
}

.scroll-to-top-btn {
  pointer-events: auto; /* Reativa o clique apenas no botão */
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #0b2545; /* Azul corporativo Mover Sistemas */
  color: #ffffff;
  border: 2px solid rgba(139, 195, 74, 0.3); /* Destaque verde #8bc34a */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11, 37, 69, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-to-top-btn:hover {
  background-color: #8bc34a; /* Verde highlight do projeto */
  color: #0b2545;
  border-color: #8bc34a;
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(139, 195, 74, 0.35);
}

.scroll-to-top-btn:active {
  transform: translateY(-1px);
}

/* Ajustes finos específicos para telas mobile menores */
@media (max-width: 768px) {
  .scroll-to-top-wrapper {
    left: auto;
    right: 0;
    transform: none;
    padding: 0 16px;
    bottom: 85px;
  }
  
  .scroll-to-top-btn {
    width: 40px;
    height: 40px;
  }
}

/* Animação suave de entrada/saída */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>