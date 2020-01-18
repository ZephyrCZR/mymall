<template>
  <div class="display-item">
    <img :src="subInfo.image">
    <span>{{subInfo.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryDisplayItem',
  props: {
    subInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  

}
</script>

<style scoped>
.display-item {
  padding: 10px 5px;
  display: inline-block;
  
}
  img {
    width: 100%;
    height: 100%;
  }
  span {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
</style>