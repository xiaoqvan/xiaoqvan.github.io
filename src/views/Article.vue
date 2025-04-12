<!-- 文章 -->
<script setup name="ArticleView">
import Article_info from '@/components/article/Article_info.vue';
import Article_list from '@/components/article/Article_list.vue';
import Footer from "@/components/Footer/Footer.vue";
import background from "@/components/formerbg.vue"
</script>

<template>
  <background />
  <div class="box">
    <div class="box1">
      <div class="main">
        <div class="container Theme_colors">
          <!-- 主内容区域 -->
          <div class="main__content">
            <!-- 左边信息 -->
            <Article_info />
            <!-- 右边文章 -->
            <Article_list />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.main__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 15px;
}

.box {
  margin-top: 100px;
}
</style>
