

<template>
 <div id="app" class="w-100 overflow-hidden">

  <!-- TELA DE CARREGAMENTO INICIAL -->
    <InitialLoader :isLoading="isLoading" />

    <!-- Navbar Global Partilhada -->
    <MoverNavbar />


    <!-- Onde as rotas/views da aplicação são renderizadas dinamicamente -->
    <router-view />
    
    <MoverFooterCTA />
  </div>
</template>
<script setup>
import InitialLoader from '@/shared/components/InitialLoader.vue'
import MoverNavbar from '@/shared/components/MoverNavbar.vue'
import MoverFooterCTA from '@/shared/components/MoverFooterCTA.vue'
import { useInitialLoader } from '@/shared/composables/useInitialLoader'

const { isLoading } = useInitialLoader()

</script>
  


<style scoped>

</style>
