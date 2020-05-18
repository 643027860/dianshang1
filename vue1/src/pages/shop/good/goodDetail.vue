<template>
  <div class="goodDetail">
    <div class="searchDiv">
      <Search></Search>
    </div>
    <div v-if="!error">
      <div class="goodInfoDiv">
        <div class="navDiv">
          <ul>
            <li>商品详情</li>
          </ul>
        </div>
        <div class="imgsDiv">
          <img v-lazy="mainImage" alt="" class="bigImg">
          <div class="smallImgDiv">
            <img v-for="(img,index) in subImages" :key="index" v-lazy="img" alt="" class="smallImg" @mouseenter="()=>choiceBigImg(img)">
          </div>
        </div>
        <div class="info">
          <div class="title">
            {{myGood.name}}
          </div>
          <div class="subtitle">
            {{myGood.subtitle}}
          </div>
          <div class="price">
            价格：<span>￥{{myGood.price}}</span>
          </div>
          <div class="stock">
            库存：<span>{{myGood.stock}}</span>
          </div>
          <div class="count">
            数量：<el-input-number v-model="count" @change="handleChange" :min="1" :max="myGood.stock" label="描述文字" style="margin-left: 10px;"></el-input-number>
          </div>
          <div class="bug">
            <el-button type="danger" @click="addGood">加入购物车</el-button>
          </div>
        </div>
      </div>
      <div class="goodDetailDiv">
        <div class="navDiv">
          <ul>
            <li>商品介绍</li>
          </ul>
        </div>
        <div class="detail">
          <div id="manageGoodDetail">

          </div>
        </div>
      </div>
    </div>
    <div v-else>
     <div class="outError">
       <img src="../../error/404.png" alt="">
       <div class="fontDiv">
         <span class="fontError">获取商品详情出错</span>
         <el-button type="text" class="returnOrder" @click="toMain">前往主页</el-button>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  import Search from '../../../components/shop/main/search'
  import {REQSHOPDETAIL,ADDCART,GETCARTCOUNT} from '../../../api/types'
  export default {
    name:'goodDetail',
    data () {
      return {
        myGood:'',  //商品详情对象
        id:'',    //商品详情对象ID
        mainImage:'',  //大图地址
        subImages:[],  //图片数组
        count:1,   //买多少件
        dialogFormVisible: false,  //是否显示弹窗登录
        error:false   //是否请求出错
      }
    },
    computed:{
      ...mapState([])
    },
    components:{
      Search,
    },
    created () {
      if(this.$route.query.id){
        this.id = this.$route.query.id
        this.reqGoodDetail(this.id)
      }else{
       this.$router.replace({name:'main'})
      }
    },
    methods: {
      ...mapActions(['savecartcount','setuser']),
      //前往主页
      toMain(){
        this.$router.replace({name:'main'})
      },
      //获取购物车数量
      async getCartCount(){
        var result = await GETCARTCOUNT()
        console.log(result)
        if(result.status === 0){
          this.savecartcount(result.data)
        }
      },
      //获取详情
      async reqGoodDetail(productId){
        var result = await REQSHOPDETAIL({productId})
        if(result.status === 0){
          this.myGood = result.data
          this.mainImage = this.myGood.mainImage
          this.subImages = this.myGood.subImages.split(",")
          console.log(this.subImages)
          $('#manageGoodDetail').html(this.myGood.detail)
        }else{
          this.error = true
          this.message(result.msg,1500,'error')
        }
      },
      //商品加入购物车
      async addGood(){
       if(sessionStorage.getItem('haichuang_user')!='null'){
         var {myGood,count} = this
         var params = new FormData()
         params.append('productId',myGood.id)
         params.append('count',count)
         var result = await ADDCART(params)
         if(result.status === 0){
           this.getCartCount()
           this.message('商品已添加入购物车',1500,'success')
         }else{
           this.message(result.msg,1500,'error')
         }
       }else{
         this.dialogFormVisible = true
       }
      },
      //切换大图
      choiceBigImg(img){
        console.log(img)
        this.mainImage = img
      },
      //改变购买数量
      handleChange(value) {
        this.count = value
      },
      message(message,duration ,type){
        this.$message({
          message,
          duration,
          type
        })
      },
    },
  }
</script>

<style lang="less">
  .goodDetail{
    width: 90%;
    max-width: 1200px;
    min-width: 1060px;
    margin: auto!important;
    .outError{
      text-align: center;
      height: 500px;
      line-height: 500px;
      img{
        width: 200px;
        height: 200px;
      }
      .fontDiv{
        display: inline-block;

        .fontError{
          font-weight: bold;
          font-size: 20px;
          margin-right: 15px;
        }
        .returnOrder{

        }
      }
    }
    div.searchDiv{
      overflow: hidden;
      background-color: rgb(255,255,255);
      text-align: center;
    }
    div.goodInfoDiv {
      margin-top: 30px;
      &:before, &:after {
        content: '';
        display: table;
        clear: both;
      }
      div.navDiv{
        width: 1060px;
        margin-bottom: 20px;
        height: 40px;
        background-color: rgb(247,247,247);
        border-bottom: 1px solid rgb(241,41,40);
        ul{
          padding: 0;
          margin: 0;
          li{
            list-style: none;
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 120px;
            background-color: rgb(240,41,40);
            color: white;
            font-size: 16px;
          }
        }
      }
      div.imgsDiv {
        width: 400px;
        min-height: 400px;
        float: left;
        overflow: hidden;

        &:before, &:after {
          content: '';
          display: table;
          clear: both;
        }

        img.bigImg {
          width: 370px;
          height: 370px;
          margin-left: 3px;
          margin-bottom: 10px;
        }

        div.smallImgDiv {
          &:before, &:after {
            content: '';
            display: table;
            clear: both;
          }

          img.smallImg {
            float: left;
            width: 65px;
            height: 65px;
            margin: 5px;
            cursor: pointer;
            border: 1px solid white;

            &:hover {
              border: 2px solid #409EFF;
            }
          }
        }
      }
      div.info{
        float: left;
        width: 600px;
        margin-left: 20px;
        div.title{
          font: 700 20px Arial,"microsoft yahei";
          padding-top: 10px;
          line-height: 28px;
          margin-bottom: 5px;
        }
        div.subtitle{
          padding-top: 10px;
          line-height: 28px;
          margin-bottom: 5px;
          color: red;
          font-size: 16px;
        }
        div.price{
          margin-top: 100px;
          color: rgb(120,120,120);
          font-size: 14px;
          span{
            color: rgb(240,41,40);
            font-size: 20px;
          }
        }
        div.stock{
          margin-top: 30px;
          color: rgb(120,120,120);
          font-size: 14px;
          span{
            color: #333333;
            margin-left: 10px;
            font-size: 16px;
          }
        }
        div.count{
          margin-top: 30px;
          color: rgb(120,120,120);
          font-size: 14px;
        }
        div.bug{
          margin-top: 40px;
          .el-button{
            width: 150px;
          }
        }
      }
    }
    div.goodDetailDiv{
      margin-top: 50px;
      width: 1060px;
      div.navDiv{
        height: 40px;
        background-color: rgb(247,247,247);
        border-bottom: 1px solid rgb(241,41,40);
        ul{
          padding: 0;
          margin: 0;
          li{
            list-style: none;
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 120px;
            background-color: rgb(240,41,40);
            color: white;
            font-size: 16px;
          }
        }
      }
      div.detail{
        margin-bottom: 30px;
        #manageGoodDetail{
          text-align: center;
        }
      }
    }
  }
</style>








