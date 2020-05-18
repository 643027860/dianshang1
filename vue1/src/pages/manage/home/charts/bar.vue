<template>
  <div class="bar">
    <div id="myBar">

    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data () {
      return {
        Line:'',  //柱形图对象
      }
    },
    mounted () {
      this.choiceMenuId('bar')
      this.drawBar();
    },
    methods: {
      ...mapActions(['choiceMenuId']),
      drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myBar'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    },
  }
</script>

<style scoped lang="less">
  .bar{
    height: 100%;
    width: 100%;
    #myBar{
      width: 100%;
      height: calc(100vh - 80px);
      overflow: hidden;
    }
  }
</style>
