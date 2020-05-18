<template>
  <div class="loginOut">
    <div class="loginBlack"></div>
    <div class="loginDiv">
      <div class="loginLogo"><img src="../../assets/imgs/logo/logo.png" alt="图标"></div>
      <p class="loginTitle">海创电子商务平台</p>
      <div class="login">
        <div class="rightLogin">
          <div class="loginInner">
            <p class="loginP noSelect">欢迎回来</p>
            <el-form :model="ruleForm"  ref="ruleForm" label-width="50px">
              <el-form-item label="账户"  prop="username">
                <el-input  prefix-icon="el-icon-s-custom" v-model.number="ruleForm.username" autocomplete="off" placeholder="请输入账号"><</el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="类型" class="forget noSelect" id="forget">
                <el-radio v-model="type" label="1" style="margin-left: 15px;">用户</el-radio>
                <el-radio v-model="type" label="2">管理员</el-radio>
                <router-link :to="{name:'forget'}" target="_blank"><p>忘记密码</p></router-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login('ruleForm')" style="height: 40px;width:100%;padding: 0px 10px"><span class="loginspan">立即登录</span></el-button>
              </el-form-item>
              <el-form-item>
                <router-link :to="{name:'register'}" target="_blank"><el-button style="height: 40px;width:100%;padding: 0px 10px"><span class="loginspan">注册账号</span></el-button></router-link>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="leftImg">
          <img v-lazy="'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2300875363,445064071&fm=5'" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {LOGIN,LoginManage} from '../../api/types'
  import {mapActions} from 'vuex'
  export default {
    name:'login',
    data() {
      return {
        type: '1',   //登录人员类型,1为用户，2为管理员
        ruleForm: {
          password: '',
          username:'',
        },
      };
    },
    methods: {
      ...mapActions(['setuser','setmanage']),
      //登录
      async login(){
        var {type} = this
        var {password,username} = this.ruleForm
        var _this = this
        if(password&&username){
          var params = new FormData()
          params.append('username',username)
          params.append('password',password)
          if(type == 1){
            var result = await LOGIN(params)
            if(result.status == 0){
              this.message('登陆成功',1500,'success')
              this.resetForm('ruleForm')    //清空所有值
              _this.setuser(result.data)     //保存用户信息
              sessionStorage.setItem("haichuang_user",JSON.stringify(result.data))
              this.$router.replace({name:'main'})
            }else{
              this.message(result.msg,1500,'error')
            }
          }else{
            var result = await LoginManage(params)
            if(result.status == 0){
              this.message('登陆成功',1500,'success')
              this.resetForm('ruleForm')    //清空所有值
              _this.setmanage(result.data)     //保存用户信息
              sessionStorage.setItem("haichuang_user_manage",JSON.stringify(result.data))
              this.$router.replace({name:'goodList'})
            }else{
              this.message(result.msg,1500,'error')
            }
          }
        }else{
          this.message('账号或密码不能为空',1500,'warning')
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

      // 清空表单
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .loginOut{
    .loginBlack{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      background-image: url("../../assets/imgs/login/login.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .loginDiv{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate3d(-50%,-60%,0);
      .loginLogo{
        height: 100px;
        width: 100px;
        margin: auto;
        background-color: whitesmoke;
        overflow: hidden;
        border: 1px solid whitesmoke;
        border-radius: 50%;
        img{
          height: 120px;
          width: 120px;
          margin-left: -8px;
          margin-top: 10px;
        }
      }
      .loginTitle{
        color: white;
        font-size: 30px;
        text-align: center;
        margin: 45px auto;
        height: 30px;
        line-height: 30px;
        letter-spacing: 10px;
      }
      .login{
        width:800px;

        border: 1px solid rgb(233,233,233);
        box-sizing: border-box;
        border-radius: 8px;
        background-color: rgba(255,255,255,1);
        .leftImg{
          border-radius: 8px 0 0 8px;
          overflow: hidden;
          img{
            float: left;
            height:385px;
            width: 400px;
          }
        }

        .rightLogin{
          float: right;

          width: 400px;
          height: 100%;
          padding: 30px;
          .loginInner{
            p.loginP{
              font-size: 25px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              margin-bottom: 30px;
              margin-left: 25px;
              letter-spacing: 5px;
            }
            .el-form-item{
              margin-bottom: 10px;
            }
            .el-input__inner,.el-button{
              /*输入框椭圆*/
              border-radius: 20px;
            }
            .forget{
              height: 45px!important;
              overflow: hidden;
              .el-form-item{
                margin-bottom: 0px;
              }
              p{
                float: right;
                margin-right: 10px;
                font-size: 12px;
                color: #6C6C6C;
                cursor: pointer;
                height: 45px;
                line-height: 45px;
                &:hover{
                  color: rgb(10,10,10);
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 899px) and (min-width: 500px){
    .loginOut{
      color: white!important;
      .login{
        width: 400px!important;
        .leftImg{
          display: none;
        }
        .el-form-item__label{   //账户密码文字颜色
          color: white!important;
        }
        .forget p{   //忘记密码颜色
          color: white!important;
        }
      }
    }
  }
  @media screen and(max-width: 499px){
    .loginOut{
      color: white!important;
      .loginDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);

        .loginLogo {
          height: 70px;
          width: 70px;
          margin: auto;
          background-color: whitesmoke;
          overflow: hidden;
          border: 1px solid whitesmoke;
          border-radius: 50%;

          img {
            height: 90px;
            width: 90px;
            margin-left: -8px;
            margin-top: 5px;
          }
        }

        .loginTitle {
          color: white;
          font-size: 28px;
          text-align: center;
          margin: 35px auto 30px;
          height: 28px;
          line-height: 28px;
          letter-spacing: 2px;
        }

        .login{
          border: 0!important;
          width: 100vw!important;
          .rightLogin{
            width: 100%!important;
            padding: 30px 30px 10px!important;
            p.loginP{
              font-size: 22px!important;
              margin-top: -30px!important;
              margin-bottom: 20px!important;
            }
            .el-form-item{
              margin-bottom: 18px!important;
            }
            .loginSpan{
              letter-spacing: 5px;
              font-size: 16px;
            }
            .el-form-item__label{   //账户密码文字颜色
              color: white!important;
            }
            .forget p{   //忘记密码颜色
              color: white!important;
            }
          }
          .leftImg{
            display: none;
          }
        }
      }
    }
  }
</style>
