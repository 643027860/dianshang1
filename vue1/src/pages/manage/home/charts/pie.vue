<template>
  <div class="pie">
    <div id="myPie">

    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data () {
      return {
        Pie:'',  //柱形图对象
      }
    },
    mounted () {
      this.choiceMenuId('pie')
      this.drawPie();
    },
    methods: {
      ...mapActions(['choiceMenuId']),
      drawPie(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myPie'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '同名数量统计',
            subtext: '纯属虚构',
            left: 'center',
            width:'auto'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 'center',
            top:'middle',
            width:'auto',
            fontStyle:'oblique',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          },
          series: [
            {
              name: '姓名',
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              data: [
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
    },
  }
</script>

<style scoped lang="less">
  .pie{
    height: 100%;
    width: 100%;
    #myPie{
      width: 100%;
      height: calc(100vh - 80px);
      overflow: hidden;
    }
  }
</style>
