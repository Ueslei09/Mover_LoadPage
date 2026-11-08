// src/login/composable/useLeads.js
import { ref } from 'vue';
import { leadService } from '../services/leadService';

export function useLeads() {
  const leads = ref([]);
  const loading = ref(false);
  const errorMessage = ref('');

  const fetchLeads = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
      leads.value = await leadService.fetchLeads();
    } catch (err) {
      errorMessage.value = err.message || 'Erro de conexão com o servidor.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateLead = async (lead, updateData) => {
    try {
      await leadService.updateLead(lead.id, updateData);
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
    }
  };

  const toggleLido = async (lead) => {
    lead.lido = !lead.lido;
    await updateLead(lead, {
      lido: lead.lido,
      status_crm: lead.status_crm,
      motivo_nao_fechou: lead.motivo_nao_fechou
    });
  };

  return {
    leads,
    loading,
    errorMessage,
    fetchLeads,
    updateLead,
    toggleLido
  };
}