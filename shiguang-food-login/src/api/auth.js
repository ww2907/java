// 模拟后端鉴权接口。当前用纯 Promise 模拟，无需真实后端即可运行。
// 接入真实后端时，把下面三个函数替换为 axios 请求即可（示例见文件末尾）。

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function validAccount(v) {
  const phone = /^1[3-9]\d{9}$/
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return phone.test(v) || email.test(v)
}

export async function login({ account, password }) {
  await delay(900)
  if (!validAccount(account)) throw new Error('账号格式不正确')
  if (password.length < 6) throw new Error('密码至少 6 位')
  return { token: 'mock-token-' + Date.now(), account }
}

export async function register({ account, password, nickname }) {
  await delay(900)
  if (!validAccount(account)) throw new Error('账号格式不正确')
  if (password.length < 6) throw new Error('密码至少 6 位')
  return { token: 'mock-token-' + Date.now(), account, nickname }
}

export async function forgotPassword({ account }) {
  await delay(900)
  if (!validAccount(account)) throw new Error('账号格式不正确')
  // 演示：固定验证码 123456
  return { sent: true, account, code: '123456' }
}

/*
// ===== 真实接口示例（需先 npm i axios）=====
// import axios from 'axios'
// const http = axios.create({ baseURL: '/api' })
// export const login = (data) => http.post('/login', data).then((r) => r.data)
// export const register = (data) => http.post('/register', data).then((r) => r.data)
// export const forgotPassword = (data) => http.post('/forgot', data).then((r) => r.data)
*/
