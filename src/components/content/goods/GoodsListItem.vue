<template>
  <div class="goods-list-item">
    <!-- 通过父传子方法从上一级组件哪里获取到详细的商品数据 -->
    <img
      :src="showImages"
      alt="商品图片"
      @load="imageLoad"
      @click="itemClick"
    />
    <div class="goods-info">
      <p>{{ goodslistitem.title }}</p>
      <span class="price">{{ goodslistitem.price }}</span>
      <span class="collect">{{ goodslistitem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodslistitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 通过事件总线，把监听到的图片信息发射出去
    imageLoad() {
      // 多个组件复用这个组件内容，从而使监听图片的信息发送出去，谁接收需要判断区分
      // 方法一 在Home.vue 和Detail.vue中都注释起来了
      /* if (this.$route.path.indexOf("/home") !== -1) {
        // $bus是undefined 要去main.js里面添加原型链
        // console.log(this.$bus);
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailitemImageLoad");
      } */
      // 方法二 使用混入
      this.$bus.$emit('itemImgLoad')
    },
    itemClick() {
      // console.log('跳转到详情页');
      // 方法一 动态路由传递参数 this.goodslistitem.iid对应路由中的id
      // this.$router.push('/detail/'+ this.goodslistitem.iid)
      // 方法二
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodslistitem.iid,
        },
      });
    },
  },
  // 计算属性
  computed: {
    showImages() {
      // 判断传递进来展示的数据，是哪个接口的
      return this.goodslistitem.image || this.goodslistitem.show.img;
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 8px;
}
.goods-info {
  text-align: center;
  padding: 3px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
  font-size: 14px;
}
.goods-info p {
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
.goods-info .collect::before {
  content: "";
  position: absolute;
  top: 0;
  left: -16px;
  width: 14px;
  height: 14px;
  background: url("~@/assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>