<template>
  <div class="profile">
    <div class="profileNav">
      <div class="navLis myShopWidth">
        <span class="navTitle noSelect">个人中心</span>
        <router-link :to="{name:'main'}">
          首&nbsp;页
        </router-link>
        <router-link :to="{name:'info'}">
          账户管理
        </router-link>
      </div>
    </div>
    <div class="profileMain myShopWidth">
      <div class="leftLists">

      </div>
      <div class="rightLists">
        <div class="top myProfileBorder">
          <div class="avatarDiv">
            <router-link :to="{name:'account'}">
              <el-avatar :size="60" src="../../../assets/imgs/logo/logo.png" @error="errorHandler" class="avatar">
                <img v-lazy="'http://storage.360buyimg.com/i.imageUpload/6a645f3739623836366462646666616631343937393638363730333332_mid.jpg'" alt="头像">
              </el-avatar>
            </router-link>
            <router-link :to="{name:'account'}">
              <span class="userName">瑶没有妲己可爱</span>
            </router-link>
          </div>
          <div class="ziliaoDiv">
            <router-link :to="{name:'cart'}">我的购物车</router-link>
            <router-link :to="{name:'order'}">我的订单</router-link>
            <router-link :to="{name:'addition'}">我的收货地址</router-link>
          </div>
        </div>
        <div class="bottom myProfileBorder">
          <div class="wuLiuTitle">
            我的订单
          </div>
          <div class="wuLiuLists">
            <ul v-if="shops.length>0">
              <li v-for="(li,index) in 10" :key="index">
                <img v-lazy="'https://img.alicdn.com/bao/uploaded/i1/2752459598/TB2XlIqkdrJ8KJjSspaXXXuKpXa_!!2752459598.jpg_120x120xz.jpg'" alt="">
                <div class="nameDiv">
                  <p class="name">【佛山转运中心】，正发往【高州市】</p>
                  <time>&nbsp;&nbsp;2020-04-30 11:44:01</time>
                </div>
                <div class="okButton">
                  <el-button size="small">确认收货</el-button>
                </div>
              </li>
              <p class="moreLists">查看更多订单&nbsp;&nbsp;>>></p>
            </ul>
            <div class="noListsDiv" v-else>
              <div class="noLists">
                <img src="../../../assets/imgs/shop/car.svg" alt="">
                <span>暂无订单，快去挑选适合的商品吧！</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        shops:[],
      }
    },
    async created(){
      this.shops = [
        {
          'id':0,
          'name':'送给闺蜜大学女生的生日礼物男生实用特别创意潮流精致个性小礼品',
          'subtitle':'颜色分类：江苏木渎古镇+声控+5个LED灯',
          'main_image':'',
          'sub_images':'',
          'detail':'',
          'price':'35.00',
          'stock':'',
          'status':'',
          'create_time':'',
          'update_time':'',
        },
      ]
    },
    mounted () {

    },
    methods: {
      //头像加载失败
      errorHandler(){
        return true
      }
    },
  }
</script>

<style lang="less">
  .profile{
    a{
      text-decoration: none;
    }
    .myShopWidth{
      width: 1200px;
      margin: auto;
    }
    .profileNav{
      height: 70px;
      background-color: rgb(258,68,1);
      .navLis{
        color: white;
        background-color: rgb(258,68,1);
        span.navTitle{
          display: inline-block;
          height: 70px;
          width: 140px;
          margin-right: 45px;

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
    .profileMain{
      .rightLists{
        padding: 10px 0px;
        .myProfileBorder{
          box-sizing: border-box;
          border: 1px solid rgb(200,234,234);
        }
        .top{
          margin-bottom: 20px;
          &:before,&:after{
            content: '';
            display: table;
            clear: both;
          }
          .avatarDiv{
            background-color: rgb(234,248,255);
            padding: 15px;
            height: 90px;
            .avatar{
              float: left;
              cursor: pointer;
            }
            .userName{
              float: left;
              margin-left: 25px;
              height: 50px;
              line-height: 50px;
              font-size: 16px;
              cursor: pointer;
              color: rgb(10,10,10);
              &:hover{
                color: rgb(254,64,69);
              }
            }
          }
          .ziliaoDiv{
            a{
              display: inline-block;
              margin: 15px 0;
              height: 25px;
              width: 33%;
              line-height: 25px;
              font-size: 14px;
              text-align: center;
              color: rgb(134,134,134);
              box-sizing: border-box;
              &:hover{
                color: rgb(255,64,69);
              }
            }
            a:not(:last-child){
              border-right: 1px solid rgb(133,133,133);
            }
          }
        }
        .bottom{
          .wuLiuTitle{
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            padding: 0 20px;
            border-bottom: 1px solid rgb(200,234,234);
            background-color: rgb(234,248,255);
          }
          .wuLiuLists{
            ul{
              padding: 0;
              li{
                list-style: none;
                height: 100px;
                padding: 15px;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(200,234,234);
                img{
                  float: left;
                  height: 70px;
                  width: 70px;
                  cursor: pointer;
                }
                .nameDiv{
                  float: left;
                  width: 400px;
                  padding-left: 30px;
                  p.name{
                    height: 36px;
                    line-height: 36px;
                    font-size: 14px;
                    margin: 0;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                  }
                }
                .okButton{
                  float: right;
                  margin: 19px 0;
                }
              }
              .moreLists{
                margin-bottom: 0;
                height: 38px;
                line-height: 50px;
                font-size: 16px;
                text-align: center;
                cursor: pointer;
                color: rgb(130,130,130);
                transition: 0.4s;
                &:hover{
                  color: rgb(0,0,0);
                }
              }
            }
          }
          .noListsDiv{
            padding: 60px 0 100px;
            text-align: center;
            .noLists{
              display: inline-block;
              height: 70px;
              img{
                height: 70px;
                width: 70px;
                margin-right: 20px;
              }
              span{
                font-size: 16px;
                color: rgb(144,144,140);
              }
            }
          }
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
