// 防抖 (老师写的防抖包装方法,缺点:会频繁创建销毁定时器)
export function debounce(func, delay) {
  let timer = null //利用闭包
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 防抖-立即执行版(第一下有作用,连续触发无作用,必须等待 delay 时间后才能再次触发)
export function iDebounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    } else {
      func.apply(this, args)
    }
    timer = setTimeout(() => {
      timer = null
    }, delay);
  }
}
//节流 非立即执行版
export function throttle(func, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {      
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay);      
    }
  }
}
//节流 立即执行版
export function iThrottle(func, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
      }, delay)
      func.apply(this, args)
    }
  }
}