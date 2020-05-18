<template>
  <div class="orerList">
    <div class="orerListDiv">
      <div class="lis">
        <div class="condition">
          <span class="out">
            <span class="inner noSee">
              <el-input placeholder="请输入订单号进行查询" v-model="orderNo" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="()=>searchList(1)"></el-button>
              </el-input>
            </span>
            查询结果列表：
          </span>
        </div>
        <el-table
          :data="orders"
          stripe
          border
          style="width: 100%;"
          v-show="Orders"
        >
          <el-table-column
            prop="orderNo"
            label="订单号"
            min-width="220"
          >
          </el-table-column>
          <el-table-column
            label="收件人"
            min-width="100"
          >
            <template slot-scope="scope">
              {{scope.row.shippingVo?scope.row.shippingVo.receiverName:''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="payment"
            label="订单总价"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="220"
          >
          </el-table-column>
          <el-table-column
            prop="statusDesc"
            label="订单状态"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text" class="orderButton">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pc">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="Orders.total"
          v-show="Orders"
        >
        </el-pagination>
      </div>
      <div class="mobile">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="Orders.total"
          v-show="Orders"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {GETORDERLISTS,GETORDERLISTSBYID} from '../../../../api/types'
  import {mapActions,mapState} from 'vuex'
  export default {
    data () {
      return {
        loading:false,      //是否加载中
        Orders:[],           //角色商品信息列表
        orders:[],           //单纯商品信息列表
        //条件
        orderNo :'',        //ID
        pageSize:12,        //行数
        pageNum:1,          //当前页
      }
    },
    computed:{
      ...mapState([])
    },
    created(){
      this.reqOrder(this.pageNum)
    },
    mounted () {
      this.choiceMenuId('orderList')
      this.changePathNames(
        [
          {name:'订单管理'},
          {name:'订单列表'}
        ]
      )
    },
    methods: {
      ...mapActions(['choiceMenuId','saveGood','changePathNames']),
      handleSizeChange(val) {
        this.reqOrder(val)
      },
      handleCurrentChange(val) {
        this.reqOrder(val)
      },
      //获取订单列表
      async reqOrder(pagenum){
        this.loading = true
        this.pageNum = pagenum
        var {pageSize,pageNum} = this
        if(pageNum&&pageSize){
          var result = await GETORDERLISTS({pageNum,pageSize})
          if(result.status == 0){
            this.loading = false
            this.Orders = result.data
            this.orders = this.Orders.list
          }else{
            this.loading = false
            this.message(result.msg,1500,'error')
          }
        }
      },
      //搜索订单ID列表
      async searchList(pagenum){
        this.pageNum = pagenum
        var {orderNo,pageSize,pageNum} = this
        if(pageNum&&pageSize){
          this.loading = true
          if(orderNo){
            var result = await GETORDERLISTSBYID({orderNo,pageSize,pageNum})
          }else{
            var result = await GETORDERLISTS({pageSize,pageNum})
          }
          if(result.status == 0){
            this.loading = false
            this.Orders = result.data
            this.orders = this.Orders.list
            console.log(this.orders)
          }else{
            this.loading = false
            this.message(result.msg,1500,'error')
          }
        }
      },
      //查看详情
      toDetail(item){
        this.$router.push({name:'orderDetail',query:{
            orderNo:JSON.stringify(item.orderNo)
          }})
      },
      //商品下架
      downGood(good){
        this.$confirm('确定下架改商品吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var params = new FormData()
          params.append('productId',good.id)
          params.append('status',2)
          var result = await UPDOWNSHOP(params)
          if(result.status == 0){
            this.reqGood(1)
          }else{
            this.message(result.msg,1500,'error')
          }
        })
      },
      //商品删除
      seleteGood(good){
        this.$confirm('确定删除改商品吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var params = new FormData()
          params.append('productId',good.id)
          params.append('status',3)
          var result = await UPDOWNSHOP(params)
          if(result.status == 0){
            this.reqGood(1)
          }else{
            this.message(result.msg,1500,'error')
          }
        })
      },
      //消息提醒
      message(message,duration,type){
        this.$message({
         message,
          duration,
          type
        })
      }
    },
  }
</script>

<style lang="less">
  @media screen and(max-width: 500px){   //均为弹窗样式
    .noSee{     //收缩框不可见
      //display: none;
    }
    .goodButton{
      margin-left: 10px!important;
    }
    .el-dialog__header,.el-dialog__body{
      padding: 0;
    }
    .el-dialog{
      min-width: 300px;
    }
  }
  .orerList{
    width: 100%;
    background-color: white;
    .orerListDiv{
      border: 1px solid rgb(233,234,237);
      box-shadow: 1px 1px 3px rgb(233,234,237);
      border-radius: 5px;
      .condition{
        height: 50px;
        background-color: rgb(250,250,250);
        overflow: hidden;
        span.out{
          font-size: 16px;
          line-height: 60px;
          height: 50px;
          color: black;
          padding-left: 10px;
          letter-spacing: 2px;
          span.inner{
            display: inline-block;
            float: right;
            padding-right: 10px;
            width: 250px;
            height: 40px;
            margin-top: -5px;
          }
        }
      }
    }
    .el-dialog__header,.el-dialog__body{
      padding: 0;
      min-width: 300px;
    }
    .lis{
      min-height: calc(100vh - 250px);
    }
    div.cell{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    td{
      padding: 4px 0!important;
    }
    .orderButton{
      margin-left: 20px;
    }
    .el-pagination{
      margin-top: 5px;
      margin-bottom: 10px;
      height: 40px;
      text-align: center;
    }
  }
</style>
