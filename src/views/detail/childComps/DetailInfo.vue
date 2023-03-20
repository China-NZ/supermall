<template>
  <div class="detail-info" v-if="Object.keys(detailinfo).length!==0">
    <div class="info-desc">
      <div class="desc">{{detailinfo.desc}}</div>
    </div>
    <div class="info-key">
      {{detailinfo.detailImage[0].key}}
    </div>
    <div class="info-list">
      <img v-for="(item,index) in detailinfo.detailImage[0].list" :key="index" :src="item" alt="detailinfo-img" @load="detailInfoImgLoad">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DetailInfo',
    data() {
      return {
        counter:0,
        imagesLength:0
      }
    },
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      detailInfoImgLoad(){
        // 判断，所有的图片都加载完了，那么进行一次回调就可以了
        /* this.counter++
        if(this.counter ===this.imagesLength) */
        // 简写
        if(++this.counter ===this.imagesLength)
        {// 这个判断是为了提升性能，不让后台出现多次回调，也可以不判断，以降低性能，提升用户体验
          this.$emit('InfoImgLoad')
        }
      }
    },
    // 监听发送出去的元素
    watch:{
      detailInfo(){
        // 获取图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  };
</script>
<style scoped>

.goods-info {
    padding: 30px 8px 0;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-desc {
    padding: 0 8px 0;
    font-size: 14px;
}
.info-desc .desc {
    text-indent: 2em;
}
.info-key {
    padding: 8px;
}
.info-list img{
    width: 100%;
}
</style>