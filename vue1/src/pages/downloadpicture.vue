<template>
  <div>
    <h2>
      TestCanvas
    </h2>

    <img
      v-show="false"
      ref="myImg"
      src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
    >
    <canvas
      ref="myCanvas"
      width="200"
      height="100"
      style="border:1px solid #c3c3c3;"
    >
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
    <button
      @click="downloadCanvas">
      下载
    </button>
  </div>
</template>

<script>
  export default {
    name: "TestCanvas" ,
    data () {
      return {

      }
    } ,
    methods: {
      alert : function () {
        alert("emem") ;
      } ,
      downloadCanvas : function () {
        // 内部函数1(可忽略细节)
        const saveFile = function(data, fileName){
          let save_link = document.createElement('a');
          save_link.href = data;
          save_link.download = fileName;

          let event = document.createEvent('MouseEvents');
          event.initEvent("click", true, false);
          save_link.dispatchEvent(event);
        };
        // 内部函数2(可忽略细节)
        const imgType = function (ty) {
          let type = ty.toLowerCase().replace(/jpg/i, 'jpeg');
          var r = type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/' + r;
        } ;

        const type = 'png';   //设置下载图片的格式
        const cans = this.$refs.myCanvas ; //canvas实例子
        const img_png_src = cans.toDataURL("image/png");  //将canvas保存为图片
        const imgData = img_png_src.replace(imgType(type),'image/octet-stream');
        const filename = 'canvas' + '.' + type; //下载图片的文件名

        // shoot
        saveFile(imgData,filename);

      }
    } ,
    mounted: function () {
      console.log("挂载成功") ;
      var c=this.$refs.myCanvas ;
      var ctx=c.getContext("2d");
      var img=this.$refs.myImg;
      // 贴图
      ctx.drawImage(img,0,0);
      ctx.font="10px Arial";
      // 打水印
      ctx.fillText("Kingdee",160,90);
    }
  }
</script>
