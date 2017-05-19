// pages/mine/mine.js
var app = getApp()
let NetUtil = require('../../componet/NetUtil');
var StorageUtil = require('../../componet/StorageUtil')
Page({
  data:{
    isLogin:false,
    amount:0.00,
    levelName:'',
    userLogoUrl:'',
    userinfo:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad");
  },
  onReady:function(){
    // 页面渲染完成
    console.log("onReady");
  },
  onShow:function(){
    // 页面显示
    console.log("mine------------------onShow");
    var userinfo = StorageUtil.getStorage(StorageUtil.userinfo_key,(data) => {
      console.log(data.data);
      var isLogin = false;
      if(data.data){
        isLogin = true;
      }
      if(!isLogin) return;
      var userInfo = JSON.parse(data.data);
      var data = this.data;
      data.isLogin =isLogin;
      data.userinfo=userInfo;
      data.userLogoUrl = `${NetUtil.DownLoadUrl + userInfo.userLogoId}`;
      data.levelName=this.wrapperLevelName(userInfo.level) ;
      console.log(data);
      this.setData(data)
      this.getAccountMoney();
    },(e) => {
      console.log(e);
      var data = this.data;
      data.userinfo={};
      data.isLogin=false;
      data.amount=0.00;
      this.setData(data);
    })
    
  },
  getAccountMoney:function(){
    NetUtil.httpGet(NetUtil.BaseHost + "user/getAccountMoney",{userId:this.data.userinfo.userId},(data)=>{
      console.log(data.data.amount);
        //修改数据源，刷新页面
        this.setData({amount:data.data.amount})
    },(error) => {
        console.log(error);
        wx.showToast({title:error.errMsg,duration:1500});
    })
  },
  onHide:function(){
    // 页面隐藏
    console.log("onHide");
  },
  onUnload:function(){
    // 页面关闭
    console.log("onUnload");
  },
  handleAccount:function(){
    if(this.data.isLogin) {
      //已经登录
      console.log('已经登录');
    } else {
      //未登录,跳转到登录页面
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  wrapperLevelName:function(level){
    var levelName = "普通会员";
    switch(level){
      case 1:
        levelName = "普通会员";
        break;
      case 2:
        levelName = "创客";
        break;
      case 3:
        levelName = "合伙人";
        break;
    }
    return levelName;
  },
  //设置
  handleSetting:function(){
    wx.navigateTo({ url: '../mypages/setting/setting'})
  },
  onUserInfo:function(){
    if(this.data.isLogin) {
      console.log("===================已经登录，查看用户信息");
    } else {
      //还未登录，跳转到登录页面
      this.gotoLoginPage();
    }
  },
  gotoLoginPage:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})