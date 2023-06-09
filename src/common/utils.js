// ES6语法当中，参数可以加入默认值，使其他调用者，可以不需要填写
export function debounce(func, delay=200) { // 防抖函数 传入两个参数
  let timer = null
  return function (...args) {
    // 结束定时器操作
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apnly(this, args)
    }, delay)
  }
}

// 封装函数 转换时间戳方法
export function formatDate(date,fmt){
  // 1.获取年份
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
  }
  // 2.获取
  let o = {
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHouers(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str){
  return ('00'+str).substr(str.length)
}