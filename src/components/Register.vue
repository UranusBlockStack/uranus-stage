<template>
  <section class="register">
    <div class="back">
      <router-link :to="{path: '/'}">
        <i class="iconfont icon-back"></i>
      </router-link>
    </div>
    <div class="registerHead">
      <img src="/static/img/uranus/head.png">
    </div>
    <div class="registerContent">
      <div class="btnChoose">
        <div class="btnMail" @click="chooseMail">
          <span :class="{chooseBtn:!phoneShow}">{{$t('userCommon.EmailRegister')}}</span>
        </div>
        <div class="btnPhone" @click="choosePhone">
          <span :class="{chooseBtn:phoneShow}">{{$t('userCommon.mobileRegister')}}</span>
        </div>
      </div>
      <div class="phoneRes" v-show="phoneShow">
        <div class="input-group">
          <div class="input-group-btn">
            <button
              type="button"
              class="phoneHead btn btn-default dropdown-toggle"
              data-toggle="dropdown"
            >
              {{currentRegion}}
              <span class="fa fa-caret-down"></span>
            </button>
            <ul
              class="dropdown-menu"
              style="max-height: 250px; overflow: scroll; overflow-x: hidden;"
            >
              <li v-for="(item,index) in regions" :key="index">
                <a href="#" :id="item.prefix" @click="selectRegion(item.prefix)">{{ item.fullName }}</a>
              </li>
            </ul>
          </div>
          <input
            class="phoneIpt"
            oninput="value=value.replace(/[^\d]/g,'')"
            ref="loginMobile"
            v-model="phone"
            :placeholder="$t('userCommon.mobile')"
          >
        </div>
      </div>
      <div class="mailRes" v-show="!phoneShow">
        <input type="text" v-model="mail" :placeholder="$t('userCommon.Email')" ref="loginEmail">
      </div>
      <input
        type="password"
        v-model="password"
        :placeholder="$t('userCommon.password')"
        ref="password"
        @blur="checkPassword"
      >
      <input
        type="password"
        v-model="surepwd"
        :placeholder="$t('userCommon.confirmPwd')"
        @blur="surePassword"
      >
      <input
        oninput="value=value.replace(/[^\d]/g,'')"
        class="inputCode"
        v-model="code"
        ref="verifyCodeInput"
        :placeholder="$t('userCommon.code')"
      >
      <button
        class="getCode"
        :class="{disabledGet: !this.canClick}"
        @click="countDown(content)"
      >{{content}}</button>
      <div class="prompt">{{prompt}}</div>
      <button class="registerBtn" @click="registerUser">{{$t('userCommon.registerBtn')}}</button>
    </div>
  </section>
</template>

<script>
import * as auth from '../services/AuthService'
import { Message } from 'element-ui'

export default {
  name: 'Register',
  data() {
    return {
      phoneShow: true,
      totalTime: 60,
      canClick: true,
      content: this.$t('userCommon.codeBtn'),
      phone: '',
      mail: '',
      password: '',
      surepwd: '',
      code: '',
      prompt: '',
      regions: [],
      currentRegion: '86'
    }
  },

  methods: {
    getRegionList2() {
      auth.country(this.$store.getters.lang).then(resdata => {
        this.regions = resdata.data.data
      })
    },
    selectRegion(region) {
      this.currentRegion = region
    },
    getLoginName: function (logintype) {
      let loginname = ''
      if (logintype === 'mobile') {
        loginname = this.currentRegion + this.$refs.loginMobile.value
      } else {
        loginname = this.$refs.loginEmail.value
      }
      return loginname
    },
    choosePhone() {
      this.phoneShow = true
      this.phone = ''
      this.mail = ''
      this.password = ''
      this.surepwd = ''
      this.code = ''
      this.prompt = ''
    },
    chooseMail() {
      this.phoneShow = false
      this.phone = ''
      this.mail = ''
      this.password = ''
      this.surepwd = ''
      this.code = ''
      this.prompt = ''
    },
    // Input box validation
    checkPassword() {
      if (this.password === '') {
        this.prompt = this.$t('userCommon.passwordEmpty')
      } else if (this.password.length < 6 || this.password.length > 12) {
        this.prompt = this.$t('userCommon.password')
      } else {
        this.prompt = ''
      }
    },
    surePassword() {
      if (this.surepwd.length < 6 || this.surepwd.length > 12) {
        this.prompt = this.$t('userCommon.password')
      } else if (this.surepwd !== this.password) {
        this.prompt = this.$t('userCommon.passwordInconsistent')
      } else {
        this.prompt = ''
      }
    },
    registerUser() {
      if (this.phoneShow == true) {
        if (this.phone === '') {
          this.prompt = this.$t('userCommon.phoneError')
        } else if (this.password === '') {
          this.prompt = this.$t('userCommon.passwordEppty')
        } else if (this.password.length < 6 || this.password.length > 12) {
          this.prompt = this.$t('userCommon.password')
        } else if (this.code == '') {
          this.prompt = this.$t('userCommon.code')
        } else {
          const logintype = this.phoneShow ? 'mobile' : 'email'
          const user = {
            captcha: this.$refs.verifyCodeInput.value,
            loginName: this.getLoginName(logintype),
            loginType: logintype,
            password: this.$refs.password.value
          }

          var self = this

          auth.registerUser(this.$store.getters.lang, user)
            .then(regResp => {
              let data = regResp.data
              if (data.success) {
                this.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                self.$router.push({ name: 'Map' })
              } else {
                this.$message({
                  showClose: true,
                  message: data.errMsg,
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              })
            })
        }
      }
      if (this.phoneShow == false) {
        if (this.mail === '') {
          this.prompt = this.$t('userCommon.EmailError')
        } else if (this.password === '') {
          this.prompt = this.$t('userCommon.passwordEppty')
        } else if (this.password.length < 6 || this.password.length > 12) {
          this.prompt = this.$t('userCommon.password')
        } else if (this.code == '') {
          this.prompt = this.$t('userCommon.code')
        } else {
          const logintype = this.phoneShow ? 'mobile' : 'email'
          const user = {
            captcha: this.$refs.verifyCodeInput.value,
            loginName: this.getLoginName(logintype),
            loginType: logintype,
            password: this.$refs.password.value
          }

          var self = this

          auth.registerUser(this.$store.getters.lang, user)
            .then(regResp => {
              let data = regResp.data
              if (data.success) {
                self.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                self.$router.push({ name: 'Map' })
              } else {
                self.$message({
                  showClose: true,
                  message: data.errMsg,
                  type: 'error'
                })
              }
            }).catch(err => {
              self.$message({
                showClose: true,
                message: err,
                type: 'error'
              })
            })
        }
      }
    },
    countDown() {
      if (!this.canClick) return
      if (this.phoneShow == true) {
        if (this.phone === '') {
          this.prompt = this.$t('userCommon.phoneError')
        }
      }
      if (this.phoneShow == false) {
        if (this.mail === '') {
          this.prompt = this.$t('userCommon.EmailError')
        }
      }
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

      const logintype = this.phoneShow ? 'mobile' : 'email'
      const param = {
        captchaType: 0,
        receiver: this.getLoginName(logintype),
        senderType: logintype
      }
      auth.captcha('zh-cn', param)
    }
  },
  mounted() {
    this.getRegionList2()
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #161618;
  //   background-size: cover;
  text-align: center;
  position: absolute;
  .back {
    position: relative;
    height: 30px;
    width: 50px;
    left: 30px;
    top: 50px;
    a {
      color: #627100;
      i {
        font-size: 28px;
      }
    }
    a:hover {
      color: #a2ae44;
    }
  }
  .registerHead {
    margin: 0 auto;
    width: 380px;
    height: 230px;
    overflow: hidden;

    img {
      height: 87px;
      width: 300px;
      margin: 0 auto;
      margin-top: 110px;
    }
  }
  .registerContent {
    height: 420px;
    width: 380px;
    margin: 0 auto;
    .btnChoose {
      width: 380px;
      height: 80px;
      .btnMail,
      .btnPhone {
        float: left;
        width: 190px;
        height: 50px;
        margin-top: 15px;
        cursor: pointer;
        span {
          font-family: Source-Sans-Pro-Bold;
          font-weight: 300;
          display: inline-block;
          height: 30px;
          font-size: 16px;
          line-height: 24px;
          color: #A2A6B0;
          text-align: center;
        }
        .chooseBtn {
          font-family: Source-Sans-Pro-Bold;
          font-weight: 500;
          border-bottom: 2px solid #A2A6B0;
          color: #A2A6B0;
          transition: all 0.5s;
        }
      }
    }
    input::-webkit-input-placeholder {
      color: #A2A6B0;
      font-family: Source-Sans-Pro-Regular;
    }
    .phoneRes {
      width: 380px;
      .input-group {
        width: 380px;
        .phoneHead {
          background: #1d1e23;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-right: none;
          border-radius: 4px 0 0 4px;
          width: 70px;
          height: 38px;
          color: #A2A6B0;
        }
      }
      .phoneIpt {
        width: 310px;
      }
    }
    input {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      width: 378px;
      height: 38px;
      margin: 12px auto;
      padding-left: 20px;
      color: #A2A6B0;
      opacity: 0.6;
    }
    .inputCode {
      width: 265px;
    }
    .getCode {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 4px;
      width: 110px;
      height: 38px;
      font-size: 14px;
      color: #A2A6B0;
      line-height: 22px;
      text-align: center;
    }
    .getCode:hover {
      background-color: #627100;
      border-color: #627100;
    }
    .disabledGet {
      background-color: #627100;
      border-color: #627100;
      color: #A2A6B0;
      cursor: not-allowed;
    }
    .registerBtn {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 4px;
      width: 380px;
      height: 40px;
      margin-left: 0;
      margin-top: 24px;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
    }
    .registerBtn:hover {
      background: #627100;
      border: 1px solid #627100;
    }
    .prompt {
      text-align: left;
      padding-left: 20px;
      color: #ff5640;
    }
  }
}
</style>
