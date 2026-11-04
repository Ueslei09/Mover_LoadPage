<template>
  <div class="mover-view-container w-100 overflow-hidden">
    <!-- Banner Principal com Cantos Arredondados e Card Flutuante -->
    <MoverBanner />
   
    
    <!-- Demais seções... -->
     <MoverSolutions />
  </div>
</template>

<script setup>
import MoverBanner from '../components/MoverBanner.vue'
import MoverSolutions from '../components/MoverSolutions.vue'

</script>