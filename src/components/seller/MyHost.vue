<template>
  <section class="myHost">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog
      :title="$t('seller.host.chooseGroup')"
      :visible.sync="dialogVisible"
      width="550px"
    >
      <el-form>
        <div style="margin-bottom:30px;">
          <el-radio
            v-model="groupJoin"
            :label="$t('seller.host.newGroup')"
          ></el-radio>
          <el-form-item v-show="this.groupJoin==this.$t('seller.host.newGroup')">
            <el-input
              autocomplete="off"
              :placeholder="$t('seller.host.nameGroup')"
              style="width: 515px"
              v-model="newClusterName"
            ></el-input>
            <el-select
              style="width: 515px; margin-top:15px;"
              v-model="rancherId"
              :placeholder="$t('seller.host.region')"
            >
              <template v-if="language === 'zh-cn' ">
                <el-option
                  v-for="(item, index) in rancherLists"
                  :key="index"
                  :label="item.region"
                  :value="item.id"
                ></el-option>
              </template>
              <template v-else>
                <el-option
                  v-for="(item, index) in rancherLists"
                  :key="index"
                  :label="item.regionEnUs"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-radio
            v-model="groupJoin"
            :label="$t('seller.host.joinGroup')"
          ></el-radio>
          <el-form-item v-show="this.groupJoin==this.$t('seller.host.joinGroup')">
            <el-select
              v-model="clusterId"
              style="width: 515px"
              :placeholder="$t('seller.host.existingGroup')"
            >
              <el-option
                v-for="(item, index) in clusterLists"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{$t('seller.host.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="okButtonClick()"
        >{{$t('seller.host.confirm')}}</el-button>
      </span>
    </el-dialog>

    <!-- Add mining machine to user  -->
    <el-dialog
      :title="$t('seller.host.addMachine')"
      :visible.sync="addVisible"
      :close-on-click-modal=false
      :show-close=false
      width="550px"
    >
      <el-input
        type="text"
        :placeholder="$t('seller.host.addInput')"
        v-model="machineId"
        maxlength="15"
        show-word-limit
      >
      </el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="clearMachineId()">{{ $t('seller.host.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="readyAdd()"
        >{{ $t('seller.host.confirm') }}</el-button>
      </span>
      <el-dialog
        :title="$t('seller.host.resMachine')"
        :visible.sync="resVisible"
        :close-on-click-modal=false
        :show-close=false
        append-to-body
        width="550px"
      >
        <span>{{ this.machineText }}</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="endAdd()"
          >{{ $t('seller.host.confirm') }}</el-button>
        </span>
      </el-dialog>
    </el-dialog>

    <!-- Host -->
    <el-row class="myHostHead">
      <el-col
        class="title"
        :span="12"
      >
        <h1>
          <i class="iconfont icon-host"></i>
          {{$t('menu.myHost')}}
        </h1>
      </el-col>
      <el-col
        class="addMac"
        :span="3"
        :offset="7"
      >
        <el-button
          @click="addVisible = true"
          class="addMachine"
        >
          {{ $t('seller.host.addMachine') }}
          <!-- {{ this.balance }} -->
        </el-button>
      </el-col>
    </el-row>
    <el-row class="myHostBox">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <template slot="empty">
          <p
            class="empty-text"
            style="height: 300px; line-height: 300px;"
          >{{$t('seller.host.text')}}</p>
        </template>
        <el-table-column width="50">
          <template slot-scope="scope">
            <div
              class="off"
              v-if="scope.row.state != 'active'"
            >
              <i class="iconfont icon-off"></i>
            </div>
            <div
              class="on"
              v-else
            >
              <i class="iconfont icon-on"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <!--主机状态 state-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p
              class="table-head"
              style="text-align:left;"
            >
              <i class="iconfont icon-table-state"></i>
              {{$t('seller.host.state')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="overflow">{{ scope.row.state}}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="160">
          <!--主机名称 name-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-table-host"></i>
              {{$t('seller.host.number')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="overflow">
              {{ scope.row.name}}
              <br>
              <span
                v-if="scope.row.publicAddress"
                class="network_type"
              >[Extranet]</span>
              <span
                v-else
                class="network_type"
              >[Intranet]</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="150">
          <!--主机类型 矿机-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-machine"></i>
              {{$t('seller.host.type')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="overflow" v-if="scope.row.ltc == 0">{{ $t('seller.host.ordinary') }}</p>
            <p class="overflow" v-if="scope.row.ltc == 1">{{ $t('seller.host.machine') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140">
          <!--主机IP ip-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-table-ip"></i>
              {{$t('seller.host.ip')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="overflow">{{ scope.row.hostIp}}</p>
          </template>
        </el-table-column>
        <el-table-column width="160">
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-cpu"></i> CPU
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.cpuKernelUsed }} {{$t('seller.host.usable.cpu')}}
              <!--已用核数-->
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
              {{ scope.row.cpuKernel }} {{$t('seller.host.have.cpu')}}
              <!--总核数-->
            </p>
            <p
              v-if="scope.row.cpuKernel == null"
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >
              0 {{$t('seller.host.have.cpu')}}
              <!--总核数-->
            </p>
          </template>
        </el-table-column>

        <el-table-column width="160">
          <!--内存-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-memory"></i>
              {{$t('seller.host.memory')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{ scope.row.memUsed}} {{$t('seller.host.usable.memory')}}</p>
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
            >{{ scope.row.mem}} {{$t('seller.host.have.memory')}}</p>
            <p
              v-if="scope.row.mem == null"
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >0 {{$t('seller.host.have.memory')}}</p>
          </template>
        </el-table-column>

        <el-table-column width="160">
          <!--硬盘-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-disk"></i>
              {{$t('seller.host.disk')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{ scope.row.diskUsed }} {{$t('seller.host.usable.disk')}}</p>
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
            >{{ scope.row.disk }} {{$t('seller.host.have.disk')}}</p>
            <p
              v-if="scope.row.disk == null"
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >0 {{$t('seller.host.have.disk')}}</p>
          </template>
        </el-table-column>

        <el-table-column width="160">
          <!--宽带(M)-->
          <template
            slot="header"
            slot-scope="scope"
          >
            <p class="table-head">
              <i class="iconfont icon-network"></i>
              {{$t('seller.host.network')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{ scope.row.networkUsed }} {{$t('seller.host.usable.network')}}</p>
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
            >{{ scope.row.network }} {{$t('seller.host.have.network')}}</p>
            <p
              v-if="scope.row.network == null"
              style="color:#8c8c8c; font-size:10px; margin-left:35px;"
            >0 {{$t('seller.host.have.network')}}</p>
          </template>
        </el-table-column>

        <el-table-column width="200">
          <template
            slot="header"
            slot-scope="scope"
          >
            <el-select
              v-model="inCluster"
              :placeholder="$t('seller.host.all')"
              @change="search()"
            >
              <el-option
                :label="$t('seller.host.all')"
                value="0"
              ></el-option>
              <el-option
                :label="$t('seller.host.joined')"
                value="1"
              ></el-option>
              <el-option
                :label="$t('seller.host.notJoined')"
                value="2"
              ></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              <span v-show="scope.row.clusterId !=''||scope.row.clusterId !=null">{{scope.row.clusterName}}</span>
              <el-button
                class="joinBtn"
                @click="joinButtonClick(scope.row)"
                v-show="scope.row.clusterId ==''||scope.row.clusterId ==null"
              >{{$t('seller.host.join')}}</el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column width="160">
          <template slot-scope="scope">
            <!-- <el-button style="background: rgba(101, 143, 247, 0); box-shadow: inset 0 0 22px 0 #2463ff; border-radius: 3px; border: none; color: #ffffff; margin-left: 35px;"
              v-show="scope.row.state != 'online'"
                @click="outerVisible = true"
            >{{$t('seller.group.deleteHost')}}</el-button>-->
            <el-dropdown
              trigger="click"
              v-show="scope.row.state !== 'online'"
              @command="cacheHostId(scope.row.id)"
            >
              <span class="el-dropdown-link">
                <i
                  class="iconfont icon-table-more"
                  style="color: #ffffff; font-size: 22px;"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{$t('seller.group.deleteHost')}} </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- delete host text box -->
            <el-dialog
              :close-on-click-modal="false"
              :visible.sync="outerVisible"
              width="480px"
            >
              <p>{{$t('seller.host.deleteSure')}} </p>
              <el-dialog
                width="480px"
                :visible.sync="innerVisible"
                append-to-body
              >
                <p>{{$t('seller.group.deleteText1')}} </p>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button
                    type="primary"
                    @click="hostReload()"
                  >{{$t('seller.group.confirm')}}</el-button>
                </div>
              </el-dialog>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="outerVisible = false">{{$t('seller.group.cancel')}}</el-button>
                <el-button
                  type="primary"
                  @click="deleteHost()"
                >{{$t('seller.group.confirm')}}</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col
          :span="8"
          :offset="16"
          style="margin-top: 15px;"
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="pageParam.page"
            :page-size="pageParam.pageSize"
            :total="pageParam.totalRecords"
            @current-change="search()"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import * as rancher from '../../services/RancherService'
import * as auth from '../../services/AuthService'
// import * as account from '../../services/AccountService'
import { Message } from 'element-ui'

export default {
  name: 'MyHost',
  data() {
    return {
      // balance: '',
      addVisible: false,
      resVisible: false,
      machineId: '',
      machineText: this.$t('seller.host.waitAdd'),
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      groupJoin: this.$t('seller.host.newGroup'),
      state: '',
      group: '',
      userId: '',
      inCluster: '',
      tableData: [],
      rancherLists: [],
      clusterLists: [],
      language: 'en-us',
      rancherId: '',
      newClusterName: '',
      clusterName: '',
      hostId: '',
      clusterId: '',
      pageParam: {
        name: '',
        page: 0,
        pageSize: 5,
        totalRecords: 0,
        sort: '',
        sortDesc: true,
        state: ''
      },
      curHost: '',
      selectHostId: 0
    }
  },
  methods: {
    //   window reload for update data
    hostReload() {
      this.innerVisible = false
      this.getHostList()
    },
    // getBalance() {
    //   return account.userBalcnce(this.curLang).then(resPdata => {
    //     let data = resPdata.data.data
    //     this.balance = data.balance
    //   })
    // },
    clearMachineId() {
      this.machineId = ''
      this.addVisible = false
    },
    readyAdd() {
      if (this.machineId != '') {
        this.addVisible = false
        this.resVisible = true
        rancher.bindHost(this.language, this.machineId).then(data => {
          if (data.data.success) {
            this.machineText = this.$t('seller.host.successRes')

          } else {
            this.machineText = data.data.errMsg
          }
        })
      } else {
        this.addVisible = false
        this.resVisible = true
        this.machineText = this.$t('seller.host.emptyRes')
      }
    },
    endAdd() {
      this.resVisible = false
      this.machineId = ''
      this.machineText = '请等待'
    },
    cacheHostId(hostId) {
      this.outerVisible = true
      this.selectHostId = hostId
    },
    getHostList() {
      rancher
        .hostList(this.language, this.pageParam.page, this.pageParam.pageSize)
        .then(data => {
          this.pageParam.page = data.data.data.current
          this.pageParam.totalRecords = data.data.data.total
          this.tableData = data.data.data.records
        })
    },
    rancherList() {
      const param = { networkType: this.curHost.publicAddress ? 'outer' : 'inner' }
      rancher.rancherSearch(this.language, param).then(data => {
        this.rancherLists = data.data.data.records
      })
    },
    clusterList() {
      const param = { networkType: this.curHost.publicAddress ? 'outer' : 'inner' }
      rancher.clusterSearch(this.language, param).then(data => {
        this.clusterLists = data.data.data.records
      })
    },
    addHostToNewCluster() {
      alert(this.rancherId)
      var param = {
        name: this.newClusterName,
        rancherId: this.rancherId
      }
      alert(param.name + '==' + param.rancherId)
      rancher.clusterAdd(this.language, param).then(data => {
        if (data.data.success) {
          this.updatehost()
        } else {
          this.$message({
            showClose: true,
            message: data.data.errMsg,
            type: 'error'
          })
        }
      })
    },
    updatehost() {
      var updateInfo = {
        clusterId: this.clusterId,
        rancherId: this.rancherId,
        state: 'registring'
      }
      rancher.hostModify(this.language, this.hostId, updateInfo).then(data => {
        if (data.data.success) {
          dialogVisible = false
        } else {
          this.$message({
            showClose: true,
            message: data.data.errMsg,
            type: 'error'
          })
        }
      })
    },
    search() {
      var param = {
        scope: this.inCluster,
        ownerId: this.userId,
        page: this.pageParam.page,
        pageSize: this.pageParam.pageSize
      }
      rancher.hostSearch(this.language, param).then(data => {
        this.pageParam.page = data.data.data.current
        this.pageParam.totalRecords = data.data.data.total
        this.tableData = data.data.data.records
      })
    },
    okButtonClick() {
      var param = {
        newCluster: false,
        clusterName: this.newClusterName,
        rancherId: this.rancherId,
        clusterId: 0
      }
      if (this.groupJoin === this.$t('seller.host.newGroup')) {
        // 主机加入新建集群
        if (this.rancherId === '' || this.rancherId == null || this.newClusterName === '' || this.newClusterName == null) {
          this.$message({
            showClose: true,
            message: this.$t('seller.host.clusterFail'),
            type: 'error'
          })
        } else {
          param.newCluster = true
          rancher.joinCluster(this.language, this.hostId, param).then(data => {
            if (data.data.success) {
              this.dialogVisible = false
              this.getHostList()
            } else {
              this.$message({
                showClose: true,
                message: data.data.errMsg,
                type: 'error'
              })
            }
          })
        }
      } else {
        // 主机加入已有集群
        if (this.clusterId === '' || this.clusterId == null) {
          this.$message({
            showClose: true,
            message: this.$t('seller.host.clusterFail'),
            type: 'error'
          })
        } else {
          param.newCluster = false
          param.clusterId = this.clusterId
          rancher.joinCluster(this.language, this.hostId, param).then(data => {
            if (data.data.success) {
              this.dialogVisible = false
              this.getHostList()
            } else {
              this.$message({
                showClose: true,
                message: data.data.errMsg,
                type: 'error'
              })
            }
          })
        }
      }
    },
    deleteHost(id) {
      // 删除主机
      rancher.hostDelete(auth.getCurLang(), this.selectHostId).then(data => {
        // 删除逻辑
        if (data.data.success) {
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
    joinButtonClick(selectedhostInfo) {
      this.hostId = selectedhostInfo.id
      this.curHost = selectedhostInfo

      this.rancherList()
      this.clusterList()
      this.dialogVisible = true
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
    }
  },
  mounted() {
    // this.getBalance()
    this.getHostList()
    this.rancherList()
    this.clusterList()
    this.language = auth.getCurLang()
    this.userId = auth.getCurUserId()
  }
}
</script>

<style lang="scss" scoped>
.myHost {
  background: #000;
  border-radius: 2px;
  width: 100%;
  min-width: 1130px;
  .myHostHead {
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
    .addMac {
      .el-button {
      margin-top: 5px;
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 5px;
      color: #a2a6b0;
    }
    .el-button:hover {
      background: #627100;
      border: 1px solid #627100;
      color: #ffffff;
    }
    }
  }
  .myHostBox {
    background: #161618;
    border-radius: 2px;
    margin: 2px;
    padding: 15px;
    .el-pagination /deep/ .btn-prev {
      background: rgba(36, 99, 255, 0);
      color: #a2a6b0;
    }
    .el-pagination /deep/ .btn-next {
      background: rgba(36, 99, 255, 0);
      color: #a2a6b0;
    }
    .el-pagination /deep/ .el-pager li {
      background: rgba(36, 99, 255, 0);
      color: #a2a6b0;
    }
    .el-pagination /deep/ .el-pager li.active {
      color: #a2ae44;
    }
    p {
      margin-bottom: 0;
    }
    .el-table {
      color: #a2a6b0;
      background-color: rgba(101, 143, 247, 0);
    }
    .el-table::before {
      background: transparent;
    }
    .el-table /deep/ ::-webkit-scrollbar {
      background-color: #000000;
      border-radius: 10px;
      height: 12px;
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
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      font-weight: 400;
    }
    .joinBtn {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 5px;
      color: #a2a6b0;
    }
    .joinBtn :hover {
      background: #627100;
      border: 1px solid #627100;
      color: #ffffff;
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      white-space: nowrap;
      width: 100%;
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
    .on {
      //   background: #51a906;
      //   border: 2px solid #dcdcdc;
      //   width: 12px;
      //   height: 12px;
      //   border-radius: 100%;
      color: #51a906;
    }
    .off {
      //   background: #f25954;
      //   border: 2px solid #dcdcdc;
      //   width: 12px;
      //   height: 12px;
      //   border-radius: 100%;
      color: #f25954;
    }
    .table-head {
      text-align: center;
      color: #a2a6b0;
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
</style>
