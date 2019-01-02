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
    const args = [...arguments].slice(1)
    let c = context || window
    c.fn = this
    const result = c.fn(...args)
    delete c.fn
    return result
}

// console.log(bar.call2(foo, 'kevin', 18))

Function.prototype.apply2 = function(context) {
    const args = arguments[1]
    let c = context || window
    c.fn = this
    const result = c.fn(...args)
    delete c.fn
    return result
}

console.log(bar.apply2(foo, ['kevin', 18]))