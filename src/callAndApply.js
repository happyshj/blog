// 模拟call和apply
const foo = {
    value: 1
}
var value = 2


function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
    return {
        name,
        age,
        value: this.value
    }
}

/**
 * 1. 将函数设为对象的属性
 * 2. 执行该函数
 * 3. 删除该函数
 */
Function.prototype.call2 = function(context) {
    const self = this
    let obj
    if (context === null || context === undefined) {
        obj = window
    } else {
        obj = Object(context)
    }
    const args = [...arguments].slice(1) // 后面的参数
    let result
    obj.fn = self
    result = obj.fn(...args)
    delete obj.fn
    return result
}

// console.log(bar.call2(foo, 'kevin', 18))

Function.prototype.apply2 = function(context) {
    const self = this // 调用apply的函数
    // 设置apply修改的this
    let obj
    if (context === null || context === undefined) {
        obj = window
    } else {
        obj = Object(context)
    }
    // 传递的参数
    const args = arguments[1] || []

    // 模拟apply
    obj.fn = self
    const result = obj.fn(...args)
    delete obj.fn
    return result
}

console.log(bar.apply2(foo, ['kevin', 18]))