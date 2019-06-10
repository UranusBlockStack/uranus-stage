<template>
  <section class="developer">
    <el-row class="content-title">
      <el-col
        class="title"
        :span="12"
      >
        <h1>{{$t('developer.home.home')}}</h1>
      </el-col>
    </el-row>
    <!-- Main content -->
    <div class="content container-fluid">
      <div class="my-content">
        <div class="downloads">
          <p>{{$t('developer.home.dowmloads')}}</p>
          <div class="chooseDown">
            <span
              @click="downloadsYear(0)"
              :class="{active: indexDown == '0'}"
            >{{$t('developer.home.month')}}</span>
            <span
              @click="downloadsMounth(1)"
              :class="{active: indexDown == '1'}"
            >{{$t('developer.home.week')}}</span>
            <span
              @click="downloadsWeek(2)"
              :class="{active: indexDown == '2'}"
            >{{$t('developer.home.day')}}</span>
          </div>
          <div id="myDownloads"></div>
        </div>
        <div class="profit">
          <p>{{$t('developer.home.earnings')}}</p>
          <div class="choosePro">
            <span
              @click="profitYear(0)"
              :class="{active: this.indexPro == '0'}"
            >{{$t('developer.home.month')}}</span>
            <span
              @click="profitMounth(1)"
              :class="{active: this.indexPro == '1'}"
            >{{$t('developer.home.week')}}</span>
            <span
              @click="profitWeek(2)"
              :class="{active: this.indexPro == '2'}"
            >{{$t('developer.home.day')}}</span>
          </div>
          <div id="myProfit"></div>
        </div>
      </div>
      <div class="application">
        <el-row :gutter="20">
          <el-col :span="6">
            <p>{{$t('developer.home.myApplication')}}</p>
          </el-col>
          <el-col
            :span="3"
            :offset="15"
          >
            <p class="more" @click="$router.push({path: '/myapplication'})">{{$t('developer.home.more')}}>></p>
          </el-col>
        </el-row>
        <el-row
          class="applicationBox"
          :gutter="20"
        >
          <el-col
            :span="6"
            v-for="(app, index) in appList"
            :key="index"
            style="margin-bottom:40px"
          >
            <el-card
              :body-style="{ padding: '0px', height:'360px'}"
              shadow="hover"
            >
              <div class="resources">
                <div>
                  <div class="img-box">
                    <img
                      src="http://54.180.158.219:3300/rancher-img/library-wordpress/icon"
                      alt="img"
                    >
                  </div>
                  <p class="name">Imagepuler</p>
                  <p class="detail">DEPRECATED:This catalog item is deprecated and moved to rancher-catalog under pre-pull…</p>
                  <el-row :gutter="20">
                    <el-col
                      :span="6"
                      :offset="2"
                    >
                      <p class="free">{{$t('developer.home.free')}}</p>
                    </el-col>
                    <el-col
                      :span="10"
                      :offset="6"
                    >
                      <p class="downloads">{{$t('developer.home.download')}} 123</p>
                    </el-col>
                    <el-button type="success">{{$t('developer.home.details')}}</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            v-if="appList.length < 4"
            :span="6"
            style="margin-bottom:40px"
          >
            <el-card
              :body-style="{ padding: '0px', height:'360px'}"
              shadow="hover"
            >
              <div class="resources">
                <div class="upload">
                  <div class="img-box">
                    <img
                      src="/static/img/uranus/developer/addApp.png"
                      style="background: transparent !important; cursor: pointer;"
                      alt="img"
                    >
                  </div>
                  <p class="detail">{{ $t('developer.home.postApp') }}</p>
                  <el-row :gutter="20">
                    <el-button type="success">{{ $t('developer.home.addApp') }}</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="recordTable">
        <el-row class="recordHead">
          <el-col
            class="title"
            :span="6"
          >
            <h1>
              {{$t('developer.home.recard')}}
            </h1>
          </el-col>
          <el-col
            class="recard"
            :span="2"
            :offset="16"
          >
            <router-link :to="{path: '/applicationrecard'}">
              <span>{{$t('developer.home.more')}}>></span>
            </router-link>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <template slot="empty">
                <p
                  class="empty-text"
                  style="height: 300px; line-height: 300px;"
                >{{ $t("developer.home.empty") }}</p>
              </template>
              <el-table-column>
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-id"></i>
                     {{$t('developer.applicationRecard.table.number')}}
                  </p>
                </template>
                <template slot-scope="scope">
                  <p class="overflow">{{ scope.row.orderNo }}</p>
                </template>
              </el-table-column>
              <el-table-column>
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-Mirror-name"></i>
                    {{$t('developer.myApplication.table.name')}}
                  </p>
                </template>
                <template slot-scope="scope">
                  <p class="overflow">{{ scope.row.prodName }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="version"
                min-width="50"
              >
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-version"></i>
                    {{$t('developer.applicationRecard.table.version')}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                min-width="60"
              >
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-table-time"></i>
                    {{$t('developer.applicationRecard.table.orderTime')}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column min-width="45">
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-table-value"></i>
                    {{$t('developer.applicationRecard.table.value')}}
                  </p>
                </template>
                <template slot-scope="scope">
                  <p
                    class="overflow"
                    v-if="!scope.row.free"
                  >{{ scope.row.prodPrice }} URAC</p>
                  <p
                    class="overflow"
                    v-if="scope.row.free"
                  > Free </p>
                </template>
              </el-table-column>
              <el-table-column min-width="80">
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <p class="table-head">
                    <i class="iconfont icon-table-hash"></i>
                    {{$t('developer.applicationRecard.table.hash')}}
                  </p>
                </template>
                <template slot-scope="scope">
                  <p class="overflow"> {{ scope.row.orderHash }} </p>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col
            :span="8"
            :offset="16"
          >
            <el-pagination
              layout="prev, pager, next"
              :total="100"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Developer',
  data() {
    return {
      indexDown: '3',
      indexPro: '3',
      dataDownloads: {
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
      downloadsVal: {
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
      appList: [
        { id: '1', name: 'Imagepuller' },
        { id: '1', name: 'Imagepuller' },
        { id: '1', name: 'Imagepuller' }
      ],
      tableData: [
        {
          orderNo: '18865432165',
          prodName: 'MySQL',
          version: 'V10.1.0',
          createTime: '2018-05-10',
          prodPrice: '168',
          orderHash: '4564sdfasf165sdf165s1'
        },
        {
          orderNo: '18865432166',
          prodName: 'MySQL',
          version: 'V10.1.0',
          createTime: '2018-05-10',
          prodPrice: '168',
          orderHash: '4564sdfasf165sdf165s1'
        },
        {
          orderNo: '18865432167',
          prodName: 'MySQL',
          version: 'V10.1.0',
          createTime: '2018-05-10',
          prodPrice: '168',
          orderHash: '4564sdfasf165sdf165s1'
        },
        {
          orderNo: '18865432168',
          prodName: 'MySQL',
          version: 'V10.1.0',
          createTime: '2018-05-10',
          prodPrice: '168',
          orderHash: '4564sdfasf165sdf165s1'
        },
        {
          orderNo: '18865432169',
          prodName: 'MySQL',
          version: 'V10.1.0',
          createTime: '2018-05-10',
          prodPrice: '168',
          orderHash: '4564sdfasf165sdf165s1'
        }
      ]
    }
  },
  methods: {
    downloadsDay(x) {
      this.downloadsVal = this.dataDownloads.day
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexDown = x
    },
    downloadsWeek(x) {
      this.downloadsVal = this.dataDownloads.week
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexDown = x
    },
    downloadsMounth(x) {
      this.downloadsVal = this.dataDownloads.mounth
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexDown = x
    },
    downloadsYear(x) {
      this.downloadsVal = this.dataDownloads.year
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexDown = x
    },
    profitDay(x) {
      this.profitVal = this.dataProfit.day
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexPro = x
    },
    profitWeek(x) {
      this.profitVal = this.dataProfit.week
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexPro = x
    },
    profitMounth(x) {
      this.profitVal = this.dataProfit.mounth
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexPro = x
    },
    profitYear(x) {
      this.profitVal = this.dataProfit.year
      this.initEchart(this.downloadsVal, this.profitVal)
      this.indexPro = x
    },
    initEchart(val1, val2) {
      var myChart1 = this.$echarts.init(document.getElementById('myDownloads'))
      var myChart2 = this.$echarts.init(document.getElementById('myProfit'))
      var myData1 = val1
      var myData2 = val2
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
              symbolOffset: [0, 5],
              lineStyle: {
                color: '#A2A6B0'
              }
            }
          }
        ],
        yAxis: [
          {
            name: ' ',
            type: 'value',
            /* axisLabel: {
                          formatter: "{value}"
                      }, */
            splitLine: {
              show: true,
              lineStyle: {
                color: '#363636'
              }
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [10, 20],
              symbolOffset: [0, 15],
              lineStyle: {
                color: '#A2A6B0'
              }
            }
          }
        ],
        series: [
          {
            name: ' ',
            type: 'bar',
            barWidth: '30%',
            color: '#333440',
            // y轴柱形数值
            data: myData1.y
          },
          {
            name: ' ',
            type: 'line',
            color: '#627100',
            // y轴连线数值
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
              symbolOffset: [0, 5],
              lineStyle: {
                color: '#A2A6B0'
              }
            }
          }
        ],
        yAxis: [
          {
            name: ' ',
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
            name: 'uranus',
            type: 'bar',
            barWidth: '25%',
            color: '#333440',
            data: myData2.y
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
        myChart2.resize()
      }
    }
  },
  mounted() {
    this.downloadsDay(3)
    this.profitDay(3)
  }
}
</script>

<style lang="scss" scoped>
.developer {
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
      color: #a2a6b0;
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
    padding: 2px;
    .my-content {
      min-width: 1130px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .active {
        color: #a2ae44;
      }
      .downloads {
        width: 50%;
        margin-right: 2px;
        min-width: 550px;
        height: 400px;
        background: #161618;
        border-radius: 2px;
        color: #a2a6b0;
        p {
          padding-left: 30px;
          padding-top: 20px;
          height: 40px;
          font-family: Source-Sans-Pro-Bold;
          font-weight: 500;
          font-size: 16px;
        }
        .chooseDown {
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
        #myDownloads {
          width: 90%;
          height: 320px;
          overflow: hidden;
          margin: 0 auto;
        }
      }
      .profit {
        width: 50%;
        margin-left: 0px;
        min-width: 550px;
        height: 400px;
        background: #161618;
        border-radius: 2px;
        color: #a2a6b0;
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
    .application {
      min-width: 1130px;
      min-height: 450px;
      margin: 2px auto;
      padding: 0 30px;
      background: #161618;
      border-radius: 2px;
      color: #a2a6b0;
      p {
        padding-left: 30px;
        padding-top: 20px;
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
      }
      .more {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #627100;
        line-height: 24px;
      }
      .more:hover {
        color: #a2ae44;
      }
      .applicationBox {
        width: 100%;
        min-width: 1130px;
        margin-top: 15px;
        min-height: 400px;
        .el-card {
          background: rgba(101, 143, 247, 0);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 270px;
          display: inline-block;
          margin: 15px;
        }
        .el-card:hover {
          background: rgba(176, 192, 255, 0.05);
        }
        .resources {
          text-align: center;
          padding: 10px;
          div {
            cursor: default;
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
              color: #a2a6b0;
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
              color: #a2a6b0;
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
              color: #a2a6b0;
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
          .upload {
            padding-top: 50px;
            .detail {
              margin-top: 50px;
            }
          }
        }
      }
    }
    .recordTable {
      background: #161618;
      border-radius: 2px;
      color: #a2a6b0;
      min-width: 1130px;
      margin: 2px auto;
      padding: 30px;
      .recordHead {
        background: #161618;
        border-radius: 2px;
        margin: 2px 2px 0;
        height: 50px;
        .title {
          h1 {
            
            font-family: Source-Sans-Pro-Bold;
            font-size: 16px;
            color: #a2a6b0;
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
        .recard {
          font-family: Source-Sans-Pro-Bold;
          font-size: 16px;
          color: #727680;
          line-height: 50px;
          i {
            font-size: 26px;
            margin-right: 10px;
          }
          span {
            font-size: 16px;
            color: #627100;
            line-height: 50px;
          }
        }
        .recard :hover {
          i,
          span {
            color: #a2ae44;
          }
        }
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .el-table {
        color: #a2a6b0;
      }
      .table-head {
        color: #a2a6b0;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 22px;
        }
      }
      .el-table {
        color: #a2a6b0;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table::before {
        background: rgba(255, 255, 255, 0.1);
      }
      .el-table /deep/ tr:hover td {
        background: rgba(176, 192, 255, 0.05) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .el-pagination {
        margin-top: 20px;
      }
      .el-pagination /deep/ .btn-prev {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .btn-next {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .el-pager li {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .el-pager li.active {
        color: #a2ae44;
      }
    }
  }
}
</style>