<template>
  <section class="myApplication">
    <el-row class="recordHead">
      <el-col
        class="title"
        :span="12"
      >
        <h1>
          <i class="iconfont icon-my-application"></i>
          {{$t('developer.myApplication.myApplication')}}
        </h1>
      </el-col>
      <el-col
        class="recard"
        :span="4"
        :offset="7"
      >
        <router-link :to="{path: '/applicationrecard'}">
          <span>{{$t('developer.myApplication.recard')}}</span>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col
          :span="6"
          :offset="18"
        >
          <el-input
            @keyup.enter.native="searchUra"
            :placeholder="$t('developer.myApplication.searchIn')"
            prefix-icon="el-icon-search"
            v-model="prodName"
          ></el-input>
          <el-button
            type="success"
            @click="searchUra"
          >
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col
        class="blue-box"
        :span="24"
      >
        <el-table
          :data="appList"
          style="width: 100%"
          @row-click="applicationdetails"
        >
          <template slot="empty">
            <p
              class="empty-text"
              style="height: 300px; line-height: 300px;"
            >No Data</p>
          </template>
          <el-table-column>
            <template slot-scope="scope">
              <div class="img-box">
                <img
                  :src="scope.row.imageurl"
                  alt="img"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name">
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
              <p class="overflow">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            min-width="55"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('developer.myApplication.table.status')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p v-if="scope.row.status == 0">{{ $t('developer.myApplication.table.processing') }} </p>
              <p v-if="scope.row.status == 1">{{ $t('developer.myApplication.table.success') }} </p>
              <p v-if="scope.row.status == 2">{{ $t('developer.myApplication.table.fail') }} </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="defaultVersion"
            min-width="70"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-version"></i>
                {{$t('developer.myApplication.table.version')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            :formatter="formateDate"
            min-width="110"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{$t('developer.myApplication.table.updateTime')}}
              </p>
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
import * as rancher from '../../services/RancherService.js'
import moment from 'moment'

export default {
  name: 'MyApplication',
  data() {
    return {
      imageServerUrl: this.$store.state.imageServerUrl,
      appList: [],
      prodName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    formateDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    getAppList() {
      const user = auth.getUserBaseInfo()
      const searchData = {
        page: this.page,
        pageSize: this.pageSize,
        // 'sort': this.sort,
        sortDesc: this.sortDesc,
        ownerId: user.userId,
        name: this.prodName
      }
      rancher.appList(this.language, searchData).then(respData => {
        this.appList = respData.data.data.records
        this.appList.map(appitem => {
          appitem.imageurl = this.imageServerUrl + appitem.rid + '/icon'
          appitem.computedPrice = appitem.free
            ? this.$t('developer.home.free')
            : appitem.price
          return appitem
        })
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAppList()
    },
    searchUra() {
      this.getAppList()
    },
    // applicationName(row) {
    //   this.$router.push({
    //     path: '/applicationName',
    //     query: {
    //       appName: row.name,
    //       appId: row.id,
    //       appRid: row.rid,
    //       versionId: row.defaultVersion,
    //       catalog: row.catalog
    //     }
    //   })
    // }
    applicationdetails(row) {
      this.$router.push({
        path: '/applicationdetails',
        query: {
          appName: row.name,
          appId: row.id,
          appRid: row.rid,
          versionId: row.defaultVersion,
          catalog: row.catalog
        }
      })
    }
  },
  mounted() {
    this.language = auth.getCurLang()
    this.getAppList()
  }
}
</script>

<style lang="scss" scoped>
.myApplication {
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
        color: #627100;
        line-height: 50px;
      }
    }
    .recard :hover {
      i,
      span {
        color: #a2ae44;
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
      .img-box {
        height: 55px;
        width: 65px;
        margin: 5px auto;
        position: relative;
        img {
          background: #f2f2f2;
          min-width: 50px;
          min-height: 40px;
          max-width: 60px;
          max-height: 55px;
          width: auto;
          height: auto;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
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

