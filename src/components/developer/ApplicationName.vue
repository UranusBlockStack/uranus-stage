<template>
  <section class="appName">
    <el-row class="recordHead">
      <el-col
        class="title"
        :span="20"
      >
        <h1 @click="$router.back(-1)">
          {{this.appName}}
        </h1>
      </el-col>
      <!-- <el-col :span="4">
        <p>{{$t('buyer.stateDetail.rename')}}</p>
      </el-col>-->
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col
          :span="6"
          :offset="18"
        >
          <el-input
            @keyup.enter.native="searchUra"
            :placeholder="$t('developer.applicationName.searchIn')"
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
          :data="tableData"
          style="width: 100%"
        >
          <template slot="empty">
            <p
              class="empty-text"
              style="height: 300px; line-height: 300px;"
            >No Data</p>
          </template>
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
                {{$t('developer.applicationName.table.version')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            min-width="110"
          >
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-table-time"></i>
                {{$t('developer.applicationName.table.updateTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="110">
            <template
              slot="header"
              slot-scope="scope"
            >
              <p class="table-head">
                <i class="iconfont icon-caozuo"></i>
                {{$t('developer.applicationName.table.operate')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <el-button
                  class="deleteBtn"
                  @click="applicationDetails(scope.row)"
                >{{$t('developer.applicationName.table.more')}}</el-button>

                <el-button
                  class="deleteBtn"
                  @click="deleteApp(scope.row)"
                >{{$t('developer.applicationName.table.delete')}}</el-button>
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
        ></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'AppRecord',
  data() {
    return {
      appName: '',
      tableData: [
        {
          icon: '132',
          name: 'Uranus',
          status: 'Success',
          version: '1',
          updateTime: '2018-11-02 09:56'
        }
      ],
      prodName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultPageSize,
      totalRecords: 0
    }
  },
  methods: {
    searchUra() {
      console.log("search")
    },
    applicationDetails(row) {
      console.log(row)
      this.$router.push({
        path: '/applicationDetails',
        query: {
          appId: row.id,
          appRid: row.rid,
          versionId: row.defaultVersion,
          catalog: row.catalog
        }
      })
    },
    getAppVersion(id) {
      console.log('ver', id)
    },
    deleteApp(app) {
      console.log('delete', app)
    }
  },
  created() {
    if (typeof this.$route.query.appId !== 'undefined') {
      this.appName = this.$route.query.appName
      this.appId = this.$route.query.appId
      this.appRid = this.$route.query.appRid
      this.versionId = this.$route.query.versionId
      this.catalog = this.$route.query.catalog
      this.getAppVersion(this.appId)
    }
  }
}
</script>

<style lang="scss" scoped>
.appName {
  height: 100%;
  min-width: 1130px;
  background: #000;
  border-radius: 2px;
  .recordHead {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    .title {
      height: 50px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #a2a6b0;
        line-height: 50px;
        margin: 0;
        padding: 0;
        padding-left: 30px;
        cursor: pointer;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
    }
    // p {
    //   font-family: Source-Sans-Pro-Bold;
    //   font-size: 16px;
    //   color: #8eb357;
    //   text-align: center;
    //   line-height: 50px;
    // }
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
      .deleteBtn {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #627100;
      }
      .deleteBtn:hover {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #a2ae44;
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