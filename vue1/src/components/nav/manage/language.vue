<template>
  <div class="language">
    <img src="../imgs/language.png" alt="">
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

<style lang="less">
  @media (any-hover: hover){      //解决hover影响移动端
    .language:hover{
      cursor:pointer;
      background-color: whitesmoke;
    }
  }
  .language{
    padding: 0 8px;
    height: 50px;
    float: right;
    img{
      height: 18px;
      width: 18px;
    }
  }
</style>
