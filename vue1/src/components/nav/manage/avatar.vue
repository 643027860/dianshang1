<template>
  <div class="myAvatar">
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        <div class="inner">
          <img src="../../../assets/imgs/logo/logo.png" alt="">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
<!--        <el-dropdown-item command="center">个人中心</el-dropdown-item>-->
<!--        <el-dropdown-item command="other">切换账号</el-dropdown-item>-->
<!--        <el-dropdown-item divided command="out">退出登录</el-dropdown-item>-->
        <el-dropdown-item command="out">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    methods: {
      handleCommand(command){
        if(command == 'center')
          console.log('个人中心')
        else if(command == 'other'){
          this.$router.replace({name:'login'})
        }
        else if(command == 'out'){
          sessionStorage.setItem('haichuang_manage',null)
          this.$router.replace({name:'login'})
        }
      },
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
  .myAvatar{
    float: right;
    height: 50px;
    padding: 0 8px;
    margin-right: 30px;
    *{
      outline: white;
    }
    .inner{
      position: relative;
      img{
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 10%;
      }
      i{
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
</style>
