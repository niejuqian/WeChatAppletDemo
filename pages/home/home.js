var app = getApp()
var NetUtil = require('../../componet/NetUtil')
var StorageUtil = require('../../componet/StorageUtil')
Page({
    data:{
        amount:0.0,
        isLogin:false,
        userId:null,
        topList:[
            {
                name:'扫一扫',
                img:'/images/home_scan.png'
            },
            {
                name:'付款码',
                img:'/images/home_pay.png'
            },
            {
                name:'推荐',
                img:'/images/home_recommend.png'
            },
            {
                name:'抢红包',
                img:'/images/home_redpackage_white.png'
            }
        ],
        contentList:[
            {
                name:'创客/合伙人',
                img:'/images/home_marker.png',
                opeType:'marker'
            },
            {
                name:'我要消费',
                img:'/images/home_consume.png',
                opeType:'consume'
            },
            {
                name:'我的',
                img:'/images/home_me.png',
                opeType:'mine'
            },
            {
                name:'帮人升级',
                img:'/images/help_update.png',
                opeType:'update'
            },
            {
                name:'三享精品',
                img:'/images/sx_area.png',
                opeType:'sx_area'
            },
            {
                name:'消息',
                img:'/images/home_message.png',
                opeType:'message'
            },
            {
                name:'信息服务',
                img:'/images/home_info_server.png',
                opeType:'info_server'
            }
        ]
    },
    onShow:function(){
        var userinfo = StorageUtil.getStorage(StorageUtil.userinfo_key,(data) => {
            console.log(data.data);
            var isLogin = false;
            if(data.data){
                isLogin = true;
            }
            var userInfo = JSON.parse(data.data);
            var data = this.data;
            data.userId =userInfo.userId;
            data.isLogin=isLogin;
            this.setData(data)
            this.getAccountMoney();
        },(e) => {
            console.log(e);
        })
    },
    getAccountMoney:function(){
        if(this.data.userId == null) return;
        NetUtil.httpGet(NetUtil.BaseHost + "user/getAccountMoney",{userId:this.data.userId},(data)=>{
            console.log("getAccount:" + JSON.stringify(data))
            console.log(data.data.amount);
            //修改数据源，刷新页面
            this.setData({amount:data.data.amount})
        },(error) => {
            console.log(error);
            wx.showToast({title:error.errMsg,duration:1500});
        })
    },
    onReady:function(){
        wx.setNavigationBarTitle({
            title: '三享通',
            success: function(res) {
                // success
            }
        })
    },
    onItemClick:function(e){
        //console.log(e);
        var opeType = e.currentTarget.dataset.type;
        switch(opeType) {
            case "info_server":
                wx.showToast({title:'敬请期待',duration:1500});
                break;
            case "consume":
                wx.switchTab({
                  url: '/pages/consume/consume'
                })
                break;
            case "mine":
                wx.switchTab({
                  url: '/pages/mine/mine'
                })
                break;
            case "message":
                this.gotoPage("../mymap/index");
                break;
        }
    },
    handleAccount:function(){
        //查看账户
        if(this.data.isLogin) {
            //进入账户余额页面
        } else {
            //进入登录页面
            wx.navigateTo({url: '../login/login'})
        }
    },
    gotoPage:function(pageUrl){
      wx.navigateTo({
        url: pageUrl,
      })
    }
})