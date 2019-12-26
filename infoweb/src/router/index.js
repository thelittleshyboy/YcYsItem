import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/details/:id',
      name: 'DetailsArticle',
      component: () => import('@/components/DetailsArticle'),
      meta: {
        title: '详情页',
        keepAlive: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home'),
      meta: {
        title: '主页',
        keepAlive: true
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/components/Mine'),
      meta: {
        title: '我的',
        keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/manage',
      name: 'Manage',
      component: () => import('@/components/Manage'),
      meta: { title: '管理' }
    },
    {
      path: '/classify',
      redirect: '/classify/movie'
    },
    {
      path: '/classify/movie',
      name: 'Movie',
      component: () => import('@/components/Classify/Movie'),
      meta: { 
        title: '电影',
        keepAlive: true 
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('user')
  if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
    if (isLogin) { // 判断是否已经登录
      next()
    }
    else {
      Message.error('请登录后再操作');
    }
  }
  else {
    next()
  }
})

export default router
