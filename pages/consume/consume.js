let app = getApp()
var NetUtil = require("../../componet/NetUtil")
var StringUtil = require("../../componet/StringUtil")
Page({
    data:{
        autoplay:true,
        interval:3000,
        circular:true,
        scrollViewHeight:1000,//scroll-view高度
        bannerImgs:[],//广告列表
        shopList:[],//商铺列表
        categoryList:[]//分类列表
    },
    onShow:function(){
        var that = this;
        console.log('onShow');
        wx.getSystemInfo({
            success:function(res){
                that.setData({
                    scrollViewHeight:res.screenHeight
                }) 
            }
        });
    },
    onReady:function(){
        console.log('onReady');
        this.getCategoryList();
        this.getShopList();
        this.getAdList();
    },
    onPullDownRefresh:function(){
        console.log("onPullDownRefresh");
        this.onReady();
        wx.stopPullDownRefresh();//停止下拉刷新
    },
    //获取广告
    getAdList:function(){
        var data = {
            cityCode:440300,
            adSpaceCode:'app_index'
        }
        NetUtil.httpGet(NetUtil.BaseHost + "public/home/getAD",data,(data)=>{
            var count = data.data.rCount
            var ads = [];
            if(count > 0) {
                var list = data.data.lst;
                for(var key in list) {
                    var item = list[key];
                    var adItem = {
                        adId:item.adId,
                        url:item.adImgUrl,
                        adSpaceCode:item.adSpaceCode
                    };
                    ads.push(adItem);
                }
            }
            if(ads.length <= 0) {
                ads.push({
                    adId:0,
                    url:'/images/ad_default1.jpg',
                    adSpaceCode:'app_index'
                });
            }
            this.setData({
                bannerImgs:ads
            });
        },(e) => {
            console.log(e.errMsg);
        })
    },
    //获取分类
    getCategoryList:function(){
        NetUtil.httpGet(NetUtil.BaseHost + "public/home/getOperationClassify",{parentClassifyId:0},(data) => {
            var count = data.data.rCount
            if(count > 0) {
                var categorys = [];
                var list = data.data.lst;
                for(var key in list) {
                    var item = list[key];
                    var categoryItem = {
                        id:item.classifyId,
                        key:item.classifyKey,
                        url:`${NetUtil.DownLoadUrl + item.classifyLogoId}`,
                        name:item.classifyName
                    };
                    categorys.push(categoryItem);
                }
                this.setData({
                    categoryList:categorys
                });
            }
        },(e) => {
            console.log(e.errMsg);
        })
    },
    getShopList:function(){
        var data = {
            cityCode:440306,
            orderBy:5,
            longitude:113.887084,
            latitude:22.54853,
            recommendType:2,
            pageNo:1,
            pageSize:10,
            provinceName:'广东省',
            cityName:'深圳市'
        };
        NetUtil.httpGet(NetUtil.BaseHost + "public/shop/searchShop",data,(data) => {
            var count = data.data.rCount
            if(count > 0) {
                var shops = [];
                var list = data.data.lst;
                for(var key in list) {
                    var item = list[key];
                    var distance = StringUtil.calcDistance(item.distance);
                    var shopItem = {
                        url:`${NetUtil.DownLoadUrl + item.shopLogoId}`,
                        shopName:item.shopName,
                        soldNumber:item.soldNumber,
                        distance:distance,
                        columnName:item.columnName,
                        shopId:item.shopId,
                        recommendType:item.recommendType
                    };
                    shops.push(shopItem);
                }
                this.setData({
                    shopList:shops
                });
            }
        },(e) => {
            console.log(e.errMsg);
        })
    }
})