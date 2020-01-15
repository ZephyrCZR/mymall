<template>
  <div v-if="Object.keys(goods).length !== 0" class="goods-info">
    <span class="goods-title">{{goods.title}}</span>
    <div class="goods-price">
      <span class="real-price">{{goods.realPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="goods-columns">
      <span v-for="(item, index) in goods.columns" :key="index">{{item}}</span>
    </div>
    <div class="goods-services">
      <span class="goods-services-item" v-for="index in goods.services.length - 1" :key="index">
        <!-- api部分图标缺失，所以这里这样写 -->
        <img :src="goods.services[1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }

</script>

<style scoped>
  .goods-info {
    padding: 16px 10px 18px;
    background: #ffffff;
    border-bottom: 4px solid #eee;
    position: relative;
    text-align: left;
  }

  .goods-title {
    font-size: 16px;
    font-weight: bolder;
  }

  .goods-price {
    padding-top: 10px;
    position: relative;
  }

  .real-price {
    color: var(--color-high-text);
    font-size: 22px;
  }

  .old-price {
    padding: 0 5px;
    color: #999999;
    font-size: var(--font-size);
    font-weight: 500;
    text-decoration-line: line-through;
  }

  .discount {
    background-color: var(--color-high-text);
    color: #ffffff;
    font-size: 12px;
    padding: 4px;
    display: inline-block;
    border-radius: 10px;
    line-height: 10px;
    position: absolute;
    top: 10px;
  }

  .goods-columns {
    padding: 20px 0 10px;
    display: flex;
    border-bottom: 1px solid #cccccc;

  }

  .goods-columns>span {
    color: #999999;
    font-size: var(--font-size);
    flex: 1;
  }

  .goods-columns>span:nth-of-type(1) {
    text-align: left;
  }

  .goods-columns>span:nth-of-type(2) {
    text-align: center;
  }

  .goods-columns>span:nth-of-type(3) {
    text-align: right;
  }

  .goods-services {
    padding-top: 18px;
    display: flex;
    justify-content: space-between;
  }

  .goods-services-item {

    font-size: 13px;
  }

  .goods-services-item img {
    width: 11px;
    height: 11px;
  }

</style>
