<script setup lang="ts">
import { usePlayerInfo, usePlayerControl } from '@/assets/js/mu'
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

const { coverImg, songName, playing, lrcList, curLrcIndex } = usePlayerInfo()
const { getCurrentLyric, handlePlay, handlePause, handleNext, handlePrev } = usePlayerControl(lrcList, curLrcIndex)
</script>

<template>
  <div class="group flex items-center w-full">
    <!-- album art: fixed square, rounded and overflow hidden -->
    <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
      <img v-if="coverImg" :src="coverImg" alt="album-art"
        :style="{ animationPlayState: playing ? 'running' : 'paused' }"
        class="w-full h-full object-cover block rotate-slow" />
      <div v-else class="w-full h-full bg-gray-200"></div>
    </div>

    <div class="ml-3 flex-1 min-w-0">
      <div class="flex flex-col overflow-hidden min-w-0 info group-hover:hidden">
        <h1 class="text-base font-medium truncate">{{ songName }}</h1>
        <div class="relative h-4 overflow-hidden">
          <transition name="lyric" mode="out-in">
            <span class="absolute left-0 top-0 w-full text-xs truncate" :key="getCurrentLyric()">{{
              getCurrentLyric() }}</span>
          </transition>
        </div>
      </div>

      <div class="hidden group-hover:flex gap-6 items-center justify-center text-2xl mt-1 controls">
        <font-awesome-icon :icon="faStepBackward" class="text-gray-600 hover:text-black" @click="handlePrev" />
        <font-awesome-icon :icon="faPlay" v-show="!playing" class="text-gray-600 hover:text-black"
          @click="handlePlay" />
        <font-awesome-icon :icon="faPause" v-show="playing" class="text-gray-600 hover:text-black"
          @click="handlePause" />
        <font-awesome-icon :icon="faStepForward" class="text-gray-600 hover:text-black" @click="handleNext" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* keep only the rotate keyframes and a helper class for slow rotation */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotate-slow {
  animation: rotate 15s linear infinite;
  transform-origin: center center;
}

/* lyric transition kept from previous implementation */
.lyric-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.lyric-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.lyric-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.lyric-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.lyric-enter-active,
.lyric-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
  display: block;
}

/* Fallback CSS: ensure controls are hidden by default and shown on parent hover */
.controls {
  display: none !important;
}

.group:hover .controls {
  display: flex !important;
}

/* Fallback: hide info on hover so controls replace it */
.info {
  display: block;
}

.group:hover .info {
  display: none !important;
}
</style>
