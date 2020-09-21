import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      //  localStorage，即本地存储，
      //  在项目打开的时候会判断本地存储中是否有 user 这个对象存在，
      //  如果存在就取出来并获得 username 的值，否则则把 username 设置为空。
      //  这样我们只要不清除缓存，登录的状态就会一直保存。
      userName: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userName,
      id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
      userSex: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userSex,
      userEmail: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userEmail,
      userRole: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userRole,
      userLevel: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userLevel
    },
    author: {
      authorShowName: window.localStorage.getItem('author' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('author' || '[]')).authorShowName,
      authorPhone: window.localStorage.getItem('author' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('author' || '[]')).authorPhone,
      authorEmail: window.localStorage.getItem('author' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('author' || '[]')).authorEmail
    },
    searchDate: {
      searchKeyword: '',
      searchBlogs: []
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      console.log(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      state.author = []
      state.searchDate = []
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('author')
      window.localStorage.removeItem('searchDate')
    },
    author (state, author) {
      state.author = author
      console.log(author)
      window.localStorage.setItem('author', JSON.stringify(author))
    }
  },
  actions: {// 处理异步任务
  }
})
