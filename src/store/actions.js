import {
  ADD_COUNTER,
  ADD_NEW_PRODUCT,
  CHANGE_STATE,
  CHANGE_ALL_STATE
} from "./mutation-types"

export default {
  //添加到购物车
  addCart(context, payload) {
    //1.查找数组中是否存在此商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //2.判断oldProduct是否取到值
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      context.commit(ADD_NEW_PRODUCT, payload)
    }
  },

  handleCart(context, payload) {
    context.commit(CHANGE_STATE, payload)
  },

  handleCartAll(context, payload) {
    context.commit(CHANGE_ALL_STATE, payload)
  }


  // handleCheckList(context, payload) {
  //   if (payload.flag) {
  //     context.commit(ADD_CHECK_LIST, payload)
  //   }else{
  //     context.commit(REMOVE_CHECK_LIST, payload)
  //   }
  // }
}
