<template>
  <div>
    <input type="file" id="file">
    <button @click="upload">上传</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: '',
    components: {},
    data () {
      return {

      }
    },
    methods: {
      upload(){
        var files = document.getElementById('file').files
        var file = files[0]
        var params = new FormData()
        params.append('uploadFile',file)
        axios.post('http://ldy8080.natapp1.cc/file/upload',params)
          .then(response =>{
            console.log(response.data)
          })
          .catch()
      }
    },
    watch: {},
    computed: {},
    created () {

    },
    mounted () {

    },
    beforeDestroy () {

    },
    destroyed () {

    },
  }
</script>

<style lang="less">

</style>
