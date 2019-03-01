<template>
  <section  class="NotFound" @click="$router.push({ path: '/'})"></section>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.NotFound {
    background: url(/static/img/uranus/NotFound/error.png) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    cursor: pointer;
}
</style>

  

