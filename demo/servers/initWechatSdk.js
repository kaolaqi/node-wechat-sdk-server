const axios = require('axios')
const configBase = require('../../src/config/index')
/**
 *
 * @param { 分享页面配置 } config
 * config.pageShareTitle 分享展示标题
 * config.pageShareURL 分享页面的链接地址
 * config.pageShareimgURL 分享展示图标
 * config.pageShareDesc 分享展示的描述
 */
export default function initWechatSdk(config = {}) {
  const pageShareURL = encodeURIComponent(window.location.href.split('#')[0])
  // 这里使用当前页面地址获取 微信sdk 的临时票据jsapi_ticket
  const apiSignURL = `${configBase.serverHost}/wxsdk/getSdkSign?url=${pageShareURL}`
  axios.get(apiSignURL).then(data => {
    console.log(data)
    if (data.status !== 200) {
      console.log('签名认证错！')
      return
    }
    const result = data.data
    const wx = window.wx
    const configInit = () => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxdc258dc994aea4db', // 必填，公众号的唯一标识
        timestamp: +result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'onMenuShareAppMessage',
          'previewImage',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ] // 必填，需要使用的JS接口列表
      })
      const wxConfig = {
        title: config.pageShareTitle || '',
        link: config.pageShareURL ? config.pageShareURL : result.url,
        imgUrl: config.pageShareimgURL
          ? config.pageShareimgURL +
            '?x-oss-process=image/resize,m_fixed,w_200,h_200/quality,Q_60'
          : 'https://glhres.oss-cn-hangzhou.aliyuncs.com/images/logo_share_zhengu.png?x-oss-process=image/resize,m_fixed,w_200,h_200/quality,Q_60',
        desc: config.pageShareDesc
      }
      wx.ready(() => {
        // 分享到PY圈
        wx.onMenuShareTimeline({
          title: wxConfig.title, // 分享标题
          link: wxConfig.link, //
          imgUrl: wxConfig.imgUrl // 分享图标
        })
        // 分享到qq
        wx.onMenuShareQQ(wxConfig)
        // 分享到腾讯微博
        wx.onMenuShareWeibo(wxConfig)
        // 分享到qq空间
        wx.onMenuShareQZone(wxConfig)
        wx.onMenuShareAppMessage({
          title: wxConfig.title, // 分享标题
          desc: wxConfig.desc, // 分享描述
          link: wxConfig.link, // 分享链接
          imgUrl: wxConfig.imgUrl,
          dataUrl: '',
          type: 'link',
          success: function() {
            console.log('执行分享')
          }
        })
      })
    }
    if (wx) {
      configInit()
    } else {
      setTimeout(() => {
        configInit()
      }, 2000)
    }
  })
}

// 这里有两个域名配置的参数要修改
// 1. 接口配置信息
// 指用来校验token的自定义接口
// 2. JS接口安全域名
// 指页面访问的链接地址 必须在配置的这个域名和对应子域名下才行 端口号无关
