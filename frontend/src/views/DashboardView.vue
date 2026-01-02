<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="container header-content">
        <h1 class="logo">隱私告解室</h1>
        <div class="user-info">
          <span class="mr-4">Hello, {{ username }}</span>
          <button @click="logout" class="btn btn-sm btn-outline">登出</button>
        </div>
      </div>
    </header>
    
    <main class="container main-content">
      <div class="action-grid">
        <!-- Confess Card -->
        <div class="card action-card">
          <h3>我要告解</h3>
          <p class="text-muted mb-4">說出心中隱藏的秘密，完全匿名。</p>
          <textarea 
            v-model="confessionContent" 
            class="form-input mb-4" 
            rows="4" 
            placeholder="寫下你的秘密..."
            maxlength="500"
          ></textarea>
          <div class="flex justify-between items-center">
            <span class="text-xs text-muted">{{ confessionContent.length }}/500</span>
            <button @click="submitConfession" class="btn btn-primary" :disabled="!confessionContent || loading">
              {{ loading ? '傳送中...' : '發佈秘密' }}
            </button>
          </div>
          <p v-if="message" :class="`mt-2 ${messageType === 'error' ? 'text-danger' : 'text-success'}`">
            {{ message }}
          </p>
        </div>

        <!-- Random Secret Card -->
        <div class="card action-card">
          <h3>聆聽秘密</h3>
          <p class="text-muted mb-4">隨機抽取一則其他人的告解。</p>
          
          <div v-if="randomConfession" class="secret-box mb-4">
            <p>"{{ randomConfession.content }}"</p>
            <small class="text-muted block mt-2">{{ formatDate(randomConfession.createdAt) }}</small>
          </div>
          <div v-else-if="loadingRandom" class="text-center py-4">
             讀取中...
          </div>
          <div v-else class="text-center py-4 text-muted">
            點擊下方按鈕抽取秘密
          </div>

          <button @click="fetchRandomConfession" class="btn btn-secondary w-full">
            {{ randomConfession ? '再抽一個' : '抽取秘密' }}
          </button>
        </div>
      </div>

      <!-- History Section -->
      <div class="mt-8">
        <h3 class="mb-4">我的告解紀錄</h3>
        <div v-if="myConfessions.length === 0" class="text-muted">尚未發佈任何告解。</div>
        <div v-else class="history-grid">
          <div v-for="item in myConfessions" :key="item._id" class="card history-card">
             <div v-if="editingId === item._id">
                <textarea v-model="editingContent" class="form-input mb-2" rows="3"></textarea>
                <div class="flex justify-end gap-2">
                   <button @click="cancelEdit" class="btn btn-sm btn-outline">取消</button>
                   <button @click="saveEdit(item._id)" class="btn btn-sm btn-primary">儲存</button>
                </div>
             </div>
             <div v-else>
                <p class="mb-2">{{ item.content }}</p>
                <div class="flex justify-between items-center mt-2">
                   <small class="text-muted">{{ formatDate(item.createdAt) }}</small>
                   <div class="flex gap-2">
                      <button @click="startEdit(item)" class="text-sm text-primary hover:underline">編輯</button>
                      <button @click="deleteItem(item._id)" class="text-sm text-danger hover:underline">刪除</button>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import confessionService from '../services/confession';

const router = useRouter();
const username = ref('User');
const confessionContent = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref('');

const randomConfession = ref(null);
const loadingRandom = ref(false);

const myConfessions = ref([]);

// Edit state
const editingId = ref(null);
const editingContent = ref('');

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
  loadMyConfessions();
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};

const submitConfession = async () => {
  if (!confessionContent.value) return;
  
  loading.value = true;
  message.value = '';
  
  try {
    await confessionService.createConfession(confessionContent.value);
    message.value = '發佈成功！';
    messageType.value = 'success';
    confessionContent.value = '';
    loadMyConfessions();
  } catch (err) {
    message.value = err.response?.data?.message || '發佈失敗，請稍後再試';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};

const fetchRandomConfession = async () => {
  loadingRandom.value = true;
  randomConfession.value = null;
  try {
    const res = await confessionService.getRandomConfession();
    // API structure: { status: 'success', data: { confession: ... } } or { message: ... }
    if (res.data.data && res.data.data.confession) {
      randomConfession.value = res.data.data.confession;
    } else {
      alert(res.data.message || '沒有找到秘密');
    }
  } catch (err) {
    console.error(err);
    alert('讀取失敗');
  } finally {
    loadingRandom.value = false;
  }
};

const loadMyConfessions = async () => {
  try {
    const res = await confessionService.getMyConfessions();
    if (res.data.data && res.data.data.confessions) {
      myConfessions.value = res.data.data.confessions;
    }
  } catch (err) {
    console.error('Failed to load history', err);
  }
};

const startEdit = (item) => {
  editingId.value = item._id;
  editingContent.value = item.content;
};

const cancelEdit = () => {
  editingId.value = null;
  editingContent.value = '';
};

const saveEdit = async (id) => {
  try {
    await confessionService.updateConfession(id, editingContent.value);
    editingId.value = null;
    loadMyConfessions(); // Reload list
  } catch (err) {
    alert(err.response?.data?.message || '更新失敗');
  }
};

const deleteItem = async (id) => {
  if (!confirm('確定要刪除這則告解嗎？此操作無法復原。')) return;

  try {
    await confessionService.deleteConfession(id);
    loadMyConfessions();
  } catch (err) {
    alert(err.response?.data?.message || '刪除失敗');
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Simple formatting
};
</script>

<style scoped>
.header {
  background: var(--white);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.main-content {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .action-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.action-card {
  display: flex;
  flex-direction: column;
}

.secret-box {
  background-color: #f1f5f9;
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-style: italic;
  border-left: 4px solid var(--primary-color);
}

.history-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .history-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

.history-card {
  padding: 1.5rem;
}

.text-xs { font-size: 0.75rem; }
.mr-4 { margin-right: 1rem; }
.mt-8 { margin-top: 2rem; }
.mb-2 { margin-bottom: 0.5rem; }
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.items-center { align-items: center; }
.w-full { width: 100%; }
.block { display: block; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.gap-2 { gap: 0.5rem; }

.text-danger { color: var(--danger); }
.text-success { color: #10b981; }

.view-tag {
  font-size: 0.8rem;
  background: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}
</style>
