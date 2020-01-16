<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style>
  #tab-bar{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f6f6f6;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
    padding-top: 6px;
    height: 49px;
    z-index: 999;
  }
  
</style>
