<template>
  <div id="category-list">
    <div class="category-list">
      <div class="category-item" 
          :class="{active: currentIndex === index}" 
          v-for="(item, index) in categoryList"
          :key="index"
          @click="itemClick(index, item.maitKey)"
          >{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CategoryList',
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      categoryList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      itemClick(index, maitKey) {
        this.currentIndex = index
        this.$emit('itemClick', maitKey)
      }
    }
  }

</script>

<style scoped>
  #category-list {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .category-list {
    height: 100%;
    width: calc(100% + 10px);
    padding-right: 10px;

    background-color: #eee;
    padding-bottom: 49px;
    overflow: scroll;
  }

  .category-item {
    width: 100%;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    background-color: #ffffff;
    color: var(--color-high-text);
    border-left: 4px solid var(--color-tint);
  }

</style>
