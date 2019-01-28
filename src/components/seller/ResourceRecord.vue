<template>
  <section class="resourceRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>
          <i class="iconfont icon-zhongmingming"></i>
          {{$t('seller.groups.deployRecord')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <!-- <el-col :span="6">
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
        </el-col> -->
        <el-col :span="7">
          <el-input
            :placeholder="$t('seller.groups.deployPage.searchIn')"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button type="success">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-col class="record-head">
          <p>{{$t('seller.groups.deployRecord')}}</p>
        <el-dialog
          :title="$t('seller.groups.deployPage.title')"
          :visible.sync="dialogVisible"
          width="850px"
        >
          <el-table :data="tableData1" style="width: 100%; margin-top: -40px;">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col class="blue-box" :span="24">
        <el-table :data="tableData" style="width: 100%" @row-click="dialogVisible = true">
          <el-table-column prop="1">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-id"></i>
                {{$t('seller.groups.deployPage.number')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="2">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-lines"></i>
                {{$t('seller.groups.deployPage.clusterName')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="3" min-width="100">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-hangshishichang"></i>
                {{$t('seller.groups.deployPage.clusterTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="4">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-start-time"></i>
                {{$t('seller.groups.deployPage.startingTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="5">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-finish-time"></i>
                {{$t('seller.groups.deployPage.endingTime')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="6" min-width="110">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-turnover"></i>
                {{$t('seller.groups.deployPage.clusterValue')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="hash" width="270">
            <template slot="header" slot-scope="scope">
              <p class="table-head">
                <i class="iconfont icon-hash"></i>
                {{$t('seller.groups.deployPage.clusterHash')}}
              </p>
            </template>
            <template slot-scope="scope">
                  <p class="overflow">{{ scope.row.hash }}</p>
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
  name: 'ResourceRecord',
  data() {
    return {
      dateValue1: '',
      dateValue2: '',
      value1: '',
      options1: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      value2: '',
      options2: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      dialogVisible: false,
      tableData: [
        {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid',
          hash: '0X16546167451sd54f6a5s1dfa68ds4'
        },
        {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid',
          hash: '0X16546167451sd54f6a5s1dfa68ds4'
        },
        {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid',
          hash: '0X16546167451sd54f6a5s1dfa68ds4'
        }
      ],
      tableData1: [
        {
          menu: this.$t('seller.groups.deployPage.number'),
          value: '132156421846148451'
        },
        {
          menu: this.$t('seller.groups.deployPage.clusterStatus'),
          value: '已完成'
        },
        {
          menu: this.$t('seller.groups.deployPage.orderTime'),
          value: '2018-12-12 12:12'
        },
        {
          menu: this.$t('seller.groups.deployPage.clusterName'),
          value: '木马人123'
        },
        {
          menu: this.$t('seller.groups.deployPage.clusterTime'),
          value: '2018-12-12 12:12'
        },
        {
          menu: this.$t('seller.groups.deployPage.startingTime'),
          value: '2018-12-12 12:12'
        },
        {
          menu: this.$t('seller.groups.deployPage.endingTime'),
          value: '2018-12-12 12:12'
        },
        {
          menu: this.$t('seller.groups.deployPage.clusterPrice'),
          value: '8888888888.66URAC'
        },
        {
          menu: this.$t('seller.groups.deployPage.fee'),
          value: '88.88URAC'
        },
        {
          menu: this.$t('seller.groups.deployPage.ip'),
          value: '111.111.222.22'
        },
        {
          menu: this.$t('seller.groups.deployPage.port'),
          value: '8080'
        },
        {
          menu: this.$t('seller.groups.deployPage.clusterHash'),
          value: '0X16546167451sd54f6a5s1dfa68ds4'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.resourceRecord {
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
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
    .el-input /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-col {
      display: flex;
      .el-button {
        background: rgba(101, 143, 247, 0);
        box-shadow: inset 0 0 22px 0 #2463ff;
        border-radius: 3px;
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
        color: #ffffff;
        line-height: 50px;
      }
    }
    .table-head {
      color: #ffffff;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 26px;
      }
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
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
    }
  }
}
</style>

