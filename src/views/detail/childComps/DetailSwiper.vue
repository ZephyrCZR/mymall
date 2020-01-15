<template>
  <swiper class="detail-swiper" v-if="topImgs.length">
    <swiper-item class="swiper-item" v-for="(item, index) in topImgs" :key="index">
      <img class="top-img" :src="item" alt="图片" @load="imgLoaded">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoaded() {
      this.$emit('swiperLoaded')
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
    position: relative;
  }
  .top-img {
    position: absolute;
    top: -100px;
  }
</style>