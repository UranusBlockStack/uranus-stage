<template>
  <section class="myResource">
    <el-row class="myResourceHead">
      <el-col class="title" :span="12">
        <h1>{{$t('menu.myResource')}}</h1>
      </el-col>
      <el-col class="record" :span="12">
        <router-link :to="{path: '/urapowerrecord'}">
          <p>{{$t('buyer.appRepository.deployRecord')}}>></p>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="myResourceBox">
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.myResource.resourceAll')}}</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div id="restResource"></div>
        </el-col>
        <el-col :span="19" :offset="1">
          <h2>{{$t('buyer.myResource.restOne')}}</h2>
          <div class="restRes">
            <div id="restResource1"></div>
            <!-- <div id="restResource2"></div> -->
            <div id="restResource3"></div>
            <div id="restResource4"></div>
            <div id="restResource5"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title" :span="24">
          <h1>{{$t('buyer.myResource.resourceOver')}}</h1>
        </el-col>
      </el-row>
      <el-row class="appResource">
        <el-col :span="12" v-for="(pool, index) in poolList" :key="index">
          <el-row style="border: 1px solid #e9e9e9; margin:10px;">
            <el-col :span="8" style="margin-bottom: 15px;">
              <Ball :chartData="62"/>
            </el-col>
            <el-col :span="12">
              <h3>{{$t('buyer.myResource.number')}} {{pool.id}}</h3>
              <div class="timeText">
                <p>倒计时</p>
                <RestTime endTime="2020-1-14 16:14:50"/>
              </div>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-dropdown trigger="click" style="margin-top: 30px;">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    {{$t('buyer.myResource.renewal')}}
                    <i class="el-icon-arrow-right"></i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <p @click="$router.push({path: '/resourcepool'})">
                      {{$t('buyer.myResource.detail')}}
                      <i class="el-icon-arrow-right"></i>
                    </p>
                  </el-dropdown-item>
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
import "echarts-liquidfill";
import Ball from "@/components/modules/Ball";
import RestTime from "@/components/modules/RestTime";

export default {
  name: "MyResource",
  components: {
    Ball,
    RestTime
  },
  data() {
    return {
      poolList: [
        { id: "1", value: "50", time: "2019-1-14 16:15:50" },
        { id: "2", value: "50", time: "2019-1-15 16:14:50" },
        { id: "3", value: "50", time: "2019-5-15 16:14:50" },
        { id: "4", value: "50", time: "2019-6-14 16:04:50" },
        { id: "5", value: "50", time: "2029-1-14 16:14:50" }
      ]
    };
  },
  methods: {
    initEchart() {
      var myChart = this.$echarts.init(document.getElementById("restResource"));
      var myChart1 = this.$echarts.init(
        document.getElementById("restResource1")
      );
      // var myChart2 = this.$echarts.init(
      //   document.getElementById('restResource2')
      // )
      var myChart3 = this.$echarts.init(
        document.getElementById("restResource3")
      );
      var myChart4 = this.$echarts.init(
        document.getElementById("restResource4")
      );
      var myChart5 = this.$echarts.init(
        document.getElementById("restResource5")
      );

      myChart.setOption({
        series: [
          {
            type: "liquidFill",
            radius: "85%",
            data: [
              {
                value: 0.3,
                direction: "right",
                itemStyle: {
                  normal: {
                    color: "#1890FF"
                  }
                }
              }
            ],
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: "#1890FF",
              borderWidth: 3
            }
          }
        ]
      });
      myChart1.setOption({
        series: [
          {
            name: "Cpu",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#1890FF", "#f2f2f2"],
            data: [
              {
                value: 68,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["CPU", 68].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 32 }
            ]
          }
        ]
      });
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
      //               formatter: ['{a|GPU}', '{b|88%}'].join('\n'),
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
            name: "memory",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#FACC14", "#f2f2f2"],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|Memory}", "{b|62%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      });
      myChart4.setOption({
        series: [
          {
            name: "disk",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#658FF7", "#f2f2f2"],
            data: [
              {
                value: 88,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|Disk}", "{b|88%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 12 }
            ]
          }
        ]
      });
      myChart5.setOption({
        series: [
          {
            name: "network",
            type: "pie",
            radius: ["85%", "70%"],
            hoverAnimation: false,
            legendHoverLink: false,
            avoidLabelOverlap: false,
            selectedOffset: 0,
            color: ["#FB8D5B", "#f2f2f2"],
            data: [
              {
                value: 62,
                selected: false,
                label: {
                  normal: {
                    show: true,
                    formatter: ["{a|Network}", "{b|62%}"].join("\n"),
                    rich: {
                      a: {
                        color: "#5d5d5d",
                        fontSize: "14",
                        lineHeight: "22",
                        fontFamily: "PingFangSC-Regular"
                      },
                      b: {
                        color: "rgba(0,0,0,.85)",
                        fontSize: "24",
                        fontFamily: "HelveticaNeue"
                      }
                    },
                    position: "center",
                    textStyle: { align: "center" }
                  }
                }
              },
              { value: 38 }
            ]
          }
        ]
      });
      window.onresize = function() {
        myChart.resize();
        myChart1.resize();
        // myChart2.resize()
        myChart3.resize();
        myChart4.resize();
        myChart5.resize();
      };
    }
  },
  mounted() {
    this.initEchart();
  }
};
</script>

<style lang="scss" scoped>
.myResource {
  background: #f2f2f2;
  min-width: 1130px;
  .myResourceHead {
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
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 60px;
      width: 125px;
      p {
        height: 60px;
        line-height: 60px;
        margin: 0;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #8eb357;
      }
    }
  }
  .myResourceBox {
    background: #ffffff;
    border-radius: 2px;
    margin: 20px;
    .title {
      background: #fafafa;
      border-radius: 4px 4px 0 0;
      height: 54px;
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    h2 {
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #363636;
      text-align: center;
      line-height: 24px;
    }
    #restResource {
      padding-left: 30px;
      height: 250px;
      width: 100%;
    }
    .restRes {
      border-left: 3px solid #fafafa;
      height: 250px;
      display: flex;
      padding-left: 50px;
      #restResource1,
      #restResource2,
      #restResource3,
      #restResource4,
      #restResource5 {
        height: 250px;
        width: 20%;
      }
    }
    .appResource {
      border-bottom: 1px solid #f2f2f2;
      h3 {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #363636;
        line-height: 24px;
        text-align: left;
        margin: 25px 20px;
      }
      .timeText {
          padding: 5px 20px; 
      }
      p {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        text-align: left;
        line-height: 24px;
      }
    }
  }
}
</style>
