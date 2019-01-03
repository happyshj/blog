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
 * 节流
 * 原理：如果持续触发事件，每隔一段时间，只执行一次事件
 * 实现方式：两种主流的实现方式：1. 使用时间戳 2. 设置定时器
 */

// 使用时间戳实现节流（可以实现立即执行，退出后立即不执行）
function throttle1(func, wait) {
    let context
    let args
    let previous = 0

    return function() {
        const now = Date.now()
        context = this // 当前的dom
        args = arguments

        if (now - previous > wait) {
            func.apply(context, args)
            previous = now
        }
    }
}

// container.onmousemove = throttle1(getUserAction, 1000)

// 使用定时器实现节流(可以实现退出后再执行一次)
function throttle2(func, wait) {
    let context
    let args
    let timer

    return function() {
        context = this
        args = arguments
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args)
                timer = null
            }, wait)
        }
    }
}

// container.onmousemove = throttle2(getUserAction, 1000)

// 双剑合璧
function throttle3(func, wait) {
    let context
    let args
    let timer
    let previous = 0

    const throttled = function() {
        context = this
        args = arguments
        const now = Date.now()
        const remain = wait - (now - previous) // 执行事件剩余间隔时间

        if (remain <= 0 || remain > wait) {
            // 超过了间隔时间触发事件，直接执行 或者向前调整了时间，直接执行
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            func.apply(context, args)
        } else if (!timer) {
            // 不再触发事件，执行最后一次事件
            timer = setTimeout(function() {
                func.apply(context, args)
                timer = null
                previous = Date.now()
            }, wait)
        }
    }
    return throttled
}