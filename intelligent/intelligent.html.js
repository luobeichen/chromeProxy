layui.use(function(){
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;
  var dropdown = layui.dropdown;
  var laydate = layui.laydate;
  var colorpicker = layui.colorpicker;
  
  
  // 渲染
  table.render({
    elem: '#intelligent_table',
    page: true,
    css: [ // 设置单元格样式
      // 取消默认的溢出隐藏，并设置适当高度
      '.layui-table-cell{height: 50px; line-height: 40px;}',
      '.layui-table-cell .layui-colorpicker{width: 38px; height: 38px;}',
      '.layui-table-cell select{height: 36px; padding: 0 5px;}'
    ].join(''),
    cols: [[ 
      {field: 'address', title: 'URL', edit: 'text'},
      {field: 'host', title: 'Host', edit: 'text'},
      {field: 'port', title: 'port', edit: 'number'},
      {field: 'type', title: '原生 select', width:135, unresize: true, templet: '#intelligentSettings_select'}
      
    ]],
    data: [
      {address: '192.168.0.1', host: 'localhost', port: 8080, type: "https"}
    ],
    done: function(res, curr, count){
      var options = this;
      
      // 获取当前行数据
      table.getRowData = function(tableId, elem){
        var index = $(elem).closest('tr').data('index');
        return table.cache[tableId][index] || {};
      };
      
      // 原生 select 事件
      var tableViewElem = this.elem.next();
      tableViewElem.find('.intelligentSettings_select_primary').on('change', function(){
        var value = this.value; // 获取选中项 value
        var data = table.getRowData(options.id, this); // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
        // 更新数据中对应的字段
        data.type = value;
        // 显示 - 仅用于演示
        layer.msg('选中值: '+ value +'<br>当前行数据：'+ JSON.stringify(data));
      });
      
      // layui form select 事件
      form.on('select(select-demo)', function(obj){
        console.log(obj); // 获取选中项数据
        
        // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
        var data = table.getRowData(options.id, obj.elem);
        // 更新数据中对应的字段
        data.type = value;
        console.log(data);
      });
      
      // dropdown 方式的下拉选择
      dropdown.render({
        elem: '.dropdpwn-demo',
        // trigger: 'hover',
        // 此处的 data 值，可根据 done 返回的 res 遍历来赋值
        data: [{
          title: '男',
          id: 100
        },{
          title: '女',
          id: 101
        },{
          title: '保密',
          id: 102
        }],
        click: function(obj){
          var data = table.getRowData(options.id, this.elem); // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
          
          this.elem.find('span').html(obj.title);
          // 更新数据中对应的字段
          data.sex = obj.title;
          // 显示 - 仅用于演示
          layer.msg('选中值: '+ obj.title +'<br>当前行数据：'+ JSON.stringify(data));
        }
      });
      
      // laydate
      laydate.render({
        elem: '.laydate-demo',
        done: function(value, date, endDate){
          var data = table.getRowData(options.id, this.elem); // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
          // 更新数据中对应的字段
          data.date = value;
          
          // 显示 - 仅用于演示
          layer.msg('选中值: '+ value +'<br>当前行数据：'+ JSON.stringify(data));
        }
      });
      
      // colorpicker
      colorpicker.render({
        elem: '.colorpicker-demo',
        done: function(value){
          var data = table.getRowData(options.id, this.elem); // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
          // 更新数据中对应的字段
          data.color = value;
          
          // 显示 - 仅用于演示
          layer.msg('选中值: '+ value +'<br>当前行数据：'+ JSON.stringify(data));
        }
      });
      
      // 单元格普通编辑事件
      table.on('edit(ID-table-demo-editmodes)', function(obj){
        var value = obj.value // 得到修改后的值
        var data = obj.data // 得到所在行所有键值
        var field = obj.field; // 得到字段
        
        // 更新数据中对应的字段
        var update = {};
        update[field] = value;
        obj.update(update);
        
        // 编辑后续操作，如提交更新请求，以完成真实的数据更新
        // …
        
        // 显示 - 仅用于演示
        layer.msg('编辑值: '+ value +'<br>当前行数据：'+ JSON.stringify(data));
      });
      
      // 更多编辑方式……
    }
  });
});