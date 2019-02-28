<template>
  <section class="resourceMarket">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog
      :title="$t('buyer.resourceMarket.confirmTitle')"
      :close-on-click-modal="false"
      :visible.sync="outerVisible"
      width="800px"
    >
      <el-table :data="gridData">
        <el-table-column property="orderNo">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-id"></i>
              {{$t('buyer.resourceMarket.orderNumber')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column property="buyerAccount">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-address"></i>
              {{$t('buyer.resourceMarket.address')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column property="orderAmount">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-table-value"></i>
              {{$t('buyer.resourceMarket.value')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column property="prodType">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-table-type"></i>
              {{$t('buyer.resourceMarket.content')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-table-fee"></i>
              {{$t('buyer.resourceMarket.fee')}}
            </p>
          </template>
          <template slot-scope="scope">
            <el-input-number size="mini" v-model="fee" :precision="6" :step="0.000001" :max="10"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="code">
        <span slot="label">{{$t('buyer.resourceMarket.code')}}</span>
        <el-input :placeholder="$t('buyer.resourceMarket.codeIn')" v-model="concode"></el-input>
        <el-button :class="{'is-disabled': !this.canClick}" @click="countDown">{{content}}</el-button>
      </div>
      <p>{{$t('buyer.resourceMarket.confirmText1')}}</p>
      <p>{{$t('buyer.resourceMarket.confirmText2')}}</p>
      <el-dialog
        :title="$t('buyer.resourceMarket.confirmText3')"
        width="800px"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="innerVisible = false"
          >{{$t('buyer.resourceMarket.button2')}}</el-button>
        </div>
      </el-dialog>
      <TimeOver style="margin-left: 250px;" v-on:listentimeOver="closeDialog"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('buyer.resourceMarket.button1')}}</el-button>
        <el-button type="primary" @click="startTransfer">{{$t('buyer.resourceMarket.button2')}}</el-button>
      </div>
    </el-dialog>

    <!-- purchase -->
    <el-row class="resourceHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-resource-market"></i>
          {{$t('menu.resourceMarket')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="resourceBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.resourceMarket.purchase')}}</h1>
        </el-col>
      </el-row>
      <el-row class="margin-top">
        <el-col :span="23" :offset="1">
          <el-form label-width="140px">

            <el-row class="margin-top">
                <el-col :span="18">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-name"></i>
                    {{$t('buyer.resourceMarket.resourceName')}}
                  </span>
                  <el-input
                    v-model="deployForm.projectName"
                    style="width:350px;"
                    :placeholder="$t('buyer.resourceMarket.creatResource')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row  class="margin-top">
                <el-col :span="10">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-region"></i>
                    {{$t('buyer.resourceMarket.region')}}
                  </span>
                  <el-select v-model="deployForm.rancherId" @change="setRegionSelectValue">
                    <el-option
                      v-for="item in regionSel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="10">
                    <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-attributes"></i>
                    {{$t('buyer.resourceMarket.attributes')}}
                  </span>
                        <el-select v-model="deployForm.innerOuter">
                            <el-option
                                    v-for="item in networkTypeSel"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row   class="margin-top">
              <el-col :span="10">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-cpu"></i>
                    {{$t('buyer.resourceMarket.cpu')}}
                  </span>
                  <el-select v-model="deployForm.cpuKernel">
                    <el-option
                      v-for="item in cpuSel"
                      :key="item.value"
                      :label="item.label + item.unit"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-disk"></i>
                    {{$t('buyer.resourceMarket.disk')}}
                  </span>
                  <el-select v-model="deployForm.disk">
                    <el-option
                      v-for="item in diskSel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="margin-top">
              <el-col :span="10">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-memory"></i>
                    {{$t('buyer.resourceMarket.memory')}}
                  </span>
                  <el-select v-model="deployForm.mem">
                    <el-option
                      v-for="item in memorySel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-network"></i>
                    {{$t('buyer.resourceMarket.network')}}
                  </span>
                  <el-select v-model="deployForm.network">
                    <el-option
                      v-for="item in networkSel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row   class="margin-top">
              <el-col :span="12">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-time"></i>
                    {{$t('buyer.resourceMarket.timeScreening')}}
                  </span>
                  <el-col :span="18">
                    <el-date-picker
                      type="daterange"
                      :start-placeholder="$t('buyer.deploy.startingTime')"
                      :end-placeholder="$t('buyer.deploy.endTime')"
                      range-separator="-"
                      v-model="deployForm.dateRange"
                      style="width: 100%;"
                      :picker-options="startDatePickerOptions"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>


          </el-form>
        </el-col>
      </el-row>

      <el-row class="button">
        <el-col :span="6" :offset="10">
          <el-button type="success" @click="purchaseUraPower">{{$t('buyer.resourceMarket.confirm')}}</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import TimeOver from '@/components/modules/TimeOver'
import * as auth from '../../services/AuthService'
import * as account from '../../services/AccountService'
import * as rancher from '../../services/RancherService'
import * as order from '../../services/OrderService'
import * as wallet from '../../services/WalletService'
import {
  ServerConfigData,
  WrapDropDownData,
  WrapDropDownDataUnit
} from '../../store/rancher_info'

export default {
  name: 'ResourceMarket',
  components: {
    TimeOver
  },
  data() {
    return {
      content: this.$t('buyer.resourceMarket.codeBtn'),
      totalTime: 60,
      canClick: true,
      deployForm: {
        projectName: '',
        rancherId: 2,
        cpuKernel: '4',
        disk: '512G',
        mem: '16',
        network: '512G',
        dateRange: '',
        deployStatus: '',
        innerOuter: ''
      },
      regionSel: [],
      cpuSel: [],
      diskSel: [],
      memorySel: [],
      networkSel: [],
      networkTypeSel: [],
      value: '',
      time1: '',
      time2: '',
      input: '',
      outerVisible: false,
      innerVisible: false,
      fee: 0,
      concode: '',
      gridData: [],
      startDatePickerOptions: ''
    }
  },
  created() {
    this.getRegionList()
    this.setConfigSelector()
    this.getReferenceFee()
    this.startDatePickerOptions = {
      disabledDate(time) {
        return (
             time.getTime() < new Date().getTime()
        )
      }
    }
  },
  methods: {
    closeDialog: function(data) {
      this.outerVisible=false
    },
    countDown() {
      if (!this.canClick) return
      else {
        this.canClick = false
        this.content =
          this.$t('userCommon.codeTime') + '(' + this.totalTime + 's)'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content =
            this.$t('userCommon.codeTime') + '(' + this.totalTime + 's)'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = this.$t('userCommon.codeTime')
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
        this.getConfirmCode()
      }
    },
    setConfigSelector() {
      const CpuData = ServerConfigData.CPU
      this.cpuSel = WrapDropDownData(CpuData, auth.getCurLang())
      this.deployForm.cpuKernel = this.cpuSel[0].value

      const HdData = ServerConfigData.HD
      this.diskSel = WrapDropDownData(HdData, null)
      this.deployForm.disk = this.diskSel[0].value

      const MemData = ServerConfigData.Mem
      this.memorySel = WrapDropDownData(MemData, null)
      this.deployForm.mem = this.memorySel[0].value

      const NetworkData = ServerConfigData.Network
      this.networkSel = WrapDropDownData(NetworkData, null)
      this.deployForm.network = this.networkSel[0].value

      const NetworkTypeData = ServerConfigData.NetworkInnerOuter
      this.networkTypeSel = WrapDropDownData(NetworkTypeData, null)
      this.deployForm.innerOuter = this.networkTypeSel[0].value
    },

    setRegionSelectValue(region) {
      this.deployForm.rancherId = region
    },

    getRegionList() {
      rancher.rancherList(auth.getCurLang()).then(respData => {
        this.rancherServer = respData.data.data
        let regionData = []
        this.rancherServer.map(rancher => {
          const region = {
            value: rancher.id,
            label:
              auth.getCurLang() === 'zh-cn'
                ? rancher.region
                : rancher.regionEnUs
          }
          regionData.push(region)
        })

        this.regionSel = regionData
        this.deployForm.rancherId = this.regionSel[0].value
      })
    },

    purchaseUraPower() {
      this.deployForm.beginTime = this.deployForm.dateRange[0]
      this.deployForm.endTime = this.deployForm.dateRange[1]

      order
        .orderResource(auth.getCurLang(), this.deployForm)
        .then(purcheStatus => {
          const purchStausData = purcheStatus.data
          if (purchStausData.success) {
            this.gridData = [purchStausData.data]
            this.outerVisible = true
          } else {
            this.$message({
              showClose: true,
              message: purchStausData.errMsg,
              type: 'error'
            })
          }
        })
    },
    getReferenceFee() {
      wallet.walletReferenceFee(auth.getCurLang()).then(reffee => {
        this.fee = reffee.data.data
      })
    },
    getConfirmCode() {
      wallet
        .walletConfirmCode(auth.getCurLang(), auth.getCurUserName())
        .then(sendResult => {
          const status = sendResult.data
          this.$message({
            showClose: true,
            message: status.data,
            type: 'success',
            duration: 3000
          })
        })
    },

    startTransfer() {
      let orders = []
      this.gridData.map(order => {
        const tmporder = {
          buyerId: auth.getCurUserId(),
          orderAmount: order.orderAmount,
          orderNo: order.orderNo,
          fee: this.fee,
          sellerId: order.sellerId
        }
        orders.push(tmporder)
      })
      account
        .userInfo(auth.getCurLang(), auth.getCurUserId())
        .then(userInfo => {
          const userData = userInfo.data.data
          const transData = {
            orders: orders,
            phone: userData.mobile,
            smsCode: this.concode
          }
          wallet.walletPay(auth.getCurLang(), transData).then(transStatus => {
            const transStatusData = transStatus.data
            if (transStatusData.success) {
              this.outerVisible = false
              this.$message({
                showClose: true,
                message: this.$t('buyer.resourceMarket.orderSuccess'),
                type: 'success',
                duration: 3000
              })
              this.$router.push({ name: 'ApplicationRepository' })
            } else {
              this.$message({
                showClose: true,
                message: transStatusData.errMsg,
                type: 'error',
                duration: 3000
              })
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.resourceMarket {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1130px;
  .el-dialog {
    .code {
      width: 500px;
      display: flex;
      margin: 25px;
      span {
        width: 165px;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #363636;
        line-height: 40px;
        text-align: left;
      }
      .el-button {
        margin-left: 15px;
      }
    }
    p {
      margin: 15px auto;
      text-align: center;
      font-family: Source-Sans-Pro-Bold;
      font-size: 14px;
      color: #f54c46;
      line-height: 20px;
    }
    .table-head {
      color: #363636;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 22px;
      }
    }
  }
  .resourceHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    margin: 10px 10px 0;
    height: 50px;
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
  .resourceBox {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 660px;
    margin: 10px;
    .title {
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .el-button {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
      border: none;
    }
    .el-select /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-input /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-input__inner /deep/ input {
      background: rgba(36, 99, 255, 0);
      color: #ffffff;
    }
    .margin-top {
      margin-top: 33px;
      .line {
        text-align: center;
      }
      span {
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
        font-weight: 400;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
    }
    .button {
      .el-button {
        margin-top: 35px;
        border: none;
      }
    }
  }
}
</style>
