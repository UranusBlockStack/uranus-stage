<template>
  <section class="myColony">
    <el-row class="myColonyHead">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.myColony')}}</h1>
      </el-col>
    </el-row>
    <el-dialog :title="$t('seller.groups.settingTitle')" :visible.sync="dialogVisible" width="650px">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$t('seller.groups.settingName')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.groups.setRent')">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item :label="$t('seller.groups.settingTime')">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('seller.groups.startingTime')"
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
                :placeholder="$t('seller.groups.endTime')"
                v-model="form.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('seller.groups.setRegion')">
            <el-select v-model="form.address" :placeholder="$t('seller.groups.setRegion')">
              <el-option :label="$t('seller.groups.asia')" value="asia"></el-option>
              <el-option :label="$t('seller.groups.europe')" value="europe"></el-option>
              <el-option :label="$t('seller.groups.africa')" value="africa"></el-option>
              <el-option :label="$t('seller.groups.south')" value="southAmerica"></el-option>
              <el-option :label="$t('seller.groups.north')" value="northAmerica"></el-option>
              <el-option :label="$t('seller.groups.oceania')" value="oceania"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('seller.groups.setState')">
            <el-select v-model="form.state" :placeholder="$t('seller.groups.setState')">
              <el-option :label="$t('seller.groups.inSale')" value="inSale"></el-option>
              <el-option :label="$t('seller.groups.notSale')" value="notSale"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="dialogVisible = false">{{$t('seller.groups.confirm')}}</el-button>
            <el-button  @click="dialogVisible = false">{{$t('seller.groups.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <div class="shop">
      <el-row>
        <el-col :span="5">
          <el-input :placeholder="$t('seller.groups.searchIn')" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success">{{$t('seller.groups.search')}}</el-button>
        </el-col>
        <el-col :span="2" :offset="2">
          <p>
            {{$t('seller.groups.value')}}
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="2" :offset="1">
          <p>
            {{$t('seller.groups.startingTime')}}
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="2" :offset="1">
          <p>
            {{$t('seller.groups.endTime')}}
            <i class="el-icon-d-caret"></i>
          </p>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-select v-model="value" :placeholder="$t('seller.groups.screen')">
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
          <h4>{{$t('seller.groups.earnings')}}888.86URAC</h4>
          <p>{{$t('seller.groups.value')}}100URAC/天</p>
          <p>{{$t('seller.groups.region')}}{{$t('seller.groups.asia')}}</p>
        </el-col>
        <el-col class="padding-top" :span="6">
          <p>{{$t('seller.groups.stateSale')}}{{$t('seller.groups.inSale')}}</p>
          <p>{{$t('seller.groups.operatingStatus')}}{{$t('seller.groups.running')}}</p>
          <p>{{$t('seller.groups.buyingTime')}}2018/12/12 12:12:12</p>
          <p>{{$t('seller.groups.endingTime')}}2019/12/12 12:12:12</p>
        </el-col>
        <el-col class="padding-top" :span="4">
          <p>{{$t('seller.groups.restTime')}}{{$t('seller.groups.timeup')}}</p>
          <el-button type="success">
            {{$t('seller.groups.renewal')}}
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
          <p class="setting" @click="dialogVisible = true">{{$t('seller.groups.setting')}}</p>
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
  width: 100%;
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
    min-width: 1130px;
    margin: 20px;
    padding: 15px;
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
