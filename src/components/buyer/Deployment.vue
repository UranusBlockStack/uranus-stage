<template>
  <section class="deployment">
    <el-dialog :title="$t('buyer.deploy.confirmTitle')" :visible.sync="outerVisible" width="800px">
      <el-table :data="gridData">
        <el-table-column property="order" :label="$t('buyer.deploy.orderNumber')"></el-table-column>
        <el-table-column property="address" :label="$t('buyer.deploy.address')"></el-table-column>
        <el-table-column property="number" :label="$t('buyer.deploy.value')"></el-table-column>
        <el-table-column property="type" :label="$t('buyer.deploy.content')"></el-table-column>
        <el-table-column :label="$t('buyer.deploy.fee')">
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
        <span slot="label">{{$t('buyer.deploy.code')}}</span>
        <el-input :placeholder="$t('buyer.deploy.codeIn')"></el-input>
        <el-button>{{$t('buyer.deploy.codeBtn')}}</el-button>
      </div>
      <p>{{$t('buyer.deploy.confirmText1')}}</p>
      <p>{{$t('buyer.deploy.confirmText2')}}</p>
      <el-dialog width="800px" :title="$t('buyer.deploy.confirmText3')" :visible.sync="innerVisible" append-to-body>
        <p>{{$t('buyer.deploy.confirmText4')}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible = false">{{$t('buyer.deploy.button2')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">{{$t('buyer.deploy.button1')}}</el-button>
        <el-button type="primary" @click="outerVisible = false, innerVisible = true">{{$t('buyer.deploy.button2')}}</el-button>
      </div>
    </el-dialog>
    <el-row class="resourceBox">
      <el-row>
        <el-col class="title bg" :span="24">
          <h1>{{$t('buyer.deploy.application')}}</h1>
        </el-col>
      </el-row>
      <el-row class="detial">
        <el-col :span="2" :offset="1">
          <img src="/static/img/uranus/buyer/appLogo.png" alt="应用">
        </el-col>
        <el-col :span="8" :offset="1">
          <h2>{{$t('buyer.deploy.name')}}Imagepuler</h2>
          <p>{{$t('buyer.deploy.appDetail')}}This catalog item is deprecated and to rancher item is deprecated and moved to is deprecated moved to rancher oved to rancher is oved to rancher item</p>
        </el-col>
        <el-col class="border-col" :span="4" :offset="1">
          <p>{{$t('buyer.deploy.price')}}免费</p>
          <p>{{$t('buyer.deploy.from')}}商店A</p>
          <p>{{$t('buyer.deploy.download')}}16.8w</p>
        </el-col>
        <el-col class="inf-col" :span="6" :offset="1">
          <p>{{$t('buyer.deploy.configuration')}}</p>
          <p>
            <span class="left-span">{{$t('buyer.deploy.cpu')}}xxx</span>
            <span>{{$t('buyer.deploy.memoryCon')}}xxx</span>
            <span>{{$t('buyer.deploy.networkCon')}}xxx</span>
          </p>
          <p>
            <span class="left-span">{{$t('buyer.deploy.gpuCon')}}xxx</span>
            <span>{{$t('buyer.deploy.diskCon')}}xxx</span>
          </p>
        </el-col>
      </el-row>
      <el-row class="border-line"></el-row>
      <el-row class="select">
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.deploy.uracpower')}}</h1>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-radio v-model="radio" lable="1"></el-radio>
        </el-col>
        <el-col class="resourceName" :span="8">
          <span class="select-left">{{$t('buyer.deploy.newPool')}}</span>
          <el-input class="input-margin" v-model="input" :placeholder="$t('buyer.deploy.renamePool')"></el-input>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col :span="6" :offset="2">
          <span class="select-left">{{$t('buyer.deploy.region')}}</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="1">
          <span class="select-left">{{$t('buyer.deploy.cpu')}}</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="1">
          <span class="select-left">{{$t('buyer.deploy.disk')}}</span>
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
          <span class="select-left">{{$t('buyer.deploy.memory')}}</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="1">
          <span class="select-left">{{$t('buyer.deploy.gpu')}}</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="1">
          <span class="select-left">{{$t('buyer.deploy.network')}}</span>
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
          <span class="select-left">{{$t('buyer.deploy.timeScreening')}}</span>
          <el-date-picker v-model="value1" type="date" :placeholder="$t('buyer.deploy.startingTime')"></el-date-picker>
          <span class="el-icon-arrow-right"></span>
          <el-date-picker v-model="value1" type="date" :placeholder="$t('buyer.deploy.endTime')"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="select" v-show="more">
        <el-col :span="1" :offset="1">
          <el-radio v-model="radio" lable="2"></el-radio>
        </el-col>
        <el-col class="resourceName" :span="8">
          <span class="select-left space-chose">{{$t('buyer.deploy.choosePool')}}</span>
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
      <el-row class="select" v-show="more">
        <el-col :span="1" :offset="1">
          <el-radio v-model="radio" lable="3"></el-radio>
        </el-col>
        <el-col class="resourceName" :span="8">
          <span class="select-left">{{$t('buyer.deploy.noDeploy')}}</span>
        </el-col>
      </el-row>
      <el-row class="more">
        <el-col :span="4" :offset="10" class="more-button" v-show="!more">
          <p @click="changeMore">
            {{$t('buyer.deploy.more')}}
            <i class="el-icon-arrow-down"></i>
          </p>
        </el-col>
        <el-col :span="4" :offset="10" class="more-button" v-show="more">
          <p @click="changeMore">
            {{$t('buyer.deploy.pick')}}
            <i class="el-icon-arrow-up"></i>
          </p>
        </el-col>
      </el-row>
      <el-row class="edition">
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.deploy.version')}}</h1>
        </el-col>
        <el-col :span="20" :offset="1">
          <span class="select-left">{{$t('buyer.deploy.chooseVersion')}}</span>
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
      <el-row class="newApp">
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.deploy.newApp')}}</h1>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col class="resourceName" :span="8" :offset="2">
          <span class="select-left">{{$t('buyer.deploy.nameApp')}}</span>
          <el-input class="input-margin" v-model="input" placeholder="默认作者上传名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col class="resourceName" :span="8" :offset="2">
          <span class="select-left">{{$t('buyer.deploy.description')}}</span>
          <el-input class="input-margin" v-model="input" placeholder="默认作者上传名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="border-line"></el-row>
      <el-row class="configuration">
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.deploy.configurationOption')}}</h1>
        </el-col>
      </el-row>
      <el-row class="select">
        <el-col
          class="configuration-box"
          :span="8"
          :offset="2"
          v-for="(configuration,index) in configurationList"
          :key="index"
        >
          <p class="configuration-name">CHECK_CPU_USAGE：</p>
          <el-input class="input-margin" v-model="input"></el-input>
          <span>Enable CPU usage check</span>
        </el-col>
      </el-row>
      <el-row class="border-line"></el-row>
      <el-row>
        <el-col :span="4" :offset="10">
          <el-button type="success" @click="outerVisible = true">{{$t('buyer.deploy.deploy')}}</el-button>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "Deployment",
  data() {
    return {
      radio: "1",
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
      more: false,
      configurationList: [
        { id: "1", name: "Imagepuller", shop: "商店1" },
        { id: "2", name: "Imagepuller", shop: "商店2" },
        { id: "3", name: "Imagepuller", shop: "商店3" },
        { id: "4", name: "Imagepuller", shop: "商店4" },
        { id: "1", name: "Imagepuller", shop: "商店1" },
        { id: "2", name: "Imagepuller", shop: "商店2" },
        { id: "3", name: "Imagepuller", shop: "商店3" },
        { id: "4", name: "Imagepuller", shop: "商店4" }
      ],
      gridData: [
        {
          order: "214521236987",
          address: "0x461s2df6…",
          number: "1000021.23",
          type: "购买应用",
          charge: "0.11"
        },
        {
          order: "214521236987",
          address: "0x461s2df6…",
          number: "1000021.23",
          type: "购买应用",
          charge: "0.11"
        },
        {
          order: "214521236987",
          address: "0x461s2df6…",
          number: "1000021.23",
          type: "购买应用",
          charge: "0.11"
        },
        {
          order: "214521236987",
          address: "0x461s2df6…",
          number: "1000021.23",
          type: "购买应用",
          charge: "0.11"
        }
      ],
      num1: 1,
      outerVisible: false,
      innerVisible: false
    };
  },
  methods: {
    changeMore() {
      this.more = !this.more;
    }
  }
};
</script>

<style lang="scss" scoped>
.deployment {
  background: #f2f2f2;
  min-width: 1130px;
  .el-dialog {
    .code {
      width: 500px;
      display: flex;
      margin: 25px 150px;
      span {
        width: 155px;
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
  .resourceBox {
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 20px;
    .border-line {
      border-bottom: 1px solid #e9e9e9;
      margin-top: 33px;
      margin-bottom: 30px;
    }
    .bg {
      background: #fafafa;
    }
    .title {
      border-radius: 4px 4px 0 0;
      height: 54px;
      margin-bottom: 25px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .detial {
      height: 155px;
      img {
        height: 100px;
        width: 100px;
        margin-top: 30px;
      }
      h2 {
        font-family: ArialMT;
        font-size: 18px;
        color: #363636;
        line-height: 22px;
        text-align: left;
      }
      p {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        letter-spacing: 0;
        line-height: 22px;
        text-align: left;
      }
      .border-col {
        margin-top: 60px;
        border-left: 1px solid #e9e9e9;
        border-right: 1px solid #e9e9e9;
        p {
          padding-left: 50px;
        }
      }
      .inf-col {
        margin-top: 60px;
        span {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          text-align: left;
          line-height: 24px;
          padding-left: 20px;
        }
        .left-span {
          padding-left: 0;
        }
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
        width: 200px;
      }
      .space-chose {
        width: 150px;
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
      .configuration-box {
        margin-bottom: 30px;
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          text-align: left;
          line-height: 24px;
        }
        span {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.25);
          text-align: left;
          line-height: 24px;
        }
      }
    }
    .more {
      border-bottom: 1px solid #e9e9e9;
      margin-top: 33px;
      margin-bottom: 30px;
      .more-button {
        cursor: pointer;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #979797;
        line-height: 22px;
      }
    }
    .edition {
      border-bottom: 1px solid #e9e9e9;
      margin-bottom: 30px;
      height: 150px;
    }
    .newApp {
      margin-bottom: -30px;
    }
    .el-button {
      margin-bottom: 30px;
      background: #8eb357;
      border-radius: 5px;
      border: none;
      width: 200px;
      height: 34px;
    }
  }
}
</style>
