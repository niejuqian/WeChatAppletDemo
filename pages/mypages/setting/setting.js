var app = getApp()
var NetUtil = require('../../../componet/NetUtil')
var StorageUtil = require('../../../componet/StorageUtil')
Page({
    data:{
        isLogin:false
    },
    onShow:function(){
        var userinfo = StorageUtil.getStorage(StorageUtil.userinfo_key,(data) => {
            console.log(data.data);
            var isLogin = false;
            if(data.data){
                isLogin = true;
            }
            this.setData({
                isLogin:isLogin
            })
        },(e) => {
            console.log(e);
        })
    },
    handleExit:function(){
        var that = this;
         wx.showModal({
            title: '提示',
            content: '确认退出登录吗？',
            confirmText: "退出",
            cancelText: "取消",
            success: function (res) {
                if (res.confirm) {
                    StorageUtil.clearStorage(StorageUtil.userinfo_key,(res) => {
                        that.setData({
                            isLogin:false
                        })
                    })
                }
            }
        });
    },
    handleAbout:function(){
        var httpUrl = `../../webview/webview?type=about`;
        console.log(httpUrl);
        wx.navigateTo({
          url: httpUrl
        })
    }
});