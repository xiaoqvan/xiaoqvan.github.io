<!-- 这里是顶部栏 -->
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { header } from '@/config';
import Music from "@/components/Music.vue";
import { faBars } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();

const isHome = computed(() => route.name === 'home' || route.path === '/');

// 鼠标跟随光晕相关
const titleRef = ref<HTMLElement | null>(null);
const glowX = ref(0);
const glowY = ref(0);
const glowVisible = ref(false);

function onEnter() {
  glowVisible.value = true;
}

function onLeave() {
  glowVisible.value = false;
}

function onMove(e: MouseEvent) {
  const el = titleRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  glowX.value = e.clientX - rect.left;
  glowY.value = e.clientY - rect.top;
}

const routedata = [{
  path: '/home',
  name: '首页'
},
  //  {
  //   path: '/article',
  //   name: '文章'
  // }, {
  //   path: '/games',
  //   name: '游戏'
  // }, {
  //   path: '/anime',
  //   name: '动漫'
  // }
]

// 移动端下拉菜单状态与外部点击关闭
const mobileOpen = ref(false);
const mobileRef = ref<HTMLElement | null>(null);

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value;
}

function closeMobile() {
  mobileOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  const el = mobileRef.value as HTMLElement | null;
  if (!el) return;
  if (!el.contains(e.target as Node)) {
    closeMobile();
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick);
});
</script>


<template>
  <div class="fixed z-999 w-full flex justify-center">
    <div
      :class="isHome
        ? ' text-gray-300 dark:bg-gray-800/30 w-[97%] mt-2.5 rounded-2xl px-5 py-2.5 flex justify-between hover:bg-white/70 hover:backdrop-blur-md hover:shadow-md hover:text-black transition-all duration-300 delay-100 ease-in-out'
        : 'bg-white/30 backdrop-blur-md dark:bg-gray-800/30 shadow-md w-[95%] mt-5 rounded-2xl px-5 py-2.5 flex justify-between transition-all duration-200 delay-100 ease-in-out'">
      <div class="flex items-center gap-10">
        <!-- 标题 -->
        <div class="topbar_title">
          <template v-if="!header.logo">
            <h1 ref="titleRef" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave"
              class="gradient-title text-2xl font-black">
              {{ header.title }}
            </h1>
            <span class="title-glow"
              :style="{ left: glowX + 'px', top: glowY + 'px', opacity: glowVisible ? 1 : 0 }"></span>
          </template>
          <img v-else :src="header.logo" alt="Logo" />
        </div>
        <div class="hidden md:flex gap-3">
          <RouterLink v-for="item in routedata" :key="item.path" :to="item.path"
            class="py-1.5 px-2.5 hover:shadow-md rounded-lg hover:bg-gray-200 hover:-translate-y-0.5"
            active-class="active">
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <div class="hidden md:flex w-60">
          <Music />
        </div>
        <div class="md:hidden text-2xl" ref="mobileRef">
          <button aria-label="Toggle menu" @click.stop.prevent="toggleMobile" class="focus:outline-none">
            <font-awesome-icon :icon="faBars" />
          </button>

          <!-- 移动端下拉菜单 -->
          <transition name="fade">
            <div v-if="mobileOpen"
              class="absolute left-1/2 top-16 transform -translate-x-1/2 w-[95%] bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg p-2 z-50 text-black">
              <nav class="flex flex-col gap-1">
                <RouterLink v-for="item in routedata" :key="item.path" :to="item.path"
                  class="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-black"
                  @click="closeMobile">
                  {{ item.name }}
                </RouterLink>
              </nav>
              <div class="mt-2">
                <Music />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.gradient-title {
  background: linear-gradient(90deg, #2af5e4 10%, #009efd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.topbar_title {
  position: relative;
  display: inline-block;
}

.title-glow {
  position: absolute;
  pointer-events: none;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(6, 182, 212, 0.18) 30%, rgba(6, 182, 212, 0.06) 60%, transparent 100%);
  filter: blur(18px);
  transition: opacity 260ms ease, transform 160ms ease;
  opacity: 0;
}

/* 简单的淡入淡出过渡，用于移动端下拉菜单 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
