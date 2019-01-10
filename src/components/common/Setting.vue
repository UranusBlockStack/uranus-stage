<template>
  <section class="Setting">
    <el-row class="setting-head">
      <el-col :span="24">
        <p>{{$t('menu.setting')}}</p>
      </el-col>
    </el-row>
    <el-row class="userId">
      <el-col :span="24">
        <p>{{$t('setting.account')}}</p>
        <p class="contentUn">12345678911</p>
      </el-col>
    </el-row>
    <el-row class="mail-box">
      <el-col :span="12">
        <p>{{$t('setting.mail')}}</p>
        <p class="contentUn">{{mail}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="mailOuterVisible = true">{{$t('setting.modifyMail.click')}}</el-button>
          <el-dialog
            :title="$t('setting.modifyMail.click')"
            :visible.sync="mailOuterVisible"
            :close-on-click-modal="false"
            width="580px"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="140px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                <button style="width:28%">{{$t('setting.codeBtn')}}</button>
              </el-form-item>
            </el-form>
            <el-dialog
              width="580px"
              :close-on-click-modal="false"
              :title="$t('setting.mail')"
              :visible.sync="mailInnerVisible"
              append-to-body
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                class="demo-ruleForm"
              >
                <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                  <span slot="label">{{$t('setting.mail')}}</span>
                  <el-input v-model="ruleForm.buyerEmail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                  <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                  <button style="width:28%">{{$t('setting.codeBtn')}}</button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button
                  @click="mailOuterVisible = false, mailInnerVisible = false"
                >{{$t('setting.button2')}}</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="mailOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="mailOuterVisible = false,mailInnerVisible = true"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="phone-box">
      <el-col :span="12">
        <p>{{$t('setting.phone')}}</p>
        <p class="contentUn">{{phonenum}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button
            type="text"
            @click="phoneOuterVisible = true"
          >{{$t('setting.modifyPhone.click')}}</el-button>
          <el-dialog
            :title="$t('setting.modifyPhone.click')"
            :visible.sync="phoneOuterVisible"
            width="580px"
            :close-on-click-modal="false"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="140px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                <button style="width:28%">{{$t('setting.codeBtn')}}</button>
              </el-form-item>
            </el-form>
            <el-dialog
              width="580px"
              :title="$t('setting.phone')"
              :visible.sync="phoneInnerVisible"
              append-to-body
              :close-on-click-modal="false"
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                class="demo-ruleForm"
              >
                <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                  <el-input v-model="ruleForm.buyerEmail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                  <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                  <button style="width:28%">{{$t('setting.codeBtn')}}</button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button
                  @click="phoneOuterVisible = false,phoneInnerVisible = false"
                >{{$t('setting.button2')}}</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="phoneOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button
                type="primary"
                @click="phoneOuterVisible = false,phoneInnerVisible = true"
              >{{$t('setting.button3')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="pwd-box">
      <el-col :span="12">
        <p>{{$t('setting.password')}}</p>
        <p class="contentUn">******</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button
            type="text"
            @click="pwdOuterVisible = true"
          >{{$t('setting.modifyPassword.click')}}</el-button>
          <el-dialog
            :title="$t('setting.modifyPassword.click')"
            :visible.sync="pwdOuterVisible"
            width="580px"
            :close-on-click-modal="false"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="140px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('setting.modifyPassword.current')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.modifyPassword.new')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.modifyPassword.confirm')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="pwdOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="pwdOuterVisible = false">{{$t('setting.button2')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="code-box">
      <el-col :span="12">
        <p>{{$t('setting.codeSet')}}</p>
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
          <el-dialog title="提示" :visible.sync="dialogVisible" width="580px">
            <span>如果继续此项操作，交易时所需要获取验证码将会改变，确定继续此操作吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "Setting",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      mail: "123456789",
      mailOuterVisible: false,
      mailInnerVisible: false,
      ruleForm: {
        buyerPhone: "",
        buyerEmail: ""
      },
      rules: {
        buyerPhone: [{ validator: checkPhone, trigger: "blur" }],
        buyerEmail: [{ validator: checkEmail, trigger: "blur" }]
      },
      phonenum: "12345678911",
      phoneOuterVisible: false,
      phoneInnerVisible: false,
      code: this.$t("setting.codePhone"),
      pwdOuterVisible: false,
      pwdInnerVisible: false,
      dialogVisible: false
    };
  }
};
</script>

<style lang="scss" scoped>
.Setting {
  width: 100%;
  min-width: 1130px;
  background: #f2f2f2;
  p {
    margin: 0;
  }
  .setting-head {
    background: #ffffff;
    height: 65px;
    p {
      font-family: PingFang-SC-Bold;
      padding-left: 30px;
      font-size: 20px;
      color: #252525;
      line-height: 60px;
      text-align: left;
    }
  }
  .userId {
    background: #ffffff;
    height: 100px;
    margin: 20px;
    margin-bottom: 0;
    border-bottom: 1px #e9e9e9 solid;
    p {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
    }
    .contentUn {
      font-family: HelveticaNeue;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      text-align: left;
    }
  }
  .mail-box,
  .phone-box,
  .pwd-box,
  .code-box {
    background: #ffffff;
    height: 100px;
    margin: 0 20px;
    border-bottom: 1px #e9e9e9 solid;
    p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
      font-family: PingFangSC-Medium;
    }
    .contentUn {
      font-family: HelveticaNeue;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      text-align: left;
    }
    p > .el-button {
      color: #8eb357;
      margin-top: 45px;
    }
  }
  .code-box {
    .el-select {
      width: 100px;
      margin-top: 30px;
    }
  }
}
</style>
