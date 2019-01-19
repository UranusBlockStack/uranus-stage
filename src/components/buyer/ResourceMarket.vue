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
        <el-table-column property="order" :label="$t('buyer.resourceMarket.orderNumber')"></el-table-column>
        <el-table-column property="address" :label="$t('buyer.resourceMarket.address')"></el-table-column>
        <el-table-column property="number" :label="$t('buyer.resourceMarket.value')"></el-table-column>
        <el-table-column property="type" :label="$t('buyer.resourceMarket.content')"></el-table-column>
        <el-table-column :label="$t('buyer.resourceMarket.fee')">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.charge"
              :precision="2"
              :step="0.1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="code">
        <span slot="label">{{$t('buyer.resourceMarket.code')}}</span>
        <el-input :placeholder="$t('buyer.resourceMarket.codeIn')"></el-input>
        <el-button>{{$t('buyer.resourceMarket.codeBtn')}}</el-button>
      </div>
      <p>{{$t('buyer.resourceMarket.confirmText1')}}</p>
      <p>{{$t('buyer.resourceMarket.confirmText2')}}</p>
      <el-dialog
        :title="$t('buyer.resourceMarket.confirmText3')"
        width="800px"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>{{$t('buyer.resourceMarket.confirmText4')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="innerVisible = false"
          >{{$t('buyer.resourceMarket.button2')}}</el-button>
        </div>
      </el-dialog>
      <TimeOver style="margin-left: 250px;"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('buyer.resourceMarket.button1')}}</el-button>
        <el-button
          type="primary"
          @click="outerVisible = false, innerVisible = true"
        >{{$t('buyer.resourceMarket.button2')}}</el-button>
      </div>
    </el-dialog>

    <!-- purchase -->
    <el-row class="resourceHead">
      <el-col class="title" :span="24">
        <h1><i class="iconfont icon-resource-market"></i>{{$t('menu.resourceMarket')}}</h1>
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
          <el-form label-width="80px">
            <el-row class="margin-top">
              <el-col :span="18">
                <el-form-item :label="$t('buyer.deploy.newPool')">
                  <el-input
                    v-model="deployForm.name"
                    style="width:350px;"
                    :placeholder="$t('buyer.deploy.renamePool')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.region')">
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
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.cpu')">
                  <el-select v-model="deployForm.cpuKernel" @change="setParamCPU">
                    <el-option
                      v-for="item in cpuSel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.disk')" @change="setParamHD">
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
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.memory')" @change="setParamRAM">
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
              <!-- <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.gpu')">
                  <el-select v-model="deployForm.gpu">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.network')" @change="setParamNet">
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
              <el-col :span="12">
                <el-form-item :label="$t('buyer.deploy.timeScreening')">
                  <el-col :span="18">
                    <el-date-picker
                       type="daterange"
                      :start-placeholder="$t('buyer.deploy.startingTime')"
                      :end-placeholder="$t('buyer.deploy.endTime')"
                      range-separator="-"
                      v-model="deployForm.dateRange"
                      style="width: 100%;"
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
          <el-button
            type="success"
            @click="purchaseUraPower"
          >{{$t('buyer.resourceMarket.confirm')}}</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import TimeOver from '@/components/modules/TimeOver'
import * as auth from '../../services/AuthService'
import * as rancher from '../../services/RancherService'
import * as order from '../../services/OrderService'
import { ServerConfigData, WrapDropDownData } from '../../store/rancher_info'

export default {
  name: 'ResourceMarket',
  components: {
    TimeOver
  },
  data() {
    return {
      deployForm: {
        projectName: '',
        rancherId: 2,
        cpuKernel: '4',
        disk: '512G',
        mem: '16',
        network: '512G',
        dateRange: '',
        deployStatus: ''
      },
      regionSel: [],
      cpuSel: [],
      diskSel: [],
      memorySel: [],
      networkSel: [],
      value: '',
      time1: '',
      time2: '',
      input: '',
      outerVisible: false,
      innerVisible: false,
      gridData: [
        {
          order: '214521236987',
          address: '0x461s2df6…',
          number: '1000021.23',
          type: this.$t('buyer.resourceMarket.purchaseApp'),
          charge: '0.11'
        },
        {
          order: '214521236987',
          address: '0x461s2df6…',
          number: '1000021.23',
          type: this.$t('buyer.resourceMarket.purchasePower'),
          charge: '0.11'
        }
      ]
    }
  },
  created () {
    this.getRegionList()
    this.setConfigSelector()
  },
  methods: {
    setConfigSelector() {
      const CpuData = ServerConfigData.CPU.paramVals[auth.getCurLang()]
      this.cpuSel = WrapDropDownData(CpuData)
      this.deployForm.cpuKernel = this.cpuSel[0].value

      const HdData = ServerConfigData.HD.paramVals
      this.diskSel = WrapDropDownData(HdData)
      this.deployForm.disk = this.diskSel[0].value

      const MemData = ServerConfigData.Mem.paramVals
      this.memorySel = WrapDropDownData(MemData)
      this.deployForm.mem = this.memorySel[0].value

      const NetworData = ServerConfigData.Network.paramVals
      this.networkSel = WrapDropDownData(NetworData)
      this.deployForm.network = this.networkSel[0].value
    },

    setRegionSelectValue(region) {
      this.deployForm.rancherId = region
    },
    setParamCPU(value) {
      this.deployForm.cpuKernel = value
    },
    setParamHD(value) {
      this.deployForm.disk = value
    },
    setParamRAM(value) {
      this.deployForm.mem = value
    },
    setParamNet(value) {
      this.deployForm.network = value
    },

    getRegionList() {
      rancher.rancherList(auth.getCurLang())
                .then(respData => {
                  this.rancherServer = respData.data.data
                  let regionData = []
                  this.rancherServer.map(rancher => {
                    const region = {
                      value: auth.getCurLang() === 'zh-cn'? rancher.region: rancher.regionEnUs,
                      label: auth.getCurLang() === 'zh-cn'?rancher.region :rancher.regionEnUs
                    }
                    regionData.push(region)
                  })

                  this.regionSel = regionData
                })
    },

    purchaseUraPower() {
        // console.log(this.deployForm.dateRange[0])
      this.deployForm.beginTime = this.deployForm.dateRange[0]
      this.deployForm.endTime = this.deployForm.dateRange[1]

      console.log(this.deployForm)
      order.orderResource(auth.getCurLang(), this.deployForm)
            .then(purcheStatus => {
              const purchStausData = purcheStatus.data
              console.log(purchStausData)
              if (purchStausData.success) { this.gridData = purchStausData.data }
              this.outerVisible = true
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
    height: 560px;
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
    .el-input__inner /deep/ input{
      background: rgba(36, 99, 255, 0);
      color: #ffffff;
    }
    .margin-top {
      margin-top: 33px;
      .line {
        text-align: center;
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
