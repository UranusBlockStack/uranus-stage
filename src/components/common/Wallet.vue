<template>
  <section class="Wallet">
    <el-row class="wallet-head">
      <el-col :span="24">
        <p>{{$t('wallet.title')}}</p>
      </el-col>
    </el-row>
    <el-row class="wallet-body">
      <el-col :span="18">
        <p>{{$t('wallet.balance')}}100URC</p>
        <p>{{$t('wallet.address')}}0xCB5A152cD01460e6AEfE15BF45F48542a49ecd1f</p>
      </el-col>
      <el-col :span="6">
        <el-button type="success" @click="goTransfer">{{$t('wallet.button')}}</el-button>
      </el-col>
    </el-row>
    <el-row class="transaction">
      <el-col class="transaction-head">
        <p>{{$t('wallet.transactionDetails')}}</p>
        <el-dialog title="交易详情" :visible.sync="dialogVisible" width="60%">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="680"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="dialogVisible = true">
          <el-table-column prop="1" :label="tableLabel[0]" min-width="170"></el-table-column>
          <el-table-column prop="2" :label="tableLabel[1]" width="180"></el-table-column>
          <el-table-column prop="3" :label="tableLabel[2]" width="180"></el-table-column>
          <el-table-column prop="4" :label="tableLabel[3]" width="120"></el-table-column>
          <el-table-column prop="5" :label="tableLabel[4]" width="180"></el-table-column>
          <el-table-column prop="6" :label="tableLabel[5]" width="120"></el-table-column>
          <el-table-column prop="7" :label="tableLabel[6]" width="180"></el-table-column>
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
  name: 'Wallet',
  data() {
    return {
      dialogVisible: false,
      tableLabel: ['区块哈希', '交易时间', '发起方', '接收方', '交易额', '手续费', '状态'],
      tableData: [
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        },
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        },
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        },
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        },
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        },
        {
          1: '548bc46caba···',
          2: '2018-11-02 09:56',
          3: '548bc46caba···',
          4: '548bc46caba···',
          5: '1234522678.66',
          6: '13.21',
          7: '成功'
        }
      ],
      tableData1: [
        {
          menu: 'TxHash:',
          value: '0x3e98fd1224269fccaf4ee5194932c351a00eaaae6edc2a566a8966b8c253af67'
        },
        {
          menu: 'TxReceipt Status:',
          value: 'Success'
        },
        {
          menu: 'Block Height:',
          value: '6924205 (10 Block Confirmations)'
        },
        {
          menu: 'TimeStamp:',
          value: '2 mins ago (Dec-21-2018 02:43:26 AM +UTC)'
        },
        {
          menu: 'From:',
          value: '0x907a6d492e0765451ee2a066326f24f1164a5578'
        },
        {
          menu: 'To:',
          value: 'Contract 0x991c2e104dfa1e2f88fd91010ee65cfb2a60e255'
        },
        {
          menu: 'Value:',
          value: '1 Ether ($116.41)'
        },
        {
          menu: 'Gas Limit:',
          value: '41836'
        },
        {
          menu: 'Gas Used By Transaction:',
          value: '41836 (100%)'
        },
        {
          menu: 'Gas Price:',
          value: '0.000000004199999999 Ether (4.199999999 Gwei)'
        },
        {
          menu: 'Actual Tx Cost/Fee:',
          value: '0.00017571119995 Ether ($0.02)'
        },
        {
          menu: 'Nonce & {Position}:',
          value: '1422 | {191}'
        },
        {
          menu: 'Input Data:',
          value: 'Function: dbkDeposit() MethodID: 0xc1ba93e1'
        },
        {
          menu: 'Private Note:',
          value: '<To access the Private Note Feature, you must be Logged In>'
        }
      ]
    }
  },
  methods: {
    goTransfer() {
      this.$router.push({path: 'transfer'})
    }
  }
}
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
    .el-col {
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
