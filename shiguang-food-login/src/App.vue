<script setup>
import { ref } from 'vue'
import EmojiLayer from './components/EmojiLayer.vue'
import BokehLayer from './components/BokehLayer.vue'

const bgRef = ref(null)

function onMouseMove(e) {
  if (!bgRef.value) return
  bgRef.value.style.setProperty('--mx', e.clientX + 'px')
  bgRef.value.style.setProperty('--my', e.clientY + 'px')
}
</script>

<template>
  <div class="app-bg" ref="bgRef" @mousemove="onMouseMove">
    <!-- 氛围层：漂浮食物 -->
    <EmojiLayer />
    <!-- 氛围层：漂浮光斑 -->
    <BokehLayer />

    <!-- 居中主舞台 -->
    <div class="stage">
      <div class="brand-top">
        <div class="logo"><span class="mark">🍜</span> 食光 · 美食</div>
        <div class="tagline">发现身边的每一口好味道 🌿</div>
      </div>
      <router-view />
    </div>
  </div>
</template>
