function httpGet(url,data,callback,errorcallback,compback){
    console.log("url:" + url);
    wx.request({
      url: url,
      data: data,
      method: 'GET', 
      success: function(res){
        // success
        callback(res.data)
      },
      fail: function(error) {
        // fail
        errorcallback(error);
      },
      complete: function(res) {
        // complete
        if(compback) {
          compback(res);
        }
      }
    })
}

function httpPost(url,data,callback,errorcallback){
    console.log("url:" + url);
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        callback(res.data)
      },
      fail: function(error) {
        // fail
        errorcallback(error)
      },
      complete: function(res) {
        // complete
      }
    })
}
//接口地址
const BaseHost = "http://192.168.1.121:8989/legend/interface/";
//附件下载地址
const DOWN_LOAD_URL = BaseHost + "public/common/downloadFile?attachementId=";
const HTML_URL = "http://sxwww.1dian.la:9804/";
const ABOUT_URL = HTML_URL + "Protocol/about.html";
module.exports={
    httpGet:httpGet,
    httpPost:httpPost,
    BaseHost:BaseHost,
    DownLoadUrl:DOWN_LOAD_URL,
    html_url:HTML_URL,
    about_url:ABOUT_URL
}