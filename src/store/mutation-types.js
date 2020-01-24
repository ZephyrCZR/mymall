//据说使用 mutation-types 便于管理,反正现在没感觉到

//增加购物车中商品的数量
export const ADD_COUNTER = 'addCounter'

//减少购物车中的商品数量
export const SUB_COUNTER = 'subCounter'

//往购物车中添加新的商品
export const ADD_NEW_PRODUCT = 'addNewProduct'

// //将商品加入选中列表
// export const ADD_CHECK_LIST = 'addCheckList'

// //将商品从选中该列表移除
// export const REMOVE_CHECK_LIST = 'removeCheckList'

//设置购物车单个商品是否选中
export const CHANGE_STATE = 'changeState'

//设置购物车所有商品是否选中
export const CHANGE_ALL_STATE = 'changeAllState'

//删除购物车中的商品
export const REMOVE_PRODUCT = 'removeProduct'