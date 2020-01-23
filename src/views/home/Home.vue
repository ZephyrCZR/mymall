<template>
 <div id="home">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>
      <tab-control id="tab-control" ref="tabControlTop" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="showTabControl"/>
      <scroll class="home-scroll" 
              ref="scroll" 
              :probe-type="3" 
              :pull-up-load="true"
              @scroll="onScroll"
              @pullingUp="loadMore"> 
        <home-swiper :banners="banners" @swiperLoaded="imgLoadedListener"/>
        <home-recommend-view @recommendLoaded="imgLoadedListener" :recommends="recommends"/>
        <feature-view @featureLoaded="imgLoadedListener"/>
        <tab-control ref="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
        <loading/>
      </scroll>
      <back-top @click.native="backTopClick" v-show="showBackTopBtn"/>
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
import Loading from 'components/common/loading/Loading'

import { getHomeMultidata, getHomeGoods } from "network/home"
import { itemListenerMixin, backTopButton } from "common/mixin"

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
    Loading
  },

  mixins: [itemListenerMixin, backTopButton],

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
      showTabControl: false,
      offsetTop: 0,
      lastPositionY: 0,
      eventTime: 0
    }
  },

  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res =>{
      this.goods[type].list.push(...res.data.list) //解构数组
      this.goods[type].page += 1

      //当成功获取数据后,可以再次上拉刷新
      this.$refs.scroll.finishPullUp()
    })
    },

    tabClick(index) {
      // 确保两个tabControl与home的index保持一致
      this.index = index
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlTop.currentIndex = index
    },

    onScroll(position) {
      const topY=-position.y
      this.showBackTopBtnListener(topY)
      this.showTabControlListener(topY)
    },

    showTabControlListener(topY) {
      // 2. 判断是否显示tabControl按钮
      this.showTabControl = topY > this.offsetTop
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    // swiperLoaded() {
    //   // 获取tabControl相对位置，44为navbar高度
    //   this.offsetTop = this.$refs.tabControl.$el.offsetTop - 44
    // },
    // featureLoaded() {

    // },
    // recommendLoaded() {

    // }
    imgLoadedListener() {
      console.log('outter');
      if (++this.eventTime === 3) {     
        // 获取tabControl相对位置，44为navbar高度
        this.offsetTop = this.$refs.tabControl.$el.offsetTop - 44
        console.log("inner");
      }

    }
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

  //进入页面的时候
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.lastPositionY,0)
  },

  //离开页面的时候
  deactivated() {
    this.lastPositionY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImgLoaded', this.itemImgListener)
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
}

#tab-control {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;
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
}

</style>