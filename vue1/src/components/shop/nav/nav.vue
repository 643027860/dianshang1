<template>
  <div class="myShopNav">
    <div class="shopNav">
      <div class="left" style="overflow: hidden;">
        <span class="welcome">欢迎，</span>
        <Avatar></Avatar>
      </div>
      <div class="right">
        <ul>
          <router-link :to="{name:'main'}">
            <li>
              主页
            </li>
          </router-link>
          <router-link :to="{name:'cart'}">
            <li style="width: 114px">
              <img src="../../../assets/imgs/shop/carRed.svg" alt="">
              购物车({{cartCount}})
            </li>
          </router-link>
          <router-link :to="{name:'order'}">
            <li>
              我的订单
            </li>
          </router-link>
          <router-link :to="{name:'info'}">
            <li>
              个人中心
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../../../components/nav/shop/account'
  import {mapState,mapActions} from 'vuex'
  import {GETCARTCOUNT} from '../../../api/types'
  export default {
    components:{
      Avatar,
    },
    data () {
      return {
        name:'瑶没有妲己可爱'
      }
    },
    computed:{
      ...mapState(['cartCount'])
    },
    async created(){

    },
    async mounted () {
      var result = await GETCARTCOUNT()
      if(result.status === 0){
        this.savecartcount(result.data)
      }
    },
    methods: {
      ...mapActions(['savecartcount'])
    },
  }
</script>

<style lang="less">
  .myShopNav{
    width: 100%;
    min-width: 1000px;
    height: 40px;
    background-color: rgb(234,234,234);
    .shopNav{
      width: 1200px;
      margin: auto;
      &:after,&:before{
        content: '';
        display: table;
        clear: both;
      }
      width: 1200px;
      margin: auto;
      .left{
        &:after,&:before{
          content: '';
          display: table;
          clear: both;
        }
        display: inline-block;
        span.welcome{
          float: left;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
      }
      .right{
        float: right;
        ul{
          margin: 0;
          padding: 0;
          a{
            color: #333333;
          }
          li{
            float: left;
            list-style: none;
            height: 40px;
            width: 90px;
            padding: 0 5px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            transition: 0.1s;
            overflow: hidden;
            img{
              height: 14px;
              width: 14px;
              margin-top: -2px;
            }
            &:hover{
              color: red;
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 1199px){
    .myShopNav{
      .shopNav{

      }
    }
  }
</style>
