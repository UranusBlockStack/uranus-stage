<template>
    <div style="width:100%;height:200px;" ref="echarts"></div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/pie")

export default {
  name: 'EchartsNetwork',
  props: {
    chartData: {}
  },
  methods: {
    drawChart () {
      const vm = this
      var myChart = echarts.init(this.$refs.echarts)
      myChart.setOption({
        series: [
          {
            name: 'pool',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FF5640', '#333440'],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.chartData,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|Network}', this.chartData + '%'].join('\n'),
                    rich: {
                      a: {
                        color: '#f2f2f2',
                        fontSize: '14',
                        lineHeight: '22'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 100-this.chartData }
            ]
          }
        ]
      })
    }
  },
  computed: {},
  mounted: function () {
    const vm = this
    vm.$nextTick(() => {
      vm.drawChart()
    })
  }
}
</script>
