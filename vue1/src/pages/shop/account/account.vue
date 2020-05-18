<template>
  <div class="account">
    <div class="accountNav">
      <div class="navLis myShopWidth">
        <span class="navTitle noSelect">个人中心</span>
        <router-link :to="{name:'main'}">
          首&nbsp;页
        </router-link>
      </div>
    </div>
    <div class="accountMain myShopWidth">
      <div class="leftLists">
        <ul>
          <li><router-link :to="{name:'info'}">个人信息</router-link></li>
          <li><router-link :to="{name:'safe'}">安全设置</router-link></li>
          <li><router-link :to="{name:'addition'}">收货地址</router-link></li>
        </ul>
      </div>
      <div class="rightLists">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        shops:[],
      }
    },
    created(){
      if(sessionStorage.getItem('haichuang_user') != null){
        this.setuser(JSON.parse(sessionStorage.getItem('haichuang_user')))
      }else{
        this.message('用户未登录！',1000,'warning')
        setTimeout(()=>{
          this.$router.replace({name:'login'})
        },500)
      }
    },
    mounted () {

    },
    methods: {
      ...mapActions(['setuser']),
      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      }
    },
  }
</script>

<style lang="less">
  .account{
    --myShopWidth: 1200px;
    --leftWidth: 140px;
    --leftMargin: 25px;
    --navHeight: 70px;
    --contentWidth: 800px;
    background-color: white;
    ul{
      padding: 0;
      margin: 0;
      li{
        list-style: none;
      }
    }
    a{
      text-decoration: none;
    }
    .myShopWidth{
      width: 1200px;
      width: var(--myShopWidth);
      margin: auto;
    }
    .accountNav{
      height: 70px;
      height: var(--navHeight);
      background-color: rgb(258,68,1);
      .navLis{
        color: white;
        background-color: rgb(258,68,1);
        span.navTitle{
          display: inline-block;
          height: 70px;
          width: 140px;
          width: var(--leftWidth);
          margin-right: 25px;
          margin-right: var(--leftMargin);

          line-height: 70px;
          font-size: 25px;
        }
        a{
          color: white;
          display: inline-block;
          width: 80px;
          height: 36px;
          margin: 0 15px;

          line-height: 36px;
          text-align: center;
          font-size: 16px;
          cursor:pointer;
          &:hover{
            text-decoration: underline!important;
          }
        }
      }
    }
    .accountMain{
      padding-top: 15px;
      &:before,&:after{
        display: table;
        content: '';
        clear: both;
      }
      .leftLists{
        width: 140px;
        width: var(--leftWidth);
        margin-right: 25px;
        margin-right: var(--leftMargin);
        height: 100px;
        float: left;
        ul{
          li{
            line-height: 30px;
            height: 50px;
            padding: 10px 0;
            text-align: center;

            a{
              font-size: 16px;
              color: #333333;
              &:hover{
                color: rgb(240,41,41);
              }
            }
          }
        }
      }
      .rightLists{
        width: 1035px;
        width: calc(var(--myShopWidth) - var(--leftWidth) - var(--leftMargin));
        float: left;
        .content{
          width: 800px;
          width: var(--contentWidth);
          margin-left: 30px;
          border: 1px solid #bce8f1;
          box-sizing: border-box;
        }
      }
    }
  }
  @media screen and(max-width: 1000px){
    .profile{
      .myShopWidth{

      }
      .profileNav{

      }
      .profileMain{

      }
    }
  }
</style>
