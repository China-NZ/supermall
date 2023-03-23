<template>
  <div>
    {{cartListItem}}
    接收到的item内容
  </div>
</template>
<script>
  export default {
    name: 'CartListItem',
    props:{
      cartListItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  };
</script>
<style scoped>
</style>