// 提供给微信做token校验

const crypto = require('crypto')
const config = require('../config/index') // 配置数据

// sha1加密
function sha1(str) {
  const shasum = crypto.createHash('sha1')
  shasum.update(str)
  str = shasum.digest('hex')
  return str
}

/**
 *  @param { object } req
 *  在微信开发者平台的 基本配置=> 服务器配置 https://mp.weixin.qq.com/advanced/advanced?action=interface&t=advanced/interface&token=980142776&lang=zh_CN
 *  修改配置时，微信会自动给填入的URL发送get请求，并携带一下参数
 *  req.query = {
 *      signature
 *      echostr
 *      timestamp
 *      nonce
 *  }
 *  接口内部校验 token 是否通过
 *  通过则返回 query.echostr
 */
module.exports = (req, res) => {
  console.log(7878, req.query)
  const query = req.query
  var signature = query.signature
  var echostr = query.echostr
  var timestamp = query['timestamp']
  var nonce = query.nonce
  var oriArray = new Array([])
  oriArray[0] = nonce
  oriArray[1] = timestamp
  oriArray[2] = config.token // 这里是你在微信开发者中心页面里填的token
  oriArray.sort()
  var original = oriArray.join('')
  console.log('Original str : ' + original)
  console.log('Signature : ' + signature)
  var scyptoString = sha1(original)
  if (signature == scyptoString) {
    res.end(echostr)
    console.log('Confirm and send echo back')
  } else {
    res.end('false')
    console.log('Failed!')
  }
}
