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
      <li class="treeview" v-show="user== 'Seller'">
        <router-link :to="{path: '/seller'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Buyer'">
        <router-link :to="{path: '/buyer'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Developer'">
        <router-link :to="{path: '/developer'}">
          <i class="iconfont icon-home"></i>
          <span>{{$t('menu.home')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Buyer'">
        <router-link :to="{path: '/applicationmarket'}">
          <i class="iconfont icon-application-market"></i>
          <span>{{$t('menu.appMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Buyer'">
        <router-link :to="{path: '/applicationrepository'}">
          <i class="iconfont icon-my-application"></i>
          <span>{{$t('menu.appRepository')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Buyer'">
        <router-link :to="{path: '/resourcemarket'}">
          <i class="iconfont icon-resource-market"></i>
          <span>{{$t('menu.resourceMarket')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Buyer'">
        <router-link :to="{path: '/myresource'}">
          <i class="iconfont icon-resource"></i>
          <span>{{$t('menu.myResource')}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </router-link>
        <ul class="treeview-menu">
          <li v-for="(item,index) in uraPowerList" :key="index">
            <router-link :to="{path: '/resourcepool/' + item.id + '/' + item.projectName}">
              <i class="iconfont icon-resource"></i>
              {{item.projectName}}
            </router-link>
          </li>
        </ul>
      </li>
      <li class="treeview" v-show="user== 'Seller'">
        <router-link :to="{path: '/myhost'}">
          <i class="iconfont icon-host"></i>
          <span>{{$t('menu.myHost')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Seller'">
        <router-link :to="{path: '/mycolony'}">
          <i class="iconfont icon-cluster"></i>
          <span>{{$t('menu.myColony')}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </router-link>
        <ul class="treeview-menu">
            <li v-for="(item,index) in clusterList" :key="index">
            <router-link :to="{path: '/colony/' + item.id}">
              <i class="iconfont icon-resource"></i>
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </li>
      <li class="treeview" v-show="user== 'Developer'">
        <router-link :to="{path: '/uploadapplication'}">
          <i class="iconfont icon-upload"></i>
          <span>{{$t('menu.uploadApplication')}}</span>
        </router-link>
      </li>
      <li class="treeview" v-show="user== 'Developer'">
        <router-link :to="{path: '/myapplication'}">
          <i class="iconfont icon-my-application"></i>
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
import * as project from '../services/RancherService'

export default {
  name: 'SidebarLeft',
  data() {
    return {
      user: '',
      uraPowerList: [],
      projectQuertData: {
        'page': 0,
        'pageSize': 0,
        'projectName': '',
        'sort': '',
        'sortDesc': true
      },
      clusterList: []
    }
  },
  created() {
    this.getUser()
    this.getUraPowerPoolList()
    this.getClusterList()
  },

  methods: {
    getUser() {
      this.user = auth.getUserBaseInfo().loginRole
    },
    getUraPowerPoolList() {
      project.projectList(this.$store.getters.lang, this.projectQuertData)
                .then(respData => {
                  const data = respData.data.data.records
                  this.uraPowerList = data
                })
    },
    getClusterList() {
      project.clusterSearch(this.$store.getters.lang, this.projectQuertData)
                .then(respData => {
                  const data = respData.data.data.records
                  this.clusterList = data
                })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  .sidebar-menu {
    font-size: 16px;
    .treeview {
      a {
        color: #A2A6B0;
        font-size:16px;
        font-family: Source-Sans-Pro-Bold;
        font-weight: 500;
        padding: 12px 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /*width: 135px;*/
        i {
          font-size: 28px;
        }
        span {
            padding-left: 5px;
        }
      }
      .treeview-menu {
        background: rgba(101, 143, 247, 0);
      }
    }
    .menu-open {
     > a {
        color: #a2af3c;
        background: rgba(101, 143, 247, 0);
      }
      .treeview-menu {
          padding-left: 30px;
          li:hover {
              >a {
                  color: #a2ae44;
                  background: rgba(101, 143, 247, 0);
              }
          }
      }
      
    }
    .treeview:hover {
      background: rgba(101, 143, 247, 0);
      > a {
        color: #a2ae44;
        background: rgba(101, 143, 247, 0);
        // i {
        //   font-size: 35px;
        //   transition: 1.2s;
        // }
      }

    }
  }
}
</style>
