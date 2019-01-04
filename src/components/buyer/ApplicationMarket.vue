<template>
  <section class="appMarket">
    <el-row class="marketHead">
      <el-col class="title" :span="12">
        <h1>应用市场</h1>
      </el-col>
    </el-row>
    <div class="shop">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="输入商店/应用名称" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="success">搜索</el-button>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="value" placeholder="所有分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="value" placeholder="全部商店">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="shopBox" :gutter="20">
        <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
          <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
            <div class="resources">
              <div>
                <p class="shops">{{app.shop}}</p>
                <img src="/static/img/uranus/developer/app.png" alt="img">
                <p class="name">Imagepuler</p>
                <p
                  class="detail"
                >DEPRECATED:This catalog item is deprecated and moved to rancher-catalog under pre-pull…</p>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="2">
                    <p class="free">免费</p>
                  </el-col>
                  <el-col :span="10" :offset="6">
                    <p class="downloads">123人下载</p>
                  </el-col>
                  <router-link :to="{path: '/deployment'}">
                    <el-button type="success">查看详情</el-button>
                  </router-link>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApplicationMarket',
  data() {
    return {
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
      value: '',
      appList: [
        { id: '1', name: 'Imagepuller', shop: '商店1' },
        { id: '2', name: 'Imagepuller', shop: '商店2' },
        { id: '3', name: 'Imagepuller', shop: '商店3' },
        { id: '4', name: 'Imagepuller', shop: '商店4' },
        { id: '1', name: 'Imagepuller', shop: '商店1' },
        { id: '2', name: 'Imagepuller', shop: '商店2' },
        { id: '3', name: 'Imagepuller', shop: '商店3' },
        { id: '4', name: 'Imagepuller', shop: '商店4' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.appMarket {
  background: #f2f2f2;
  min-width: 1160px;
  .marketHead {
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
  .shop {
    background: #ffffff;
    min-width: 1130px;
    margin: 20px;
    padding: 15px;
    box-shadow: 0 1px 4px 0;
    .el-button {
      background: #8eb357;
      border: none;
    }
    p {
      height: 40px;
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #252525;
      line-height: 24px;
      text-align: left;
    }
    .shopBox {
      width: 100%;
      min-width: 1130px;
      margin-top: 15px;
      .resources {
        text-align: center;
        padding: 20px;
        div {
          cursor: default;
          .shops {
            height: 30px;
            margin-bottom: -20px;
            text-align: right;
          }
          img {
            width: 110px;
            height: 105px;
            display: inline-block;
          }
          .name {
            font-weight: 600;
            padding: 5px 0 10px;
            border-bottom: 2px solid #eee;
            font-family: PingFang-SC-Medium;
            font-size: 20px;
            color: #251e1c;
            text-align: center;
            line-height: 24px;
          }
          .detail {
            width: 220px;
            height: 66px;
            overflow: hidden;
            box-sizing: content-box;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            text-align: center;
            line-height: 22px;
            margin: 10px auto;
          }
          .free {
            font-weight: 600;
            padding: 10px 0;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #1890ff;
            letter-spacing: 0;
            line-height: 22px;
            text-align: left;
          }
          .downloads {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #5d5d5d;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
          }
          .el-button {
            background: #8eb357;
            border: none;
          }
        }
      }
    }
  }
}
</style>