<template>
  <section class="login">
    <div class="back">
      <router-link :to="{path: '/map'}">Back</router-link>
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
            <button type="button" class="phoneHead btn btn-default dropdown-toggle" data-toggle="dropdown">
              {{selectedRegion}}
              <span class="fa fa-caret-down"></span></button>
            <ul class="dropdown-menu" >
              <li v-for="item in regions">
                <a href="#" :id="item.prefix" @click="selectRegion(item.prefix)"> {{ item.fullName }}</a>
              </li>
            </ul>
          </div>
          <input class="phoneIpt" type="text" ref="mobileNumber" v-model="phone" :placeholder="$t('userCommon.mobile')"/>
        </div>
      </div>

      <div class="mailRes" v-show="!phoneShow">
        <input type="text" :placeholder="$t('userCommon.Email')" v-model="mail">
      </div>
      <input type="text" :placeholder="$t('userCommon.password')" v-model="password">
      <router-link class="forgetPwd" :to="{ path: '/forgetPwd'}">{{$t('userCommon.forgetPwd')}}</router-link>
      <div class="prompt">{{prompt}}</div>
      <button class="loginBtn" @click="userLogin">**{{$t('userCommon.loginBtn')}}</button>
    </div>
  </section>
</template>

<script>
    import * as auth from '../services/AuthService'

export default {
  name: 'Login',
  data() {
    return {
      phoneShow: 'true',
      prompt: '',
      phone: '',
      mail: '',
      password: '',
      regions: [],
      selectedRegion: '86'

    }
  },
  methods: {
    getRegionList2() {
      auth.country(this.$store.getters.lang)
              .then(resdata => {
                this.regions = resdata.data.data
              })
    },
    selectRegion (region) {
      this.selectedRegion = region
    },
    choosePhone() {
      this.phoneShow = true
    },
    chooseMail() {
      this.phoneShow = false
    },
    userLogin() {
      if (this.phone === '' && this.mail === '') {
        this.prompt = '请完善信息后登陆'
      } else if (this.password === '') {
        this.prompt = '请填写密码'
      } else {
        this.prompt = ''
          const logintype = this.phoneShow? 'mobile': 'email'
          const user = {
              loginName: this.phone,
              password: this.password,
              loginType: logintype
          }

        auth.login(this.$store.getters.lang, user)
              .then(function (userinfo) {
                //self.$router.push({ name: 'hashpower-config-finish' })
              })
              .catch(error => {
                if (error) {
                  alert('登录不成功')
                }
              })
      }
    }
  },
    mounted() {
      this.getRegionList2()
    }

}
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
    height: 30px;
    width: 50px;
    left: 30px;
    top: 50px;
    a {
        color: #1890ff;
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