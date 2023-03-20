<template>
  <swiper class="swiper">
    <template #swiper>
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <template #slide>
          <img :src="item.link" alt="详情页轮播图">
        </template>
      </swiper-item>
    </template>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped>
.swiper{
  height: 300px;
  overflow: hidden;
}
</style>