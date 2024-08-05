<template>
  <div class="article-detail-page">
    <nav class="nav"><span @click="$router.back()" class="back">&lt;</span> 面经详情</nav>
    <header class="header" v-if="article.id">
      <h1>{{ article.stem }}</h1>
      <p>{{ article.creatAt }} | {{ article.views }} 浏览量 | {{ article.likeCount }} 点赞数</p>
      <p>
        <img
          :src="article.creatorAvatar"
          alt=""
        />
        <span>{{ article.creatorName }}</span>
      </p>
    </header>
    <main class="body">
      {{ article.content }}
    </main>
  </div>
</template>

<script>
// 请求地址: https://mock.boxuegu.com/mock/3083/articles/:id
// 请求方式: get
import axios from "axios";

export default {
  name: "ArticleDetailPage",
  data() {
    return {
      article: {}
    }
  },

  async created() {
    const res = await axios.get(`https://mock.boxuegu.com/mock/3083/articles/${this.$route.params.id}`);
    this.article = res.data.result;
  }
}
</script>

<style lang="less" scoped>
.article-detail-page {
  .nav {
    height: 44px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 44px;
    text-align: center;
    .back {
      font-size: 18px;
      color: #666;
      position: absolute;
      left: 10px;
      top: 0;
      transform: scale(1, 1.5);
    }
  }
  .header {
    padding: 0 15px;
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .body {
    padding: 0 15px;
  }
}
</style>