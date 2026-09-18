<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPassword } from '../api/auth.js'

const router = useRouter()

const account = ref('')
const code = ref('')
const newPassword = ref('')
const sent = ref(false)
const loading = ref(false)
const demoCode = ref('')

const errAccount = ref(false)
const errCode = ref(false)
const errPw = ref(false)

const toastMsg = ref('')
const toastShow = ref(false)
let toastTimer = null

function validAccount(v) {
  const phone = /^1[3-9]\d{9}$/
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return phone.test(v) || email.test(v)
}

function showToast(msg) {
  toastMsg.value = msg
  toastShow.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastShow.value = false), 2200)
}

async function sendCode() {
  if (!validAccount(account.value.trim())) {
    errAccount.value = true
    return
  }
  errAccount.value = false
  loading.value = true
  try {
    const res = await forgotPassword({ account: account.value.trim() })
    sent.value = true
    demoCode.value = res.code
    showToast('验证码已发送（演示验证码：' + res.code + '）')
  } catch (e) {
    showToast(e.message || '发送失败')
  } finally {
    loading.value = false
  }
}

function onSubmit() {
  let ok = true
  if (!validAccount(account.value.trim())) { errAccount.value = true; ok = false } else errAccount.value = false
  if (code.value.trim() !== demoCode.value) { errCode.value = true; ok = false } else errCode.value = false
  if (newPassword.value.length < 6) { errPw.value = true; ok = false } else errPw.value = false

  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('密码已重置，请重新登录 🔑')
    router.push('/login')
  }, 1100)
}

onUnmounted(() => clearTimeout(toastTimer))
</script>

<template>
  <form class="auth-card" @submit.prevent="onSubmit" novalidate>
    <div class="top">
      <h2>找回<span>密码</span> 🔑</h2>
      <p>输入账号，我们会发送验证码帮助你重置</p>
    </div>

    <div class="field">
      <label for="f-account">手机号 / 邮箱</label>
      <div class="input">
        <span class="icon">👤</span>
        <input type="text" id="f-account" v-model="account" :disabled="sent" placeholder="请输入注册时的手机号或邮箱" />
        <span v-if="!sent" class="toggle" @click="sendCode" style="cursor:pointer">发送验证码</span>
      </div>
      <div class="err" v-show="errAccount">请输入有效的手机号或邮箱</div>
    </div>

    <template v-if="sent">
      <div class="field">
        <label for="f-code">验证码</label>
        <div class="input">
          <span class="icon">✉️</span>
          <input type="text" id="f-code" v-model="code" placeholder="请输入 6 位验证码" />
        </div>
        <div class="err" v-show="errCode">验证码不正确</div>
      </div>

      <div class="field">
        <label for="f-pw">新密码</label>
        <div class="input">
          <span class="icon">🔒</span>
          <input type="password" id="f-pw" v-model="newPassword" placeholder="至少 6 位" autocomplete="new-password" />
        </div>
        <div class="err" v-show="errPw">密码至少 6 位</div>
      </div>

      <button type="submit" class="btn-primary" :class="{ loading }" :disabled="loading">
        <span v-if="loading"><span class="spinner"></span> 重置中…</span>
        <span v-else>重 置 密 码</span>
      </button>
    </template>

    <div class="signup">想起密码了？ <router-link to="/login">返回登录</router-link></div>
  </form>

  <div class="toast" :class="{ show: toastShow }">{{ toastMsg }}</div>
</template>

<style scoped>
.auth-card {
  width: 100%;
  background: var(--card);
  backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 38px 38px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.6);
  animation: cardIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(34px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

.auth-card .top { text-align: center; margin-bottom: 24px; }
.auth-card .top h2 { font-size: 26px; font-weight: 900; }
.auth-card .top h2 span {
  background: linear-gradient(90deg, var(--teal), var(--cyan), var(--mint));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: flow 4s linear infinite;
}
@keyframes flow { to { background-position: 200% center; } }
.auth-card .top p { margin-top: 8px; font-size: 14px; color: var(--muted); }

.field { margin-bottom: 16px; }
.field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.field .input { position: relative; }
.field input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  font-size: 15px;
  color: var(--ink);
  background: #f7fffc;
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
}
.field input:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 0 4px rgba(0, 206, 201, 0.18), 0 0 18px rgba(85, 239, 196, 0.3);
}
.field input:disabled { opacity: 0.7; }
.field .icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  opacity: 0.6;
}
.field .toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--teal);
  font-weight: 600;
  user-select: none;
}
.err { color: #e5533c; font-size: 12px; margin-top: 6px; }

.btn-primary {
  position: relative;
  overflow: hidden;
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
.btn-primary.loading { pointer-events: none; opacity: 0.85; }
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: -4px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.signup { text-align: center; margin-top: 22px; font-size: 14px; color: var(--muted); }
.signup a { color: var(--teal); font-weight: 700; text-decoration: none; }
.signup a:hover { text-decoration: underline; }

.toast {
  position: fixed;
  top: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
  background: linear-gradient(135deg, var(--teal), var(--cyan));
  color: #fff;
  padding: 14px 26px;
  border-radius: 14px;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(0, 150, 136, 0.45);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 999;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
</style>
