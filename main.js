const fs = require('fs')
const path = require('path')
const request = require('./util/request')
const { cookieToJson } = require('./util/index')

let obj = {}
fs.readdirSync(path.join(__dirname, 'module'))
  .reverse()
  .forEach((file) => {
    if (!file.endsWith('.js')) return
    let fileModule = require(path.join(__dirname, 'module', file))
    obj[file.split('.').shift()] = function (data) {
      let paramsObj = {}
      if (data !== undefined) {
        if (typeof data.cookie === 'string') {
          data.cookie = cookieToJson(data.cookie)
        }
        paramsObj = {
          ...data,
          cookie: data.cookie ? data.cookie : {},
        }
      }
      return fileModule(
        paramsObj,
        request,
      )
    }
  })
console.log('objobj', obj);

module.exports = obj
