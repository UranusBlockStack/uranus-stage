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
            <ul class="dropdown-menu">
              <li v-for="(item,index) in regions" :key="index">
                <a href="#" :id="item.prefix" @click="selectRegion(item.prefix)">{{ item.fullName }}</a>
              </li>
            </ul>
          </div>
          <input
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
      <button class="loginBtn" @click="userLogin">{{user}} {{$t('userCommon.loginBtn')}}</button>
    </div>
  </section>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  name: "Login",
  data() {
    return {
      phoneShow: "true",
      // 用户身份
      user: "",
      // 提示信息
      prompt: "",
      // 用户登录信息
      phone: "",
      mail: "",
      password: "",
      // 地区代码
      regions: [],
      currentRegion: "86"
    };
  },
  methods: {
      getUser() {
          const userStatus = auth.getUserBaseInfo()
          if(!userStatus){
              userStatus =  auth.getDefaultUserStatus()
              auth.setCurRole(userStatus.loginRole)
              this.user = userStatus.loginRole
          }

          this.user = auth.getCurRole()
      },
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
        loginname = this.currentRegion + this.phone;
      } else {
        loginname = this.mail;
      }
      return loginname;
    },
    choosePhone() {
      this.phoneShow = true;
    },
    chooseMail() {
      this.phoneShow = false;
    },
    userLogin() {
      if (this.phone === "" && this.mail === "") {
        this.prompt = "请完善信息后登陆";
      } else if (this.password === "") {
        this.prompt = "请填写密码";
      } else {
        this.prompt = "";
        const logintype = this.phoneShow ? "mobile" : "email";
        const userLoginfo = {
          loginName: this.getLoginName(logintype),
          password: this.password,
          loginType: logintype
        };

        const self = this;

        auth
          .login(auth.getCurLang(), userLoginfo)
          .then(function(curLoginUserInfo) {
            self.$router.push({ path: curLoginUserInfo.loginRole });
          });
        // .catch(error => {
        //   if (error) {
        //     alert('登录不成功')
        //   }
        // })
        const globalUserinfo = auth.getUserBaseInfo();
      }
    }
  },
  mounted() {
    this.getRegionList2()
    this.getUser()
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: no-repeat url(/static/img/uranus/bg.png);
  background-size: cover;
  text-align: center;
  position: absolute;
  .back {
    position: relative;
    height: 50px;
    width: 50px;
    left: 50px;
    top: 50px;
    a {
      color: #1890ff;
      font-size: 18px;
      i {
        font-size: 28px;
      }
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
    .forgetPwd {
      font-size: 14px;
      color: #1890ff;
      text-align: right;
      line-height: 22px;
      margin-left: 205px;
    }
    .loginBtn {
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
    .prompt {
      color: red;
      text-align: left;
      padding-left: 20px;
    }
  }
}
</style>