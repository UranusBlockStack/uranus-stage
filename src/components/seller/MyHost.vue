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
        <el-table-column
          prop="state"
          :label="$t('seller.host.state')"
          sortable
          :filters="[{ text: this.$t('seller.host.online'), value: this.$t('seller.host.online') }, { text: this.$t('seller.host.offline'), value: this.$t('seller.host.offline') }]"
          :filter-method="filterState"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '在线' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" :label="$t('seller.host.number')"></el-table-column>
        <el-table-column prop="cpu" label="CPU"></el-table-column>
        <el-table-column prop="gpu" label="GPU"></el-table-column>
        <el-table-column prop="memory" :label="$t('seller.host.memory')"></el-table-column>
        <el-table-column prop="disk" :label="$t('seller.host.disk')"></el-table-column>
        <el-table-column prop="network" :label="$t('seller.host.network')"></el-table-column>
        <el-table-column
          prop="colony"
          :label="$t('seller.host.ownGroup')"
          sortable
          :filters="[{ text: this.$t('seller.host.group')+'A', value: this.$t('seller.host.group') + 'A' }, { text: this.$t('seller.host.group')+'B', value: this.$t('seller.host.group') + 'B' }, { text: this.$t('seller.host.group')+'C', value: this.$t('seller.host.group') + 'C' }, { text: this.$t('seller.host.group')+'E', value: this.$t('seller.host.group') + 'E' }]"
          :filter-method="filterColony"
        >
          <template slot-scope="scope">
            <p style="color: #8eb357">{{scope.row.colony}}</p>
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
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 20px;
    padding: 15px;
    min-height: 550PX;
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
