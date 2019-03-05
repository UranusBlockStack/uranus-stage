<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="20">
        <h1 @click="$router.back(-1)">
          <i class="iconfont"></i> wordpress-mdkyy-mariadb
        </h1>
      </el-col>
      <!-- <el-col :span="4">
        <p>{{$t('buyer.stateDetail.rename')}}</p>
      </el-col>-->
    </el-row>
    <el-row class="recordBox">
      <el-col class="blue-box" :span="24">
        <el-table :data="tableData" style="width: 100%">
          <template slot="empty">
            <p class="empty-text">No Dtata</p>
          </template>
          <el-table-column prop="1">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('buyer.stateDetail.status')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="2">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-name"></i>
                {{$t('buyer.stateDetail.name')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="320">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-image"></i>
                {{$t('buyer.stateDetail.image')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.image[0] }}</p>
              <p class="overflow">{{ scope.row.image[1] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="4">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-host"></i>
                {{$t('buyer.stateDetail.host')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="5">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-ip"></i>
                {{$t('buyer.stateDetail.ip')}}
              </p>
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
export default {
  name: 'AppRecord',
  data() {
    return {
      tableData: [
        {
          1: 'on',
          2: 'wordpress-mdkyy-mariadb',
          image: [
            'docker.io/bitnami/mariadb.10.135-debian-9',
            this.$t('buyer.appState.choosePod')
          ],
          4: 'host140',
          5: '10.42.0.58'
        },
        {
          1: 'on',
          2: 'wordpress-mdkyy-mariadb',
          image: [
            'docker.io/bitnami/mariadb.10.135-debian-9',
            this.$t('buyer.appState.choosePod')
          ],
          4: 'host140',
          5: '10.42.0.58'
        },
        {
          1: 'on',
          2: 'wordpress-mdkyy-mariadb',
          image: [
            'docker.io/bitnami/mariadb.10.135-debian-9',
            this.$t('buyer.appState.choosePod')
          ],
          4: 'host140',
          5: '10.42.0.58'
        },
        {
          1: 'on',
          2: 'wordpress-mdkyy-mariadb',
          image: [
            'docker.io/bitnami/mariadb.10.135-debian-9',
            this.$t('buyer.appState.choosePod')
          ],
          4: 'host140',
          5: '10.42.0.58'
        },
        {
          1: 'on',
          2: 'wordpress-mdkyy-mariadb',
          image: [
            'docker.io/bitnami/mariadb.10.135-debian-9',
            this.$t('buyer.appState.choosePod')
          ],
          4: 'host140',
          5: '10.42.0.58'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.appRecord {
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
        color: #c8c8c8;
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
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
    .table-head {
      color: #c8c8c8;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 23px;
      }
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
        color: #c8c8c8;
        background-color: rgba(101, 143, 247, 0);
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