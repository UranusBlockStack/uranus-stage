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
                <el-input v-model.trim="mail" disabled="disabled"></el-input>
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
                <el-input v-model.trim="sourceNum" disabled="disabled"></el-input>
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
                <el-input v-model.trim="newPhoneNum"></el-input>
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

import * as auth from '../../services/AuthService'
import { Message } from 'element-ui'

export default {
  name: 'Setting',
  data() {
    return {
    }
  },
  methods: {
    userInfo() {
      const user = auth.getUserBaseInfo()
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
