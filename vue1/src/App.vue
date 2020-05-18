<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  body,html{
    margin: 0!important;
    padding: 0!important;
  }
  //不能选中
  .noSelect{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  //鼠标为手掌
  .cursorPointer{
    cursor: pointer;
  }
</style>
