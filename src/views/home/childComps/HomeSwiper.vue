<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.title">
      <a href="#">
        <img :src="item.image" alt="图片" @load.once="imgLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      imgCounter: 0
    }    
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoaded() {
      this.$emit('swiperLoaded')
      this.imgCounter++
    }
  }

}
</script>

<style>

</style>