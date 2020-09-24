<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
    font-size: 1em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #dee2ff;
    min-width: 1200px;
    font-family: "Helvetica Neue", Helvetica;
}

body {
    margin: 0;
    padding: 0;
    border: none;
}

.card1 {
    margin: 7px;
}

.el-card:hover {
    margin-top: -5px;
}

.blogList {
    width: 80%;
    height: 150px;
}

.blogImage {
    width: 100px;
    height: 100px;
    float: left;
}

.blogTitle {
    float: left;
    width: 80%;
    font-size: 30px;
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.summary {
    float: left;
    width: 80%;
    font-size: 15px;
    margin: 5px;
    color: #6a6f77;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
