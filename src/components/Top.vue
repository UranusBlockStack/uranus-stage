<template>
  <section class="Head">
    <!-- Logo -->
    <router-link :to="{path : '/'}" class="logo">
      <!-- mini logo for sidebar mini pixels -->
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
      <div
        href="#"
        class="sidebar-toggle"
        style="color: #627100;"
        data-toggle="push-menu"
        role="button"
      >
        <span class="sr-only">Toggle</span>
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
        <span v-if="this.userRole === 'Seller'">
          <a v-bind:href="downloadUrl" target="_blank">{{$t('userCommon.download')}}</a>
        </span>
      </div>

      <!-- Help button -->
      <div class="help_dropdown">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-question"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="help">
              <a href="/static/HELP.pdf" target="_blank">HELP</a>
            </el-dropdown-item>
            <el-dropdown-item command="faq">
              <a href="https://www.uranus.io/faq" target="_blank">FAQ</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      userRole: auth.getCurRole(),
      downloadUrl: this.$store.state.downloadUrl
    }
  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
      location.target = '_blank'
      location.href = '/static/' + command + '.pdf'
    },
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
    background: #08080a !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
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
    background: #08080a !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    .userInformation {
      /*width: 200px;*/
      color: #627100;
      float: right;
      height: 50px;
      line-height: 50px;
      .el-button {
        background: rgba(101, 143, 247, 0);
        border: none;
        color: #627100;
        :hover {
          color: #f54c46;
        }
      }
    }
    .download {
      width: 150px;
      float: right;
      color: #627100;
      cursor: pointer;
      span {
        height: 50px;
        line-height: 50px;
      }
      a {
        color: #627100;
      }
      :hover {
        color: #a2ae44;
      }
    }
    .help_dropdown {
      width: 50px;
      float: right;
      color: #627100;
      span {
        height: 50px;
        line-height: 50px;
      }
      :hover {
        color: #a2ae44;
      }
      .el-dropdown {
        color: #627100;
      }
      .el-icon-question {
        font-size: 20px;
      }
    }
  }
}
</style>
