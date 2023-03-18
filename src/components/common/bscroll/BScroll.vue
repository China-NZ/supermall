<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot name="wrapper"></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
// 1.安装插件
BScroll.use(PullUp);

export default {
  name: "BScroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建实例化对象
    // this.scroll = new BScroll(".wrapper", {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 监听鼠标滑动坐标，鼠标停止即结束，惯性滑动不监听
      // probeType: 2,
      probeType: this.probeType,
      // 下拉加载
      pullUpLoad: this.pullUpLoad,
      // 使其他链接标签，能够被点击跳转
      click: true,
    });
    // 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 自定义事件，传递给那些主组件里面去
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("下拉加载更多");
      // 自定义事件，传递给其他组件
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    // 封装方法
    finishPullUp() {
      // 设置定时器，规定多久可以进行一次上拉加载
      setTimeout(() => {
        // 提供下一次上拉加载
        this.scroll.finishPullUp();
      }, 2000);
    },
  },
};
</script>

<style scoped>
</style>