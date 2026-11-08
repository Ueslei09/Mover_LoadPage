<!-- src/modules/mover/views/admin/InstagramPostView.vue -->
<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-12">
        <h2 class="fw-bold" style="color: #0b2545;">Criador de Posts para o Instagram</h2>
        <p class="text-muted small">Personalize o estilo de fundo, posicione os elementos e descarregue o seu criativo.</p>
      </div>
    </div>

    <div class="row g-4">
      <!-- FORMULÁRIO -->
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="mb-3">
            <label class="form-label small fw-semibold" style="color: #0b2545;">Formato do Post</label>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="feed" value="feed" v-model="formato" />
                <label class="form-check-label fw-medium small" for="feed">Feed (1:1)</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="stories" value="stories" v-model="formato" />
                <label class="form-check-label fw-medium small" for="stories">Stories (9:16)</label>
              </div>
            </div>
          </div>

          <!-- SELETOR DAS 3 OPÇÕES DE ESTILO DE FUNDO -->
          <div class="mb-3">
            <label class="form-label small fw-semibold" style="color: #0b2545;">Estilo de Fundo (Overlay / Degradê)</label>
            <select v-model="estiloOverlay" class="form-select rounded-pill px-3 py-2 small">
              <option value="degrade">Degradê Inferior (Recomendado - Foto nítida em cima)</option>
              <option value="completo">Overlay Completo Suave</option>
              <option value="nenhum">Sem Overlay / Sem Degradê (Imagem Limpa)</option>
            </select>
          </div>

          <!-- CHECKBOXES DE TEXTO E LOGO -->
          <div class="mb-3 d-flex gap-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="checkTexto" v-model="comTexto" />
              <label class="form-check-label fw-semibold small" for="checkTexto" style="color: #0b2545;">
                Exibir Texto
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="checkLogo" v-model="comLogo" />
              <label class="form-check-label fw-semibold small" for="checkLogo" style="color: #0b2545;">
                Exibir Logo no Post
              </label>
            </div>
          </div>

          <!-- Controlos de Tamanho, Fonte e Descrição (Apenas se comTexto estiver ativo) -->
          <div v-if="comTexto">
            <div class="row mb-3">
              <div class="col-6">
                <label class="form-label small fw-semibold" style="color: #0b2545;">Tamanho da Letra</label>
                <input type="range" class="form-range" min="20" max="70" v-model.number="fontSize" />
              </div>
              <div class="col-6">
                <label class="form-label small fw-semibold" style="color: #0b2545;">Estilo da Fonte</label>
                <select v-model="fontFamily" class="form-select rounded-pill px-3 py-2 small">
                  <option value="Arial">Arial</option>
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                  <option value="Georgia, serif">Georgia</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-semibold" style="color: #0b2545;">Texto / Descrição (Pressione Enter para quebrar a linha antes da borda tracejada)</label>
              <textarea v-model="descricao" class="form-control rounded-4 p-3" rows="3" placeholder="Digite o texto do post..."></textarea>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-semibold" style="color: #0b2545;">Imagem de Fundo</label>
            <input type="file" class="form-control rounded-pill px-3 py-2" accept="image/*" @change="carregarImagem" />
          </div>

          <div class="mb-3" v-if="comLogo">
            <label class="form-label small fw-semibold" style="color: #0b2545;">Logo Personalizada (Opcional)</label>
            <input type="file" class="form-control rounded-pill px-3 py-2" accept="image/*" @change="carregarLogo" />
          </div>

          <button @click="baixarCriativo" class="btn w-100 py-2 rounded-pill fw-semibold text-white shadow-sm btn-mover" :disabled="!imagemSrc">
            <i class="bi bi-download me-2"></i> Baixar Criativo Pronto
          </button>
        </div>
      </div>

      <!-- PRÉ-VISUALIZAÇÃO INTERATIVA -->
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column align-items-center justify-content-center text-center">
          <h5 class="fw-bold mb-2" style="color: #0b2545;">Pré-visualização (Arraste o texto e a logo)</h5>
          <small class="text-muted mb-2">A linha tracejada indica o limite útil. Pressione Enter para ir para a linha de baixo.</small>
          
          <div v-if="imagemSrc" id="preview-area" class="preview-box position-relative rounded-4 overflow-hidden shadow select-none" :class="formato === 'feed' ? 'box-feed' : 'box-stories'">
            
            <img :src="imagemSrc" class="w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt="Fundo" />
            
            <!-- APLICAÇÃO VISUAL DOS ESTILOS NO PREVIEW -->
            <div v-if="estiloOverlay === 'completo'" class="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" style="background-color: rgba(11, 37, 69, 0.35);"></div>
            <div v-if="estiloOverlay === 'degrade'" class="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" style="background: linear-gradient(to bottom, rgba(11,37,69,0) 40%, rgba(11,37,69,0.85) 100%);"></div>

            <!-- TEXTO ARRASTÁVEL COM CAIXA DELIMITADORA TRACEJADA -->
            <div 
              v-if="comTexto"
              class="position-absolute draggable-item text-white p-2 text-limit-box"
              :style="{ 
                left: textPos.x + 'px', 
                top: textPos.y + 'px', 
                fontSize: fontSize + 'px', 
                fontFamily: fontFamily, 
                cursor: 'grab',
                lineHeight: '1.2'
              }"
              @mousedown="startDragText"
              @touchstart="startDragText"
            >
              <h5 class="fw-bold m-0 text-shadow" style="white-space: pre-line; word-break: break-word; font-size: inherit; font-family: inherit;">
                {{ descricao || 'Seu texto aqui...' }}
              </h5>
            </div>

            <!-- LOGO ARRASTÁVEL -->
            <div 
              v-if="comLogo"
              class="position-absolute draggable-item p-1 bg-white rounded shadow-sm"
              :style="{ left: logoPos.x + 'px', top: logoPos.y + 'px', cursor: 'grab' }"
              @mousedown="startDragLogo"
              @touchstart="startDragLogo"
            >
              <img v-if="logoSrc" :src="logoSrc" style="height: 30px; object-fit: contain;" alt="Logo" />
              <span v-else class="fw-bold px-2 py-1 d-block" style="color: #0b2545; font-size: 10px;">MOVER</span>
            </div>

          </div>

          <div v-else class="text-muted small py-5">
            <i class="bi bi-image fs-1 d-block mb-2 text-secondary"></i>
            Carregue uma imagem de fundo para começar.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInstagramPost } from '../composable/useInstagramPost';

const {
  formato,
  descricao,
  imagemSrc,
  logoSrc,
  comLogo,
  comTexto,
  estiloOverlay,
  fontSize,
  fontFamily,
  textPos,
  logoPos,
  carregarImagem,
  carregarLogo,
  startDragText,
  startDragLogo,
  baixarCriativo
} = useInstagramPost();
</script>

<style scoped>
.text-limit-box {
  max-width: 170px; /* Delimita visualmente o espaço útil do texto */
  border: 1px dashed rgba(255, 255, 255, 0.7); /* Guia tracejada para o utilizador */
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.15);
}

.btn-mover {
  background-color: #8bc34a;
  border: none;
  transition: all 0.3s ease;
}
.btn-mover:hover {
  background-color: #7ab23a;
  transform: translateY(-2px);
}
.box-feed {
  width: 260px;
  height: 260px;
}
.box-stories {
  width: 200px;
  height: 355px;
}
.text-shadow {
  text-shadow: 0 2px 6px rgba(0,0,0,0.8);
}
.select-none {
  user-select: none;
}
.draggable-item {
  cursor: grab;
  z-index: 10;
}
.draggable-item:active {
  cursor: grabbing;
}
</style>