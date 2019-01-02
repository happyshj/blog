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

Function.prototype.bind2 = function (context) {
    if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
    }

    const self = this
    const args = [...arguments].slice(1)

    const fNOP = function () {}

    const fBOund = function () {
        const bindArgs = [...arguments]
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
    }

    fNOP.prototype = self.prototype
    fBOund.prototype = new fNOP()
    return fBOund
}

const bindFoo = bar.bind2(null, 'daisy')
// const obj = new bindFoo(18)
bindFoo(18)
// console.log(obj)