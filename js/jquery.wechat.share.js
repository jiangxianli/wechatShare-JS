$(function () {
    //时间戳 签名用
    $timestamp = (new Date()).valueOf();
    //随机字符串  签名用
    $random_str = _getRandomString(12);

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

    //获取AccessToken
    function getAccessToken(appId, appSecret, callback) {
        $.getJSON(
            'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret,
            function (response) {
                // {"access_token":"ACCESS_TOKEN","expires_in":7200}
                var ticket = getTicket(response.access_token);
                if (callback) {
                    callback(response.access_token);
                }

            }
        )
    }

    //获取Ticket
    function getTicket(accessToken, callback) {
        $.getJSON(
            'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi',
            function (response) {
                /*
                 {
                 "errcode":0,
                 "errmsg":"ok",
                 "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
                 "expires_in":7200
                 }
                 */
                var signature = getSignature(response.ticket);
                if (callback) {
                    callback(signature);
                }
            }
        )
    }

    //sha1 生成签名
    function getSignature($ticket) {
        $str = 'jsapi_ticket=' + $ticket + '&noncestr=' + $random_str + '&timestamp=' + $timestamp + '&url=' + location.href;
        return $.sha1($str);
    }

    $.extend({
        wechatConfig: function (config) {
            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timestamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: config.jsApiList
            });
        },
        wechatShare: function ($shareData) {
            var _default = {
                debug: false,
                timestamp: $timestamp,
                nonceStr: $random_str,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            };

            var config = $.extend(_default, $shareData);

            var appId = config.appId;
            var appSecret = config.appSecret;
            var accessToken = config.accessToken;
            var ticket = config.ticket;
            var signature = config.signature;

            if (signature) {
                $.wechatConfig(config);
            }
            else if (ticket) {
                config.signature = getSignature(ticket);
                $.wechatConfig(config)
            } else if (accessToken) {
                getTicket(accessToken, function (signature) {
                    config.signature = signature;
                    $.wechatConfig(config)
                })
            } else if (appSecret) {
                getAccessToken(appId, appSecret, function (access_token) {
                    getTicket(access_token, function (signature) {
                        config.signature = signature;
                        $.wechatConfig(config)
                    })
                })
            }

            wx.ready(function () {
                wx.onMenuShareAppMessage($shareData);
                wx.onMenuShareTimeline($shareData);
                wx.onMenuShareQQ($shareData);
                wx.onMenuShareWeibo($shareData);
            });

        }

    });
})
