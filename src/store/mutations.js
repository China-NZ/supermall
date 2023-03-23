import { ADD_COUNTER, ADD_TO_CART } from "./mutatio-types"

export default {
  /* addCart(state, payload) {
    // 把Detail组件中传递过来的数据，存储到临时的数组中，以便其他组件去调用
    // 无法区分是否是同一件商品，只会把所有商品加进去数组
    // state.cartList.push(payload)
    // 1.判断payload 新添加的商品
    // let oldProduct = null
    // for (let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }
    // 1.查找之前数组中是否有该商品 没有办法区分是商品加1还是数量加1，使用异步最好
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      state.cartList.push(payload)
    }
  } */
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}