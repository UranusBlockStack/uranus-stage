<template>
  <section class="myColony">
    <el-row class="myColonyHead">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.myColony')}}</h1>
      </el-col>
      <el-col :span="4" :offset="8">
        <router-link :to="{path: '/resourcerecord'}">
          <p>{{$t('seller.groups.view')}}</p>
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
            <el-button type="primary" @click="dialogVisible = false">{{$t('seller.groups.confirm')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('seller.groups.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <div class="shop">
      <el-row style="padding-bottom: 10px;">
        <el-col :span="4">
          <p>{{$t('seller.groups.list')}}</p>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-input :placeholder="$t('seller.groups.searchIn')" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button type="success">
            <i class="iconfont icon-view"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="lineBox"></el-row>
      <!-- Cluster List -->
      <el-row class="shopBox">
        <el-col :span="12" v-for="(colony, index) in colonyList" :key="index">
          <el-row style="border: 1px solid #e9e9e9; margin:10px;">
            <el-col :span="6">
              <router-link :to="{path: '/colony'}">
                <Water :chartData="colony.value"/>
                <h1>{{colony.colony}}</h1>
              </router-link>
            </el-col>
            <el-col class="padding-top" :span="15">
              <h2>
                <i class="iconfont icon-earnings"></i>
                {{$t('seller.groups.earnings')}}
                <p>88888888.888888URAC</p>
              </h2>
              <h2>
                <i class="iconfont icon-shaloucountdown"></i>
                {{$t('seller.groups.restTime')}}
                <p> 222d 22h 22m 22s </p>
              </h2>
            </el-col>
            <el-col :span="2" :offset="1">
              <h2 class="setting" @click="dialogVisible = true">
                <i class="iconfont icon-set" style="font-size: 25px;"></i>
              </h2>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <el-pagination layout="prev, pager, next" :total="1000" style="padding-top: 15px;"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import Water from "@/components/modules/Water";

export default {
  name: "MyColony",
  components: {
    Water
  },
  data() {
    return {
      value: "",
      colonyList: [
        { id: "1", value: "0.50", colony: this.$t("menu.myColony") + " A" },
        { id: "2", value: "0.40", colony: this.$t("menu.myColony") + " B" },
        { id: "3", value: "0.60", colony: this.$t("menu.myColony") + " C" },
        { id: "4", value: "0.50", colony: this.$t("menu.myColony") + " D" },
        { id: "1", value: "0.50", colony: this.$t("menu.myColony") + " E" },
        { id: "2", value: "0.50", colony: this.$t("menu.myColony") + " F" },
        { id: "3", value: "0.50", colony: this.$t("menu.myColony") + " G" },
        { id: "4", value: "0.50", colony: this.$t("menu.myColony") + " H" }
      ],
      dialogVisible: false,
      form: {
        name: "",
        price: "",
        date1: "",
        date2: "",
        address: "",
        state: ""
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.myColony {
  background: #f2f2f2;
  width: 100%;
  min-width: 1130px;
  .myColonyHead {
    background: #ffffff;
    height: 50px;
    .title {
      h1 {
        font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #252525;
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
      height: 60px;
      line-height: 60px;
      font-size: 16px;
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
      font-family: Source-Sans-Pro-Bold;
      font-size: 20px;
      color: #252525;
      line-height: 40px;
      text-align: left;
    }
    .lineBox {
      border-bottom: 1px solid #e9e9e9;
    }
    .shopBox {
      padding-top: 20px;
      .padding-top {
        padding-top: 20px;
        h2 {
          margin: 22px;
          font-size: 16px;
          i {
            font-size: 20px;
          }
          p {
              font-size: 16px;
              margin-left: 30px;
          }
        }
      }
      h1 {
        width: 100%;
        text-align: center;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #363636;
        margin-top: 0;
        line-height: 22px;
      }
      .setting {
        text-align: right;
        padding-right: 24px;
        color: #8eb357;
      }
    }
  }
}
</style>
