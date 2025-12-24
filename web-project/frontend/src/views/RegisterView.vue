<template>
  <div class="auth-container">
    <div class="card auth-card">
      <h2 class="text-center mb-4">註冊帳號</h2>
      <p class="text-center text-muted mb-6">加入隱私告解室</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label class="form-label" for="username">用戶名</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="form-input" 
            required
            minlength="3"
            placeholder="請設定您的用戶名 (至少3字)"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">密碼</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="form-input" 
            required
            minlength="6"
            placeholder="請設定您的密碼 (至少6字)"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="confirmPassword">確認密碼</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            class="form-input" 
            required
            placeholder="請再次輸入密碼"
          />
        </div>

        <div v-if="error" class="error-msg text-center mb-4">{{ error }}</div>

        <button type="submit" class="btn btn-primary w-full" :disabled="loading">
          {{ loading ? '註冊中...' : '註冊' }}
        </button>

        <p class="text-center mt-4 text-sm">
          已有帳號？ <router-link to="/login" class="text-primary hover:underline">登入</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);

const handleRegister = async () => {
  error.value = '';
  
  if (password.value !== confirmPassword.value) {
    error.value = '兩次輸入的密碼不一致';
    return;
  }

  loading.value = true;

  try {
    const response = await authService.register({
      username: username.value,
      password: password.value
    });

    // Auto login after register (store token)
    const actualToken = response.data.token;
    const actualUser = response.data.data.user;

    localStorage.setItem('token', actualToken);
    localStorage.setItem('user', JSON.stringify(actualUser));

    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || '註冊失敗，請稍後再試';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.text-center { text-align: center; }
.text-muted { color: var(--text-muted); }
.text-primary { color: var(--primary-color); }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.w-full { width: 100%; }
.text-sm { font-size: 0.875rem; }
.hover\:underline:hover { text-decoration: underline; }
</style>
