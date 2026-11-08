import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

export function useAuth() {
  const email = ref('')
  const senha = ref('') 
  const loading = ref(false)
  const errorMessage = ref('')
  const router = useRouter()

  const handleLogin = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
      // Envia explicitamente as chaves 'email' e 'senha' que o backend espera
      await authService.login(email.value, senha.value)
      
      // APONTE DIRETAMENTE PARA /admin/leads
      router.push('/admin/leads')
      
    } catch (err) {
      errorMessage.value = err.message || 'Erro ao efetuar login.'
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    senha,
    loading,
    errorMessage,
    handleLogin
  }
}