<template>
  <section>
    <p :class="red? 'red' : 'false'" v-show="flag == false">
      <b>{{showDay}}</b>
      {{$t('module.day')}}
      <b>{{showHour}}</b>
      {{$t('module.hour')}}
      <b>{{showMinute}}</b>
      {{$t('module.minute')}}
      <b>{{showSecond}}</b>
      {{$t('module.second')}}
    </p>
    <p class="true" v-show="flag == true">
      <b>-</b>
      {{$t('module.day')}}
      <b>-</b>
      {{$t('module.hour')}}
      <b>-</b>
      {{$t('module.minute')}}
      <b>-</b>
      {{$t('module.second')}}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      showDay: '',
      showHour: '',
      showMinute: '',
      showSecond: '',
      flag: false,
      red: false
    }
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time)
      }
      this.timeDown()
    }, 500)
  },
  props: {
    endTime: {
      type: String
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime)
      const nowTime = new Date()
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24))
      let m = this.formate(parseInt((leftTime / 60) % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.$emit('time-end')
      } else if (leftTime <= 259200) {
        this.red = true
        this.time = `${d} d ${h} h ${m} m ${s} s`
        this.showDay = `${d}`
        this.showHour = `${h}`
        this.showMinute = `${m}`
        this.showSecond = `${s}`
      } else {
        this.time = `${d} d ${h} h ${m} m ${s} s`
        this.showDay = `${d}`
        this.showHour = `${h}`
        this.showMinute = `${m}`
        this.showSecond = `${s}`
      }
    },
    formate(time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
    color: #A2A6B0;
}
.false {
  b {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    width: 50px;
    height: 30px;
    background: #5B8C00;
    border-radius: 3px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
  }
}
.red {
  b {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    width: 50px;
    height: 30px;
    background: #f54c46;
    border-radius: 3px;
    font-size: 20px;
    font-weight: 500;
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
    background: #363636;
    border-radius: 3px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
