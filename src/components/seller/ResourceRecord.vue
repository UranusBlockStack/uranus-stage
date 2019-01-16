<template>
  <section class="resourceRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1><i class="iconfont icon-zhongmingming"></i>{{$t('seller.groups.deployRecord')}}</h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value1" :placeholder="$t('seller.groups.deployPage.pool')">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value2" :placeholder="$t('seller.groups.deployPage.appStore')">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <span class="time">{{$t('seller.groups.deployPage.time')}}</span>
          <el-date-picker
            v-model="dateValue1"
            type="date"
            :placeholder="$t('seller.groups.deployPage.startTime')"
          ></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker
            v-model="dateValue2"
            type="date"
            :placeholder="$t('seller.groups.deployPage.endTime')"
          ></el-date-picker>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-input
            :placeholder="$t('seller.groups.deployPage.searchIn')"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button type="success"><i class="iconfont icon-view"></i></el-button>
        </el-col>
      </el-row>
      <el-col class="record-head">
        <el-dialog
          :title="$t('seller.groups.deployPage.title')"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-table :data="tableData1" style="width: 100%; margin-top: -40px;">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="dialogVisible = true">
          <el-table-column prop="1" :label="$t('seller.groups.deployPage.number')"></el-table-column>
          <el-table-column prop="2" :label="$t('seller.groups.deployPage.clusterName')"></el-table-column>
          <el-table-column prop="3" :label="$t('seller.groups.deployPage.clusterTime')"></el-table-column>
          <el-table-column prop="4" :label="$t('seller.groups.deployPage.startingTime')"></el-table-column>
          <el-table-column prop="5" :label="$t('seller.groups.deployPage.endingTime')"></el-table-column>
          <el-table-column prop="6" :label="$t('seller.groups.deployPage.clusterValue')"></el-table-column>
          <el-table-column prop="7" :label="$t('seller.groups.deployPage.clusterHash')" width='270'></el-table-column>
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
  name: "ResourceRecord",
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
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        },
        {
          1: "1234561",
          2: "MySQL",
          3: "2018-12-16",
          4: "Limitid",
          5: "Limitid",
          6: "Limitid",
          7: "0X16546167451sd54f6a5s1dfa68ds4"
        }
      ],
      tableData1: [
        {
          menu: this.$t("seller.groups.deployPage.number"),
          value: "132156421846148451"
        },
        {
          menu: this.$t("seller.groups.deployPage.clusterStatus"),
          value: "已完成"
        },
        {
          menu: this.$t("seller.groups.deployPage.orderTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("seller.groups.deployPage.clusterName"),
          value: "木马人123"
        },
        {
          menu: this.$t("seller.groups.deployPage.clusterTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("seller.groups.deployPage.startingTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("seller.groups.deployPage.endingTime"),
          value: "2018-12-12 12:12"
        },
        {
          menu: this.$t("seller.groups.deployPage.clusterPrice"),
          value: "8888888888.66URAC"
        },
        {
          menu: this.$t("seller.groups.deployPage.fee"),
          value: "88.88URAC"
        },
        {
          menu: this.$t("seller.groups.deployPage.ip"),
          value: "111.111.222.22"
        },
        {
          menu: this.$t("seller.groups.deployPage.port"),
          value: "8080"
        },
        {
          menu: this.$t("seller.groups.deployPage.clusterHash"),
          value: "0X16546167451sd54f6a5s1dfa68ds4"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.resourceRecord {
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

