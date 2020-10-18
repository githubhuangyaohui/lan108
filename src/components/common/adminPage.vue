<template>
    <el-container>
        <!--侧边导航栏-->
        <el-aside class="aside">
            <el-card shadow="never">
                <div @click="getsubmitBlogs">
                    <el-card id="one">
                        <span>收件箱</span>
                    </el-card>
                </div>
                <div @click="getPassedBlogList">
                    <el-card id="two">
                        <span>通过</span>
                    </el-card>
                </div>
                <div @click="getUnPassedBlogList">
                    <el-card id="three">
                        <span>未通过</span>
                    </el-card>
                </div>
                <div @click="getRolesMessage">
                    <el-card id="fore">
                        <span>专栏信息</span>
                    </el-card>
                </div>
            </el-card>
        </el-aside>
        <!--主页显示栏-->
        <el-main class="main">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>博客列表:</span>
                </div>
                <div v-for="item in this.Blogs" :key="item.id">
                    <div  @click="viewTempBlogs(item)">
                        <el-card id="list" class="card-main" shadow="hover">
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
                    <div  @click="passBlogs(item)" v-if="passUnpass">
                        <el-card shadow="hover" class="card-aside">
                            <span>通过</span>
                        </el-card>
                    </div>
                    <div  @click="unPassBlogs(item)" v-if="passUnpass">
                        <el-card shadow="hover" class="card-aside2">
                            <span>不通过</span>
                        </el-card>
                    </div>
                </div>
            </el-card>
<!--专栏信息-->
            <el-dialog
                    :visible.sync="roleMessage"
                    width="40%">
                <el-form>
                    <el-form-item>
                        <el-card>
                            <span>专栏名称:</span>
                            <el-input style="width: 80%" v-model="role.rolesLanName">{{role.rolesLanName}}</el-input>
                        </el-card>
                    </el-form-item>
                    <el-form-item>
                        <el-card>
                            <span>专栏描述:</span>
                            <el-input style="width: 80%" v-model="role.rolesDescription">{{role.rolesDescription}}</el-input>
                        </el-card>
                    </el-form-item>
                    <el-form-item>
                        <el-card>
                            <span>专栏封面:</span>
                            <div style="text-align: center">
                                <el-input v-model="role.rolesImg"
                                          autocomplete="off"
                                          placeholder="URL(只能上传jpg/png文件，且不超过500kb)">{{role.rolesImg}}</el-input>
                                <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                            </div>
                        </el-card>
                    </el-form-item>
                    <el-form-item style="text-align: center ">
                        <el-button @click="roleMessage = false">取 消</el-button>
                        <el-button type="primary" @click="updateRole">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import ImgUpload from './ImgUpload'

export default {
  name: 'adminPage',
  components: {ImgUpload},
  data () {
    return {
      passUnpass: true,
      roleMessage: false,
      fit: 'contain',
      Blogs: [{
        id: 0,
        blogsTitle: '',
        blogsCover: '',
        blogsSummary: '',
        blogsAuthorId: ''
      }],
      role: {
        rolesLanName: '',
        rolesDescription: '',
        rolesImg: ''
      }
    }
  },
  mounted () {
    this.getsubmitBlogs()
    this.passUnpass = true
  },
  methods: {
    uploadImg () {
      this.role.rolesImg = this.$refs.imgUpload.url
    },
    passBlogs (item) {
      console.log('提交通过请求')
      this.$axios.post('/admin/publicBlogs', {
        userID: this.$store.state.user.id,
        blogTempId: item.id
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.$message(resp.data.message)
          this.getsubmitBlogs()
        }
      })
    },
    unPassBlogs (item) {
      console.log('提交不通过请求')
      this.$axios.post('/admin/unpassBlogs', {
        userID: this.$store.state.user.id,
        blogTempId: item.id
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.$message(resp.data.message)
          this.getsubmitBlogs()
        }
      })
    },
    viewTempBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlogTemp', query: {id: item.id, blogsAuthorId: item.blogsAuthorId}
      })
      window.open(routerJump.href, '_blank')
    },
    getsubmitBlogs () {
      this.passUnpass = true
      this.$axios.post('/admin/submitBlogs', {
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.Blogs = resp.data
          console.log(this.blogs)
        }
      })
    },
    getPassedBlogList () {
      this.passUnpass = false
      this.$axios.post('/admin/passBlogs', {
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.Blogs = resp.data
          console.log(this.blogs)
        }
      })
    },
    getUnPassedBlogList () {
      this.passUnpass = false
      this.$axios.post('/admin/unPassBlogs', {
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.Blogs = resp.data
          console.log(this.blogs)
        }
      })
    },
    getRolesMessage () {
      this.roleMessage = true
      this.$axios.post('/admin/RoleMessage', {
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.role = resp.data
        }
      })
    },
    updateRole () {
      this.roleMessage = false
      this.$axios.post('/admin/changeRole', {
        userID: this.$store.state.user.id,
        rolesLanName: this.role.rolesLanName,
        rolesDescription: this.role.rolesDescription,
        rolesImg: this.role.rolesImg
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.$message(resp.data.message)
          this.roleMessage = false
        }
      })
    }
  }
}
</script>

<style scoped>
    .aside {
        margin: 1%;
        padding: 0%;
        width: 20%;
    }

    .main {
        margin: 1%;
        padding: 0%;
    }

    #one {
        background: #F56C6C;
    }

    #two {
        background: #67C23A;
    }

    #three {
        background: #409EFF;
    }

    #fore {
        background: #E6A23C;
    }

    #list {
        float: left;
    }

    #pass {
        width: 100px;
        height: 70px;
        float: left;
        background: #F56C6C;
    }

    #unpass {
        width: 100px;
        height: 70px;
        float: left;
        background: #67C23A;
    }
</style>
