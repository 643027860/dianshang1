<template>
  <div class="mainshop">
    <div class="searchDiv">
      <div class="myShopWidth">
        <div class="logo">
          <span>海创电商</span>
        </div>
        <div class="search">
          <div class="inputDiv">
            <el-input placeholder="请输入商品名" v-model="keyword" class="input-with-select">
              <el-button slot="append" @click="toSearch" id="searchButton">搜索</el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="typesDiv myShopWidth">
      <div class="leftType">
        <ul>
          <li v-for="(type,index) in types" :key="index" :id="type.id">
              <span v-for="(li,index) in type.children" :key="index" :id="li.id" @click="choiceType(li)">
                {{li.name}}
              </span>
          </li>
        </ul>
      </div>
      <div class="rightImages">
        <el-carousel>
          <el-carousel-item v-for="(image,index) in images" :key="index">
            <img v-lazy="image.url" :alt="image.name">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="hotGoodDiv myShopWidth">
      <div class="hot">
        <h3 class="title">今日热卖</h3>
        <div class="shops">
          <ul>
            <li v-for="(li,index) in 6" :key="index">
              <img v-lazy="'https://img12.360buyimg.com/mobilecms/s144x144_jfs/t1/117050/10/2720/70078/5ea3e96aE1827b78d/5b5aeae0aa2c1106.jpg!q70.jpg.webp'" alt="">
              <div class="nameDiv">
                <p class="name">决赛的礼品袋（和四大按时打算打算大皆空)</p>
                <p class="price"><span>￥</span>55.48</p>
                <p class="out">已销售 <span>180</span> 件</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="good">
        <h3 class="title">好货推荐</h3>
        <div class="shops">
          <ul>
            <li v-for="(li,index) in 6" :key="index">
              <img v-lazy="'https://img12.360buyimg.com/mobilecms/s144x144_jfs/t1/117050/10/2720/70078/5ea3e96aE1827b78d/5b5aeae0aa2c1106.jpg!q70.jpg.webp'" alt="">
              <div class="nameDiv">
                <p class="name">决赛的礼品袋（和四大按时打算打算大皆空)</p>
                <p class="price"><span>￥</span>55.48</p>
                <p class="out">已销售 <span>180</span> 件</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="newDiv myShopWidth">
      <h3>今日新品</h3>
      <div class="new">
        <ul>
          <li v-for="(li,index) in 4" :key="index">
            <div class="nameDiv">
              <p class="title">520节</p>
              <p class="subtitle">快哦的萨拉萨的人节礼物送女友朋友送老婆30岁母亲人节礼物送女友朋友送老婆30岁母亲</p>
            </div>
            <div class="images">
              <img v-lazy="'https://img.alicdn.com/imgextra/i4/129/TB2wR1mf6oIL1JjSZFyXXbFBpXa_!!129-2-luban.png_120x120q90.jpg_.webp'" alt="">
              <img v-lazy="'https://img.alicdn.com/imgextra/i2/165/TB2e0x7X138SeJjSZFPXXc_vFXa_!!165-2-luban.png_120x120q90.jpg_.webp'" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="likeDiv myShopWidth">
      <h3>猜您喜欢</h3>
      <div class="like">
        <ul>
          <li v-for="(li,index) in count" :key="index">
            <div class="images">
              <img v-lazy="url" alt="">
            </div>
            <div class="nameDiv">
              <h4 class="title">同学聚会纪念品礼品小礼物同学会实用水晶照片定制公司团队企业年</h4>
              <p>
                <span class="count">销量：1</span>
                <span class="price">
                  <span>¥</span>68
                </span>
              </p>
            </div>
          </li>
        </ul>
        <div v-show="likesLoading" class="loading">
          <Loading></Loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQSHOPLISTS} from '../../../api/types'
  import {mapState,mapActions} from 'vuex'
  import Loading from '../../../components/loading/loading'
  export default {
    data () {
      return {
        categoryId:'',  //品类ID，可空
        keyword:'',  //查询关键字，可空
        pageNum:'',  //分页页码，可空
        pageSize:'',  //每页大小，可空
        orderBy:'',  //动态排序参数,desc和asc

        Goods:[],     //商品所有信息
        goods:[],     //商品信息
        types:[
          {
            id:'0',
            name:'家用电器',
            children:[
              {
                id:'0-0',
                name:'冰箱',
              },
              {
                id:'0-1',
                name:'电视机',
              },
              {
                id:'0-2',
                name:'风扇',
              },
              {
                id:'0-3',
                name:'热水壶',
              },
            ]
          },
          {
            id:'1',
            name:'衣服',
            children:[
              {
                id:'1-0',
                name:'内衣裤',
              },
              {
                id:'1-1',
                name:'鞋子',
              },
              {
                id:'1-2',
                name:'女衣服',
              },
              {
                id:'1-3',
                name:'男衣服',
              },
            ]
          },
          {
            id:'2',
            name:'工具',
            children:[
              {
                id:'2-0',
                name:'锤子',
              },
              {
                id:'2-1',
                name:'刀子',
              },
              {
                id:'2-2',
                name:'桌子',
              },
              {
                id:'2-3',
                name:'凳子',
              },
            ]
          },
          {
            id:'3',
            name:'出行工具',
            children:[
              {
                id:'3-0',
                name:'单车',
              },
              {
                id:'3-1',
                name:'摩托车',
              },
              {
                id:'3-2',
                name:'电瓶车',
              },
              {
                id:'3-3',
                name:'小汽车',
              },
            ]
          },
          {
            id:'4',
            name:'零食',
            children:[
              {
                id:'4-0',
                name:'辣条',
              },
              {
                id:'4-1',
                name:'豆类',
              },
              {
                id:'4-2',
                name:'牛奶',
              },
              {
                id:'4-3',
                name:'饼干',
              },
            ]
          },
          {
            id:'2',
            name:'工具',
            children:[
              {
                id:'2-0',
                name:'锤子',
              },
              {
                id:'2-1',
                name:'刀子',
              },
              {
                id:'2-2',
                name:'桌子',
              },
              {
                id:'2-3',
                name:'凳子',
              },
            ]
          },
          {
            id:'3',
            name:'出行工具',
            children:[
              {
                id:'3-0',
                name:'单车',
              },
              {
                id:'3-1',
                name:'摩托车',
              },
              {
                id:'3-2',
                name:'电瓶车',
              },
              {
                id:'3-3',
                name:'小汽车',
              },
            ]
          },
          {
            id:'4',
            name:'零食',
            children:[
              {
                id:'4-0',
                name:'辣条',
              },
              {
                id:'4-1',
                name:'豆类',
              },
              {
                id:'4-2',
                name:'牛奶',
              },
              {
                id:'4-3',
                name:'饼干',
              },
            ]
          },
          {
            id:'4',
            name:'零食',
            children:[
              {
                id:'4-0',
                name:'辣条',
              },
              {
                id:'4-1',
                name:'豆类',
              },
              {
                id:'4-2',
                name:'牛奶',
              },
              {
                id:'4-3',
                name:'饼干',
              },
            ]
          },
        ],
        images:[
          {
            name:'图片1',
            url:'https://img.alicdn.com/simba/img/TB1eY4DEeT2gK0jSZFvSutnFXXa.jpg',
          },
          {
            name:'图片2',
            url:'https://img.alicdn.com/tps/i4/TB18yllEhD1gK0jSZFswu2ldVXa.png_q90_.webp',
          },
          {
            name:'图片3',
            url:'https://img.alicdn.com/tfs/TB1Kv77DUY1gK0jSZFMXXaWcVXa-520-280.jpg_q90_.webp',
          },
        ], //图片
        count:10,     //商品数
        loading:false,  //是否加载中
        likesLoading:false,  //猜您喜欢商品列表是否加载中
        url:'https://img.alicdn.com/bao/uploaded/i5/TB1B61INFXXXXawapXXYXGcGpXX_M2.SS2_200x200q90.jpg_.webp'
      }
    },
    components:{
      Loading,
    },
    computed:{
      ...mapState(['user'])
    },
    created(){

    },
    mounted () {
      var _this = this
      //滚动条到底加载更多数据
      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          if(_this.count<50){
            _this.likesLoading = true
            setTimeout(()=>{
              _this.count += 5
              _this.likesLoading = false
              console.log(_this.count)
            },2000)
          }
        }
      }
    },
    methods: {
      //搜索
      async toSearch(){
        var {keyword,categoryId,pageNum,pageSize,orderBy} = this
        var result = await REQSHOPLISTS(keyword,categoryId,pageNum,pageSize,orderBy)
        if(result.status === 0){
          this.Goods = result.data
          this.goods = result.data.list
        }else{
          this.message(result.msg,1500,'warning')
        }
      },
      //点击品种
      choiceType(type){
        console.log(type)
      },

      //消息提示
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
  .mainshop{
    --allWidth:1200px;
    --titleHeight:100px;
    --leftWidth:250px;
    --leftMargin:15px;
    --typeHeight:300px;
    background-color: rgb(244,244,244);
    a{
      text-decoration: none;
    }
    //溢出省略号
    .shenglue{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .myShopWidth{
      width: 1200px;
      width: var(--allWidth);
      margin: auto;
    }
    .searchDiv{
      overflow: hidden;
      background-color: rgb(255,255,255);
      text-align: center;
    }
    .typesDiv{
      .leftType{
        float: left;
        width: 250px;
        width: var(--leftWidth);
        height: 300px;
        height: var(--typeHeight);
        color: white;
        background-color: rgb(116,116,118);
        overflow: hidden;
        ul{
          margin: 0;
          padding: 10px 0 0;
          li{
            list-style: none;
            height: 32px;
            padding: 0;
            span{
              display: inline-block;
              height: 32px;
              padding: 0 6px;
              line-height: 32px;
              font-size: 14px;
              color: white;
              cursor: pointer;
              &:hover{
                color: rgb(230,41,43);
              }
            }
          }
        }
      }
      .rightImages{
        margin-left: 265px;
        margin-left: calc(var(--leftWidth) + var(--leftMargin));
        .el-carousel__item img {
          width: 100%;
          height: 100%;
        }
        .el-carousel__button{   //轮播图按钮色
          background-color: rgb(23,151,242) !important;
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
      }
    }
    .hotGoodDiv{
      margin-top: 20px;
      max-height: 500px;
      overflow: hidden;
      h3.title{
        display: inline-block;
        position: relative;
        margin-top: 5px;
        height: 48px;
        line-height: 48px;
        font-size: 23px;
        color: #AD45Df;
        &:after{
          position: absolute;
          width: 100px;
          height: 2px;
          content: "";
          background: rgb(22,158,195);
          left: 0;
          bottom: 0;
          -moz-transition: all .5s ease;
          -webkit-transition: all .5s ease;
          transition: all .5s ease;
        }
      }
      ul{
        padding: 0;
        margin: 0;
        &:before,&:after{
          content: '';
          display: table;
          clear: both;
        }
        li{
          float: left;
          list-style: none;
          width: 277px;
          max-height: 160px;
          padding: 20px 10px;
          overflow: hidden;
          cursor: pointer;
          img{
            float: left;
            height: 100px;
            width: 100px;
            margin-right: 10px;
          }
          .nameDiv{
            float: left;
            width: 130px;
            p.name{
              height: 32px;
              font-size: 14px;
              line-height: 16px;
              text-align: left;
              color: rgb(20,20,20);
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              transition: color 0.2s ease 0s;
              overflow: hidden;
            }
            p.price{
              color: red;
              font-size: 16px;
              height: 20px;
              line-height: 20px;
              span{
                font-size: 14px;
              }
            }
            p.out{
              font-size: 14px;
              height: 16px;
              line-height: 16px;
              color: #999999;
              span{
                color: red;
              }
            }
          }
          &:hover{
            p.name{
              color: rgb(230,43,41);
            }
          }
        }
      }
      &:before,&:after{
        display: table;
        content: '';
        clear: both;
      }
      .hot{
        float: left;
        width: 595px;
        padding: 0px 20px 0;
        margin-right: 10px;
        background-color: white;
        border-radius: 2px;
      }
      .good{
        float: left;
        width: 595px;
        padding: 0px 20px 0;
        background-color: white;
        border-radius: 2px;
      }
    }
    .newDiv{
      margin-top: 15px;
      background-color: white;
      h3{
        margin-top: 5px;
        margin-bottom: 0;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        font-size: 23px;
        color: #AD45Df;
        border-bottom: 1px solid #f4f4f4;
      }
      .new{
        max-height: 280px;
        overflow: hidden;
        ul{
          margin: 0;
          padding: 0;
          li{
            float: left;
            list-style: none;
            width: 300px;
            height: 278px;
            border: 1px solid transparent;
            border-right: 1px solid #f4f4f4;
            border-bottom-color: #fff;
            text-align: center;
            cursor: pointer;
            &:hover{
              border: 1px solid rgb(240,41,43);
            }
            .images{
              margin-top: 25px;
              padding-left: 16px;
              img{
                width: 120px;
                height: 120px;
              }
            }
            .nameDiv{
              height: 82px;
              padding-left: 20px;
              p.title{
                height: 52px;
                width: 200px;
                margin: 20px 10px 10px;
                font-size: 18px;
                line-height: 26px;
                text-align: left;
                color: rgb(20,20,20);
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                transition: color 0.2s ease 0s;
                overflow: hidden;
              }
              p.subtitle{
                text-align: left;
                width: 200px;
                height: 20px;
                margin: 10px;
                color: #999;
                font-size: 14px;
                line-height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space:nowrap;
              }
            }
          }
        }
      }
    }
    .likeDiv{
      margin-top: 15px;
      min-height: 400px;
      background-color: white;
      h3{
        margin-top: 5px;
        margin-bottom: 0;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        font-size: 23px;
        color: #AD45Df;
        border-bottom: 1px solid #f4f4f4;
      }
      .like{
        &:before,&:after{
          display: table;
          content: '';
          clear: both;
        }
        .loading{
          height: 50px;
          padding: 5px;
          overflow: hidden;
        }
        ul{
          margin: 0;
          padding: 0;
          li{
            float: left;
            padding: 20px 20px 0;
            border: 1px solid transparent;
            color: #6c6c6c;
            width: 240px;
            height: 334px;
            overflow: hidden;
            position: relative;
            -webkit-transition: border-color 0.3s;
            -moz-transition: border-color 0.3s;
            -o-transition: border-color 0.3s;
            transition: border-color 0.3s;
            box-sizing: border-box;
            border-right-color: #f4f4f4;
            border-bottom-color: #f4f4f4;
            cursor: pointer;
            &:hover{
              border: 1px solid rgb(240,41,43);
            }
            .images{
              width: 197px;
              height: 197px;
              overflow: hidden;
              img{
                display: block;
                width: 100%;
                height: 100%;
                -webkit-transition: opacity 0.2s;
                -moz-transition: opacity 0.2s;
                -o-transition: opacity 0.2s;
                transition: opacity 0.2s;;
              }
            }
            .nameDiv{
              h4.title{
                margin-top: 7px;
                line-height: 22px;
                height: 44px;
                font-size: 16px;
                color: #666;
                font-weight: normal;
                transition: color 0.3s;
                overflow: hidden;
              }
              p{
                margin: 20px 0;
                .price{
                  float: left;
                  color: #F40;
                  font-size: 20px;
                  span{
                    font-size: 16px;
                    padding: 0 5px;
                  }
                }
                span.count{
                  float: right;
                  color: #9ca0aa;
                  margin-top: 3px;
                  margin-right: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
