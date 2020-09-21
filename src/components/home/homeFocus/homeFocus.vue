<template>
    <el-container>
        <el-main style="margin:1%;padding: 0%">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>关注专栏推送信息</span>
                </div>
                <div v-for="item in blogs" :key="item.id" @click="viewBlogs(item)">
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
    .summary{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
