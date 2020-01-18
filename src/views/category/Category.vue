<template>
  <div id="category">
    <nav-bar class="category-nav"><template #center>商品分类</template></nav-bar>
    <category-list class="scroll-list" :categoryList="categoryList" @itemClick="getSubCategory"></category-list>
    <category-display class="scroll-display" :SubCategory="SubCategory"></category-display>

  </div>
</template>

<script>
  import CategoryList from './childComps/CategoryList'
  import CategoryDisplay from './childComps/CategoryDisplay'

  import NavBar from 'components/common/navbar/NavBar'

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
    },

    data() {
      return {
        categoryList: [],
        SubCategory: [],

      }
    },

    methods: {
      // 获取分类类别数据
      getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
        }).then(res => {
          // 当拿到list数据后,直接获取第一页分类数据
          this.getSubCategory(this.categoryList[0].maitKey)
        })
      },

      //获取子分类数据
      getSubCategory(key) {
        console.log("测试3");
        getSubCategory(key).then(res => {
          // console.log(res);
          this.SubCategory = res.data.list
          console.log(this.SubCategory);
        })
      },

      //获取分类商品信息
      getCategoryDetail(key, type) {
        getCategoryDetail(50003, 'pop').then(res => {
          console.log(res);
        })
      },

    },

    //创建完成时获取类别数据
    created() {
      this.getCategory()
    },
 
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
    float: left;
    flex: 1;
  }

  .scroll-display {
    float: right;
    flex: 3;
  }

</style>
