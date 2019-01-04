<template>
  <section class="myColony">
    <el-row class="myColonyHead">
      <el-col class="title" :span="12">
        <h1>我的集群</h1>
      </el-col>
    </el-row>
    <el-dialog title="设置资源参数" :visible.sync="dialogVisible" width="650px">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="设置租金">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="设置时间">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                v-model="form.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="所属地区">
            <el-select v-model="form.address" placeholder="请选择所属地区">
              <el-option label="亚洲" value="shanghai"></el-option>
              <el-option label="欧洲" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="form.state" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="dialogVisible = false">立即创建</el-button>
            <el-button  @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <div class="shop">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="输入商店/应用名称" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success">搜索</el-button>
        </el-col>
        <el-col :span="2" :offset="2">
          <p>
            价格
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="2" :offset="1">
          <p>
            起始时间
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="2" :offset="1">
          <p>
            结束时间
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-select v-model="value" placeholder="筛选">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="lineBox"></el-row>
      <el-row class="shopBox" v-for="(colony, index) in colonyList" :key="index">
        <el-col :span="4">
          <Water :chartData="colony.value"/>
          <h1>
            <router-link :to="{path: '/colony'}">{{colony.colony}}</router-link>
          </h1>
        </el-col>
        <el-col class="padding-top" :span="5" :offset="1">
          <h4>盈利：888.86URAC</h4>
          <p>价格：100URAC/天</p>
          <p>所属地区：亚洲</p>
        </el-col>
        <el-col class="padding-top" :span="6">
          <p>上架状态：出售中</p>
          <p>运行状态：运行中</p>
          <p>购买时间：2018/12/12 12:12:12</p>
          <p>结束时间：2019/12/12 12:12:12</p>
        </el-col>
        <el-col class="padding-top" :span="4">
          <p>剩余时间：已到期</p>
          <el-button type="success">
            前往续费
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
          <p class="setting" @click="dialogVisible = true">设置</p>
        </el-col>
        <el-col class="lineBox"></el-col>
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
import Water from './Water'
export default {
  name: 'MyColony',
  components: {
    Water
  },
  data() {
    return {
      options: [
        {
          value: '1',
          label: '已上架集群'
        },
        {
          value: '2',
          label: '未上架集群'
        },
        {
          value: '3',
          label: '运行中集群'
        },
        {
          value: '4',
          label: '未运行集群'
        }
      ],
      value: '',
      colonyList: [
        { id: '1', value: '0.50', colony: '集群A' },
        { id: '2', value: '0.40', colony: '集群B' },
        { id: '3', value: '0.60', colony: '集群C' },
        { id: '4', value: '0.50', colony: '集群D' },
        { id: '1', value: '0.50', colony: '集群E' },
        { id: '2', value: '0.50', colony: '集群F' },
        { id: '3', value: '0.50', colony: '集群G' },
        { id: '4', value: '0.50', colony: '集群H' }
      ],
      dialogVisible: false,
      form: {
        name: '',
        price: '',
        date1: '',
        date2: '',
        address: '',
        state: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.myColony {
  background: #f2f2f2;
  min-width: 1130px;
  .myColonyHead {
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
    width: 95%;
    min-width: 1130px;
    margin: 20px auto;
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
      i {
        color: #d8d8d8;
      }
    }
    .lineBox {
      border-bottom: 1px solid #e9e9e9;
    }
    .shopBox {
      padding-top: 30px;
      .padding-top {
        padding-top: 35px;
      }
      h1 {
        width: 100%;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
      }
      h4 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
        text-align: left;
      }
      p {
        margin: 0;
      }
      .setting {
        text-align: right;
        padding-right: 24px;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #8eb357;
        line-height: 24px;
      }
    }
  }
}
</style>
