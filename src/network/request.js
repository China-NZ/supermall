// 封装外部网络请求，不要让外部的网络请求，侵入自己的代码里面
// 当有一天axios框架不维护了，被弃用了 注释掉引入的的框架 导入新的框架

// 写法
/* import 新框架名称 from '新框架'
export function request2(config){
  return new Promise((resolve,reject)=>{
    新框架代码
  })
} */ 


import axios from 'axios'

// 4.直接调用axios当中封装好的promise方法
export function request1(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 4000
    })
    // 2.axios的拦截器拦截
    // 2.1 请求拦截的作用
    // axios.request.use() // 全局拦截
    instance.interceptors.request.use(i=>{
      console.log(i);
      
      // （1）.比如config中的一些信息不符合服务器的要求

      // （2）.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

      // （3）.某些网络请求（比如登录（token）），必须携带一些特殊的信息
      return i
    },err=>{
      console.log(err)
    })

    // 2.2 响应拦截
    instance.interceptors.response.use(config=>{
      console.log(config)
      // 接口返回的数据对象里面，有两个data，这里响应之后，获取数据的时候加了一个data，使后面调用者不需要多个data去获取数据
      return config.data
    },err=>{
      // console.log(err);
      return err
    })
    // 3.发送真正的网络请求
    return instance(config)
}


// 3.使用 Promise包含网络请求 网络请求是异步操作
/* export function request1(config) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 4000
    })
    // 发送真正的网络请求
    instance(config)
      .then(value => {
        resolve(value)     
      })
      .catch(err => {
        reject(err)
      })
  })
} */



// 2.回调函数 在一个参数当中有三种方式
/* export function request1(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 4000
  })
  // 发送真正的网络请求
  instance(config.baseConfig)
    .then(value => {
      config.success(value)
    })
    .catch(err => {
      config.failure(err)
    })
} */


/* // 1.回调函数，让使用者传入多个参数
export function request1(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    // http://123.207.32.32:8000/home/multidata
    baseURL: 'http://123.207.32.32:8000',
    timeout: 4000
  })
  // 发送真正的网络请求
  instance(config)
    .then(value => {
      success(value)
    })
    .catch(err => {
      failure(err)
    })
} */