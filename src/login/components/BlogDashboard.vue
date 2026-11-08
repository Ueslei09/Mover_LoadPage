<!-- src/login/components/BlogDashboard.vue -->
<template>
  <div class="blog-container py-3">
    <!-- Cabeçalho -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="section-title">Manutenção de Blog</h3>
        <span class="text-muted" style="font-size: 12px;">Gerencie os artigos, textos e imagens exibidos no site</span>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="posts-count-badge">Total: {{ posts.length }}</span>
        <button @click="openModal()" class="btn-action-custom">
          <i class="bi bi-plus-lg me-1"></i> Novo Artigo
        </button>
      </div>
    </div>

    <!-- Erros -->
    <div v-if="errorMessage" class="alert-custom-error mb-4">{{ errorMessage }}</div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <p style="color: #0b2545; font-weight: 600;">A carregar artigos do blog...</p>
    </div>

    <!-- Grelha de Cards do Blog -->
    <div class="row g-4" v-else>
      <div v-for="post in posts" :key="post.id" class="col-12 col-md-6 col-lg-4">
        <div class="lead-card">
          
          <!-- Imagem do Card -->
          <div class="blog-img-container mb-3" v-if="post.media_url">
            <img :src="post.media_url" :alt="post.media_alt || post.title" class="blog-thumbnail" />
            <span class="badge-origem">{{ post.author || 'Mover SaaS' }}</span>
          </div>

          <!-- Conteúdo -->
          <div class="mb-3">
            <span class="lead-date">{{ post.date || new Date(post.created_at).toLocaleDateString() }}</span>
            <h5 class="lead-name mt-1 mb-2">{{ post.title }}</h5>
            <p class="blog-snippet text-muted">{{ post.paragraphs || 'Sem conteúdo descritivo...' }}</p>
          </div>

          <!-- Ações (Editar e Remover) -->
          <div class="d-flex justify-content-end gap-2 pt-3 border-top">
            <button @click="openModal(post)" class="btn-edit-custom">
              <i class="bi bi-pencil-fill"></i> Alterar
            </button>
            <button @click="removePost(post.id)" class="btn-delete-custom">
              <i class="bi bi-trash-fill"></i> Remover
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL DE ADICIONAR / ALTERAR -->
    <div v-if="showModal" class="modal-backdrop-custom">
      <div class="modal-card-custom">
        <h4 class="modal-title mb-3">{{ editingId ? 'Alterar Artigo' : 'Adicionar Novo Artigo' }}</h4>
        
        <form @submit.prevent="savePost">
          <div class="mb-2">
            <label class="form-label-custom">Título do Artigo:</label>
            <input v-model="form.title" type="text" class="form-select-custom" required placeholder="Ex: Como otimizar seu ERP" />
          </div>

          <div class="row">
            <div class="col-md-6 mb-2">
              <label class="form-label-custom">Autor:</label>
              <input v-model="form.author" type="text" class="form-select-custom" placeholder="Nome do autor" />
            </div>
            <div class="col-md-6 mb-2">
              <label class="form-label-custom">Data / Slug:</label>
              <input v-model="form.date" type="text" class="form-select-custom" placeholder="Ex: 07/11/2026" />
            </div>
          </div>

          <!-- Regra de Negócio: Escolha entre URL ou Imagem do Computador -->
          <div class="mb-3">
            <label class="form-label-custom">Método da Imagem (Mídia):</label>
            <div class="d-flex gap-3 mb-2">
              <label class="d-flex align-items-center gap-1" style="font-size: 12px; cursor: pointer; color: #0b2545; font-weight: 600;">
                <input type="radio" v-model="imageInputType" value="url" /> Inserir URL
              </label>
              <label class="d-flex align-items-center gap-1" style="font-size: 12px; cursor: pointer; color: #0b2545; font-weight: 600;">
                <input type="radio" v-model="imageInputType" value="file" /> Enviar do Computador
              </label>
            </div>

            <!-- Opção A: Campo de Texto para URL -->
            <div v-if="imageInputType === 'url'">
              <input 
                v-model="form.media_url" 
                type="text" 
                class="form-select-custom" 
                placeholder="https://exemplo.com/imagem.png" 
              />
            </div>

            <!-- Opção B: Input de Ficheiro do PC -->
            <div v-else>
              <input 
                type="file" 
                @change="handleFileChange" 
                class="form-select-custom" 
                accept="image/*" 
              />
            </div>

            <!-- Pré-visualização da imagem -->
            <div v-if="form.media_url" class="mt-2 text-center p-2 bg-light rounded border">
              <img :src="form.media_url" alt="Pré-visualização" style="max-height: 90px; border-radius: 6px; object-fit: cover;" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label-custom">Texto / Parágrafos:</label>
            <textarea v-model="form.paragraphs" class="form-textarea-custom" rows="3" placeholder="Escreva o conteúdo do artigo..."></textarea>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button type="button" @click="closeModal" class="btn-cancel-custom">Cancelar</button>
            <button type="submit" class="btn-action-custom">Salvar Artigo</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBlog } from '../composable/useBlog';

const {
  posts,
  loading,
  errorMessage,
  showModal,
  editingId,
  form,
  imageInputType,
  fetchPosts,
  openModal,
  closeModal,
  savePost,
  removePost,
  handleFileChange
} = useBlog();

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.section-title {
  color: #0b2545;
  font-weight: 700;
  font-size: 20px;
  margin: 0;
}

.posts-count-badge {
  background-color: #0b2545;
  color: white;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.lead-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
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

.blog-img-container {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  background: #f1f5f9;
}

.blog-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-origem {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(11, 37, 69, 0.85);
  color: white;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
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

.blog-snippet {
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.form-label-custom {
  font-size: 11px;
  color: #0b2545;
  font-weight: 700;
  margin-bottom: 3px;
  display: block;
  text-transform: uppercase;
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
}

.btn-action-custom {
  background-color: #0b2545;
  color: white;
  border: 1px solid #0b2545;
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-action-custom:hover {
  background-color: #ffffff;
  color: #0b2545;
}

.btn-edit-custom {
  background-color: #f1f5f9;
  color: #0b2545;
  border: 1px solid #cbd5e0;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete-custom {
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel-custom {
  background-color: #e2e8f0;
  color: #334155;
  border: none;
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 37, 69, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-card-custom {
  background: white;
  padding: 25px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.modal-title {
  color: #0b2545;
  font-weight: 700;
  font-size: 18px;
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