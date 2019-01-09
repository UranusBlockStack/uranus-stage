<template>
  <section class="resourceMarket">
    <el-dialog :title="$t('buyer.resourceMarket.confirmTitle')" :visible.sync="outerVisible" width="800px">
      <el-table :data="gridData">
        <el-table-column property="order" :label="$t('buyer.resourceMarket.orderNumber')"></el-table-column>
        <el-table-column property="address" :label="$t('buyer.resourceMarket.address')"></el-table-column>
        <el-table-column property="number" :label="$t('buyer.resourceMarket.value')"></el-table-column>
        <el-table-column property="type" :label="$t('buyer.resourceMarket.content')"></el-table-column>
        <el-table-column :label="$t('buyer.resourceMarket.fee')">
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
        <span slot="label">{{$t('buyer.resourceMarket.code')}}</span>
        <el-input :placeholder="$t('buyer.resourceMarket.codeIn')"></el-input>
        <el-button>{{$t('buyer.resourceMarket.codeBtn')}}</el-button>
      </div>
      <p>{{$t('buyer.resourceMarket.confirmText1')}}</p>
      <p>{{$t('buyer.resourceMarket.confirmText2')}}</p>
      <el-dialog :title="$t('buyer.resourceMarket.confirmText3')" width="800px" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('buyer.resourceMarket.confirmText4')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">{{$t('buyer.resourceMarket.button2')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('buyer.resourceMarket.button1')}}</el-button>
        <el-button type="primary" @click="outerVisible = false, innerVisible = true">{{$t('buyer.resourceMarket.button2')}}</el-button>
      </div>
    </el-dialog>
    <el-row class="resourceHead">
      <el-col class="title" :span="24">
        <h1>{{$t('menu.resourceMarket')}}</h1>
      </el-col>
    </el-row>
    <el-row class="resourceBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.resourceMarket.purchase')}}</h1>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="6" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.region')}}</span>
          <el-select v-model="valueRegion">
            <el-option
              v-for="item in optionsRegion"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="2">
          <span class="select-left">CPU</span>
          <el-select v-model="valueCpu">
            <el-option
              v-for="item in optionsCpu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.disk')}}</span>
          <el-select v-model="valueDisk">
            <el-option
              v-for="item in optionsDisk"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="6" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.memory')}}</span>
          <el-select v-model="valueMemory">
            <el-option
              v-for="item in optionsMemory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="2">
          <span class="select-left">GPU</span>
          <el-select v-model="valueGpu">
            <el-option
              v-for="item in optionsGpu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.network')}}</span>
          <el-select v-model="valueNetwork">
            <el-option
              v-for="item in optionsNetwork"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="20" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.timeScreening')}}</span>
          <el-date-picker v-model="time1" type="date" :placeholder="$t('buyer.resourceMarket.startingTime')"></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker v-model="time2" type="date" :placeholder="$t('buyer.resourceMarket.endTime')"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col class="resourceName" :span="8" :offset="2">
          <span class="select-left">{{$t('buyer.resourceMarket.resourceName')}}</span>
          <el-input class="input-margin" v-model="input" :placeholder="$t('buyer.resourceMarket.creatResource')"></el-input>
        </el-col>
      </el-row>
      <el-row class="button">
        <el-col :span="6" :offset="10">
          <el-button type="success" @click="outerVisible = true">{{$t('buyer.resourceMarket.confirm')}}</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'ResourceMarket',
  data() {
    return {
      optionsRegion: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueRegion: '',
      optionsMemory: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueMemory: '',
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueCpu: '',
      optionsCpu: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueGpu: '',
      optionsGpu: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueDisk: '',
      optionsDisk: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      optionsNetwork: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        }
      ],
      valueNetwork: '',
      value: '',
      time1: '',
      time2: '',
      input: '',
      outerVisible: false,
      innerVisible: false,
      gridData: [{
        order: '214521236987',
        address: '0x461s2df6…',
        number: '1000021.23',
        type: '购买应用',
        charge: '0.11'
      }]
    }
  }
}
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
        width: 165px;
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
        width: 95px;
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
      }
    }
  }
}
</style>
