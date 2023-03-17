<template>
  <div class="goods-list-item">
    <!-- 通过父传子方法从上一级组件哪里获取到详细的商品数据 -->
    <img src="goodslistitem.show.img" alt="商品图片">
    <div class="goods-info">
      <p>{{goodslistitem.title}}</p>
      <span class="price">{{goodslistitem.price}}</span>
      <span class="collect">{{goodslistitem.cfav}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'GoodsListItem',
    props:{
      goodslistitem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  };
</script>
<style>
.goods-list-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
}
.goods-list-item img{
    width: 100%;
    border-radius: 8px;
}
.goods-info {
    text-align: center;
    padding: 3px;
    position: absolute;
    bottom: 0px;
    left:0;
    right: 0;
    overflow: hidden;
    font-size: 14px;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 24px;
}
.goods-info .collect {
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
    width: 14px;
    height: 14px;
    background: url('~@/assets/images/common/collect.svg') 0 0/14px 14px;
}
</style>