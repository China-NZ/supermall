<template>
  <swiper>
    <template #swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <template #slide>
          <a :href="item.link">
            <!-- <img :src="item.link" alt="轮播图图片"> -->
            <img src="~@/assets/images/common/back.svg" alt="" />
          </a>
        </template>
      </swiper-item>
    </template>
  </swiper>
</template>
<script>
// 导入轮播图函数  Swiper, SwiperItem
// 没有js 文件的情况下
/* import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem' */
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem 
  }
};
</script>
<style scoped>
</style>