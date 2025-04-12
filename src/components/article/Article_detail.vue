<script setup name="Article_detail">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import background from "@/components/background.vue";
import { processHtmlImagePaths } from '@/utils/image-utils'

const route = useRoute()
const article = ref(null)
const mdFiles = import.meta.glob('../../markdown/*.md')
const imageFiles = import.meta.glob('../../assets/img/*', { eager: true })

onMounted(async () => {
  try {
    // 从路由参数获取文章路径
    const articlePath = `../../markdown/${route.params.filename}.md`
    if (articlePath in mdFiles) {
      const mod = await mdFiles[articlePath]()

      // 处理图片路径
      const processedContent = processHtmlImagePaths(mod.html, imageFiles)

      article.value = {
        title: mod.attributes?.title || '无标题',
        date: mod.attributes?.date || '',
        updated: mod.attributes?.updated || '',
        category: mod.attributes?.type || '',
        tags: mod.attributes?.tags || [],
        content: processedContent
      }

      // 等待 DOM 更新后高亮代码块
      await nextTick(() => {
        document.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightElement(el)
        })
      })
    }
  } catch (error) {
    console.error('加载文章失败:', error)
  }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString()
  } catch (e) {
    return dateStr
  }
}
</script>

<template>
  <background class="background" />
  <div class="article-detail Theme_colors Frosted_glass" v-if="article">
    <div class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span v-if="article.date"><i class="fa-solid fa-calendar-days"></i> {{ formatDate(article.date) }}</span>
        <span v-if="article.updated">
          <i class="fa-solid fa-pen"></i> {{ formatDate(article.updated) }}
        </span>
      </div>
      <div class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="article-content markdown-body" v-html="article.content"></div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
}

.article-detail {
  padding: 20px;
  margin: 100px 200px;
  border-radius: 8px;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
  background: #ffffff6c;
}

.article-header {
  margin-bottom: 20px;
}

.article-meta {
  color: #666;
  margin: 10px 0;
}

.article-meta span {
  margin-right: 15px;
}

.article-tags .tag {
  background: #eee;
  padding: 2px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.article-content {
  line-height: 1.6;
}

/* 引入的 markdown 样式会自动应用到 markdown-body 类 */
:deep(.markdown-body) {
  background-color: transparent;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .hljs {
    border-radius: 10px;
  }

  a {
    color: dodgerblue;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.087);
  }
}
</style>
