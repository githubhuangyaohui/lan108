<template>
    <el-container>
        <el-main style="margin:1%;padding: 0%">
            <el-card shadow="never" class="card1">
                <div slot="header" class="clearfix">
                    <span>关注专栏推送信息</span>
                </div>
                <div v-for="item in blogs" :key="item.id">
                    <div @click="viewBlogs(item)">
                        <el-card class="card-main" shadow="hover">
                            <el-image
                                    class="blogImage"
                                    :src="item.blogsCover"
                                    :fit="fit"></el-image>
                            <div>
                                <span class="blogTitle">{{ item.blogsTitle }}</span>
                            </div>
                            <div class="summary">
                                <span>{{ item.blogsSummary }}</span>
                            </div>
                        </el-card>
                    </div>
                   <div @click="setIsRead(item.id)">
                       <el-card class="card-aside">
                           <span>设置为已读</span>
                       </el-card>
                   </div>
                    <div @click="viewAuthor(item)">
                        <el-card class="card-aside2">
                            <span>查看作者信息</span>
                        </el-card>
                    </div>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'homeFocus',
  data () {
    return {
      fit: 'contain',
      blogs: []
    }
  },
  mounted () {
    this.loadMessage()
  },
  methods: {
    viewAuthor (item) {
      console.log('查看作者信息')
      let routerJump = this.$router.resolve({
        path: '/viewAuthor', query: {blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    viewBlogs (item) {
      console.log('查看文章')
      this.setIsRead(item.id)
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: JSON.stringify(item.id), blogsAuthorId: JSON.stringify(item.blogsAuthorId)}
      })
      window.open(routerJump.href, '_blank')
    },
    loadMessage () {
      this.$axios.post('/focus/message/list', {
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.blogs = resp.data
          console.log(this.blogs)
        }
      })
    },
    setIsRead (blogID) {
      this.$axios.post('/focus/message/setRead', {
        userID: this.$store.state.user.id,
        blogID: blogID
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.$message(resp.data.message)
          this.loadMessage()
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
