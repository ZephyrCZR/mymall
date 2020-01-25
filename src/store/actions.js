import {
  ADD_COUNTER,
  SUB_COUNTER,
  ADD_NEW_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_STATE,
  CHANGE_ALL_STATE
} from "./mutation-types"

export default {
  //添加到购物车
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.查找数组中是否存在此商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct是否取到值
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        context.commit(ADD_NEW_PRODUCT, payload)
        resolve('添加了新的商品')
      }
    })
  },
  subCart(context, payload) {
    //1.查找数组中是否存在此商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //2.判断oldProduct是否取到值并且数量大于1
    if (oldProduct && oldProduct.count>1) {
      context.commit(SUB_COUNTER, oldProduct)
    }
  },
  // 购物车选中商品
  handleCart(context, payload) {
    context.commit(CHANGE_STATE, payload)
  },
  // 购物车全选商品
  handleCartAll(context, payload) {
    context.commit(CHANGE_ALL_STATE, payload)
  },

  // 移除购物车中的商品
  removeCartProduct(context, payload) {
    const product = context.state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      context.commit(REMOVE_PRODUCT, product)
    }
    
  }
  
}
