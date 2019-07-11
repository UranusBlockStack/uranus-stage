<template>
  <section class="applicationRecard">
    <el-row class="recordHead">
      <el-col
        class="title"
        :span="12"
      >
        <h1>
          <i class="iconfont icon-records"></i>
          {{$t('developer.applicationRecard.application')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col
          :span="6"
          :offset="18"
        >
          <el-input
            @keyup.enter.native="searchApps"
            :placeholder="$t('developer.applicationRecard.searchIn')"
            prefix-icon="el-icon-search"
            v-model="prodName"
          ></el-input>
          <el-button type="success" @click="searchApps">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col
        class="blue-box"
        :span="24"
      >
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <template slot="empty">
            <p
              class="empty-text"
              style="height: 300px; line-height: 300px;"
            >No Data</p>
          </template>
          <el-table-column>
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-id"></i>
                {{$t('developer.applicationRecard.table.number')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.orderNo }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-Mirror-name"></i>
                {{$t('developer.myApplication.table.name')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.prodName }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="version"
            min-width="50"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-version"></i>
                {{$t('developer.applicationRecard.table.version')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            min-width="60"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{$t('developer.applicationRecard.table.orderTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="45"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{$t('developer.applicationRecard.table.value')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow" v-if="!scope.row.free">{{ scope.row.prodPrice }} URAC</p>
              <p class="overflow" v-if="scope.row.free"> Free </p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="80"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-hash"></i>
                {{$t('developer.applicationRecard.table.hash')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow"> {{ scope.row.orderHash }} </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        :span="6"
        :offset="15"
        class="transaction-foot"
      >
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="totalRecords"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as order from '../../services/OrderService'
import moment from 'moment'

export default {
  name: 'MyApplication',
  data() {
    return {
      tableData: [],
      prodName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    getAppRecords() {
      const queryData = {
        prodName: this.prodName,
        sellerId: auth.getCurUserId(),
        page: this.currentPage,
        pageSize: this.pageSize,
        sortDesc: true
      }
      order.orderSearch(auth.getCurLang(), queryData).then(appList => {
        this.tableData = appList.data.data.records
        this.totalRecords = appList.data.data.total
        this.tableData.map(row => {
          row.createTime = moment(row.createTime).format('YYYY-MM-DD hh:mm')
        })
      })
    },
    searchApps() {
      this.getAppRecords()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAppRecords()
    }
  },
  created() {
    this.getAppRecords()
  }
}
</script>

<style lang="scss" scoped>
.applicationRecard {
  height: 100%;
  background: #000;
  border-radius: 2px;
  width: 100%;
  min-width: 1130px;
  opacity: 0.8;
  .recordHead {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    height: 50px;
    .title {
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
    .recard {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #727680;
      line-height: 50px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        color: #727680;
        line-height: 50px;
      }
    }
    .recard :hover {
      i, span {
        color: #627100;
      }
    }
  }
  .recordBox {
    min-height: 630px;
    min-width: 1130px;
    margin: 2px;
    background: #161618;
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
    .el-col {
      display: flex;
      .el-button {
        background: #424b00;
        border: 1px solid #424b00;
        border-radius: 3px;
        margin: 0 20px;
      }
      .el-button:hover {
        background: #627100;
        border: 1px solid #627100;
      }
      .el-select {
        margin-left: 20px;
      }
      span {
        color: rgba(0, 0, 0, 0.25);
        line-height: 40px;
      }
      .time {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: right;
        line-height: 40px;
        width: 120px;
        padding: 0 20px;
      }
    }
    .record-head {
      height: 50px;
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        line-height: 50px;
      }
    }
    .table-head {
      color: #a2a6b0;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 26px;
      }
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
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

