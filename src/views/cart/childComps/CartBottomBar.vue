<template>
  <div id="bottom-bar">
    <tick-btn ref="checkAll" @click.native="checkAllClick" :isChecked="isCheckAll"></tick-btn>
    <span class="all">全选</span>
    <span class="tatal">合计:¥{{totalPrice}}</span>
    <div class="topay">结算({{checkListCount}})</div>
  </div>
</template>

<script>
  import TickBtn from 'components/content/tickbtn/TickBtn'

  import {
    mapGetters
  } from "vuex"

  export default {
    name: 'CartBottomBar',
    components: {
      TickBtn
    },
    computed: {
      ...mapGetters(['cartList', 'totalPrice', 'checkListCount', 'isCheckAll'])
    },
    methods: {
      //点击全选按钮时
      checkAllClick() {
        // if (this.isCheckAll) {
        //   this.cartList.forEach(item => {
        //     item.checked = false
        //   })
        // } else {
        //   this.cartList.forEach(item => {
        //     item.checked = true
        //   })
        // }

        this.$store.dispatch('handleCartAll', !this.isCheckAll)
      }
    },
    // updated() {
    //   //监控全选按钮的显示状态
    //   this.$refs.checkAll.isChecked = this.isCheckAll
    // }
  }

</script>

<style scoped>
  #bottom-bar {
    position: fixed;
    bottom: 48px;
    background-color: #eeeeee;
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .all {
    font-size: 14px;
    padding: 0 10px 0 3px;
  }

  .tatal {
    font-size: 14px;
    flex: 1;
  }

  .topay {
    width: 120px;
    font-size: 14px;
    color: #ffffff;
    line-height: 36px;
    text-align: center;
    background-color: #fa5421;
  }

</style>
