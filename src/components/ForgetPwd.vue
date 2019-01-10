<template>
  <section class="forgetPwd">
    <div class="back">
      <router-link :to="{path: '/map'}">Back</router-link>
    </div>
    <div class="forgetPwdHead">
      <img src="/static/img/uranus/head.png" alt>
    </div>
    <div class="forgetPwdContent">
      <div class="btnChoose">
        <div class="btnMail" @click="chooseMail">
          <span :class="{chooseBtn:!phoneShow}">{{$t('userCommon.EmailReset')}}</span>
        </div>
        <div class="btnPhone" @click="choosePhone">
          <span :class="{chooseBtn:phoneShow}">{{$t('userCommon.mobileReset')}}</span>
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
              +86
              <span class="fa fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a href="#">+87</a>
              </li>
              <li>
                <a href="#">Another action</a>
              </li>
              <li>
                <a href="#">Something else here</a>
              </li>
              <li class="divider"></li>
              <li>
                <a href="#">Separated link</a>
              </li>
            </ul>
          </div>
          <input
            class="phoneIpt"
            type="text"
            :placeholder="$t('userCommon.mobile')"
            v-model="phone"
          >
        </div>
      </div>
      <div class="mailRes" v-show="!phoneShow">
        <input type="text" :placeholder="$t('userCommon.Email')">
      </div>
      <input
        type="password"
        :placeholder="$t('userCommon.password')"
        v-model="password"
        @blur="checkPassword()"
      >
      <input
        type="password"
        :placeholder="$t('userCommon.confirmPwd')"
        v-model="surepwd"
        @blur="surePassword"
      >
      <input type="text" class="inputCode" :placeholder="$t('userCommon.code')">
      <button class="getCode" :class="{disabledGet: !this.canClick}" @click="countDown">{{content}}</button>
      <div class="prompt">{{prompt}}</div>
      <button class="registerBtn">{{$t('userCommon.confirm')}}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ForgetPwd",
  data() {
    return {
      phoneShow: true,
      totalTime: 10,
      canClick: true,
      content: this.$t("userCommon.codeBtn"),
      phone: "",
      mail: "",
      password: "",
      surepwd: "",
      prompt: ""
    };
  },
  methods: {
    choosePhone() {
      this.phoneShow = true;
    },
    chooseMail() {
      this.phoneShow = false;
    },
    countDown() {
      this.getCode();
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
    },
    getCode() {
      if (this.phoneShow === false && this.mail === "") {
        this.prompt = this.$t("userCommon.EmailError");
      } else if (this.phoneShow === true && this.phone === "") {
        this.prompt = this.$t("userCommon.phoneError");
      } else {
        this.prompt = "";
      }
    },
    checkPassword() {
      if (this.password === "") {
        this.prompt = this.$t("userCommon.passwordEmpty");
      } else if (this.password.length < 6 || this.password.length > 12) {
        this.prompt = this.$t("userCommon.password");
      } else {
        this.prompt = "";
      }
    },
    surePassword() {
      if (this.surepwd !== this.password) {
        this.prompt = this.$t("userCommon.passwordInconsistent");
      } else {
        this.prompt = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.forgetPwd {
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
  }
  .forgetPwdHead {
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
  .forgetPwdContent {
    height: 420px;
    width: 380px;
    margin: 0 auto;
    font-family: PingFangSC-Regular;

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
          font-family: PingFang-SC-Heavy;
          border-bottom: 2px solid #81a028;
          color: #81a028;
          transition: all 0.5s;
        }
      }
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
      line-height: 20px;
    }
    .prompt {
      text-align: left;
      padding-left: 20px;
      color: red;
    }
  }
}
</style>
