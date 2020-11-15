// pages/SHdizhi/SHdizhi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_list: null
  },
  TJdizhi: function() {
    wx.navigateTo({
      url: '/pages/TJdizhi/TJdizhi',
    })
  },
  shanc: function(e) {
    //  console.log(e)
    var that = this;
    wx.request({
      url: 'http://localhost/shop/address/delete_addressbyid.php',
      data: {
        addrid: e.currentTarget.dataset.rid
      },
      success: function(res) {
        //  console.log(res)
        if (res.data == "成功") {
          // wx.redirectTo({
          //   url: '/pages/SHdizhi/SHdizhi',
          // })
          that.onLoad();
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000,
          })
        }
      },
    })
  },
  moren: function(e) {
   // console.log(e.detail.value)
    wx.request({
      url: 'http://localhost/shop/address/update_address_setmoren.php',
      data: {
        addrid: e.detail.value,
        userid: app.userInfo.userid
      },
      success: function(res) {
      //  console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost/shop/address/select_addressbyid.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function(res) {
        // console.log(res);
        that.setData({
          address_list: res.data
        })
      },

    })
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