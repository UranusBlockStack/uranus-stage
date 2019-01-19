<template>
  <div class="wrapper">
    <!-- Main Header -->
    <header class="main-header">
      <Top/>
    </header>

    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <SidebarLeft/>
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->
    <!-- Main Footer -->
    <!-- <footer class="main-footer"> -->
    <!-- To the right -->
    <!-- <div class="pull-right hidden-xs">
      Anything you want
    </div>-->
    <!-- Default to the left -->
    <!-- <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
    </footer>-->
    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <SiderbarRight/>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar-->
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
import Top from './Top'
import SidebarLeft from './SidebarLeft'
import SiderbarRight from './SiderbarRight'

export default {
  name: 'Starter',
  components: {
    Top,
    SidebarLeft,
    SiderbarRight
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: url(/static/img/uranus/bg-blue.png) no-repeat;
  background-size: cover;
}
.main-header {
    background:rgba(101,143,247,0.00);
box-shadow:inset 0 0 22px 0 rgba(36,99,255,0.50);
}
.content-wrapper {
    background:rgba(101,143,247,0.00);
}
.main-sidebar {
  background:rgba(101,143,247,0.00);
box-shadow:inset 0 0 22px 0 rgba(36,99,255,0.50);
}
</style>
