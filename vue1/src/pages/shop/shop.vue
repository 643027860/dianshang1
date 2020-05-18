<template>
  <div class="shopHome">
    <Nav></Nav>
    <div class="shopMain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import Nav from '../../components/shop/nav/nav'
  export default {
    name:'shop',
    components:{
      Nav
    },
    data () {
      return {}
    },
    mounted () {

    },
    methods: {
      ...mapActions([])
    },
  }
</script>

<style lang="less">
  .shopHome{
    min-width: 1200px;
    .shopMain{

    }
  }
  @media screen and(max-width: 1199px){
    .shopHome{
      .shopMain{

      }
    }
  }
</style>
