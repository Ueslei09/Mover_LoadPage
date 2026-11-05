<!-- src/shared/components/InitialLoader.vue -->
<template>
  <Transition name="fade-loader">
    <div v-if="isLoading" class="loader-overlay d-flex align-items-center justify-content-center">
      <div class="card-loader-container">
        <div class="card-box">
          <div class="loader">
            <p>carregando</p>
            <div class="words">
              <span class="word">sistemas</span>
              <span class="word">reformas</span>
              <span class="word">soluções</span>
              <span class="word">mover</span>
              <span class="word">sistemas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isLoading: Boolean
});
</script>

<style scoped>
.loader-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: #0b2545 !important;
  z-index: 999999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-box {
  --bg-color: #0b2545;
  background-color: var(--bg-color);
  padding: 1.5rem 2.5rem;
  border-radius: 1.25rem;
}

.loader {
  color: #a6b9c7;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 28px;
  box-sizing: content-box;
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.words {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 160px;
}

.words::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--bg-color) 10%,
    transparent 30%,
    transparent 70%,
    var(--bg-color) 90%
  );
  z-index: 20;
  pointer-events: none;
}

.word {
  display: block;
  height: 100%;
  padding-left: 6px;
  color: #8bc34a;
  animation: spin_4991 4s infinite;
}

@keyframes spin_4991 {
  10% { transform: translateY(-102%); }
  25% { transform: translateY(-100%); }
  35% { transform: translateY(-202%); }
  50% { transform: translateY(-200%); }
  60% { transform: translateY(-302%); }
  75% { transform: translateY(-300%); }
  85% { transform: translateY(-402%); }
  100% { transform: translateY(-400%); }
}

.fade-loader-leave-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-loader-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>