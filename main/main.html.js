//action
//读取设置
document.addEventListener("DOMContentLoaded",function(){
	layui.use(async function(){
		console.debug("action start");
		var action_mode = await GetMode();
		var action_singleProxySetting = await GetSingleProxy();
		var action_multipleProxySetting = await GetMultipleProxy();
		var action_URLToScript = await GetURLToScript();
		var action_proxyScript = await GetPacScript();
		console.debug("action_proxyScript = ",action_proxyScript);
		// var action_intelligentModeSettings = GetIntelligentModes();
		var form = layui.form;
		var $ = layui.$;

		//从Local 取出所有设置
		form.val("baseSettings", {
			//模式选择
			"mode": action_mode,
			//pac_url脚本设置
			"pac_url": action_URLToScript,
			//pac脚本设置
			"proxyScript": action_proxyScript,
			//手动设置代理
			"singleProxy_host": action_singleProxySetting.singleProxy.host,
			"singleProxy_port": action_singleProxySetting.singleProxy.port,
			"singleProxy_scheme": action_singleProxySetting.singleProxy.scheme,
			"singleProxy_bypass_list": action_singleProxySetting.bypass_list,
			//手动设置代理-高级设置
			//HTTP
			"multipleProxySetting_proxyForHttpSetting_host" : action_multipleProxySetting.proxyForHttpSetting.host,
			"multipleProxySetting_proxyForHttpSetting_port" : action_multipleProxySetting.proxyForHttpSetting.port,
			"multipleProxySetting_proxyForHttpSetting_scheme" : action_multipleProxySetting.proxyForHttpSetting.scheme,
			//HTTPS
			"multipleProxySetting_proxyForHttpsSetting_host" : action_multipleProxySetting.proxyForHttpsSetting.host,
			"multipleProxySetting_proxyForHttpsSetting_port" : action_multipleProxySetting.proxyForHttpsSetting.port,
			"multipleProxySetting_proxyForHttpsSetting_scheme" : action_multipleProxySetting.proxyForHttpsSetting.scheme,
			//FTP
			"multipleProxySetting_proxyForFtpSetting_host" : action_multipleProxySetting.proxyForFtpSetting.host,
			"multipleProxySetting_proxyForFtpSetting_port" : action_multipleProxySetting.proxyForFtpSetting.port,
			"multipleProxySetting_proxyForFtpSetting_scheme" : action_multipleProxySetting.proxyForFtpSetting.scheme,
			//其他协议
			"multipleProxySetting_fallbackProxySetting_host" : action_multipleProxySetting.fallbackProxySetting.host,
			"multipleProxySetting_fallbackProxySetting_port" : action_multipleProxySetting.fallbackProxySetting.port,
			"multipleProxySetting_fallbackProxySetting_scheme" : action_multipleProxySetting.fallbackProxySetting.scheme,
			//绕行列表
			"multipleProxySetting_multiple_proxy_bypass_list" : action_multipleProxySetting.multiple_proxy_bypass_list
		});
		//保存所有设置
		var saveAll = async function(){
			console.debug("action saveAll start");
			var data = form.val('baseSettings');
			console.debug("action saveAll data = ",data);
			//模式选择
			action_mode = data.mode;
			//pac_url脚本设置
			action_URLToScript = data.pac_url;
			//pac脚本设置
			action_proxyScript = data.proxyScript;
			//手动设置代理
			action_singleProxySetting.singleProxy.host = data.singleProxy_host;
			action_singleProxySetting.singleProxy.port = StringToInteger(data.singleProxy_port);
			action_singleProxySetting.singleProxy.scheme = data.singleProxy_scheme;
			action_singleProxySetting.bypass_list = splitStringByDelimiter(data.singleProxy_bypass_list);
			//HTTP
			action_multipleProxySetting.proxyForHttpSetting.host = data.multipleProxySetting_proxyForHttpSetting_host;
			action_multipleProxySetting.proxyForHttpSetting.port = StringToInteger(data.multipleProxySetting_proxyForHttpSetting_host);
			action_multipleProxySetting.proxyForHttpSetting.scheme = data.multipleProxySetting_proxyForHttpSetting_scheme;
			//HTTPS
			action_multipleProxySetting.proxyForHttpsSetting.host = data.multipleProxySetting_proxyForHttpsSetting_host;
			action_multipleProxySetting.proxyForHttpsSetting.port = StringToInteger(data.multipleProxySetting_proxyForHttpsSetting_port);
			action_multipleProxySetting.proxyForHttpsSetting.scheme = data.multipleProxySetting_proxyForHttpsSetting_scheme;
			//FTP
			action_multipleProxySetting.proxyForFtpSetting.host = data.multipleProxySetting_proxyForFtpSetting_host;
			action_multipleProxySetting.proxyForFtpSetting.port = StringToInteger(data.multipleProxySetting_proxyForFtpSetting_port);
			action_multipleProxySetting.proxyForFtpSetting.scheme = data.multipleProxySetting_proxyForFtpSetting_scheme;
			//其他协议
			action_multipleProxySetting.fallbackProxySetting.host = data.multipleProxySetting_fallbackProxySetting_host;
			action_multipleProxySetting.fallbackProxySetting.port = StringToInteger(data.multipleProxySetting_fallbackProxySetting_port);
			action_multipleProxySetting.fallbackProxySetting.scheme = data.multipleProxySetting_fallbackProxySetting_scheme;
			//绕行列表
			action_multipleProxySetting.multiple_proxy_bypass_list = splitStringByDelimiter(data.multipleProxySetting_multiple_proxy_bypass_list) ;
			//保存所有设置
			await SaveMode(action_mode);
			await SaveURL(action_URLToScript);
			await SaveSingleProxy(action_singleProxySetting);
			await SaveMultipleProxy(action_multipleProxySetting);
			await SavePac(action_proxyScript);
			console.debug("action saveAll end.");
		};
		var save_and_connect = async function(){
			console.debug("action connect start");
			await saveAll();
			SelectProxy(action_mode,null);
			console.debug("action connect end");
		};
		save_and_connect();
		//保存设置
		layui.$('#saveAll').on('click',await async function(){
			await saveAll();
		});
		//连接并保存
		layui.$('#connect').on('click',await async function () {
			await save_and_connect();
		});
		//重置设置
		layui.$('#resetAll').on('click',await async function(){
			console.debug("action resetAll start");
			await ClearAll();
			// 重新加载页面
			location.reload(true);
			console.debug("action resetAll end");
			
		});
		//跳转到智能模式设置页面
		layui.$('#intelligent_mode_setting').on('click',await async function(){
			chrome.tabs.create({ url: "../intelligent/intelligent.html" });
		});
		console.debug("action end");
	});
});




