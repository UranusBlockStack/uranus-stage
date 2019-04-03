<template>
  <section class="appMarket">
    <el-row class="marketHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-application-market"></i>
          {{$t('menu.appMarket')}}
        </h1>
      </el-col>
    </el-row>
    <div class="shop">
      <el-row>
        <el-col :span="4">
          <el-select
            v-model="appType"
            :placeholder="$t('buyer.appMarket.application')"
            @change="setAppType"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="catalogRid" :placeholder="$t('buyer.appMarket.storeAll')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="7">
          <el-input
            @keyup.enter.native="searchApps"
            :placeholder="$t('buyer.appMarket.searchIn')"
            v-model="searchName"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" type="success" @click="searchApps">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="shopBox" :gutter="20">
        <el-col
            :span="24"
            style="text-align: center; color: #a2a6b0; margin-top: 30px;"
            v-if="this.appList.length == '0'"
          >No data</el-col>
        <el-col :span="24" style="margin-bottom:40px">
          <el-card
            :body-style="{ padding: '0px', height:'380px',}"
            shadow="hover"
            v-for="(app, index) in appList"
            :key="index"
          >
            <div class="resources">
              <div>
                <p class="shops">{{app.catalog}}</p>
                <div class="img-box">
                  <img :src="app.imageurl" alt="img">
                </div>
                <p class="name">{{app.name}}</p>
                <p class="detail">{{app.description}}</p>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="2">
                    <p class="free">{{app.computedPrice}}</p>
                  </el-col>
                  <el-col :span="11" :offset="5">
                    <p class="downloads">{{$t('buyer.appMarket.download')}} {{app.downloadTimes}}</p>
                  </el-col>
                  <a @click.prevent="deployApp(app.id, app.rid, app.defaultVersion, app.catalog)">
                    <el-button type="success">{{$t('buyer.appMarket.deploy')}}</el-button>
                  </a>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalRecords"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import * as app from '../../services/RancherService'
import * as auth from '../../services/AuthService'

export default {
  name: 'ApplicationMarket',
  data() {
    return {
      options1: [
        {
          value: 1,
          label: 'Free'
        },
        {
          value: 2,
          label: 'Paid'
        },
        { value: 0, label: 'All' }
      ],
      options2: [
        {
          value: 'library',
          label: 'library'
        }
      ],
      value1: '',
      value2: '',
      appList: [],
      imageServerUrl: this.$store.state.imageServerUrl,
      appType: 'All',
      appTypeSelected: 0,
      catalogRid: 'library',
      searchName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultCardPageSize,
      totalRecords: 0,
      sort: 'download_times',
      sortDesc: 'true'
    }
  },
  methods: {
    // to do 分页的实现
    getAppList() {
      const searchData = {
        free: this.appTypeSelected,
        name: this.searchName,
        page: this.currentPage,
        pageSize: this.pageSize,
        // 'sort': this.sort,
        sortDesc: this.sortDesc
      }

      app.appList(auth.getCurLang(), searchData).then(respData => {
        this.appList = respData.data.data.records
        this.totalRecords = respData.data.data.total

        this.appList.map(appitem => {
          appitem.imageurl = this.imageServerUrl + appitem.rid + '/icon'
          appitem.computedPrice = appitem.free
            ? this.$t('buyer.deploy.free')
            : appitem.price
          return appitem
        })
      })
    },
    getOrderOfApp(appId) {
      return app
        .appPurchaseInfo(auth.getCurLang(), appId)
        .then(purchaseInfo => {
          const purchaseInfoData = purchaseInfo.data
          const purchased = purchaseInfoData.success
        })
    },
    deployApp(appId, appRid, versionId, catalog) {
      // app.appPurchaseInfo(auth.getCurLang(), appId).then(purchaseInfo => {
      // const purchaseInfoData = purchaseInfo.data
      // const isMyApplication = purchaseInfoData.success
      // if (isMyApplication) {
      //   this.$message({
      //     showClose: true,
      //     message:
      //       'you\'ve purchased app, please go to "My Application" to deploy it',
      //     type: 'warning'
      //   })
      // } else {
      this.$router.push({
        path: '/deployment',
        query: {
          appId: appId,
          appRid: appRid,
          versionId: versionId,
          catalog: catalog
        }
      })
      // }
      // })
    },
    searchApps() {
      this.getAppList()
    },
    setAppType(select) {
      this.appTypeSelected = select
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAppList()
    }
  },
  created() {
    this.getAppList()
  }
}
</script>

<style lang="scss" scoped>
.appMarket {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  .marketHead {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    .title {
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #A2A6B0;
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
  .shop {
    background: #161618;
    border-radius: 2px;
    min-width: 1130px;
    margin: 2px;
    padding: 15px;
    .el-button {
      background: #424b00;
      border: 1px solid #424b00;
      border-radius: 3px;
    }
    .el-button:hover {
      background: #627100;
      border: 1px solid #627100;
    }
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #A2A6B0;
    }
    .el-select /deep/ .el-select__caret {
        color: #A2A6B0;
    }
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #A2A6B0;
    }
    .el-input /deep/ .el-input__prefix {
      display: none;
    }
    .el-pagination /deep/ .btn-prev {
      background: rgba(36, 99, 255, 0);
      color: #A2A6B0;
    }
    .el-pagination /deep/ .btn-next {
      background: rgba(36, 99, 255, 0);
      color: #A2A6B0;
    }
    .el-pagination /deep/ .el-pager li {
      background: rgba(36, 99, 255, 0);
      color: #A2A6B0;
    }
    .el-pagination /deep/ .el-pager li.active {
      color: #a2ae44;
    }
    p {
      height: 40px;
      font-family: Source-Sans-Pro-Bold;
      font-weight: 500;
      font-size: 16px;
      color: #A2A6B0;
      line-height: 24px;
      text-align: left;
    }
    .shopBox {
      width: 100%;
      min-width: 1130px;
      margin-top: 15px;
      min-height: 400px;
      .el-card {
        background: rgba(101, 143, 247, 0);
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 270px;
        display: inline-block;
        margin: 15px;
      }
      .el-card:hover {
          background:rgba(176,192,255,0.05);
      }
      .resources {
        text-align: center;
        padding: 10px;
        div {
          cursor: default;
          .shops {
            font-size: 14px;
            height: 30px;
            margin-bottom: -10px;
            text-align: right;
          }
          .img-box {
            height: 110px;
            width: 130px;
            margin: 10px auto;
            position: relative;
            img {
              background: #f2f2f2;
              min-width: 100px;
              min-height: 80px;
              max-width: 130px;
              max-height: 110px;
              width: auto;
              height: auto;
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .name {
            font-weight: 600;
            padding: 5px 0 5px;
            font-family: Source-Sans-Pro-Bold;
            font-weight: 500;
            font-size: 16px;
            color: #A2A6B0;
            text-align: center;
            line-height: 24px;
            margin-bottom: 0px;
          }
          .detail {
            width: 220px;
            height: 66px;
            overflow: hidden;
            box-sizing: content-box;
            font-weight: 300;
            font-size: 14px;
            color: #A2A6B0;
            text-align: center;
            line-height: 22px;
            margin: -5px auto;
          }
          .free {
            font-weight: 500;
            padding: 10px 0;
            font-family: Source-Sans-Pro-Bold;
            font-weight: 500;
            font-size: 14px;
            color: #a2ae44;
            letter-spacing: 0;
            line-height: 22px;
            text-align: left;
          }
          .downloads {
            font-family: Source-Sans-Pro-Bold;
            font-weight: 500;
            font-size: 14px;
            padding: 10px 0;
            color: #A2A6B0;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
          }
          .el-button {
            background: #424b00;
            border: 1px solid #424b00;
            border-radius: 5px;
            width: 120px;
            margin-top: -5px;
            padding: 8px 20px;
          }
          .el-button:hover {
            background: #627100;
            border: 1px solid #627100;
          }
        }
      }
    }
  }
}
</style>