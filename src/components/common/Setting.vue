<template>
  <section class="Setting">
    <el-row class="setting-head">
      <el-col :span="24">
        <p>系统设置</p>
      </el-col>
    </el-row>
    <el-row class="userId">
      <el-col :span="24">
        <p>账号ID:13910154946</p>
      </el-col>
    </el-row>
    <el-row class="mail-box">
      <el-col :span="12">
        <p>邮箱：{{mail}}</p>
      </el-col>
      <el-col :span="12">
        <p>
          <el-button type="text" @click="mailOuterVisible = true">修改绑定邮箱</el-button>
          <el-dialog title="修改绑定邮箱" :visible.sync="mailOuterVisible">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="125px"
              class="demo-ruleForm"
            >
              <el-form-item label="Email:" prop="buyerEmail">
                <el-input v-model="ruleForm.buyerEmail"></el-input>
              </el-form-item>
              <el-form-item label="请输入验证码:" prop="buyerPhone">
                <el-input v-model="ruleForm.buyerPhone" style="width:80%"></el-input>
                <button style="width:19%">获取验证码</button>
              </el-form-item>
            </el-form>
            <el-dialog width="50%" title="绑定新邮箱" :visible.sync="mailInnerVisible" append-to-body>
              <div slot="footer" class="dialog-footer">
                <el-button @click="mailOuterVisible = false,mailInnerVisible = false">确定</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="mailOuterVisible = false">取 消</el-button>
              <el-button type="primary" @click="mailInnerVisible = true">下一步</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="phone-box">
      <el-col :span="12">
        <p>手机:{{phonenum}}</p>
      </el-col>
      <el-col :span="12">
        <h3></h3>
      </el-col>
    </el-row>
    <el-row class="pwd-box">
      <el-col :span="12">
        <p>登录密码:******</p>
      </el-col>
      <el-col :span="12">
        <p></p>
      </el-col>
    </el-row>
    <el-row class="code-box">
      <el-col :span="12">
        <p>转账交易接受验证码:</p>
      </el-col>
      <el-col :span="12">
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
    <el-row class="space">
      <el-col :span='24'></el-col>
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
        buyerPhone: "13833334444",
        buyerEmail: ""
      },
      rules: {
        buyerPhone: [{ validator: checkPhone, trigger: "blur" }],
        buyerEmail: [{ validator: checkEmail, trigger: "blur" }]
      },
      phonenum: "12345678911",
      code: "手机",
      codes: [
        {
          value: "选项1",
          label: "手机"
        },
        {
          value: "选项2",
          label: "邮箱"
        }
      ],
    };
  },
  mounted() {

  },
  methods: {}
};
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
      padding-left: 30px;
      font-size: 20px;
      color: #252525;
      line-height: 60px;
      text-align: left;
      font-weight: bold;
    }
  }
  .userId {
    background: #ffffff;
    height: 50px;
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
      font-weight: bold;
    }
  }
  .mail-box,
  .phone-box,
  .pwd-box,
  .code-box {
    background: #ffffff;
    height: 50px;
    margin: 0 20px;
    p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
      font-family:PingFangSC-Medium;
    }
  }
  .space {
    height: 300px;
    margin: 0 20px;
    background: #ffffff
  }
}
</style>
