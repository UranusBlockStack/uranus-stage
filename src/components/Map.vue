<template>
  <section class="Map">
    <el-dialog
      :visible.sync="dialogVisible"
      top="60px"
      width="930px"
      :close-on-click-modal="false"
      :center="true"
    >
      <img src="/static/img/uranus/activity/activity.png">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">我要参加</el-button>
      </span>
    </el-dialog>
    <div class="openImg" @click="dialogVisible = true">
      <img src="/static/img/uranus/activity/join.png">
    </div>
    <header class="mapHead">
      <img class="headImg" src="/static/img/uranus/head.png" alt="uranus">
      <el-dropdown class="language" trigger="click">
        <span class="el-dropdown-link">
          <i class="iconfont icon-language"></i>
          {{lang}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>
            <p @click="chooseCn()">{{$t('map.cn')}}</p>
          </el-dropdown-item>-->
          <el-dropdown-item>
            <p @click="chooseEn()">{{$t('map.en')}}</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a @click.prevent="userRegister" class="register">{{$t('map.register')}}</a>
    </header>

    <div id="mapWorld"></div>

    <!-- <div class="right">
      <div class="head-block">
        <b>Head Block:</b>
        <p>{{BlockData.length === 0 ? placeHolder : BlockData[0].height}}</p>
        <b>Head Block Producer:</b>
        <p>{{BlockData.length === 0 ? placeHolder : BlockData[0].miner}}</p>
        <b>Head Block Timestamp:</b>
        <p>{{BlockData.length === 0 ? placeHolder : BlockData[0].timestamp}}</p>
      </div>
      <div class="block">
        <h3>
          <i class="iconfont icon-zhongmingming"></i> Block
        </h3>
        <div class="text">
          <p>Block {{BlockData.length === 0 ? placeHolder : BlockData[0].height}}</p>
          <p>{{BlockData.length === 0 ? placeHolder : BlockData[0].timestamp}}</p>
          <p>mined by {{BlockData.length == 0 ? placeHolder : BlockData[0].miner}}</p>
          <p>{{BlockData.length === 0 ? 0 : TranscationData.length}} transactions</p>
        </div>
        <div class="text" id="show">
          <p>Block {{BlockData.length <= 1 ? placeHolder : BlockData[1].height}}</p>
          <p>{{BlockData.length <= 1 ? placeHolder : BlockData[1].timestamp}}</p>
          <p>mined by {{BlockData.length <= 1 ? placeHolder : BlockData[1].miner}}</p>
          <p>0 transactions</p>
        </div>
      </div>
      <div class="transactions">
        <h3>
          <i class="iconfont icon-zhongmingming"></i> Transactions
        </h3>
        <div class="text">
          <p>TX hash: {{getTranscationData().length === 0 ? placeHolder : TranscationData[0].hash}}</p>
          <p>from: {{getTranscationData().length === 0 ? placeHolder : TranscationData[0].from}}</p>
          <p>to: {{getTranscationData().length === 0 ? placeHolder : TranscationData[0].to}}</p>
          <p>value: {{getTranscationData().length === 0 ? placeHolder : TranscationData[0].value}} URAC</p>
        </div>
        <div class="text" id="show">
          <p>TX hash: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].hash}}</p>
          <p>from: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].from}}</p>
          <p>to: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].to}}</p>
          <p>value: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].value}} URAC</p>
        </div>
      </div>
    </div>-->
    <div class="mapCon">
      <a @click.prevent="LoginPage('Seller')" class="seller">
        <span>
          <i class="iconfont icon-map-seller"></i>
          {{$t('map.seller')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.sellerText')}}</p>
      </a>
      <a @click.prevent="LoginPage('Buyer')" class="buyer">
        <span>
          <i class="iconfont icon-map-buyer"></i>
          {{$t('map.buyer')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.buyerText')}}</p>
      </a>
      <a @click.prevent="LoginPage('Developer')" class="developer">
        <!-- <a @click.prevent="construction()" class="developer"> -->
        <span>
          <i class="iconfont icon-map-developer"></i>
          {{$t('map.developer')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.developerText')}}</p>
      </a>
    </div>
  </section>
</template>

<script>
import '../../static/js/world.js'
import * as auth from '../services/AuthService'
import * as block from '../services/BlockService'
import moment from 'moment'
import { Message } from 'element-ui'

export default {
  name: 'Map',
  data() {
    return {
      lang: 'English',
      langCode: 'en-us',
      role: '',
      placeHolder: '--',
      BlockData: [],
      TranscationData: [],
      dialogVisible: true
    }
  },
  methods: {
    construction() {
      this.$message({
        showClose: true,
        message: 'This role is under construction',
        type: 'warning'
      })
    },
    chooseCn() {
      this.lang = '中文'
      this.langCode = 'zh-cn'
      this.$i18n.locale = 'cn'
    },
    chooseEn() {
      this.lang = 'English'
      this.langCode = 'en-us'
      this.$i18n.locale = 'en'
    },
    LoginPage(userRole) {
      auth.setCurRole(userRole)
      auth.setCurLang(this.langCode)
      this.$router.push({ name: 'Login' })
    },

    initEchart() {
      // 绘制地图
      let myChartMap2 = this.$echarts.init(document.getElementById('mapWorld'))
      // 地图上数据
      let myData = [
        { name: '1', value: [121.15, 31.89, 9] },
        { name: '2', value: [89.781327, 39.608266, 120] },
        { name: '3', value: [120.38, 37.35, 142] },
        { name: '4', value: [22.207216, 29.985295, 123] },
        { name: '5', value: [127.766922, 35.907757, 566] },
        { name: '6', value: [105.318756, 61.52401, 90] },
        { name: '7', value: [138.252924, 36.204824, 90] },
        { name: '8', value: [105.318756, 61.52401, 90] },
        { name: '9', value: [-95.712891, 37.09024, 90] },
        { name: '10', value: [37.896, 55.435, 90] },
        { name: '11', value: [40.435, 56.049, 90] },
        { name: '12', value: [50.075, 57.483, 90] },
        { name: '13', value: [103.77, 1.343, 100] },
        { name: '14', value: [101.86, 4.7105, 100] }
      ]

      myChartMap2.setOption({
        geo: {
          map: 'world', // 地图类型为世界地图
          //   roam: true, //缩放  拖动
          //   zoom: 1,
          //   scaleLimit: { min: 1, max: 2 },
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: '#424B00',
              borderColor: '#000',
            },
            emphasis: {
              // 高亮状态下的样式
              areaColor: '#627100',
            }
          },
          label: {
            emphasis: {
              textStyle: {
                color: '#A2AE44'
              }
            }
          }

        },
        // hover显示目标数据
        // tooltip: {
        //   trigger: 'item',
        //   textStyle: {
        //     align: 'left'
        //   }
        // },
        // 图表背景色
        backgroundColor: '#161618',
        // 标志颜色
        color: '#A2AE44',
        // 新建散点图series
        series: [
          {
            name: '', // series名称
            type: 'scatter', // 为散点类型
            coordinateSystem: 'geo', // series坐标系类型
            data: myData,
            symbol: 'pin',
            symbolSize: [20, 20]
          }
        ]
      })
      window.onresize = function () {
        myChartMap2.resize()
      }
    },
    userRegister() {
      auth.setCurLang(this.langCode)
      this.$router.push({ name: 'Register' })
    },
    // lastedBlock() {
    //   this.BlockData = []
    //   block.getLastedBlock(this.langCode, { 'height': -1 })
    //     .then(blockData => {
    //       if (blockData.data.success) {
    //         const data = blockData.data.data
    //         this.BlockData.push(data)
    //         this.TranscationData = data.transactions
    //         block.getLastedBlock(this.$store.getters.lang, { 'height': data.height - 1 })
    //           .then(blockData => {
    //             if (blockData.data.success) {
    //               this.BlockData.push(blockData.data.data)
    //             }
    //           })
    //       }
    //     })
    // },
    // getTranscationData() {
    //   return this.TranscationData
    // },
    // refushBlockData() {
    //   // this.timer = setInterval(() => {
    //   //   this.lastedBlock()
    //   // }, 5000)
    // }
  },
  mounted() {
    this.initEchart()
  },
  //   created() {
  //     this.lastedBlock()
  //     this.refushBlockData()
  //   },
  //   beforeDestroy() {
  //     if (this.timer) {
  //       clearInterval(this.timer)
  //     }
  //   }
}
</script>

<style lang="scss" scoped>
.Map {
  width: 100%;
  height: 100%;
  min-height: 800px;
  min-width: 1130px;
  background: #ffffff;
  overflow: hidden;
  .el-dialog__wrapper /deep/ .el-dialog {
    background: #000000;
    img {
      width: 880px;
      height: 900px;
      display: inline-block;
    }
  }
  .el-button {
    background: #627100;
    border: 1px solid #627100;
    border-radius: 3px;
    width: 300px;
    height: 40px;
    font-family: SourceSansPro-Regular;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
  }
  // .el-button:hover {
  //   background: #627100;
  //   border: 1px solid #627100;
  // }
}
.openImg {
  position: fixed;
  right: 30px;
  top: 100px;
  z-index: 999;
  width: 120px;
  height: 50px;
  img {
    display: block;
    width: 120px;
    height: 50px;
  }
}
#mapWorld {
  width: 100%;
  min-width: 1130px;
  height: 100%;
  min-height: 800px;
}
.mapHead {
  height: 60px;
  background: rgba(176, 192, 255, 0.05);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .headImg {
    display: block;
    height: 40px;
    margin: 10px 25px;
    float: left;
  }
  .language {
    display: block;
    height: 60px;
    line-height: 60px;
    margin-right: 30px;
    text-align: center;
    float: right;
    color: #a2ae44;
  }
  .register {
    display: block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-right: 30px;
    float: right;
    color: #a2ae44;
    cursor: pointer;
  }
}
// .right {
//   min-width: 200px;
//   width: 10%;
//   height: 100%;
//   position: fixed;
//   right: 20px;
//   top: 80px;
//   z-index: 999;
//   .head-block {
//     background: #ffffff;
//     border: 1px solid #dcdcdc;
//     border-radius: 3px;
//     width: 205px;
//     padding: 15px;
//     height: 170px;
//     font-family: Arial-BoldMT;
//     font-size: 14px;
//     color: #5d5d5d;
//     text-align: left;
//     p {
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       width: 135px;
//     }
//   }
//   .block {
//     background: #ffffff;
//     border-radius: 3px;
//     width: 150px;
//     h3 {
//       font-family: ArialMT;
//       font-size: 16px;
//       color: #545454;
//       text-align: center;
//       line-height: 24px;
//     }
//     #show {
//       display: none;
//     }
//     .text {
//       background: #ffffff;
//       border: 1px solid #f2f2f2;
//       width: 160px;
//       height: 150px;
//       padding: 15px;
//       box-shadow: 10px 10px 5px #f2f2f2;
//       margin-bottom: 15px;
//       p {
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         width: 135px;
//       }
//     }
//   }
//   .block:hover .text {
//     display: block !important;
//   }
//   .transactions {
//     background: #f2f2f2;
//     border-radius: 3px;
//     width: 190px;
//     margin-top: 40px;
//     h3 {
//       background: #ffffff;
//       margin: 5px 0;
//       padding-bottom: 15px;
//       font-family: ArialMT;
//       font-size: 16px;
//       color: #545454;
//       letter-spacing: 0;
//       text-align: center;
//       line-height: 24px;
//     }
//     #show {
//       display: none;
//     }
//     .text {
//       background: #ffffff;
//       width: 185px;
//       height: 145px;
//       padding: 15px;
//       margin-bottom: 5px;
//       border: 1px solid #f2f2f2;
//       p {
//         width: 165px;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//       }
//     }
//   }
//   .transactions:hover .text {
//     display: block !important;
//   }
// }
.mapCon {
  height: 150px;
  min-width: 820px;
  width: 70%;
  position: fixed;
  left: 15%;
  bottom: 15%;
  display: flex;
  justify-content: center;
  a {
    width: 30%;
    height: 50%;
    min-width: 250px;
    min-height: 150px;
    border-radius: 15px;
    background: rgba(176, 192, 255, 0.1);
    margin: 15px;
    color: #a2ae44;
    text-align: center;
    cursor: pointer;
    span {
      display: block;
      margin-top: 35px;
      height: 50px;
      font-family: Source-Sans-Pro-Bold;
      font-size: 30px;
      color: #a2ae44;
      text-align: center;
      line-height: 28px;
      .iconfont {
        font-size: 50px;
      }
    }
    p {
      margin-top: 15px;
      height: 50px;
      font-family: Source-Sans-Pro-Bold;
      font-size: 15px;
      color: #a2ae44;
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
    }
  }
  a:hover {
    width: 35%;
    transition: 1s;
    background: rgba(98, 113, 0, 0.66);
    span,
    p {
      color: #ffffff;
    }
  }
  //   .seller {
  //     background: #97c158;
  //   }
  //   .buyer {
  //     background: #7692d9;
  //   }
  //   .developer {
  //     background: #ffbd26;
  //   }
}
</style>