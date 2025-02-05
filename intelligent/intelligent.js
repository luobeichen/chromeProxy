//智能设置

//重设智能设置
function resetIntelligentModeSettings(){
    //清除智能设置
    await chrome.storage.local.clear("intelligentModeSettings");
    location.reload(true);
}
/**
 * 下载TXT文件
 * @param {string} txtUrl - TXT文件的URL
 * 该函数通过fetch API从指定URL下载TXT文件，并处理响应
 * 如果响应状态不是成功状态（即response.ok不为true），则抛出错误
 * 否则，将响应数据分割成行并返回
 */
function DownloadTXT(txtUrl){
	console.debug("function DownloadTXT start");
	fetch(txtUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText);
		}
		return null;
	}).then(data => {
		console.debug("function DownloadTXT end, UrlList = ",data.split(/\r?\n/));
		return data.split(/\r?\n/);
	}).catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});
}

//下载并更新规则并保存
function SelectRule(){
	console.debug("function downloadRule start");
    //选择需要下载的规则
	var directL = [];
	var proxyL = [];
	var blockL = [];
	if (directListFile_isEnable) {
		directL.push(intelligentModeSettings.directListFile);
	};
	if(proxyListFile_isEnable){
		proxyL.push(intelligentModeSettings.proxyListFile);
	};
	if (adListFile_isEnable) {
		blockL.push(intelligentModeSettings.adListFile);
	};
	if (chinaListFile_isEnable) {
		directL.push(intelligentModeSettings.chinaListFile);
	};
	if (appleCNListFile_isEnable) {
		directL.push(intelligentModeSettings.appleCNListFile);
	};
	if (googleCNListFile_isEnable) {
		directL.push(intelligentModeSettings.googleCNListFile);
	};
	if (gfwListFile_isEnable) {
		proxyL.push(intelligentModeSettings.gfwListFile);
	};
	//下载规则
	//直连列表
	var directList = [];
    //导入默认规则
	directList.push(intelligentModeSettings.intelligent_mode_default_bypass_list);
	directL.forEach((url)=>{
		directList.push(DownloadTXT(url));
	});
	//代理列表
	var proxyList =[];
	proxyL.forEach((url)=>{
		proxyList.push(DownloadTXT(url));
	});
	//拒否列表
	var blockList =[];
	blockL.forEach((url)=>{
		blockList.push(DownloadTXT(url));
	});
	//去重
	var directListUniqueArray = Array.from(new Set(directList));
	var proxyListUniqueArray = Array.from(new Set(proxyList));
	var blockListUniqueArray = Array.from(new Set(blockList));
    //封装规则
	intelligentModeSettings.intelligent_mode_direct_list = intelligentBuildList(directListUniqueArray,"SYSTEM",null,null);
	intelligentModeSettings.intelligent_mode_proxy_list = intelligentBuildList(
		proxyListUniqueArray,
		intelligentModeSettings.proxySetting.scheme,
		intelligentModeSettings.proxySetting.host,
		intelligentModeSettings.proxySetting.port
	);
    intelligentModeSettings.intelligent_mode_block_list = intelligentBuildList(blockListUniqueArray,"BLOCK",null,null);
    //写入mainList
	intelligentModeSettings.mainList.push(intelligentModeSettings.intelligent_mode_direct_list);
	intelligentModeSettings.mainList.push(intelligentModeSettings.intelligent_mode_proxy_list);
	intelligentModeSettings.mainList.push(intelligentModeSettings.intelligent_mode_block_list);
	//利用mainList构建Pac脚本
	intelligentModeSettings.pacScript = buildPacScript(mainList);
    //保存direct_list, proxy_list, block_list,mainList,pacScript
    chrome.storage.local.set({"intelligentModeSettings":intelligentModeSettings});
	console.debug("function downloadRule end , intelligentModeSettings = ",intelligentModeSettings);
}
//保存智能代理的代理服务器
function setIntelligentProxy(proxySettings){
    console.debug("function setIntelligentProxy start");
	//获取智能代理的代理服务器
    intelligentModeSettings.proxySetting.scheme = proxySettings.scheme;
    intelligentModeSettings.proxySetting.host = proxySettings.host;
    intelligentModeSettings.proxySetting.port = proxySettings.port;
    chrome.storage.local.set({"intelligentModeSettings":intelligentModeSettings});
    console.debug("function setIntelligentProxy end");
}


//入口函数
//智能判断是否是第一次设置,如果是第一次设置,则进行初始化
//否则,进行手动设置
function getIntelligentProxySetting(proxySettings,callback){
    console.debug("function getIntelligentProxySetting start");
	var intelligent = GetIntelligentModes();
	if(intelligent.mainList == null || intelligent.mainList == undefined || intelligent.mainList == "" || intelligent.mainList.length == 0){
		//初始化
		SelectRule();
	} 
    console.debug("function getIntelligentProxySetting end");
}


/**
 * 构建列表
 * 该函数用于根据给定的URL列表、方案、代理主机和代理端口，构建一个智能化的代理列表
 * 主要用于简化代理配置，将通用的代理设置与特定的URL相结合
 * 
 * @param {Array} url_list - 需要配置代理的URL列表
 * @param {String} scheme - 代理方案，例如http、https等
 * @param {String} proxyHost - 代理服务器的主机名或IP地址
 * @param {Number} proxyPort - 代理服务器的端口号
 * 
 * @returns {Array} 返回一个对象数组，每个对象包含url、type、address和port属性，用于配置代理
 */
function intelligentBuildList(url_list,scheme,proxyHost,proxyPort){
	console.debug("function intelligentBuildList start");
	var proxList = [];
	url_list.forEach((url)=>{
		var prox = {
			host : url,
			type : scheme,
			address : proxyHost,
			port : proxyPort
		};
		proxList.push(prox);
	});
	console.debug("function intelligentBuildList end , proxList = ",proxList);
	return proxList;
}



/**
 * 构建PAC脚本
 * @param {Array} proxyList - 代理列表，每个元素包含
 * {
 * 		host,   	//域名(未解析)
 * 		type, 		//代理类型
 * 		address, 	//代理地址
 * 		port		//代理端口		
 * }属性
 * @returns {string} - 构建的PAC脚本字符串
 */
function buildPacScript(proxyList,type) {
    console.debug("function buildPacScript start");

    var pacScript = "function FindProxyForURL(url, host) {\n";
    proxyList.forEach((prox) => {
        var host = prox.host;
        var address = prox.address;
        var port = prox.port;

        if (host.startsWith("regexp:")) {
            host = host.substring("regexp:".length);
            pacScript += "	if (new RegExp('" + host + "').test(host)) {\n";
        } else if (host.startsWith("full:")) {
            host = host.substring("full:".length);
            pacScript += "	if ('" + host + "' == host) {\n";
        } else {
            pacScript += "	if(shExpMatch(host, '" + host + "')){\n";
        }

        if (type.toLowerCase() == "direct" || type.toLowerCase() == "system" || type.toLowerCase() == "block") {
            pacScript += "		return '" + type + "';\n"; 
        } else {
            pacScript += "		return '" + type + " " + address + ":" + port + "'; SYSTEM ;\n";
        }
        pacScript += "	}\n";
    });
    pacScript += "	return 'SYSTEM';\n";
    pacScript += "}\n";
    console.debug("function buildPacScript end , pacScript = ", pacScript);
    return pacScript;
}