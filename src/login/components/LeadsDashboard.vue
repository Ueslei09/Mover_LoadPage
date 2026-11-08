<!-- src/login/components/LeadsDashboard.vue -->
<template>
  <div class="leads-container py-3">
    <!-- Título da Secção -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="section-title">Gestão de Leads & CRM</h3>
      <span class="leads-count-badge">Total: {{ leads.length }}</span>
    </div>

    <!-- Alerta de Erro / Feedback -->
    <div v-if="errorMessage" class="alert-custom-error mb-4">
      {{ errorMessage }}
    </div>

    <!-- Estado a carregar -->
    <div v-if="loading" class="text-center py-5">
      <p style="color: #0b2545; font-weight: 600;">A carregar leads do sistema...</p>
    </div>

    <!-- Grelha de Leads Profissional -->
    <div class="row g-4" v-else>
      <div v-for="lead in leads" :key="lead.id" class="col-12 col-sm-12 col-md-6 col-lg-4">
        <div class="lead-card">
          
          <!-- Cabeçalho do Card -->
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="lead-name mb-1">{{ lead.name }}</h5>
              <span class="lead-date">{{ new Date(lead.created_at).toLocaleDateString() }}</span>
            </div>
            <span class="badge-origem">{{ lead.origem || 'site' }}</span>
          </div>

          <!-- Informações de Contacto -->
          <div class="contact-info mb-3">
            <p class="mb-1"><strong>E-mail:</strong> {{ lead.email }}</p>
            <p class="mb-1"><strong>Telefone:</strong> {{ lead.phone || 'Não informado' }}</p>
            <div class="message-box mt-2">
              <small><strong>Mensagem:</strong> {{ lead.message }}</small>
            </div>
          </div>

          <!-- Secção do CRM -->
          <div class="crm-section pt-3 border-top">
            <div class="mb-2">
              <label class="form-label-custom">Status do CRM:</label>
              <select 
                v-model="lead.status_crm" 
                @change="updateLead(lead, { lido: lead.lido, status_crm: lead.status_crm, motivo_nao_fechou: lead.motivo_nao_fechou })" 
                class="form-select-custom"
              >
                <option value="ainda_nao_liguei">Ainda não liguei</option>
                <option value="entrei_contato">Entrei em contato</option>
                <option value="fechou_contrato">Fechou o contrato</option>
              </select>
            </div>

            <!-- Observação / Motivo de não fechar (condicional) -->
            <div class="mb-3" v-if="lead.status_crm !== 'fechou_contrato'">
              <label class="form-label-custom">Obs. / Motivo de não fechar:</label>
              <textarea 
                v-model="lead.motivo_nao_fechou" 
                @blur="updateLead(lead, { lido: lead.lido, status_crm: lead.status_crm, motivo_nao_fechou: lead.motivo_nao_fechou })"
                placeholder="Registe o motivo..." 
                class="form-textarea-custom"
                rows="2"
              ></textarea>
            </div>

            <!-- Botão de Ação -->
            <div class="text-end">
              <button @click="toggleLido(lead)" class="btn-action-custom">
                {{ lead.lido ? '✓ Lido' : 'Marcar como Lido' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLeads } from '../composable/useLeads';

const { leads, loading, errorMessage, fetchLeads, updateLead, toggleLido } = useLeads();

onMounted(() => {
  fetchLeads();
});
</script>

<style scoped>
.section-title {
  color: #0b2545;
  font-weight: 700;
  font-size: 20px;
  margin: 0;
}

.leads-count-badge {
  background-color: #0b2545;
  color: white;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

/* --- CARD CORPORATIVO (Sombra limpa à direita e em baixo, sem barra esquerda) --- */
.lead-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 22px;
  border: none;
  box-shadow: 12px 14px 30px rgba(11, 37, 69, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.lead-card:hover {
  transform: translateY(-2px);
  box-shadow: 16px 18px 35px rgba(11, 37, 69, 0.12);
}

.lead-name {
  color: #0b2545;
  font-weight: 700;
  font-size: 16px;
}

.lead-date {
  font-size: 11px;
  color: #64748b;
}

.badge-origem {
  background-color: #f1f5f9;
  color: #0b2545;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid #e2e8f0;
}

.contact-info {
  font-size: 13px;
  color: #0b2545;
  opacity: 0.9;
}

.message-box {
  background: #f8fafc;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  color: #0b2545;
}

.form-label-custom {
  font-size: 11px;
  color: #0b2545;
  font-weight: 700;
  margin-bottom: 3px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-select-custom, .form-textarea-custom {
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 12px;
  color: #0b2545;
  background-color: #f8fafc;
  outline: none;
  transition: all 0.2s;
}

.form-select-custom:focus, .form-textarea-custom:focus {
  border-color: #0b2545;
  box-shadow: 0 0 0 3px rgba(11, 37, 69, 0.1);
}

/* --- BOTÃO DE AÇÃO: Azul (#0b2545) -> Hover: Branco com letra preta --- */
.btn-action-custom {
  background-color: #0b2545;
  color: white;
  border: 1px solid #0b2545;
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: none !important;
  transition: all 0.3s ease;
}

.btn-action-custom:hover {
  background-color: #ffffff;
  color: #0b2545;
  border-color: #0b2545;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(11, 37, 69, 0.15);
}

.btn-action-custom:active {
  transform: translateY(0);
}

.alert-custom-error {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
</style>