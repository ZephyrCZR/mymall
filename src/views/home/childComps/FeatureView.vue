<template>
  <div class="feature">
    <a href="#">
      <img src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'FeatureView'
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