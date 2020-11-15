// pages/music_like/music_like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    name:null,
    image:null
  },

  sc:function(e){
    var that=this;
    console.log(e.currentTarget.dataset.hash)
   var db= wx.cloud.database();
    db.collection("music_list").doc(e.currentTarget.dataset.hash).remove({
      success:function(res){
        console.log(res)
       that.onLoad();
      },
    })
  },

  play:function(e){
  wx.navigateTo({
    url: '/pages/music_play/music_play?hash='+e.currentTarget.dataset.hash,
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      withCredentials:false,
      success:function(e){
   // console.log(e)
    that.setData({
      name:e.userInfo.nickName,
      image:e.userInfo.avatarUrl
    })
      },
    })
    wx.cloud.init();
    var db = wx.cloud.database();
    db.collection("music_list").get({
      success:function(res){
        //console.log(res);
        var list=res.data;
        that.setData({
          list:list.reverse()
        })
      }
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