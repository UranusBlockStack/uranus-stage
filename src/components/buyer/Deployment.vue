<template>
  <section class="deployment">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog :title="$t('buyer.deploy.confirmTitle')" :visible.sync="outerVisible" width="800px">
      <el-table :data="gridData">
        <el-table-column property="orderNo" :label="$t('buyer.deploy.orderNumber')"></el-table-column>
        <el-table-column property="buyerId" :label="$t('buyer.deploy.address')"></el-table-column>
        <el-table-column property="orderAmount" :label="$t('buyer.deploy.value')"></el-table-column>
        <el-table-column property="prodType" :label="$t('buyer.deploy.content')"></el-table-column>
        <el-table-column :label="$t('buyer.deploy.fee')">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="fee"
              :precision="6"
              :step="0.000001"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="code">
        <span slot="label">{{$t('buyer.deploy.code')}}</span>
        <el-input :placeholder="$t('buyer.deploy.codeIn')"></el-input>
        <el-button>{{$t('buyer.deploy.codeBtn')}}</el-button>
      </div>
      <p>{{$t('buyer.deploy.confirmText1')}}</p>
      <p>{{$t('buyer.deploy.confirmText2')}}</p>
      <el-dialog
        width="800px"
        :title="$t('buyer.deploy.confirmText3')"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>{{$t('buyer.deploy.confirmText4')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">{{$t('buyer.deploy.button2')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('buyer.deploy.button1')}}</el-button>
        <el-button
          type="primary"
          @click="outerVisible = false, innerVisible = true"
        >{{$t('buyer.deploy.button2')}}</el-button>
      </div>
    </el-dialog>

    <el-row class="resourceBox">
      <el-row>
        <el-col class="title bg" :span="24">
          <h1>{{$t('buyer.deploy.application')}}</h1>
        </el-col>
      </el-row>
      <el-row class="detial">
        <el-col :span="2" :offset="1">
          <img :src="imgsrc">
        </el-col>
        <el-col :span="8" :offset="1">
          <h2>{{$t('buyer.deploy.name')}} {{appDetail.name}}</h2>
          <p>{{$t('buyer.deploy.appDetail')}} {{appDetail.description}}</p>
        </el-col>
        <el-col class="border-col" :span="4" :offset="1">
          <p>{{$t('buyer.deploy.price')}} {{price}}</p>
          <p>{{$t('buyer.deploy.from')}} {{$t('buyer.deploy.store')}} {{appDetail.catalog}}</p>
          <p>{{$t('buyer.deploy.download')}} {{appDetail.downloadTimes}}</p>
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
          <el-radio v-model="radio" label="1">{{$t('buyer.deploy.application')}}</el-radio>
        </el-col>
        <el-col :span="22" :offset="2">
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
                <el-form-item :label="$t('buyer.deploy.region')" @change="setRegionSelectValue">
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
                <el-form-item :label="$t('buyer.deploy.cpu')" @change="setParamCPU">
                  <el-select v-model="deployForm.cpuKernel">
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
      <!-- more choice -->
      <el-row class="margin-top" v-show="more">
        <el-col :span="2" :offset="1">
          <el-radio v-model="radio" label="2">{{$t('buyer.deploy.choosePool')}}</el-radio>
        </el-col>
        <el-col :span="20">
          <el-select v-model="spaceValue">
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
        <el-col :span="2" :offset="1">
          <el-radio v-model="radio" label="3">{{$t('buyer.deploy.noDeploy')}}</el-radio>
        </el-col>
      </el-row>
      <el-row class="more">
        <el-col :span="4" :offset="10" class="more-button" v-show="!more">
          <p @click="changeMore">
            {{$t('buyer.deploy.more')}}
            <i class="el-icon-arrow-down"></i>
          </p>
        </el-col>
        <el-col :span="4" :offset="10" class="more-button" v-show="more">
          <p @click="changeMore">
            {{$t('buyer.deploy.pick')}}
            <i class="el-icon-arrow-up"></i>
          </p>
        </el-col>
      </el-row>

      <!-- application setting -->
      <el-row>
        <el-col class="title" :span="12">
          <h1>{{$t('buyer.deploy.newApp')}}</h1>
        </el-col>
        <el-col class="title" :span="12">
          <h1>{{$t('buyer.deploy.version')}}</h1>
        </el-col>
      </el-row>
      <el-row class="margin-top">
        <el-form label-width="80px">
          <el-col :span="8" :offset="2">
            <el-form-item :label="$t('buyer.deploy.nameApp')">
              <el-input v-model="appDetail.name" :placeholder="$t('buyer.deploy.authorApp')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-form-item :label="$t('buyer.deploy.chooseVersion')">
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
            <el-form-item :label="$t('buyer.deploy.description')">
              <el-input v-model="input" :placeholder="$t('buyer.deploy.authorApp')"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="border-line"></el-row>

      <!-- configuration options -->
      <el-row class="configuration">
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.deploy.configurationOption')}}</h1>
        </el-col>
      </el-row>

        <ul>
            <li v-for="(groupData, index) in paramTree" :key="index">

                <ul>
                    <li v-for="(paramsL2,index) in groupData" :key="index">
                        <el-row class="margin-top">
                            <el-col
                                    class="configuration-box"
                                    :span="8"
                                    :offset="2"
                                    v-for="(param,index) in paramsL2"
                                    :key="index"
                            >

                            <!--<div v-if="param.type==='boolean'">-->
                                <!--<el-radio  v-model="param.default" label="true">是</el-radio>-->
                                <!--<el-radio  v-model="param.default" label="false">否</el-radio>-->
                            <!--</div>-->

                            <div v-if="param.type==='string' || param.type==='int' || param.type==='enum'" >
                                <p class="configuration-name">{{param.label}}：</p>
                                <el-input v-model="param.default" > </el-input>
                                <span>{{param.description}}</span>
                            </div>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </li>
        </ul>


      <!--<el-row class="margin-top">-->
        <!--<el-col-->
          <!--class="configuration-box"-->
          <!--:span="8"-->
          <!--:offset="2"-->
          <!--v-for="(configuration,index) in configurationList"-->
          <!--:key="index"-->
        <!--&gt;-->
          <!--<p class="configuration-name">CHECK_CPU_USAGE：</p>-->
          <!--<el-input v-model="input"></el-input>-->
          <!--<span>Enable CPU usage check</span>-->
        <!--</el-col>-->
      <!--</el-row>-->

      <el-row class="border-line"></el-row>
      <el-row>
        <el-col :span="4" :offset="10">
          <el-button type="success" @click="appPreDeploy">{{$t('buyer.deploy.deploy')}}</el-button>
        </el-col>
      </el-row>
    </el-row>

  </section>
</template>

<script>
    import * as app from '../../services/RancherService'
    import * as auth from '../../services/AuthService'
    import * as rancher from '../../services/RancherService'
    import { ServerConfigData, WrapDropDownDataUnit, WrapDropDownData } from '../../store/rancher_info'
    import * as project from '../../services/RancherService'
    import * as wallet from '../../services/WalletService'
    import * as order from '../../services/OrderService'

export default {
  name: 'Deployment',
  data() {
    return {
      radio: '1',
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
      spaceSel: [
        {
          value: '选项1',
          label: '0.1.7'
        },
        {
          value: '选项2',
          label: '0.0.2'
        }
      ],
      spaceValue: '0.1.2',
      // version
      versionSel: [],
      versionValue: '',
      // new application name
      input: '',
      // more button status
      more: false,
      configurationList: [
        { id: '1', name: 'Imagepuller', shop: '商店1' },
        { id: '2', name: 'Imagepuller', shop: '商店2' },
        { id: '3', name: 'Imagepuller', shop: '商店3' },
        { id: '4', name: 'Imagepuller', shop: '商店4' },
        { id: '1', name: 'Imagepuller', shop: '商店1' },
        { id: '2', name: 'Imagepuller', shop: '商店2' },
        { id: '3', name: 'Imagepuller', shop: '商店3' },
        { id: '4', name: 'Imagepuller', shop: '商店4' }
      ],
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
      fee: 0
    }
  },
    created () {
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
      }
    },
  methods: {
        parseConfigData(configData) {
          /// grouped data
          let paramTreeTmp = {}
          configData.map(param => {
            if (!paramTreeTmp.hasOwnProperty(param.group)) { paramTreeTmp[param.group] = [] }
            paramTreeTmp[param.group].push(param)
          })

          /// convert struct phase 2
          const groups = Object.keys(paramTreeTmp)
          groups.map(group => {
            let newgroup = []
            const curgroup = paramTreeTmp[group]

            curgroup.map(param => {
              const rebranchnode = param.showIf? param.showIf.endsWith('.enabled=true'):null
                // move node to the branch its belong
              if (!rebranchnode) {
                newgroup.push(param)
              } else {
                newgroup.find(paramup => {
                  if (param.showIf === paramup.variable + '=true') {
                    if (!paramup.subquestions) { paramup.subquestions = [] }
                    paramup.subquestions.push(param)
                  }
                })
              }

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
                  value: rancher.id,
                  label: auth.getCurLang() === 'zh-cn'? rancher.region :rancher.regionEnUs
                }
                regionData.push(region)
              })

              this.regionSel = regionData
            })
        },
        getAppDetail (appid) {
          app.appDetail(auth.getCurLang(), appid).then(respData => {
            if (respData.data.success) {
              const appInfo = respData.data.data
              this.appDetail = appInfo
              this.stackData.name = appInfo.name.replace(/\s+/g, '-')
              const versions = JSON.parse(this.appDetail.versionLinks)
              this.appDetail.versionlinks = []
              this.imgsrc = this.imageServerUrl + this.appDetail.rid + '/icon'
              this.price = this.appDetail.free ? this.$t('buyer.deploy.free'): this.price
              for (var key in versions) {
                var versionLink = versions[key]
                var versionId = versionLink.substr(versionLink.lastIndexOf('/') + 1)
                this.appDetail.versionlinks.push({label: key, value: versionId})
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
        getAppVersionDetail (appId, version) {
          app.appVersion(auth.getCurLang(), appId, version).then(respData => {
            if (respData.data.success) {
              this.appVersionDetail = respData.data.data
              // let files = JSON.parse(this.appVersionDetail.files)
              // this.appVersionDetail.files = files
              // this.appVersionDetail.readMe = files['README.md']
              // this.appVersionDetail.questions = JSON.parse(this.appVersionDetail.questions)
              this.parseConfigData(this.appVersionDetail.questions)
              this.appVersionDetail.questions.map(question => {
                const key = question.variable
                const value = question.defaultValue
                this.environment[key] = value
              })
            } else {
                  // this.$alert(respon.message, this.$t('common.messages.alert'), {
                  //     confirmButtonText: this.$t('common.messages.confirm')
                  // })
            }
          })
        },
        getUraPowerPoolList() {
          const projectQuertData = {
            'page': 0,
            'pageSize': 0,
            'projectName': '',
            'sort': '',
            'sortDesc': true
          }
          project.projectList(this.$store.getters.lang, projectQuertData)
              .then(respData => {
                const data = respData.data.data.records
                for (let i = 0; i < data.length; i++) {
                  let object = {}
                  object['value'] = data[i].id
                  object['label'] = data[i].projectName
                  this.spaceSel.push(object)
                }
                this.spaceValue = this.spaceSel[0].value
              })
        },
        getReferenceFee() {
          wallet.walletReferenceFee(auth.getCurLang())
              .then(reffee => {
                this.fee = reffee.data.data
              })
        },
        getConfirmCode() {
          wallet.walletConfirmCode(auth.getCurLang(), auth.getCurUserName())
              .then(sendResult => {
                  // const status = sendResult.data
              })
        },
        purchaseUraPowerPlus() {
          this.deployForm.beginTime = this.deployForm.dateRange[0]
          this.deployForm.endTime = this.deployForm.dateRange[1]

          // order.orderResource(auth.getCurLang(), this.deployForm)
              // .then(purcheStatus => {
              //   const purchStausData = purcheStatus.data
              //   console.log(purchStausData)
              //   if (purchStausData.success) {

          const purchStausData = {
            buyerAccount: '0x323ec4e944F0C78FA8254B213b7C1d495632622e',
            buyerId: 60,
            buyerName: '',
            createTime: 1548072518330,
            id: 59,
            orderAmount: 0.24255,
            orderHash: null,
            orderNo: '2019012100003',
            orderStatus: 1,
            paySuccessTime: null,
            poundage: 0.000378,
            prodType: 'UraPower',
            sellerAccount: '0x323ec4e944F0C78FA8254B213b7C1d495632622e',
            sellerId: 60,
            sellerName: '',
            updateTime: 1548072518330,
            projectId: 133
          }
          this.gridData = [purchStausData]
          this.spaceValue = purchStausData.projectId
          this.appDeploy()
          //   }
          // })
        },
        appPreDeploy() {
          if (this.radio === '1') { // delopy with new UraPower
            this.purchaseUraPowerPlus()
          } else if (this.radio === '2') { // deploy with exsit UraPower
            this.appDeploy()
          } else { // do not deploy

          }
        },
        appDeploy() {
          this.appDeployParam['appId'] = this.appId
          this.appDeployParam['appVersion'] = this.versionValue
          this.appDeployParam['config'] = JSON.stringify(this.paramTree)
          this.appDeployParam['description'] = this.appDetail.description
          this.appDeployParam['name'] = this.appDetail.name
          this.appDeployParam['projectId'] = 93
          app.appInstanceDeploy(auth.getCurLang(), this.appDeployParam)
                .then(respData => {
                  const deployData = respData.data
                  if (deployData.success) {
                    this.outerVisible = true
                  } else {
                    this.$message('部署应用失败')
                  }
                })
        }
  }
}
</script>

<style lang="scss" scoped>
.deployment {
  background: #f2f2f2;
  min-width: 1130px;
  .el-dialog {
    .code {
      width: 500px;
      display: flex;
      margin: 25px;
      span {
        width: 85px;
        font-family: PingFang-SC-Medium;
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
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #f54c46;
      line-height: 20px;
    }
  }
  .resourceBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 20px;
    .border-line {
      border-bottom: 1px solid #e9e9e9;
      margin-top: 33px;
      margin-bottom: 30px;
    }
    .bg {
      background: #fafafa;
    }
    .title {
      border-radius: 4px 4px 0 0;
      height: 54px;
      margin-bottom: 25px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .detial {
      height: 155px;
      img {
        height: 100px;
        width: 100px;
        margin-top: 30px;
      }
      h2 {
        font-family: ArialMT;
        font-size: 18px;
        color: #363636;
        line-height: 22px;
        text-align: left;
      }
      p {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
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
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
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
      .configuration-box {
        margin-bottom: 30px;
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          text-align: left;
          line-height: 24px;
        }
        span {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.25);
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
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #979797;
        line-height: 22px;
      }
    }
    .el-button {
      margin-bottom: 30px;
      background: #8eb357;
      border-radius: 5px;
      border: none;
      width: 200px;
      height: 34px;
    }
  }
}
</style>
