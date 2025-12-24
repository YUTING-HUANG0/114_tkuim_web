<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="container header-content">
        <h1>隱私告解室</h1>
        <div class="user-info">
          <span>Hello, {{ username }}</span>
          <button @click="logout" class="btn btn-sm btn-outline">登出</button>
        </div>
      </div>
    </header>
    
    <main class="container main-content">
      <div class="card p-5 text-center">
        <h2>歡迎來到告解室</h2>
        <p class="mt-2 text-muted">目前功能正在開發中...</p>
        <div class="mt-4">
           <!-- Temporary placeholders for next day's tasks -->
           <button class="btn btn-primary m-2">我要告解</button>
           <button class="btn btn-secondary m-2">聆聽秘密</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('User');

onMounted(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      username.value = user.username;
    } catch (e) {
      console.error('Failed to parse user data');
    }
  }
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
.header {
  background: var(--white);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  padding-top: 2rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-outline {
  border: 1px solid #e2e8f0;
  background: transparent;
}

.btn-outline:hover {
  background: #f1f5f9;
}

.btn-secondary {
  background-color: #64748b;
  color: white;
}

.m-2 { margin: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.text-muted { color: var(--text-muted); }
</style>
