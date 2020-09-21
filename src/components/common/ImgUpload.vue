<template>
    <el-upload
            class="img-upload"
            ref="upload"
            action="http://108lan.com:8001/api/covers"
            with-credentials
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      fileList: [],
      url: ''
    }
  },
  methods: {
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess (response) {
      this.url = response
      this.$emit('onUpload')
      this.$message.warning('上传成功')
      console.log(this.url)
    },
    clear () {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
