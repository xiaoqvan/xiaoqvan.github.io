<script setup lang="ts">
import { usePlayerInfo, usePlayerControl } from '@/assets/js/mu'
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'

const { coverImg, songName, playing, lrcList, curLrcIndex, kscLines, playTime } = usePlayerInfo()
const { getCurrentLyric, handlePlay, handlePause, handleNext, handlePrev } = usePlayerControl(lrcList, curLrcIndex)

/** 当前活跃的 KSC 行（带逐字高亮进度） */
const activeKscLine = computed(() => {
  if (kscLines.value.length === 0) return null
  // 1. 找正在高亮中的行（有部分字符已高亮但未全亮），跳过元数据行
  const active = kscLines.value.find((l) => {
    if (l.chars.length === 0) return false
    const hasAnyProgress = l.chars.some((c) => c.progress > 0)
    const notAll = l.chars.some((c) => c.progress < 100)
    return hasAnyProgress && notAll
  })
  if (active) return active
  // 2. 没有任何行在部分高亮中时，基于当前播放时间找到对应的行
  const currentSec = playTime.value
  const timeMatched = kscLines.value.find(
    (l) => currentSec >= l.startTime / 100 && currentSec < l.endTime / 100
  )
  if (timeMatched) return timeMatched
  // 3. 如果当前时间已超过所有 KSC 行的范围，回退到普通歌词
  const lastKscEnd = Math.max(...kscLines.value.map((l) => l.endTime / 100).filter((t) => t > 0))
  if (lastKscEnd > 0 && currentSec >= lastKscEnd) {
    return null
  }
  // 4. 如果当前时间在第一个实际歌词行之前（歌曲刚开始），显示第一行
  const firstRealLine = kscLines.value.find((l, i) => i >= 2 && l.endTime > l.startTime)
  if (firstRealLine && currentSec < firstRealLine.startTime / 100) {
    return firstRealLine
  }
  // 5. 兜底：返回 null（走 fallback）
  return null
})

/** 当前要显示的歌词文本（KSC 或 fallback） */
const displayLyric = computed(() => {
  if (activeKscLine.value) {
    // KSC 正在显示，不需要 fallback 文本
    return ""
  }
  if (kscLines.value.length > 0) {
    // KSC 存在但没有活跃行（已全部播完或还没开始），
    // 寻找当前时间最近的 KSC 行的文本作为普通歌词显示
    const currentSec = playTime.value
    // 按结束时间找最近的行
    let closest = kscLines.value[0]
    let minDiff = Infinity
    for (const line of kscLines.value) {
      const lineTime = line.endTime / 100
      const diff = Math.abs(currentSec - lineTime)
      if (diff < minDiff) {
        minDiff = diff
        closest = line
      }
    }
    if (closest && closest.chars.length > 0) {
      return closest.chars.map(c => c.char).join('')
    }
  }
  // 没有 KSC 数据，用普通歌词
  return getCurrentLyric()
})
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
        <!-- KSC 逐字高亮歌词 -->
        <div v-if="activeKscLine" class="relative h-5 overflow-hidden ksc-lyric">
          <span class="ksc-bg">{{ activeKscLine.chars.map(c => c.char).join('') }}</span>
          <!-- 逐字高亮：每个字独立控制高亮宽度 -->
          <span class="ksc-fg">
            <span v-for="(ch, i) in activeKscLine.chars" :key="i"
              :style="{ clipPath: `inset(0 ${100 - ch.progress}% 0 0)` }">
              {{ ch.char }}
            </span>
          </span>
        </div>
        <!-- 回退：普通歌词 -->
        <div v-else class="relative h-4 overflow-hidden">
          <transition name="lyric" mode="out-in">
            <span class="absolute left-0 top-0 w-full text-xs truncate" :key="displayLyric">{{
              displayLyric }}</span>
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

/* KSC 逐字高亮歌词 */
.ksc-lyric {
  position: relative;
  font-size: 0.75rem;
  line-height: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
}

.ksc-bg {
  color: #9ca3af;
  /* text-gray-400 */
}

.ksc-fg {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  color: #111827;
  /* text-gray-900 */
}

.ksc-fg > span {
  display: inline;
  transition: clip-path 0.15s ease;
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
