import { debounce } from "./utils"

// vue高级属性 混入功能
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.bscroll.refresh,100)
    this.itemImgListener = ()=>{
      newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('我是混入的内容');
  },
}