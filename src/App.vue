<!-- src/App.vue -->
<template>
  <div id="app" class="w-100 overflow-hidden">
    <!-- Tela de carregamento global (opcional manter aqui se quiser em todo o site) -->
    <InitialLoader :isLoading="isLoading" />

    <!-- Apenas as rotas são renderizadas aqui. Cada View decide se quer Navbar/Footer -->
    <router-view />
  </div>
</template>

<script setup>
import InitialLoader from '@/shared/components/InitialLoader.vue'
import { useInitialLoader } from '@/shared/composables/useInitialLoader'

const { isLoading } = useInitialLoader()
</script>

<style scoped>
</style>