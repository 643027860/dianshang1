<template>
  <div class="forget">
    <div class="nav">
      <div class="inner">
        <router-link :to="{name:'main'}">
          <div class="logo">
            <span>海创电商</span>
          </div>
        </router-link>
        <span class="find">重置密码</span>
        <div class="right">
          <router-link :to="{name:'register'}"><span>注&nbsp;册</span></router-link>
          <router-link :to="{name:'login'}"><span>登&nbsp;录</span></router-link>
        </div>
      </div>
    </div>
    <div class="findDiv">
      <div class="find">
        <el-steps :space="220" :active="active" finish-status="success" align-center>
          <el-step title="身份获取"></el-step>
          <el-step title="身份验证"></el-step>
          <el-step title="密码重置"></el-step>
          <el-step title="修改成功"></el-step>
        </el-steps>
        <div class="info" v-show="active == 0">
          <div class="inputrow"><span class="name">账号：</span><el-input v-model="username" placeholder="请输入用户名" autocomplete='new-password'></el-input></div>
          <div class="inputrow"><el-button @click="toTwo">下一步</el-button></div>
        </div>
        <div class="info" v-show="active == 1">
          <div class="inputrow"><span class="name">密保问题：</span><el-input v-model="question" disabled></el-input></div>
          <div class="inputrow"><span class="name">密保答案：</span><el-input v-model="answer" placeholder="请输入问题答案"></el-input></div>
          <div class="inputrow"><el-button @click="toThree">下一步</el-button></div>
        </div>
        <div class="info" v-show="active == 2">
          <div class="inputrow"><span class="name">新密码：</span><el-input placeholder="请输入新密码" autocomplete='new-password' v-model="passwordNew" show-password></el-input></div>
          <div class="inputrow"><span class="name">确认密码：</span><el-input placeholder="请再次输入新密码" autocomplete='new-password' v-model="password" show-password></el-input></div>
          <div class="inputrow"><el-button @click="reset">下一步</el-button></div>
        </div>
        <div class="info" v-show="active == 4">
          <div class="inputrow"><span class="registerSuccess"><i class="el-icon-success"></i>恭喜您，修改密码成功</span></div>
          <router-link :to="{name:'login'}"><div class="inputrow"><el-button>返回登录</el-button></div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {CHECKQUESTION,CHECKANSWER,RESETPW} from '../../api/types'
  export default {
    name:'forget',
    data () {
      return {
        username:'',   //账号
        question:'',   //问题
        answer:'',     //答案
        forgetToken :'',     //修改密码时需要用的令牌
        password:'',    //验证密码
        passwordNew:'', //新密码
        active: 0,     //当前第几步
      }
    },
    mounted () {

    },
    methods: {
      //下一步
      next() {
        this.active++
      },
      //去第二步
      async toTwo(){
        var {username} = this
        if(username){
          var result = await CHECKQUESTION({username})
          if(result.status == 0){
            this.question = result.msg
            console.log(result)
            this.next()
          }else{
            this.message(result.msg,1500,'error')
          }
        }
      },
      //去第三步
      async toThree(){
        var {username,question,answer} = this
        if(answer){
          var result = await CHECKANSWER({username,question,answer})
          if(result.status == 0){
            this.forgetToken  = result.msg
            console.log('-----')
            console.log(result)
            this.next()
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('请输入问题答案',1500,'warning')
        }
      },
      //修改密码
      async reset(){
        var {username,passwordNew,forgetToken ,password} = this
        if(passwordNew&&password){
          var params = new FormData()
          params.append('username',username)
          params.append('passwordNew',passwordNew)
          params.append('forgetToken ',forgetToken )
          if(passwordNew == password){
            var result = await RESETPW(params)
            if(result.status == 0){
              this.forgetToken = ''
              this.active = 4
            }else{
              this.message('重置密码失败',1500,'error')
            }
          }else{
            this.message('两次密码不一致',1500,'error')
            this.password = ''
          }
        }else{
          this.message('请输入完整信息',1500,'warning')
        }
      },
      //提示消息
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
  .forget{
    background-color: rgb(255,255,255);
    .nav{
      width: 100%;
      height: 100px;
      padding: auto;
      vertical-align: center;
      background-color: white;
      box-shadow: 2px 2px 7px rgb(233,233,233);
      .inner{
        width: 1000px;
        height: 100px;
        vertical-align: center;
        margin: auto;
        .logo{
          float: left;
          width: 210px;
          height: 100px;
          overflow: hidden;
          span{
            display: inline-block;
            width: 210px;
            margin: 30px 0;
            height: 50px;
            line-height: 50px;
            font-size: 45px;
            font-weight: bold;
            font-family: '宋体';
            border-right: 2px solid rgb(234,234,234);
            color: rgb(230,41,43);
            cursor: pointer;
          }
        }
        .find{
          display: inline-block;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
          margin-top: 35px;
          margin-left: 15px;
        }
        .right{
          float: right;
          height: 20px;
          margin-top: 60px;
          span{
            font-size: 14px;
            margin-right: 20px;
            color: rgb(134,134,134);
            &:hover{
              color: rgb(0,0,0);
            }
          }
        }
      }
    }
    .findDiv{
      width: 1000px;
      margin: 15px auto;
      padding: 40px;
      .find{
        width: 680px;
        margin: auto;
        height: 500px;
        .info{
          max-width: 420px;
          margin: 75px auto;
          .inputrow{
            margin: 25px 0px;
            span.name{
              display: inline-block;
              width: 80px;
              height: 40px;
              line-height: 40px;
              font-size: 16px;
              float: left;
              text-align: right;
            }
            span.registerSuccess{
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 25px;
              text-align: center;
              margin-bottom: 40px;
              i{
                font-size: 30px;
                color: greenyellow;
                margin-left: 20px;
                margin-right: 15px;
              }
            }
            .el-input{
              float: left;
              width: 320px!important;
            }
            &:before,&:after{
              display: table;
              content: '';
              clear: both;
            }
            .is-disabled .el-input__inner{
              color: black!important;
            }
            .el-button{
              width: 320px;
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
