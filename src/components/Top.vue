<template>
    <section class="Head">
      <!-- Logo -->
      <router-link :to="{path : '/map'}" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><img src="/static/img/uranus/urans_icon.png" alt=""></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><img src="/static/img/uranus/head.png" alt=""></span>
      </router-link>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <div href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </div>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
          
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img src="/static/img/uranus/starter/user.jpg" class="user-image" alt="Image">
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs">Alexander Pierce</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img src="/static/img/uranus/starter/user.jpg" class="img-circle" alt="User Image">
                <button @click="logout"> Logout </button>
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <router-link :to="{path: '/map'}" class="btn btn-default btn-flat">Sign out</router-link>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <!-- <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li> -->
        </ul>
      </div>
    </nav>
    </section>
</template>

<script>
    import * as auth from '../services/AuthService'

export default {
  name: 'Head',
    methods: {
      logout(){
          auth.logout()
          if(!this.$store.state.userName)
              this.$router.push({ name: 'Map' })
      }
    }

}
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
    }
  }
  
</style>
