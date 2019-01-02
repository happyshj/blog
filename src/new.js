// 模拟new
function objectFactory() {
    const obj = new Object()
    const constructor = [...arguments].shift()
    obj.__proto__ = constructor.prototype
    const ret = constructor.apply(obj, [...arguments].slice(1))
    return typeof ret === 'object' ? ret : obj
}