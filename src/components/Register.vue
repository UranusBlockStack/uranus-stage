<template>
    <section class="register">
        <div class="registerHead">
            <img src="/static/img/uranus/head.png" alt="">
        </div>
        <div class="registerContent">
            <div class="btnChoose">
                <div class="btnMail" @click="chooseMail"><span :class="{chooseBtn:!phoneShow}">邮箱注册</span></div>
                <div class="btnPhone" @click="choosePhone"><span :class="{chooseBtn:phoneShow}">手机注册</span></div>
            </div>
            <div class="phoneRes" v-show="phoneShow">
                <div class="input-group">
                    <div class="input-group-btn">
                    <button type="button" class="phoneHead btn btn-default dropdown-toggle" data-toggle="dropdown">+86
                        <span class="fa fa-caret-down"></span></button>
                    <ul class="dropdown-menu">
                        <li><a href="#">+87</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                    </div>
                    <input class="phoneIpt" type="text" :placeholder="placeholderPhone">
              </div>
            </div>
            <div class="mailRes" v-show="!phoneShow">
                <input type="text" :placeholder="placeholderMail">
            </div>
            <input type="password" :placeholder="placeholderPassword">
            <input type="password" :placeholder="placeholderSurePassword">
            <input type="text" class="inputCode" :placeholder="placeholderCode">
            <button class="getCode" :class="{disabledGet: !this.canClick}" @click="countDown">{{content}}</button>
            <router-link class="loginRes" :to="{ path: 'login'}">使用已有账户登录</router-link>
            <button class="registerBtn">注册</button>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      placeholderPhone: '手机号',
      placeholderMail: '邮箱',
      placeholderPassword: '6-16位密码 区分大小写',
      placeholderSurePassword: '确认密码',
      placeholderCode: '输入验证码',
      phoneShow: 'true',
      totalTime: 10,
      canClick: true,
      content: '发送验证码'
    }
  },
  methods: {
    choosePhone () {
      this.phoneShow = true
    },
    chooseMail () {
      this.phoneShow = false
    },
    countDown () {
      if (!this.canClick) return 
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送'
          this.totalTime = 10
          this.canClick = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
    .register {
        width: 100%;
        height: 100%;
        background: no-repeat url(/static/img/uranus/bg.png);
        background-size: cover;
        text-align: center;

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
            font-family:PingFangSC-Regular;

            .btnChoose {
                width: 380px;
                height: 80px;
                .btnMail,.btnPhone {
                    float: left;
                    width: 190px;
                    height: 50px;
                    margin-top: 15px;
                    cursor: pointer;

                    span{
                        display: inline-block;
                        height: 30px;
                        font-size:16px;
                        line-height:24px;
                        color:rgba(0,0,0,0.65);
                        text-align:center;
                    }
                    .chooseBtn{
                        font-family:PingFang-SC-Heavy;
                        border-bottom: 2px solid #81a028;
                        color:#81a028;
                        transition: all .5s;
                    }
                }
            }
            .phoneRes {
                width: 380px;

                .input-group{
                    width: 380px;

                    .phoneHead{
                        background:#ffffff;
                        border:1px solid #d9d9d9;
                        border-right: none;
                        border-radius:4px 0 0 4px;
                        width:70px;
                        height:38px;
                    }
                }
                .phoneIpt {
                    width: 310px;
                }
            }
            input {
                background:#ffffff;
                border:1px solid #d9d9d9;
                border-radius:4px;
                width:378px;
                height:38px;
                margin: 12px auto;
                padding-left: 20px;
            }
            .inputCode {
                width: 265px;
            }
            .getCode {
                background:#ffffff;
                border:1px solid #d9d9d9;
                border-radius:4px;
                width:110px;
                height:38px;
                font-size:14px;
                color:rgba(0,0,0,0.65);
                line-height:22px;
                text-align:center;
            }
            .disabledGet {
                background-color: #ddd;
                border-color: #ddd;
                color:#57a3f3;
                cursor: not-allowed; 
            }

            .loginRes {
                font-size:14px;
                color:#1890ff;
                text-align:right;
                line-height:22px;
                margin-left: 265px;
            }
            .registerBtn {
                background:#1890ff;
                border-radius:4px;
                width:380px;
                height:40px;
                margin-left: 0;
                margin-top: 24px;
                font-size:16px;
                color:#ffffff;
                line-height:24px;
            }
        }
    }
</style>
