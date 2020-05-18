<template>
  <div class="myNav">
    <div class="right">
      <Avatar></Avatar>
      <FullScreen></FullScreen>
    </div>
    <Controlmenu></Controlmenu>
    <div style="height: 45px;background-color: rgb(248,248,248)"></div>
  </div>
</template>

<script>
  import Controlmenu from '../../menus/controlMenu'
  import FullScreen from './fullScreen'
  import Avatar from './avatar'
  export default {
    components:{
      Controlmenu,
      FullScreen,
      Avatar,
    },
    data () {
      return {}
    },
    mounted () {

    },
    methods: {

    },
  }
</script>

<style lang="less">
  .myNav{
    background-color: white;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .right{
      float: right
    }
    .myRouterName{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      float: right;
      margin-right: 25px;
    }
  }
</style>
