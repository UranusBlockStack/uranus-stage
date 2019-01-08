<template>
  <section class="colony">
    <el-row class="colonyHead">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.myColony')}}</h1>
      </el-col>
    </el-row>
    <el-dialog :title="$t('seller.group.settingTitle')" :visible.sync="dialogVisible" width="650px">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$t('seller.group.settingName')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.group.setRent')">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.group.settingTime')">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('seller.group.startingTime')"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('seller.group.endTime')"
                v-model="form.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('seller.group.setRegion')">
            <el-select v-model="form.address" :placeholder="$t('seller.group.setRegion')">
               <el-option :label="$t('seller.group.asia')" value="asia"></el-option>
              <el-option :label="$t('seller.group.europe')" value="europe"></el-option>
              <el-option :label="$t('seller.group.africa')" value="africa"></el-option>
              <el-option :label="$t('seller.group.south')" value="southAmerica"></el-option>
              <el-option :label="$t('seller.group.north')" value="northAmerica"></el-option>
              <el-option :label="$t('seller.group.oceania')" value="oceania"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('seller.group.setState')">
            <el-select v-model="form.state" :placeholder="$t('seller.group.setState')">
              <el-option :label="$t('seller.group.inSale')" value="inSale"></el-option>
              <el-option :label="$t('seller.group.notSale')" value="notSale"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="dialogVisible = false">{{$t('seller.group.confirm')}}</el-button>
            <el-button  @click="dialogVisible = false">{{$t('seller.group.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="outerVisible" width="480px">
      <p>{{$t('seller.group.deleteSure')}}</p>
      <el-dialog width="480px" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('seller.group.deleteText1')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">{{$t('seller.group.confirm')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('seller.group.cancel')}}</el-button>
        <el-button type="primary" @click="outerVisible = false, innerVisible = true">{{$t('seller.group.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-row class="colonyBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>集群A</h1>
        </el-col>
      </el-row>
      <el-row class="rePool">
        <el-col :span="4">
          <div id="restPool"></div>
        </el-col>
        <el-col class="padding-top" :span="5" :offset="1">
          <h4>{{$t('seller.group.earnings')}}888.86URAC</h4>
          <p>{{$t('seller.group.value')}}100URAC/天</p>
          <p>{{$t('seller.group.region')}}{{$t('seller.group.asia')}}</p>
        </el-col>
        <el-col class="padding-top" :span="6">
          <p>{{$t('seller.group.stateSale')}}{{$t('seller.group.inSale')}}</p>
          <p>{{$t('seller.group.operatingStatus')}}{{$t('seller.group.running')}}</p>
          <p>{{$t('seller.group.buyingTime')}}2018/12/12 12:12:12</p>
          <p>{{$t('seller.group.endingTime')}}2019/12/12 12:12:12</p>
        </el-col>
        <el-col class="padding-top" :span="4">
          <p>{{$t('seller.group.restTime')}}{{$t('seller.group.timeup')}}</p>
          <el-button type="success">
            {{$t('seller.group.renewal')}}
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
          <p class="setting" @click="dialogVisible = true">{{$t('seller.group.setting')}}</p>
        </el-col>
        <el-col class="lineBox"></el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <h2>{{$t('seller.group.restOne')}}</h2>
          <div class="restRes">
            <div id="restResource1"></div>
            <div id="restResource2"></div>
            <div id="restResource3"></div>
            <div id="restResource4"></div>
            <div id="restResource5"></div>
          </div>
        </el-col>
      </el-row>
      <el-row class="myHostBox">
        <el-table :data="tableData" style="width: 100%">
          <template slot="empty">
            <p class="empty-text">{{$t('seller.group.text')}}</p>
          </template>
          <el-table-column
            prop="state"
            :label="$t('seller.group.state')"
            sortable
            :filters="[{ text: this.$t('seller.group.online'), value: '在线' }, { text: this.$t('seller.group.offline'), value: '离线' }]"
            :filter-method="filterState"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '在线' ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="number" :label="$t('seller.group.number')"></el-table-column>
          <el-table-column prop="cpu" label="CPU"></el-table-column>
          <el-table-column prop="gpu" label="GPU"></el-table-column>
          <el-table-column prop="memory" :label="$t('seller.group.memory')"></el-table-column>
          <el-table-column prop="disk" :label="$t('seller.group.disk')"></el-table-column>
          <el-table-column prop="network" :label="$t('seller.group.network')"></el-table-column>
          <el-table-column>
            <template>
              <p style="color: #8eb357" @click="outerVisible = true">{{$t('seller.group.deleteHost')}}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import "echarts-liquidfill";

export default {
  name: "ResourcePool",
  data() {
    return {
      tableData: [
        {
          state: "在线",
          number: "主机A",
          cpu: "2核",
          gpu: "2G",
          memory: "2G",
          disk: "1T",
          network: "2M"
        },
        {
          state: "离线",
          number: "主机B",
          cpu: "1核",
          gpu: "2G",
          memory: "2G",
          disk: "1T",
          network: "2M"
        },
        {
          state: "在线",
          number: "主机C",
          cpu: "3核",
          gpu: "2G",
          memory: "2G",
          disk: "1T",
          network: "2M"
        },
        {
          state: "在线",
          number: "主机D",
          cpu: "1核",
          gpu: "2G",
          memory: "2G",
          disk: "1T",
          network: "2M"
        },
        {
          state: "离线",
          number: "主机E",
          cpu: "2核",
          gpu: "2G",
          memory: "2G",
          disk: "2T",
          network: "2M"
        }
      ],
      dialogVisible: false,
      form: {
        name: "",
        price: "",
        date1: "",
        date2: "",
        address: "",
        state: ""
      },
      outerVisible: false,
      innerVisible: false
    };
  },
  methods: {
    filterState(value, row) {
      return row.state === value;
    },
    initEchart() {
      var myChart = this.$echarts.init(document.getElementById("restPool"));
      var myChart1 = this.$echarts.init(
        document.getElementById("restResource1")
      );
      var myChart2 = this.$echarts.init(
        document.getElementById("restResource2")
      );
      var myChart3 = this.$echarts.init(
        document.getElementById("restResource3")
      );
      var myChart4 = this.$echarts.init(
        document.getElementById("restResource4")
      );
      var myChart5 = this.$echarts.init(
        document.getElementById("restResource5")
      );
      myChart.setOption({
        series: [
          {
            type: "liquidFill",
            radius: "85%",
            data: [
              {
                value: 0.5,
                direction: "left",
                itemStyle: {
                  normal: {
                    color: "#1890FF"
                  }
                }
              }
            ],
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: "#156ACF",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, 0.4)",
              shadowBlur: 20
            }
          }
        ]
      });
      myChart1.setOption({
        series: [
          {
            name: "Cpu",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#1890FF", "#f2f2f2"],
            data: [
              {
                value: 68,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|CPU}", "{b|68%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 32 }
            ]
          }
        ]
      });
      myChart2.setOption({
        series: [
          {
            name: "Gpu",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#7FD455", "#f2f2f2"],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|CPU}", "{b|88%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      });
      myChart3.setOption({
        series: [
          {
            name: "内存",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#FACC14", "#f2f2f2"],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|内存}", "{b|62%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      });
      myChart4.setOption({
        series: [
          {
            name: "硬盘",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#658FF7", "#f2f2f2"],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|硬盘}", "{b|88%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      });
      myChart5.setOption({
        series: [
          {
            name: "网络",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#FB8D5B", "#f2f2f2"],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|网络}", "{b|62%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      });
      window.onresize = function() {
        myChart.resize();
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
        myChart5.resize();
      };
    }
  },
  mounted() {
    this.initEchart();
  }
};
</script>

<style lang="scss" scoped>
.colony {
  background: #f2f2f2;
  min-width: 1130px;
  .colonyHead {
    background: #ffffff;
    height: 65px;
    .title {
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #252525;
        line-height: 24px;
        padding-left: 30px;
      }
    }
  }
  .colonyBox {
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 20px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .rePool {
      border-bottom: 1px solid #f2f2f2;
      padding-top: 30px;
      .padding-top {
        padding-top: 35px;
      }
      h1 {
        width: 100%;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
      }
      h4 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
        text-align: left;
      }
      p {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        letter-spacing: 0;
        line-height: 24px;
        text-align: left;
      }
      .setting {
        text-align: right;
        padding-right: 24px;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #8eb357;
        line-height: 24px;
      }
      #restPool {
        height: 190px;
        width: 100%;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #363636;
      line-height: 24px;
      text-align: left;
      padding-left: 30px;
    }
    .restRes {
      border-left: 3px solid #fafafa;
      height: 200px;
      display: flex;
      padding-left: 50px;
      #restResource1,
      #restResource2,
      #restResource3,
      #restResource4,
      #restResource5 {
        height: 200px;
        width: 20%;
      }
    }
    .el-button {
      background: #8eb357;
      border: none;
    }
    .el-dropdown {
      margin: 20px;
      color: #8eb357;
    }
    .myHostBox {
      background: #ffffff;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      margin: 20px;
      padding: 15px;
      min-height: 550px;
      .empty-text {
        width: 470px;
        margin: 30px auto;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #5d5d5d;
        text-align: left;
        line-height: 24px;
      }
    }
  }
}
</style>
