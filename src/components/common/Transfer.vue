<template>
  <section class="Transfer">
    <el-dialog :title="$t('transfer.check')" :visible.sync="outerVisible" width="660px">
      <el-dialog width="660px" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('transfer.saveText')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = true, innerVisible = false">{{$t('transfer.button1')}}</el-button>
          <el-button type="primary" @click="innerVisible = false">{{$t('transfer.button2')}}</el-button>
        </div>
      </el-dialog>
      <p>{{$t('transfer.checkAddress')}}0x461s2df65a4s6d1fa6s5d7f6as15df65a7dsf461</p>
      <p>{{$t('transfer.checkValue')}}1000000021.232323 URAC</p>
      <p>{{$t('transfer.fee')}}1000000021.232323 URAC</p>
      <span>{{$t('transfer.checkText')}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false, innerVisible = true">{{$t('transfer.button1')}}</el-button>
        <el-button type="primary" @click="outerVisible = false">{{$t('transfer.button2')}}</el-button>
      </div>
    </el-dialog>
    <el-row class="transfer-head">
      <el-col :span="24">
        <p>{{$t('menu.transfer')}}</p>
      </el-col>
    </el-row>
    <el-row class="transfer-form">
      <el-col :span="10" :offset="6">
        <h2>{{$t('transfer.balance')}}123456</h2>
      </el-col>
      <el-col :span="16">
        <div class="formGroup">
          <el-form label-position="right" label-width="160px" :model="formLabelAlign" :rules="rules">
            <el-form-item prop="region">
              <span slot="label">{{$t('transfer.value')}}</span>
              <el-input v-model="formLabelAlign.number" :placeholder="$t('transfer.valueIn')"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <span slot="label">{{$t('transfer.address')}}</span>
              <el-input v-model="formLabelAlign.address" :placeholder="$t('transfer.addressIn')"></el-input>
            </el-form-item>
            <el-form-item prop="type">
              <span slot="label">{{$t('transfer.fee')}}</span>
              <el-input v-model="formLabelAlign.fee" :placeholder="$t('transfer.feeIn')"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="code">
              <span slot="label">{{$t('transfer.code')}}</span>
              <el-input v-model="formLabelAlign.code" :placeholder="$t('transfer.codeIn')"></el-input>
              <el-button>{{$t('transfer.codeBtn')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8" :offset="6">
        <el-button type="success" @click="outerVisible = true">{{$t('transfer.button')}}</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'Transfer',
  data() {
    return {
      formLabelAlign: {
        address: '',
        value: '',
        fee: '',
        code: ''
      },
      rules: {
        address: [
          { min: 3, max: 5, message: '请输入正确地址', trigger: 'blur' }
        ],
        value: [{ min: 5, message: '余额不足,请重新输入', trigger: 'blur' }],
        fee: [{ min: 5, message: '手续费', trigger: 'change' }],
        code: [
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: '验证码有误,请重新输入',
            trigger: 'blur'
          }
        ]
      },
      outerVisible: false,
      innerVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.Transfer {
  height: 100%;
  min-width: 1130px;
  background: #f2f2f2;
  p {
    margin: 0;
  }
  .transfer-head {
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
  .el-dialog {
    p {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #363636;
      line-height: 24px;
      text-align: left;
      padding-bottom: 20px;
    }
    span {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #f54c46;
      line-height: 20px;
      text-align: left;
    }
  }
  .transfer-form {
    background: #ffffff;
    margin: 20px;
    border-radius: 2px;
    h2 {
      font-family: PingFang-SC-Bold;
      font-size: 10px;
      color: #606266;
      line-height: 24px;
      text-align: right;
      padding-right: 50px;
      margin-bottom: -25px;
    }
    .formGroup {
      margin-top: 30px;
      margin-left: 30px;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      text-align: left;
      line-height: 24px;
    }
    .el-button {
      background: #8eb357;
      border: none;
      margin-bottom: 30px;
    }
    .code {
      .el-input {
        width: 75%;
      }
      .el-button {
        width: 24%;
        margin: 0;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
    }
  }
}
</style>
