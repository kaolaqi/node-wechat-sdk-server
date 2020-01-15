module.exports = {
  // 微信sdk参数配置
  token: 'asdfasdfasdf',
  appid: 'wxdc258dc994aea4db',
  appsecret: '05cf283e25ed6cbd237e054f54dcbbf2',
  getJsapiTicket: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=',
  getAccessToken: 'https://api.weixin.qq.com/cgi-bin/token',

  // 系统配置
  serverPort: 3000, // sdk服务启动端口 选填，不传默认3000端口
  // serverHost: 'http://www.nglmq.com', // sdk服务运行的服务器地址
  serverHost: 'http://localhost:3000', // 本地运行npm run server, 启动本地的sdk服务运行的测试地址

  // smtp邮箱服务配置
  emailAddress: '1540750371@qq.com', // sdk服务启动端口 选填，不传默认3000端口
  smtpPassword: 'hsqixkanpufxgbeg' // sdk服务运行的服务器地址
}
