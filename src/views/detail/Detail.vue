<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"/>
    <!-- 插件 -->
    <b-scroll class="content" ref="bscroll">
      <!--DetailSwiper top轮播图 top-images或者goods对应的是子组件里面的props需要父组件传递过去的数据-->
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-info :detail-info="detailInfo" @InfoImgLoad="InfoImgLoad"/>
    <detail-param-info :param-info="paramInfo"/>
    </b-scroll>
  </div>
</template>
<script>
import BScroll from 'components/common/bscroll/BScroll';

import { getDetail,Goods,Shop,GoodsParam} from "network/detail";

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailInfo from './childComps/DetailInfo'
import DetailParamInfo from './childComps/DetailParamInfo'


  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailInfo,
      DetailParamInfo,
      BScroll,
        
    },
    data() {
      return {
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{}
      }
    },
    created() {
      // 1.保存传入的id
      this.id=this.$route.params.id

      // 2.根据id请求详情数据
      getDetail(this.id).then((res) => {
        // 1.通过接口获取图片轮播数据
        console.log(res)
        // result.itemInfo.topImages 接口里面的数据存储路径
        // this.topImages=res.result.itemInfo.topImages
        const data = res.result
        this.topImages=data.itemInfo.topImages

        // 2.获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3.创建店铺信息的对象，获取商铺信息
        this.shop=new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo=data.detailInfo

        // 5.保存商品的参数详情数据
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      }).catch((err) => {
        console.log('接口获取数据失败'+err);
      })
    },
    methods: {
      InfoImgLoad(){
        // 图片加载完成之后，重新计算高度，防止出现高度问题
        this.$refs.bscroll.refresh()
      }
    },
  };
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 99;
  background-color: pink;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 0;
  background-color: pink;
}
.content{
  height: calc(100%-44px);
}
</style>