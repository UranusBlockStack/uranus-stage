<template>
  <section class="register">
    <div class="back">
      <router-link :to="{path: '/map'}">
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
            <ul class="dropdown-menu">
              <li v-for="item in regions">
                <a href="#" :id="item.prefix" @click="selectRegion(item.prefix)">{{ item.fullName }}</a>
              </li>
            </ul>
          </div>
          <input
            class="phoneIpt"
            type="text"
            ref="loginMobile"
            :placeholder="$t('userCommon.mobile')"
          >
        </div>
      </div>
      <div class="mailRes" v-show="!phoneShow">
        <input type="text" :placeholder="$t('userCommon.Email')" ref="loginEmail">
      </div>
      <input type="password" :placeholder="$t('userCommon.password')" ref="password">
      <input type="password" :placeholder="$t('userCommon.confirmPwd')">
      <input
        type="text"
        class="inputCode"
        ref="verifyCodeInput"
        :placeholder="$t('userCommon.code')"
      >
      <button
        class="getCode"
        :class="{disabledGet: !this.canClick}"
        @click="countDown(content)"
      >{{content}}</button>
      <button class="registerBtn" @click="registerUser">{{$t('userCommon.registerBtn')}}</button>
    </div>
  </section>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  name: "Register",
  data() {
    return {
      phoneShow: true,
      totalTime: 10,
      canClick: true,
      content: this.$t("userCommon.codeBtn"),
      regions: [],
      currentRegion: "86"
    };
  },

  methods: {
    getRegionList2() {
      auth.country(this.$store.getters.lang).then(resdata => {
        this.regions = resdata.data.data;
      });
    },
    selectRegion(region) {
      this.currentRegion = region;
    },
    getLoginName: function(logintype) {
      let loginname = "";
      if (logintype === "mobile") {
        loginname = this.currentRegion + this.$refs.loginMobile.value;
      } else {
        loginname = this.$refs.loginEmail.value;
      }
      return loginname;
    },
    choosePhone() {
      this.phoneShow = true;
    },
    chooseMail() {
      this.phoneShow = false;
    },
    registerUser() {
      const logintype = this.phoneShow ? "mobile" : "email";
      const user = {
        captcha: this.$refs.verifyCodeInput.value,
        loginName: this.getLoginName(logintype),
        loginType: logintype,
        password: this.$refs.password.value
      };

      auth.registerUser(this.$store.getters.lang, user);
    },
    countDown() {
      if (!this.canClick) return;
      this.canClick = false;
      this.content =
        this.$t("userCommon.codeTime") + "(" + this.totalTime + "s)";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content =
          this.$t("userCommon.codeTime") + "(" + this.totalTime + "s)";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = this.$t("userCommon.codeTime");
          this.totalTime = 10;
          this.canClick = true;
        }
      }, 1000);

      const param = {
        captchaType: 0,
        receiver: this.currentRegion + this.$refs.loginMobile.value,
        senderType: "mobile"
      };
      auth.captcha("zh-cn", param);
    }
  },
  mounted() {
    this.getRegionList2();
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: no-repeat url(/static/img/uranus/bg.png);
  background-size: cover;
  text-align: center;
  position: absolute;
  .back {
    position: relative;
    height: 30px;
    width: 50px;
    left: 30px;
    top: 50px;
    a {
      color: #1890ff;
      font-size: 18px;
      i {
        font-size: 28px;
      }
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
          display: inline-block;
          height: 30px;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.65);
          text-align: center;
        }
        .chooseBtn {
          font-family: Source-Sans-Pro-Bold;
          font-weight: 500;
          border-bottom: 2px solid #81a028;
          color: #81a028;
          transition: all 0.5s;
        }
      }
    }
    input::-webkit-input-placeholder {
      color: #c8c8c8;
      font-family: Source-Sans-Pro-Regular;
    }
    .phoneRes {
      width: 380px;
      .input-group {
        width: 380px;
        .phoneHead {
          background: #ffffff;
          border: 1px solid #d9d9d9;
          border-right: none;
          border-radius: 4px 0 0 4px;
          width: 70px;
          height: 38px;
        }
      }
      .phoneIpt {
        width: 310px;
      }
    }
    input {
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      width: 378px;
      height: 38px;
      margin: 12px auto;
      padding-left: 20px;
    }
    .inputCode {
      width: 265px;
    }
    .getCode {
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      width: 110px;
      height: 38px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      text-align: center;
    }
    .disabledGet {
      background-color: #ddd;
      border-color: #ddd;
      color: #57a3f3;
      cursor: not-allowed;
    }
    .registerBtn {
      background: #1890ff;
      border-radius: 4px;
      width: 380px;
      height: 40px;
      margin-left: 0;
      margin-top: 24px;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
    }
  }
}
</style>
