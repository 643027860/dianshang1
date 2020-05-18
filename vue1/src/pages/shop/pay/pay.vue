<template>
  <div class="pay">
    <div class="payNav">
      <span>订单支付：</span>
    </div>
    <div class="tuDiv" v-if="getOk&&!payOk&&!cancleOk">
      <div class="tu"><span style="color: rgb(116,116,116);font-size: 16px;font-weight: bold;">订单提交成功，请您尽快支付！订单号：{{orderNo}}</span></div>
      <div class="tu"><span style="color: rgb(241,41,40);font-size: 20px;">请使用支付宝扫码进行支付</span></div>
      <div class="tu"><img :src="qrUrl" alt=""></div>
      <div class="tu"><el-button type="text" @click="cancleOrder" style="float: right;font-size: 16px;margin-right: 15px;">取消订单</el-button></div>
    </div>
    <div class="tuDiv" v-if="error">
      <div class="getError">
        <img src="../../error/404.png" alt="">
        <span>获取订单数据失败</span>
      </div>
    </div>
    <div class="tuDiv" v-if="payOk&&!cancleOk">
      <span class="paySuccess"><i class="el-icon-circle-check"></i><span>支付成功!</span></span>
      <div class="successDiv"><span @click="toOrder">>>前往查看订单</span></div>
    </div>
    <div class="tuDiv" v-if="cancleOk">
      <span class="payError"><i class="el-icon-circle-close"></i><span>订单取消成功!</span></span>
      <div class="errorDiv"><span @click="toOrder">>>前往查看订单</span></div>
    </div>
  </div>
</template>

<script>
  import {PAY,SELECTPAYSTATUS,CANCELORDER} from '../../../api/types'
  export default {
    name: '',
    components: {},
    data () {
      return {
        orderNo:'',      //订单编号
        getOk:'',           //是否正常获取订单支付码
        payOk:'',         //支付是否成功
        cancleOk:false,      //是否取消订单
        qrUrl:'',         //支付二维码
        payorno:'',       //计时器
        error:'',         //订单数据出错
      }
    },
    methods: {
      //取消订单
      cancleOrder(){
        this.$confirm('是否确定取消该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          var {orderNo} = this
          var params = new FormData()
          params.append('orderNo',orderNo)
          var result = await CANCELORDER(params)
          if(result.status == 0){
            this.cancleOk = true
          }
        })
      },
      //获取二维码
      async getPayTu(){
        var {orderNo} = this
        var params = new FormData()
        params.append('orderNo',orderNo)
        var result = await PAY(params)
        if(result.status == 0){
          this.getOk = true
          this.qrUrl = result.data.qrUrl
          this.payorno = setInterval(async() =>{
            var result = await SELECTPAYSTATUS(params)
            if(result.status == 0 && result.data){
              this.payOk = true
              clearInterval(this.payorno)
            }else if(result.status == 1){
              this.payOk = false
              this.error = true
              clearInterval(this.payorno)
            }
          },2000)
        }else{
          this.getOk = false
        }
      },
      //消息提示
      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      },
      //前往订单
      toOrder(){
        this.$router.replace({name:'order'})
      }
    },
    watch: {
      payOk(newval,oldval){

      },
    },
    computed: {},
    async created () {
      this.orderNo = this.$route.query.orderNo
      if(this.orderNo){
        var {orderNo} = this
        var params = new FormData()
        params.append('orderNo',orderNo)
        var result = await SELECTPAYSTATUS(params)
        if(result.status == 0 && result.data){
          this.payOk = true
        }else if(result.status == 0 && !result.data){
          this.payOk = false
          this.getPayTu()
        }else{
          this.getOk = false
          this.message(result.msg,1500,'error')
        }
      }else{
        this.getOk = false
      }
    },
    mounted () {

    },
    beforeDestroy () {
      clearInterval(this.payorno)
    },
    destroyed () {
      clearInterval(this.payorno)
    },
  }
</script>

<style lang="less">
  .pay{
    width: 1200px;
    margin: auto;
    .payNav{
      height: 50px;
      line-height: 50px;
      margin: 50px auto;
      background-color: rgb(233,233,233);
      span{
        display: inline-block;
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        letter-spacing: 6px;
      }
    }
    .tuDiv{
      text-align: center;
      .getError{
        img{
          height: 200px;
          width: 200px;
          margin-right: 30px;
        }
        span{
          font-size: 22px;
          font-weight: bold;
        }
      }
      div.tu{
        text-align: center;
        margin-bottom: 20px;
        img{
          height: 200px;
          width: 200px;
        }
      }
      .paySuccess{
        i{
          display: inline-block;
          vertical-align: top;
          font-size: 50px;
          color: #6ce26c;
          margin-right: 20px;
        }
        span{
          display: inline-block;
          vertical-align: top;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
        }
      }
      .payError{
        i{
          display: inline-block;
          vertical-align: top;
          font-size: 50px;
          color: rgb(241,41,40);
          margin-right: 20px;
        }
        span{
          display: inline-block;
          vertical-align: top;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
        }
      }
      .successDiv,.errorDiv{
        margin-top: 20px;
        font-size: 16px;
        span{
          margin-left: 30px;
          cursor: pointer;
          &:hover{
            color: #00a0e9;
          }
        }
      }
    }
  }
</style>
