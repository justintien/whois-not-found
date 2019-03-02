#!/usr/bin/env node

/**
 * 0: node
 * 1: /Users/mjr/work/node/process-2.js
 * 2: ... 使用者参数
 */
const argv = process.argv
const env = process.env

// argv
let rootDomain = argv[2] || 'tw'
let length = argv[3] || 3
let type = argv[3] || 'en' // 'en' or number

const whois = require('whois-api');

/**
 * 依據 ascii code range 產生字典
 *
 * @param {array} [asciiRange=[97,122]] 要產生的字典 (預設是 97 = a ~ 122 = z), 數定是 48 ~ 57
 * @param {number} [length=3] 每個字的長度
 * @param {array} [dictArr=[]]
 * @param {number} [position=0]
 * @param {array} [result=[]]
 * @returns
 */
function generateDict (asciiRange = [97,122], length = 3, dictArr = [], position = 0, result = []) {
    let [ start, end ] = asciiRange

    if (position > length) return

    position++

    for (let i = start; i <= end; i++) {
        let str = String.fromCharCode(i)
        
        if (position >= length) { // end
            result.push(dictArr.join('') + str)
            continue
        }
        dictArr.push(str)
        generateDict(asciiRange, length, dictArr, position, result)
        dictArr.pop()
    }

    return result
}

let asciiRange = type === 'en' ? [97,122] : [48,57]
let domains = generateDict(asciiRange, length)

let list = []
let notList = []
let errList = []

domains.map((val, index) => {
    let dns = val + '.' + rootDomain
    setTimeout(() => {
        whois.lookup(dns, (error, result) => {
            if (error) {
                console.error(dns, 'error', error, result)
                errList.push(dns)
            } else {
                if (result.registrar) {
                    list.push(dns)
                } else {
                    console.log(dns, 'not found (可註冊)', error, result)
                    notList.push(dns)
                }
            }
        });
    }, index * 1000)
})