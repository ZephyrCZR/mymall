<template>
  <div id="product-list">
    <cart-product-item 
      v-for="(item, index) in cartList" 
      :key="index" 
      :itemInfo="item"
    />
  </div>
</template>

<script>
import CartProductItem from './CartProductItem';
export default {
  name: 'CartProductList',
  components: {
    CartProductItem
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  #product-list {
    padding-bottom: 85px;
  }
</style>