<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detail-scroll"
            ref="detailScroll">
      <detail-swiper :topImgs="topImages" @swiperLoaded="swiperLoaded"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <div class="empty"></div>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo';

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, GoodsInfo, Shop } from "network/detail"

export default {
  name: 'Detail',

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },

  methods: {
    swiperLoaded() {
      console.log('hahaha');
      this.$refs.detailScroll.refresh()
    }
  },

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 1.获取轮播图数据
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      const info = res.result
      this.goods = new GoodsInfo(info.itemInfo, info.columns, info.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(info.shopInfo)
      console.log(this.shop);

    }).catch((err) => {
      console.log(err);
    });

      //
  },

  mounted() {
    // this.$refs.detailScroll.refresh()
  }
}
</script>

<style scoped>
#detail {
  padding-top: 44px;
  height: 100vh;
  position: relative;
  z-index: 1999;
  background-color: #ffffff;
}
.empty {
    width: 100px;
    height: 2000px;
    background-color: antiquewhite;
}

.detail-scroll {
  height: 100%;
  overflow: hidden;
}

.detail-nav {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>