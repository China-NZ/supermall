<template>
<!-- 商品栏切换效果 -->
  <div class="tab-control">
    <div v-for="(item,index) in tabcontrol" :key="index" class="tab-control-item" :class="{active:index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TabControl',
    props:{
      tabcontrol:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        currentIndex:0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex=index
        // 子传父，数据参数
        this.$emit('tabClick',index)
      }
    },
  };
</script>
<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  font-size: 15px;
}
.tab-control-item{
  flex: 1;
}
.active{
  /* color: #ff001a; */
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid red;
  padding: 4px;
}
</style>