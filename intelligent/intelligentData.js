//intelligent mode
class IntelligentData {
    constructor( url, rule) {
		this.url = url;
        this.rule = rule;//DIRECT,PROXY,BLOCK,SYSTEM
        this.scheme = null;//http,https,socks4,socks5
        this.host = null;
        this.port = null;
    }
    constructor( url, rule, proxy) {
		this.url = url;
        this.rule = rule;//DIRECT,PROXY,BLOCK,SYSTEM
		if(proxy == null){
			this.scheme = null;//http,https,socks4,socks5
			this.host = null;
			this.port = null;
		}
		else{
			if(proxy.scheme == null){
				this.scheme = "socks5";//http,https,socks4,socks5
			}
			if(proxy.host == null){
				this.host = "127.0.0.1";
			}
			if(proxy.port == null){
				this.port = 1080;
			}
		}
        this.scheme = proxy.scheme;//http,https,socks4,socks5
        this.host = proxy.host;
        this.port = proxy.port;
    }
}
var intelligentModeSettings = {
	//初始化
	//file list
	//直连域名列表
	directListFile_isEnable : true ,
	directListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/direct-list.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/direct-list.txt"
	],
	//代理域名列表
	proxyListFile_isEnable : true ,
	proxyListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/proxy-list.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/proxy-list.txt"
	],
	//广告列表
	adListFile_isEnable : false ,
	adListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/reject-list.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/reject-list.txt"
	],
	//@felixonmars/dnsmasq-china-list 仓库收集的在中国大陆可直连的域名列表
	chinaListFile_isEnable : false ,
	chinaListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/china-list.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/china-list.txt"
	],
	//Apple 在中国大陆可直连的域名列表
	appleCNListFile_isEnable : false ,
	appleCNListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/apple-cn.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/apple-cn.txt"
	],
	//Google 在中国大陆可直连的域名列表 
	googleCNListFile_isEnable : false ,
	googleCNListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/google-cn.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/google-cn.txt"
	],
	//GFWList 域名列表 
	gfwListFile_isEnable : true ,
	gfwListFile : [
		"https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/gfw.txt",
		"https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/gfw.txt"
	],
	//url list
	isEnable : true ,
	intelligent_mode_bypass_list : [    
		"localhost",
		"127.*",
		"10.*",
		"172.16.*",
		"172.17.*",
		"172.18.*",
		"172.19.*",
		"172.20.*",
		"172.21.*",
		"172.22.*",
		"172.23.*",
		"172.24.*",
		"172.25.*",
		"172.26.*",
		"172.27.*",
		"172.28.*",
		"172.29.*",
		"172.30.*",
		"172.31.*",
		"192.168.*",
		"*.12306.cn",
		"*.51ym.me",
		"*.52pojie.cn",
		"*.8686c.com",
		"*.abercrombie.com",
		"*.adobesc.com",
		"*.air-matters.com",
		"*.air-matters.io",
		"*.airtable.com",
		"*.akadns.net",
		"*.apache.org",
		"*.api.crisp.chat",
		"*.api.termius.com",
		"*.appshike.com",
		"*.appstore.com",
		"*.aweme.snssdk.com",
		"*.bababian.com",
		"*.battle.net",
		"*.beatsbydre.com",
		"*.bet365.com",
		"*.bilibili.cn",
		"*.ccgslb.com",
		"*.ccgslb.net",
		"*.chunbo.com",
		"*.chunboimg.com",
		"*.clashroyaleapp.com",
		"*.cloudsigma.com",
		"*.cloudxns.net",
		"*.cmfu.com",
		"*.culturedcode.com",
		"*.dct-cloud.com",
		"*.didialift.com",
		"*.douyutv.com",
		"*.duokan.com",
		"*.dytt8.net",
		"*.easou.com",
		"*.ecitic.net",
		"*.eclipse.org",
		"*.eudic.net",
		"*.ewqcxz.com",
		"*.fir.im",
		"*.frdic.com",
		"*.fresh-ideas.cc",
		"*.godic.net",
		"*.goodread.com",
		"*.haibian.com",
		"*.hdslb.net",
		"*.hollisterco.com",
		"*.hongxiu.com",
		"*.hxcdn.net",
		"*.images.unsplash.com",
		"*.img4me.com",
		"*.ipify.org",
		"*.ixdzs.com",
		"*.jd.hk",
		"*.jianshuapi.com",
		"*.jomodns.com",
		"*.jsboxbbs.com",
		"*.knewone.com",
		"*.kuaidi100.com",
		"*.lemicp.com",
		"*.letvcloud.com",
		"*.lizhi.io",
		"*.localizecdn.com",
		"*.lucifr.com",
		"*.luoo.net",
		"*.mai.tn",
		"*.maven.org",
		"*.miwifi.com",
		"*.moji.com",
		"*.moke.com",
		"*.mtalk.google.com",
		"*.mxhichina.com",
		"*.myqcloud.com",
		"*.myunlu.com",
		"*.netease.com",
		"*.nfoservers.com",
		"*.nssurge.com",
		"*.nuomi.com",
		"*.ourdvs.com",
		"*.overcast.fm",
		"*.paypal.com",
		"*.paypalobjects.com",
		"*.pgyer.com",
		"*.qdaily.com",
		"*.qdmm.com",
		"*.qin.io",
		"*.qingmang.me",
		"*.qingmang.mobi",
		"*.qqurl.com",
		"*.rarbg.to",
		"*.rrmj.tv",
		"*.ruguoapp.com",
		"*.sm.ms",
		"*.snwx.com",
		"*.soku.com",
		"*.startssl.com",
		"*.store.steampowered.com",
		"*.symcd.com",
		"*.teamviewer.com",
		"*.tmzvps.com",
		"*.trello.com",
		"*.trellocdn.com",
		"*.ttmeiju.com",
		"*.udache.com",
		"*.uxengine.net",
		"*.weather.bjango.com",
		"*.weather.com",
		"*.webqxs.com",
		"*.weico.cc",
		"*.wenku8.net",
		"*.werewolf.53site.com",
		"*.windowsupdate.com",
		"*.wkcdn.com",
		"*.workflowy.com",
		"*.xdrig.com",
		"*.xiaojukeji.com",
		"*.xiaomi.net",
		"*.xiaomicp.com",
		"*.ximalaya.com",
		"*.xitek.com",
		"*.xmcdn.com",
		"*.xslb.net",
		"*.xteko.com",
		"*.yach.me",
		"*.yixia.com",
		"*.yunjiasu-cdn.net",
		"*.zealer.com",
		"*.zgslb.net",
		"*.zimuzu.tv",
		"*.zmz002.com",
		"*.samsungdm.com"
	],
	intelligent_mode_direct_list : [],
	intelligent_mode_proxy_list : [],
	intelligent_mode_block_list : [],
	//列表总成
	mainList : []
	proxySetting : {
		scheme : "http", //http, https, socks4, socks5
		host : "127.0.0.1",
		port : "1080",
		username : "",
		password : ""
	}
};
