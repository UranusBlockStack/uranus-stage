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
        <el-table-column width="150">
          <template slot="header" slot-scope="scope">
            <el-select v-model="state" :placeholder="$t('seller.host.state')">
              <el-option :label="$t('seller.host.online')" value="在线"></el-option>
              <el-option :label="$t('seller.host.offline')" value="离线"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <el-tag
              style="margin-left: 30px"
              :type="scope.row.state === '离线' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="110" prop="number" :label="$t('seller.host.number')"></el-table-column>
        <el-table-column label="CPU">
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; ">{{ scope.row.cpu }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" :stroke-width="18" :text-inside="true" color="#f25954"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column label="GPU">
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; ">{{ scope.row.gpu }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" color="#f25954" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('seller.host.memory')">
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; ">{{ scope.row.memory }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" color="#f25954" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('seller.host.disk')">
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; ">{{ scope.row.disk }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" color="#f25954" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('seller.host.network')">
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; ">{{ scope.row.network }}{{$t('seller.host.usable')}}</p>
            <el-progress :percentage="50" color="#f25954" :show-text="false"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; ">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template slot="header" slot-scope="scope">
            <el-select v-model="group" :placeholder="$t('seller.host.ownGroup')">
              <el-option :label="$t('seller.host.group') + 'A'" value="集群A"></el-option>
              <el-option :label="$t('seller.host.group') + 'B'" value="集群B"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px;">{{scope.row.colony}}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'MyHost',
  data() {
    return {
      state: '',
      group: '',
      tableData: [
        {
          state: this.$t('seller.host.online'),
          number: this.$t('seller.host.hosts') + 'A',
          cpu: '2核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: this.$t('seller.host.group') + 'A'
        },
        {
          state: this.$t('seller.host.offline'),
          number: '主机B',
          cpu: '1核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: this.$t('seller.host.group') + 'C'
        },
        {
          state: this.$t('seller.host.online'),
          number: '主机C',
          cpu: '3核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: this.$t('seller.host.group') + 'D'
        },
        {
          state: this.$t('seller.host.offline'),
          number: '主机D',
          cpu: '1核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: this.$t('seller.host.group') + 'B'
        },
        {
          state: this.$t('seller.host.online'),
          number: '主机E',
          cpu: '2核',
          gpu: '2G',
          memory: '2G',
          disk: '2T',
          network: '2M',
          colony: this.$t('seller.host.group') + 'B'
        }
      ]
    }
  },
  methods: {
    filterState(value, row) {
      return row.state === value
    },
    filterColony(value, row) {
      return row.colony === value
    }
  }
}
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
  }
}
</style>
