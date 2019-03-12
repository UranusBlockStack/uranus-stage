<template>
    <div style="width:100%;height:160px;" ref="echarts"></div>
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
            name: 'pool',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#1890FF', '#333440'],
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
                    formatter: [this.chartData + '%' ].join('\n'),
                    position: 'center',
                    textStyle: { align: 'center', color: '#1890FF', fontSize: '20'}
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
