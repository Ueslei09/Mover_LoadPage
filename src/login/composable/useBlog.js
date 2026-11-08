// src/login/composable/useBlog.js
import { ref } from 'vue';
import { blogService } from '../services/blogService';

export function useBlog() {
  const posts = ref([]);
  const loading = ref(false);
  const errorMessage = ref('');

  const showModal = ref(false);
  const editingId = ref(null);
  
  // Controlo do tipo de entrada de imagem ('url' ou 'file')
  const imageInputType = ref('url');

  const form = ref({
    title: '',
    author: '',
    date: new Date().toLocaleDateString(),
    media_url: '',
    paragraphs: ''
  });

  const fetchPosts = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
      posts.value = await blogService.fetchPosts();
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Função para lidar com o ficheiro vindo do PC (converte para Base64)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.value.media_url = e.target.result; // Atribui o resultado ao media_url guardado no form
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (post = null) => {
    if (post) {
      editingId.value = post.id;
      form.value = { ...post };
      // Se o post já tiver uma imagem em Base64 ou URL, define o tipo padrão como url
      imageInputType.value = 'url';
    } else {
      editingId.value = null;
      imageInputType.value = 'url';
      form.value = { 
        title: '', 
        author: '', 
        date: new Date().toLocaleDateString(), 
        media_url: '', 
        paragraphs: '' 
      };
    }
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const savePost = async () => {
    try {
      if (editingId.value) {
        await blogService.updatePost(editingId.value, form.value);
      } else {
        await blogService.createPost(form.value);
      }
      await fetchPosts();
      closeModal();
    } catch (err) {
      errorMessage.value = err.message;
      throw err;
    }
  };

  const removePost = async (id) => {
    if (!confirm('Tem certeza que deseja remover este card do blog?')) return;
    try {
      await blogService.deletePost(id);
      await fetchPosts();
    } catch (err) {
      errorMessage.value = err.message;
    }
  };

  return {
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
  };
}