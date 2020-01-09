<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style>
.nav-bar {
  height: 44px;
  display: flex;
  line-height: 44px;
  text-align: center;
}
.left, .right{
  height: 100%;
  width: 60px;
  /* background-color: aqua */
}
.center {
  flex: 1;
  height: 100%;
  /* background-color: blueviolet */
  
}

</style>