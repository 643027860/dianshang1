<template>
  <div class="mGood">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed:{
      ...mapState([])
    },
    created(){

    },
    mounted () {

    },
    methods: {

    },
  }
</script>

<style lang="less">
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
  .mGood{
    width: 100%;
    background-color: white;
  }
</style>
