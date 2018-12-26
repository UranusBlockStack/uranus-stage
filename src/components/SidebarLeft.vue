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
      <li class="treeview">
        <router-link :to="{path: '/seller'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.index')}}S</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/buyer'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.index')}}B</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/developer'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.index')}}D</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/applicationmarket'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.appMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/applicationrepository'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.appRepository')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/resourcemarket'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.resourceMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.myResource')}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </router-link>
        <ul class="treeview-menu">
          <li>
            <a href="#"><i class="fa fa-link"></i>{{$t('menu.myResource1')}}</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-link"></i>{{$t('menu.myResource2')}}</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-link"></i>{{$t('menu.myResource3')}}</a>
          </li>
        </ul>
      </li>
      <li class="treeview">
        <a href="#">
          <i class="fa fa-link"></i>
          <span>出售资源</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li>
            <a href="#"><i class="fa fa-link"></i>我的资源</a>
          </li>
        </ul>
      </li>
      <li class="treeview">
        <a href="#">
          <i class="fa fa-link"></i>
          <span>上传应用</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li>
            <a href="#"><i class="fa fa-link"></i>我的应用</a>
          </li>
        </ul>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/wallet'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.wallet')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/transfer'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.transfer')}}</span>
        </router-link>
      </li>
      <li class="treeview">
        <router-link :to="{path: '/setting'}">
          <i class="fa fa-link"></i>
          <span>{{$t('menu.setting')}}</span>
        </router-link>
      </li>
    </ul>
    <!-- /.sidebar-menu -->
  </section>
  <!-- /.sidebar -->
</template>

<script>
export default {
  name: 'SidebarLeft'
}
</script>

<style lang="scss" scoped>
.sidebar {
  .sidebar-menu {
    font-size:15px;
    font-family:PingFang-SC-Heavy;
    .treeview {
      a {
        color:#8eb357;
      }
      .treeview-menu {
        background: #ffffff;
      }
    }
    .menu-open {
      a {
        color: #252525;
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
        color: #252525;
        background: #f2f2f2;
      }
      .treeview-menu {
        background: #f2f2f2;
      }
    }
  }
}
</style>
