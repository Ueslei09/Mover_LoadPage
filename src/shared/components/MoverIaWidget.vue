<template>
  <Teleport to="body">
    <div
      class="mover-float-wrapper"
      :class="{ 'mover-float-wrapper--open': isOpen }"
      :style="wrapperStyle"
    >
      <!-- Balãozinho de aviso estilizado com entrada/saída suave -->
      <Transition name="mover-bubble-pop">
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
      </Transition>

      <!-- Janela / Frame do Mover IA -->
      <div
        v-if="isOpen"
        class="mover-panel card border-0 shadow-lg rounded-4 overflow-hidden d-flex flex-column"
      >
        <!-- Cabeçalho Bootstrap -->
        <div class="mover-header d-flex align-items-center justify-content-between px-3 py-2 text-white flex-shrink-0">
          <div class="d-flex align-items-center gap-2 min-w-0">
            <span class="mover-mini-media d-inline-flex align-items-center justify-content-center overflow-hidden rounded-circle flex-shrink-0">
              <video
                v-if="activeHeaderMedia.kind === 'video'"
                :src="activeHeaderMedia.src"
                autoplay
                loop
                muted
                playsinline
                class="w-100 h-100 mover-media-fit"
                @error="markHeaderMediaFailed"
              />
              <img
                v-else-if="activeHeaderMedia.kind === 'image'"
                :src="activeHeaderMedia.src"
                :alt="config.iaIcon.alt"
                class="w-100 h-100 mover-media-fit"
                @error="markHeaderMediaFailed"
              />
              <span v-else class="mover-mini-icon">{{ config.iaIcon.fallbackEmoji }}</span>
            </span>
            <div class="text-truncate">
              <div class="fw-bold lh-1 text-truncate">Mover IA</div>
              <small class="text-white-50 d-block text-truncate">Inteligência Artificial da Mover</small>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-sm btn-light rounded-circle mover-close-btn flex-shrink-0"
            aria-label="Fechar Mover IA"
            @click="closeWidget"
          >
            ✕
          </button>
        </div>

        <!-- Frame da aplicação no Render ocupando toda a área útil -->
        <div class="mover-frame-box flex-grow-1 position-relative w-100">
          <!-- Camada Initial Load enquanto o agente no Render inicia -->
          <transition name="mover-loader-fade">
            <div
              v-if="isInitialLoading"
              class="mover-initial-loader position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-3 px-sm-4 py-3"
              role="status"
              aria-live="polite"
            >
              <div class="mover-loader-media-box rounded-4 overflow-hidden shadow-sm mb-3 d-flex align-items-center justify-content-center">
                <!-- Etapa 1 (1s): Frame de imagem estática antes do GIF/vídeo -->
                <img
                  v-if="showPanelFrame && activeFrameMedia.kind === 'image'"
                  :src="activeFrameMedia.src"
                  :alt="config.initialFrame?.alt || config.iaIcon.alt"
                  class="w-100 h-100 mover-media-fit"
                  @error="markFrameMediaFailed"
                />
                <!-- Etapa 2: GIF / mídia animada -->
                <video
                  v-else-if="activeLoaderMedia.kind === 'video'"
                  :src="activeLoaderMedia.src"
                  autoplay
                  loop
                  muted
                  playsinline
                  class="w-100 h-100 mover-media-fit"
                  @error="markLoaderMediaFailed"
                />
                <img
                  v-else-if="activeLoaderMedia.kind === 'image'"
                  :src="activeLoaderMedia.src"
                  :alt="config.initialLoad?.alt || config.iaIcon.alt"
                  class="w-100 h-100 mover-media-fit"
                  @error="markLoaderMediaFailed"
                />
                <span v-else class="fs-1">{{ config.iaIcon.fallbackEmoji }}</span>
              </div>

              <div class="mover-loader-copy d-flex flex-column align-items-center gap-1">
                <p class="mover-loader-title fw-bold mb-0">
                  {{ config.initialLoad?.title || "Eu sou MOVER IA" }}
                </p>
                <p class="mover-loader-subtitle mb-0">
                  {{ config.initialLoad?.subtitle || "seja bem vindos" }}
                </p>
              </div>
            </div>
          </transition>

          <iframe
            :src="config.iframeUrl"
            title="Mover IA"
            class="w-100 h-100 border-0 d-block"
            @load="handleIframeLoad"
          />
        </div>
      </div>

      <!-- Botão / Ícone em movimento -->
      <button
        type="button"
        class="mover-launcher btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center p-0 overflow-hidden"
        :class="{ 'mover-launcher--hidden-mobile': isOpen }"
        :aria-label="isOpen ? 'Minimizar Mover IA' : 'Abrir Mover IA'"
        @click="toggleWidget"
      >
        <span v-if="isOpen" class="mover-icon-anim">{{ config.iaIcon.closeEmoji }}</span>
        <template v-else>
          <!-- Frame estático por 1s no ícone antes de iniciar o GIF/vídeo -->
          <img
            v-if="showIconFrame && activeFrameMedia.kind === 'image'"
            :src="activeFrameMedia.src"
            :alt="config.initialFrame?.alt || config.iaIcon.alt"
            class="w-100 h-100 mover-media-fit"
            @error="markFrameMediaFailed"
          />
          <video
            v-else-if="activeLauncherMedia.kind === 'video'"
            :src="activeLauncherMedia.src"
            autoplay
            loop
            muted
            playsinline
            class="w-100 h-100 mover-media-fit mover-icon-anim"
            @error="markLauncherMediaFailed"
          />
          <img
            v-else-if="activeLauncherMedia.kind === 'image'"
            :src="activeLauncherMedia.src"
            :alt="config.iaIcon.alt"
            class="w-100 h-100 mover-media-fit mover-icon-anim"
            @error="markLauncherMediaFailed"
          />
          <span v-else class="mover-icon-anim">{{ config.iaIcon.fallbackEmoji }}</span>
        </template>
      </button>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";
import { moverIaConfig } from "../services/moverIaService";
import { useMoverWidget } from "../composables/useMoverWidget";

const config = moverIaConfig;
const {
  isOpen,
  showBubble,
  showIconFrame,
  showPanelFrame,
  isInitialLoading,
  parallaxOffset,
  activeFrameMedia,
  activeLauncherMedia,
  activeHeaderMedia,
  activeLoaderMedia,
  markLauncherMediaFailed,
  markHeaderMediaFailed,
  markLoaderMediaFailed,
  markFrameMediaFailed,
  handleIframeLoad,
  toggleWidget,
  closeWidget,
} = useMoverWidget(config);

const wrapperStyle = computed(() => {
  if (isOpen.value) {
    return { transform: "none" };
  }
  return { transform: `translate3d(0, ${parallaxOffset.value}px, 0)` };
});
</script>

<style scoped>
.mover-float-wrapper,
.mover-float-wrapper *,
.mover-float-wrapper *::before,
.mover-float-wrapper *::after {
  box-sizing: border-box;
}

.mover-float-wrapper {
  position: fixed;
  bottom: max(16px, env(safe-area-inset-bottom));
  right: max(16px, env(safe-area-inset-right));
  z-index: 9999;
  transition: transform 0.18s ease-out;
}

.mover-bubble {
  position: absolute;
  bottom: 76px;
  right: 2px;
  width: max-content;
  max-width: min(265px, calc(100vw - 40px));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid rgba(13, 110, 253, 0.16);
  border-radius: 18px 18px 4px 18px;
  cursor: pointer;
  animation: floatBubble 2.6s ease-in-out infinite;
  transition: box-shadow 0.2s ease;
}

.mover-bubble:hover {
  box-shadow: 0 12px 24px rgba(13, 110, 253, 0.18) !important;
}

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

/* Transição suave de entrada e saída do balãozinho */
.mover-bubble-pop-enter-active,
.mover-bubble-pop-leave-active {
  transition: opacity 0.32s ease, transform 0.32s ease;
}

.mover-bubble-pop-enter-from,
.mover-bubble-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.mover-mini-media {
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 1.15rem;
}

.mover-media-fit {
  object-fit: cover;
  display: block;
}

.mover-launcher {
  width: 60px;
  height: 60px;
  font-size: 1.55rem;
}

.mover-icon-anim {
  display: inline-block;
  animation: iconPulseMove 2.2s ease-in-out infinite;
}

.mover-header {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
}

.mover-close-btn {
  width: 30px;
  height: 30px;
  line-height: 1;
  padding: 0;
}

.mover-panel {
  position: fixed;
  bottom: 92px;
  right: 24px;
  z-index: 10000;
  width: min(400px, calc(100vw - 48px));
  height: min(600px, calc(100dvh - 116px));
  background: #f8fbff;
  display: flex;
  visibility: visible;
  opacity: 1;
}

.mover-frame-box {
  min-height: 240px;
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  background-color: #f8fbff;
  -webkit-overflow-scrolling: touch;
}

/* Camada de Initial Load no painel */
.mover-initial-loader {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
}

.mover-loader-media-box {
  width: clamp(128px, 38vw, 176px);
  height: clamp(128px, 38vw, 176px);
  background-color: #ffffff;
  border: 2px solid rgba(13, 110, 253, 0.18);
  animation: loaderMediaFloat 2.6s ease-in-out infinite;
}

.mover-loader-title {
  font-size: clamp(1.05rem, 3.6vw, 1.3rem);
  color: #0a58ca;
  letter-spacing: 0.02em;
  animation: textRevealUp 0.65s ease-out both, titlePulse 2.4s ease-in-out 0.65s infinite;
}

.mover-loader-subtitle {
  font-size: clamp(0.9rem, 3vw, 1.05rem);
  color: #334155;
  font-weight: 500;
  animation: textRevealUp 0.85s ease-out 0.15s both, subtitleWave 2.8s ease-in-out 0.85s infinite;
}

.mover-loader-fade-leave-active {
  transition: opacity 0.35s ease;
}

.mover-loader-fade-leave-to {
  opacity: 0;
}

@keyframes loaderMediaFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-6px) scale(1.03);
  }
}

@keyframes textRevealUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

@keyframes subtitleWave {
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.6;
  }
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

@media (max-width: 576px) {
  .mover-float-wrapper {
    position: fixed;
    top: max(12px, env(safe-area-inset-top));
    right: max(12px, env(safe-area-inset-right));
    bottom: auto;
    z-index: 9999;
  }

  .mover-float-wrapper--open {
    transform: none !important;
  }

  .mover-launcher {
    width: 54px;
    height: 54px;
    font-size: 1.35rem;
  }

  .mover-launcher--hidden-mobile {
    display: none !important;
  }

  .mover-bubble {
    top: 64px;
    bottom: auto;
    right: 0;
    max-width: min(240px, calc(100vw - 24px));
    border-radius: 18px 4px 18px 18px;
    white-space: normal;
  }

  .mover-bubble::after {
    top: -7px;
    bottom: auto;
    right: 20px;
    border-right: none;
    border-bottom: none;
    border-left: 1px solid rgba(13, 110, 253, 0.16);
    border-top: 1px solid rgba(13, 110, 253, 0.16);
    border-bottom-right-radius: 0;
    border-top-left-radius: 3px;
  }

  .mover-panel {
    position: fixed;
    top: max(10px, env(safe-area-inset-top));
    right: max(10px, env(safe-area-inset-right));
    bottom: max(10px, env(safe-area-inset-bottom));
    left: max(10px, env(safe-area-inset-left));
    width: auto;
    height: auto;
    max-width: none;
    max-height: none;
    border-radius: 16px !important;
    z-index: 2147483647;
    transform: none !important;
  }
}
</style>