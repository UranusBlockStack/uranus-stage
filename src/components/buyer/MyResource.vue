<template>
  <section class="myResource">
    <el-row class="myResourceHead">
      <el-col class="title" :span="12">
        <h1>我的资源</h1>
      </el-col>
    </el-row>
    <el-row class="myResourceBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>资源剩余总览</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h2>总资源剩余率</h2>
          <div id="restResource">123</div>
        </el-col>
        <el-col :span="19" :offset="1">
          <h2>各类资源剩余率</h2>
          <div class="restRes">
            <div id="restResource1"></div>
            <div id="restResource2"></div>
            <div id="restResource3"></div>
            <div id="restResource4"></div>
            <div id="restResource5"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title" :span="24">
          <h1>应用预览</h1>
        </el-col>
      </el-row>
      <el-row class="appResource">
        <el-col :span="4">
          <div id="restResource6"></div>
        </el-col>
        <el-col :span="7" :offset="1">
          <h3>部署资源剩余：4</h3>
          <h3>剩余资源：68%</h3>
          <h3>购买时间：2018/12/12 12:12:12</h3>
          <h3>结束时间：2019/12/12 12:12:12</h3>
        </el-col>
        <el-col :span="8">
          <h3 class="restTime">剩余使用时间：已到期
            <el-button type="success">
              前往续费
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </h3>
        </el-col>
        <el-col :span="3" :offset="1">
          <p @click="$router.push({path: '/resourcepool'})">
            查看详情
            <i class="el-icon-arrow-right"></i>
          </p>
        </el-col>
      </el-row>

      <el-row class="appResource">
        <el-col :span="4">
          <div id="restResource7"></div>
        </el-col>
        <el-col :span="7" :offset="1">
          <h3>部署资源剩余：4</h3>
          <h3>剩余资源：68%</h3>
          <h3>购买时间：2018/12/12 12:12:12</h3>
          <h3>结束时间：2019/12/12 12:12:12</h3>
        </el-col>
        <el-col :span="8">
          <h3 class="restTime">剩余使用时间：已到期
            <el-button type="success">
              前往续费
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </h3>
        </el-col>
        <el-col :span="3" :offset="1">
          <p>
            查看详情
            <i class="el-icon-arrow-right"></i>
          </p>
        </el-col>
      </el-row>
      <el-row class="appResource">
        <el-col :span="4">
          <div id="restResource8"></div>
        </el-col>
        <el-col :span="7" :offset="1">
          <h3>部署资源剩余：4</h3>
          <h3>剩余资源：68%</h3>
          <h3>购买时间：2018/12/12 12:12:12</h3>
          <h3>结束时间：2019/12/12 12:12:12</h3>
        </el-col>
        <el-col :span="8">
          <h3 class="restTime">剩余使用时间：已到期
            <el-button type="success">
              前往续费
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </h3>
        </el-col>
        <el-col :span="3" :offset="1">
          <p>
            查看详情
            <i class="el-icon-arrow-right"></i>
          </p>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import 'echarts-liquidfill'

export default {
  name: 'MyResource',
  methods: {
    initEchart() {
      var myChart = this.$echarts.init(document.getElementById('restResource'))
      var myChart1 = this.$echarts.init(
        document.getElementById('restResource1')
      )
      var myChart2 = this.$echarts.init(
        document.getElementById('restResource2')
      )
      var myChart3 = this.$echarts.init(
        document.getElementById('restResource3')
      )
      var myChart4 = this.$echarts.init(
        document.getElementById('restResource4')
      )
      var myChart5 = this.$echarts.init(
        document.getElementById('restResource5')
      )
      var myChart6 = this.$echarts.init(
        document.getElementById('restResource6')
      )
      var myChart7 = this.$echarts.init(
        document.getElementById('restResource7')
      )
      var myChart8 = this.$echarts.init(
        document.getElementById('restResource8')
      )
      myChart.setOption({
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            data: [
              {
                value: 0.3,
                direction: 'right',
                itemStyle: {
                  normal: {
                    color: '#1890FF'
                  }
                }
              }
            ]
          }
        ]
      })
      myChart1.setOption({
        series: [
          {
            name: 'Cpu',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#1890FF', '#f2f2f2'],
            data: [
              {
                value: 68,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|CPU}', '{b|68%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 32 }
            ]
          }
        ]
      })
      myChart2.setOption({
        series: [
          {
            name: 'Gpu',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#7FD455', '#f2f2f2'],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|CPU}', '{b|88%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      })
      myChart3.setOption({
        series: [
          {
            name: '内存',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FACC14', '#f2f2f2'],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|内存}', '{b|62%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      })
      myChart4.setOption({
        series: [
          {
            name: '硬盘',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#658FF7', '#f2f2f2'],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|硬盘}', '{b|88%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      })
      myChart5.setOption({
        series: [
          {
            name: '网络',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FB8D5B', '#f2f2f2'],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|网络}', '{b|62%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      })
      myChart6.setOption({
        series: [
          {
            name: '资源池A',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#1890FF', '#f2f2f2'],
            data: [
              {
                value: 68,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|资源池A}', '{b|68%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 32 }
            ]
          }
        ]
      })
      myChart7.setOption({
        series: [
          {
            name: 'Gpu',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#7FD455', '#f2f2f2'],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|资源池B}', '{b|88%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      })
      myChart8.setOption({
        series: [
          {
            name: '内存',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FACC14', '#f2f2f2'],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|资源池C}', '{b|62%}'].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      })
      window.onresize = function() {
        myChart.resize()
        myChart1.resize()
        myChart2.resize()
        myChart3.resize()
        myChart4.resize()
        myChart5.resize()
        myChart6.resize()
        myChart7.resize()
        myChart8.resize()
      }
    }
  },
  mounted() {
    this.initEchart()
  }
}
</script>

<style lang="scss" scoped>
.myResource {
  background: #f2f2f2;
  min-width: 1130px;
  .myResourceHead {
    background: #ffffff;
    height: 65px;
    .title {
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #252525;
        line-height: 24px;
        padding-left: 30px;
      }
    }
  }
  .myResourceBox {
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 20px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #363636;
      text-align: center;
      line-height: 24px;
    }
    #restResource {
      padding-left: 30px;
      height: 250px;
      width: 100%;
    }
    .restRes {
      border-left: 3px solid #fafafa;
      height: 250px;
      display: flex;
      padding-left: 50px;
      #restResource1,
      #restResource2,
      #restResource3,
      #restResource4,
      #restResource5 {
        height: 250px;
        width: 20%;
      }
    }
    .appResource {
      border-bottom: 1px solid #f2f2f2;
      h3 {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
        text-align: left;
        margin: 15px 20px;
      }
      #restResource6,
      #restResource7,
      #restResource8 {
        height: 190px;
        width: 100%;
        padding-left: 30px;
      }
      .restTime {
        margin-top: 60px;
        .el-button {
          background: #8eb357;
          border: none;
          margin-left: 30px;
        }
      }
      p {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #8eb357;
        text-align: right;
        line-height: 24px;
        padding-right: 30px;
        margin-top: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
