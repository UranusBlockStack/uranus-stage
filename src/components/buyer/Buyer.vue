<template>
  <section class="Buyer">
    <el-row class="content-title">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.home')}}</h1>
      </el-col>
      <el-col class="record" :span="12">
        <p>余额:12121212</p>
        <p>收益:12121212</p>
      </el-col>
    </el-row>
    <!-- Main content -->
    <div class="content container-fluid">
      <div class="shop">
        <el-row>
          <el-col :span="12">
            <p>{{$t('buyer.home.store')}}</p>
          </el-col>
          <el-col :span="11">
            <p class="more">{{$t('buyer.home.more')}}>></p>
          </el-col>
        </el-row>
        <el-row class="shopBox" :gutter="20">
          <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
            <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
              <div class="resources">
                <div>
                  <p class="shops">{{$t('buyer.home.stores')}}{{app.shop}}</p>
                  <img src="/static/img/uranus/developer/app.png" alt="img">
                  <p class="name">Imagepuler</p>
                  <p
                    class="detail"
                  >DEPRECATED:This catalog item is deprecated and moved to rancher-catalog under pre-pull…</p>
                  <el-row :gutter="20">
                    <el-col :span="6" :offset="2">
                      <p class="free">{{$t('buyer.home.free')}}</p>
                    </el-col>
                    <el-col :span="10" :offset="6">
                      <p class="downloads">{{$t('buyer.home.download')}}123</p>
                    </el-col>
                    <el-button type="success">{{$t('buyer.home.details')}}</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="power">
        <el-row>
          <el-col class="powerTitle" :span="4">
            <p>{{$t('buyer.home.distribution')}}</p>
          </el-col>
          <el-col class="powerNet powerCon" :span="2">
            <p>
              <span></span>{{$t('buyer.home.allPower')}}
            </p>
          </el-col>
          <el-col class="powerPurch powerCon" :span="2">
            <p>
              <span></span>{{$t('buyer.home.buyPower')}}
            </p>
          </el-col>
          <el-col class="powerRest powerCon" :span="2">
            <p>
              <span></span>{{$t('buyer.home.restPower')}}
            </p>
          </el-col>
        </el-row>
        <div class="choosePower">
          <span @click="powerYear(0)" :class="{active: this.indexPower == '0'}">{{$t('buyer.home.month')}}</span>
          <span @click="powerMounth(1)" :class="{active: indexPower == '1'}">{{$t('buyer.home.week')}}</span>
          <span @click="powerWeek(2)" :class="{active: indexPower == '2'}">{{$t('buyer.home.day')}}</span>
          <span @click="powerDay(3)" :class="{active: indexPower == '3'}">{{$t('buyer.home.hour')}}</span>
        </div>
        <div id="myPower"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Buyer',
  data() {
    return {
      indexPower: '',
      dataPower: {
        day: {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
          y: [10, 20, 30, 40, 50, 60]
        },
        week: {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ['1', '5', '10', '15', '20', '25', '30'],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ['1', '4', '7', '10', '12'],
          y: [10000, 520, 200, 334, 390]
        }
      },
      powerVal: {},
      appList: [
        { id: '1', name: 'Imagepuller', shop: '1' },
        { id: '1', name: 'Imagepuller', shop: '2' },
        { id: '1', name: 'Imagepuller', shop: '3' },
        { id: '1', name: 'Imagepuller', shop: '4' }
      ]
    }
  },
  methods: {
    powerDay(x) {
      this.powerVal = this.dataPower.day
      this.initEchart(this.powerVal)
      this.indexPower = x
    },
    powerWeek(x) {
      this.powerVal = this.dataPower.week
      this.initEchart(this.powerVal)
      this.indexPower = x
    },
    powerMounth(x) {
      this.powerVal = this.dataPower.mounth
      this.initEchart(this.powerVal)
      this.indexPower = x
    },
    powerYear(x) {
      this.powerVal = this.dataPower.year
      this.initEchart(this.powerVal)
      this.indexPower = x
    },
    initEchart(val) {
      var myChart = this.$echarts.init(document.getElementById('myPower'))
      var myData = val
      myChart.setOption({
        color: ['#1890ff', '#facc14', '#9bcc3d'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['我的', '算力']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: myData.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'uranus',
            type: 'bar',
            barWidth: '10%',
            data: myData.y
          },
          {
            name: 'uranus-web',
            type: 'bar',
            barWidth: '10%',
            data: myData.y
          },
          {
            name: 'uranus-w',
            type: 'bar',
            barWidth: '10%',
            data: myData.y
          }
        ]
      })
      window.onresize = function() {
        myChart.resize()
      }
    }
  },
  mounted() {
    this.powerDay(3)
  }
}
</script>

<style lang="scss" scoped>
.Buyer {
  background: #f2f2f2;
  min-width: 1130px;
    .el-button {
    background: #8eb357;
    border: none;
  }
  .content-title {
    background: #ffffff;
    height: 64px;
    h1 {
      font-family: PingFang-SC-Bold;
      font-size: 20px;
      color: #252525;
      line-height: 24px;
      padding-left: 30px;
    }
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 60px;
      width: 105px;
      p {
        height: 30px;
        line-height: 25px;
        margin: 0;
      }
    }
  }
  .content {
    padding: 0;
    .shop {
      background: #ffffff;
      min-width: 1130px;
      margin: 20px;
      padding: 15px;
      box-shadow: 0 1px 4px 0;
      p {
        height: 40px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #252525;
        line-height: 24px;
        text-align: left;
      }
      .more {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #8eb357;
        line-height: 24px;
        text-align: right;
      }
      .shopBox {
        width: 100%;
        min-width: 1130px;
        .resources {
          text-align: center;
          padding: 20px;
          div {
            cursor: pointer;
            .shops {
              height: 30px;
              margin-bottom: -20px;
              text-align: right;
            }
            img {
              width: 110px;
              height: 105px;
              display: inline-block;
            }
            .name {
              font-weight: 600;
              padding: 5px 0 10px;
              border-bottom: 2px solid #eee;
              font-family: PingFang-SC-Medium;
              font-size: 20px;
              color: #251e1c;
              text-align: center;
              line-height: 24px;
            }
            .detail {
              width: 220px;
              height: 66px;
              overflow: hidden;
              box-sizing: content-box;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.45);
              text-align: center;
              line-height: 22px;
              margin: 10px auto;
            }
            .free {
              font-weight: 600;
              padding: 10px 0;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #1890ff;
              letter-spacing: 0;
              line-height: 22px;
              text-align: left;
            }
            .downloads {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #5d5d5d;
              letter-spacing: 0;
              text-align: center;
              line-height: 22px;
            }
          }
        }
      }
    }
    .power {
      padding: 15px;
      min-width: 1130px;
      height: 400px;
      background: #ffffff;
      margin: 20px;
      .powerTitle p {
        height: 40px;
        line-height: 40px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #252525;
        text-align: left;
      }
      .powerCon p {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 40px;
        text-align: left;
      }
      .powerNet {
        span {
          height: 10px;
          display: inline-block;
          width: 10px;
          background: #1890ff;
          border-radius: 10px;
          margin-right: 10px;
        }
      }
      .powerPurch {
        span {
          height: 10px;
          display: inline-block;
          width: 10px;
          background: #facc14;
          border-radius: 10px;
          margin-right: 10px;
        }
      }
      .powerRest {
        span {
          height: 10px;
          display: inline-block;
          width: 10px;
          background: #9bcc3d;
          border-radius: 10px;
          margin-right: 10px;
        }
      }
      .choosePower {
        height: 30px;
        span {
          float: right;
          margin: 3px 10px;
          height: 30px;
          width: 55px;
          cursor: pointer;
        }
        .active {
          color: green;
          font-weight: bolder;
        }
      }
      #myPower {
        width: 100%;
        height: 300px;
        overflow: hidden;
      }
    }
  }
}
</style>
