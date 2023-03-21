<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" />
    <!-- 插件 -->
    <b-scroll class="content" ref="bscroll">
      <!--DetailSwiper top轮播图 top-images或者goods对应的是子组件里面的props需要父组件传递过去的数据-->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info :detail-info="detailInfo" @InfoImgLoad="InfoImgLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goodslist="recommends" />
    </b-scroll>
  </div>
</template>
<script>
import BScroll from "components/common/bscroll/BScroll";
// 导入这个组件，复用这个组件，显示推荐数据展示
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
// import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    BScroll,
    GoodsList,
  },
  // 混入对象的数组功能使用
  mixins: [itemListenerMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    };
  },
  created() {
    // 1.保存传入的id
    // 方法一
    // this.id=this.$route.params.iid
    // 方法二
    this.id = this.$route.query.iid;

    // 2.根据id请求详情数据
    getDetail(this.id)
      .then((res) => {
        // 1.通过接口获取图片轮播数据
        console.log(res);
        // result.itemInfo.topImages 接口里面的数据存储路径
        // this.topImages=res.result.itemInfo.topImages
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 3.创建店铺信息的对象，获取商铺信息
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.保存商品的参数详情数据
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 6.保存商品的评论信息数据
        if (data.rate.cRate !== 0) {
          //判断接口是否有数据，上面其他的获取数据，都在html中进行了判断，任选一种方法
          this.commentInfo = data.rate.list[0];
        }
      })
      .catch((err) => {
        console.log("接口获取数据失败" + err);
      });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
  },
  // mixins混入的使用，不需要生命周期函数进行使用
  mounted() {/* 
    // 3.监听GoodsListItem组件中的item中图片加载完成
    // 4.刷新频繁的防抖函数处理
    const newRefresh = debounce(this.$refs.bscroll.refresh, 50);
    this.$bus.$on("detailitemImageLoad", () => {
      // this.$refs.bscroll.refresh()
      newRefresh();
    }); */
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    InfoImgLoad() {
      // 图片加载完成之后，重新计算高度，防止出现高度问题
      this.$refs.bscroll.refresh();
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: rgb(110, 110, 110);
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 0;
  background-color: pink;
}
.content {
  height: calc(100%-44px);
}
</style>