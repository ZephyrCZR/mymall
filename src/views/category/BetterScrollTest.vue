<template>
<div class="wrapper">

  <ul class="content">
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
    <h1>Category</h1>
</div>
  
  
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: 'BetterScrollTest',
  data(){
    return {
      bs: null
    }
  },
  mounted() {
    this.bs = new BScroll('.wrapper', {
      //probe 侦测
      // 0,1: 不侦测
      // 2: 在手指滚动过程中侦测,惯性滚动不侦测
      // 3: 所有滚动都侦测
      probeType: 3,
      click: true, //点击按钮可否监听
      pullUpLoad: true,
    })
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: aqua;
    opacity: 0.3;
    height: 400px;
  }
</style>