import { ref, onMounted, onUnmounted, watch } from 'vue'

export function usePlayerInfo() {
  const coverImg = ref('') // 封面图片
  const playTime = ref(0) // 当前播放时间(秒)
  const duration = ref(0) // 总时长(秒)
  const songName = ref('') // 歌曲名称
  const playing = ref(false) // 是否正在播放
  const lrcList = ref([]) // 歌词列表
  const curLrcIndex = ref(-1) // 当前歌词索引
  const songList = ref([]) // 播放列表
  const curSongIndex = ref(-1) // 当前歌曲索引
  const tips = ref('') // 提示信息

  // 将时间字符串转换为秒数
  const timeToSeconds = (timeStr) => {
    const [minutes, seconds] = timeStr.trim().split(':').map(Number)
    return minutes * 60 + seconds
  }
  // 获取所有播放器信息
  const updatePlayerInfo = () => {
    // 获取图片
    const imgElement = document.querySelector(
      '#myhkplayer > div.myhkplayer > div.myhkblur-img > img',
    )
    if (imgElement) {
      coverImg.value = imgElement.src
    }

    // 获取时间并转换
    const timeElement = document.querySelector(
      '#myhkplayer > div.myhkplayer > div.myhkinfo > div.timestyle > span',
    )
    if (timeElement) {
      const timeText = timeElement.textContent || ''
      // 分割并转换时间
      const [current, total] = timeText.split('/').map((t) => timeToSeconds(t))
      playTime.value = current
      duration.value = total
    }

    // 获取歌曲信息
    const songElement = document.querySelector('#mCSB_2 > div.mCSB_container > ul > li.myhknow')
    if (songElement) {
      const fullText = songElement.textContent || ''
      songName.value = fullText
        .replace(/^\d+/, '') // 移除序号
        .replace(/(?:当前播放|暂停播放)\s*>\s*/, '') // 移除"当前播放 >"或"暂停播放 >"
        .trim()
    }
    // 获取播放状态
    const coverElement = document.querySelector('#myhkplayer > div.myhkplayer > div.myhkcover')
    if (coverElement) {
      playing.value = coverElement.classList.contains('coverplay')
    }
    // 获取歌词
    const lrcElement = document.querySelector('#myhkLrc > ul')
    if (lrcElement) {
      const lrcItems = lrcElement.querySelectorAll('li')
      lrcList.value = Array.from(lrcItems).map((li, index) => ({
        text: li.textContent || '',
        isActive: li.classList.contains('myhknow'),
        index: index,
      }))

      // 更新当前播放的歌词索引
      let activeIndex = lrcList.value.findIndex((lyric) => lyric.isActive)
      // 如果没有找到激活的歌词，检查是否有 myhkLrc0 class
      if (activeIndex === -1 && lrcItems.length > 0) {
        if (lrcItems[0].classList.contains('myhkLrc0')) {
          activeIndex = 0
        }
      }
      curLrcIndex.value = activeIndex
    } else {
      lrcList.value = []
      curLrcIndex.value = -1
    }
    // 获取播放列表
    const playlistElement = document.querySelector('#mCSB_2 > div.mCSB_container > ul')
    if (playlistElement) {
      const listItems = playlistElement.querySelectorAll('li')
      songList.value = Array.from(listItems).map((li, index) => ({
        text: (li.textContent || '')
          .replace(/^\d+/, '') // 移除序号
          .replace(/(?:当前播放|暂停播放)\s*>\s*/, '') // 移除"当前播放 >"或"暂停播放 >"
          .trim(),
        isPlaying: li.classList.contains('myhknow'),
        index: index,
      }))

      // 更新当前播放的歌曲索引
      const playingIndex = songList.value.findIndex((song) => song.isPlaying)
      curSongIndex.value = playingIndex
    } else {
      songList.value = []
      curSongIndex.value = -1
    }
    // 获取提示信息
    const tipsElement = document.querySelector('#myhkTips')
    if (tipsElement) {
      tips.value = tipsElement.textContent || ''
    }
  }

  // 创建 MutationObserver 实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' ||
        mutation.type === 'childList' ||
        mutation.type === 'characterData'
      ) {
        updatePlayerInfo()
      }
    })
  })

  onMounted(() => {
    // 初始化时获取信息
    updatePlayerInfo()

    // 监听元素变化
    const checkElement = setInterval(() => {
      const playerElement = document.querySelector('#myhkplayer')
      if (playerElement) {
        clearInterval(checkElement)
        // 开始观察整个播放器区域
        observer.observe(playerElement, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        })
        updatePlayerInfo()
      }
    }, 1000)
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  // 监听 curLrcIndex 的变化
  watch(curLrcIndex, (newValue) => {
    console.log('当前歌词索引:', newValue)
  })

  return {
    coverImg,
    playTime,
    duration,
    songName,
    playing,
    lrcList,
    curLrcIndex,
    songList,
    curSongIndex,
    tips,
  }
}

export function usePlayerControl(lrcList, curLrcIndex) {
  // 获取当前歌词
  const getCurrentLyric = () => {
    if (curLrcIndex.value === -1) return '暂无歌词'
    if (lrcList.value.length === 0) return '加载中...'
    return lrcList.value[curLrcIndex.value]?.text || '暂无歌词'
  }

  // 播放器控制函数
  const handlePlay = () => {
    const playButton = document.querySelector('.myhkicon-playCircle')
    if (playButton) playButton.click()
  }

  const handlePause = () => {
    const pauseButton = document.querySelector('.myhkicon-pauseCircle')
    if (pauseButton) pauseButton.click()
  }

  const handleNext = () => {
    const nextButton = document.querySelector('.myhknext')
    if (nextButton) nextButton.click()
  }

  const handlePrev = () => {
    const prevButton = document.querySelector('.myhkprev')
    if (prevButton) prevButton.click()
  }

  return {
    getCurrentLyric,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
  }
}
