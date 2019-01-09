<template>
  <section class="Map">
    <header class="mapHead">
      <img class="headImg" src="/static/img/uranus/head.png" alt="uranus">
      <el-dropdown class="language" trigger="click">
        <span class="el-dropdown-link">
          <i class="iconfont icon-yuyanqiehuan"></i>
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
      <router-link :to="{path: 'register'}" class="register">{{$t('map.register')}}</router-link>
    </header>
    <div id="mapWorld"></div>
    <div class="block">
      <h5>BLOCK</h5>
      <div class="text">
        <p>Block 4277862</p>
        <p>>9 seconds ago</p>
        <p>mined by cope…</p>
        <p>0 transactions</p>
      </div>
      <div class="text">
        <p>Block 4277862</p>
        <p>>9 seconds ago</p>
        <p>mined by cope…</p>
        <p>0 transactions</p>
      </div>
      <div class="text">
        <p>Block 4277862</p>
        <p>>9 seconds ago</p>
        <p>mined by cope…</p>
        <p>0 transactions</p>
      </div>
      <div class="text">
        <p>Block 4277862</p>
        <p>>9 seconds ago</p>
        <p>mined by cope…</p>
        <p>0 transactions</p>
      </div>
    </div>
    <div class="transaction">
      <h5>Transactions</h5>
      <div class="text">
        <p class="record">
          <i class="iconfont icon-jilu"></i>
        </p>
        <p>TX hash:d1f2e3…</p>
        <p>from: 6f4d1f6dfg…</p>
        <p>to: d1h4fe2d3ju…</p>
        <p>value:121URAC</p>
      </div>
      <div class="text">
        <p class="record">
          <i class="iconfont icon-jilu"></i>
        </p>
        <p>TX hash:d1f2e3…</p>
        <p>from: 6f4d1f6dfg…</p>
        <p>to: d1h4fe2d3ju…</p>
        <p>value:121URAC</p>
      </div>
      <div class="text">
        <p class="record">
          <i class="iconfont icon-jilu"></i>
        </p>
        <p>TX hash:d1f2e3…</p>
        <p>from: 6f4d1f6dfg…</p>
        <p>to: d1h4fe2d3ju…</p>
        <p>value:121URAC</p>
      </div>
      <div class="text">
        <p class="record">
          <i class="iconfont icon-jilu"></i>
        </p>
        <p>TX hash:d1f2e3…</p>
        <p>from: 6f4d1f6dfg…</p>
        <p>to: d1h4fe2d3ju…</p>
        <p>value:121URAC</p>
      </div>
    </div>
    <div class="mapCon">
      <router-link :to="{name: 'Seller', params: {user: 'seller'}}" class="seller">
        <span>
          <img src="/static/img/uranus/seller.png">
          {{$t('map.seller')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.sellerText')}}</p>
      </router-link>
      <router-link :to="{name: 'Buyer', params: {user: 'buyer'}}" class="buyer">
        <span>
          <img src="/static/img/uranus/buyer.png">
          {{$t('map.buyer')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.buyerText')}}</p>
      </router-link>
      <router-link :to="{name: 'Developer', params: {user: 'developer'}}" class="developer">
        <span>
          <img src="/static/img/uranus/developer.png">
          {{$t('map.developer')}}
          <i class="el-icon-arrow-right"></i>
        </span>
        <p>{{$t('map.developerText')}}</p>
      </router-link>
    </div>
  </section>
</template>

<script>
import '../../static/js/world.js'

export default {
  name: 'Map',
  data() {
    return {
      lang: '中文'
    }
  },
  methods: {
    chooseCn() {
      this.lang = '中文'
      this.$i18n.locale = 'cn'
    },
    chooseEn() {
      this.lang = 'English'
      this.$i18n.locale = 'en'
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
    }
  },
  mounted() {
    this.initEchart()
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
.block {
  min-width: 150px;
  width: 10%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
  h5 {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #545454;
    text-align: center;
    line-height: 24px;
    margin-top: 30px;
  }
  .text {
    background: #f2f2f2;
    padding-top: 10px;
    width: 100%;
    height: 130px;
    margin-top: 30px;
    box-shadow: 10px 10px 5px #dcdcdc;
    p {
      font-family: ArialMT;
      font-size: 14px;
      color: #5d5d5d;
      text-align: center;
    }
  }
}
.transaction {
  min-width: 150px;
  width: 10%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 60px;
  h5 {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #545454;
    text-align: center;
    line-height: 24px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .text {
    background: #ffffff;
    width: 100%;
    height: 170px;
    border: 5px solid #f2f2f2;
    border-right: 0;
    p {
      font-family: ArialMT;
      font-size: 14px;
      color: #5d5d5d;
      text-align: center;
    }
    .record {
      text-align: left;
      padding-left: 20px;
    }
  }
}
.mapCon {
  height: 150px;
  min-width: 800px;
  width: 80%;
  position: fixed;
  left: 10%;
  bottom: 15%;
  display: flex;
  justify-content: center;
  a {
    width: 25%;
    height: 50%;
    min-width: 220px;
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