//使用直连模式设置
function UseDirectSettings(callback){
	console.debug("function UseDirectSettings start");
	var proxySetting = {
		value: {mode: "direct"},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UseDirectSettings end");
}
//使用自动感知代理设置
function UseAutoDetectSettings(callback){
	console.debug("function UseAutoDetectSettings start");
	var proxySetting = {
		value: {mode: "auto_detect"},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UseAutoDetectSettings end");
}
//使用系统代理设置
function UseSystemSettings(callback){
	console.debug("function UseSystemSettings start");
	var proxySetting = {
		value: {mode: "system"},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UseSystemSettings end");
}
//使用URL模式设置
function UsePacScriptURLSettings(URLToScript,callback){
	console.debug("function UsePacScriptURLSettings start");
	var proxySetting = {
		value: {
			mode: "pac_script",
			pacScript: {
				url: URLToScript,
				mandatory:false
			}
		},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UsePacScriptURLSettings end");
}
//使用pac模式设置
function UsePacScriptDataSettings(script,callback){
	console.debug("function UsePacScriptDataSettings start");
	var proxySetting = {
		value: {
			mode: "pac_script",
			pacScript: {
				data: script,
				mandatory:false
			}
		},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UsePacScriptDataSettings end");
}
//使用单个代理设置
function UseSingleProxySettings(proxy,callback){
	console.debug("function UseSingleProxySettings start");
	var proxySetting = {
		value: {
			mode: "fixed_servers",
			rules: {
				singleProxy: proxy.singleProxy,
				bypassList: proxy.bypass_list
			}
		},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UseSingleProxySettings end");
}
//使用手动设置
function UsefixedServersSettings(proxy,callback){
	// console.debug("function UsefixedServersSettings start\n",proxy);
	console.debug("function UsefixedServersSettings start");
	var proxySetting = {
		value: {
			mode: "fixed_servers",
			rules: {
				proxyForHttp: {
					host: proxy.proxyForHttpSetting.host,
					port: proxy.proxyForHttpSetting.port,
					scheme : proxy.proxyForHttpSetting.scheme
				},
				proxyForHttps: {
					host: proxy.proxyForHttpsSetting.host,
					port: proxy.proxyForHttpsSetting.port,
					scheme : proxy.proxyForHttpsSetting.scheme
				},
				proxyForFtp: {
					host: proxy.proxyForFtpSetting.host,
					port: proxy.proxyForFtpSetting.port,
					scheme : proxy.proxyForFtpSetting.scheme
				},
				fallbackProxy: {
					host: proxy.fallbackProxySetting.host,
					port: proxy.fallbackProxySetting.port,
					scheme : proxy.fallbackProxySetting.scheme
				},
				bypassList: proxy.multiple_proxy_bypass_list
			}
		},
		scope: 'regular'
	}
	chrome.proxy.settings.set(proxySetting,callback);
	console.debug("function UsefixedServersSettings end");
}
//保存当前模式设置
async function SaveModeSetting(mode,callback){
	console.debug("function SaveModeSetting start");
	//保存 mode
	await chrome.storage.local.set({ 
		"mode": mode
	},() => {
	    console.debug("mode is set, value: " , mode);
	});
	console.debug("function SaveModeSetting end");
}
//保存URL设置
async function SaveURLToScriptSetting(URLToScript,callback){
	console.debug("function SaveURLToScriptSetting start");
	//保存 URLToScript
	await chrome.storage.local.set({ 
		"URLToScript": URLToScript
	},() => {
	    console.debug("URLToScript is set, value: " , URLToScript);
	});
	console.debug("function SaveURLToScriptSetting end");
}
//保存PAC设置
async function SavePacScriptSetting(pacScript,callback){
	console.debug("function SavePacScriptSetting start");
	//保存 pacScript
	await chrome.storage.local.set({ 
		"pacScript": pacScript
	},() => {
	    console.debug("pacScript is set, value: " , pacScript);
	});
	console.debug("function SavePacScriptSetting end");
}
//保存单个代理设置
async function SaveSingleProxySetting(singleProxySetting,callback){
	console.debug("function SaveSingleProxySetting start");
	//保存 singleProxySetting
	await chrome.storage.local.set({ 
		"singleProxySetting": singleProxySetting
	},() => {
	    console.debug("singleProxySetting is set, value: " , singleProxySetting);
	});
	console.debug("function SaveSingleProxySetting end");
}
//保存多个代理设置
async function SaveMultipleProxySetting(multipleProxySetting,callback){
	console.debug("function SaveMultipleProxySetting start");
	//保存 multipleProxySetting
	await chrome.storage.local.set({ 
		"multipleProxySetting": multipleProxySetting
	},() => {
	    console.debug("multipleProxySetting is set, value: " , multipleProxySetting);
	});
	console.debug("function SaveMultipleProxySetting end");
}
//读取保存的mode设置
async function GetModeSetting(callback) {
    console.debug("function GetModeSetting start");
    var settings = await chrome.storage.local.get(["mode"]);
    var mode = settings.mode ;
	console.debug( "function GetModeSetting end" );
    return mode;
    

}
//读取保存的singleProxy设置
async function GetSingleProxySetting(callback){
    console.debug("function GetSingleProxySetting start");
    var singleProxySetting = await chrome.storage.local.get(["singleProxySetting"]);
	console.debug( "function GetSingleProxySetting end" );
    return singleProxySetting;
}
//读取保存的URL设置
async function GetURLToScriptSetting(callback){
    console.debug("function GetURLToScriptSetting start");
    var URLToScript = await chrome.storage.local.get(["URLToScript"]);
	console.debug( "function GetURLToScriptSetting end" );
    return URLToScript;
}
//读取保存的PAC设置
async function GetPacScriptSetting(callback){
    console.debug("function GetPacScriptSetting start");
    var pacScript = await chrome.storage.local.get(["pacScript"]);
	console.debug( "function GetPacScriptSetting end" );
    return pacScript;
}
//读取保存的multipleProxy设置
async function GetMultipleProxySetting(callback) {
    console.debug("function GetMultipleProxySetting start");
    var multipleProxySetting = await chrome.storage.local.get(["multipleProxySetting"]);
    console.debug( "function GetMultipleProxySetting end" );
    return multipleProxySetting;

}
//读取保存的intelligentMode设置
async function GetIntelligentModeSettings(callback) {
    console.debug("function GetIntelligentModeSettings start");
    var intelligentModeSettings = await chrome.storage.local.get(["intelligentModeSettings"]);
    console.debug( "function GetIntelligentModeSettings end" );
	return intelligentModeSettings;

}
//清除所有设置内容
async function ClearAllSetting(){
    console.debug("function ClearAllProxySetting start");
    await chrome.storage.local.clear();
    console.debug( "function ClearAllProxySetting end" );
}
//清除singleProxySetting
async function ClearSingleProxySetting(){
    console.debug("function ClearSingleProxySetting start");
    await chrome.storage.local.remove("singleProxySetting");
    console.debug( "function ClearSingleProxySetting end" );
}
//清除URL
async function ClearURLToScriptSetting(){
    console.debug("function ClearURLToScriptSetting start");
    await chrome.storage.local.remove("URLToScript");
    console.debug( "function ClearURLToScriptSetting end" );
}
//清除PAC
async function ClearPacScriptSetting(){
    console.debug("function ClearPacScriptSetting start");
    await chrome.storage.local.remove("pacScript");
    console.debug( "function ClearPacScriptSetting end" );
}
//清除multipleProxySetting
async function ClearMultipleProxySetting(){
    console.debug("function ClearMultipleProxySetting start");
    await chrome.storage.local.remove("multipleProxySetting");
    console.debug( "function ClearMultipleProxySetting end" );
}
//清除intelligentModeSettings
async function ClearIntelligentModeSettings(){
    console.debug("function ClearIntelligentModeSettings start");
    await chrome.storage.local.remove("intelligentModeSettings");
    console.debug( "function ClearIntelligentModeSettings end" );
}