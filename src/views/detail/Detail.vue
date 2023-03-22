<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @indexClick="indexClick" ref="navbar" />
    <!-- 插件 -->
    <b-scroll
      class="content"
      ref="bscroll"
      @scroll="contentScroll"
      :probeType="2"
    >
      <!--DetailSwiper top轮播图 top-images或者goods对应的是子组件里面的props需要父组件传递过去的数据 属性：topImages  传入值：top-images -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info :detail-info="detailInfo" @InfoImgLoad="InfoImgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comments" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goodslist="recommends" />
    </b-scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar/>
    <!-- 返回顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShow" />
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
import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";
/* import BackTop from "components/content/backTop/BackTop"; */

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar';

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
    DetailBottomBar,
    BScroll,
    GoodsList,
    
  },
  // 混入对象的数组功能使用
  mixins: [itemListenerMixin,backTopMixin],
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
      themeTopYs: [],
      getthemTopY: null,
      contentIndex:0,
      
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
        // 方法一 获取各数据的位置值 Y
        /* this.$nextTick(() => {
          // 第一次获取：值不对
          // 值不对的原因：图片没有计算在内
          // 根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
          // offsetTop值不对的时候，都是因为图片的问题
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs)
        }) */
      })
      .catch((err) => {
        console.log("接口获取数据失败" + err);
      });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4.给getthemTopY赋值(对给this.getthemTopY赋值的操作进行防抖)
    this.getthemTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 多加一个Y值
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    },100);
  },
  // mixins混入的使用，不需要生命周期函数进行使用
  mounted() {
    /* 
    // 3.监听GoodsListItem组件中的item中图片加载完成
    // 4.刷新频繁的防抖函数处理
    const newRefresh = debounce(this.$refs.bscroll.refresh, 50);
    this.$bus.$on("detailitemImageLoad", () => {
      // this.$refs.bscroll.refresh()
      newRefresh();
    }); */
  },
  // 方法二 获取各数据的位置值 Y
  /* updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    console.log(this.themeTopYs);
  }, */
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    InfoImgLoad() {
      // 图片加载完成之后，重新计算高度，防止出现图片加载完成，导致的高度问题
      this.$refs.bscroll.refresh();

      // 获取各数据位置的Y值
      this.getthemTopY()
    },
    indexClick(index) {
      // console.log(index);
      // 点击详情页头部栏，要滚入到对应的地方
      this.$refs.bscroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position){
      // 1.获取Y值
      const positionY = -position.y

      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length
      for(let i=0;i<length-1;i++){ // 赋值是为了确保传入的数值为number类型，不是str类型
      // 方法一 length-1
      if(this.contentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
        this.contentIndex = i
        this.$refs.navbar.currIndex=this.contentIndex
      }
        // 方法二 length
        /* if(this.contentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===length-1 && positionY>=this.themeTopYs[i]))){
          this.contentIndex = i
          this.$refs.navbar.currIndex=this.contentIndex
        } */
      }
      // 是否显示回到顶部 不能抽取到mixin中，除非把这个封装为一个函数，在这里面调用，把函数抽取进去
      this.isShow = -position.y > 1000;
      // this.listenShowBackTop(position)
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
  background-color: #fff;
}
.content {
  height: calc(100%-44px-49px);
}
</style>