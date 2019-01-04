<template>
  <section class="Map">
    <header class="mapHead">
      <img class="headImg" src="/static/img/uranus/head.png" alt="uranus">
      <div class="btn-group language">
        <el-select v-model="value" :placeholder="$t('map.language')" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <router-link :to="{path: 'register'}" class="register">{{$t('map.register')}}</router-link>
    </header>
    <div id="mapWorld"></div>
    <div class="mapCon">
      <router-link :to="{path: 'seller'}" class="seller">
        <span>{{$t('map.seller')}}</span>
        <p>{{$t('map.sellerText')}}</p>
      </router-link>
      <router-link :to="{path: 'buyer'}" class="buyer">
        <span>{{$t('map.buyer')}}</span>
        <p>{{$t('map.buyerText')}}</p>
      </router-link>
      <router-link :to="{path: 'developer'}" class="developer">
        <span>{{$t('map.developer')}}</span>
        <p>{{$t('map.developerText')}}</p>
      </router-link>
    </div>
  </section>
</template>

<script>
import "../../static/js/world.js";

export default {
  name: "Map",
  data() {
    return {
      options: [{
          value: '选项1',
          label: 'CN'
        }, {
          value: '选项2',
          label: 'EN'
        }],
        value: ''
    };
  },
  methods: {
    initEchart() {
      // 绘制地图
      let myChartMap2 = this.$echarts.init(document.getElementById("mapWorld"));
      // 地图上数据
      let myData = [
        { name: "分点1", value: [121.15, 31.89, 9] },
        { name: "分点2", value: [89.781327, 39.608266, 120] },
        { name: "分点3", value: [120.38, 37.35, 142] },
        { name: "分点4", value: [22.207216, 29.985295, 123] },
        { name: "分点5", value: [110.245672, 30.7787677, 566] }
      ];

      myChartMap2.setOption({
        // 新建一个地理坐标系 geo ，
        geo: {
          map: "world", // 地图类型为世界地图
          // roam: true,
          // zoom: 1,
          // scaleLimit: {min: 1, max: 5},
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: "#6699CC",
              borderColor: "#fff"
            },
            emphasis: {
              // 高亮状态下的样式
              areaColor: "lightgreen"
            }
          }
        },
        // hover显示目标数据
        tooltip: {
          trigger: "item",
          textStyle: {
            align: "left"
          }
        },
        // 图表背景色
        backgroundColor: "#f2f2f2",
        // 标志颜色
        color: "green",
        // 新建散点图series
        series: [
          {
            name: "", // series名称
            type: "scatter", // 为散点类型
            coordinateSystem: "geo", // series坐标系类型
            data: myData,
            symbol: "pin",
            symbolSize: [20, 20]
          }
        ]
      });
      window.onresize = function() {
        myChartMap2.resize();
      };
    }
  },
  mounted() {
    this.initEchart();
  }
};
</script>

<style lang="scss" scoped>
.Map {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background: #f2f2f2;
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
  .register {
    display: block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    float: right;
    color: greenyellow;
  }
  .language {
    float: right;
    width: 80px;
    right: 50px;
    top: 13px;
  }
}
.mapCon {
  height: 150px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 15%;
  display: flex;
  justify-content: center;
  a {
    width: 20%;
    height: 50%;
    min-width: 320px;
    min-height: 120px;
    border-radius: 15px;
    margin: 15px;
    opacity: 0.5;
    color: #000000;
    text-align: center;
    cursor: pointer;
    span {
      display: block;
      margin-top: 20px;
      height: 30px;
      font-size: 22px;
    }
    p {
      margin-top: 15px;
      height: 50px;
      font-size: 15px;
    }
  }
  .seller {
    background: lightblue;
  }
  .buyer {
    background: greenyellow;
  }
  .developer {
    background: yellow;
  }
}
</style>