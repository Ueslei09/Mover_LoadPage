// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MoverView from '../module/views/HomeView.vue'
import MoverPaginaBlog1 from '../module/views/MoverPaginaBlog1.vue'
import LoginView from '../login/views/LoginView.vue'
import PasswordRecoveryView from '../login/components/PasswordRecoveryView.vue'

// Importar o Layout e os componentes administrativos
import AdminLayout from '../login/components/AdminLayout.vue'
import LeadsDashboard from '../login/components/LeadsDashboard.vue'
import BlogDashboard from '../login/components/BlogDashboard.vue'
import AdminUsersView from '../login/components/AdminUsersView.vue'
import AdminInstragamView from '../login/components/InstagramPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MoverView
    },
    {
      path: '/blog/:slug',
      name: 'MoverPaginaBlog1',
      component: MoverPaginaBlog1
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/recuperar-senha', // <-- Rota pública de recuperação de senha por OTP
      name: 'RecuperarSenha',
      component: PasswordRecoveryView
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true }, // Protegido por JWT
      children: [
        {
          path: 'leads',
          name: 'AdminLeads',
          component: LeadsDashboard
        },
        {
          path: 'blog',
          name: 'AdminBlog',
          component: BlogDashboard // <-- Rota do Blog registada com sucesso!
        },
        {
          path: 'usuarios', // <--- NOVA ROTA REGISTRADA NO PAINEL ADMIN
          name: 'AdminUsers',
          component: AdminUsersView
        },
        {
  path: 'instagram',
  name: 'AdminInstagram',
  component: AdminInstragamView
      },
        {
          path: '',
          redirect: '/admin/leads'
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Se a rota tiver uma âncora (ex: /#blog), faz scroll suave até ao elemento
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    // Caso contrário, vai para o topo normalmente
    return { top: 0 };
  }

})



// Guarda de navegação moderna (sem o next)
router.beforeEach((to) => {
  const token = localStorage.getItem('mover_token');
  
  if (to.meta.requiresAuth && !token) {
    return '/login';
  }
  
  return true;
});

export default router;