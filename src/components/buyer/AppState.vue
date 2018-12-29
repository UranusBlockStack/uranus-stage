<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="20">
        <h1 @click="$router.back(-1)">wordpress-mdkyy-mariadb</h1>
      </el-col>
      <el-col :span="4">
        <p>重命名</p>
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
          <el-table-column prop="1" :label="tableLabel[0]"></el-table-column>
          <el-table-column prop="2" :label="tableLabel[1]" cellStyle="{color:red}"></el-table-column>
          <el-table-column prop="3" :label="tableLabel[2]"></el-table-column>
          <el-table-column prop="4" :label="tableLabel[3]"></el-table-column>
          <el-table-column prop="5" :label="tableLabel[4]"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" :offset="9" class="transaction-foot">
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
      tableLabel: ["状态", "名称", "镜像", "主机", "IP地址"],
      tableData: [
        {
          1: "运行中",
          2: "wordpress-mdkyy-mariadb",
          3: "docker.io/bitnami/mariadb.10.135-debian-9",
          4: "host140",
          5: "10.42.0.58"
        },
        {
          1: "运行中",
          2: "wordpress-mdkyy-mariadb",
          3: "docker.io/bitnami/mariadb.10.135-debian-9",
          4: "host140",
          5: "10.42.0.58"
        },
        {
          1: "运行中",
          2: "wordpress-mdkyy-mariadb",
          3: "docker.io/bitnami/mariadb.10.135-debian-9",
          4: "host140",
          5: "10.42.0.58"
        },
        {
          1: "运行中",
          2: "wordpress-mdkyy-mariadb",
          3: "docker.io/bitnami/mariadb.10.135-debian-9",
          4: "host140",
          5: "10.42.0.58"
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
    height: 65px;
    .title {
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #252525;
        line-height: 24px;
        padding-left: 30px;
        cursor: pointer;
      }
    }
    p {
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #8eb357;
      text-align: center;
      line-height: 65px;
    }
  }
  .recordBox {
    height: 630px;
    min-width: 1130px;
    margin: 20px;
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
        font-family: PingFangSC-Regular;
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
        font-family: PingFangSC-Medium;
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