<script setup lang="ts">
import { Footer } from '@/config';
import { ref } from "vue";

const currentYear = new Date().getFullYear()
const showFooterName = ref(true)
const showBeian = ref(false)
</script>

<template>
  <footer>
    <div class="fixed z-999 w-full flex justify-center text-white bottom-0 py-1 text-sm bg-black/20">
      <div class="">
        <div class="flex flex-row justify-center items-center">
          <!-- 版权信息 -->
          <span id="power"><span class="hidden md:flex">Copyright&nbsp;&copy;
              {{ currentYear }}&nbsp;&amp;</span>
            <a v-if="showFooterName && Footer.footername.toLowerCase() !== 'xiaoqvan'" :href="Footer.footerlink"
              id="power-text">{{
                Footer.footername }}&nbsp;&amp;</a>
          </span>
          <!-- 网站模板作者信息 -->
          <span class="flex" id="made"><span>&nbsp;Made&nbsp;</span><span>by&nbsp;</span><a rel="noopener"
              href="https://github.com/XQxiaoqvan/xqxiaoqvan.github.io" target="_blank">xiaoqvan</a></span>
          <!-- 备案信息 -->
          <a v-if="Footer.icp && Footer.icp.trim() !== ''" rel="noopener" href="https://beian.miit.gov.cn" id="beian"
            target="_blank">&nbsp;&amp;&nbsp; {{
              Footer.icp }}</a>
          <!-- 公安备案 -->
          <span v-if="showBeian">&nbsp;&amp;&nbsp;<a :href="Footer.beian_link" target="_blank">
              <img style="width: 20px; height: 20px; transform: translateY(+3px);" :src="Footer.beian_imgSrc"
                alt="beian">
              <span>{{ Footer.beian_text }}</span>
            </a></span>
        </div>
      </div>
    </div>
  </footer>
</template>
