import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
// 默认的加载内容
import layout from './layout/index.vue'
import home from '@/router/layout/home.vue'
import category from '@/router/layout/category.vue'
import cart from '@/router/layout/cart.vue'
import user from '@/router/layout/user.vue'

// 按需加载的内容
const login = () => import('./login/index.vue')
const myorder = () => import('./myorder/index.vue')
const pay = () => import('./pay/index.vue')
const prodetail = () => import('./prodetail/index.vue')
const search = () => import('./search/index.vue')
const list = () => import('./search/list.vue')
const notfound = () => import('./notfound/index.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home
        },
        {
          path: '/category',
          component: category
        },
        {
          path: '/cart',
          component: cart
        },
        {
          path: '/user',
          component: user
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/myorder',
      component: myorder
    },
    {
      path: '/pay',
      component: pay
    },
    {
      path: '/prodetail/:id',
      component: prodetail
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/searchlist',
      component: list
    },
    {
      path: '/*',
      component: notfound
    }
  ]
})

// 需要权限访问的页面
const authUrls = ['/pay', '/myorder', '/cart']
router.beforeEach((to, from, next) => {
  if (authUrls.includes(to.path)) {
    const token = store.getters.token

    if (token) {
      next()
    } else {
      Dialog.confirm({
        title: '尚未登录',
        message: '是否前往登录页',
        confirmButtonColor: '#0DC161'
      })
        .then(() => {
          // on confirm
          router.push('/login').then()
        })
        .catch(() => {
          // on cancel
        })
    }
  } else {
    next()
  }
})

export default router
