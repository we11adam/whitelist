/*
 * A white-list based PAC without regexp, by @janlay
 *
 * It's just simple and fast.
 * Last update: Dec 3, 2013
 * Special thanks to @Paveo
 */
function FindProxyForURL(url, host) {
    var PROXY = "PROXY 127.0.0.1:1080", 
        DEFAULT = "DIRECT";

    var parts = host.split('.'),
    // always use proxy, even if inHosts or domains are matched
        overrideDomains = [
            'nytimes.com',
            'fbcdn.net',
            'sstatic.net',
            'gstatic.com',
            'cdn.api.twitter.com',
            'cloudflare.com',
            'ytimg.com'
        ],

    // domain/host starts with
        prefixes = ['cn', 'china'],

    // indexOf searching
        inHosts = [
            '123', '168', '51', '58', '86', '91', 'bj', 'zj', 'ali', 'tao', 'tmall', 'qq', 'tencent', 'cdn', 'china',
            'local'
        ],


    // domains end with
        domains = [
            'cn', '10010.com', '115.com', '115img.com', '126.com', '126.net', '163.com', '24quan.com', '265.com',
            '39.net', 'admin5.com', 'apple.com', 'mzstatic.com', 'appinn.com', 'baidu.com', 'baixing.com',
            'bdimg.com', 'go2map.com', 'blogbus.com', 'blueidea.com', 'bokee.net', 'caing.com', 'ccb.com',
            'comsenz.com', 'csdn.net', 'ct10000.com', 'ctrip.com', 'dangdang.com', 'daqi.com', 'diandian.com',
            'dianping.com', 'discuz.net', 'donews.com', 'douban.com', 'dpfile.com', 'dream4ever.org',
            'eastmoney.com', 'elong.com', 'et8.org', 'fengniao.com', 'ganji.com', 'gfan.com',
            'goodbabygroup.com', 'gougou.com', 'gtimg.com', 'hi-pda.com', 'hiapk.com', 'huaban.com',
            'huanqiu.com', 'hudong.com', 'iciba.com', 'img-space.com', 'infzm.com', 'ip138.com', 'jandan.net',
            'jiepang.com', 'kaixin001.com', 'ku6.com', 'ku6img.com', 'lampdrive.com', 'lashou.com',
            'lashouimg.com', 'manzuo.com', 'mapabc.com', 'mapbar.com', 'meituan.com',
            'microsoft.com', 'mozilla.org', 'mop.com', 'mtime.com', 'mydrivers.com', 'nbweekly.com',
            'netease.com', 'nuomi.com', 'onlinedown.net', 'paipai.com', 'pchome.net', 'pcpop.com', 'pengyou.com',
            'ppstream.com', 'pptv.com', 'qiyi.com', 'qunar.com', 'qvbuy.com', 'renren.com', 'rrimg.com',
            'sanguosha.com', 'sdo.com', 'sf-express.com', 'sina.com', 'iask.com', 'sinaimg.com', 'sogou.com',
            'sohu.com', 'soku.com', 'soso.com', 'soufun.com', 'soufunimg.com', 'tdimg.com', 'tenpay.com',
            'tgbus.com', 'tmall.com', 'tudou.com', 'tudouui.com', 'uusee.com', 'vcimg.com', 'verycd.com',
            'weibo.com', 'weiphone.com', 'xiami.com', 'xiami.net', 'xici.net', 'xilu.com', 'xinhuanet.com',
            'xinnet.com', 'xitek.com', 'xunlei.com', 'yesky.com', 'yihaodian.com', 'yihaodianimg.com',
            'ykimg.com', 'ynet.com', 'youdao.com', 'youku.com', 'yupoo.com', 'zaobao.com', 'zhaopin.com',
            'zhihu.com', 'idailyapp.com', 'logmein.com', 'my.cl.ly', 'synacast.com', 'pplive.com', 'eyoudi.com',
            'kuaidi100.com', 'bdstatic.com', 'fastif.net', 'duapp.com', 'xiachufang.com', 'ttg.im', 'hdwing.com',
            'wandoujia.com', 'wdjimg.com', 'chdbits.org', 'zhi.hu', 'join.me', 'static.com', 'img.com',
            'imgur.com', 'images-amazon.com', 'smzdm.com', 'ycombinator.com', 'gravatar.com', 'v2ex.com',
            'dream4ever.org', 'linezing.com', 'baihui.com',
            'yhd.com'
        ];

    // ignore local host name. eg: http://localhost
    if (isPlainHostName(host)) return DEFAULT;

    // force proxy by url. eg: http://foo.com/?bar=1&fuckgfw
    if (url.indexOf('fuckgfw') > 0) return PROXY;

    // test plain IP
    var lastChar = host.substring(host.length - 1);
    if (lastChar >= '0' && lastChar <= '9') return DEFAULT;

    var i, len;
    // force proxy by domain. eg: http://cn.nytimes.com
    for (i = 0, len = overrideDomains.length; i < len; i++) {
        if (dnsDomainIs(host, overrideDomains[i])) return PROXY;
    }

    // domain/ip prefix. eg: http://60.1.2.3
    for (i = 0, len = prefixes.length, part = parts[0] + '.'; i < len; i++) {
        if (prefixes[i] + '.' === part) return DEFAULT;
    }

    // match main domain. eg: http://www.verycd.com, http://ip138.com/
    for (i = 0, len = domains.length; i < len; i++) {
        if (dnsDomainIs(host, domains[i])) return DEFAULT;
    }

    // search pattern in domains. eg: https://www.51job.com, https://www.alipay.com
    for (i = 0, len = inHosts.length; i < len; i++) {
        if (host.indexOf(inHosts[i]) >= 0) return DEFAULT;
    }

    // for all other host, default to proxy.
    return PROXY;
}

