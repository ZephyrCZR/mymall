<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" @itemImgLoaded="imgLoaded"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoaded() {
      this.$emit('imgLoaded')
    }
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;

    padding: 6px;
  }
</style>