<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view ></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
        <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
      <li>list</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from './childComps/FeatureView';

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl';

import { getHomeMultidata, getHomeGoods } from "network/home"
import { get } from 'http';



export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NavBar,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log("res="+res)
      // this.result = res
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    }),
    // 2.请求商品数据
    getHomeGoods('pop',1).then(res =>{
      console.log(res);
    })
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
  top: 44px;
}
</style>