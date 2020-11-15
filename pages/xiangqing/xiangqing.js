// pages/xiangqing/xiangqing.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    image: null,
    detail: null,
    price: null,
    goodsid: null
  },
   gwc:function(){
     wx.request({
       url: 'http://localhost/shop/car/insert_car.php',
       data: {
         userid:app.userInfo.userid,
         goodsid:this.data.goodsid
       },
       success: function(res) {
       //  console.log(res)
         if(res.data=="成功"){
         wx.navigateTo({
           url: '/pages/shopcar/shopcar',
         })
         }
       },
       fail: function(res) {},
       complete: function(res) {},
     })
  
   },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    this.setData({
      goodsid: options.goodsid
    })
    var that = this;

    wx.request({

      url: 'http://localhost/shop/goods/select_goodsbyid.php',

      data: {
        goodsid: that.data.goodsid
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        //  console.log(res);
        that.setData({
          name: res.data.Name,
          image: res.data.Image,
          detail: res.data.Detail,
          price: res.data.price
        })
       
      },
      fail: function(res) {},
      complete: function(res) {},
     
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