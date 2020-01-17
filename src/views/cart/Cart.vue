<template>
<div id="cart">
  <nav-bar class="nav-bar"><template #center><div>购物街({{cartLength}})</div></template></nav-bar>
  <scroll class="cart-scroll" ref="scroll">
    <cart-product-list :cartList="cartList"/>
  </scroll>
  <cart-bottom-bar></cart-bottom-bar>
</div>
 
</template>

<script>
import CartProductList from './childComps/CartProductList'
import CartBottomBar from './childComps/CartBottomBar';

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from "vuex"

export default {
  name: 'Cart',
  components: {
    CartProductList,
    CartBottomBar,

    NavBar,
    Scroll
  },
  computed: {
    //获取getter的计算属性
    ...mapGetters(['cartLength','cartList','isCheckAll']),
    // ...mapGetters({
    //   length:'cartLength',
    //   list: 'cartList'
    // })
    
  },
   //进入页面的时候
  activated() {
    this.$refs.scroll.refresh()
    
  },

}
</script>

<style scoped>
  #cart {
    height: 100vh;
    padding-top: 44px;
    /* height: calc(100% - 44px - 55px); */
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

  }
   .cart-scroll {
    height: 100%;
    overflow: hidden;
    /* background-color: antiquewhite; */
  }


</style>