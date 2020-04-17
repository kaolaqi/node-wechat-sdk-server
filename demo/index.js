import initWechatSdk from './servers/initWechatSdk'
const axios = require('axios') // 请求api
import vconsole from 'vconsole'
new vconsole()

window.onload = function() {
  console.log(8989)
  initWechatSdk({
    pageShareTitle: '测试sdk自定义配置标题',
    pageShareURL: 'http://lmq.frp.nglmq.com:8010/',
    pageShareimgURL: 'http://nglmq.com/images/avatar.jpg',
    pageShareDesc: '测试sdk测试成功了，哈哈哈'
  })
  console.log(wx)

  document.getElementById('weChatAuth').addEventListener('click', function() {
    console.log('用户触发执行微信认证事件，跳转到对应的认证页面')
    // axios.get('http://sdk-server.frp.nglmq.com:8010/wxsdk/authUserInfo?pageUrl=' + location.href).then(data => {
    //   console.log(data)
    // })
    // window.location = 'http://sdk-server.frp.nglmq.com:8010/wxsdk/authUserInfo?pageUrl=' + location.origin + location.pathname
    // window.location = 'http://sdk-server.frp.nglmq.com:8010/wxsdk/authUserInfo?pageUrl=' + location.href

    window.location = 'http://sdk-server.frp.nglmq.com:8010/wxsdk/wechatAuthLogin?pageUrl=' + location.href
  })
}
