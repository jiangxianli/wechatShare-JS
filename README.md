# wechatShare-JS
微信JSSDK分享到朋友圈、微博、QQ好友。
## 前置工作
>1.登录微信工作平台 进入“公众号设置” > “功能设置” > “JS接口安全域名” 中 ,添加使用微信JS接口的域名(只支持域名,不支持IP)。\<br>填写的JS接口安全域名要求是一级或一级以上域名，须通过ICP备案的验证，可填写三个域名(例：qq.com)。

>2.进入[微信公众平台接口调试工具](https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=%E5%9F%BA%E7%A1%80%E6%94%AF%E6%8C%81&form=%E8%8E%B7%E5%8F%96access_token%E6%8E%A5%E5%8F%A3%20/token "微信公众平台接口调试工具")获取access_token,这里需要用到appId和appSecret。

>3. https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=你获取到的access_token&type=jsapi

   >将这个地址放到浏览器地址栏访问 ,你会得到如下格式的数据
   
   >{"errcode":0,"errmsg":"ok","ticket":"sM4AOVdWfPE4DxkXGEs8VDnS3fBKqYJzuUVszz1ewGT-IiclGQDBjUfES2xmFostIlqRBfQ_O-_Gqyuz3JL4gA","expires_in":7200}
   其中的ticket就是本次插件中要用到的数据。

## 准备工作
>1.引入jquery、sha1加密、weixin、share插件这4个JS文件
     
     <script src="js/jquery-1.11.1.js"></script>
     
     <script src="js/jquery.sha1.js"></script>
     
     <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
     
     <script src="js/jquery.wechat.share.js"></script>
    
>2.打开jquery.wechat.share.js文件，将下列两个参数改成自己的就好了。

   >//appid 公众平台获取

   >$appId = 'wx2c82806de7e9cc08';

   >//jsapi_ticket

   >$ticket = 'sM4AOVdWfPE4DxkXGEs8VDnS3fBKqYJzuUVszz1ewGT-IiclGQDBjUfES2xmFostIlqRBfQ_O-_Gqyuz3JL4gA';

   
## 使用
   >在页面中添加script脚本
   ```javascript
   <script>
      $(function(){
         var shareData = {
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

   

    
    




