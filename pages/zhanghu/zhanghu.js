// pages/zhanghu/zhanghu.js
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null ,
    money:null
  },
  SHd:function(){
     wx.navigateTo({
       url: '/pages/SHdizhi/SHdizhi',
     })
  },
  xiaofei:function(){
    wx.navigateTo({
      url: '/pages/XFjilu/XFjilu',
    })
  },

  congz:function(){
    wx.navigateTo({
      url: '/pages/CZjilu/CZjilu',
    })
  },
  czhi:function(){
    wx.redirectTo({
      url: '/pages/chongzhi/chongzhi',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost/shop/money/select_money (1).php',
      data: {
        userid: app.userInfo.userid
      },
      success: function (e) {
     //   console.log(e)
        that.setData({
          money:e.data
        })
      },
    })
 // console.log(app.userInfo)
    that.setData({
      user:app.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})