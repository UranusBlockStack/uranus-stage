  <template>
  <section class="colony">
    <el-row class="colonyHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-cluster"></i>
          {{$t('menu.myColony')}}
        </h1>
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
    <el-dialog :close-on-click-modal="false" :visible.sync="outerVisible" width="480px">
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
      <el-row class="rePool">
        <el-col class="title" :span="24">
          <h1>{{$t('menu.myColony1')}}</h1>
        </el-col>
        <el-col :span="4">
          <Water
            v-if="update1"
            :chartData="division(clusterInfo.usedCompute,clusterInfo.totalCompute)"
          />
        </el-col>
        <el-col class="padding-top" :span="7" :offset="1">
          <h4>{{$t('seller.group.earnings')}} {{clusterInfo.profit}} URAC</h4>
          <p>{{$t('seller.group.value')}} {{clusterInfo.rentPrice}}URAC/天</p>
          <p>{{$t('seller.group.region')}} {{clusterInfo.region}}</p>
          <template v-if="clusterInfo.state== 'online'">
            <p>{{$t('seller.group.stateSale')}} {{$t('seller.group.inSale')}}</p>
          </template>
          <template v-else>
            <p>{{$t('seller.group.stateSale')}} 未上架</p>
          </template>
        </el-col>
        <el-col class="padding-top" :span="8">
          <h4>
            {{$t('seller.group.restTime')}}
            <RestTime :endTime="dateFormat(clusterInfo.endTime)"/>111
          </h4>
          <template v-if="clusterInfo.state== 'online' || clusterInfo.state== 'active'">
            <p>{{$t('seller.group.operatingStatus')}} {{$t('seller.group.running')}}</p>
          </template>
          <template v-else>
            <p>{{$t('seller.group.operatingStatus')}} 未运行</p>
          </template>
          <p>{{$t('seller.group.buyingTime')}} {{dateFormat(clusterInfo.beginTime)}}</p>
          <p>{{$t('seller.group.endingTime')}} {{dateFormat(clusterInfo.endTime)}}</p>
        </el-col>
        <el-col :span="4">
          <p class="setting" @click="dialogVisible = true">
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
              <div :class="scope.row.state == 'Offline' ? 'off' : 'on'"></div>
            </template>
          </el-table-column>

          <!--主机名称-->
          <el-table-column width="220">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align: left;">
                <i class="iconfont icon-resource-market"></i>
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
                {{ scope.row.cpuKernelUsed }}{{$t('seller.host.usable')}}
              </p>
              <el-progress
                :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.cpuKernel }}{{$t('seller.host.have')}}
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
              >{{ scope.row.memUsed}}{{$t('seller.host.usable')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)"
                :stroke-width="18"
                :show-text="false"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.mem}}{{$t('seller.host.have')}}</p>
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
              >{{ scope.row.diskUsed }}{{$t('seller.host.usable')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)"
                :stroke-width="18"
                :show-text="false"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.disk }}{{$t('seller.host.have')}}</p>
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
              >{{ scope.row.networkUsed }}{{$t('seller.host.usable')}}</p>
              <el-progress
                :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)"
                :stroke-width="18"
                :show-text="false"
                style="margin-left:35px;"
              ></el-progress>
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.networkUsed }}{{$t('seller.host.have')}}</p>
            </template>
          </el-table-column>
          <!--删除-->
          <el-table-column width="200">
            <template slot-scope="scope">
              <el-button
                @click="deleteHost(scope.row.id)"
              >{{$t('seller.group.deleteHost')}}</el-button>
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
    Network
  },
  data() {
    return {
      update1: false,
      update2: false,
      clusterId: 0,
      language: "",
      tableData: [],
      clusterInfo: {},
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
    getHosts() {
      //获取集群下的所有主机
      rancher.clusterHosts(this.language, this.clusterId).then(data => {
        console.log("hosts====", data);
        this.tableData = data.data.data.records;
      });
    },

    deleteHost(id) {
      //删除主机
      rancher.hostDelete(auth.getCurLang()).then(data => {
        console.log(data);
        //删除逻辑
        this.outerVisible = true;
      });
    },
    getClusterDetail() {
      rancher.clusterInfo(this.language, this.clusterId).then(data => {
        console.log("detail", data);
        this.clusterInfo = data.data.data;
        this.update1 = true;
        this.update2 = true;
      });
    },
    filterState(value, row) {
      return row.state === value;
    }
  },
  computed: {
    getPercentNumber() {
      //计算百分比 a/b
      return function(a, b) {
        var n = Number((a / b) * 100).toFixed(2);
        return Number(n);
      };
    },
    dateFormat() {
      return function(time) {
        return moment(time).format("YYYY-MM-DD hh:mm:ss");
      };
    },
    division() {
      return function(a, b) {
        var n = a / b;
        console.log("water is" + Number(n));
        if (isNaN(Number(n))) {
          console.log("nnnnnn" + Number(n));
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
        padding-right: 24px;
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
        color: #ffffff;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 23px;
        }
      }
      .el-button {
        background: rgba(101, 143, 247, 0);
        box-shadow: inset 0 0 22px 0 #2463ff;
        border-radius: 3px;
        border: none;
        color: #ffffff;
        margin-left: 35px;
      }
      .el-select /deep/ .el-input__suffix {
        right: 10px;
      }
    }
  }
}
</style>
