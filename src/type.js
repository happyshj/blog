/**
 * 数据类型判断
 */
const number = 1              // number
const string = '123'          // string
const boolean = true          // boolean
const und = undefined         // undefined
const nul = null              // object
const symbol = Symbol()       // symbol

const obj = {a: 1}            // object
const array = [1, 2, 3]       // object
const date = new Date()       // 
const error = new Error()
const reg = /a/g
const func = function a(){}

/**
 * typeof
 */

// function checkTypeByTypeOf() {
//     for (let i = 0; i < arguments.length; i++) {
//         console.log(typeof arguments[i])
//     }
// }
typeof number     // number
typeof string     // string
typeof boolean    // boolean
typeof und        // undefined
typeof nul        // object
typeof symbol     // symbol

typeof obj        // object
typeof array      // object
typeof date       // object
typeof error      // object
typeof reg        // object
typeof func       // function

/**
 * Object.prototype.toString
 */
Object.prototype.toString.call(number)   // [object Number]
Object.prototype.toString.call(string)   // [object String]
Object.prototype.toString.call(boolean)  // [object Boolean]
Object.prototype.toString.call(und)      // [object Undefined]
Object.prototype.toString.call(nul)      // [object Null]
Object.prototype.toString.call(symbol)   // [object Symbol]

Object.prototype.toString.call(obj)      // [object Object]
Object.prototype.toString.call(array)    // [object Array]
Object.prototype.toString.call(date)     // [object Date]
Object.prototype.toString.call(error)    // [object Error]
Object.prototype.toString.call(reg)      // [object RegExp]
Object.prototype.toString.call(func)     // [object Function]

Object.prototype.toString.call(Math)     // [object Math]
Object.prototype.toString.call(JSON)     // [object JSON]
// Object.prototype.toString.call(arguments) // [object Arguments]

// function checkType() {
//     for (var i = 0; i < arguments.length; i++) {
//         console.log(Object.prototype.toString.call(arguments[i]))
//     }
// }

// checkType(number, string, boolean, und, nul, symbol, obj, array, date, error, reg, func)

/**
 * typeof与toString相结合
 */
let classType = {}
"Boolean Number String Symbol Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
    classType["[object " + item + "]"] = item.toLowerCase()
})

function checkType(obj) {
    // 为了兼容IE6（null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！）
    if (obj === null) {
        return 'null'
    }
    return typeof obj === 'object' || typeof obj === 'function'
        ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

/**
 * 检测plainObject （纯粹的对象，即通过{}或者new Object创建的）
 */
function isPlainObject(obj) {
    // 先排除掉不是obj的以及宿主对象如Window
    if (!obj || Object.prototype.toString(obj) !== '[object Object]') {
        return false
    }

    const proto = Object.getPrototypeOf(obj) // 获取该对象的原型

    // 如果没有原型，说明是纯碎的。如Object.create(null)
    if (!proto) {
        return true
    }

    const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor // 获取该对象原型的构造函数

    // 判断构造函数是不是Object构造函数，用于区分自定义构造函数和Object构造函数
    return typeof Ctor === 'function'
        && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object)
}

isPlainObject({})                        // true
isPlainObject(new Object())              // true
isPlainObject(Object.create(null))       // true
isPlainObject(Object.assign({}, {a: 1})) // true
isPlainObject(Object.create({}))         // false
function Person(name) {
    this.name = name;
}
isPlainObject(new Person('aaa'))        // false 

/**
 * 检测Window对象
 */
function isWindow(obj) {
    return obj !== null && obj === obj.window
}