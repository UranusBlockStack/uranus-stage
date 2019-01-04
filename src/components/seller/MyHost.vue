<template>
  <section class="myHost">
    <el-row class="myHostHead">
      <el-col class="title" :span="12">
        <h1>我的主机</h1>
      </el-col>
    </el-row>
    <el-row class="myHostBox">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p class="empty-text">提示：系统未检测到设备中存在安装包，请点击右上角的下载包，安装后刷新此页面，进行第一次资源池的创建。</p>
        </template>
        <el-table-column
          prop="state"
          label="状态"
          sortable
          :filters="[{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }]"
          :filter-method="filterState"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '在线' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="主机编号"></el-table-column>
        <el-table-column prop="cpu" label="剩余CPU"></el-table-column>
        <el-table-column prop="gpu" label="剩余GPU"></el-table-column>
        <el-table-column prop="memory" label="剩余内存"></el-table-column>
        <el-table-column prop="disk" label="剩余硬盘"></el-table-column>
        <el-table-column prop="network" label="剩余网络"></el-table-column>
        <el-table-column
          prop="colony"
          label="所属集群"
          sortable
          :filters="[{ text: '集群A', value: '集群A' }, { text: '集群B', value: '集群B' }, { text: '集群C', value: '集群C' }, { text: '集群E', value: '集群E' }]"
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
          state: '在线',
          number: '主机A',
          cpu: '2核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: '集群A'
        },
        {
          state: '离线',
          number: '主机B',
          cpu: '1核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: '集群C'
        },
        {
          state: '在线',
          number: '主机C',
          cpu: '3核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: '集群D'
        },
        {
          state: '在线',
          number: '主机D',
          cpu: '1核',
          gpu: '2G',
          memory: '2G',
          disk: '1T',
          network: '2M',
          colony: '集群B'
        },
        {
          state: '离线',
          number: '主机E',
          cpu: '2核',
          gpu: '2G',
          memory: '2G',
          disk: '2T',
          network: '2M',
          colony: '集群B'
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
