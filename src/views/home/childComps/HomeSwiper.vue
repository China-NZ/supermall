<template>
  <swiper>
    <template #swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <template #slide>
          <a :href="item.link">
            <!-- <img :src="item.link" alt="轮播图图片"> @load vue中监听图片的方法 -->
            <img
              src="~@/assets/images/common/back.svg"
              alt=""
              @load="homeSwiperImg"
            />
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
  data() {
    return {
      isLoad:false
    }
  },
  props: {
    banner: {
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
  methods: {
    // 通过@load 监听轮播图图片
    homeSwiperImg() {
      if(!this.isLoad){ // 发出去一次之后，不需要后续在继续发送了
        this.$emit('homeSwiperImg')
        this.isLoad=true
      }
    },
  },
};
</script>
<style scoped>
</style>