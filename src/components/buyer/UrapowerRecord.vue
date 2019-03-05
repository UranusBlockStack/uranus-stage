<template>
  <section class="urapowerRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-records"></i>
          {{$t('buyer.myResource.deployRecord')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <!--<el-col :span="6">
          <el-select v-model="value1" :placeholder="$t('buyer.myResource.deployPage.pool')">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value2" :placeholder="$t('buyer.myResource.deployPage.appStore')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>-->
        <!--<el-col :span="11">
          <span class="time">{{$t('buyer.myResource.deployPage.time')}}</span>
          <el-date-picker
            v-model="dateValue1"
            type="date"
            :placeholder="$t('buyer.myResource.deployPage.startTime')"
          ></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker
            v-model="dateValue2"
            type="date"
            :placeholder="$t('buyer.myResource.deployPage.endTime')"
          ></el-date-picker>
        </el-col>-->
        <el-col :span="6" :offset="18">
          <el-input
            @keyup.enter.native="searchUra"
            :placeholder="$t('buyer.myResource.deployPage.searchIn')"
            prefix-icon="el-icon-search"
            v-model="prodName"
          ></el-input>
          <el-button type="success" @click="searchUra">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col class="record-head">
        <el-dialog :visible.sync="dialogVisible" width="800px">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col class="blue-box" :span="24">
        <el-table :data="tableData" style="width: 100%">
          <template slot="empty">
            <p class="empty-text">No Data</p>
          </template>
          <el-table-column prop="orderNo">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-id"></i>
                {{$t('buyer.myResource.deployPage.number')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="prodName">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-name"></i>
                {{$t('buyer.myResource.deployPage.appName')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatusName">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('buyer.myResource.deployPage.appState')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="beginTime">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-start-time"></i>
                {{$t('buyer.myResource.deployPage.appTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="endTime">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-finish-time"></i>
                {{$t('buyer.myResource.deployPage.appEnd')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="prodPrice">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{$t('buyer.myResource.deployPage.appValur')}}
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
  name: 'urapowerRecord',
  data() {
    return {
      //   dateValue1: '',
      //   dateValue2: '',
      //   value1: '',
      //   options1: [
      //     {
      //       value: '选项1',
      //       label: '选项1'
      //     },
      //     {
      //       value: '选项2',
      //       label: '选项2'
      //     }
      //   ],
      //   value2: '',
      //   options2: [
      //     {
      //       value: '选项1',
      //       label: '选项1'
      //     },
      //     {
      //       value: '选项2',
      //       label: '选项2'
      //     }
      //   ],
      prodName: '',
      dialogVisible: false,
      tableData: [],
      tableData1: [
        {
          menu: this.$t('buyer.myResource.deployPage.number'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appStatus'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.orderTime'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appName'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appStore'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appTime'),
          value: ''
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appGroup'),
          value: '资源池1'
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appPrice'),
          value: '8888888888.66URAC'
        },
        {
          menu: this.$t('buyer.myResource.deployPage.fee'),
          value: '88.88URAC'
        },
        {
          menu: this.$t('buyer.myResource.deployPage.ip'),
          value: '111.111.222.22'
        },
        {
          menu: this.$t('buyer.myResource.deployPage.port'),
          value: '8080'
        },
        {
          menu: this.$t('buyer.myResource.deployPage.appHash'),
          value: ''
        }
      ],
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    getUraPowerPoolList() {
      const queryData = {
        prodName: this.prodName,
        page: this.currentPage,
        pageSize: this.pageSize,
        projectId: 0,
        sort: 'string',
        sortDesc: true,
        prodType: 'UraPower'
      }
      order.orderSearch(auth.getCurLang(), queryData).then(appList => {
        this.tableData = appList.data.data.records
        this.totalRecords = appList.data.data.total

        this.tableData.map(row => {
          row.beginTime = moment(row.beginTime).format('YYYY-MM-DD hh:mm')
          row.endTime = moment(row.endTime).format('YYYY-MM-DD hh:mm')
        })
      })
    },
    deployDetail(rowdata) {
      this.fillDetailData(rowdata)
      this.dialogVisible = true
    },
    searchUra() {
      this.getUraPowerPoolList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUraPowerPoolList()
    }
  },
  created() {
    this.getUraPowerPoolList()
  }
}
</script>

<style lang="scss" scoped>
.urapowerRecord {
  height: 100%;
  min-width: 1130px;
  background: #000;
  border-radius: 2px;
  .recordHead {
    background: #161618;
    border-radius: 2px;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    .title {
        height: 50px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #c8c8c8;
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
      color: #c8c8c8;
    }
    .table-head {
      color: #c8c8c8;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 23px;
      }
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
        color: #c8c8c8;
        line-height: 40px;
      }
      .time {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: right;
        line-height: 40px;
        width: 180px;
        padding: 0 20px;
      }
    }
    .record-head {
      height: 50px;
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 50px;
      }
    }
    .blue-box {
      .el-table {
        color: #c8c8c8;
        background-color: rgba(101, 143, 247, 0);
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
        color: #c8c8c8;
      }
      .el-pagination /deep/ .btn-next {
        background: rgba(36, 99, 255, 0);
        color: #c8c8c8;
      }
      .el-pagination /deep/ .el-pager li {
        background: rgba(36, 99, 255, 0);
        color: #c8c8c8;
      }
      .el-pagination /deep/ .el-pager li.active {
        color: #a2ae44;
      }
    }
  }
}
</style>

