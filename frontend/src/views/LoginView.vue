<template>
  <div class="auth-container">
    <div class="card auth-card">
      <h2 class="text-center mb-4">隱私告解室</h2>
      <p class="text-center text-muted mb-6">登入以開始您的匿名旅程</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">用戶名</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="form-input" 
            required
            placeholder="請輸入您的用戶名"
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
            placeholder="請輸入您的密碼"
          />
        </div>

        <div v-if="error" class="error-msg text-center mb-4">{{ error }}</div>

        <button type="submit" class="btn btn-primary w-full" :disabled="loading">
          {{ loading ? '登入中...' : '登入' }}
        </button>

        <p class="text-center mt-4 text-sm">
          還沒有帳號？ <router-link to="/register" class="text-primary hover:underline">立即註冊</router-link>
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
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    const response = await authService.login({
      username: username.value,
      password: password.value
    });

    const { token, user } = response.data.data ? response.data : {token: response.data.token, user: response.data.user}; // Adjust based on actual API response structure
    
    // Check structure from our backend: 
    // res.status(200).json({ status: 'success', token, data: { user: ... } });
    // So response.data is the JSON object. 
    // Token is response.data.token
    
    const actualToken = response.data.token;
    const actualUser = response.data.data.user;

    localStorage.setItem('token', actualToken);
    localStorage.setItem('user', JSON.stringify(actualUser));

    // Redirect to dashboard (to be implemented)
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || '登入失敗，請稍後再試';
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
