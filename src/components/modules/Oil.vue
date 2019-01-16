<template>
    <div style="width:100%;height:100%;" ref="echarts"></div>
</template>

<script>
export default {
  name: 'EchartsBall',
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
            type: "gauge",
            title: {
              show: true,
              offsetCenter: [0, "60%"], // x, y，单位px
              textStyle: {
                color: "#5d5d5d",
                fontSize: 15
              }
            },
            detail: {
              show: true,
              formatter: "{value}%",
              offsetCenter: [0, "90%"],
              textStyle: {
                color: "#363636",
                fontSize: 24
              }
            },
            data: [{ value: this.chartData.value, name: this.chartData.type }],
            axisLabel: {
              formatter: function(value) {
                return "";
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.2, "#1890ff"], [1, "#dcdcdc"]]
              }
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
