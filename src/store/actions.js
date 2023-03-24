import { ADD_COUNTER,ADD_TO_CART } from "./mutatio-types"

export default {
  addCart(context, payload) {
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
    return Promise((resolve,reject)=>{
      // 1.查找之前数组中是否有该商品 没有办法区分是商品加1还是数量加1，使用异步最好
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数据+1')
      } else { // 添加新的商品
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        reject('添加了新的商品')
      }
    })
  }
}