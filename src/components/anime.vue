<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchCalendarData } from '@/assets/js/anime';
import type { Anime } from '@/types/anime';
import { faSpinner, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const calendarData = ref<Anime>([]);
const isError = ref<boolean>(false);
onMounted(async () => {
  try {
    const data = await fetchCalendarData();
    calendarData.value = data;
    addScrollListener();
    handleDynamicContent();
  } catch (error) {
    isError.value = true;
    console.error('数据获取失败:', error);
  }
});

async function fetchData() {
  try {
    isError.value = false;
    const data = await fetchCalendarData();
    calendarData.value = data;
  } catch (error) {
    isError.value = true;
    console.error('数据获取失败:', error);
  }

}

function handleDynamicContent() {
  const today = (new Date().getDay() + 6) % 7 + 1; // 将星期天(0)转换为7，其余的加1

  setTimeout(() => {
    const fanjvTimesDivs = document.querySelectorAll<HTMLDivElement>('.fanjv-times div');
    const dayContainers = document.querySelectorAll<HTMLDivElement>('.day-container');

    const todayDiv = fanjvTimesDivs[today - 1]?.querySelector('p'); // 调整索引
    if (todayDiv) {
      todayDiv.classList.add('dqxq');
    }

    dayContainers.forEach(container => container.style.display = 'none');
    const todayContainer = document.getElementById('day-' + today);
    if (todayContainer) {
      todayContainer.style.display = 'block';
    }

    fanjvTimesDivs.forEach((div, index) => {
      div.addEventListener('click', () => {
        dayContainers.forEach(container => container.style.display = 'none');
        const dayContainer = document.getElementById('day-' + (index + 1)); // 调整索引
        if (dayContainer) {
          dayContainer.style.display = 'block';
        }
        fanjvTimesDivs.forEach(d => {
          const p = d.querySelector('p');
          if (p) {
            p.classList.remove('dqxq');
          }
        });
        const p = div.querySelector('p');
        if (p) {
          p.classList.add('dqxq');
        }
      });
    });
  }, 1000);
}

// 新增：当鼠标在列表上滚动时，将纵向滚动转换为横向滚动
function onWheel(e: WheelEvent) {
  // currentTarget 在通过模板绑定时是触发事件的元素（.fanjv-main）
  const el = e.currentTarget as HTMLElement | null;
  if (el) {
    // 防止页面纵向滚动
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }
}

function addScrollListener() {
  const container = document.querySelector<HTMLDivElement>('.fanjv-main');
  // 防止重复绑定（例如在组件重新渲染后）
  if (container && !container.dataset.wheelBound) {
    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }, { passive: false });
    container.dataset.wheelBound = 'true';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const fanjvDiv = document.getElementById('fanjv');

  fetch('fanjv/index.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const fanjvPythonElement = doc.getElementById('fanjv-python');

      if (fanjvPythonElement) {
        if (fanjvDiv) {
          fanjvDiv.innerHTML = '';
          fanjvDiv.appendChild(fanjvPythonElement.cloneNode(true));
        } else {
          console.error('未找到目标元素');
        }
      } else {
        console.error('未找到目标元素');
      }
    })
    .catch(error => console.error('获取HTML内容失败', error));
});

const weekday = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期天",
]

</script>
<template>
  <div class=" main-2">
    <!-- 番剧 -->
    <div class="fanjv">
      <div id="fanjv" class="fanjv-timeshow">
        <div class='fanjv-all' id='fanjv-python'>
          <!-- 标题栏 -->
          <div class='fanjv-top'>
            <div class='fanjv-top-1'>
              <div class='fanjv-header'>
                <h1>今日番剧</h1>
              </div>
              <div class='fanjv-scrq'>
                <a href="https://bgm.tv/calendar" target="_blank" class="fanjv-scrq-1">详细页面</a>
              </div>
            </div>
          </div>
          <!-- 星期 -->
          <div v-if="calendarData.length === 0" class='fanjv-times'>
            <div v-for="(day, index) in weekday" :key="index">
              <p class='today-header'><span id='xq'></span>{{ day }}</p>
            </div>
          </div>
          <div v-else class='fanjv-times'>
            <div v-for="(day, index) in calendarData" :key="index">
              <p class='today-header'><span id='xq'></span>{{ day.weekday.cn }}</p>
            </div>
          </div>
          <!-- 番剧 -->
          <!-- 绑定 @wheel.prevent 让鼠标在该区域滚动时横向滚动 -->
          <div v-if="calendarData.length > 0" class='fanjv-main' @wheel.prevent="onWheel">
            <div v-for="(day, index) in calendarData" :key="index" :id="'day-' + day.weekday.id" class="day-container">
              <div class='anime-list'>
                <div v-for="anime in day.items" :key="anime.id" class='anime-item'>
                  <img
                    :src="anime.images?.large ? anime.images.large : 'https://dummyimage.com/350x600/cccccc/ffffff&text=%E6%97%A0%E5%B0%81%E9%9D%A2'"
                    alt="anime.name" class='anime-image' />
                  <p class='anime-title'>{{ anime.name_cn || anime.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center items-center h-[170px]">
            <div v-if="isError" class="flex flex-col justify-center items-center h-full gap-2">
              <font-awesome-icon class="text-4xl" :icon="faCircleExclamation" />
              <p class="ml-2">加载失败</p>
              <button @click="fetchData" class="retry-button">重试</button>
            </div>
            <div v-else class="flex flex-col justify-center items-center h-full gap-2">
              <font-awesome-icon class="text-4xl spinner" :icon="faSpinner" />
              <p class="ml-2">正在加载中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 第二屏 */

.main-2 {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.557);

}

.fanjv {
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}

.fanjv-main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  border-radius: 5px;
  height: 170px;
}


/* 自定义滚动条样式 */

.fanjv-main::-webkit-scrollbar {
  width: 15px;
  height: 5px;
}

.fanjv-main::-webkit-scrollbar-thumb {
  background-color: #585858;
  border-radius: 6px;
}

.fanjv-main::-webkit-scrollbar-track {
  background-color: #f1f1f100;
}

.fanjv-top {
  box-sizing: border-box;
  width: 100%;
}

.fanjv-top-1 {
  /* 定义背景颜色变量 */
  border-radius: 0 0 7px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
}

.fanjv-all {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.anime-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.anime-image {
  width: 100px;
  height: 135px;
  object-fit: cover;
  border-radius: 10px;
}

.fanjv-header h1 {
  margin: 0;
  font-size: 20px;
}

.fanjv-scrq p {
  margin: 0;
  font-size: 15px;
}

.fanjv-times {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
}

.fanjv-times p {
  margin: 0 3px;
  font-size: 17px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin: 0;
  }
}

.anime-title {
  width: 105px;
  /* 设置文本显示的宽度 */
  white-space: nowrap;
  /* 禁止换行 */
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分用省略号表示 */
  font-size: 13px;
}

.day-container {
  padding: 5px;
}

.dqxq {
  border-radius: 5px 5px 0 0 !important;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.557) !important;
}

.fanjv-scrq-1 {
  text-decoration: none;
  padding: 2px 5px;
  color: #fff;
}

.fanjv-scrq-1:hover {
  text-decoration: underline;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.557);
}

.today-header {
  padding: 0 3px;
  font-size: 5px;
}

.today-header:hover {

  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.557);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
