<template>
  <section class="myHost">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog :title="$t('seller.host.chooseGroup')" :visible.sync="dialogVisible" width="550px">
      <el-form :model="form">
        <el-radio v-model="groupJoin" :label="$t('seller.host.newGroup')"></el-radio>
        <el-form-item>
          <el-input v-model="form.name" autocomplete="off" :placeholder="$t('seller.host.nameGroup')" style="width: 515px">
          </el-input>
           <el-select style="width: 515px; margin-top:15px;" v-model="form.region" :placeholder="$t('seller.host.region')">
            <el-option :label="$t('seller.host.asia')" value="A"></el-option>
            <el-option :label="$t('seller.host.europe')" value="B"></el-option>
            <el-option :label="$t('seller.host.africa')" value="C"></el-option>
            <el-option :label="$t('seller.host.south')" value="D"></el-option>
            <el-option :label="$t('seller.host.north')" value="E"></el-option>
            <el-option :label="$t('seller.host.oceania')" value="F"></el-option>
          </el-select>
        </el-form-item>
        <el-radio v-model="groupJoin" :label="$t('seller.host.joinGroup')"></el-radio>
        <el-form-item>
          <el-select style="width: 515px" v-model="form.cluster" :placeholder="$t('seller.host.existingGroup')">
            <el-option label="Cluster A" value="A"></el-option>
            <el-option label="Cluster B" value="B"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('seller.host.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$t('seller.host.confirm')}}</el-button>
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
        <el-table-column width="160">
            <!--主机名称 name-->
          <template slot="header" slot-scope="scope">
            <p class="table-head" style="text-align:left;">
              <i class="iconfont icon-resource-market"></i>
              {{$t('seller.host.number')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="overflow">
              {{ scope.row.name}}
            </p>
          </template>
        </el-table-column>

        <el-table-column width="170">
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-cpu"></i> CPU
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.cpuKernelUsed }}{{$t('seller.host.usable')}}
                <!--已用核数-->
            </p>
            <el-progress :percentage="getPercentNumber(scope.row.cpuKernelUsed,scope.row.cpuKernel)" :stroke-width="18" :text-inside="true" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.cpuKernel }}{{$t('seller.host.have')}}
                <!--总核数-->
            </p>
          </template>
        </el-table-column>

        <el-table-column width="170">
            <!--内存-->
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-memory"></i>
              {{$t('seller.host.memory')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.memUsed}}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="getPercentNumber(scope.row.memUsed,scope.row.mem)" :stroke-width="18" :show-text="false" style="margin-left:35px;">
            </el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.mem}}{{$t('seller.host.have')}}
            </p>
          </template>
        </el-table-column>

        <el-table-column width="170">
            <!--硬盘-->
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-disk"></i>
              {{$t('seller.host.disk')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.diskUsed }}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="getPercentNumber(scope.row.diskUsed,scope.row.disk)" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.disk }} {{$t('seller.host.have')}}
            </p>
          </template>
        </el-table-column>

        <el-table-column width="170">
            <!--宽带(M)-->
          <template slot="header" slot-scope="scope">
            <p class="table-head">
              <i class="iconfont icon-network"></i>
              {{$t('seller.host.network')}}
            </p>
          </template>
          <template slot-scope="scope">
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
              {{ scope.row.networkUsed }}{{$t('seller.host.usable')}}
            </p>
            <el-progress :percentage="getPercentNumber(scope.row.networkUsed,scope.row.network)" :stroke-width="18" :show-text="false" style="margin-left:35px;"></el-progress>
            <p style="color:#8c8c8c; font-size:10px; margin-left:35px;">
                {{ scope.row.network }}{{$t('seller.host.have')}}
            </p>
          </template>
        </el-table-column>

        <el-table-column width="200">
          <template slot="header" slot-scope="scope">
            <el-select v-model="group" :placeholder="$t('seller.host.ownGroup')">
              <el-option :label="$t('seller.host.group') + 'A1'" value="集群A"></el-option>
              <el-option :label="$t('seller.host.group') + 'B1'" value="集群B"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px; text-align: center;">
              <span v-show="scope.row.colony != $t('seller.host.group') + ' B'">{{scope.row.clusterName}}</span>
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
            name: '',
            region: '',
            cluster: '',
          },
          groupJoin: this.$t('seller.host.newGroup'),
          state: "",
          group: "",
            tableData:[]
        };
    },
    methods: {
        getHostList(){
            rancher.hostList(this.$store.getters.lang).then(data=>{
                console.log("结果是：",data)
                this.tableData=data.data.data.records
            })
        }

    },
    computed:{
        getPercentNumber(){
            //计算百分比 a/b
            return function(a,b){
                var n=Number(a/b*100).toFixed(2)
                return Number(n)
            }
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
    .overflow {
          overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
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
      color: #363636;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 22px;
        }

    }
    .el-select /deep/ .el-input__suffix {
      right: 10px;
    }
  }
}
</style>
