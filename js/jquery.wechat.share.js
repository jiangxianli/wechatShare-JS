$(function(){
    //时间戳 签名用
    $timestamp =  (new Date()).valueOf();
    //随机字符串  签名用
    $random_str = _getRandomString(12);

    //appid 公众平台获取
    $appId = 'wx2c82806de7e9cc08';
    //jsapi_ticket
    $ticket = 'sM4AOVdWfPE4DxkXGEs8VDnS3fBKqYJzuUVszz1ewGT-IiclGQDBjUfES2xmFostIlqRBfQ_O-_Gqyuz3JL4gA';

    // 获取长度为len的随机字符串
    function _getRandomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    //sha1 生成签名
    function getSignature($ticket){
        $str = 'jsapi_ticket='+$ticket+'&noncestr='+$random_str+'&timestamp='+$timestamp+'&url='+location.href;
        return $.sha1($str);
    }

    $.extend({
        wechatShare: function($shareData) {
            wx.config({
                debug: false,
                appId: $appId,
                timestamp: $timestamp,
                nonceStr: $random_str,
                signature: getSignature($ticket),
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage($shareData);
                wx.onMenuShareTimeline($shareData);
                wx.onMenuShareQQ($shareData);
                wx.onMenuShareWeibo($shareData);
            });

        }

    });
})
