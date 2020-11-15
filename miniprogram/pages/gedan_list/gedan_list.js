// pages/gedan_list/gedan_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_list: null,
    imgurl: null,
    image: null,
    name: null,
    username: null
  },
  play: function(e) {
 //   console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/music_play/music_play?hash=' + e.currentTarget.dataset.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log("胡66 - 群居动物".split("-"));
    var that = this;
    //  console.log(options)
    that.setData({
      imgurl: options.imgurl,
      image: options.image,
      name: options.name,
      username: options.username
    })
    wx.request({
      url: 'http://m.kugou.com/plist/list?json=true',
      data: {
        specialid: options.music
      },
      success: function(res) {
    //    console.log(res.data.list.list.info)
        var music = res.data.list.list.info
        for (var i = 0; i < music.length; i++) {
          var tex1 = music[i].filename;

          var list = tex1.split(" - ");
          music[i].name = list[0];
          music[i].music = list[1]
          //  console.log(list);
          //   console.log(list[0]);
          //   console.log(list[1]);
        }
        that.setData({
          music_list: music
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