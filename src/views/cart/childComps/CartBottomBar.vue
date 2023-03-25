<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="cartcheckClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
  export default {
    name: 'CartBottomBar',
    components:{
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      // this.cartList 与 $store.getters.cartList 与 $store.state.cartList 数据都是vuex里面的相同数据
      totalPrice(){
        // toFixed 保留几位小数
        return '￥'+this.$store.getters.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=> item.checked).length
      },
      // 是否全选
      isSelectAll(){
        // 1. 方法一
        // if(this.cartList.length ===0) return false
        // 四种高阶函数[filter,find,some,every]，去遍历数据，从而判断是否全选  前面三种需要先判断购物车中是否有物品存在 ，最后一种不需要判断
        // return !(this.cartList.filter(item => !item.checked).length)
        // return !this.cartList.find(item => !item.checked)
        // return !this.cartList.some(item=>!item.checked)
        // return !this.cartList.every(item=>!item.checked)
        // 2.方法二 还缺少判断购物车为空的情况 要前面加上判断
        if(this.cartList.length ===0) return false
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods: {
      cartcheckClick(){
        if(this.isSelectAll){ //全部选中
          this.cartList.forEach(element => element.checked=false);
        }else{ // 部分或全部不选中
          this.cartList.forEach(item => item.checked=true)
        }
      },
      calculateClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',3000)
        }
      }
    },
  };
</script>
<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: pink;
}
.check-content{
  display: flex;
  margin-left: 10px;
  width: 80px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-top: 10px;
  line-height: 10px;
  margin-right:5px
}
.price{
  flex: 1;
  margin-left: 60px;
}
.calculate{
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: #ddd;
}
</style>