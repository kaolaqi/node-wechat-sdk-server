# node 提供微信 sdk 服务的 demo

## 一. 开启微信 sdk 服务

```javascript
    启动服务： npm run server
    运行端口： 默认3000端口
```

### 对外接口

1. 提供给微信验证token的接口

> * 接口地址：`${运行域名地址}/wxsdk/checkToken`
> * 在微信开发者平台的 **基本配置** => [服务器配置](https://mp.weixin.qq.com/advanced/advanced?action=interface&t=advanced/interface&token=980142776&lang=zh_CN)
> * 修改配置时，微信会自动给填入的URL发送get请求，并携带以下参数
>
> ``` javascript
>   req.query = {
>       signature
>       echostr
>       timestamp
>       nonce
>   }
> ```

2. 项目接入sdk服务获取签名认证

> * 接口地址：`${运行域名地址}/wxsdk/getSdkSign`
> * 要引入微信sdk的页面在head里面引入微信sdk包 `<script src="//res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>`后，页面调用这个接口获取服务的签名认证，参考对外服务文件`/demo/servers/initWechatSdk.js`，引入所需要的接口即可。

### 对外服务

服务文件: `/demo/servers/initWechatSdk.js`

> 对外提供 **`initWechatSdk(config)`** 函数初始化sdk，里面已包含了基本的分享服务
>
> ``` javascript
> config = {
>   pageShareTitle: '分享展示标题',
>   pageShareURL: '分享页面的链接地址',
>   pageShareimgURL: '分享展示图标',
>   pageShareDesc: '分享展示的描述'
> }

### 注意事项
