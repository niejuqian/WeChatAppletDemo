var app = getApp()
Page({
  data:{
      a:2,
      list:[
          {
              name:'jason',
              age:18
          },
          {
              name:'rky',
              age:20
          },
          {
              name:'david',
              age:46
          },
          {
              name:'小二',
              age:19
          }
      ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad");
  },
  onReady:function(){
    // 页面渲染完成
    console.log("onReady");
    //设置页面标题
    wx.setNavigationBarTitle({
      title: '创客',
      success: function(res) {
        // success
      }
    })
  },
  onShow:function(){
    // 页面显示
    console.log("onShow");
  },
  onHide:function(){
    // 页面隐藏
    console.log("onHide");
  },
  onUnload:function(){
    // 页面关闭
    console.log("onUnload");
  },
  onPullDownRefresh:function(){
    // 页面下拉
    console.log("onPullDownRefresh");
  },
  onReachBottom:function(){
    // 页面上拉
    console.log("onReachBottom");
  },
  titleOnClick:function(event){
    console.log(event);
  }
})