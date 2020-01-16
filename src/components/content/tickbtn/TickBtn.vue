<template>
  <label for="tick" class="tick-icon" :class="{checked: isChecked}" @click="checkItem">
    <input type="checkbox" id="tick"><span class="tick-icon-img"></span>
  </label>
</template>

<script>
  export default {
    name: 'TickBtn',
    data() {
      return {
        isChecked: false,
      }
    },
    methods: {
      checkItem() {
        this.isChecked = !this.isChecked
        this.$emit('checkBoxClick',this.isChecked)
      }
    }
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
