/**本地数据缓存 */
function putStorage(key,obj,callback){
    if(obj != null) {
        wx.setStorage({
          key: key,
          data: JSON.stringify(obj),
          success: function(res){
            // success
            callback('保存成功')
          },
          fail: function(res) {
            // fail
            callback('保存失败：' + res)
          },
          complete: function(res) {
            // complete
          }
        })
    }
}

function getStorage(key,callback,errorBack){
    wx.getStorage({
      key: key,
      success: function(res){
        // success
        callback(res);
      },
      fail: function(res) {
        // fail
        errorBack(res);
      },
      complete: function(res) {
        // complete
      }
    })
}
function clearStorage(key,callback){
  wx.clearStorage({
    key: key,
    success: function(res){
      // success
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      callback(res);
    }
  })
}
const USER_INFO_KEY = "userinfo_key";

module.exports={
    getStorage:getStorage,
    putStorage:putStorage,
    clearStorage:clearStorage,
    userinfo_key:USER_INFO_KEY
}