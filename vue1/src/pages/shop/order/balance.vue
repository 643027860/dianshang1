<template>
  <div class="order1">
    <Search></Search>
    <div class="sureOrder">
      <div class="orderAddition">
        <div class="addtionNav">
          <span style="font-weight: bold;font-size: 20px;height: 40px;line-height: 40px;">收货地址</span>
          <el-button type="text" @click="openAdd" style="float: right;margin-right: 20px;height: 40px;line-height: 40px;">新增收货地址</el-button>
          <el-dialog title="新增收货地址" :visible.sync="ocAddAddition" :before-close="closeAdd">
            <AddAddition ref="myAddAdditon"></AddAddition>
          </el-dialog>
          <el-dialog title="修改收货地址" :visible.sync="ocFixAddition" :before-close="closeFix">
            <FixAddition :fixs="fixs" ref="myFixAdditon"></FixAddition>
          </el-dialog>
        </div>
        <div class="addtionList" v-if="additions.list">
          <ul v-if="additions.list.length>0">
            <li v-for="(li,index) in additions.list" :id="'myShopAddition'+li.id" :key="index" @click="choiceId(li)">
              <span>{{li.receiverName}}</span>
              <span>{{li.receiverProvince}}</span>
              <span>{{li.receiverCity}}</span>
              <span>{{li.receiverDistrict}}</span>
              <span>{{li.receiverAddress}}</span>
              <span>{{li.receiverMobile}}</span>
              <el-button type="text" @click="deleteAddition(li)" class="show delete1" style="float: right;margin-right: 20px;">删除</el-button>
              <el-button type="text" @click="openFix(li)" class="show" style="float: right;margin-right: 20px;">修改</el-button>
            </li>
          </ul>
          <p v-else>
            <span class="nolist">还没添加收货地址，点击<el-button type="text" @click="openAdd">新增收货地址</el-button></span>
          </p>
        </div>
      </div>
      <div class="ordeInfo">
        <div class="cartMain">
          <div class="ordersTitle">
            <span style="font-weight: bold;font-size: 20px;height: 40px;line-height: 40px;">全部商品</span>
            <el-button type="text" @click="returnCart" style="float: right;margin-right: 20px;height: 40px;line-height: 40px;">返回购物车</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="orders"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <template slot="empty">
              <div class="noCart">
                订单获取失败~~~
                <router-link :to="{name:'cart'}">
                  <span>返回购物车</span>
                </router-link>
              </div>
            </template>
            <el-table-column
              prop="productName"
              label="商品名称"
              width="350">
              <template slot-scope="scope">
                <router-link :to="{name:'detail',query:{id:JSON.stringify(scope.row.productId)}}" :title="scope.row.productName">
                  <img v-lazy="scope.row.productImage" alt="" class="cartImage">
                  <span>{{scope.row.productName}}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="productSubtitle"
              min-width="220">
            </el-table-column>
            <el-table-column
              prop="currentUnitPrice"
              label="单价"
              min-width="130">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="productTotalPrice"
              label="小计"
              min-width="200">
              <template slot-scope="scope">
                <p class="cartPrice"><span>￥</span>{{scope.row.totalPrice}}</p>
              </template>
            </el-table-column>
          </el-table>
          <div class="tuBuy">
            <a href="javascript:;" @click="toBalance">
              <span class="balance">
                  提交订单
                </span>
            </a>
            <span class="toBuySpan">订单总价 :<span class="toBuyPrice"><b>￥{{productTotalPrice}}</b></span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQADDITIONS,DELETEADDITION,CREATEORDER,GETCARTPRODUCT,GETCARTCOUNT} from '../../../api/types'
  import {mapActions,mapState} from 'vuex'
  import AddAddition from '../../../components/account/addAddition'
  import FixAddition from '../../../components/account/fixAddition'
  import Search from '../../../components/shop/main/search'
  export default {
    data () {
      return {
        orders:[],              //订单商品
        productTotalPrice:0,   //总金额
        pageNum: 1,             //地址列表分页
        pageSize: 6,            //地址列表行数
        fixs:'',                //修改地址对象
        shippingId:'',          //选中地址的ID
      }
    },
    computed:{
      ...mapState(['ocAddAddition','ocFixAddition','additions'])
    },
    components:{
      AddAddition,
      FixAddition,
      Search
    },
    created(){
      this.reqAddition()
      this.reqOrders()
    },
    mounted () {
    },
    methods: {
      ...mapActions(['ocaddaddition','ocfixaddition','saveadditions','savecartcount']),
      async reqOrders(){
        var result = await GETCARTPRODUCT()
        if(result.status == 0){
          this.orders = result.data.orderItemVoList
          this.productTotalPrice = result.data.productTotalPrice
        }
      },
      async reqAddition(){
        var {pageNum,pageSize} = this
        var result = await REQADDITIONS({pageNum,pageSize})
        if(result.status == 0){
          this.saveadditions(result.data)
        }
      },
      choiceId(li){
        console.log(this.shippingId!=''&&this.shippingId!=li.id)
        if(this.shippingId!=''&&this.shippingId!=li.id){
          $('#myShopAddition'+this.shippingId).removeClass('redBorder')
          this.shippingId = li.id
          $('#myShopAddition'+this.shippingId).addClass('redBorder')
        }else{
          this.shippingId = li.id
          $('#myShopAddition'+this.shippingId).addClass('redBorder')
        }
      },
      openAdd(){
        this.ocaddaddition(true)
      },
      closeAdd(){
        this.$refs.myAddAdditon.clearAll()
        this.ocaddaddition(false)
      },
      openFix(li){
        this.fixs = li
        this.ocfixaddition(true)
      },
      closeFix(){
        this.$refs.myFixAdditon.clearAll()
        this.ocfixaddition(false)
      },
      deleteAddition(li){
        this.$confirm('确定删除该条地址吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var shippingId = li.id
          var result = await DELETEADDITION({shippingId})
          if(result.status === 0){
            this.pageNum = 1
            this.reqAddition()
          }else{
            this.message(result.msg,1500,'error')
          }
        })
      },
      //返回购物车
      returnCart(){
        this.$router.push({name:'cart'})
      },
      //获取购物车数量
      async getCartCount(){
        var result = await GETCARTCOUNT()
        if(result.status === 0){
          this.savecartcount(result.data)
        }
      },
      //提交订单
      async toBalance(){
        var {shippingId} = this
        if(shippingId){
          var params = new FormData()
          params.append('shippingId',shippingId)
          var result = await CREATEORDER(params)
          if(result.status == 0){
            var {orderNo} = result.data
            this.getCartCount()
            this.$router.replace({name:'pay',query:{orderNo:JSON.stringify(orderNo)}})
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('还未选择收货地址',1500,'warning')
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
    },
  }
</script>

<style lang="less">
  .order1{
    width: 1020px;
    margin: auto;
    &:before,&:after{
      content: '';
      display: table;
      clear: both;
    }
    .sureOrder{
      margin-top: 30px;
      div.orderAddition{
        .addtionNav{
          border-bottom: 2px solid rgb(234,234,234);
          .el-button{
            padding: 0;
          }
        }
        .addtionList{
          max-height: 240px;
          margin-bottom: 60px;
          overflow: hidden;
          .el-button{
            padding: 0;
          }
          ul{
            margin-top: 20px;
            padding: 0;
            .redBorder{
              border: 2px solid rgb(241,41,40) !important;
            }
            li{
              list-style: none;
              box-sizing: border-box;
              height: 40px;
              border: 2px solid transparent;
              padding-left: 30px;
              .show{
                display: none!important;
                span{
                  color: #409EFF;
                }
              }
              .delete1{
                span{
                  color: rgb(241,41,40);
                }
              }
              &:hover{
                cursor: pointer;
                background-color: rgba(64,160,255,0.1);
                .show{
                  display: block!important;
                }
              }
              span{
                padding: 0 4px;
                font-size: 14px;
                color: rgb(102,102,102);
                height: 36px;
                line-height: 36px;
              }
            }
          }
          p{
            text-align: center;
            span.nolist{
              display: inline-block;
              height: 120px;
              line-height: 120px;
              font-size: 22px;
              padding: 0 40px;
              span{
                font-size: 22px;
              }
            }
          }
        }
      }
      div.ordeInfo{
        .ordersTitle{
          .el-button{
            padding: 0;
          }
          margin-bottom: 10px;
        }
        .cartMain{
          div.tuBuy{
            margin-top: 20px;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border:1px solid rgb(235,238,245);
            span.toBuySpan{
              min-width: 180px;
              display: inline-block;
              text-align: center;
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              float: right;
              margin-right: 15px;
              span.toBuyPrice{
                font-weight: bold;
                color: rgb(241,41,40);
                font-size: 16px;
              }
            }
            a{
              float: right;
              span.balance{
                width: 120px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background-color: rgb(241,41,40);
                font-size: 18px;
                font-weight: bold;
                color: white;
                display: inline-block;
              }
            }
          }
          div.cell{
            padding: 0px 15px;
          }
          div.cell,p.cartPrice{
            display: inline-block;
            vertical-align: center;
            max-height: 80px;
            line-height: 23px;
            overflow:hidden;
            text-overflow:ellipsis;
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
          .el-table__empty-text{
            padding: 80px 0 50px;
            div.noCart{
              display: inline-block;
              font-size: 16px;
              min-height: 100px;
              line-height: 23px;
              a{
                font-size: 16px;
                line-height: 23px;
                display: inline-block;
                vertical-align: center!important;
                margin-left: 15px;
                span{
                  display: inline-block;
                  width: auto;
                }
              }
            }
            img{
              height: 70px;
              width: 70px;
              margin-right: 20px;
            }

          }
          p.cartPrice{
            display: inline-block;
            vertical-align: top;
            color: red;
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
