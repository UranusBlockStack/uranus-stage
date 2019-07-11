<template>
  <div style="width:100%;height:160px;" ref="echarts"></div>
</template>

<script>

var echarts = require('echarts/lib/echarts')
import 'echarts-liquidfill'

export default {
  name: 'EchartsWater',
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
            type: 'liquidFill',
            radius: '85%',
            data: [
              {
                value: this.chartData,
                direction: 'left',
                itemStyle: {
                  normal: {
                    color: '#283a66'
                  }
                },
                label: {
                  formatter: ['Used', this.chartData * 100 + '%'].join('\n'),
                  fontSize: '22',
                  color: '#A2A6B0'
                }
              }
            ],
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#454545',
              borderWidth: 3,
              color: '#25262F'
            }
          }
        ]

      })
      window.onresize = function () {
        myChart.resize()
      }
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
