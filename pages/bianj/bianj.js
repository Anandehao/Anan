// pages/bianj/bianj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrid:null,
    change: null,
    address: null,
    name: null,
    phone: null,
    sheng: null,
    shi: null,
    qu: null,
    xxdz: null
  },
  xinx: function(res) {
  //  console.log(res)
    wx.request({
      url: 'http://localhost/shop/address/update_address.php',
      data: {
        addrid:this.data.addrid,
        name: res.detail.value.name,
        phone: res.detail.value.phone,
        detail: res.detail.value.xiangq,
        province: res.detail.value.sheng,
        city: res.detail.value.shi,
        district: res.detail.value.qu
      },

      success: function(e) {
        //  console.log(e)
          if(e.data=="成功"){
            wx.redirectTo({
              url: '/pages/SHdizhi/SHdizhi',
              success: function(res) {
                wx.showToast({
                  title: '编辑成功',
                  icon: 'none',
                  duration: 2000,
                })
              },
            })
          }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // console.log(options)
    wx.request({
      url: 'http://localhost/shop/address/select_addressby_addrid.php',
      data: {
        addrid: options.AddrId
      },
      success: function(res) {
        //  console.log(res)
        that.setData({
          name: res.data.Name,
          phone: res.data.Phone,
          sheng: res.data.Province,
          shi: res.data.City,
          qu: res.data.District,
          xxdz: res.data.Detail,
          addrid:res.data.AddrId
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