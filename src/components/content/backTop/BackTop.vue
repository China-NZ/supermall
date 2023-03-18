<template>
  <div class="back-top">
    <img src="~assets/images/common/top.png" alt="返回顶部图片">
  </div>
</template>
<script>
  export default {
    name: 'BackTop'
  };
</script>
<style scoped>
.back-top{
  position: fixed;
  right: 8px;
  bottom: 10px;
}
.back-top img{
  width: 42px;
  height: 42px;
}
</style>