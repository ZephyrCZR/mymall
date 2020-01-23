<template>
  <nav-bar class="home-nav">
    <template #left> 
      <div @click="backClick">
        <img src="~assets/img/common/back.svg" alt="返回" id="backBtn">
      </div>
    </template>
    <template #center>
      <div class="title">
        <span 
        v-for="(item, index) in titles" 
        :key="index"
        @click="itemClick(index)"
        :class="{active:currentIndex === index}"
        >{{item}}</span>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar', 

    components: {
      NavBar
    },

    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },

    data() {
      return {
        currentIndex: 0
      }
    },

    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('navBarClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }

</script>

<style scoped>
  .title {
    display: flex;
  }

  .title span {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  #backBtn {
    margin-top: 10px;
    margin-left: -15px;
  }
</style>
