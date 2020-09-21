<template>
<div>
    <el-container>
        <el-aside class="aside">
            <div>
                <el-card shadow="never">
                    <el-card>
                        <el-image
                                style="width: 100%; height: 100px"
                                :src="this.LanBlogs.blogsCover"
                                :fit="fit"></el-image>
                    </el-card>
                    <el-card>
                        <div slot="header">
                            <span>标题:</span>
                        </div>
                        {{this.LanBlogs.blogsTitle}}
                    </el-card>
                    <el-card>
                        <div slot="header">
                            <span>所属栏目:</span>
                        </div>
                        <span>{{this.role.rolesLanName}}</span>
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
                        {{this.LanBlogs.blogsSummary}}
                    </el-card>
                </el-card>
            </div>
        </el-aside>
<!--主体部分-->
        <el-main class="main">
            <div v-if="drawer==false"
                 style="z-index: 9999;
                        position: fixed;
                        right: 25px;
                        bottom: 30%">
                <div  @click="drawer = true">
                    <el-card style="background: #409EFF; width: 60px; height: 60px;">
                        <i class="el-icon-s-promotion"></i>
                    </el-card>
                </div>
                <a href="#top">
                    <el-card style="background: #67C23A; width: 60px; height: 60px;">
                        <i class="el-icon-arrow-up"></i>
                    </el-card>
                </a>
            </div>
            <el-card>
                <mavon-editor style="padding: 20px" v-html="LanBlogs.blogsHtml"></mavon-editor>
                <el-card>{{this.LanBlogs.blogsCreateData}}</el-card>
            </el-card>
            <div>
                <el-drawer
                        title="我是标题"
                        :visible.sync="drawer"
                        :with-header="false">
                    <cheat-box :sip="this.LanBlogs.id"></cheat-box>
                </el-drawer>
            </div>
        </el-main>
    </el-container>
</div>
</template>

<script>
import CheatBox from './CheatBox'
export default {
  name: 'ArticleView',
  components: {CheatBox},
  data () {
    return {
      drawer: false,
      fit: 'contain',
      LanBlogs: {
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
      },
      role: {}
    }
  },
  mounted () {
    this.LanBlogs.id = this.$route.query.id
    this.LanBlogs.blogsAuthorId = this.$route.query.blogsAuthorId
    this.getBlogMessage()
    this.getAuthorMessage(this.LanBlogs.blogsAuthorId)
  },
  methods: {
    getRoleMessage () {
      this.$axios.post('/view/role/message', {
        roleId: this.LanBlogs.blogsColumn
      }).then((response) => {
        this.role = response.data
      }).catch(() => {
        this.$message('获取失败')
      })
    },
    getBlogMessage () {
      let url = '/view/' + this.LanBlogs.id + '/blogMassage'
      this.$axios.post(url).then((response) => {
        this.LanBlogs = response.data
        this.getRoleMessage()
      }).catch(() => {
        this.$message('获取失败')
      })
    },
    getAuthorMessage (blogsAuthorId) {
      let urlAuthor = '/view/' + blogsAuthorId + '/authorMassage'
      this.$axios.post(urlAuthor).then((response) => {
        this.Author = response.data
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
