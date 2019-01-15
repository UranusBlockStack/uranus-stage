<template>
  <section class="Wallet">
    <el-row class="wallet-head">
      <el-col :span="24">
        <p>
          <i class="iconfont icon-wallet"></i>
          {{$t('wallet.title')}}
        </p>
      </el-col>
    </el-row>
    <el-row class="wallet-body">
      <el-col :span="12">
        <p>{{$t('wallet.balance')}}100URC</p>
        <p>
          {{$t('wallet.address')}}
          {{address}}
        </p>
      </el-col>
      <el-col :span="6">
        <u class="copy" style="margin-top:60px" @click="copy()">{{$t('wallet.copy')}}</u>
      </el-col>
      <el-col :span="6">
        <el-button type="success" @click="goTransfer">{{$t('wallet.button')}}</el-button>
      </el-col>
    </el-row>
    <el-row class="transaction">
      <el-col class="transaction-head">
        <p>{{$t('wallet.transactionDetails')}}</p>
        <el-dialog
          :title="$t('wallet.transactionDetails')"
          :visible.sync="dialogVisible"
          width="60%"
        >
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="title" width="190"></el-table-column>
            <el-table-column prop="value" width="630"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="viewDetail">
          <el-table-column prop="hash" :label="$t('wallet.hash')" min-width="130"></el-table-column>
          <el-table-column
            prop="createTime"
            :formatter="formateDate"
            :label="$t('wallet.time')"
            width="150"
          ></el-table-column>
          <el-table-column prop="from" :label="$t('wallet.from')" width="120"></el-table-column>
          <el-table-column prop="to" :label="$t('wallet.to')" width="120"></el-table-column>
          <el-table-column prop="value" :label="$t('wallet.value')" width="180"></el-table-column>
          <el-table-column prop="fee" :label="$t('wallet.fee')" width="120"></el-table-column>
          <el-table-column prop="status" :label="$t('wallet.status')" width="180"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" :offset="15" class="transaction-foot">
        <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as auth from "../../services/AuthService";
import * as account from "../../services/AccountService";
import * as wallet from "../../services/WalletService";

import moment from "moment";

export default {
  name: "Wallet",
  data() {
    return {
      address: "",
      dialogVisible: false,
      tableData: [],
      tableData1: [],
      curLang: this.$store.getters.lang,
      curUserInfo: auth.getUserBaseInfo()
    };
  },
  methods: {
    formateDate(row, column, cellValue) {
      return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    copy() {
      console.log(123);
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", this.address);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(input);
    },
    goTransfer() {
      this.$router.push({ path: "transfer" });
    },
    getUserInfo() {
      const userInfo = account
        .userInfo(this.curLang, this.curUserInfo.userId)
        .then(userInfo => {
          this.address = userInfo.data.data.accountAddress;
        });
    },
    getTradeFrom() {
      wallet
        .getTradeListFromUser(this.curLang, this.curUserInfo.userId, 1, 10)
        .then(tradeList => {
          this.tableData = tradeList.data.data.records;
        });
    },
    viewDetail(row) {
      console.log(row);
      let transDetail = [];
      const fields = Object.keys(row);
      fields.map(field => {
        const fieldData = {
          title: field,
          value: row[field]
        };
        transDetail.push(fieldData);
      });
      this.tableData1 = transDetail;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.getUserInfo();
    this.getTradeFrom();
  }
};
</script>

<style lang="scss" scoped>
.Wallet {
  height: 100%;
  min-width: 1130px;
  background: #f2f2f2;
  p {
    margin: 0;
  }
  .wallet-head {
    background: #ffffff;
    height: 50px;
    p {
      font-family: Source-Sans-Pro-Bold;
      padding-left: 30px;
      font-size: 16px;
      color: #252525;
      line-height: 50px;
      text-align: left;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
  }
  .wallet-body {
    height: 110px;
    margin: 10px;
    background: #ffffff;
    p {
      padding-top: 20px;
      padding-left: 30px;
      font-size: 18px;
      color: #252525;
      line-height: 30px;
      text-align: left;
    }
    .copy {
      color: #409eff;
      display: block;
      cursor: pointer;
      padding-top: 20px;
    }
    .el-button {
      margin-top: 35px;
      background: #8eb357;
      border: none;
    }
  }
  .transaction {
    height: 510px;
    margin: 10px;
    background: #ffffff;
    overflow: hidden;
    .el-col {
      padding: 0 30px;
    }
    .transaction-head {
      height: 50px;
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 50px;
      }
    }
    .transaction-foot {
      margin-top: 30px;
      .el-pagination {
        height: 50px;
      }
    }
  }
}
</style>
