import { ADD_COUNTER, ADD_NEW_PRODUCT, ADD_CHECK_LIST, REMOVE_CHECK_LIST } from "./mutation-types"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
    console.log('增加数量');
    console.log(payload);
  },
  [ADD_NEW_PRODUCT](state, payload) {
    payload.count = 1
    state.cartList.push(payload)
    console.log('添加了新的');
  },
  [ADD_CHECK_LIST](state, payload) {
    // payload.
    state.checkList.push(payload)
  },
  [REMOVE_CHECK_LIST](state, payload) {
    // payload.
    let index = state.checkList.indexOf(item => item.iid === payload.iid)
    state.checkList.splice(index,1)
  }
}