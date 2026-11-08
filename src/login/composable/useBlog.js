// src/login/composable/useBlog.js
import { ref } from 'vue';
import { blogService } from '../services/blogService';

export function useBlog() {
  const posts = ref([]);
  const loading = ref(false);
  const errorMessage = ref('');

  // Estados do Modal e Formulário
  const showModal = ref(false);
  const editingId = ref(null);
  const form = ref({
    title: '',
    author: '',
    date: '',
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

  const openModal = (post = null) => {
    if (post) {
      editingId.value = post.id;
      form.value = { ...post };
    } else {
      editingId.value = null;
      form.value = { title: '', author: '', date: '', media_url: '', paragraphs: '' };
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
    if (!confirm('Tem certeza que deseja remover este card/post do blog?')) return;
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
    fetchPosts,
    openModal,
    closeModal,
    savePost,
    removePost
  };
}