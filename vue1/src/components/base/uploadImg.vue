<template>
  <div>
    <el-upload
      class="avatar-uploader"
      ref="upload"
      :show-file-list="false"
      action="api/elegant/upload"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :auto-upload="false"
      accept="image/*"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    mounted () {

    },

    data() {
      return {
        imageUrl: '',   //图片回显地址
        imgFile:'',     //图片文件
      };
    },

    methods: {
      handleChange (file, fileList) {
        if(file.size/1024/1024<2){
          this.imageUrl= URL.createObjectURL(file.raw)
          this.imgFile = file.raw
        }else{
          this.$message({
            message: '请上传小于2M的图片',
            type: 'warning',
            duration:'1000'
          });
        }
      },

      beforeUpload (file) {
        return true;
      },

      clearall(){
        this.imageUrl = ''
        this.imgFile = ''
      }
    },

  }
</script>

<style lang="less">
  input[type="file"] {
    display: none;
  }
  .upload-element{
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  .manage_input{
    width: 300px;
  }
</style>
