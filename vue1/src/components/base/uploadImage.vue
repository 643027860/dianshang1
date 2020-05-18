<template>
  <div class="uploadImages">
    <el-upload
      action="api/elegant/upload"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :auto-upload="false"
      accept="image/*"
      ref="upload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="5"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {UPLOADIMAGE} from '../../api/types'
  export default {
    mounted () {

    },

    data() {
      return {
        imgsUrl:[],     //多张图片数组
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },

    methods: {
      async handleChange (file, fileList) {
        if(this.imgsUrl.length<5){
          if(file.size/1024/1024<2){
            var params = new FormData()
            params.append('upload_file',file.raw)
            var result = await UPLOADIMAGE(params)
            if(result.status == 0){
              var url = result.data.url
              this.imgsUrl.push({uid:file.uid,url})
            }
          }else{
            this.$message({
              message: '请上传小于2M的图片',
              type: 'warning',
              duration:'1500'
            });
          }
        }
      },

      handleRemove(file, fileList) {
        this.imgsUrl = this.imgsUrl.filter(item => item.uid !== file.uid)
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      beforeUpload (file) {
        return true;
      },

      clearAll(){
        this.imgsUrl = []
        this.dialogImageUrl = ''
        this.dialogVisible = false
        this.$refs.upload.clearFiles()   //清除照片墙数据
      }
    },

  }
</script>

<style lang="less">
  .uploadImages{
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
  }
</style>
