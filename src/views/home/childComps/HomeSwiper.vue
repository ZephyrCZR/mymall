<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.title">
      <a href="#">
        <img :src="item.image" alt="图片" @load="imgLoaded">
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
      isImgLoaded: false
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
      if(!this.isImgLoaded){
        this.$emit('swiperLoaded')
        this.isImgLoaded = true
      }            
    }
  }

}
</script>

<style>

</style>