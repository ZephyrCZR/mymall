<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a href="#">
        <img :src="item.image" :alt="item.title" @load="imgLoaded">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data()　{
    return {
      isImgLoaded: false
    }
  },
  methods: {
    imgLoaded() {
      if(!this.isImgLoaded){
        this.$emit('recommendLoaded')
        this.isImgLoaded = true
      }            
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0;
    border-bottom: 10px solid #eee;
  }
  
  .recommend-item {
    flex: 1;
  }
  .recommend-item img{
    width: 65px;
    height: 65px;
  }

</style>