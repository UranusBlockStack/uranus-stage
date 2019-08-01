<template>
  <section class="upload">
    <el-row class="content-title">
      <el-col
        class="title"
        :span="12"
      >
        <h1><i class="iconfont icon-upload"></i>{{$t('developer.uploadApplication.upload')}}</h1>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col
        class="head"
        :span="24"
      >
        <h2>{{$t('developer.uploadApplication.information')}}</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="160px"
        >
          <el-form-item v-if="!this.existsBtn" :label="this.$t('developer.uploadApplication.name')">
            <el-input
              style="width: 45%;"
              v-model="form.loginNameIn"
            ></el-input> -
            <el-input
              style="width: 45%;"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="this.existsBtn" :label="this.$t('developer.uploadApplication.name')">
            <el-input
              class="existsName"
              v-model="form.name"
              
            >
              <template slot="prepend">{{form.loginName}} - </template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="镜像简介">
            <el-input
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="镜像版本">
            <el-select
              v-model="form.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="this.$t('developer.uploadApplication.mode')">
            <el-radio
              v-model="radio"
              label="1"
              @change="setPrice()"
            >{{$t('developer.uploadApplication.free')}}</el-radio>
            <br />
            <el-radio
              v-model="radio"
              label="2"
            >{{$t('developer.uploadApplication.change')}}</el-radio>
          </el-form-item>
          <el-form-item
            v-if="this.radio == '2'"
            :label="this.$t('developer.uploadApplication.price')"
          >
            <el-input
              class="el-price"
              v-model="form.price"
              :placeholder="this.$t('developer.uploadApplication.priceIn')"
              min="0"
              type="number"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
        v-if="this.existsBtn"
        :span="18"
        :offset="6"
      >
        <el-button
          type="success"
          @click="buildName"
        >
          Build Application
        </el-button>
      </el-col>
      <el-col
        v-if="!this.existsBtn"
        :span="18"
        :offset="6"
      >
        <el-button
          type="success"
          @click="buildUser"
        >
          Build Application name
        </el-button>
      </el-col>
    </el-row>
    <el-row
      v-if="this.upload"
      class="content"
    >
      <el-col
        class="head"
        :span="24"
      >
        <h2>{{$t('developer.uploadApplication.package')}}</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <!-- <el-form-item label="镜像logo">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div
                class="el-upload__tip"
                slot="tip"
              >上传图片：尺寸16*16，大小20K以内，PNG格式
                (logo将会在云市场商品列表及商品详情页展示)</div>
            </el-upload>
          </el-form-item> -->
          <el-form-item :label="this.$t('developer.uploadApplication.archive')">
            <el-upload
              class="upload-demo"
              drag
              :action= this.apiUrl
              multiple
              :on-success="uploadSuccess"
              :on-error="uploadError"
              name="chart"
              :limit="1"
              :headers='this.headers'
              :on-exceed="uploadEx"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{$t('developer.uploadApplication.here')}}<em>{{$t('developer.uploadApplication.click')}}</em></div>
              <div
                class="el-upload__tip"
                slot="tip"
              >{{$t('developer.uploadApplication.requires')}}</div>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item label="镜像分类">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="支持系统">
            <el-input v-model="form.desc"></el-input>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as account from '../../services/AccountService'
import * as app from '../../services/RancherService'
import { Message } from 'element-ui'

export default {
  name: 'UploadApplication',
  data() {
    return {
      radio: '1',
      existsBtn: false,
      form: {
        loginName: '',
        loginNameIn: '',
        name: '',
        price: '0',
        projectName: 'uranus-cloud'
      },
      appId: '',
      upload: false,
      headers: {
        Authorization: auth.getToken(),
        Language: auth.getCurLang()
      },
      apiUrl: ''
    }
  },
  methods: {
    userName() {
      account.userInfo(auth.getCurLang(), auth.getUserBaseInfo().userId).then(userInfo => {
        if (userInfo.data.data.loginName == '' || userInfo.data.data.loginName == null) {
          this.existsBtn = false
        } else {
          this.existsBtn = true
          this.form.loginName = userInfo.data.data.loginName
        }
      })
    },
    setPrice() {
      if (this.radio == '1') {
        this.form.price = '0'
      } else {
        this.price
      }
    },
    buildName() {
      const reqData = {
        name: this.form.loginName + '-' + this.form.name,
        price: this.form.price,
        projectName: this.form.projectName,
        rancherId: 2
      }
      if (this.form.name === '') {
        this.$message({
          showClose: true,
          message: 'Application name cannot be empty',
          type: 'error'
        })
      } else {
        app.buildApp(auth.getCurLang(), reqData).then(resData => {
          if (resData.data.success) {
            this.$message({
              showClose: true,
              message: 'Application name registration is successful, please upload the application package',
              type: 'success'
            })
            this.upload = true
            this.appId = resData.data.data
            this.apiUrl = this.$store.state.apiUrl + 'catalog/charts/uranus-cloud/' + this.appId
          } else {
            this.$message({
              showClose: true,
              message: resData.data.errMsg,
              type: 'error'
            })
          }
        })
      }
    },
    buildUser() {
      const userIn = this.form.loginNameIn
      if (userIn === '') {
        this.$message({
          showClose: true,
          message: 'Application name cannot be empty',
          type: 'error'
        })
      } else {
        account.userName(auth.getCurLang(), userIn).then(res => {
        if (res.success) {
          this.buildName()
        } else {
          this.$message({
            showClose: true,
            message: res.errMsg,
            type: 'error'
          })
        }
      })
      }
    },
    uploadSuccess(res) {
      console.log('success', res)
      if (res.success) {
        this.$router.push({ path: '/myapplication' })
      } else {
        this.$message({
          showClose: true,
          message: res.errMsg,
          type: 'error'
        })
      }
    },
    uploadError(res) {
      console.log('error', res)
      this.$message({
        showClose: true,
        message: 'Upload failed',
        type: 'error'
      })
    },
    uploadEx() {
      this.$message({
        showClose: true,
        message: 'Upload file already',
        type: 'error'
      })
    }
  },
  created() {
    this.userName()
  }
}
</script>

<style lang="scss" scoped>
.upload {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  width: 100%;
  .content-title {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #727680;
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
  .content {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    padding-left: 30px;
    .el-button {
      margin-bottom: 30px;
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 5px;
      width: 200px;
      height: 34px;
    }
    .el-form /deep/ .el-form-item__label {
      text-align: left;
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
    .head {
      height: 50px;
      h2 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #727680;
        line-height: 24px;
        text-align: left;
        margin: 0;
        padding: 0;
      }
    }
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
    .existsName /deep/ .el-input__inner {
      border-left: none;
    }
    .el-input /deep/ .el-input-group__prepend {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
      border-right: none;
    }
    .el-price /deep/ .el-input__inner {
      width: 150px;
    }
    .el-textarea /deep/ .el-textarea__inner {
      height: 150px;
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      font-weight: 400;
    }
    .upload-demo /deep/ .el-upload-dragger {
      background: transparent;
      border-color: rgba(255, 255, 255, 0.1);
    }
    .upload-demo /deep/ .el-upload-dragger:hover {
      border-color: #627100;
    }
    .upload-demo /deep/ input {
      display: none;
    }
    .upload-demo /deep/ .el-upload-dragger .el-upload__text em {
      color: #627100;
    }
  }
}
</style>

