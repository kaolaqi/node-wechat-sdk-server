import initWechatSdk from './servers/initWechatSdk'
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
}
