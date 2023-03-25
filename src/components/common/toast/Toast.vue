<template>
  <div class="toast" v-show="toastShow">
   <div> {{toastMessage}}</div>
  </div>
</template>
<script>
  export default {
    name: 'Toast',
    // 父传子组件数据，使用了封装插件的情况下，不需要这个传递了
    props:{
      /* toastMessage:{
        type:String,
        default(){
          return ''
        },
        toastShow:{
          type:Boolean,
          default(){
            return false
          }
        }
      } */
    },
    data() {
      return {
        toastMessage:'',
        toastShow:false
      }
    },
    methods: {
      // ES6语法 直接在默认参数当中添加默认值
      show(message='默认文字',duration=2000){
        // ES5语法
        // duration = duration || 20000
        this.toastShow = true
        this.toastMessage = message
        setTimeout(()=>{
          this.toastShow=false
          this.toastMessage = ''
        },duration)
      }
    },
  };
</script>
<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, .7);
  z-index: 999;
}
</style>