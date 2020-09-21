<template>
    <el-container>
        <el-aside class="aside">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>个人信息:</span>
                </div>
                <el-card id="userName">{{this.$store.state.user.userName}}</el-card>
                <el-card id="userSex" v-if="this.$store.state.user.userSex">男</el-card>
                <el-card id="userSex" v-else>女</el-card>
                <el-card id="userEmail">{{this.$store.state.user.userEmail}}</el-card>
                <el-card id="userLevel">
                    <span>等级:</span>
                    {{this.$store.state.user.userLevel}}
                </el-card>
            </el-card>
        </el-aside>
        <el-main class="main">
            <el-card>
                <el-card style="text-align: center;width: 100%">
                    <div @click="beAuthor=true"
                         style="font-size:100%"
                         @mouseover.passive="mouseOver1"
                         @mouseleave.passive="mouseLeave1"
                         :style="active1">
                        <el-card  class="register">
                            注册/修改作者信息
                        </el-card>
                    </div>
                    <div @click="beAdmin=true"
                         style="font-size:100%"
                         @mouseover.passive="mouseOver2"
                         @mouseleave.passive="mouseLeave2"
                         :style="active2">
                        <el-card class="register">
                            成为专栏管理员
                        </el-card>
                    </div>
                </el-card>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>专栏收录文章列表:</span>
                    </div>
                    <div v-for="item in this.Blogs" :key="item.id" @click="viewBlogs(item)">
                        <el-card shadow="hover" style="width: 100%; height: 130px">
                            <el-image
                                    style="width: 100px; height: 100px;float: left"
                                    :src="item.blogsCover"
                                    :fit="fit"></el-image>
                            <div>
                                <span style="font-size: 30px">{{item.blogsTitle}}</span>
                            </div>
                            <div class="summary">
                                <span>{{item.blogsSummary}}</span>
                            </div>
                        </el-card>
                    </div>
                </el-card>
            </el-card>
<!--注册修改界面-->
            <el-dialog
                    :visible.sync="beAuthor"
                    width="40%">
                <el-form>
                    <el-form-item>
                        <el-card>
                            <span>姓名:</span>
                            <el-input style="width: 80%" v-model="author.authorShowName">{{author.authorShowName}}</el-input>
                        </el-card>
                    </el-form-item>
                    <el-form-item>
                        <el-card>
                            <span>电话:</span>
                            <el-input style="width: 80%" v-model="author.authorPhone">{{author.authorPhone}}</el-input>
                        </el-card>
                    </el-form-item>
                    <el-form-item>
                        <el-card>
                            <span>邮箱:</span>
                            <el-input style="width: 80%" v-model="author.authorEmail">{{author.authorEmail}}</el-input>
                        </el-card>
                    </el-form-item>
                    <el-form-item style="text-align: center ">
                            <el-button @click="beAuthor = false">取 消</el-button>
                            <el-button type="primary" @click="registerAuthor">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
<!--提交成为管理员的申请-->
            <el-dialog
                    :visible.sync="beAdmin"
                    width="40%">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>申请方式:</span>
                    </div>
                    <ul>
                        <li>投稿给官方专栏:(108lan)</li>
                        <li>包含可以确认你身份的个人信息</li>
                        <li>包含申请理由</li>
                        <li>包含你的优势</li>
                    </ul>
                </el-card>
                <div v-if="isAdmin" @click="adminPage">
                    <el-card id="adminPage">
                        <span>进入管理界面</span>
                    </el-card>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'homeAdmin',
  data () {
    return {
      fit: 'contain',
      active1: '',
      active2: '',
      beAuthor: false,
      beAdmin: false,
      author: {
        authorShowName: '',
        authorPhone: '',
        authorEmail: ''
      },
      Blogs: [{
        id: 0,
        blogsTitle: '',
        blogsCover: '',
        blogsSummary: '',
        blogsAuthorId: ''
      }],
      isAdmin: false
    }
  },
  mounted () {
    this.loadAuthor()
    this.loadBlogs()
    this.loadIsAdmin()
  },
  methods: {
    mouseOver1: function () {
      this.active1 = 'font-size:200%'
      this.active2 = 'font-size:50%'
    },
    mouseLeave1: function () {
      this.active1 = 'font-size:100%'
      this.active2 = 'font-size:100%'
    },
    mouseOver2: function () {
      this.active2 = 'font-size:200%'
      this.active1 = 'font-size:50%'
    },
    mouseLeave2: function () {
      this.active2 = 'font-size:100%'
      this.active1 = 'font-size:100%'
    },
    loadIsAdmin () {
      this.$axios.post('/admin/isAdmin', {
        userId: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      })
    },
    adminPage () {
      this.beAdmin = false
      console.log('管理专栏')
      let routerJump = this.$router.resolve({
        path: '/adminPage', query: {}
      })
      window.open(routerJump.href, '_blank')
    },
    loadAuthor () {
      var url = '/admin/' + this.$store.state.user.id + '/author'
      this.$axios.post(url).then((resp) => {
        if (resp && resp.data !== null) {
          this.$store.commit('author', resp.data)
          this.author = resp.data
          console.log('个人中心')
          console.log(this.author)
        }
      })
    },
    loadBlogs () {
      let urlRole = '/blogs/adminBlogs/' + this.$store.state.user.id
      this.$axios.get(urlRole).then((resp) => {
        if (resp && resp.status === 200) {
          this.Blogs = resp.data
          console.log(this.Blogs)
        }
      })
    },
    viewBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    registerAuthor () {
      this.$axios.post('/admin/addAuthor', {
        userId: this.$store.state.user.id,
        authorShowName: this.author.authorShowName,
        authorPhone: this.author.authorPhone,
        authorEmail: this.author.authorEmail
      }
      ).then((resp) => {
        if (resp.data.number === '200') {
          this.$message(resp.data.message)
        } else if (resp.data.number === '400') {
          this.$message(resp.data.message)
        }
      }).catch(() => {
        this.$message('失败')
      })
      this.beAuthor = false
    }
  }
}
</script>

<style scoped>
    .aside{
        margin:1%;
        padding: 0%;
        width: 20%;
    }
    .main{
        margin:1%;
        padding: 0%;
    }
    .register{
        background: #409EFF;
    }
    #userName{
        background: #F56C6C;
    }
    #userSex{
        background: #67C23A;
    }
    #userEmail{
        background: #409EFF;
    }
    #userLevel{
        background: #909399;
    }
    #adminPage{
        text-align: center;
        background: #F56C6C;
    }
</style>
