const express = require('express')
const config = require('./src/config/index') // 配置数据
const api = require('./src/api')
const app = express()
const configBase = require('./src/config/index') // 配置数据

// 端口
const port = config.serverPort || 3000

// 设置服务器跨域权限
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

// 1. 获取微信的sdk签名信息接口
app.get('/wxsdk/getSdkSign', async(req, res) => {
  const params = {}
  params.url = req.query.url

  // 获取微信的access_token参数
  var { access_token } = await api.accessToken()
  console.log('获取的access_token：', access_token)

  // // 通过 access_token 获取微信的 jsapi_ticket 临时票据
  var { ticket } = await api.jsapiTicket(access_token)
  console.log('获取的jsapi_ticket：', ticket)

  // 请求sign
  params.ticket = ticket
  var result = api.createSign(params)
  res.send(result)
})

// 2. 微信公众平台配置校验 token 接口
app.get('/wxsdk/checkToken', (req, res) => {
  console.log(123123)
  api.checkToken(req, res)
})

// 3.微信网页认证
app.get('/wxsdk/authUserInfo', (req, res) => {
  const redirectUrl = `/getUserInfo`
  const host = `http://127.0.0.1:3000`

  var authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${configBase.appid}&redirect_uri=` + `${encodeURIComponent(host + redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  console.log(123123, authorizeUrl)
  res.writeHead(302, {
    'location': authorizeUrl
  })
})

app.get('/wxsdk/getUserInfo', (req, res) => {
  console.log(23123123)
  const config = req.query
  console.log(config)
})


// 4.自动发送邮箱的服务接口
app.get('/wxsdk/smtp', (req, res) => {
  const config = req.query
  api.smtpEmail(config, res)
})

app.listen(port)

console.log()
console.log(`微信sdk服务已在${port}端口运行...`)
