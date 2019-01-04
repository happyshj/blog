/**
 * 数组去重方法总结
 */
const arr = [1, 1, '1', '1']

// 双层循环
function unique1(arr) {
    const iLen = arr.length, rest = []
    for (let i = 0; i < iLen; i++) {
        let j = 0, jLen
        for (jLen = rest.length; j < jLen; j++) {
            if (arr[i] === rest[j]) {
                break
            }
        }
        if (j === jLen) {
            rest.push(arr[i])
        }
    }
    return rest
}

// console.log(unique1(arr))

// indexOf
function unique2(arr) {
    const iLen = arr.length, rest = []
    for (let i = 0; i < iLen; i++) {
        if (rest.indexOf(arr[i]) === -1) {
            rest.push(arr[i])
        }
    }
    return rest
}

// console.log(unique2(arr))

// 排序后去重
function unique3(arr) {
    const arrT = [...arr]
    arrT.sort()

    // 判断当前元素是否与前一个元素相同
    const iLen = arrT.length, rest = []
    let seen
    for(let i = 0; i < iLen; i++) {
        if (!i || seen !== arrT[i]) {
            rest.push(arrT[i])
        }
        seen = arrT[i]
    }
    return rest
}
// console.log(unique3(arr))

// 是否排序+indexOf
function unique23(arr, isSorted) {
    const iLen = arr.length, rest = []
    let seen
    for (let i = 0; i < iLen; i++) {
        if (isSorted) {
            if (!i || seen !== arr[i]) {
                rest.push(arr[i])
            }
            seen = arr[i]
        } else {
            if (rest.indexOf(arr[i]) === -1) {
                rest.push(arr[i])
            }
        }
    }
    return rest
}
// console.log(unique23(arr, true))

// 使用filter+indexOf方法
function unique4(arr) {
    return arr.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
}
// console.log(unique4(arr))

// 使用filter+sort方法
function unique5(arr) {
    return arr.filter((item, index, array) => {
        return !index || item !== array[index - 1]
    })
}
// console.log(unique5(arr))

// 使用对象的键值对
function unique6(arr) {
    const iLen = arr.length, rest = {}
    return arr.filter((item, index, array) => {
        const temp = typeof item + JSON.stringify(item)
        return rest.hasOwnProperty(temp) ? false : (rest[temp] = true)
    })
}
console.log(unique6(arr))

// Set+Array.from
function unique7(arr) {
    return Array.from(new Set(arr))
}

// Set+rest运算符
function unique8(arr) {
    return [...new Set(arr)]
}

// Map
function unique9(arr) {
    const seen = new Map()
    return arr.filter(item => {
        return !seen.has(item) && seen.set(item, true)
    })
}

// includes
function unique10(arr) {
    const rest = [], iLen = arr.length
    for (let i = 0; i < iLen; i++) {
        if (!rest.includes(arr[i])) {
            rest.push(arr[i])
        }
    }
}