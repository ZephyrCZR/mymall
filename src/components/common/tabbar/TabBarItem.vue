<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor: {
      type: String,
      default: 'hotpink'
    }
  },
  data() {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive(){
      //当前路径 是否包含 item 的路径,如果包含返回true,否则返回false
      return this.$route.path.indexOf(this.path) !== -1
      /*
      对比:
      this.$route.path.indexOf(this.path) !== -1
      与
      this.$route.path === this.path:不是包含关系,如果$route.path后还有,将无法判断
      */
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      if(this.$route.path === this.path){//阻止原地跳转导致的问题
        return
      }
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    vertical-align: middle;    
  }
  /* .active{
    color:hotpink;
  } */
</style>
