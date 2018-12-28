<template>
  <section class="appRecord">
    <el-row class="recordHead">
      <el-col class="title" :span="24">
        <h1>部署应用记录</h1>
      </el-col>
    </el-row>
    <el-row class="recordBox">
      <el-row>
        <el-col class="123" :span="7">
          <el-input placeholder="输入商店/应用名称" prefix-icon="el-icon-search"></el-input>
          <el-button type="success">搜索</el-button>
        </el-col>

        <el-col :span="11">
          <span class="time">布置时间筛选</span>
          <el-date-picker v-model="dateValue1" type="date" placeholder="开始时间"></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker v-model="dateValue2" type="date" placeholder="结束时间"></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="资源池">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="所属商店">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-col class="record-head">
        <el-dialog :visible.sync="dialogVisible" width="50%">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="menu" width="180"></el-table-column>
            <el-table-column prop="value" width="580"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" @row-click="dialogVisible = true">
          <el-table-column prop="1" :label="tableLabel[0]"></el-table-column>
          <el-table-column prop="2" :label="tableLabel[1]"></el-table-column>
          <el-table-column prop="3" :label="tableLabel[2]"></el-table-column>
          <el-table-column prop="4" :label="tableLabel[3]"></el-table-column>
          <el-table-column prop="5" :label="tableLabel[4]"></el-table-column>
          <el-table-column prop="6" :label="tableLabel[5]"></el-table-column>
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
  name: 'AppRecord',
  data() {
    return {
      dateValue1: '',
      dateValue2: '',
      value: '',
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        },
        {
          value: '选项4',
          label: '选项4'
        },
        {
          value: '选项5',
          label: '选项5'
        }
      ],
      dialogVisible: false,
      tableLabel: [
        '订单号',
        '应用名',
        '布置时间',
        '所属资源组',
        '所属商店',
        '价格'
      ],
      tableData: [
        {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }, {
          1: '1234561',
          2: 'MySQL',
          3: '2018-12-16',
          4: 'Limitid',
          5: 'Limitid',
          6: 'Limitid'
        }
      ],
      tableData1: [
        {
          menu: '订单号：',
          value: '132156421846148451'
        },
        {
          menu: '订单状态：',
          value: '已完成'
        },
        {
          menu: '订单创建时间：',
          value: '2018-12-12 12:12'
        },
        {
          menu: '应用名：',
          value: '木马人123'
        },
        {
          menu: '所属商店：',
          value: '321木马人'
        },
        {
          menu: '布置时间：',
          value: '2018-12-12 12:12'
        },
        {
          menu: '所属资源池：',
          value: '资源池1'
        },
        {
          menu: '购买应用价格：:',
          value: '8888888888.66URAC'
        },
        {
          menu: '手续费：',
          value: '88.88URAC'
        },
        {
          menu: 'IP：',
          value: '111.111.222.22'
        },
        {
          menu: '端口：',
          value: '8080'
        },
        {
          menu: '交易哈希：',
          value: '0X16546167451sd54f6a5s1dfa68ds4'
        }
      ]
    }
  }
}
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
      }
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

