var accessToken = require('./accessToken')
var jsapiTicket = require('./jsapiTicket')
var createSign = require('./createSign')
var checkToken = require('./checkToken')

// 发送邮件服务
var smtpEmail = require('./smtpEmail')

module.exports = {
  accessToken,
  jsapiTicket,
  createSign,
  checkToken,

  smtpEmail
}
