<template>
    <section class="Developer">
      <div class="content-header">
        <h1>
          首页D
        </h1>
        <!-- <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
          <li class="active">Here</li>
        </ol> -->
        <div class="balence">
          <p>余额:12121212</p>
          <p>收益:12121212</p>
        </div>
      </div>
      <!-- Main content -->
      <div class="content container-fluid">
        <div class="consumption">
          我的消费
        </div>
        <div class="profit">
          我的收益
        </div>
        <div class="power">
          我的算力
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'Developer'
}
</script>

<style lang="scss" scoped>
  .Developer {
    background: #f2f2f2;
    .content-header {
      background: #ffffff;
      height: 65px;
      width: 100%;
      h1 {
        float: left;
      }
      .balence {
        float: right;
        margin-right: 15px;
        height: 50px;
        width: 105px;
        p {
          height: 25px;
          line-height: 25px;
          margin: 0;
        }
      }
    }
    .content {
      .consumption {
        width: 45%;
        height: 300px;
        background: #ffffff;
        float: left;
        margin: 0 15px;
      }
      .profit {
        width: 45%;
        height: 300px;
        background: #ffffff;
        float: left;
        margin: 0 15px;
      }
      .power {
        width: 45%;
        height: 300px;
        background: #ffffff;
      }
    }
  }
</style>
