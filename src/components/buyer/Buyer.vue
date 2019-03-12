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
          <el-col :span="24" style="margin-bottom:40px">
            <el-card
              :body-style="{ padding: '0px', height:'360px',}"
              shadow="hover"
              v-for="(app, index) in appList"
              :key="index"
            >
              <div class="resources">
                <div>
                  <p class="shops">{{app.catalog}}</p>
                  <div class="img-box">
                    <img :src="app.imageurl" alt="img">
                  </div>
                  <p class="name">{{app.name}}</p>
                  <p class="detail">{{app.description}}</p>
                  <el-row :gutter="20">
                    <el-col :span="6" :offset="2">
                      <p class="free">{{$t('buyer.home.free')}}</p>
                    </el-col>
                    <el-col :span="10" :offset="6">
                      <p class="downloads">{{$t('buyer.home.download')}} {{app.downloadTimes}}</p>
                    </el-col>
                    <a @click.prevent="deployApp(app.id, app.rid, app.defaultVersion, app.catalog)">
                      <el-button type="success">{{$t('buyer.home.details')}}</el-button>
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
                @click="powerMonth(0)"
                :class="{active: this.indexPower == '0'}"
              >{{$t('buyer.home.month')}}</span>
              <span
                @click="powerWeek(1)"
                :class="{active: indexPower == '1'}"
              >{{$t('buyer.home.week')}}</span>
              <span
                @click="powerDay(2)"
                :class="{active: indexPower == '2'}"
              >{{$t('buyer.home.day')}}</span>
              <!--<span-->
              <!--@click="powerDay(3)"-->
              <!--:class="{active: indexPower == '3'}"-->
              <!--&gt;{{$t('buyer.home.hour')}}</span>-->
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
          x: [],
          y: [],
          line: []
        },
        week: {
          x: [],
          y: [],
          line: []
        },
        month: {
          x: [],
          y: [],
          line: []
        }
      },
      powerVal: {},
      appList: [],
      imageServerUrl: this.$store.state.imageServerUrl
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
          appitem.computedPrice = appitem.free
            ? this.$t('buyer.deploy.free')
            : appitem.price
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
      this.statisGlobalUraPower('day')
      this.indexPower = x
    },
    powerWeek(x) {
      this.statisGlobalUraPower('week')
      this.indexPower = x
    },
    powerMonth(x) {
      this.statisGlobalUraPower('month')
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
              symbolSize: [10, 20],
              lineStyle: {
                color: '#A2A6B0'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#A2A6B0'
              }
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
              symbolOffset: [0, 15],
              lineStyle: {
                color: '#A2A6B0'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#363636'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#A2A6B0'
              }
            }
          }
        ],
        series: [
          {
            name: this.$t('buyer.home.allPower'),
            type: 'bar',
            color: '#2463ff',
            barWidth: '20%',
            data: myData.y
          },
          {
            name: this.$t('buyer.home.restPower'),
            type: 'line',
            color: '#51a906',
            data: myData.line
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    },
    statisGlobalUraPower(type) {
      this.dataPower = {
        day: {
          x: [],
          y: [],
          line: []
        },
        week: {
          x: [],
          y: [],
          line: []
        },
        month: {
          x: [],
          y: [],
          line: []
        }
      }
      app.statisticsGlobalUraPower(auth.getCurLang(), type).then(respData => {
        const data = respData.data.data
        if (type == 'day') {
          data.forEach(item => {
            this.dataPower.day.x.push(item.datetimeValue)
            this.dataPower.day.y.push(item.totalCompute)
            this.dataPower.day.line.push(item.usedCompute)
          })
          this.powerVal = this.dataPower.day
          this.initEchart(this.powerVal)
        } else if (type == 'week') {
          data.forEach(item => {
            this.dataPower.week.x.push(item.datetimeValue)
            this.dataPower.week.y.push(item.totalCompute)
            this.dataPower.week.line.push(item.usedCompute)
          })
          this.powerVal = this.dataPower.week
          this.initEchart(this.powerVal)
        } else if (type == 'month') {
          data.forEach(item => {
            this.dataPower.month.x.push(item.datetimeValue)
            this.dataPower.month.y.push(item.totalCompute)
            this.dataPower.month.line.push(item.usedCompute)
          })
          this.powerVal = this.dataPower.month
          this.initEchart(this.powerVal)
        }
      })
    }
  },
  mounted() {
    this.powerDay(2)
  },
  created() {
    this.getAppList()
  }
}
</script>

<style lang="scss" scoped>
.Buyer {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  width: 100%;
  .content-title {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #A2A6B0;
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
      background: #161618;
      border-radius: 2px;
      min-width: 1130px;
      margin: 2px;
      padding: 30px;
      p {
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
        color: #A2A6B0;
        line-height: 24px;
        text-align: left;
      }
      .more {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #627100;
        line-height: 24px;
        text-align: right;
      }
      .more:hover {
        color: #a2ae44;
      }
      .shopBox {
        width: 100%;
        min-width: 1130px;
        min-height: 400px;
        .el-card {
          background: rgba(101, 143, 247, 0);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 270px;
          display: inline-block;
          margin: 15px;
        }
        .resources {
          text-align: center;
          padding: 10px;
          div {
            cursor: default;
            .shops {
              font-size: 14px;
              height: 30px;
              margin-bottom: -20px;
              text-align: right;
            }
            .img-box {
              height: 110px;
              width: 130px;
              margin: 10px auto;
              position: relative;
              img {
                background: #f2f2f2;
                min-width: 100px;
                min-height: 80px;
                max-width: 130px;
                max-height: 110px;
                width: auto;
                height: auto;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .name {
              font-weight: 600;
              padding: 5px 0 5px;
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
              font-size: 16px;
              color: #A2A6B0;
              text-align: center;
              line-height: 24px;
              margin-bottom: 0px;
            }
            .detail {
              width: 220px;
              height: 66px;
              overflow: hidden;
              box-sizing: content-box;
              font-weight: 300;
              font-size: 14px;
              color: #A2A6B0;
              text-align: center;
              line-height: 22px;
              margin: -5px auto;
            }
            .free {
              font-weight: 500;
              padding: 10px 0;
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
              font-size: 14px;
              color: #a2ae44;
              letter-spacing: 0;
              line-height: 22px;
              text-align: left;
            }
            .downloads {
              font-family: Source-Sans-Pro-Bold;
              font-weight: 500;
              font-size: 14px;
              padding: 10px 0;
              color: #A2A6B0;
              letter-spacing: 0;
              text-align: center;
              line-height: 22px;
            }
            .el-button {
              background: #424b00;
              border: 1px solid #424b00;
              border-radius: 5px;
              width: 120px;
              margin-top: -5px;
              padding: 8px 20px;
            }
            .el-button:hover {
              background: #627100;
              border: 1px solid #627100;
            }
          }
        }
      }
    }
    .power {
      padding: 15px;
      min-width: 1130px;
      height: 400px;
      background: #161618;
      border-radius: 2px;
      margin: 2px;
      .powerTitle p {
        height: 40px;
        line-height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
        color: #A2A6B0;
        text-align: left;
      }
      .powerCon p {
        font-size: 14px;
        color: #A2A6B0;
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
          color: #A2A6B0;
          z-index: 10;
          float: right;
          margin: 3px 10px;
          height: 40px;
          line-height: 40px;
          width: 55px;
          cursor: pointer;
        }
        .active {
          color: #a2ae44;
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
