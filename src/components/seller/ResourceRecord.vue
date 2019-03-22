<template>
  <section class="resourceRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-records"></i>
          {{$t('seller.groups.deployRecord')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <!-- <el-col :span="6">
          <el-select v-model="value1" :placeholder="$t('seller.groups.deployPage.pool')">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value2" :placeholder="$t('seller.groups.deployPage.appStore')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <span class="time">{{$t('seller.groups.deployPage.time')}}</span>
          <el-date-picker
            v-model="dateValue1"
            type="date"
            :placeholder="$t('seller.groups.deployPage.startTime')"
          ></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker
            v-model="dateValue2"
            type="date"
            :placeholder="$t('seller.groups.deployPage.endTime')"
          ></el-date-picker>
        </el-col>-->
        <el-col :span="6" :offset="18">
          <el-input
            @keyup.enter.native="searchUra"
            :placeholder="$t('seller.groups.deployPage.searchIn')"
            prefix-icon="el-icon-search"
            v-model="prodName"
          ></el-input>
          <el-button type="success" @click="searchUra">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col class="record-head">
        <el-dialog
          :title="$t('seller.groups.deployPage.title')"
          :visible.sync="dialogVisible"
          width="850px"
        >
          <el-table :data="tableData1" style="width: 100%; margin-top: -40px;">
            <el-table-column prop="title" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col class="blue-box" :span="24">
        <el-table :data="tableData" style="width: 100%">
          <template slot="empty">
            <p class="empty-text" style="height: 300px; line-height: 300px;">No Data</p>
          </template>
          <el-table-column prop="orderNo">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-id"></i>
                {{$t('seller.groups.deployPage.number')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="prodName">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-name"></i>
                {{$t('seller.groups.deployPage.clusterName')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="rentDays" min-width="105">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('seller.groups.deployPage.clusterTime')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p style="padding-left: 65px;">{{ scope.row.rentDays }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="beginTime" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-start-time"></i>
                {{$t('seller.groups.deployPage.startingTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-finish-time"></i>
                {{$t('seller.groups.deployPage.endingTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="prodPrice" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-value"></i>
                {{$t('seller.groups.deployPage.clusterValue')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="orderHash" width="270">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-table-hash"></i>
                {{$t('seller.groups.deployPage.clusterHash')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.orderHash }}</p>
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
  name: 'ResourceRecord',
  data() {
    return {
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
      //   dateValue1: '',
      //   dateValue2: '',
      dialogVisible: false,
      tableData: [],
      tableData1: [
        // {
        //   menu: this.$t('seller.groups.deployPage.number'),
        //   value: '132156421846148451'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.clusterStatus'),
        //   value: '已完成'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.orderTime'),
        //   value: '2018-12-12 12:12'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.clusterName'),
        //   value: '木马人123'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.clusterTime'),
        //   value: '2018-12-12 12:12'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.startingTime'),
        //   value: '2018-12-12 12:12'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.endingTime'),
        //   value: '2018-12-12 12:12'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.clusterPrice'),
        //   value: '8888888888.66URAC'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.fee'),
        //   value: '88.88URAC'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.ip'),
        //   value: '111.111.222.22'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.port'),
        //   value: '8080'
        // },
        // {
        //   menu: this.$t('seller.groups.deployPage.clusterHash'),
        //   value: '0X16546167451sd54f6a5s1dfa68ds4'
        // }
      ],
      prodName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    getUraPowerPoolList() {
      const queryData = {
        prodName: this.prodName,
        orderStatus: 3,
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
    searchUra() {
      this.getUraPowerPoolList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUraPowerPoolList()
    },
    formateDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    viewDetail(row) {
      let deployDetail = []
      const fields = Object.keys(row)
      fields.map(field => {
        let value = row[field]
        if (field === 'beginTime' || field === 'endTime') {
          value = moment(row[field]).format('YYYY-MM-DD HH:mm:ss')
        }
        const fieldData = {
          title: field,
          value: value
        }
        deployDetail.push(fieldData)
      })
      this.tableData1 = deployDetail
      this.dialogVisible = true
    },
  },
  created() {
    this.getUraPowerPoolList()
  }
}
</script>

<style lang="scss" scoped>
.resourceRecord {
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

