<template>
    <el-container>
        <el-aside>
            <el-card class="card1" style="background: #fafafa">
                <el-card style="background: #F56C6C">
                    <div slot="header">
                        <span>笔名:</span>
                    </div>
                    {{ this.author.authorShowName }}
                </el-card>
                <el-card style="background: #67C23A">
                    <div slot="header">
                        <span>联系邮件:</span>
                    </div>
                    {{ this.author.authorEmail }}
                </el-card>
                <el-card style="background: #409EFF">
                    <div slot="header">
                        <span>入驻日期:</span>
                    </div>
                    {{ this.author.authorCreateData }}
                </el-card>
            </el-card>
        </el-aside>
        <el-main>
            <!--专栏列表-->
            <el-card class="card1" style="width: 99%">
                <div slot="header">
                    <span>发布文章列表:</span>
                </div>
                <div v-for="item in this.Blogs" :key="item.id">
                    <div @click="viewBlogs(item)">
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
                    <el-card class="card-aside">
                        <span>热度(待开发)</span>
                    </el-card>
                    <el-card class="card-aside2">
                        <span>按钮(待开发)</span>
                    </el-card>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'author',
  data () {
    return {
      fit: 'contain',
      Blogs: [],
      author: {
        id: 0,
        authorShowName: '',
        authorCreateData: '',
        authorEmail: ''
      }
    }
  },
  mounted () {
    this.author.id = this.$route.query.blogsAuthorId
    this.getAuthorMessage()
    this.getAuthorBlogList()
  },
  methods: {
    viewBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    getAuthorMessage () {
      this.$axios.post('/view/getAuthorMessage', {
        authorID: this.author.id
      }).then((response) => {
        this.author = response.data
        console.log(this.Author)
      }).catch(() => {
        this.$message('获取失败')
      })
    },
    getAuthorBlogList () {
      this.$axios.post('/view/getAuthorList', {
        authorID: this.author.id
      }).then((response) => {
        this.Blogs = response.data
        console.log(this.Author)
      }).catch(() => {
        this.$message('获取失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
