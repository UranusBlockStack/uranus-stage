<template>
  <section class="urapowerRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont"></i>
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
            :placeholder="$t('buyer.myResource.deployPage.searchIn')"
            prefix-icon="el-icon-search" v-model="appName"
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
                <p class="empty-text">No Data</p >
            </template>
            <el-table-column prop="orderNo" :label="$t('buyer.myResource.deployPage.number')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-id"></i>
                    {{$t('buyer.myResource.deployPage.number')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="prodName" :label="$t('buyer.myResource.deployPage.appName')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-name"></i>
                    {{$t('buyer.myResource.deployPage.appName')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="orderStatusName" :label="$t('buyer.myResource.deployPage.appGroup')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-table-state"></i>
                    {{$t('buyer.myResource.deployPage.appState')}}
                  </p>
                </template>
          </el-table-column>
            <el-table-column prop="beginTime" :label="$t('buyer.myResource.deployPage.appTime')">
                <template slot="header" slot-scope="scope">
                    <p class="table-head">
                        <i class="iconfont icon-start-time"></i>
                        {{$t('buyer.myResource.deployPage.appTime')}}
                    </p>
                </template>
            </el-table-column>
          <el-table-column prop="endTime" :label="$t('buyer.myResource.deployPage.appStore')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-finish-time"></i>
                    {{$t('buyer.myResource.deployPage.appEnd')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="prodPrice" :label="$t('buyer.myResource.deployPage.appValur')">
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
                @current-change="handleCurrentChange">
        </el-pagination>
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
      dateValue1: '',
      dateValue2: '',
      value1: '',
      options1: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      appName: '',
      value2: '',
      options2: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
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
      currentPageFrom: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    getUraPowerPoolList() {
      const queryData = {
        name: this.appName,
        page: this.currentPageFrom,
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
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  .recordHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    .title {
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
  }
  .recordBox {
    min-height: 630px;
    min-width: 1130px;
    margin: 10px;
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
    .el-input /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
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
    .el-col {
      display: flex;
      .el-button {
        background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
      border: none;
        margin: 0 20px;
      }
      .el-select {
        margin-left: 20px;
      }
      span {
        color: #ffffff;
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

