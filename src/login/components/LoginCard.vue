<template>
  <div class="login-body" ref="elementRef" :class="{ 'card-visible': isVisible }">
    <div class="login-card">
      <!-- Logo vinda do Service -->
      <div class="logo-container" v-if="logo">
        <img :src="logo.url" :alt="logo.alt" class="mover-logo" />
      </div>

      <!-- Título -->
      <div class="login-header">
        <h1 class="login-title">Sign In</h1>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="E-mail" 
            required 
          />
        </div>

        <div class="input-group">
          <input 
            type="password" 
            v-model="senha" 
            placeholder="Password" 
            required 
          />
        </div>

        <div class="forgot-container">
          <a href="#" class="forgot-link">Forgot Password ?</a>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn-signin" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <!-- Divisor Social -->
      <div class="social-section">
        <p class="social-text">Or Sign in with</p>
        <div class="social-icons">
          <a href="#" class="social-icon-btn" title="Google"><i class="bi bi-google"></i></a>
          <a href="#" class="social-icon-btn" title="Apple"><i class="bi bi-apple"></i></a>
          <a href="#" class="social-icon-btn" title="Twitter / X"><i class="bi bi-x"></i></a>
        </div>
      </div>

      <!-- Rodapé / Termos -->
      <div class="footer-agreement">
        <a href="#">Learn user licence agreement</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composable/useAuth';
import { useLogo } from '../composable/useLogo';
import { useParallax } from '@/shared/composables/useParallax';

const { email, senha, loading, errorMessage, handleLogin } = useAuth();
const { logo } = useLogo();
const { isVisible, elementRef } = useParallax(0.05);
</script>

<style scoped>
.login-body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e8e9e9;
  background-image: radial-gradient(circle, #f5f6f6 0%, #dcdede 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;
}

.login-card {
  background: #ffffff;
  width: 100%;
  max-width: 440px;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 15px 20px 40px rgba(0, 0, 0, 0.08), 5px 5px 15px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Quando o container ganha a classe card-visible, o card anima para visível */
.login-body.card-visible .login-card {
  opacity: 1;
  transform: translateY(0);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.mover-logo {
  max-height: 45px;
  width: auto;
}

.login-title {
  color: #0b2545;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 25px;
  letter-spacing: -0.5px;
}

.input-group {
  margin-bottom: 18px;
}

.input-group input {
  width: 100%;
  padding: 14px 18px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #0b2545;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s;
}

.input-group input::placeholder {
  color: #61b329;
  opacity: 0.8;
}

.input-group input:focus {
  border-color: #8bc34a;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(139, 195, 74, 0.15);
}

.forgot-container {
  text-align: left;
  margin-bottom: 20px;
  padding-left: 4px;
}

.forgot-link {
  color: #00b4d8;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #fed7d7;
  color: #9b2c2c;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}

/* --- BOTÃO SIGN IN CORRIGIDO --- */
.btn-signin {
  width: 100%;
  background-color: #8bc34a;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 195, 74, 0.3);
}

.btn-signin:hover {
  background-color: #7cb342; /* Tom mais escuro no hover */
  transform: translateY(-2px); /* Eleva o botão suavemente */
  box-shadow: 0 6px 16px rgba(139, 195, 74, 0.4); /* Sombra mais forte */
}

.btn-signin:active {
  transform: translateY(0);
}

.social-section {
  margin-top: 25px;
}

.social-text {
  color: #0b2545;
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 500;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* --- BOTÕES SOCIAIS COM SOMBRA E HOVER CORRIGIDOS --- */
.social-icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b2545;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
}

.social-icon-btn:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.06);
}

.footer-agreement {
  margin-top: 25px;
}

.footer-agreement a {
  color: #0b2545;
  font-size: 13px;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.footer-agreement a:hover {
  opacity: 1;
  text-decoration: underline;
}
</style>