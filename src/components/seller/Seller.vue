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
        <div>
          <div class="col-sm-12">
            <table
              id="example2"
              class="table table-bordered table-hover dataTable"
              role="grid"
              aria-describedby="example2_info"
            >
              <thead>
                <tr role="row">
                  <th
                    class="sorting_asc"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-sort="ascending"
                    aria-label="Rendering engine: activate to sort column descending"
                  >Rendering engine</th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="Browser: activate to sort column ascending"
                  >Browser</th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="Platform(s): activate to sort column ascending"
                  >Platform(s)</th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="Engine version: activate to sort column ascending"
                  >Engine version</th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="CSS grade: activate to sort column ascending"
                  >CSS grade</th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="CSS grade: activate to sort column ascending"
                  >CSS grade</th>
                </tr>
              </thead>
              <tbody>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Firefox 1.0</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Firefox 1.5</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Firefox 2.0</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Firefox 3.0</td>
                  <td>Win 2k+ / OSX.3+</td>
                  <td>1.9</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Camino 1.0</td>
                  <td>OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Camino 1.5</td>
                  <td>OSX.3+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Netscape 7.2</td>
                  <td>Win 95+ / Mac OS 8.6-9.2</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Netscape Browser 8</td>
                  <td>Win 98SE+</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Netscape Navigator 9</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Mozilla 1.0</td>
                  <td>Win 95+ / OSX.1+</td>
                  <td>1</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Netscape Navigator 9</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Mozilla 1.0</td>
                  <td>Win 95+ / OSX.1+</td>
                  <td>1</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="odd">
                  <td class="sorting_1">Gecko</td>
                  <td>Netscape Navigator 9</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr>
                <tr role="row" class="even">
                  <td class="sorting_1">Gecko</td>
                  <td>Mozilla 1.0</td>
                  <td>Win 95+ / OSX.1+</td>
                  <td>1</td>
                  <td>A</td>
                </tr>
              </tbody>
              <!-- <tfoot>
                <tr>
                  <th rowspan="1" colspan="1">Rendering engine</th>
                  <th rowspan="1" colspan="1">Browser</th>
                  <th rowspan="1" colspan="1">Platform(s)</th>
                  <th rowspan="1" colspan="1">Engine version</th>
                  <th rowspan="1" colspan="1">CSS grade</th>
                </tr>
              </tfoot> -->
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <div
              class="dataTables_info"
              id="example2_info"
              role="status"
              aria-live="polite"
            >Showing 1 to 10 of 57 entries</div>
          </div>
          <div class="col-sm-7">
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
              <ul class="pagination">
                <li class="paginate_button previous disabled" id="example2_previous">
                  <a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0">Previous</a>
                </li>
                <li class="paginate_button active">
                  <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0">1</a>
                </li>
                <li class="paginate_button">
                  <a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0">2</a>
                </li>
                <li class="paginate_button">
                  <a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0">3</a>
                </li>
                <li class="paginate_button">
                  <a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0">4</a>
                </li>
                <li class="paginate_button">
                  <a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0">5</a>
                </li>
                <li class="paginate_button">
                  <a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0">6</a>
                </li>
                <li class="paginate_button next" id="example2_next">
                  <a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Seller",
  data() {
    return {
      indexCon: '3',
      indexPro: '3',
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
      }
    };
  },
  methods: {
    consumptionDay(x) {
      this.consumptionVal.x = this.dataConsumption.day.x;
      this.consumptionVal.y = this.dataConsumption.day.y;
      this.initEchart(
        this.consumptionVal,
        this.$echarts.init(document.getElementById("myConsumption"))
      );
      this.indexCon = x;
    },
    consumptionWeek(x) {
      this.consumptionVal.x = this.dataConsumption.week.x;
      this.consumptionVal.y = this.dataConsumption.week.y;
      this.initEchart(
        this.consumptionVal,
        this.$echarts.init(document.getElementById("myConsumption"))
      );
      this.indexCon = x;
    },
    consumptionMounth(x) {
      this.consumptionVal.x = this.dataConsumption.mounth.x;
      this.consumptionVal.y = this.dataConsumption.mounth.y;
      this.initEchart(
        this.consumptionVal,
        this.$echarts.init(document.getElementById("myConsumption"))
      );
      this.indexCon = x;
    },
    consumptionYear(x) {
      this.consumptionVal.x = this.dataConsumption.year.x;
      this.consumptionVal.y = this.dataConsumption.year.y;
      this.initEchart(
        this.consumptionVal,
        this.$echarts.init(document.getElementById("myConsumption"))
      );
      this.indexCon = x;
    },
    profitDay(x) {
      this.profitVal.x = this.dataProfit.day.x;
      this.profitVal.y = this.dataProfit.day.y;
      this.initEchart(
        this.profitVal,
        this.$echarts.init(document.getElementById("myProfit"))
      );
      this.indexPro = x;
    },
    profitWeek(x) {
      this.profitVal.x = this.dataProfit.week.x;
      this.profitVal.y = this.dataProfit.week.y;
      this.initEchart(
        this.profitVal,
        this.$echarts.init(document.getElementById("myProfit"))
      );
      this.indexPro = x;
    },
    profitMounth(x) {
      this.profitVal.x = this.dataProfit.mounth.x;
      this.profitVal.y = this.dataProfit.mounth.y;
      this.initEchart(
        this.profitVal,
        this.$echarts.init(document.getElementById("myProfit"))
      );
      this.indexPro = x;
    },
    profitYear(x) {
      this.profitVal.x = this.dataProfit.year.x;
      this.profitVal.y = this.dataProfit.year.y;
      this.initEchart(
        this.profitVal,
        this.$echarts.init(document.getElementById("myProfit"))
      );
      this.indexPro = x;
    },
    initEchart(val, box) {
      var myChart = box;
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
      width: 85%;
      min-width: 1130px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .active {
        color: green;
      }
      .consumption {
        width: 45%;
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
          width: 530px;
          height: 300px;
          margin: 0 auto;
        }
      }
      .profit {
        width: 45%;
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
          width: 530px;
          height: 300px;
          margin: 0 auto;
        }
      }
    }
    .power {
      width: 85%;
      min-width: 1130px;
      height: 280px;
      margin: 20px auto;
      background: #ffffff;
      box-shadow: 5px 5px 5px gray;
      p {
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
      width: 85%;
      min-width: 1130px;
      margin: 20px auto;
      box-shadow: 5px 5px 5px gray;
    }
  }
}
</style>
