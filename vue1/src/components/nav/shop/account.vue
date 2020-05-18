<template>
  <div class="myShopAvatar">
    <el-dropdown @command="handleCommand" v-if="user">
      <span class="el-dropdown-link">
        <span>{{user.username}}<i class="el-icon-caret-bottom"></i></span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人中心</el-dropdown-item>
        <el-dropdown-item divided command="out">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span v-else @click="toLogin">点击登录</span>
  </div>
</template>

<script>
  import {LOGOUT} from '../../../api/types'
  import {mapActions,mapState} from 'vuex'
  export default {
    data () {
      return {

      }
    },
    mounted () {
      if(sessionStorage.getItem('haichuang_user')){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
      }
    },
    computed:{
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['setuser']),

      async handleCommand(command){
        if(command == 'account'){
          this.$router.push({name:'info'})
        }
        else if(command == 'out'){
          var result = await LOGOUT()
          if(result.status == 0){
            sessionStorage.setItem('haichuang_user',null)
            this.setuser('')
            this.$router.replace({name:'login'})
          }else{
            this.$message({
              message:result.msg,
              duration:1500,
              type:'error'
            })
          }
        }
      },

      //去登陆
      toLogin(){
        this.$router.push({name:'login'})
      }
    },
  }
</script>

<style lang="less">
  @media (any-hover: hover){      //解决hover影响移动端
    .myAvatar:hover{
      cursor:pointer;
      background-color: whitesmoke;
    }
  }
  .el-dropdown-menu{
    padding: 0;
    margin-top: 0!important;
  }
  .el-dropdown-menu__item--divided:before{
    height: 0px;
  }
  .el-dropdown-menu__item--divided{
    margin-top: 0;
  }
  .myShopAvatar{
    float: left;
    height: 40px;
    padding: 5px 8px;
    *{
      outline: white;
    }
    span{
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      transition: 0.4s;
    }
  }
  .hoverAvatar{
    cursor:pointer;
    background-color: whitesmoke;
  }
</style>
