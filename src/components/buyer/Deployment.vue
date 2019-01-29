<template>
  <section class="deployment">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog
      :title="$t('buyer.deploy.confirmTitle')"
      :visible.sync="outerVisible"
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
        <el-button :class="{'is-disabled': !this.canClick}" @click="countDown">{{content}}</el-button>
      </div>
      <p>{{ $t("buyer.deploy.confirmText1") }}</p>
      <TimeOver style="margin-left:300px;" v-on:listentimeOver="closeDialog"/>
      <el-dialog
        width="800px"
        :title="$t('buyer.deploy.confirmText3')"
        :visible.sync="innerVisible"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <p>{{$t('buyer.deploy.confirmText3')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deployConfirm">
            {{
            $t("buyer.deploy.button2")
            }}
          </el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">
          {{
          $t("buyer.deploy.button1")
          }}
        </el-button>
        <el-button type="primary" @click="startTransfer">
          {{
          $t("buyer.deploy.button2")
          }}
        </el-button>
      </div>
    </el-dialog>

    <el-row class="resourceBox">
      <el-row>
        <el-col class="title bg" :span="24">
          <h1>{{ $t("buyer.deploy.application") }}</h1>
        </el-col>
      </el-row>
      <el-row class="detial">
        <el-col :span="2" :offset="1">
            <div class="img-box">
          <img :src="imgsrc">
            </div>
        </el-col>
        <el-col :span="8" :offset="2">
          <h2>{{ $t("buyer.deploy.name") }} {{ appDetail.name }}</h2>
          <p>{{ $t("buyer.deploy.appDetail") }} {{ appDetail.description }}</p>
        </el-col>
        <el-col class="border-col" :span="6" :offset="1">
          <p>{{ $t("buyer.deploy.price") }} {{ price }}</p>
          <p>
            {{ $t("buyer.deploy.from") }} {{ $t("buyer.deploy.store") }}
            {{ appDetail.catalog }}
          </p>
          <p>{{ $t("buyer.deploy.download") }} {{ appDetail.downloadTimes }}</p>
        </el-col>

        <!--<el-col class="inf-col" :span="6" :offset="1">-->
        <!--<p>{{$t('buyer.deploy.configuration')}}</p>-->
        <!--<p>-->
        <!--<span class="left-span">{{$t('buyer.deploy.cpu')}}xxx</span>-->
        <!--<span>{{$t('buyer.deploy.memoryCon')}}xxx</span>-->
        <!--<span>{{$t('buyer.deploy.networkCon')}}xxx</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span class="left-span">{{$t('buyer.deploy.gpuCon')}}xxx</span>-->
        <!--<span>{{$t('buyer.deploy.diskCon')}}xxx</span>-->
        <!--</p>-->
        <!--</el-col>-->
      </el-row>
      <el-row class="border-line"></el-row>

      <!-- deploy application -->
      <el-row class="margin-top">
        <el-col :span="23" :offset="1">
          <el-radio v-model="orderMode" label="1">
            {{
            $t("buyer.deploy.application")
            }}
          </el-radio>
        </el-col>
        <el-col :span="22" :offset="2">
          <el-form label-width="160px">
            <el-row class="margin-top">
              <el-col :span="18">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-name"></i>
                    {{ $t("buyer.deploy.newPool") }}
                  </span>
                  <el-input
                    v-model="deployForm.projectName"
                    style="width:350px;"
                    :placeholder="$t('buyer.deploy.renamePool')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item @change="setRegionSelectValue">
                  <span slot="label">
                    <i class="iconfont icon-region"></i>
                    {{ $t("buyer.deploy.region") }}
                  </span>
                  <el-select v-model="deployForm.rancherId">
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
                <el-form-item @change="setParamCPU">
                  <span slot="label">
                    <i class="iconfont icon-cpu"></i>
                    {{ $t("buyer.deploy.cpu") }}
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
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.disk')" @change="setParamHD">
                  <span slot="label">
                    <i class="iconfont icon-disk"></i>
                    {{ $t("buyer.deploy.disk") }}
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
              <el-col :span="8">
                <el-form-item :label="$t('buyer.deploy.memory')" @change="setParamRAM">
                  <span slot="label">
                    <i class="iconfont icon-memory"></i>
                    {{ $t("buyer.deploy.memory") }}
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
                  <span slot="label">
                    <i class="iconfont icon-network"></i>
                    {{ $t("buyer.deploy.network") }}
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
              <el-col :span="12">
                <el-form-item>
                  <span slot="label">
                    <i class="iconfont icon-time"></i>
                    {{ $t("buyer.deploy.timeScreening") }}
                  </span>
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
      <!-- more choice -->
      <el-row class="margin-top" v-show="more && existedResourceSelect">
        <el-col :span="2" :offset="1">
          <el-radio v-model="orderMode" label="2">
            {{
            $t("buyer.deploy.choosePool")
            }}
          </el-radio>
        </el-col>
        <el-col :span="20">
          <el-select v-model="projectId">
            <el-option
              v-for="item in spaceSel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="margin-top" v-show="more">
        <el-col :span="2" :offset="1" v-show="!isMyApplication">
          <el-radio v-model="orderMode" label="3">
            {{
            $t("buyer.deploy.noDeploy")
            }}
          </el-radio>
        </el-col>
      </el-row>
      <el-row class="more">
        <el-col :span="4" :offset="10" class="more-button" v-show="!more">
          <p @click="changeMore">
            {{ $t("buyer.deploy.more") }}
            <i class="el-icon-arrow-down"></i>
          </p>
        </el-col>
        <el-col :span="4" :offset="10" class="more-button" v-show="more">
          <p @click="changeMore">
            {{ $t("buyer.deploy.pick") }}
            <i class="el-icon-arrow-up"></i>
          </p>
        </el-col>
      </el-row>

      <!-- application setting -->
      <el-row>
        <el-col class="title" :span="12">
          <h1>{{ $t("buyer.deploy.newApp") }}</h1>
        </el-col>
        <el-col class="title" :span="12">
          <h1>{{ $t("buyer.deploy.version") }}</h1>
        </el-col>
      </el-row>
      <el-row class="margin-top">
        <el-form label-width="160px">
          <el-col :span="8" :offset="2">
            <el-form-item>
              <span slot="label">
                <i class="iconfont icon-name"></i>
                {{ $t("buyer.deploy.nameApp") }}
              </span>
              <el-input v-model="appDetail.name" :placeholder="$t('buyer.deploy.authorApp')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-form-item>
              <span slot="label">
                <i class="iconfont icon-version"></i>
                {{ $t("buyer.deploy.chooseVersion") }}
              </span>
              <el-select v-model="versionValue">
                <el-option
                  v-for="item in versionSel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item>
              <span slot="label">
                <i class="iconfont icon-description"></i>
                {{ $t("buyer.deploy.description") }}
              </span>
              <el-input v-model="input" :placeholder="$t('buyer.deploy.authorApp')"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="border-line"></el-row>

      <!-- configuration options -->
      <el-row class="configuration">
        <el-col class="title" :span="24">
          <h1>{{ $t("buyer.deploy.configurationOption") }}</h1>
        </el-col>
      </el-row>

      <ul>
        <li v-for="(groupData, index) in paramTree" :key="index">
          <ul>
            <li v-for="(paramsL2, index) in groupData" :key="index">
              <el-row class="margin-top">
                <el-col
                  class="configuration-box"
                  :span="8"
                  :offset="2"
                  v-for="(param, index) in paramsL2"
                  :key="index"
                  v-show="
                      (param.type === 'string' ||
                        param.type === 'int' ||
                        param.type === 'enum' ||
                        param.type === 'password') && param.label
                    "
                >
                  <!--<div v-if="param.type==='boolean'">-->
                  <!--<el-orderMode  v-model="param.default" label="true">是</el-orderMode>-->
                  <!--<el-orderMode  v-model="param.default" label="false">否</el-orderMode>-->
                  <!--</div>-->
                  <div>
                    <p class="configuration-name">{{ param.label }}：</p>
                    <el-input v-model="param.default"></el-input>
                    <span>{{ param.description }}</span>
                  </div>
                  <!--<div-->
                  <!--v-if="-->
                  <!--param.type === 'boolean' " >-->
                  <!--<p class="configuration-name">{{ param.label }}：[{{param.subquestions ?param.subquestions.length :0 }}]</p>-->
                  <!--<el-input v-model="param.default"></el-input>-->
                  <!--<span>{{ param.description }}</span>-->
                  <!--</div>-->
                </el-col>
              </el-row>
            </li>
          </ul>
        </li>
      </ul>

      <el-row class="border-line"></el-row>
      <el-row>
        <el-col :span="4" :offset="10">
          <el-button type="success" @click="purchaseEntry">
            {{
            $t("buyer.deploy.deploy")
            }}
          </el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import * as app from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import * as account from '../../services/AccountService'
import * as rancher from '../../services/RancherService'
import { ServerConfigData, WrapDropDownData } from '../../store/rancher_info'
import * as project from '../../services/RancherService'
import * as wallet from '../../services/WalletService'
import * as order from '../../services/OrderService'
import TimeOver from '@/components/modules/TimeOver'

export default {
  name: 'Deployment',
  components: {
    TimeOver
  },
  data() {
    return {
      content: this.$t('buyer.deploy.codeBtn'),
      totalTime: 60,
      canClick: true,
      orderMode: '1',
      deployForm: {
        projectName: '',
        rancherId: 2,
        cpuKernel: '4',
        disk: '512G',
        mem: '16',
        network: '512G',
        dateRange: ''
      },
      imageServerUrl: this.$store.state.imageServerUrl,
      imgsrc: '',
      price: '',
      regionSel: [],
      cpuSel: [],
      diskSel: [],
      memorySel: [],
      networkSel: [],
      // existed
      spaceSel: [],
      projectId: '',
      // version
      versionSel: [],
      versionValue: '',
      // new application name
      input: '',
      // more button status
      more: false,
      appId: 0,
      appRid: '',
      versionId: '',
      catalog: '',
      appDetail: {},
      appVersionDetail: {},
      stackData: {
        hostType: 1,
        name: '',
        description: '',
        startOnCreate: true
      },
      gridData: [],
      outerVisible: false,
      innerVisible: false,
      rancherServer: [],
      environment: [],
      paramTree: [],
      appDeployParam: {},
      fee: 0,
      concode: '',
      isMyApplication: false,
      orderNumber: '',
      existedResourceSelect: true
    }
  },
  created() {
    if (typeof this.$route.query.appId !== 'undefined') {
      this.appId = this.$route.query.appId
      this.appRid = this.$route.query.appRid
      this.versionId = this.$route.query.versionId
      this.catalog = this.$route.query.catalog
      this.getAppDetail(this.appId)
      this.getAppVersionDetail(this.appId, this.versionId)
      this.getRegionList()
      this.setConfigSelector()
      this.getUraPowerPoolList()
      this.getReferenceFee()
      this.getOrderOfApp()
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (from.name === 'ApplicationRepository') {
  //     this.isMyApplication = true
  //   }
  //   next()
  // },

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
    /// common functions
    parseConfigData(configData) {
      /// grouped data
      let paramTreeTmp = {}
      configData.map(param => {
        if (!paramTreeTmp.hasOwnProperty(param.group)) {
          paramTreeTmp[param.group] = []
        }
        paramTreeTmp[param.group].push(param)
      })

      /// convert struct phase 2
      const groups = Object.keys(paramTreeTmp)
      groups.map(group => {
        let newgroup = []
        const curgroup = paramTreeTmp[group]

        curgroup.map(param => {
          const rebranchnode = param.showIf
            ? param.showIf.endsWith('.enabled=true')
            : null
          // move node to the branch its belong
          if (!rebranchnode) {
            newgroup.push(param)
          } else {
            newgroup.find(paramup => {
              if (param.showIf === paramup.variable + '=true') {
                if (!paramup.subquestions) {
                  paramup.subquestions = []
                }
                paramup.subquestions.push(param)
              }
              // TODO : node on false branch to attach paramup
            })
          }
          // TODO :  level 3 trans_struct
          // if(param.hasOwnProperty('subquestions')){
          //
          // }
        })
        const groupData = {}
        groupData[group] = newgroup
        this.paramTree.push(groupData)
      })
    },

    changeMore() {
      this.more = !this.more
    },

    /// phase 1 resource and appinfo --------

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

      const NetworData = ServerConfigData.Network
      this.networkSel = WrapDropDownData(NetworData, null)
      this.deployForm.network = this.networkSel[0].value
    },
    getOrderOfApp() {
      app.appPurchaseInfo(auth.getCurLang(), this.appId).then(purchaseInfo => {
        const purchaseInfoData = purchaseInfo.data
        if (purchaseInfoData.success) {
          this.isMyApplication = true
          this.orderNumber = purchaseInfoData.data.orderNo
        }
      })
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
      })
    },
    getAppDetail(appid) {
      app.appDetail(auth.getCurLang(), appid).then(respData => {
        if (respData.data.success) {
          const appInfo = respData.data.data
          this.appDetail = appInfo
          this.stackData.name = appInfo.name.replace(/\s+/g, '-')
          const versions = JSON.parse(this.appDetail.versionLinks)
          this.appDetail.versionlinks = []
          this.imgsrc = this.imageServerUrl + this.appDetail.rid + '/icon'
          this.price = this.appDetail.free
            ? this.$t('buyer.deploy.free')
            : this.price
          for (var key in versions) {
            var versionLink = versions[key]
            var versionId = versionLink.substr(
              versionLink.lastIndexOf('/') + 1
            )
            this.appDetail.versionlinks.push({ label: key, value: versionId })
          }
          this.versionSel = this.appDetail.versionlinks
          this.versionValue = this.appDetail.defaultVersion
        } else {
          // this.$alert(respData.message, this.$t('common.messages.alert'), {
          //     confirmButtonText: this.$t('common.messages.confirm')
          // })
        }
      })
    },
    getAppVersionDetail(appId, version) {
      app.appVersion(auth.getCurLang(), appId, version).then(respData => {
        if (respData.data.success) {
          this.appVersionDetail = respData.data.data
          // let files = JSON.parse(this.appVersionDetail.files)
          // this.appVersionDetail.files = files
          // this.appVersionDetail.readMe = files['README.md']
          // this.appVersionDetail.questions = JSON.parse(this.appVersionDetail.questions)
          this.parseConfigData(this.appVersionDetail.questions)
          // this.appVersionDetail.questions.map(question => {
          //   const key = question.variable
          //   const value = question.defaultValue
          //   this.environment[key] = value
          // })
        } else {
          // this.$alert(respon.message, this.$t('common.messages.alert'), {
          //     confirmButtonText: this.$t('common.messages.confirm')
          // })
        }
      })
    },

    getUraPowerPoolList() {
      const projectQuertData = {
        page: 0,
        pageSize: 0,
        projectName: '',
        sort: '',
        sortDesc: true
      }
      project
        .projectList(this.$store.getters.lang, projectQuertData)
        .then(respData => {
          const data = respData.data.data.records
          for (let i = 0; i < data.length; i++) {
            let object = {}
            object['value'] = data[i].id
            object['label'] = data[i].projectName
            this.spaceSel.push(object)
          }

          if (!this.spaceSel.length) {
            this.existedResourceSelect = false
          } else {
            this.projectId = this.spaceSel[0].value
          }
        })
    },

    /// phase 2 buy resource and application --------

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
    purchaseEntry() {
      if (this.orderMode === '1') {
        this.purchaseUraPowerPlus()
      } else if (this.orderMode === '2') {
        this.purchaseAppliction()
      } else {
        this.purchaseAppliction()
      }
    },
    purchaseUraPowerPlus() {
      this.deployForm.beginTime = this.deployForm.dateRange[0]
      this.deployForm.endTime = this.deployForm.dateRange[1]
      order
        .orderResource(auth.getCurLang(), this.deployForm)
        .then(purcheStatus => {
          const purchUraStausData = purcheStatus.data
          if (purchUraStausData.success) {
            this.gridData = [purchUraStausData.data]
            this.projectId = purchUraStausData.data.prodId

            if (!this.isMyApplication) {
              this.purchaseAppliction()
            } else {
              if (this.orderMode === '1') {
                this.outerVisible = true
              }
            }
          } else {
            this.$message({
              showClose: true,
              message: purchUraStausData.errMsg,
              type: 'error'
            })
          }
        })
    },

    purchaseAppliction() {
      if (!this.isMyApplication) {
        // app order
        order
          .orderApp(auth.getCurLang(), this.appId)
          .then(purchaseStatus => {
            const purchaseAppStatusData = purchaseStatus.data
            if (purchaseAppStatusData.success) {
              if (this.appDetail.free !== 1) {
                this.gridData.push(purchaseAppStatusData.data)
              }
              if (this.gridData.length) {
                this.outerVisible = true
              } else {
                this.deployConfirm()
              }
            } else {
              this.$message({
                showClose: true,
                message: purchaseAppStatusData.errMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          })
      } else {
        this.deployConfirm()
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
              this.appDeploy()
              this.outerVisible = false
              this.$message({
                showClose: true,
                message:
                  this.appDetail.name + this.$t('buyer.deploy.orderSuccess'),
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

      // wallet.walletTransfer(auth.getCurLang(), transData)
      //     .then(respData => {
      //       const transferStatus = respData.data
      //       if (transferStatus) {
      //         this.outerVisible = false
      //         this.innerVisible = true
      //       }
      //     })
    },

    /// phase 3 deploy application --------

    deployConfirm() {
      this.innerVisible = false
      if (this.orderMode !== '3') {
        this.$confirm(
            this.$t('buyer.deploy.deployText'),
            this.$t('buyer.deploy.deployTitle'),
          {
            confirmButtonText: this.$t('buyer.deploy.button2'),
            cancelButtonText: this.$t('buyer.deploy.button1'),
            type: 'warning'
          }
        )
        .then(() => {
          this.appDeploy()
          this.$message({
            type: 'success',
            message: this.$t('buyer.deploy.deployAuto'),
            duration: 3000
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('buyer.deploy.deployCancel'),
            duration: 3000
          })
        })
      } else {
        this.$message({
          type: 'success',
          message: 'Success.',
          duration: 3000
        })
        this.successToListPage()
      }
    },
    successToListPage() {
      if (this.orderMode === '1' || this.orderMode === '2') {
        this.$router.push({ name: 'MyResource' })
      } else this.$router.push({ name: 'ApplicationRepository' })
    },

    genRealConfigData() {
      const paramsData = this.paramTree
      let relConfData = {}
      paramsData.map(groupData => {
        const confData = Object.values(groupData)[0]
        confData.map(confItem => {
          relConfData[confItem.variable] = confItem.default
            ? confItem.default
            : ''
        })
      })
      relConfData.defaultImage =
       'https://47.105.151.140/v3/templateVersions/' +
        this.appVersionDetail.name

      return relConfData
    },

    appDeploy() {
      this.appDeployParam['appId'] = this.appId
      this.appDeployParam['appVersion'] = this.versionValue

      this.appDeployParam['config'] = JSON.stringify(this.genRealConfigData())

      this.appDeployParam['description'] = this.appDetail.description
      this.appDeployParam['name'] = this.appDetail.name
      if (this.orderMode === '1' || this.orderMode === '2') {
        this.appDeployParam.projectId = this.projectId
      }

      app
        .appInstanceDeploy(auth.getCurLang(), this.appDeployParam)
        .then(deployStatus => {
          const deployStatusData = deployStatus.data
          if (deployStatusData.success) {
            this.successToListPage()
          } else {
            this.$message({
              showClose: true,
              message: deployStatusData.errMsg,
              type: 'error',
              duration: 3000
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.deployment {
  background: rgba(101, 143, 247, 0);
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
  .resourceBox {
    background: rgba(101, 143, 247, 0);
    border-radius: 2px;
    margin: 10px;
    .border-line {
      border-bottom: 1px solid #e9e9e9;
      margin-top: 33px;
      margin-bottom: 30px;
    }
    .bg {
      background: rgba(101, 143, 247, 0);
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
    .el-input__inner /deep/ .el-range-input {
      background: rgba(36, 99, 255, 0.2);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-radio {
      color: #ffffff;
    }
    .title {
      border-radius: 4px 4px 0 0;
      height: 54px;
      margin-bottom: 25px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .detial {
      height: 155px;
      .img-box {
            height: 110px;
            width: 130px;
            margin: 10px auto;
            position: relative;
            img {
              background: #f2f2f2;
              min-width: 100px;
              min-height: 80px;
              max-width: 130px;
              max-height: 110px;
              width: auto;
              height: auto;
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }}
      h2 {
        font-family: ArialMT;
        font-size: 18px;
        color: #ffffff;
        line-height: 22px;
        text-align: left;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 22px;
        text-align: left;
      }
      .border-col {
        margin-top: 60px;
        border-left: 1px solid #e9e9e9;
        border-right: 1px solid #e9e9e9;
        p {
          padding-left: 50px;
        }
      }
      .inf-col {
        margin-top: 60px;
        span {
          font-family: Source-Sans-Pro-Bold;
          font-size: 16px;
          color: #ffffff;
          text-align: left;
          line-height: 24px;
          padding-left: 20px;
        }
        .left-span {
          padding-left: 0;
        }
      }
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
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
      .configuration-box {
        margin-bottom: 30px;
        p {
          font-size: 16px;
          color: #ffffff;
          text-align: left;
          line-height: 24px;
        }
        span {
          font-size: 16px;
          color: #ffffff;
          text-align: left;
          line-height: 24px;
        }
      }
    }
    .more {
      border-bottom: 1px solid #e9e9e9;
      margin-top: 33px;
      margin-bottom: 30px;
      .more-button {
        cursor: pointer;
        text-align: center;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        line-height: 22px;
      }
    }
    .el-button {
      margin-bottom: 30px;
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 5px;
      border: none;
      width: 200px;
      height: 34px;
    }
  }
}
</style>
