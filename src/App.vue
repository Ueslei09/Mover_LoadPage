<!-- src/App.vue -->
<template>
  <div id="app" class="w-100 overflow-hidden">
    <!-- Tela de carregamento global (opcional manter aqui se quiser em todo o site) -->
    <InitialLoader :isLoading="isLoading" />

    <!-- Apenas as rotas são renderizadas aqui. Cada View decide se quer Navbar/Footer -->
    <router-view v-slot="{ Component }" />
    <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
  <!-- Banner de Cookies Discreto -->
  <CookieBanner />
  </div>
</template>

<script setup>
import InitialLoader from '@/shared/components/InitialLoader.vue'
import { useInitialLoader } from '@/shared/composables/useInitialLoader'
import CookieBanner from '@/shared/components/CookieBanner.vue';

const { isLoading } = useInitialLoader()
</script>

<style scoped>
</style>