export function debounce(func, delay) { // 防抖函数 传入两个参数
  let timer = null
  return function (...args) {
    // 结束定时器操作
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apnly(this, args)
    }, delay)
  }
}