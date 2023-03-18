<template>
    <div class='tabar'>
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'TabBar'
  };
</script>

<style scoped>
.tabar{
  position: fixed;
  bottom: 0;
  left: 0;
  right:0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, .2);

  display: flex;
  height: 49px;
  background-color: #f6f6f6;
}
</style>
