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
          <p>{{$t('buyer.appRepository.deployRecord')}}<i class="iconfont icon-more"></i></p>
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
        <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
          <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
            <div class="resources">
              <div>
                <el-dropdown trigger="click">
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
          <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import * as app from "../../services/RancherService";
import * as auth from "../../services/AuthService";

export default {
  name: "Applicationmarket",
  data() {
    return {
      letter: "123",
      dialogVisible: false,
      imageServerUrl: this.$store.state.imageServerUrl,
      appList: [],
      searchName: "",
      page: 1,
      pageSize: 8,
      sort: "download_times",
      sortDesc: "true"
    }
  },
  methods: {
    getAppList() {
      const queryData = {
        name: this.searchName,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort,
        sortDesc: this.sortDesc
      }
      app.appByUser(auth.getCurLang(), queryData).then(respData => {
        this.appList = respData.data.data.records;
        this.appList.map(appitem => {
          appitem.imageurl = this.imageServerUrl + appitem.rid + "/icon"
          appitem.computedPrice = appitem.free
            ? this.$t("buyer.deploy.free")
            : appitem.price
          return appitem
        })
      })
    },
    deployApp(appId, appRid, versionId, catalog) {
      this.$router.push({
        path: "/deployment",
        query: {
          appId: appId,
          appRid: appRid,
          versionId: versionId,
          catalog: catalog
        }
      });
    },
    searchMyApp() {
      this.getAppList()
    }
  },
  created() {
    this.getAppList()
  }
};
</script>

<style lang="scss" scoped>
.appRepository {
  background: #f2f2f2;
  min-width: 1160px;
  .repositoryHead {
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
        color: #8eb357;
      }
    }
  }
  .shop {
    background: #ffffff;
    min-width: 1130px;
    margin: 10px;
    padding: 15px;
    .el-button {
      background: #8eb357;
      border: none;
    }
    p {
      height: 40px;
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #252525;
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
      .resources {
        text-align: center;
        padding: 20px;
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
              img {
                min-width: 100px;
                min-height: 80px;
                max-width: 130px;
                max-height: 110px;
                width: auto;
                height: auto;
                margin: 0 auto;
                display: block;
              }
            }
          .name {
            font-weight: 600;
            padding: 5px 0 10px;
            border-bottom: 2px solid #eee;
            font-family: Source-Sans-Pro-Bold;
            font-size: 20px;
            color: #251e1c;
            text-align: center;
            line-height: 24px;
          }
          .detail {
            width: 220px;
            height: 66px;
            overflow: hidden;
            box-sizing: content-box;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            text-align: center;
            line-height: 22px;
            margin: 10px auto;
          }
          .free {
            font-weight: 600;
            padding: 10px 0;
            font-size: 14px;
            color: #1890ff;
            letter-spacing: 0;
            line-height: 22px;
            text-align: left;
          }
          .shops {
            font-size: 14px;
            padding: 10px 0;
            color: #5d5d5d;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
          }
          .el-button {
            background: #8eb357;
            border: none;
          }
        }
      }
    }
  }
}
</style>
