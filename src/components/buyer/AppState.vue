<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="20">
        <h1 @click="$router.back(-1)">
          <i class="iconfont"></i> Imagepuler
        </h1>
      </el-col>
      <!-- <el-col :span="4">
        <p>{{$t('buyer.appState.rename')}}</p>
      </el-col>-->
    </el-row>
    <el-row class="recordBox">
      <el-col class="blue-box" :span="24">
        <el-table :data="workLoadList" style="width: 100%">
          <template slot="empty">
            <p class="empty-text">No Dtata</p>
          </template>
          <el-table-column prop="status" :label="$t('buyer.appState.status')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('buyer.appState.status')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('buyer.appState.name')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-name"></i>
                {{$t('buyer.appState.name')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="image" width="320">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-image"></i>
                {{$t('buyer.appState.image')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.image }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="scale" :label="$t('buyer.appState.pod')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-scale"></i>
                {{$t('buyer.appState.pod')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{$t('buyer.appState.shell')}}</el-dropdown-item>
                  <el-dropdown-item>{{$t('buyer.appState.pause')}}</el-dropdown-item>
                  <el-dropdown-item>{{$t('buyer.appState.resume')}}</el-dropdown-item>
                  <el-dropdown-item>{{$t('buyer.appState.delete')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--<el-col :span="8" :offset="16" class="transaction-foot">-->
      <!--<el-pagination layout="prev, pager, next" :total="100"></el-pagination>-->
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
import * as apps from "../../services/RancherService";

export default {
  name: "AppRecord",
  data() {
    return {
      workLoadList: []
    };
  },
  methods: {
    getWorkLoads() {
      apps
        .appInstanceWorkLoads(this.$store.getters.lang, this.$route.params.id)
        .then(respData => {
          let dataList = respData.data.data.records;
          dataList.forEach((item, index) => {
            let object = {};
            object["status"] = item.state;
            object["name"] = item.name;
            console.log("maxl", JSON.parse(item.containers));
            JSON.parse(item.containers).forEach((item1, index) => {
              if (item1.hasOwnProperty("environment")) {
                object["image"] = item1.image;
              }
            });
            object["scale"] = item.scale;
            this.workLoadList.push(object);
          });
        });
    }
  },
  created() {
    this.getWorkLoads();
  }
};
</script>

<style lang="scss" scoped>
.appRecord {
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
    margin: 10px;
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
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
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    // .el-col {
    //   display: flex;
    //   .el-button {
    //     background: #8eb357;
    //     border: none;
    //     margin: 0 20px;
    //   }
    //   .el-select {
    //     margin-left: 20px;
    //   }
    //   span {
    //     color: rgba(0, 0, 0, 0.25);
    //     line-height: 40px;
    //   }
    //   .time {
    //     font-size: 16px;
    //     color: rgba(0, 0, 0, 0.65);
    //     text-align: left;
    //     line-height: 40px;
    //     width: 180px;
    //     padding: 0 20px;
    //   }
    // }
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
    }
  }
}
</style>