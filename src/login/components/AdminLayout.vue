<!-- src/login/components/AdminLayout.vue -->
<template>
  <div class="admin-layout-wrapper">
    <!-- SIDEBAR LATERAL FIXA -->
    <aside class="admin-sidebar">
      <div class="sidebar-brand text-center pt-4 pb-2">
        <div v-if="logo" class="logo-container">
          <img :src="logo.url" :alt="logo.alt" class="mover-logo" />
        </div>
        <span class="brand-subtitle">Painel Administrativo</span>
      </div>

      <nav class="sidebar-nav mt-3">
        <span class="nav-category">MENU PRINCIPAL</span>
        
        <router-link to="/admin/leads" class="sidebar-link" active-class="active">
          <i class="bi bi-people-fill me-2"></i> <span>CRM de Leads</span>
        </router-link>

        <router-link to="/admin/blog" class="sidebar-link" active-class="active">
          <i class="bi bi-file-text-fill me-2"></i> <span>Manutenção de Blog</span>
        </router-link>

        <!-- NOVO: Link para a Gestão de Utilizadores -->
  <router-link to="/admin/usuarios" class="sidebar-link" active-class="active">
    <i class="bi bi-shield-lock-fill me-2"></i> <span>Utilizadores</span>
  </router-link>
       <!-- NOVO: Link para a Gestão de Posts do Instagram -->
  <router-link to="/admin/instagram" class="sidebar-link" active-class="active">
  <i class="bi bi-instagram me-2"></i> <span>Posts Instagram</span>
</router-link>
      </nav>

      <div class="sidebar-footer p-3">
        <button @click="logout" class="btn-logout" title="Sair do Sistema">
          <i class="bi bi-box-arrow-left me-2"></i> <span>Sair do Sistema</span>
        </button>
      </div>
    </aside>

    <!-- CONTEÚDO PRINCIPAL À DIREITA -->
    <main class="admin-main-content">
      <header class="admin-topbar d-flex justify-content-between align-items-center px-4 py-3 mb-4">
        <h5 class="m-0" style="color: #0b2545; font-weight: 700;">Gestão Operacional</h5>
        <span class="badge-role">Administrador</span>
      </header>

      <div class="container-fluid px-4 pb-4">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useLogo } from '../composable/useLogo';

const { logo } = useLogo();

const logout = () => {
  localStorage.removeItem('mover_token');
  window.location.href = '/login';
};
</script>

<style scoped>
.admin-layout-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #e8e9eb;
  font-family: 'Poppins', sans-serif;
}

.admin-sidebar {
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #cbd5e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(11, 37, 69, 0.04);
  transition: width 0.3s ease;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}

.mover-logo {
  max-height: 38px;
  width: auto;
}

.brand-subtitle {
  color: #64748b;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-category {
  font-size: 10px;
  color: #94a3b8;
  padding: 0 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  margin-top: -350px !important;
  gap: 4px;
  padding: 0 12px;
  /* Removido o -300px que empurrava o menu para cima do logo */
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  color: #0b2545;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.sidebar-link:hover {
  background-color: #a6b9c7;
  color: #0b2545;
}

.sidebar-link.active {
  background-color: #0b2545;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(11, 37, 69, 0.2);
}

.btn-logout {
  width: 100%;
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background-color: #fecaca;
}

.admin-main-content {
  margin-left: 260px;
  flex-grow: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.admin-topbar {
  background-color: #ffffff;
  border-bottom: 1px solid #cbd5e0;
  box-shadow: 0 2px 10px rgba(11, 37, 69, 0.03);
}

.badge-role {
  background-color: #8bc34a;
  color: white;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

/* --- RESPONSIVIDADE MOBILE (Dispositivos menores que 768px) --- */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 75px;
  }

  .admin-sidebar .brand-subtitle,
  .admin-sidebar .nav-category,
  .logo-container,
  .sidebar-link span,
  .btn-logout span {
    display: none;
  }

  .sidebar-link {
    justify-content: center;
    padding: 14px 0;
  }

  .sidebar-link i {
    margin: 0 !important;
    font-size: 20px;
  }

  .btn-logout {
    padding: 12px 0;
    display: flex;
    justify-content: center;
  }

  .btn-logout i {
    margin: 0 !important;
    font-size: 18px;
  }

  .admin-main-content {
    margin-left: 75px;
  }
}
</style>