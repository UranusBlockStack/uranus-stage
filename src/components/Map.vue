<template>
  <section class="Map">
    <header class="mapHead">
      <img class="headImg" src="/static/img/uranus/head.png" alt="uranus">
      <el-dropdown class="language" trigger="click">
        <span class="el-dropdown-link">
          <i class="iconfont icon-language"></i>
          {{lang}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <p @click="chooseCn()">{{$t('map.cn')}}</p>
          </el-dropdown-item>
          <el-dropdown-item>
            <p @click="chooseEn()">{{$t('map.en')}}</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a @click.prevent="userRegister" class="register">{{$t('map.register')}}</a>
    </header>

    <div id="mapWorld"></div>

    <div class="right">
      <div class="head-block">
        <b>Head Block:</b>
        <p>{{BlockData.length == 0 ? placeHolder : BlockData[0].height}}</p>
        <b>Head Block Producer:</b>
        <p>{{BlockData.length == 0 ? placeHolder : BlockData[0].miner}}</p>
        <b>Head Block Timestamp:</b>
        <p>{{BlockData.length == 0 ? placeHolder : BlockData[0].timestamp}}</p>
      </div>
      <div class="block">
        <h3>
          <i class="iconfont icon-zhongmingming"></i> Block
        </h3>
        <div class="text" id="show">
          <p>Block {{BlockData.length == 0 ? placeHolder : BlockData[0].height}}</p>
          <p>{{BlockData.length == 0 ? placeHolder : BlockData[0].timestamp}}</p>
          <p>mined by {{BlockData.length == 0 ? placeHolder : BlockData[0].miner}}</p>
          <p>0 transactions</p>
        </div>
        <div class="text">
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
        <div class="text" id="show">
          <p>TX hash: {{getTranscationData().length == 0 ? placeHolder : TranscationData[0].hash}}</p>
          <p>from: {{getTranscationData().length == 0 ? placeHolder : TranscationData[0].from}}</p>
          <p>to: {{getTranscationData().length == 0 ? placeHolder : TranscationData[0].to}}</p>
          <p>value: {{getTranscationData().length == 0 ? placeHolder : TranscationData[0].value}} URAC</p>
        </div>
        <div class="text">
            <p>TX hash: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].hash}}</p>
            <p>from: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].from}}</p>
            <p>to: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].to}}</p>
            <p>value: {{getTranscationData().length <= 1 ? placeHolder : TranscationData[1].value}} URAC</p>
        </div>
      </div>
    </div>
    <div class="mapCon">
      <a @click.prevent="LoginPage('Seller')" class="seller">
        <span>
          <img src="/static/img/uranus/seller.png">
          {{$t('map.seller')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.sellerText')}}</p>
      </a>
      <a @click.prevent="LoginPage('Buyer')" class="buyer">
        <span>
          <img src="/static/img/uranus/buyer.png">
          {{$t('map.buyer')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.buyerText')}}</p>
      </a>
      <a @click.prevent="LoginPage('Developer')" class="developer">
        <span>
          <img src="/static/img/uranus/developer.png">
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

export default {
  name: 'Map',
  data() {
    return {
      lang: 'English',
      langCode: 'en-us',
      role: '',
      placeHolder: '--',
      BlockData: [],
      TranscationData: []
    }
  },
  methods: {
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
        { name: '分点1', value: [121.15, 31.89, 9] },
        { name: '分点2', value: [89.781327, 39.608266, 120] },
        { name: '分点3', value: [120.38, 37.35, 142] },
        { name: '分点4', value: [22.207216, 29.985295, 123] },
        { name: '分点5', value: [110.245672, 30.7787677, 566] }
      ]

      myChartMap2.setOption({
        // 新建一个地理坐标系 geo ，
        geo: {
          map: 'world', // 地图类型为世界地图
          roam: true,
          zoom: 1,
          scaleLimit: { min: 1, max: 2 },
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: '#6699CC',
              borderColor: '#fff'
            },
            emphasis: {
              // 高亮状态下的样式
              areaColor: 'lightgreen'
            }
          }
        },
        // hover显示目标数据
        tooltip: {
          trigger: 'item',
          textStyle: {
            align: 'left'
          }
        },
        // 图表背景色
        backgroundColor: '#ffffff',
        // 标志颜色
        color: 'green',
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
      window.onresize = function() {
        myChartMap2.resize()
      }
    },
    userRegister() {
      auth.setCurLang(this.langCode)
      this.$router.push({ name: 'Register' })
    },
    lastedBlock() {
      block.getLastedBlock(this.$store.getters.lang, {'height': -1})
              .then(blockData => {
                if (blockData.data.success) {
                  const data = blockData.data.data
                  this.BlockData.push(data)
                  this.TranscationData = data.transactions
                  block.getLastedBlock(this.$store.getters.lang, {'height': data.height-1})
                        .then(blockData => {
                          if (blockData.data.success) {
                            this.BlockData.push(blockData.data.data)
                          }
                        })
                }
              })
    },
    getTranscationData() {
      return this.TranscationData
    }
  },
  mounted() {
    this.initEchart()
  },
  created() {
    this.lastedBlock()
  }
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
}
#mapWorld {
  width: 100%;
  min-width: 1130px;
  height: 100%;
  min-height: 800px;
}
.mapHead {
  height: 60px;
  background: #252525;
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
    color: #81a028;
  }
  .register {
    display: block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    float: right;
    color: #81a028;
  }
}
.right {
  min-width: 200px;
  width: 10%;
  height: 100%;
  position: fixed;
  right: 20px;
  top: 80px;
  .head-block {
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    width: 205px;
    padding: 15px;
    height: 170px;
    font-family: Arial-BoldMT;
    font-size: 14px;
    color: #5d5d5d;
    text-align: left;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 135px;
    }
  }
  .block {
    background: #ffffff;
    border-radius: 3px;
    width: 150px;
    h3 {
      font-family: ArialMT;
      font-size: 16px;
      color: #545454;
      text-align: center;
      line-height: 24px;
    }
    #show {
      display: none;
    }
    .text {
      background: #ffffff;
      border: 1px solid #f2f2f2;
      width: 160px;
      height: 150px;
      padding: 15px;
      box-shadow: 10px 10px 5px #f2f2f2;
      margin-bottom: 15px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 135px;
      }
    }
  }
  .block:hover .text {
    display: block !important;
  }
  .transactions {
    background: #f2f2f2;
    border-radius: 3px;
    width: 190px;
    margin-top: 40px;
    h3 {
      background: #ffffff;
      margin: 5px 0;
      padding-bottom: 15px;
      font-family: ArialMT;
      font-size: 16px;
      color: #545454;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
    }
    #show {
      display: none;
    }
    .text {
      background: #ffffff;
      width: 185px;
      height: 145px;
      padding: 15px;
      margin-bottom: 5px;
      border: 1px solid #f2f2f2;
      p {
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .transactions:hover .text {
    display: block !important;
  }
}
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
    margin: 15px;
    opacity: 0.7;
    color: #000000;
    text-align: center;
    cursor: pointer;
    span {
      display: block;
      margin-top: 35px;
      height: 30px;
      font-family: PingFang-SC-Medium;
      font-size: 30px;
      color: #ffffff;
      text-align: center;
      line-height: 28px;
      img {
        display: inline-block;
        height: 30px;
        width: 30px;
        margin-right: 10px;
      }
    }
    p {
      margin-top: 15px;
      height: 50px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
    }
  }
  a:hover {
    opacity: 1;
    width: 35%;
    transition: 1s;
  }
  .seller {
    background: #97c158;
  }
  .buyer {
    background: #7692d9;
  }
  .developer {
    background: #ffbd26;
  }
}
</style>