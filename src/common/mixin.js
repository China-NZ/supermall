import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";

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

export const backTopMixin = {
  components:{
    BackTop,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      console.log(this.$refs.bscroll)
      // scrollTo(X坐标,y坐标,等待时间)
      // this.$refs.bscroll.scroll.scrollTo(0,0,1000)
      this.$refs.bscroll.scrollTo(0, 0);
    },
    /* listenShowBackTop(position){
      this.isShow = -position.y > 1000;
    } */
  },
}