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
              <el-button slot="append" @click="toSearch(1)" id="searchButton">搜索</el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="typesDiv myShopWidth">
      <div class="leftType">
        <ul>
          <li v-for="(type,index) in types" :key="index" :id="'myType'+type.id" @click="choiceType(type)">
            <span>{{type.name}}</span>
            <span v-for="(li,index) in type.sortOrder" :key="index" :id="li.id">
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
    <div class="likeDiv myShopWidth">
      <h3>商品列表</h3>
      <div class="like">
        <ul v-if="goods.length>0">
          <li v-for="(good,index) in goods" :key="index" @click="toGoodDetail(good.id)">
            <div class="images">
              <img v-lazy="good.mainImage" alt="">
            </div>
            <div class="nameDiv">
              <h4 class="title">{{good.name}}</h4>
              <p>
                <span class="price">
                  <span>¥</span>{{good.price}}
                </span>
              </p>
            </div>
          </li>
        </ul>
        <div class="emptyGood" v-else>
          暂无商品
        </div>
      </div>
      <div class="myPagination" style="text-align: center;height: 70px;line-height: 70px;overflow: hidden;" v-if="goods.length>0">
        <div style="display: inline-block; height: 30px;margin-top: 15px;">
          <el-pagination
            background
            layout="prev, pager, next,total"
            :total="Goods.total"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            v-if="Goods.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQSHOPLISTS,GETTYPE} from '../../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        categoryId:100001,  //品类ID，可空
        pageNum:1,    //分页页码，可空
        pageSize:20,  //每页大小，可空
        orderBy:0,    //动态排序参数,desc和asc
        keyword:'',   //关键字
        types:[],     //商品种类
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
        ], //轮播图图片
        loading:false,  //是否加载中
      }
    },
    components:{

    },
    computed:{
      ...mapState(['user','Goods','goods'])
    },
    created(){
      if(this.$route.query.keyword)
        this.keyword = JSON.parse(this.$route.query.keyword)
      this.toSearch(1)
      this.reqTypes()
    },
    mounted () {
    },
    methods: {
      ...mapActions(['saveGoods']),
      //页数变了
      handleCurrentChange(val){
        this.toSearch(val)
      },
      //搜索
      async toSearch(num){
        this.pageNum = num
        var {pageNum,pageSize,orderBy,keyword,categoryId} = this
        if(keyword)
          var params = {pageNum,pageSize,orderBy,keyword}
        else
          var params = {pageNum,pageSize,orderBy,categoryId}
        var result = await REQSHOPLISTS(params)
        if(result.status === 0){
          this.saveGoods({Goods:result.data,goods:result.data.list})
          this.keyword = ''
        }else{
          this.message(result.msg,1500,'warning')
        }
      },
      //获取种类
      async reqTypes(){
        var result = await GETTYPE({categoryId:0})
        if(result.status == 0){
          var type = result.data
          type.map(async(item)=>{
            result = await GETTYPE({categoryId:item.id})
            if(result.status == 0){
              if(result.data.length>0){
                item.sortOrder = result.data.slice(0,3)
              }
            }
          })
          this.types = type
          console.log(this.types)
        }
      },
      //点击品种
      choiceType(type){
        $('.activeLi').removeClass('activeLi')
        $("#myType" + type.id).addClass('activeLi')
        this.categoryId = type.id
        this.toSearch(1)
      },
      //查看详情
      toGoodDetail(id){
        let {href} = this.$router.resolve({name:'detail',query:{
            id:JSON.stringify(id)
          }})
        window.open(href, '_blank');
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
    background-color: rgb(244,244,244);
    min-height: calc(100vh - 40px);
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
      &:after,&:before{
        content: '';
        display: table;
        clear: both;
      }
      width: 1200px;
      margin: auto;
    }
    .searchDiv{
      overflow: hidden;
      display: block;
      width: 100%;
      background-color: rgb(255,255,255);
      text-align: center;
      .logo{
        float: left;
        width: 250px;
        height: 100px;
        overflow: hidden;
        span{
          display: inline-block;
          width: 250px;
          margin: 30px 0;
          height: 50px;
          line-height: 50px;
          font-size: 45px;
          font-weight: bold;
          font-family: '宋体';

          color: rgb(230,41,43);
          cursor: pointer;
        }
      }
      .search{
        float: left;
        width: 950px;
        height: 100px;
        overflow: hidden;
        .inputDiv{
          padding-left: 15px;
          .el-input__inner{
            height: 40px;
            width: 550px;
            border: 2px solid rgb(230,41,43);
          }
          &>div{
            width: 641px;
            margin: 40px auto 20px;
          }
          #searchButton{
            height: 40px;
            width: 90px;
            float: left;
            border: 2px solid rgb(230,41,43);
            background-color: red;
            border-radius: 0;
            color: white;
            font-size: 16px;
          }
        }
      }
    }
    .typesDiv{
      .leftType::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 2px;
      }
      .leftType::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
      .activeLi{
        background-color: rgb(150,150,150);
      }
      .leftType{
        float: left;
        width: 250px;
        height: 300px;
        color: white;
        background-color: rgb(115,115,115);
        overflow-y: auto;
        overflow-x: hidden;
        ul{
          margin: 0;
          padding: 10px 0 0;
          li{
            list-style: none;
            height: 32px;
            padding: 0;
            cursor: pointer;
            &:hover{
              background-color: rgb(150,150,150);
            }
            span{
              display: inline-block;
              height: 32px;
              padding: 0 6px;
              line-height: 32px;
              font-size: 14px;
              color: white;
            }
          }
        }
      }
      .rightImages{
        margin-left: 265px;
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
        .emptyGood{
          height: 340px;
          line-height: 340px;
          font-size: 30px;
          text-align: center;
          color: rgb(144,144,144);
          font-weight: bold;
        }
        ul{
          margin: 0;
          padding: 0;
          &:before,&:after{
            display: table;
            content: '';
            clear: both;
          }
          li{
            float: left;
            padding: 20px 20px 0;
            border: 1px solid transparent;
            color: #6c6c6c;
            width: 240px;
            height: 340px;
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
              }
            }
          }
        }
        margin-bottom: 20px;
      }
    }
  }
</style>
