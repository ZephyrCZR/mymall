<template>
  <div id="category">
    <nav-bar class="category-nav"><template #center>商品分类</template></nav-bar>
    <category-list class="scroll-list" :categoryList="categoryList" @itemClick="refreshDisplay" />
    <scroll class="category-scroll" ref="scroll" :pull-up-load="true" @pullingUp="getCategoryDetail">
      <category-display :subCategory="subCategory" :categoryDetail="categoryDetail" @changeTab="changeTab">
      </category-display>
    </scroll>
  </div>
</template>

<script>
  import CategoryList from './childComps/CategoryList'
  import CategoryDisplay from './childComps/CategoryDisplay'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import {
    getCategory,
    getSubCategory,
    getCategoryDetail
  } from "network/category"

  export default {
    name: 'Category',

    components: {
      CategoryList,
      CategoryDisplay,

      NavBar,
      Scroll
    },

    data() {
      return {
        categoryList: [],
        subCategory: [],
        currentType: 'pop',
        categoryDetail: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentGoodsKey: null
      }
    },

    methods: {
      // 获取分类类别数据
      getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
        }).then(res => {
          // 当拿到list数据后,直接获取第一页分类数据
          this.refreshDisplay(this.categoryList[0].maitKey, this.categoryList[0].miniWallkey)
        })
      },

      //获取子分类数据
      getSubCategory(key) {
        getSubCategory(key).then(res => {
          this.subCategory = res.data.list
        })
      },

      //获取分类商品信息
      getCategoryDetail(key = this.currentGoodsKey, type = this.currentType) {
        getCategoryDetail(key, type).then(res => {
          console.log(res);
          this.categoryDetail[type].page++
          this.categoryDetail[type].list.push(...res)

          // 当数据请求成功后可以下拉刷新
          this.$refs.scroll.finishPullUp()
        })
      },

      //切换左侧类别选项时,刷新右侧显示界面,并保存当前类别 key
      refreshDisplay(maitKey, miniWallkey) {
        this.$refs.scroll.scrollTo(0, 0, 0)
        this.currentGoodsKey = miniWallkey
        this.getSubCategory(maitKey)

        //初始化 categoryDetail 里的数据
        for (const key in this.categoryDetail) {
          if (this.categoryDetail.hasOwnProperty(key)) {
            const item = this.categoryDetail[key];
            item.page = 0
            item.list = []
          }
        }
        this.getCategoryDetail(miniWallkey, 'pop')
        this.getCategoryDetail(miniWallkey, 'new')
        this.getCategoryDetail(miniWallkey, 'sell')
      },

      // 改变商品顶部标签时
      changeTab(type) {
        this.currentType = type
      },

      //刷新可滚动页面长度
      toRefresh() {
        this.$refs.scroll.refresh()
      },
    },

    created() {
      //获取类别数据
      this.getCategory()
    },

    mounted() {
      //监听图片加载完成事件
      this.$bus.$on('itemImgLoaded', this.toRefresh)
    },

    //进入页面的时候
    activated() {
      this.$refs.scroll.refresh()
    },

    //退出页面的时候
    deactivated() {
      // 清除所有监听
      this.$bus.$off()
    }
  }

</script>

<style scoped>
  #category {
    padding-top: 44px;
    height: 100vh;
    display: flex;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .scroll-list {
    flex: 1;
  }

  .category-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex: 3;
  }

</style>
