<template>
  <div
    class="mover-float-wrapper"
    :style="{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }"
  >
    <!-- Balãozinho de aviso -->
<!-- Balãozinho de aviso estilizado -->
    <div
      v-if="showBubble && !isOpen"
      class="mover-bubble shadow-lg px-3 py-2"
      role="button"
      tabindex="0"
      @click="toggleWidget"
      @keydown.enter="toggleWidget"
    >
      <div class="d-flex align-items-center gap-2">
        <span class="mover-bubble-dot" aria-hidden="true"></span>
        <span class="fw-semibold text-dark small lh-sm">{{ config.bubbleText }}</span>
      </div>
    </div>

    <!-- Janela / Frame do Mover IA -->
    <transition name="mover-pop">
      <div
        v-if="isOpen"
        class="mover-panel card border-0 shadow-lg rounded-4 overflow-hidden d-flex flex-column"
      >
        <!-- Cabeçalho Bootstrap -->
        <div class="mover-header d-flex align-items-center justify-content-between px-3 py-2 text-white">
          <div class="d-flex align-items-center gap-2">
            <span class="mover-mini-icon">🤖</span>
            <div>
              <div class="fw-bold lh-1">Mover IA</div>
              <small class="text-white-50">Assistente Virtual</small>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-sm btn-light rounded-circle mover-close-btn"
            aria-label="Fechar Mover IA"
            @click="closeWidget"
          >
            ✕
          </button>
        </div>

        <!-- Frame da aplicação no Render ocupando toda a área útil -->
        <div class="mover-frame-box flex-grow-1 position-relative">
          <iframe
            :src="config.iframeUrl"
            title="Mover IA"
            class="w-100 h-100 border-0"
            loading="lazy"
          />
        </div>
      </div>
    </transition>

    <!-- Botão / Ícone em movimento -->
    <button
      type="button"
      class="mover-launcher btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
      :aria-label="isOpen ? 'Minimizar Mover IA' : 'Abrir Mover IA'"
      @click="toggleWidget"
    >
      <span class="mover-icon-anim">{{ isOpen ? "✕" : "🤖" }}</span>
    </button>
  </div>
</template>

<script setup>
import { moverIaConfig } from "../services/moverIaService";
import { useMoverWidget } from "../composables/useMoverWidget";

const config = moverIaConfig;
const { isOpen, showBubble, parallaxOffset, toggleWidget, closeWidget } = useMoverWidget();
</script>

<style scoped>
.mover-float-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1080;
  transition: transform 0.18s ease-out;
}

.mover-bubble {
  position: absolute;
  bottom: 76px;
  right: 2px;
  max-width: 265px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid rgba(13, 110, 253, 0.16);
  border-radius: 18px 18px 4px 18px;
  cursor: pointer;
  animation: floatBubble 2.6s ease-in-out infinite;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mover-bubble:hover {
  box-shadow: 0 12px 24px rgba(13, 110, 253, 0.18) !important;
}

/* Pontinha de balão de fala no canto inferior direito */
.mover-bubble::after {
  content: "";
  position: absolute;
  bottom: -7px;
  right: 18px;
  width: 14px;
  height: 14px;
  background: #f8fbff;
  border-right: 1px solid rgba(13, 110, 253, 0.16);
  border-bottom: 1px solid rgba(13, 110, 253, 0.16);
  transform: rotate(45deg);
  border-bottom-right-radius: 3px;
}

.mover-bubble-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.18);
}
.mover-launcher {
  width: 62px;
  height: 62px;
  font-size: 1.6rem;
}

.mover-icon-anim {
  display: inline-block;
  animation: iconPulseMove 2.2s ease-in-out infinite;
}

.mover-header {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
}

.mover-close-btn {
  width: 28px;
  height: 28px;
  line-height: 1;
  padding: 0;
}

.mover-panel {
  position: fixed;
  bottom: 98px;
  right: 24px;
  width: 400px;
  height: 600px;
  max-height: calc(100vh - 120px);
  background: #ffffff;
}

.mover-frame-box {
  min-height: 0;
}

@keyframes iconPulseMove {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-4px) rotate(-8deg) scale(1.07);
  }
}

@keyframes floatBubble {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.mover-pop-enter-active,
.mover-pop-leave-active {
  transition: all 0.2s ease;
}

.mover-pop-enter-from,
.mover-pop-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

@media (max-width: 576px) {
  .mover-float-wrapper {
    bottom: 16px;
    right: 16px;
  }

  .mover-launcher {
    width: 56px;
    height: 56px;
    font-size: 1.4rem;
  }

  .mover-bubble {
    bottom: 66px;
    max-width: 220px;
  }

  .mover-panel {
    left: 12px;
    right: 12px;
    bottom: 82px;
    width: auto;
    height: 78vh;
    max-height: calc(100vh - 98px);
  }
}
</style>