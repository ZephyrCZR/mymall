<template>
  <div class="feature">
    <a href="#">
      <img src="~assets/img/home/recommend_bg.jpg" @load="imgLoaded">
    </a>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  methods:{
    imgLoaded() {
      this.$emit('featureLoaded')
    }
  }
}
</script>

<style>
  .feature {
    width: 100%;
    /* margin-right: -2px; */
  }

  .feature img {
    width: calc(100% + 1px);
    display: block;
    
  }
</style>