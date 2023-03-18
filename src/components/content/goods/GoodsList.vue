<template>
  <div class="goods-list">
    <!-- 通过父传子方法从父组件哪里获取到的商品数据 -->
    <!-- {{goodlist}} -->
    <goods-list-item v-for="(item,index) in goodlist" :key="index" :goodslistitem="item" />
  </div>
</template>
<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
  export default {
    name: 'GoodsList',
    components:{
      GoodsListItem,
    },
    props:{
      goodlist:{
        type:Array,
        default(){
          return []
        }
      }
    }
  };
</script>
<style scoped>
.goods-list {
    display: flex;
    width: 100%;
    /* 根据图片的设置宽度，来进行换行 */
    flex-wrap: wrap;
    /* 设置图片内容进行均等分 */
    justify-content: space-around;
}
</style>