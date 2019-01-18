<template>
  <section class="Buyer">
    <el-row class="content-title">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-home"></i>
          {{$t('menu.home')}}
        </h1>
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
            <router-link :to="{path: '/applicationmarket'}">
              <p class="more">
                {{$t('buyer.home.more')}}
                <i class="iconfont icon-more"></i>
              </p>
            </router-link>
          </el-col>
        </el-row>
        <el-row class="shopBox" :gutter="20">
          <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
            <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
              <div class="resources">
                <div>
                  <p class="shops">{{$t('buyer.home.stores')}} {{app.catalog}}</p>
                  <img src="/static/img/uranus/developer/app.png" alt="img">
                  <p class="name">{{app.name}}</p>
                  <p
                    class="detail"
                  >{{app.description}}</p>
                  <el-row :gutter="20">
                    <el-col :span="6" :offset="2">
                      <p class="free">{{$t('buyer.home.free')}} </p>
                    </el-col>
                    <el-col :span="10" :offset="6">
                      <p class="downloads">{{$t('buyer.home.download')}} {{app.downloadTimes}}</p>
                    </el-col>
                      <a @click.prevent="deployApp(app.id, app.rid, app.defaultVersion, app.catalog)">
                      <el-button
                        type="success"
                        style="margin-top: -10px;"
                      >{{$t('buyer.home.details')}}</el-button>
                    </a>
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
              <span></span>
              {{$t('buyer.home.allPower')}}
            </p>
          </el-col>
          <el-col class="powerRest powerCon" :span="2">
            <p>
              <span></span>
              {{$t('buyer.home.restPower')}}
            </p>
          </el-col>
          <el-col :span="16">
            <div class="choosePower">
              <span
                @click="powerYear(0)"
                :class="{active: this.indexPower == '0'}"
              >{{$t('buyer.home.month')}}</span>
              <span
                @click="powerMounth(1)"
                :class="{active: indexPower == '1'}"
              >{{$t('buyer.home.week')}}</span>
              <span
                @click="powerWeek(2)"
                :class="{active: indexPower == '2'}"
              >{{$t('buyer.home.day')}}</span>
              <span
                @click="powerDay(3)"
                :class="{active: indexPower == '3'}"
              >{{$t('buyer.home.hour')}}</span>
            </div>
          </el-col>
        </el-row>

        <div id="myPower"></div>
      </div>
    </div>
  </section>
</template>

<script>
    import * as app from '../../services/RancherService'
    import * as auth from '../../services/AuthService'

export default {
  name: 'Buyer',
  data() {
    return {
      page: 1,
      pageSize: 4,
      indexPower: '',
      dataPower: {
        day: {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
          y: [10, 20, 30, 40, 50, 60],
          line: [5, 10, 10, 15, 15, 15]
        },
        week: {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [100, 200, 300, 400, 500, 600, 700],
          line: [50, 100, 300, 200, 300, 600, 400]
        },
        mounth: {
          x: ['1', '5', '10', '15', '20', '25', '30'],
          y: [1000, 520, 200, 334, 390, 330, 220],
          line: [50, 100, 300, 200, 300, 600, 400]
        },
        year: {
          x: ['1', '4', '7', '10', '12'],
          y: [10000, 520, 200, 334, 390],
          line: [5000, 100, 100, 200, 300]
        }
      },
      powerVal: {},
      appList: [ ]
    }
  },
  methods: {

    getAppList() {
      const searchData = {
        page: this.page,
        pageSize: this.pageSize,
              // 'sort': this.sort,
        sortDesc: this.sortDesc
      }

      app.appList(auth.getCurLang(), searchData).then(respData => {
        this.appList = respData.data.data.records
        this.appList.map(appitem => {
          appitem.imageurl = this.imageServerUrl + appitem.rid + '/icon'
          appitem.computedPrice = appitem.free? this.$t('buyer.deploy.free'):appitem.price
          return appitem
        })
      })
    },
    deployApp(appId, appRid, versionId, catalog) {
      this.$router.push({
        path: '/deployment',
        query: {
          appId: appId,
          appRid: appRid,
          versionId: versionId,
          catalog: catalog
        }
      })
    },
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
        color: ['#1890ff'],
        //  backgroundColor:'rgba(128, 128, 128, 0.1)', //rgba设置透明度0.1
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: this.$t('buyer.home.xName'),
            type: 'category',
            data: myData.x,
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20]
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: this.$t('buyer.home.yName') + ' (U)',
            type: 'value',
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 15]
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: this.$t('buyer.home.allPower'),
            type: 'bar',
            barWidth: '25%',
            data: myData.y
          },
          {
            name: this.$t('buyer.home.restPower'),
            type: 'line',
            color: '#9bcc3d',
            data: myData.line
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
  },
  created() {
    this.getAppList()
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
    height: 50px;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #252525;
      line-height: 50px;
      margin: 0;
      padding: 0;
      padding-left: 30px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
  }
  .content {
    padding: 0;
    .shop {
      background: #ffffff;
      min-width: 1130px;
      margin: 10px;
      padding: 30px;
      p {
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
        color: #252525;
        line-height: 24px;
        text-align: left;
      }
      .more {
        font-family: Source-Sans-Pro-Bold;
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
          padding: 10px;
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
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
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
              font-family: Source-Sans-Pro-Bold;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.45);
              text-align: center;
              line-height: 22px;
              margin: 10px auto;
            }
            .free {
              font-weight: 600;
              padding: 10px 0;
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
              font-size: 14px;
              color: #1890ff;
              letter-spacing: 0;
              line-height: 22px;
              text-align: left;
            }
            .downloads {
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
              font-size: 14px;
              padding: 10px 0;
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
      margin: 10px;
      .powerTitle p {
        height: 40px;
        line-height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
        color: #252525;
        text-align: left;
      }
      .powerCon p {
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
        height: 40px;
        span {
          z-index: 10;
          float: right;
          margin: 3px 10px;
          height: 40px;
          line-height: 40px;
          width: 55px;
          cursor: pointer;
        }
        .active {
          color: #81a028;
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
