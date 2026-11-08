<template>
  <div class="admin-wrapper" ref="elementRef" :class="{ 'fade-in': isVisible }">
    <div class="container-fluid py-4 px-4">
      
      <!-- LOGO NO TOPO DA PÁGINA SAAS MOVER -->
      <div class="text-center mb-4" v-if="logo">
        <img :src="logo.url" :alt="logo.alt" class="mover-brand-logo" />
      </div>

      <!-- HEADER DO PAINEL COM ABAS DE NAVEGAÇÃO CORPORATIVA -->
      <div class="dashboard-header-card p-3 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div>
          <h2 class="dashboard-title m-0">Painel Administrativo</h2>
          <span class="dashboard-subtitle">Mover Sistemas • Gestão & CRM</span>
        </div>
        
        <div class="navigation-tabs">
          <button 
            @click="activeTab = 'leads'" 
            :class="['tab-navigation-btn', { active: activeTab === 'leads' }]">
            CRM de Leads
          </button>
          <button 
            @click="activeTab = 'blog'" 
            :class="['tab-navigation-btn', { active: activeTab === 'blog' }]">
            Gestão de Blog
          </button>
        </div>
      </div>

      <!-- CONTEÚDO DINÂMICO DA ABA SELECIONADA -->
      <div class="dashboard-content">
        <div v-if="activeTab === 'leads'">
          <LeadsDashboard />
        </div>
        <div v-if="activeTab === 'blog'">
          <BlogManager />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLogo } from '../composable/useLogo';
import { useParallax } from '@/shared/composables/useParallax';
import LeadsDashboard from '../components/LeadsDashboard.vue';
//import BlogManager from '../components/BlogManager.vue';

const activeTab = ref('leads');
const { logo } = useLogo();
const { isVisible, elementRef } = useParallax(0.05);
</script>

<style scoped>
.admin-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #e8e9eb; /* Cor do body definida */
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  z-index: 100;
  overflow-y: auto;
}

.admin-wrapper.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.mover-brand-logo {
  max-height: 50px;
  width: auto;
  object-fit: contain;
}

/* Cartão de cabeçalho limpo e profissional */
.dashboard-header-card {
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 8px 8px 24px rgba(11, 37, 69, 0.06);
  border-left: 4px solid #8bc34a;
}

.dashboard-title {
  color: #0b2545;
  font-weight: 700;
  font-size: 20px;
}

.dashboard-subtitle {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
}

.navigation-tabs {
  display: inline-flex;
  gap: 8px;
  background: #f1f5f9;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.tab-navigation-btn {
  background-color: transparent;
  color: #0b2545;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-navigation-btn:hover {
  background-color: #a6b9c7;
  color: #0b2545;
}

.tab-navigation-btn.active {
  background-color: #8bc34a;
  color: white;
  box-shadow: 0 3px 10px rgba(139, 195, 74, 0.3);
}
</style>