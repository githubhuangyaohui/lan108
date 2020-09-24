<template>
    <el-container>
        <!--侧边栏-->
        <el-aside class="aside" width="200px">
            <!--走马灯图片-->
            <div id="asidePicture">
                <el-carousel
                        arrow="always"
                        height="500px"
                        direction="vertical"
                        :autoplay="true">
                    <div v-for="item in pic" :key="item.id" @click="openAd(item.lanAdLink)">
                        <el-carousel-item>
                            <el-image
                                    style="width: 200px; height: 500px"
                                    :src="item.lanAdImage"
                                    :fit="fit"></el-image>
                        </el-carousel-item>
                    </div>
                </el-carousel>
            </div>
        </el-aside>
        <!--主体-->
        <el-main class="main">
            <!--置顶文章-->
            <el-card class="card1" shadow="never">
                <div v-for="item in this.blogsFirst" :key="item.id" @click="viewBlogs(item)">
                    <el-card class="blogList" shadow="hover">
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
                    </el-card>
                </div>
            </el-card>
            <!--推荐文章列表-->
            <el-card class="card1" shadow="never">
                <div v-for="item in this.blogs" :key="item.id" @click="viewBlogs(item)">
                    <el-card class="blogList" shadow="hover">
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
                    </el-card>
                </div>
                <!--分页组件-->
                <el-row style="text-align: center">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize">
                    </el-pagination>
                </el-row>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'homeIndex',
  data () {
    return {
      fit: 'fill',
      pic: [{
        lanAdImage: '',
        lanAdLink: ''
      }],
      blogsFirst: [],
      blogs: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.loadBlogs(this.currentPage)
    this.loadImage()
    this.loadBlogsFirst()
  },
  methods: {
    loadImage () {
      this.$axios.post('/home/index/image').then((resp) => {
        if (resp && resp.status === 200) {
          this.pic = resp.data
        }
      })
    },
    openAd (url) {
      window.open(url, '_blank')
    },
    viewBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    loadBlogs (currentPage) {
      var _this = this
      var url = '/home/' + currentPage + '/blogs'
      this.$axios.post(url).then((resp) => {
        if (resp && resp.status === 200) {
          _this.blogs = resp.data
          console.log(this.blogs)
        }
      })
    },
    loadBlogsFirst () {
      var _this = this
      var url = '/home/blogsFirst'
      this.$axios.post(url).then((resp) => {
        if (resp && resp.status === 200) {
          _this.blogsFirst = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.loadBlogs(currentPage)
    }
  }
}
</script>

<style scoped>
    .aside {
        margin: 1%;
        padding: 0;
    }

    #asidePicture {
        position: fixed;
        width: 200px;
        height: 500px;
    }

    .main {
        margin: 1%;
        padding: 0;
        width: 1000px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
</style>
