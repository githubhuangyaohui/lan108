<template>
    <el-container style="padding: 1%;background: #F5F5F5">
<!--头部-->
        <el-header>
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-input
                            v-model="LanBlogs.blogsTitle"
                            style="font-size: 20px;width: 100%"
                            placeholder="请输入标题"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-badge :is-dot="isChange">
                        <el-button type="primary" plain @click="saveArticles">保存</el-button>
                    </el-badge>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" plain @click="dialogVisible = true">投稿</el-button>
                </el-col>
            </el-row>
        </el-header>
<!--主体-->
        <el-main style="height: 550px">
<!--编辑器-->
            <el-card>
                <mavon-editor
                        v-model="LanBlogs.blogsContent"
                        ref=md
                        style="height: 100%"
                        @save="saveArticles"
                        @change="change"
                        @imgAdd="imgAdd"
                        @imgDel="imgDel"
                        :ishljs = "true"
                        :toolbars="toolbars"
                        fontSize="16px">
                </mavon-editor>
            </el-card>
<!--弹窗-->
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="50%">
                <!--添加封面图片-->
                <el-card style="text-align: center">
                    <el-divider content-position="center">封面</el-divider>
                    <div>
                        <el-input v-model="LanBlogs.blogsCover"
                                  autocomplete="off"
                                  placeholder="URL(只能上传jpg/png文件，且不超过500kb)">{{LanBlogs.blogsCover}}</el-input>
                        <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                    </div>
                </el-card>
                <!--专栏-->
                <el-card>
                    <el-divider content-position="center">专栏</el-divider>
                    <div>
                        <el-select v-model="LanBlogs.blogsColumn" placeholder="请选择">
                            <el-option
                                    v-for="item in lan"
                                    :key="item.id"
                                    :label="item.rolesLanName"
                                    :value="item.id">
                                <span style="float: left">{{ item.rolesLanName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                        </el-select>
                    </div>
                </el-card>
                <!--添加摘要信息-->
                <el-card>
                    <el-divider content-position="center">摘要</el-divider>
                    <el-input
                            type="textarea"
                            v-model="LanBlogs.blogsSummary"
                            rows="4"
                            maxlength="200"
                            show-word-limit></el-input>
                </el-card>
                <!--确认选项-->
                <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="publishedArticles">投稿</el-button>
                 </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import ImgUpload from './ImgUpload'

export default {
  name: 'Editor',
  components: {ImgUpload},
  data () {
    return {
      isChange: false,
      LanBlogs: {
        id: 0,
        blogsAuthorId: '',
        blogsTitle: '',
        blogsContent: '',
        blogsHtml: '',
        blogsSummary: '',
        blogsCover: '',
        blogsColumn: 0
      },
      lan: [{
        id: 0,
        rolesLanName: ''
      }],
      dialogVisible: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  mounted () {
    if (this.$route.query.LanBlogs) {
      this.LanBlogs = JSON.parse(this.$route.query.LanBlogs)
      console.log(this.LanBlogs)
    } else {
      this.getAuthorID()
    }
    this.LoadLanName()
  },
  methods: {
    imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$axios({
        url: 'covers',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
             * $vm 指为mavonEditor实例，可以通过如下两种方式获取
             * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
             * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
             */
        let res = url.data
        this.$refs.md.$img2Url(pos, res)
      })
    },
    imgDel (pos) {
      delete this.img_file[pos]
    },
    getAuthorID () {
      this.$axios.post('/author/getAuthorID', {
        userId: this.$store.state.user.id
      }).then((response) => {
        if (response.data !== 0) {
          this.LanBlogs.blogsAuthorId = response.data
        } else {
          this.$message('请先在个人中心注册成为作者')
        }
      })
    },
    LoadLanName () {
      this.$axios.post('/lan/rolesName').then((response) => {
        if (response.data !== 0) {
          this.lan = response.data
        }
      })
    },
    publishedArticles () {
      this.saveArticles()
      this.$axios.post('/creat/publishedArticle', {
        blogId: this.LanBlogs.id
      }
      ).then((response) => {
        if (response.data.number === '200') {
          this.dialogVisible = false
          this.$message(response.data.message)
        }
      })
    },
    change (value, render) {
      this.isChange = true
      this.LanBlogs.blogsHtml = render
    },
    saveArticles () {
      this.$axios
        .post('/creat/saveArticle', {
          id: this.LanBlogs.id,
          blogsAuthorId: this.LanBlogs.blogsAuthorId,
          blogsTitle: this.LanBlogs.blogsTitle,
          blogsContent: this.LanBlogs.blogsContent,
          blogsHtml: this.LanBlogs.blogsHtml,
          blogsSummary: this.LanBlogs.blogsSummary,
          blogsCover: this.LanBlogs.blogsCover,
          blogsColumn: this.LanBlogs.blogsColumn
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.LanBlogs.id = resp.data
            this.$message({
              type: 'info',
              message: '已保存成功'
            })
            this.isChange = false
            this.dialogVisible = false
          }
        })
    },
    uploadImg () {
      this.LanBlogs.blogsCover = this.$refs.imgUpload.url
      console.log(this.LanBlogs.blogsCover)
    }
  }
}
</script>
