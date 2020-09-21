<template>
<!--登录表单-->
  <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <!--标题-->
      <h3 class="login_title">108lan</h3>
      <!--用户名输入框-->
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <!--密码输入框-->
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--登录注册按钮-->
      <el-form-item style="text-align: center">
        <el-button type="primary" round v-on:click="login">登录</el-button>
        <el-button type="primary" plain round v-on:click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          // 携带参数
          userName: this.loginForm.username,
          userPassword: this.loginForm.password
        }).then((response) => {
          if (response.status === 200) {
            // 接受后端返回数据，后端返回JSON字符串 number有200（登录成功）和400（登录失败）
            if (response.data.number === '400') {
              // message是后端传回的登录失败的信息
              this.$message(response.data.message)
            } else {
              // 登录成功页面跳转，并把后端传回的登录信息，储存在store中
              this.$message('登录成功')
              this.$store.commit('login', response.data)
              // 页面跳转到首页
              var path = this.$route.query.redirect
              this.$router.push({path: path === '/' || path === undefined ? '/index' : path})
            }
          }
        })
        .catch(() => {
          this.$message('登录失败')
        })
    },
    // 点击注册按钮，跳转到注册页面
    register () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background: url("http://108lan.com:8001/images/2020/09/16/fd2319ab9318419ba8d502d70fd70372.jpg");
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body,html{
    margin: 0px;
  }

</style>
