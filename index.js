const express = require('express')
const runNestMiddleware = require('run-middleware')
const config = require('./src/config/index') // 配置数据
const api = require('./src/api')
const app = express()

// 端口
const port = config.serverPort || 3000

// 设置服务器跨域权限
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

// 接口内部嵌套连续调用中间件
runNestMiddleware(app)

// accessToken 获取token
app.get('/wxsdk/getAccessToken', (req, res) => {
  api.accessToken(req, res)
})

// 获取 jsapi_ticket 临时票据
app.get('/wxsdk/getTicket', (req, res) => {
  app.runMiddleware('/wxsdk/getAccessToken', (code, body, headers) => {
    const result = JSON.parse(body)
    console.log('User token:', result.access_token)
    api.jsapiTicket(result.access_token, res)
  })
})

// 获取 jsapi_ticket 临时票据
app.get('/wxsdk/getSdkSign', (req, res) => {
  const params = {}
  console.log(req.query)
  params.url = req.query.url
  /**
   * runMiddleware 请求别的 endPoint 获取 jsapi_ticket
   */
  app.runMiddleware('/wxsdk/getTicket', (code, body, headers) => {
    const result = JSON.parse(body)
    console.log('User ticket:', result.ticket)
    params.ticket = result.ticket
    api.createSign(params, res)
  })
})

// 微信公众平台配置校验 token 接口
app.get('/wxsdk/checkToken', (req, res) => {
  console.log(123123)
  api.checkToken(req, res)
})

app.listen(port)

console.log()
console.log(`微信sdk服务已在${port}端口运行...`)
