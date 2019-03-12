<template>
  <section class="login">
    <div class="back">
      <router-link :to="{path: '/'}">
        <i class="iconfont icon-back"></i>
      </router-link>
    </div>
    <div class="loginHead">
      <img src="/static/img/uranus/head.png" alt>
    </div>
    <div class="loginContent">
      <div class="btnChoose">
        <div class="btnMail" @click="chooseMail">
          <span :class="{chooseBtn:!phoneShow}">{{$t('userCommon.EmailLogin')}}</span>
        </div>
        <div class="btnPhone" @click="choosePhone">
          <span :class="{chooseBtn:phoneShow}">{{$t('userCommon.mobileLogin')}}</span>
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
            oninput="value=value.replace(/[^\d]/g,'')"
            class="phoneIpt"
            type="text"
            ref="mobileNumber"
            v-model="phone"
            :placeholder="$t('userCommon.mobile')"
          >
        </div>
      </div>
      <div class="mailRes" v-show="!phoneShow">
        <input type="text" :placeholder="$t('userCommon.Email')" v-model="mail">
      </div>
      <input type="password" :placeholder="$t('userCommon.password')" v-model="password">
      <router-link class="forgetPwd" :to="{ path: '/forgetPwd'}">{{$t('userCommon.forgetPwd')}}</router-link>
      <div class="prompt">{{prompt}}</div>
      <el-button class="loginBtn" @click="userLogin">{{user}} {{$t('userCommon.loginBtn')}}</el-button>
    </div>
  </section>
</template>

<script>
import * as auth from '../services/AuthService'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {
    return {
      phoneShow: true,
      // 用户身份
      user: '',
      // 提示信息
      prompt: '',
      // 用户登录信息
      phone: '',
      mail: '',
      password: '',
      // 地区代码
      regions: [],
      currentRegion: '86'
    }
  },
  methods: {
    getUser() {
      let userStatus = auth.getUserBaseInfo()
      if (!userStatus) {
        userStatus = auth.getDefaultUserStatus()
        auth.setCurRole(userStatus.loginRole)
        this.user = userStatus.loginRole
      }

      this.user = auth.getCurRole()
    },
    getRegionList2() {
      auth.country(auth.getCurLang()).then(resdata => {
        this.regions = resdata.data.data
      })
    },
    selectRegion(region) {
      this.currentRegion = region
    },
    getLoginName: function (logintype) {
      let loginname = ''
      if (logintype === 'mobile') {
        loginname = this.currentRegion + this.phone
      } else {
        loginname = this.mail
      }
      return loginname
    },
    choosePhone() {
      this.phoneShow = true
      this.phone = ''
      this.mail = ''
      this.password = ''
      this.prompt = ''
    },
    chooseMail() {
      this.phoneShow = false
      this.phone = ''
      this.mail = ''
      this.password = ''
      this.prompt = ''
    },
    userLogin() {
      if (this.phoneShow == true) {
        if (this.phone === '') {
          this.prompt = this.$t('userCommon.phoneError')
        } else if (this.password === '') {
          this.prompt = this.$t('userCommon.passwordEmpty')
        } else if (this.password.length < 6 || this.password.length > 12) {
          this.prompt = this.$t('userCommon.password')
        } else {
          this.prompt = ''
          const logintype = this.phoneShow ? 'mobile' : 'email'
          const userLoginfo = {
            loginName: this.getLoginName(logintype),
            password: this.password,
            loginType: logintype
          }

          const self = this

          auth.login(auth.getCurLang(), userLoginfo)
            .then(function (respData) {
              let data = respData.data
              if (data.success) {
                self.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                // self.$router.push({ path: respData.curLoginUserInfo.loginRole })
                location.href = respData.curLoginUserInfo.loginRole
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
                message: 'Network Connection Failure',
                type: 'error'
              })
            })
          // .catch(error => {
          //   if (error) {
          //     alert('登录不成功')
          //   }
          // })
          const globalUserinfo = auth.getUserBaseInfo()
        }
      }
      if (this.phoneShow == false) {
        if (this.mail === '') {
          this.prompt = this.$t('userCommon.EmailError')
        } else if (this.password === '') {
          this.prompt = this.$t('userCommon.passwordEmpty')
        } else if (this.password.length < 6 || this.password.length > 12) {
          this.prompt = this.$t('userCommon.password')
        } else {
          this.prompt = ''
          const logintype = this.phoneShow ? 'mobile' : 'email'
          const userLoginfo = {
            loginName: this.getLoginName(logintype),
            password: this.password,
            loginType: logintype
          }

          const self = this

          auth.login(auth.getCurLang(), userLoginfo)
            .then(function (respData) {
              let data = respData.data
              if (data.success) {
                self.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                // self.$router.push({ path: respData.curLoginUserInfo.loginRole })
                location.href = respData.curLoginUserInfo.loginRole
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
          // .catch(error => {
          //   if (error) {
          //     alert('登录不成功')
          //   }
          // })
          const globalUserinfo = auth.getUserBaseInfo()
        }
      }
    }
  },
  mounted() {
    this.getRegionList2()
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #161618;
  //   background-size: cover;
  text-align: center;
  position: absolute;
  .back {
    position: relative;
    height: 50px;
    width: 50px;
    left: 50px;
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
  .loginHead {
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
  .loginContent {
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
          background: #25262F;
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
      background: #25262F;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      width: 378px;
      height: 38px;
      margin: 12px auto;
      padding-left: 20px;
      color: #A2A6B0;
    }
    .forgetPwd {
      font-size: 14px;
      color: #627100;
      text-align: right;
      line-height: 22px;
      margin-left: 205px;
    }
    .forgetPwd:hover {
        color: #a2ae44;
    }
    .loginBtn {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 4px;
      width: 380px;
      height: 40px;
      margin-left: 0;
      margin-top: 24px;
      font-size: 16px;
      color: #ffffff;
    }
    .loginBtn:hover {
      background: #627100;
      border: 1px solid #627100;
    }
    .prompt {
      color: #ff5640;
      text-align: left;
      padding-left: 20px;
    }
  }
}
</style>