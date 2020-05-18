<template>
  <div>
    <el-menu
      :default-active="menuId"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      background-color="#304156"
      text-color="rgb(191, 203, 217)"
      active-text-color="rgb(64, 158, 255)"
    >
<!--      <router-link :to="{name:'role'}">-->
<!--        <el-menu-item index="role" @click="close">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">角色管理</span>-->
<!--        </el-menu-item >-->
<!--      </router-link>-->
      <el-submenu index="mGood">
        <template slot="title">
          <i class="el-icon-shopping-bag-1"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name:'uploadGood'}"><el-menu-item index="uploadGood" @click="close">上传商品</el-menu-item></router-link>
          <router-link :to="{name:'goodList'}"><el-menu-item index="goodList" @click="close">商品列表</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link :to="{name:'mType'}">
        <el-menu-item index="mType" @click="close">
          <i class="el-icon-s-grid"></i>
          <span slot="title">品类管理</span>
        </el-menu-item >
      </router-link>
      <router-link :to="{name:'orderList'}">
        <el-menu-item index="orderList" @click="close">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item >
      </router-link>
    </el-menu>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    computed:{
      ...mapState(['isCollapse','menuId'])
    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {
      ...mapActions(['ocmenus1']),
      //小于1000px时点击菜单选项隐藏菜单
      close(){
        if($(window).width()  < 1000) {
          this.ocmenus1(true)
        }
      },
    },
  }
</script>

<style lang="less">
  .el-menu {
    border-right: none;
    li{
      text-align: left;
    }
    .el-menu-item-group__title{
      padding-bottom: 0px;
      padding-top: 0px;
    }
    a:hover{
      text-decoration: none;
    }
    .el-menu--inline .el-menu-item{
      background-color: #1F2D3D!important;
    }
    .el-menu--inline .el-menu-item:hover{
      background-color: #001528!important;
    }
  }
</style>
