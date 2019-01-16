<template>
  <section class="Head">
    <!-- Logo -->
    <router-link :to="{path : '/map'}" class="logo">
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
          <span>Alexander Pierce</span>
          <el-button @click="logout"><i class="iconfont icon-role"></i></el-button>
      </div>
      <!-- Download button -->
      <div class="download">
          <span>{{$t('userCommon.download')}}</span>
      </div>
    </nav>
  </section>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  name: "Head",
  methods: {
    logout() {
      auth.logout();
      this.$router.push({ name: "Map" });
    }
  }
};
</script>

<style lang="scss" scoped>
.Head {
  .logo {
    background: #252525;
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
    background: #252525;
    .userInformation {
        width: 200px;
        color: #8eb357;
        float: right;
        height: 50px;
        line-height: 50px;
      .el-button {
          background: #252525;
          border: none;
          color: #8eb357;
          :hover {
              color: #f54c46;
          }
      }
    }
    .download {
        width: 150px;
        float: right;
        color: #8eb357;
        span {
            height: 50px;
            line-height: 50px;
        }
    }
  }
}
</style>
