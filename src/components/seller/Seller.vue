<template>
  <section class="Seller">
    <div class="content-header">
      <h1>首页S</h1>
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
        <div class="consumption">
          <p>我的资源</p>
          <div class="chooseCon">
            <span @click="consumptionYear(0)" :class="{active: this.indexCon == '0'}">全年</span>
            <span @click="consumptionMounth(1)" :class="{active: indexCon == '1'}">本月</span>
            <span @click="consumptionWeek(2)" :class="{active: indexCon == '2'}">本周</span>
            <span @click="consumptionDay(3)" :class="{active: indexCon == '3'}">今天</span>
          </div>
          <div id="myConsumption"></div>
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
      <div class="power">
        <p>我的算力</p>
        <div class="powerBox">
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
      <div class="record">
        <div class="record-head">Record</div>
        <el-row>
          <el-col :span="24" style="background:pink">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="address" label="地址" min-width="230"></el-table-column>
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
  name: "Seller",
  data() {
    return {
      indexCon: "3",
      indexPro: "3",
      dataConsumption: {
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
      consumptionVal: {
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {
    echartsWidth : function() {
      let wid = $('#myConsumption').width;
      return wid;
    }
  },
  methods: {
    consumptionDay(x) {
      this.consumptionVal = this.dataConsumption.day;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexCon = x;
    },
    consumptionWeek(x) {
      this.consumptionVal = this.dataConsumption.week;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexCon = x;
    },
    consumptionMounth(x) {
      this.consumptionVal = this.dataConsumption.mounth;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexCon = x;
    },
    consumptionYear(x) {
      this.consumptionVal = this.dataConsumption.year;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexCon = x;
    },
    profitDay(x) {
      this.profitVal = this.dataProfit.day;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexPro = x;
    },
    profitWeek(x) {
      this.profitVal = this.dataProfit.week;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexPro = x;
    },
    profitMounth(x) {
      this.profitVal = this.dataProfit.mounth;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexPro = x;
    },
    profitYear(x) {
      this.profitVal = this.dataProfit.year;
      this.initEchart(this.consumptionVal,this.profitVal);
      this.indexPro = x;
    },
    initEchart(val1,val2) {
      var myChart1 = this.$echarts.init(
        document.getElementById("myConsumption")
      );
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
            barWidth: "60%",
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
            barWidth: "60%",
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
    this.consumptionDay(3);
    this.profitDay(3);
  }
};
</script>

<style lang="scss" scoped>
.Seller {
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
    width: 100%;
    .my-content {
      width: 95%;
      min-width: 1130px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .active {
        color: green;
        font-weight: bolder;
      }
      .consumption {
        width: 48%;
        min-width: 530px;
        height: 400px;
        background: #ffffff;
        box-shadow: 5px 5px 5px gray;
        p {
          padding-left: 15px;
          height: 40px;
          line-height: 40px;
        }
        .chooseCon {
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
          width: 100%;
          height: 300px;
          overflow:hidden;
        }
      }
      .profit {
        width: 48%;
        min-width: 530px;
        height: 400px;
        background: #ffffff;
        box-shadow: 5px 5px 5px gray;
        p {
          padding-left: 15px;
          height: 40px;
          line-height: 40px;
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
    .power {
      width: 95%;
      min-width: 1130px;
      height: 280px;
      margin: 20px auto;
      background: #ffffff;
      box-shadow: 5px 5px 5px gray;
      p {
        padding-left: 15px;
        height: 40px;
      }
      .powerBox {
        width: 100%;
        display: flex;
        justify-content: space-around;
        div {
          width: 180px;
          height: 180px;
          background: green;
          margin: 10px;
        }
      }
    }
    .record {
      background: #ffffff;
      width: 95%;
      min-width: 1130px;
      margin: 20px auto;
      box-shadow: 5px 5px 5px gray;
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
