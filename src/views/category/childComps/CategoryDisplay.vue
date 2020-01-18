<template>
  <div id="category-display">
    <scroll class="category-scroll" >
      <div class="category-display">
        <category-display-item class="display-item" v-for="(item, index) in SubCategory" :key="index" :subInfo='item'></category-display-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CategoryDisplayItem from './CategoryDisplayItem'

  import Scroll from 'components/common/scroll/Scroll'
  
  export default {
    name: 'CategoryDisplay',
    components: {
      Scroll,
      CategoryDisplayItem
    },
    props: {
      SubCategory: {
        type: Array,
        default() {
          return []
        }
      }
    },
   
   


  }

</script>

<style scoped>
  #category-display {
    height: 100%;
    width: 100%;
    /* background-color: aqua; */
  }

  .category-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .category-display {
    padding-bottom: 49px;
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
  }

  .display-item {
    height: 32%;
    width: 32%;
  }
</style>
