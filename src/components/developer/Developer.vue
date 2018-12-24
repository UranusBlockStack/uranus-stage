<template>
  <section class="Developer">
    <div class="content-header">
      <h1>首页D</h1>
      <!-- <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
          <li class="active">Here</li>
      </ol>-->
      <div class="balence">
        <p>余额:12121212</p>
        <p>收益:12121212</p>
      </div>
    </div>
    <!-- Main content -->
    <div class="content container-fluid">
      <div class="my-content">
        <div class="downloads">
          <p>下载量</p>
          <div class="chooseDown">
            <span @click="downloadsYear(0)" :class="{active: indexDown == '0'}">全年</span>
            <span @click="downloadsMounth(1)" :class="{active: indexDown == '1'}">本月</span>
            <span @click="downloadsWeek(2)" :class="{active: indexDown == '2'}">本周</span>
            <span @click="downloadsDay(3)" :class="{active: indexDown == '3'}">今天</span>
          </div>
          <div id="myDownloads"></div>
        </div>
        <div class="profit">
          <p>我的收益</p>
          <div class="choosePro">
            <span @click="profitYear(0)" :class="{active: this.indexPro == '0'}">全年</span>
            <span @click="profitMounth(1)" :class="{active: this.indexPro == '1'}">本月</span>
            <span @click="profitWeek(2)" :class="{active: this.indexPro == '2'}">本周</span>
            <span @click="profitDay(3)" :class="{active: this.indexPro == '3'}">今天</span>
          </div>
          <div id="myProfit"></div>
        </div>
      </div>
      <div class="application">
        <el-row :gutter="20">
          <el-col :span="6">
            <p>我的应用</p>
          </el-col>
          <el-col :span="3" :offset="15">
            <p class="more">查看更多>></p>
          </el-col>
        </el-row>
        <el-row class="applicationBox" :gutter="20">
          <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
            <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
              <div class="resources">
                <div>
                  <img src="/static/img/uranus/developer/app.png" alt="img">
                  <p class="name">Imagepuler</p>
                  <p
                    class="detail"
                  >DEPRECATED:This catalog item is deprecated and moved to rancher-catalog under pre-pull…</p>
                  <el-row :gutter="20">
                    <el-col :span="6" :offset="2">
                      <p class="free">免费</p>
                    </el-col>
                    <el-col :span="10" :offset="6">
                      <p class="downloads">123人下载</p>
                    </el-col>
                    <el-button type="success">查看详情</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" style="margin-bottom:40px">
            <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
              <div class="resources">
                <div class="upload">
                  <img src="/static/img/uranus/developer/upload.png" alt="img">
                  <p class="detail">发布更多应用,赚取额外费用</p>
                  <el-row :gutter="20">
                    <el-button type="success">添加应用</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="record">
        <div class="record-head">Record</div>
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="type" label="Type"></el-table-column>
              <el-table-column prop="time" label="Order Time"></el-table-column>
              <el-table-column prop="hash" label="Order Hash"></el-table-column>
              <el-table-column prop="amount" label="Amount"></el-table-column>
              <el-table-column prop="fee" label="Fee"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 50px">
          <el-col :span="6" :offset="9">
            <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Developer",
  data() {
    return {
      indexDown: "3",
      indexPro: "3",
      dataDownloads: {
        day: {
          x: ["00:00", "04:00", "08:00", "12:00", "16:00", "18:00"],
          y: [10, 20, 30, 40, 50, 60]
        },
        week: {
          x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ["1", "3", "5", "7", "9", "11", "12"],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ["13", "15", "16", "17", "18", "19"],
          y: [10000, 520, 200, 334, 390, 330]
        }
      },
      downloadsVal: {
        x: "",
        y: ""
      },
      dataProfit: {
        day: {
          x: ["00:00", "04:00", "08:00", "12:00", "16:00", "18:00"],
          y: [10, 20, 30, 40, 50, 60]
        },
        week: {
          x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ["1", "3", "5", "7", "9", "11", "12"],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ["13", "15", "16", "17", "18", "19"],
          y: [10000, 520, 200, 334, 390, 330]
        }
      },
      profitVal: {
        x: "",
        y: ""
      },
      appList: [
        { id: "1", name: "Imagepuller" },
        { id: "1", name: "Imagepuller" },
        { id: "1", name: "Imagepuller" }
      ],
      tableData: [
        {
          type: "Receive",
          time: "2018-11-02 09:56",
          hash: "0xb2ddddc25f1375bo693e6",
          amount: "0.63367",
          fee: "0.000378"
        },
        {
          type: "Receive",
          time: "2018-11-02 09:56",
          hash: "0xb2ddddc25f1375bo693e6",
          amount: "0.63367",
          fee: "0.000378"
        },
        {
          type: "Receive",
          time: "2018-11-02 09:56",
          hash: "0xb2ddddc25f1375bo693e6",
          amount: "0.63367",
          fee: "0.000378"
        }
      ]
    };
  },
  methods: {
    downloadsDay(x) {
      this.downloadsVal = this.dataDownloads.day;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexDown = x;
    },
    downloadsWeek(x) {
      this.downloadsVal = this.dataDownloads.week;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexDown = x;
    },
    downloadsMounth(x) {
      this.downloadsVal = this.dataDownloads.mounth;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexDown = x;
    },
    downloadsYear(x) {
      this.downloadsVal = this.dataDownloads.year;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexDown = x;
    },
    profitDay(x) {
      this.profitVal = this.dataProfit.day;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexPro = x;
    },
    profitWeek(x) {
      this.profitVal = this.dataProfit.week;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexPro = x;
    },
    profitMounth(x) {
      this.profitVal = this.dataProfit.mounth;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexPro = x;
    },
    profitYear(x) {
      this.profitVal = this.dataProfit.year;
      this.initEchart(this.downloadsVal, this.profitVal);
      this.indexPro = x;
    },
    initEchart(val1, val2) {
      var myChart1 = this.$echarts.init(document.getElementById("myDownloads"));
      var myChart2 = this.$echarts.init(document.getElementById("myProfit"));
      var myData1 = val1;
      var myData2 = val2;
      myChart1.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: myData1.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "uranus",
            type: "bar",
            barWidth: "25%",
            color: "#1890ff",
            data: myData1.y
          }
        ]
      });
      myChart2.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: myData2.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "uranus",
            type: "bar",
            barWidth: "25%",
            color: "#1890ff",
            data: myData2.y
          }
        ]
      });
      window.onresize = function() {
        myChart1.resize();
        myChart2.resize();
      };
    }
  },
  mounted() {
    this.downloadsDay(3);
    this.profitDay(3);
  }
};
</script>

<style lang="scss" scoped>
.Developer {
  background: #f2f2f2;
  width: 100%;
  .content-header {
    background: #ffffff;
    height: 65px;
    width: 100%;
    h1 {
      float: left;
    }
    .balence {
      float: right;
      margin-right: 15px;
      height: 50px;
      width: 105px;
      p {
        height: 25px;
        line-height: 25px;
        margin: 0;
      }
    }
  }
  .content {
    .my-content {
      width: 95%;
      min-width: 1130px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .active {
        color: #8eb357;
        font-weight: bolder;
      }
      .downloads {
        width: 49%;
        min-width: 530px;
        height: 400px;
        background: #ffffff;
        p {
          padding-left: 30px;
          padding-top: 20px;
          height: 40px;
          line-height: 40px;
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          color: #252525;
          text-align: left;
        }
        .chooseDown {
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
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
      }
      .profit {
        width: 49%;
        min-width: 530px;
        height: 400px;
        background: #ffffff;
        p {
          padding-left: 30px;
          padding-top: 20px;
          height: 40px;
          line-height: 40px;
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          color: #252525;
          text-align: left;
        }
        .choosePro {
          height: 30px;
          span {
            float: right;
            margin: 3px 10px;
            height: 30px;
            width: 55px;
            cursor: pointer;
          }
        }
        #myProfit {
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
      }
    }
    .application {
      width: 95%;
      min-width: 1130px;
      height: 450px;
      margin: 20px auto;
      padding: 30px;
      background: #ffffff;
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
      }
      .applicationBox {
        width: 100%;
        min-width: 1130px;
        .resources {
          text-align: center;
          padding: 20px;
          div {
            cursor: pointer;
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
          .upload {
            padding-top: 50px;
            .detail {
              margin-top: 50px;
            }
          }
        }
      }
    }
    .record {
      background: #ffffff;
      width: 95%;
      min-width: 1130px;
      margin: 20px auto;
      padding: 20px;
      .record-head {
        height: 50px;
        width: 100%;
        line-height: 50px;
        padding-left: 15px;
      }
    }
  }
}
</style>