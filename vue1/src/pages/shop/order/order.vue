<template>
  <div class="myOrder">
    <Search></Search>
    <div class="orderListsDiv">
      <div class="orderNav">
        我的订单：
        <span style="width:470px;">商品信息</span>
        <span style="width:120px;margin-left: 20px;">单价</span>
        <span style="width:100px;">数量</span>
        <span style="width:90px;margin-left: 30px;">合计</span>
        <span style="width:100px;">订单状态</span>
      </div>
      <div class="orderLists">
        <ul v-for="(order,index) in orders" :key="index">
          <div class="orderNoNav">
            <span class="createTime">{{order.createTime.slice(0,10)}}</span>
            <span class="createNo">订单号：{{order.orderNo}}</span>
            <el-button type="text" @click="gotoDetail(order.orderNo)" style="float: right;margin-right: 15px;">查看详情</el-button>
          </div>
          <div class="orderLi">
            <li v-for="(li,index) in order.orderItemVoList" :key="index">
              <span class="goodInfo">
                <router-link :to="{name:'detail',query:{id:JSON.stringify(li.productId)}}" :title="li.productName">
                  <img v-lazy="li.productImage" alt="" class="cartImage">
                  <span>{{li.productName}}</span>
                </router-link>
              </span>
                <span class="price">
                ￥{{li.currentUnitPrice}}
              </span>
                <span class="count">
                {{li.quantity}}
              </span>
            </li>
          </div>
          <div class="orderRight">
            <span class="pay">
              ￥{{order.payment}}
            </span>
            <span class="status">
              {{order.statusDesc}}
            </span>
            <span class="caozuo">
              <el-button type="text" @click="goToPay(order.orderNo)" v-if="order.status == 10">立即付款</el-button>
              <el-button type="text" @click="cancleOrder(order.orderNo)" v-if="order.status == 10">取消订单</el-button>
            </span>
          </div>
        </ul>
      </div>
      <div class="myPagination">
        <div style="display: inline-block;float: right;margin-right: 20px;">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="Orders.total"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            v-if="Orders.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQORDERLISTS,CANCELORDER} from '../../../api/types'
  import {mapActions,mapState} from 'vuex'
  import Search from '../../../components/shop/main/search'
  export default {
    data () {
      return {
        Orders:[],              //订单所有信息
        orders:[],              //订单信息
        pageNum: 1,             //地址列表分页
        pageSize: 5,            //地址列表行数
      }
    },
    computed:{
      ...mapState([])
    },
    components:{
      Search
    },
    async created(){
      if(sessionStorage.getItem('haichuang_user') != 'null'){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
        this.reqOrderLists(1)
      }else{
        this.message('用户未登录！',1200,'warning')
        this.$router.replace({name:'login'})
      }
    },
    mounted () {

    },
    methods: {
      ...mapActions(['setuser']),
      //查看订单详情
      async gotoDetail(orderNo){
        this.$router.push({name:'orderDetailUser',query:{orderNo:JSON.stringify(orderNo)}})
      },
      //前往付款
      goToPay(orderNo){
        this.$router.push({name:'pay',query:{orderNo:JSON.stringify(orderNo)}})
      },
      //取消订单
      cancleOrder(orderNo){
        this.$confirm('确认取消该订单吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          var params = new FormData()
          params.append('orderNo',orderNo)
          var result = await CANCELORDER(params)
          if(result.status == 0){
            this.reqOrderLists(1)
          }
        })
      },
      //分页获取订单
      async reqOrderLists(pagenum){
        this.pageNum = pagenum
        var {pageNum,pageSize} = this
        var result = await REQORDERLISTS({pageNum,pageSize})
        if(result.status == 0){
          this.Orders = result.data
          this.orders = result.data.list
        }else{
          this.message(result.msg,1500,'error')
        }
      },
      //页数变了获取订单
      handleCurrentChange(val){
        this.reqOrderLists(val)
      },
      //消息提示
      message(message,duration,type){
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
  .myOrder{
    width: 1200px;
    margin: auto;
    &:before,&:after{
      content: '';
      display: table;
      clear: both;
    }
    .orderListsDiv{
      .orderNav{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
        padding-left: 20px;
        background-color: rgb(234,234,234);
        span{
          display: inline-block;
          color: rgb(140,140,140);
          font-size: 16px;
          font-weight: normal;
          text-align: center;
        }
      }
      .orderLists{
        ul{
          padding: 0;
          margin: 10px 0;
          position: relative;
          border: 1px solid rgb(200,234,234);
          border-bottom: 1px solid rgb(200,234,234);
          &:before,&:after{
            content: '';
            display: table;
            clear: both;
          }
          .orderNoNav{
            height: 40px;
            line-height: 40px;
            background-color: rgb(234,248,255);
            .createTime{
              font-weight: bold;
              font-size: 16px;
              padding: 0 20px;
            }
            .createNo{
              font-size: 14px;
            }
          }
          .orderLi{
            display: inline-block;
            float: left;
            li{
              list-style: none;
              min-height: 100px;
              border-right: 1px solid rgb(200,234,234);
              span{
                display: inline-block;
                vertical-align: top;
                margin: 10px;
                text-align: center;
              }
              a{
                display: inline-block;
                vertical-align: top;
                max-height: 80px;
                line-height: 23px;
                overflow:hidden;
                text-overflow:ellipsis;
                font-size: 12px;
                color: rgb(10,10,10);
                &:hover{
                  color: rgb(241,41,40);
                }
                &:before,&:after{
                  content: '';
                  display: table;
                  clear: both;
                }
                span{
                  display: inline-block;
                  float: left;
                  vertical-align: top;
                  max-height: 50px;
                  line-height: 23px;
                  width: 220px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                }
                .cartImage{
                  display: inline-block;
                  vertical-align: top;
                  float: left;
                  width: 80px;
                  height: 80px;
                  margin-right: 10px;
                }
              }
              .goodInfo{
                width: 600px;
                text-align: left!important;
                span{
                  width: 450px;
                  text-align: left!important;
                }
              }
              .count{
                height: 80px;
                line-height: 80px;
                width: 80px;
              }
              .price{
                width: 100px;
                line-height: 80px;
              }
            }
            li:not(:last-child){
              border-bottom: 1px solid rgb(200,234,234) !important;
            }
          }
          .orderRight{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0,-30%,0);
            display: inline-block;
            span{
              display: inline-block;
              vertical-align: top;
              margin: 10px;
              text-align: center;
            }
            a{
              display: inline-block;
              vertical-align: top;
              max-height: 80px;
              line-height: 23px;
              overflow:hidden;
              text-overflow:ellipsis;
              font-size: 12px;
              color: rgb(10,10,10);
              &:hover{
                color: rgb(241,41,40);
              }
              &:before,&:after{
                content: '';
                display: table;
                clear: both;
              }
              span{
                display: inline-block;
                float: left;
                vertical-align: top;
                max-height: 50px;
                line-height: 23px;
                width: 220px;
                overflow:hidden;
                text-overflow:ellipsis;
              }
              .cartImage{
                display: inline-block;
                vertical-align: top;
                float: left;
                width: 80px;
                height: 80px;
                margin-right: 10px;
              }
            }
            .pay{
              width: 100px;
              line-height: 80px;
            }
            .status{
              width: 80px;
              line-height: 80px;
              text-align: left;
            }
            .caozuo{
              width: 80px;
              .el-button{
                padding: 0;
                margin: 0!important;
              }
            }
          }
        }

      }
      .myPagination{
        margin-bottom: 30px;
        &:before,&:after{
          content: '';
          display: table;
          clear: both;
        }
      }
    }
  }
</style>
