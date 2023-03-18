<template>
      <tab-bar>
      <!-- path="" 父类传给子类静态的数据，如果要传入动态的数据 :path="" -->
      <!-- 动态的传入字体属性，不给就默认属性  -->
      <tab-bar-item path="/home" activeColor="#c3d08b">
          <template v-slot:item-icon>
            <!-- F:\2022.12前端\学习文件demo\mallproject\supermall\src\assets\images\tabbar\home.svg -->
            <!-- <img src="../../../assets/images/tabbar/home.svg" alt=""> -->
            <img src="~@/assets/images/tabbar/home.svg" alt="">
          </template>
          <template v-slot:item-icon-active>
            <img src="../../../assets/images/tabbar/home_active.svg" alt="">
          </template>
          <template #item-text>
              <div>首页</div>
          </template>
      </tab-bar-item>
      
      <tab-bar-item path="/Category">
          <img slot="item-icon" src="../../../assets/images/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="../../../assets/images/tabbar/category_active.svg" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor="pink">
          <img slot="item-icon" src="../../../assets/images/tabbar/cart.svg" alt="">
          <img slot="item-icon-active" src="../../../assets/images/tabbar/cart_active.svg" alt="">
          <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <template v-slot:item-icon>
            <img src="../../../assets/images/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
            <img src="../../../assets/images/tabbar/profile_active.svg" alt="">
        </template>
        <template #item-text>
            <div>我的</div>
        </template>
      </tab-bar-item>

    </tab-bar>
</template>
<script>
  // 在webpack.base.conf.js文件中设置路径别名，节约导入和图片路径的复杂度
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: 'MainTabBar',
    components:{
      TabBar,
      TabBarItem
    }
  };
</script>
<style scoped>
</style>