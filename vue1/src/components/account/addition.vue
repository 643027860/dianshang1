<template>
  <div class="addition">
    <div class="addAdditionDiv">
      <div class="addtionTitle" v-if="add">
        新增收货地址：
      </div>
      <div class="addtionTitle" v-else>
        编辑收货地址：
        <el-button type="text" style="margin-right: 15px;float: right;" @click="toAdd">新增收货地址</el-button>
      </div>
      <AddAdditions v-if="add"></AddAdditions>
      <FixAdditions :fixs="fixaddition" ref="myFixAddition" v-else></FixAdditions>
    </div>
    <div class="additionListDiv">
      <div class="lisNav">
        收货地址列表：
      </div>
      <div class="lis">
        <el-table
          :data="additions.list"
          stripe
          border
          style="width: 100%;"
          v-show="additions"
        >
          <el-table-column
            prop="receiverName"
            label="收货人"
            min-width="70"
          >
          </el-table-column>
          <el-table-column
            label="所在地区"
            min-width="150"
          >
            <template slot-scope="scope">
              {{scope.row.receiverProvince}}/{{scope.row.receiverCity}}/{{scope.row.receiverDistrict}}
            </template>
          </el-table-column>
          <el-table-column
            prop="receiverAddress"
            label="详细地址"
            min-width="250"
          >
          </el-table-column>
          <el-table-column
            prop="receiverZip"
            label="邮编"
            min-width="70"
          >
          </el-table-column>
          <el-table-column
            prop="receiverMobile"
            label="手机"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button @click="fix(scope.row)" type="text" class="roleButton">修改</el-button>
              <el-button @click="deleteAddition(scope.row)" type="text" class="roleButton">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="myPagination" style="height: 50px;line-height: 50px;overflow: hidden;">
        <div style="display: inline-block; height: 30px;margin-top: 15px;float: right;margin-right: 15px;overflow: hidden;">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="additions.total"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            v-if="additions.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQADDITIONS,DELETEADDITION} from '../../api/types'
  import {mapState,mapActions} from 'vuex'
  import AddAdditions from './addAddition'
  import FixAdditions from './fixAddition'
  export default {
    data () {
      return {
        id:'',
        pageNum: 1,             //地址列表分页
        pageSize: 2,            //地址列表行数
        add:true,               //是否显示添加地址
        fixaddition:'',         //修改对象
      }
    },
    components:{
      AddAdditions,
      FixAdditions
    },
    computed:{
      ...mapState(['user','additions'])
    },
    created(){

    },
    mounted () {
      if(this.user!=''){
        this.id = this.user.id
        this.reqLists(1)
      }else{
        this.message('用户未登录！',1000,'warning')
        setTimeout(()=>{
          this.$router.replace({name:'login'})
        },500)
      }
    },
    methods: {
      ...mapActions(['saveadditions']),
      handleCurrentChange(val){
        this.reqLists(val)
      },
      //获取地址列表
      async reqLists(val){
        this.pageNum = val
        var {pageNum,pageSize} = this
        var result = await REQADDITIONS({pageNum,pageSize})
        if(result.status == 0){
          this.saveadditions(result.data)
        }
      },
      //修改地址
      fix(li){
        this.add = false
        this.fixaddition = li
      },
      //返回新增
      toAdd(val){
        this.add = val
      },
      //删除地址
      deleteAddition(li){
        this.$confirm('确定删除该条地址吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var shippingId = li.id
          var result = await DELETEADDITION({shippingId})
          if(result.status === 0){
            this.reqLists(1)
          }else{
            this.message(result.msg,1500,'error')
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
      clearAll(){

      },
    },
  }
</script>

<style lang="less">
  .addition{
    padding: 0;
    div.addAdditionDiv{
      div.addtionTitle{
        height: 40px;
        line-height: 40px;
        color: rgb(241,41,40);
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
        background-color: rgb(234,234,234);
        margin-bottom: 20px;
      }
    }
    div.additionListDiv{
      margin: 30px 0 15px;
      .lisNav{
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
        background-color: rgb(234,234,234);
      }
      .lis{

      }
    }
  }
</style>
