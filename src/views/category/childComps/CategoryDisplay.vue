<template>
  <scroll class="category-scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp">
    <div class="category-display">
      <category-display-item class="display-item" v-for="(item, index) in subCategory" :key="index" :subInfo='item' />
    </div>
    <tab-control ref="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list class="goods-list" :goods="showGoods"/>
    <loading/>
  </scroll>
</template>

<script>
  import CategoryDisplayItem from './CategoryDisplayItem'

  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Loading from 'components/common/loading/Loading'

  export default {
    name: 'CategoryDisplay',

    components: {
      CategoryDisplayItem,

      Scroll,
      TabControl,
      GoodsList,
      Loading
    },

    data() {
      return {
        index: 0,
        imgLoadedCounter: 0
      }
    },

    props: {
      subCategory: {
        type: Array,
        default () {
          return []
        }
      },
      categoryDetail: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    methods: {
      tabClick(index) {
        this.index = index
        this.$emit('changeTab', this.currentType)
      },
      pullingUp() {
        this.$emit('pullingUp')
        // this.$refs.scroll.finishPullUp()
        console.log("上拉");
      },
      toRefresh() {
        if (++this.imgLoadedCounter === this.showGoods.length) {
          this.$refs.scroll.finishPullUp()
        }
        this.$refs.scroll.refresh()
      },      
    },

    computed: {
      // 标签当前类型
      currentType() {
        switch (this.index) {
          case 0:
            return 'pop'
            break;
          case 1:
            return 'new'
            break;
          case 2:
            return 'sell'
            break;
          default:
            return 'pop'
        }
      },      
      showGoods() {
        return this.categoryDetail[this.currentType].list
      }
    },

    mounted() {
      this.$bus.$on('itemImgLoaded', this.toRefresh)
    }
  }

</script>

<style scoped>
  .category-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .category-display {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .display-item {
    height: 32%;
    width: 32%;
  }
</style>
