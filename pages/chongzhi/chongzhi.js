// pages/czhi/czhi.js
var app = getApp();
var util = require('/../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money1: null,
    money2: null
  },
  wanc: function (res) {
    var time = util.formatTime(new Date());
    //  console.log(time)
    //  console.log(res)
    wx.request({
      url: 'http://localhost/shop/money/create_all_money.php',
      data: {
        userid: app.userInfo.userid,
        time: time,
        money: res.detail.value.se
      },
      success: function (res) {
        //  console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })




    var that = this;
    //   console.log(res)
    var moneys = parseInt(res.detail.value.se);
    //  console.log(typeof(moneys))

    wx.request({
      url: 'http://localhost/shop/money/select_money (1).php',
      data: {
        userid: app.userInfo.userid
      },
      success: function (e) {
        //    console.log(e)
        wx.request({
          url: 'http://localhost/shop/money/update_money.php',
          data: {
            userid: app.userInfo.userid,
            money: moneys + e.data
          },
          success: function (r) {
            wx.switchTab({
              url: '/pages/zhanghu/zhanghu',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
        })
      },

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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