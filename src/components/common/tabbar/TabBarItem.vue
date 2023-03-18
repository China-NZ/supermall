<template>
  <div class="tabar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 字体颜色固定死的，要给使用人员动态的值，由他们决定 -->
    <!-- <div :class="{active:isActive}"> -->
    <!-- 动态绑定字体属性 -->
    <div :style="activeStyle"> 
      <slot name="item-text"></slot>
    </div>
  </div> 
</template>
<script>
  export default {
    name: 'TabBarItem',
    // 父传子，从父类哪里接收数据过来
    props:{
      // 传入过来的数据类型
      path:String,
      activeColor:{
        // 规定动态传入过来的数据类型
        type:String,
        // 默认值
        default:'red' 
      }
    },
    data() {
      return {
        // 固定死的，要动态获取到所在位置
        // isActive:true,
        // 固定死的，要动态获取到路径
        // path:'/home'
      }
    },
    computed: {
      isActive(){
        // 方法一：
        // return this.$route.path ==this.path
        // 方法二： indexOf 返回值在字符串中第一次出现的位置 如果没有则返回-1
        return this.$route.path.indexOf(this.path) !==-1
      },
      // 动态决定字体颜色属性
      activeStyle(){
        // 判断是否活跃，活跃为true 则执行传入的字体属性，否则执行的字体属性为空
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods: {
      itemClick(){
        // push 或者 replace
        this.$router.replace(this.path)
      }
    },
  };
</script>
<style scoped>
.tabar-item{
  flex: 1;
  text-align: center;
  /* line-height: 49px; */
  background: color #f6f6f6;
  font-size: 14px;
}
.tabar-item img{
  width: 24px;
  height: 24px;
  margin-top: 4px;
  /* 去除图片与文字之间的空隙 */
  vertical-align: middle;
}
/* 字体颜色固定死的，要给使用人员动态的值，由他们决定 */
/* .active{
  color: pink;
} */
</style>