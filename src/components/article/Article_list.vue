<script setup name="Article_list">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { processImagePath, extractFirstImageFromHtml } from '@/utils/image-utils'

const articles = ref([])
const mdFiles = import.meta.glob('../../markdown/*.md')
const imageFiles = import.meta.glob('../../assets/img/*', { eager: true })


const router = useRouter()

function goToDetail(path) {
  // 从路径中提取文件名
  const filename = path.split('/').pop().replace('.md', '')
  router.push(`/article/${filename}`)
}

onMounted(async () => {
  try {
    for (const path in mdFiles) {
      const mod = await mdFiles[path]();

      // 从文章内容中提取第一张图片作为封面
      let processedImagePath = null;
      const firstImagePath = extractFirstImageFromHtml(mod.html);

      if (firstImagePath) {
        processedImagePath = processImagePath(firstImagePath, imageFiles);
      }

      articles.value.push({
        title: mod.attributes?.title || '无标题',
        date: mod.attributes?.date || new Date().toISOString(),
        updated: mod.attributes?.updated || '',
        category: mod.attributes?.type || '默认分类',
        tags: mod.attributes?.tags || [],
        summary: mod.attributes?.description || '',
        image: processedImagePath,
        link: path.replace('../../markdown/', '/markdown/'),
        path: path,
      })
    }

    // 按日期排序
    articles.value.sort((a, b) => {
      try {
        return new Date(b.date) - new Date(a.date)
      } catch {
        return 0
      }
    })
  } catch (error) {
    console.error('加载文章列表失败:', error)
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

function getTagStyle(tag) {
  return {}
}
</script>

<template>
  <div class="content__right">
    <div v-for="(article, index) in articles" :key="index" class="article Theme_colors Frosted_glass"
      @click="goToDetail(article.path)" style="cursor: pointer;">
      <div class="article1" :class="{ 'full-width': !article.image }">
        <div class="">
          <h1>{{ article.title }}</h1>
        </div>
        <div class="article_info">
          <div>
            <p><i class="fa-solid fa-calendar-days"></i> {{ formatDate(article.date) }}
              <span v-if="article.date !== article.updated"><span v-if="article.updated !== ''"> - <i
                    class="fa-solid fa-pen"></i>{{
                      formatDate(article.updated) }}</span></span>
            </p>
          </div>
          <div>
            <p class="article_category">{{ article.category }}</p>
          </div>
        </div>
        <div class="article_tap">
          <div class="article_tag Frosted_glass" v-for="(tag, tagIndex) in article.tags" :key="tagIndex"
            v-bind:style="getTagStyle(tag)">
            <p>{{ tag }}</p>
          </div>
        </div>
        <div class="article_desc">
          <p>{{ article.summary }}</p>
        </div>
      </div>
      <a class="article_img" @click.stop="goToDetail(article.path)" v-if="article.image">
        <img :src="article.image" alt="文章图片" />
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 右区域 */
.content__right {
  margin-left: 10px;
  box-sizing: border-box;
  width: 100%;
}

/* 每一篇文章 */
.article {
  display: flex;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.article1,
.article_img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 垂直居中 */
}

.article1 {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.article1.full-width {
  flex: 1;
  width: 100%;
}

.article_img {
  flex: 0 0 35%;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.article_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.article_img:empty+.article1 {
  flex: 1;
}

.article_info,
.article_tap {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.article_tap {
  gap: 5px;
}

.article_tag {
  background-color: floralwhite;
  padding: 0 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.219);
}

.article_category {
  background-color: #FFE7BA;
  color: #000000;
  padding: 0 5px;
  border-radius: 5px;
  margin-left: 5px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.219);
}
</style>
