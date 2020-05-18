<template>
  <div class="goodDetail">
    <div v-if="!error">
      <div class="goodInfoDiv">
        <div class="imgsDiv">
          <img :src="myGood.mainImage" alt="" class="bigImg">
          <div class="smallImgDiv">
            <img v-for="(img,index) in myGood.subImages" :key="index" v-lazy="img" alt="" class="smallImg" @mouseenter="()=>choiceBigImg(img)">
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
            状态：<span>{{Status[myGood.status]}}</span>
          </div>
          <div class="bug">
            <el-button type="primary" @click="fixGood">编辑商品</el-button>
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
        <img src="../../../error/404.png" alt="">
        <div class="fontDiv">
          <span class="fontError">获取商品详情出错</span>
          <el-button type="text" class="returnOrder" @click="toBack">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  import {GETSHOPDETAIL} from '../../../../api/types'
  export default {
    name:'goodDetail',
    data () {
      return {
        myGood:'',  //商品详情对象
        id:'',    //商品详情对象ID
        bigUrl:'',  //大图地址
        imgs:[],  //图片数组
        count:0,   //买多少件
        Status:{
          '1':'在售',
          '2':'下架',
          '3':'删除',
        },//销售状态1-在售 2-下架 3-删除- 请求响应结果实例
        error:false,
      }
    },
    computed:{
      ...mapState([])
    },
    created () {
      if(this.$route.query.id){
        this.id = this.$route.query.id
        this.reqGoodDetail(this.id)
        this.choiceMenuId('goodList')
        this.changePathNames(
          [
            {name:'商品管理'},
            {name:'商品列表',path:'goodList'},
            {name:'商品详情'}
          ]
        )
      }else{
        this.$router.replace({name:'goodList'})
      }
    },
    methods: {
      ...mapActions(['choiceMenuId','changePathNames']),
      //返回
      toBack(){
        this.$router.go(-1)
      },
      //获取详情
      async reqGoodDetail(id){
        var result = await GETSHOPDETAIL({productId:id})
        if(result.status === 0){
          this.myGood = result.data
          this.myGood.subImages = this.myGood.subImages.split(",")
          this.myGood.mainImage = this.myGood.subImages[0]
          $('#manageGoodDetail').html(this.myGood.detail)
        }else{
          this.error = true
          this.message(result.msg,1500,'error')
        }
      },
      //修改商品
      fixGood(){
        this.$router.push({name:'updateGood',query:{id:JSON.stringify(this.id*1)}})
      },
      //切换大图
      choiceBigImg(img){
        this.myGood.mainImage = img
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
    min-width: 1020px;
    margin: 10px;
    .outError{
      text-align: center;
      height: 600px;
      line-height: 500px;
      img{
        width: 250px;
        height: 250px;
      }
      .fontDiv{
        display: inline-block;
        margin-top: 15px;
        .fontError{
          font-weight: bold;
          font-size: 25px;
          margin-right: 15px;
        }
        .returnOrder{

        }
      }
    }
    div.goodInfoDiv {
      &:before, &:after {
        content: '';
        display: table;
        clear: both;
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
      width: 1080px;
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
