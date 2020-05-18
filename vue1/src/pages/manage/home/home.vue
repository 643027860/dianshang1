<template>
  <div class="manage">
    <el-container>
      <div id="drawerBg" class="drawerBg drawerBgShow" @touchmove.prevent>
      </div>
      <el-aside class="mySlider mo" width="200px">
        <Menus></Menus>
      </el-aside>
      <el-container class="myMain">
        <el-header height="95px" class="myHeader">
          <Nav></Nav>
        </el-header>
        <el-main class="myMainpage">
          <p class="htitle" v-show="pathnames.length>0">
            {{Name}}
            <span class="noshow500" v-show="pathnames.length>1">
              <router-link :to="{name:item.path}" v-for="(item,index) in pathnames" :key="index">{{item.name}}</router-link>
            </span>
          </p>
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Menus from '../../../components/menus/menus'
  import Nav from '../../../components/nav/manage/nav'
  import {mapState,mapActions} from 'vuex'
  export default {
    name:'manage',
    components:{
      Menus,
      Nav,
    },
    computed:{
      ...mapState(['isCollapse','manage','pathnames'])
    },
    data () {
      return {
        Name:'',    //当前模块的名字
      }
    },
    created(){
      if(sessionStorage.getItem('haichuang_user_manage')!=null){
        this.setmanage(JSON.parse(sessionStorage.getItem('haichuang_user_manage')))
      }else{
        this.$message({
          message:'用户未登录',
          duration:1000,
          type:'warning'
        })
        this.$router.replace({name:'login'})
      }
    },
    mounted () {
      this.Name = this.pathnames[0].name
      $('#drawerBg').click(()=>{
        this.ocmenus1(true)
      })
    },
    watch:{
      isCollapse(newval,oldval){
        if(!newval){
          $('.manage').addClass('moMainpage')
          $('#drawerBg').removeClass('drawerBgShow')
          $('.mySlider').removeClass('mo')
          $('.mySlider').removeClass('hidden1')
          $('.myMain').removeClass('toBig')
          $('.mySlider').addClass('open')
          $('.myMain').addClass('toSmall')
        }else{
          $('.manage').removeClass('moMainpage')
          $('.mySlider').removeClass('open')
          $('.mySlider').addClass('mo')
          $('#drawerBg').addClass('drawerBgShow')
          $('.myMain').removeClass('toSmall')
          $('.mySlider').addClass('hidden1')
          $('.myMain').addClass('toBig')
        }
      },
      pathnames(newval,oldval){
        this.Name = newval[0].name
      }
    },
    methods: {
      ...mapActions(['ocmenus1','setmanage']),
    },
  }
</script>

<style scoped lang="less">
  .component-fade-enter-active{
    transition: all .4s ease;
  }
  .component-fade-leave-active {
    transition: all .4s ease;
  }
  .component-fade-enter{
    transform: translateX(-50px);
    opacity: 0;
  }
  .component-fade-leave-to{
    transform: translateX(50px);
    opacity: 0;
  }
  @media screen and(max-width: 499px) {
    .noshow500 {
      display: none;
    }
  }
  @media screen and(max-width: 999px){
    .moMainpage{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .manage {
      .mo{
        width: 0px!important;
      }
      .myMain{
         margin: 0!important;
      }
      .open{
        width: 200px!important;
      }
      .drawerBg{
        background: #000;
        opacity: .2;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
      }
    }
  }
  @media screen and(min-width: 1000px) {
    .manage{
      .hidden1{
        width: 63px!important;
      }
      .toBig{
        margin-left: 63px!important;
      }
      .open{
        width: 200px!important;
      }
      .toSmall{
        margin-left: 200px!important;
      }
    }
  }
  .manage{
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 50px;
    }
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .el-main {
      background-color: white;
      color: #333;
      /*text-align: center;*/
      /*line-height: 160px;*/
    }
    body > .el-container {
      margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    .drawerBgShow{
      display: none;
    }
    /*菜单栏样式*/
    .mySlider{
      -webkit-transition: .5s;
      transition: .5s;
      width: 200px;
      background-color: #304156;
      height: 100%;
      position: fixed;
      font-size: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      overflow-x: hidden;
    }/*菜单栏滚动条样式*/
    .mySlider::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      scrollbar-arrow-color:red;
    }
    .mySlider::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgb(73,84,100);
      background: rgb(73,84,100);
      scrollbar-arrow-color:red;
    }
    .mySlider::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px #304156;
      border-radius: 0;
      background: #304156;
    }
    /*主体样式*/
    .myMain{
      width: 100%;
      -webkit-transition: margin-left .5s;
      transition: margin-left .5s;
      margin-left: 200px;
      overflow: auto;
      .myHeader{
        padding: 0;
        overflow: hidden;
      }
      .myMainpage{
        padding: 20px;
        margin: 0;
        min-height: calc(100vh - 95px);
        .htitle{
          font-size: 16px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
          color: #484848;
          font-weight: normal;
          position: relative;
          margin-bottom: 15px;
          span{
            float: right;
            a{
              display: block;
              margin-right: 10px;
              padding-right: 10px;
              float: left;
              position: relative;
              text-decoration: none;
              color: #333;
            }
            a:not(:last-child):after{
              position: relative;
              content: "/";
              right: -10px;
              bottom: 0;
              color: #ccc;
            }
            a:hover{
              color: #00b7ee;
            }
          }
        }
        .htitle:after{
          position: absolute;
          width: 80px;
          height: 2px;
          content: "";
          background: #000;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
