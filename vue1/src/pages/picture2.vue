<template>
  <div class="image" id="main">
    <div style="height: 20px;width: 20px;background-color: #07141e;" @click="getPostion" @mousemove="getPostion">

    </div>
    <canvas id="mycanvas" width="940" height="570" @click="checkPointer" @mousemove="getPostion"></canvas>
    <div class="myButton">
      <button @click="choiceType('zebra')">斑马线</button>
      <button @click="choiceType('forbid')">禁停区</button>
      <button @click="upload">提交数据</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    data () {
      return {
        x:0,    //x坐标
        y:0,    //y坐标
        zebraPoints:[],  //斑马线坐标点
        forbidPoints:[],  //禁停区坐标点
        type:'zebra',     //标注类型
        color:'yellow',   //标注点颜色
      }
    },
    methods: {
      a(event){
        console.log(event.button)
      },
      //显示图片
      doDraw(){
        var canvas = document.getElementById("mycanvas")
        var _this = this
        var a = setInterval(() =>{
          //  重复获取
          canvas = document.getElementById("mycanvas")
          if(!canvas){
            return false
          } else {
            clearInterval(a)
            //  可以理解为一个画笔，可画路径、矩形、文字、图像
            var context = canvas.getContext('2d')
            var img = new Image()
            //  加载图片
            img.onload = function(){
              if(img.complete){
                //  根据图像重新设定了canvas的长宽
                canvas.setAttribute("width",img.width)
                canvas.setAttribute("height",img.height)
                //  绘制图片
                context.drawImage(img,0,0,img.width,img.height)
              }
            }
            img.src = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'
          }
        },1)
      },
      //移入图片
      getPostion(event){
        var e = event || window.event  //标准化事件对象
        this.x = e.pageX || e.clientX + document.documentElement.scrollLeft || document.body.scrollLeft
        this.y = e.pageY || e.clientY + document.documentElement.scrollTop || document.body.scrollTop
        //console.log(this.x,this.y)
      },
      //选择标注类型
      choiceType(type){
        this.type = type+''
        if(type === 'zebra'){
          this.color = 'yellow'
        }else if(type === 'forbid'){
          this.color = 'red'
        }
      },
      //获取鼠标的x，y
      windowToCanvas(canvas,x,y){
        var bbox = canvas.getBoundingClientRect();
        return {
          x : x - bbox.left*(canvas.width/bbox.width),
          y : y - bbox.top*(canvas.height/bbox.height)
        };
      },
      //点击绘制
      checkPointer(event){
        var e = event || window.event
        console.log(event.button)
        this.x = e.pageX || e.clientX + document.documentElement.scrollLeft || document.body.scrollLeft
        this.y = e.pageY || e.clientY + document.documentElement.scrollTop || document.body.scrollTop
        var {x,y} = this
        var oTip = document.createElement('div')
        if(this.type === 'zebra'){
          oTip.className = "zebra"
          this.zebraPoints.push({x,y})
          oTip.setAttribute("id", "zebra" + this.zebraPoints.length)
        }else if(this.type === 'forbid'){
          oTip.className = "forbid"
          this.forbidPoints.push({x,y})
          oTip.setAttribute("id", "forbid" + this.forbidPoints.length)
        }
        var _this = this
        oTip.addEventListener('click',()=>{
          _this.deletePointerCss(oTip.getAttribute('id'))
        })
        oTip.style.width = '8px'
        oTip.style.height = '8px'
        oTip.style.backgroundColor = this.color
        oTip.style.position = 'absolute'
        oTip.style.left = x-4+'px'
        oTip.style.top = y-4+'px'
        oTip.style.borderRadius = '50%'
        document.getElementById("main").appendChild(oTip)
        console.log(x)
        console.log(y)
        console.log('----------------------------')
        console.log(this.zebraPoints)
        console.log('----------------------------')
        console.log(this.forbidPoints)
      },
      //取消绘制
      deletePointerCss(id){
        console.log('a')
        let point = document.getElementById(id)
        if(point != null){
          point.parentNode.removeChild(point)
          if(id.indexOf('z') === 0){
            var index = id.slice(5,id.length) *1
            this.zebraPoints[index-1] = null
          }else if(id.indexOf('f') === 0){
            var index = id.slice(6,id.length) *1
            this.forbidPoints[index-1] = null
          }
        }
      },
      //上传
      upload(){
        this.zebraPoints = this.zebraPoints.filter(item => item!=null)
        this.forbidPoints = this.forbidPoints.filter(item => item!=null)
        console.log(this.forbidPoints)
      }
    },
    watch: {},
    computed: {},
    created () {

    },
    mounted () {
      this.doDraw()
      document.oncontextmenu = ()=>{
        return false
      }
      $('div.zebra').onmouseup = (event)=>{
        console.log(event.button)
      }
    },
    beforeDestory () {

    },
    destoryed () {

    },
  }
</script>

<style lang="less">
  .image{
    .AddPoint{
      height: 4px;
      width: 4px;
      border-radius: 50%;
      position: absolute;
      transform: translate3d(-50%,-50%,0);
      background-color: red;
    }
    .myButton{
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
</style>
