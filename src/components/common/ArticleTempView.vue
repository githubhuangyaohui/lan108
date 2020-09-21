<template>
    <div>
        <el-container>
            <el-aside class="aside">
                <div>
                    <el-card shadow="never">
                       <el-card>
                           <el-image
                                   style="width: 100%; height: 100px"
                                   :src="this.LanBlogsTemp.blogsCover"
                                   :fit="fit"></el-image>
                       </el-card>
                        <el-card>
                            <div slot="header">
                                <span>标题:</span>
                            </div>
                            {{this.LanBlogsTemp.blogsTitle}}
                        </el-card>
                        <el-card>
                            <div slot="header">
                                <span>所属栏目:</span>
                            </div>
                        </el-card>
                        <el-card>
                            <div slot="header">
                                <span>作者:</span>
                            </div>
                            {{this.Author.authorShowName}}
                        </el-card>
                        <el-card>
                            <div slot="header">
                                <span>联系方式:</span>
                            </div>
                            {{this.Author.authorEmail}}
                        </el-card>
                        <el-card>
                            <div slot="header">
                                <span>摘要:</span>
                            </div>
                            {{this.LanBlogsTemp.blogsSummary}}
                        </el-card>
                    </el-card>
                </div>
            </el-aside>
            <el-main class="main">
                <el-card>
                    <mavon-editor style="padding: 20px" codeStyle="monokai" v-html="LanBlogsTemp.blogsHtml"></mavon-editor>
                    <el-card>{{this.LanBlogsTemp.blogsCreateData}}</el-card>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'ArticleTempView',
  data () {
    return {
      fit: 'contain',
      LanBlogsTemp: {
        id: 0,
        blogsAuthorid: 0,
        blogsCreateData: '',
        blogsTitle: '',
        blogsSummary: '',
        blogsCover: '',
        blogsHtml: '',
        blogsColum: ''
      },
      Author: {
        id: 0,
        authorShowName: '',
        authorEmail: ''
      }
    }
  },
  mounted () {
    this.LanBlogsTemp.id = JSON.parse(this.$route.query.id)
    this.LanBlogsTemp.blogsAuthorId = JSON.parse(this.$route.query.blogsAuthorId)
    this.$axios.post('/view/blogTemp', {
      id: this.LanBlogsTemp.id
    }).then((response) => {
      this.LanBlogsTemp = response.data
    }).catch(() => {
      this.$message('获取失败')
    })
    this.getAuthorMessage(this.LanBlogsTemp.blogsAuthorId)
  },
  methods: {
    getAuthorMessage (blogsAuthorId) {
      console.log(this.LanBlogsTemp.blogsAuthorid)
      let urlAuthor = '/view/' + blogsAuthorId + '/authorMassage'
      console.log(urlAuthor)
      this.$axios.post(urlAuthor).then((response) => {
        this.Author = response.data
        console.log(this.Author)
      }).catch(() => {
        this.$message('获取失败')
      })
    }
  }
}
</script>

<style scoped>
    .aside{
        margin:1%;
        width: 20%;
        padding: 0%;
    }
    .main{
        margin:1%;
        padding: 0%;
    }
    #blog-image{
        padding: 0px;
    }
</style>
