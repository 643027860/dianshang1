<template>
  <div>
    <div class="uEditor">
      <div id="editor" type="text/plain"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'UE',
    data() {
      return {
        editor: null,    //编辑器对象
        jwt:'',   //令牌
        config:'',    //请求头部
        contenturl:'',  //文章返回的UR
        content:'',            //正文内容
        content1:'',           //正文内容纯文本格式
      }
    },
    async created(){
      this.init()
    },
    mounted() {

    },

    methods: {
      //初始化编辑器
      init(){
        var myconfig = ''
        axios.get("http://47.112.132.177:8250/ueditor")
          .then(response=>{
            myconfig = response.data
            console.log(myconfig)
            myconfig.initialFrameWidth = '100%'
            myconfig.initialFrameHeight = 300
            myconfig.maximumWords = 100000
            var _this = this
            this.editor = UE.getEditor('editor',myconfig); // 初始化UE
            this.editor.ready(()=>{
              UE.getEditor('editor').addListener("contentChange",function(){
                _this.content = UE.getEditor('editor').getContent()
                _this.content1 = UE.getEditor('editor').getContentTxt()
              });
            })
            UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
            UE.Editor.prototype.getActionUrl = function(action) {
              //上传图片
              if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
                return 'http://47.112.132.177:8250/imgUpload';
                //上传视频
              }else if(action == "uploadvideo"){
                return 'http://47.112.132.177:8250/videoUpload';
              }
              //上传附件
              else if(action == "uploadfile"){
                return 'http://47.112.132.177:8250/fileUpload';
              }
              //默认
              else {
                return this._bkGetActionUrl.call(this, action);
              }
            }
          })
      },
      //清空编辑器
      clearContent() { // 清空编辑器内容
        this.content1 = ''
        this.content = ''
        this.contenturl = ''
        return this.editor.execCommand('cleardoc');
      },
    },

    //销毁编辑器
    beforeDestroy() {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.editor !== null && this.editor.destroy) {
        this.editor.destroy();
      }
    }
  }
</script>

<style lang="less">

</style>
