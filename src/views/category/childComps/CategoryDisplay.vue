<template>
  <div class="category-scroll">
    <div class="category-display">
      <category-display-item class="display-item" v-for="(item, index) in subCategory" :key="index" :subInfo='item'/>
    </div>
    <tab-control ref="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list class="goods-list" :goods="showGoods"/>
    <loading/>
  </div>
</template>

<script>
  import CategoryDisplayItem from './CategoryDisplayItem'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Loading from 'components/common/loading/Loading'

  export default {
    name: 'CategoryDisplay',

    components: {
      CategoryDisplayItem,

      TabControl,
      GoodsList,
      Loading
    },

    data() {
      return {
        index: 0
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
  }

</script>

<style scoped>
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
