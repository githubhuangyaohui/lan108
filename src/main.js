// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'default-passive-events'
import store from './store'

// 设置反向代理，前端请求默认发送到 http://localhost:8001/api
var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8001/api'
axios.defaults.baseURL = 'http://108lan.com:8001/api'
// 让前端能够带上 cookie11
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(VueResource)
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.id) {
      console.log('用户存在')
      axios.post('/authentication').then((resp) => {
        next()
      }).catch(() => {
        store.commit('logout')
        alert('服务器宕机了')
      })
    } else {
      console.log('用户不存在，页面跳转')
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
