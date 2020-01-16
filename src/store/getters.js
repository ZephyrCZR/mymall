export default {
  cartLength(state) {
    // console.log(state);
    return state.cartList.length
  },
  cartList(state) {
    // console.log(state);
    return state.cartList
  },
  totalPrice(state) {
    let total = state.checkList.reduce((prev, item) => {
      // console.log(prev);
      let price = parseInt(item.price*1000) 
      price *= item.count
      return price + prev
    },0)
    return (parseFloat(total)/1000).toFixed(2)
  },
  checkListCount(state) {
    return state.checkList.length
  } 
 


}