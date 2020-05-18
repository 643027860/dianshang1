<template>
  <div class="mainPage">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    methods: {},
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
  .mainPage{
    width: 100%;
    height: calc(100vh - 50px);
    background-color: white;
  }
</style>
