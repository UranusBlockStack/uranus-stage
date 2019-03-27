<template>
  <section class="Wallet">
    <el-row class="wallet-head">
      <el-col :span="24">
        <h1>
          <i class="iconfont icon-wallet"></i>
          {{ $t("wallet.title") }}
        </h1>
      </el-col>
    </el-row>
    <el-row class="wallet-body">
      <el-col :span="18">
        <p>
          <i class="iconfont icon-balance"></i>
          {{ $t("wallet.balance") }} {{ balance }} URAC
        </p>
        <p>
          <i class="iconfont icon-address"></i>
          {{ $t("wallet.address") }} {{ address }}
          <el-tooltip class="item" effect="dark" content="Copy address" placement="right">
            <u class="copy" @click="copy()">{{ $t("wallet.copy") }}</u>
          </el-tooltip>
        </p>
      </el-col>
      <el-col :span="6">
        <el-button type="success" @click="goTransfer">
          {{
          $t("wallet.button")
          }}
        </el-button>
      </el-col>
    </el-row>

    <el-row class="transaction">
      <el-col class="transaction-head">
        <p>
          {{ $t("wallet.transactionDetails") }}
          <span
            :class="{tableType:!tableType}"
            @click="tableType = false"
          >Send</span>
          <span :class="{tableType:tableType}" @click="tableType = true">Recive</span>
        </p>
        <!-- transactions details box -->
        <el-dialog
          :title="$t('wallet.transactionDetails')"
          :visible.sync="dialogVisible"
          width="820px"
        >
          <el-table :data="tableData1" style="width: 820px; margin-top:-40px;">
            <el-table-column prop="title" width="190"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <!-- transaction from table -->
      <el-col v-show="!tableType" class="blue-box" :span="24">
        <el-table :data="transactionListFrom" style="width: 100%" @row-click="viewDetail">
          <template slot="empty">
            <p class="empty-text" style="height: 300px; line-height: 300px;">No Transaction</p>
          </template>
          <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-hash"></i>
                {{ $t("wallet.hash") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.hash }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :formatter="formateDate" min-width="130">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{ $t("wallet.time") }}
              </p>
            </template>
          </el-table-column>
          <!-- <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-from"></i>
                {{ $t("wallet.from") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.from }}</p>
            </template>
          </el-table-column>-->
          <el-table-column prop="to" :label="$t('wallet.to')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-from"></i>
                {{ $t("wallet.to") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.to }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="$t('wallet.value')" min-width="130">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{ $t("wallet.value") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('wallet.fee')" min-width="130">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-fee"></i>
                {{ $t("wallet.fee") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="TransStatus" :label="$t('wallet.status')" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{ $t("wallet.status") }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col v-show="!tableType" :span="6" :offset="15" class="transaction-foot">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPageFrom"
          :page-size="pageSize"
          :total="totalRecordsFrom"
          @current-change="handleCurrentChangeFrom"
        ></el-pagination>
      </el-col>
      <!-- transcation to table-->
      <el-col v-show="tableType" class="blue-box" :span="24">
        <el-table :data="transactionListTo" style="width: 100%" @row-click="viewDetail">
          <template slot="empty">
            <p class="empty-text" style="height: 300px; line-height: 300px;">No Transaction</p>
          </template>
          <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-hash"></i>
                {{ $t("wallet.hash") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.hash }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :formatter="formateDate" min-width="160">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{ $t("wallet.time") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-to"></i>
                {{ $t("wallet.from") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.from }}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="to" :label="$t('wallet.to')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-to"></i>
                {{ $t("wallet.to") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.to }}</p>
            </template>
          </el-table-column>-->
          <el-table-column prop="value" :label="$t('wallet.value')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{ $t("wallet.value") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('wallet.fee')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-fee"></i>
                {{ $t("wallet.fee") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="TransStatus" :label="$t('wallet.status')" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{ $t("wallet.status") }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col v-show="tableType" :span="6" :offset="15" class="transaction-foot">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPageTo"
          :page-size="pageSize"
          :total="totalRecordsTo"
          @current-change="handleCurrentChangeTo"
        ></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as account from '../../services/AccountService'
import * as wallet from '../../services/WalletService'
import moment from 'moment'
import { Message } from 'element-ui'
import { getTradeStatusName } from '../../store/orderStatus'

export default {
  name: 'Wallet',
  data() {
    return {
      address: '',
      balance: '0',
      dialogVisible: false,
      transactionListFrom: [],
      transactionListTo: [],
      tableData1: [],
      curLang: this.$store.getters.lang,
      curUserInfo: auth.getUserBaseInfo(),
      currentPageFrom: 1,
      currentPageTo: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecordsFrom: 0,
      totalRecordsTo: 0,
      tableType: false
    }
  },
  methods: {
    formateDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    copy() {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', this.address)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(input)
      this.$message({
        showClose: true,
        message: 'Success.',
        type: 'success'
      })
    },
    goTransfer() {
      this.$router.push({ path: 'transfer' })
    },
    getUserInfo() {
      const userInfo = account
        .userInfo(this.curLang, this.curUserInfo.userId)
        .then(userInfo => {
          this.address = userInfo.data.data.accountAddress
        })
    },
    getTradeList() {
      wallet
        .getTradeListFromUser(
          this.curLang,
          this.curUserInfo.userId,
          this.currentPageFrom,
          this.pageSize
        )
        .then(tradeList => {
          this.transactionListFrom = tradeList.data.data.records
          this.transactionListFrom.map(transaction => {
            transaction.TransStatus = getTradeStatusName(
              transaction.status,
              auth.getCurLang()
            )
          })
          this.totalRecordsFrom = tradeList.data.data.records.length
        })
      wallet
        .getTradeListToUser(
          this.curLang,
          this.curUserInfo.userId,
          this.currentPageTo,
          this.pageSize
        )
        .then(tradeList => {
          this.transactionListTo = tradeList.data.data.records
          this.transactionListTo.map(transaction => {
            transaction.TransStatus = getTradeStatusName(
              transaction.status,
              auth.getCurLang()
            )
          })
          this.totalRecordsTo = tradeList.data.data.records.length
        })
    },
    viewDetail(row) {
      let transDetail = []
      const fields = Object.keys(row)
      fields.map(field => {
        let value = row[field]
        if (field === 'createTime' || field === 'updateTime') {
          value = moment(row[field]).format('YYYY-MM-DD HH:mm:ss')
        }
        const fieldData = {
          title: field,
          value: value
        }
        transDetail.push(fieldData)
      })
      this.tableData1 = transDetail
      this.dialogVisible = true
    },
    getBalance() {
      return account.userBalcnce(this.curLang).then(resPdata => {
        let data = resPdata.data.data
        this.balance = data.balance
      })
    },
    handleCurrentChangeFrom(val) {
      this.currentPageFrom = val
      this.getTradeList()
    },
    handleCurrentChangeTo(val) {
      this.currentPageTo = val
      this.getTradeList()
    }
  },
  mounted() {
    this.getUserInfo()
    this.getBalance()
    this.getTradeList()
  }
}
</script>

<style lang="scss" scoped>
.Wallet {
  height: 100%;
  min-width: 1130px;
  background: #000;
  border-radius: 2px;
  p {
    margin: 0;
  }
  .wallet-head {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    height: 50px;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #a2a6b0;
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
  .wallet-body {
    height: 130px;
    background: #161618;
    border-radius: 2px;
    margin: 2px;
    p {
      padding-top: 20px;
      padding-left: 30px;
      font-size: 16px;
      color: #a2a6b0;
      line-height: 30px;
      text-align: left;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .copy {
      color: #a2ae44;
      display: inline-block;
      cursor: pointer;
      padding-left: 30px;
    }
    .el-button {
      margin-top: 35px;
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 5px;
    }
    .el-button:hover {
      background: #627100;
      border: 1px solid #627100;
    }
  }
  .transaction {
    background: #161618;
    border-radius: 2px;
    margin: 2px;
    .el-col {
      padding: 0 30px;
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .table-head {
        color: #a2a6b0;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 23px;
        }
      }
    }
    .transaction-head {
      height: 50px;
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        line-height: 50px;
        span {
          display: inline-block;
          margin-left: 30px;
          height: 30px;
          line-height: 30px;
          width: 60px;
          text-align: center;
          background: rgba(101, 143, 247, 0);
          /*box-shadow: inset 0 0 22px 0 #2463ff;*/
          border-bottom: 1px solid #a2a6b0;
          cursor: pointer;
        }
        .tableType {
          color: #a2ae44;
          font-weight: 500;
          border-bottom: 1px solid #a2ae44;
        }
      }
    }
    .blue-box {
      .el-table {
        color: #a2a6b0;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table::before {
        background: rgba(255, 255, 255, 0.1);
      }
      .el-table /deep/ tr:hover td {
        background: rgba(176, 192, 255, 0.05) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .transaction-foot {
      margin-top: 30px;
      .el-pagination {
        height: 50px;
      }
      .el-pagination /deep/ .btn-prev {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .btn-next {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .el-pager li {
        background: rgba(36, 99, 255, 0);
        color: #a2a6b0;
      }
      .el-pagination /deep/ .el-pager li.active {
        color: #a2ae44;
      }
    }
  }
}
</style>
