<template>
  <label for="tick" class="tick-icon" :class="{checked: isChecked}" >
    <input type="checkbox" id="tick"><span class="tick-icon-img"></span>
  </label>
</template>

<script>
  export default {
    name: 'TickBtn',
    // data() {
    //   return {
    //     //主动修改时起作用
    //     isChecked: false,
    //   }
    // },
    props: {
      isChecked:{
        type: Boolean,
        default() {
          return false
        }
      }
    }
    // methods: {
    //   //点击购物车中的商品时
    //   checkItem() {
    //     // this.isChecked = !this.isChecked
    //     //发送该按钮被点击的事件
    //     // this.$emit('checkBoxClick',this.isChecked)
    //     this.$emit('checkBoxClick')
    //   }
    // },
  }

</script>

<style scoped>
  .tick-icon input {
    opacity: 0;
  }

  .tick-icon {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #aaaaaa;
  }

  .checked {
    background-color: var(--color-tint);
    border: 1px solid var(--color-tint);
    background-image: url('~assets/img/cart/tick.svg');
  }

</style>
