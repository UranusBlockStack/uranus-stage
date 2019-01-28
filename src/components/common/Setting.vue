<template>
  <section class="Setting">
    <el-row class="setting-head">
      <el-col :span="24">
        <h1>
          <i class="iconfont icon-setting"></i>
          {{$t('menu.setting')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="userId">
      <el-col :span="24">
        <p>
          <i class="iconfont icon-id"></i>
          {{$t('setting.account')}}
        </p>
        <p class="contentUn">{{id}}</p>
      </el-col>
    </el-row>
    <!-- mail -->
    <el-row class="mail-box">
      <el-col :span="12">
        <p>
          <i class="iconfont icon-email"></i>
          {{$t('setting.mail')}}
        </p>
        <p class="contentUn">{{mail}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setMail()">{{buttonClick}}</el-button>
          <!-- change mail -->
          <el-dialog
            :title="this.buttonClick"
            :visible.sync="mailOuterVisible"
            :close-on-click-modal="false"
            width="580px"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <el-input v-model="mail" disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="mailCaptcha" style="width:69%"></el-input>
                <el-button
                  style="width:28%"
                  @click="sendCode('email',mail)"
                >{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
              <div class="prompt">{{mailprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="mailOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="checkCaptcha('email',mail,mailCaptcha)"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
          <!-- new mail -->
          <el-dialog
            width="580px"
            :close-on-click-modal="false"
            :title="$t('setting.mail')"
            :visible.sync="mailInnerVisible"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <span slot="label">{{$t('setting.mail')}}</span>
                <el-input v-model="newEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="bindMailCaptcha" style="width:69%"></el-input>
                <el-button
                  style="width:28%"
                  @click="sendCode('email',newEmail)"
                >{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
              <div class="prompt">{{mailprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button
                @click="userBind('email',newEmail,bindMailCaptcha)"
              >{{$t('setting.button2')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <!-- phone -->
    <el-row class="phone-box">
      <el-col :span="12">
        <p>
          <i class="iconfont icon-phone"></i>
          {{$t('setting.phone')}}
        </p>
        <p class="contentUn">{{phonenum}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setPhone()">{{buttonClick}}</el-button>
          <!-- change phone -->
          <el-dialog
            :title="this.buttonClick"
            :visible.sync="phoneOuterVisible"
            width="580px"
            :close-on-click-modal="false"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-input v-model="sourceNum" disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="captcha" style="width:69%"></el-input>
                <el-button
                  style="width:28%"
                  @click="sendCode('mobile',sourceNum)"
                >{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
              <div class="prompt">{{phoneprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="phoneOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="checkCaptcha('mobile',sourceNum,captcha)"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
          <!-- new phone -->
          <el-dialog
            width="580px"
            :title="$t('setting.phone')"
            :visible.sync="phoneInnerVisible"
            :close-on-click-modal="false"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-input v-model="newPhoneNum"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="bindCaptcha" style="width:69%"></el-input>
                <el-button
                  style="width:28%"
                  @click="sendCode('mobile',newPhoneNum)"
                >{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
              <div class="prompt">{{phoneprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button
                @click="userBind('mobile',newPhoneNum,bindCaptcha)"
              >{{$t('setting.button2')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="pwd-box">
      <!-- password -->
      <el-col :span="12">
        <p>
          <i class="iconfont icon-password"></i>
          {{$t('setting.password')}}
        </p>
        <p class="contentUn">******</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="pwdOuterVisible = true">{{$t('setting.clickChange')}}</el-button>
          <el-dialog
            :title="$t('setting.clickChange')"
            :visible.sync="pwdOuterVisible"
            width="580px"
            :close-on-click-modal="false"
          >
            <el-form label-width="140px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPassword.current')" prop="buyerEmail">
                <el-input v-model.trim="currentPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.modifyPassword.new')" prop="buyerEmail">
                <el-input type="password" v-model.trim="newPassword" @blur="checkPassword"></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('setting.modifyPassword.confirm')"
                prop="buyerEmail"
                @blur="surePassword"
              >
                <el-input type="password" v-model.trim="confirmPassword"></el-input>
              </el-form-item>
              <div class="prompt">{{pwdprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="pwdOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="resetPassword()">{{$t('setting.button2')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="code-box">
      <el-col :span="12">
        <p>
          <i class="iconfont icon-Captcha-Settings"></i>
          {{$t('setting.codeSet')}}
        </p>
        <p class="contentUn">{{$t('setting.code')}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-select v-model="code">
            <el-option :value="$t('setting.codePhone')">
              <p @click="dialogVisible = true">{{$t('setting.codePhone')}}</p>
            </el-option>
            <el-option :value="$t('setting.codeEmail')">
              <p style="width:100%" @click="dialogVisible = true">{{$t('setting.codeEmail')}}</p>
            </el-option>
          </el-select>
          <el-dialog :title="$t('setting.code')" :visible.sync="dialogVisible" width="580px">
            <span>{{$t('setting.codeText')}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="dialogVisible = false">{{$t('setting.button2')}}</el-button>
            </span>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as account from '../../services/AccountService'
import * as auth from '../../services/AuthService'

export default {
  name: 'Setting',
  data() {
    return {
      id: '',
      mail: '', // 用户邮箱
      newEmail: '', // 绑定新邮箱
      mailCaptcha: '', // 初次输入框邮箱验证码
      bindMailCaptcha: '', // 绑定输入框邮箱验证码
      buttonClick: this.$t('setting.clickLink'),
      phonenum: '', // 用户信息手机号
      sourceNum: '', // 用户原手机号
      newPhoneNum: '',
      captcha: '', // 初次验证原手机验证码
      bindCaptcha: '', // 绑定新手机验证码
      mailOuterVisible: false,
      mailInnerVisible: false,
      currentPassword: '', // 输入框当前密码
      newPassword: '', // 输入框新密码
      confirmPassword: '', // 输入框确认密码
      phoneOuterVisible: false,
      phoneInnerVisible: false,
      code: this.$t('setting.codePhone'),
      pwdOuterVisible: false,
      dialogVisible: false,
      mailprompt: '', // 提示信息
      phoneprompt: '',
      pwdprompt: ''
    }
  },
  methods: {
    // Input box validation
    checkPassword() {
      if (this.newPassword === '' || this.newPassword == null) {
        this.pwdprompt = this.$t('userCommon.passwordEmpty')
      } else if (this.newPassword.length < 6 || this.newPassword.length > 12) {
        this.pwdprompt = this.$t('userCommon.password')
      } else {
        this.pwdprompt = ''
      }
    },
    surePassword() {
      if (this.surepwd !== this.password) {
        this.pwdprompt = this.$t('userCommon.passwordInconsistent')
      } else {
        this.pwdprompt = ''
      }
    },
    userInfo() {
      // 获取用户信息
      var user = auth.getUserBaseInfo()
      account.userInfo(this.$store.getters.lang, user.userId).then(data => {
        this.id = data.data.data.id
        this.phonenum = data.data.data.mobile
        this.mail = data.data.data.email
        this.sourceNum = this.phonenum
        if (this.phonenum == null || this.phonenum == '') {
          this.buttonClick = this.$t('setting.clickLink')
        } else {
          this.buttonClick = this.$t('setting.clickChange')
        }
        if (this.mail == null || this.mail == '') {
          this.buttonClick = this.$t('setting.clickLink')
        } else {
          this.buttonClick = this.$t('setting.clickChange')
        }
        console.log(data)
      })
    },

    resetPassword() {
      // 修改密码
      var param = {
        id: this.id,
        newPassword: this.newPassword,
        oldPassword: this.currentPassword
      }
      if (this.currentPassword === '' || this.currentPassword == null) {
        this.pwdprompt = this.$t('userCommon.passwordEmpty')
      } else if (this.confirmPassword === '' || this.confirmPassword == null) {
        this.pwdprompt = this.$t('userCommon.newpasswordEmpty')
      } else {
        this.pwdprompt = ''
        auth.resetPassword(this.$store.getters.lang, param).then(data => {
          console.log(data)
          if (data.data.success) {
            this.pwdOuterVisible = false
          } else {
            this.pwdprompt = '当前密码输入错误'
            alert('修改失败')
          }
        })
      }
    },
    sendCode(senderType, receiver) {
      // 发送验证码至原手机/邮箱
      const param = {
        captchaType: 0,
        receiver: receiver,
        senderType: senderType
      }
      //   phone
      if (this.phoneOuterVisible == true) {
        if (this.sourceNum === '') {
          this.phoneprompt = this.$t('userCommon.phoneError')
        } else {
          this.phoneprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              console.log('验证码发送失败')
            } else {
              console.log('验证码发送成功')
            }
          })
        }
      }
      //   new phone
      if (this.phoneInnerVisible == true) {
        if (this.newPhoneNum === '') {
          this.phoneprompt = this.$t('userCommon.phoneError')
        } else {
          this.phoneprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              console.log('验证码发送失败')
            } else {
              console.log('验证码发送成功')
            }
          })
        }
      }
      //   mail
      if (this.mailOuterVisible == true) {
        if (this.mail === '') {
          this.mailprompt = this.$t('userCommon.EmailError')
        } else {
          this.mailprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              console.log('验证码发送失败')
            } else {
              console.log('验证码发送成功')
            }
          })
        }
      }
      //   new mail
      if (this.mailInnerVisible == true) {
        if (this.newEmail === '') {
          this.mailprompt = this.$t('userCommon.EmailError')
        } else {
          this.mailprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              console.log('验证码发送失败')
            } else {
              console.log('验证码发送成功')
            }
          })
        }
      }
    },
    checkCaptcha(type, receiver, captcha) {
      if (this.mailOuterVisible == true) {
        if (this.mailCaptcha == '' || this.mailCaptcha == null) {
          this.mailprompt = this.$t('userCommon.code')
        } else {
          this.mailprompt = ''
          // 校验原手机/邮箱验证码是否正确
          console.log('校验中。。。。' + receiver + '==' + captcha)
          auth.checkCaptcha(auth.getCurLang(), receiver, captcha).then(data => {
            console.log('校验结果：', data)
            console.log('校验结果：' + data.data.success)
            if (data.data.success) {
              if (type == 'email') {
                this.mailOuterVisible = false
                this.mailInnerVisible = true
              } else if (type == 'mobile') {
                this.phoneOuterVisible = false
                this.phoneInnerVisible = true
              }
            } else {
              alert('验证码错误，请重新输入')
            }
          })
        }
      }
      if (this.phoneOuterVisible == true) {
        if (this.captcha == '' || this.captcha == null) {
          this.phoneprompt = this.$t('userCommon.code')
        } else {
          this.mailprompt = ''
          // 校验原手机/邮箱验证码是否正确
          console.log('校验中。。。。' + receiver + '==' + captcha)
          auth.checkCaptcha(auth.getCurLang(), receiver, captcha).then(data => {
            console.log('校验结果：', data)
            console.log('校验结果：' + data.data.success)
            if (data.data.success) {
              if (type == 'email') {
                this.mailOuterVisible = false
                this.mailInnerVisible = true
              } else if (type == 'mobile') {
                this.phoneOuterVisible = false
                this.phoneInnerVisible = true
              }
            } else {
              alert('验证码错误，请重新输入')
            }
          })
        }
      }
    },

    userBind(bindType, bindNum, bindCap) {
      /**
       * 绑定手机号/邮箱
       * bindType :mobile/email
       * bindNum: 邮箱或手机号码
       * bindCap：验证码
       * **/
      var param = {
        captcha: bindCap,
        id: this.id,
        loginName: bindNum
      }
      //   mail
      if (this.mailInnerVisible == true) {
        if (this.newEmail == '' || this.newEmail == null) {
          this.mailprompt = this.$t('userCommon.newEmailError')
        } else if (this.bindMailCaptcha == '' || this.bindMailCaptcha == null) {
          this.mailprompt = this.$t('userCommon.code')
        } else {
          this.mailprompt = ''
          account
            .userBind(this.$store.getters.lang, bindType, param)
            .then(data => {
              console.log('解绑中。。。。')
              console.log(data)
              if (data.data.success) {
                // 成功
                this.mailprompt = ''
                if (bindType == 'email') {
                  this.mailOuterVisible = false
                  this.mailInnerVisible = false
                } else if (bindType == 'mobile') {
                  this.phoneOuterVisible = false
                  this.phoneInnerVisible = false
                }
              } else {
                // 失败
                alert('解绑失败')
              }
            })
        }
      }
      //   phone
      if (this.phoneInnerVisible == true) {
        if (this.bindCaptcha == '' || this.bindCaptcha == null) {
          this.phoneprompt = this.$t('userCommon.newphoneError')
        } else if (this.bindCaptcha == '' || this.bindCaptcha == null) {
          this.phoneprompt = '请输入验证码'
        } else {
          this.phoneprompt = ''
          account
            .userBind(this.$store.getters.lang, bindType, param)
            .then(data => {
              console.log('解绑中。。。。')
              console.log(data)
              if (data.data.success) {
                // 成功
                this.phoneprompt = ''
                if (bindType == 'email') {
                  this.mailOuterVisible = false
                  this.mailInnerVisible = false
                } else if (bindType == 'mobile') {
                  this.phoneOuterVisible = false
                  this.phoneInnerVisible = false
                }
              } else {
                // 失败
                alert('解绑失败')
              }
            })
        }
      }
    },
    setMail() {
      // change mail 按钮控制逻辑
      if (this.mail == null || this.mail == '') {
        this.mailInnerVisible = true
      } else {
        this.mailOuterVisible = true
        this.buttonClick = this.$t('setting.clickChange')
      }
    },
    setPhone() {
      // change phone 按钮控制逻辑
      if (this.phonenum == null || this.phonenum == '') {
        this.phoneInnerVisible = true
      } else {
        this.phoneOuterVisible = true
        this.buttonClick = this.$t('setting.clickChange')
      }
    }
  },
  mounted() {
    this.userInfo()
  }
}
</script>

<style lang="scss" scoped>
.Setting {
  width: 100%;
  min-width: 1130px;
  background: rgba(101, 143, 247, 0);
  p {
    margin: 0;
  }
  .prompt {
    color: red;
    text-align: left;
    padding-left: 80px;
  }
  .setting-head {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
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
  .userId {
    background: rgba(101, 143, 247, 0);
    border-radius: 2px;
    height: 100px;
    margin: 10px;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    p {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .contentUn {
      font-family: Source-Sans-Pro-Bold;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      text-align: left;
    }
  }
  .mail-box,
  .phone-box,
  .pwd-box,
  .code-box {
    background: rgba(101, 143, 247, 0);
    border-radius: 2px;
    height: 100px;
    margin: 0 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    p {
      font-size: 16px;
      color: #ffffff;
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
      font-family: Source-Sans-Pro-Bold;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .contentUn {
      font-family: Source-Sans-Pro-Bold;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      text-align: left;
    }
    p > .el-button {
      color: #1890ff;
      margin-top: 45px;
    }
  }
  .code-box {
    .el-select {
      width: 100px;
      margin-top: 30px;
    }
    .el-select /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
  }
}
</style>
