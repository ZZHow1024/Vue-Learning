import Vue from 'vue'
import VueRouter from "vue-router";
import Article from "@/views/Article.vue";
import Layout from "@/views/Layout.vue";
import ArticleDetail from "@/views/ArticleDetail.vue";
import Collect from "@/views/Collect.vue";
import Like from "@/views/Like.vue";
import User from "@/views/User.vue";
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/article',
      //通过 children 配置项配置嵌套子路由
      children: [
        {
          path: '/article',
          component: Article
        },
        {
          path: '/collect',
          component: Collect
        },
        {
          path: '/like',
          component: Like
        },
        {
          path: '/user',
          component: User
        }
      ]
    },
    {
      path: '/detail/:id?',
      component: ArticleDetail
    },
    {
      path: '*',
      redirect: '/article'
    }
  ]
})

export default router