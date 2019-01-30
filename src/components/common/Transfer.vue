<template>
  <section class="Transfer">
    <!-- Information confirmation prompt box -->
    <el-dialog :title="$t('transfer.check')" modal :visible.sync="outerVisible" width="660px">
      <el-dialog width="660px" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('transfer.saveText')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = true, innerVisible = false">{{$t('transfer.button1')}}</el-button>
          <el-button type="primary" @click="innerVisible = false">{{$t('transfer.button2')}}</el-button>
        </div>
      </el-dialog>
      <p>
        <b>{{$t('transfer.checkAddress')}}</b>
        {{formLabelAlign.address}}
      </p>
      <p>
        <b>{{$t('transfer.checkValue')}}</b>
        {{formLabelAlign.value}}
      </p>
      <p>
        <b>{{$t('transfer.fee')}}</b>
        {{formLabelAlign.fee}}
      </p>
      <span>{{$t('transfer.checkText')}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false, innerVisible = true">{{$t('transfer.button1')}}</el-button>
        <el-button type="primary" @click="transfer()">{{$t('transfer.button2')}}</el-button>
      </div>
    </el-dialog>

    <el-row class="transfer-head">
      <el-col :span="24">
        <h1>
          <i class="iconfont icon-wallet"></i>
          {{$t('menu.transfer')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="transfer-form">
      <el-col :span="10" :offset="6">
        <h2>{{$t('transfer.balance')}} {{balance}} (URAC)</h2>
      </el-col>
      <el-col :span="16">
        <div class="formGroup">
          <el-form label-position="right" label-width="160px" :model="formLabelAlign">
            <el-form-item prop="region">
              <span slot="label">
                <i class="iconfont icon-table-value"></i>
                {{$t('transfer.value')}}
              </span>
              <el-input v-model="formLabelAlign.value" :placeholder="$t('transfer.valueIn')"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <span slot="label">
                <i class="iconfont icon-address"></i>
                {{$t('transfer.address')}}
              </span>
              <el-input v-model="formLabelAlign.address" :placeholder="$t('transfer.addressIn')"></el-input>
            </el-form-item>
            <el-form-item prop="type">
              <span slot="label">
                <i class="iconfont icon-table-fee"></i>
                {{$t('transfer.fee')}}
              </span>
              <el-input type="number" step="0.01" v-model="formLabelAlign.fee" :placeholder="$t('transfer.feeIn')"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="code">
              <span slot="label">
                <i class="iconfont icon-address"></i>
                {{$t('transfer.code')}}
              </span>
              <el-input v-model="formLabelAlign.code" :placeholder="$t('transfer.codeIn')"></el-input>
              <el-button :class="{'is-disabled': !this.canClick}" @click="countDown">{{content}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8" :offset="6">
        <el-button type="success" @click="startTransfer">{{$t('transfer.button')}}</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as wallet from '../../services/WalletService'
import * as account from '../../services/AccountService'
import { Message } from 'element-ui'

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
      outerVisible: false,
      innerVisible: false,
      curUserInfo: auth.getUserBaseInfo(),
      balance: 0,
      transData: {},
      totalTime: 60,
      canClick: true,
      content: this.$t('userCommon.codeBtn')
    }
  },
  methods: {
    startTransfer() {
      this.transData = {
        code: this.formLabelAlign.code,
        fee: this.formLabelAlign.fee,
        to: this.formLabelAlign.address,
        value: this.formLabelAlign.value
      }
      if (this.transData.code && this.transData.to && this.transData.value) {
        this.outerVisible = true
      } else {
        this.$message({
          showClose: true,
          message: 'Please enter the correct parameters.',
          type: 'warn'
        })
      }
    },
    transfer() {
      wallet.walletTransfer(auth.getCurLang(), this.transData)
          .then(respData => {
            let data = respData.data
            if (data.success) {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
              this.outerVisible = false
              this.$router.push({ name: 'Wallet' })
            } else {
              this.$message({
                showClose: true,
                message: data.errMsg,
                type: 'error'
              })
            }
          }).catch(err => {
            self.$message({
              showClose: true,
              message: err,
              type: 'error'
            })
          })
    },
    getConfirmCode() {
      wallet.walletConfirmCode(auth.getCurLang(), this.curUserInfo.userName)
        .then(respData => {
          let data = respData.data
          if (data.success) {
            this.$message({
              showClose: true,
              message: 'Success.',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: data.errMsg,
              type: 'error'
            })
          }
        }).catch(err => {
          self.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    },
    countDown() {
      if (!this.canClick) return
      else {
        this.canClick = false
        this.content =
        this.$t('userCommon.codeTime') + '(' + this.totalTime + 's)'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content =
          this.$t('userCommon.codeTime') + '(' + this.totalTime + 's)'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = this.$t('userCommon.codeTime')
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
        this.getConfirmCode()
      }
    },
    getFee() {
      wallet.walletReferenceFee(auth.getCurLang())
          .then(respData => {
            let data = respData.data
            if (data.success) {
              this.formLabelAlign.fee = respData.data.data
            }
          })
    },
    getBalance() {
      account.userBalcnce(auth.getCurLang())
          .then(respData => {
            let data = respData.data
            if (data.success) {
              this.balance = respData.data.data.balance
            }
          })
    }
  },
  created() {
    this.getFee()
    this.getBalance()
  }
}
</script>

<style lang="scss" scoped>
.Transfer {
  height: 100%;
  min-width: 1130px;
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  p {
    margin: 0;
  }
  .transfer-head {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      margin: 0;
      padding: 0;
      padding-left: 30px;
      font-size: 16px;
      color: #ffffff;
      line-height: 50px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
  }
  /deep/ .el-dialog {
    p {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #363636;
      line-height: 24px;
      text-align: left;
      padding-bottom: 20px;
      b {
        font-weight: 400;
        display: inline-block;
        text-align: right;
        width: 150px;
      }
    }
    span {
      font-family: Source-Sans-Pro-Bold;
      font-size: 14px;
      color: #363636;
      line-height: 20px;
      text-align: left;
    }
    .el-button {
        color: #ffffff;
    }
  }
  .transfer-form {
    margin: 10px;
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    h2 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 10px;
      color: #3d74e2;
      line-height: 24px;
      text-align: right;
      padding-right: 30px;
      margin-bottom: -25px;
    }
    .formGroup {
      margin-top: 30px;
      margin-left: 30px;
      .el-input /deep/ .el-input__inner {
        background: rgba(36, 99, 255, 0.2);
        border: 1px solid rgba(24, 144, 255, 0.3);
        border-radius: 4px;
        color: #ffffff;
      }
    }
    span {
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .el-button {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
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
        color: #ffffff;
        background: rgba(101, 143, 247, 0);
        box-shadow: inset 0 0 22px 0 #2463ff;
        border-radius: 3px;
        border: none;
      }
    }
  }
}
</style>
