<template>
  <div class="addType">
      <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="title">
          注册品类：
        </div>
        <el-form-item label="品类名称" prop="categoryName" label-width="80px">
          <el-input v-model="ruleForm.categoryName" placeholder="请输入品类名称,不得超过8个字"></el-input>
        </el-form-item>
      </el-form>
      <div style="height: 36px;margin-top: 30px;">
        <el-row style="float: right;">
          <el-button type="danger" style="padding: 10px 20px;" @click="closeAdd">取消</el-button>
          <el-button type="primary" style="padding: 10px 20px;" @click="uploadType">确定</el-button>
        </el-row>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {ADDTYPE,GETINFO} from '../../../../api/types'

  export default {
    data () {
      return {
        ruleForm: {
          categoryName: '', //品类名
        },
        rules:{
          categoryName: [
            { required: true, message: '请输入品类名称', trigger: 'blur' },
            { max: 8, message: '品类名称不得超过8个字', trigger: 'blur' }
          ],
        },
        defaultProps: {
          label: 'categoryName'
        },
      }
    },
    computed:{
      ...mapState(['menus','showAdd'])
    },
    props:{
      parentId:{
        required:true
      }
    },
    created(){

    },
    mounted () {

    },
    methods: {
      ...mapActions(['reqMenus1','showadd']),
      //关闭添加窗口
      closeAdd(){
        this.showadd(false)
      },
      //上传品类名
      async uploadType(){
        var {parentId} = this
        var {categoryName} = this.ruleForm
        if(categoryName.trim()&&categoryName.length<9){
          if(sessionStorage.getItem('haichuang_user_manage')!=null){
            var params = new FormData()
            params.append('parentId',parentId)
            params.append('categoryName',categoryName)
            var result = await ADDTYPE(params)
            if(result.status == 0){
              this.$emit('setNewList',parentId)
              this.message(result.msg,1500,'success')
              this.closeAdd()
            }else{
              this.message(result.msg,1500,'error')
            }
          }else{
            this.message('用户未登录，将返回登录界面',1500,'error')
            this.$router.replace({name:'login'})
          }
        }else{
          this.message('品类名称有误',1500,'warning')
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
      //清空数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch:{
      showAdd(newval,oldval){
        if(!newval){
          this.resetForm('ruleForm')
        }
      },
      parentId(newval,oldval){
        console.log(newval)
      }
    }
  }
</script>

<style lang="less">
  .addType{
    width: 100%;
    min-width: 300px;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    .title{
      font-size: 20px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 25px;
    }
  }

</style>
