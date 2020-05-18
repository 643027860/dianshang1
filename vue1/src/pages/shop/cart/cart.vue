<template>
  <div class="cart">
    <div class="myShopWidth">
      <Search></Search>
      <div class="cartMain">
        <div style="height: 40px;line-height: 40px;font-size: 22px;font-weight: bold;background-color: rgb(234,234,234);padding-left: 20px;margin-top: 20px;">
          购物车：
        </div>
        <div class="cartCount">
          <span>全部商品 <span>{{cartCount}}</span></span>
        </div>
        <el-table
          ref="multipleTable"
          :data="carts"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <template slot="empty">
            <img src="../../../assets/imgs/shop/car.svg" alt="">
            <div class="noCart">
              购物车空空如也~~~
              <router-link :to="{name:'main'}">
                <span>前去购物</span>
              </router-link>
            </div>
          </template>
          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品"
            width="350">
            <template slot-scope="scope">
              <router-link :to="{name:'detail',query:{id:JSON.stringify(scope.row.productId)}}" :title="scope.row.productName">
                <img v-lazy="scope.row.productMainImage" alt="" class="cartImage">
                <span>{{scope.row.productName}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="productSubtitle"
            min-width="220">
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="单价"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            min-width="190">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.quantity" size="small" @change="handleChange(scope.row.productId,scope.row.quantity)" :min="1" :max="scope.row.productStock" label="商品数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="productTotalPrice"
            label="小计"
            min-width="130">
            <template slot-scope="scope">
              <p class="cartPrice"><span>￥</span>{{(scope.row.quantity*scope.row.productPrice).toFixed(2)}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="100">
            <template slot-scope="scope">
              <el-button @click="toDetele(scope.row)" type="text" class="cartButton">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="tuBuy" v-show="carts">
          <div class="toBuyLeft">
            <ul>
              <li>
                <el-checkbox v-model="All" @change="handleCheckAllChange"></el-checkbox>&nbsp;&nbsp;全选
              </li>
              <li>
                <a href="javascript:;" @click="toDetele(multipleSelection)">删除选中的商品</a>
              </li>
            </ul>
          </div>
          <div class="toBuyRight">
            <router-link :to="{name:'balance'}" v-if="multipleSelection.length>0">
              <span class="balance">
                结算
              </span>
            </router-link>
            <a href="javascript:;"v-else>
              <span class="balance" style="background-color: rgb(140,140,140)">
                结算
              </span>
            </a>
            <span class="toBuySpan">总价 :<span class="toBuyPrice"><b>￥{{Carts.cartTotalPrice}}</b></span></span>
           <!-- <span class="toBuySpan">已选择 <b style="color: rgb(241,41,40);">{{multipleSelection.length}}</b> 件商品</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQCARTLISTS,UPDATECARTCOUNT,SELECTCART,UNSELECTCART,GETCARTCOUNT,DELETECART,SELECTCARTALL,UNSELECTALL} from '../../../api/types'
  import {mapActions,mapState} from 'vuex'
  import Search from '../../../components/shop/main/search'
  export default {
    data () {
      return {
        Carts: [],
        carts:[],
        multipleSelection: [],
        saveSelection: [],  //暂时保存原来那个选中数组
        timer:'',   //增删购物车数量防抖动
        All:false,   //是否全选
        newSelection:[],
      }
    },
    created(){
      if(sessionStorage.getItem('haichuang_user') != 'null'){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
        this.UN()
      }else{
        this.message('用户未登录！',1200,'warning')
        this.$router.replace({name:'login'})
      }
    },
    components:{
      Search
    },
    computed:{
      ...mapState(['user','cartCount']),
    },
    mounted () {
      this.getCartCount()
    },
    methods: {
      ...mapActions(['savecartcount','setuser']),
      //获取购物车数量
      async getCartCount(){
        var result = await GETCARTCOUNT()
        if(result.status === 0){
          console.log(result.status)
          this.savecartcount(result.data)
        }
      },
      //一开始取消所有已选择并获取购物车列表
      async UN(){
        var result = await UNSELECTALL()
        console.log(result)
        if(result.status === 0){
          this.Carts = result.data
          this.carts = result.data.cartProductVoList
        }else{
          this.message(result.msg,1500,'error')
        }
      },
      // //获取购物车列表
      async reqCartLists(){
        var result = await REQCARTLISTS()
        console.log(result)
        if(result.status === 0){
          this.Carts = result.data
          this.carts = result.data.cartProductVoList
        }else{
          this.message(result.msg,1500,'error')
        }
      },
      //计数器，商品件数发生改变
      handleChange(productId,count) {
        clearTimeout(this.timer)
        this.timer = setTimeout(async()=>{
          var params = new FormData()
          params.append('productId',productId)
          params.append('count',count)
          var result = await UPDATECARTCOUNT(params)
          if(result.status === 0){
            this.Carts = result.data
            this.getCartCount()
          }
        },1000)
      },
      //全选/全不选
      handleCheckAllChange() {
        this.$refs.multipleTable.toggleAllSelection()
      },
      //单选
      async handleSelectionChange(val) {
        this.saveSelection = val
        //获取变化的元素
        var newSelect = this.multipleSelection.concat(this.saveSelection).filter(function(v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        })
        console.log(newSelect)
        var result = ''
        if(newSelect.length ===1){      //单选
          if(this.multipleSelection.length<this.saveSelection.length)  //新勾中
            result = await SELECTCART({productId:newSelect[0].productId})
          else    //新取消
            result = await UNSELECTCART({productId:newSelect[0].productId})
        }else{
          if(val.length == this.carts.length){
            result = await SELECTCARTALL()
          }else{
            result = await UNSELECTALL()
          }
        }
        if(result.status ==0 ){
          this.Carts = result.data
          this.multipleSelection = val;
        }else{
          this.message(result.msg,1500,'error')
        }
      },
      //删除购物车商品
      toDetele(cart){
        var productIds = ''
        if(Array.isArray(cart)){
          cart.map(item => productIds += item.productId +',')
          productIds = productIds.slice(0,productIds.length-1)
        }else{
          productIds += cart.productId
        }
        this.$confirm('确定从购物车中删除此商品吗?', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var result = await DELETECART({productIds})
          if(result.status === 0){
            this.Carts = result.data
            this.carts = result.data.cartProductVoList
            this.getCartCount()
          }else{
            this.message(result.msg,1500,'warning')
          }
        })
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
    watch:{
      multipleSelection(newval,oldval){
        if(newval.length == this.carts.length){
          this.All = true
        }else{
          this.All = false
        }
      },
      cartCount(newval,oldval){
        this.reqCartLists()
      },
    }
  }
</script>

<style lang="less">
  .cart{
    --myShopWidth: 1200px;
    background-color: white;
    ul{
      padding: 0;
      margin: 0;
      li{
        list-style: none;
      }
    }
    .myShopWidth{
      width: 1200px;
      width: var(--myShopWidth);
      margin: auto;
    }
    .cartMain{
      div.cartCount{
        margin-top: 20px;
        height: 35px;
        border-bottom: 1px solid rgb(235,238,245);
        span{
          display: inline-block;
          height: 26px;
          line-height: 26px;
          font-size: 16px;
          font-weight: bold;
          color:red;
          span{
            font-size: 14px;
            font-family: verdana;
          }
        }
      }
      div.tuBuy{
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        border:1px solid rgb(235,238,245);
        a{
          height: 50px;
          line-height: 50px;
        }
        div.toBuyLeft{
          li{
            float: left;
            padding: 0 15px;
            a{

            }
          }
        }
        div.toBuyRight{
          span.toBuySpan{
            width: 180px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            float: right;
            span.toBuyPrice{
              font-weight: bold;
              color: rgb(241,41,40);
              font-size: 16px;
            }
          }
          a{
            float: right;
            span.balance{
              width: 80px;
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
      .cartButton{
        display: inline-block;
        vertical-align: top;
        padding: 0;
      }
    }
  }
  @media screen and(max-width: 1000px){
    .cart{
      .myShopWidth{

      }
      .cartNav{

      }
      .cartMain{

      }
    }
  }
</style>
