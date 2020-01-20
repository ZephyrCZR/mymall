import { debounce, throttle } from "./utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    itemImgListener: null
  },

  mounted() {
     // 刷新可滚动页面长度
     const refresh = debounce(this.$refs.scroll.refresh,200)
    // const refresh = throttle(this.$refs.scroll.refresh,200)

     this.itemImgListener = () => {
       refresh()
       console.log('hhh');
     }
     this.$bus.$on('itemImgLoaded', this.itemImgListener)
  }
}

export const backTopButton = {
  components: {
    BackTop
  },
  data() {
    return {showBackTopBtn: false}
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    showBackTopBtnListener(topY) {
      // 判断是否显示backTop按钮
      this.showBackTopBtn = topY > 500      
    }
  },  
}