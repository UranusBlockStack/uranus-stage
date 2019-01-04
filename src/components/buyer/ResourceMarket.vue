<template>
  <section class="resourceMarket">
    <el-dialog title="确认交易信息" :visible.sync="outerVisible" width="800px">
      <el-table :data="gridData">
        <el-table-column property="order" label="订单号"></el-table-column>
        <el-table-column property="address" label="收款地址"></el-table-column>
        <el-table-column property="number" label="转账数额"></el-table-column>
        <el-table-column property="type" label="交易方式"></el-table-column>
        <el-table-column label="手续费">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.charge"
              :precision="2"
              :step="0.1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="code">
        <span slot="label">验证码：</span>
        <el-input placeholder="输入验证码"></el-input>
        <el-button>获取验证码</el-button>
      </div>
      <p>确认后，您的URAC将通过区块链网络转账至相应地址，确认后订单不可撤销。</p>
      <p>订单待支付时间为30分钟，若超过此时间，则视为自动取消订单。</p>
      <el-dialog width="800px" :visible.sync="innerVisible" append-to-body>
        <p>部署成功</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outerVisible = false, innerVisible = true">确 定</el-button>
      </div>
    </el-dialog>
    <el-row class="resourceHead">
      <el-col class="title" :span="24">
        <h1>资源市场</h1>
      </el-col>
    </el-row>
    <el-row class="resourceBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>资源市场</h1>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="6" :offset="2">
          <span class="select-left">所属地区：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="2">
          <span class="select-left">CPU：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="select-left">硬盘大小：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="6" :offset="2">
          <span class="select-left">内存大小：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="2">
          <span class="select-left">GPU：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="select-left">带宽大小：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="20" :offset="2">
          <span class="select-left">时间筛选：</span>
          <el-date-picker v-model="value1" type="date" placeholder="开始时间"></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker v-model="value1" type="date" placeholder="结束时间"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col class="resourceName" :span="8" :offset="2">
          <span class="select-left">资源名称：</span>
          <el-input class="input-margin" v-model="input" placeholder="创建资源名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="button">
        <el-col :span="6" :offset="10">
          <el-button type="success" @click="outerVisible = true">确认购买</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "ResourceMarket",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: "",
      value2: "",
      input: "",
      num1: 1,
      outerVisible: false,
      innerVisible: false
    };
  }
};
</script>

<style lang="scss" scoped>
.resourceMarket {
  background: #f2f2f2;
  min-width: 1130px;
  .el-dialog {
    .code {
      width: 500px;
      display: flex;
      margin: 25px 150px;
      span {
        width: 105px;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        line-height: 40px;
        text-align: left;
      }
      .el-button {
        margin-left: 15px;
      }
    }
    p {
      margin: 15px auto;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #f54c46;
      line-height: 20px;
    }
  }
  .resourceHead {
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
  .resourceBox {
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    height: 560px;
    margin: 20px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .select {
      margin-top: 33px;
      .el-select {
        width: 150px;
      }
      .select-left {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        min-width: 100px;
        width: 100px;
      }
      .input-margin {
        margin-left: -15px;
      }
      .el-icon-arrow-right {
        color: rgba(0, 0, 0, 0.25);
      }
      .resourceName {
        display: flex;
      }
    }
    .button {
      .el-button {
        margin-top: 66px;
        border: none;
        background: #8eb357;
        border-radius: 5px;
        width: 200px;
        height: 34px;
      }
    }
  }
}
</style>
