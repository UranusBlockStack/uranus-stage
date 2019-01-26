  <template>
  <section class="colony" v-if="isRouterAlive">
    <el-row class="colonyHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-cluster"></i>
          {{$t('menu.myColony')}}
        </h1>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-switch
          style="margin-top: 15px;"
          v-model="switchVal"
          :active-text="$t('seller.group.notSale')"
          :inactive-text="$t('seller.group.inSale')"
          @change="onLineClick()"
        ></el-switch>
      </el-col>
    </el-row>
    <!-- Confirmation Information Bullet Box -->
    <el-dialog
      :title="$t('seller.group.settingTitle')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="650px"
    >
      <span>
        <el-form :model="tableCluster" label-position="left" label-width="100px">
          <el-form-item :label="$t('seller.group.settingName')">
            <el-input v-model="tableCluster.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.group.setRent')">
            <el-input v-model="tableCluster.rentPrice"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.group.settingTime')">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('seller.group.startingTime')"
                v-model="tableCluster.beginTime"
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
                v-model="tableCluster.endTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- <el-form-item :label="$t('seller.group.setRegion')">
            <el-select
              v-model="tableCluster.regionEnUs"
              :placeholder="$t('seller.group.setRegion')"
            >
              <el-option :label="$t('seller.group.asia')" value="asia"></el-option>
              <el-option :label="$t('seller.group.europe')" value="europe"></el-option>
              <el-option :label="$t('seller.group.africa')" value="africa"></el-option>
              <el-option :label="$t('seller.group.south')" value="southAmerica"></el-option>
              <el-option :label="$t('seller.group.north')" value="northAmerica"></el-option>
              <el-option :label="$t('seller.group.oceania')" value="oceania"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = false">{{$t('seller.group.confirm')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('seller.group.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>

    <!-- colony -->
    <el-row class="colonyBox">
      <el-row class="rePool">
        <el-col class="title" :span="24">
          <h1>{{clusterInfo.name}}</h1>
        </el-col>
        <el-col :span="4">
          <Water
            v-if="update1"
            :chartData="division(clusterInfo.usedCompute,clusterInfo.totalCompute)"
          />
        </el-col>
        <el-col class="padding-top" :span="5" :offset="1">
          <h4>{{$t('seller.group.earnings')}} {{clusterInfo.profit}}</h4>
          <p
            v-if="clusterInfo.rentPrice != null"
          >{{$t('seller.group.value')}} {{clusterInfo.rentPrice}}</p>
          <p v-if="clusterInfo.rentPrice == null">{{$t('seller.group.value')}} -- --</p>
          <p>{{$t('seller.group.region')}} {{clusterInfo.regionEnUs}}</p>
        </el-col>
        <el-col class="padding-top" :span="12">
          <!-- <h4>
            {{$t('seller.group.restTime')}}
            <RestTime style="display: inline-block" :endTime="dateFormat(clusterInfo.endTime)"/>
          </h4>-->
          <p style="margin-top: 15px;">{{$t('seller.group.state')}}: {{clusterInfo.state}}</p>
          <p
            v-if="clusterInfo.beginTime != null"
          >{{$t('seller.group.buyingTime')}} {{dateFormat(clusterInfo.beginTime)}}</p>
          <p v-if="clusterInfo.beginTime == null">{{$t('seller.group.buyingTime')}} -- --</p>
          <p
            v-if="clusterInfo.endTime != null"
          >{{$t('seller.group.endingTime')}} {{dateFormat(clusterInfo.endTime)}}</p>
          <p v-if="clusterInfo.endTime == null">{{$t('seller.group.endingTime')}} -- --</p>
        </el-col>
        <el-col :span="2">
          <p v-show="switchVal" class="setting" @click="dialogVisible = true">
            <i class="iconfont icon-setting"></i>
          </p>
        </el-col>
        <el-col class="lineBox"></el-col>
      </el-row>
      <el-row class="blue-rest">
        <el-col :span="20">
          <h2>{{$t('seller.group.restOne')}}</h2>
          <div class="restRes">
            <Cpu
              v-if="update2"
              :chartData="getPercentNumber(this.clusterInfo.cpuKernelUsed,this.clusterInfo.cpuKernel)"
            />
            <Memory
              v-if="update2"
              :chartData="getPercentNumber(this.clusterInfo.memUsed,this.clusterInfo.mem)"
            />
            <Disk
              v-if="update2"
              :chartData="getPercentNumber(this.clusterInfo.diskUsed,this.clusterInfo.disk)"
            />
            <Network
              v-if="update2"
              :chartData="getPercentNumber(this.clusterInfo.networkUsed,this.clusterInfo.network)"
            />
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
              <div :class="scope.row.state == 'active' ? 'on' : 'off'"></div>
            </template>
          </el-table-column>
          <!--主机状态-->
          <el-table-column width="100">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align: left;">
                <i class="iconfont icon-table-state"></i>
                {{$t('seller.host.state')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.state}}</p>
            </template>
          </el-table-column>
          <!--主机名称-->
          <el-table-column width="220">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-host"></i>
                {{$t('seller.host.number')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.name}}</p>
            </template>
          </el-table-column>
          <!--cpu-->
          <el-table-column width="180">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-cpu"></i> CPU
              </p>
            </template>
            <template slot-scope="scope">
              <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                <!--已用核数-->
                {{ scope.row.cpuKernelUsed }} {{$t('seller.host.usable.cpu')}}
              </p>
              <el-progress
                :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.cpuKernel }} {{$t('seller.host.have.cpu')}}
                <!--总核数-->
              </p>
            </template>
          </el-table-column>
          <!--内存-->
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
              >{{ scope.row.memUsed}} {{$t('seller.host.usable.memory')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.mem}} {{$t('seller.host.have.memory')}}</p>
            </template>
          </el-table-column>
          <!--硬盘-->
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
              >{{ scope.row.diskUsed }} {{$t('seller.host.usable.disk')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.disk }} {{$t('seller.host.have.disk')}}</p>
            </template>
          </el-table-column>
          <!--宽带(M)-->
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
              >{{ scope.row.networkUsed }} {{$t('seller.host.usable.network')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.networkUsed }} {{$t('seller.host.have.network')}}</p>
            </template>
          </el-table-column>
          <!--删除-->
          <el-table-column width="200">
            <template slot-scope="scope">
              <el-button
                style="background: rgba(101, 143, 247, 0); box-shadow: inset 0 0 22px 0 #2463ff; border-radius: 3px; border: none; color: #ffffff; margin-left: 35px;"
                v-show="switchVal"
                @click="outerVisible = true"
              >{{$t('seller.group.deleteHost')}}</el-button>
              <!-- delete host text box -->
              <el-dialog :close-on-click-modal="false" :visible.sync="outerVisible" width="480px">
                <p>{{$t('seller.group.deleteSure')}}</p>
                <el-dialog width="480px" :visible.sync="innerVisible" append-to-body>
                  <p>{{$t('seller.group.deleteText1')}}</p>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="winReload">{{$t('seller.group.confirm')}}</el-button>
                  </div>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="outerVisible = false">{{$t('seller.group.cancel')}}</el-button>
                  <el-button
                    type="primary"
                    @click="deleteHost(scope.row.id)"
                  >{{$t('seller.group.confirm')}}</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import RestTime from "@/components/modules/RestTime";
import { Message } from "element-ui";
import * as rancher from "../../services/RancherService";
import * as auth from "../../services/AuthService";
import Water from "@/components/modules/Water";
import Cpu from "@/components/modules/CPU";
import Disk from "@/components/modules/Disk";
import Memory from "@/components/modules/Memory";
import Network from "@/components/modules/Network";

export default {
  name: "ResourcePool",
  components: {
    Water,
    Cpu,
    Disk,
    Memory,
    Network,
    RestTime
  },
  data() {
    return {
      update1: false,
      update2: false,
      clusterId: 0,
      language: "",
      tableData: [],
      clusterInfo: {},
      tableCluster: {},
      dialogVisible: false,
      switchVal: true,
      outerVisible: false,
      innerVisible: false,
      isRouterAlive: true
    };
  },
  methods: {
    getHosts() {
      //获取集群下的所有主机
      rancher.clusterHosts(this.language, this.clusterId).then(data => {
        console.log("hosts====", data);
        this.tableData = data.data.data.records;
      });
    },
    deleteHost(id) {
      //删除主机
      rancher.hostDelete(auth.getCurLang(), id).then(data => {
        console.log("delete ===", data);
        //删除逻辑
        this.outerVisible = false;
        this.innerVisible = true;
      });
    },
    winReload(cond) {
      window.location.reload();
    },
    getClusterDetail() {
      rancher.clusterInfo(this.language, this.clusterId).then(data => {
        console.log("detail", data);
        this.clusterInfo = data.data.data;
        this.tableCluster = JSON.parse(JSON.stringify(data.data.data));
        // if (this.tableCluster.beginTime == null || this.tableCluster.beginTime == '') {
        //     this.tableCluster.dateRange = ''
        // } else {
        //     this.tableCluster.dateRange = [this.tableCluster.beginTime,this.tableCluster.endTime]
        // }
        if (this.tableCluster.state == "online") {
          this.switchVal = false;
        } else {
          this.switchVal = true;
        }
        this.update1 = true;
        this.update2 = true;
      });
    },
    filterState(value, row) {
      return row.state === value;
    },
    // Switching cluster sale state
    onLineClick() {
      var action = "";
      if (this.switchVal) {
        action = "offline";
      } else {
        action = "online";
      }
      rancher.clusterState(this.language, this.clusterId, action).then(data => {
        console.log(data.data);
        if (data.data.success) {
          this.$message({
            message: "Success",
            type: "success"
          });
          this.switchVal = this.switchVal;
        } else {
          this.$message(data.data.errMsg);
          this.switchVal = !this.switchVal;
        }
      });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  computed: {
    getPercentNumber() {
      //计算百分比 a/b
      return function(a, b) {
        var n = Number((a / b) * 100).toFixed(2);
        if (isNaN(Number(n)) || !isFinite(Number(n))) {
          n = 0;
        }
        return Number(n);
      };
    },
    dateFormat() {
      return function(time) {
        let momentInfo = moment(time);
        if (momentInfo.isValid() == false) {
          return moment(0).format("YYYY-MM-DD hh:mm:ss");
        } else {
          return moment(time).format("YYYY-MM-DD hh:mm:ss");
        }
      };
    },
    division() {
      return function(a, b) {
        var n = a / b;
        if (isNaN(Number(n)) || !isFinite(Number(n))) {
          n = 0;
        }
        return Number(n);
      };
    }
  },
  mounted() {
    this.clusterId = Number(this.$route.params.resid);
    console.log("id======" + this.clusterId);
    this.getClusterDetail();
    this.getHosts();
    this.language = auth.getCurLang();
    console.log(this.language);
  },
  beforeRouteUpdate(to, from, next) {
    this.clusterId = to.params.resid;
    this.getClusterDetail();
    this.getHosts();
    this.reload();
    next();
  }
};
</script>

<style lang="scss" scoped>
.colony {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  width: 100%;
  min-width: 1130px;
  .colonyHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    .title {
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
  }
  .colonyBox {
    .title {
      background: rgba(101, 143, 247, 0);
      border-radius: 4px 4px 0 0;
      height: 50px;
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
    .rePool {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 2px;
      margin: 10px;
      padding-top: 30px;
      .padding-top {
        padding-top: 5px;
      }
      h1 {
        width: 100%;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
      }
      h4 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        font-weight: bold;
        line-height: 24px;
        text-align: left;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 24px;
        text-align: left;
      }
      .setting {
        text-align: right;
        padding-right: 50px;
        font-family: Source-Sans-Pro-Bold;
        color: #1890ff;
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
    .blue-rest {
      margin: 10px;
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 2px;
      h2 {
        color: #ffffff;
      }
    }
    .restRes {
      height: 200px;
      display: flex;
      padding-left: 50px;
    }
    .el-dropdown {
      margin: 20px;
      color: #8eb357;
    }
    .myHostBox {
      margin: 10px;
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 2px;
      padding: 15px;
      min-height: 550px;
      p {
        margin-bottom: 0;
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
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .empty-text {
        width: 470px;
        margin: 30px auto;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
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
        background: #51a906;
        border: 2px solid #dcdcdc;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        float: right;
      }
      .off {
        border: 2px solid #dcdcdc;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        float: right;
      }
      .table-head {
        color: #ffffff;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 23px;
        }
      }
      .el-select /deep/ .el-input__suffix {
        right: 10px;
      }
    }
  }
}
</style>
