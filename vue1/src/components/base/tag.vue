<template>
  <div class="tag">
    <el-tag
      v-for="type in typesname"
      :key="type.id"
      closable
      @close="handleClose(type.id)"
      >
      {{type.name}}
    </el-tag>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props:["typesname"]
    ,
    mounted () {

    },
    methods: {
      handleClose(id){
        this.$emit('outtype',id)
      }
    },
  }
</script>

<style lang="less">
  .tag{

  }
</style>
