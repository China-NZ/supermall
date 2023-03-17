// 封装了一下去axios进行网络请求的函数,使代码不会大量出现在业务代码中
// 导入
import { request1 } from './request'

// 导出  封装好的函数
export function getHomeMultidata(){
  // 一个或者多个网络接口返回数据
  return request1({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request1({
    url: '/home/recommendview',
    params:{
      type,
      page
    }
  })
}
