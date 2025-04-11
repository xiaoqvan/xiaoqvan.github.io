<script setup name="music">
import { usePlayerInfo, usePlayerControl } from '@/assets/js/mu'
const { coverImg, songName, playing, lrcList, curLrcIndex } = usePlayerInfo()
const { getCurrentLyric, handlePlay, handlePause, handleNext, handlePrev } = usePlayerControl(lrcList, curLrcIndex)
</script>

<template>
  <div class="player">
    <div class="music_image">
      <img :src="coverImg" alt="album-art" />
    </div>
    <div class="music_info">
      <div class="music-name">
        <h1 class="player-info">{{ songName }}</h1>
        <span class="lyric-text">{{ getCurrentLyric() }}</span>
      </div>
      <div class="music-button">
        <i class="fas fa-step-backward fa-xs" @click="handlePrev"></i>
        <i class="fas fa-play fa-xs" v-show="!playing" @click="handlePlay"></i>
        <i class="fas fa-pause fa-xs" v-show="playing" @click="handlePause"></i>
        <i class="fas fa-step-forward fa-xs" @click="handleNext"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  align-items: center;
  width: auto;
}

.music_info {
  margin-left: 10px;
  width: 200px;
}

.music-name {
  width: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.player-info {
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

.lyric-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.music-button {
  display: none;
}

.player:hover .music-name {
  display: none;
}

.player:hover .music-button {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  font-size: 30px;

}

.music_image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.music_image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  animation: rotate 15s linear infinite;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.fas {
  color: rgba(40, 50, 72, 0.8);
  transition: 0.3s;
}

.fas:hover {
  color: rgb(0, 0, 0);
}

.fas:active {
  transform: scale(0.9);
  color: rgba(40, 50, 72, 0.8);
  transition: 0.1s;
}
</style>
