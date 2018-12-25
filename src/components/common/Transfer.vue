<template>
  <section class="Transfer">
    <el-row class="transfer-head">
      <el-col :span="24">
        <p>转账</p>
      </el-col>
    </el-row>
    <el-row class="transfer-body">
      <el-col :span="6" :offset="16">
        <p>{{$t('transfer.title')}}123</p>
      </el-col>
    </el-row>
    <el-row class="transfer-form">
      <el-col :span="12" :offset="6">
        <div class="formGroup">
          <el-form label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules">
            <el-form-item prop="name">
              <span slot="label">地址码</span>
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="转账数量" prop="region">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="手续费" prop="type">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="formLabelAlign.code"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-button type="success">确认转账</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "Transfer",
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        code: ""
      },
      rules: {
        name: [{ min: 3, max: 5, message: "请输入正确地址", trigger: "blur" }],
        region: [{ min: 5, message: "余额不足,请重新输入", trigger: "blur" }],
        type: [{ min: 5, message: "手续费", trigger: "change" }],
        code: [
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: "验证码有误,请重新输入",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.Transfer {
  height: 100%;
  min-width: 1130px;
  p {
    margin: 0;
  }
  .transfer-head {
    background: #ffffff;
    height: 64px;
    p {
      padding-left: 30px;
      font-size: 20px;
      color: #252525;
      line-height: 60px;
      text-align: left;
    }
  }
  .transfer-body {
    height: 60px;
    margin: 20px;
    background: #ffffff;
    p {
      padding-top: 20px;
      padding-left: 30px;
      font-size: 18px;
      color: #252525;
      line-height: 30px;
      text-align: left;
    }
    .el-button {
      margin-top: 35px;
    }
  }
  .transfer-form {
    background: #ffffff;
    margin: 20px;
    padding-top: 30px;
    .el-button {
      background: #8eb357;
      border: none;
      margin-bottom: 30px;
    }
  }
}
</style>
