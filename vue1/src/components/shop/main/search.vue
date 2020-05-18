<template>
  <div class="mainSearch">
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
</template>

<script>
  import {REQSHOPLISTS} from '../../../api/types'
  import {mapState,mapActions} from 'vuex'
  export default {
    components: {},
    data () {
      return {
        keyword:'',     //关键字
      }
    },
    methods: {
      //搜索
      async toSearch(){
        var {keyword} = this
        if(keyword){
          let {href} = this.$router.resolve({name: 'main',query:{
              keyword:JSON.stringify(keyword)
            }})
          window.open(href, '_blank')
        }
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
    watch: {},
    computed: {},
    created () {

    },
    mounted () {

    },
    beforeDestory () {

    },
    destoryed () {

    },
  }
</script>

<style lang="less">
  .mainSearch{
    --allWidth:1200px;
    --titleHeight:100px;
    --leftWidth:250px;
    --leftMargin:15px;
    --typeHeight:300px;
    .myShopWidth{
      width: 1200px;
      width: var(--allWidth);
      margin: auto;
    }
    &:after,&:before{
      content: '';
      display: table;
      clear: both;
    }
    .logo{
      float: left;
      width: 250px;
      width: var(--leftWidth);
      height: 100px;
      height: var(--titleHeight);
      overflow: hidden;
      span{
        display: inline-block;
        width: 250px;
        width: var(--leftWidth);
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
        padding-left: var(--leftMargin);
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
</style>
