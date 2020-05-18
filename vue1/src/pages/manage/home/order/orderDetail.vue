<template>
  <div class="orderDetail">
    <div v-if="!error">
      <div class="orderInfoDiv">
        <h2 class="orderDetailTile">订单详情</h2>
        <p class="titleP"><span class="title">订单号：</span>{{myOrder.orderNo}}</p>
        <p class="titleP"><span class="title">创建时间：</span>{{myOrder.createTime}}</p>
        <p class="titleP" v-show="shippingVo">
          <span class="title">收件人：</span>
          {{shippingVo.receiverName}}&nbsp;&nbsp;
          {{shippingVo.receiverProvince}}&nbsp;
          {{shippingVo.receiverDistrict}}&nbsp;
          {{shippingVo.receiverCity}}&nbsp;
          {{shippingVo.receiverAddress}}&nbsp;
        </p>
        <p class="titleP"><span class="title">订单状态：</span>{{myOrder.statusDesc}} <el-button type="text" v-if="myOrder.statusDesc=='已付款'" @click="sendGood" style="margin-left: 20px;">立即发货</el-button></p>
        <p class="titleP"><span class="title">支付方式：</span>{{myOrder.paymentTypeDesc}}</p>
        <p class="titleP"><span class="title">订单金额：</span>￥{{myOrder.payment}}</p>
      </div>
      <div class="orderDetailDiv">
        <div class="detail">
          <h2 class="orderDetailTile">商品清单</h2>
          <ul>
            <p class="liTitle">
              <span class="goodinfo">商品信息</span>
              <span class="other">单价</span>
              <span class="other">数量</span>
              <span class="other">合计</span>
            </p>
            <li v-for="(order,index) in myOrder.orderItemVoList" :key="index">
              <div class="goodDiv">
                <img :src="order.productImage" alt="">
                <p class="orderName">{{order.productName}}</p>
              </div>
              <span class="other">￥{{order.currentUnitPrice}}</span>
              <span class="other">{{order.quantity}}</span>
              <span class="other">￥{{order.totalPrice}}</span>
            </li>
          </ul>
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
  import {GETORDERDETAIL,SENDGOOD} from '../../../../api/types'
  export default {
    name:'goodDetail',
    data () {
      return {
        myOrder:'',  //商品详情对象
        orderNo:'',    //商品详情对象ID
        shippingVo:'',  //收货人信息
        error:false,
      }
    },
    computed:{
      ...mapState([])
    },
    created () {
      if(this.$route.query.orderNo){
        this.choiceMenuId('orderList')
        this.orderNo = this.$route.query.orderNo
        this.reqOrderDetail(this.orderNo)
        this.changePathNames(
          [
            {name:'订单管理'},
            {name:'订单列表',path:'orderList'},
            {name:'订单详情'}
          ]
        )
      }else{
        this.$router.replace({name:'orderList'})
      }
    },
    methods: {
      ...mapActions(['choiceMenuId','changePathNames']),
      //返回
      toBack(){
        this.$router.go(-1)
      },
      //获取详情
      async reqOrderDetail(){
        var {orderNo} = this
        var result = await GETORDERDETAIL({orderNo})
        if(result.status === 0){
          this.myOrder = result.data
          this.shippingVo = this.myOrder.shippingVo
        }else{
          this.error = true
          this.message(result.msg,1500,'error')
        }
      },
      //发货
      async sendGood(){
        var {orderNo} = this
        var result = await SENDGOOD({orderNo})
        if(result.status == 0){
          this.myOrder.statusDesc = '已发货'
        }else{
          this.message(result.msg,1500,'error')
        }
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
  .orderDetail{
    width: 90%;
    margin: 10px auto;
    min-width: 1020px;
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
    .orderInfoDiv {
      &:before, &:after {
        content: '';
        display: table;
        clear: both;
      }
      h2.orderDetailTile{
        font-size: 22px;
        color: rgb(120,120,120);
        margin-bottom: 25px;
      }
      .titleP{
        color: rgb(50,50,50);
        font-size: 16px;
        .title{
          display: inline-block;
          width: 150px;
          margin: 5px 0;
          font-size: 16px;
          margin-right: 20px;
          color: rgb(20,20,20);
          text-align: right;
        }
      }
    }
    .orderDetailDiv{
      margin-left: 50px;
      width: 1200px;
      overflow-x: hidden;
      div.detail{
        h2.orderDetailTile{
          font-size: 22px;
          color: rgb(120,120,120);
          margin-bottom: 25px;
        }
        ul{
          margin: 0;
          padding: 0;
          .liTitle{
            height: 40px;
            line-height: 40px;
            border: 1px solid rgb(200,234,234);
            margin-bottom: 0;
            span{
              display: inline-block;
              font-weight: bold;
              color: rgb(100,100,100);
            }
            .goodinfo{
              width: 580px;
              padding: 0 10px;
              margin-left: 100px;
              vertical-align: top;
            }
            .other{
              width: 140px;
              padding: 0 10px;
              text-align: center;
            }
          }
          li{
            list-style: none;
            height: 100px;
            overflow: hidden;
            padding: 10px 0;
            border: 1px solid rgb(200,234,234);
            border-top: 0px solid rgb(200,234,234);
            vertical-align: center;
            &:before,&:after{
              content: '';
              display: table;
              clear: both;
            }
            img{
              height: 80px;
              width: 100px;
              padding: 0 10px;
              float: left;
            }
            span{
              display: inline-block;
              white-space:nowrap;
              overflow:hidden;
              font-size: 16px;
            }
            .orderName{
              display: inline-block;
              float: left;
              width: 580px;
              height: 40px;
              line-height: 20px;
              font-size: 16px;
              padding: 0 10px;
              margin-bottom: 0;
              margin-top: 20px;
            }
            .other{
              width: 140px;
              padding: 0 10px;
              text-align: center;
              height: 80px;
              line-height: 80px;
            }
            .goodDiv{
              display: inline-block;
              &:before,&:after{
                content: '';
                display: table;
                clear: both;
              }
            }
          }
        }
      }
    }
  }
</style>
