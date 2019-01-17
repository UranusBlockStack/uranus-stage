<template>
  <section class="colony">
    <el-row class="colonyHead">
      <el-col class="title" :span="12">
        <h1><i class="iconfont icon-host1"></i>{{$t('menu.myColony')}}</h1>
      </el-col>
    </el-row>
    <!-- Confirmation Information Bullet Box -->
    <el-dialog :title="$t('seller.group.settingTitle')" :close-on-click-modal = false :visible.sync="dialogVisible" width="650px">
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
            <el-button type="primary" @click="dialogVisible = false">{{$t('seller.group.confirm')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('seller.group.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>

    <!-- delete text box -->
    <el-dialog :close-on-click-modal = false :visible.sync="outerVisible" width="480px">
      <p>{{$t('seller.group.deleteSure')}}</p>
      <el-dialog width="480px" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('seller.group.deleteText1')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">{{$t('seller.group.confirm')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('seller.group.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="outerVisible = false, innerVisible = true"
        >{{$t('seller.group.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- colony -->
    <el-row class="colonyBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('menu.myColony1')}}</h1>
        </el-col>
      </el-row>
      <el-row class="rePool">
        <el-col :span="4">
          <Water :chartData="0.5"/>
        </el-col>
        <el-col class="padding-top" :span="7" :offset="1">
          <h4>{{$t('seller.group.earnings')}} 888.86 URAC</h4>
          <p>{{$t('seller.group.value')}} 100URAC/天</p>
          <p>{{$t('seller.group.region')}} {{$t('seller.group.asia')}}</p>
          <p>{{$t('seller.group.stateSale')}} {{$t('seller.group.inSale')}}</p>
        </el-col>
        <el-col class="padding-top" :span="8">
          <h4>{{$t('seller.group.restTime')}} {{$t('seller.group.timeup')}}</h4>
          <p>{{$t('seller.group.operatingStatus')}} {{$t('seller.group.running')}}</p>
          <p>{{$t('seller.group.buyingTime')}} 2018/12/12 12:12:12</p>
          <p>{{$t('seller.group.endingTime')}} 2019/12/12 12:12:12</p>
        </el-col>
        <el-col :span="4">
          <p class="setting" @click="dialogVisible = true">
            <i class="iconfont icon-setting"></i>
          </p>
        </el-col>
        <el-col class="lineBox"></el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <h2>{{$t('seller.group.restOne')}}</h2>
          <div class="restRes">
            <div id="restResource1"></div>
            <div id="restResource3"></div>
            <div id="restResource4"></div>
            <div id="restResource5"></div>
          </div>
        </el-col>
      </el-row>
      <el-row class="myHostBox">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p class="empty-text">{{$t('seller.host.text')}}</p>
        </template>
        <el-table-column width="70">
          <template slot-scope="scope">
            <div :class="scope.row.state == 'Offline' ? 'on' : 'off'"></div>
          </template>
        </el-table-column>
        <el-table-column width="150" prop="number">
          <template slot="header" slot-scope="scope">
            <p class="table-head" style="text-align: left;">
              <i class="iconfont icon-resource-market"></i>
              {{$t('seller.host.number')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu"></i> CPU
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >{{ scope.row.cpu }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :text-inside="true" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-memory"></i>
              {{$t('seller.host.memory')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >{{ scope.row.memory }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-disk"></i>
              {{$t('seller.host.disk')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >{{ scope.row.disk }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-network"></i>
              {{$t('seller.host.network')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >{{ scope.row.network }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope">
              <p
                style="color: #8eb357; text-align:center;"
                @click="outerVisible = true"
              >{{$t('seller.group.deleteHost')}}</p>
            </template>
          </el-table-column>
      </el-table>
    </el-row>
    </el-row>
  </section>
</template>

<script>
import Water from "@/components/modules/Water"

export default {
  name: "ResourcePool",
  components: {
      Water
  },
  data() {
    return {
      tableData: [
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " A",
          cpu: "2核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " A"
        },
        {
          state: this.$t("seller.host.offline"),
          number: this.$t("seller.host.hosts") + " A",
          cpu: "1核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " C"
        },
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " C",
          cpu: "3核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " D"
        },
        {
          state: this.$t("seller.host.offline"),
          number: this.$t("seller.host.hosts") + " D",
          cpu: "1核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " B"
        },
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " E",
          cpu: "2核",
          memory: "2G",
          disk: "2T",
          network: "2M",
          colony: this.$t("seller.host.group") + " B"
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
      var myChart1 = this.$echarts.init(
        document.getElementById("restResource1")
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
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
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
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
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
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
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
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
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
        myChart1.resize();
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
    height: 50px;
    .title {
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
  }
  .colonyBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 10px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 50px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 50px;
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
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
      }
      h4 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #363636;
        font-weight: bold;
        line-height: 24px;
        text-align: left;
      }
      p {
       font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #363636;
        letter-spacing: 0;
        line-height: 24px;
        text-align: left;
      }
      .setting {
        text-align: right;
        padding-right: 24px;
        font-family: Source-Sans-Pro-Bold;
        color: #8eb357;
        line-height: 24px;
        i {
          font-size: 25px;
        }
      }
      #restPool {
        height: 190px;
        width: 100%;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: Source-Sans-Pro-Bold;
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
    border-radius: 2px;
    margin: 20px;
    padding: 15px;
    min-height: 550px;
    p {
      margin-bottom: 0;
    }
    .empty-text {
      width: 470px;
      margin: 30px auto;
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #5d5d5d;
      text-align: left;
      line-height: 24px;
    }
    .el-progress /deep/ .el-progress-bar__outer {
      background: #1890ff !important;
      border-radius: 0;
    }
    .el-progress /deep/ .el-progress-bar__inner {
      background: #f25954 !important;
      border-radius: 0;
    }
    .on {
      background: #9bcc3d;
      border: 2px solid #dcdcdc;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      float: right;
    }
    .off {
      background: #f2f2f2;
      border: 2px solid #dcdcdc;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      float: right;
    }
    .table-head {
      color: #363636;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        text-align: center;
        i {
            font-size: 26px;
        }
    }
    .el-select /deep/ .el-input__suffix {
      right: 10px;
    }
  }
}}
</style>
