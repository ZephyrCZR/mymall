<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time);
    }
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BScroll('.wrapper',{
      click: true,  //控制是否可以点击(只是控制div,button没关系)
      probeType: this.probeType
    })

    // 2. 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    })
  }
}
</script>

<style scoped>

</style>