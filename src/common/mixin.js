import { debounce } from "./utils";

export const itemListenerMixin = {
  data() {
    itemImgListener: null
  },

  mounted() {
     // 刷新可滚动页面长度
     const refresh = debounce(this.$refs.scroll.refresh,200)
     this.itemImgListener = () => {
       refresh()
     }
     this.$bus.$on('itemImgLoaded', this.itemImgListener)
  }
}