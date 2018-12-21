<template>
  <section class="Wallet">
    <el-row class="wallet-head">
      <el-col :span="24">
        <p>我的钱包</p>
      </el-col>
    </el-row>
    <el-row class="wallet-body">
      <el-col :span="18">
        <p>账户余额：100URC</p>
        <p>我的地址：0xCB5A152cD01460e6AEfE15BF45F48542a49ecd1f</p>
      </el-col>
      <el-col :span="6">
        <el-button type="success">转账</el-button>
      </el-col>
    </el-row>
    <el-row class="transaction">
      <el-col class="transaction-head">
        <p>交易详情</p>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="1" label="区块哈希" min-width="170"></el-table-column>
          <el-table-column prop="2" label="交易时间" width="180"></el-table-column>
          <el-table-column prop="3" label="发起方" width="180"></el-table-column>
          <el-table-column prop="4" label="接收方" width="120"></el-table-column>
          <el-table-column prop="5" label="交易额" width="180"></el-table-column>
          <el-table-column prop="6" label="手续费" width="120"></el-table-column>
          <el-table-column prop="7" label="状态" width="180"></el-table-column>
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
  name: "Wallet",
  data() {
    return {
      tableData: [
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
        {
          1: "548bc46caba···",
          2: "2018-11-02 09:56",
          3: "548bc46caba···",
          4: "548bc46caba···",
          5: "1234522678.66",
          6: "13.21",
          7: "成功"
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.Wallet {
  height: 100%;
  min-width: 1130px;
  p {
    margin: 0;
  }
  .wallet-head {
    background: #ffffff;
    height: 64px;
    p {
      padding-left: 30px;
      font-size: 20px;
      color: #252525;
      line-height: 60px;
      text-align: left;
      font-weight: bold;
    }
  }
  .wallet-body {
    height: 110px;
    margin: 20px;
    background: #ffffff;
    p {
      padding-top: 20px;
      padding-left: 30px;
      font-size: 18px;
      color: #252525;
      line-height: 30px;
      text-align: left;
    }
    .el-button {
      margin-top: 35px;
    }
  }
  .transaction {
    height: 510px;
    margin: 20px;
    background: #ffffff;
    overflow: hidden;
    .el-col{
        padding: 0 30px;
    }
    .transaction-head {
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
