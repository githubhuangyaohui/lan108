<template>
    <el-container>
        <el-header class="header">
            <nav-menu></nav-menu>
        </el-header>
        <el-main style="min-height: 700px">
            <router-view/>
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
    .header{
        margin: 0;
        padding: 0;
    }
</style>
