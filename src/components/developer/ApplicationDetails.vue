<template>
  <section class="appDetail">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>Confirm to delete version {{ this.versionValue }} of {{ this.appDetail.name }} ?</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="deleteApp"
          >Confirm</el-button>
        </span>
      </el-dialog>
    <el-row class="resourceBox">
      <el-row>
        <el-col
          class="title bg"
          :span="24"
        >
          <h1>Application details</h1>
        </el-col>
      </el-row>
      <el-row class="detial">
        <el-col
          :span="2"
          :offset="1"
        >
          <div class="img-box">
            <img :src="imgsrc">
          </div>
        </el-col>
        <el-col
          :span="8"
          :offset="2"
        >
          <h2>{{ $t("buyer.deploy.name") }} {{ appDetail.name }}</h2>
          <p>{{ $t("buyer.deploy.appDetail") }} {{ appDetail.description }}</p>
        </el-col>
        <el-col
          class="border-col"
          :span="6"
          :offset="1"
        >
          <p>{{ $t("buyer.deploy.price") }} {{ price }}</p>
          <p>
            {{ $t("buyer.deploy.from") }} {{ $t("buyer.deploy.store") }}
            {{ appDetail.catalog }}
          </p>
          <p>{{ $t("buyer.deploy.download") }} {{ appDetail.downloadTimes }}</p>
        </el-col>
      </el-row>
      <el-row class="border-line"></el-row>
      <el-row>
        <el-col
          class="title"
          :span="12"
        >
          <h1>{{ $t("buyer.deploy.version") }}</h1>
        </el-col>
      </el-row>
      <el-row class="margin-top">
        <el-form label-width="160px">
          <el-col
            :span="10"
            :offset="2"
          >
            <el-form-item>
              <span slot="label">
                <i class="iconfont icon-version"></i>
                {{ $t("buyer.deploy.chooseVersion") }}
              </span>
              <el-select
                v-model="versionValue"
                @change="selectVersion()"
              >
                <el-option
                  v-for="item in versionSel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="border-line"></el-row>

      <!-- configuration options -->
      <el-row class="configuration">
        <el-col
          class="title"
          :span="24"
        >
          <h1>{{ $t("buyer.deploy.configurationOption") }}</h1>
        </el-col>
      </el-row>

      <ul v-if="this.configuration">
        <li
          v-for="(groupData, index) in paramTree"
          :key="index"
        >
          <ul>
            <li
              v-for="(paramsL2, index) in groupData"
              :key="index"
            >
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
                    <p class="appOptions">{{param.default}}</p>
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
        <el-col
          :span="4"
          :offset="10"
        >
          <el-button
            type="success"
            @click="dialogVisible = true"
          >
            Delete
          </el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import * as app from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import * as catalog from '../../services/CatalogService'
import { appConfigParser } from '../../lib/config_parser'
import { Message } from 'element-ui'

export default {
  name: 'ApplicationDetails',
  data() {
    return {
      imageServerUrl: this.$store.state.imageServerUrl,
      imgsrc: '',
      price: '',
      // version
      versionSel: [],
      versionValue: '',
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
      paramTree: [],
      configuration: false,
      dialogVisible: false
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
    }
  },

  methods: {
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
      console.log(appId, version)
      app.appVersion(auth.getCurLang(), appId, version).then(respData => {
        if (respData.data.success) {
          this.appVersionDetail = respData.data.data
          // let files = JSON.parse(this.appVersionDetail.files)
          // this.appVersionDetail.files = files
          // this.appVersionDetail.readMe = files['README.md']
          console.log(this.appVersionDetail)
          if (this.appVersionDetail.questions != null) {
            this.paramTree = appConfigParser(this.appVersionDetail.questions)
            this.configuration = true
          } else {
            this.configuration = false
          }

        } else {
          console.log('error')
          // this.$alert(respon.message, this.$t('common.messages.alert'), {
          //     confirmButtonText: this.$t('common.messages.confirm')
          // })
        }
      })
    },
    selectVersion() {
      this.getAppVersionDetail(this.appId, this.versionValue)
    },
    deleteApp(app) {
      catalog.deleteApp(auth.getCurLang(), this.appDetail.name, this.appDetail.catalog, this.versionValue).then(res => {
        if (res.data.success) {
          this.$router.push({ path: '/myapplication' })
        } else {
          this.$message({
            showClose: true,
            message: res.data.errMsg,
            type: 'error'
          })
        }
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.appDetail {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  .resourceBox {
    background: #161618;
    border-radius: 2px;
    margin: 2px;
    .el-form /deep/ .el-form-item__label {
      text-align: left;
    }
    .border-line {
      border-bottom: 2px solid #000;
      margin-top: 33px;
      margin-bottom: 30px;
    }
    .bg {
      background: rgba(101, 143, 247, 0);
    }
    .el-button {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 3px;
    }
    .el-button:hover {
      background: #627100;
      border: 1px solid #627100;
    }
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
    }
    .el-select /deep/ .el-select__caret {
      color: #a2a6b0;
    }
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
    }
    .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
    }
    .el-input__inner /deep/ .el-range-input {
      background: #1d1e23;
      color: #a2a6b0;
    }
    .el-radio {
      color: #a2a6b0;
    }
    .el-radio /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #627100;
    }
    .el-radio /deep/ .el-radio__input.is-checked .el-radio__inner {
      color: #627100;
      background: #627100;
      border-color: #627100;
    }
    .el-radio /deep/ .el-radio__inner:hover {
      border-color: #627100;
    }
    .title {
      border-radius: 4px 4px 0 0;
      height: 54px;
      margin-bottom: 25px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
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
        }
      }
      h2 {
        font-family: ArialMT;
        font-size: 18px;
        color: #a2a6b0;
        line-height: 22px;
        text-align: left;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        letter-spacing: 0;
        line-height: 22px;
        text-align: left;
      }
      .border-col {
        margin-top: 60px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        p {
          padding-left: 50px;
        }
      }
      .inf-col {
        margin-top: 60px;
        span {
          font-family: Source-Sans-Pro-Bold;
          font-size: 16px;
          color: #a2a6b0;
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
        color: #a2a6b0;
        line-height: 24px;
        font-weight: 400;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
      .configuration-box {
        margin-bottom: 30px;
        p {
          font-size: 16px;
          color: #a2a6b0;
          text-align: left;
          line-height: 24px;
        }
        .appOptions {
          border: 1px solid #333440;
          border-radius: 3px;
          width: 298px;
          height: 34px;
          line-height: 34px;
          padding-left: 5px;
        }
        span {
          font-size: 16px;
          color: #a2a6b0;
          text-align: left;
          line-height: 24px;
        }
      }
    }
    .el-button {
      margin-bottom: 30px;
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 5px;
      width: 200px;
      height: 34px;
    }
  }
}
</style>
