<template>
  <div id="addition">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      :placeholder="name"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
  import {regionData,CodeToText} from 'element-china-area-data'
  export default {
    name: '',
    components: {},
    data () {
      return {
        options: regionData,
        selectedOptions: [],
        addtions:[],
        name:'请选择',
      }
    },
    methods: {
      handleChange (value) {
        this.addtions.selectedOptions = value
        var name = ''
        var _this = this
        if(this.addtions.length<1){
          this.selectedOptions.map(item => _this.addtions.push(CodeToText[item]))
        }else{
          this.addtions = []
          this.selectedOptions.map(item => _this.addtions.push(CodeToText[item]))
        }
        console.log(_this.addtions)
      },
      init(fixAddition){
        console.log(fixAddition)
        var _this = this
        this.selectedOptions
        this.name = fixAddition.receiverProvince + '/' + fixAddition.receiverCity + '/' + fixAddition.receiverDistrict
        this.addtions.push(fixAddition.receiverProvince)
        this.addtions.push(fixAddition.receiverCity)
        this.addtions.push(fixAddition.receiverDistrict)
        console.log(this.addtions)
      },
      clearAll(){
        this.selectedOptions = []
        this.addtions = []
        this.name = '请选择'
      }
    },
    watch: {},
    computed: {},
    created () {

    },
    mounted () {

    },
    beforeDestory () {

    },
    destoryed () {

    },
  }
</script>

<style lang="less">
  #addition {
    input::-webkit-input-placeholder {
      color: #606266;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #606266;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #606266;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #606266;
    }
  }
</style>
