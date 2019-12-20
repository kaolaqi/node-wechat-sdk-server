module.exports = {
  // 微信sdk参数配置
  token: 'asdfasdfasdf',
  appid: 'wxdc258dc994aea4db',
  appsecret: '05cf283e25ed6cbd237e054f54dcbbf2',
  getJsapiTicket: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=',
  getAccessToken: 'https://api.weixin.qq.com/cgi-bin/token',

  // 系统配置
  serverPort: 3000, // sdk服务启动端口 选填，不传默认3000端口
  serverHost: 'http://server.frp.nglmq.com:8010' // sdk服务运行的服务器地址
}
