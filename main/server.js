//读取保存的mode
async function GetMode(callback) {
    console.debug("function GetMode start");
    var s = await GetModeSetting().mode;
	if (!JsonIsEmpty(s)){
    	mode = s ;
		console.debug( "function GetMode end , data in storage is \n", mode );
	} else {
		console.debug( "storage no data function GetMode end" );
		return mode ;
	} 
}
//读取保存的SingleProxy
async function GetSingleProxy(callback){
    console.debug("function GetSingleProxy start");
    var s = await GetSingleProxySetting().singleProxySetting;
    //读取硬盘数据,若无硬盘数据则使用默认值
    if (!JsonIsEmpty(s)){
        singleProxySetting = s;
		console.debug( "function GetSingleProxy end, data in storage is \n", singleProxySetting );
        return singleProxySetting;
    } else {
        console.debug( "storage no data, use default data, function GetSingleProxy end" );
        return singleProxySetting ;
    }
}
//读取保存的URL
async function GetURLToScript(callback) {
    console.debug("function GetURLToScript start");
    var s = await GetURLToScriptSetting().URLToScript;
    //读取硬盘数据,若无硬盘数据则使用默认值
    if (!JsonIsEmpty(s)){
        URLToScript = s;
		console.debug( "function GetURLToScript end, data in storage is \n", URLToScript );
        return URLToScript;
    } else {
        console.debug( "storage no data, use default data, function GetURLToScript end" );
        return URLToScript ;
    }
}
//读取保存的pac
async function GetPacScript(callback) {
    console.debug("function GetPacScript start");
    var s = await GetPacScriptSetting().pacScript;
    //读取硬盘数据,若无硬盘数据则使用默认值
    if (!JsonIsEmpty(s)){
        proxyScript = s;
		console.debug( "function GetPacScript end, data in storage is \n", proxyScript );
        return proxyScript;
    } else {
        console.debug( "storage no data function GetPacScript end , default data is \n", proxyScript );
        return proxyScript ;
    }
}
//读取保存的MultipleProxy
async function GetMultipleProxy(callback) {
    console.debug("function GetMultipleProxy start");
    var s = await GetMultipleProxySetting().multipleProxySetting;
    //读取硬盘数据,若无硬盘数据则使用默认值
    if (!JsonIsEmpty(s)){
        multipleProxySetting = s;
		console.debug( "function GetMultipleProxy end, data in storage is \n", multipleProxySetting );
        return multipleProxySetting;
    } else {
        console.debug( "storage no data, use default data, function GetMultipleProxy end" );
        return multipleProxySetting ;
    }
}
//读取保存的IntelligentModes
async function GetIntelligentModes(callback) {
    console.debug("function GetIntelligentModes start");
    var s = await GetIntelligentModeSettings().intelligentModeSettings;
    //读取硬盘数据,若无硬盘数据则使用默认值
        intelligentModeSettings = s;
    if (!JsonIsEmpty(s)){
		console.debug( "function GetIntelligentModes end, data in storage is \n", intelligentModeSettings );
        return intelligentModeSettings;
    } else {
        console.debug( "storage no data, use default data, function GetIntelligentModes end" );
		return intelligentModeSettings ;
    }

}
//保存mode
async function SaveMode(mode,callback) {
    console.debug("function SaveMode start");
    await SaveModeSetting(mode);
    console.debug("function SaveMode end");
}
//保存SingleProxy
async function SaveSingleProxy(singleProxySetting,callback) {
    console.debug("function SaveSingleProxy start");
    await SaveSingleProxySetting(singleProxySetting);
    console.debug("function SaveSingleProxy end");
}
//保存URL
async function SaveURL(URLToScript,callback) {
    console.debug("function SaveURL start");
    await SaveURLToScriptSetting(URLToScript);
    console.debug("function SaveURL end");
}
//保存pac
async function SavePac(pacScript,callback) {
    console.debug("function SavePac start");
    await SavePacScriptSetting(pacScript);
    console.debug("function SavePac end");
}
//保存MultipleProxy
async function SaveMultipleProxy(multipleProxySetting,callback) {
    console.debug("function SaveMultipleProxy start");
	await SaveMultipleProxySetting(multipleProxySetting);
	console.debug("function SaveMultipleProxy end");
}
//清除所有设置内容
async function ClearAll() {
    console.debug("function ClearAll start");
	await ClearAllSetting();
	console.debug("function ClearAll end");
}
//使用直连模式
async function UseDirect(callback) {
    console.debug("function UseDirect start");
	await UseDirectSettings();
	console.debug("function UseDirect end");
}
//使用自动检测模式
async function UseAutoDetect(callback) {
    console.debug("function UseAutoDetect start");
	await UseAutoDetectSettings();
	console.debug("function UseAutoDetect end");
}
//使用系统代理
async function UseSystem(callback) {
    console.debug("function UseSystem start");
	await UseSystemSettings();
	console.debug("function UseSystem end");
}
//使用URL模式
async function UseURL(callback) {
    console.debug("function UseURL start");
	await UsePacScriptURLSettings(URLToScript);
	console.debug("function UseURL end");
}
//使用pac模式
async function UsePac(callback) {
    console.debug("function UsePac start");
	await UsePacScriptDataSettings(pacScript);
	console.debug("function UsePac end");
}
//使用单个代理
async function UseSingleProxy(callback) {
    console.debug("function UseSingleProxy start");
	await UseSingleProxySettings(singleProxySetting,callback);
	console.debug("function UseSingleProxy end");
}
//使用手动设置
async function UsefixedServers(callback) {
    console.debug("function UsefixedServers start");
	await UsefixedServersSettings(multipleProxySetting);
	console.debug("function UsefixedServers end");
}

//选择代理模式
function SelectProxy(proxyMode,callback){
	console.debug("function selectProxy start , proxyMode: " + proxyMode);
    switch (proxyMode) {
		case "direct":
			UseDirect(callback);
		break;
		case "auto_detect":
			UseAutoDetect(callback);
			break;
		case "pac_script":
			UsePac(callback);
			break;
		case "URL_script":
			UseURL(callback);
			break;
		case "single_servers":
			UseSingleProxy(callback);
			break;
		case "mutiple_servers":
			UsefixedServers(callback);
			break;
		case "system":
			UseSystem(callback);
			break;
		case "intelligent":
			//todo
			break;
		default:
			UseSystem(callback);
		break;
	}
	SaveModeSetting(proxyMode);
	console.debug("function selectProxy end");
}