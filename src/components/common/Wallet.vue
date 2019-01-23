<template>
  <section class="Wallet">
    <el-row class="wallet-head">
      <el-col :span="24">
        <h1>
          <i class="iconfont icon-wallet"></i>
          {{$t('wallet.title')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="wallet-body">
      <el-col :span="18">
        <p>{{$t('wallet.balance')}}100 URAC</p>
        <p>
          {{$t('wallet.address')}}
          {{address}}
          <el-tooltip class="item" effect="dark" content="Copy address" placement="right">
            <u class="copy" @click="copy()">{{$t('wallet.copy')}}</u>
          </el-tooltip>
        </p>
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
          width="820px"
        >
          <el-table :data="tableData1" style="width: 820px; margin-top:-40px;">
            <el-table-column prop="title" width="190"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col class="blue-box" :span="24">
        <el-table :data="tableData" style="width: 100%" @row-click="viewDetail">
          <template slot="empty">
            <p class="empty-text">No Transaction</p>
          </template>
          <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-hash"></i>
                {{$t('wallet.hash')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.hash}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :formatter="formateDate" min-width="160">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{$t('wallet.time')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-from"></i>
                {{$t('wallet.from')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.from}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="to" :label="$t('wallet.to')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-to"></i>
                {{$t('wallet.to')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.to}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="$t('wallet.value')" min-width="150">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{$t('wallet.value')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('wallet.fee')">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-fee"></i>
                {{$t('wallet.fee')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('wallet.status')" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('wallet.status')}}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" :offset="15" class="transaction-foot">
        <el-pagination
                layout="prev, pager, next"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :total="totalRecords"
                @current-change="handleCurrentChange">
        </el-pagination>
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

export default {
  name: 'Wallet',
  data() {
    return {
      address: '',
      dialogVisible: false,
      tableData: [],
      tableData1: [],
      curLang: this.$store.getters.lang,
      curUserInfo: auth.getUserBaseInfo(),
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
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
      this.$message('Success')
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
    getTradeFrom() {
      wallet
        .getTradeListFromUser(this.curLang, this.curUserInfo.userId, this.currentPage, this.pageSize)
        .then(tradeList => {
          this.tableData = tradeList.data.data.records
          this.totalRecords = tradeList.data.data.records.length
        })
    },
    viewDetail(row) {
      console.log(row)
      let transDetail = []
      const fields = Object.keys(row)
      fields.map(field => {
        const fieldData = {
          title: field,
          value: row[field]
        }
        transDetail.push(fieldData)
      })
      this.tableData1 = transDetail
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTradeFrom()
    }
  },
  mounted() {
    this.getUserInfo()
    this.getTradeFrom()
  }
}
</script>

<style lang="scss" scoped>
.Wallet {
  height: 100%;
  min-width: 1130px;
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  p {
    margin: 0;
  }
  .wallet-head {
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
  .wallet-body {
    height: 110px;
    margin: 10px;
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    p {
      padding-top: 20px;
      padding-left: 30px;
      font-size: 16px;
      color: #ffffff;
      line-height: 30px;
      text-align: left;
    }
    .copy {
      color: #409eff;
      display: inline-block;
      cursor: pointer;
      padding-left: 30px;
    }
    .el-button {
      margin-top: 35px;
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 5px;
      border: none;
    }
  }
  .transaction {
    margin: 10px;
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    .el-col {
      padding: 0 30px;
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .table-head {
        color: #ffffff;
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
        color: #ffffff;
        line-height: 50px;
      }
    }
    .blue-box {
      .el-table {
        color: #ffffff;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table /deep/ tr:hover td {
        background-color: rgba(101, 143, 247, 0.2) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
    .transaction-foot {
      margin-top: 30px;
      .el-pagination {
        height: 50px;
      }
      .el-pagination /deep/ .btn-prev{
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
    }
    .el-pagination /deep/ .btn-next{
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li{
        background: rgba(36, 99, 255, 0.2);
        color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li.active{
        color: #409eff;
    }
    }
  }
}
</style>
