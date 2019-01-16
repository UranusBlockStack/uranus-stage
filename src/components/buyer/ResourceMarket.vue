<template>
  <section class="resourceMarket">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog
      :title="$t('buyer.resourceMarket.confirmTitle')"
      :close-on-click-modal="false"
      :visible.sync="outerVisible"
      width="800px"
    >
      <RestTime style="margin-left: 250px;" endTime="2019-1-15 16:31:15"/>
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
                  <el-select v-model="deployForm.region">
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
                  <el-select v-model="deployForm.cpu">
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
                <el-form-item :label="$t('buyer.deploy.disk')">
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
                <el-form-item :label="$t('buyer.deploy.memory')">
                  <el-select v-model="deployForm.memory">
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
                <el-form-item :label="$t('buyer.deploy.network')">
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
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      :placeholder="$t('buyer.deploy.startingTime')"
                      v-model="deployForm.startTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      :placeholder="$t('buyer.deploy.endTime')"
                      v-model="deployForm.endTime"
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
            @click="outerVisible = true"
          >{{$t('buyer.resourceMarket.confirm')}}</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import RestTime from "@/components/modules/RestTime";
import * as auth from '../../services/AuthService'
import * as rancher from '../../services/RancherService'
import { ServerConfigData, AddUnit, WrapDropDownData } from '../../store/rancher_info'

export default {
  name: "ResourceMarket",
  components: {
    RestTime
  },
  data() {
    return {
      deployForm: {
        name: "",
        region: "Asia",
        cpu: "4",
        disk: "512G",
        memory: "16",
        network: "512G",
        startTime: "",
        endTime: ""
      },
      regionSel: [],
      cpuSel: [],
      diskSel: [],
      memorySel: [],
      networkSel: [],
      value: "",
      time1: "",
      time2: "",
      input: "",
      outerVisible: false,
      innerVisible: false,
      gridData: [
        {
          order: "214521236987",
          address: "0x461s2df6…",
          number: "1000021.23",
          type: "购买应用",
          charge: "0.11"
        }
      ]
    };
  },
    created () {
        this.getRegionList()
        this.setConfigSelector()
    },
    methods:{
        setConfigSelector() {
            const CpuData = ServerConfigData.CPU.paramVals[auth.getCurLang()]
            this.cpuSel = WrapDropDownData(CpuData)
            this.deployForm.cpu = this.cpuSel[0].value
            console.log(this.cpuSel[0]);

            const HdData = ServerConfigData.HD.paramVals
            this.diskSel =  WrapDropDownData(HdData)
            this.deployForm.disk = this.diskSel[0].value

            const MemData = ServerConfigData.Mem.paramVals
            this.memorySel =  WrapDropDownData(MemData)
            this.deployForm.memory = this.memorySel[0].value

            const NetworData = ServerConfigData.Network.paramVals
            this.networkSel =  WrapDropDownData(NetworData)
            this.deployForm.network = this.networkSel[0].value

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
        }
    }
};
</script>

<style lang="scss" scoped>
.resourceMarket {
  background: #f2f2f2;
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
  .resourceBox {
    background: #ffffff;
    border-radius: 2px;
    height: 560px;
    margin: 10px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
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
        background: #8eb357;
      }
    }
  }
}
</style>
