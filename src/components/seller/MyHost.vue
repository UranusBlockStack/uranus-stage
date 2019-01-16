<template>
  <section class="myHost">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog :title="$t('seller.groups.chooseGroup')" :visible.sync="dialogVisible" width="550px">
      <el-form :model="form">
        <el-radio v-model="groupJoin" :label="$t('seller.groups.newGroup')"></el-radio>
        <el-form-item>
          <el-input v-model="form.name" autocomplete="off" :placeholder="$t('seller.groups.nameGroup')" style="width: 517px">
          </el-input>
        </el-form-item>
        <el-radio v-model="groupJoin" :label="$t('seller.groups.joinGroup')"></el-radio>
        <el-form-item>
          <el-select style="width: 517px" v-model="form.cluster" :placeholder="$t('seller.groups.existingGroup')">
            <el-option label="Cluster A" value="A"></el-option>
            <el-option label="Cluster B" value="B"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <!-- Host -->
    <el-row class="myHostHead">
      <el-col class="title" :span="12">
        <h1><i class="iconfont icon-host"></i>{{$t('menu.myHost')}}</h1>
      </el-col>
    </el-row>
    <el-row class="myHostBox">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p class="empty-text">{{$t('seller.host.text')}}</p>
        </template>
        <el-table-column width="50">
          <template slot-scope="scope">
            <div :class="scope.row.state == 'Offline' ? 'on' : 'off'"></div>
          </template>
        </el-table-column>
        <el-table-column width="120" prop="number">
          <template slot="header" slot-scope="scope">
            <p>
              <i class="iconfont icon-resource-market"></i>
              {{$t('seller.host.number')}}1
            </p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu"></i> CPU2
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.cpu }}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="50" :stroke-width="18" :text-inside="true" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{$t('seller.host.have')}}4核
            </p>
          </template>
        </el-table-column>

        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-memory"></i>
              {{$t('seller.host.memory')}}3
            </p>
          </template>

          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.memory }}{{$t('seller.host.usable')}}4
            </p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;">
            </el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{$t('seller.host.have')}}4核
            </p>
          </template>
        </el-table-column>

        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-disk"></i>
              {{$t('seller.host.disk')}}5
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.disk }}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>

        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-network"></i>
              {{$t('seller.host.network')}}6
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.network }}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="50" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">{{$t('seller.host.have')}}4核</p>
          </template>
        </el-table-column>

        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <el-select v-model="group" :placeholder="$t('seller.host.ownGroup')">
              <el-option :label="$t('seller.host.group') + 'A1'" value="集群A"></el-option>
              <el-option :label="$t('seller.host.group') + 'B1'" value="集群B"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px; text-align: center;">
              <span v-show="scope.row.colony != $t('seller.host.group') + ' B'">{{scope.row.colony}}</span>
              <el-button style="margin-left: 10px;" @click="dialogVisible = true" v-show="scope.row.colony == $t('seller.host.group') + ' B'">
                join
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>
    import * as rancher from '../../services/RancherService'

export default {
    name: "MyHost",
    data() {
        return {
          dialogVisible: false,
          form: {
            name: "",
            cluster: ""
          },
          groupJoin: this.$t('seller.groups.newGroup'),
          state: "",
          group: "",
            tableData:[]
          /*tableData: [
            {
              state: this.$t("seller.host.online"),
              number: this.$t("seller.host.hosts") + " A",
              cpu: "2核",
              memory: "2G",
              disk: "1T",
              network: "2M",
              colony: this.$t("seller.host.group") + " A"
            },
            {
              state: this.$t("seller.host.offline"),
              number: this.$t("seller.host.hosts") + " A",
              cpu: "1核",
              memory: "2G",
              disk: "1T",
              network: "2M",
              colony: this.$t("seller.host.group") + " C"
            },
            {
              state: this.$t("seller.host.online"),
              number: this.$t("seller.host.hosts") + " C",
              cpu: "3核",
              memory: "2G",
              disk: "1T",
              network: "2M",
              colony: this.$t("seller.host.group") + " D"
            },
            {
              state: this.$t("seller.host.offline"),
              number: this.$t("seller.host.hosts") + " D",
              cpu: "1核",
              memory: "2G",
              disk: "1T",
              network: "2M",
              colony: this.$t("seller.host.group") + " B"
            },
            {
              state: this.$t("seller.host.online"),
              number: this.$t("seller.host.hosts") + " E",
              cpu: "2核",
              memory: "2G",
              disk: "2T",
              network: "2M",
              colony: this.$t("seller.host.group") + " B"
            }
          ]*/
        };
    },
    methods: {
        getHostList(){
            rancher.hostList(this.$store.getters.lang).then(data=>{
                console.log("结果是："+data)
            })
        }
    },
    mounted() {
        this.getHostList()
    }
};
</script>

<style lang="scss" scoped>
.myHost {
  background: #f2f2f2;
  min-width: 1130px;
  .myHostHead {
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
  }
  .myHostBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 10px;
    padding: 15px;
    min-height: 550px;
    p {
      margin-bottom: 0;
    }
    .empty-text {
      width: 470px;
      margin: 30px auto;
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #5d5d5d;
      text-align: left;
      line-height: 24px;
    }
    .el-progress /deep/ .el-progress-bar__outer {
      background: #1890ff !important;
      border-radius: 0;
    }
    .el-progress /deep/ .el-progress-bar__inner {
      background: #f25954 !important;
      border-radius: 0;
    }
    .on {
      background: #9bcc3d;
      border: 2px solid #dcdcdc;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      float: right;
    }
    .off {
      background: #f2f2f2;
      border: 2px solid #dcdcdc;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      float: right;
    }
    .table-head {
      text-align: center;
    }
    .el-select /deep/ .el-input__suffix {
      right: 10px;
    }
  }
}
</style>
