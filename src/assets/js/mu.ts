import { ref, onMounted, onUnmounted, watch, type Ref } from "vue";

interface LrcItem {
  text: string;
  isActive: boolean;
  index: number;
}
interface SongItem {
  text: string;
  isPlaying: boolean;
  index: number;
}

/**
 * 获取播放器信息
 * @returns 播放器详细信息
 */
export function usePlayerInfo() {
  const coverImg = ref(""); // 封面图片
  const playTime = ref(0); // 当前播放时间(秒)
  const duration = ref(0); // 总时长(秒)
  const songName = ref(""); // 歌曲名称
  const playing = ref(false); // 是否正在播放
  const lrcList = ref<LrcItem[]>([]); // 明确指定数组类型
  const curLrcIndex = ref(-1); // 当前歌词索引
  const songList = ref<SongItem[]>([]); // 播放列表
  const curSongIndex = ref(-1); // 当前歌曲索引
  const tips = ref(""); // 提示信息

  // 将时间字符串转换为秒数
  const timeToSeconds = (timeStr: string) => {
    const [minutes, seconds] = timeStr.trim().split(":").map(Number);
    return minutes * 60 + seconds;
  };
  // 获取所有播放器信息
  const updatePlayerInfo = () => {
    // 获取图片
    const imgElement = document.querySelector<HTMLImageElement>(
      "#myhkplayer > div.myhkplayer > div.myhkblur-img > img"
    );
    if (imgElement) {
      coverImg.value = imgElement.src;
    }

    // 获取时间并转换
    const timeElement = document.querySelector<HTMLSpanElement>(
      "#myhkplayer > div.myhkplayer > div.myhkinfo > div.timestyle > span"
    );
    if (timeElement) {
      const timeText = timeElement.textContent || "";
      // 分割并转换时间
      const [current, total] = timeText.split("/").map((t) => timeToSeconds(t));
      playTime.value = current;
      duration.value = total;
    }

    // 获取歌曲信息
    const songElement = document.querySelector("#mCSB_2 > div.mCSB_container > ul > li.myhknow");
    if (songElement) {
      const fullText = songElement.textContent || "";
      songName.value = fullText
        .replace(/^\d+/, "") // 移除序号
        .replace(/(?:当前播放|暂停播放)\s*>\s*/, "") // 移除"当前播放 >"或"暂停播放 >"
        .trim();
    }
    // 获取播放状态
    const coverElement = document.querySelector("#myhkplayer > div.myhkplayer > div.myhkcover");
    if (coverElement) {
      playing.value = coverElement.classList.contains("coverplay");
    }
    // 获取歌词
    const lrcElement = document.querySelector<HTMLUListElement>("#myhkLrc > ul");
    if (lrcElement) {
      const lrcItems = lrcElement.querySelectorAll<HTMLLIElement>("li");
      lrcList.value = Array.from(lrcItems).map((li, index) => ({
        text: li.textContent || "",
        isActive: li.classList.contains("myhknow"),
        index: index,
      }));

      // 更新当前播放的歌词索引
      let activeIndex = lrcList.value.findIndex((lyric) => lyric.isActive);
      // 如果没有找到激活的歌词，检查是否有 myhkLrc0 class
      if (activeIndex === -1 && lrcItems.length > 0) {
        if (lrcItems[0].classList.contains("myhkLrc0")) {
          activeIndex = 0;
        }
      }
      curLrcIndex.value = activeIndex;
    } else {
      lrcList.value = [];
      curLrcIndex.value = -1;
    }
    // 获取播放列表
    const playlistElement = document.querySelector("#mCSB_2 > div.mCSB_container > ul");
    if (playlistElement) {
      const listItems = playlistElement.querySelectorAll("li");
      songList.value = Array.from(listItems).map((li, index) => ({
        text: (li.textContent || "")
          .replace(/^\d+/, "") // 移除序号
          .replace(/(?:当前播放|暂停播放)\s*>\s*/, "") // 移除"当前播放 >"或"暂停播放 >"
          .trim(),
        isPlaying: li.classList.contains("myhknow"),
        index: index,
      }));

      // 更新当前播放的歌曲索引
      const playingIndex = songList.value.findIndex((song) => song.isPlaying);
      curSongIndex.value = playingIndex;
    } else {
      songList.value = [];
      curSongIndex.value = -1;
    }
    // 获取提示信息
    const tipsElement = document.querySelector("#myhkTips");
    if (tipsElement) {
      tips.value = tipsElement.textContent || "";
    }
  };

  // 创建 MutationObserver 实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" ||
        mutation.type === "childList" ||
        mutation.type === "characterData"
      ) {
        updatePlayerInfo();
      }
    });
  });

  // 使用现有的控制函数并将信息绑定到 Media Session（自动同步歌名/封面/播放状态）
  // usePlayerControl 需要 lrcList 和 curLrcIndex，均在本作用域中可用
  try {
    const controls = usePlayerControl(lrcList, curLrcIndex);
    useMediaSession(songName, coverImg, playing, controls);
  } catch {
    // 在非浏览器或测试环境中，useMediaSession 可能不可用，安静失败
  }

  onMounted(() => {
    // 初始化时获取信息
    updatePlayerInfo();

    // 监听元素变化
    const checkElement = setInterval(() => {
      const playerElement = document.querySelector("#myhkplayer");
      if (playerElement) {
        clearInterval(checkElement);
        // 开始观察整个播放器区域
        observer.observe(playerElement, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
        updatePlayerInfo();
      }
    }, 1000);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

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
  };
}
/**
 * 获取播放器控制相关信息
 * @param lrcList 当前歌词列表
 * @param curLrcIndex 当前歌词索引
 * @returns 播放器控制相关信息
 */
export function usePlayerControl(lrcList: Ref<LrcItem[]>, curLrcIndex: Ref<number>) {
  // 获取当前歌词
  const getCurrentLyric = () => {
    if (curLrcIndex.value === -1) return "暂无歌词";
    if (lrcList.value.length === 0) return "加载中...";
    return lrcList.value[curLrcIndex.value]?.text || "暂无歌词";
  };

  // 播放器控制函数
  const handlePlay = () => {
    const playButton = document.querySelector<HTMLDivElement>(".myhkicon-playCircle");
    if (playButton) playButton.click();
  };

  const handlePause = () => {
    const pauseButton = document.querySelector<HTMLDivElement>(".myhkicon-pauseCircle");
    if (pauseButton) pauseButton.click();
  };

  const handleNext = () => {
    const nextButton = document.querySelector<HTMLDivElement>(".myhknext");
    if (nextButton) nextButton.click();
  };

  const handlePrev = () => {
    const prevButton = document.querySelector<HTMLDivElement>(".myhkprev");
    if (prevButton) prevButton.click();
  };

  return {
    getCurrentLyric,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
  };
}

/**
 * 将播放器信息和控制器绑定到浏览器的 Media Session API
 * 支持显示歌名、歌手、封面，并响应系统的播放/暂停/上一曲/下一曲按键
 * @param songName 歌曲名称（Ref）
 * @param coverImg 封面地址（Ref）
 * @param playing 是否正在播放（Ref）
 * @param controls 控制函数对象，包含 handlePlay/handlePause/handleNext/handlePrev
 */
export function useMediaSession(
  songName: Ref<string>,
  coverImg: Ref<string>,
  playing: Ref<boolean>,
  controls: {
    handlePlay: () => void;
    handlePause: () => void;
    handleNext: () => void;
    handlePrev: () => void;
  }
) {
  // 如果浏览器不支持 Media Session，直接返回空函数
  if (typeof window === "undefined" || !("mediaSession" in navigator)) {
    return;
  }

  const ms = (navigator as unknown as { mediaSession?: MediaSession }).mediaSession;

  const parseArtist = (title: string) => {
    // 尝试从标题中解析歌手（常见格式：歌手 - 歌名 或 歌名 - 歌手）
    if (!title) return "";
    // 优先按 ' - ' 分割
    const parts = title.split(" - ");
    if (parts.length === 2) {
      // 不确定顺序，尝试判断哪一项像歌手（含中文或英文名字）
      // 我们假设格式通常为 歌手 - 歌名 或 歌名 - 歌手，这里返回第二项作为 artist 以覆盖多数情况
      return parts[0].length < parts[1].length ? parts[0] : parts[1];
    }
    // 兜底：返回空字符串
    return "";
  };

  const updateMetadata = () => {
    try {
      const title = songName.value || "未知歌曲";
      const artist = parseArtist(title) || "未知歌手";
      const artwork: MediaImage[] = [];
      if (coverImg.value) {
        // 添加常用分辨率，浏览器会选择合适的一个
        artwork.push({ src: coverImg.value, sizes: "512x512", type: "image/png" });
        artwork.push({ src: coverImg.value, sizes: "256x256", type: "image/png" });
        artwork.push({ src: coverImg.value, sizes: "96x96", type: "image/png" });
      }

      if (ms) {
        ms.metadata = new MediaMetadata({
          title,
          artist,
          album: undefined,
          artwork,
        });
      }
    } catch {
      // 安静失败，不阻塞主流程
    }
  };

  // 绑定动作处理器
  const bindActionHandlers = () => {
    try {
      ms?.setActionHandler("play", () => {
        controls.handlePlay();
      });
      ms?.setActionHandler("pause", () => {
        controls.handlePause();
      });
      ms?.setActionHandler("previoustrack", () => {
        controls.handlePrev();
      });
      ms?.setActionHandler("nexttrack", () => {
        controls.handleNext();
      });
    } catch {
      // 某些浏览器/环境不支持某些 action
    }
  };

  // 监听变化并更新 metadata & playbackState
  const stopWatchTitle = watch(songName, () => {
    updateMetadata();
  });
  const stopWatchCover = watch(coverImg, () => {
    updateMetadata();
  });
  const stopWatchPlaying = watch(playing, (val) => {
    try {
      if (ms) ms.playbackState = val ? "playing" : "paused";
    } catch {
      // ignore
    }
  });

  onMounted(() => {
    updateMetadata();
    bindActionHandlers();
    try {
      if (ms) ms.playbackState = playing.value ? "playing" : "paused";
    } catch {
      // ignore
    }
  });

  onUnmounted(() => {
    // 清理 action handlers
    try {
      if (ms) {
        ms.setActionHandler("play", null);
        ms.setActionHandler("pause", null);
        ms.setActionHandler("previoustrack", null);
        ms.setActionHandler("nexttrack", null);
      }
    } catch {
      // ignore
    }
    // 停止所有 watcher
    stopWatchTitle();
    stopWatchCover();
    stopWatchPlaying();
  });
}
