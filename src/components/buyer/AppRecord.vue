<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-zhongmingming"></i>
          {{$t('buyer.appRepository.deployRecord')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col class="123" :span="7">
          <el-input
            :placeholder="$t('buyer.appRepository.deployPage.searchIn')"
            prefix-icon="el-icon-search"
            v-model="appName"
          ></el-input>
          <el-button type="success" @click="searchApp">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
        <!--<el-col :span="11">-->
        <!--<span class="time">{{$t('buyer.appRepository.deployPage.time')}}</span>-->
        <!--<el-date-picker v-model="dateValue1" type="date" :placeholder="$t('buyer.appRepository.deployPage.startTime')"></el-date-picker>-->
        <!--<span class="el-icon-arrow-right"></span>-->
        <!--<el-date-picker v-model="dateValue2" type="date" :placeholder="$t('buyer.appRepository.deployPage.endTime')"></el-date-picker>-->
        <!--</el-col>-->
        <el-col :span="6">
          <!--<el-select v-model="value1" :placeholder="$t('buyer.appRepository.deployPage.pool')">-->
          <!--<el-option-->
          <!--v-for="item in options1"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="value2" :placeholder="$t('buyer.appRepository.deployPage.appStore')">-->
          <!--<el-option-->
          <!--v-for="item in options2"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
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
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="deployDetail">
          <template slot="empty">
            <p class="empty-text">{{$t('seller.host.text')}}</p>
          </template>
          <el-table-column prop="orderNo">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-id"></i>
                {{$t('buyer.appRepository.deployPage.number')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-table-name"></i>
                {{$t('buyer.appRepository.deployPage.appName')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-table-time"></i>
                {{$t('buyer.appRepository.deployPage.appTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="projectName">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-table-pool"></i>
                {{$t('buyer.appRepository.deployPage.appGroup')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="catalog">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-table-store"></i>
                {{$t('buyer.appRepository.deployPage.appStore')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="orderAmount">
            <template slot="header" slot-scope="scope">
              <p class="table-head" style="text-align:left;">
                <i class="iconfont icon-table-value"></i>
                {{$t('buyer.appRepository.deployPage.appValur')}}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8" :offset="16" class="transaction-foot">
        <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as app from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import moment from 'moment'

export default {
  name: 'AppRecord',
  data() {
    return {
      dateValue1: '',
      dateValue2: '',
      appName: '',
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
          menu: this.$t('buyer.appRepository.deployPage.number'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appStatus'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.orderTime'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appName'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appStore'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appTime'),
          value: ''
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appGroup'),
          value: '资源池1'
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appPrice'),
          value: '8888888888.66URAC'
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.fee'),
          value: '88.88URAC'
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.ip'),
          value: '111.111.222.22'
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.port'),
          value: '8080'
        },
        {
          menu: this.$t('buyer.appRepository.deployPage.appHash'),
          value: '0X16546167451sd54f6a5s1dfa68ds4'
        }
      ],
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    getAppDeployRecords() {
      const queryData = {
        name: this.appName,
        page: 0,
        pageSize: 0,
        projectId: 0,
        sort: 'string',
        sortDesc: true
      }
      app.appInstanceSearch(auth.getCurLang(), queryData).then(appList => {
        this.tableData = appList.data.data.records
        this.tableData.map(row => {
          row.createTime = moment(row.createTime).format('YYYY-MM-DD hh:mm')
        })
      })
    },
    fillDetailData(data) {
      this.tableData1[0].value = data.orderNo
      this.tableData1[1].value = data.orderStatus
      this.tableData1[2].value = moment(data.createTime).format('YYYY-MM-DD hh:mm')
      this.tableData1[3].value = data.orderStatus
      this.tableData1[4].value = data.catalog
      this.tableData1[5].value = moment(data.updateTime).format('YYYY-MM-DD hh:mm')
      this.tableData1[6].value = data.projectName
      this.tableData1[7].value = data.orderAmount
      this.tableData1[8].value = data.free
      this.tableData1[9].value = data.ipAddress
      this.tableData1[10].value = data.port
      this.tableData1[11].value = data.orderHash
    },
    deployDetail(rowdata) {
      this.fillDetailData(rowdata)
      this.dialogVisible = true
    },
    searchApp() {
      this.getAppDeployRecords()
    }
  },
  created() {
    this.getAppDeployRecords()
  }
}
</script>

<style lang="scss" scoped>
.appRecord {
  background: #f2f2f2;
  min-width: 1130px;
  .recordHead {
    background: #ffffff;
    height: 50px;
    .title {
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #252525;
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
    height: 630px;
    min-width: 1130px;
    margin: 10px;
    background: #ffffff;
    overflow: hidden;
    padding: 30px;
    .el-col {
      display: flex;
      .el-button {
        background: #8eb357;
        border: none;
        margin: 0 20px;
      }
      .el-select {
        margin-left: 20px;
      }
      span {
        color: rgba(0, 0, 0, 0.25);
        line-height: 40px;
      }
      .time {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: right;
        line-height: 40px;
        width: 180px;
        padding: 0 20px;
      }
    }
    .table-head {
        color: #363636;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 23px;
        }
      }
    .record-head {
      height: 50px;
      p {
        font-family: PingFangSC-Medium;
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

