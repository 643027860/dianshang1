<template>
  <div class="type">
    <div style="padding: 20px;">
      <el-button type="primary" icon="el-icon-plus" style="margin-top: -5px;" @click="addType({id:0})">注册品类</el-button>
      <el-dialog :visible.sync="showAdd" :before-close="closeAdd" width="500px">
        <AddType v-bind:parentId="parentId" @setNewList="setNewList"></AddType>
      </el-dialog>
      <el-dialog :visible.sync="showFix" :before-close="closeFix" width="500px">
        <FixType v-bind:type="type" @setNewName="setNewName"></FixType>
      </el-dialog>
      <div class="lis">
        <el-table
          :data="types"
          style="width: 100%"
          row-key="id"
          ref="myTable"
          border
          stripe
          lazy
          :load="load"
          :tree-props="{children: 'sortOrder', hasChildren: 'sortOrder'}">
          <el-table-column
            prop="name"
            label="品类名"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="更新时间"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="150"
          >
            <template slot-scope="scope">
              <span @click="fixType(scope.row)" class="typeButton">修改品类</span>
              <span @click="addType(scope.row)" class="typeButton" v-show="scope.row.parentId==0">添加子品类</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {GETTYPE,DEEPTYPE} from '../../../../api/types'
  import {mapActions,mapState} from 'vuex'
  import AddType from './addType'
  import FixType from './fixType'
  export default {
    data () {
      return {
        categoryId: 0,      //父级品类ID
        parentId:0,        //添加品类时父级ID
        loading:false,      //是否加载中
        types:[],           //单纯品类信息列表
        type:'',            //选中品类
      }
    },
    computed:{
      ...mapState(['showAdd','showFix'])
    },
    components:{
      AddType,
      FixType,
    },
    created(){
      this.reqTypes(this.categoryId)
    },
    mounted () {
      this.choiceMenuId('mType')
      this.changePathNames(
        [
          {name:'品类管理'},
        ]
      )
    },
    methods: {
      ...mapActions(['choiceMenuId','showadd','showfix','changePathNames']),
      async load(tree, treeNode, resolve) {
        var categoryId = tree.id
        var result = await GETTYPE({categoryId})
        var child = ''
        if(result.status == 0){
          child = result.data
          child.map(item=>{
            item.createTime = item.createTime.slice(0,10)
          })
        }else{
          var message = result.msg
          this.message(message,1200,'error')
        }
        resolve(child)
      },
      //获取品类列表
      async reqTypes(categoryId){
        var result = await GETTYPE({categoryId})
        if(result.status == 0){
          this.loading = false
          var type = result.data
          type.map(async(item)=>{
            item.createTime = item.createTime.slice(0,10)
            result = await GETTYPE({categoryId:item.id})
            if(result.status == 0){
              if(result.data.length>0){
                item.sortOrder = true
              }
            }
          })
          this.types = type
        }else{
          this.loading = false
          var message = result.msg
          this.message(message,1500,'error')
        }
      },
      //修改
      fixType(item){
        this.type = item
        this.showfix(true)
      },
      //新增品类
      addType(item){
        var id = item.id
        this.parentId = id
        this.showadd(true)
      },
      //修改成功更新列表
      setNewName(parentId,categoryId,name){
        console.log(parentId,categoryId,name)
        if(parentId==0){
          this.types.map((item)=>{
            item.createTime = item.createTime.slice(0,10)
            if(item.id == categoryId){
              item.name = name
            }
          })
        }else{
          this.types.map(async(item)=>{
            if(item.id == parentId){
              var result = await GETTYPE({categoryId:item.id})
              if(result.status == 0){
                if(result.data.length>0){
                  this.$set(this.$refs.myTable.store.states.lazyTreeNodeMap, parentId, result.data)
                }
              }
            }
          })
        }
      },
      //新增品类成功更新列表
      setNewList(parentId){
        if(parentId!=0) {
          this.types.map(async (item) => {
            item.createTime = item.createTime.slice(0, 10)
            if (item.id == parentId) {
              var result = await GETTYPE({categoryId: parentId})
              if (result.status == 0) {
                if (result.data.length > 0) {
                  this.$set(this.$refs.myTable.store.states.lazyTreeNodeMap, parentId, result.data)
                }
              }
            }
          })
        }else{
          this.reqTypes(parentId)
        }
      },
      //消息提示
      message(message,duration,type){
        this.$message({
          message,
          type,
          duration
        })
      },
      //删除品类
      deleteType(){
        this.$confirm('此操作将永久删除该品类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.message('删除成功!',1500,'success')
        })
      },
      //是否显示添加
      closeAdd(){
        this.showadd(false)
      },
      //是否显示修改
      closeFix(){
        this.showfix(false)
      },
    },
    watch:{
      types(newval,oldval){
        console.log(newval)
      },
    }
  }
</script>

<style lang="less">
  @media screen and(max-width: 500px){   //均为弹窗样式
    .typeButton{
      margin-left: 10px!important;
    }
    .el-dialog__header,.el-dialog__body{
      padding: 0;
    }
    .el-dialog{
      min-width: 300px;
    }
  }
  .type{
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
      margin: 10px 0;
      height: 20px;
      line-height: 20px;
    }
    td{
      padding: 4px 0!important;
    }
    .typeButton{
      margin-left: 20px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
      color: rgb(102,177,255);
      &:hover{
        text-decoration: underline;
      }
    }
    .el-pagination{
      margin-top: 15px;
      height: 40px;
      text-align: center;
    }
  }
</style>
