// pages/TJdizhi/TJdizhi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change: null,
    address: null
  },
  change: function(e) {
    var that = this;
    // console.log(e.detail.value);
    that.setData({
      change: e.detail.value
    })
  },
  dit: function(res) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        //  console.log(res);
        that.setData({
          address: res.name
        })
      },
    })
  },
  xinx: function(a) {
    //  console.log(a);
    if (!a.detail.value.name || !a.detail.value.phone || !a.detail.value.sheng || !a.detail.value.xiangq) {
      wx.showToast({
        title: '信息有误',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var that = this;
      wx.request({
        url: 'http://localhost/shop/address/add_address.php',

        data: {
          userid: app.userInfo.userid,
          name: a.detail.value.name,
          phone: a.detail.value.phone,
          detail: a.detail.value.xiangq,
          province: a.detail.value.sheng,
          city: a.detail.value.shi,
          district: a.detail.value.qu
        },
        success: function(res) {
          //   console.log(res)
          if (res.data == "成功") {
            wx.redirectTo({
              url: '/pages/SHdizhi/SHdizhi',
              success: function() {
                wx.showToast({
                  title: '添加成功',
                  icon: 'none',
                  duration: 2000,
                })
              },
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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