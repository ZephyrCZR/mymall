<template>
  
 <div id="home">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>
      <scroll class="home-scroll" 
              ref="homeScroll" 
              :probe-type="3" 
              :pull-up-load="true"
              @scroll="onScroll"
              @pullingUp="loadMore"> 
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view ></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backTopClick" v-show="showBackTopBtn"></back-top>
  </div>
 
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home"


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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
      index: 0,
      BScroll: null,
      showBackTopBtn: false
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
      // this.$refs.homeScroll.scroll.refresh()//暂时写这里,还得改的
      this.$refs.homeScroll.finishPullUp()
    })
    },

    tabClick(index) {
      this.index = index
    },

    backTopClick() {
      this.$refs.homeScroll.scrollTo(0,0,500)
    },

    onScroll(position) {
      if(position.y > -500){
        this.showBackTopBtn = false
      }else{
        this.showBackTopBtn = true
      }
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if(timer) clearTimeout(timer)

        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },

    
  },

  computed: {
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
      return this.goods[this.currentType].list
    }
  },

  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
  },

  mounted() {
    // 刷新可滚动页面长度
    const refresh = this.debounce(this.$refs.homeScroll.refresh,300)
    this.$bus.$on('itemImgLoaded', () => {
      refresh()
    })
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
}

.home-scroll {
  height: 100%;
  overflow: hidden;
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