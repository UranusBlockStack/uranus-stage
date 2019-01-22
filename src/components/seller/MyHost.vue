<template>
  <section class="myHost">
    <!-- Confirmation Information Bullet Box -->
    <el-dialog :title="$t('seller.host.chooseGroup')" :visible.sync="dialogVisible" width="550px">
      <el-form>

        <el-radio v-model="groupJoin" :label="$t('seller.host.newGroup')"></el-radio>
        <el-form-item>
          <el-input  autocomplete="off" :placeholder="$t('seller.host.nameGroup')" style="width: 515px" v-model="newClusterName">
          </el-input>

          <el-select style="width: 515px; margin-top:15px;" v-model="rancherId" :placeholder="$t('seller.host.region')">
            <template v-if="language== 'zh-cn' ">
              <el-option v-for="(item, index) in rancherLists" :key="index"   :label="item.region" :value="item.id"></el-option>
            </template>
            <template v-else>
              <el-option v-for="(item, index) in rancherLists" :key="index"   :label="item.regionEnUs"  :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-radio v-model="groupJoin" :label="$t('seller.host.joinGroup')"></el-radio>
        <el-form-item>
          <el-select v-model="clusterId" style="width: 515px"  :placeholder="$t('seller.host.existingGroup')">
            <el-option v-for="(item, index) in clusterLists"  :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('seller.host.cancel')}}</el-button>
        <el-button type="primary" @click="okButtonClick()">{{$t('seller.host.confirm')}}</el-button>
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
            <div :class="scope.row.state == 'Offline' ? 'off' : 'on'"></div>
          </template>
        </el-table-column>
        <el-table-column width="220">
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
            <el-progress :percentage="getPercentNumber(scope.row.cpuKernelUsed, scope.row.cpuKernel)" :stroke-width="18" :text-inside="true" style="margin-left:35px;"></el-progress>
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
            <el-select v-model="inCluster" placeholder="是否加入集群" @change="search()">
              <el-option label="全部" value=0></el-option>
              <el-option label="是" value=1></el-option>
              <el-option label="否" value=2></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <p style="margin-left: 30px; text-align: center;">
              <span v-show="scope.row.colony != $t('seller.host.group') + ' B'">{{scope.row.clusterName}}</span>
              <el-button @click="joinButtonClick(scope.row.id)" v-show="scope.row.clusterId ==''||scope.row.clusterId ==null">
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
    import * as auth from "../../services/AuthService";

export default {
    name: "MyHost",
    data() {
        return {
          dialogVisible: false,
          groupJoin: this.$t('seller.host.newGroup'),
          state: "",
          group: "",
            userId:'',
            inCluster:'',
            tableData:[],
            rancherLists:[],
            clusterLists:[],
            language:'en-us',
            rancherId: '',
            newClusterName:'',// 新建及群名称
            clusterName:'' ,//已有集群
            hostId:'',
            clusterId:''
        };
    },
    methods: {
        getHostList(){
            rancher.hostList(this.language).then(data=>{
                console.log("hostList：",data)
                this.tableData=data.data.data.records
            })
        },
        rancherList(){
            rancher.rancherList().then(data=>{
                console.log("rancherList：",data)
                this.rancherLists=data.data.data
            })
        },
        clusterList(){
            var param={}
          rancher.clusterSearch(this.language,param).then(data=>{
              console.log("clusterList:",data)
              this.clusterLists=data.data.data.records
          })
        },
        addHostToNewCluster(){
            alert(this.rancherId)
            var param={
                "name": this.newClusterName,
                "rancherId": this.rancherId
            }
            alert(param.name+"=="+param.rancherId)
            rancher.clusterAdd(this.language,param).then(data=>{
                if(data.data.success){
                    this.updatehost()
                }else{

                }

            })
        },
        updatehost(){
            var updateInfo={
                "clusterId": this.clusterId,
                "rancherId": this.rancherId,
                "state": "registring"
            }
            rancher.hostModify(this.language,this.hostId,updateInfo).then(data=>{
                if(data.data.success){
                    dialogVisible = false
                }else{

                }
            })
        },
        joinCluster(){
            //主机添加到已有集群
            rancher.joinCluster(this.language,this.hostId,this.clusterId).then(data=>{
                console.log(data)
            })
        },
        search(){
            var param={
                scope: this.inCluster,
                ownerId:this.userId
            }
            rancher.hostSearch(this.language,param).then(data=>{
                console.log("result:",data)
                this.tableData=data.data.data.records
            })
        },
        okButtonClick(){

            var param={
                newCluster: false,
                clusterName: this.newClusterName,
                rancherId: this.rancherId
            }
            if(this.groupJoin==this.$t('seller.host.newGroup')){
                param.newCluster=true
            }else{
                param.newCluster=false
            }
            rancher.hostAdd(this.language,param).then(data=>{
                console.log("hostAdd result",data)
                /*if(data){

                }*/
            })
        },
        joinButtonClick(selectedhostId){
            this.hostId=selectedhostId
            this.dialogVisible = true
        }

    },
    computed:{
        getPercentNumber(){
            //计算百分比 a/b
            return function(a,b){
                var n=Number(a/b*100).toFixed(2)
                if (isNaN(Number(n)) || !isFinite(Number(n)) ) {
                    n = 0;
                }
                return Number(n)
            }
        }
    },
    mounted() {
        this.getHostList()
        this.rancherList()
        this.clusterList()
        this.language=auth.getCurLang()
        this.userId=auth.getCurUserId()
    }
};
</script>

<style lang="scss" scoped>
.myHost {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1130px;
  .myHostHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    margin: 10px 10px 0;
    height: 50px;
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
  }
  .myHostBox {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    margin: 10px;
    padding: 15px;
    min-height: 550px;
    p {
      margin-bottom: 0;
    }
    .el-table {
        color: #ffffff;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table /deep/ tr:hover td {
        background-color: rgba(101, 143, 247, 0.2) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
      .el-select /deep/ .el-input__inner {
      background: rgba(36, 99, 255, 0.2);
      border: 1px solid rgba(24, 144, 255, 0.3);
      border-radius: 4px;
      color: #ffffff;
    }
    .el-button {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 #2463ff;
      border-radius: 3px;
      border: none;
          color: #ffffff;
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
      color: #ffffff;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        i {
          font-size: 23px;
        }
    }
    .el-select /deep/ .el-input__suffix {
      right: 10px;
    }
  }
}
</style>
