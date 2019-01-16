<template>
  <section>
    <p class="false" v-show="flag == false">
      <b>{{minute}}</b>--<b>{{second}}</b>
    </p>
    <p class="true" v-show="flag == true">
      <b>0</b>--<b>0</b>
    </p>
  </section>
</template>

<script>
export default {
    data () {
      return {
        goodsObj: [
          {
            name: 'HomeMinuteTimer',
            checked: false,
            list: [ ]
          }
        ],
        minutes: 30,   // 此处修改分钟数量
        seconds: 0,    // 此处修改秒数数量
        flag: false
      }
    },
    mounted () {
      this.add()
    },
    methods: {
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      add: function () {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59
            _this.minutes -= 1
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0
            _this.flag = true
            window.clearInterval(time)
          } else {
            _this.seconds -= 1
          }
        }, 1000)
      }
    },
    watch: {
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    }
  }
</script>

<style lang="scss" scoped>
.false {
  b {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    width: 50px;
    height: 30px;
    background: #8eb357;
    border-radius: 3px;
    font-family: SourceSansPro-Bold;
    font-size: 20px;
    color: #ffffff;
  }
}
.true {
  b {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    width: 50px;
    height: 30px;
    background: #f54c46;
    border-radius: 3px;
    font-family: SourceSansPro-Bold;
    font-size: 20px;
    color: #ffffff;
  }
}
</style>
