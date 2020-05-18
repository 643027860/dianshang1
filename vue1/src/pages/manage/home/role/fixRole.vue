<template>
  <div class="fixRole" v-show="showFix">
    <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="title">
        修改角色：
      </div>
      <el-form-item label="角色名" prop="name" label-width="80px">
        <el-input v-model="ruleForm.name" placeholder="请输入角色名,不得超过八个字"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" label-width="80px">
        <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注，不得超过100个字"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menus" label-width="80px">
        <el-tree
          :data="menus"
          ref="tree"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check-change="handleCheckChange"
          v-show="menus"
        >
        </el-tree>
      </el-form-item>
    </el-form>
    <div style="height: 36px;margin-top: 30px;">
      <el-row style="float: right;">
        <el-button type="danger" style="padding: 10px 20px;" @click="closeFix">取消</el-button>
        <el-button type="primary" style="padding: 10px 20px;" @click="updateRole">确定</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {REQMENUS,UPLOADROLE} from '../../../../api/types'
  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          remark:'',
          menus:'',
        },
        rules:{
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
            { max: 8, message: '角色名不得超过8个字', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请写备注', trigger: 'blur' },
            {max: 100, message: '不得超过100个字', trigger: 'blur' }
          ],
          menus: [
            { required: false},
          ],
        },
        defaultProps: {
          label: 'name'
        },
        pageNum:1,
        pageSize:1000,
      }
    },
    computed:{
      ...mapState(['menus','showFix'])
    },
    props:{
      role:{
        required:true
      }
    },
    created(){
      if(this.menus.length<=0){
        this.reqmenus()
      }
    },
    mounted () {
      this.ruleForm.name = this.role.name
      this.ruleForm.remark = this.role.remark
    },
    watch:{
      role(newval,oldval){
        this.ruleForm.name = newval.name
        this.ruleForm.remark = newval.remark
      },
      deep:true,
    },
    methods: {
      ...mapActions(['reqMenus1','showfix']),
      //关闭窗口
      closeFix(){
        this.$refs.tree.setCheckedKeys([])   //清除树状图之前选择的值
        this.showfix(false)
      },
      //获取选中的点
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes()
        let arr = []
        res.forEach((item) => {
          arr.push(item.id)
        })
        this.ruleForm.menus = arr
        console.log(this.ruleForm.menus)
      },
      //获取菜单列表
      async reqmenus(){
        var {pageNum,pageSize} = this
        var params = new FormData()
        params.append('pageNum',pageNum)
        params.append('pageSize',pageSize)
        this.loading = true
        var result = await REQMENUS(params)
        this.loading = false
        if(result.code == 200){
          this.reqMenus1(result.data.content)
        }else{
          var message = result.msg
          this.$message({
            message:message,
            type:'error',
            duration:1500
          })
        }
      },
      //修改角色
      async updateRole(){
        var {name,remark,menus} = this.ruleForm
        if(name.trim()&&remark.trim()){
          console.log(menus)
          var result = await UPLOADROLE(name,remark,menus)
          if(result.code == 200){
            this.$message({
              message:'修改成功',
              type:'success',
              duration:1500
            })
            this.resetForm('ruleForm')
            this.closeFix()
          }else{
            var message = result.msg
            this.$message({
              message:message,
              type:'error',
              duration:1500
            })
          }
        }else{
          this.$message({
            message:'请输入角色的完整信息',
            type:'warning',
            duration:1500
          })
        }
      },
      //清空数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style lang="less">
  .fixRole{
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
