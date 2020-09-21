<template>
    <div>
        <el-input
                v-model="keywords"
                style="width: 400px"
                prefix-icon="el-icon-search"
                @keyup.enter.native="searchClick"
                placeholder="标题搜索">
            <el-button slot="append" type="success" plain @click="searchClick">搜索</el-button>
        </el-input>
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      keywords: ''
    }
  },
  methods: {
    searchClick () {
      console.log('搜索文章')
      let routerJump = this.$router.resolve({
        path: '/search', query: {keyword: this.keywords}
      })
      window.open(routerJump.href, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
