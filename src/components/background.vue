<script setup lang="ts">
import backgroundImg from '@/assets/img/background3.webp'
</script>

<template>
  <div class="background">
    <img :src="backgroundImg" alt="background">
    <!-- 下方为背景灰色蒙版 -->
    <div class="overlay"></div>
  </div>
</template>

<style scoped>
.home,
.background,
.overlay {
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
}

.background {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: -999;
}

.background img {
  position: sticky;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -999;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.28);
  width: 100%;
  height: 100vh;
  z-index: -2;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
