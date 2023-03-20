<template>
  <div id="app" class="wrapper">
    <!-- 保留生命周期创建的，不销毁 exclude 排除在外 离开之后进行销毁-->
    <keep-alive exclude="Detail">
      <!-- 显示各组件内容 -->
    <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>
<style scoped>
@import "assets/css/base.css"
</style>
