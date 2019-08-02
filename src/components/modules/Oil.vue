<template>
  <div style="width:100%;height:100%;" ref="echarts"></div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/gauge")

export default {
  name: 'EchartsBall',
  props: {
    chartData: {}
  },
  methods: {
    drawChart() {
      const vm = this
      var myChart = echarts.init(this.$refs.echarts)
      myChart.setOption({
        series: [
          {
            type: 'gauge',
            title: {
              show: true,
              offsetCenter: [0, '60%'], // x, y，单位px
              textStyle: {
                color: '#ffffff',
                fontSize: 15
              }
            },
            detail: {
              show: true,
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              textStyle: {
                color: '#f2f2f2',
                fontSize: 24
              }
            },
            data: [{ value: this.chartData.value, name: this.chartData.type }],
            axisLabel: {
              formatter: function(value) {
                return ''
              }
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [[0.2, '#51a906'], [0.8, '#2463ff'], [1, '#FF4942']]
              }
            }
          }
        ]
      })
    }
  },
  computed: {},
  mounted: function() {
    const vm = this
    vm.$nextTick(() => {
      vm.drawChart()
    })
  }
}
</script>
