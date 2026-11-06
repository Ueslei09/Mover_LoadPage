<template>
  <div class="mover-view-container w-100 overflow-hidden">
    <!-- Banner Principal com Cantos Arredondados e Card Flutuante -->
    <MoverBanner />
    
    
    <!-- Demais seções... -->
     <div id="solucoes">
     <MoverSolutions />
     </div>

     <MoverAbout />
     <MoverCuriosidades />
     <div id="blog">
     <MoverBlog />
      </div>
      <MoverBanner2 />
      <MoverProvaSocial />
      <MoverFAQ />
      <MoverCopyright />
  </div>
</template>

<script setup>
import MoverBanner from '../components/MoverBanner.vue'
import MoverSolutions from '../components/MoverSolutions.vue'
import MoverAbout from '../components/MoverAbout.vue'
import MoverCuriosidades from '../components/MoverCuriosidades.vue'
import MoverBlog from '../components/MoverBlog.vue'
import MoverBanner2 from '../components/MoverBanner2.vue'
import MoverProvaSocial from '../components/MoverProvaSocial.vue'
import MoverFAQ from '../components/MoverFAQ.vue'
import MoverCopyright from '../components/MoverCopyright.vue'

</script>