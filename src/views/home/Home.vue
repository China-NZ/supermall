<template>
  <div id="home">
    <!-- <router-view /> -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 这里可以使用 v-if 或者v-show来展示是否显示 -->
    <tab-control
      class="tab-control"
      :tabcontrol="tabcontrol"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="i"
    />
    <!-- :probeType 是否开启监听鼠标移动位置 默认不监听 -->
    <b-scroll
      class="content"
      ref="bscroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="contentPullIngUp"
    >
      <template #wrapper>
        <home-swiper :banner="banner" @homeSwiperImg="homeSwiperImg" />
        <recommend-view :recommend="recommend" />
        <feature-view />
        <!-- v-on:tabClick => TabControl文件里面返回的数据 -->
        <tab-control
          :tabcontrol="tabcontrol"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <!-- 测试数据 -->
        <ul>
          <li>数据列表1</li>
          <li>数据列表2</li>
          <li>数据列表3</li>
          <li>数据列表4</li>
          <li>数据列表5</li>
          <li>数据列表6</li>
          <li>数据列表7</li>
          <li>数据列表8</li>
          <li>数据列表9</li>
          <li>数据列表10</li>
          <li>数据列表11</li>
          <li>数据列表12</li>
          <li>数据列表13</li>
          <li>数据列表14</li>
          <li>数据列表15</li>
          <li>数据列表16</li>
          <li>数据列表17</li>
          <li>数据列表18</li>
          <li>数据列表19</li>
          <li>数据列表20</li>
          <li>数据列表21</li>
          <li>数据列表22</li>
          <li>数据列表23</li>
          <li>数据列表24</li>
          <li>数据列表25</li>
          <li>数据列表26</li>
          <li>数据列表27</li>
          <li>数据列表28</li>
          <li>数据列表29</li>
          <li>数据列表30</li>
          <li>数据列表31</li>
          <li>数据列表32</li>
          <li>数据列表33</li>
          <li>数据列表34</li>
          <li>数据列表35</li>
          <li>数据列表36</li>
          <li>数据列表37</li>
          <li>数据列表38</li>
          <li>数据列表39</li>
          <li>数据列表40</li>
          <li>数据列表41</li>
          <li>数据列表42</li>
          <li>数据列表43</li>
          <li>数据列表44</li>
          <li>数据列表45</li>
          <li>数据列表46</li>
          <li>数据列表47</li>
          <li>数据列表48</li>
          <li>数据列表49</li>
          <li>数据列表50</li>
          <li>数据列表51</li>
          <li>数据列表52</li>
          <li>数据列表53</li>
          <li>数据列表54</li>
          <li>数据列表55</li>
          <li>数据列表56</li>
          <li>数据列表57</li>
          <li>数据列表58</li>
          <li>数据列表59</li>
          <li>数据列表60</li>
          <li>数据列表61</li>
          <li>数据列表62</li>
          <li>数据列表63</li>
          <li>数据列表64</li>
          <li>数据列表65</li>
          <li>数据列表66</li>
          <li>数据列表67</li>
          <li>数据列表68</li>
          <li>数据列表69</li>
          <li>数据列表70</li>
          <li>数据列表71</li>
          <li>数据列表72</li>
          <li>数据列表73</li>
          <li>数据列表74</li>
          <li>数据列表75</li>
          <li>数据列表76</li>
          <li>数据列表77</li>
          <li>数据列表78</li>
          <li>数据列表79</li>
          <li>数据列表80</li>
          <li>数据列表81</li>
          <li>数据列表82</li>
          <li>数据列表83</li>
          <li>数据列表84</li>
          <li>数据列表85</li>
          <li>数据列表86</li>
          <li>数据列表87</li>
          <li>数据列表88</li>
          <li>数据列表89</li>
          <li>数据列表90</li>
          <li>数据列表91</li>
          <li>数据列表92</li>
          <li>数据列表93</li>
          <li>数据列表94</li>
          <li>数据列表95</li>
          <li>数据列表96</li>
          <li>数据列表97</li>
          <li>数据列表98</li>
          <li>数据列表99</li>
          <li>数据列表100</li>
        </ul>
        <!-- 不能写死，要不然商品栏哪里，不管怎么点击都是这个接口数据 -->
        <!-- <goods-list :goodlist="goods['pop'].list"/> -->
        <goods-list :goodlist="showGoods" />
      </template>
    </b-scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>
<script>
// 公用组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "components/common/bscroll/BScroll";
import BackTop from "components/content/backTop/BackTop";
// 页面组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 导入的函数方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      //粘性定位哪里的数据，这个由使用者自行录入或者请求接口获取到
      tabcontrol: ["流行", "新款", "精选"],
      //选项卡下的数据，从接口获取数据,因为数据结构复杂，使用对象包裹对象
      goods: {
        // pop对应流行下的数据，page页码，list每页的具体数据 下面一一对应上面的
        pop: { page: 0, list: [] },
        news: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop:0,
      i:false,
      saveY:0,
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BScroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    BackTop,
  },
  // 网络请求获取的数据 生命周期
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("news");
    this.getHomeGoods("sell");
  },
  // 生命周期 销毁
  destroyed() {
    console.log('home destroyed');
  },
  // 活跃
  activated() {
    this.$refs.bscroll.scrollTo(0,this.saveY,0)
    // 重新计算位置
    this.$refs.bscroll.refresh()
  },
  // 不活跃
  deactivated() {
    // 方法一
    /* this.saveY=this.$refs.bscroll.scroll.y */
    // 方法二 在封装的BScroll插件中 封装成一个函数 ，用来调用
    this.saveY=this.$refs.bscroll.getScrollY()
    console.log(this.saveY);
  },
  mounted() {
    // 3.监听GoodsListItem组件中的item中图片加载完成
    // 4.刷新频繁的防抖函数处理
    const refresh = debounce(this.$refs.bscroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      // this.$refs.bscroll.refresh()
      refresh()
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 封装一层网络请求接口的数据
    getHomeMultidata() {
      getHomeMultidata().then((result) => {
        this.banner = result.data.banner.list;
        this.recommend = result.data.recommend.list;
      });
    },
    // 商品接口数据 接口有问题，看操作逻辑，数据无法展示
    getHomeGoods(type) {
      // 需要动态的获取请求那个页面的数据，页码数
      const page = this.goods[type].page + 1; // 页码数
      getHomeGoods(type, page).then((result) => {
        this.goods[type].list.push(...result.data.list);
        this.goods[type].page += 1;
        // 调用方法，使其上拉加载数据，可以重复使用
        this.$refs.bscroll.finishPullUp();
      });
    },
    // 事件监听相关的方法 子组件传入到父组件的数据接收
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "news";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log(this.$refs.tabControl1.currentIndex);
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    backClick() {
      console.log(this.$refs.bscroll)
      // scrollTo(X坐标,y坐标,等待时间)
      // this.$refs.bscroll.scroll.scrollTo(0,0,1000)
      this.$refs.bscroll.scrollTo(0, 0);
    },
    homeSwiperImg() {
      // 5.获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      /* console.log(this.$refs.tabControl.$el.offsetTop); */
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
    //从BScroll组件中传递过来的坐标
    contentScroll(position) {
      // console.log(position);
      this.isShow = -position.y > 1000;

      this.i =(-position.y)>this.tabOffsetTop
    },
    // 上拉加载数据
    contentPullIngUp() {
      console.log("上拉加载更多的方法");
      this.getHomeGoods(this.currentType);
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  /* 视口标签 */
  height: 100vh;
}
.home-nav {
  color: #fff;
  /* 关联css文件当中的root设置好的颜色 */
  /* background-color: var(--color-tint); */
  background-color: pink;
  /* 在使用浏览器原生的滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1; */
}
.tab-control{
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}
/* 选项卡这里设置的粘性定位，无法生效 因为使用了BScroll插件导致的*/
/* 
.tab-control {  
  position: sticky;
  top: 44px;
  z-index: 1;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content {
  height: calc(100%-93px);
  background-color: red;
  overflow: hidden;
  margin-top: 44px;
} */
</style>
