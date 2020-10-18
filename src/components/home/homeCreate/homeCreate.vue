<template>
    <el-container>
        <el-main>
            <!--新建文章-->
            <el-card class="card1" style="text-align: center;background: #fafafa">
                <div :style="active"
                     class="el-icon-circle-plus"
                     style="font-size:80px"
                     @click="creatBlog"
                     @mouseover.passive="mouseOver"
                     @mouseleave.passive="mouseLeave"></div>
            </el-card>
            <!--草稿文章列表-->
            <el-card class="card1">
                <div slot="header">
                    <span>草稿</span>
                </div>
                <div v-for="item in this.BlogsTemp" :key="item.id" ref="item">
                    <!--文章显示-->
                    <div @click="editorBlogs(item)">
                        <el-card class="card-main" shadow="hover">
                            <el-image
                                    :fit="fit"
                                    :src="item.blogsCover"
                                    style="width: 100px; height: 100px;float: left"></el-image>
                            <div>
                                <span style="font-size: 30px">{{ item.blogsTitle }}</span>
                            </div>
                            <div class="summary">
                                <span>{{ item.blogsSummary }}</span>
                            </div>
                        </el-card>
                    </div>
                    <!--删除按钮-->
                    <div @click="deleteTempBlog(item)">
                        <el-card class="card-aside">
                            <span>删除</span>
                        </el-card>
                    </div>
                    <!--预览按钮-->
                    <div @click="viewTempBlog(item)">
                        <el-card class="card-aside2">
                            <span>预览</span>
                        </el-card>
                    </div>
                </div>
            </el-card>
            <!--投稿文章列表-->
            <el-card class="card1">
                <div slot="header">
                    <span>投稿</span>
                </div>
                <div v-for="item in this.BlogsTempSubmit" :key="item.id" ref="item">
                    <!--投稿文章-->
                    <div @click="editorBlogs(item)">
                        <el-card class="card-main" shadow="hover">
                            <el-image
                                    :fit="fit"
                                    :src="item.blogsCover"
                                    class="blogImage"></el-image>
                            <div class="blogTitle">
                                {{ item.blogsTitle }}
                            </div>
                            <div class="summary">
                                {{ item.blogsSummary }}
                            </div>
                        </el-card>
                    </div>
                    <!--删除按钮-->
                    <div @click="deleteTempBlog(item)">
                        <el-card class="card-aside">
                            <span>删除</span>
                        </el-card>
                    </div>
                    <!--撤销删除按钮-->
                    <div @click="unSubmitTempBlog(item)">
                        <el-card class="card-aside2" style="background: #E6A23C">
                            <span>撤销</span>
                        </el-card>
                    </div>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'homeCreate',
  data () {
    return {
      fit: 'contain',
      active: '',
      BlogsTemp: [],
      BlogsTempSubmit: [],
      authorID: 0
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    // 初始化页面
    initPage () {
      this.loadBlogsTemp()
      this.loadBlogsTempSubmit()
    },
    // 删除博客
    deleteTempBlog (item) {
      console.log('点击了删除博客')
      this.$axios.post('/blogTemp/delete', {
        userId: this.$store.state.user.id,
        blogTempId: item.id
      }).then((response) => {
        if (response.data.number === '200') {
          this.$message(response.data.message)
          this.initPage()
        } else if (response.data.number === '400') {
          this.$message(response.data.message)
        }
      })
    },
    // 预览博客
    viewTempBlog (item) {
      console.log('点击了预览博客')
      let routerJump = this.$router.resolve({
        path: '/viewBlogTemp', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    // 撤销提交博客
    unSubmitTempBlog (item) {
      console.log('点击了撤销投稿')
      this.$axios.post('/blogTemp/unSubmit', {
        userId: this.$store.state.user.id,
        blogTempId: item.id
      }).then((response) => {
        if (response.data.number === '200') {
          this.$message(response.data.message)
          this.initPage()
        } else if (response.data.number === '400') {
          this.$message(response.data.message)
        }
      })
    },
    // 编辑博客
    editorBlogs (item) {
      console.log('编辑文章')
      let routerJump = this.$router.resolve({
        path: '/editor', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    // 创建新博客
    creatBlog () {
      console.log('创建新博客')
      this.$axios.post('/author/getAuthorID', {
        userId: this.$store.state.user.id
      }).then((response) => {
        if (response.data !== 0) {
          this.BlogsTemp = response.data
          let routeUrl = this.$router.resolve({path: '/editor'})
          window.open(routeUrl.href, '_blank')
          this.initPage()
        } else {
          this.$message({
            type: 'info',
            message: '请先在个人中心注册成为作者'
          })
        }
      })
    },
    // 动画
    mouseOver: function () {
      this.active = 'font-size:100px'
    },
    mouseLeave: function () {
      this.active = ''
    },
    // 加载草稿
    loadBlogsTemp () {
      this.$axios.post('/author/getAuthorID', {
        userId: this.$store.state.user.id
      }).then((response) => {
        if (response.data !== 0) {
          this.authorID = response.data
          this.$axios.post('/blogTemp/getTempBlog', {
            userAuthorId: this.authorID
          }).then((resp) => {
            if (resp && resp.status === 200) {
              this.BlogsTemp = resp.data
            }
          }).catch(() => {
            this.$message('获取失败')
          })
        } else {
          this.$message('请先在个人中心注册成为作者')
        }
      })
    },
    // 加载投稿博客
    loadBlogsTempSubmit () {
      this.$axios.post('/author/getAuthorID', {
        userId: this.$store.state.user.id
      }).then((response) => {
        if (response.data !== 0) {
          this.authorID = response.data
          this.$axios.post('/blogTemp/getTempBlog/Submit', {
            userAuthorId: this.authorID
          }).then((resp) => {
            if (resp && resp.status === 200) {
              console.log('返回投稿博客')
              this.BlogsTempSubmit = resp.data
              console.log(this.BlogsTempSubmit)
            }
          }).catch(() => {
            this.$message('获取失败')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
