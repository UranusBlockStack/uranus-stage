<template>
  <section class="Seller">
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
      <div class="my-content">
        <div class="consumption">
          <p>{{$t('seller.home.resource')}}</p>
          <div class="chooseCon">
            <span
              @click="consumptionYear(0)"
              :class="{active: this.indexCon == '0'}"
            >{{$t('seller.home.month')}}</span>
            <span
              @click="consumptionMounth(1)"
              :class="{active: indexCon == '1'}"
            >{{$t('seller.home.week')}}</span>
            <span
              @click="consumptionWeek(2)"
              :class="{active: indexCon == '2'}"
            >{{$t('seller.home.day')}}</span>
            <span
              @click="consumptionDay(3)"
              :class="{active: indexCon == '3'}"
            >{{$t('seller.home.hour')}}</span>
          </div>
          <div id="myConsumption"></div>
        </div>
        <div class="profit">
          <p>{{$t('seller.home.myEarnings')}}</p>
          <div class="choosePro">
            <span
              @click="profitYear(0)"
              :class="{active: this.indexPro == '0'}"
            >{{$t('seller.home.month')}}</span>
            <span
              @click="profitMounth(1)"
              :class="{active: this.indexPro == '1'}"
            >{{$t('seller.home.week')}}</span>
            <span
              @click="profitWeek(2)"
              :class="{active: this.indexPro == '2'}"
            >{{$t('seller.home.day')}}</span>
            <span
              @click="profitDay(3)"
              :class="{active: this.indexPro == '3'}"
            >{{$t('seller.home.hour')}}</span>
          </div>
          <div id="myProfit"></div>
        </div>
      </div>
      <div class="power">
        <p>{{$t('seller.home.power')}}</p>
        <div class="powerBox">
          <div id="Cpu"></div>
          <div id="Memory"></div>
          <div id="Storage"></div>
          <div id="Network"></div>
        </div>
      </div>
      <div class="record">
        <div class="record-head">{{$t('seller.home.record')}}</div>
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="type" :label="$t('seller.home.type')"></el-table-column>
              <el-table-column
                prop="createTime"
                :formatter="formateDate"
                :label="$t('seller.home.time')"
              ></el-table-column>
              <el-table-column prop="hash" :label="$t('seller.home.hash')">
                  <template slot-scope="scope">
                    <p style="color:red; font-size:10px; margin-left:35px;"
                    >{{ scope.row.hash }}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="value" :label="$t('seller.home.amount')"></el-table-column>
              <el-table-column prop="fee" :label="$t('seller.home.fee')"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 50px">
          <el-col :span="6" :offset="16">
            <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import * as wallet from '../../services/WalletService'
import moment from 'moment'

export default {
  name: 'Seller',
  data() {
    return {
      indexCon: '3',
      indexPro: '3',
      dataConsumption: {
        day: {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
          y: [50, 40, 30, 40, 50, 60, 50]
        },
        week: {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ['1', '3', '5', '7', '9', '11', '12'],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ['13', '15', '16', '17', '18', '19'],
          y: [10000, 520, 200, 334, 390, 330]
        }
      },
      consumptionVal: {
        x: '',
        y: ''
      },
      dataProfit: {
        day: {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
          y: [10, 20, 30, 40, 50, 60]
        },
        week: {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ['1', '3', '5', '7', '9', '11', '12'],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ['13', '15', '16', '17', '18', '19'],
          y: [10000, 520, 200, 334, 390, 330]
        }
      },
      profitVal: {
        x: '',
        y: ''
      },
      tableData: []
    }
  },

  computed: {},
  methods: {
    initTransactionRecords() {
      wallet
        .getTradeLogCurrentUser(this.$store.getters.lang, 0, 1, 10)
        .then(transList => {
          this.tableData = transList.data.data.records
          console.log(this.tableData)
        })
    },
    formateDate(row, column, cellValue) {
        // return moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        return cellValue
    },
    consumptionDay(x) {
      this.consumptionVal = this.dataConsumption.day
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexCon = x
    },
    consumptionWeek(x) {
      this.consumptionVal = this.dataConsumption.week
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexCon = x
    },
    consumptionMounth(x) {
      this.consumptionVal = this.dataConsumption.mounth
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexCon = x
    },
    consumptionYear(x) {
      this.consumptionVal = this.dataConsumption.year
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexCon = x
    },
    profitDay(x) {
      this.profitVal = this.dataProfit.day
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexPro = x
    },
    profitWeek(x) {
      this.profitVal = this.dataProfit.week
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexPro = x
    },
    profitMounth(x) {
      this.profitVal = this.dataProfit.mounth
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexPro = x
    },
    profitYear(x) {
      this.profitVal = this.dataProfit.year
      this.initEchart(this.consumptionVal, this.profitVal)
      this.indexPro = x
    },
    initEchart(val1, val2) {
      let myChart1 = this.$echarts.init(
        document.getElementById('myConsumption')
      )
      let myChart2 = this.$echarts.init(document.getElementById('myProfit'))
      let myChart3 = this.$echarts.init(document.getElementById('Cpu'))
      let myChart4 = this.$echarts.init(document.getElementById('Memory'))
      let myChart5 = this.$echarts.init(document.getElementById('Storage'))
      let myChart6 = this.$echarts.init(document.getElementById('Network'))
      let myData1 = val1
      let myData2 = val2
      myChart1.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
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
            name: 'T',
            type: 'category',
            data: myData1.x,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 5]
            }
          }
        ],
        yAxis: [
          {
            name: 'UracPower(U)',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 15]
            }
          }
        ],
        series: [
          {
            name: 'uranus',
            type: 'bar',
            barWidth: '30%',
            color: '#1890ff',
            data: myData1.y
          },
          {
            name: 'line',
            type: 'line',
            color: '#1890ff',
            data: myData1.y
          }
        ]
      })
      myChart2.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
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
            name: 'T',
            type: 'category',
            data: myData2.x,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 5]
            }
          }
        ],
        yAxis: [
          {
            name: 'Earnings(Urac)',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 15]
            }
          }
        ],
        series: [
          {
            name: 'uranus',
            type: 'bar',
            barWidth: '30%',
            color: '#1890ff',
            data: myData2.y
          },
          {
            name: 'line',
            type: 'line',
            color: '#1890ff',
            data: myData2.y
          }
        ]
      })
      myChart3.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '我的算力',
            type: 'gauge',
            title: {
              show: true,
              offsetCenter: [0, '60%'], // x, y，单位px
              textStyle: {
                color: '#5d5d5d',
                fontSize: 15
              }
            },
            detail: {
              show: true,
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              textStyle: {
                color: '#363636',
                fontSize: 24
              }
            },
            data: [{ value: 20, name: 'CPU' }],
            axisLabel: {
              formatter: function(value) {
                return ''
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.2, '#1890ff'], [1, '#dcdcdc']]
              }
            }
          }
        ]
      })
      myChart4.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '我的算力',
            type: 'gauge',
            title: {
              show: true,
              offsetCenter: [0, '60%'], // x, y，单位px
              textStyle: {
                color: '#5d5d5d',
                fontSize: 14
              }
            },
            detail: {
              show: true,
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              textStyle: {
                color: '#363636',
                fontSize: 24
              }
            },
            data: [{ value: 40, name: 'MEMORY' }],
            axisLabel: {
              formatter: function(value) {
                return ''
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.4, '#1890ff'], [1, '#dcdcdc']]
              }
            }
          }
        ]
      })
      myChart5.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '我的算力',
            type: 'gauge',
            title: {
              show: true,
              offsetCenter: [0, '60%'], // x, y，单位px
              textStyle: {
                color: '#5d5d5d',
                fontSize: 14
              }
            },
            detail: {
              show: true,
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              textStyle: {
                color: '#363636',
                fontSize: 24
              }
            },
            data: [{ value: 50, name: 'STORAGE' }],
            axisLabel: {
              formatter: function(value) {
                return ''
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.5, '#1890ff'], [1, '#dcdcdc']]
              }
            }
          }
        ]
      })
      myChart6.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '我的算力',
            type: 'gauge',
            title: {
              show: true,
              offsetCenter: [0, '60%'], // x, y，单位px
              textStyle: {
                color: '#5d5d5d',
                fontSize: 14
              }
            },
            detail: {
              show: true,
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              textStyle: {
                color: '#363636',
                fontSize: 24
              }
            },
            data: [{ value: 70, name: 'NETWORK' }],
            axisLabel: {
              formatter: function(value) {
                return ''
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.7, '#1890ff'], [1, '#dcdcdc']]
              }
            }
          }
        ]
      })
      window.onresize = function() {
        myChart1.resize()
        myChart2.resize()
        myChart3.resize()
        myChart4.resize()
        myChart5.resize()
        myChart6.resize()
      }
    }
  },
  mounted() {
    this.consumptionDay(3)
    this.profitDay(3)
    this.initTransactionRecords()
  }
}
</script>

<style lang="scss" scoped>
.Seller {
  background: #f2f2f2;
  width: 100%;
  min-width: 1160px;
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
    width: 100%;
    padding: 10px;
    .my-content {
      min-width: 1130px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .active {
        color: #81a028;
        font-weight: bolder;
      }
      .consumption {
        width: 50%;
        margin-right: 5px;
        min-width: 550px;
        height: 400px;
        background: #ffffff;
        p {
          padding-left: 30px;
          padding-top: 20px;
          height: 40px;
          font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
          font-size: 16px;
        }
        .chooseCon {
          margin-top: -30px;
          height: 30px;
          span {
            float: right;
            margin: 3px 10px;
            height: 30px;
            width: 55px;
            cursor: pointer;
          }
        }
        #myConsumption {
          width: 90%;
          height: 320px;
          overflow: hidden;
          margin: 0 auto;
        }
      }
      .profit {
        width: 50%;
        margin-left: 5px;
        min-width: 550px;
        height: 400px;
        background: #ffffff;
        p {
          padding-left: 30px;
          padding-top: 20px;
          height: 40px;
          font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
          font-size: 16px;
        }
        .choosePro {
          height: 30px;
          margin-top: -30px;
          span {
            float: right;
            margin: 3px 10px;
            height: 30px;
            width: 55px;
            cursor: pointer;
          }
        }
        #myProfit {
          width: 90%;
          height: 320px;
          overflow: hidden;
          margin: 0 auto;
        }
      }
    }
    .power {
      min-width: 1130px;
      height: 360px;
      margin-top: 10px;
      background: #ffffff;
      p {
        padding-left: 30px;
        padding-top: 20px;
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
      }
      .powerBox {
        width: 100%;
        margin-top: -20px;
        display: flex;
        justify-content: space-around;
        div {
          width: 18%;
          height: 260px;
          margin: 10px;
          color: #979797;
        }
      }
    }
    .record {
      background: #ffffff;
      min-width: 1130px;
      margin: 10px auto;
      padding: 30px;
      .record-head {
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
      }
      .el-table {
        color: #363636;
      }
      .el-table /deep/ th {
        color: #363636;
        font-weight: 500;
      }
      .el-pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>
