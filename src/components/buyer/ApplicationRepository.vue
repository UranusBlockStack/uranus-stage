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
          <el-input @keyup.enter.native="searchMyApp"
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
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1160px;
  .repositoryHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    margin: 10px 10px 0;
    height: 50px;
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
        color: #1890ff;
      }
    }
  }
  .shop {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    min-width: 1130px;
    margin: 10px;
    padding: 15px;
    .el-button {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
      border: none;
    }
    .el-input /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-pagination /deep/ .btn-prev {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .btn-next {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li.active {
      color: #409eff;
    }
    p {
      height: 40px;
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
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
            color: #ffffff;
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
            color: #ffffff;
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
            color: #1890ff;
            letter-spacing: 0;
            line-height: 22px;
            text-align: left;
          }
          .shops {
            font-family: Source-Sans-Pro-Bold;
            font-weight: 500;
            font-size: 14px;
            padding: 10px 0;
            color: #ffffff;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
          }
          .el-button {
            background: rgba(101, 143, 247, 0);
            box-shadow: inset 0 0 22px 0 #2463ff;
            border-radius: 5px;
            width: 120px;
            border: none;
            margin-top: -5px;
            padding: 8px 20px;
          }
        }
      }
    }
  }
}
</style>
