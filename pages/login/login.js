var app = getApp()
const mobileNormal = {
    wrapperBorderBottomStyle:'input-bottom-normal-style',
    style:'input-style ',
    leftIcon:'/images/regist_phone.png',
    showDelIcon:false
};
const mobileFocus = {
    wrapperBorderBottomStyle:'input-bottom-focus-style',
    style:'input-style',
    leftIcon:'/images/regist_phone_pressed.png',
    showDelIcon:false
};

const pwdNormal = {
    wrapperBorderBottomStyle:'input-bottom-normal-style',
    style:'input-style ',
    leftIcon:'/images/login_psw_normale_icon.png',
    showDelIcon:false
};
const pwdFocus = {
    wrapperBorderBottomStyle:'input-bottom-focus-style',
    style:'input-style',
    leftIcon:'/images/login_psw_pressed_icon.png',
    showDelIcon:true
};
var NetUtil = require('../../componet/NetUtil')
var MD5Util = require('../../componet/MD5Util')
var StorageUtil = require('../../componet/StorageUtil')
Page({
    data:{
        reqData:{
            mobile:'15899773751',//账号
            password:'a123456',//密码
            model:'',//手机型号
            osInfo:'',//系统信息
            sn:'',//sn
            clientSystemType:4,
            appVersion:''
        },
        mobileFocus:true,
        pwdFocus:false,
        mobileStyle:mobileFocus,
        pwdStyle:pwdNormal,
        loading:{
            hiddenLoading:true,
            loadText:'请求中...'
        }
    },
    onShow:function(){
        var that = this;
        wx.getSystemInfo({
          success: function(res) {
            var reqData = that.data.reqData;
            reqData.model = res.model;
            reqData.osInfo = res.system;
            reqData.appVersion = res.version;
            that.setData(reqData);
          }
        })
    },
    handleLogin:function(){
        //参数校验
        if(!this.validLoginParam()) return;
        //登录
        this.showLoad();
        var requestData = JSON.parse(JSON.stringify(this.data.reqData));
        requestData.password = MD5Util.hexMD5(requestData.password);
        console.log("reqData:" + JSON.stringify(this.data.reqData)+"，requestData：" + JSON.stringify(requestData));
        NetUtil.httpGet(NetUtil.BaseHost + "user/login",requestData,(data) => {
            console.log(data);  
            if(data.code == 0) {
                this.toast("登录成功");
                //缓存数据
                StorageUtil.putStorage(StorageUtil.userinfo_key,data.data,(res) =>{
                    wx.navigateBack({ delta: 1})// 回退前 delta(默认为1) 页面 
                });
            }else{
                this.toast(data.msg);
            }            
        },(error) => {     
            this.toast("请求失败...");
        },(res)=>{
            console.log("complete...");        
           this.hidLoad();
        });
    },
    //登录参数校验
    validLoginParam:function(){
        var that = this;
        let mobile = this.data.reqData.mobile;
        let pwd = that.data.reqData.password;
        if(typeof(mobile) == undefined || mobile == null || mobile.length == 0) {
            that.showDialog('请输入手机号码',false,(res) => {
                if(res.confirm){
                    //点击确定，聚焦到手机号码输入框
                    that.setData({
                        mobileFocus:true
                    });
                }
            });
            return false;
        }
        if(typeof(pwd) == undefined || pwd == null || pwd.length == 0) {
            that.showDialog('请输入密码',false,(res) => {
                if(res.confirm){
                    //点击确定，聚焦到手机号码输入框
                    that.setData({
                        pwdFocus:true
                    });
                }
            });
            return false;
        }
        return true;
    },
    //隐藏loading框
    hidLoad:function(){
        var loadingTmp = this.data.loading;
        loadingTmp.hiddenLoading = true;
        this.setData({
            loading:loadingTmp
        });
    },
    //侠士loading框
    showLoad:function(){
        var loadingTmp = this.data.loading;
        loadingTmp.hiddenLoading = false;
        this.setData({
            loading:loadingTmp
        }); 
    },
    handleRegist:function(){
        //注册
    },
    // 手机输入框处理
    handleMobileChange:function(e){
        //手机号码输入监听
        let mobile = e.detail.value;
        var tmpMobileStyle = mobileFocus;
        tmpMobileStyle.showDelIcon = true;
        if(mobile == null || mobile.length == 0) {
            tmpMobileStyle.showDelIcon = false;
        }
        var reqTmpData = this.data.reqData;
        reqTmpData.mobile= mobile;
        this.setData({
            reqData:reqTmpData,
            mobileStyle:tmpMobileStyle
        });
    },
    handleMobileFocus:function(e){
        //手机输入框聚焦事件
        let mobile = e.detail.value;
        var tmpMobileStyle = mobileFocus;
        tmpMobileStyle.showDelIcon = true;
        if(mobile == null || mobile.length == 0) {
            tmpMobileStyle.showDelIcon = false;
        }
        this.setData({
            mobileStyle:tmpMobileStyle
        });
    },
    handleMobileBlur:function(e){
        //手机输入失焦事件
        this.setData({
            mobileStyle:mobileNormal
        });
    },
    handleDelMobile:function(){
        var reqTmpData = this.data.reqData;
        reqTmpData.mobile= "";
        this.setData({
            reqData:reqTmpData,
            mobileFocus:true,
            pwdFocus:false

        });
    },
    // 密码输入框处理
    handlePwdChange:function(e){
        //密码输入监听
        let pwd = e.detail.value;
        var tmpPwdStyle = pwdFocus;
        tmpPwdStyle.showDelIcon = true;
        if(pwd == null || pwd.length == 0) {
            tmpPwdStyle.showDelIcon = false;
        }
        var reqTmpData = this.data.reqData;
        reqTmpData.password= pwd;
        this.setData({
            reqData:reqTmpData,            
            pwdStyle:tmpPwdStyle
        });
    },
    
    handlePwdFocus:function(e){
        let pwd = e.detail.value;
        var tmpPwdStyle = pwdFocus;
        tmpPwdStyle.showDelIcon = true;
        if(pwd == null || pwd.length == 0) {
            tmpPwdStyle.showDelIcon = false;
        }
        //密码输入框聚焦事件
        this.setData({
            pwdStyle:tmpPwdStyle
        });
    },
    handlePwdBlur:function(e){
        //密码输入失焦事件
        this.setData({
            pwdStyle:pwdNormal
        });
    },
    handleDelPwd:function(){
        var reqTmpData = this.data.reqData;
        reqTmpData.password= "";
        this.setData({
            reqData:reqTmpData,
            mobileFocus:false,
            pwdFocus:true
        });
    },
    toast:function(msg){
        wx.showToast({
            title: msg,
            icon: 'warn',
            duration: 1500
        });
    },
    showDialog:function(content,showCancel,callback){
        wx.showModal({
                content:content,
                showCancel:showCancel,
                success:callback
            });
    }
})