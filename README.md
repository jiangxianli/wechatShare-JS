# wechatShare-JS
微信JSSDK分享到朋友圈、微博、QQ好友。
##升级
为了更灵活的使用，请使用V0.1.1版本，原[V0.1.0](https://github.com/jiangxianli/wechatShare-JS/tree/v0.1.0)请点击这里查看。
## JS-SDK使用权限签名算法步骤
1. 使用appId、appSecret获取AccessToken:
> http请求方式: GET
> https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
> 返回参数：
> {"access_token":"ACCESS_TOKEN","expires_in":7200}
> 文档地址：
> https://mp.weixin.qq.com/wiki/15/54ce45d8d30b6bf6758f68d2e95bc627.html

2. 使用1）中AccessToken获取jsapi_ticket:
> http请求方式: GET
> https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
> 返回参数：
> {"errcode":0,"errmsg":"ok","ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA","expires_in":7200}

3. 使用2）中jsapi_ticket生成signature:
> 签名生成规则如下：参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。

## 准备工作
>1.引入jquery、sha1加密、weixin、share插件这4个JS文件

    <script src="js/jquery-1.11.1.js"></script>
    <script src="js/jquery.sha1.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="js/jquery.wechat.share.js"></script>

## 使用
   >在页面中添加script脚本,建议通过后台产生签名的方式写入到前端页面，这样更安全(推荐使用优先级如下)

```javascript
<script>
  $(function(){

    //第一种方式：使用appId,signature
    var shareData = {
        appId: 'wx2c82806de7e9cc08',
		signature: '0f9de62fce790f9a083d5c99e95740ceb90c27ed',
        title: '标题',
        desc: '简介',
        link: '分享的链接。一般可以用location.href',
        imgUrl: '分享的图片链接地址(图片一定要是网络图片地址哦，这样才能保证别人看到的图片是正常显示的)'
    };
    $.wechatShare(shareData);

    //第二种方式：使用appId,accessToken
    shareData = {
        appId: 'wx2c82806de7e9cc08',
        accessToken: '37vCDdOYC1nbgDZD__-Qs_poFtAmYkumU7xxxxx6Lj66_xJ8bj8LDFY3SwvBe1QHQ4HT_fzMjSAZeeQ-BhvVvUh8K00j4CWFOVa-N4QQTcAFAVVY',
        title: '标题',
        desc: '简介',
        link: '分享的链接。一般可以用location.href',
        imgUrl: '分享的图片链接地址(图片一定要是网络图片地址哦，这样才能保证别人看到的图片是正常显示的)'
    };
    $.wechatShare(shareData);

    //第三种方式：使用appId,appSecret
    shareData = {
        appId: 'wx2c82806de7e9cc08',
        appSecret: 'cc4c224b50fkjlksdafkldfsakljsdfk',
        title: '标题',
        desc: '简介',
        link: '分享的链接。一般可以用location.href',
        imgUrl: '分享的图片链接地址(图片一定要是网络图片地址哦，这样才能保证别人看到的图片是正常显示的)'
    };
    $.wechatShare(shareData);
  })
</script>
```

## 完毕
   >是不是感觉非常简单～～