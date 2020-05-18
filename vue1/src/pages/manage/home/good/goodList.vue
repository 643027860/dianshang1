<template>
  <div class="goodList">
    <div class="goodListDiv">
      <div class="lis">
        <div class="condition">
          <span class="out">
            <span class="inner noSee">
              <el-input placeholder="请输入商品名" v-model="productName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="()=>searchList(1)"></el-button>
              </el-input>
            </span>
            查询结果列表：
          </span>
        </div>
        <el-table
          :data="goods"
          stripe
          border
          style="width: 100%;"
          v-show="Goods"
        >
          <el-table-column
            prop="name"
            label="商品名"
            min-width="250"
          >
          </el-table-column>
          <el-table-column
            prop="subtitle"
            label="简介"
            min-width="250"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="库存"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            min-width="80"
          >
            <template slot-scope="scope">
              {{Status[scope.row.status]}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text" class="goodButton">商品详情</el-button>
              <el-button type="text" class="goodButton" @click="downGood(scope.row)" v-if="scope.row.status==1">下架</el-button>
              <el-button type="text" class="goodButton" @click="upGood(scope.row)" v-if="scope.row.status==2">上架</el-button>
              <el-button type="text" class="goodButton" @click="seleteGood(scope.row)" style="color: red;" v-if="scope.row.status!=3">删除</el-button>
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
          :total="Goods.total">
        </el-pagination>
      </div>
      <div class="mobile">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="Goods.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {GETSHOPLISTS,UPDOWNSHOP,SEARCHSHOP} from '../../../../api/types'
  import {mapActions,mapState} from 'vuex'
  export default {
    data () {
      return {
        loading:false,      //是否加载中
        Goods:[],           //角色商品信息列表
        goods:[],           //单纯商品信息列表
        types:[],           //商品类型
        Status:{
          '1':'在售',
          '2':'下架',
          '3':'删除',
        },//销售状态1-在售 2-下架 3-删除- 请求响应结果实例
        //条件
        productName:'',         //查询关键字
        categoryId :'',     //ID
        orderBy :'',        //排序
        pageSize:12,        //行数
        pageNum:1,          //当前页
      }
    },
    computed:{
      ...mapState([])
    },
    created(){
      this.reqGood(this.pageNum)
    },
    mounted () {
      this.choiceMenuId('goodList')
      this.changePathNames(
        [
          {name:'商品管理'},
          {name:'商品列表',path:'goodList'}
        ]
      )
    },
    methods: {
      ...mapActions(['choiceMenuId','saveGood','changePathNames']),
      handleSizeChange(val) {
        this.reqGood(val)
      },
      handleCurrentChange(val) {
        this.reqGood(val)
      },
      //获取商品列表
      async reqGood(pagenum){
        this.loading = true
        this.pageNum = pagenum
        var {pageSize,pageNum} = this
        if(pageNum&&pageSize){
          var result = await GETSHOPLISTS({pageNum,pageSize})
          if(result.status == 0){
            this.loading = false
            this.Goods = result.data
            this.goods = this.Goods.list
          }else{
            this.loading = false
            this.message(result.msg,1500,'error')
          }
        }
      },
      //搜索商品列表
      async searchList(pagenum){
        this.loading = true
        this.pageNum = pagenum
        var {productName,pageSize,pageNum} = this
        if(pageNum&&pageSize){
          if(productName)
            var result = await SEARCHSHOP({pageNum,pageSize,productName})
          else
            var result = await GETSHOPLISTS({pageNum,pageSize})
          if(result.status == 0){
            this.loading = false
            this.Goods = result.data
            this.goods = this.Goods.list
            console.log(this.goods)
          }else{
            this.loading = false
            this.message(result.msg,1500,'error')
          }
        }
      },
      //查看详情
      toDetail(item){
        this.$router.push({name:'goodDetail',query:{
            id:JSON.stringify(item.id)
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
            this.reqGood(this.pageNum)
          }else{
            this.message(result.msg,1500,'error')
          }
        })
      },
      upGood(good){
        this.$confirm('确定重新上架该商品吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var params = new FormData()
          params.append('productId',good.id)
          params.append('status',1)
          var result = await UPDOWNSHOP(params)
          if(result.status == 0){
            this.reqGood(this.pageNum)
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
            this.reqGood(this.pageNum)
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
  .goodList{
    width: 100%;
    background-color: white;
    .goodListDiv{
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
    .goodButton{
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
