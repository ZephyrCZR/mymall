import {
  ADD_COUNTER,
  SUB_COUNTER,
  ADD_NEW_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_STATE,
  CHANGE_ALL_STATE
} from "./mutation-types"

export default {
  // 添加商品的个数
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  //减少商品的个数
  [SUB_COUNTER](state, payload) {
    payload.count--
  },

  //添加新商品
  [ADD_NEW_PRODUCT](state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  },

  //设置购物车单个商品是否选中 v3.0
  [CHANGE_STATE](state, payload) {
    payload.checked = !payload.checked
  },

  //设置购物车所有商品是否选中 v3.0
  [CHANGE_ALL_STATE](state, payload) {
    state.cartList.forEach((item) => {
      item.checked = payload
    })
  },

  //删除购物车中的商品
  [REMOVE_PRODUCT](state, payload) {
    const index = state.cartList.indexOf(payload)
    state.cartList.splice(index, 1)
  }





  // [ADD_CHECK_LIST](state, payload) {
  //   // payload.
  //   state.checkList.push(payload)
  // },
  // [REMOVE_CHECK_LIST](state, payload) {
  //   // payload.
  //   let index = state.checkList.indexOf(item => item.iid === payload.iid)
  //   state.checkList.splice(index,1)
  // },
}
