// 获取 access_token
const config = require('../config/index') // 配置数据
const axios = require('axios') // 请求api
const CircularJSON = require('circular-json')

// (设置 | 获取)缓存方法
const cache = require('../utils/cache')

module.exports = (req, res) => {
  const fetchUrl = `${config.getAccessToken}?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`

  // 获取缓存
  cache.getCache('access_token', (cacheValue) => {
    // 缓存存在
    if (cacheValue) {
      const result = CircularJSON.stringify({
        access_token: cacheValue,
        from: 'cache'
      })
      res.end(result)
    } else {
      // 调取微信api
      axios.get(fetchUrl).then(response => {
        const json = CircularJSON.stringify(response.data)
        res.end(json)
        // 设置缓存
        if (response.data.access_token) {
          cache.setCache('access_token', response.data.access_token)
        }
      }).catch(err => {
        console.log('axios occurs ', err)
      })
    }
  })
}
