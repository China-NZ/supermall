<template>
  <div class="cart">
    <!-- 头部导航 -->
    <nav-bar class="nav-bar">
      <template #center>
        <!-- <div>购物车({{$store.state.cartList.length}})</div> -->
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters} from 'vuex'
import CartList from './childComps/CartList';

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    /* cartLength(){
      return this.$store.state.cartList.length
    } */
    // 两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength'
    })
  },
};
</script>
<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: pink;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
</style>