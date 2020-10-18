<template>
    <el-container>
        <el-main>
            <el-card class="card1">
                <div v-for="item in this.Blogs" :key="item.id">
                    <div @click="viewBlogs(item)">
                        <el-card class="card-main" shadow="hover">
                            <el-image
                                    class="blogImage"
                                    :src="item.blogsCover"
                                    :fit="fit"></el-image>
                            <div class="blogTitle">
                                {{ item.blogsTitle }}
                            </div>
                            <div class="summary">
                                {{ item.blogsSummary }}
                            </div>
                        </el-card><el-card class="card-aside">
                        <span>热度(待开发)</span>
                    </el-card>
                        <el-card class="card-aside2">
                            <span>按钮(待开发)</span>
                        </el-card>

                    </div>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      fit: 'contain',
      keywords: '',
      Blogs: []
    }
  },
  mounted () {
    this.keywords = this.$route.query.keyword
    this.searchBlogs(this.keywords)
  },
  methods: {
    searchBlogs (key) {
      this.$axios.post('/search', {
        key: key
      }).then((response) => {
        this.Blogs = response.data
        this.$message('获取成功')
      }).catch(() => {
        this.$message('获取失败')
      })
    },
    viewBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    }
  }
}
</script>
<style scoped>

</style>
