<template>
  <section class="myResource">
    <el-dialog
      :title="$t('buyer.myResource.selectTime')"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="daterangeDialog"
      width="600px"
      :clearable="false"
    >
      <el-form>
        <el-form-item>
          <span slot="label">
            <i class="iconfont icon-time"></i>
            {{ $t("buyer.myResource.timeScreening") }}
          </span>
          <el-col :span="6">
            <el-input prefix-icon="el-icon-date" v-model="daterangeVal.startDate" readonly></el-input>
          </el-col>
          <el-col :span="1">
            <span class="timeto">To</span>
          </el-col>
          <el-col :span="1">
            <span class="timeto">To</span>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              type="date"
              range-separator="-"
              v-model="daterangeVal.endDate"
              style="width: 100%;"
              @change="endDateSelect"
              :picker-options="endDataPickerOptions"
            ></el-date-picker>
          </el-col>
          <el-col :span="4" :offset="1">
            <span>
              {{$t('buyer.myResource.totalDay')}}
              <span class="days">{{days}}</span>
              {{$t('buyer.myResource.days')}}
            </span>
          </el-col>
        </el-form-item>

        <el-form-item :label="$t('buyer.myResource.value')">
          <span>{{ countedPrice }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="daterangeDialog = false">
          {{
          $t("buyer.deploy.button1")
          }}
        </el-button>
        <el-button type="primary" @click="renewPay">
          {{
          $t("buyer.deploy.button2")
          }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('buyer.deploy.confirmTitle')"
      :visible.sync="orderVisible"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table :data="gridData">
        <el-table-column property="orderNo" :label="$t('buyer.deploy.orderNumber')"></el-table-column>
        <el-table-column property="sellerId" :label="$t('buyer.deploy.address')"></el-table-column>
        <el-table-column property="orderAmount" :label="$t('buyer.deploy.value')"></el-table-column>
        <el-table-column property="prodType" :label="$t('buyer.deploy.content')"></el-table-column>
        <el-table-column :label="$t('buyer.deploy.fee')">
          <template slot-scope="scope">
            <el-input-number size="mini" v-model="fee" :precision="6" :step="0.000001" :max="10"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="code">
        <span slot="label">{{ $t("buyer.deploy.code") }}</span>
        <el-input :placeholder="$t('buyer.deploy.codeIn')" v-model="concode"></el-input>
        <el-button :class="{ 'is-disabled': !this.canClick }" @click="countDown">{{ content }}</el-button>
      </div>
      <p>{{ $t("buyer.deploy.confirmText1") }}</p>
      <TimeOver style="margin-left:300px;" v-on:listentimeOver="closeDialog"/>

      <div slot="footer" class="dialog-footer">
        <el-button @click="orderVisible = false">{{ $t("buyer.deploy.button1") }}</el-button>
        <el-button type="primary" @click="startTransfer">{{ $t("buyer.deploy.button2") }}</el-button>
      </div>
    </el-dialog>

    <el-row class="myResourceHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-resource"></i>
          {{ $t("menu.myResource") }}
        </h1>
      </el-col>
      <el-col class="record" :span="12">
        <router-link :to="{ path: '/urapowerrecord' }">
          <p>
            {{ $t("buyer.appRepository.deployRecord") }}
            <i class="iconfont icon-more"></i>
          </p>
        </router-link>
      </el-col>
    </el-row>

    <el-row class="myResourceBox">
      <el-row class="boxshadow">
        <el-row>
          <el-col class="title" :span="24">
            <h1>{{ $t("buyer.myResource.resourceAll") }}</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div id="restResource">
              <Water v-if="update2" :chartData="statisObejct.urapowerUsd" style="margin:40px auto"/>
            </div>
          </el-col>
          <el-col :span="19" :offset="1">
            <h2>{{ $t("buyer.myResource.restOne") }}</h2>
            <div class="restRes">
              <Cpu v-if="update2" :chartData="statisObejct.cpuUsd"/>
              <Memory v-if="update2" :chartData="statisObejct.memUsd"/>
              <Disk v-if="update2" :chartData="statisObejct.diskUsd"/>
              <Network v-if="update2" :chartData="statisObejct.networkUsd"/>
            </div>
          </el-col>
        </el-row>
      </el-row>

      <el-row class="boxshadow">
        <el-row>
          <el-col class="title" :span="6">
            <h1>{{ $t("buyer.myResource.resourceOver") }}</h1>
          </el-col>
          <el-col :span="4" :offset="12" style="margin-top: 15px;">
            <el-input
              v-model="projectQueryData.projectName"
              @keyup.enter.native="getUraPowerPoolList"
              :placeholder="$t('seller.groups.searchIn')"
              prefix-icon="el-icon-search"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button style="margin-left:10px;" type="success" @click="getUraPowerPoolList()">
              <i class="iconfont icon-search"></i>
            </el-button>
          </el-col>
        </el-row>

        <el-row class="appResource">
          <el-col
            :span="24"
            style="text-align: center; color: #a2a6b0; margin-top: 30px;"
            v-if="this.poolList.length == '0'"
          >No data</el-col>
          <el-col :span="12" v-for="(pool, index) in poolList" :key="index">
            <el-row
              style="border: 1px solid rgba(255, 255, 255, 0.2); border-radius:4px; margin:10px;"
            >
              <el-col :span="5" style="margin-bottom: 15px;">
                <a @click="resourceDetail(index, pool.orderStatus)">
                  <Ball style="margin:0 auto;" v-if="update1" :chartData="pool.urpowerUsd"/>
                </a>
              </el-col>
              <el-col :span="17" :offset="2">
                <h3>Pool: {{ pool.name }}</h3>
                <h3>{{ $t("buyer.myResource.state") }} {{ pool.orderDispName }}</h3>
                <h3>{{ $t("buyer.myResource.number") }} {{ pool.appCount }}</h3>
                <div class="timeText">
                  <p>
                    {{ $t("buyer.myResource.countdownTime") }}
                    <RestTime style="display:inline-block;" :endTime="pool.time"/>
                  </p>
                </div>
                <div class="renew" v-if="pool.renew_btn">
                  <el-button type="success" @click="renewResource(index)">Renewal fee</el-button>
                </div>
              </el-col>
              <!-- <el-col :span="3" :offset="1">
                <el-dropdown trigger="click" style="margin-top: 10px; margin-left: 20px;">
                  <span class="el-dropdown-link">
                    <i class="iconfont icon-menu" style="color:#ffffff;"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      {{$t('buyer.myResource.renewal')}}
                      <i class="el-icon-arrow-right"></i>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <p @click="$router.push({path: '/resourcepool/' + pool.id + '/' + pool.name})">
                        {{$t('buyer.myResource.detail')}}
                        <i class="el-icon-arrow-right"></i>
                      </p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>-->
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import moment from 'moment'
import * as project from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import * as order from '../../services/OrderService'
import * as account from '../../services/AccountService'
import * as wallet from '../../services/WalletService'
import Water from '@/components/modules/Water'
import Cpu from '@/components/modules/CPU'
import Disk from '@/components/modules/Disk'
import Memory from '@/components/modules/Memory'
import Network from '@/components/modules/Network'
import Ball from '@/components/modules/Ball'
import RestTime from '@/components/modules/RestTime'
import { getOrderStatusName } from '../../store/orderStatus'
import TimeOver from '@/components/modules/TimeOver'

export default {
  name: 'MyResource',
  components: {
    Water,
    Cpu,
    Disk,
    Memory,
    Network,
    Ball,
    RestTime,
    TimeOver
  },
  data() {
    return {
      content: this.$t('buyer.deploy.codeBtn'),
      totalTime: 60,
      canClick: true,
      poolList: [],
      projectQueryData: {
        page: 0,
        pageSize: 0,
        projectName: '',
        sort: '',
        sortDesc: true
      },
      statisObejct: {
        cpuUsd: 0,
        diskUsd: 0,
        memUsd: 0,
        networkUsd: 0,
        urapowerUsd: 0
      },
      update1: false,
      update2: false,
      fee: 0,
      daterangeDialog: false,
      daterangeSelect: '',
      daterangeVal: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      },
      days: 0,
      countedPrice: 0,
      curPrice: 0,
      endDataPickerOptions: {},

      orderForm: {
        endTime: '',
        days: 0,
        resourceId: 0,
        orderNo: 0
      },
      orderVisible: false,
      gridData: [],
      concode: ''
    }
  },
  methods: {
    getUraPowerPoolList() {
      const nowstamp = moment(new Date()).valueOf()
      const waitdays = this.$store.state.renewWaitDays
      const predays = this.$store.state.renewPreDispDays
      project
        .projectList(auth.getCurLang(), this.projectQueryData)
        .then(respData => {
          this.appList = {}
          if (respData.data.data) {
            this.poolList = []
            const data = respData.data.data.records
            for (let i = 0; i < data.length; i++) {
              let object = {}
              const renewBtnStatus = (nowstamp > (data[i].endTime - predays * 24 * 60 * 60 * 1000)) && (nowstamp < (data[i].endTime + (waitdays + 1) * 24 * 60 * 60 * 1000))
              object['id'] = data[i].id
              object['name'] = data[i].projectName
              object['appCount'] = data[i].appCount
              object['time'] = moment(data[i].endTime).format(
                'YYYY-MM-DD hh:mm:ss'
              )
              object['urpowerUsd'] = data[i].computeRatio
              object.endTime = data[i].endTime
              object.orderNo = data[i].orderNo
              object.orderStatus = data[i].orderStatus
              object.orderStatusName = data[i].orderStatusName
              object.orderDispName = getOrderStatusName(
                data[i].orderStatus,
                auth.getCurLang()
              )
              object.link =
                '/resourcepool/' + data[i].id + '/' + data[i].projectName
              object.renew_btn = renewBtnStatus
              object.price = data[i].rentPrice
              this.poolList.push(object)
            }
          }
          this.update1 = true
        })
    },
    resourceDetail(index, ostatus) {
      if (ostatus !== 3) {
        this.$message({
          showClose: true,
          message: this.$t('buyer.myResource.project'),
          type: 'warning'
        })
      } else {
        location.href = this.poolList[index].link
      }
    },
    endDateSelect(v) {
      this.days = moment(this.daterangeVal.endDate).diff(
        this.daterangeVal.startDate,
        'days'
      )
      this.orderForm.days = this.days
      this.orderForm.endTime = moment(this.daterangeVal.endDate).format(
        'YYYY-MM-DD'
      )
      this.countedPrice = this.curPrice * this.days
      if (!this.daterangeVal.endDate) {
        this.days = 0
        this.countedPrice = 0
      }
    },
    renewResource(index) {
      this.setDatePick()
      this.daterangeDialog = true
      this.curPrice = this.poolList[index].price

      this.daterangeVal.startDate = moment(this.poolList[index].endTime).format(
        'YYYY-MM-DD'
      )
      this.daterangeVal.endDate = this.poolList[index].endTime
      this.orderForm.resourceId = this.poolList[index].id
      this.orderForm.orderNo = this.poolList[index].orderNo
    },
    getReferenceFee() {
      wallet.walletReferenceFee(auth.getCurLang()).then(reffee => {
        this.fee = reffee.data.data
      })
    },
    renewPay() {
      if (!this.days) {
        this.$message({
          showClose: true,
          message: '不支持续费0天',
          type: 'warning'
        })
      } else {
        this.daterangeDialog = false
        order
          .orderResourceRenew(auth.getCurLang(), this.orderForm)
          .then(purcheStatus => {
            const purchUraStausData = purcheStatus.data
            if (purchUraStausData.success) {
              this.gridData = [purchUraStausData.data]
            } else {
              this.$message({
                showClose: true,
                message: purchUraStausData.errMsg,
                type: 'error'
              })
            }
          })
        this.orderVisible = true
      }
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
              this.orderVisible = false
              this.$message({
                showClose: true,
                message: this.$t('buyer.deploy.orderSuccess'),
                type: 'success',
                duration: 3000
              })
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
    closeDialog: function (data) {
      this.outerVisible = false
    },
    setDatePick() {
      let that = this
      this.endDataPickerOptions = {
        disabledDate(time) {
          // if (
          //         typeof that.daterangeVal.endDate !== 'undefined' &&
          //         that.daterangeVal.endDate !== null &&
          //         that.daterangeVal.endDate !== 0
          //         ) {
          return (
            time.getTime() < new Date(that.daterangeVal.startDate).getTime()
          )
          // }
        }
      }
    },
    allStatisticsProjects() {
      project.statisticsProjects().then(respData => {
        if (respData.data.data) {
          const data = respData.data.data
          this.statisObejct['urapowerUsd'] = data.computeRatio / 100
          this.statisObejct['cpuUsd'] = data.cpuKernelRatio
          this.statisObejct['diskUsd'] = data.diskRatio
          this.statisObejct['memUsd'] = data.memRatio
          this.statisObejct['networkUsd'] = data.networkRatio
        }
        this.update2 = true
      })
    }
  },
  created() {
    this.allStatisticsProjects()
    this.getUraPowerPoolList()
    this.getReferenceFee()
  }
}
</script>

<style lang="scss" scoped>
.myResource {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  .el-dialog {
    .code {
      width: 500px;
      display: flex;
      margin: 25px;
      span {
        width: 85px;
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
  }
  .timeto {
    padding-left: 5px;
  }
  .days {
    font-size: 20px;
  }
  .boxshadow {
    background: #161618;
    border-radius: 2px;
    margin: 2px;
  }
  .myResourceHead {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    height: 50px;
    .title {
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
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 50px;
      width: 125px;
      p {
        height: 45px;
        line-height: 45px;
        margin: 0;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #627100;
      }
      p:hover {
        color: #a2ae44;
      }
    }
  }
  .myResourceBox {
    border-radius: 2px;
    .title {
      background: rgba(101, 143, 247, 0);
      border-radius: 2px;
      height: 54px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #a2a6b0;
      text-align: center;
      line-height: 24px;
    }
    #restResource {
      padding-left: 30px;
      height: 200px;
      width: 100%;
    }
    .restRes {
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      height: 200px;
      display: flex;
      padding-left: 50px;
    }
    .appResource {
      padding-bottom: 30px;
      min-height: 150px;
      h3 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        line-height: 24px;
        text-align: left;
        margin-top: 10px;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        text-align: left;
        line-height: 24px;
      }
      .timeText {
        color: #a2a6b0;
      }
      .renew {
        position: absolute;
        top: 25px;
        right: 30px;
        .el-button {
          background: #424b00;
          border: 1px solid #424b00;
          border-radius: 3px;
        }
        .el-button:hover {
          background: #627100;
          border: 1px solid #627100;
        }
      }
    }
    .el-button {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 3px;
      margin-top: 15px;
    }
    .el-button:hover {
      background: #627100;
      border: 1px solid #627100;
    }
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
  }
}
</style>
