<template>
    <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">108lan</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-row>
                    <el-tag style="width: 50%">性别</el-tag>
                    <el-radio v-model="loginForm.userSex" label="true">男</el-radio>
                    <el-radio v-model="loginForm.userSex" label="false">女</el-radio>
            </el-row>
        </el-form-item>
        <el-form-item>
            <p>
                <el-input type="text" v-model="loginForm.email"
                          auto-complete="off" placeholder="邮箱"></el-input>
            </p>
            <p>
                <el-input type="text" v-model="loginForm.code" style="width: 50%"
                          auto-complete="off" placeholder="验证码(5分钟内有效)"></el-input>
                <el-button type="primary" plain :disabled="disable" @click="send">{{getCode}}</el-button>
            </p>
        </el-form-item>
        <el-form-item style="text-align: center">
            <el-button type="primary" round v-on:click="register">注册</el-button>
        </el-form-item>
    </el-form>
    </body>

</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      loginForm: {
        userName: '',
        userPassword: '',
        userSex: '',
        userEmail: '',
        code: ''
      },
      responseResult: [],
      getCode: '获取验证码',
      isGeting: false,
      count: 240,
      disable: false
    }
  },
  methods: {
    register () {
      this.$axios
        .post('/register', {
          user: {
            userName: this.loginForm.username,
            userPassword: this.loginForm.password,
            userSex: this.loginForm.userSex,
            userEmail: this.loginForm.email
          },
          code: this.loginForm.code
        }).then((response) => {
          if (response.data.number === '200') {
            this.$message(response.data.message)
            this.$router.replace({path: '/login'})
          } else if (response.data.number === '400') {
            this.$message(response.data.message)
          }
        })
        .catch(failResponse => {
          this.$message('注册错误')
        })
    },
    send () {
      // 判断邮箱位置是否为空
      var email = this.loginForm.email
      if (email === '') {
        this.$message('Email为空')
        return
      }
      var countDown = setInterval(() => {
        if (this.count < 1) {
          this.isGeting = false
          this.disable = false
          this.getCode = '获取验证码'
          this.count = 120
          clearInterval(countDown)
        } else {
          this.isGeting = true
          this.disable = true
          this.getCode = this.count-- + 's后重发'
        }
      }, 1000)
      this.$axios
        .post('/email', {
          userEmail: this.loginForm.email
        }).then((successResponse) => {
          if (successResponse.data.number === '200') {
            this.$message(successResponse.data.message)
          } else if (successResponse.data.number === '400') {
            this.$message(successResponse.data.message)
          }
        })
        .catch(failResponse => {
          this.$message('发送失败')
        })
    }
  }
}
</script>

<style scoped>
</style>
