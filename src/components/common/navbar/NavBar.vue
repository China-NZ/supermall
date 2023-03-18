<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
  export default {
    name: 'NavBar'
  };
</script>
<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  /* 设置阴影 */
  box-shadow: 0 1px 1px rgba(100, 100, 100, .3);
}
.left,.right{
  width: 80px;
  /* background-color: #726e6e; */
}
.center{
  flex: 1;
  /* background-color: pink; */
}
</style>