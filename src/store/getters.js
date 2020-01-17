export default {
  // 购物车商品数量
  cartLength(state) {
    return state.cartList.length
  },

  //购物车商品列表
  cartList(state) {
    return state.cartList
  },

  //计算总价格
  totalPrice(state) {
    let total = state.cartList.reduce((prev, item) => {
      let price = 0
      if (item.checked) {
        price = parseInt(item.price * 1000)
        price *= item.count
      }
      return price + prev
    }, 0)
    return (total / 1000).toFixed(2)
    //涉及金额不使用浮点运算,但是耐不住我懒哈哈哈
  },

  // 购物车选中的数量
  checkListCount(state) {
    let count = state.cartList.reduce((prev, item) => {
      return (item.checked ? 1 : 0) + prev
    }, 0)
    return count
  },

  //判断购物车列表是否全选
  isCheckAll(state) {
    if (state.cartList.length !== 0) {
      return !state.cartList.find(item => !item.checked)
    }

  }
}
