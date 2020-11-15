// pages/dingdan/dingdan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tt1: 1,
    tt2: 0,
    tt3: 0,
    dingdan_list:null,
    dd_yfh:null,
    dd_ywc:null
  },
  wfh: function() {
    this.setData({
      tt1:1,
      tt2:0,
      tt3:0
    })
    var that = this;
    wx.request({
      url: 'http://localhost/shop/buy/select_buy_recode_daifahuo.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function (res) {
        that.setData({
          dingdan_list: res.data.reverse()
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  yfh: function() {
    this.setData({
      tt1: 0,
      tt2: 1,
      tt3: 0
    })
    var that=this;
    wx.request({
      url: 'http://localhost/shop/buy/select_buy_recode_yifahuo.php',
      data: {
          userid:app.userInfo.userid
      },
      success: function(res) {
    //    console.log(res)
        that.setData({
          dd_yfh:res.data.reverse()
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  ywc: function() {
    this.setData({
      tt1: 0,
      tt2: 0,
      tt3: 1
    })
    var that=this;
    wx.request({
      url: 'http://localhost/shop/buy/select_buy_recode_yiwancheng.php',
      data: {
        userid:app.userInfo.userid
      },
      success: function(res) {
        that.setData({
          dd_ywc:res.data.reverse()
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://localhost/shop/buy/select_buy_recode_daifahuo.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function(res) {
   //     console.log(res)
        that.setData({
          dingdan_list:res.data.reverse()
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    that.wfh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})