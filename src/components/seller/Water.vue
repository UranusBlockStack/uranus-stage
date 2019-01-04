<template>
    <div style="width:100%;height:160px;" ref="echarts"></div>
</template>

<script>
export default {
  name: 'EchartsComponents',
  props: {
    chartData: {}
  },
  methods: {
    drawChart () {
      const vm = this
      var myChart = this.$echarts.init(this.$refs.echarts)
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
                    color: '#1890FF'
                  }
                }
              }
            ],
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#156ACF',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        ]
        
      })
      window.onresize = function() {
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
