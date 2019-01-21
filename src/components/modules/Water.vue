<template>
    <div style="width:100%;height:160px;" ref="echarts"></div>
</template>

<script>
import 'echarts-liquidfill'

export default {
  name: 'EchartsWater',
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
                    color: '#1890FF',
                  }
                },
                label: {
                    formatter: ["Rest",  this.chartData*100 + "%",].join("\n"),
                    fontSize: "22",
                }
              }
            ],
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#1890FF',
              borderWidth: 3,
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
