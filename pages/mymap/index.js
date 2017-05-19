let app = getApp()
var NetUtil = require("../../componet/NetUtil")
var bmap = require('../../libs/bmap-wx.js');
var StringUtil = require("../../componet/StringUtil")
var wxMarkerData = [];
var BMap;
Page({
  data: {
    latitude: 22.548908,
    longitude: 113.886128,
    height:0,//地图的高度，当地图加载完全后，设置为屏幕的高度
    scale:19,//地图的缩放级别
    markers: [],//地图上的标注集合
    //导航
    polyline: [],
    controls: [],//地图上的控件集合
    circles:[],
    shopList:[]//商铺信息集合
  },
  onReady:function(e){
    this.mapCtx = wx.createMapContext('mymap')
  },
  onLoad:function(options){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });
        var controls = [{
          id: 1,
          iconPath: '/images/route_location.png',
          position: {
            left: res.windowWidth - 50,
            top: res.windowHeight - 80,
            width: 36,
            height: 36
          },
          clickable: true
        }];
        that.setData({
          controls: controls
        });
      },
    })
    BMap = new bmap.BMapWX({
      ak: 'AGwnBIAu6tFqmLBeZ0jMfXe92UytTsyW'
    });
    this.getLocation();
  },
  //自动定位，获取当前所在位置的经纬度信息
  getLocation:function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("location:" + JSON.stringify(res));

        var circles = [{
          longitude: res.longitude,
          latitude: res.latitude,
          radius:300,
          strokeWidth:1,
          color:"#ff0000",
          fillColor:"#ff000050"
        }];
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          circles: circles
        });
        that.getCityInfo();
      },
    })
  },
  //根据定位到的经纬度信息调用百度api获取地理位置信息
  getCityInfo: function () {
    var that = this;
    var locationStr = this.data.latitude + "," + this.data.longitude;
    BMap.regeocoding({
      location: locationStr,
      iconPath: '/images/marker_red.png',
      iconTapPath: '/images/marker_yellow.png',
      success: function (data) {
        console.log("================success" + JSON.stringify(data));
        wxMarkerData = data.wxMarkerData;
        that.setData({
          cityCode: data.originalData.result.addressComponent.adcode,
          province: data.originalData.result.addressComponent.province,
          cityName: data.originalData.result.addressComponent.city
        });
        that.getShopList();
      },
      fail: function (data) {
        console.log("================fail：" + data);
      }
    });
  },
  //获取商铺信息
  getShopList: function () {
    var data = {
      cityCode: this.data.cityCode,
      orderBy: 5,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      recommendType: 2,
      pageNo: 1,
      pageSize: 10,
      provinceName: this.data.province,
      cityName: this.data.cityName
    };
    console.log("==========请求商铺数据：" + JSON.stringify(data));
    NetUtil.httpGet(NetUtil.BaseHost + "public/shop/searchShop", data, (data) => {
      var count = data.data.rCount
      if (count > 0) {
        var list = data.data.lst;
        this.setData({
          shopList: list
        });
      }
      this.createMarkers();
    }, (e) => {
      console.log("请求商铺数据异常：" + e.errMsg);
    })
  },
  //根据返回的商铺数据，创建地图上的marker
  createMarkers: function () {
    var shopList = this.data.shopList;
    var wxMarkerData = [];
    shopList.forEach((item, i) => {
      var marker = {
        latitude: item.latitude + "",
        longitude: item.longitude + "",
        iconPath: "/images/marker_red.png",
        iconTapPath: "/images/marker_yellow.png",
        id: item.shopId,
        desc: item.shopName,
        alpha: 1,
        address: item.addressPrefix,
        width: 50,
        heiht: 50
      };
      wxMarkerData.push(marker);
    });
    this.setData({
      markers: wxMarkerData
    })
    console.log("===============创建marker数据：" + JSON.stringify(this.data.markers));
  },
  findShopById: function (shopId) {
    var shopList = this.data.shopList;
    var shop = null;
    shopList.forEach((item,i) => {
      var flag = (item.shopId == shopId);
      if(flag == true) {
        shop = item;
      }
    });
    return shop;
  },
  //////////////////////////地图上点击业务///////////////////////////////////////////////
  //点击标注
  markertap(e) {
    var shopId = e.markerId;
    var shop = this.findShopById(shopId);
    if(shop == null){
      wx.showToast({
        title: '商铺信息异常：' + shopId,
      });
      return;
    }
    var content = "商铺名称：" + shop.shopName + "\n" + "商铺地址：" + shop.addressPrefix;
    wx.showModal({
      title: '商铺信息',
      content: content,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log("点击了确定");
        }
      }
    })
  },
  //点击控件
  controltap(e) {
    console.log("=================markertap：" + JSON.stringify(e));
    if (e.controlId == 1) {
      //将地图中心移动到定位点
      this.mapCtx.moveToLocation();
    }
  },
  regionchange(e) {
    console.log(e.type)
  }
})