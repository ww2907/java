<script setup>
import { useRouter } from 'vue-router'
import { session, clearSession } from '../store.js'

const router = useRouter()

function logout() {
  clearSession()
  router.push('/login')
}
</script>

<template>
  <div class="home-card">
    <div class="emoji">🍱</div>
    <h2>登录成功！</h2>
    <p class="welcome">
      欢迎回来，<strong>{{ session.account || '美食家' }}</strong>
    </p>
    <p class="tip">这里是你的美食首页（演示占位），你可以在此继续扩展功能。</p>

    <button class="btn-primary" @click="logout">退 出 登 录</button>
  </div>
</template>

<style scoped>
.home-card {
  width: 100%;
  background: var(--card);
  backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 48px 38px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.6);
  text-align: center;
  animation: cardIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(34px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

.home-card .emoji { font-size: 64px; }
.home-card h2 {
  font-size: 26px;
  font-weight: 900;
  margin-top: 10px;
  background: linear-gradient(90deg, var(--teal), var(--cyan), var(--mint));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.home-card .welcome { margin-top: 14px; font-size: 16px; color: var(--ink); }
.home-card .welcome strong { color: var(--deep); }
.home-card .tip { margin-top: 8px; font-size: 13px; color: var(--muted); }

.btn-primary {
  margin-top: 28px;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--teal), var(--cyan));
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 150, 136, 0.4);
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0, 150, 136, 0.55); }
.btn-primary:active { transform: translateY(0); }
</style>
