<template>
  <div class="safe">
    <p><span class="safeName">用户名：</span>{{username}}</p>
    <p>
      <span class="safeName"><i>*</i>原密码：</span>
      <el-input type="password" v-model="passwordOld" placeholder="请输入原密码"></el-input>
    </p>
    <p>
      <span class="safeName"><i>*</i>新密码：</span>
      <el-input type="password" v-model="passwordNew" placeholder="请输入新密码"></el-input>
    </p>
    <p>
      <span class="safeName" />
      <el-button @click="saveSafe">确认修改</el-button>
    </p>
  </div>
</template>

<script>
  import {RESETPASSWORD} from '../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        id:'',
        username:'',
        passwordOld:'',
        passwordNew:'',
      }
    },
    computed:{
      ...mapState(['user'])
    },
    mounted () {
      if(sessionStorage.getItem('haichuang_user') != 'null'){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
        this.username = this.user.username
      }
    },
    methods: {
      ...mapActions(['setuser']),
      async saveSafe(){
        var {passwordOld,passwordNew,username} = this
        if(passwordOld&&passwordNew&&username){
          var params = new FormData()
          params.append('passwordOld',passwordOld)
          params.append('passwordNew',passwordNew)
          params.append('username',username)
          var result = await RESETPASSWORD(params)
          if(result.status ==0 ){
            this.message(result.msg,1500,'success')
            this.passwordNew = ''
            this.passwordOld = ''
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('请输入完整信息',1500,'warning')
        }
      },
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
  .safe{
    padding: 25px 0;
    p{
      font-size: 16px;
      color: #666666;
      line-height: 20px;
      margin-bottom: 20px;
      padding: 7px;
      span.safeName{
        display: inline-block;
        width: 100px;
        margin-right: 20px;
        text-align: right;
        i{
          color: red;
          padding: 0 4px;
        }
      }
      .el-input{
        display: inline-block;
        width: 350px;
      }
      .el-button{
        padding: 9px 20px!important;
      }
    }
  }
</style>
