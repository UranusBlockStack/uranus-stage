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
        <p class="contentUn">{{confidential.mail}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setMail()">{{buttonmailClick}}</el-button>
          <!-- change mail -->
          <!--<el-dialog :title="this.buttonClick" :visible.sync="mailOuterVisible" :close-on-click-modal="false" width="580px">-->
          <el-dialog
            :title="this.buttonmailClick"
            :visible.sync="mailOuterVisible"
            @close="restSendButton"
            :close-on-click-modal="false"
            width="580px"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <el-input v-model.trim="sourceEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model.trim="mailCaptcha" style="width:69%"></el-input>
                <el-button
                  :class="{'is-disabled': !this.canClick}"
                  style="width:28%"
                  @click="sendCode('email',mail)"
                >
                  <!--{{$t('setting.codeBtn')}}-->
                  {{content}}
                </el-button>
              </el-form-item>
              <div class="prompt">{{mailprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button
                @click="mailOuterVisible = false, mailprompt = ''"
              >{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="checkCaptcha('email',mail,mailCaptcha)"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
          <!-- new mail -->
          <!--<el-dialog width="580px" :close-on-click-modal="false" :title="$t('setting.mail')" :visible.sync="mailInnerVisible">-->
          <el-dialog
            width="580px"
            :title="$t('setting.mail')"
            :visible.sync="mailInnerVisible"
            :close-on-click-modal="false"
            @close="restSendButton"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <span slot="label">{{$t('setting.mail')}}</span>
                <el-input v-model.trim="newEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model.trim="bindMailCaptcha" style="width:69%"></el-input>
                <el-button
                  :class="{'is-disabled': !this.canClick}"
                  style="width:28%"
                  @click="sendCode('email',newEmail)"
                >
                  <!--{{$t('setting.codeBtn')}}-->
                  {{content}}
                </el-button>
              </el-form-item>
              <div class="prompt">{{mailprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary"
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
        <p class="contentUn">{{confidential.phone}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setPhone()">{{buttonphoneClick}}</el-button>
          <!-- change phone -->
          <!--<el-dialog :title="this.buttonClick" :visible.sync="phoneOuterVisible" width="580px" :close-on-click-modal="false">-->
          <el-dialog
            :close-on-click-modal="false"
            :title="this.buttonphoneClick"
            :visible.sync="phoneOuterVisible"
            width="580px"
            @close="restSendButton"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-select
                  style="width: 125px;"
                  v-model="currentRegion"
                  @change="currentRegion = currentRegion"
                >
                  <el-option
                    v-for="(item,index) in regions"
                    :key="item.index"
                    :label="item.fullName"
                    :value="item.prefix"
                  ></el-option>
                </el-select>
                <el-input style="width: 315px;" v-model.trim="sourceNum"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model.trim="captcha" style="width:69%"></el-input>
                <el-button
                  :class="{'is-disabled': !this.canClick}"
                  style="width:28%"
                  @click="sendCode('mobile',sourceNum)"
                >
                  <!--{{$t('setting.codeBtn')}}-->
                  {{content}}
                </el-button>
              </el-form-item>
              <div class="prompt">{{phoneprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button
                @click="phoneOuterVisible = false, phoneprompt= ''"
              >{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="checkCaptcha('mobile',sourceNum,captcha)"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
          <!-- new phone -->
          <!--<el-dialog width="580px" :title="$t('setting.phone')" :visible.sync="phoneInnerVisible" :close-on-click-modal="false">-->
          <el-dialog
            width="580px"
            :close-on-click-modal="false"
            :title="$t('setting.phone')"
            :visible.sync="phoneInnerVisible"
            @close="restSendButton"
          >
            <el-form label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-select
                  style="width: 125px;"
                  v-model="currentRegion"
                  @change="currentRegion = currentRegion"
                >
                  <el-option
                    v-for="(item,index) in regions"
                    :key="item.index"
                    :label="item.fullName"
                    :value="item.prefix"
                  ></el-option>
                </el-select>
                <el-input style="width: 315px;" v-model.trim="newPhoneNum"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model.trim="bindCaptcha" style="width:69%"></el-input>
                <el-button
                  :class="{'is-disabled': !this.canClick}"
                  style="width:28%"
                  @click="sendCode('mobile',newPhoneNum)"
                >
                  <!--{{$t('setting.codeBtn')}}-->
                  {{content}}
                </el-button>
              </el-form-item>
              <div class="prompt">{{phoneprompt}}</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary"
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
              <el-button @click="pwdOuterVisible = false, pwdprompt = ''">{{$t('setting.button1')}}</el-button>
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
              <p @click="dialogVisible = true">{{$t('setting.codeEmail')}}</p>
            </el-option>
          </el-select>

          <el-dialog
            :title="$t('setting.code')"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="580px"
          >
            <span>{{$t('setting.codeText')}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="failChange()">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="changeCode()">{{$t('setting.button2')}}</el-button>
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
import { Message } from 'element-ui'

export default {
  name: 'Setting',
  data() {
    return {
      id: '',
      mail: '', // 用户邮箱
      sourceEmail: '',
      newEmail: '', // 绑定新邮箱
      mailCaptcha: '', // 初次输入框邮箱验证码
      bindMailCaptcha: '', // 绑定输入框邮箱验证码
      buttonmailClick: this.$t('setting.clickLink'),
      buttonphoneClick: this.$t('setting.clickLink'),
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
      regions: [],
      currentRegion: '86',
      code: this.$t('setting.codePhone'),
      pwdOuterVisible: false,
      dialogVisible: false,
      mailprompt: '', // 提示信息
      phoneprompt: '',
      pwdprompt: '',
      canClick: true,
      totalTime: 60,
      content: this.$t('setting.codeBtn'),
      clock: null,
      confidential: {
        phone: '',
        mail: ''
      }
    }
  },
  methods: {
    // Input box validation
    checkPassword() {
      if (this.newPassword === '' || this.newPassword == null) {
        this.pwdprompt = this.$t('userCommon.passwordEmpty')
      } else if (this.newPassword === this.currentPassword) {
        this.pwdprompt = this.$t('userCommon.newpasswordError')
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
      const user = auth.getUserBaseInfo()
      account.userInfo(auth.getCurLang(), user.userId).then(data => {
        this.id = data.data.data.id
        this.phonenum = data.data.data.mobile
        this.mail = data.data.data.email
        if (this.phonenum == null || this.phonenum === '') {
          this.buttonphoneClick = this.$t('setting.clickLink')
        } else {
          this.confidential.phone = this.phonenum.substring(0, 2) + '******' + this.phonenum.substr(this.phonenum.length - 2, 2)
          this.buttonphoneClick = this.$t('setting.clickChange')
        }
        if (this.mail == null || this.mail === '') {
          this.buttonmailClick = this.$t('setting.clickLink')
        } else {
          this.confidential.mail = this.mail.substring(0, 1) + '******@' + this.mail.split('@')[1]
          this.buttonmailClick = this.$t('setting.clickChange')
        }
        if (data.data.data.captchaMode === 'mobile') {
          this.code = this.$t('setting.codePhone')
        } else if (data.data.data.captchaMode === 'email') {
          this.code = this.$t('setting.codeEmail')
        }
      })
    },
    getRegionList2() {
      auth.country(auth.getCurLang()).then(resdata => {
        this.regions = resdata.data.data
      })
    },
    changeCode() {
      // Replacement of Verification Code Connection
      var codeType = {
        captchaMode: this.code
      }
      if (this.code === this.$t('setting.codeEmail')) {
        codeType.captchaMode = 'email'
      } else if (this.code === this.$t('setting.codePhone')) {
        codeType.captchaMode = 'mobile'
      }
      account.userModify(this.$store.getters.lang, codeType).then(data => {
        if (data.data.success) {
          this.$message({
            showClose: true,
            message: 'Success.',
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$message({
            showClose: true,
            message: data.data.errMsg,
            type: 'error'
          })
          this.userInfo()
          this.dialogVisible = false
        }
      })
    },
    failChange() {
      this.userInfo()
      this.dialogVisible = false
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
          if (data.data.success) {
            this.pwdOuterVisible = false
            this.$message({
              showClose: true,
              message: 'Success.',
              type: 'success'
            })
            auth.logout()
            this.$router.push({ name: 'Map' })
          } else {
            this.pwdprompt = this.$t('userCommon.passwordError')
          }
        })
      }
    },
    sendCode(senderType, receiver) {
      this.countDown()
      // 发送验证码至原手机/邮箱
      const param = {
        captchaType: 0,
        receiver: receiver,
        senderType: senderType
      }
      //   phone
      if (this.phoneOuterVisible === true) {
        if (this.sourceNum === '') {
          this.phoneprompt = this.$t('userCommon.phoneError')
        } else if (this.phonenum != this.currentRegion + this.sourceNum) {
          this.phoneprompt = this.$t('setting.phoneDifferent')
        } else {
          this.phoneprompt = '123'
          param.receiver = this.currentRegion + this.sourceNum
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              this.$message({
                showClose: true,
                message: 'Failed',
                type: 'error'
              }) //  ???触发条件
            } else {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
            }
          })
        }
      }
      //   new phone
      if (this.phoneInnerVisible === true) {
        if (this.newPhoneNum === '') {
          this.phoneprompt = this.$t('userCommon.phoneError')
        } else {
          this.phoneprompt = ''
          param.receiver = this.currentRegion + this.newPhoneNum
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              this.$message({
                showClose: true,
                message: 'Failed',
                type: 'error'
              }) //  ???触发条件
            } else {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
            }
          })
        }
      }
      //   mail
      if (this.mailOuterVisible === true) {
        if (this.sourceEmail === '') {
          this.mailprompt = this.$t('userCommon.EmailError')
        } else if (this.sourceEmail != this.mail) {
          this.mailprompt = this.$t('setting.EmailDifferent')
        } else {
          this.mailprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              this.$message({
                showClose: true,
                message: 'Failed',
                type: 'error'
              }) //  ???触发条件
            } else {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
            }
          })
        }
      }
      //   new mail
      if (this.mailInnerVisible === true) {
        if (this.newEmail === '') {
          this.mailprompt = this.$t('userCommon.EmailError')
        } else {
          this.mailprompt = ''
          auth.captcha(this.$store.getters.lang, param).then(data => {
            if (!data.data.success) {
              this.$message({
                showClose: true,
                message: 'Failed',
                type: 'error'
              }) //  ???触发条件
            } else {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
            }
          })
        }
      }
    },
    checkCaptcha(type, receiver, captcha) {
      if (this.mailOuterVisible === true) {
        if (this.mailCaptcha === '' || this.mailCaptcha == null) {
          this.mailprompt = this.$t('userCommon.code')
        } else {
          this.mailprompt = ''
          // 校验原手机/邮箱验证码是否正确
          auth.checkCaptcha(auth.getCurLang(), receiver, captcha).then(data => {
            if (data.data.success) {
              if (type === 'email') {
                this.mailOuterVisible = false
                this.mailInnerVisible = true
                this.mailprompt = ''
              } else if (type === 'mobile') {
                this.phoneOuterVisible = false
                this.phoneInnerVisible = true
                this.phoneprompt = ''
              }
            } else {
              this.mailprompt = this.$t('userCommon.codeError')
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
          auth.checkCaptcha(auth.getCurLang(), receiver, captcha).then(data => {
            if (data.data.success) {
              if (type == 'email') {
                this.mailOuterVisible = false
                this.mailInnerVisible = true
              } else if (type == 'mobile') {
                this.phoneOuterVisible = false
                this.phoneInnerVisible = true
              }
            } else {
              this.phoneprompt = this.$t('userCommon.codeError')
            }
          })
        }
      }
    },

    countDown() {
      if (!this.canClick) return
      else {
        this.canClick = false
        this.content =
          this.$t('setting.codeTime') + ' (' + this.totalTime + 's)'
        this.clock = window.setInterval(() => {
          this.totalTime--
          this.content =
            this.$t('setting.codeTime') + ' (' + this.totalTime + 's)'
          if (this.totalTime < 0) {
            window.clearInterval(this.clock)
            this.content = this.$t('setting.codeTime')
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
      }
    },
    restSendButton() {
      //复位发送验证码按钮 防止关闭后 倒计时未关闭
      window.clearInterval(this.clock)
      this.content = this.$t('setting.codeBtn')
      this.canClick = true
      this.totalTime = 60
      this.sourceEmail = ''
      this.sourceNum = ''
      this.newEmail = ''
      this.newPhoneNum = ''
      this.mailCaptcha = ''
      this.bindMailCaptcha = ''
      this.captcha = ''
      this.bindCaptcha = ''
      this.phoneprompt = ''
      this.mailprompt = ''
      this.pwdprompt = ''
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
              if (data.data.success) {
                // 成功
                this.mailprompt = ''
                this.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                if (bindType == 'email') {
                  this.mail = this.newEmail
                  this.mailOuterVisible = false
                  this.mailInnerVisible = false
                } else if (bindType == 'mobile') {
                  this.sourceNum = this.currentRegion + this.newPhoneNum
                  this.phoneOuterVisible = false
                  this.phoneInnerVisible = false
                }
              } else {
                // 失败
                this.$message({
                  showClose: true,
                  message: data.data.errMsg,
                  type: 'error'
                })
              }
            })
        }
      }
      //   phone
      if (this.phoneInnerVisible == true) {
        if (this.bindCaptcha == '' || this.bindCaptcha == null) {
          this.phoneprompt = this.$t('userCommon.newphoneError')
        } else if (this.bindCaptcha == '' || this.bindCaptcha == null) {
          this.phoneprompt = this.$t('userCommon.code')
        } else {
          this.phoneprompt = ''
          account
            .userBind(this.$store.getters.lang, bindType, param)
            .then(data => {
              if (data.data.success) {
                // 成功
                this.phoneprompt = ''
                this.$message({
                  showClose: true,
                  message: 'Success.',
                  type: 'success'
                })
                if (bindType == 'email') {
                  this.mail = this.newEmail
                  this.mailOuterVisible = false
                  this.mailInnerVisible = false
                } else if (bindType == 'mobile') {
                  this.sourceNum = this.currentRegion + this.newPhoneNum
                  this.phoneOuterVisible = false
                  this.phoneInnerVisible = false
                }
              } else {
                // 失败
                this.$message({
                  showClose: true,
                  message: data.data.errMsg,
                  type: 'error'
                })
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
        this.buttonmailClick = this.$t('setting.clickChange')
      }
    },
    setPhone() {
      // change phone 按钮控制逻辑
      if (this.phonenum == null || this.phonenum == '') {
        this.phoneInnerVisible = true
      } else {
        this.phoneOuterVisible = true
        this.buttonphoneClick = this.$t('setting.clickChange')
      }
    }
  },
  mounted() {
    this.userInfo()
    this.getRegionList2()
  }
}
</script>

<style lang="scss" scoped>
.Setting {
  width: 100%;
  min-width: 1130px;
  background: #000;
  p {
    margin: 0;
  }
  .prompt {
    color: #ff5640;
    text-align: left;
    padding-left: 80px;
  }
  .setting-head {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    height: 50px;
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
    background: #161618;
    border-radius: 2px;
    height: 100px;
    margin: 2px;
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
    background: #161618;
    border-radius: 2px;
    height: 100px;
    margin: 0 2px;
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
      color: #627100;
      margin-top: 45px;
    }
  }
  .code-box {
    .el-select {
      width: 100px;
      margin-top: 30px;
    }
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #ffffff;
      opacity: 0.6;
    }
  }
}
</style>
