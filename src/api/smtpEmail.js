
const nodemailer = require('nodemailer')
const configBase = require('../config/index')

const transporter = nodemailer.createTransport({
  service: 'qq', // https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
  port: 465, // SMTP 端口
  secureConnection: true, // 使用 SSL
  auth: {
    user: configBase.emailAddress,
    pass: configBase.smtpPassword // 这里密码不是qq密码，是你设置的smtp密码
  }
})

/**
 * @param {object} config
 * config.fromEmail 发送收件的邮箱 必须为上面创建服务的邮箱 (必填)
 * config.toEmail 姐搜收件的邮箱，多个邮箱用分号隔开 (必填)
 * config.subject 邮件标题 (必填)
 * config.text 邮件的文本内容
 * config.html 邮件的html富文本内容  和text二选一，都填写选择html的内容
 */
module.exports = function(config, res) {
  if (!config.text && !config.html) {
    res.send({
      returnCode: 202,
      data: null,
      message: '请填写发送邮件的内容文本或者html字符串'
    })
    return
  }
  const mailOptions = {
    from: config.fromEmail || configBase.emailAddress,
    to: config.toEmail, // 收件列表,多个收件邮箱逗号隔开
    subject: config.subject || '自动发送邮件标题'
  }
  // text和html两者同时只支持一种
  if (config.text) {
    mailOptions.text = config.text
  }
  if (config.html) {
    mailOptions.html = config.html
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.send({
        returnCode: 201,
        data: null,
        message: '邮件发送失败' + error
      })
    } else {
      console.log('Message sent: ' + info.response)
      res.send({
        returnCode: 200,
        data: info.response,
        message: '邮件发送成功'
      })
    }
  })
}
