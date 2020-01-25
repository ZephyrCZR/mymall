<template>
  <div id="product-control">
    <div id="product-item">
      <div class="tick">
        <tick-btn ref="tickBtn" @click.native="checkBoxClick" :isChecked="itemInfo.checked" />
      </div>
      <div class="product-img"><img :src="itemInfo.image" alt=""></div>
      <div class="product-info">
        <div class="product-title">{{itemInfo.title}}</div>
        <div class="product-desc">{{itemInfo.desc}}</div>
        <div class="order-info">
          <span class="price">¥{{itemInfo.price}}</span>
          <div class="counter">
            <span class="iconfont icon-refuse countBtn" @click="subCounter"/>
            <input class="count" type="text" v-model="itemInfo.count">
            <span class="iconfont icon-addto countBtn" @click="addCounter"/>
          </div>
        </div>
      </div>
    </div>
    <div id="pullDelete">
      <span class="iconfont icon-delete"/>
      <span class="delete">删除</span>
    </div>
  </div>

</template>

<script>
  import TickBtn from 'components/content/tickbtn/TickBtn'

  export default {
    name: 'CartProductItem',
    components: {
      TickBtn
    },

    props: {
      itemInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    methods: {
      //选择按钮的触发事件和状态
      checkBoxClick() {
        this.$store.dispatch('handleCart', this.itemInfo)
      },
      addCounter() {
        this.$store.dispatch('addCart', this.itemInfo)
      },
      subCounter() {
        this.$store.dispatch('subCart', this.itemInfo)
      }
    },


  }

</script>

<style scoped>
  #product-control {
    width: 200%;
    display: flex;
    transform: translateX(-200px)
  }

  #product-item {
    flex: 1;
    height: 120px;
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    margin: 0 10px;
  }

  .tick {
    height: 100%;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .product-img {
    flex: 3;
    overflow: hidden;
  }

  .product-img>img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  .product-info {
    flex: 7;
    padding-left: 8px;
    position: relative;
  }

  .product-title {
    width: 60vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #333333;
  }

  .product-desc {
    font-size: 12px;
    width: 60vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 40px;
  }

  .order-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 0px 8px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    color: #f54020
  }

  .count {
    text-align: center;
    width: 25px;
    border: none;
    font-size: 15px;
  }

  .counter {
    display: flex;
    align-items: center;
  }

  .countBtn {
    font-size: 24px;
  }

  #pullDelete {
    flex: 1; 
    margin: 0 10px;
    background: #fa5421;
    line-height: 120px;
    color: #fff;
    padding-left: 26px;
    display: flex;
    align-items: center;
  }

  .icon-delete { 
    font-size: 32px;
  }
  .delete {
    font-size: 23px;
  }

</style>
