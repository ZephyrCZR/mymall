<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navBarClick="navBarClick"></detail-nav-bar>
    <scroll class="detail-scroll"
            ref="scroll">
      <detail-swiper :topImgs="topImages" @swiperLoaded.once="swiperLoaded"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail="detail" @imgLoaded="imgLoaded" class="detail-goods-info"></detail-goods-info>
      <detail-param-info :paramsInfo="paramsInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-tab-bar></detail-tab-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailTabBar from './childComps/DetailTabBar';

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from "network/detail"
import { itemListenerMixin } from "common/mixin";

export default {
  name: 'Detail',

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailTabBar,
    Scroll,
    GoodsList
  },

  mixins: [itemListenerMixin],

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detail: {},
      paramsInfo: {},
      commentInfo: {},
      recommends:[],
      anchors:[]
    }
  },

  methods: {
    swiperLoaded() {
      this.$refs.scroll.refresh()
    },
    imgLoaded() {
      this.$refs.scroll.refresh()
    },
    navBarClick(index) {
      this.anchors = []
    this.anchors.push(0)
    this.anchors.push(this.$refs.params.$el.offsetTop)
    this.anchors.push(this.$refs.comment.$el.offsetTop)
    this.anchors.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.anchors);
    console.log(this.$refs.params);
    console.log(this.$refs.recommend.$el.offsetHeight);
      this.$refs.scroll.scrollTo(0, -this.anchors[index], 100)

    }
  },

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const info = res.result

      // 1.获取轮播图数据
      this.topImages = info.itemInfo.topImages

      //2.获取商品信息
      this.goods = new GoodsInfo(info.itemInfo, info.columns, info.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(info.shopInfo)

      //4.获取商品信息
      this.detail = info.detailInfo

      //5.获取参数信息
      this.paramsInfo = new GoodsParam(info.itemParams.info, info.itemParams.rule)

      //6.取出评论信息
      if (info.rate.cRate !== 0) {
        this.commentInfo = info.rate.list[0]
      }

      // this.$nextTick(() => {
      //   this.anchors = []
      //   this.anchors.push(0)
      //   this.anchors.push(this.$refs.params.$el.offsetHeight)
      //   this.anchors.push(this.$refs.comment.$el.offsetHeight)
      //   this.anchors.push(this.$refs.recommend.$el.offsetHeight)
      //   console.log(this.anchors);
      //   console.log(this.$refs.params);
      // })
      
    }).catch((err) => {
      console.log(err);
    });

    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
    }).catch((err) => {
      console.log(err);
    });
  },

  updated() {
    // this.anchors = []
    // this.anchors.push(0)
    // this.anchors.push(this.$refs.params.$el.offsetHeight)
    // this.anchors.push(this.$refs.comment.$el.offsetHeight)
    // this.anchors.push(this.$refs.recommend.$el.offsetHeight)
    // console.log(this.anchors);
    // console.log(this.$refs.params);
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