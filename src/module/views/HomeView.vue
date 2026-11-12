<template>
  <div class="mover-view-container w-100 overflow-hidden">
    <!-- Navbar específica da Home -->
    <MoverNavbar />

    <!-- Banner Principal com Cantos Arredondados e Card Flutuante -->
   
      
    <div id="demonstracao">
      <MoverBanner />
    </div>
  
    <MoverVideoApresentation />
    
    <!-- Demais seções... -->
    <div id="solucoes">
      <MoverSolutions />
    </div>
    <MoverAbout />

    <div id="blog">
      <MoverBlog />
    </div>

    <!--<MoverAbout />
    <MoverCuriosidades />
    
    <div id="blog">
      <MoverBlog />
    </div>
    
    <MoverBanner2 />
    <MoverProvaSocial />
    <MoverFAQ />
    
     Footer CTA específico da Home-->
    <MoverFooterCTA />
    
    <MoverCopyright />
  </div>
</template>

<script setup>
// Importações da Navbar e do Rodapé que foram trazidas do App.vue
import MoverNavbar from '@/shared/components/MoverNavbar.vue'
import MoverFooterCTA from '@/shared/components/MoverFooterCTA.vue'

// Importações dos componentes da Home
import MoverBanner from '../components/MoverBanner.vue'
import MoverSolutions from '../components/MoverSolutions.vue'
import MoverAbout from '../components/MoverAbout.vue'
import MoverCuriosidades from '../components/MoverCuriosidades.vue'
import MoverBlog from '../components/MoverBlog.vue'
import MoverBanner2 from '../components/MoverBanner2.vue'
import MoverProvaSocial from '../components/MoverProvaSocial.vue'
import MoverFAQ from '../components/MoverFAQ.vue'
import MoverCopyright from '../components/MoverCopyright.vue'
import MoverVideoApresentation from '../components/MoverVideoApresentation.vue'
</script>