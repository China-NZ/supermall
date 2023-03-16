<template>
  <div>
    <router-view />
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banner="banner"/>
    <recommend-view :recommend="recommend"/>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import { getHomeMultidata } from "network/home"

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  // 网络请求获取的数据 生命周期
  created() {
    // 请求多个数据
    getHomeMultidata().then((result) => {
      this.banner = result.data.banner.list;
      this.recommend = result.data.recommend.list;
    });
  },
};
</script>
<style>
.home-nav {
  color: #fff;
  /* 关联css文件当中的root设置好的颜色 */
  /* background-color: var(--color-tint); */
  background-color: pink;
}
</style>
