<template>
  <div class="info">
    <p><span class="infoName">用户名：</span>{{username}}</p>
    <p>
      <span class="infoName"><i>*</i>手机号：</span>
      <el-input v-model="phone" placeholder="请输入手机号" @blur="rulePhone"></el-input>
      <span style="color: red;padding-left: 10px;font-size: 14px;" v-if="!phoneOk">{{phoneError}}</span>
    </p>
    <p>
      <span class="infoName"><i>*</i>邮箱：</span>
      <el-input v-model="email" placeholder="请输入邮箱" @blur="ruleEmail"></el-input>
      <span style="color: red;padding-left: 10px;font-size: 14px;" v-if="!emailOk">{{emailError}}</span>
    </p>
    <p>
      <span class="infoName"><i>*</i>密保问题：</span>
      <el-input v-model="question" placeholder="请输入密保问题"></el-input>
    </p>
    <p>
      <span class="infoName"><i>*</i>密保答案：</span>
      <el-input v-model="answer" placeholder="请输入密保答案"></el-input>
    </p>
    <p>
      <span class="infoName" />
      <el-button @click="saveInfo">保存</el-button>
    </p>
  </div>
</template>

<script>
  import {UPDATEINFO,CHECKVALID} from '../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        id:'',
        username:'',
        phone:'',
        email:'',
        question:"",
        answer:"",
        saveUser:'',
        emailError:'',
        emailOk:true,
        phoneError:'',
        phoneOk:true,
      }
    },
    computed:{
      ...mapState(['user'])
    },
    created(){
      if(sessionStorage.getItem('haichuang_user') != 'null'){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
      }
    },
    mounted () {
      if(this.user){
        this.saveUser = this.user
        this.id = this.user.id
        this.username = this.user.username
        this.phone = this.user.phone
        this.email = this.user.email
        this.question = this.user.question
        this.answer = this.user.answer
      }
    },
    methods: {
      ...mapActions(['setuser']),
      async saveInfo(){
        var {phone,email,question,answer,phoneOk,emailOk,emailError,phoneError} = this
        if(question.trim()&&answer.trim()&&phone.trim()&&email.trim()){
          if(phoneOk&&emailOk){
            var params1 = new FormData()
            params1.append('phone',phone)
            params1.append('email',email)
            params1.append('question',question)
            params1.append('answer',answer)
            var result = await UPDATEINFO(params1)
            if(result.status ==0 ){
              this.saveUser.phone = phone
              this.saveUser.email = email
              this.saveUser.question = question
              this.saveUser.answer = answer
              sessionStorage.setItem('haichuang_user',JSON.stringify(this.saveUser))
              this.setuser(this.saveUser)
              this.message(result.msg,1500,'success')
            }else{
              this.message(result.msg,1500,'error')
            }
          }else{
            this.message('请输入正确信息',1500,'error')
          }
        }else{
          this.message('请输入完整信息',1500,'warning')
        }
      },
      //邮箱验证
      async ruleEmail(){
        var {email} = this
        var regEmail=/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
        if(!regEmail.test(email)){
          this.message('邮箱格式不正确',1500,'error')
          this.emailError = '邮箱格式不正确'
          this.emailOk = false
        }else{
          if(email!=this.user.email){
            var result = await CHECKVALID({str:email,type:'email'})
            if(result.status == 0){
              this.emailOk = true
              this.emailError = ''
            }else{
              this.emailOk = false
              this.emailError = result.msg
            }
          }else{
            this.emailOk = true
            this.emailError = ''
          }
        }
      },
      //手机验证
      rulePhone(){
        var {phone} = this
        var regPhone = /^1[34578]\d{9}$/ ;
        if(!regPhone.test(phone)){
          this.phoneError = '手机号码不正确'
          this.phoneOk = false
        }else{
          this.phoneOk = true
          this.phoneError = ''
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
  .info{
    padding: 25px 0;
    p{
      font-size: 16px;
      color: #666666;
      line-height: 20px;
      margin-bottom: 20px;
      padding: 7px;
      span.infoName{
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
