<template>
    <el-card style="width: 100%;height: 90%">
        <el-card>(在读:{{count}}人)</el-card>
        <el-card style="width: 100%;height:400px;overflow-y:auto;">
            <div>
                <div v-for="(i,index) in list"
                     :key="index"
                     class="msg"
                     :style="i.userId == userId?'flex-direction:row-reverse':''">
                    <el-row>
                        <el-card
                                :style="i.userId == userId?' float: right;background: #F56C6C':'float: left;background: #409EFF'">
                            {{i.content}}
                        </el-card>
                    </el-row>
                </div>
            </div>
        </el-card>
        <el-card style="float: bottom">
            <input id="input" type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
            <el-button style="float: right" type="primary" :class="{['btn-active']:contentText}" @click="sendText()">发送</el-button>
        </el-card>
    </el-card>
</template>

<script>
export default {
  name: 'CheatBox',
  props: {
    sip: Number
  },
  data () {
    return {
      ws: null,
      count: 0,
      userId: this.$store.state.user.id, // 当前用户ID
      username: this.$store.state.user.userName, // 当前用户昵称
      list: [], // 聊天记录的数组
      contentText: '' // input输入的值
    }
  },
  mounted () {
    this.initWebSocket()
  },
  destroyed () {
    // 离开页面时关闭websocket连接
    this.ws.onclose(undefined)
  },
  methods: {
    // 发送聊天信息
    sendText () {
      console.log('sendText')
      let _this = this
      _this.$refs['sendMsg'].focus()
      if (!_this.contentText) {
        return
      }
      let params = {
        userId: _this.userId,
        username: _this.username,
        msg: _this.contentText,
        count: _this.count
      }
      _this.ws.send(JSON.stringify(params)) // 调用WebSocket send()发送信息的方法
      _this.contentText = ''
      setTimeout(() => {
      }, 50)
    },
    // 进入页面创建websocket连接
    initWebSocket () {
      let _this = this
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        console.log('判断有没有web连接')
        var serverHot = '124.70.77.136'
        // 填写本地IP地址 此处的 :9101端口号 要与后端配置的一致！
        console.log('房间号' + this.sip)
        var url = 'ws://' + serverHot + ':8001' + '/groupChat/' + this.sip + '/' + this.userId
        let ws = new WebSocket(url)
        _this.ws = ws
        ws.onopen = function (e) {
          console.log('服务器连接成功: ' + url)
        }
        ws.onclose = function (e) {
          console.log('服务器连接关闭: ' + url)
        }
        ws.onerror = function () {
          console.log('服务器连接出错: ' + url)
        }
        ws.onmessage = function (e) {
          // 接收服务器返回的数据
          let resData = JSON.parse(e.data)
          _this.count = resData.count
          _this.list = [
            ..._this.list,
            { userId: resData.userId, username: resData.userName, content: resData.msg }
          ]
        }
      }
    }
  }
}
</script>

<style>
    #input{
        box-sizing: border-box;
        font-size:1.4em;
        height:1.5em;
        color:#6a6f77;
        -web-kit-appearance:none;
        -moz-appearance: none;
        display:block;
        outline:0;
        text-decoration:none;
        width:70%;
        float: left;
    }
</style>
