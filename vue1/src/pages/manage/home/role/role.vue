<template>
  <div class="role">
    <div style="padding: 20px;">
        <el-button type="primary" icon="el-icon-plus" style="margin-top: -5px;" @click="addRole">新增角色</el-button>
        <el-dialog :visible.sync="showAdd" :before-close="closeAdd">
          <AddRole></AddRole>
        </el-dialog>
        <el-dialog :visible.sync="showFix" :before-close="closeFix">
          <FixRole v-bind:role="role"></FixRole>
        </el-dialog>
        <div class="lis">
          <el-table
            :data="roles"
            stripe
            border
            style="width: 100%;"
            v-show="Roles"
          >
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
            >
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              min-width="250"
            >
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="更新者"
              min-width="120"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="更新时间"
              min-width="100"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="150"
            >
              <template slot-scope="scope">
                <el-button @click="fixRole(scope.row)" type="text" class="roleButton">修改权限</el-button>
                <el-button type="text" class="roleButton" @click="deleteRole">删除</el-button>
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
            :total="Roles.totalSize">
          </el-pagination>
        </div>
        <div class="mobile">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="Roles.totalSize">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
  import {REQROLES} from '../../../../api/types'
  import {mapActions,mapState} from 'vuex'
  import AddRole from './addRole'
  import FixRole from './fixRole'
  export default {
    data () {
      return {
        pageSize:12,        //行数
        pageNum:1,         //当前页
        loading:false,      //是否加载中
        Roles:[],           //角色全部信息列表
        roles:[],           //单纯角色信息列表
        role:'',            //选中角色
      }
    },
    computed:{
      ...mapState(['showAdd','showFix'])
    },
    components:{
      AddRole,
      FixRole,
    },
    created(){
      this.reqrolespage(1)
    },
    mounted () {
      this.choiceMenuId('role')
    },
    methods: {
      ...mapActions(['choiceMenuId','showadd','showfix']),
      handleSizeChange(val) {
        this.reqrolespage(val)
      },
      handleCurrentChange(val) {
        this.reqrolespage(val)
      },
      //获取角色列表
      async reqrolespage(pagenum){
        this.loading = true
        this.pageNum = pagenum
        var {pageNum,pageSize} = this
        if(pageNum&&pageSize){
          var params = new FormData()
          params.append('pageNum',pageNum)
          params.append('pageSize',pageSize)
          var result = await REQROLES(params)
          if(result.code == 200){
            this.loading = false
            this.Roles = result.data
            this.roles = this.Roles.content
            this.roles.map(item=>{
              item.createTime = item.createTime.slice(0,10)
            })
            console.log(this.roles)
          }else{
            this.loading = false
            var message = result.msg
            this.$message({
              message:message,
              duration:1500,
              type:'error'
            })
          }
        }
      },
      //修改角色
      fixRole(item){
        this.role = item
        this.showfix(true)
      },
      closeFix(){
        this.showfix(false)
      },
      //新增角色
      addRole(){
        this.showadd(true)
      },
      closeAdd(){
       this.showadd(false)
     },
      //删除角色
      deleteRole(){
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      },
    },
  }
</script>

<style lang="less">
  @media screen and(max-width: 500px){   //均为弹窗样式
    .roleButton{
      margin-left: 10px!important;
    }
    .el-dialog__header,.el-dialog__body{
      padding: 0;
    }
    .el-dialog{
      min-width: 300px;
    }
  }
  .role{
    width: 100%;
    margin-top: 10px;
    background-color: white;
    .el-dialog__header,.el-dialog__body{
      padding: 0;
      min-width: 300px;
    }
    .lis{
      margin-top: 30px;
      min-height: 637px;
    }
    div.cell{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    td{
      padding: 4px 0!important;
    }
    .roleButton{
      margin-left: 20px;
    }
    .el-pagination{
      margin-top: 15px;
      height: 40px;
      text-align: center;
    }
  }
</style>
