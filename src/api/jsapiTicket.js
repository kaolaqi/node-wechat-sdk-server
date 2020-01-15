// 通过 access_token 获取 jsapi_ticket 临时票据
const axios = require('axios') // 请求api
const config = require('../config/index')
const cache = require('../utils/cache')

module.exports = (access_token) => {
  const fetchUrl = config.getJsapiTicket + access_token
  // 判断是否存在于缓存中
  const cacheName = 'jsapi_ticket'
  return new Promise((resolve, reject) => {
    cache.getCache(cacheName, function(cacheValue) {
      if (cacheValue) {
        const result = {
          ticket: cacheValue,
          from: 'cache'
        }
        console.log('读取缓存的jsapi_ticket：', cacheValue, result)
        resolve(result)
      } else {
        // 调取微信api
        axios.get(fetchUrl).then(response => {
          console.log('请求微信的jsapi_ticket：', response.data)
          resolve(response.data)
          // 设置缓存
          if (response.data.ticket) {
            cache.setCache(cacheName, response.data.ticket)
          }
        }).catch(err => {
          console.log('axios occurs ', err)
          reject(err)
        })
      }
    })
  })
}
