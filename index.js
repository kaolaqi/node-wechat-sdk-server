const express = require('express')
const path = require('path')
const config = require('./src/config/index') // 配置数据
const axios = require('axios') // 请求api
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
  api.checkToken(req, res)
})


// 3.微信网页认证
app.get('/wxsdk/wechatAuthLogin', function(req, res) {
  // 业务页面地址传入
  res.sendFile(path.resolve(__dirname, 'wechatAuthLogin.html'), { pageUrl: req.query.pageUrl })
  // res.redirect('/wechatAuthLogin.html?pageUrl=' + req.query.pageUrl)
  // res.send()
})

app.get('/wxsdk/authUserInfo', (req, res) => {
  console.log(req.query)
  const orangeUrl = req.query.pageUrl

  const redirectUrl = `/wxsdk/getUserInfo`
  // const host = `http://127.0.0.1:3000`
  const host = 'http://sdk-server.frp.nglmq.com:8010'

  var authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${configBase.appid}&redirect_uri=` + `${encodeURIComponent(host + redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=${orangeUrl}#wechat_redirect`
  res.redirect(authorizeUrl)
  res.end('asdfasdfad')
})

app.get('/wxsdk/getUserInfo', (req, res) => {
  console.log(23123123)
  const config = req.query
  console.log(config)

  const code = req.query.code
  const getaccess = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + `${configBase.appid}&secret=${configBase.appsecret}&code=${code}&grant_type=authorization_code`
  // 通过拿到的code和appID、app_serect获取access_token和open_id
  // console.log('token1111111', getaccess)
  axios.get(getaccess).then(result => {
    console.log('token1111111', result.data)
    var tokenInfo = result.data
    var userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenInfo.access_token}&openid=${tokenInfo.openid}&lang=zh_CN`
    axios.get(userInfoUrl).then(data => {
      console.log('用户信息：', data.data)
      res.redirect(`${req.query.state}?nickname=${data.data.nickname}&headimgurl=${data.data.headimgurl}`)
      res.send(data.data)
    })
  })
})


// 4.自动发送邮箱的服务接口
app.get('/wxsdk/smtp', (req, res) => {
  const config = req.query
  api.smtpEmail(config, res)
})


// 5. ======小程序代理转发接口========
// a.疫情获取全球是实时数据转发接口
app.get('/wxsdk/miniprograme/groble-countries', (req, res) => {
  const config = req.query
  const fetchUrl = 'https://corona.lmao.ninja/v2/countries' + (config.sort ? ('?sort=' + config.sort) : '')
  axios.get(fetchUrl).then(result => {
    console.log('疫情响应数据：', result.data)
    res.send(result.data)
  })
})
// b.指定国家近期每日疫情变化数据
app.get('/wxsdk/miniprograme/countries-daily-data', (req, res) => {
  const config = req.query
  const fetchUrl = `https://corona.lmao.ninja/v2/historical/${config.country}?lastdays=${config.days || 40}`
  axios.get(fetchUrl).then(result => {
    console.log('指定国家每日疫情响应数据：', result.data)
    res.send(result.data)
  })
})
// ==================================


app.listen(port)

console.log()
console.log(`微信sdk服务已在${port}端口运行...`)
