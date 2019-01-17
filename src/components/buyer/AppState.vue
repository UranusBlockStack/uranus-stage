<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="20">
        <h1 @click="$router.back(-1)">
          <i class="iconfont icon-zhongmingming"></i> Imagepuler
        </h1>
      </el-col>
      <el-col :span="4">
        <p>{{$t('buyer.appState.rename')}}</p>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @row-click="$router.push({path: '/statedetail'})"
        >
          <el-table-column prop="1" :label="$t('buyer.appState.status')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-state"></i>
                {{$t('buyer.appState.status')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="2" :label="$t('buyer.appState.name')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-hash"></i>
                {{$t('buyer.appState.name')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="320">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-hash"></i>
                {{$t('buyer.appState.image')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.image[0] }}</p>
              <p class="overflow">{{ scope.row.image[1] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="4" :label="$t('buyer.appState.pod')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-hash"></i>
                {{$t('buyer.appState.pod')}}
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
export default {
  name: "AppRecord",
  data() {
    return {
      tableData: [
        {
          1: "on",
          2: "wordpress-mdkyy-mariadb",
          image: [
            "docker.io/bitnami/mariadb.10.135-debian-9",
            this.$t("buyer.appState.choosePod")
          ],
          4: "1"
        },
        {
          1: "on",
          2: "wordpress-mdkyy-mariadb",
          image: [
            "docker.io/bitnami/mariadb.10.135-debian-9",
            this.$t("buyer.appState.choosePod")
          ],
          4: "1"
        },
        {
          1: "on",
          2: "wordpress-mdkyy-mariadb",
          image: [
            "docker.io/bitnami/mariadb.10.135-debian-9",
            this.$t("buyer.appState.choosePod")
          ],
          4: "1"
        }
      ]
    };
  }
};
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
        cursor: pointer;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
    }
    p {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #8eb357;
      text-align: center;
      line-height: 50px;
    }
  }
  .recordBox {
    height: 630px;
    min-width: 1130px;
    margin: 10px;
    background: #ffffff;
    overflow: hidden;
    padding: 30px;
    .table-head {
      color: #363636;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 22px;
      }
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
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
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 40px;
        width: 180px;
        padding: 0 20px;
      }
    }
    .record-head {
      height: 50px;
      p {
        font-family: Source-Sans-Pro-Bold;
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