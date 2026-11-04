

<template>
 <div id="app" class="w-100 overflow-hidden">
    <!-- Navbar Global Partilhada -->
    <MoverNavbar />


    <!-- Onde as rotas/views da aplicação são renderizadas dinamicamente -->
    <router-view />
    
    <MoverFooterCTA />
  </div>
</template>
<script setup>
import MoverNavbar from '@/shared/components/MoverNavbar.vue'
import MoverFooterCTA from '@/shared/components/MoverFooterCTA.vue'

</script>
  


<style scoped>

</style>
