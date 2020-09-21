<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
        <el-divider content-position="left">摘要</el-divider>
        <el-input
                type="textarea"
                v-model="article.articleAbstract"
                rows="6"
                maxlength="255"
                show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
            <el-input v-model="article.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
            <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>
export default {
  name: 'ArticleFrom'
}
</script>

<style scoped>

</style>
