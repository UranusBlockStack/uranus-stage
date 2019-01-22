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
              @click="statisticsGlobalUraPower('myConsumption','month')"
              :class="{active: this.indexCon == '0'}"
            >{{$t('seller.home.month')}}</span>
            <span
              @click="statisticsGlobalUraPower('myConsumption','week')"
              :class="{active: indexCon == '1'}"
            >{{$t('seller.home.week')}}</span>
            <span
              @click="statisticsGlobalUraPower('myConsumption','day')"
              :class="{active: indexCon == '2'}"
            >{{$t('seller.home.day')}}</span>
            <!-- <span @click="statisticsGlobalUraPower('day')" :class="{active: indexCon == '3'}">
              {{$t('seller.home.hour')}}
            </span>-->
          </div>
          <div id="myConsumption"></div>
        </div>

        <div class="profit">
          <p>{{$t('seller.home.myEarnings')}}</p>
          <div class="choosePro">
            <span
              @click="getEarning('myProfit','month')"
              :class="{active: this.indexPro == '0'}"
            >{{$t('seller.home.month')}}</span>
            <span
              @click="getEarning('myProfit','week')"
              :class="{active: this.indexPro == '1'}"
            >{{$t('seller.home.week')}}</span>
            <span
              @click="getEarning('myProfit','day')"
              :class="{active: this.indexPro == '2'}"
            >{{$t('seller.home.day')}}</span>
            <!--<span @click="profitDay(3)" :class="{active: this.indexPro == '3'}">
              {{$t('seller.home.hour')}}333
            </span>-->
          </div>
          <div id="myProfit"></div>
        </div>
      </div>
      <div class="power">
        <p>{{$t('seller.home.power')}}</p>
        <div  v-if="initOil" class="powerBox">
          <div id="Cpu">
            <Oil :chartData="{value: getPercentNumber(allResources.cpuKernelUsed,allResources.cpuKernel), type: 'CPU'}"/>
          </div>
          <div id="Memory">
            <Oil :chartData="{value: getPercentNumber(allResources.memUsed,allResources.mem), type: 'Memory'}"/>
          </div>
          <div id="Storage">
            <Oil :chartData="{value: getPercentNumber(allResources.disk,allResources.diskUsed), type: 'Storage'}"/>
          </div>
          <div id="Network">
            <Oil :chartData="{value: getPercentNumber(allResources.network,allResources.networkUsed), type: 'Network'}"/>
            <!--<Oil :chartData="{value: 20, type: 'Network'}"/>-->
          </div>
        </div>
      </div>
      <!-- transaction record -->
      <div class="record">
        <div class="record-head">{{$t('seller.home.record')}}</div>
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" style="width: 100%">
              <template slot="empty">
                <p class="empty-text">No Transaction</p>
              </template>
              <el-table-column prop="type">
                <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-state"></i>
                    {{$t('seller.home.type')}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :formatter="formateDate">
                <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-date"></i>
                    {{$t('seller.home.time')}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="hash">
                <template slot="header" slot-scope="scope" min-width="250">
                  <p class="table-head">
                    <i class="iconfont icon-table-hash"></i>
                    {{$t('seller.home.hash')}}
                  </p>
                </template>
                <template slot-scope="scope">
                  <p class="overflow">{{ scope.row.hash }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="value">
                <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-value"></i>
                    {{$t('seller.home.amount')}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="fee">
                <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-fee"></i>
                    {{$t('seller.home.fee')}}
                  </p>
                </template>
              </el-table-column>
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
import moment from "moment";
import Oil from "@/components/modules/Oil";
import * as wallet from "../../services/WalletService";
import * as rancher from "../../services/RancherService.js";
import * as auth from "../../services/AuthService";
import * as order from "../../services/OrderService";

export default {
  name: "Seller",
  components: {
    Oil
  },
  data() {
    return {
      language: "en-us",
      indexCon: 2,
      indexPro: 2,
      tableData: [],
        allResources:"",
      initOil:false
    };
  },
  methods: {

    statisticsGlobalUraPower(elementId, type) {
      //按类型统计 全网算力
      rancher.statisticsGlobalUraPower(this.language, type).then(data => {
        console.log("按类型统计 全网算力数据：", data.data.data);
        let result = data.data.data;
        let xValue = [];
        let yValue = [];
        result.forEach((item, index) => {
          xValue.push(item.datetimeValue);
          yValue.push(item.usedCompute / item.totalCompute);
        });
        this.initEchart(elementId, xValue, yValue);
      });
      if(elementId == 'myConsumption') {
          if (type == 'day') {
              this.indexCon = 2
          } else if (type == 'week') {
              this.indexCon = 1
          }else if (type == 'month') {
              this.indexCon = 0
          }
      }else if (elementId == 'myProfit') {
              if (type == 'day') {
              this.indexPro = 2
          } else if (type == 'week') {
              this.indexPro = 1
          }else if (type == 'month') {
              this.indexPro = 0
          }
          }
    },
      getEarning(elementId,type){
        order.earnings(this.language,type).then(data=>{
            console.log("收益"+data.data.data)
            let result = data.data.data;
            let xValue = [];
            let yValue = [];
            result.forEach((item, index) => {
                xValue.push(item.datetimeValue);
                yValue.push(item.earnings);
            });
            this.initEchart(elementId, xValue, yValue);
        })
      },
      hosts(){
        rancher.hosts(this.language).then(data=>{
            //卖家所有资源
            console.log("卖家所有资源allResources",data.data.data)
            this.allResources=data.data.data
            this.initOil=true
        })
      },

    initTransactionRecords() {
      wallet.getTradeLogCurrentUser(this.language, 0, 0, 10).then(transList => {
        this.tableData = transList.data.data.records;
        console.log(this.tableData);
      });
    },
    formateDate(row, column, cellValue) {
      // return moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
      return cellValue;
    },
    initEchart(elementId, xValue, yValue) {
      let option = {
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
            name: "T",
            type: "category",
            // x轴数值
            data: xValue,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: true,
              symbol: ["none", "arrow"],
              symbolSize: [10, 20],
              symbolOffset: [0, 5],
              lineStyle: {
                color: "#ffffff"
              }
            }
          }
        ],
        yAxis: [
          {
            name: "UracPower(U)",
            type: "value",
            /*axisLabel: {
                          formatter: "{value}"
                      },*/
            axisLine: {
              show: true,
              symbol: ["none", "arrow"],
              symbolSize: [10, 20],
              symbolOffset: [0, 15],
              lineStyle: {
                color: "#ffffff"
              }
            }
          }
        ],
        series: [
          {
            name: "uranus",
            type: "bar",
            barWidth: "30%",
            color: "#1890ff",
            // y轴柱形数值
            data: yValue
          },
          {
            name: "line",
            type: "line",
            color: "#1890ff",
            // y轴连线数值
            data: yValue
          }
        ]
      };
     let myChart = this.$echarts.init(document.getElementById(elementId));
        myChart.setOption(option)
     /* window.onresize = function() {
        myChart1.resize();
      };*/
        window.addEventListener("resize",function(){
            myChart.resize();
        })
    }
  },
    computed: {
        getPercentNumber() {
            //计算百分比 a/b
            return function (a, b) {
                var n = Number(a / b * 100).toFixed(2)
                return Number(n)
            }
        }
    },
  mounted() {
    this.language = auth.getCurLang();
    this.initTransactionRecords();
    this.statisticsGlobalUraPower("myConsumption", "month");
      this.getEarning("myProfit", "day");
      this.hosts()
  }
};
</script>

<style lang="scss" scoped>
.Seller {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1130px;
  width: 100%;
  min-width: 1160px;
  .content-title {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
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
        background: rgba(101, 143, 247, 0);
        box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
        border-radius: 2px;
        color: #ffffff;
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
        background: rgba(101, 143, 247, 0);
        box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
        border-radius: 2px;
        color: #ffffff;
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
      margin-top: 10px;
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 2px;
      color: #ffffff;
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
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 2px;
      color: #ffffff;
      min-width: 1130px;
      margin: 10px auto;
      padding: 30px;
      .record-head {
        height: 40px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        font-size: 16px;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .el-table {
        color: #ffffff;
      }
      .table-head {
        color: #ffffff;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 22px;
        }
      }
      .el-table {
        color: #ffffff;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table /deep/ tr:hover td {
        background-color: rgba(101, 143, 247, 0.2) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
      .el-pagination {
        margin-top: 20px;
      }
      .el-pagination /deep/ .btn-prev {
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
      }
      .el-pagination /deep/ .btn-next {
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
      }
      .el-pagination /deep/ .el-pager li {
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
      }
      .el-pagination /deep/ .el-pager li.active {
        color: #409eff;
      }
    }
  }
}
</style>
