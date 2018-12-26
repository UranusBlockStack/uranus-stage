<template>
  <section class="resourceMarket">
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
        <el-col class="resourceName" :span="12" :offset="2">
          <span class="select-left">资源名称：</span>
          <el-input v-model="input" placeholder="创建资源名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="button">
        <el-col :span="6" :offset="10">
          <el-button type="success">确认购买</el-button>
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
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.resourceMarket {
  background: #f2f2f2;
  min-width: 1130px;
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
        width: 100px;
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
            background:#8eb357;
border-radius:5px;
width:200px;
height:34px;
        }
        
    }
  }
}
</style>
