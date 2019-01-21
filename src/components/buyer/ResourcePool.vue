<template>
  <section class="resourcePool">
    <el-row class="poolHead">
      <el-col class="title" :span="12">
        <h1><i class="iconfont icon-resource"></i>{{$t('menu.myResource')}}</h1>
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
            <div id="restResource1"></div>
            <!-- <div id="restResource2"></div> -->
            <div id="restResource3"></div>
            <div id="restResource4"></div>
            <div id="restResource5"></div>
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
          <el-button type="success"><i class="iconfont icon-search"></i></el-button>
        </el-col>
      </el-row>
      <el-row class="rePool" v-for="(item, index) in appList" :key="index">
        <el-col :span="2" :offset="1">
          <img :src= 'getImage(item.rid)'  alt="img">
        </el-col>
        <el-col :span="7" :offset="1">
          <h3>{{$t('buyer.resourcePool.appName')}} {{item.name}}</h3>
          <h3>{{$t('buyer.resourcePool.appIp')}} {{item.ipAddress}}</h3>
          <h3>{{$t('buyer.resourcePool.appPort')}} {{item.port}}</h3>
          <h3>{{$t('buyer.resourcePool.appTime')}} {{formateDate(item.createTime)}}</h3>
        </el-col>
        <el-col :span="3" :offset="10">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link :to="{path: '/appstate/' + item.id}">
                  <el-dropdown-item>{{$t('buyer.resourcePool.detail')}}</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="deleteApp(item.id)">{{$t('buyer.resourcePool.delete')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import 'echarts-liquidfill'
import * as project from '../../services/RancherService'
import moment from 'moment'

export default {
  name: 'ResourcePool',
  data() {
    return {
      appList: [],
      imageServerUrl: this.$store.state.imageServerUrl,
      statisObejct: {
        'cpuUsd': 10,
        'diskUsd': 20,
        'memUsd': 30,
        'networkUsd': 40,
        'urapowerUsd': 50
      }
    }
  },
  methods: {
    initEchart() {
      var myChart1 = this.$echarts.init(
        document.getElementById('restResource1')
      )
      // var myChart2 = this.$echarts.init(
      //   document.getElementById('restResource2')
      // )
      var myChart3 = this.$echarts.init(
        document.getElementById('restResource3')
      )
      var myChart4 = this.$echarts.init(
        document.getElementById('restResource4')
      )
      var myChart5 = this.$echarts.init(
        document.getElementById('restResource5')
      )
      myChart1.setOption({
        series: [
          {
            name: 'Cpu',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#1890FF', '#f2f2f2'],
            data: [
              {
                value: this.statisObejct.cpuUsd,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|CPU}', this.statisObejct.cpuUsd].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 100 - this.statisObejct.cpuUsd }
            ]
          }
        ]
      })
      // myChart2.setOption({
      //   series: [
      //     {
      //       name: 'Gpu',
      //       type: 'pie',
      //       radius: ['85%', '70%'],
      //       hoverAnimation: false,
      //       legendHoverLink: false,
      //       avoidLabelOverlap: false,
      //       selectedOffset: 0,
      //       color: ['#7FD455', '#f2f2f2'],
      //       data: [
      //         {
      //           value: 88,
      //           selected: false,
      //           label: {
      //             normal: {
      //               show: true,
      //               formatter: ['{a|CPU}', '{b|88%}'].join('\n'),
      //               rich: {
      //                 a: {
      //                   color: '#5d5d5d',
      //                   fontSize: '14',
      //                   lineHeight: '22',
      //                   fontFamily: 'PingFangSC-Regular'
      //                 },
      //                 b: {
      //                   color: 'rgba(0,0,0,.85)',
      //                   fontSize: '24',
      //                   fontFamily: 'HelveticaNeue'
      //                 }
      //               },
      //               position: 'center',
      //               textStyle: { align: 'center' }
      //             }
      //           }
      //         },
      //         { value: 12 }
      //       ]
      //     }
      //   ]
      // })
      myChart3.setOption({
        series: [
          {
            name: '内存',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FACC14', '#f2f2f2'],
            data: [
              {
                value: this.statisObejct.memUsd,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|内存}', this.statisObejct.memUsd].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 100 - this.statisObejct.memUsd }
            ]
          }
        ]
      })
      myChart4.setOption({
        series: [
          {
            name: '硬盘',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#658FF7', '#f2f2f2'],
            data: [
              {
                value: this.statisObejct.diskUsd,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|硬盘}', this.statisObejct.diskUsd].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 100 - this.statisObejct.diskUsd }
            ]
          }
        ]
      })
      myChart5.setOption({
        series: [
          {
            name: '网络',
            type: 'pie',
            radius: ['85%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ['#FB8D5B', '#f2f2f2'],
            data: [
              {
                value: this.statisObejct.networkUsd,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ['{a|网络}', this.statisObejct.networkUsd].join('\n'),
                    rich: {
                      a: {
                        color: '#5d5d5d',
                        fontSize: '14',
                        lineHeight: '22',
                        fontFamily: 'PingFangSC-Regular'
                      },
                      b: {
                        color: 'rgba(0,0,0,.85)',
                        fontSize: '24',
                        fontFamily: 'HelveticaNeue'
                      }
                    },
                    position: 'center',
                    textStyle: { align: 'center' }
                  }
                }
              },
              { value: 100 - this.statisObejct.networkUsd }
            ]
          }
        ]
      })
      window.onresize = function() {
        myChart1.resize()
        // myChart2.resize()
        myChart3.resize()
        myChart4.resize()
        myChart5.resize()
      }
    },
    getAppList() {
      project.apptListByProjectId(this.$store.getters.lang, this.$route.params.poolid)
              .then(respData => {
                this.appList = respData.data.data.records
              })
    },
    formateDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    getImage(rid) {
      return this.imageServerUrl + rid + '/icon'
    },
    deleteApp(appId) {
      project.deleteAppById(appId)
              .then(respData => {
                this.$message(respData.data)
              })
    },
    getProjectById() {
      project.projectListById(this.$store.getters.lang, this.$route.params.poolid)
              .then(respData => {
                let data = respData.data.data
                this.statisObejct.diskUsd = (data.diskUsed + data.diskLock) / data.disk
                this.statisObejct.cpuUsd = (data.cpuKernelLock + data.cpuKernelUsed) / data.cpuKernel
                this.statisObejct.memUsd = (data.memUsed + data.memLock) / data.mem
                this.statisObejct.networkUsd = (data.networkUsed + data.networkLock) / data.network
              })
              this.initEchart()
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getAppList()
    next()
  },
  mounted() {
    this.initEchart()
  },
  created() {
    this.getAppList()
    this.getProjectById()
  },
  watch: {
    statisObejct: {
    //   handler() {
    //     this.initEchart()
    //   },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.resourcePool {
  background: #f2f2f2;
  min-width: 1130px;
  .poolHead {
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
  .poolBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 10px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 50px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 50px;
         margin: 0;
      padding: 0;
        padding-left: 30px;
      }
      .el-input, .el-button{
        margin-top: 10px;
      }
    }
    .rePool {
      border-bottom: 1px solid #f2f2f2;
      h3 {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
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
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #8eb357;
        text-align: right;
        line-height: 24px;
        padding-right: 30px;
        margin-top: 30px;
        cursor: pointer;
      }
      img {
        height: 130px;
        width: 130px;
        margin-top: 30px;
      }
    }
    h2 {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #363636;
      line-height: 24px;
      text-align: left;
      padding-left: 30px;
    }
    .restRes {
      border-left: 3px solid #fafafa;
      height: 200px;
      display: flex;
      padding-left: 50px;
      #restResource1,
      #restResource2,
      #restResource3,
      #restResource4,
      #restResource5 {
        height: 200px;
        width: 20%;
      }
    }
    .el-button {
      background: #8eb357;
      border: none;
    }
    .el-dropdown {
      margin: 20px;
      color: #8eb357;
    }
  }
}
</style>
