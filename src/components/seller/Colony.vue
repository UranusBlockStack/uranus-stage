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
          :active-text="$t('seller.group.inSale')"
          :inactive-text="$t('seller.group.notSale')"
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
        <el-form :model="tableCluster" label-position="left" label-width="130px">
          <el-form-item :label="$t('seller.group.settingName')">
            <el-input v-model="tableCluster.name"></el-input>
          </el-form-item>
          <p class="rentDay">{{tableCluster.rentPrice}}*1KU*1Day</p>
          <el-form-item :label="$t('seller.group.setRent')">
            <el-input v-model="tableCluster.rentPrice"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.group.settingTime')">
            <!-- <el-col :span="8">
              <el-date-picker
                v-model="tableCluster.dateRange"
                type="daterange"
                :start-placeholder="$t('seller.group.startingTime')"
                :end-placeholder="$t('seller.group.endTime')"
              ></el-date-picker>
            </el-col>-->
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('seller.group.startingTime')"
                :picker-options="startDatePickerOptions"
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
                :picker-options="endDataPickerOptions"
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
            <el-button @click="dialogVisible = false">{{$t('seller.group.cancel')}}</el-button>
            <el-button type="primary" @click="modifyCluster">{{$t('seller.group.confirm')}}</el-button>
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
        <el-col :span="4" class="mouseHover">
          <Water
            v-if="update1"
            :chartData="division(clusterInfo.usedCompute,clusterInfo.totalCompute)"
          />
          <div class="showHover" style="margin-top: -170px;">
            <span>Used</span>
            <span class="spanVal">{{clusterInfo.usedCompute}}</span>
            <span>Total</span>
            <span class="spanVal">{{clusterInfo.totalCompute}}</span>
          </div>
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
          <p v-show="!switchVal" class="setting" @click="dialogVisible = true">
            <i class="iconfont icon-setting"></i>
          </p>
        </el-col>
        <el-col class="lineBox"></el-col>
      </el-row>
      <el-row class="blue-rest">
        <el-col :span="20">
          <h2>{{$t('seller.group.restOne')}}</h2>
          <div class="restRes">
            <div class="mouseHover restResbox">
              <div class="showHover">
                <span>Used</span>
                <span class="spanVal">{{clusterInfo.cpuKernelUsed}}</span>
                <span>Total</span>
                <span class="spanVal">{{clusterInfo.cpuKernel}}</span>
              </div>
              <Cpu
                v-if="update2"
                :chartData="getPercentNumber(this.clusterInfo.cpuKernelUsed,this.clusterInfo.cpuKernel)"
              />
            </div>
            <div class="mouseHover restResbox">
              <div class="showHover">
                <span>Used</span>
                <span class="spanVal">{{clusterInfo.memUsed}}</span>
                <span>Total</span>
                <span class="spanVal">{{clusterInfo.mem}}</span>
              </div>
              <Memory
                v-if="update2"
                :chartData="getPercentNumber(this.clusterInfo.memUsed,this.clusterInfo.mem)"
              />
            </div>
            <div class="mouseHover restResbox">
              <div class="showHover">
                <span>Used</span>
                <span class="spanVal">{{clusterInfo.diskUsed}}</span>
                <span>Total</span>
                <span class="spanVal">{{clusterInfo.disk}}</span>
              </div>
              <Disk
                v-if="update2"
                :chartData="getPercentNumber(this.clusterInfo.diskUsed,this.clusterInfo.disk)"
              />
            </div>
            <div class="mouseHover restResbox">
              <div class="showHover">
                <span>Used</span>
                <span class="spanVal">{{clusterInfo.networkUsed}}</span>
                <span>Total</span>
                <span class="spanVal">{{clusterInfo.network}}</span>
              </div>
              <Network
                v-if="update2"
                :chartData="getPercentNumber(this.clusterInfo.networkUsed,this.clusterInfo.network)"
              />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="myHostBox">
        <el-table :data="tableData" style="width: 100%">
          <template slot="empty">
            <p
              class="empty-text"
              style="height: 300px; line-height: 300px;"
            >{{$t('seller.group.text')}}</p>
          </template>
          <el-table-column width="70">
            <template slot-scope="scope">
              <div :class="scope.row.state == 'active' ? 'on' : 'off'"></div>
              <div class="off" v-if="scope.row.state != 'active'">
                <i class="iconfont icon-off"></i>
              </div>
              <div class="on" v-else>
                <i class="iconfont icon-on"></i>
              </div>
            </template>
          </el-table-column>
          <!--主机状态-->
          <el-table-column width="100">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align: left;">
                <i class="iconfont icon-table-state"></i>
                {{$t('seller.group.state')}}
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
                {{$t('seller.group.number')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow" style="text-align: center;">
                {{ scope.row.name}}
                <br>
                <span v-if="scope.row.publicAddress" class="network_type">[Extranet]</span>
                <span v-else class="network_type">[Intranet]</span>
              </p>
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
                {{ scope.row.cpuKernelUsed }} {{$t('seller.group.usable.cpu')}}
              </p>
              <el-progress
                class="usageGreen"
                v-if="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel) <= 50"
                :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageRed"
                v-else-if="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel) >= 80"
                :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageYellow"
                v-else
                :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                v-if="scope.row.cpuKernel != null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >
                {{ scope.row.cpuKernel }} {{$t('seller.group.have.cpu')}}
                <!--总核数-->
              </p>
              <p
                v-if="scope.row.cpuKernel == null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >
                0 {{$t('seller.group.have.cpu')}}
                <!--总核数-->
              </p>
            </template>
          </el-table-column>
          <!--内存-->
          <el-table-column width="180">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-memory"></i>
                {{$t('seller.group.memory')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.memUsed}} {{$t('seller.group.usable.memory')}}</p>
              <el-progress
                class="usageGreen"
                v-if="getPercentNumber(scope.row.memUsed,scope.row.mem) <= 50"
                :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageRed"
                v-else-if="getPercentNumber(scope.row.memUsed,scope.row.mem) >= 80"
                :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageYellow"
                v-else
                :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                v-if="scope.row.mem != null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.mem}} {{$t('seller.group.have.memory')}}</p>
              <p
                v-if="scope.row.mem == null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >0 {{$t('seller.group.have.memory')}}</p>
            </template>
          </el-table-column>
          <!--硬盘-->
          <el-table-column width="180">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-disk"></i>
                {{$t('seller.group.disk')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.diskUsed }} {{$t('seller.group.usable.disk')}}</p>
              <el-progress
                class="usageGreen"
                v-if="getPercentNumber(scope.row.diskUsed,scope.row.disk) <= 50"
                :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageRed"
                v-else-if="getPercentNumber(scope.row.diskUsed,scope.row.disk) >= 80"
                :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageYellow"
                v-else
                :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                v-if="scope.row.disk != null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.disk }} {{$t('seller.group.have.disk')}}</p>
              <p
                v-if="scope.row.disk == null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >0 {{$t('seller.group.have.disk')}}</p>
            </template>
          </el-table-column>
          <!--宽带(M)-->
          <el-table-column width="180">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-network"></i>
                {{$t('seller.group.network')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.networkUsed }} {{$t('seller.group.usable.network')}}</p>
              <el-progress
                class="usageGreen"
                v-if="getPercentNumber(scope.row.networkUsed,scope.row.network) <= 50"
                :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageRed"
                v-else-if="getPercentNumber(scope.row.networkUsed,scope.row.network) >= 80"
                :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <el-progress
                class="usageYellow"
                v-else
                :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)"
                :stroke-width="18"
                :text-inside="true"
                style="margin-left:35px;"
              ></el-progress>
              <p
                v-if="scope.row.network != null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >{{ scope.row.network }} {{$t('seller.group.have.network')}}</p>
              <p
                v-if="scope.row.network == null"
                style="color:#8c8c8c; font-size:10px; margin-left:35px;"
              >0 {{$t('seller.group.have.network')}}</p>
            </template>
          </el-table-column>
          <!--删除-->
          <el-table-column width="200">
            <template slot-scope="scope">
              <el-button
                style="background: rgba(101, 143, 247, 0); box-shadow: inset 0 0 22px 0 #2463ff; border-radius: 3px; border: none; color: #ffffff; margin-left: 35px;"
                v-show="!switchVal"
                @click="outerVisible = true"
              >{{$t('seller.group.deleteHost')}}</el-button>
              <!-- delete host text box -->
              <el-dialog :close-on-click-modal="false" :visible.sync="outerVisible" width="480px">
                <p>{{$t('seller.group.deleteSure')}}</p>
                <el-dialog width="480px" :visible.sync="innerVisible" append-to-body>
                  <p>{{$t('seller.group.deleteText1')}}</p>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="hostReload">{{$t('seller.group.confirm')}}</el-button>
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
import moment from 'moment'
import RestTime from '@/components/modules/RestTime'
import { Message } from 'element-ui'
import * as rancher from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import Water from '@/components/modules/Water'
import Cpu from '@/components/modules/CPU'
import Disk from '@/components/modules/Disk'
import Memory from '@/components/modules/Memory'
import Network from '@/components/modules/Network'

export default {
  name: 'ResourcePool',
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
      language: '',
      tableData: [],
      clusterInfo: {},
      tableCluster: {},
      dialogVisible: false,
      switchVal: false,
      outerVisible: false,
      innerVisible: false,
      isRouterAlive: true,
      startDatePickerOptions: {},
      endDataPickerOptions: {}
    }
  },
  methods: {
    getHosts() {
      // 获取集群下的所有主机
      rancher.clusterHosts(this.language, this.clusterId).then(data => {
        this.tableData = data.data.data.records
      })
    },
    modifyCluster() {
      // 设置集群
      let newClusterInfo = this.tableCluster
      //   newClusterInfo.beginTime = this.tableCluster.dateRange[0];
      //   newClusterInfo.endTime = this.tableCluster.dateRange[1];
      rancher
        .clusterModify(this.language, this.clusterId, newClusterInfo)
        .then(data => {
          if (data.data.success) {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.dialogVisible = false
            this.getClusterDetail()
          } else {
            this.$message({
              showClose: true,
              message: data.data.errMsg,
              type: 'error'
            })
          }
        })
    },
    deleteHost(id) {
      // 删除主机
      rancher.hostDelete(auth.getCurLang(), id).then(data => {
        // 删除逻辑
        if (data.data.success) {
          this.$message({
            message: 'Success',
            type: 'success'
          })
          this.outerVisible = false
          this.innerVisible = true
        } else {
          this.$message({
            showClose: true,
            message: data.data.errMsg,
            type: 'error'
          })
        }
      })
    },
    hostReload() {
      this.innerVisible = false
      this.getHosts()
    },
    getClusterDetail() {
      rancher.clusterInfo(this.language, this.clusterId).then(data => {
        this.clusterInfo = data.data.data
        this.tableCluster = JSON.parse(JSON.stringify(data.data.data))
        this.setDatePick()
        if (this.tableCluster.online === true) {
          this.switchVal = true
        } else {
          this.switchVal = false
        }
        this.update1 = true
        this.update2 = true
      })
    },
    filterState(value, row) {
      return row.state === value
    },
    // Switching cluster sale state
    onLineClick() {
      if (
        this.tableCluster.rentPrice == null ||
        this.tableCluster.regionEnUs == null ||
        this.tableCluster.beginTime == null ||
        this.tableCluster.endTime == null
      ) {
        this.$message({
          showClose: true,
          message: this.$t('seller.group.clusterFail'),
          type: 'error'
        })
        this.switchVal = !this.switchVal
      } else {
        var action = ''
        if (this.switchVal) {
          action = 'online'
        } else {
          action = 'offline'
        }
        rancher
          .clusterState(this.language, this.clusterId, action)
          .then(data => {
            if (data.data.success) {
              this.$message({
                message: 'Success',
                type: 'success'
              })
              this.switchVal = this.switchVal
            } else {
              this.$message({
                showClose: true,
                message: data.data.errMsg,
                type: 'error'
              })
              this.switchVal = !this.switchVal
            }
          })
      }
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    setDatePick() {
      let that = this
      this.startDatePickerOptions = {
        disabledDate(time) {
          if (
            typeof that.tableCluster.beginTime !== 'undefined' &&
            that.tableCluster.beginTime !== null &&
            that.tableCluster.beginTime !== 0
          ) {
            return (
              time.getTime() > new Date(that.tableCluster.beginTime).getTime()
            )
          } else {
            return time.getTime() < Date.now() - 3600 * 1000 * 24 * 1
          }
        }
      }
      this.endDataPickerOptions = {
        disabledDate(time) {
          if (
            typeof that.tableCluster.endTime !== 'undefined' &&
            that.tableCluster.endTime !== null &&
            that.tableCluster.endTime !== 0
          ) {
            return (
              time.getTime() < new Date(that.tableCluster.endTime).getTime()
            )
          }
        }
      }
    }
  },
  computed: {
    getPercentNumber() {
      // 计算百分比 a/b
      return function (a, b) {
        let n = Number((a / b) * 100).toFixed(2)
        if (isNaN(Number(n)) || !isFinite(Number(n))) {
          n = 0
        }
        return Number(n)
      }
    },
    dateFormat() {
      return function (time) {
        let momentInfo = moment(time)
        if (momentInfo.isValid() === false) {
          return moment(0).format('YYYY-MM-DD hh:mm:ss')
        } else {
          return moment(time).format('YYYY-MM-DD hh:mm:ss')
        }
      }
    },
    division() {
      return function (a, b) {
        let n = a / b
        if (isNaN(Number(n)) || !isFinite(Number(n))) {
          n = 0
        }
        return Number(n)
      }
    }
  },
  mounted() {
    this.clusterId = Number(this.$route.params.resid)
    this.getClusterDetail()
    this.getHosts()
    this.language = auth.getCurLang()
  },
  beforeRouteUpdate(to, from, next) {
    this.clusterId = to.params.resid
    this.getClusterDetail()
    this.getHosts()
    this.reload()
    next()
  }
}
</script>

<style lang="scss" scoped>
.colony {
  background: #000;
  border-radius: 2px;
  width: 100%;
  min-width: 1130px;
  // .el-dialog__wrapper /deep/ .el-dialog {
  //   background: rgba(114, 118, 128, 0.8);
  //   box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
  //   border-radius: 6px;
  // }
  // .el-dialog__wrapper /deep/ .el-button {
  //   background: #627100;
  //   border: 1px solid #627100;
  //   border-radius: 3px;
  //   color: #ffffff;
  // }
  // .el-dialog__wrapper /deep/ .el-button--primary {
  //   background: rgba(114,118,128,0.30);
  //   border: 1px solid rgba(114,118,128,0.30);
  //   border-radius: 3px;
  //   color: #ffffff;
  // }
  // .el-dialog__wrapper /deep/ .el-input__inner {
  //   background: #1d1e23;
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   border-radius: 4px;
  //   color: #a2a6b0;
  //   opacity: 0.6;
  // }
  .rentDay {
    color: #8eb357;
    text-align: right;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin: 0;
    padding: 0;
  }
  .colonyHead {
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
  }
  .colonyBox {
    .showHover {
      text-align: center;
      color: #a2a6b0;
      visibility: hidden;
      height: 30px;
      span {
        display: inline-block;
        height: 30px;
        width: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .spanVal {
        width: 45px;
      }
    }
    .mouseHover:hover {
      .showHover {
        visibility: visible;
        transition: 1.5s;
      }
    }
    .title {
      background: #161618;
      border-radius: 2px;
      height: 50px;
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
    .rePool {
      background: #161618;
      border-radius: 2px;
      margin: 2px;
      padding-top: 30px;
      height: 250px;
      .padding-top {
        padding-top: 5px;
      }
      h1 {
        width: 100%;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        line-height: 24px;
      }
      h4 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        font-weight: bold;
        line-height: 24px;
        text-align: left;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
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
      margin: 2px;
      background: #161618;
      border-radius: 2px;
      h2 {
        color: #a2a6b0;
      }
    }
    .restRes {
      height: 250px;
      display: flex;
      padding-left: 50px;
      .restResbox {
        height: 220px;
        width: 100%;
      }
    }
    .el-dropdown {
      margin: 20px;
      color: #8eb357;
    }
    .myHostBox {
      margin: 2px;
      background: #161618;
      border-radius: 2px;
      padding: 15px;
      min-height: 550px;
      p {
        margin-bottom: 0;
      }
      .el-table {
        color: #a2a6b0;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table::before {
        background: rgba(255, 255, 255, 0.1);
      }
      .el-table /deep/ ::-webkit-scrollbar {
        background-color: #000000;
        height: 12px;
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      .el-table /deep/ ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #25262f;
        border: 2px solid #000000;
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
        color: #a2a6b0;
        text-align: left;
        line-height: 24px;
      }
      .el-progress /deep/ .el-progress-bar__outer {
        background: #333440 !important;
        border-radius: 0;
      }
      .el-progress /deep/ .el-progress-bar__innerText {
        color: #727680;
      }
      .usageGreen /deep/ .el-progress-bar__inner {
        background: #51a906 !important;
        border-radius: 0;
      }
      .usageYellow /deep/ .el-progress-bar__inner {
        background: #facc14 !important;
        border-radius: 0;
      }
      .usageRed /deep/ .el-progress-bar__inner {
        background: #ff5640 !important;
        border-radius: 0;
      }
      /*.el-progress /deep/ .el-progress-bar__outer {
        background: #1890ff !important;
        border-radius: 0;
      }
      .el-progress /deep/ .el-progress-bar__inner {
        background: #f25954 !important;
        border-radius: 0;
      }*/
      .on {
        color: #51a906;
      }
      .off {
        color: #f25954;
      }
      .table-head {
        color: #a2a6b0;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        text-align: center;
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
