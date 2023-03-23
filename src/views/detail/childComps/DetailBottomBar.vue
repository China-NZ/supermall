<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- 子组件 -->
    <sport-ball ref='ball' class="sport-ball"></sport-ball>
  </div>
</template>
<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart(){
        // console.log('点击添加到购物车中');
        this.$emit('addToCart')
      }
    },
  };
</script>
<style scoped>
.bottom-bar{
  height: 49px;
  background-color: rgb(235, 227, 227);

  /* position: relative;
  bottom: 49px; */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}

.bar-item {
    flex: 1;
    display: flex;
}
.bar-item>div {
    flex: 1;
    text-align: center;
}
.bar-item .text {
    font-size: 13px;
}
.bar-item .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin:4px auto 3px;
    background: url(~assets/images/detail/detail_bottom.png) 0 0/100%;
}
.bar-item .service {
    background-position:0 -52px;
}
.bar-item .shop {
    background-position: 0 -98px;
}
.bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
}
.bar-right .cart {
    background: #ffe817;
    color: #333;
}
.bar-right .buy {
    background: #f69;
}
</style>