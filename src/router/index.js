import Vue from 'vue'
import Router from 'vue-router'
import homeIndex from '../components/home/homeIndex/homeIndex'
import homeFocus from '../components/home/homeFocus/homeFocus'
import homeCreate from '../components/home/homeCreate/homeCreate'
import homeAdmin from '../components/home/homeAdmin/homeAdmin'
import Login from '../components/Login/Login'
import register from '../components/Login/register'
import home from '../components/home/home'
import search from '../components/home/searchPage/search'
import ArticleEditor from '../components/common/ArticleEditor'
import ArticleView from '../components/common/ArticleView'
import homeLan from '../components/home/homeLan/homeLan'
import adminPage from '../components/common/adminPage'
import ArticleTempView from '../components/common/ArticleTempView'
import CheatBox from '../components/common/CheatBox'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'homeIndex',
          component: homeIndex,
          meta: {
            // 设置登录拦截
            requireAuth: false
          }
        },
        {
          path: '/focus',
          name: 'homeFocus',
          component: homeFocus,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/lan',
          name: 'homeLan',
          component: homeLan,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/create',
          name: 'homeCreate',
          component: homeCreate,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/admin',
          name: 'homeAdmin',
          component: homeAdmin,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/search',
          name: 'search',
          component: search,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/editor',
      name: 'Editor',
      component: ArticleEditor,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminPage',
      name: 'adminPage',
      component: adminPage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/viewBlog',
      name: 'ArticleView',
      component: ArticleView,
      meta: {
        // 设置登录拦截
        requireAuth: true
      },
      children: [
        {
          path: '/register',
          name: 'CheatBox',
          component: CheatBox
        }
      ]
    },
    {
      path: '/viewBlogTemp',
      name: 'viewBlogTemp',
      component: ArticleTempView,
      meta: {
        // 设置登录拦截
        requireAuth: true
      }
    }
  ]
})
