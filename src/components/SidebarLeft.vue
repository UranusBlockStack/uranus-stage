<template>
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <!-- <div class="user-panel">
        <div class="pull-left image">
          <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
    <p>Alexander Pierce</p>-->
    <!-- Status -->
    <!-- <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
    </div>-->
    <!-- search form (Optional) -->
    <!-- <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
        </div>
    </form>-->
    <!-- /.search form -->
    <!-- Sidebar Menu -->
    <ul class="sidebar-menu" data-widget="tree">
      <!-- <li class="header">HEADER</li> -->
      <!-- Optionally, you can add icons to the links -->
      <li class="treeview" v-show="user== 'seller'">
        <router-link :to="{path: '/seller'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'buyer'">
        <router-link :to="{path: '/buyer'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'developer'">
        <router-link :to="{path: '/developer'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'buyer'">
        <router-link :to="{path: '/applicationmarket'}">
          <i class="iconfont icon-application-market"></i>
          <span>{{$t('menu.appMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'buyer'">
        <router-link :to="{path: '/applicationrepository'}">
          <i class="iconfont icon-My-application"></i>
          <span>{{$t('menu.appRepository')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'buyer'">
        <router-link :to="{path: '/resourcemarket'}">
          <i class="iconfont icon-resource-market"></i>
          <span>{{$t('menu.resourceMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'buyer'">
        <router-link :to="{path: '/myresource'}">
          <i class="iconfont icon-my-resource"></i>
          <span>{{$t('menu.myResource')}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </router-link>
        <ul class="treeview-menu">
          <li>
            <router-link :to="{path: '/resourcepool'}">
              <i class="iconfont icon-my-resource"></i>
              {{$t('menu.resourcePool1')}}
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/resourcepool'}">
              <i class="iconfont icon-my-resource"></i>
              {{$t('menu.resourcePool2')}}
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/resourcepool'}">
              <i class="iconfont icon-my-resource"></i>
              {{$t('menu.resourcePool3')}}
            </router-link>
          </li>
        </ul>
      </li>
      <li class="treeview" v-show="user== 'seller'">
        <router-link :to="{path: '/myhost'}">
          <i class="iconfont icon-host"></i>
          <span>{{$t('menu.myHost')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'seller'">
        <router-link :to="{path: '/mycolony'}">
          <i class="iconfont icon-cluster"></i>
          <span>{{$t('menu.myColony')}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </router-link>
        <ul class="treeview-menu">
          <li>
            <router-link :to="{path: '/colony'}">
              <i class="iconfont icon-colony"></i>
              {{$t('menu.myColony1')}}
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/colony'}">
              <i class="iconfont icon-colony"></i>
              {{$t('menu.myColony2')}}
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/colony'}">
              <i class="iconfont icon-colony"></i>
              {{$t('menu.myColony3')}}
            </router-link>
          </li>
        </ul>
      </li>
      <li class="treeview" v-show="user== 'developer'">
        <router-link :to="{path: '/uploadapplication'}">
          <i class="iconfont icon-upload-application"></i>
          <span>{{$t('menu.uploadApplication')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'developer'">
        <router-link :to="{path: '/myapplication'}">
          <i class="iconfont icon-My-application"></i>
          <span>{{$t('menu.myApplication')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/wallet'}">
          <i class="iconfont icon-wallet"></i>
          <span>{{$t('menu.wallet')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/setting'}">
          <i class="iconfont icon-setting"></i>
          <span>{{$t('menu.setting')}}</span>
        </router-link>
      </li>
    </ul>
    <!-- /.sidebar-menu -->
  </section>
  <!-- /.sidebar -->
</template>

<script>
import * as auth from '../services/AuthService'

export default {
  name: "SidebarLeft",
  data() {
    return {
      user: 'seller',
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      var routerParams = auth.getUserBaseInfo().loginRole;
      // 将数据放在当前组件的数据内
      this.user = routerParams;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  .sidebar-menu {
    font-size: 16px;
    .treeview {
      a {
        color: #252525;
        font-size:16px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        padding: 12px 5px;
        i {
          font-size: 28px;
        }
        span {
            padding-left: 5px;
        }
      }
      .treeview-menu {
        background: #ffffff;
      }
    }
    .menu-open {
      a {
        color: #8eb357;
        background: #f2f2f2;
      }
      .treeview-menu {
        background: #f2f2f2;
        a {
          padding-left: 65px;
        }
      }
    }
    .treeview:hover {
      background: #f2f2f2;
      a {
        color: #8eb357;
        background: #f2f2f2;
        i {
          font-size: 35px;
          transition: 1.2s;
        }
      }
      .treeview-menu {
        background: #f2f2f2;
      }
    }
  }
}
</style>
