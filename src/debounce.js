// 防抖
let count = 1
const container = document.getElementById('container')

function getUserAction(e) {
    console.log(this)
    console.log(e)
    container.innerHTML = count ++
    return '返回值'
}

// container.onmousemove = getUserAction


/**
 * 频繁的事件触发
 * 原理：事件触发n秒后才执行，如果在一个事件触发的n秒内又触发了这个事件，那就以新的事件时间为准，n秒后才执行。
 * 总之：事件触发完n秒内不再触发事件，才会执行
 */
function debounce(func, wait, immediate) {
    let timer, result;
    const debounced = function () {
        const self = this
        const args = [...arguments]
        if (timer) {
            clearTimeout(timer)
        }
        if (immediate) {
            // 立即执行
            const callNow = !timer
            timer = setTimeout(function() {
                timer = null
            }, wait)
            if (callNow) {
                result = func.apply(self, args)
            }
        } else {
            timer = setTimeout(function () {
                func.apply(self, args)
            }, wait)
        }
        return result
    }
    // 取消当前延时
    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }
    return debounced
}

container.onmousemove = debounce(getUserAction, 1000, false)