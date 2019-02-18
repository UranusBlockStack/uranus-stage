<template>
  <section class="myColony">
    <el-row class="myColonyHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-cluster"></i>
          {{$t('menu.myColony')}}
        </h1>
      </el-col>
      <el-col :span="4" :offset="8">
        <router-link :to="{path: '/resourcerecord'}">
          <p>
            {{$t('seller.groups.view')}}
            <i class="iconfont icon-more"></i>
          </p>
        </router-link>
      </el-col>
    </el-row>

    <!-- Setting Information Bullet Box -->
    <el-dialog
      :title="$t('seller.groups.settingTitle')"
      :visible.sync="dialogVisible"
      width="650px"
    >
      <span>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item :label="$t('seller.groups.settingName')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <p class="rent">{{$t('seller.groups.rent')}} 100 U/{{$t('seller.groups.day')}}</p>
          <el-form-item :label="$t('seller.groups.setRent')">
            <el-input v-model="form.rent"></el-input>
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

          <el-form-item :label="$t('seller.groups.setState')">
            <el-select v-model="form.state" :placeholder="$t('seller.groups.setState')">
              <el-option :label="$t('seller.groups.inSale')" value="inSale"></el-option>
              <el-option :label="$t('seller.groups.notSale')" value="notSale"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = false">{{$t('seller.groups.confirm')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('seller.groups.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>

    <div class="shop">
      <el-row style="padding-bottom: 10px;">
        <el-col :span="6">
          <p style="padding-left: 15px;">{{$t('seller.groups.list')}}</p>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-input v-model="searchParam.name" @keyup.enter.native="clusterSearch"
                    :placeholder="$t('seller.groups.searchIn')"
                    prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" type="success" @click="clusterSearch()">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="lineBox"></el-row>

      <!-- Cluster List -->
      <el-row class="shopBox">
        <el-col :span="12" v-for="(colony, index) in colonyList" :key="index">
          <el-row style="border: 1px solid rgba(255, 255, 255, 0.2); margin:10px;">
            <el-col :span="8">
              <router-link :to="{path: '/colony/'+colony.id}">
                <Water :chartData="division(colony.usedCompute,colony.totalCompute)"/>
              </router-link>
            </el-col>
            <el-col class="padding-top" :span="16">
                <h1>{{$t('seller.groups.name')}}: {{colony.name}}</h1>
              <h2>
                <p>
                  <i class="iconfont icon-earnings"></i>
                  {{$t('seller.groups.earnings')}} {{colony.profit }} URAC
                </p>
              </h2>
              <h2>
                <p>
                  <i class="iconfont icon-countdown"></i>
                  {{$t('seller.groups.restTime')}}
                </p>
                <!--<RestTime endTime="2021-1-15 16:31:15"/>-->
                <RestTime :endTime="colony.endTime"/>
              </h2>
            </el-col>
            <!-- <el-col :span="2" :offset="1">
              <h2 class="setting" @click="dialogVisible = true">
                <i class="iconfont icon-setting" style="font-size: 25px;"></i>
              </h2>
            </el-col> -->
          </el-row>
        </el-col>
      </el-row>

      <!--<el-row>
        <el-col :span="8" :offset="16">
          <el-pagination layout="prev, pager, next" :total="1000" style="padding-top: 15px;"></el-pagination>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="8" :offset="16">
          <el-pagination layout="prev, pager, next" :current-page.sync="searchParam.page" :page-size="searchParam.pageSize" :total="searchParam.totalRecords"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import Water from '@/components/modules/Water'
import RestTime from '@/components/modules/RestTime'
import * as rancher from '../../services/RancherService'
import * as auth from '../../services/AuthService'

export default {
  name: 'MyColony',
  components: {
    Water,
    RestTime
  },
  data() {
    return {
      language: 'en-us',
      colonyList: [],
      dialogVisible: false,
      //   setting information
      form: {
        name: '',
        rent: '',
        date1: '',
        date2: '',
        region: '',
        state: ''
      },
      searchParam: {
        name: '',
        page: 0,
        pageSize: 6,
        totalRecords: 0,
        sort: '',
        sortDesc: true,
        state: ''
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.searchParam.currentPage = val
      this.clusterSearch()
    },
    clusterSearch() {
      rancher.clusterSearch(this.language, this.searchParam).then(data => {
        this.searchParam.page=data.data.data.current
        this.searchParam.totalRecords=data.data.data.total
        var records = data.data.data.records
        this.colonyList = records
        records.forEach((item, index) => {
          let momentInfo = moment(item.endTime)
          if (momentInfo.isValid() == false) {
            this.colonyList[index].endTime = moment(0).format('YYYY-MM-DD hh:mm:ss')
          } else {
            this.colonyList[index].endTime = moment(item.endTime).format('YYYY-MM-DD hh:mm:ss')
          }
        })
      })
    }
  },
  computed: {
    division() {
      return function(a, b) {
        var n = a / b
        if (isNaN(Number(n)) || !isFinite(Number(n))) {
          n = 0
        }
        return Number(n)
      }
    }
  },
  mounted() {
    this.clusterSearch()
    this.language = auth.getCurLang()
  }
}
</script>

<style lang="scss" scoped>
.myColony {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  width: 100%;
  min-width: 1130px;
  .myColonyHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    height: 50px;
    margin: 10px 10px 0;
    .title {
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        line-height: 50px;
        margin: 0;
        padding: 0;
        padding-left: 30px;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
    }
    p {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
  }
  .shop {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    min-width: 1130px;
    margin: 10px;
    padding: 15px;
    .el-button {
      background: #8eb357;
      border: none;
    }
    p {
      height: 40px;
      font-family: Source-Sans-Pro-Bold;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      line-height: 40px;
      text-align: left;
    }
    .lineBox {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .shopBox {
      padding-top: 20px;
      min-height: 250px;
      .padding-top {
        padding-top: 20px;
        h2 {
          margin: 0;
          margin-left: 22px;
          font-size: 16px;
          i {
            font-size: 20px;
          }
          p {
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
        }
      }
      h1 {
        width: 100%;
        text-align: left;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        margin-top: 0;
        margin-left: 22px;
        line-height: 22px;
      }
      .setting {
        text-align: right;
        padding-right: 24px;
        color: #1890ff;
      }
    }
    .el-button {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
      border: none;
    }
    .el-input /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-pagination /deep/ .btn-prev {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .btn-next {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li {
      background: rgba(36, 99, 255, 0.2);
      color: #ffffff;
    }
    .el-pagination /deep/ .el-pager li.active {
      color: #409eff;
    }
  }
}
</style>
