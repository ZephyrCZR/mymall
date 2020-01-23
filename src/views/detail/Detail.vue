<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="detailNav" :titles="navBarTitles" @navBarClick="navBarClick" />
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="onScroll">
      <h2 v-if="showErrorMessage" class="errMessage">Sorry, 找不到这件商品了</h2>
      <detail-swiper :topImgs="topImages" @swiperLoaded.once="imgsLoaded" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail="detail" @imgLoaded="imgsLoaded" class="detail-goods-info" />
      <detail-param-info :paramsInfo="paramsInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" class="recommend" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backTopClick" v-show="showBackTopBtn" />
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
  import DetailBottomBar from './childComps/DetailBottomBar';

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {
    getDetail,
    GoodsInfo,
    Shop,
    GoodsParam,
    getRecommend
  } from "network/detail"

  import {
    backTopButton
  } from "common/mixin"

  import {
    debounce
  } from "common/utils"

  import {
    mapActions
  } from "vuex"

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
      DetailBottomBar,

      Scroll,
      GoodsList,
    },

    mixins: [backTopButton],

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detail: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        anchors: [],
        clearId: null,
        navBarTitles: [],
        showErrorMessage: false,
        toRefresh: null
      }
    },

    methods: {
      ...mapActions(['addCart']),

      imgsLoaded() {
        this.toRefresh()
      },

      resetAnchors() {
        this.anchors = []
        this.anchors.push(0)
        this.$refs.params.$el.offsetTop && this.anchors.push(this.$refs.params.$el.offsetTop - 44)
        this.$refs.comment.$el.offsetTop && this.anchors.push(this.$refs.comment.$el.offsetTop - 44)
        this.$refs.recommend.$el.offsetTop && this.anchors.push(this.$refs.recommend.$el.offsetTop - 44)
      },

      screenRefresh() {
        this.$refs.scroll.refresh()
        this.resetAnchors()
      },

      navBarClick(index) {
        // this.resetAnchors()
        this.$refs.scroll.scrollTo(0, -this.anchors[index], 200)
      },

      onScroll(position) {
        const topY = -position.y
        if (this.anchors.length === 0 || topY < this.anchors[1]) {
          this.$refs.detailNav.currentIndex = 0
        } else if (topY < this.anchors[2]) {
          this.$refs.detailNav.currentIndex = 1
        } else if (topY < this.anchors[3]) {
          this.$refs.detailNav.currentIndex = 2
        } else {
          this.$refs.detailNav.currentIndex = this.anchors.length - 1
        }

        //监听是否显示backTop按钮
        this.showBackTopBtnListener(topY)
      },

      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.image = this.topImages[0]
        product.iid = this.iid
        product.checked = this.checked

        // 2.将商品添加到购物车
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    },

    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
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

      }).catch((err) => {
        //8. 显示找不到商品的错误提示信息
        Object.keys(this.goods).length === 0 && (this.showErrorMessage = true)
        console.log(err)
      }).then(() => {
        //获取顶部导航栏标题
        Object.keys(this.commentInfo).length !== 0 && this.navBarTitles.unshift('评论')
        Object.keys(this.paramsInfo).length !== 0 && this.navBarTitles.unshift('参数')
        Object.keys(this.goods).length !== 0 && this.navBarTitles.unshift('商品')
      })

      //请求推荐数据
      getRecommend().then((res) => {
        this.recommends = res.data.list
        Object.keys(this.recommends).length !== 0 && this.navBarTitles.push('推荐')
      }).catch((err) => {
        console.log(err);
      })
    },

    mounted() {
      this.toRefresh = debounce(this.screenRefresh, 100)
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
  }

  .recommend {
    padding-bottom: 49px;
  }

  .errMessage {
    width: 100%;
    text-align: center;
    padding: 30px 0;
  }

</style>
