<template>
  <div class="userOrderDetail">
    <div class="orderInfoDiv">
      <h2 class="orderDetailTile">订单详情</h2>
      <p class="titleP"><span class="title">订单号：</span>{{Orders.orderNo}}</p>
      <p class="titleP"><span class="title">创建时间：</span>{{Orders.createTime}}</p>
      <p class="titleP" v-show="shippingVo">
        <span class="title">收件人：</span>
        {{shippingVo.receiverName}}&nbsp;&nbsp;
        {{shippingVo.receiverProvince}}&nbsp;
        {{shippingVo.receiverDistrict}}&nbsp;
        {{shippingVo.receiverCity}}&nbsp;
        {{shippingVo.receiverAddress}}&nbsp;
      </p>
      <p class="titleP"><span class="title">订单状态：</span>{{Orders.statusDesc}}</p>
      <p class="titleP"><span class="title">支付方式：</span>{{Orders.paymentTypeDesc}}</p>
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
          <li v-for="(order,index) in orders" :key="index">
            <div class="goodDiv" @click="toDetail(order.productId)">
              <img :src="order.productImage" alt="">
              <p class="orderName">{{order.productName}}asdsda asdsa</p>
            </div>
            <span class="other">￥{{order.currentUnitPrice}}</span>
            <span class="other">{{order.quantity}}</span>
            <span class="other">￥{{order.totalPrice}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQORDERDETAIL} from '../../../api/types'
  export default {
    name: '',
    components: {},
    data () {
      return {
        orderNo:'',  //订单号
        Orders:'',    //订单总信息
        orders:'',     //订单列表
        shippingVo:'',  //收货人信息
      }
    },
    methods: {
      async reqDetail(orderNo){
        var params = new FormData()
        params.append('orderNo',orderNo)
        var result = await REQORDERDETAIL(params)
        if(result.status == 0){
          this.Orders = result.data
          this.orders = result.data.orderItemVoList
          this.shippingVo = this.Orders.shippingVo
          console.log(result)
        }
      },
      //查看商品详情
      toDetail(id){
        let {href} = this.$router.resolve({name:'detail',query:{
            id:JSON.stringify(id)
          }})
        window.open(href, '_blank');
      },
    },
    watch: {},
    computed: {},
    created () {
      console.log(this.$route.query.orderNo)
      if(this.$route.query.orderNo){
        this.orderNo = JSON.parse(this.$route.query.orderNo)
        this.reqDetail(this.orderNo)
      }else{
       this.$router.replace({name:order})
      }
    },
    mounted () {

    },
    beforeDestroy () {

    },
    destroyed () {

    },
  }
</script>

<style lang="less">
  .userOrderDetail{
    width: 1200px;
    margin: auto;
    .orderInfoDiv {
      margin: 50px;
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
          width: 120px;
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
              cursor: pointer;
              display: inline-block;
              &:hover{
                color: rgb(241,41,40);
              }
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
