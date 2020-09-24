<template>
    <body>
        <el-menu
                :default-active="'/index'"
                router
                mode="horizontal"
                text-color="#333"
                active-text-color="red"
                style="width: 100%;min-width: 1200px">
            <el-menu-item style="border-bottom: none;padding: 0" index="/index">
                <!--Logo-->
                <el-image
                        style="width: 60px; height: 60px"
                        :src="url"></el-image>
            </el-menu-item>
            <!--标题-->
            <el-menu-item id="title" v-for="(item,i) in navList" :key="i" :index="item.name">
                {{ item.navItem }}
            </el-menu-item>
            <!--登出按钮-->
            <el-menu-item v-if="this.$store.state.user.id != 0" style="border-bottom: none;float:right">
                <el-button type="danger" plain class="el-icon-switch-button" v-on:click="logout"
                           style="font-size: 100%"></el-button>
            </el-menu-item>
            <!--登录按钮-->
            <el-menu-item v-if="this.$store.state.user.id == 0" style="border-bottom: none;float:right" index="/login">
                <el-button type="primary" plain style="font-size: 100%">登录</el-button>
            </el-menu-item>
            <!--用户显示-->
            <el-menu-item v-if="this.$store.state.user.id != 0" style="border-bottom: none;float:right" index="/admin">
                <el-button type="primary" plain style="font-size: 100%">
                    {{this.$store.state.user.userName}}
                </el-button>
            </el-menu-item>

            <!--搜索框-->
            <el-menu-item style="border-bottom: none;float:right">
                <search-bar></search-bar>
            </el-menu-item>
        </el-menu>
    </body>
</template>

<script>
    import SearchBar from './SearchBar'

    export default {
        name: 'NavMenu',
        components: {SearchBar},
        data() {
            return {
                navList: [
                    {name: '/index', navItem: '首页'},
                    {name: '/lan', navItem: '专栏'},
                    {name: '/focus', navItem: '关注'},
                    {name: '/create', navItem: '投稿'},
                    {name: '/admin', navItem: '个人中心'}
      ],
      url: 'static/108lan-logo.png'
    }
  },
  methods: {
    logout () {
      this.$axios.get('/logout').then((resp) => {
        if (resp.data.number === '200') {
          this.$message(resp.data.message)
          // 前后端状态保持一致
          this.$store.commit('logout')
          this.$router.push('/login')
        } else if (resp.data.number === '400') {
          this.$message(resp.data.message)
          this.$router.push('/index')
        }
      })
    }
  }
}
</script>

<style scoped>
    #title{
        width: 5%;
        border-bottom: none;
        font-size: 100%;
        height: 100%;
    }
</style>
