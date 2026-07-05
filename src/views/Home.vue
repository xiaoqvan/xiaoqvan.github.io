<script setup lang="ts">
// import background from "@/components/background.vue";

import anime from "@/components/anime.vue";
import getHitokoto from "@/assets/js/hitokoto";
import typeit from "@/components/typeit.vue";
import { ref, onMounted, watch } from "vue";
import { me } from '@/config';

import { faBilibili, faDiscord, faFacebook, faGithub, faInstagram, faLine, faQq, faReddit, faSteam, faTelegram, faTiktok, faWeibo, faXTwitter, faYoutube, faZhihu, type IconDefinition } from "@fortawesome/free-brands-svg-icons";

const componentKey = ref(0);

const hitokoto = ref({
  hitokoto: "权酱是个大吃货",
  creator: "xiaoqvan",
});

onMounted(() => {
  getHitokoto().then((res) => {
    hitokoto.value = res;
  });
});

watch(hitokoto, () => {
  componentKey.value++;
});

function getIcon(iconName: string) {
  return icon[iconName];
}

const icon: Record<string, IconDefinition> = {
  "bilibili": faBilibili,
  "qq": faQq,
  "github": faGithub,
  "x-twitter": faXTwitter,
  "telegram": faTelegram,
  "facebook": faFacebook,
  "discord": faDiscord,
  "youtube": faYoutube,
  "reddit": faReddit,
  "line": faLine,
  "steam": faSteam,
  "instagram": faInstagram,
  "tiktok": faTiktok,
  "weibo": faWeibo,
  "zhihu": faZhihu
}
</script>

<template>
  <div class="flex flex-col items-center md:justify-center w-full h-dvh">
    <div class="flex justify-between text-white w-[90%] gap-40 mt-30 md:mt-0">
      <div class="flex flex-col gap-10 w-full md:w-[520px]">
        <div class="flex items-center gap-5">
          <div class="w-24 h-24 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
            <img :src="me.avatar" alt="avatar">
          </div>
          <div>
            <p class="text-3xl font-black">{{ me.name }}</p>
            <p class="">{{ me.introduction }}</p>
          </div>
        </div>
        <!-- 社交链接 -->
        <div class="flex">
          <div v-for="link in me.socialLinks" :key="link.href"
            class="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mx-2 text-2xl hover:bg-white/40 transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer overflow-hidden">
            <a class="no-link" :href="link.href" :title="link.title" target="_blank">
              <font-awesome-icon :icon="getIcon(link.icon)" />
            </a>
          </div>
        </div>
        <!-- 一言 -->
        <div class="flex flex-col items-stretch justify-center w-full gap-3">
          <p class="flex">{{ hitokoto.hitokoto }}</p>
          <div class="flex justify-end">-「 <span>{{ hitokoto.creator }}</span> 」</div>
        </div>
        <!-- 番剧 -->
        <div class="flex w-full md:w-130">
          <anime />
        </div>
      </div>
      <!-- 大一言 -->
      <div class="hidden md:flex flex-col flex-1  items-stretch justify-center gap-10">
        <h1 class="text-4xl font-black flex">
          <typeit :key="componentKey" :text="hitokoto.hitokoto" />
        </h1>
        <h2 class="text-lg flex justify-end">-「 <span>{{ hitokoto.creator }}</span> 」</h2>
      </div>
    </div>
  </div>
</template>


<style scoped></style>
