//长字符串解析为数组
function splitStringByDelimiter(inputString) {
	console.debug("function splitStringByDelimiter start");
    // 定义正则表达式，匹配中文分号、中文逗号、英文分号、英文逗号、单个空格、多个空格、Windows回车、Linux回车
    var delimiterRegex = /[,;，；\s\r\n]+/;
    // 使用split方法将字符串分割成数组
    var segments = inputString.split(delimiterRegex);
    // 返回结果数组
	console.debug("function splitStringByDelimiter end");
    return segments;
}
//字符串转化为integer
function StringToInteger(str) {  
    // 判断输入的类型  
    if (typeof str !== 'string' && typeof str !== 'number') {  
        // 如果不是字符串或数字类型，抛出异常  
        throw new Error('Input must be a string or a number');  
    }  
  
    // 如果输入是数字，直接返回  
    if (typeof str === 'number' && Number.isInteger(str)) {  
        return str;  
    }  
  
    // 如果输入是字符串，尝试转换为整数  
    // 使用parseInt或Number进行转换，但parseInt更安全，因为它会停止在第一个非数字字符处  
    const num = parseInt(str, 10);  
  
    // 如果转换后的数字不是NaN（表示不是有效的整数），则返回它  
    if (!isNaN(num)) {  
        return num;  
    }  
  
    // 如果输入是字符串但不是有效的整数，抛出异常  
    throw new Error('Input string is not a valid integer');  
}  
function JsonIsEmpty(json) {
    console.debug("function JsonIsEmpty start");
    if (json == null || json == undefined || json == "") {
        console.debug("function JsonIsEmpty end, return true");
        return true;
    }
    console.debug("function JsonIsEmpty end, return false");
    return false;
}