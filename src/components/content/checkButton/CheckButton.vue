<template>
  <div class="check-button" :class="{check:isChecked}" @click="checkClick">
    <img src="~assets/images/cart/tick.svg" alt="图片">
  </div>
</template>
<script>
  export default {
    name: 'CheckButton',
    props:{
      isChecked:{
        type:Boolean,
        default: false
      }
    },
    methods: {
      checkClick(){
        this.$emit('checkClick',this.isChecked)
      }
    },
  };
</script>
<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check{
  background-color: red;
  border-color: red;
}
</style>