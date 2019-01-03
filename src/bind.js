// 模拟bind
const foo = {
    value: 1
}

var value = 2

function bar(name, age) {
    this.habit = 'shopping'
    console.log(name)
    console.log(age)
    console.log(this.value)
}

bar.prototype.friend = 'kevin'

/**
 * 模拟bind函数的实现
 * 最后是return一个函数，this值改变，并且有参数
 * bind函数还可以作为构造函数，这时候忽略this
 * 使用instanceof判断是否是构造函数
 */
Function.prototype.bind2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
    }

    const self = this // 相当于bar方法
    // 设置this
    let obj
    if (context === null || context === undefined) {
        obj = window
    } else {
        obj = Object(context)
    }
    // 设置第一次传递的参数
    const args = [...arguments].slice(1)

    // 设置空函数
    const funP = function () {}

    // 返回绑定this后的方法
    const bindF = function() {
        const bindSelf = this
        if (bindSelf instanceof bindF) {
            // 说明是构造函数
            obj = bindSelf
        }
        // 设置执行bind函数时传递的参数
        const bindArgs = [...arguments]
        // 借用call
        const result = self.apply(obj, args.concat(bindArgs))
        return result
    }
    funP.prototype = self.prototype
    bindF.prototype = new funP()
    return bindF
}

const bindFoo = bar.bind2(null, 'daisy')
// const obj = new bindFoo(18)
bindFoo(18)
// console.log(obj)