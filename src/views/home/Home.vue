<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view ></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"

import { getHomeMultidata, getHomeGoods } from "network/home"



export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      type: ['pop','new','sell'],
      index: 0
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log("res="+res)
      // this.result = res
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res =>{
      this.goods[type].list.push(...res.data.list) //解构数组
      this.goods[type].page += 1
    })
    },

    tabClick(index) {
      this.index = index
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.type[this.index]].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  }
}
</script>

<style>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab-control {
  position: sticky;
  z-index: 666;
  top: 44px;
}
</style>