<template>
  <section class="urapowerRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-zhongmingming"></i>
          {{$t('buyer.appRepository.deployRecord')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value1" :placeholder="$t('buyer.appRepository.deployPage.pool')">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value2" :placeholder="$t('buyer.appRepository.deployPage.appStore')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <span class="time">{{$t('buyer.appRepository.deployPage.time')}}</span>
          <el-date-picker
            v-model="dateValue1"
            type="date"
            :placeholder="$t('buyer.appRepository.deployPage.startTime')"
          ></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker
            v-model="dateValue2"
            type="date"
            :placeholder="$t('buyer.appRepository.deployPage.endTime')"
          ></el-date-picker>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-input
            :placeholder="$t('buyer.appRepository.deployPage.searchIn')"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button type="success">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col class="record-head">
        <el-dialog :visible.sync="dialogVisible" width="800px">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="dialogVisible = true">
          <el-table-column prop="1" :label="$t('buyer.appRepository.deployPage.number')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-id"></i>
                    {{$t('buyer.appRepository.deployPage.number')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="2" :label="$t('buyer.appRepository.deployPage.appName')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-Point-in-time"></i>
                    {{$t('buyer.appRepository.deployPage.appName')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="3" :label="$t('buyer.appRepository.deployPage.appTime')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-hangshishichang"></i>
                    {{$t('buyer.appRepository.deployPage.appTime')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="4" :label="$t('buyer.appRepository.deployPage.appGroup')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-host1"></i>
                    {{$t('buyer.appRepository.deployPage.appGroup')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="5" :label="$t('buyer.appRepository.deployPage.appStore')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-my-resource"></i>
                    {{$t('buyer.appRepository.deployPage.appStore')}}
                  </p>
                </template>
          </el-table-column>
          <el-table-column prop="6" :label="$t('buyer.appRepository.deployPage.appValur')">
              <template slot="header" slot-scope="scope">
                  <p class="table-head">
                    <i class="iconfont icon-turnover"></i>
                    {{$t('buyer.appRepository.deployPage.appValur')}}
                  </p>
                </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" :offset="15" class="transaction-foot">
        <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "urapowerRecord",
  data() {
    return {
      dateValue1: "",
      dateValue2: "",
      value1: "",
      options1: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        }
      ],
      value2: "",
      options2: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        }
      ],
      dialogVisible: false,
      tableData: [
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid"
        }
      ],
      tableData1: [
        {
          menu: this.$t("buyer.appRepository.deployPage.number"),
          value: "132156421846148451"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appStatus"),
          value: "已完成"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.orderTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appName"),
          value: "木马人123"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appStore"),
          value: "321木马人"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appGroup"),
          value: "资源池1"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appPrice"),
          value: "8888888888.66URAC"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.fee"),
          value: "88.88URAC"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.ip"),
          value: "111.111.222.22"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.port"),
          value: "8080"
        },
        {
          menu: this.$t("buyer.appRepository.deployPage.appHash"),
          value: "0X16546167451sd54f6a5s1dfa68ds4"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.urapowerRecord {
  background: #f2f2f2;
  min-width: 1130px;
  .recordHead {
    background: #ffffff;
    height: 65px;
    .title {
      h1 {
        font-family: Source-Sans-Pro-Bold;
        margin: 0;
        padding: 0;
        padding-left: 30px;
        font-size: 16px;
        color: #252525;
        line-height: 50px;
        text-align: left;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
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
          font-size: 26px;
        }
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
        text-align: right;
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

