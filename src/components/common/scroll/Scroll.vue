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
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
        console.log("test scroll");
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.scroll = new BScroll('.wrapper', {
        click: true, //控制是否可以点击(只是控制div,button没关系)
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件(滚动到底部)
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }

</script>

<style scoped>

</style>
