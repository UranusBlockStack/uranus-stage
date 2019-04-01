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
    <!-- <aside class="control-sidebar control-sidebar-dark">
      <SiderbarRight/>
    </aside> -->
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
}
</script>

<style lang="scss" scoped>
.wrapper {
  background:#000;
}
.content-wrapper {
  background:#000;
}
.main-sidebar {
  background:#08080a !important;
}
</style>
