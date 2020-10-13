<template>
    <el-container>
        <el-header class="header">
            <nav-menu></nav-menu>
        </el-header>
        <el-main style="min-height: 700px">
            <router-view/>
            <div id="footer">
                <br><span>Copyright © 2020</span>
                <a id="footerLink" href="http://beian.miit.gov.cn/" target="_blank"><span>鄂ICP备2020016820号</span></a>
                <br><span>persistenthuang@163.com</span>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import NavMenu from '../common/NavMenu'
export default {
  name: 'home',
  components: {NavMenu}
}
</script>

<style scoped>
    .header {
        margin: 0;
        padding: 0;
    }
    #footer{
        margin: 0;
        padding: 0;
        text-align: center;
        color: #6a6f77;
    }
    #footerLink{
        color: #6a6f77;
        text-decoration: none;
    }
</style>
