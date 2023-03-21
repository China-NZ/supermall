<template>
  <div>
    <!-- 具名插槽 -->
    <nav-bar>
      <template #left>
        <!-- 返回按钮 -->
        <div class="back" @click="backClick">
          <img src="~assets/images/common/back.svg" alt="返回按钮">
        </div>
      </template>
      <template #center>
        <div class="titles">
          <!-- 导航栏内容 -->
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{ active: index === currIndex }"
            @click="indexClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currIndex: 0,
    };
  },
  methods: {
    indexClick(index) {
      this.currIndex = index;
    },
    backClick(){
      // 返回上一层级
      this.$router.back()
    }
  },
};
</script>
<style scoped>
.titles {
  display: flex;
  font-size: 16px;
}
.title-item {
  flex: 1;
}
.active {
  color: red;
}
.back img{
  margin-top: 10px;
}
</style>