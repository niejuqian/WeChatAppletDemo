let app = getApp();
var WxParse = require('../../componet/wxParse/wxParse.js');
var NetUtil = require('../../componet/NetUtil')
Page({
    strNumDiscode:function(str){
        str = str.replace(/\r\n/g,"");  
        str = str.replace(/\\r\\n/g,"");    
        str = str.replace(/\n/g,"");      
        str = str.replace(/\n/g,""); 
        str = str.replace(/\\"/g, "''");
        return str;
    },
    onLoad:function(options){
        console.log(options);
        var url;
        switch(options.type){
            case 'about':
                url = NetUtil.about_url;
                break;
        }
        var that = this;
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            var aboutHtml = that.strNumDiscode(JSON.stringify(res.data));
            console.log("success:" + aboutHtml.substring(1,aboutHtml.length-1));
            WxParse.wxParse('article','html',aboutHtml.substring(1,aboutHtml.length-1),that,5);
          },
          fail: function(res) {
            // fail
            console.log("fail:" +res);
          },
          complete: function(res) {
            // complete
          }
        })
    }
});