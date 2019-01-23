<template>
  <section class="resourcePool">
    <el-row class="poolHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-resource"></i>
          {{$t('menu.myResource')}}
        </h1>
      </el-col>
    </el-row>
    <el-row class="poolBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.resourcePool.pool')}}: {{this.$route.params.poolname}}</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <h2>{{$t('buyer.resourcePool.restOne')}}</h2>
          <div class="restRes">
            <Cpu v-if="update2" :chartData="statisObejct.cpuUsd"/>
            <Memory v-if="update2" :chartData="statisObejct.memUsd"/>
            <Disk v-if="update2" :chartData="statisObejct.diskUsd"/>
            <Network v-if="update2" :chartData="statisObejct.networkUsd"/>
          </div>
        </el-col>
      </el-row>
      <el-row class="title">
        <el-col :span="6">
          <h1>{{$t('buyer.resourcePool.appList')}}</h1>
        </el-col>
        <el-col :span="5" :offset="10">
          <el-input :placeholder="$t('buyer.resourcePool.searchIn')" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success">
            <i class="iconfont icon-search"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="rePool" :span="12" v-for="(item, index) in appList" :key="index">
          <el-row>
            <el-col :span="4" :offset="1">
                <div class="img-box">
                    <img :src="getImage(item.appRid)" alt="img">
                </div>
            </el-col>
            <el-col :span="15" :offset="1">
              <h3>{{$t('buyer.resourcePool.appName')}} {{item.name}}</h3>
              <!-- <h3>{{$t('buyer.resourcePool.appIp')}} {{item.ipAddress}}</h3>
              <h3>{{$t('buyer.resourcePool.appPort')}} {{item.port}}</h3> -->
              <h3>{{$t('buyer.resourcePool.appState')}} {{formateDate(item.createTime)}}</h3>
              <h3>{{$t('buyer.resourcePool.appTime')}} {{formateDate(item.createTime)}}</h3>
            </el-col>
            <el-col :span="3">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link :to="{path: '/appstate/' + poolId + '/' + item.id}">
                    <el-dropdown-item>{{$t('buyer.resourcePool.detail')}}</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item
                    @click.native="deleteApp(item.id)"
                  >{{$t('buyer.resourcePool.delete')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import Cpu from '@/components/modules/CPU'
import Disk from '@/components/modules/Disk'
import Memory from '@/components/modules/Memory'
import Network from '@/components/modules/Network'
import * as project from '../../services/RancherService'
import moment from 'moment'
import { Message } from 'element-ui'

export default {
  name: 'ResourcePool',
  components: {
    Cpu,
    Disk,
    Memory,
    Network
  },
  data() {
    return {
      appList: [],
      imageServerUrl: this.$store.state.imageServerUrl,
      statisObejct: {
        cpuUsd: 10,
        diskUsd: 20,
        memUsd: 30,
        networkUsd: 40,
        urapowerUsd: 50
      },
      update2: false,
      poolId: this.$route.params.poolid
    }
  },
  methods: {
    getAppList() {
      project
        .appListByProjectId(
          this.$store.getters.lang,
          this.poolId
        )
        .then(respData => {
          if (respData.data.data) {
            this.appList = respData.data.data.records
          }
        })
    },
    formateDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    getImage(rid) {
      return this.imageServerUrl + rid + '/icon'
    },
    deleteApp(appId) {
      project.deleteAppById(this.$store.getters.lang, appId)
          .then(respData => {
            let data = respData.data
            if (data.success) {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
              this.getAppList()
            } else {
              this.$message({
                showClose: true,
                message: data.errMsg,
                type: 'error'
              })
            }
          }).catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            })
          })
    },
    getProjectById() {
      project
        .projectListById(this.$store.getters.lang, this.$route.params.poolid)
        .then(respData => {
          let data = respData.data.data
          this.statisObejct.diskUsd =
            (data.diskUsed + data.diskLock) / data.disk
          this.statisObejct.cpuUsd =
            (data.cpuKernelLock + data.cpuKernelUsed) / data.cpuKernel
          this.statisObejct.memUsd = (data.memUsed + data.memLock) / data.mem
          this.statisObejct.networkUsd =
            (data.networkUsed + data.networkLock) / data.network
          this.update2 = true
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.poolId = to.params.poolid
    this.getAppList()
    next()
  },
  created() {
    this.getAppList()
    this.getProjectById()
  }
}
</script>

<style lang="scss" scoped>
.resourcePool {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1130px;
  padding-top: 10px;
  .poolHead {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
    margin: 0 10px;
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
  .poolBox {
    background: rgba(101, 143, 247, 0);
    border-radius: 2px;
    margin: 10px;
    .title {
      background: rgba(101, 143, 247, 0);
      box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
      border-radius: 4px 4px 0 0;
      height: 50px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        text-align: left;
        line-height: 50px;
        margin: 0;
        padding: 0;
        padding-left: 30px;
      }
      .el-input,
      .el-button {
        margin-top: 5px;
      }
      .el-input /deep/ .el-input__inner {
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
    }
    }
    .rePool {
      padding: 10px;
      .el-row {
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
      h3 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
        text-align: left;
        margin: 15px 20px;
      }
      #restPool {
        height: 190px;
        width: 100%;
        padding-left: 30px;
      }
      .restTime {
        margin-top: 60px;
        .el-button {
          background: #8eb357;
          border: none;
          margin-left: 30px;
        }
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #8eb357;
        text-align: right;
        line-height: 24px;
        padding-right: 30px;
        margin-top: 30px;
        cursor: pointer;
      }
      .img-box {
              height: 160px;
              width: 130px;
              margin: 10px auto;
              position: relative;
              img {
                min-width: 100px;
                min-height: 100px;
                max-width: 130px;
                max-height: 130px;
                width: auto;
                height: auto;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
    }
    h2 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      text-align: left;
      padding-left: 30px;
    }
    .restRes {
      height: 200px;
      display: flex;
      padding-left: 50px;
    }
    .el-button {
      background: #8eb357;
      border: none;
    }
    .el-dropdown {
      margin: 20px;
      color: #ffffff;
    }
  }
}
</style>
