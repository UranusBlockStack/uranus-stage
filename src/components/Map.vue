<template>
    <section class="Map">
        <header class="mapHead">
            <img class="headImg" src="/static/img/uranus/head.png" alt="uranus">
            
            <div class="btn-group language">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      中文
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="#">选择语言</a></li>
                  </ul>
            </div>
            <router-link :to="{path: 'register'}" class="register">注册用户</router-link>
        </header>
        <div id="mapWorld"></div>
        <div class="mapCon">
            <div class="seller">
                <span>
                    出售算力
                </span>
                <p>共享多余算力,赚取额外费用</p>
            </div>
            <div class="buyer">
                <span>
                    出售算力
                </span>
                <p>共享多余算力,赚取额外费用</p>
            </div>
            <div class="develop">
                <span>
                    出售算力
                </span>
                <p>共享多余算力,赚取额外费用</p>
            </div>
        </div>
        
    </section>
</template>

<script>
    import china from '../../static/js/world.js'

    export default {
        name: 'Map',
        data() {
            return {
                charts: ''
            }
        },
        methods: {
      initEchart(){
        // 绘制地图
        var myChartMap2 = this.$echarts.init(document.getElementById('mapWorld'));
        // 地图上数据
        var myData = [
          {name: '分店1', value: [121.15, 31.89, 9]},
          {name: '分店2', value: [89.781327, 39.608266, 120]},
          {name: '分店3', value: [120.38, 37.35, 142]},
          {name: '分店4', value: [22.207216, 29.985295, 123]},
          {name:'分店5',value:[110.245672,30.7787677,566]}
        ]

        myChartMap2.setOption({
          // 新建一个地理坐标系 geo ，
          geo: {
            map: 'world',//地图类型为世界地图
            itemStyle:{ // 定义样式
              normal:{       // 普通状态下的样式
                areaColor:'#6699CC',
                borderColor: '#fff',
              },
              emphasis: {         // 高亮状态下的样式
                areaColor: '#f1f1f1'
              }
            }

          },
          // hover显示目标数据
          tooltip : {
            trigger: 'item',
            // tooltip的trigger的值可以有'item'、'axis'。
            //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            textStyle:{
              align:'left'
            },
          },
          // 图表背景色
          backgroundColor: '#f2f2f2',  
          // 标志颜色
          color:'green',
          // 新建散点图series
          series:[{
            name:'',//series名称
            type:'scatter',//为散点类型
            coordinateSystem: 'geo',// series坐标系类型
            data:myData,
            symbol:'pin',
            symbolSize:[20,20]
          }],

          // 添加视觉映射组件
        //   visualMap: {
        //     type: 'continuous', // 连续型
        //     min: 0,           // 值域最小值，必须参数
        //     max: 600,     // 值域最大值，必须参数
        //     calculable: true, // 是否启用值域漫游
        //     inRange: {
        //       color: ['green']
        //        // 指定数值从低到高时的颜色变化
        //     },
        //     textStyle: {
        //       color: 'lightgreen' // 值域控件的文本颜色
        //     }
        //   }
        })
      },
    },
    mounted() {
        this.initEchart()
    },
    }
</script>

<style lang="scss" scoped>
  .Map {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow: hidden;
  }
  #mapWorld {
    width: 100%;
    height:800px;
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
          right: 50px;
          top: 13px;
          .btn-default {
              background: #252525;
              color: greenyellow;
              border: none;
          }
          .dropdown-menu {
              left: -47px;
          }
      }
  }
  .mapCon {
      height: 150px;
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 30px;
      display: flex;
      justify-content: center;

      div {
          width: 320px;
          height: 120px;
          border-radius: 15px;
          margin: 15px;
          opacity: .5;
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
      .develop {
          background: yellow;
      }
  }
</style>