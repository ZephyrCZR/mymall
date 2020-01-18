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
    name: 'ScrollCopy',
    data() {
      return {
        scrollcopy: null
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
      },
      stopPropagation: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scrollcopy && this.scrollcopy.scrollTo && this.scrollcopy.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scrollcopy && this.scrollcopy.finishPullUp()
      },
      refresh() {
        this.scrollcopy && this.scrollcopy.refresh()
      },
      getScrollY() {
        return this.scrollcopy ? this.scrollcopy.y : 0
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.scrollcopy = new BScroll('.wrapper', {
        click: true, //控制是否可以点击(只是控制div,button没关系)
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        stopPropagation: this.stopPropagation
      })

      // 2. 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scrollcopy.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件(滚动到底部)
      if (this.pullUpLoad) {
        this.scrollcopy.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }

</script>

<style scoped>

</style>
