<template>
  <section class="Head">
    <!-- Logo -->
    <router-link :to="{path : '/'}" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">
        <img src="/static/img/uranus/uranus_mini.png" alt>
      </span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">
        <img src="/static/img/uranus/head.png" alt>
      </span>
    </router-link>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <div href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </div>
      <!-- User Sign out -->
      <div class="userInformation">
        <span>
          <i class="iconfont icon-user"></i>
          {{curUserName}}
        </span>
        <el-tooltip class="item" effect="dark" content="Sign out" placement="bottom-start">
          <el-button @click="logout">
            <i class="iconfont icon-sign-out"></i>
          </el-button>
        </el-tooltip>
      </div>
      <!-- Download button -->
      <div class="download">
        <span  v-if="this.userRole == 'Seller'">{{$t('userCommon.download')}}</span>
      </div>
    </nav>
  </section>
</template>

<script>
import * as auth from '../services/AuthService'

export default {
  name: 'Head',
  data() {
    return {
      curUserName: auth.getCurUserName(),
      userRole: auth.getCurRole()
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.push({ name: 'Map' })
    }
  }
}
</script>

<style lang="scss" scoped>
.Head {
  .logo {
    background: rgba(101, 143, 247, 0) !important;
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    .logo-mini {
      img {
        display: block;
        height: 30px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
    .logo-lg {
      img {
        height: 38px;
        margin: 6px 30px;
      }
    }
  }
  .navbar {
    background: rgba(101, 143, 247, 0) !important;
    box-shadow: inset 0 0 22px 0 rgba(36, 99, 255, 0.5);
    .userInformation {
      /*width: 200px;*/
      color: #ffffff;
      float: right;
      height: 50px;
      line-height: 50px;
      .el-button {
        background: rgba(101, 143, 247, 0);
        border: none;
        color: #ffffff;
        :hover {
          color: #f54c46;
        }
      }
    }
    .download {
      width: 150px;
      float: right;
      color: #ffffff;
      cursor: pointer;
      span {
        height: 50px;
        line-height: 50px;
      }
      :hover {
        color: #1890ff;
      }
    }
  }
}
</style>
