<template>
  <section class="myHost">
    <el-row class="myHostHead">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.myHost')}}</h1>
      </el-col>
    </el-row>
    <el-row class="myHostBox">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p class="empty-text">{{$t('seller.host.text')}}</p>
        </template>
        <el-table-column width="70">
          <template slot-scope="scope">
            <div :class="scope.row.state == 'Offline' ? 'on' : 'off'">{{scope.row.state}}</div>
          </template>
        </el-table-column>
        <el-table-column width="150" prop="number">
          <template slot="header" slot-scope="scope">
            <p>
              <i class="iconfont icon-resource-market"></i> {{$t('seller.host.number')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu1"></i> CPU
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; "
            >{{ scope.row.cpu }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :text-inside="true"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu1"></i> {{$t('seller.host.memory')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; "
            >{{ scope.row.memory }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu1"></i> {{$t('seller.host.disk')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; "
            >{{ scope.row.disk }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu1"></i> {{$t('seller.host.network')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              style="color:#8c8c8c; font-size:10px; "
            >{{ scope.row.network }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="230">
          <template slot="header" slot-scope="scope">
            <el-select v-model="group" :placeholder="$t('seller.host.ownGroup')">
              <el-option :label="$t('seller.host.group') + 'A'" value="集群A"></el-option>
              <el-option :label="$t('seller.host.group') + 'B'" value="集群B"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px; text-align: center;">{{scope.row.colony}} 
              <el-button style="margin-left: 10px;" v-show="scope.row.colony == $t('seller.host.group') + ' B'">join</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "MyHost",
  data() {
    return {
      state: "",
      group: "",
      tableData: [
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " A",
          cpu: "2核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " A"
        },
        {
          state: this.$t("seller.host.offline"),
          number: this.$t("seller.host.hosts") + " A",
          cpu: "1核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " C"
        },
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " C",
          cpu: "3核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " D"
        },
        {
          state: this.$t("seller.host.offline"),
          number: this.$t("seller.host.hosts") + " D",
          cpu: "1核",
          memory: "2G",
          disk: "1T",
          network: "2M",
          colony: this.$t("seller.host.group") + " B"
        },
        {
          state: this.$t("seller.host.online"),
          number: this.$t("seller.host.hosts") + " E",
          cpu: "2核",
          memory: "2G",
          disk: "2T",
          network: "2M",
          colony: this.$t("seller.host.group") + "B"
        }
      ]
    };
  },
  methods: {
    filterState(value, row) {
      return row.state === value;
    },
    filterColony(value, row) {
      return row.colony === value;
    }
  }
};
</script>

<style lang="scss" scoped>
.myHost {
  background: #f2f2f2;
  min-width: 1130px;
  .myHostHead {
    background: #ffffff;
    height: 65px;
    .title {
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #252525;
        line-height: 24px;
        padding-left: 30px;
      }
    }
  }
  .myHostBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 20px;
    padding: 15px;
    min-height: 550px;
    .empty-text {
      width: 470px;
      margin: 30px auto;
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #5d5d5d;
      text-align: left;
      line-height: 24px;
    }
    .el-progress /deep/ .el-progress-bar__outer {
      background: #1890ff !important;
      border-radius: 0;
    }
    .el-progress /deep/ .el-progress-bar__inner {
      background: #f25954 !important;
      border-radius: 0;
    }
    .on {
      background: #9bcc3d;
      border: 2px solid #dcdcdc;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      float: right;
    }
    .off {
      background: #f2f2f2;
      border: 2px solid #dcdcdc;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      float: right;
    }
    .table-head {
      text-align: center;
    }
    .el-select /deep/ .el-input__suffix {
      right: 10px;
    }
  }
}
</style>
