// pages/XFjilu/XFjilu.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   jilu_time:null,
   jilu_price:null,
   tt1:1,
   tt2:0
  },
    jiage:function(){
      var that=this
      that.setData({
        tt2:1,
        tt1:0
      })
    },
  shijian: function () {
    var that = this
    that.setData({
      tt2: 0,
      tt1: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
   wx.request({
     url: 'http://localhost/shop/buy/select_buy_recode_jilu.php',
     data: {
      userid:app.userInfo.userid
     },
     success: function(res) {
   //    console.log(res)
       that.setData({
         jilu_time:res.data.reverse(),
       })
     },
     fail: function(res) {},
     complete: function(res) {},
   })
   wx.request({
     url: 'http://localhost/shop/buy/select_buy_money_jilu.php',
     data: {
       userid:app.userInfo.userid
     },
     success: function(res) {
    //   console.log(res)
       that.setData({
         jilu_price:res.data
       })
     },
     fail: function(res) {},
     complete: function(res) {},
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