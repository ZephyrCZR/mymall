<template>
  <div id="shop-info">
    <div class="seller-info">
      <img :src="shop.logo" alt="头像">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-status">
      <div class="status-left">
        <div class="sells">
          <span class="count">{{ shop.sells | numF }}</span>
          <span class="char">总销量</span>
        </div>
        <div class="goods">
          <span class="count">{{ shop.goodsCount | numF }}</span>
          <span class="char">全部宝贝</span>
        </div>
      </div>
      <div class="status-right">
        <div class="score" v-for="(item, index) in shop.score" :key="index">
          <span>{{item.name}}</span>
          <span>
            <span :style="{ color: currentCol(item.score) }">{{item.score}}</span>
            <span :style="{ backgroundColor: currentCol(item.score) }">{{item.score | grade}}</span>
          </span>
        </div>
        
      </div>
    </div>
    <div class="in-to">
      <div class="in-to-btn">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  data(){
    return {
      // currentCol: 'blue'
    }
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    numF(num) {
      return num > 10000 ? (num / 10000).toFixed(1) + '万' : num
    },
    grade(score) {
      return score > 4.9 ? '高' : score > 4.7 ? '中' :'低';
    }
  },
  computed: {
    
  },
  methods: {
    currentCol(score) {
      return score > 4.9 ? '#fb4e4e' : score > 4.7 ? '#f7ac13' : '#2ea635';
    }
  }

}
</script>

<style scoped>
  #shop-info {
    padding: 20px 8px 0;
  }

  .seller-info {
    display: flex;
    padding-bottom: 20px;
  }
  .seller-info img{
    display: inline-block;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 2px #aaaaaa;
    border-radius: 50%;
  }
  .seller-info span {
    display: inline-block;
    line-height: 50px;
    padding-left: 8px; 
  }
  .shop-status {
    display:flex;
    font-weight: 400;
    text-align: center;
  }
  .status-left{
    flex: 1;
    display: flex;
    padding: 4px 0;
    height: 50px;
    margin: auto;
  }
  .status-left span {
    display: block;
  }

  .count {
    font-size: 18px;
    padding-bottom: 8px; 
  }
  .char {
    font-size: 14px;
  }

  .sells {
    flex: 1;
    display: inline-block;
    text-align: center;
    padding-left: 15px;
  }
  .goods {
    flex: 1;
    display: inline-block;
    text-align: center;
    padding:0 15px 0 0;
    border-right: 1px solid #dddddd;
  } 

  .status-right {
    flex: 1;
    font-size: 14px;
  }

  .score {
    display: flex;
    padding: 5px;
  }
  .score>span{
    flex: 1;
    text-align: right;
    
  }
  .score>span:nth-of-type(2) {
    display: flex;
  }
  .score>span>span:nth-of-type(1){
    flex: 1;
    text-align: left;
    padding-left: 20px;
  }
  .score>span>span:nth-of-type(2){
  text-align: right;
  margin-right: 5px;
  color: white;
  }

  .in-to-btn {
    display: block;
    margin: auto;
    width: 140px;
    height: 26px;
    background-color: #eef5fc;
    border-radius: 10px;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    margin-top: 10px;
  }
</style>