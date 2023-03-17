<template>
  <div id="home">
    <router-view />
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banner="banner"/>
    <recommend-view :recommend="recommend"/>
    <feature-view/>
    <!-- v-on:tabClick => TabControl文件里面返回的数据 -->
    <tab-control class="tab-control" :tabcontrol="tabcontrol"
    @tabClick="tabClick"/>
    <!-- 不能写死，要不然商品栏哪里，不管怎么点击都是这个数据 -->
    <!-- <goods-list :goodlist="goods['pop'].list"/> -->
    <goods-list :goodlist="showGoods"/>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul>
  </div>
</template>
<script>
// 公用组件
import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

// 页面组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
// 导入的函数方法
import { getHomeMultidata,getHomeGoods } from "network/home"


export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      //粘性定位哪里的数据，这个由使用者自行录入或者请求接口获取到
      tabcontrol:['流行','新款','精选'],
      //选项卡下的数据，从接口获取数据,因为数据结构复杂，使用对象包裹对象
      goods:{
        // pop对应流行下的数据，page页码，list每页的具体数据 下面一一对应上面的
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,

  },
  // 网络请求获取的数据 生命周期
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('news')
    this.getHomeGoods('sell')
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // 封装一层网络请求接口的数据
    getHomeMultidata(){
      getHomeMultidata().then((result) => {
      this.banner = result.data.banner.list;
      this.recommend = result.data.recommend.list;
      })
    },
    // 商品接口数据 接口有问题，看操作逻辑，数据无法展示
    getHomeGoods(type){
      // 需要动态的获取请求那个页面的数据，页码数
      const page=this.goods[type].page+1 // 页码数
      getHomeGoods(type,page).then(result=>{
        this.goods[type].list.push(...result.data.list)
        this.goods[type].page +=1
      })
    },
    // 事件监听相关的方法 子组件传入到父组件的数据接收
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='news'
          break
        case 2:
          this.currentType='sell'
          break
      }
      console.log(this.currentType);
    },
  },
};
</script>
<style>
#home{
  padding-top: 44px;
}
.home-nav {
  color: #fff;
  /* 关联css文件当中的root设置好的颜色 */
  /* background-color: var(--color-tint); */
  background-color: pink;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}
.tab-control{
  position:sticky;
  top: 44px;
  z-index: 1;
}
</style>
