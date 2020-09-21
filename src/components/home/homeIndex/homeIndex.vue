<template>
    <el-container>
        <!--侧边栏-->
        <el-aside class="aside" width="200px">
            <div>
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
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>置顶文章</span>
                </div>
                <div v-for="item in this.blogsFirst" :key="item.id" @click="viewBlogs(item)">
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
            <el-card shadow="never">
                <div v-for="item in this.blogs" :key="item.id" @click="viewBlogs(item)">
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
    .aside{
        margin:1%;
        padding: 0%;
    }
    .main{
        margin:1%;
        padding: 0%;
    }
    .summary{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
