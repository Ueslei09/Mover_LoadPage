<!-- src/shared/components/MoverDemoModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="demo-modal-backdrop d-flex align-items-center justify-content-center" @click.self="close">
        <div class="demo-modal-container position-relative p-4 p-md-5 w-100 mx-3">
          
          <!-- Botão de Fechar -->
          <button class="btn-close-custom position-absolute top-0 end-0 m-4" @click="close" aria-label="Fechar">
            <i class="bi bi-x-lg"></i>
          </button>

          <!-- TOPO: Logo e Linha Divisória Verde de 2px -->
          <div class="text-center mb-4">
            <img :src="data?.logoSrc" :alt="data?.logoAlt" class="modal-logo mb-3" />
            <hr class="modal-divider mx-auto" />
          </div>

          <!-- FORMULÁRIO -->
          <form @submit="onSubmit" class="row g-3">
            <template v-for="field in data?.fields" :key="field.id">
              <div :class="field.col">
                <label :for="field.id" class="form-label fw-semibold text-custom-dark">{{ field.label }}</label>
                
                <select v-if="field.type === 'select'" :id="field.id" v-model="form[field.id]" class="form-select custom-input">
                  <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>

                <textarea v-else-if="field.type === 'textarea'" :id="field.id" v-model="form[field.id]" class="form-control custom-input" rows="3" :placeholder="field.placeholder"></textarea>

                <input v-else :type="field.type" :id="field.id" v-model="form[field.id]" class="form-control custom-input" :placeholder="field.placeholder" />
              </div>
            </template>

            <!-- Termos e Consentimentos -->
            <div class="col-12 mt-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="concordo1" v-model="form.concordo1" required />
                <label class="form-check-label text-muted small" for="concordo1">
                  {{ data?.consentText1 }}
                </label>
              </div>
              <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" id="concordo2" v-model="form.concordo2" required />
                <label class="form-check-label text-muted small" for="concordo2">
                  {{ data?.consentText2 }}
                </label>
              </div>
            </div>

            <!-- Botão de Envio Customizado -->
            <div class="col-12 mt-4 text-center">
              <button type="submit" class="btn btn-submit-custom w-100 py-3 fw-semibold text-white rounded-pill shadow-sm">
                {{ data?.submitButtonText }}
              </button>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  data: Object,
  form: Object,
  close: Function,
  onSubmit: Function
});
</script>

<style scoped>
.demo-modal-backdrop {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: rgba(11, 37, 69, 0.65) !important;
  z-index: 99999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease;
}

.demo-modal-container {
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #e8e9eb !important;
  border-radius: 28px !important;
  box-shadow: 25px 0px 40px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(11, 37, 69, 0.08);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

/* ESTADOS DE TRANSIÇÃO (ENTRADA E SAÍDA COM PARALAXE) */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .demo-modal-container,
.modal-fade-leave-to .demo-modal-container {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.modal-fade-enter-active .demo-modal-container,
.modal-fade-leave-active .demo-modal-container {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.modal-divider {
  width: 100%;
  height: 2px !important;
  background-color: #8bc34a !important;
  border: none;
  opacity: 1;
}

.text-custom-dark {
  color: #0b2545 !important;
  font-size: 0.9rem;
}

.custom-input {
  background-color: #ffffff;
  border: 1px solid rgba(11, 37, 69, 0.15);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #0b2545;
}

.custom-input:focus {
  border-color: #8bc34a;
  box-shadow: 0 0 0 0.2rem rgba(139, 195, 74, 0.25);
}

.btn-close-custom {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #0b2545;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-close-custom:hover {
  transform: scale(1.1);
}

.btn-submit-custom {
  background-color: #0b2545 !important;
  border: none;
  transition: all 0.3s ease;
}

.btn-submit-custom:hover {
  background-color: #8bc34a !important;
  color: #0b2545 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(11, 37, 69, 0.25);
}
</style>