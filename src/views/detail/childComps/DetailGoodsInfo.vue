<template>
  <div id="goods-info" v-if="Object.keys(detail).length !== 0">
    <div class="goods-desc">{{detail.desc}}</div>

    <div class="detail-img">
      <div v-for="item in detail.detailImage" :key="item.key">
        <!-- <div class="info-key">{{item.key}}</div> -->
        <div class="info-list" v-for="(item, index) in item.list" :key="index">
          <img :src="item" alt="图片" @load="imgLoaded">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/common/utils"

export default {
  name: 'DetailGoodsInfo',
  data() {
    return {
      isClock: false
    }
  },
  props: {
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 节流
    imgLoaded() {
      if(!this.isClock) {
        this.$emit('imgLoaded')
        this.isClock = true
        let timer = setTimeout(() => {
          this.isClock = false
          clearTimeout(timer)
        }, 500);
      }
    }
  }
}
</script>

<style scoped>
  #goods-info {
    padding: 20px;
    border-bottom: 4px solid #eee; 
  }
  .goods-desc {
    padding: 8px;
  }
  .info-list>img {
    width: 100%
  }
</style>