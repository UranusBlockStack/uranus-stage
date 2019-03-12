<template>
  <section class="appRepository">
    <el-row class="repositoryHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-my-application"></i>
          {{$t('menu.appRepository')}}
        </h1>
      </el-col>
      <el-col class="record" :span="12">
        <router-link :to="{path: '/apprecord'}">
          <p>
            {{$t('buyer.appRepository.deployRecord')}}
            <i class="iconfont icon-more"></i>
          </p>
        </router-link>
      </el-col>
    </el-row>
    <!-- delete box -->
    <el-dialog
      :title="$t('buyer.appRepository.deleteSure')"
      :visible.sync="dialogVisible"
      width="30%"
      top="20%"
    >
      <span>{{$t('buyer.appRepository.deleteText')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('buyer.appRepository.button1')}}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >{{$t('buyer.appRepository.button2')}}</el-button>
      </span>
    </el-dialog>

    <div class="shop">
      <el-row>
        <el-col :span="6" :offset="16">
          <el-input
            @keyup.enter.native="searchMyApp"
            :placeholder="$t('buyer.appRepository.searchIn')"
            prefix-icon="el-icon-search"
            v-model="searchName"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="searchMyApp" style="margin-left:10px;">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="shopBox" :gutter="20">
        <el-col :span="24" style="margin-bottom:40px">
          <el-card
            :body-style="{ padding: '0px', height:'360px'}"
            shadow="hover"
            v-for="(app, index) in appList"
            :key="index"
          >
            <div class="resources">
              <div>
                <el-dropdown trigger="click" style="display: none;">
                  <span class="el-dropdown-link">
                    <span class="iconfont icon-menu"></span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <p @click="dialogVisible = true">{{$t('buyer.appRepository.delete')}}</p>
                    </el-dropdown-item>
                    <el-dropdown-item>{{$t('buyer.appRepository.detail')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="img-box">
                  <img :src="app.imageurl" alt="img">
                </div>
                <p class="name">{{app.name}}</p>
                <p class="detail">{{app.description}}</p>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="2">
                    <p class="free">{{app.computedPrice}}</p>
                  </el-col>
                  <el-col :span="10" :offset="6">
                    <p class="shops">{{app.shop}}</p>
                  </el-col>
                  <a
                    @click.prevent="deployApp(app.appId, app.rid, app.defaultVersion, app.catalog)"
                  >
                    <el-button type="success">{{$t('buyer.appRepository.deploy')}}</el-button>
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
  name: 'Applicationmarket',
  data() {
    return {
      letter: '123',
      dialogVisible: false,
      imageServerUrl: this.$store.state.imageServerUrl,
      appList: [],
      searchName: '',
      currentPage: 1,
      pageSize: this.$store.state.defaultCardPageSize,
      totalRecords: 0,
      sort: 'download_times',
      sortDesc: 'true'
    }
  },
  methods: {
    getAppList() {
      const queryData = {
        name: this.searchName,
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sort,
        sortDesc: this.sortDesc
      }
      app.appByUser(auth.getCurLang(), queryData).then(respData => {
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
    deployApp(appId, appRid, versionId, catalog) {
      this.$router.push({
        path: '/deployment',
        query: {
          appId: appId,
          appRid: appRid,
          versionId: versionId,
          catalog: catalog
        }
      })
    },
    searchMyApp() {
      this.getAppList()
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
.appRepository {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  .repositoryHead {
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
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 50px;
      width: 125px;
      p {
        height: 0px;
        line-height: 50px;
        margin: 0;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #627100;
      }
      p:hover {
        color: #a2ae44;
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
      .el-button {
        width: 120px;
      }
      .el-card {
        background: rgba(101, 143, 247, 0);
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 270px;
        display: inline-block;
        margin: 0 15px;
      }
      .el-card:hover {
        background: rgba(176, 192, 255, 0.05);
      }
      .resources {
        text-align: center;
        padding: 10px;
        div {
          cursor: default;
          .el-dropdown {
            float: right;
            .el-dropdown-item {
              background: #8eb357;
            }
          }
          .el-dropdown:hover {
            color: #8eb357;
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
          .shops {
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
