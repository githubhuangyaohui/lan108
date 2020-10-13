<template>
    <el-container>
<!--侧边栏-->
        <el-aside class="aside" width="20%">
            <el-card id="LanList">
                <el-card shadow="never"
                         style="width: 100%;height: 500px;overflow-y:scroll;float: left">
                    <div v-for="item in this.roles" :key="item.id"
                         @click="getRoleMessage(item.id),getRoleBlogs(item.id),getAdminName(item.id)">
                        <el-card>
                            {{ item.rolesLanName }}
                        </el-card>
                    </div>
                </el-card>
            </el-card>
        </el-aside>
        <!--主体部分-->
        <el-main class="main">
            <!--基本信息-->
            <el-card id="messageBox" class="card1">
                <el-image
                        :fit="fit"
                        :src="this.LanRoles.rolesImg"
                        style="width: 200px; height: 200px;float: left"></el-image>
                <el-card id="rolesLanName">
                    <span>{{ this.LanRoles.rolesLanName }}</span>
                </el-card>
                <el-card id="rolesStarname">
                    <span>代号：</span>
                    <span>{{ this.LanRoles.rolesStarname }}</span>
                    <span>{{ this.LanRoles.rolesNickname }}</span>
                    <span>{{ this.LanRoles.rolesTruename }}</span>
                </el-card>
                <div>
                    <el-card id="adminName">
                        <span>管理员:</span>
                        <span>{{ this.adminName }}</span>
                    </el-card>
                    <div v-if="this.$store.state.user.id!=0">
                        <div v-if="focus" @click="unfocusRole(LanRoles.id)">
                            <el-card class="focus">
                                <span>已关注</span>
                            </el-card>
                        </div>
                        <div v-else @click="focusRole(LanRoles.id)">
                            <el-card class="focus">
                                <span>关注</span>
                            </el-card>
                        </div>
                    </div>
                </div>
            </el-card>
            <!--专栏描述-->
            <el-card id="rolesDescription" class="card1">
                <span>{{ this.LanRoles.rolesDescription }}</span>
            </el-card>
            <!--专栏文章列表-->
            <el-card id="adminBlogList" class="card1">
                <div v-for="item in this.roleBlogs" :key="item.id" @click="viewBlogs(item)">
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
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'homeLan',
  data () {
    return {
      fit: 'contain',
      tabPosition: 'left',
      roles: [],
      LanRoles: {
        id: 0,
        rolesLanName: '',
        rolesStarname: '',
        rolesNickname: '',
        rolesTruename: '',
        rolesDescription: '',
        rolesImg: ''
      },
      roleBlogs: [{
        id: 0,
        blogsTitle: '',
        blogsCover: '',
        blogsSummary: '',
        blogsAuthorId: ''
      }],
      adminName: '',
      focus: false
    }
  },
  mounted () {
    this.loadRoles()
    this.getRoleMessage(1)
    this.getRoleBlogs(1)
    this.getAdminName(1)
  },
  methods: {
    focusRole (id) {
      console.log('获得关注:' + id)
      this.$axios.post('/lan/getFocus', {
        roleId: id,
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.getIsFocus(id)
          this.$message(resp.data.message)
        } else if (resp.data.number === '400') {
          this.$message(resp.data.message)
        }
      })
    },
    unfocusRole (id) {
      console.log('取消关注:' + id)
      this.$axios.post('/lan/getUnFocus', {
        roleId: id,
        userID: this.$store.state.user.id
      }).then((resp) => {
        if (resp && resp.data.number === '200') {
          this.getIsFocus(id)
          this.$message(resp.data.message)
        } else if (resp.data.number === '400') {
          this.$message(resp.data.message)
        }
      })
    },
    getIsFocus (id) {
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.user.id != 0) {
        this.$axios.post('/lan/rolesFocus', {
          roleId: id,
          userID: this.$store.state.user.id
        }).then((resp) => {
          if (resp.data.number === '200') {
            this.focus = true
          } else {
            this.focus = false
          }
        })
      }
    },
    loadRoles () {
      this.$axios.get('/lan/rolesName').then((resp) => {
        if (resp && resp.status === 200) {
          this.roles = resp.data
          console.log(this.roles)
        }
      })
    },
    getAdminName (id) {
      this.$axios.post('/lan/rolesAdminName/', {
        roleID: id
      }).then((resp) => {
        if (resp && resp.status === 200) {
          this.adminName = resp.data
          console.log(this.adminName)
        }
      })
    },
    getRoleMessage (id) {
      window.scrollTo(0, 0)
      let urlRole = '/lan/LanRoles/' + id
      console.log(urlRole)
      this.$axios.get(urlRole).then((resp) => {
        if (resp && resp.status === 200) {
          this.LanRoles = resp.data
          this.getIsFocus(id)
        }
      })
    },
    getRoleBlogs (roleId) {
      let urlRole = '/blogs/rolesBlogs/' + roleId
      this.$axios.get(urlRole).then((resp) => {
        if (resp && resp.status === 200) {
          this.roleBlogs = resp.data
          console.log(this.roleBlogs)
        }
      })
    },
    viewBlogs (item) {
      console.log('查看文章')
      let routerJump = this.$router.resolve({
        path: '/viewBlog', query: {id: JSON.stringify(item.id), blogsAuthorId: JSON.stringify(item.blogsAuthorId)}
      })
      window.open(routerJump.href, '_blank')
    }
  }
}
</script>

<style scoped>
    #LanList {
        position: fixed;
        width: 20%;
    }

    .aside {
        margin: 1%;
        padding: 0;
        width: 20%;
    }

    #messageBox {
        width: 99%;
        height: 250px;
        float: left;
    }

    #rolesDescription {
        background: #EBEEF5;
        float: left;
        width: 99%;
    }

    .main {
        margin: 1%;
        padding: 0;
    }

    #rolesLanName {
        background: #F56C6C;
    }

    #rolesStarname {
        background: #67C23A;
    }

    #adminName {
        background: #409EFF;
        float: left;
        width: 50%;
    }

    .focus {
        background: #E6A23C;
        float: right;
        width: 20%;
        text-align: center;
    }

    #adminBlogList {
        float: left;
        width: 99%;
    }
</style>
