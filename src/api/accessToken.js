// 获取 access_token
const config = require('../config/index') // 配置数据
const axios = require('axios') // 请求api

// (设置 | 获取)缓存方法
const cache = require('../utils/cache')

module.exports = () => {
  const fetchUrl = `${config.getAccessToken}?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`
  return new Promise(function(resolve, reject) {
    // 获取缓存
    cache.getCache('access_token', (cacheValue) => {
      // 缓存存在
      if (cacheValue) {
        const result = {
          access_token: cacheValue,
          from: 'cache'
        }
        console.log('读取缓存的access_token：', cacheValue, result)
        resolve(result)
      } else {
        // 调取微信api
        axios.get(fetchUrl).then(response => {
          console.log('请求微信的access_token：', response.data)
          resolve(response.data)
          // 设置缓存
          if (response.data.access_token) {
            cache.setCache('access_token', response.data.access_token)
          }
        }).catch(err => {
          console.log('axios occurs ', err)
          reject(err)
        })
      }
    })
  })
}
