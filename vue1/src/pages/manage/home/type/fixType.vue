<template>
  <div class="fixType" v-show="showFix">
    <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="title">
        修改品类：
      </div>
      <el-form-item label="品类名称" prop="categoryName" label-width="80px">
        <el-input v-model="ruleForm.categoryName" placeholder="请输入品类名称,不得超过8个字"></el-input>
      </el-form-item>
    </el-form>
    <div style="height: 36px;margin-top: 30px;">
      <el-row style="float: right;">
        <el-button type="danger" style="padding: 10px 20px;" @click="closeFix">取消</el-button>
        <el-button type="primary" style="padding: 10px 20px;" @click="updatetype">确定</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {SETTYPE,GETINFO} from '../../../../api/types'
  export default {
    data () {
      return {
        categoryId: '',   //当前品类ID
        parentId: '',   //当前品类ID
        ruleForm: {
          categoryName: '',
        },
        rules:{
          categoryName: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
            { max: 8, message: '角色名不得超过8个字', trigger: 'blur' }
          ],
        },
        defaultProps: {
          label: 'categoryName'
        },
      }
    },
    computed:{
      ...mapState(['showFix'])
    },
    props:{
      type:{
        required:true
      }
    },
    created(){

    },
    mounted () {
      this.ruleForm.categoryName = this.type.name
      this.categoryId = this.type.id
      this.parentId = this.type.parentId
      if(this.categoryId == ''){
        this.message('请求出错',1000,'error')
        this.closeFix()
      }
    },
    watch:{
      type(newval,oldval){
        this.ruleForm.categoryName = newval.name
        this.parentId = newval.parentId
        this.categoryId = newval.id
      },
      categoryId(newval,oldval){
        if(newval == ''){
          this.message('请求出错',1500,'error')
          this.closeFix()
        }
      },
      deep:true,
    },
    methods: {
      ...mapActions(['showfix']),
      //关闭修改窗口
      closeFix(){
        this.showfix(false)
      },
      //修改角色
      async updatetype(){
        var {categoryId,parentId} = this
        var {categoryName} = this.ruleForm
        if(categoryName.trim()&&categoryName.length<9){
          if(sessionStorage.getItem('haichuang_user_manage')!=null) {
            var params = new FormData()
            params.append('categoryId',categoryId)
            params.append('categoryName',categoryName)
            var result = await SETTYPE(params)
            if(result.status == 0){
              console.log('1')
              this.$emit('setNewName',parentId,categoryId,categoryName)
              console.log('2')
              this.closeFix()
              setTimeout(()=>{
                this.message(result.msg,1200,'success')
              },100)
              console.log('3')
            }else{
              this.message(result.msg,1200,'error')
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
  }
</script>

<style lang="less">
  .fixType{
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
