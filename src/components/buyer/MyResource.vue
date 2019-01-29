<template>
  <section class="myResource">
    <el-row class="myResourceHead">
      <el-col class="title" :span="12">
        <h1>
          <i class="iconfont icon-resource"></i>
          {{$t('menu.myResource')}}
        </h1>
      </el-col>
      <el-col class="record" :span="12">
        <router-link :to="{path: '/urapowerrecord'}">
          <p>{{$t('buyer.appRepository.deployRecord')}}<i class="iconfont icon-more"></i></p>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="myResourceBox">
      <el-row class="boxshadow">
        <el-row>
          <el-col class="title" :span="24">
            <h1>{{$t('buyer.myResource.resourceAll')}}</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div id="restResource">
              <Water v-if="update2" :chartData='statisObejct.urapowerUsd' style="margin:40px auto"/>
            </div>
          </el-col>
          <el-col :span="19" :offset="1">
            <h2>{{$t('buyer.myResource.restOne')}}</h2>
            <div class="restRes">
            <Cpu v-if="update2" :chartData='statisObejct.cpuUsd'/>
            <Memory v-if="update2" :chartData='statisObejct.memUsd'/>
            <Disk v-if="update2" :chartData='statisObejct.diskUsd'/>
            <Network v-if="update2" :chartData='statisObejct.networkUsd'/>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="boxshadow" style="margin-top:10px;">
        <el-row>
          <el-col class="title" :span="24">
            <h1>{{$t('buyer.myResource.resourceOver')}}</h1>
          </el-col>
        </el-row>
        <el-row class="appResource">
          <el-col :span="12" v-for="(pool, index) in poolList"  :key="index">
            <el-row style="border: 1px solid rgba(255, 255, 255, 0.2); border-radius:4px; margin:10px;">
              <el-col :span="5" style="margin-bottom: 15px;">
                  <a @click="checkPatch(index, pool.orderStatus)">
                  <Ball style="margin:0 auto;" v-if="update1" :chartData='pool.urpowerUsd'/>
                  </a>
              </el-col>
              <el-col :span="17" :offset="2">
                  <h3>Pool: {{pool.name}} </h3>
                <h3>{{$t('buyer.myResource.state')}} {{pool.orderDispName}}</h3>
                <h3>{{$t('buyer.myResource.number')}} {{pool.appCount}}</h3>
                <div class="timeText">
                  <p>{{$t('buyer.myResource.countdownTime')}} <RestTime style="display:inline-block;" :endTime= "pool.time" /></p>
                </div>
              </el-col>
              <!-- <el-col :span="3" :offset="1">
                <el-dropdown trigger="click" style="margin-top: 10px; margin-left: 20px;">
                  <span class="el-dropdown-link">
                    <i class="iconfont icon-menu" style="color:#ffffff;"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      {{$t('buyer.myResource.renewal')}}
                      <i class="el-icon-arrow-right"></i>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <p @click="$router.push({path: '/resourcepool/' + pool.id + '/' + pool.name})">
                        {{$t('buyer.myResource.detail')}}
                        <i class="el-icon-arrow-right"></i>
                      </p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col> -->
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import moment from 'moment'
import * as project from '../../services/RancherService'
import * as auth from '../../services/AuthService'
import Water from '@/components/modules/Water'
import Cpu from '@/components/modules/CPU'
import Disk from '@/components/modules/Disk'
import Memory from '@/components/modules/Memory'
import Network from '@/components/modules/Network'
import Ball from '@/components/modules/Ball'
import RestTime from '@/components/modules/RestTime'
import { getOrderStatusName, getCNNamefromCode } from '../../store/orderStatus'

export default {
  name: 'MyResource',
  components: {
    Water,
    Cpu,
    Disk,
    Memory,
    Network,
    Ball,
    RestTime
  },
  data() {
    return {
      poolList: [],
      projectQuertData: {
        'page': 0,
        'pageSize': 0,
        'projectName': '',
        'sort': '',
        'sortDesc': true
      },
      statisObejct: {
        'cpuUsd': 0,
        'diskUsd': 0,
        'memUsd': 0,
        'networkUsd': 0,
        'urapowerUsd': 0
      },
      update1: false,
      update2: false
    }
  },
  methods: {
    getUraPowerPoolList() {
      project.projectList(this.$store.getters.lang, this.projectQuertData)
              .then(respData => {
                this.appList = {}
                if (respData.data.data) {
                  const data = respData.data.data.records
                  for (let i = 0; i < data.length; i++) {
                    let object = {}
                    object['id'] = data[i].id
                    object['name'] = data[i].projectName
                    object['appCount'] = data[i].appCount
                    object['time'] = moment(data[i].endTime).format('YYYY-MM-DD hh:mm:ss')
                    object['urpowerUsd'] = data[i].computeRatio
                    object.orderStatus = data[i].orderStatus
                    object.orderStatusName = data[i].orderStatusName
                    object.orderDispName = getOrderStatusName(data[i].orderStatus, auth.getCurLang())
                    object.link = '/resourcepool/' + data[i].id + '/' + data[i].projectName
                    this.poolList.push(object)
                  }
                }
                this.update1 = true
              })
    },
    checkPatch(index, ostatus) {
      console.log(index, ostatus)
      if (ostatus !== 3) {
        this.$message({
          showClose: true,
          message: this.$t('buyer.myResource.project'),
          type: 'warning'
        })
      } else {
        location.href = this.poolList[index].link
      }
    },
    allStatisticsProjects() {
      project.statisticsProjects()
              .then(respData => {
                if (respData.data.data) {
                  const data = respData.data.data
                  this.statisObejct['urapowerUsd'] = data.computeRatio / 100
                  this.statisObejct['cpuUsd'] = data.cpuKernelRatio
                  this.statisObejct['diskUsd'] = data.diskRatio
                  this.statisObejct['memUsd'] = data.memRatio
                  this.statisObejct['networkUsd'] = data.networkRatio
                }
                this.update2 = true
              })
    }
  },
  created() {
    this.allStatisticsProjects()
    this.getUraPowerPoolList()
  }
}
</script>

<style lang="scss" scoped>
.myResource {
  background: rgba(101, 143, 247, 0);
  border-radius: 2px;
  min-width: 1130px;
  padding-top: 10px;
  .boxshadow {
    background: rgba(101, 143, 247, 0);
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    border-radius: 2px;
  }
  .myResourceHead {
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
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 50px;
      width: 125px;
      p {
        height: 45px;
        line-height: 45px;
        margin: 0;
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #0084FF;
      }
    }
  }
  .myResourceBox {
    background: rgba(101, 143, 247, 0);
    border-radius: 2px;
    margin: 10px;
    .title {
      background: rgba(101, 143, 247, 0);
      border-radius: 2px;
      height: 54px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 24px;
    }
    #restResource {
      padding-left: 30px;
      height: 200px;
      width: 100%;
    }
    .restRes {
      border-left: 1px solid rgba(255, 255, 255, .2);
      height: 200px;
      display: flex;
      padding-left: 50px;
    }
    .appResource {
      h3 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
        text-align: left;
        margin-top: 10px;
      }
      p {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        text-align: left;
        line-height: 24px;
      }
      .timeText {
          color: #ffffff;
      }
    }
  }
}
</style>
