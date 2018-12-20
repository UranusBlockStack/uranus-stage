<template>
  <section class="Buyer">
    <div class="content-header">
      <h1>首页B</h1>
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
      <div class="shop">
        <el-row>
          <el-col :span="12">应用商店</el-col>
          <el-col :span="12" class="more-application">查看更多>></el-col>
        </el-row>
        <el-row class="shop-content">
          <el-col :span="6"></el-col>
          <el-col :span="6">应用商店</el-col>
          <el-col :span="6">应用商店</el-col>
          <el-col :span="6">应用商店</el-col>
        </el-row>
      </div>
      <div class="power">
        <p>我的算力</p>
        <div class="choosePower">
          <span @click="powerYear(0)" :class="{active: this.indexPower == '0'}">全年</span>
          <span @click="powerMounth(1)" :class="{active: indexPower == '1'}">本月</span>
          <span @click="powerWeek(2)" :class="{active: indexPower == '2'}">本周</span>
          <span @click="powerDay(3)" :class="{active: indexPower == '3'}">今天</span>
        </div>
        <div id="myPower"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Buyer",
  data() {
    return {
      indexPower: "",
      dataPower: {
        day: {
          x: ["00:00", "04:00", "08:00", "12:00", "16:00", "18:00"],
          y: [10, 20, 30, 40, 50, 60]
        },
        week: {
          x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          y: [100, 200, 300, 400, 500, 600, 700]
        },
        mounth: {
          x: ["1", "5", "10", "15", "20", "25", "30"],
          y: [1000, 520, 200, 334, 390, 330, 220]
        },
        year: {
          x: ["1", "4", "7", "10", "12"],
          y: [10000, 520, 200, 334, 390]
        }
      },
      powerVal: {}
    };
  },
  methods: {
    powerDay(x) {
      this.powerVal = this.dataPower.day;
      this.initEchart(this.powerVal);
      this.indexPower = x;
    },
    powerWeek(x) {
      this.powerVal = this.dataPower.week;
      this.initEchart(this.powerVal);
      this.indexPower = x;
    },
    powerMounth(x) {
      this.powerVal = this.dataPower.mounth;
      this.initEchart(this.powerVal);
      this.indexPower = x;
    },
    powerYear(x) {
      this.powerVal = this.dataPower.year;
      this.initEchart(this.powerVal);
      this.indexPower = x;
    },
    initEchart(val) {
      var myChart = this.$echarts.init(document.getElementById("myPower"));
      var myData = val;
      myChart.setOption({
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
            data: myData.x,
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
            barWidth: "60%",
            data: myData.y
          }
        ]
      });
      window.onresize = function() {
        myChart.resize();
      };
    }
  },
  mounted() {
    this.powerDay(3);
  }
};
</script>

<style lang="scss" scoped>
.Buyer {
  background: #f2f2f2;
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
    .shop {
      background: #ffffff;
      width: 95%;
      min-width: 1130px;
      margin: 20px auto;
      padding: 15px;
      box-shadow: 5px 5px 5px gray;
      .more-application {
        text-align: right;
        color: green;
      }
      .shop-content {
        border: 1px;
        .el-col {
          border: 1px solid greenyellow;
          height: 350px;
          border-radius: 5px;
        }
      }
    }
    .power {
      width: 95%;
      min-width: 1130px;
      height: 400px;
      background: #ffffff;
      box-shadow: 5px 5px 5px gray;
      margin: 20px auto;
      p {
        padding-left: 15px;
        height: 40px;
        line-height: 40px;
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
