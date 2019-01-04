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
          <el-dialog :title="$t('setting.modifyMail.click')" :visible.sync="mailOuterVisible" width="480px">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="115px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item label="请输入验证码:" prop="buyerPhone">
                <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                <button style="width:28%">获取验证码</button>
              </el-form-item>
            </el-form>
            <el-dialog width="480px" title="绑定新邮箱" :visible.sync="mailInnerVisible" append-to-body>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="115px"
                class="demo-ruleForm"
              >
                <el-form-item label="Email:" prop="buyerEmail">
                  <span slot="label">{{$t('setting.mail')}}</span>
                  <el-input v-model="ruleForm.buyerEmail"></el-input>
                </el-form-item>
                <el-form-item label="请输入验证码:" prop="buyerPhone">
                  <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                  <button style="width:28%">获取验证码</button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="mailOuterVisible = false,mailInnerVisible = false">确定</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="mailOuterVisible = false">取 消</el-button>
              <el-button type="primary" @click="mailOuterVisible = false,mailInnerVisible = true">下一步</el-button>
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
          <el-button type="text" @click="phoneOuterVisible = true">{{$t('setting.modifyPhone.click')}}</el-button>
          <el-dialog :title="$t('setting.modifyPhone.click')" :visible.sync="phoneOuterVisible" width="480px">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="115px"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item label="请输入验证码:" prop="buyerPhone">
                <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                <button style="width:28%">获取验证码</button>
              </el-form-item>
            </el-form>
            <el-dialog width="480px" title="绑定新手机" :visible.sync="phoneInnerVisible" append-to-body>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="115px"
                class="demo-ruleForm"
              >
                <el-form-item label="Phone:" prop="buyerEmail">
                  <el-input v-model="ruleForm.buyerEmail"></el-input>
                </el-form-item>
                <el-form-item label="请输入验证码:" prop="buyerPhone">
                  <el-input v-model="ruleForm.buyerPhone" style="width:69%"></el-input>
                  <button style="width:28%">获取验证码</button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="phoneOuterVisible = false,phoneInnerVisible = false">确定</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="phoneOuterVisible = false">取 消</el-button>
              <el-button type="primary" @click="phoneOuterVisible = false,phoneInnerVisible = true">下一步</el-button>
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
          <el-button type="text" @click="pwdOuterVisible = true">{{$t('setting.modifyPassword')}}</el-button>
          <el-dialog title="修改密码" :visible.sync="pwdOuterVisible" width="480px">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="115px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码:" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码:" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="pwdOuterVisible = false">取 消</el-button>
              <el-button type="primary" @click="pwdOuterVisible = false">确定</el-button>
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
          <el-select v-model="code" placeholder="请选择">
            <el-option
              v-for="item in codes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      mail: '123456789',
      mailOuterVisible: false,
      mailInnerVisible: false,
      ruleForm: {
        buyerPhone: '',
        buyerEmail: ''
      },
      rules: {
        buyerPhone: [{ validator: checkPhone, trigger: 'blur' }],
        buyerEmail: [{ validator: checkEmail, trigger: 'blur' }]
      },
      phonenum: '12345678911',
      phoneOuterVisible: false,
      phoneInnerVisible: false,
      code: '手机',
      pwdOuterVisible: false,
      pwdInnerVisible: false,
      codes: [
        {
          value: '选项1',
          label: '手机'
        },
        {
          value: '选项2',
          label: '邮箱'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.Setting {
  width: 100%;
  min-width: 1130px;
  p {
    margin: 0;
  }
  .setting-head {
    background: #ffffff;
    height: 64px;
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
