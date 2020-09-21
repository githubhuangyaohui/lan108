<template>
    <el-container>
        <el-main>
            <div v-for="item in this.Blogs" :key="item.id" @click="viewBlogs(item)">
                <el-card shadow="hover" style="width: 100%; height: 150px">
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
