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
          <el-select v-model="value1" :placeholder="$t('buyer.appMarket.application')">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="value2" :placeholder="$t('buyer.appMarket.storeAll')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="7">
          <el-input :placeholder="$t('buyer.appMarket.searchIn')" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" type="success">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="shopBox" :gutter="20">
        <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
          <el-card :body-style="{ padding: '0px', height:'380px'}" shadow="hover">
            <div class="resources">
              <div>
                <p class="shops">{{app.catalog}}</p>
                <div class="imgBox">
                  <img :src="app.imageurl" alt="img">
                </div>
                <p class="name">{{app.name}}</p>
                <p class="detail">{{app.description}}</p>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="2">
                    <p class="free">{{$t('buyer.appMarket.free')}}</p>
                  </el-col>
                  <el-col :span="10" :offset="6">
                    <p class="downloads">{{$t('buyer.appMarket.download')}}123</p>
                  </el-col>
                  <a @click.prevent="deployApp(app.id, app.rid, app.defaultVersion, app.catalog)">
                    <el-button
                      style="margin-bottom:10px;"
                      type="success"
                    >{{$t('buyer.appMarket.deploy')}}</el-button>
                  </a>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <el-pagination layout="prev, pager, next" :total="1000" style="padding-bottom:15px"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import * as app from "../../services/RancherService";

export default {
  name: "ApplicationMarket",
  data() {
    return {
      options1: [
        {
          value: "1",
          label: "Free"
        },
        {
          value: "2",
          label: "Paid"
        }
      ],
      options2: [
        {
          value: "library",
          label: "library"
        }
      ],
      value1: "",
      value2: "",
      appList: [],
      imageServerUrl: this.$store.state.imageServerUrl,
      appType: 0,
      catalogRid: "library",
      searchName: "",
      page: 1,
      pageSize: 8,
      sort: "download_times",
      sortDesc: "true"
    };
  },
  methods: {
    // to do 分页的实现
    getAppList() {
      const searchData = {
        free: this.appType,
        name: this.searchName,
        page: this.page,
        pageSize: this.pageSize,
        // 'sort': this.sort,
        sortDesc: this.sortDesc
      };

      app.appList(this.$store.getters.lang, searchData).then(respData => {
        this.appList = respData.data.data.records;
        this.appList.map(imginfo => {
          imginfo.imageurl = this.imageServerUrl + imginfo.rid + "/icon";
          return imginfo;
        });
      });
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
    }
  },
  mounted() {
    this.getAppList();
  }
};
</script>

<style lang="scss" scoped>
.appMarket {
  background: #f2f2f2;
  min-width: 1160px;
  .marketHead {
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
      .resources {
        text-align: center;
        padding: 20px;
        div {
          cursor: default;
          .shops {
            height: 30px;
            margin-bottom: -10px;
            text-align: right;
          }
          .imgBox {
            width: 130px;
            height: 110px;
            margin: 0 auto;
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
            border-bottom: 1px solid #eee;
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
          .downloads {
            font-size: 14px;
            padding: 10px 0;
            color: #5d5d5d;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
            height: 22px;
          }
          .el-button {
            background: #8eb357;
            border: none;
            margin-top: 10px;
            margin-right: 75px;
          }
        }
      }
    }
  }
}
</style>